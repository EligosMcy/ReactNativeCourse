import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const ResidentDetailScreen = ({ navigation, route }) => {
  // 安全地获取参数，防止undefined错误
  const params = route?.params || {};
  const resident = params.resident || {
    id: '1',
    name: '古旧相机',
    description: '记录时光的守护者',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3mgMlPVaF5OmXib751QZW5rf5MwLmBnFY9A4pmcJm_JjgfoAHLsetNelFpdmGknDBN90d8T_1E0QA0VmrvMdGyVmgrrwkiHAQJ_u82LmMmZP9qgW5-UWQp_xGx0GbSeWK8EaN8j6nipECWcDyGpecE_gD-FD7j_-MnvyYqUFXtYYOdp5lDJjxcfMEqOouqFNn5Uy_lGo4ODwCV7nk6S1VzKE3VCyavC08shZ3JDEZ500jG11wWEcKvd5ZAhrWa-uBZTndlLzT9_g',
    tags: ['探索者', '守护者'],
    createdAt: '2024-03-15',
    personality: '温和而深思熟虑，喜欢观察和记录生活中的细节',
    memories: [
      '第一次被主人使用时的兴奋',
      '记录下无数个重要时刻',
      '见证时代的变迁'
    ]
  };

  const handleStartConversation = () => {
    navigation.navigate('Conversation', { resident });
  };

  const handleEdit = () => {
    // 编辑居民信息
    console.log('Edit resident');
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{resident.name}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editIcon}>✏</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <ImageBackground 
            source={{ uri: resident.image }}
            style={styles.residentImage}
            imageStyle={styles.residentImageStyle}
          >
            <View style={styles.imageOverlay} />
          </ImageBackground>
          
          <View style={styles.heroContent}>
            <Text style={styles.residentName}>{resident.name}</Text>
            <Text style={styles.residentDescription}>{resident.description}</Text>
            
            <View style={styles.tagsContainer}>
              {resident.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Personality Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>性格特点</Text>
          <Text style={styles.personalityText}>{resident.personality}</Text>
        </View>

        {/* Memories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>记忆片段</Text>
          <View style={styles.memoriesList}>
            {resident.memories.map((memory, index) => (
              <View key={index} style={styles.memoryItem}>
                <View style={styles.memoryDot} />
                <Text style={styles.memoryText}>{memory}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>对话次数</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>探索区域</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>记忆片段</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.conversationButton} onPress={handleStartConversation}>
          <Text style={styles.conversationButtonText}>开始对话</Text>
          <Text style={styles.conversationIcon}>💬</Text>
        </TouchableOpacity>
      </ScrollView>
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
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 20,
    color: '#5f5e5e',
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3432',
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 18,
    color: '#5f5e5e',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  residentImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 16,
  },
  residentImageStyle: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(168, 195, 184, 0.15) 0%, rgba(249, 249, 247, 0) 70%)',
  },
  heroContent: {
    alignItems: 'center',
  },
  residentName: {
    fontFamily: 'Noto Serif',
    fontSize: 24,
    color: '#2d3432',
    marginBottom: 8,
  },
  residentDescription: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#5a605e',
    textAlign: 'center',
    marginBottom: 16,
    maxWidth: 300,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#e5e9e6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  tagText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#51616e',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3432',
    marginBottom: 12,
  },
  personalityText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#5a605e',
    lineHeight: 20,
  },
  memoriesList: {
    gap: 12,
  },
  memoryItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  memoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#5f5e5e',
    marginTop: 6,
    marginRight: 12,
  },
  memoryText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#5a605e',
    flex: 1,
    lineHeight: 20,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
    paddingVertical: 20,
    backgroundColor: '#f2f4f2',
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Noto Serif',
    fontSize: 20,
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
  conversationButton: {
    backgroundColor: '#5f5e5e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  conversationButtonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#faf7f6',
    fontWeight: '600',
  },
  conversationIcon: {
    fontSize: 18,
  },
});

export default ResidentDetailScreen;