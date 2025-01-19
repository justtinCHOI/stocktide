package com.stocktide.stocktideserver.websocket;

import com.stocktide.stocktideserver.chat.entity.UserStatusMessage;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Log4j2
@Component
public class WebSocketEventListener {
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    // 동시성을 고려한 연결된 사용자 목록 관리
    private final Set<String> connectedUsers = ConcurrentHashMap.newKeySet();

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        // Principal에서 사용자 정보 추출
        String username = headerAccessor.getUser() != null ?
                headerAccessor.getUser().getName() : null;

        // 기존 코드에 추가
        if (username != null) {
            // UUID 대신 실제 사용자 이름 저장
            log.info("User connected: " + username);
            connectedUsers.add(username);  // UUID 대신 실제 이름 추가

            // 참여자 목록 브로드캐스트
            messagingTemplate.convertAndSend("/topic/users",
                    new UserStatusMessage("CONNECTED", username, new ArrayList<>(connectedUsers)));
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = null;

        if (headerAccessor.getSessionAttributes() != null) {
            username = (String) headerAccessor.getSessionAttributes().get("username");
        } else if (headerAccessor.getUser() != null) {
            username = headerAccessor.getUser().getName();
        }

        if (username != null) {
            connectedUsers.remove(username);
            messagingTemplate.convertAndSend("/topic/users",
                    new UserStatusMessage("DISCONNECTED", username, new ArrayList<>(connectedUsers)));
        }
    }

    @EventListener
    public void handleWebSocketConnect(SessionConnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        log.info("WebSocket Connection attempt - Session ID: {}",
                headerAccessor.getSessionId());
    }

    @EventListener
    public void handleSubscribe(SessionSubscribeEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        String destination = headerAccessor.getDestination();

        log.info("New subscription - Session ID: {}, Destination: {}",
                sessionId, destination);
    }
}