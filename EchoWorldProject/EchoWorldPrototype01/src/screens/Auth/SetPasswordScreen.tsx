import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing } from '../../theme';
import { Button, Input } from '../../components/ui';
import { useAuthStore } from '../../stores';
import { api } from '../../services/api';
import type { RootStackParamList } from '../../types';

type SetPasswordNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SetPassword'>;
type SetPasswordRouteProp = RouteProp<RootStackParamList, 'SetPassword'>;

export const SetPasswordScreen: React.FC = () => {
  const navigation = useNavigation<SetPasswordNavigationProp>();
  const route = useRoute<SetPasswordRouteProp>();
  const { setAuth } = useAuthStore();
  const { email = 'test@example.com' } = route.params || {};
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validatePassword = (text: string) => {
    let error = '';
    if (text.length < 8) {
      error = '密码需要至少8个字符';
    } else if (!/[a-zA-Z]/.test(text)) {
      error = '密码需要包含字母';
    } else if (!/[0-9]/.test(text)) {
      error = '密码需要包含数字';
    }
    setPasswordError(error);
    return error === '';
  };

  const validateConfirmPassword = (text: string) => {
    let error = '';
    if (text !== password) {
      error = '两次密码输入不一致';
    }
    setConfirmPasswordError(error);
    return error === '';
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
    if (confirmPassword) {
      validateConfirmPassword(confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    validateConfirmPassword(text);
  };

  const handleCreateAccount = async () => {
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    setLoading(true);
    try {
      const { player, tokens } = await api.auth.register(email, password);
      await setAuth(player, tokens);
      navigation.replace('PlayerSetup');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '注册失败';
      
      // 检查是否是邮箱已存在的错误
      if (errorMessage.includes('exists') || errorMessage.includes('已存在')) {
        Alert.alert('注册失败', '该邮箱已有账户', [
          { text: '取消', style: 'cancel' },
          { text: '去登录', onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        Alert.alert('注册失败', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = password && confirmPassword && !passwordError && !confirmPasswordError;

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
        {/* 页面标题 */}
        <View style={styles.pageHeader}>
          <Text style={styles.title}>设置密码</Text>
          <Text style={styles.subtitle}>创建一个安全的密码</Text>
        </View>

        {/* 表单区域 */}
        <View style={styles.form}>
          <Input
            label="密码"
            placeholder="请输入密码"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            showPasswordToggle
            error={passwordError}
          />
          <Input
            label="确认密码"
            placeholder="请再次输入密码"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry
            showPasswordToggle
            error={confirmPasswordError}
          />
          
          {/* 密码规则说明 */}
          <Text style={styles.passwordRule}>密码规则：8位以上，含字母和数字</Text>
        </View>

        {/* 创建账户按钮 */}
        <Button 
          title="创建账户" 
          onPress={handleCreateAccount} 
          loading={loading}
          disabled={!isFormValid}
        />

        {/* 服务条款和隐私政策链接 */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            创建账户即表示您同意我们的{' '}
            <Text style={styles.link}>服务条款</Text>{' '}
            和{' '}
            <Text style={styles.link}>隐私政策</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.pagePadding,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
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
    fontFamily: 'serif',
    letterSpacing: 2,
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: spacing.pagePadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    flexGrow: 1,
  },
  pageHeader: {
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: 'serif',
    fontSize: typography.pageTitle.fontSize,
    fontWeight: typography.pageTitle.fontWeight,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
  },
  form: {
    marginBottom: spacing.lg,
  },
  passwordRule: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  termsContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  termsText: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 16,
  },
  link: {
    color: colors.accent.primary,
    textDecorationLine: 'underline',
  },
});