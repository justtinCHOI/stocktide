import { useState, useEffect, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ChatMessage } from '@typings/chat';
import { toast } from 'react-toastify';

interface UseSocketReturn {
    stompClient: Client | null;
    messages: ChatMessage[];
    connectedUsers: string[];
    sendMessage: (chatMessage: ChatMessage) => void;
    addUser: (chatMessage: ChatMessage) => void;
}

export function useSocket(): UseSocketReturn {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [connectedUsers, setConnectedUsers] = useState<string[]>([]);

    useEffect(() => {
        // STOMP 클라이언트 설정
        const client = new Client({
            // WebSocket 연결 설정
            webSocketFactory: () => new SockJS(`${import.meta.env.VITE_WS_URL}/ws-stocktide`),
            // 하트비트 설정
            heartbeatIncoming: 4000, // 서버로부터 4초마다 하트비트 수신 기대
            heartbeatOutgoing: 4000, // 4초마다 서버로 하트비트 전송
            reconnectDelay: 5000, // 연결이 끊어졌을 때 5초 후 재연결 시도
            debug: (str) => {
                console.log(str);
            },

            // 연결 성공 시 콜백
            onConnect: () => {
                console.log('WebSocket Connected');
                if (client.connected) {
                    // 접속자 목록 구독
                    client.subscribe('/topic/users', (message) => {
                        const statusUpdate = JSON.parse(message.body);
                        console.log('Users update received:', statusUpdate);
                        setConnectedUsers(statusUpdate.connectedUsers);

                        if (statusUpdate.type === 'CONNECTED') {
                            toast.info(`${statusUpdate.username} joined the chat`);
                        } else if (statusUpdate.type === 'DISCONNECTED') {
                            toast.info(`${statusUpdate.username} left the chat`);
                        }
                    });

                    // 메시지 구독
                    client.subscribe('/topic/public', (message) => {
                        const newMessage = JSON.parse(message.body);
                        // console.log('Received new message:', newMessage);

                        setMessages(prev => {
                            const updated = [...prev, newMessage];
                            // console.log('Updated messages:', updated);
                            return updated;
                        });
                    });

                }
            },
            onDisconnect: () => {
                console.log('WebSocket Disconnected');
            },
            onStompError: (frame) => {
                console.error('STOMP error:', frame);
            }
        });

        setStompClient(client);

        try {
            client.activate();
        } catch (error) {
            console.error('Failed to connect:', error);
        }

        return () => {
            client.deactivate().then();
        };
    }, []);

    const sendMessage = useCallback((chatMessage: ChatMessage) => {
        if (stompClient && stompClient.connected && chatMessage.type === 'CHAT') {
            try {
                stompClient.publish({
                    destination: '/app/chat.sendMessage',
                    body: JSON.stringify(chatMessage)
                });
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    }, [stompClient]);

    const addUser = useCallback((chatMessage: ChatMessage) => {
        if (stompClient && stompClient.connected && chatMessage.type === 'JOIN') {
            stompClient.publish({
                destination: '/app/chat.addUser',
                body: JSON.stringify(chatMessage)
            });
        }
    }, [stompClient]);

    return {
        stompClient,
        messages,
        connectedUsers,
        sendMessage,
        addUser
    };
}