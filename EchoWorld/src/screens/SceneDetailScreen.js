import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const SceneDetailScreen = ({ navigation, route }) => {
  const { sceneId } = route.params || {};
  
  const scenes = {
    memory: {
      id: 'memory',
      title: '记忆回廊',
      description: '探索过去的回声，重温珍贵的瞬间',
      icon: '🏛️',
      color: '#A8C3B8',
      features: [
        '浏览对话历史',
        '情感时间轴',
        '记忆标签系统',
        '智能搜索功能'
      ]
    },
    emotion: {
      id: 'emotion', 
      title: '情感花园',
      description: '培育内心的情感，观察情绪的成长',
      icon: '🌿',
      color: '#D4E5F4',
      features: [
        '情绪记录',
        '情感分析',
        '成长轨迹',
        '冥想空间'
      ]
    },
    thought: {
      id: 'thought',
      title: '思维殿堂', 
      description: '构建思想的架构，整理思维的脉络',
      icon: '🏛️',
      color: '#F2E3FA',
      features: [
        '思维导图',
        '笔记系统',
        '知识整理',
        '创意空间'
      ]
    },
    future: {
      id: 'future',
      title: '未来投影',
      description: '预见可能的轨迹，规划未来的方向',
      icon: '🔮',
      color: '#E4E2E1',
      features: [
        '目标设定',
        '计划制定',
        '进度追踪',
        '愿景板'
      ]
    }
  };

  const scene = scenes[sceneId] || scenes.memory;

  const handleEnterScene = () => {
    navigation.navigate('Conversation', { 
      character: 'Aurelius_01',
      scene: sceneId 
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ECHOWORLD</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={[styles.sceneIcon, { backgroundColor: scene.color }]}>
            <Text style={styles.iconText}>{scene.icon}</Text>
          </View>
          <Text style={styles.sceneTitle}>{scene.title}</Text>
          <Text style={styles.sceneDescription}>{scene.description}</Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>场景功能</Text>
          <View style={styles.featuresGrid}>
            {scene.features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>访问次数</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3.5h</Text>
            <Text style={styles.statLabel}>停留时间</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>87%</Text>
            <Text style={styles.statLabel}>完成度</Text>
          </View>
        </View>

        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>最近活动</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>记录了新的情感体验</Text>
              <Text style={styles.activityTime}>今天 10:30</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>完成了思维导图整理</Text>
              <Text style={styles.activityTime}>昨天 15:20</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>添加了新的记忆标签</Text>
              <Text style={styles.activityTime}>3天前</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.enterButton} onPress={handleEnterScene}>
          <Text style={styles.enterButtonText}>进入场景</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 64,
    paddingBottom: 32,
  },
  backButton: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#51616e',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3432',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sceneIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconText: {
    fontSize: 32,
  },
  sceneTitle: {
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '600',
    color: '#2d3432',
    marginBottom: 8,
  },
  sceneDescription: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#767c79',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '600',
    color: '#2d3432',
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    backgroundColor: '#f2f4f2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: '48%',
  },
  featureText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#2d3432',
    textAlign: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  statItem: {
    backgroundColor: '#f2f4f2',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '600',
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
  recentActivity: {
    marginBottom: 40,
  },
  activityList: {
    gap: 12,
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
  enterButton: {
    backgroundColor: '#5f5e5e',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  enterButtonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#faf7f6',
    fontWeight: '600',
  },
});

export default SceneDetailScreen;