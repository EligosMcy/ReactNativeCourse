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
  updatePlayer: (player: Partial<Player>) => Promise<void>;
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

  updatePlayer: async (playerData) => {
    const current = get().player;
    if (current) {
      const updated = { ...current, ...playerData };
      console.log('🔐 updatePlayer: updating player data', updated);
      try {
        await AsyncStorage.setItem('player', JSON.stringify(updated));
        console.log('🔐 updatePlayer: player data saved to AsyncStorage');
        set({ player: updated });
        console.log('🔐 updatePlayer: player state updated');
      } catch (error) {
        console.error('🔐 updatePlayer: failed to save player data', error);
      }
    } else {
      console.log('🔐 updatePlayer: no current player found');
    }
  },
}));

export const initializeAuth = async () => {
  console.log('🔐 initializeAuth started');
  
  try {
    const tokensStr = await AsyncStorage.getItem('tokens');
    const playerStr = await AsyncStorage.getItem('player');
    
    console.log('🔐 Tokens found:', !!tokensStr);
    console.log('🔐 Player found:', !!playerStr);
    
    if (tokensStr && playerStr) {
      const tokens = JSON.parse(tokensStr) as AuthTokens;
      const player = JSON.parse(playerStr) as Player;
      
      console.log('🔐 Tokens expiresAt:', tokens.expiresAt);
      console.log('🔐 Current time:', Date.now());
      console.log('🔐 Tokens valid:', tokens.expiresAt > Date.now());
      
      if (tokens.expiresAt > Date.now()) {
        console.log('🔐 Setting authenticated state');
        useAuthStore.setState({ player, tokens, isAuthenticated: true, isLoading: false });
        return;
      } else {
        console.log('🔐 Tokens expired, setting unauthenticated');
      }
    } else {
      console.log('🔐 No tokens or player found');
    }
  } catch (error) {
    console.error('🔐 Failed to initialize auth:', error);
  }
  
  console.log('🔐 Setting isLoading to false');
  useAuthStore.setState({ isLoading: false });
};
