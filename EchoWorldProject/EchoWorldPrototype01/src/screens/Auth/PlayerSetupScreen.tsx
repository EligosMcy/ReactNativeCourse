import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button, Input, Avatar } from '../../components/ui';
import { useAuthStore, useCharacterStore } from '../../stores';
import { mockApi } from '../../services/mockApi';
import type { RootStackParamList } from '../../types';

type PlayerSetupNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlayerSetup'>;

export const PlayerSetupScreen: React.FC = () => {
  const navigation = useNavigation<PlayerSetupNavigationProp>();
  const { player, updatePlayer } = useAuthStore();
  const { characters, currentCharacterId } = useCharacterStore();
  const [name, setName] = useState(player?.name || '');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | 'undisclosed'>(player?.gender || 'undisclosed');
  const [loading, setLoading] = useState(false);
  const [isNavigationComplete, setIsNavigationComplete] = useState(false);

  useEffect(() => {
    // 如果玩家已经有名字，自动进入下一步
    if (player?.name && !isNavigationComplete) {
      setIsNavigationComplete(true);
      // 只有当没有角色时才自动跳转到角色创建界面
      if (characters.length === 0) {
        navigation.replace('CreateCharacter');
      }
      // 如果有角色，不自动跳转，让用户手动操作
    }
  }, [player?.name, characters, navigation, isNavigationComplete]);

  const genderOptions = [
    { value: 'male', label: '男' },
    { value: 'female', label: '女' },
    { value: 'other', label: '其他' },
    { value: 'undisclosed', label: '不透露' },
  ];

  const handleComplete = async () => {
    if (!name.trim()) {
      Alert.alert('提示', '请输入你的名字');
      return;
    }

    setLoading(true);
    try {
      const updatedPlayer = await mockApi.player.updateMe({ name: name.trim(), gender });
      updatePlayer(updatedPlayer);
      
      // 如果已经有角色，直接进入主界面
      if (characters.length > 0) {
        navigation.replace('Main');
      } else {
        // 如果没有角色，进入角色创建界面
        navigation.replace('CreateCharacter');
      }
    } catch (error) {
      Alert.alert('保存失败', '请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>告诉角色你是谁</Text>
          <Text style={styles.subtitle}>他们会记住这个名字</Text>
        </View>

        <View style={styles.avatarSection}>
          <Avatar name={name || '?'} size={72} />
          <Text style={styles.avatarHint}>点击换头像（开发中）</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="你的名字"
            placeholder="请输入你的名字"
            value={name}
            onChangeText={setName}
          />
          
          <Text style={styles.label}>性别（可选）</Text>
          <View style={styles.genderContainer}>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.genderOption,
                  gender === option.value && styles.genderOptionSelected,
                ]}
                onPress={() => setGender(option.value as typeof gender)}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === option.value && styles.genderTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button title="进入世界" onPress={handleComplete} loading={loading} disabled={!name.trim()} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    paddingHorizontal: spacing.pagePadding,
    paddingTop: spacing.xl * 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: 'serif',
    fontSize: typography.pageTitle.fontSize,
    fontWeight: typography.pageTitle.fontWeight,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarHint: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
    marginTop: spacing.sm,
  },
  form: {
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: typography.caption.fontSize,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  genderOption: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.button,
    borderWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: colors.background.secondary,
  },
  genderOptionSelected: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.accent.light,
  },
  genderText: {
    fontSize: typography.body.fontSize,
    color: colors.text.secondary,
  },
  genderTextSelected: {
    color: colors.accent.primary,
  },
});
