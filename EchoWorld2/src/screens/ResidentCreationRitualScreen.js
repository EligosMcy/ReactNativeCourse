import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, DESIGN_PRINCIPLES } from '../constants/DesignSystem';

const { width, height } = Dimensions.get('window');

const ResidentCreationRitualScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // 模拟生成进度
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // 完成后跳转到居民详情
          setTimeout(() => {
            navigation.replace('ResidentDetail', { 
              resident: {
                id: 'new',
                name: '新居民',
                description: '刚刚诞生的数字生命',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0zQ4TxCaLCTJ1dVPjFh_cHIRSMBbQ7UvMZx502lvfdGzz8X9d6Bskciaq3YQMcJOah9QLzHEmqsuD6w6TNaxM4nK-FEXCVzfllmaDSCsstT8JdI_C5tTeGXdbGSKlsBq1zVpmXpCasI4ptMDoiS6oz8nnsQTcBbeBhpSekU_-O3B2OmkL6h8Tay3pyvR2OkQM6HamOpp274kYIctJ6e0q4LQvCmx5UXy93QTfD9GNQmbFFd8X8iZbU6YHhHUzFQNXoYAwuDZW5Fk'
              }
            });
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* 抽象背景元素 */}
      <View style={styles.backgroundElements}>
        <View style={[styles.orb, styles.orb1]} />
        <View style={[styles.orb, styles.orb2]} />
        <View style={[styles.orb, styles.orb3]} />
      </View>

      {/* 主内容区域 */}
      <View style={styles.content}>
        {/* 仪式标题 */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>数字生命唤醒仪式</Text>
          <Text style={styles.subtitle}>正在将现实物件转化为数字存在</Text>
        </View>

        {/* 进度显示 */}
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>

        {/* 状态指示器 */}
        <View style={styles.statusSection}>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, progress > 20 && styles.statusDotActive]} />
            <Text style={styles.statusLabel}>数据解析</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, progress > 50 && styles.statusDotActive]} />
            <Text style={styles.statusLabel}>人格构建</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, progress > 80 && styles.statusDotActive]} />
            <Text style={styles.statusLabel}>意识激活</Text>
          </View>
        </View>

        {/* 仪式描述 */}
        <View style={styles.ritualDescription}>
          <Text style={styles.ritualText}>
            每一个物件都蕴含着独特的记忆和情感。
            我们正在将这些无形的特质转化为可对话的数字生命。
          </Text>
        </View>

        {/* 活性脉冲效果 */}
        <View style={styles.pulseEffect}>
          <View style={[styles.pulseCircle, styles.pulse1]} />
          <View style={[styles.pulseCircle, styles.pulse2]} />
          <View style={[styles.pulseCircle, styles.pulse3]} />
        </View>
      </View>

      {/* 底部信息 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ECHOWORLD · 数字居所系统</Text>
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
    borderRadius: BORDER_RADIUS.full,
    opacity: 0.03,
  },
  orb1: {
    top: '15%',
    left: '5%',
    width: 250,
    height: 250,
    backgroundColor: COLORS.primary,
  },
  orb2: {
    top: '50%',
    right: '10%',
    width: 180,
    height: 180,
    backgroundColor: COLORS.secondary,
  },
  orb3: {
    bottom: '20%',
    left: '20%',
    width: 120,
    height: 120,
    backgroundColor: COLORS.activePulse,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: SPACING.xl,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
  },
  title: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.primaryText,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    textAlign: 'center',
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
    width: '80%',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 2,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.activePulse,
    borderRadius: 2,
  },
  progressText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.activePulse,
  },
  statusSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: SPACING.xxl,
  },
  statusItem: {
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.outlineVariant,
    marginBottom: SPACING.xs,
  },
  statusDotActive: {
    backgroundColor: COLORS.activePulse,
  },
  statusLabel: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.secondaryText,
  },
  ritualDescription: {
    maxWidth: 300,
    marginBottom: SPACING.xxl,
  },
  ritualText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    textAlign: 'center',
    lineHeight: 24,
  },
  pulseEffect: {
    position: 'relative',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.activePulse,
  },
  pulse1: {
    width: 60,
    height: 60,
    opacity: 0.3,
    animation: 'pulse 2s infinite',
  },
  pulse2: {
    width: 80,
    height: 80,
    opacity: 0.2,
    animation: 'pulse 2s infinite 0.5s',
  },
  pulse3: {
    width: 100,
    height: 100,
    opacity: 0.1,
    animation: 'pulse 2s infinite 1s',
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

export default ResidentCreationRitualScreen;