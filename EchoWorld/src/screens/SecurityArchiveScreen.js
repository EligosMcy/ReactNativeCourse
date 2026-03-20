import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SecurityArchiveScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (password && password === confirmPassword) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Ambience */}
      <View style={styles.backgroundElements}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Brand Header Section */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🔒</Text>
          </View>
          <Text style={styles.title}>保护你的数字记忆</Text>
          <Text style={styles.subtitle}>ECHOWORLD SECURITY ARCHIVE</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Password Inputs */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>输入新密码</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry
                placeholderTextColor="#adb3b0"
              />
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>确认密码</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                secureTextEntry
                placeholderTextColor="#adb3b0"
              />
            </View>
          </View>

          {/* Security Checklist */}
          <View style={styles.securityChecklist}>
            <Text style={styles.checklistTitle}>安全建议</Text>
            <View style={styles.checklistItem}>
              <View style={styles.checkIcon}>
                <Text style={styles.checkText}>✓</Text>
              </View>
              <Text style={styles.checklistText}>至少包含 8 个字符</Text>
            </View>
            <View style={styles.checklistItem}>
              <View style={styles.checkIcon}>
                <Text style={styles.checkText}>○</Text>
              </View>
              <Text style={styles.checklistText}>包含大写字母或数字</Text>
            </View>
            <View style={styles.checklistItem}>
              <View style={styles.checkIcon}>
                <Text style={styles.checkText}>○</Text>
              </View>
              <Text style={styles.checklistText}>避免使用常用词汇</Text>
            </View>
          </View>

          {/* Action Section */}
          <View style={styles.actionSection}>
            <TouchableOpacity 
              style={[styles.saveButton, (!password || password !== confirmPassword) && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={!password || password !== confirmPassword}
            >
              <Text style={styles.saveButtonText}>完成创建</Text>
            </TouchableOpacity>
            
            <Text style={styles.agreementText}>
              继续操作即表示您同意我们的 <Text style={styles.linkText}>隐私协议</Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Abstract Decorative Element */}
      <View style={styles.decorativeLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f7',
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -10,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  circle1: {
    top: '-10%',
    right: '-10%',
    width: width * 0.4,
    height: height * 0.4,
    backgroundColor: '#e5e9e6',
    opacity: 0.3,
    filter: 'blur(120px)',
  },
  circle2: {
    bottom: '-10%',
    left: '-10%',
    width: width * 0.4,
    height: height * 0.4,
    backgroundColor: '#f2e3fa',
    opacity: 0.2,
    filter: 'blur(120px)',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 64,
    textAlign: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#dee4e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
    color: '#5f5e5e',
  },
  title: {
    fontFamily: 'Noto Serif',
    fontSize: 32,
    color: '#2d3432',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#5a605e',
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.8,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 48,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: '#767c79',
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f4f2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#2d3432',
    letterSpacing: 4,
  },
  securityChecklist: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 12,
    shadowColor: '#2d3432',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.03,
    shadowRadius: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#e5e9e6',
  },
  checklistTitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#51616e',
    marginBottom: 24,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f2f4f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    fontSize: 12,
    color: '#A8C3B8',
  },
  checklistText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#5a605e',
    letterSpacing: -0.2,
  },
  actionSection: {
    paddingTop: 16,
    gap: 32,
  },
  saveButton: {
    backgroundColor: '#5f5e5e',
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#5f5e5e',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#faf7f6',
  },
  agreementText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#767c79',
    textAlign: 'center',
    letterSpacing: 1,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  decorativeLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#dee4e0',
    opacity: 0.5,
  },
});

export default SecurityArchiveScreen;