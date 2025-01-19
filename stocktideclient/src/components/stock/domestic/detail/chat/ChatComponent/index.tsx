import React, { useState, useRef, useEffect } from 'react';
import { RootState } from '@/store';
import {
    Container,ChatHeader, CompanyName,
    ParticipantCount,
    ReconnectingIndicator,
    MessagesContainer, MessageItem, MessageContent,
    SenderName, MessageText, MessageTime, ChatInput,
} from './styles';
import {ChatMessage} from "@typings/chat";
import { useDispatch, useSelector } from 'react-redux';
import {
    joinChat,
    leaveChat,
} from "@slices/chatSlice";
import { useSocket } from '@hooks/useSocket';
import useGetStockInfo from '@hooks/useGetStockInfo';


const ChatComponent: React.FC<{companyId: string}> = ({ companyId }) => {
    const dispatch = useDispatch();
    const {stockInfo: company} = useGetStockInfo();
    const loginState = useSelector((state: RootState) => state.memberSlice.member);
    const chatState = useSelector((state: RootState) => state.chatSlice);
    const [message, setMessage] = useState('');
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const messageContainerRef = useRef<HTMLDivElement>(null);

    const { socket, connected, error } = useSocket(
      `${import.meta.env.VITE_WS_URL}/ws-stocktide`
    );

    useEffect(() => {
        if (connected && loginState?.name && !chatState.isJoined) {
            handleJoinRoom();
        }
    }, [connected, loginState, companyId]);

    useEffect(() => {
        if (error && reconnectAttempts < 3) {
            const timer = setTimeout(() => {
                setReconnectAttempts(prev => prev + 1);
                socket.connect();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, reconnectAttempts]);

    const handleJoinRoom = () => {
        const joinMessage: ChatMessage = {
            type: 'JOIN',
            content: `${loginState.name} joined the chat`,
            sender: loginState.name,
            time: new Date().toLocaleTimeString(),
            room: `company-${companyId}`
        };

        socket.emit('join', joinMessage);
        dispatch(joinChat({
            room: `company-${companyId}`,
            username: loginState.name
        }));
    };

    const handleLeaveRoom = () => {
        const leaveMessage: ChatMessage = {
            type: 'LEAVE',
            content: `${loginState.name} left the chat`,
            sender: loginState.name,
            time: new Date().toLocaleTimeString(),
            room: `company-${companyId}`
        };

        socket.emit('leave', leaveMessage);
        dispatch(leaveChat());
    };

    return (
      <Container>
          <ChatHeader>
              <CompanyName>{company?.korName} 채팅방</CompanyName>
              <ParticipantCount>
                  참여자 {chatState.participants.length}명
              </ParticipantCount>
              {chatState.connectionStatus !== 'connected' && (
                <ReconnectingIndicator>
                    재연결 중... ({reconnectAttempts}/3)
                </ReconnectingIndicator>
              )}
          </ChatHeader>

          <MessagesContainer ref={messageContainerRef}>
              {chatState.messages.map((msg, index) => (
                <MessageItem
                  key={index}
                  $isMine={msg.sender === loginState.name}
                  $isSystem={msg.type !== 'CHAT'}
                >
                    <MessageContent>
                        <SenderName>{msg.sender}</SenderName>
                        <MessageText>{msg.content}</MessageText>
                        <MessageTime>{msg.time}</MessageTime>
                    </MessageContent>
                </MessageItem>
              ))}
          </MessagesContainer>

          <ParticipantsList>
              {chatState.participants.map((participant, index) => (
                <ParticipantItem key={index}>
                    {participant}
                </ParticipantItem>
              ))}
          </ParticipantsList>

          <ChatInput onSubmit={handleSendMessage}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
                disabled={chatState.connectionStatus !== 'connected'}
              />
              <button
                type="submit"
                disabled={chatState.connectionStatus !== 'connected'}
              >
                  전송
              </button>
          </ChatInput>
      </Container>
    );
};

export default ChatComponent;