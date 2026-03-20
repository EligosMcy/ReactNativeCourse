import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LoadingScreen = ({ navigation }) => {
  const progressAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '35%'],
  });

  return (
    <View style={styles.container}>
      {/* Atmospheric Depth Elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>
      
      {/* Main Content Canvas */}
      <View style={styles.content}>
        {/* Empty top spacer */}
        <View style={styles.topSpacer} />
        
        {/* Center Identity: ECHOWORLD */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>ECHOWORLD</Text>
          <View style={styles.divider} />
        </View>
        
        {/* Bottom Loading Logic */}
        <View style={styles.loadingContainer}>
          {/* Progress Bar Container */}
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
          </View>
          
          {/* Status Text */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>正在开启...</Text>
            {/* Narrative tag */}
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>The Digital Curator</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Visual Polish: Soft Vignette */}
      <View style={styles.vignette} />
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
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  circle1: {
    top: '-10%',
    left: '-10%',
    width: width * 0.5,
    height: height * 0.5,
    backgroundColor: 'rgba(212, 229, 244, 0.3)',
    filter: 'blur(80px)',
  },
  circle2: {
    top: '20%',
    right: '-5%',
    width: width * 0.4,
    height: height * 0.6,
    backgroundColor: 'rgba(242, 227, 250, 0.2)',
    filter: 'blur(80px)',
  },
  circle3: {
    bottom: '-15%',
    left: '20%',
    width: width * 0.6,
    height: height * 0.4,
    backgroundColor: 'rgba(222, 228, 224, 0.4)',
    filter: 'blur(80px)',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingVertical: 96,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topSpacer: {
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    gap: 24,
  },
  logoText: {
    fontFamily: 'Noto Serif',
    fontSize: 40,
    letterSpacing: 16,
    color: '#2d3432',
    fontWeight: '300',
    opacity: 0.9,
  },
  divider: {
    width: 48,
    height: 1,
    backgroundColor: 'rgba(173, 179, 176, 0.3)',
  },
  loadingContainer: {
    width: '100%',
    maxWidth: 280,
    gap: 32,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 1,
    backgroundColor: '#dee4e0',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5f5e5e',
    opacity: 0.6,
  },
  statusContainer: {
    gap: 8,
    alignItems: 'center',
  },
  statusText: {
    fontFamily: 'Inter',
    fontSize: 10,
    letterSpacing: 2,
    color: '#2d3432',
    opacity: 0.7,
    textTransform: 'uppercase',
  },
  tagContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(242, 227, 250, 0.4)',
    borderRadius: 9999,
  },
  tagText: {
    fontFamily: 'Inter',
    fontSize: 8,
    letterSpacing: 4,
    color: 'rgba(102, 91, 110, 0.6)',
    textTransform: 'uppercase',
  },
  vignette: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 40,
    borderColor: 'rgba(249, 249, 247, 0.1)',
    pointerEvents: 'none',
  },
});

export default LoadingScreen;