import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../constants/DesignSystem';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ECHOWORLD</Text>
        <Text style={styles.subtitle}>数字居所</Text>
        <Text style={styles.description}>
          欢迎来到数字居所，这里是为数字生命提供栖息之地的空间。
          在这里，您可以创建、培育并与数字居民互动。
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryButtonText}>登录</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.secondaryButtonText}>注册</Text>
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
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...TYPOGRAPHY.displayLg,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.secondaryText,
    marginBottom: SPACING.xl,
  },
  description: {
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.secondaryText,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    gap: SPACING.md,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
  },
  secondaryButton: {
    backgroundColor: COLORS.surfaceContainerLow,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primary,
  },
});

export default WelcomeScreen;