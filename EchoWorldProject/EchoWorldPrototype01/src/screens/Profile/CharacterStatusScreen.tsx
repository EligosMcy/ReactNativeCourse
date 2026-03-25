import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Avatar, Button, Card } from '../../components/ui';
import { useCharacterStore } from '../../stores';
import { mockApi } from '../../services/mockApi';
import type { RootStackParamList, Character } from '../../types';

type CharacterStatusRouteProp = RouteProp<RootStackParamList, 'CharacterStatus'>;
type CharacterStatusNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CharacterStatusScreen: React.FC = () => {
  const navigation = useNavigation<CharacterStatusNavigationProp>();
  const route = useRoute<CharacterStatusRouteProp>();
  const { characters, removeCharacter } = useCharacterStore();
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const loadCharacter = async () => {
      const characterId = route.params.characterId;
      const foundCharacter = characters.find(c => c.id === characterId);
      if (foundCharacter) {
        setCurrentCharacter(foundCharacter);
      } else {
        const data = await mockApi.character.get(characterId);
        if (data) {
          setCurrentCharacter(data);
        }
      }
    };
    loadCharacter();
  }, [route.params.characterId, characters]);

  useEffect(() => {
    if (!currentCharacter) return;
    const interval = setInterval(async () => {
      const updated = await mockApi.character.getStatus(currentCharacter.id);
      if (updated) {
        setCurrentCharacter(updated);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [currentCharacter?.id]);

  const handleSendMessage = () => {
    if (currentCharacter) {
      navigation.navigate('CharacterChat', { characterId: currentCharacter.id });
    }
  };

  const handleDeleteCharacter = () => {
    if (!currentCharacter) return;
    
    Alert.alert(
      '删除角色',
      `确定要删除角色"${currentCharacter.name}"吗？此操作无法撤销！`,
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '删除', 
          style: 'destructive',
          onPress: async () => {
            try {
              await removeCharacter(currentCharacter.id);
              navigation.goBack();
            } catch (error) {
              Alert.alert('错误', '删除角色失败，请重试');
            }
          }
        },
      ]
    );
  };

  if (!currentCharacter) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  const getEnergyText = () => {
    const energy = currentCharacter.energy;
    if (energy >= 0.8) return '精力充沛';
    if (energy >= 0.5) return '还好';
    if (energy >= 0.3) return '有点累';
    return '需要休息';
  };

  const getMoodText = () => {
    const mood = currentCharacter.emotionalState.primary;
    const moodMap: Record<string, string> = {
      excited: '兴奋',
      cheerful: '开心',
      restless: '烦躁',
      content: '满足',
      calm: '平静',
      melancholy: '忧郁',
      lonely: '孤独',
      anxious: '焦虑',
      tired: '疲惫',
      moved: '感动',
      irritable: '易怒',
      nostalgic: '怀旧',
    };
    return moodMap[mood] || mood;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentCharacter.name}的此刻</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.locationCard}>
          <View style={styles.locationContent}>
            <Text style={styles.locationIcon}>📍</Text>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{currentCharacter.currentLocation.landmarkName}</Text>
              <Text style={styles.locationMeta}>
                {currentCharacter.currentLocation.city} · {new Date(currentCharacter.currentLocation.localTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.behaviorText}>{currentCharacter.currentBehaviorDescription}</Text>
        </Card>

        <Card style={styles.statusCard}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>精力</Text>
            <View style={styles.statusBar}>
              <View
                style={[
                  styles.statusBarFill,
                  { width: `${currentCharacter.energy * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.statusValue}>{getEnergyText()}</Text>
          </View>

          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>情绪</Text>
            <Text style={styles.statusValue}>{getMoodText()}</Text>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>今 日</Text>
          <Card>
            <View style={styles.todayItem}>
              <Text style={styles.todayLabel}>去过</Text>
              <View style={styles.todayTags}>
                {currentCharacter.todaySummary.placesVisited.map((place, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{place}</Text>
                  </View>
                ))}
                {currentCharacter.todaySummary.placesVisited.length === 0 && (
                  <Text style={styles.emptyText}>—</Text>
                )}
              </View>
            </View>

            <View style={styles.todayItem}>
              <Text style={styles.todayLabel}>遇见</Text>
              <View style={styles.todayTags}>
                {currentCharacter.todaySummary.charactersEncountered.map((char, index) => (
                  <TouchableOpacity key={index} style={styles.encounterItem}>
                    <Avatar name={char.name} size={24} />
                    <Text style={styles.encounterName}>{char.name}</Text>
                  </TouchableOpacity>
                ))}
                {currentCharacter.todaySummary.charactersEncountered.length === 0 && (
                  <Text style={styles.emptyText}>—</Text>
                )}
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>角色信息</Text>
          <Card>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>年龄</Text>
              <Text style={styles.infoValue}>{currentCharacter.age}岁</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>性别</Text>
              <Text style={styles.infoValue}>
                {currentCharacter.gender === 'male' ? '男' :
                 currentCharacter.gender === 'female' ? '女' :
                 currentCharacter.gender === 'neutral' ? '中性' : '未知'}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>兴趣</Text>
              <View style={styles.interestTags}>
                {currentCharacter.interestTags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="发消息" onPress={handleSendMessage} style={{ flex: 2 }} />
        <Button title="删除角色" onPress={handleDeleteCharacter} variant="danger" style={{ flex: 1, marginLeft: spacing.sm }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: typography.body.fontSize,
    color: colors.text.tertiary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.pagePadding,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  backButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 20,
    color: colors.text.secondary,
  },
  headerTitle: {
    flex: 1,
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.pagePadding,
    paddingBottom: spacing.xl * 2,
  },
  locationCard: {
    marginBottom: spacing.md,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  locationIcon: {
    fontSize: 18,
    color: colors.accent.primary,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
    fontWeight: '500',
  },
  locationMeta: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.subtle,
    marginVertical: spacing.sm,
  },
  behaviorText: {
    fontSize: typography.caption.fontSize,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  statusCard: {
    marginBottom: spacing.md,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  statusLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    width: 40,
  },
  statusBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.background.secondary,
    borderRadius: 3,
    marginHorizontal: spacing.sm,
    overflow: 'hidden',
  },
  statusBarFill: {
    height: '100%',
    backgroundColor: colors.accent.primary,
    opacity: 0.6,
    borderRadius: 3,
  },
  statusValue: {
    fontSize: typography.small.fontSize,
    color: colors.text.secondary,
    width: 60,
    textAlign: 'right',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
    letterSpacing: 2,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  todayItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  todayLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    width: 40,
  },
  todayTags: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tag: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  tagText: {
    fontSize: typography.small.fontSize,
    color: colors.text.secondary,
  },
  emptyText: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
  },
  encounterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginRight: spacing.md,
    marginBottom: spacing.xs,
  },
  encounterName: {
    fontSize: typography.small.fontSize,
    color: colors.text.secondary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.text.secondary,
  },
  infoValue: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
  },
  interestTags: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    justifyContent: 'flex-end',
  },
  footer: {
    paddingHorizontal: spacing.pagePadding,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
    backgroundColor: colors.background.primary,
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
