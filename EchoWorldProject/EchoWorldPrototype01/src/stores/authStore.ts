import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Player, AuthTokens } from '../types';
import { api } from '../services/api';

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
    console.log('🔐 setAuth: saving auth data', { player, tokens });
    try {
      await AsyncStorage.setItem('tokens', JSON.stringify(tokens));
      await AsyncStorage.setItem('player', JSON.stringify(player));
      api.setAccessToken(tokens.accessToken);
      set({ player, tokens, isAuthenticated: true });
      console.log('🔐 setAuth: auth data saved successfully');
    } catch (error) {
      console.error('🔐 setAuth: failed to save auth data', error);
      throw error;
    }
  },

  clearAuth: async () => {
    console.log('🔐 clearAuth: removing auth data');
    try {
      await AsyncStorage.removeItem('tokens');
      await AsyncStorage.removeItem('player');
      api.clearAccessToken();
      set({ player: null, tokens: null, isAuthenticated: false });
      console.log('🔐 clearAuth: auth data removed successfully');
    } catch (error) {
      console.error('🔐 clearAuth: failed to remove auth data', error);
      throw error;
    }
  },

  updatePlayer: async (playerData) => {
    const current = get().player;
    if (current) {
      const updated = { ...current, ...playerData };
      console.log('🔐 updatePlayer: updating player data', updated);
      try {
        await api.player.updateMe(playerData);
        await AsyncStorage.setItem('player', JSON.stringify(updated));
        console.log('🔐 updatePlayer: player data updated successfully');
        set({ player: updated });
      } catch (error) {
        console.error('🔐 updatePlayer: failed to update player data', error);
        throw error;
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
        api.setAccessToken(tokens.accessToken);
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
