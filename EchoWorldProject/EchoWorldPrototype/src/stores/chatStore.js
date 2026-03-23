import { create } from 'zustand';
import { MessageType, MessageSender, MessageStatus } from '../types';

export const useChatStore = create((set, get) => ({
  messages: {},
  loading: false,
  hasMore: true,

  fetchMessages: async (characterId) => {
    set({ loading: true });
    try {
      const mockMessages = [
        {
          id: '1',
          characterId,
          content: '你好！很高兴认识你。',
          type: MessageType.TEXT,
          sender: MessageSender.CHARACTER,
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          status: MessageStatus.READ
        },
        {
          id: '2',
          characterId,
          content: '今天天气真好，你在做什么呢？',
          type: MessageType.TEXT,
          sender: MessageSender.CHARACTER,
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          status: MessageStatus.READ
        },
        {
          id: '3',
          characterId,
          content: '我在学习React Native开发',
          type: MessageType.TEXT,
          sender: MessageSender.USER,
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          status: MessageStatus.READ
        },
        {
          id: '4',
          characterId,
          content: '太棒了！React Native很有趣，我也想学习。',
          type: MessageType.TEXT,
          sender: MessageSender.CHARACTER,
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          status: MessageStatus.READ
        }
      ];
      set(state => ({
        messages: {
          ...state.messages,
          [characterId]: mockMessages
        },
        loading: false
      }));
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      set({ loading: false });
    }
  },

  sendMessage: async (characterId, content) => {
    const newMessage = {
      id: Date.now().toString(),
      characterId,
      content,
      type: MessageType.TEXT,
      sender: MessageSender.USER,
      timestamp: new Date(),
      status: MessageStatus.SENDING
    };

    set(state => ({
      messages: {
        ...state.messages,
        [characterId]: [newMessage, ...(state.messages[characterId] || [])]
      }
    }));

    setTimeout(() => {
      set(state => ({
        messages: {
          ...state.messages,
          [characterId]: state.messages[characterId].map(msg =>
            msg.id === newMessage.id ? { ...msg, status: MessageStatus.SENT } : msg
          )
        }
      }));

      setTimeout(() => {
        const replyMessage = {
          id: (Date.now() + 1).toString(),
          characterId,
          content: '收到你的消息了！这是一条自动回复。',
          type: MessageType.TEXT,
          sender: MessageSender.CHARACTER,
          timestamp: new Date(),
          status: MessageStatus.SENT
        };

        set(state => ({
          messages: {
            ...state.messages,
            [characterId]: [replyMessage, ...state.messages[characterId]]
          }
        }));
      }, 2000);
    }, 1000);
  },

  getMessages: (characterId) => {
    return get().messages[characterId] || [];
  }
}));