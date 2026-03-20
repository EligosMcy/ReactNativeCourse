import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>ECHOWORLD</Text>
          <Text style={styles.subtitle}>创建您的数字居所</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>用户名</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="选择您的身份标识"
              placeholderTextColor="#adb3b0"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>邮箱地址</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="输入您的邮箱"
              placeholderTextColor="#adb3b0"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>密码</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="创建安全密码"
              placeholderTextColor="#adb3b0"
              secureTextEntry
            />
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              创建账户即表示您同意我们的服务条款和隐私政策
            </Text>
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>创建居所</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>返回</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f7',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  header: {
    alignItems: 'center',
    marginBottom: 64,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 20,
    letterSpacing: 8,
    color: '#2d3432',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#767c79',
  },
  formContainer: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 12,
    letterSpacing: 2,
    color: '#2d3432',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#f2f4f2',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(173, 179, 176, 0.3)',
    paddingVertical: 12,
    paddingHorizontal: 0,
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#2d3432',
  },
  termsContainer: {
    marginTop: 16,
  },
  termsText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#767c79',
    textAlign: 'center',
    lineHeight: 18,
  },
  signupButton: {
    backgroundColor: '#5f5e5e',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  signupButtonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#faf7f6',
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
    marginTop: 48,
  },
  backText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#767c79',
  },
});

export default SignupScreen;