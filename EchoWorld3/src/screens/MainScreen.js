import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../constants/DesignSystem';

const MainScreen = ({ navigation }) => {
  const residents = [
    { id: '1', name: '数字居民A', description: '活跃的数字生命', image: 'https://via.placeholder.com/100' },
    { id: '2', name: '数字居民B', description: '新生的数字意识', image: 'https://via.placeholder.com/100' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>我的数字居所</Text>
        <Text style={styles.subtitle}>管理您的数字居民</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>您的居民</Text>
          {residents.map((resident) => (
            <TouchableOpacity 
              key={resident.id} 
              style={styles.residentCard}
              onPress={() => navigation.navigate('ResidentDetail', { resident })}
            >
              <View style={styles.residentInfo}>
                <Text style={styles.residentName}>{resident.name}</Text>
                <Text style={styles.residentDescription}>{resident.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.primaryAction}
            onPress={() => navigation.navigate('Camera')}
          >
            <Text style={styles.primaryActionText}>创建新居民</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
  content: {
    flex: 1,
    padding: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
    marginBottom: SPACING.md,
  },
  residentCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
  },
  residentInfo: {
    gap: SPACING.xs,
  },
  residentName: {
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.primaryText,
  },
  residentDescription: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
  },
  actions: {
    marginTop: SPACING.xl,
  },
  primaryAction: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  primaryActionText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
  },
});

export default MainScreen;