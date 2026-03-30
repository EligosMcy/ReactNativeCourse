import { create } from 'zustand';
import type { Message } from '../types';
import { api } from '../services/api';

interface ChatState {
  messages: Record<string, Message[]>;
  isLoading: boolean;
  prependMessages: (characterId: string, messages: Message[]) => void;
  appendMessage: (characterId: string, message: Message) => void;
  updateMessageStatus: (characterId: string, messageId: string, status: Message['status']) => void;
  markAsRead: (characterId: string) => void;
  loadMessages: (characterId: string, limit?: number) => Promise<void>;
  sendMessage: (characterId: string, content: string) => Promise<Message>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: {},
  isLoading: false,

  prependMessages: (characterId, newMessages) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [characterId]: [...newMessages, ...(state.messages[characterId] || [])],
      },
    }));
  },

  appendMessage: (characterId, message) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [characterId]: [...(state.messages[characterId] || []), message],
      },
    }));
  },

  updateMessageStatus: (characterId, messageId, status) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [characterId]: (state.messages[characterId] || []).map((msg) =>
          msg.id === messageId ? { ...msg, status } : msg
        ),
      },
    }));
  },

  markAsRead: (characterId) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [characterId]: (state.messages[characterId] || []).map((msg) =>
          msg.sender === 'player' && msg.status !== 'read' ? { ...msg, status: 'read' as const } : msg
        ),
      },
    }));
  },

  loadMessages: async (characterId: string, limit: number = 30) => {
    console.log('💬 loadMessages: loading messages for', characterId);
    set({ isLoading: true });
    
    try {
      const messages = await api.messages.getList(characterId, limit);
      console.log('💬 loadMessages: loaded', messages.length, 'messages');
      get().prependMessages(characterId, messages);
    } catch (error) {
      console.error('💬 loadMessages: failed to load messages', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  sendMessage: async (characterId: string, content: string) => {
    console.log('💬 sendMessage: sending message to', characterId, ':', content);
    
    const pendingMessage: Message = {
      id: `pending-${Date.now()}`,
      characterId,
      sender: 'player',
      content,
      timestamp: new Date().toISOString(),
      status: 'sending',
    };
    
    get().appendMessage(characterId, pendingMessage);
    
    try {
      const sentMessage = await api.messages.send(characterId, content);
      console.log('💬 sendMessage: message sent successfully', sentMessage);
      
      get().updateMessageStatus(characterId, pendingMessage.id, 'sent');
      return sentMessage;
    } catch (error) {
      console.error('💬 sendMessage: failed to send message', error);
      get().updateMessageStatus(characterId, pendingMessage.id, 'failed');
      throw error;
    }
  },
}));
