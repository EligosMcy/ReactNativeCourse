import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, BorderRadius, Glassmorphism } from '../../theme/DesignSystem';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = '请输入邮箱';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!password) {
      newErrors.password = '请输入密码';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        Alert.alert(
          '登录成功',
          '欢迎回来！请创建你的第一个数字生命',
          [{ text: '开始创建', onPress: () => navigation.navigate('CharacterCreation') }]
        );
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>登录</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>邮箱</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="请输入邮箱地址"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) {
                  setErrors({ ...errors, email: null });
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>密码</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="请输入密码"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors({ ...errors, password: null });
                }
              }}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <View style={styles.options}>
            <TouchableOpacity
              style={styles.rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
              <Text style={styles.rememberMeText}>记住账号</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>忘记密码？</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? '登录中...' : '登录'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerLinkText}>
              还没有账号？<Text style={styles.registerLinkHighlight}>立即注册</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>其他登录方式</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-wechat" size={24} color="#07C160" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-qq" size={24} color="#12B7F5" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.surfaceContainerLow,
  },
  backButton: {
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.digitalInk,
    marginLeft: 24,
    fontFamily: Typography.serif,
    letterSpacing: Typography.titleLetterSpacing,
  },
  form: {
    padding: 32,
  },
  inputGroup: {
    marginBottom: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.onSurface,
    marginBottom: 12,
    fontFamily: Typography.sansSerif,
    letterSpacing: Typography.bodyLetterSpacing,
  },
  input: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 18,
    color: Colors.digitalInk,
    fontFamily: Typography.sansSerif,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
    borderBottomOpacity: 0.15,
  },
  inputError: {
    borderBottomColor: '#FF3B30',
    borderBottomOpacity: 1,
  },
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
    marginTop: 8,
    fontFamily: Typography.sansSerif,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderOpacity: 0.15,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  rememberMeText: {
    fontSize: 16,
    color: Colors.onSurface,
    fontFamily: Typography.sansSerif,
  },
  forgotPassword: {
    fontSize: 16,
    color: Colors.secondary,
    fontFamily: Typography.sansSerif,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    backgroundColor: Colors.surfaceContainerHighest,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.onPrimary,
    fontFamily: Typography.sansSerif,
  },
  registerLink: {
    alignItems: 'center',
    marginBottom: 48,
  },
  registerLinkText: {
    fontSize: 16,
    color: Colors.onSurface,
    opacity: 0.7,
    fontFamily: Typography.sansSerif,
  },
  registerLinkHighlight: {
    color: Colors.secondary,
    fontWeight: '600',
    opacity: 1,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.outlineVariant,
    opacity: 0.1,
  },
  dividerText: {
    marginHorizontal: 20,
    fontSize: 14,
    color: Colors.onSurface,
    opacity: 0.5,
    fontFamily: Typography.sansSerif,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
  socialButton: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
});