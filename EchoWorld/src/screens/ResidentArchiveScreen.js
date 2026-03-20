import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const ResidentArchiveScreen = ({ navigation }) => {
  const residents = [
    {
      id: '1',
      name: '古旧相机',
      description: '记录时光的守护者',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3mgMlPVaF5OmXib751QZW5rf5MwLmBnFY9A4pmcJm_JjgfoAHLsetNelFpdmGknDBN90d8T_1E0QA0VmrvMdGyVmgrrwkiHAQJ_u82LmMmZP9qgW5-UWQp_xGx0GbSeWK8EaN8j6nipECWcDyGpecE_gD-FD7j_-MnvyYqUFXtYYOdp5lDJjxcfMEqOouqFNn5Uy_lGo4ODwCV7nk6S1VzKE3VCyavC08shZ3JDEZ500jG11wWEcKvd5ZAhrWa-uBZTndlLzT9_g',
      tags: ['探索者', '守护者'],
      createdAt: '2024-03-15'
    },
    {
      id: '2',
      name: '陶瓷茶杯',
      description: '承载温暖的容器',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbOSZQGsITjNO3XakuH7MmEXmGq36JzwlOvLObjRW3zNoIMW5mYkSNgmYPajOcjeyHvly0I2LR0_jsdML4GXMCSIU-pbT3plJqNvCyVaVg3mfaFh8qRFk5sS5h6DwA293sW8dTzZR5zmhLmCQyzRzcyuOKfa88wCeV0RnVnu7H-QyoaJzU_WS1P4fU7FIt4nRo8p6f4skT0y_8jNEOjL2B4eBtsN_dWgq-2Om-7s4VSL-uEdyd_xqwZobZTfqsO1_JVPqhubBu7RE',
      tags: ['思考者', '创造者'],
      createdAt: '2024-03-10'
    }
  ];

  const handleResidentPress = (resident) => {
    navigation.navigate('ResidentDetail', { resident });
  };

  const handleCreateNew = () => {
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>居民档案</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>活跃居民</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>对话记录</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>探索区域</Text>
          </View>
        </View>

        {/* Residents Grid */}
        <View style={styles.residentsSection}>
          <Text style={styles.sectionTitle}>您的居民</Text>
          
          <View style={styles.residentsGrid}>
            {residents.map((resident) => (
              <TouchableOpacity 
                key={resident.id}
                style={styles.residentCard}
                onPress={() => handleResidentPress(resident)}
              >
                <ImageBackground 
                  source={{ uri: resident.image }}
                  style={styles.residentImage}
                  imageStyle={styles.residentImageStyle}
                >
                  <View style={styles.residentOverlay} />
                </ImageBackground>
                
                <View style={styles.residentInfo}>
                  <Text style={styles.residentName}>{resident.name}</Text>
                  <Text style={styles.residentDescription}>{resident.description}</Text>
                  
                  <View style={styles.tagsContainer}>
                    {resident.tags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                  
                  <Text style={styles.createdAt}>{resident.createdAt}</Text>
                </View>
              </TouchableOpacity>
            ))}
            
            {/* Add New Resident Card */}
            <TouchableOpacity style={styles.addCard} onPress={handleCreateNew}>
              <View style={styles.addIconContainer}>
                <Text style={styles.addIcon}>+</Text>
              </View>
              <Text style={styles.addText}>添加新居民</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>最近活动</Text>
          
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityEmoji}>💬</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>与古旧相机对话</Text>
                <Text style={styles.activityTime}>2小时前</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityEmoji}>📸</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>创建陶瓷茶杯</Text>
                <Text style={styles.activityTime}>1天前</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🗺</Text>
          <Text style={styles.navLabel}>Map</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItemActive}>
          <Text style={styles.navIconActive}>📚</Text>
          <Text style={styles.navLabelActive}>Archive</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🌊</Text>
          <Text style={styles.navLabel}>Echoes</Text>
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
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 20,
    color: '#5f5e5e',
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3432',
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 20,
    color: '#5f5e5e',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Noto Serif',
    fontSize: 24,
    color: '#2d3432',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#767c79',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  residentsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3432',
    marginBottom: 16,
  },
  residentsGrid: {
    gap: 16,
  },
  residentCard: {
    backgroundColor: '#f2f4f2',
    borderRadius: 12,
    overflow: 'hidden',
  },
  residentImage: {
    width: '100%',
    height: 120,
  },
  residentImageStyle: {
    width: '100%',
    height: '100%',
  },
  residentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(249,249,247,0) 0%, rgba(228,226,225,0.4) 50%, rgba(249,249,247,0) 100%)',
  },
  residentInfo: {
    padding: 16,
  },
  residentName: {
    fontFamily: 'Noto Serif',
    fontSize: 18,
    color: '#2d3432',
    marginBottom: 4,
  },
  residentDescription: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#5a605e',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#e5e9e6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#51616e',
  },
  createdAt: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#adb3b0',
  },
  addCard: {
    backgroundColor: '#f2f4f2',
    borderRadius: 12,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#dee4e0',
    borderStyle: 'dashed',
  },
  addIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e5e9e6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  addIcon: {
    fontSize: 24,
    color: '#767c79',
  },
  addText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#5a605e',
  },
  activitySection: {
    marginBottom: 32,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f4f2',
    borderRadius: 8,
    padding: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e9e6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityEmoji: {
    fontSize: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#2d3432',
    marginBottom: 2,
  },
  activityTime: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#767c79',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#f9f9f7',
    borderTopWidth: 1,
    borderTopColor: '#f2f4f2',
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

export default ResidentArchiveScreen;