import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Character, CharacterDraft, LifeStage } from '../types';

interface CharacterState {
  characters: Character[];
  currentCharacterId: string | null;
  draft: CharacterDraft;
  addCharacter: (character: Character) => void;
  removeCharacter: (characterId: string) => void;
  setCurrentCharacter: (characterId: string) => void;
  updateDraft: (draft: Partial<CharacterDraft>) => void;
  resetDraft: () => void;
  saveDraft: () => Promise<void>;
  loadDraft: () => Promise<void>;
}

const initialDraft: CharacterDraft = {
  step: 0,
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
    const { characters } = get();
    const updatedCharacters = [...characters, character];
    await AsyncStorage.setItem('characters', JSON.stringify(updatedCharacters));
    set({ 
      characters: updatedCharacters,
      currentCharacterId: character.id
    });
  },

  removeCharacter: async (characterId) => {
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

  loadDraft: async () => {
    try {
      const draftStr = await AsyncStorage.getItem('characterDraft');
      const charactersStr = await AsyncStorage.getItem('characters');
      
      if (draftStr) {
        const draft = JSON.parse(draftStr) as CharacterDraft;
        set({ draft });
      }
      
      if (charactersStr) {
        const characters = JSON.parse(charactersStr) as Character[];
        const currentCharacterId = characters.length > 0 ? characters[0].id : null;
        set({ characters, currentCharacterId });
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
    }
  },
}));
