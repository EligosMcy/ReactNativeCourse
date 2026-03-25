import type { Player, AuthTokens, Character, Message, TimelinePost, LifeStage, MoodTag } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let mockPlayer: Player | null = null;
let mockCharacters: Character[] = [];
let mockMessages: Record<string, Message[]> = {}; // characterId -> messages
let mockPosts: TimelinePost[] = [];

const generateId = () => Math.random().toString(36).substring(2, 15);

const generateCharacter = (photoUri: string, roomPhotoUri: string, lifeStage: LifeStage): Character => {
  const cities = ['上海', '北京', '杭州', '广州', '深圳', '成都', '南京', '苏州'];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  
  const names = ['叶梧桐', '林知夏', '沈星尘', '苏墨白', '季寒川', '洛晚萤', '顾言蹊', '温予安'];
  const randomName = names[Math.floor(Math.random() * names.length)];
  
  const ageRange = lifeStage === 'youth' ? [18, 35] : [36, 55];
  const age = Math.floor(Math.random() * (ageRange[1] - ageRange[0]) + ageRange[0]);
  
  const moodTags: MoodTag[] = ['content', 'calm', 'cheerful', 'melancholy', 'restless'];
  const randomMood = moodTags[Math.floor(Math.random() * moodTags.length)];
  
  const landmarks = ['咖啡馆', '图书馆', '公园', '美术馆', '书店', '餐厅', '超市', '广场'];
  const randomLandmark = landmarks[Math.floor(Math.random() * landmarks.length)];
  
  return {
    id: generateId(),
    name: randomName,
    avatarUrl: null,
    age,
    gender: Math.random() > 0.5 ? 'male' : 'female',
    lifeStage,
    backgroundStory: `一个在${randomCity}长大的孩子，从小对世界充满好奇。`,
    birthCity: randomCity,
    personalityTraits: {
      ie: Math.random() * 2 - 1,
      ns: Math.random() * 2 - 1,
      tf: Math.random() * 2 - 1,
      jp: Math.random() * 2 - 1,
    },
    interestTags: ['阅读', '摄影', '音乐', '绘画'].slice(0, Math.floor(Math.random() * 3) + 1),
    status: 'home',
    currentLocation: {
      landmarkType: randomLandmark,
      landmarkName: randomLandmark,
      city: randomCity,
      localTime: new Date().toISOString(),
      timeZone: 'Asia/Shanghai',
    },
    emotionalState: {
      primary: randomMood,
      intensity: Math.random() * 0.5 + 0.3,
    },
    energy: 0.8,
    energyDescription: '精力充沛',
    currentBehaviorDescription: '在家中安静地看书',
    absenceState: 'none',
    absenceDays: 0,
    bondStrength: 0.5,
    isAbandoned: false,
    isLost: false,
    todaySummary: {
      placesVisited: [randomLandmark],
      charactersEncountered: [],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const mockApi = {
  auth: {
    register: async (email: string, password: string) => {
      await delay(1000);
      const tokens: AuthTokens = {
        accessToken: generateId(),
        refreshToken: generateId(),
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      };
      mockPlayer = {
        id: generateId(),
        email,
        name: '',
        avatarUrl: null,
        gender: 'undisclosed',
        createdAt: new Date().toISOString(),
      };
      return { player: mockPlayer, tokens };
    },

    login: async (email: string, password: string) => {
      await delay(800);
      const tokens: AuthTokens = {
        accessToken: generateId(),
        refreshToken: generateId(),
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      };
      mockPlayer = {
        id: generateId(),
        email,
        name: 'Test Player',
        avatarUrl: null,
        gender: 'male',
        createdAt: new Date().toISOString(),
      };
      return { player: mockPlayer, tokens };
    },

    verifyEmail: async (token: string) => {
      await delay(500);
      return { success: true };
    },

    checkEmailExists: async (email: string) => {
      await delay(500);
      // 模拟邮箱已存在的情况，这里简单返回false，实际应该查询数据库
      return false;
    },
  },

  player: {
    getMe: async () => {
      await delay(300);
      return mockPlayer;
    },

    updateMe: async (data: Partial<Player>) => {
      await delay(500);
      if (mockPlayer) {
        mockPlayer = { ...mockPlayer, ...data };
      }
      return mockPlayer;
    },
  },

  character: {
    generate: async (photoUri: string, roomPhotoUri: string, lifeStage: LifeStage) => {
      await delay(3000);
      const newCharacter = generateCharacter(photoUri, roomPhotoUri, lifeStage);
      mockCharacters.push(newCharacter);
      return { characterId: newCharacter.id, status: 'completed' };
    },

    getGenerateStatus: async (characterId: string) => {
      await delay(200);
      const character = mockCharacters.find(c => c.id === characterId);
      return { status: 'completed', character };
    },

    create: async (characterData: Partial<Character>) => {
      await delay(500);
      const characterId = characterData.id;
      if (characterId) {
        const characterIndex = mockCharacters.findIndex(c => c.id === characterId);
        if (characterIndex !== -1) {
          mockCharacters[characterIndex] = { ...mockCharacters[characterIndex], ...characterData };
          
          // 为新角色添加欢迎消息
          mockMessages[characterId] = [
            {
              id: generateId(),
              characterId: characterId,
              sender: 'character',
              content: '你好！很高兴认识你。我是这个世界的新成员。',
              timestamp: new Date().toISOString(),
              status: 'sent',
            },
          ];
        }
      }
      return mockCharacters.find(c => c.id === characterId) || null;
    },

    getStatus: async (characterId: string) => {
      await delay(300);
      const characterIndex = mockCharacters.findIndex(c => c.id === characterId);
      if (characterIndex !== -1) {
        const character = mockCharacters[characterIndex];
        if (Math.random() > 0.7) {
          character.status = character.status === 'home' ? 'outing' : 'home';
        }
        character.energy = Math.min(1, Math.max(0, character.energy + (Math.random() - 0.5) * 0.1));
        character.updatedAt = new Date().toISOString();
        mockCharacters[characterIndex] = character;
        return character;
      }
      return null;
    },

    get: async (characterId: string) => {
      await delay(300);
      return mockCharacters.find(c => c.id === characterId) || null;
    },
  },

  messages: {
    getList: async (characterId: string, limit = 30) => {
      await delay(400);
      return (mockMessages[characterId] || []).slice(-limit);
    },

    send: async (characterId: string, content: string) => {
      await delay(300);
      const newMessage: Message = {
        id: generateId(),
        characterId,
        sender: 'player',
        content,
        timestamp: new Date().toISOString(),
        status: 'sent',
      };
      
      if (!mockMessages[characterId]) {
        mockMessages[characterId] = [];
      }
      mockMessages[characterId].push(newMessage);
      
      setTimeout(() => {
        const reply: Message = {
          id: generateId(),
          characterId,
          sender: 'character',
          content: getRandomReply(content),
          timestamp: new Date().toISOString(),
          status: 'sent',
        };
        mockMessages[characterId].push(reply);
      }, 5000 + Math.random() * 10000);
      
      return newMessage;
    },
  },

  timeline: {
    getPosts: async (limit = 20) => {
      await delay(400);
      return mockPosts.slice(0, limit);
    },

    savePosts: async (posts: TimelinePost[]) => {
      mockPosts = posts;
    },

    getPostById: async (postId: string) => {
      await delay(200);
      return mockPosts.find(post => post.id === postId) || null;
    },

    like: async (postId: string) => {
      await delay(200);
      mockPosts = mockPosts.map(post =>
        post.id === postId
          ? { ...post, likeCount: post.likeCount + 1, isLikedByPlayer: true }
          : post
      );
      return { success: true };
    },

    unlike: async (postId: string) => {
      await delay(200);
      mockPosts = mockPosts.map(post =>
        post.id === postId
          ? { ...post, likeCount: Math.max(0, post.likeCount - 1), isLikedByPlayer: false }
          : post
      );
      return { success: true };
    },
  },
};

function getRandomReply(playerMessage: string): string {
  const replies = [
    '收到你的消息了，我会认真考虑的。',
    '谢谢你分享这些，我很开心。',
    '今天发生了一件很有趣的事，你想听吗？',
    '我最近在学习新的东西，感觉很有收获。',
    '外面的天气很好，心情也很不错。',
    '你推荐的的那个地方，我下次一定要去看看。',
    '我今天在家待了一整天，看看书，听听音乐。',
    '有时候我会在想，我们下次见面会是什么时候呢？',
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

export const queryKeys = {
  character: ['character'] as const,
  characterStatus: ['character', 'status'] as const,
};
