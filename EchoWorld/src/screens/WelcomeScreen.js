import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={[styles.gradientCircle, styles.circle1]} />
        <View style={[styles.gradientCircle, styles.circle2]} />
      </View>
      
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>ECHOWORLD</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>
            "这不是游戏，更像是一个数字居所。"
          </Text>
          <View style={styles.quoteDivider} />
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.primaryButtonText}>开启您的居所</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.secondaryButtonText}>返回家园</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Privacy</Text>
          <Text style={styles.footerLink}>Terms</Text>
          <Text style={[styles.footerLink, styles.archiveLink]}>Archives</Text>
        </View>
      </View>
      
      <View style={styles.decorativeText}>
        <Text style={styles.decorativeTextContent}>EST. MMXXIV</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientCircle: {
    position: 'absolute',
    borderRadius: 9999,
    mixBlendMode: 'multiply',
    filter: 'blur(120px)',
  },
  circle1: {
    top: '25%',
    right: '25%',
    width: 500,
    height: 500,
    backgroundColor: '#d4e5f4',
  },
  circle2: {
    bottom: '25%',
    left: '25%',
    width: 400,
    height: 400,
    backgroundColor: '#f2e3fa',
  },
  logoContainer: {
    position: 'absolute',
    top: 64,
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Inter',
    fontSize: 20,
    letterSpacing: 16,
    color: '#2d3432',
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  content: {
    width: '100%',
    maxWidth: 768,
    alignItems: 'center',
    gap: 64,
  },
  quoteContainer: {
    gap: 24,
    alignItems: 'center',
  },
  quoteText: {
    fontFamily: 'Inter',
    fontSize: 36,
    color: '#2d3432',
    fontStyle: 'italic',
    lineHeight: 40,
    textAlign: 'center',
  },
  quoteDivider: {
    width: 48,
    height: 1,
    backgroundColor: 'rgba(173, 179, 176, 0.3)',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 384,
    gap: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryButton: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 16,
    backgroundColor: '#5f5e5e',
    borderRadius: 12,
    shadowColor: '#2d3432',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 40,
  },
  primaryButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    letterSpacing: 1,
    color: '#faf7f6',
    textAlign: 'center',
  },
  secondaryButton: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 16,
    backgroundColor: '#f2f4f2',
    borderWidth: 1,
    borderColor: 'rgba(173, 179, 176, 0.1)',
    borderRadius: 12,
  },
  secondaryButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    letterSpacing: 1,
    color: '#51616e',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 64,
    width: '100%',
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 32,
    opacity: 0.5,
  },
  footerLink: {
    fontFamily: 'Inter',
    fontSize: 10,
    letterSpacing: 2,
    color: '#767c79',
    textTransform: 'uppercase',
  },
  archiveLink: {
    color: '#5f5e5e',
  },
  decorativeText: {
    position: 'absolute',
    bottom: 80,
    left: 48,
    opacity: 0.4,
  },
  decorativeTextContent: {
    fontFamily: 'Inter',
    fontSize: 14,
    letterSpacing: 4,
    color: '#51616e',
    writingDirection: 'vertical-lr',
  },
});

export default WelcomeScreen;