import { useState, useEffect, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '@typings/chat';
import { UseSocketReturn } from '@typings/hooks';
import {
    setConnectionStatus,
} from "@slices/chatSlice";
import { useDispatch } from 'react-redux';


export function useSocket(url: string): UseSocketReturn {
    const dispatch = useDispatch();

    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [connected] = useState(false);
    const [error] = useState<Error | null>(null);
    const [messages] = useState<ChatMessage[]>([]);
    const [connectedUsers] = useState<string[]>([]);
    const [reconnectAttempts, setReconnectAttempts] = useState<number>(0);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(url),
            onConnect: () => {
                console.log('Connected to WebSocket');
                dispatch(setConnectionStatus('connected'));
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                dispatch(setConnectionStatus('disconnected'));
            },
            onStompError: (frame) => {
                console.error('Stomp error:', frame);
                dispatch(setConnectionStatus('reconnecting'));
            }
        });

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, [url, dispatch]);

    // 재연결 로직 개선
// useSocket.ts
    const reconnectDelay = 2000; // 2초
    const maxReconnectAttempts = 3;

    useEffect(() => {
        if (!connected && reconnectAttempts < maxReconnectAttempts) {
            const timer = setTimeout(() => {
                try {
                    stompClient?.activate();
                    setReconnectAttempts(prev => prev + 1);
                } catch (err) {
                    console.error('Reconnection failed:', err);
                }
            }, reconnectDelay);

            return () => clearTimeout(timer);
        }
    }, [connected, reconnectAttempts]);

    const sendMessage = useCallback((chatMessage: ChatMessage) => {
        if (stompClient && connected && chatMessage.type === 'CHAT') {
            stompClient.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify(chatMessage)
            });
        }
    }, [stompClient, connected]);

    const joinRoom = useCallback((chatMessage: ChatMessage) => {
        if (stompClient && connected) {
            stompClient.publish({
                destination: '/app/chat.joinRoom',
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