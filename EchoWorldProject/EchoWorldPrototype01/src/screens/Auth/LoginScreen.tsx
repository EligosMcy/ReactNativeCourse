import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button, Input } from '../../components/ui';
import { useAuthStore } from '../../stores';
import { api } from '../../services/api';
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
      const { player, tokens } = await api.auth.login(email, password);
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
      {/* 顶部固定Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.brandName}>ECHOWORLD</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>登录</Text>
          <Text style={styles.subtitle}>欢迎回来</Text>
        </View>

        {/* 卡片式表单容器 */}
        <View style={styles.card}>
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
            style={styles.passwordInput}
          />

          <Button title="登录" onPress={handleLogin} loading={loading} style={styles.loginButton} />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>或</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button title="验证码登录" variant="secondary" onPress={handleCodeLogin} />
        </View>

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
  // 顶部固定Header
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.pagePadding,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
    backgroundColor: colors.background.primary,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 20,
    color: colors.text.secondary,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    letterSpacing: 1,
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: spacing.pagePadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  titleSection: {
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
  // 卡片式表单容器
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  passwordInput: {
    marginTop: spacing.md,
  },
  loginButton: {
    marginTop: spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.subtle,
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
