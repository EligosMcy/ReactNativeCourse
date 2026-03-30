import type { Player, AuthTokens, Character, Message, TimelinePost, LifeStage } from '../types';

const API_BASE_URL = 'https://showx-api-server-820411680197.us-west1.run.app';

class ApiService {
  private accessToken: string | null = null;

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  clearAccessToken() {
    this.accessToken = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const url = `${API_BASE_URL}${endpoint}`;

    console.log(`[API Request] ${options.method || 'GET'} ${url}`);
    if (options.body) {
      console.log(`[API Request Body]`, JSON.parse(options.body));
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log(`[API Response] ${response.status} ${url}`);
      console.log(`[API Response Headers]`, response.headers);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`[API Error] ${response.status}: ${JSON.stringify(errorData, null, 2)}`);
        throw new Error(errorData.error?.message || errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`[API Success] ${url}`, data);
      return data;
    } catch (error) {
      console.error(`[API Request Failed] ${url}`, error);
      throw error;
    }
  }

  auth = {
    register: async (email: string, password: string) => {
      return this.request<{ player: Player; tokens: AuthTokens }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },

    login: async (email: string, password: string) => {
      return this.request<{ player: Player; tokens: AuthTokens }>('/api/auth/login/password', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },

    verifyEmail: async (token: string) => {
      return this.request<{ success: boolean }>(`/api/auth/verify?token=${token}`, {
        method: 'GET',
      });
    },

    checkEmailExists: async (email: string) => {
      return this.request<{ exists: boolean }>('/api/auth/check-email', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    },
  };

  player = {
    getMe: async () => {
      return this.request<Player>('/api/player/me', {
        method: 'GET',
      });
    },

    updateMe: async (data: Partial<Player>) => {
      return this.request<Player>('/api/player/me', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
  };

  character = {
    generate: async (photoUri: string, roomPhotoUri: string, lifeStage: LifeStage) => {
      return this.request<{ characterId: string; status: string }>('/api/character/generate', {
        method: 'POST',
        body: JSON.stringify({ photoUri, roomPhotoUri, lifeStage }),
      });
    },

    getGenerateStatus: async (characterId: string) => {
      return this.request<{ status: string; character: Character }>(`/api/character/generate/${characterId}`, {
        method: 'GET',
      });
    },

    create: async (characterData: Partial<Character>) => {
      return this.request<Character>('/api/characters', {
        method: 'POST',
        body: JSON.stringify(characterData),
      });
    },

    getStatus: async (characterId: string) => {
      return this.request<Character>(`/api/characters/${characterId}/status`, {
        method: 'GET',
      });
    },

    get: async (characterId: string) => {
      return this.request<Character>(`/api/characters/${characterId}`, {
        method: 'GET',
      });
    },
  };

  messages = {
    getList: async (characterId: string, limit = 30) => {
      return this.request<Message[]>(`/api/characters/${characterId}/messages?limit=${limit}`, {
        method: 'GET',
      });
    },

    send: async (characterId: string, content: string) => {
      return this.request<Message>(`/api/characters/${characterId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
    },
  };

  timeline = {
    getPosts: async (limit = 20) => {
      return this.request<TimelinePost[]>('/api/timeline', {
        method: 'GET',
      });
    },

    getPostById: async (postId: string) => {
      return this.request<TimelinePost>(`/api/posts/${postId}`, {
        method: 'GET',
      });
    },

    like: async (postId: string) => {
      return this.request<{ success: boolean }>(`/api/posts/${postId}/like`, {
        method: 'POST',
      });
    },

    unlike: async (postId: string) => {
      return this.request<{ success: boolean }>(`/api/posts/${postId}/like`, {
        method: 'DELETE',
      });
    },
  };
}

export const api = new ApiService();

export const queryKeys = {
  character: ['character'] as const,
  characterStatus: ['character', 'status'] as const,
};