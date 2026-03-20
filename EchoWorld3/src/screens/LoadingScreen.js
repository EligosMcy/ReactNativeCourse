import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/DesignSystem';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    // 模拟加载过程
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ECHOWORLD</Text>
      <Text style={styles.subtitle}>数字居所</Text>
      <View style={styles.loadingContainer}>
        <View style={styles.loadingBar}>
          <View style={styles.loadingProgress} />
        </View>
        <Text style={styles.loadingText}>正在初始化数字居所...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.displayLg,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.secondaryText,
    marginBottom: SPACING.xxl,
  },
  loadingContainer: {
    alignItems: 'center',
    width: '100%',
  },
  loadingBar: {
    width: '80%',
    height: 4,
    backgroundColor: COLORS.surfaceContainerHighest,
    borderRadius: 2,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    width: '30%',
    backgroundColor: COLORS.activePulse,
    borderRadius: 2,
  },
  loadingText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
  },
});

export default LoadingScreen;