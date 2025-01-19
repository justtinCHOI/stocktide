package com.stocktide.stocktideserver.chat.repository;

import com.stocktide.stocktideserver.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findByCompanyCompanyId(Long companyId);
    Optional<ChatRoom> findByRoomId(String roomId);
}