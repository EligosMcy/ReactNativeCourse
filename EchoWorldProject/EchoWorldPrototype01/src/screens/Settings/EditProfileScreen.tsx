import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Avatar, Button, Input } from '../../components/ui';
import { useAuthStore } from '../../stores';
import type { RootStackParamList } from '../../types';

type EditProfileNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ExtendedPlayer {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  gender: 'male' | 'female' | 'other' | 'undisclosed';
  createdAt: string;
  bio?: string;
  location?: string;
}

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<EditProfileNavigationProp>();
  const { player, updatePlayer } = useAuthStore();
  
  const [name, setName] = useState(player?.name || '');
  const [gender, setGender] = useState(player?.gender || 'undisclosed');
  const [bio, setBio] = useState((player as ExtendedPlayer)?.bio || '');
  const [location, setLocation] = useState((player as ExtendedPlayer)?.location || '');
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const hasChange = 
      name !== player?.name ||
      gender !== player?.gender ||
      bio !== (player as ExtendedPlayer)?.bio ||
      location !== (player as ExtendedPlayer)?.location;
    setHasChanges(hasChange);
  }, [name, gender, bio, location, player]);

  const handleSave = async () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!name.trim()) {
      newErrors.name = '名字不能为空';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await updatePlayer({
        name,
        gender,
        bio,
        location,
      });
      Alert.alert('成功', '资料已保存');
      navigation.goBack();
    } catch (error) {
      console.error('✏️ EditProfile: failed to save profile', error);
      Alert.alert('保存失败', '请稍后重试');
    }
  };

  const handleChangeAvatar = () => {
    Alert.alert(
      '更换头像',
      '请选择头像来源',
      [
        { text: '拍照', onPress: () => console.log('拍照') },
        { text: '从相册选取', onPress: () => console.log('相册') },
        { text: '恢复默认', onPress: () => console.log('恢复默认') },
        { text: '取消', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>编辑资料</Text>
        <TouchableOpacity 
          onPress={handleSave}
          style={[
            styles.saveButton,
            (!hasChanges || !name.trim()) && styles.saveButtonDisabled
          ]}
          disabled={!hasChanges || !name.trim()}
        >
          <Text style={[
            styles.saveButtonText,
            (!hasChanges || !name.trim()) && styles.saveButtonTextDisabled
          ]}>
            保存
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 头像区域 */}
        <View style={styles.avatarSection}>
          <Avatar
            uri={player?.avatarUrl || null}
            name={player?.name || ''}
            size={100}
          />
          <TouchableOpacity onPress={handleChangeAvatar} style={styles.changeAvatarButton}>
            <Text style={styles.changeAvatarText}>更换头像</Text>
          </TouchableOpacity>
        </View>

        {/* 名字输入框 */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>名字 <Text style={styles.required}>*</Text></Text>
          <View style={styles.nameInputContainer}>
            <TextInput
              style={[
                styles.nameInput,
                errors.name && styles.inputError
              ]}
              value={name}
              onChangeText={setName}
              placeholder="请输入名字"
              placeholderTextColor={colors.text.tertiary}
              maxLength={20}
            />
            <Text style={styles.charCount}>{name.length}/20</Text>
          </View>
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        {/* 性别选择 */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>性别</Text>
          <View style={styles.genderOptions}>
            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === 'male' && styles.genderOptionSelected
              ]}
              onPress={() => setGender('male')}
            >
              <Text style={[
                styles.genderOptionText,
                gender === 'male' && styles.genderOptionTextSelected
              ]}>
                男
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === 'female' && styles.genderOptionSelected
              ]}
              onPress={() => setGender('female')}
            >
              <Text style={[
                styles.genderOptionText,
                gender === 'female' && styles.genderOptionTextSelected
              ]}>
                女
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === 'other' && styles.genderOptionSelected
              ]}
              onPress={() => setGender('other')}
            >
              <Text style={[
                styles.genderOptionText,
                gender === 'other' && styles.genderOptionTextSelected
              ]}>
                其他
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 个人简介 */}
        <View style={styles.inputSection}>
          <View style={styles.bioHeader}>
            <Text style={styles.inputLabel}>个人简介</Text>
            <Text style={styles.charCount}>{bio.length}/200</Text>
          </View>
          <TextInput
            style={styles.bioInput}
            value={bio}
            onChangeText={setBio}
            placeholder="介绍一下自己吧（最多200字）"
            placeholderTextColor={colors.text.tertiary}
            multiline
            maxLength={200}
            textAlignVertical="top"
          />
        </View>

        {/* 常驻地选择 */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>常驻地</Text>
          <TextInput
            style={styles.locationInput}
            value={location}
            onChangeText={setLocation}
            placeholder="请输入常驻地"
            placeholderTextColor={colors.text.tertiary}
          />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.pagePadding,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  backButton: {
    padding: spacing.xs,
  },
  backButtonText: {
    fontSize: 24,
    color: colors.text.primary,
  },
  title: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
    fontWeight: '500',
  },
  saveButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  saveButtonDisabled: {
    opacity: 0.4,
  },
  saveButtonText: {
    fontSize: typography.body.fontSize,
    color: colors.accent.primary,
    fontWeight: '500',
  },
  saveButtonTextDisabled: {
    color: colors.text.tertiary,
  },
  scrollContent: {
    paddingHorizontal: spacing.pagePadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  changeAvatarButton: {
    marginTop: spacing.md,
  },
  changeAvatarText: {
    fontSize: typography.body.fontSize,
    color: colors.accent.primary,
    fontWeight: '500',
  },
  inputSection: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  required: {
    color: colors.accent.danger,
  },
  nameInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInput: {
    flex: 1,
    height: 52,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.input,
    borderWidth: 1,
    borderColor: colors.border.default,
    paddingHorizontal: spacing.md,
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
  },
  inputError: {
    borderColor: colors.accent.danger,
  },
  charCount: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
    marginLeft: spacing.sm,
  },
  errorText: {
    fontSize: typography.small.fontSize,
    color: colors.accent.danger,
    marginTop: spacing.xs,
  },
  genderOptions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  genderOption: {
    flex: 1,
    height: 52,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.input,
    borderWidth: 1,
    borderColor: colors.border.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderOptionSelected: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.accent.light,
  },
  genderOptionText: {
    fontSize: typography.body.fontSize,
    color: colors.text.secondary,
  },
  genderOptionTextSelected: {
    color: colors.accent.primary,
    fontWeight: '500',
  },
  bioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  bioInput: {
    minHeight: 120,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.input,
    borderWidth: 1,
    borderColor: colors.border.default,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
  },
  locationInput: {
    height: 52,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.input,
    borderWidth: 1,
    borderColor: colors.border.default,
    paddingHorizontal: spacing.md,
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
  },
});
