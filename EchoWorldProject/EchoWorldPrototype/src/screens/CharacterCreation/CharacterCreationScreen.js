import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, BorderRadius, Shadows } from '../../theme/DesignSystem';

export default function CharacterCreationScreen({ navigation, route }) {
  const [currentStep, setCurrentStep] = useState(route.params?.step || 1);
  const [prototypePhoto, setPrototypePhoto] = useState(null);
  const [roomPhoto, setRoomPhoto] = useState(null);
  const [maturity, setMaturity] = useState('young');
  const [characterName, setCharacterName] = useState('');

  useEffect(() => {
    if (route.params?.imageUri && route.params?.type) {
      const { imageUri, type } = route.params;
      if (type === 'prototype') {
        setPrototypePhoto(imageUri);
      } else if (type === 'room') {
        setRoomPhoto(imageUri);
      }
    }
  }, [route.params]);

  const steps = [
    { id: 1, title: '拍摄角色原型', description: '选择一个物件作为角色原型' },
    { id: 2, title: '拍摄房间角落', description: '生成角色居所气质' },
    { id: 3, title: '角色生成', description: '正在生成你的数字生命' },
    { id: 4, title: '成熟度选择', description: '选择角色的成熟度' },
    { id: 5, title: '确认角色', description: '确认角色属性' },
    { id: 6, title: '角色诞生', description: '你的数字生命诞生了' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      if (currentStep === 1 && !prototypePhoto) {
        Alert.alert('提示', '请先拍摄角色原型照片');
        return;
      }
      if (currentStep === 2 && !roomPhoto) {
        Alert.alert('提示', '请先拍摄房间角落照片');
        return;
      }
      if (currentStep === 5 && !characterName.trim()) {
        Alert.alert('提示', '请输入角色名称');
        return;
      }
      setCurrentStep(currentStep + 1);
    } else {
      Alert.alert(
        '角色创建成功',
        '你的数字生命已经诞生！',
        [{ text: '进入世界', onPress: () => navigation.navigate('Main') }]
      );
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleTakePhoto = (type) => {
    // 模拟拍照功能
    setTimeout(() => {
      if (type === 'prototype') {
        setPrototypePhoto('https://randomuser.me/api/portraits/men/32.jpg');
      } else {
        setRoomPhoto('https://picsum.photos/id/1048/500/300');
      }
    }, 500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepDescription}>请选择一个物件作为角色原型，它将成为你的数字生命的基础</Text>
            {!prototypePhoto ? (
              <TouchableOpacity
                style={styles.photoButton}
                onPress={() => navigation.navigate('Camera', { type: 'prototype', step: currentStep })}
              >
                <Ionicons name="camera" size={40} color="#007AFF" />
                <Text style={styles.photoButtonText}>拍摄原型照片</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.photoPreview}>
                <Text style={styles.photoTitle}>原型照片</Text>
                <View style={styles.photoContainer}>
                  <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                </View>
                <TouchableOpacity
                  style={styles.retakeButton}
                  onPress={() => setPrototypePhoto(null)}
                >
                  <Text style={styles.retakeButtonText}>重新拍摄</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepDescription}>拍摄你的房间角落，这将帮助生成角色的居所气质</Text>
            {!roomPhoto ? (
              <TouchableOpacity
                style={styles.photoButton}
                onPress={() => navigation.navigate('Camera', { type: 'room', step: currentStep })}
              >
                <Ionicons name="camera" size={40} color="#007AFF" />
                <Text style={styles.photoButtonText}>拍摄房间角落</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.photoPreview}>
                <Text style={styles.photoTitle}>房间照片</Text>
                <View style={styles.photoContainer}>
                  <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                </View>
                <TouchableOpacity
                  style={styles.retakeButton}
                  onPress={() => setRoomPhoto(null)}
                >
                  <Text style={styles.retakeButtonText}>重新拍摄</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContent}>
            <Ionicons name="sparkles" size={80} color="#007AFF" />
            <Text style={styles.loadingText}>正在生成你的数字生命...</Text>
            <Text style={styles.loadingSubtext}>请稍候，这可能需要一点时间</Text>
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepDescription}>选择角色的成熟度</Text>
            <View style={styles.maturityOptions}>
              <TouchableOpacity
                style={[
                  styles.maturityOption,
                  maturity === 'young' && styles.maturityOptionSelected
                ]}
                onPress={() => setMaturity('young')}
              >
                <Ionicons name="youth" size={48} color={maturity === 'young' ? '#fff' : '#007AFF'} />
                <Text
                  style={[
                    styles.maturityText,
                    maturity === 'young' && styles.maturityTextSelected
                  ]}
                >
                  青年期
                </Text>
                <Text
                  style={[
                    styles.maturitySubtext,
                    maturity === 'young' && styles.maturitySubtextSelected
                  ]}
                >
                  18-35岁
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.maturityOption,
                  maturity === 'adult' && styles.maturityOptionSelected
                ]}
                onPress={() => setMaturity('adult')}
              >
                <Ionicons name="person" size={48} color={maturity === 'adult' ? '#fff' : '#007AFF'} />
                <Text
                  style={[
                    styles.maturityText,
                    maturity === 'adult' && styles.maturityTextSelected
                  ]}
                >
                  壮年期
                </Text>
                <Text
                  style={[
                    styles.maturitySubtext,
                    maturity === 'adult' && styles.maturitySubtextSelected
                  ]}
                >
                  36-55岁
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 5:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepDescription}>请确认角色信息</Text>
            <View style={styles.characterPreview}>
              <View style={styles.characterAvatar}>
                <Ionicons name="person-circle" size={80} color="#007AFF" />
              </View>
              <Text style={styles.characterNameLabel}>角色名称</Text>
              <TextInput
                style={styles.nameInput}
                placeholder="请输入角色名称"
                value={characterName}
                onChangeText={setCharacterName}
                maxLength={20}
                textAlign="center"
              />
            </View>
          </View>
        );
      case 6:
        return (
          <View style={styles.stepContent}>
            <Ionicons name="heart" size={80} color="#FF3B30" />
            <Text style={styles.congratsText}>恭喜！</Text>
            <Text style={styles.congratsSubtext}>你的数字生命已经诞生</Text>
            <Text style={styles.characterNameDisplay}>{characterName || '数字生命'}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>创建角色</Text>
      </View>

      <View style={styles.progressContainer}>
        {steps.map((step) => (
          <View key={step.id} style={styles.progressItem}>
            <View
              style={[
                styles.progressCircle,
                currentStep >= step.id && styles.progressCircleActive
              ]}
            >
              <Text
                style={[
                  styles.progressNumber,
                  currentStep >= step.id && styles.progressNumberActive
                ]}
              >
                {currentStep > step.id ? '✓' : step.id}
              </Text>
            </View>
            {step.id < steps.length && (
              <View
                style={[
                  styles.progressLine,
                  currentStep > step.id && styles.progressLineActive
                ]}
              />
            )}
          </View>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.stepTitle}>{steps[currentStep - 1].title}</Text>
        {renderStepContent()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.backButtonFooter]}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>上一步</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.nextButton, currentStep === 6 && styles.finishButton]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === steps.length ? '完成' : '下一步'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.surfaceContainerLow,
  },
  backButton: {
    padding: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.digitalInk,
    marginLeft: 24,
    fontFamily: Typography.serif,
    letterSpacing: Typography.titleLetterSpacing,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  progressItem: {
    alignItems: 'center',
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderOpacity: 0.15,
  },
  progressCircleActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  progressNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.onSurface,
    opacity: 0.5,
    fontFamily: Typography.sansSerif,
  },
  progressNumberActive: {
    color: Colors.onPrimary,
    opacity: 1,
  },
  progressLine: {
    position: 'absolute',
    top: 20,
    left: 56,
    width: 48,
    height: 1,
    backgroundColor: Colors.outlineVariant,
    opacity: 0.1,
  },
  progressLineActive: {
    backgroundColor: Colors.primary,
    opacity: 1,
  },
  content: {
    flex: 1,
    padding: 32,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.digitalInk,
    marginBottom: 12,
    fontFamily: Typography.serif,
    letterSpacing: Typography.titleLetterSpacing,
  },
  stepContent: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  stepDescription: {
    fontSize: 18,
    color: Colors.onSurface,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: Typography.bodyLgLineHeight * 18,
    fontFamily: Typography.sansSerif,
    opacity: 0.7,
  },
  photoButton: {
    width: 240,
    height: 240,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  photoButtonText: {
    fontSize: 18,
    color: Colors.onPrimary,
    fontWeight: '600',
    fontFamily: Typography.sansSerif,
  },
  photoPreview: {
    alignItems: 'center',
    gap: 24,
  },
  photoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.digitalInk,
    fontFamily: Typography.sansSerif,
  },
  photoContainer: {
    width: 240,
    height: 240,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.vitalityMint,
  },
  retakeButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.md,
  },
  retakeButtonText: {
    fontSize: 16,
    color: Colors.onSurface,
    fontFamily: Typography.sansSerif,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.digitalInk,
    marginTop: 32,
    marginBottom: 12,
    fontFamily: Typography.sansSerif,
  },
  loadingSubtext: {
    fontSize: 16,
    color: Colors.onSurface,
    opacity: 0.7,
    fontFamily: Typography.sansSerif,
  },
  maturityOptions: {
    flexDirection: 'row',
    gap: 40,
  },
  maturityOption: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    gap: 16,
  },
  maturityOptionSelected: {
    backgroundColor: Colors.primary,
  },
  maturityText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.digitalInk,
    fontFamily: Typography.sansSerif,
  },
  maturityTextSelected: {
    color: Colors.onPrimary,
  },
  maturitySubtext: {
    fontSize: 16,
    color: Colors.onSurface,
    opacity: 0.7,
    fontFamily: Typography.sansSerif,
  },
  maturitySubtextSelected: {
    color: Colors.onPrimary,
    opacity: 0.8,
  },
  characterPreview: {
    alignItems: 'center',
    gap: 32,
  },
  characterAvatar: {
    width: 140,
    height: 140,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterNameLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.digitalInk,
    fontFamily: Typography.sansSerif,
  },
  nameInput: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.md,
    minWidth: 240,
    fontSize: 20,
    color: Colors.digitalInk,
    fontFamily: Typography.sansSerif,
    textAlign: 'center',
  },
  congratsText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.digitalInk,
    marginTop: 24,
    marginBottom: 12,
    fontFamily: Typography.serif,
    letterSpacing: Typography.titleLetterSpacing,
  },
  congratsSubtext: {
    fontSize: 20,
    color: Colors.onSurface,
    marginBottom: 32,
    fontFamily: Typography.sansSerif,
    opacity: 0.7,
  },
  characterNameDisplay: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: Typography.serif,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 20,
    backgroundColor: Colors.surfaceContainerLow,
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  backButtonFooter: {
    backgroundColor: Colors.surfaceContainerHighest,
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.onSurface,
    fontFamily: Typography.sansSerif,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    marginLeft: 16,
  },
  finishButton: {
    backgroundColor: Colors.vitalityMint,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.onPrimary,
    fontFamily: Typography.sansSerif,
  },
});