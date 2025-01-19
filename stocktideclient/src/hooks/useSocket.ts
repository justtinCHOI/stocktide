import { useState, useEffect, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '@typings/chat';
import { UseSocketReturn } from '@typings/hooks';
import {
    // addMessage,
    setConnectionStatus, updateParticipants,
} from '@slices/chatSlice';
import { useDispatch } from 'react-redux';
import useCustomMember from '@hooks/useCustomMember';
import { toast } from 'react-toastify';


export function useSocket(url: string, companyId: number): UseSocketReturn {
    const dispatch = useDispatch();
    const { loginState } = useCustomMember();

    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [connected, setConnected] = useState(false);
    const [error] = useState<Error | null>(null);
    const [messages] = useState<ChatMessage[]>([]);
    const [connectedUsers] = useState<string[]>([]);
    const [participants, setParticipants] = useState<string[]>([]);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(url),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('Connected to WebSocket');
                setConnected(true);
                dispatch(setConnectionStatus('connected'));

                // 참여자 목록 구독
                client.subscribe(
                  `/topic/chat/participants`,
                  (message) => {
                      const statusMessage = JSON.parse(message.body);
                      // console.log('Participants Message:', statusMessage);
                      setParticipants(statusMessage.connectedUsers || []);
                      dispatch(updateParticipants(participants));
                  }
                );

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

            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                dispatch(setConnectionStatus('disconnected'));
                setConnected(false);

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
            try {
                stompClient.publish({
                    destination: `/app/chat.sendMessage/${companyId}`,
                    body: JSON.stringify(chatMessage)
                });
                console.log('Message sent successfully');
            } catch (error) {
                console.error('Failed to send message:', error);
                // 추가적인 에러 처리 로직 (예: 사용자에게 알림)
                toast.error('메시지 전송에 실패했습니다.');
            }
        }
    }, [stompClient, connected, companyId]);


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
        joinRoom,
        participants
    };
}