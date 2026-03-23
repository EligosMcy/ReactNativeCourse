import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// 认证相关屏幕
import SplashScreen from '../screens/Auth/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

// 角色创建屏幕
import CharacterCreationScreen from '../screens/CharacterCreation/CharacterCreationScreen';
import CameraScreen from '../screens/CharacterCreation/CameraScreen';

// 主应用屏幕
import WorldScreen from '../screens/World/WorldScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import TimelineScreen from '../screens/Timeline/TimelineScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function WorldStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="WorldMain" 
        component={WorldScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={({ route }) => ({ 
          title: '',
          headerTransparent: true,
          headerBackTitleVisible: false
        })} 
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: '角色信息' }} 
      />
    </Stack.Navigator>
  );
}

function TimelineStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TimelineMain" 
        component={TimelineScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: '角色信息' }} 
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SettingsMain" 
        component={SettingsScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'World') {
            iconName = focused ? 'globe' : 'globe-outline';
          } else if (route.name === 'Timeline') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 44,
          paddingBottom: 4,
          paddingTop: 4
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500'
        }
      })}
    >
      <Tab.Screen 
        name="World" 
        component={WorldStack} 
        options={{ 
          title: '世界',
          headerShown: false
        }} 
      />
      <Tab.Screen 
        name="Timeline" 
        component={TimelineStack} 
        options={{ 
          title: '发现',
          headerShown: false
        }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsStack} 
        options={{ 
          title: '设置',
          headerShown: false
        }} 
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="CharacterCreation" component={CharacterCreationScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}