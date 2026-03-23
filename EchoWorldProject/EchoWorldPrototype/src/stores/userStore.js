import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  user: {
    id: 'user1',
    name: '玩家',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    email: 'player@example.com'
  },
  preferences: {
    notifications: true,
    language: 'zh-CN',
    theme: 'light'
  },

  updateUser: (userData) => {
    set(state => ({
      user: {
        ...state.user,
        ...userData
      }
    }));
  },

  updatePreferences: (preferences) => {
    set(state => ({
      preferences: {
        ...state.preferences,
        ...preferences
      }
    }));
  },

  signOut: () => {
    set({
      user: null,
      preferences: {
        notifications: true,
        language: 'zh-CN',
        theme: 'light'
      }
    });
  }
}));