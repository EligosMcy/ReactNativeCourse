import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const MainScreen = ({ navigation }) => {
  const handleCreateResident = () => {
    // 导航到创建居民界面
    navigation.navigate('CreateResident');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleMenu = () => {
    // 打开侧边菜单
    console.log('Open menu');
  };

  return (
    <View style={styles.container}>
      {/* TopAppBar Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.menuButton} onPress={handleMenu}>
            <Text style={styles.menuIcon}>≡</Text>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>ECHOWORLD</Text>
          
          <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
            <Text style={styles.settingsIcon}>⚙</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerDivider} />
      </View>

      {/* Blurred Map Background Layer */}
      <ImageBackground 
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeJiTifViA2v9TC0BqFPip5rFVgYn7bAR5K6z3Z6lMoSpN611iFsF3qCk9jo2_BVpv3_sudRwuMC63jYb2icRYSX6uKxkfOM-q6c5xyGNPXLAxixw2B5eST1umEgO43ZJKFWaoZa5kZrTpSuVi1UC-3TerSZvnMAVH-_hOq1OiPQNw0MCcJmAN0FxIbTM3s7mp7rT9MLaMJuZkra1sUcyjFJPQvVbINXtMNTH-gVd-pB-ZTt4ubkEOTCAViyxcVbsmdgPPl4aUPZQ' }}
        style={styles.mapBackground}
        imageStyle={styles.mapImage}
      >
        {/* Main Canvas: Empty Map State */}
        <View style={styles.mainContent}>
          {/* Center Content */}
          <View style={styles.centerContent}>
            {/* Decorative Icon / Glyph */}
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🌍</Text>
            </View>
            
            <Text style={styles.title}>
              这个世界是空的。
            </Text>
            <Text style={styles.subtitle}>
              创建您的第一个居民以开始叙述。
            </Text>
            
            {/* Primary Action */}
            <TouchableOpacity 
              style={styles.createButton}
              onPress={handleCreateResident}
            >
              <Text style={styles.createIcon}>+</Text>
              <Text style={styles.createButtonText}>创建居民</Text>
            </TouchableOpacity>
            
            {/* Secondary Hint */}
            <View style={styles.hintSection}>
              <View style={styles.hintLine} />
              <Text style={styles.hintText}>Archive Empty</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* BottomNavBar Section */}
      <View style={styles.bottomNav}>
        {/* Map (Active) */}
        <TouchableOpacity style={styles.navItemActive}>
          <Text style={styles.navIconActive}>🗺</Text>
          <Text style={styles.navLabelActive}>Map</Text>
        </TouchableOpacity>
        
        {/* Archive */}
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📚</Text>
          <Text style={styles.navLabel}>Archive</Text>
        </TouchableOpacity>
        
        {/* Echoes */}
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🌊</Text>
          <Text style={styles.navLabel}>Echoes</Text>
        </TouchableOpacity>
        
        {/* Profile */}
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: 'rgba(249, 249, 247, 0.8)',
    backdropFilter: 'blur(20px)',
    shadowColor: '#2d3432',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 40,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    height: 64,
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
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 20,
    color: '#5f5e5e',
  },
  headerDivider: {
    backgroundColor: '#f2f4f2',
    height: 1,
    width: '100%',
    opacity: 0.3,
  },
  mapBackground: {
    flex: 1,
    marginTop: 64,
    marginBottom: 80,
  },
  mapImage: {
    opacity: 0.4,
    filter: 'grayscale(100%) contrast(90%) blur(4px)',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 96,
  },
  centerContent: {
    maxWidth: 400,
    paddingHorizontal: 32,
    alignItems: 'center',
    textAlign: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f2f4f2',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    marginBottom: 48,
  },
  icon: {
    fontSize: 32,
    color: '#767c79',
  },
  title: {
    fontFamily: 'Noto Serif',
    fontSize: 36,
    color: '#2d3432',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    color: '#5a605e',
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
    maxWidth: 300,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#5f5e5e',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#5f5e5e',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
  },
  createIcon: {
    fontSize: 18,
    color: '#faf7f6',
  },
  createButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#faf7f6',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  hintSection: {
    marginTop: 80,
    alignItems: 'center',
    gap: 16,
    opacity: 0.4,
  },
  hintLine: {
    width: 1,
    height: 48,
    backgroundColor: '#adb3b0',
  },
  hintText: {
    fontFamily: 'Inter',
    fontSize: 10,
    letterSpacing: 4,
    color: '#767c79',
    textTransform: 'uppercase',
    fontWeight: '500',
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
    zIndex: 50,
    shadowColor: '#2d3432',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.03,
    shadowRadius: 30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
    opacity: 0.6,
  },
  navItemActive: {
    alignItems: 'center',
    padding: 8,
  },
  navIcon: {
    fontSize: 20,
    color: '#adb3b0',
    marginBottom: 4,
  },
  navIconActive: {
    fontSize: 20,
    color: '#5f5e5e',
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

export default MainScreen;