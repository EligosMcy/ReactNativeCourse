import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

const PlayerSetupScreen = ({ navigation }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [username, setUsername] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  const avatars = [
    { id: 'avatar1', name: '守护者', description: '温和的观察者', color: '#A8C3B8' },
    { id: 'avatar2', name: '探索者', description: '好奇的冒险家', color: '#D4E5F4' },
    { id: 'avatar3', name: '思考者', description: '深沉的哲学家', color: '#F2E3FA' },
    { id: 'avatar4', name: '创造者', description: '创新的艺术家', color: '#E4E2E1' },
  ];

  const genders = [
    { id: 'male', label: '男 He' },
    { id: 'female', label: '女 She' },
    { id: 'nonbinary', label: '非二元 They' },
    { id: 'other', label: '其他 Other' },
  ];

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleContinue = () => {
    if (selectedAvatar) {
      navigation.navigate('Main');
    }
  };

  return (
    <View style={styles.container}>
      {/* Decorative Elements */}
      <View style={styles.decorativeElements}>
        <View style={[styles.mist, styles.mist1]} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>设置玩家身份</Text>
          <Text style={styles.subtitle}>Step 04 / Finalization</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Left Column: Avatar Selection */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarHeader}>
              <Text style={styles.avatarTitle}>选择映射形象</Text>
              <Text style={styles.avatarDescription}>选择一个最能代表你数字回响的视觉锚点。</Text>
            </View>

            <View style={styles.avatarGrid}>
              {avatars.map((avatar) => (
                <TouchableOpacity
                  key={avatar.id}
                  style={[
                    styles.avatarCard,
                    selectedAvatar?.id === avatar.id && styles.avatarCardSelected
                  ]}
                  onPress={() => handleAvatarSelect(avatar)}
                >
                  <View 
                    style={[
                      styles.avatarIcon,
                      { backgroundColor: avatar.color }
                    ]}
                  />
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.addAvatarCard}>
                <Text style={styles.addAvatarIcon}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Right Column: Personal Info */}
          <View style={styles.infoSection}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>玩家代号</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="请输入你的代号..."
                  placeholderTextColor="#adb3b0"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            </View>

            {/* Gender Selection */}
            <View style={styles.genderSection}>
              <Text style={styles.genderTitle}>代称偏好</Text>
              <View style={styles.genderButtons}>
                {genders.map((gender) => (
                  <TouchableOpacity 
                    key={gender.id}
                    style={[
                      styles.genderButton,
                      selectedGender === gender.id && styles.genderButtonSelected
                    ]}
                    onPress={() => handleGenderSelect(gender.id)}
                  >
                    <Text style={[
                      styles.genderButtonText,
                      selectedGender === gender.id && styles.genderButtonTextSelected
                    ]}>
                      {gender.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.genderHint}>
                这会影响系统消息及叙事内容对你的称呼。
              </Text>
            </View>

            {/* Stats Section */}
            <View style={styles.statsSection}>
              <View style={styles.avatarsPreview}>
                <View style={[styles.avatarDot, { backgroundColor: '#e4e2e1' }]} />
                <View style={[styles.avatarDot, { backgroundColor: '#d4e5f4' }]} />
                <View style={[styles.avatarDot, { backgroundColor: '#f2e3fa' }]}>
                  <Text style={styles.avatarDotText}>+12k</Text>
                </View>
              </View>
              <Text style={styles.statsText}>
                已有 12,492 位玩家在这个世界中留下了他们的回响。
              </Text>
            </View>
          </View>
        </View>

        {/* Primary Action */}
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              !selectedAvatar && styles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={!selectedAvatar}
          >
            <Text style={styles.continueButtonText}>步入世界</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipButtonText}>稍后完善资料</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f7',
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -10,
    pointerEvents: 'none',
  },
  mist: {
    position: 'absolute',
    borderRadius: 9999,
  },
  mist1: {
    top: '10%',
    left: '5%',
    width: width * 0.4,
    height: height * 0.4,
    backgroundColor: '#e5e9e6',
    opacity: 0.4,
    filter: 'blur(120px)',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 64,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Noto Serif',
    fontSize: 36,
    color: '#2d3432',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#51616e',
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.6,
  },
  formSection: {
    width: '100%',
    maxWidth: 800,
    flexDirection: 'column',
    gap: 48,
    marginBottom: 48,
  },
  avatarSection: {
    gap: 32,
  },
  avatarHeader: {
    gap: 8,
  },
  avatarTitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#767c79',
    fontWeight: '600',
  },
  avatarDescription: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#5a605e',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  avatarCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#f2f4f2',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCardSelected: {
    borderWidth: 2,
    borderColor: '#5f5e5e',
  },
  avatarIcon: {
    width: '100%',
    height: '100%',
  },
  addAvatarCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#f2f4f2',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAvatarIcon: {
    fontSize: 24,
    color: '#767c79',
  },
  infoSection: {
    gap: 48,
  },
  inputGroup: {
    gap: 16,
  },
  inputLabel: {
    fontFamily: 'Inter',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#767c79',
    fontWeight: '600',
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(173, 179, 176, 0.3)',
    paddingBottom: 16,
  },
  input: {
    fontFamily: 'Inter',
    fontSize: 20,
    color: '#2d3432',
  },
  genderSection: {
    gap: 24,
  },
  genderTitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#767c79',
    fontWeight: '600',
  },
  genderButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genderButton: {
    backgroundColor: '#f2f4f2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
  },
  genderButtonSelected: {
    backgroundColor: '#dee4e0',
  },
  genderButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#51616e',
    fontWeight: '500',
  },
  genderButtonTextSelected: {
    color: '#2d3432',
  },
  genderHint: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#767c79',
    fontStyle: 'italic',
  },
  statsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 32,
  },
  avatarsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -8,
  },
  avatarDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f9f9f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
  },
  avatarDotText: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#665b6e',
    fontWeight: 'bold',
  },
  statsText: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#767c79',
    textAlign: 'right',
    maxWidth: 200,
  },
  actionsSection: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    gap: 32,
    paddingTop: 48,
    borderTopWidth: 1,
    borderTopColor: '#f2f4f2',
  },
  continueButton: {
    backgroundColor: '#5f5e5e',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#2d3432',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#faf7f6',
    fontWeight: '500',
  },
  skipButton: {
    paddingVertical: 8,
  },
  skipButtonText: {
    fontFamily: 'Inter',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#767c79',
  },
});

export default PlayerSetupScreen;