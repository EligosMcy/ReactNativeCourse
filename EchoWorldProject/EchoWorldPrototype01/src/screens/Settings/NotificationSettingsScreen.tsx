import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Card, Toggle } from '../../components/ui';
import type { RootStackParamList } from '../../types';

type NotificationSettingsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const NotificationSettingsScreen: React.FC = () => {
  const navigation = useNavigation<NotificationSettingsNavigationProp>();
  
  // 通知设置状态
  const [pushNotifications, setPushNotifications] = useState(true);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  const [quietHoursStart, setQuietHoursStart] = useState('22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('08:00');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>通知</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 推送通知行 */}
        <Card style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>推送通知</Text>
              <Text style={styles.settingDescription}>
                接收角色消息和重要更新的推送通知
              </Text>
            </View>
            <Toggle
              value={pushNotifications}
              onValueChange={setPushNotifications}
            />
          </View>
        </Card>

        {/* 静默窗口区块 */}
        <Card style={styles.card}>
          {/* 静默窗口开关 */}
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>静默窗口</Text>
              <Text style={styles.settingDescription}>
                静默窗口内不推送，消息仍接收，窗口结束后统一发出
              </Text>
            </View>
            <Toggle
              value={quietHoursEnabled}
              onValueChange={setQuietHoursEnabled}
              disabled={!pushNotifications}
            />
          </View>

          {/* 开始时间行 */}
          {quietHoursEnabled && pushNotifications && (
            <>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.timeRow}>
                <Text style={styles.timeLabel}>开始时间</Text>
                <Text style={styles.timeValue}>{quietHoursStart}</Text>
              </TouchableOpacity>

              {/* 结束时间行 */}
              <View style={styles.divider} />
              <TouchableOpacity style={styles.timeRow}>
                <Text style={styles.timeLabel}>结束时间</Text>
                <Text style={styles.timeValue}>{quietHoursEnd}</Text>
              </TouchableOpacity>
            </>
          )}
        </Card>

        {/* 底部说明 */}
        <Text style={styles.footerText}>时间以您的设备时区为准</Text>
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
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.text.primary,
  },
  title: {
    fontSize: typography.sectionTitle.fontSize,
    fontWeight: typography.sectionTitle.fontWeight,
    color: colors.text.primary,
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: spacing.pagePadding,
    paddingVertical: spacing.lg,
  },
  card: {
    marginBottom: spacing.lg,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  settingContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingTitle: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: typography.caption.fontSize,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.subtle,
    marginHorizontal: spacing.md,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  timeLabel: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
  },
  timeValue: {
    fontSize: typography.body.fontSize,
    color: colors.accent.primary,
    fontWeight: '500',
  },
  footerText: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
});
