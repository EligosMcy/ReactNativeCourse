import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore, initializeAuth, useCharacterStore } from '../../stores';
import type { RootStackParamList } from '../../types';

type SplashNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashNavigationProp>();
  const { isAuthenticated, isLoading } = useAuthStore();
  const { characters } = useCharacterStore();
  const [isNavigationComplete, setIsNavigationComplete] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && !isNavigationComplete) {
      setIsNavigationComplete(true);
      if (isAuthenticated && characters.length > 0) {
        navigation.replace('Main');
      } else if (isAuthenticated) {
        navigation.replace('PlayerSetup');
      }
      // 未认证用户保持在SplashScreen，等待用户选择登录或注册
    }
  }, [isLoading, isAuthenticated, characters, navigation, isNavigationComplete]);

  const handleStart = () => {
    navigation.navigate('Register');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>ECHO</Text>
          <Text style={styles.logo}>WORLD</Text>
          <View style={styles.divider} />
          <Text style={styles.tagline}>一个数字居所</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStart}
          >
            <Text style={styles.startButtonText}>开始</Text>
          </TouchableOpacity>
          
          <View style={styles.loginLink}>
            <Text style={styles.loginText}>已有账户？</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginButtonText}>登录</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 96,
  },
  logo: {
    fontSize: 26,
    fontWeight: '300',
    letterSpacing: 16,
    color: '#1A1714',
  },
  tagline: {
    fontSize: 13,
    color: '#A89D92',
    letterSpacing: 3,
    marginTop: 24,
  },
  divider: {
    width: 80,
    height: 1,
    backgroundColor: '#EAE3D9',
    marginTop: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  startButton: {
    backgroundColor: '#8B6F47',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 999,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FAF8F5',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 2,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  loginText: {
    fontSize: 13,
    color: '#A89D92',
  },
  loginButtonText: {
    color: '#8B6F47',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 2,
  },
});
