import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppNavigator } from './src/navigation/AppNavigator';
import { initializeAuth } from './src/stores/authStore';
import { useCharacterStore } from './src/stores/characterStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      gcTime: 1000 * 60 * 10,
      retry: 2,
    },
  },
});

export default function App() {
  const { loadDraft } = useCharacterStore();

  useEffect(() => {
    console.log('🟢 App component mounted');
    const init = async () => {
      console.log('🟢 Starting app initialization');
      await initializeAuth();
      await loadDraft();
      console.log('🟢 App initialization complete');
    };
    init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
