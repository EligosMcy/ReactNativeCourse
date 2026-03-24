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
  const [isReady, setIsReady] = useState(false);
  const { loadDraft } = useCharacterStore();

  useEffect(() => {
    const init = async () => {
      await initializeAuth();
      await loadDraft();
      setIsReady(true);
    };
    init();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
