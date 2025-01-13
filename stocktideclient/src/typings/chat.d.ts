export interface ChatMessage {
    type: 'CHAT' | 'JOIN' | 'LEAVE';
    content: string;
    sender: string;
    time: string;
}
