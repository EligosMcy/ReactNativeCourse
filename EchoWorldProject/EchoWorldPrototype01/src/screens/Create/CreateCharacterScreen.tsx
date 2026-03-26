import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, TextInput, Animated } from 'react-native';
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

  // 光点动画值
  const lightDotAnimations = useRef(
    Array.from({ length: 20 }, () => new Animated.Value(0))
  ).current;

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

  useEffect(() => {
    if (draft.step === 2) {
      // 启动所有光点动画
      lightDotAnimations.forEach((animatedValue, index) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: Math.random() * 2000 + 1000,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
              toValue: 0,
              duration: Math.random() * 2000 + 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    }
  }, [draft.step, lightDotAnimations]);

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
      <Text style={styles.stepSubtitle}>宠物 · 植物 · 玩具 · 物品</Text>
      
      <View style={styles.cameraFrameContainer}>
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
        {/* 四角棕金装饰线 */}
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />
      </View>

      <View style={styles.buttonRow}>
        <Button title="相机" onPress={handleTakePhoto} variant="secondary" style={{ flex: 1 }} />
        <Button title="从相册选取" onPress={handlePickPhoto} variant="secondary" style={{ flex: 1 }} />
      </View>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>拍下你的一个角落</Text>
      <Text style={styles.stepSubtitle}>让他有个地方可以回来</Text>
      
      <View style={styles.cameraFrameContainer}>
        <View style={styles.cameraFrame}>
          {draft.roomPhotoUri ? (
            <Image source={{ uri: draft.roomPhotoUri }} style={styles.photo} />
          ) : (
            <View style={styles.cameraPlaceholder}>
              <Text style={styles.cameraIcon}>🏠</Text>
              <Text style={styles.cameraText}>拍摄房间照片</Text>
            </View>
          )}
          {/* 网格线覆盖效果 */}
          <View style={styles.gridOverlay} />
        </View>
        {/* 四角棕金装饰线 */}
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />
      </View>

      <View style={styles.buttonRow}>
        <Button title="📷 相机" onPress={handleTakePhoto} variant="secondary" style={{ flex: 1 }} />
        <Button title="从相册选取" onPress={handlePickPhoto} variant="secondary" style={{ flex: 1 }} />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.ritualContainer}>
      {/* 棕金光点动画 */}
      <View style={styles.lightDotsContainer}>
        {lightDotAnimations.map((animatedValue, index) => {
          const size = Math.random() * 10 + 5;
          const offsetY = Math.random() * 50 - 25;
          const offsetX = Math.random() * 50 - 25;
          
          return (
            <Animated.View
              key={index}
              style={[
                styles.lightDot,
                {
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: size,
                  height: size,
                  opacity: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.2, 1],
                  }),
                  transform: [
                    {
                      translateY: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, offsetY],
                      }),
                    },
                    {
                      translateX: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, offsetX],
                      }),
                    },
                  ],
                },
              ]}
            />
          );
        })}
      </View>
      
      {/* 两行serif文案 */}
      <View style={styles.ritualTextContainer}>
        <Text style={styles.ritualText}>他正在从那些照片里</Text>
        <Text style={styles.ritualText}>生长出来</Text>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>他现在几岁</Text>
      <Text style={styles.stepSubtitle}>这是他来到这里时的年纪</Text>
      
      <View style={styles.lifeStageContainerVertical}>
        <TouchableOpacity
          style={[styles.lifeStageOptionVertical, draft.lifeStage === 'youth' && styles.lifeStageSelectedVertical]}
          onPress={() => handleSelectLifeStage('youth')}
        >
          <Text style={[styles.lifeStageTextVertical, draft.lifeStage === 'youth' && styles.lifeStageTextSelectedVertical]}>
            青年期
          </Text>
          <Text style={styles.lifeStageAgeVertical}>18-35岁</Text>
          <Text style={styles.lifeStagePersonalityVertical}>充满活力，对世界充满好奇</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.lifeStageOptionVertical, draft.lifeStage === 'prime' && styles.lifeStageSelectedVertical]}
          onPress={() => handleSelectLifeStage('prime')}
        >
          <Text style={[styles.lifeStageTextVertical, draft.lifeStage === 'prime' && styles.lifeStageTextSelectedVertical]}>
            壮年期
          </Text>
          <Text style={styles.lifeStageAgeVertical}>36-55岁</Text>
          <Text style={styles.lifeStagePersonalityVertical}>成熟稳重，富有生活智慧</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>草稿确认</Text>
      <Text style={styles.stepSubtitle}>确认角色的详细信息</Text>
      
      <View style={styles.draftContainer}>
        {/* 头像预览 */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
        </View>

        {/* 名字输入框（标注"必填*"） */}
        <View style={styles.inputGroup}>
          <View style={styles.nameLabelContainer}>
            <Text style={styles.label}>名字</Text>
            <Text style={styles.requiredMark}>*</Text>
          </View>
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

        {/* 年龄行（数值+左右微调按钮，根据所选成熟度动态限制） */}
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

        {/* 性别行（"女/男/其他"三选一横排单选） */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>性别</Text>
          <View style={styles.genderContainer}>
            {[
              { value: 'female', label: '女' },
              { value: 'male', label: '男' },
              { value: 'neutral', label: '其他' },
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

        {/* 背景区块（只读文字描述） */}
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

        {/* 兴趣标签区块（圆形标签） */}
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

  const renderEmptyMap = () => (
    <View style={styles.emptyMapContainer}>
      {/* 全屏地图背景 */}
      <View style={styles.mapBackground}>
        {/* 城市名 */}
        <Text style={styles.cityName}>上海</Text>
        
        {/* 网格线纹理 */}
        <View style={styles.gridOverlay} />
      </View>
      
      {/* 中央浮层提示卡片 */}
      <View style={styles.guideCard}>
        <Text style={styles.guideTitle}>世界在等待</Text>
        <Text style={styles.guideSubtitle}>创造一个属于你的数字生命</Text>
        
        <View style={styles.guideButtons}>
          <Button
            title="开始创建"
            onPress={() => updateDraft({ step: 0 })}
            style={styles.guidePrimaryButton}
          />
          <Button
            title="浏览热门目的地"
            onPress={() => {}}
            variant="secondary"
            style={styles.guideSecondaryButton}
          />
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (draft.step) {
      case -1:
        return renderEmptyMap();
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
      {draft.step !== -1 && draft.step !== 2 && (
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
      )}

      {draft.step === -1 || draft.step === 2 ? (
        renderContent()
      ) : (
        <>
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
                title={draft.step === 2 ? '生成' : (draft.step === 3 ? '继续' : '下一步')}
                onPress={handleNext}
                disabled={loading}
                loading={loading}
                style={draft.step === 0 ? { flex: 1 } : styles.footerButton}
              />
            ) : (
              <Button
                title="就是她了"
                onPress={handleConfirm}
                disabled={loading || !characterName.trim()}
                loading={loading}
                style={styles.footerButton}
              />
            )}
          </View>
        </>
      )}
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
  cameraFrameContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  cameraFrame: {
    width: 350,
    height: 380,
    borderRadius: borderRadius.card,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: colors.accent.primary,
    borderTopLeftRadius: borderRadius.card,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.accent.primary,
    borderTopRightRadius: borderRadius.card,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: colors.accent.primary,
    borderBottomLeftRadius: borderRadius.card,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.accent.primary,
    borderBottomRightRadius: borderRadius.card,
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
  
  // 纵向排列的成熟度选项样式
  lifeStageContainerVertical: {
    width: '100%',
    gap: spacing.md,
    marginVertical: spacing.xl,
  },
  lifeStageOptionVertical: {
    padding: spacing.md,
    borderRadius: borderRadius.card,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.default,
    alignItems: 'flex-start',
  },
  lifeStageSelectedVertical: {
    borderColor: colors.accent.primary,
  },
  lifeStageTextVertical: {
    fontSize: typography.body.fontSize,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  lifeStageTextSelectedVertical: {
    color: colors.accent.primary,
  },
  lifeStageAgeVertical: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
  },
  lifeStagePersonalityVertical: {
    fontSize: typography.body.fontSize,
    color: colors.text.secondary,
    lineHeight: 20,
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
  nameLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  requiredMark: {
    fontSize: typography.body.fontSize,
    color: colors.accent.primary,
    marginLeft: spacing.xs,
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
  
  // 角色生成仪式界面样式
  ritualContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  lightDotsContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  lightDot: {
    position: 'absolute',
    backgroundColor: colors.accent.primary,
    borderRadius: 50,
  },
  ritualTextContainer: {
    alignItems: 'center',
  },
  ritualText: {
    fontSize: 18,
    fontWeight: '300',
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    fontFamily: 'serif',
  },

  // 空世界地图引导界面样式
  emptyMapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#FAF8F5',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.text.tertiary,
    letterSpacing: 3,
    marginBottom: spacing.xl,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  guideCard: {
    position: 'absolute',
    top: '45%',
    left: '10%',
    right: '10%',
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.card,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.subtle,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  guideTitle: {
    fontSize: typography.sectionTitle.fontSize,
    fontWeight: '300',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  guideSubtitle: {
    fontSize: typography.body.fontSize,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  guideButtons: {
    width: '100%',
    gap: spacing.md,
  },
  guidePrimaryButton: {
    width: '100%',
  },
  guideSecondaryButton: {
    width: '100%',
  },
});
