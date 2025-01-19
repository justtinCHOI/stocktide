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
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Log4j2
@Component
public class WebSocketEventListener {
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    // 동시성을 고려한 연결된 사용자 목록 관리
    private final Set<String> connectedUsers = ConcurrentHashMap.newKeySet();

    private String determineUsername(StompHeaderAccessor headerAccessor) {
        // 헤더나 세션 속성에서 실제 사용자명 추출
        String username = null;

        // 1. 로그인 사용자 정보 확인
        if (headerAccessor.getUser() != null) {
            username = headerAccessor.getUser().getName();
        }

        // 2. 세션 속성에서 사용자명 확인
        if (username == null && headerAccessor.getSessionAttributes() != null) {
            username = (String) headerAccessor.getSessionAttributes().get("username");
        }

        // 3. 추가 로직: 인증 토큰에서 사용자명 추출 가능

        return username;
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        // 실제 사용자 이름 추출 로직 개선
        String username = determineUsername(headerAccessor);

        if (username != null) {
            log.info("User connected: " + username);
            connectedUsers.add(username);

            // 채팅방 참여자 명시적 추가
            messagingTemplate.convertAndSend("/topic/chat/users",
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