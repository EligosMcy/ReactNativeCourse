import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Player, AuthTokens } from '../types';

interface AuthState {
  player: Player | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCharacter: boolean;
  setAuth: (player: Player, tokens: AuthTokens) => Promise<void>;
  clearAuth: () => Promise<void>;
  updatePlayer: (player: Partial<Player>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  player: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
  hasCharacter: false,

  setAuth: async (player, tokens) => {
    await AsyncStorage.setItem('tokens', JSON.stringify(tokens));
    await AsyncStorage.setItem('player', JSON.stringify(player));
    set({ player, tokens, isAuthenticated: true });
  },

  clearAuth: async () => {
    await AsyncStorage.removeItem('tokens');
    await AsyncStorage.removeItem('player');
    set({ player: null, tokens: null, isAuthenticated: false });
  },

  updatePlayer: (playerData) => {
    const current = get().player;
    if (current) {
      const updated = { ...current, ...playerData };
      AsyncStorage.setItem('player', JSON.stringify(updated));
      set({ player: updated });
    }
  },
}));

export const initializeAuth = async () => {
  try {
    const tokensStr = await AsyncStorage.getItem('tokens');
    const playerStr = await AsyncStorage.getItem('player');
    
    if (tokensStr && playerStr) {
      const tokens = JSON.parse(tokensStr) as AuthTokens;
      const player = JSON.parse(playerStr) as Player;
      
      if (tokens.expiresAt > Date.now()) {
        useAuthStore.setState({ player, tokens, isAuthenticated: true, isLoading: false });
        return;
      }
    }
  } catch (error) {
    console.error('Failed to initialize auth:', error);
  }
  
  useAuthStore.setState({ isLoading: false });
};
