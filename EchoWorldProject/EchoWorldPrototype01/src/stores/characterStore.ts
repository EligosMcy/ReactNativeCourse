import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Character, CharacterDraft, LifeStage } from '../types';
import { api } from '../services/api';

interface CharacterState {
  characters: Character[];
  currentCharacterId: string | null;
  draft: CharacterDraft;
  addCharacter: (character: Character) => Promise<void>;
  removeCharacter: (characterId: string) => Promise<void>;
  setCurrentCharacter: (characterId: string) => void;
  updateDraft: (draft: Partial<CharacterDraft>) => void;
  resetDraft: () => void;
  resetCharacters: () => Promise<void>;
  saveDraft: () => Promise<void>;
  loadDraft: () => Promise<void>;
  generateCharacter: (photoUri: string, roomPhotoUri: string, lifeStage: LifeStage) => Promise<{ characterId: string; status: string }>;
  getCharacterStatus: (characterId: string) => Promise<Character>;
  getCharacter: (characterId: string) => Promise<Character>;
}

const initialDraft: CharacterDraft = {
  step: -1,
  photoUri: null,
  roomPhotoUri: null,
  generatedData: null,
  lifeStage: null,
  isGenerating: false,
  generatedCharacterId: null,
};

export const useCharacterStore = create<CharacterState>((set, get) => ({
  characters: [],
  currentCharacterId: null,
  draft: initialDraft,

  addCharacter: async (character) => {
    console.log('🎭 addCharacter: adding character', character.id);
    try {
      const savedCharacter = await api.character.create(character);
      const { characters } = get();
      const updatedCharacters = [...characters, savedCharacter];
      await AsyncStorage.setItem('characters', JSON.stringify(updatedCharacters));
      set({ 
        characters: updatedCharacters,
        currentCharacterId: savedCharacter.id
      });
      console.log('🎭 addCharacter: character added successfully');
    } catch (error) {
      console.error('🎭 addCharacter: failed to add character', error);
      throw error;
    }
  },

  removeCharacter: async (characterId) => {
    console.log('🎭 removeCharacter: removing character', characterId);
    try {
      const { characters, currentCharacterId } = get();
      const updatedCharacters = characters.filter(c => c.id !== characterId);
      await AsyncStorage.setItem('characters', JSON.stringify(updatedCharacters));
      
      let newCurrentCharacterId = currentCharacterId;
      if (currentCharacterId === characterId && updatedCharacters.length > 0) {
        newCurrentCharacterId = updatedCharacters[0].id;
      } else if (updatedCharacters.length === 0) {
        newCurrentCharacterId = null;
      }
      
      set({ 
        characters: updatedCharacters,
        currentCharacterId: newCurrentCharacterId
      });
      console.log('🎭 removeCharacter: character removed successfully');
    } catch (error) {
      console.error('🎭 removeCharacter: failed to remove character', error);
      throw error;
    }
  },

  setCurrentCharacter: (characterId) => {
    set({ currentCharacterId: characterId });
  },

  updateDraft: (draftUpdate) => {
    const current = get().draft;
    set({ draft: { ...current, ...draftUpdate } });
    get().saveDraft();
  },

  resetDraft: () => {
    set({ draft: initialDraft });
    AsyncStorage.removeItem('characterDraft');
  },

  saveDraft: async () => {
    const { draft } = get();
    await AsyncStorage.setItem('characterDraft', JSON.stringify(draft));
  },

  resetCharacters: async () => {
    console.log('🎭 resetCharacters: clearing all characters');
    try {
      await AsyncStorage.removeItem('characters');
      await AsyncStorage.removeItem('characterDraft');
      set({ 
        characters: [], 
        currentCharacterId: null,
        draft: initialDraft
      });
      console.log('🎭 resetCharacters: characters cleared successfully');
    } catch (error) {
      console.error('🎭 resetCharacters: failed to reset characters', error);
      throw error;
    }
  },

  loadDraft: async () => {
    console.log('🎭 loadDraft started');
    
    try {
      const draftStr = await AsyncStorage.getItem('characterDraft');
      const charactersStr = await AsyncStorage.getItem('characters');
      
      console.log('🎭 Draft found:', !!draftStr);
      console.log('🎭 Characters found:', !!charactersStr);
      
      if (draftStr) {
        const draft = JSON.parse(draftStr) as CharacterDraft;
        console.log('🎭 Loaded draft with step:', draft.step);
        set({ draft });
      }
      
      if (charactersStr) {
        const characters = JSON.parse(charactersStr) as Character[];
        console.log('🎭 Loaded', characters.length, 'characters');
        const currentCharacterId = characters.length > 0 ? characters[0].id : null;
        set({ characters, currentCharacterId });
      } else {
        console.log('🎭 No characters found, setting empty array');
        set({ characters: [], currentCharacterId: null });
      }
    } catch (error) {
      console.error('🎭 Failed to load draft:', error);
    }
    
    console.log('🎭 loadDraft completed');
  },

  generateCharacter: async (photoUri: string, roomPhotoUri: string, lifeStage: LifeStage) => {
    console.log('🎭 generateCharacter: generating character');
    try {
      const result = await api.character.generate(photoUri, roomPhotoUri, lifeStage);
      console.log('🎭 generateCharacter: character generated successfully', result);
      return result;
    } catch (error) {
      console.error('🎭 generateCharacter: failed to generate character', error);
      throw error;
    }
  },

  getCharacterStatus: async (characterId: string) => {
    console.log('🎭 getCharacterStatus: fetching status for', characterId);
    try {
      const status = await api.character.getStatus(characterId);
      console.log('🎭 getCharacterStatus: status fetched successfully', status);
      
      const { characters } = get();
      const updatedCharacters = characters.map(c => 
        c.id === characterId ? status : c
      );
      await AsyncStorage.setItem('characters', JSON.stringify(updatedCharacters));
      set({ characters: updatedCharacters });
      
      return status;
    } catch (error) {
      console.error('🎭 getCharacterStatus: failed to fetch status', error);
      throw error;
    }
  },

  getCharacter: async (characterId: string) => {
    console.log('🎭 getCharacter: fetching character', characterId);
    try {
      const character = await api.character.get(characterId);
      console.log('🎭 getCharacter: character fetched successfully');
      
      const { characters } = get();
      const characterIndex = characters.findIndex(c => c.id === characterId);
      
      if (characterIndex !== -1) {
        const updatedCharacters = [...characters];
        updatedCharacters[characterIndex] = character;
        await AsyncStorage.setItem('characters', JSON.stringify(updatedCharacters));
        set({ characters: updatedCharacters });
      }
      
      return character;
    } catch (error) {
      console.error('🎭 getCharacter: failed to fetch character', error);
      throw error;
    }
  },
}));
