package com.stocktide.stocktideserver.chat.service;

import com.stocktide.stocktideserver.chat.entity.ChatMessage;
import com.stocktide.stocktideserver.chat.entity.ChatRoom;
import com.stocktide.stocktideserver.chat.repository.ChatMessageRepository;
import com.stocktide.stocktideserver.chat.repository.ChatRoomRepository;
import com.stocktide.stocktideserver.exception.BusinessLogicException;
import com.stocktide.stocktideserver.stock.entity.Company;
import com.stocktide.stocktideserver.stock.repository.CompanyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Slf4j
public class ChatService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final CompanyRepository companyRepository;

    public ChatService(ChatRoomRepository chatRoomRepository, ChatMessageRepository chatMessageRepository, CompanyRepository companyRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.companyRepository = companyRepository;
    }

    @Value("${chat.message.history.limit:100}")
    private int messageHistoryLimit;

    public ChatRoom getOrCreateRoom(Long companyId) {
        return chatRoomRepository.findByCompanyCompanyId(companyId)
                .orElseGet(() -> {
                    Company company = companyRepository.findById(companyId)
                            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMPANY_NOT_FOUND));

                    ChatRoom newRoom = new ChatRoom();
                    newRoom.setCompany(company);
                    newRoom.setName(company.getKorName() + " 채팅방");
                    return chatRoomRepository.save(newRoom);
                });
    }

    public List<ChatMessage> getChatHistory(String roomId) {
        return chatMessageRepository.findTopByRoomOrderByTimeDesc(roomId, messageHistoryLimit);
    }

    public void saveMessage(ChatMessage message) {
        chatMessageRepository.save(message);
    }

    public void addParticipant(String roomId, String username) {
        ChatRoom room = chatRoomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHAT_ROOM_NOT_FOUND));
        room.getParticipants().add(username);
        chatRoomRepository.save(room);
    }

    public void removeParticipant(String roomId, String username) {
        ChatRoom room = chatRoomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHAT_ROOM_NOT_FOUND));
        room.getParticipants().remove(username);
        chatRoomRepository.save(room);
    }
}