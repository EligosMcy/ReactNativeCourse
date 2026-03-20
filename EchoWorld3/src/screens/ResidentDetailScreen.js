import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../constants/DesignSystem';

const ResidentDetailScreen = ({ route, navigation }) => {
  const { resident } = route?.params || {};
  
  const defaultResident = {
    id: '1',
    name: '数字居民',
    description: '数字生命体',
    image: 'https://via.placeholder.com/200',
    personality: '友好、好奇、善于学习',
    createdDate: '2024-01-20',
    status: '活跃'
  };

  const residentData = resident || defaultResident;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: residentData.image }} style={styles.avatar} />
        <Text style={styles.name}>{residentData.name}</Text>
        <Text style={styles.description}>{residentData.description}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>基本信息</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>性格特征</Text>
            <Text style={styles.infoValue}>{residentData.personality}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>创建时间</Text>
            <Text style={styles.infoValue}>{residentData.createdDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>状态</Text>
            <Text style={[styles.infoValue, styles.statusActive]}>{residentData.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Conversation', { resident: residentData })}
        >
          <Text style={styles.primaryButtonText}>开始对话</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryButtonText}>返回</Text>
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
    alignItems: 'center',
    padding: SPACING.xl,
    paddingTop: SPACING.xxl,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SPACING.md,
  },
  name: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  description: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    textAlign: 'center',
  },
  infoSection: {
    padding: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
    marginBottom: SPACING.md,
  },
  infoCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
  },
  infoValue: {
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.primaryText,
  },
  statusActive: {
    color: COLORS.activePulse,
  },
  actions: {
    padding: SPACING.xl,
    gap: SPACING.md,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
  },
  secondaryButton: {
    backgroundColor: COLORS.surfaceContainerLow,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
  },
});

export default ResidentDetailScreen;