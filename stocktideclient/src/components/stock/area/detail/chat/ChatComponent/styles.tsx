import styled from 'styled-components';

export const Container = styled.div`
    background: #f5f5f5;
`;

export const ChatHeader = styled.div`
    padding: 1rem;
    background: #fff;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const CompanyName = styled.h1`
  font-size: 1.2rem;  
  font-weight: 600;
  margin: 0;
  color: #333;
`;

export const ParticipantCount = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-left: auto;
`;

export const ReconnectingIndicator = styled.div`
    color: #f44336;
    font-size: 0.8rem;
`;

export const MessagesContainer = styled.div`
    height: calc(100vh - 380px);
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const MessageItem = styled.div<{ $isMine: boolean; $isSystem: boolean }>`
    display: flex;
    justify-content: ${props => props.$isMine ? 'flex-end' : 'flex-start'};
    margin: ${props => props.$isSystem ? '0.5rem 0' : '0'};

    ${props => props.$isSystem && `
    justify-content: center;
    color: #666;
    font-style: italic;
  `}
`;

export const ParticipantsList = styled.div`
    padding: 0.5rem;
    background: #fff;
    border-top: 1px solid #ddd;
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const ParticipantItem = styled.div`
    padding: 0.25rem 0.5rem;
    background: #e3f2fd;
    border-radius: 12px;
    font-size: 0.8rem;
    white-space: nowrap;
`;

export const MessageContent = styled.div`
    background: white;
    padding: 10px 15px;
    border-radius: 8px;
    max-width: 70%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const SenderName = styled.div`
    font-weight: bold;
    font-size: 0.9em;
    color: #666;
`;

export const MessageText = styled.div`
    margin: 5px 0;
    word-break: break-word; // 긴 메시지 처리
    color: #333;           // 메시지 텍스트 색상
    font-size: 1rem;      // 메시지 텍스트 크기
    line-height: 1.5;     // 줄 간격
`;


export const MessageTime = styled.div`
    font-size: 0.8em;
    color: #999;
`;

export const ChatInput = styled.form`
    display: flex;
    padding: 1rem;
    gap: 0.5rem;
    background: #fff;
    border-top: 1px solid #ddd;

    input {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 0.9rem;

        &:disabled {
            background-color: #f5f5f5;
            cursor: not-allowed;
        }
    }

    button {
        padding: 0.5rem 1rem;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover:not(:disabled) {
            background: #0056b3;
        }

        &:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
    }
`;