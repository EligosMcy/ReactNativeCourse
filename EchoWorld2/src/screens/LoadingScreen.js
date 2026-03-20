import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, DESIGN_PRINCIPLES } from '../constants/DesignSystem';

const { width, height } = Dimensions.get('window');

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
      {/* 抽象背景元素 - 体现"空灵"质感 */}
      <View style={styles.backgroundElements}>
        <View style={[styles.orb, styles.orb1]} />
        <View style={[styles.orb, styles.orb2]} />
        <View style={[styles.orb, styles.orb3]} />
      </View>

      {/* 主内容区域 */}
      <View style={styles.content}>
        {/* 品牌标识 - 极简设计 */}
        <View style={styles.brandSection}>
          <Text style={styles.brandTitle}>ECHOWORLD</Text>
          <Text style={styles.brandSubtitle}>数字居所</Text>
        </View>

        {/* 进度指示器 - 极简风格 */}
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>正在开启您的居所...</Text>
        </View>
      </View>

      {/* 底部信息 - 体现"档案馆"质感 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>版本 2.0 · 数字居所系统</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  orb: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.03,
  },
  orb1: {
    top: '20%',
    left: '10%',
    width: 200,
    height: 200,
    backgroundColor: COLORS.primary,
  },
  orb2: {
    top: '60%',
    right: '15%',
    width: 150,
    height: 150,
    backgroundColor: COLORS.secondary,
  },
  orb3: {
    bottom: '30%',
    left: '25%',
    width: 100,
    height: 100,
    backgroundColor: COLORS.activePulse,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
  },
  brandTitle: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.primaryText,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: SPACING.xs,
  },
  brandSubtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    letterSpacing: 2,
  },
  progressSection: {
    alignItems: 'center',
    width: '60%',
  },
  progressBar: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.outlineVariant,
    opacity: 0.3,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '30%',
    backgroundColor: COLORS.primaryText,
    animation: 'progressAnimation 2s infinite',
  },
  progressText: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.secondaryText,
    letterSpacing: 1,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: SPACING.lg,
  },
  footerText: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.outlineVariant,
    letterSpacing: 1,
  },
});

export default LoadingScreen;