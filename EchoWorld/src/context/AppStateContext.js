import React, { createContext, useContext, useState, useReducer } from 'react';

const AppStateContext = createContext();

const initialState = {
  user: {
    id: null,
    username: 'Digital_Explorer',
    email: '',
    isLoggedIn: false,
  },
  currentCharacter: 'Aurelius_01',
  currentScene: null,
  conversations: [],
  mood: '平静',
};

function appStateReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload, isLoggedIn: true },
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'SET_CHARACTER':
      return {
        ...state,
        currentCharacter: action.payload,
      };
    case 'SET_SCENE':
      return {
        ...state,
        currentScene: action.payload,
      };
    case 'ADD_CONVERSATION':
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
      };
    case 'SET_MOOD':
      return {
        ...state,
        mood: action.payload,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
}

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  const actions = {
    login: (userData) => dispatch({ type: 'SET_USER', payload: userData }),
    logout: () => dispatch({ type: 'LOGOUT' }),
    setCharacter: (character) => dispatch({ type: 'SET_CHARACTER', payload: character }),
    setScene: (scene) => dispatch({ type: 'SET_SCENE', payload: scene }),
    addConversation: (conversation) => dispatch({ type: 'ADD_CONVERSATION', payload: conversation }),
    setMood: (mood) => dispatch({ type: 'SET_MOOD', payload: mood }),
    updateProfile: (profileData) => dispatch({ type: 'UPDATE_PROFILE', payload: profileData }),
  };

  return (
    <AppStateContext.Provider value={{ state, actions }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}