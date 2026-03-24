import { create } from 'zustand';
import type { Message } from '../types';

interface ChatState {
  messages: Record<string, Message[]>;
  prependMessages: (characterId: string, messages: Message[]) => void;
  appendMessage: (characterId: string, message: Message) => void;
  updateMessageStatus: (characterId: string, messageId: string, status: Message['status']) => void;
  markAsRead: (characterId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: {},

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
}));
