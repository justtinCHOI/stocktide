import { useState, useEffect, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ChatMessage } from '@typings/chat';
import { UseSocketReturn } from '@typings/hooks';


export function useSocket(url: string): UseSocketReturn {
    const [socket, setSocket] = useState<any>(null);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [messages] = useState<ChatMessage[]>([]);
    const [connectedUsers] = useState<string[]>([]);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(url),
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            reconnectDelay: 5000,
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {
                setConnected(true);
                setError(null);
            },
            onDisconnect: () => {
                setConnected(false);
            },
            onStompError: (frame) => {
                setError(new Error(frame.body));
                setConnected(false);
            }
        });

        setSocket(client);

        try {
            client.activate();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to connect'));
        }

        return () => {
            client.deactivate();
        };
    }, [url]);

    const sendMessage = useCallback((chatMessage: ChatMessage) => {
        if (socket && connected && chatMessage.type === 'CHAT') {
            try {
                socket.publish({
                    destination: '/app/chat.sendMessage',
                    body: JSON.stringify(chatMessage)
                });
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to send message'));
            }
        }
    }, [socket, connected]);

    const addUser = useCallback((chatMessage: ChatMessage) => {
        if (socket && connected && chatMessage.type === 'JOIN') {
            socket.publish({
                destination: '/app/chat.addUser',
                body: JSON.stringify(chatMessage)
            });
        }
    }, [socket, connected]);

    return {
        socket,
        connected,
        error,
        messages,
        connectedUsers,
        sendMessage,
        addUser
    };
}