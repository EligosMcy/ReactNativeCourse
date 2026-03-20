import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../constants/DesignSystem';

const ResidentCreationRitualScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('初始化数字意识...');
  const pulseAnim = new Animated.Value(0);

  useEffect(() => {
    // 脉冲动画
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    // 模拟生成进度
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        // 更新状态文本
        if (newProgress < 25) setStatus('初始化数字意识...');
        else if (newProgress < 50) setStatus('构建人格模型...');
        else if (newProgress < 75) setStatus('注入记忆片段...');
        else if (newProgress < 90) setStatus('激活情感模块...');
        else setStatus('完成数字生命生成...');

        if (newProgress >= 100) {
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
        return newProgress;
      });
    }, 50);
    
    return () => {
      clearInterval(timer);
      pulse.stop();
    };
  }, [navigation, pulseAnim]);

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1]
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>数字生命生成仪式</Text>
        
        <View style={styles.ritualCircle}>
          <Animated.View 
            style={[
              styles.pulseCircle,
              { opacity: pulseOpacity }
            ]} 
          />
          <View style={styles.centerCircle}>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        </View>

        <Text style={styles.statusText}>{status}</Text>
        
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.description}>
          正在为您的数字居民注入生命能量...
          这个过程需要一些时间，请耐心等待。
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.primaryText,
    marginBottom: SPACING.xxl,
    textAlign: 'center',
  },
  ritualCircle: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  pulseCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: COLORS.activePulse,
  },
  centerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.activePulse,
  },
  progressText: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.activePulse,
  },
  statusText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  progressBar: {
    width: '80%',
    height: 6,
    backgroundColor: COLORS.surfaceContainerHighest,
    borderRadius: 3,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.activePulse,
    borderRadius: 3,
  },
  description: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ResidentCreationRitualScreen;