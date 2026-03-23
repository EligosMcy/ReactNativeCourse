import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, BorderRadius, Gradients, Glassmorphism } from '../../theme/DesignSystem';

export default function SplashScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>ECHO</Text>
          </View>
          <Text style={styles.appName}>ECHOWORLD</Text>
          <Text style={styles.tagline}>与数字生命建立情感联结</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>登录</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerButtonText}>注册</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  logo: {
    width: 140,
    height: 140,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    ...Glassmorphism,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: Typography.serif,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.digitalInk,
    marginBottom: 16,
    fontFamily: Typography.serif,
    letterSpacing: Typography.titleLetterSpacing,
  },
  tagline: {
    fontSize: 18,
    color: Colors.onSurface,
    fontFamily: Typography.sansSerif,
    opacity: 0.7,
    lineHeight: Typography.bodyLgLineHeight * 18,
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.onPrimary,
    fontFamily: Typography.sansSerif,
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderOpacity: 0.15,
    paddingVertical: 20,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.digitalInk,
    fontFamily: Typography.sansSerif,
  },
});