import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, DESIGN_PRINCIPLES } from '../constants/DesignSystem';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 模拟登录逻辑
    navigation.replace('Main');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleForgotPassword = () => {
    // 忘记密码逻辑
    console.log('Forgot password');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* 背景元素 */}
      <View style={styles.backgroundElements}>
        <View style={[styles.backgroundShape, styles.shape1]} />
        <View style={[styles.backgroundShape, styles.shape2]} />
      </View>

      {/* 顶部导航 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>返回家园</Text>
      </View>

      {/* 主内容 */}
      <View style={styles.content}>
        {/* 标题区域 */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>欢迎回来</Text>
          <Text style={styles.subtitle}>请使用您的凭证进入居所</Text>
        </View>

        {/* 表单区域 */}
        <View style={styles.formSection}>
          {/* 邮箱输入 */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>邮箱地址</Text>
            <TextInput
              style={styles.textInput}
              placeholder="请输入您的邮箱"
              placeholderTextColor={COLORS.outlineVariant}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.inputUnderline} />
          </View>

          {/* 密码输入 */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>密码</Text>
            <TextInput
              style={styles.textInput}
              placeholder="请输入您的密码"
              placeholderTextColor={COLORS.outlineVariant}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <View style={styles.inputUnderline} />
          </View>

          {/* 忘记密码 */}
          <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>忘记密码？</Text>
          </TouchableOpacity>

          {/* 登录按钮 */}
          <TouchableOpacity 
            style={[styles.loginButton, (!email || !password) && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={!email || !password}
          >
            <Text style={styles.loginButtonText}>进入居所</Text>
          </TouchableOpacity>
        </View>

        {/* 底部链接 */}
        <View style={styles.bottomSection}>
          <Text style={styles.bottomText}>还没有居所？</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.bottomLink}>创建新居所</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  backgroundShape: {
    position: 'absolute',
    borderRadius: BORDER_RADIUS.full,
    opacity: 0.02,
  },
  shape1: {
    top: '10%',
    right: '20%',
    width: 150,
    height: 150,
    backgroundColor: COLORS.primary,
  },
  shape2: {
    bottom: '20%',
    left: '15%',
    width: 100,
    height: 100,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.lg,
  },
  backButton: {
    padding: SPACING.xs,
  },
  backButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
  },
  headerTitle: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
    marginLeft: SPACING.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxl,
  },
  titleSection: {
    marginBottom: SPACING.xxxl,
  },
  title: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
  },
  formSection: {
    width: '100%',
    maxWidth: 320,
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: SPACING.xl,
  },
  inputLabel: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.secondaryText,
    marginBottom: SPACING.xs,
    letterSpacing: 1,
  },
  textInput: {
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.primaryText,
    paddingVertical: SPACING.sm,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  inputUnderline: {
    height: 1,
    backgroundColor: COLORS.outlineVariant,
    opacity: 0.3,
    marginTop: SPACING.xs,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.xl,
  },
  forgotPasswordText: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.secondaryText,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    ...DESIGN_PRINCIPLES.glassmorphism,
  },
  loginButtonDisabled: {
    backgroundColor: COLORS.outlineVariant,
    opacity: 0.5,
  },
  loginButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
    letterSpacing: 1,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: SPACING.xxl,
  },
  bottomText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    marginRight: SPACING.xs,
  },
  bottomLink: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;