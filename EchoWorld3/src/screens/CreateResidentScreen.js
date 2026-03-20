import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../constants/DesignSystem';

const CreateResidentScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [personality, setPersonality] = useState('');

  const handleCreate = () => {
    navigation.navigate('ResidentCreationRitual');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>创建数字居民</Text>
        <Text style={styles.subtitle}>为您的数字生命定义基本属性</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>居民名称</Text>
          <TextInput
            style={styles.input}
            placeholder="输入居民名称"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>描述</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="描述这个数字居民的特点"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>性格特征</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="描述性格特征（如：友好、好奇、安静等）"
            value={personality}
            onChangeText={setPersonality}
            multiline
            numberOfLines={2}
          />
        </View>

        <TouchableOpacity 
          style={[styles.createButton, !name && styles.createButtonDisabled]} 
          onPress={handleCreate}
          disabled={!name}
        >
          <Text style={styles.createButtonText}>开始生成仪式</Text>
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
    padding: SPACING.xl,
    paddingTop: SPACING.xxl,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  title: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
  },
  form: {
    padding: SPACING.xl,
    gap: SPACING.lg,
  },
  inputGroup: {
    gap: SPACING.sm,
  },
  label: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
  },
  input: {
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.primaryText,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  createButtonDisabled: {
    backgroundColor: COLORS.surfaceContainerHighest,
  },
  createButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
  },
});

export default CreateResidentScreen;