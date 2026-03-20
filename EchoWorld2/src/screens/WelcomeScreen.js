import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, DESIGN_PRINCIPLES } from '../constants/DesignSystem';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      {/* 抽象背景 - 体现"空灵"质感 */}
      <View style={styles.backgroundElements}>
        <View style={[styles.backgroundShape, styles.shape1]} />
        <View style={[styles.backgroundShape, styles.shape2]} />
        <View style={[styles.textureOverlay]} />
      </View>

      {/* 主内容区域 */}
      <View style={styles.content}>
        {/* 标题区域 - 文学化表达 */}
        <View style={styles.titleSection}>
          <Text style={styles.welcomeText}>欢迎来到</Text>
          <Text style={styles.brandTitle}>ECHOWORLD</Text>
          <Text style={styles.subtitle}>数字居所</Text>
        </View>

        {/* 描述文本 - 体现"档案馆"质感 */}
        <View style={styles.descriptionSection}>
          <Text style={styles.description}>
            在这里，每一个物件都拥有自己的故事。
            它们不再是沉默的存在，而是等待被唤醒的数字生命。
          </Text>
          <Text style={styles.descriptionHint}>
            开启您的居所，开始这段奇妙的旅程。
          </Text>
        </View>

        {/* 操作按钮区域 */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleSignup}
          >
            <Text style={styles.primaryButtonText}>开启您的居所</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleLogin}
          >
            <Text style={styles.secondaryButtonText}>返回家园</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 底部装饰元素 */}
      <View style={styles.footer}>
        <View style={styles.footerLine} />
        <Text style={styles.footerText}>数字生命档案馆</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
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
    top: -100,
    right: -50,
    width: 300,
    height: 300,
    backgroundColor: COLORS.primary,
  },
  shape2: {
    bottom: -80,
    left: -40,
    width: 200,
    height: 200,
    backgroundColor: COLORS.secondary,
  },
  textureOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(249,249,247,0) 0%, rgba(228,226,225,0.1) 50%, rgba(249,249,247,0) 100%)',
    opacity: 0.3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
  },
  welcomeText: {
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.secondaryText,
    letterSpacing: 2,
    marginBottom: SPACING.xs,
  },
  brandTitle: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.primaryText,
    letterSpacing: 6,
    textTransform: 'uppercase',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    letterSpacing: 3,
  },
  descriptionSection: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
    maxWidth: 300,
  },
  description: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.primaryText,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.lg,
  },
  descriptionHint: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.secondaryText,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actionSection: {
    width: '100%',
    maxWidth: 280,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
    // 玻璃态效果
    ...DESIGN_PRINCIPLES.glassmorphism,
  },
  primaryButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
    letterSpacing: 1,
  },
  secondaryButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    // 幽灵边框
    borderWidth: DESIGN_PRINCIPLES.ghostBorder.width,
    borderColor: DESIGN_PRINCIPLES.ghostBorder.color,
  },
  secondaryButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
    letterSpacing: 1,
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
    alignItems: 'center',
  },
  footerLine: {
    width: 40,
    height: 1,
    backgroundColor: COLORS.outlineVariant,
    opacity: 0.3,
    marginBottom: SPACING.sm,
  },
  footerText: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.outlineVariant,
    letterSpacing: 2,
  },
});

export default WelcomeScreen;