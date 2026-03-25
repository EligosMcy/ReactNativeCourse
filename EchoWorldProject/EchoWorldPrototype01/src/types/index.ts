export type LifeStage = 'adolescent' | 'youth' | 'prime' | 'middle_aged';
export type CharacterStatus = 'home' | 'outing' | 'traveling' | 'sleeping';
export type AbsenceState = 'none' | 'noticed' | 'felt' | 'accepted';
export type MoodTag =
  | 'excited' | 'cheerful' | 'restless'
  | 'content' | 'calm' | 'melancholy'
  | 'lonely' | 'anxious' | 'tired'
  | 'moved' | 'irritable' | 'nostalgic';

export type MessageSender = 'player' | 'character';
export type MessageStatus = 'sending' | 'sent' | 'read' | 'failed';

export interface Player {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  gender: 'male' | 'female' | 'other' | 'undisclosed';
  createdAt: string;
  bio?: string;
  location?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface Character {
  id: string;
  name: string;
  avatarUrl: string | null;
  age: number;
  gender: 'male' | 'female' | 'neutral' | 'unknown';
  lifeStage: LifeStage;
  backgroundStory: string;
  birthCity: string;
  personalityTraits: {
    ie: number;
    ns: number;
    tf: number;
    jp: number;
  };
  interestTags: string[];
  status: CharacterStatus;
  currentLocation: {
    landmarkType: string;
    landmarkName: string;
    city: string;
    localTime: string;
    timeZone: string;
  };
  emotionalState: { primary: MoodTag; intensity: number };
  energy: number;
  energyDescription: string;
  currentBehaviorDescription: string;
  absenceState: AbsenceState;
  absenceDays: number;
  bondStrength: number;
  isAbandoned: boolean;
  isLost: boolean;
  todaySummary: {
    placesVisited: string[];
    charactersEncountered: { name: string; avatarUrl: string | null }[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  characterId: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  status: MessageStatus;
}

export interface TimelinePost {
  id: string;
  characterId: string;
  characterName: string;
  characterAvatarUrl: string | null;
  contentType: 'text' | 'image';
  text: string;
  imageUrl: string | null;
  locationLabel: string;
  publishedAt: string;
  likeCount: number;
  replyCount: number;
  isLikedByPlayer: boolean;
}

export interface CharacterDraft {
  step: number;
  photoUri: string | null;
  roomPhotoUri: string | null;
  generatedData: {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'neutral' | 'unknown';
    backgroundStory: string;
    personalityTraits: {
      ie: number;
      ns: number;
      tf: number;
      jp: number;
    };
    interestTags: string[];
    birthCity: string;
  } | null;
  lifeStage: LifeStage | null;
  isGenerating: boolean;
  generatedCharacterId: string | null;
}

export interface RootStackParamList {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  SetPassword: { email: string };
  PlayerSetup: undefined;
  CreateCharacter: undefined;
  Main: undefined;
  CharacterChat: { characterId: string };
  CharacterStatus: { characterId: string };
  PostDetail: { postId: string };
  [key: string]: any;
}

export interface MainTabParamList {
  World: undefined;
  Discover: undefined;
  Settings: undefined;
  [key: string]: any;
}
