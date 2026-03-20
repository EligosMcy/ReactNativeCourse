import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// 导入屏幕组件
import LoadingScreen from './src/screens/LoadingScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import MainScreen from './src/screens/MainScreen';
import CameraScreen from './src/screens/CameraScreen';
import CreateResidentScreen from './src/screens/CreateResidentScreen';
import ResidentCreationRitualScreen from './src/screens/ResidentCreationRitualScreen';
import ResidentDetailScreen from './src/screens/ResidentDetailScreen';
import ConversationScreen from './src/screens/ConversationScreen';

const Stack = createStackNavigator();

function AppContent() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
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
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="CreateResident" component={CreateResidentScreen} />
        <Stack.Screen name="ResidentCreationRitual" component={ResidentCreationRitualScreen} />
        <Stack.Screen name="ResidentDetail" component={ResidentDetailScreen} />
        <Stack.Screen name="Conversation" component={ConversationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // 字体加载逻辑
    const loadFonts = async () => {
      // 这里可以加载自定义字体
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return <AppContent />;
}