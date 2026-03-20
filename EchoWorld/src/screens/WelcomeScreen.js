import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Pattern */}
      <View style={styles.backgroundPattern} />
      
      {/* Logo/Brand Top Anchor */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>ECHOWORLD</Text>
      </View>
      
      {/* Central Content Canvas */}
      <View style={styles.contentContainer}>
        {/* Hero Quote */}
        <View style={styles.heroContainer}>
          <Text style={styles.heroQuote}>
            "这不是游戏，{`\n`}更像是一个数字居所。"
          </Text>
          <View style={styles.divider} />
        </View>
        
        {/* Interaction Cluster */}
        <View style={styles.buttonContainer}>
          {/* Primary Action (Signup) */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.primaryButtonText}>开启您的居所</Text>
          </TouchableOpacity>
          
          {/* Secondary Action (Login) */}
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.secondaryButtonText}>返回家园</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Decorative Elements */}
      <View style={styles.decorativeContainer}>
        <Text style={styles.estText}>EST. MMXXIV</Text>
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Privacy</Text>
          <Text style={styles.footerLink}>Terms</Text>
          <Text style={[styles.footerLink, styles.archiveLink]}>Archives</Text>
        </View>
      </View>
      
      {/* Floating Abstract Graphic */}
      <View style={styles.floatingGraphics}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
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
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
    zIndex: -20,
  },
  logoContainer: {
    position: 'absolute',
    top: 64,
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Noto Serif',
    fontSize: 20,
    letterSpacing: 8,
    color: '#2d3432',
    opacity: 0.8,
    textTransform: 'uppercase',
  },
  contentContainer: {
    maxWidth: 768,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 64,
    paddingHorizontal: 32,
  },
  heroContainer: {
    gap: 24,
    alignItems: 'center',
  },
  heroQuote: {
    fontFamily: 'Noto Serif',
    fontSize: 36,
    color: '#2d3432',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 44,
  },
  divider: {
    width: 48,
    height: 1,
    backgroundColor: 'rgba(173, 179, 176, 0.3)',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 16,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  primaryButton: {
    backgroundColor: '#5f5e5e',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#2d3432',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 40,
    elevation: 5,
    width: '100%',
  },
  primaryButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#faf7f6',
    letterSpacing: 1,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#f2f4f2',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(173, 179, 176, 0.1)',
    width: '100%',
  },
  secondaryButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#51616e',
    letterSpacing: 1,
    textAlign: 'center',
  },
  decorativeContainer: {
    position: 'absolute',
    bottom: 64,
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  estText: {
    fontFamily: 'Noto Serif',
    fontSize: 14,
    letterSpacing: 4,
    color: '#455562',
    opacity: 0.4,
    writingDirection: 'vertical-lr',
    position: 'absolute',
    bottom: 80,
    left: 48,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 32,
  },
  footerLink: {
    fontFamily: 'Inter',
    fontSize: 10,
    letterSpacing: 2,
    color: '#767c79',
    opacity: 0.5,
    textTransform: 'uppercase',
  },
  archiveLink: {
    color: '#5f5e5e',
  },
  floatingGraphics: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -width/2 }, { translateY: -height/2 }],
    width: '100%',
    height: '100%',
    zIndex: -10,
    opacity: 0.2,
    pointerEvents: 'none',
  },
  circle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  circle1: {
    top: '25%',
    right: '25%',
    width: 500,
    height: 500,
    backgroundColor: 'rgba(212, 229, 244, 0.3)',
    filter: 'blur(120px)',
  },
  circle2: {
    bottom: '25%',
    left: '25%',
    width: 400,
    height: 400,
    backgroundColor: 'rgba(242, 227, 250, 0.3)',
    filter: 'blur(100px)',
  },
});

export default WelcomeScreen;