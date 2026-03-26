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

type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterNavigationProp>();
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!email) {
      Alert.alert('提示', '请填写邮箱地址');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('提示', '请输入有效的邮箱地址');
      return;
    }

    setLoading(true);
    try {
      const exists = await mockApi.auth.checkEmailExists(email);
      if (exists) {
        Alert.alert('提示', '该邮箱已有账户', [
          { text: '取消', style: 'cancel' },
          { text: '去登录', onPress: () => navigation.navigate('Login') }
        ]);
        return;
      }
      navigation.navigate('SetPassword', { email });
    } catch (error) {
      Alert.alert('提示', '请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    Alert.alert('Google注册', 'Google注册功能即将上线');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>创建账户</Text>
          <Text style={styles.subtitle}>用邮箱开始</Text>
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
        </View>

        <Button title="继续" onPress={handleContinue} loading={loading} />

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>或</Text>
          <View style={styles.divider} />
        </View>

        <Button
          title="Google注册"
          onPress={handleGoogleRegister}
          variant="secondary"
        />

        <Text style={styles.hint}>
          已有账户？<Text style={styles.link} onPress={() => navigation.navigate('Login')}>登录</Text>
        </Text>
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.subtle,
  },
  dividerText: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    marginHorizontal: spacing.md,
  },
  hint: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  link: {
    color: colors.accent.primary,
  },
});
