import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { AppStateProvider } from './src/context/AppStateContext';

import LoadingScreen from './src/screens/LoadingScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import PlayerSetupScreen from './src/screens/PlayerSetupScreen';
import MainScreen from './src/screens/MainScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ConversationScreen from './src/screens/ConversationScreen';
import SecurityArchiveScreen from './src/screens/SecurityArchiveScreen';
import SceneDetailScreen from './src/screens/SceneDetailScreen';
import EmailVerificationScreen from './src/screens/EmailVerificationScreen';
import CameraScreen from './src/screens/CameraScreen';
import CreateResidentScreen from './src/screens/CreateResidentScreen';
import ResidentArchiveScreen from './src/screens/ResidentArchiveScreen';
import ResidentDetailScreen from './src/screens/ResidentDetailScreen';
import ResidentCreationRitualScreen from './src/screens/ResidentCreationRitualScreen';

const Stack = createStackNavigator();

function AppContent() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" translucent backgroundColor="transparent" />
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          cardStyle: { backgroundColor: '#f9f9f7' }
        }}
        initialRouteName="Loading"
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        <Stack.Screen name="PlayerSetup" component={PlayerSetupScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Conversation" component={ConversationScreen} />
        <Stack.Screen name="SecurityArchive" component={SecurityArchiveScreen} />
        <Stack.Screen name="SceneDetail" component={SceneDetailScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="CreateResident" component={CreateResidentScreen} />
        <Stack.Screen name="ResidentArchive" component={ResidentArchiveScreen} />
        <Stack.Screen name="ResidentDetail" component={ResidentDetailScreen} />
        <Stack.Screen name="ResidentCreationRitual" component={ResidentCreationRitualScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAppResources = async () => {
      try {
        setFontsLoaded(true);
      } catch (error) {
        console.warn('Error loading fonts:', error);
        setFontsLoaded(true);
      }
    };

    loadAppResources();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
}
