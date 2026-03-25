import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../theme';

import { SplashScreen } from '../screens/Auth/SplashScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { RegisterScreen } from '../screens/Auth/RegisterScreen';
import { SetPasswordScreen } from '../screens/Auth/SetPasswordScreen';
import { PlayerSetupScreen } from '../screens/Auth/PlayerSetupScreen';
import { CreateCharacterScreen } from '../screens/Create/CreateCharacterScreen';
import { WorldScreen } from '../screens/World/WorldScreen';
import { TimelineScreen } from '../screens/Timeline/TimelineScreen';
import { PostDetailScreen } from '../screens/Timeline/PostDetailScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';
import { EditProfileScreen } from '../screens/Settings/EditProfileScreen';
import { NotificationSettingsScreen } from '../screens/Settings/NotificationSettingsScreen';
import { ChatScreen } from '../screens/Chat/ChatScreen';
import { CharacterStatusScreen } from '../screens/Profile/CharacterStatusScreen';

import type { RootStackParamList, MainTabParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const TabIcon: React.FC<{ icon: string; focused: boolean }> = ({ icon, focused }) => (
  <Text style={{ fontSize: 20, color: focused ? colors.accent.primary : colors.text.tertiary }}>
    {icon}
  </Text>
);

const TabLabel: React.FC<{ label: string; focused: boolean }> = ({ label, focused }) => (
  <Text style={{ fontSize: 10, color: focused ? colors.accent.primary : colors.text.tertiary }}>
    {label}
  </Text>
);

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      id="main-tabs"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopColor: colors.border.subtle,
          height: 84,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.accent.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
      }}
    >
      <Tab.Screen
        name="World"
        component={WorldScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🗺" focused={focused} />,
          tabBarLabel: ({ focused }) => <TabLabel label="World" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Discover"
        component={TimelineScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="✦" focused={focused} />,
          tabBarLabel: ({ focused }) => <TabLabel label="Discover" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="⚙" focused={focused} />,
          tabBarLabel: ({ focused }) => <TabLabel label="Setting" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id="root-stack"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background.primary },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
        <Stack.Screen name="PlayerSetup" component={PlayerSetupScreen} />
        <Stack.Screen name="CreateCharacter" component={CreateCharacterScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="CharacterChat" component={ChatScreen} />
        <Stack.Screen name="CharacterStatus" component={CharacterStatusScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
