package com.stocktide.stocktideserver.chat.repository;

import com.stocktide.stocktideserver.chat.entity.ChatMessage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findTopByRoomOrderByTimeDesc(String room, Pageable pageable);
}