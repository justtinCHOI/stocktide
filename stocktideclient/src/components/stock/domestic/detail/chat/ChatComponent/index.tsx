import React, { useState, useRef, useEffect } from 'react';
import { useSocket } from '@hooks/useSocket.ts';
import {
    ChatInput,
    Container,
    MessageContent,
    MessageItem,
    MessagesContainer,
    MessageText,
    MessageTime,
    SenderName, UsersContainer,
} from "./styles";
import {ChatMessage} from "@typings/chat";

const ChatComponent: React.FC = () => {
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [join, setJoin] = useState(false);
    const { messages, connectedUsers, sendMessage, addUser } = useSocket();

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // 유저 등록 핸들러
    const handleUsernameSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (username.trim()) {
            const joinMessage: ChatMessage = {
                type: 'JOIN',
                content: `${username} joined the chat`,
                sender: username,
                time: new Date().toLocaleTimeString()
            };
            addUser(joinMessage);
            setJoin(true);
        }
    };

    // 메시지 전송 핸들러
    const handleSendMessage = (event: React.FormEvent) => {
        event.preventDefault();
        if (message.trim()) {
            // 메시지 객체 생성
            const chatMessage: ChatMessage = {
                type: 'CHAT', // 리터럴 타입으로 지정
                content: message,
                sender: username,
                time: new Date().toLocaleTimeString()
            };
            sendMessage(chatMessage); // 웹소켓으로 메시지 전송
            setMessage('');  // 입력창 초기화
        }
    };

    return (
        <Container>
            {!join ? (
                <Container>
                    <form onSubmit={handleUsernameSubmit}>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button type="submit">Join Chat</button>
                    </form>
                </Container>
                ) : (
                <>
                    <UsersContainer>
                        <h3>Connected Users ({connectedUsers.length})</h3>
                        <ul>
                            {connectedUsers.map((user, index) => (
                                <li key={index}>{user}</li>
                            ))}
                        </ul>
                    </UsersContainer>
                    <MessagesContainer ref={messageContainerRef}>
                        {messages.map((msg, index) => (
                            <MessageItem
                                key={index}
                                $isCurrentUser={msg.sender === username}
                            >
                                <MessageContent>
                                    <SenderName>{msg.sender}</SenderName>
                                    <MessageText>
                                        {msg.content || '(no content)'}
                                    </MessageText>
                                    <MessageTime>{msg.time}</MessageTime>
                                </MessageContent>
                            </MessageItem>
                        ))}
                    </MessagesContainer>
                    <form onSubmit={handleSendMessage}>
                        <ChatInput>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button type="submit">Send</button>
                        </ChatInput>
                    </form>
                </>
                )}
        </Container>
    );
};

export default ChatComponent;