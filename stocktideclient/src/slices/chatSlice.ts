import { createSlice } from '@reduxjs/toolkit';
import { ChatMessage } from '@typings/chat';

const initState: ChatSliceState = {
  isJoined: false,
  currentRoom: '',
  username: '',
  messages: [],
  participants: [],
  connectionStatus: 'disconnected'
};

export interface ChatSliceState {
  isJoined: boolean;
  currentRoom: string;
  username: string;
  messages: ChatMessage[];
  participants: string[];
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
}

const chatSlice = createSlice({
  name: 'chat',
  initialState:  initState,
  reducers: {
    joinChat: (state, action) => {
      state.isJoined = true;
      state.currentRoom = action.payload.room;
      state.username = action.payload.username;
    },
    leaveChat: (state) => {
      state.isJoined = false;
      state.currentRoom = '';
      state.username = '';
      state.messages = [];
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
    },
    updateParticipants: (state, action) => {
      state.participants = action.payload;
      if (action.payload.length > 0) {
        state.connectionStatus = 'connected';
      }
    },
  }
});
export const {
  joinChat,
  leaveChat,
  addMessage,
  setMessages,
  updateParticipants,
  setConnectionStatus,
} = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
