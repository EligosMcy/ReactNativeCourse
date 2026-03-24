import { create } from 'zustand';

interface UIState {
  activeCharacterCardId: string | null;
  globalLoading: boolean;
  setActiveCharacterCard: (id: string | null) => void;
  setGlobalLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeCharacterCardId: null,
  globalLoading: false,

  setActiveCharacterCard: (id) => set({ activeCharacterCardId: id }),
  setGlobalLoading: (loading) => set({ globalLoading: loading }),
}));
