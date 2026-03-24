import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Avatar, Card } from '../../components/ui';
import { useAuthStore, useCharacterStore } from '../../stores';
import type { RootStackParamList } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SettingItemProps {
  title: string;
  onPress: () => void;
  showArrow?: boolean;
  danger?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({ title, onPress, showArrow = true, danger = false }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <Text style={[styles.settingTitle, danger && styles.dangerText]}>{title}</Text>
    {showArrow && <Text style={styles.arrow}>›</Text>}
  </TouchableOpacity>
);

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsNavigationProp>();
  const { player, clearAuth } = useAuthStore();
  const { characters, currentCharacterId } = useCharacterStore();
  
  // 获取当前角色
  const currentCharacter = characters.find(c => c.id === currentCharacterId);

  const handleSignOut = () => {
    Alert.alert(
      '退出登录',
      '退出后，您的数据完整保留，重新登录即可恢复。',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '退出', 
          style: 'destructive',
          onPress: async () => {
            await clearAuth();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Splash' }],
            });
          }
        },
      ]
    );
  };

  const handleClearAllData = () => {
    Alert.alert(
      '清空所有数据',
      '此操作将删除所有登录信息、玩家信息和角色数据，无法恢复！',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '清空', 
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Splash' }],
              });
            } catch (error) {
              Alert.alert('错误', '清空数据失败，请重试');
            }
          }
        },
      ]
    );
  };

  const handleCreateCharacter = () => {
    navigation.navigate('CreateCharacter');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Setting</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.profileCard}>
          <View style={styles.profileContent}>
            <Avatar name={player?.name || '?'} size={56} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{player?.name || '未设置'}</Text>
              <Text style={styles.profileGender}>
                {player?.gender === 'male' ? '男' : player?.gender === 'female' ? '女' : player?.gender === 'other' ? '其他' : '不透露'}
              </Text>
            </View>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>账户</Text>
          <Card>
            <SettingItem title="Profile" onPress={() => {}} />
            <View style={styles.divider} />
            <SettingItem title="Change Password" onPress={() => {}} />
            <View style={styles.divider} />
            <SettingItem title="Change Email" onPress={() => {}} />
            <View style={styles.divider} />
            <SettingItem title="Sign Out" onPress={handleSignOut} showArrow={false} danger />
            <View style={styles.divider} />
            <SettingItem title="清空所有数据" onPress={handleClearAllData} showArrow={false} danger />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>通知</Text>
          <Card>
            <SettingItem title="Notification" onPress={() => {}} />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>角色</Text>
          <Card>
            {characters.map((char, index) => (
              <React.Fragment key={char.id}>
                <View style={styles.characterItem}>
                  <View style={styles.characterInfo}>
                    <Avatar name={char.name} size={40} />
                    <View style={styles.characterDetails}>
                      <Text style={styles.characterName}>{char.name}</Text>
                      <Text style={styles.characterMeta}>
                        {char.age}岁 · {char.gender === 'male' ? '男' : char.gender === 'female' ? '女' : '其他'}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('CharacterStatus', { characterId: char.id })}
                    style={styles.characterButton}
                  >
                    <Text style={styles.characterButtonText}>查看</Text>
                  </TouchableOpacity>
                </View>
                {index< characters.length - 1 && (<View style={styles.divider} />)}
              </React.Fragment>
            ))}
            <View style={styles.divider} />
            <SettingItem 
              title={characters.length >0 ? "创建新角色" : "创建角色"} 
              onPress={handleCreateCharacter} 
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>支持</Text>
          <Card>
            <SettingItem title="ECHOWORLD Docs" onPress={() => {}} />
            <View style={styles.divider} />
            <SettingItem title="Customer Service" onPress={() => {}} />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>法律</Text>
          <Card>
            <SettingItem title="About Us" onPress={() => {}} />
            <View style={styles.divider} />
            <SettingItem title="Privacy Policy" onPress={() => {}} />
          </Card>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>ECHOWORLD v1.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: spacing.pagePadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: 15,
    color: colors.text.primary,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.pagePadding,
    paddingBottom: spacing.xl,
  },
  profileCard: {
    marginBottom: spacing.lg,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
    fontWeight: '500',
  },
  profileGender: {
    fontSize: typography.caption.fontSize,
    color: colors.text.secondary,
    marginTop: spacing.xs,
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  settingTitle: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
  },
  dangerText: {
    color: colors.accent.danger,
  },
  arrow: {
    fontSize: 20,
    color: colors.text.tertiary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.subtle,
  },
  characterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  characterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  characterDetails: {
    flex: 1,
  },
  characterName: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
    fontWeight: '500',
  },
  characterMeta: {
    fontSize: typography.caption.fontSize,
    color: colors.text.secondary,
    marginTop: 2,
  },
  characterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    backgroundColor: colors.accent.primary,
  },
  characterButtonText: {
    fontSize: typography.caption.fontSize,
    color: colors.text.inverse,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
  },
});
