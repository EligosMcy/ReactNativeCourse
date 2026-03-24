import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Avatar, Button, Card } from '../../components/ui';
import { useCharacterStore, useUIStore } from '../../stores';
import { mockApi } from '../../services/mockApi';
import type { RootStackParamList, Character } from '../../types';

type WorldNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const WorldScreen: React.FC = () => {
  const navigation = useNavigation<WorldNavigationProp>();
  const { characters, loadDraft } = useCharacterStore();
  const { activeCharacterCardId, setActiveCharacterCard } = useUIStore();
  const [refreshing, setRefreshing] = useState(false);
  const [activeLandmark, setActiveLandmark] = useState<string | null>(null);

  // 景点数据
  const landmarks = [
    {
      id: 'landmark-1',
      name: '中央公园',
      description: '城市中心的绿色绿洲，适合散步和放松',
      position: { top: '30%', left: '20%' },
      icon: '🌳',
    },
    {
      id: 'landmark-2',
      name: '艺术博物馆',
      description: '收藏了许多珍贵的艺术品和文物',
      position: { top: '45%', left: '70%' },
      icon: '🏛️',
    },
    {
      id: 'landmark-3',
      name: '咖啡街',
      description: '充满文艺气息的街道，有许多特色咖啡馆',
      position: { top: '60%', left: '30%' },
      icon: '☕',
    },
    {
      id: 'landmark-4',
      name: '图书馆',
      description: '安静的学习和阅读场所',
      position: { top: '25%', left: '60%' },
      icon: '📚',
    },
    {
      id: 'landmark-5',
      name: '音乐厅',
      description: '举办各种音乐会和演出',
      position: { top: '55%', left: '80%' },
      icon: '🎵',
    },
  ];

  useEffect(() => {
    loadDraft();
  }, []);

  useEffect(() => {
    // 为每个角色设置状态更新
    const intervals: NodeJS.Timeout[] = [];
    
    characters.forEach((char) => {
      const interval = setInterval(async () => {
        const updated = await mockApi.character.getStatus(char.id);
        // 这里可以添加更新角色状态的逻辑
      }, 60000);
      intervals.push(interval);
    });
    
    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [characters]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // 刷新所有角色状态
    for (const char of characters) {
      await mockApi.character.getStatus(char.id);
    }
    setRefreshing(false);
  };

  const handleCharacterPress = (char: Character) => {
    setActiveCharacterCard(char.id);
  };

  const handleCloseCard = () => setActiveCharacterCard(null);
  const handleSendMessage = () => {
    if (activeCharacterCardId) {
      setActiveCharacterCard(null);
      navigation.navigate('CharacterChat', { characterId: activeCharacterCardId });
    }
  };

  const handleViewStatus = () => {
    if (activeCharacterCardId) {
      setActiveCharacterCard(null);
      navigation.navigate('CharacterStatus', { characterId: activeCharacterCardId });
    }
  };

  const handleLandmarkPress = (landmarkId: string) => {
    setActiveLandmark(landmarkId);
  };

  const handleCloseLandmark = () => {
    setActiveLandmark(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'home': return colors.state.home;
      case 'outing': return colors.state.outing;
      case 'traveling': return colors.state.traveling;
      case 'sleeping': return colors.state.sleeping;
      default: return colors.state.home;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'home': return '在家';
      case 'outing': return '外出';
      case 'traveling': return '旅途中';
      case 'sleeping': return '睡眠中';
      default: return '';
    }
  };

  if (characters.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>还没有角色</Text>
        <Button title="创建角色" onPress={() => navigation.navigate('CreateCharacter')} />
      </View>
    );
  }

  // 获取第一个角色的城市作为显示城市
  const displayCity = characters[0]?.currentLocation?.city || '未知城市';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.mapBackground}>
          <View style={styles.cityLabel}>
            <Text style={styles.cityText}>{displayCity}</Text>
          </View>
          
          {/* 景点标记 */}
          {landmarks.map((landmark) => (
            <TouchableOpacity
              key={landmark.id}
              onPress={() => handleLandmarkPress(landmark.id)}
              style={[
                styles.landmarkMarker, 
                { 
                  top: landmark.position.top as any, 
                  left: landmark.position.left as any 
                }
              ]}
            >
              <View style={styles.landmarkIconContainer}>
                <Text style={styles.landmarkIcon}>{landmark.icon}</Text>
              </View>
              <Text style={styles.landmarkName}>{landmark.name}</Text>
            </TouchableOpacity>
          ))}

          {/* 角色标记 - 显示所有角色 */}
          {characters.map((char, index) => (
            <View 
              key={char.id} 
              style={[
                styles.characterMarker,
                { 
                  top: `${40 + index * 10}%`, 
                  left: `${20 + index * 10}%` 
                }
              ]}
            >
              <TouchableOpacity onPress={() => handleCharacterPress(char)}>
                <View style={styles.markerContainer}>
                  <Avatar name={char.name} size={60} borderColor={getStatusColor(char.status)} />
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(char.status) }]} />
                </View>
                <Text style={styles.characterName}>{char.name}</Text>
                <Text style={styles.characterStatus}>{getStatusText(char.status)}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* 角色卡片Modal */}
      <Modal visible={!!activeCharacterCardId} transparent animationType="fade" onRequestClose={handleCloseCard}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={handleCloseCard}>
          <View style={styles.characterCard}>
            {activeCharacterCardId && (
              (() => {
                const activeCharacter = characters.find(c => c.id === activeCharacterCardId);
                if (!activeCharacter) return null;
                
                return (
                  <>
                    <View style={styles.cardHeader}>
                      <Avatar name={activeCharacter.name} size={48} borderColor={getStatusColor(activeCharacter.status)} />
                      <View style={styles.cardInfo}>
                        <Text style={styles.cardName}>{activeCharacter.name}</Text>
                        <Text style={styles.cardBehavior}>{activeCharacter.currentLocation.landmarkName} · {activeCharacter.currentBehaviorDescription}</Text>
                      </View>
                    </View>
                    <View style={styles.cardDivider} />
                    <View style={styles.cardMeta}>
                      <Text style={styles.cardCity}>{activeCharacter.currentLocation.city}</Text>
                      <Text style={styles.cardTime}>{new Date(activeCharacter.currentLocation.localTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</Text>
                    </View>
                    <View style={styles.cardActions}>
                      <Button title="发消息" onPress={handleSendMessage} style={{ flex: 1 }} />
                      <Button title="查看状态" variant="secondary" onPress={handleViewStatus} style={{ flex: 1 }} />
                    </View>
                  </>
                );
              })()
            )}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 景点详情Modal */}
      <Modal visible={!!activeLandmark} transparent animationType="fade" onRequestClose={handleCloseLandmark}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={handleCloseLandmark}>
          <View style={styles.landmarkCard}>
            {activeLandmark && (
              <>
                <View style={styles.landmarkCardHeader}>
                  <Text style={styles.landmarkCardIcon}>
                    {landmarks.find(l => l.id === activeLandmark)?.icon}
                  </Text>
                  <Text style={styles.landmarkCardName}>
                    {landmarks.find(l => l.id === activeLandmark)?.name}
                  </Text>
                </View>
                <View style={styles.cardDivider} />
                <Text style={styles.landmarkCardDescription}>
                  {landmarks.find(l => l.id === activeLandmark)?.description}
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.elevated },
  emptyContainer: { flex: 1, backgroundColor: colors.background.primary, justifyContent: 'center', alignItems: 'center', gap: spacing.md },
  emptyText: { fontSize: typography.body.fontSize, color: colors.text.tertiary },
  mapContainer: { flex: 1 },
  mapBackground: { flex: 1, backgroundColor: colors.background.elevated },
  cityLabel: { position: 'absolute', top: 60, left: 0, right: 0, alignItems: 'center' },
  cityText: { fontSize: 12, color: colors.text.tertiary, letterSpacing: 5 },
  
  // 景点样式
  landmarkMarker: { position: 'absolute', alignItems: 'center' },
  landmarkIconContainer: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: colors.background.primary, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.subtle,
    elevation: 2,
  },
  landmarkIcon: { fontSize: 20 },
  landmarkName: { fontSize: typography.small.fontSize, color: colors.text.secondary, marginTop: spacing.xs },
  
  // 角色样式
  characterMarker: { position: 'absolute', top: '40%', left: 0, right: 0, alignItems: 'center' },
  markerContainer: { position: 'relative' },
  statusDot: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: colors.background.primary },
  characterName: { fontSize: typography.caption.fontSize, color: colors.text.secondary, textAlign: 'center', marginTop: spacing.sm },
  characterStatus: { fontSize: typography.small.fontSize, color: colors.text.tertiary, textAlign: 'center' },
  
  // Modal样式
  modalOverlay: { flex: 1, backgroundColor: 'rgba(250, 248, 245, 0.6)', justifyContent: 'flex-end' },
  
  // 角色卡片样式
  characterCard: { backgroundColor: colors.background.primary, borderRadius: 20, padding: spacing.md, margin: spacing.pagePadding, borderWidth: 1, borderColor: colors.border.subtle },
  cardHeader: { flexDirection: 'row', gap: spacing.md },
  cardInfo: { flex: 1 },
  cardName: { fontSize: typography.body.fontSize, color: colors.text.primary, fontWeight: '500' },
  cardBehavior: { fontSize: typography.caption.fontSize, color: colors.text.tertiary, marginTop: spacing.xs },
  cardDivider: { height: 1, backgroundColor: colors.border.subtle, marginVertical: spacing.md },
  cardMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  cardCity: { fontSize: typography.caption.fontSize, color: colors.text.secondary },
  cardTime: { fontSize: typography.caption.fontSize, color: colors.text.tertiary },
  cardActions: { flexDirection: 'row', gap: spacing.sm },
  
  // 景点卡片样式
  landmarkCard: { backgroundColor: colors.background.primary, borderRadius: 20, padding: spacing.md, margin: spacing.pagePadding, borderWidth: 1, borderColor: colors.border.subtle },
  landmarkCardHeader: { alignItems: 'center', gap: spacing.md },
  landmarkCardIcon: { fontSize: 48, marginBottom: spacing.sm },
  landmarkCardName: { fontSize: typography.body.fontSize, color: colors.text.primary, fontWeight: '500', marginBottom: spacing.md },
  landmarkCardDescription: { fontSize: typography.body.fontSize, color: colors.text.secondary, lineHeight: 22 },
});
