import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../constants/DesignSystem';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // 模拟注册逻辑
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>注册</Text>
        <Text style={styles.subtitle}>创建您的数字居所账户</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="姓名"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="邮箱地址"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="密码"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>注册</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>返回</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.xxl,
  },
  title: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.secondaryText,
  },
  form: {
    gap: SPACING.lg,
  },
  input: {
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.primaryText,
  },
  signupButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  signupButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
  },
  backLink: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;