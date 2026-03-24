import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing } from '../../theme';
import { Button } from '../../components/ui';
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
    // 只在加载完成且未完成导航时执行一次
    if (!isLoading && !isNavigationComplete) {
      setIsNavigationComplete(true);
      if (isAuthenticated && characters.length > 0) {
        navigation.replace('Main');
      } else if (isAuthenticated) {
        navigation.replace('PlayerSetup');
      } else {
        // Stay on splash, user will navigate
      }
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
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>ECHO</Text>
        <Text style={styles.logo}>WORLD</Text>
        <Text style={styles.tagline}>一个数字居所</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.buttonContainer}>
        <Button title="开始" onPress={handleStart} />
        <View style={styles.loginLink}>
          <Text style={styles.loginText}>已有账户？</Text>
          <Button title="登录" variant="ghost" onPress={handleLogin} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.pagePadding,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    fontFamily: 'serif',
    fontSize: typography.pageTitle.fontSize,
    fontWeight: typography.pageTitle.fontWeight,
    letterSpacing: 12,
    color: colors.text.primary,
  },
  tagline: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    letterSpacing: 3,
    marginTop: spacing.lg,
  },
  divider: {
    width: 80,
    height: 1,
    backgroundColor: colors.border.subtle,
    alignSelf: 'center',
    marginBottom: spacing.xl * 2,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
  },
  loginText: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
  },
});
