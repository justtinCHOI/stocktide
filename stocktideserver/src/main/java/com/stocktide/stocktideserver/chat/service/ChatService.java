package com.stocktide.stocktideserver.chat.service;

import com.stocktide.stocktideserver.chat.entity.ChatMessage;
import com.stocktide.stocktideserver.chat.entity.ChatRoom;
import com.stocktide.stocktideserver.chat.entity.UserStatusMessage;
import com.stocktide.stocktideserver.chat.repository.ChatMessageRepository;
import com.stocktide.stocktideserver.chat.repository.ChatRoomRepository;
import com.stocktide.stocktideserver.exception.BusinessLogicException;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.repository.CompanyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.stocktide.stocktideserver.exception.ExceptionCode;

import java.util.ArrayList;
import java.util.List;

/**
 * 실시간 채팅 서비스
 * WebSocket을 사용한 실시간 채팅방 생성, 메시지 전송, 참여자 관리 등의 기능을 제공합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@Service
@Transactional
@Slf4j
public class ChatService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final CompanyRepository companyRepository;
    private final SimpMessageSendingOperations messagingTemplate;

    @Value("${chat.message.history.limit:100}")
    private int messageHistoryLimit;

    @Autowired
    public ChatService(ChatRoomRepository chatRoomRepository,
                       ChatMessageRepository chatMessageRepository,
                       CompanyRepository companyRepository,
                       SimpMessageSendingOperations messagingTemplate
    ) {
        this.chatRoomRepository = chatRoomRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.companyRepository = companyRepository;
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * 채팅방을 생성하거나 기존 채팅방을 반환합니다.
     * 회사 ID를 기반으로 채팅방을 식별합니다.
     *
     * @param companyId 회사 ID
     * @return ChatRoom 생성되거나 조회된 채팅방
     * @throws BusinessLogicException CHAT_ROOM_NOT_FOUND - 채팅방을 찾을 수 없는 경우
     */
    public ChatRoom createOrGetChatRoom(Long companyId) {
        log.info("Creating or getting chat room for company: {}", companyId);

        return chatRoomRepository.findByCompanyCompanyId(companyId)
                .orElseGet(() -> {
                    Company company = companyRepository.findById(companyId)
                            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMPANY_NOT_FOUND));

                    ChatRoom newRoom = ChatRoom.builder()
                            .roomId("company-" + companyId)
                            .name(company.getKorName() + " 채팅방")
                            .company(company)
                            .build();

                    log.info("Created new chat room: {}", newRoom.getRoomId());
                    return chatRoomRepository.save(newRoom);
                });
    }

    /**
     * 채팅방에 참여자를 추가합니다.
     *
     * @param roomId 채팅방 ID
     * @param username 참여자 이름
     */
    public void addParticipant(String roomId, String username) {
        ChatRoom room = chatRoomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHAT_ROOM_NOT_FOUND));

        // 중복 방지
        if (!room.getParticipants().contains(username)) {
            room.getParticipants().add(username);
            chatRoomRepository.save(room);

        }
        messagingTemplate.convertAndSend("/topic/chat/participants",
                new UserStatusMessage("UPDATE", username, new ArrayList<>(room.getParticipants()))
        );
    }

    /**
     * 채팅방에서 참여자를 제거합니다.
     *
     * @param roomId 채팅방 ID
     * @param username 참여자 이름
     */
    public void removeParticipant(String roomId, String username) {
        ChatRoom room = chatRoomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHAT_ROOM_NOT_FOUND));
        room.getParticipants().remove(username);
        chatRoomRepository.save(room);
    }

    /**
     * 채팅방의 모든 참여자 목록을 반환합니다.
     *
     * @param roomId 채팅방 ID
     * @return List<String> 참여자 목록
     */
    public List<String> getParticipants(String roomId) {
        ChatRoom room = chatRoomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHAT_ROOM_NOT_FOUND));

        // Set을 List로 변환
        return new ArrayList<>(room.getParticipants());
    }

    /**
     * 채팅 메시지를 저장합니다.
     *
     * @param message 저장할 채팅 메시지
     * @throws BusinessLogicException CHAT_MESSAGE_ERROR - 메시지 저장 중 오류 발생시
     */
    public void saveMessage(ChatMessage message) {
        chatMessageRepository.save(message);
    }

    /**
     * 채팅방의 이전 대화 내역을 조회합니다.
     *
     * @param roomId 채팅방 ID
     * @param limit 조회할 메시지 수
     * @return List<ChatMessage> 채팅 메시지 목록
     */
    @Transactional(readOnly = true)
    public List<ChatMessage> getChatHistory(String roomId, int limit) {
        log.info("Getting chat history for room: {}", roomId);
        return chatMessageRepository.findTopByRoomOrderByTimeDesc(roomId, PageRequest.of(0, limit));
    }

    // 필요한 경우 참여자 수를 반환하는 메서드도 추가
    public int getParticipantsCount(String roomId) {
        ChatRoom room = chatRoomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHAT_ROOM_NOT_FOUND));

        return room.getParticipants().size();
    }

}