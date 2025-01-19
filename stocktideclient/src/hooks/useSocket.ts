import { useState, useEffect, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '@typings/chat';
import { UseSocketReturn } from '@typings/hooks';
import {
    // addMessage,
    setConnectionStatus,
} from '@slices/chatSlice';
import { useDispatch } from 'react-redux';
import useCustomMember from '@hooks/useCustomMember';


export function useSocket(url: string, companyId: number): UseSocketReturn {
    const dispatch = useDispatch();
    const { loginState } = useCustomMember();

    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [connected] = useState(false);
    const [error] = useState<Error | null>(null);
    const [messages] = useState<ChatMessage[]>([]);
    const [connectedUsers] = useState<string[]>([]);
    // const [reconnectAttempts, setReconnectAttempts] = useState<number>(0);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(url),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('Connected to WebSocket');
                dispatch(setConnectionStatus('connected'));

                try {
                    client.publish({
                        destination: `/app/chat.joinRoom/${companyId}`,
                        body: JSON.stringify({
                            type: 'JOIN',
                            content: `${loginState.name}님이 입장했습니다.`,
                            sender: loginState.name,
                            time: new Date().toLocaleTimeString(),
                            room: `company-${companyId}`
                        })
                    });
                    console.log('Join message sent successfully');
                } catch (error) {
                    console.error('Failed to send join message', error);
                }

                // 연결 즉시 서버에 참여자 목록 요청
                client.publish({
                    destination: `/app/chat.getParticipants/${companyId}`,
                    body: JSON.stringify({
                        type: 'JOIN',
                        room: `company-${companyId}`,
                    })
                });
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                dispatch(setConnectionStatus('disconnected'));

                // 재연결 시도
                setTimeout(() => {
                    if (stompClient) {
                        stompClient.activate();
                    }
                }, 5000);
            }
        });

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, [url, dispatch]);

    const sendMessage = useCallback((chatMessage: ChatMessage) => {
        if (stompClient && connected && chatMessage.type === 'CHAT') {
            stompClient.publish({
                destination: `/app/chat.sendMessage/${companyId}`,
                body: JSON.stringify(chatMessage)
            });
        }
    }, [stompClient, connected]);

    const joinRoom = useCallback((chatMessage: ChatMessage) => {
        if (stompClient && connected) {
            stompClient.publish({
                destination: `/app/chat.joinRoom/${companyId}`,
                body: JSON.stringify(chatMessage)
            });
        }
    }, [stompClient, connected]);

    return {
        stompClient,
        connected,
        error,
        messages,
        connectedUsers,
        sendMessage,
        joinRoom
    };
}