import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>ECHOWORLD</Text>
        <Text style={styles.subtitle}>返回家园</Text>
      </View>

      <View style={styles.formContainer}>
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
            placeholder="输入您的密码"
            placeholderTextColor="#adb3b0"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>进入家园</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>忘记密码？</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f7',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  header: {
    alignItems: 'center',
    marginBottom: 80,
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
    flex: 1,
    justifyContent: 'center',
    gap: 32,
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
  loginButton: {
    backgroundColor: '#5f5e5e',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#faf7f6',
    letterSpacing: 1,
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#51616e',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  backText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#767c79',
  },
});

export default LoginScreen;