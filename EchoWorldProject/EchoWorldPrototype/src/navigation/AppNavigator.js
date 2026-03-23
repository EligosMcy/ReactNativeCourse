import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

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

export default function AppNavigator() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}