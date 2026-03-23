import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  progressItem: {
    alignItems: 'center',
  },
  progressCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  progressNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  progressNumberActive: {
    color: '#fff',
  },
  progressLine: {
    position: 'absolute',
    top: 16,
    left: 40,
    width: 40,
    height: 2,
    backgroundColor: '#E0E0E0',
  },
  progressLineActive: {
    backgroundColor: '#007AFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  stepContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  photoButton: {
    width: 200,
    height: 200,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  photoButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  photoPreview: {
    alignItems: 'center',
    gap: 16,
  },
  photoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  photoContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  retakeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  retakeButtonText: {
    fontSize: 14,
    color: '#666',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 24,
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#666',
  },
  maturityOptions: {
    flexDirection: 'row',
    gap: 32,
  },
  maturityOption: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  maturityOptionSelected: {
    backgroundColor: '#007AFF',
  },
  maturityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  maturityTextSelected: {
    color: '#fff',
  },
  maturitySubtext: {
    fontSize: 14,
    color: '#666',
  },
  maturitySubtextSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  characterPreview: {
    alignItems: 'center',
    gap: 24,
  },
  characterAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterNameLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  nameInput: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    minWidth: 200,
    fontSize: 18,
    color: '#333',
  },
  congratsText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  congratsSubtext: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
  },
  characterNameDisplay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonFooter: {
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    marginLeft: 12,
  },
  finishButton: {
    backgroundColor: '#4CAF50',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});