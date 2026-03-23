import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ route, navigation }) {
  const { characterId, character } = route.params;

  const statusCards = [
    {
      type: 'location',
      title: '当前位置',
      value: character?.currentLocation?.name || '未知',
      icon: 'location-outline'
    },
    {
      type: 'activity',
      title: '当前行为',
      value: character?.status === 'active' ? '在线活动中' : '休息中',
      icon: 'walk-outline'
    },
    {
      type: 'mood',
      title: '情绪状态',
      value: getMoodText(character?.mood),
      icon: getMoodIcon(character?.mood)
    },
    {
      type: 'energy',
      title: '能量水平',
      value: `${character?.energy || 0}%`,
      icon: 'battery-full-outline',
      progress: (character?.energy || 0) / 100
    }
  ];

  const dailySummary = {
    activities: ['早上阅读', '中午午餐', '下午工作'],
    moodChanges: ['开心', '平静', '兴奋'],
    interactions: 3
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={{ uri: character?.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{character?.name}</Text>
          <Text style={styles.status}>
            {character?.status === 'active' ? '在线' : '离线'}
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          {statusCards.map((card, index) => (
            <View key={index} style={styles.statusCard}>
              <View style={styles.cardHeader}>
                <Ionicons name={card.icon} size={24} color="#007AFF" />
                <Text style={styles.cardTitle}>{card.title}</Text>
              </View>
              <Text style={styles.cardValue}>{card.value}</Text>
              {card.progress !== undefined && (
                <View style={styles.progressContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: `${card.progress * 100}%` }
                    ]}
                  />
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="calendar-outline" size={24} color="#007AFF" />
            <Text style={styles.cardTitle}>今日简况</Text>
          </View>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryItem}>
              活动：{dailySummary.activities.join(' · ')}
            </Text>
            <Text style={styles.summaryItem}>
              情绪变化：{dailySummary.moodChanges.join(' → ')}
            </Text>
            <Text style={styles.summaryItem}>
              互动次数：{dailySummary.interactions}次
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => navigation.navigate('Chat', { characterId, character })}
        >
          <Text style={styles.chatButtonText}>发送消息</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function getMoodText(mood) {
  const moodMap = {
    happy: '开心',
    sad: '难过',
    angry: '生气',
    tired: '疲惫',
    excited: '兴奋',
    calm: '平静'
  };
  return moodMap[mood] || '未知';
}

function getMoodIcon(mood) {
  const iconMap = {
    happy: 'happy-outline',
    sad: 'sad-outline',
    angry: 'angry-outline',
    tired: 'bed-outline',
    excited: 'sparkles-outline',
    calm: 'water-outline'
  };
  return iconMap[mood] || 'help-outline';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#F8F9FA',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  progressContainer: {
    marginTop: 8,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryContent: {
    marginTop: 12,
  },
  summaryItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  chatButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});