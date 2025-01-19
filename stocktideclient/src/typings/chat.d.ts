export interface ChatMessage {
    type: 'CHAT' | 'JOIN' | 'LEAVE' | 'ERROR';
    content: string;
    sender: string;
    time: string;
    room: string;
}
