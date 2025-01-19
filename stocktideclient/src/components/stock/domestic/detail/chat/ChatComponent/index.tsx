import React, { useState, useRef, useEffect } from 'react';
import { RootState } from '@/store';
import {
    Container,
    ChatHeader,
    CompanyName,
    ParticipantCount,
    MessagesContainer,
    MessageItem,
    MessageContent,
    SenderName,
    MessageText,
    MessageTime,
    ChatInput,
    ParticipantItem,
    ParticipantsList,
} from './styles';
import { ChatMessage } from "@typings/chat";
import { useDispatch, useSelector } from 'react-redux';
import {
    // joinChat,
    addMessage, setConnectionStatus,
    updateParticipants,
} from '@slices/chatSlice';
import { useSocket } from '@hooks/useSocket';
import useGetStockInfo from '@hooks/useGetStockInfo';
import useCustomMember from '@hooks/useCustomMember';

interface ChatComponentProps {
    companyId: number;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ companyId }) => {
    const dispatch = useDispatch();
    const {stockInfo: company} = useGetStockInfo(companyId);
    const { loginState } = useCustomMember();
    const chatState = useSelector((state: RootState) => state.chatSlice);
    const [message, setMessage] = useState('');
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const participants = useSelector((state: RootState) => state.chatSlice.participants);
    const connectionStatus = useSelector((state: RootState) => state.chatSlice.connectionStatus);

    const { stompClient, connected, error, sendMessage } = useSocket(
      `${import.meta.env.VITE_WS_URL}/ws-stocktide`, companyId
    );

    useEffect(() => {
        if (connected && stompClient) {
            // 구독 설정
            const chatSubscription = stompClient.subscribe(
              `/topic/chat/${companyId}`,
              (message: any) => {
                  const chatMessage = JSON.parse(message.body);
                  dispatch(addMessage(chatMessage));
              }
            );

            // 사용자 목록 구독
            const usersSubscription = stompClient.subscribe(
              `/topic/users`,
              (message: any) => {
                  const data = JSON.parse(message.body);
                  dispatch(updateParticipants(data.connectedUsers));
                  if (data.type === 'CONNECTED') {
                      setConnectionStatus('connected');
                  }
              }
            );

            // 채팅방 참여 메시지 전송
            const joinMessage = {
                type: 'JOIN',
                content: `${loginState.name} joined the chat`,
                sender: loginState.name,
                time: new Date().toLocaleTimeString(),
                room: `company-${companyId}`
            };

            stompClient.publish({
                destination: '/app/chat.joinRoom',
                body: JSON.stringify(joinMessage)
            });

            return () => {
                chatSubscription.unsubscribe();
                usersSubscription.unsubscribe();
            };
        }
    }, [connected, stompClient, companyId, loginState.name]);

    // 에러 처리 및 재연결
    useEffect(() => {
        if (error && reconnectAttempts < 3) {
            const timer = setTimeout(() => {
                setReconnectAttempts(prev => prev + 1);
                stompClient?.activate();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, reconnectAttempts, stompClient]);

    // 메시지 스크롤 자동이동
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [chatState.messages]);

    // 메시지 전송 핸들러
    const handleSendMessage = (event: React.FormEvent) => {
        event.preventDefault();
        if (message.trim() && chatState.isJoined) {
            const chatMessage: ChatMessage = {
                type: 'CHAT',
                content: message,
                sender: loginState.name,
                time: new Date().toLocaleTimeString(),
                room: `company-${companyId}`
            };
            sendMessage(chatMessage);
            setMessage('');
        }
    };

    // 구독 설정
    useEffect(() => {
        if (stompClient && connected) {
            const subscription = stompClient.subscribe(`/topic/chat/${companyId}`, (message: any) => {
                const chatMessage = JSON.parse(message.body);
                dispatch(addMessage(chatMessage));
            });

            const participantsSub = stompClient.subscribe(`/topic/users`, (message: any) => {
                const data = JSON.parse(message.body);
                dispatch(updateParticipants(data.connectedUsers));
            });

            return () => {
                subscription.unsubscribe();
                participantsSub.unsubscribe();
            };
        }
    }, [stompClient, connected, companyId, dispatch]);

    return (
      <Container>
          <ChatHeader>
              <CompanyName>{company?.korName} 채팅방</CompanyName>
              <ParticipantCount>
                  {/*{connectionStatus}*/}
                      {connectionStatus === 'connected'
                        ? `참여자 ${participants.length}명`
                        : connectionStatus === 'reconnecting'
                          ? '연결 중...'
                          : '연결 끊김'}
              </ParticipantCount>
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