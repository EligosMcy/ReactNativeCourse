import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, Platform } from 'react-native';
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
  const [showActionSheet, setShowActionSheet] = useState(false);

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

  const handleAvatarPress = () => {
    setShowActionSheet(true);
  };

  const handleActionSelect = (action: string) => {
    setShowActionSheet(false);
    switch (action) {
      case 'camera':
        Alert.alert('拍照', '拍照功能开发中');
        break;
      case 'gallery':
        Alert.alert('相册', '相册功能开发中');
        break;
      case 'default':
        Alert.alert('使用默认', '已使用默认头像');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部固定Header */}
      <View style={styles.pageHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.brandName}>ECHOWORLD</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>告诉角色你是谁</Text>
          <Text style={styles.subtitle}>他们会记住这个名字</Text>
        </View>

        {/* 头像选取区 */}
        <TouchableOpacity style={styles.avatarSection} onPress={handleAvatarPress}>
          <View style={styles.avatarContainer}>
            <Avatar name={name || '?'} size={80} />
            <View style={styles.avatarAddButton}>
              <Text style={styles.avatarAddButtonText}>+</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.form}>
          {/* 名字输入框 */}
          <View style={styles.nameInputContainer}>
            <Input
              label="你的名字 *"
              placeholder="请输入你的名字"
              value={name}
              onChangeText={setName}
              style={styles.nameInput}
            />
            <Text style={styles.characterCount}>{name.length}/20</Text>
          </View>
          
          {/* 性别选择 */}
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

        {/* 进入世界按钮 */}
        <Button 
          title="进入世界" 
          onPress={handleComplete} 
          loading={loading} 
          disabled={!name.trim()}
          style={styles.enterButton}
        />

        {/* 服务条款和隐私政策 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            点击「进入世界」即表示你同意
            <Text style={styles.linkText}> 服务条款</Text>
            和
            <Text style={styles.linkText}> 隐私政策</Text>
          </Text>
        </View>
      </ScrollView>

      {/* ActionSheet Modal */}
      <Modal
        visible={showActionSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setShowActionSheet(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setShowActionSheet(false)}
        >
          <View style={styles.actionSheet}>
            <Text style={styles.actionSheetTitle}>选择头像</Text>
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => handleActionSelect('camera')}
            >
              <Text style={styles.actionItemText}>📷 相机</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => handleActionSelect('gallery')}
            >
              <Text style={styles.actionItemText}>从相册选取</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => handleActionSelect('default')}
            >
              <Text style={styles.actionItemText}>使用默认</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionItem, styles.cancelButton]}
              onPress={() => setShowActionSheet(false)}
            >
              <Text style={styles.cancelButtonText}>取消</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.pagePadding,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.text.secondary,
  },
  brandName: {
    fontSize: typography.body.fontSize,
    fontWeight: '500',
    color: colors.text.primary,
    letterSpacing: 2,
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: spacing.pagePadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl * 2,
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
    letterSpacing: 3,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarAddButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accent.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background.primary,
  },
  avatarAddButtonText: {
    fontSize: 20,
    color: colors.text.inverse,
    fontWeight: 'bold',
  },
  form: {
    marginBottom: spacing.xl,
  },
  nameInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  nameInput: {
    flex: 1,
  },
  characterCount: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    marginBottom: 8,
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
    height: 44,
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
    fontWeight: '500',
  },
  enterButton: {
    height: 52,
    borderRadius: borderRadius.button,
    marginBottom: spacing.lg,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: colors.accent.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  actionSheet: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: borderRadius.card,
    borderTopRightRadius: borderRadius.card,
    paddingTop: spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 34 : spacing.md,
    paddingHorizontal: spacing.pagePadding,
  },
  actionSheetTitle: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  actionItem: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  actionItemText: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
  },
  cancelButton: {
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
  },
  cancelButtonText: {
    fontSize: typography.body.fontSize,
    color: colors.text.secondary,
  },
});
