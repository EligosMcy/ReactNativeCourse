import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing } from '../../theme';
import { Button } from '../../components/ui';
import { mockApi } from '../../services/mockApi';
import type { RootStackParamList } from '../../types';

type VerifyEmailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VerifyEmail'>;
type VerifyEmailRouteProp = RouteProp<RootStackParamList, 'VerifyEmail'>;

export const VerifyEmailScreen: React.FC = () => {
  const navigation = useNavigation<VerifyEmailNavigationProp>();
  const route = useRoute<VerifyEmailRouteProp>();
  const { email = 'test@example.com' } = route.params || {};
  
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendCountdown]);

  const handleResend = async () => {
    if (resendCountdown > 0) return;
    
    setResendCountdown(60);
    
    try {
      // 模拟重新发送验证邮件
      Alert.alert('提示', '验证邮件已重新发送');
    } catch (error) {
      Alert.alert('提示', '发送失败，请稍后重试');
      setResendCountdown(0);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleTestVerify = () => {
    // 测试用：模拟验证通过，直接进入下一步
    navigation.replace('SetPassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.brand}>ECHOWORLD</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.envelopeIcon}>
          <View style={styles.envelopeBody} />
          <View style={styles.envelopeFlap} />
        </View>

        <Text style={styles.title}>验证邮件已发送</Text>
        
        <Text style={styles.description}>
          请检查您的邮箱 <Text style={styles.emailHighlight}>{email}</Text>，点击邮件中的链接完成验证。
        </Text>

        <Button
          title={resendCountdown > 0 ? `重新发送(${resendCountdown}s)` : '重新发送'}
          onPress={handleResend}
          disabled={resendCountdown > 0}
          style={styles.resendButton}
        />

        {/* 测试按钮：模拟验证通过 */}
        <Button
          title="测试验证通过"
          onPress={handleTestVerify}
          variant="ghost"
          style={styles.testButton}
        />

        <Text style={styles.hint}>
          没有收到？检查垃圾邮件{' '}
          <Text style={styles.supportLink}>联系技术支持</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.pagePadding,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 20,
    color: colors.text.secondary,
  },
  brand: {
    fontFamily: 'serif',
    fontSize: typography.pageTitle.fontSize,
    fontWeight: typography.pageTitle.fontWeight,
    color: colors.text.primary,
    letterSpacing: 2,
  },
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.pagePadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  envelopeIcon: {
    width: 80,
    height: 60,
    marginBottom: spacing.xl,
    position: 'relative',
  },
  envelopeBody: {
    width: 80,
    height: 48,
    borderWidth: 2,
    borderColor: colors.text.secondary,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'absolute',
    bottom: 0,
  },
  envelopeFlap: {
    width: 0,
    height: 0,
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomWidth: 24,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.text.secondary,
    position: 'absolute',
    top: 0,
  },
  title: {
    fontFamily: 'serif',
    fontSize: typography.pageTitle.fontSize,
    fontWeight: typography.pageTitle.fontWeight,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.body.fontSize,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  emailHighlight: {
    color: colors.accent.primary,
    fontWeight: '500',
  },
  resendButton: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  testButton: {
    marginBottom: spacing.xl,
  },
  hint: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
  supportLink: {
    color: colors.accent.primary,
  },
});