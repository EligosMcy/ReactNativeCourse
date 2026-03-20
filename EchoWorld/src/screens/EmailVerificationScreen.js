import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const EmailVerificationScreen = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState(900); // 15分钟

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVerified = () => {
    navigation.navigate('PlayerSetup');
  };

  const handleResend = () => {
    setTimeLeft(900); // 重置为15分钟
  };

  return (
    <View style={styles.container}>
      {/* TopAppBar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ECHOWORLD</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Animated Visual Section */}
        <View style={styles.visualSection}>
          {/* Background Glow */}
          <View style={styles.backgroundGlow} />
          
          {/* Stylized Envelope Icon Container */}
          <View style={styles.envelopeContainer}>
            <View style={styles.envelopeContent}>
              <Text style={styles.envelopeIcon}>✉️</Text>
              <View style={styles.dotsContainer}>
                <View style={[styles.dot, styles.dot1]} />
                <View style={[styles.dot, styles.dot2]} />
                <View style={[styles.dot, styles.dot3]} />
              </View>
            </View>
          </View>
          
          {/* Floating Decoration Elements */}
          <View style={[styles.floatingElement, styles.floatingElement1]} />
          <View style={[styles.floatingElement, styles.floatingElement2]} />
        </View>

        {/* Typography Section */}
        <View style={styles.textSection}>
          <Text style={styles.title}>查收您的数字信函</Text>
          <Text style={styles.subtitle}>
            为了确保您的数字档案安全，我们已向您的注册邮箱发送了一封带有验证链接的信件。请在 
            <Text style={styles.highlight}>15 分钟</Text> 内完成确认。
          </Text>
        </View>

        {/* Action Section */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerified}>
            <Text style={styles.verifyButtonText}>已验证，进入</Text>
          </TouchableOpacity>
          
          <View style={styles.timerSection}>
            <View style={styles.timerContainer}>
              <Text style={styles.timerIcon}>⏰</Text>
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            </View>
            
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>没有收到邮件？</Text>
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendLink}>重新发送验证码</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Subtext/Note Section */}
        <View style={styles.tipSection}>
          <View style={styles.tipIcon}>
            <Text style={styles.tipIconText}>💡</Text>
          </View>
          <Text style={styles.tipText}>
            <Text style={styles.tipTitle}>小贴士</Text>
            {'\n'}
            如果您的收件箱没有出现该信件，请检查"垃圾邮件"或"订阅"分类。有时数字回响需要一些时间才能抵达。
          </Text>
        </View>
      </View>

      {/* Decorative Canvas Overlay */}
      <View style={styles.decorativeCanvas}>
        <View style={[styles.canvasElement, styles.canvasElement1]} />
        <View style={[styles.canvasElement, styles.canvasElement2]} />
      </View>
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
    height: 64,
    backgroundColor: 'rgba(249, 249, 247, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    zIndex: 50,
    shadowColor: '#2d3432',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 40,
  },
  headerButton: {
    padding: 8,
  },
  headerIcon: {
    fontSize: 20,
    color: '#5f5e5e',
  },
  headerTitle: {
    fontFamily: 'Noto Serif',
    fontSize: 20,
    letterSpacing: 2,
    color: '#2d3432',
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 32,
    paddingTop: 96,
    paddingBottom: 40,
    alignItems: 'center',
    alignSelf: 'center',
  },
  visualSection: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    maxWidth: 280,
    marginBottom: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f2f4f2',
    borderRadius: 9999,
    transform: [{ scale: 1.1 }],
    opacity: 0.5,
    filter: 'blur(40px)',
  },
  envelopeContainer: {
    position: 'relative',
    zIndex: 10,
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2d3432',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.05,
    shadowRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  envelopeContent: {
    alignItems: 'center',
  },
  envelopeIcon: {
    fontSize: 48,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A8C3B8',
  },
  dot1: { opacity: 0.6 },
  dot2: { opacity: 0.4 },
  dot3: { opacity: 0.2 },
  floatingElement: {
    position: 'absolute',
    borderRadius: 9999,
  },
  floatingElement1: {
    top: -16,
    right: -16,
    width: 48,
    height: 48,
    backgroundColor: '#f2e3fa',
    opacity: 0.4,
    filter: 'blur(40px)',
  },
  floatingElement2: {
    bottom: 16,
    left: -32,
    width: 64,
    height: 64,
    backgroundColor: '#d4e5f4',
    opacity: 0.3,
    filter: 'blur(80px)',
  },
  textSection: {
    gap: 24,
    alignItems: 'center',
    marginBottom: 64,
  },
  title: {
    fontFamily: 'Noto Serif',
    fontSize: 28,
    color: '#2d3432',
    textAlign: 'center',
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#5a605e',
    textAlign: 'center',
    lineHeight: 24,
  },
  highlight: {
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#2d3432',
  },
  actionSection: {
    width: '100%',
    gap: 32,
    marginBottom: 80,
  },
  verifyButton: {
    backgroundColor: '#5f5e5e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#5f5e5e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  verifyButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#faf7f6',
    fontWeight: '500',
  },
  timerSection: {
    gap: 16,
    alignItems: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerIcon: {
    fontSize: 18,
    color: '#5a605e',
  },
  timerText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#5a605e',
    letterSpacing: -0.5,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resendText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#767c79',
  },
  resendLink: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#51616e',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  tipSection: {
    backgroundColor: 'rgba(242, 244, 242, 0.5)',
    padding: 24,
    borderRadius: 16,
    maxWidth: 320,
    position: 'relative',
    overflow: 'hidden',
  },
  tipIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    opacity: 0.1,
  },
  tipIconText: {
    fontSize: 32,
  },
  tipText: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#5a605e',
    opacity: 0.8,
    lineHeight: 18,
  },
  tipTitle: {
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#2d3432',
    marginBottom: 4,
  },
  decorativeCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -10,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  canvasElement: {
    position: 'absolute',
    borderRadius: 9999,
  },
  canvasElement1: {
    top: '25%',
    right: -80,
    width: 400,
    height: 400,
    backgroundColor: 'rgba(228, 226, 225, 0.2)',
    filter: 'blur(100px)',
  },
  canvasElement2: {
    bottom: '25%',
    left: -80,
    width: 400,
    height: 400,
    backgroundColor: 'rgba(212, 229, 244, 0.1)',
    filter: 'blur(100px)',
  },
});

export default EmailVerificationScreen;