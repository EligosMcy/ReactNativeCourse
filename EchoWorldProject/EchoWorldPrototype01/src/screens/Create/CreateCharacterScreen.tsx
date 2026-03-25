import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '../../components/ui';
import { useCharacterStore } from '../../stores';
import { mockApi } from '../../services/mockApi';
import type { RootStackParamList, LifeStage } from '../../types';

type CreateCharacterNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CreateCharacterScreen: React.FC = () => {
  const navigation = useNavigation<CreateCharacterNavigationProp>();
  const { draft, updateDraft, resetDraft, addCharacter } = useCharacterStore();
  const [loading, setLoading] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [characterAge, setCharacterAge] = useState(25);
  const [characterGender, setCharacterGender] = useState<'male' | 'female' | 'neutral' | 'unknown'>('neutral');

  useEffect(() => {
    resetDraft();
  }, []);

  useEffect(() => {
    if (draft.lifeStage) {
      const minAge = draft.lifeStage === 'youth' ? 18 : 36;
      const maxAge = draft.lifeStage === 'youth' ? 35 : 55;
      
      if (characterAge < minAge) {
        setCharacterAge(minAge);
      } else if (characterAge > maxAge) {
        setCharacterAge(maxAge);
      }
    }
  }, [draft.lifeStage, characterAge]);

  const steps = [
    '拍摄原型照片',
    '拍摄房间一角',
    '角色生成仪式',
    '选择成熟度',
    '草稿确认',
  ];

  const handlePickPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      alert('需要相册权限才能选择照片');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      if (draft.step === 0) {
        updateDraft({ photoUri: result.assets[0].uri });
      } else if (draft.step === 1) {
        updateDraft({ roomPhotoUri: result.assets[0].uri });
      }
    }
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permissionResult.granted) {
      alert('需要相机权限才能拍照');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      if (draft.step === 0) {
        updateDraft({ photoUri: result.assets[0].uri });
      } else if (draft.step === 1) {
        updateDraft({ roomPhotoUri: result.assets[0].uri });
      }
    }
  };

  const handleNext = async () => {
    if (draft.step === 0 && !draft.photoUri) {
      alert('请先拍摄或选择照片');
      return;
    }

    if (draft.step === 1 && !draft.roomPhotoUri) {
      alert('请先拍摄或选择房间照片');
      return;
    }

    if (draft.step === 2) {
      setLoading(true);
      updateDraft({ isGenerating: true });
      try {
        const result = await mockApi.character.generate(draft.photoUri!, draft.roomPhotoUri!, draft.lifeStage || 'youth');
        updateDraft({ 
          generatedCharacterId: result.characterId,
          isGenerating: false,
          step: 3
        });
      } catch (error) {
        alert('生成失败，请重试');
        updateDraft({ isGenerating: false });
      } finally {
        setLoading(false);
      }
    } else if (draft.step === 3 && !draft.lifeStage) {
      alert('请选择角色的成熟度');
      return;
    } else {
      updateDraft({ step: draft.step + 1 });
    }
  };

  const handlePrevious = () => {
    if (draft.step > 0) {
      updateDraft({ step: draft.step - 1 });
    }
  };

  const handleSelectLifeStage = (lifeStage: LifeStage) => {
    updateDraft({ lifeStage });
  };

  const handleConfirm = async () => {
    if (!draft.generatedCharacterId) {
      alert('请先生成角色');
      return;
    }

    if (!characterName.trim()) {
      alert('请输入角色名字');
      return;
    }

    setLoading(true);
    try {
      const character = await mockApi.character.get(draft.generatedCharacterId);
      if (character) {
        const updatedCharacter = {
          ...character,
          name: characterName,
          age: characterAge,
          gender: characterGender,
        };
        await addCharacter(updatedCharacter);
        navigation.replace('Main');
      }
    } catch (error) {
      alert('创建失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const renderStep0 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>拍下它</Text>
      <Text style={styles.stepSubtitle}>让它成为某个人的起点</Text>
      
      <View style={styles.cameraFrame}>
        {draft.photoUri ? (
          <Image source={{ uri: draft.photoUri }} style={styles.photo} />
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Text style={styles.cameraIcon}>📷</Text>
            <Text style={styles.cameraText}>拍摄原型照片</Text>
          </View>
        )}
      </View>

      <Text style={styles.hint}>宠物 · 植物 · 玩具 · 物品</Text>

      <View style={styles.buttonRow}>
        <Button title="📷 相机" onPress={handleTakePhoto} variant="secondary" style={{ flex: 1 }} />
        <Button title="从相册" onPress={handlePickPhoto} variant="secondary" style={{ flex: 1 }} />
      </View>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>拍下房间一角</Text>
      <Text style={styles.stepSubtitle}>让它成为角色的居所</Text>
      
      <View style={styles.cameraFrame}>
        {draft.roomPhotoUri ? (
          <Image source={{ uri: draft.roomPhotoUri }} style={styles.photo} />
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Text style={styles.cameraIcon}>🏠</Text>
            <Text style={styles.cameraText}>拍摄房间照片</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonRow}>
        <Button title="📷 相机" onPress={handleTakePhoto} variant="secondary" style={{ flex: 1 }} />
        <Button title="从相册" onPress={handlePickPhoto} variant="secondary" style={{ flex: 1 }} />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>生成仪式</Text>
      <Text style={styles.stepSubtitle}>他正在从那些照片里生长出来</Text>
      
      <View style={styles.generatingContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.accent.primary} />
        ) : (
          <View style={styles.glowContainer}>
            <View style={styles.glow} />
            <Text style={styles.glowText}>...</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>选择成熟度</Text>
      <Text style={styles.stepSubtitle}>决定角色的成长阶段</Text>
      
      <View style={styles.lifeStageContainer}>
        <TouchableOpacity
          style={[styles.lifeStageOption, draft.lifeStage === 'youth' && styles.lifeStageSelected]}
          onPress={() => handleSelectLifeStage('youth')}
        >
          <Text style={[styles.lifeStageText, draft.lifeStage === 'youth' && styles.lifeStageTextSelected]}>
            青年期
          </Text>
          <Text style={styles.lifeStageDescription}>18-35岁</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.lifeStageOption, draft.lifeStage === 'prime' && styles.lifeStageSelected]}
          onPress={() => handleSelectLifeStage('prime')}
        >
          <Text style={[styles.lifeStageText, draft.lifeStage === 'prime' && styles.lifeStageTextSelected]}>
            壮年期
          </Text>
          <Text style={styles.lifeStageDescription}>36-55岁</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>草稿确认</Text>
      <Text style={styles.stepSubtitle}>确认角色的详细信息</Text>
      
      <View style={styles.draftContainer}>
        {/* 外形预览 */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
        </View>

        {/* 名字输入 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>名字 * 必填</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="输入角色名字"
              placeholderTextColor={colors.text.tertiary}
              value={characterName}
              onChangeText={setCharacterName}
              maxLength={20}
            />
          </View>
        </View>

        {/* 年龄微调 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>年龄</Text>
          <View style={styles.ageContainer}>
            <TouchableOpacity 
              style={styles.ageButton}
              onPress={() => {
                const minAge = draft.lifeStage === 'youth' ? 18 : 36;
                setCharacterAge(Math.max(minAge, characterAge - 1));
              }}
            >
              <Text style={styles.ageButtonText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.ageText}>{characterAge}岁</Text>
            <TouchableOpacity 
              style={styles.ageButton}
              onPress={() => {
                const maxAge = draft.lifeStage === 'youth' ? 35 : 55;
                setCharacterAge(Math.min(maxAge, characterAge + 1));
              }}
            >
              <Text style={styles.ageButtonText}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 性别选择 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>性别</Text>
          <View style={styles.genderContainer}>
            {[
              { value: 'male', label: '男' },
              { value: 'female', label: '女' },
              { value: 'neutral', label: '中性' },
              { value: 'unknown', label: '未知' },
            ].map((gender) => (
              <TouchableOpacity
                key={gender.value}
                style={[
                  styles.genderOption,
                  characterGender === gender.value && styles.genderSelected,
                ]}
                onPress={() => setCharacterGender(gender.value as typeof characterGender)}
              >
                <Text
                  style={[
                    styles.genderText,
                    characterGender === gender.value && styles.genderTextSelected,
                  ]}
                >
                  {gender.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 背景故事（只读） */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>背景（只读）</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.backgroundText}>
              一个在咖啡馆长大的孩子，对艺术有着特殊的敏感和热爱。
            </Text>
          </View>
        </View>

        {/* 性格预览（只读） */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>性格（只读预览）</Text>
          <View style={styles.personalityContainer}>
            <View style={styles.personalityRow}>
              <Text style={styles.personalityLabel}>内向</Text>
              <View style={styles.slider}>
                <View style={[styles.sliderFill, { width: '30%' }]} />
              </View>
              <Text style={styles.personalityLabel}>外向</Text>
            </View>
            <View style={styles.personalityRow}>
              <Text style={styles.personalityLabel}>感性</Text>
              <View style={styles.slider}>
                <View style={[styles.sliderFill, { width: '60%' }]} />
              </View>
              <Text style={styles.personalityLabel}>理性</Text>
            </View>
          </View>
        </View>

        {/* 兴趣标签（只读） */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>兴趣</Text>
          <View style={styles.tagsContainer}>
            {['摄影', '阅读', '烹饪', '音乐'].map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 出生城市（只读） */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>城市</Text>
          <Text style={styles.cityText}>上海</Text>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (draft.step) {
      case 0:
        return renderStep0();
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>×</Text>
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.progressItem}>
              <View
                style={[
                  styles.progressDot,
                  index <= draft.step && styles.progressDotActive,
                ]}
              />
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.progressLine,
                    index < draft.step && styles.progressLineActive,
                  ]}
                />
              )}
            </View>
          ))}
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {renderContent()}
      </ScrollView>

      <View style={styles.footer}>
        {draft.step > 0 && (
          <Button
            title="返回"
            onPress={handlePrevious}
            variant="secondary"
            style={styles.footerButton}
          />
        )}
        
        {draft.step < steps.length - 1 ? (
          <Button
            title={draft.step === 2 ? '生成' : '下一步'}
            onPress={handleNext}
            disabled={loading}
            loading={loading}
            style={draft.step === 0 ? { flex: 1 } : styles.footerButton}
          />
        ) : (
          <Button
            title="进入世界"
            onPress={handleConfirm}
            disabled={loading}
            loading={loading}
            style={styles.footerButton}
          />
        )}
      </View>
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
    paddingHorizontal: spacing.pagePadding,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 24,
    color: colors.text.secondary,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.border.default,
    backgroundColor: colors.background.primary,
  },
  progressDotActive: {
    backgroundColor: colors.accent.primary,
    borderColor: colors.accent.primary,
  },
  progressLine: {
    width: 30,
    height: 1,
    backgroundColor: colors.border.default,
    marginHorizontal: spacing.xs,
  },
  progressLineActive: {
    backgroundColor: colors.accent.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.pagePadding,
    paddingBottom: spacing.xl,
  },
  stepContent: {
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  stepTitle: {
    fontSize: typography.pageTitle.fontSize,
    fontWeight: '300',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  stepSubtitle: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    marginBottom: spacing.xl,
  },
  cameraFrame: {
    width: 350,
    height: 380,
    borderRadius: borderRadius.card,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.card,
  },
  cameraPlaceholder: {
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  cameraText: {
    fontSize: typography.body.fontSize,
    color: colors.text.tertiary,
  },
  hint: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
    marginBottom: spacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
  },
  generatingContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  glowContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.accent.primary,
    opacity: 0.1,
  },
  glowText: {
    fontSize: 32,
    color: colors.accent.primary,
  },
  lifeStageContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginVertical: spacing.xl,
  },
  lifeStageOption: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.card,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.default,
    alignItems: 'center',
  },
  lifeStageSelected: {
    backgroundColor: colors.accent.light,
    borderColor: colors.accent.primary,
  },
  lifeStageText: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  lifeStageTextSelected: {
    color: colors.accent.primary,
  },
  lifeStageDescription: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
  },
  confirmContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  draftContainer: {
    width: '100%',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: spacing.lg,
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  avatarIcon: {
    fontSize: 36,
  },
  inputGroup: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    width: '100%',
    height: 52,
    borderRadius: borderRadius.input,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.default,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  input: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
    width: '100%',
  },
  ageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  ageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  ageButtonText: {
    fontSize: 24,
    color: colors.text.secondary,
  },
  ageText: {
    fontSize: typography.sectionTitle.fontSize,
    color: colors.text.primary,
    fontWeight: '500',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  genderOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 16,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  genderSelected: {
    backgroundColor: colors.accent.light,
    borderColor: colors.accent.primary,
  },
  genderText: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
  },
  genderTextSelected: {
    color: colors.accent.primary,
  },
  section: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: typography.body.fontSize,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  sectionContent: {
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
    borderRadius: borderRadius.card,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  backgroundText: {
    fontSize: typography.body.fontSize,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  personalityContainer: {
    gap: spacing.md,
  },
  personalityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  personalityLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    width: 40,
  },
  slider: {
    flex: 1,
    height: 6,
    backgroundColor: colors.background.secondary,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: colors.accent.primary,
    borderRadius: 2,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    backgroundColor: colors.accent.light,
    borderWidth: 1,
    borderColor: colors.accent.primary,
  },
  tagText: {
    fontSize: typography.small.fontSize,
    color: colors.accent.primary,
  },
  cityText: {
    fontSize: typography.body.fontSize,
    color: colors.text.secondary,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.pagePadding,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
    gap: spacing.sm,
  },
  footerButton: {
    flex: 1,
  },
});
