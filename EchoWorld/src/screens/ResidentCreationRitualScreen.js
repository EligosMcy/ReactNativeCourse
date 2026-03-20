import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const ResidentCreationRitualScreen = ({ navigation, route }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // 模拟生成进度
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const handleComplete = () => {
    navigation.navigate('ResidentDetail', { 
      resident: {
        id: 'new',
        name: '新居民',
        description: '刚刚诞生的数字生命',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0zQ4TxCaLCTJ1dVPjFh_cHIRSMBbQ7UvMZx502lvfdGzz8X9d6Bskciaq3YQMcJOah9QLzHEmqsuD6w6TNaxM4nK-FEXCVzfllmaDSCsstT8JdI_C5tTeGXdbGSKlsBq1zVpmXpCasI4ptMDoiS6oz8nnsQTcBbeBhpSekU_-O3B2OmkL6h8Tay3pyvR2OkQM6HamOpp274kYIctJ6e0q4LQvCmx5UXy93QTfD9GNQmbFFd8X8iZbU6YHhHUzFQNXoYAwuDZW5Fk'
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ECHOWORLD</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Main Ceremony Canvas */}
      <View style={styles.mainContent}>
        {/* Abstract Background Orbs */}
        <View style={styles.backgroundOrbs}>
          <View style={[styles.orb, styles.orb1]} />
          <View style={[styles.orb, styles.orb2]} />
        </View>

        {/* The Merging Frames: Creation Ritual */}
        <View style={styles.mergingFrames}>
          {/* Frame 1: Prototype Identity */}
          <View style={styles.frameContainer}>
            <View style={styles.frame}>
              <ImageBackground 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0zQ4TxCaLCTJ1dVPjFh_cHIRSMBbQ7UvMZx502lvfdGzz8X9d6Bskciaq3YQMcJOah9QLzHEmqsuD6w6TNaxM4nK-FEXCVzfllmaDSCsstT8JdI_C5tTeGXdbGSKlsBq1zVpmXpCasI4ptMDoiS6oz8nnsQTcBbeBhpSekU_-O3B2OmkL6h8Tay3pyvR2OkQM6HamOpp274kYIctJ6e0q4LQvCmx5UXy93QTfD9GNQmbFFd8X8iZbU6YHhHUzFQNXoYAwuDZW5Fk' }}
                style={styles.frameImage}
                imageStyle={styles.frameImageStyle}
              >
                <View style={styles.frameOverlay} />
              </ImageBackground>
            </View>
            
            {/* Identity Marker */}
            <View style={styles.identityMarkerLeft}>
              <Text style={styles.markerLabel}>Source</Text>
              <Text style={styles.markerTitle}>Biometric Root</Text>
            </View>
          </View>

          {/* Merging Portal (Visual Center) */}
          <View style={styles.mergingPortal}>
            <View style={styles.portalLine} />
            <View style={styles.portalIcon}>
              <Text style={styles.portalIconText}>🌊</Text>
            </View>
            <View style={styles.portalLine} />
          </View>

          {/* Frame 2: Residency Space */}
          <View style={styles.frameContainer}>
            <View style={styles.frame}>
              <ImageBackground 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0T8TwEBV5Rulm-KcZ5lXkgFEb8e7YUz9KJL4TDJUlgiqP_0BIWn_P3zJQ_Yd_4hIqWmR8rLTcWx_4RNiidGchnL0DLwcORGtK2L5JG1M7MDiq2F7pcYGsKA95Sf_krjYGJgKvgONH_D5MYAZKjEDr-3oN8uNnw_wKkx4r6tPZq671Ncg1qsYCjtGEzGDvqEWmNWn4DUYTFLdLr6QQlewiaAZChclZDEiwkgbaGSGqwvxfBZZUqcMGyiwZMXxlwDjRXk6X-kF7IqI' }}
                style={styles.frameImage}
                imageStyle={styles.frameImageStyle}
              >
                <View style={styles.frameOverlay2} />
                <View style={styles.neuralOverlay} />
              </ImageBackground>
            </View>
            
            {/* Identity Marker */}
            <View style={styles.identityMarkerRight}>
              <Text style={styles.markerLabel}>Destination</Text>
              <Text style={styles.markerTitle}>Echo Residency</Text>
            </View>
          </View>
        </View>

        {/* Progress and Status */}
        <View style={styles.progressSection}>
          {/* Central Status */}
          <View style={styles.statusSection}>
            <Text style={styles.statusTitle}>正在诞生...</Text>
            <View style={styles.statusIndicators}>
              <View style={styles.statusItem}>
                <View style={[styles.statusDot, styles.statusDotActive]} />
                <Text style={styles.statusText}>NEURAL MAPPING: <Text style={styles.statusValue}>活跃 / Active</Text></Text>
              </View>
              <View style={styles.statusDivider} />
              <View style={styles.statusItem}>
                <View style={[styles.statusDot, styles.statusDotStable]} />
                <Text style={styles.statusText}>IDENTITY SYNC: <Text style={styles.statusValue}>稳定 / Stable</Text></Text>
              </View>
            </View>
          </View>

          {/* Custom Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progress}%` }
                ]} 
              />
              <View style={styles.progressShimmer} />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressPhase}>Sync Phase III</Text>
              <Text style={styles.progressPercentage}>{progress}% Complete</Text>
            </View>
          </View>

          {/* Informational "Echo" Tags */}
          <View style={styles.echoTags}>
            <View style={styles.echoTag}>
              <Text style={styles.echoTagText}>Memory Anchoring</Text>
            </View>
            <View style={styles.echoTag}>
              <Text style={styles.echoTagText}>Vocal Synthesis</Text>
            </View>
            <View style={styles.echoTag}>
              <Text style={styles.echoTagText}>Soul-Binding</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Navigation Shell (Bottom) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🗺</Text>
          <Text style={styles.navLabel}>Map</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📚</Text>
          <Text style={styles.navLabel}>Archive</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItemActive}>
          <Text style={styles.navIconActive}>🌊</Text>
          <Text style={styles.navLabelActive}>Echoes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'rgba(249, 249, 247, 0.8)',
    backdropFilter: 'blur(20px)',
    shadowColor: '#2d3432',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 40,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
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
  notificationButton: {
    padding: 8,
  },
  notificationIcon: {
    fontSize: 20,
    color: '#5f5e5e',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 80,
    position: 'relative',
  },
  backgroundOrbs: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -10,
  },
  orb: {
    position: 'absolute',
    borderRadius: 9999,
  },
  orb1: {
    top: '25%',
    left: '25%',
    width: 384,
    height: 384,
    backgroundColor: 'rgba(228, 226, 225, 0.2)',
    filter: 'blur(120px)',
  },
  orb2: {
    bottom: '25%',
    right: '25%',
    width: 500,
    height: 500,
    backgroundColor: 'rgba(242, 227, 250, 0.1)',
    filter: 'blur(150px)',
  },
  mergingFrames: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 48,
    marginBottom: 96,
  },
  frameContainer: {
    position: 'relative',
  },
  frame: {
    width: 288,
    height: 480,
    backgroundColor: '#f2f4f2',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
  },
  frameImage: {
    width: '100%',
    height: '100%',
  },
  frameImageStyle: {
    width: '100%',
    height: '100%',
  },
  frameOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, rgba(242, 244, 242, 0.8), transparent)',
  },
  frameOverlay2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(95, 94, 94, 0.2), transparent)',
  },
  neuralOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(249,249,247,0) 0%, rgba(228,226,225,0.4) 50%, rgba(249,249,247,0) 100%)',
    opacity: 0.4,
  },
  identityMarkerLeft: {
    position: 'absolute',
    bottom: -24,
    left: 24,
    padding: 16,
    backgroundColor: 'rgba(249, 249, 247, 0.9)',
    backdropFilter: 'blur(10px)',
    borderLeftWidth: 2,
    borderLeftColor: '#5f5e5e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  identityMarkerRight: {
    position: 'absolute',
    top: -24,
    right: 24,
    padding: 16,
    backgroundColor: 'rgba(249, 249, 247, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRightWidth: 2,
    borderRightColor: '#51616e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'flex-end',
  },
  markerLabel: {
    fontFamily: 'Inter',
    fontSize: 10,
    letterSpacing: 2,
    color: '#767c79',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  markerTitle: {
    fontFamily: 'Noto Serif',
    fontSize: 18,
    fontStyle: 'italic',
    color: '#5f5e5e',
  },
  mergingPortal: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 128,
  },
  portalLine: {
    height: 1,
    width: '100%',
    background: 'linear-gradient(to right, transparent, #adb3b0, transparent)',
    opacity: 0.3,
  },
  portalIcon: {
    marginVertical: 32,
  },
  portalIconText: {
    fontSize: 24,
    color: '#535252',
    animation: 'pulse 2s infinite',
  },
  progressSection: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  statusSection: {
    marginBottom: 48,
    alignItems: 'center',
  },
  statusTitle: {
    fontFamily: 'Noto Serif',
    fontSize: 24,
    color: '#2d3432',
    marginBottom: 8,
  },
  statusIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  statusDotActive: {
    backgroundColor: '#51616e',
  },
  statusDotStable: {
    backgroundColor: '#5f5e5e',
  },
  statusText: {
    fontFamily: 'Inter',
    fontSize: 11,
    letterSpacing: 1.5,
    color: '#767c79',
    textTransform: 'uppercase',
  },
  statusValue: {
    color: '#2d3432',
    fontWeight: '500',
  },
  statusDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#adb3b0',
    opacity: 0.3,
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 64,
  },
  progressBar: {
    width: '100%',
    height: 3,
    backgroundColor: '#dee4e0',
    borderRadius: 1.5,
    overflow: 'hidden',
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5f5e5e',
    shadowColor: '#5f5e5e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    transition: 'width 0.1s ease-in-out',
  },
  progressShimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
    transform: [{ translateX: -100 }],
    animation: 'shimmer 2s infinite',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  progressPhase: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 2,
    color: '#767c79',
    textTransform: 'uppercase',
  },
  progressPercentage: {
    fontFamily: 'Noto Serif',
    fontSize: 12,
    fontStyle: 'italic',
    color: '#2d3432',
  },
  echoTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  echoTag: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  echoTagText: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 32,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(249, 249, 247, 0.9)',
    backdropFilter: 'blur(20px)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#2d3432',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.03,
    shadowRadius: 30,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#adb3b0',
    opacity: 0.6,
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#5f5e5e',
    position: 'relative',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navIconActive: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontFamily: 'Inter',
    fontSize: 10,
    letterSpacing: 1,
    color: '#adb3b0',
    textTransform: 'uppercase',
  },
  navLabelActive: {
    fontFamily: 'Inter',
    fontSize: 10,
    letterSpacing: 1,
    color: '#5f5e5e',
    textTransform: 'uppercase',
  },
});

export default ResidentCreationRitualScreen;