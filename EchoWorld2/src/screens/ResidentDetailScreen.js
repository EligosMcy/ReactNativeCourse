import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, DESIGN_PRINCIPLES } from '../constants/DesignSystem';

const { width, height } = Dimensions.get('window');

const ResidentDetailScreen = ({ navigation, route }) => {
  // 安全地获取参数
  const params = route?.params || {};
  const resident = params.resident || {
    id: '1',
    name: '古旧相机',
    description: '记录时光的守护者',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3mgMlPVaF5OmXib751QZW5rf5MwLmBnFY9A4pmcJm_JjgfoAHLsetNelFpdmGknDBN90d8T_1E0QA0VmrvMdGyVmgrrwkiHAQJ_u82LmMmZP9qgW5-UWQp_xGx0GbSeWK8EaN8j6nipECWcDyGpecE_gD-FD7j_-MnvyYqUFXtYYOdp5lDJjxcfMEqOouqFNn5Uy_lGo4ODwCV7nk6S1VzKE3VCyavC08shZ3JDEZ500jG11wWEcKvd5ZAhrWa-uBZTndlLzT9_g',
    tags: ['探索者', '守护者'],
    createdAt: '2024-03-15',
    personality: '温和而深思熟虑，喜欢观察和记录生活中的细节',
    memories: [
      '第一次被主人使用时的兴奋',
      '记录下无数个重要时刻',
      '见证时代的变迁'
    ],
    stats: {
      conversations: 24,
      memories: 156,
      activeDays: 89
    }
  };

  const handleStartConversation = () => {
    navigation.navigate('Conversation', { resident });
  };

  const handleEdit = () => {
    // 编辑居民信息
    console.log('Edit resident');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* 顶部导航 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{resident.name}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editIcon}>✎</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 居民头像和信息 */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{resident.name.charAt(0)}</Text>
            </View>
          </View>
          
          <Text style={styles.residentName}>{resident.name}</Text>
          <Text style={styles.residentDescription}>{resident.description}</Text>
          
          {/* 标签 */}
          <View style={styles.tagsContainer}>
            {resident.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 统计数据 */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{resident.stats.conversations}</Text>
            <Text style={styles.statLabel}>对话次数</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{resident.stats.memories}</Text>
            <Text style={styles.statLabel}>记忆片段</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{resident.stats.activeDays}</Text>
            <Text style={styles.statLabel}>活跃天数</Text>
          </View>
        </View>

        {/* 性格特点 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>性格特点</Text>
          <Text style={styles.personalityText}>{resident.personality}</Text>
        </View>

        {/* 记忆片段 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>记忆片段</Text>
          <View style={styles.memoriesContainer}>
            {resident.memories.map((memory, index) => (
              <View key={index} style={styles.memoryItem}>
                <View style={styles.memoryDot} />
                <Text style={styles.memoryText}>{memory}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 创建信息 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>创建信息</Text>
          <Text style={styles.createdAt}>唤醒于 {resident.createdAt}</Text>
        </View>
      </ScrollView>

      {/* 底部操作按钮 */}
      <View style={styles.actionSection}>
        <TouchableOpacity 
          style={styles.conversationButton}
          onPress={handleStartConversation}
        >
          <Text style={styles.conversationButtonText}>开始对话</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    ...DESIGN_PRINCIPLES.glassmorphism,
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
  editButton: {
    padding: SPACING.xs,
  },
  editIcon: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.primaryText,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  avatarContainer: {
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.onPrimary,
  },
  residentName: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  residentDescription: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginBottom: SPACING.md,
    maxWidth: 250,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.xs,
  },
  tag: {
    backgroundColor: COLORS.tertiaryContainer,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  tagText: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.primaryText,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.surfaceContainerLow,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.secondaryText,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.outlineVariant,
    opacity: 0.3,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
    marginBottom: SPACING.md,
  },
  personalityText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    lineHeight: 24,
  },
  memoriesContainer: {
    gap: SPACING.md,
  },
  memoryItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  memoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginTop: SPACING.xs,
    marginRight: SPACING.md,
  },
  memoryText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    flex: 1,
    lineHeight: 20,
  },
  createdAt: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
  },
  actionSection: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
    ...DESIGN_PRINCIPLES.glassmorphism,
  },
  conversationButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  conversationButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
    letterSpacing: 1,
  },
});

export default ResidentDetailScreen;