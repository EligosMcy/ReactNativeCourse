import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, DESIGN_PRINCIPLES } from '../constants/DesignSystem';

const { width, height } = Dimensions.get('window');

const CreateResidentScreen = ({ navigation }) => {
  const [residentName, setResidentName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSave = () => {
    if (residentName.trim()) {
      navigation.navigate('ResidentCreationRitual');
    }
  };

  const handleRetake = () => {
    navigation.navigate('Camera');
  };

  const handleTagSelect = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // 可选的标签
  const availableTags = [
    '探索者', '守护者', '思考者', '创造者', 
    '观察者', '记录者', '梦想家', '实践者'
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 顶部导航 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleRetake}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>创建数字生命</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* 照片预览 */}
      <View style={styles.photoSection}>
        <View style={styles.photoPreview}>
          <Text style={styles.photoPlaceholder}>📷</Text>
        </View>
        <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
          <Text style={styles.retakeText}>重新拍摄</Text>
        </TouchableOpacity>
      </View>

      {/* 表单区域 */}
      <View style={styles.formSection}>
        {/* 名称输入 */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>为这个生命命名</Text>
          <TextInput
            style={styles.textInput}
            placeholder="输入一个有意义的名字"
            placeholderTextColor={COLORS.outlineVariant}
            value={residentName}
            onChangeText={setResidentName}
            maxLength={20}
          />
          <View style={styles.inputUnderline} />
          <Text style={styles.charCount}>{residentName.length}/20</Text>
        </View>

        {/* 描述输入 */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>描述它的特质</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="描述这个生命的性格、故事或特点"
            placeholderTextColor={COLORS.outlineVariant}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            maxLength={100}
          />
          <View style={styles.inputUnderline} />
          <Text style={styles.charCount}>{description.length}/100</Text>
        </View>

        {/* 标签选择 */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>选择标签</Text>
          <View style={styles.tagsContainer}>
            {availableTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tagButton,
                  selectedTags.includes(tag) && styles.tagButtonSelected
                ]}
                onPress={() => handleTagSelect(tag)}
              >
                <Text style={[
                  styles.tagText,
                  selectedTags.includes(tag) && styles.tagTextSelected
                ]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 提示信息 */}
        <View style={styles.tipSection}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>
            一个好的名字和描述能帮助数字生命更好地理解自己。
            标签将影响它的性格和对话风格。
          </Text>
        </View>
      </View>

      {/* 操作按钮 */}
      <View style={styles.actionSection}>
        <TouchableOpacity 
          style={[styles.saveButton, !residentName && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!residentName}
        >
          <Text style={styles.saveButtonText}>开始唤醒仪式</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.lg,
  },
  backButton: {
    padding: SPACING.xs,
  },
  backIcon: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
  },
  headerTitle: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
  },
  headerSpacer: {
    width: 40,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  photoPlaceholder: {
    ...TYPOGRAPHY.headlineMd,
  },
  retakeButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  retakeText: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.secondaryText,
  },
  formSection: {
    paddingHorizontal: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.xl,
  },
  inputLabel: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.secondaryText,
    marginBottom: SPACING.sm,
    letterSpacing: 1,
  },
  textInput: {
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.primaryText,
    paddingVertical: SPACING.sm,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputUnderline: {
    height: 1,
    backgroundColor: COLORS.outlineVariant,
    opacity: 0.3,
    marginTop: SPACING.xs,
  },
  charCount: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.outlineVariant,
    textAlign: 'right',
    marginTop: SPACING.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  tagButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  tagButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  tagText: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.secondaryText,
  },
  tagTextSelected: {
    color: COLORS.onPrimary,
  },
  tipSection: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceContainerLow,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.lg,
  },
  tipIcon: {
    ...TYPOGRAPHY.bodyLg,
    marginRight: SPACING.sm,
  },
  tipText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    flex: 1,
    lineHeight: 20,
  },
  actionSection: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    ...DESIGN_PRINCIPLES.glassmorphism,
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.outlineVariant,
    opacity: 0.5,
  },
  saveButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
    letterSpacing: 1,
  },
});

export default CreateResidentScreen;