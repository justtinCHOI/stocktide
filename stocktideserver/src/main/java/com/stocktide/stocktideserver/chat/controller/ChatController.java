package com.stocktide.stocktideserver.chat.controller;

import com.stocktide.stocktideserver.chat.entity.ChatMessage;
import com.stocktide.stocktideserver.chat.entity.ChatRoom;
import com.stocktide.stocktideserver.chat.entity.UserStatusMessage;
import com.stocktide.stocktideserver.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatService chatService;

    // 채팅방 생성 또는 조회
    @MessageMapping("/chat.createRoom/{companyId}")
    @SendTo("/topic/chat/{companyId}")
    public ChatMessage createRoom(@DestinationVariable Long companyId,
                                  @Payload ChatMessage message,
                                  SimpMessageHeaderAccessor headerAccessor) {
        // 채팅방 생성 또는 조회
        ChatRoom chatRoom = chatService.createOrGetChatRoom(companyId);
        String roomId = chatRoom.getRoomId();
        log.info("Creating new room {}", roomId);

        // 세션에 채팅방 정보 저장
        headerAccessor.getSessionAttributes().put("room", roomId);
        headerAccessor.getSessionAttributes().put("username", message.getSender());

        // 시스템 메시지 생성
        message.setType(ChatMessage.MessageType.CHAT);
        message.setContent(message.getSender() + "님이 입장하셨습니다.");
        message.setTime(LocalDateTime.now().toString());

        return message;
    }

    // 채팅방 참여
    @MessageMapping("/chat.joinRoom/{companyId}")
    @SendTo("/topic/chat/{companyId}")
    public void joinRoom(@DestinationVariable Long companyId,
                         @Payload ChatMessage message,
                         SimpMessageHeaderAccessor headerAccessor) {
        log.info("User {} joining room for company {}", message.getSender(), companyId);

        ChatRoom chatRoom = chatService.createOrGetChatRoom(companyId);
        String roomId = chatRoom.getRoomId();

        // 세션 정보 저장
        headerAccessor.getSessionAttributes().put("room", roomId);
        headerAccessor.getSessionAttributes().put("username", message.getSender());

        // 채팅방 참여자 업데이트
        chatService.addParticipant(roomId, message.getSender());

        // 채팅 히스토리 전송
        List<ChatMessage> history = chatService.getChatHistory(roomId, 50);
        messagingTemplate.convertAndSend(
                String.format("/topic/chat/%d/history", companyId),
                history
        );

        // 참여 메시지 브로드캐스트
        messagingTemplate.convertAndSend(
                String.format("/topic/chat/%d", companyId),
                message
        );
    }

    // 메시지 전송
    @MessageMapping("/chat.sendMessage/{companyId}")
    @SendTo("/topic/chat/{companyId}")
    public ChatMessage sendMessage(@DestinationVariable Long companyId,
                                   @Payload ChatMessage message) {
        message.setTime(LocalDateTime.now().toString());
        chatService.saveMessage(message);
        messagingTemplate.convertAndSend("/topic/chat/" + companyId, message);
        return message;
    }

    // 채팅방 나가기
    @MessageMapping("/chat.leaveRoom/{companyId}")
    @SendTo("/topic/chat/{companyId}")
    public ChatMessage leaveRoom(@DestinationVariable Long companyId,
                                 @Payload ChatMessage message,
                                 SimpMessageHeaderAccessor headerAccessor) {
        String roomId = "company-" + companyId;

        // 채팅방에서 참여자 제거
        chatService.removeParticipant(roomId, message.getSender());

        // 세션 정보 삭제
        if (headerAccessor.getSessionAttributes() != null) {
            headerAccessor.getSessionAttributes().remove("room");
            headerAccessor.getSessionAttributes().remove("username");
        }

        // 참여자 목록 업데이트 브로드캐스트
        List<String> participants = chatService.getParticipants(roomId);
        messagingTemplate.convertAndSend("/topic/users",
                new UserStatusMessage("DISCONNECTED", message.getSender(), participants)
        );

        // 시스템 메시지 생성
        message.setType(ChatMessage.MessageType.LEAVE);
        message.setContent(message.getSender() + "님이 퇴장하셨습니다.");
        message.setTime(LocalDateTime.now().toString());

        return message;
    }
}