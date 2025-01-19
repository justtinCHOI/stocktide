import { useState, useEffect, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '@typings/chat';
import { UseSocketReturn } from '@typings/hooks';

export function useSocket(url: string): UseSocketReturn {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [messages] = useState<ChatMessage[]>([]);
    const [connectedUsers] = useState<string[]>([]);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(url),
            onConnect: () => {
                console.log('Connected to WebSocket');
                setConnected(true);
                setError(null);
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                setConnected(false);
            },
            onStompError: (frame) => {
                console.error('Stomp error:', frame);
                setError(new Error(frame.body));
            }
        });

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, [url]);

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