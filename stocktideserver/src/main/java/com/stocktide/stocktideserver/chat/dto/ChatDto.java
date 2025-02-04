package com.stocktide.stocktideserver.chat.dto;

import com.stocktide.stocktideserver.chat.entity.ChatMessage;
import lombok.Data;

import java.util.List;

@Data
public class ChatDto {
    private Long id;
    private String roomId;
    private String content;
    private String sender;
    private String time;
    private ChatMessage.MessageType type;
    private List<String> participants;
    private Long companyId;
}