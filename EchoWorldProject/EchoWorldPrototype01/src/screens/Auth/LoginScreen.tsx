import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing } from '../../theme';
import { Button, Input } from '../../components/ui';
import { useAuthStore } from '../../stores';
import { mockApi } from '../../services/mockApi';
import type { RootStackParamList } from '../../types';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('提示', '请填写邮箱和密码');
      return;
    }

    setLoading(true);
    try {
      const { player, tokens } = await mockApi.auth.login(email, password);
      await setAuth(player, tokens);
      
      // Check if player has name set
      if (!player.name) {
        navigation.replace('PlayerSetup');
      } else {
        navigation.replace('Main');
      }
    } catch (error) {
      Alert.alert('登录失败', '请检查邮箱和密码');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeLogin = () => {
    // TODO: Implement code login
    Alert.alert('提示', '验证码登录功能开发中');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>登录</Text>
          <Text style={styles.subtitle}>欢迎回来</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="邮箱地址"
            placeholder="请输入邮箱"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="密码"
            placeholder="请输入密码"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            showPasswordToggle
          />
        </View>

        <Button title="登录" onPress={handleLogin} loading={loading} />

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>或</Text>
          <View style={styles.dividerLine} />
        </View>

        <Button title="验证码登录" variant="secondary" onPress={handleCodeLogin} />

        <Text style={styles.hint}>忘记密码？用验证码登录即可</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    paddingHorizontal: spacing.pagePadding,
    paddingTop: spacing.xl,
  },
  backButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 20,
    color: colors.text.secondary,
  },
  header: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: 'serif',
    fontSize: typography.pageTitle.fontSize,
    fontWeight: typography.pageTitle.fontWeight,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  form: {
    marginBottom: spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.default,
  },
  dividerText: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
    marginHorizontal: spacing.md,
  },
  hint: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
