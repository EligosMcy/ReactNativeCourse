import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const MainScreen = ({ navigation }) => {
  const [selectedCharacter, setSelectedCharacter] = useState('Aurelius_01');

  const characters = [
    { id: 'Aurelius_01', name: 'Aurelius_01', mood: '沉思', lastActive: '2小时前' },
    { id: 'Echo_02', name: 'Echo_02', mood: '好奇', lastActive: '5分钟前' },
    { id: 'Nova_03', name: 'Nova_03', mood: '平静', lastActive: '1天前' },
  ];

  const scenes = [
    { id: 'scene1', title: '记忆回廊', description: '探索过去的回声', icon: '🏛️' },
    { id: 'scene2', title: '情感花园', description: '培育内心的情感', icon: '🌿' },
    { id: 'scene3', title: '思维殿堂', description: '构建思想的架构', icon: '🏛️' },
    { id: 'scene4', title: '未来投影', description: '预见可能的轨迹', icon: '🔮' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ECHOWORLD</Text>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileButtonText}>档案</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.characterSection}>
          <Text style={styles.sectionTitle}>当前角色</Text>
          <View style={styles.characterCard}>
            <View style={styles.characterInfo}>
              <Text style={styles.characterName}>Aurelius_01</Text>
              <Text style={styles.characterMood}>沉思状态</Text>
              <Text style={styles.characterStatus}>最后活跃: 2小时前</Text>
            </View>
            <TouchableOpacity 
              style={styles.conversationButton}
              onPress={() => navigation.navigate('Conversation', { character: 'Aurelius_01' })}
            >
              <Text style={styles.conversationButtonText}>对话</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.scenesSection}>
          <Text style={styles.sectionTitle}>可用场景</Text>
          <View style={styles.scenesGrid}>
            {scenes.map((scene) => (
              <TouchableOpacity key={scene.id} style={styles.sceneCard}>
                <Text style={styles.sceneIcon}>{scene.icon}</Text>
                <Text style={styles.sceneTitle}>{scene.title}</Text>
                <Text style={styles.sceneDescription}>{scene.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>最近活动</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>与 Aurelius_01 进行了深度对话</Text>
              <Text style={styles.activityTime}>今天 14:30</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>在 情感花园 记录了新的感受</Text>
              <Text style={styles.activityTime}>昨天 09:15</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>更新了个人档案信息</Text>
              <Text style={styles.activityTime}>3天前</Text>
            </View>
          </View>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 64,
    paddingBottom: 32,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 20,
    letterSpacing: 8,
    color: '#2d3432',
    textTransform: 'uppercase',
  },
  profileButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f2f4f2',
    borderRadius: 6,
  },
  profileButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#51616e',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
  },
  characterSection: {
    marginBottom: 40,
  },
  scenesSection: {
    marginBottom: 40,
  },
  recentSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    letterSpacing: 2,
    color: '#2d3432',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  characterCard: {
    backgroundColor: '#f2f4f2',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3432',
    marginBottom: 4,
  },
  characterMood: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#51616e',
    marginBottom: 4,
  },
  characterStatus: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#767c79',
  },
  conversationButton: {
    backgroundColor: '#5f5e5e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  conversationButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#faf7f6',
  },
  scenesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  sceneCard: {
    width: '48%',
    backgroundColor: '#f2f4f2',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 12,
  },
  sceneIcon: {
    fontSize: 32,
  },
  sceneTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3432',
    textAlign: 'center',
  },
  sceneDescription: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#767c79',
    textAlign: 'center',
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    backgroundColor: '#f2f4f2',
    borderRadius: 8,
    padding: 16,
  },
  activityText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#2d3432',
    marginBottom: 4,
  },
  activityTime: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#767c79',
  },
});

export default MainScreen;