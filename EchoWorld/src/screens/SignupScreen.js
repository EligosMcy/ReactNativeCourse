import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSignup = () => {
    if (email.trim()) {
      navigation.navigate('EmailVerification');
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Anchor */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ECHOWORLD</Text>
      </View>

      {/* Abstract Atmospheric Background Element */}
      <View style={styles.backgroundElements}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.formContainer}>
          {/* Branding/Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.subtitle}>Identity Registration</Text>
            <Text style={styles.title}>
              开始你的{`\n`}数字策展
            </Text>
          </View>

          {/* Registration Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>电子邮箱</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="curator@echoworld.com"
                  placeholderTextColor="#adb3b0"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Action Section */}
            <View style={styles.actionSection}>
              <TouchableOpacity 
                style={[styles.submitButton, !email.trim() && styles.submitButtonDisabled]}
                onPress={handleSignup}
                disabled={!email.trim()}
              >
                <Text style={styles.submitButtonText}>下一步</Text>
                <Text style={styles.submitIcon}>→</Text>
              </TouchableOpacity>
              
              <Text style={styles.agreementText}>
                继续操作即表示您同意我们的策展人协议与隐私条款。
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Aesthetic Detail Footer */}
      <View style={styles.footer}>
        <View style={styles.progressDots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={[styles.dot, styles.dotInactive]} />
          <View style={[styles.dot, styles.dotInactive]} />
        </View>
        <Text style={styles.versionText}>Residency V1.0</Text>
      </View>

      {/* Visual Texture Overlay */}
      <View style={styles.textureOverlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f7',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    zIndex: 50,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 20,
    color: '#5a605e',
  },
  headerTitle: {
    fontFamily: 'Noto Serif',
    fontSize: 12,
    letterSpacing: 3,
    color: '#767c79',
    opacity: 0.4,
    textTransform: 'uppercase',
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -10,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  circle1: {
    top: '10%',
    left: '15%',
    width: width * 0.4,
    height: height * 0.4,
    backgroundColor: '#e5e9e6',
    opacity: 0.4,
    filter: 'blur(120px)',
  },
  circle2: {
    bottom: '5%',
    right: '10%',
    width: width * 0.3,
    height: height * 0.3,
    backgroundColor: '#d4e5f4',
    opacity: 0.2,
    filter: 'blur(100px)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 64,
  },
  titleSection: {
    gap: 16,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 10,
    letterSpacing: 2,
    color: '#51616e',
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  title: {
    fontFamily: 'Noto Serif',
    fontSize: 36,
    color: '#2d3432',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  form: {
    gap: 48,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontFamily: 'Inter',
    fontSize: 11,
    letterSpacing: 1,
    color: '#adb3b0',
    textTransform: 'uppercase',
    fontWeight: '500',
    marginBottom: 8,
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(173, 179, 176, 0.15)',
    paddingBottom: 8,
  },
  input: {
    fontFamily: 'Inter',
    fontSize: 18,
    color: '#2d3432',
    padding: 0,
  },
  actionSection: {
    paddingTop: 16,
    gap: 32,
  },
  submitButton: {
    backgroundColor: '#5f5e5e',
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#2d3432',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#faf7f6',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  submitIcon: {
    fontSize: 18,
    color: '#faf7f6',
  },
  agreementText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#5a605e',
    opacity: 0.6,
    lineHeight: 18,
    textAlign: 'center',
    maxWidth: 280,
    alignSelf: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    opacity: 0.3,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: '#535252',
  },
  dotInactive: {
    backgroundColor: '#adb3b0',
    opacity: 0.3,
  },
  versionText: {
    fontFamily: 'Noto Serif',
    fontSize: 14,
    fontStyle: 'italic',
    color: '#2d3432',
  },
  textureOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
    pointerEvents: 'none',
    zIndex: -5,
  },
});

export default SignupScreen;