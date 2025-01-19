package com.stocktide.stocktideserver.chat.controller;

import com.stocktide.stocktideserver.chat.entity.ChatMessage;
import com.stocktide.stocktideserver.chat.entity.ChatRoom;
import com.stocktide.stocktideserver.chat.entity.UserStatusMessage;
import com.stocktide.stocktideserver.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatService chatService;

    @MessageMapping("/chat.joinRoom/{companyId}")
    @SendTo("/topic/chat/{companyId}")
    public ChatMessage joinRoom(@DestinationVariable Long companyId,
                                @Payload ChatMessage message,
                                SimpMessageHeaderAccessor headerAccessor) {
        String roomId = "company-" + companyId;
        message.setRoom(roomId);

        headerAccessor.getSessionAttributes().put("room", roomId);
        headerAccessor.getSessionAttributes().put("username", message.getSender());

        chatService.addParticipant(roomId, message.getSender());

        // 채팅 히스토리 전송
        List<ChatMessage> history = chatService.getChatHistory(roomId);
        messagingTemplate.convertAndSend(
                String.format("/topic/chat/%d/history", companyId),
                history
        );

        return message;
    }

    @MessageMapping("/chat.sendMessage/{companyId}")
    @SendTo("/topic/chat/{companyId}")
    public ChatMessage sendMessage(@DestinationVariable Long companyId,
                                   @Payload ChatMessage message) {
        chatService.saveMessage(message);
        return message;
    }

    @MessageMapping("/chat.leave/{companyId}")
    @SendTo("/topic/chat/{companyId}")
    public ChatMessage leaveRoom(@DestinationVariable Long companyId,
                                 @Payload ChatMessage message,
                                 SimpMessageHeaderAccessor headerAccessor) {
        String roomId = "company-" + companyId;
        chatService.removeParticipant(roomId, message.getSender());
        headerAccessor.getSessionAttributes().remove("room");
        headerAccessor.getSessionAttributes().remove("username");
        return message;
    }
}