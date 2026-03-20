import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, DESIGN_PRINCIPLES } from '../constants/DesignSystem';

const { width, height } = Dimensions.get('window');

const MainScreen = ({ navigation }) => {
  const handleCreateResident = () => {
    navigation.navigate('Camera');
  };

  const handleResidentPress = (resident) => {
    navigation.navigate('ResidentDetail', { resident });
  };

  const handleSettings = () => {
    // 设置界面
    console.log('Open settings');
  };

  const handleMenu = () => {
    // 菜单界面
    console.log('Open menu');
  };

  // 模拟居民数据
  const residents = [
    {
      id: '1',
      name: '古旧相机',
      description: '记录时光的守护者',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3mgMlPVaF5OmXib751QZW5rf5MwLmBnFY9A4pmcJm_JjgfoAHLsetNelFpdmGknDBN90d8T_1E0QA0VmrvMdGyVmgrrwkiHAQJ_u82LmMmZP9qgW5-UWQp_xGx0GbSeWK8EaN8j6nipECWcDyGpecE_gD-FD7j_-MnvyYqUFXtYYOdp5lDJjxcfMEqOouqFNn5Uy_lGo4ODwCV7nk6S1VzKE3VCyavC08shZ3JDEZ500jG11wWEcKvd5ZAhrWa-uBZTndlLzT9_g',
      tags: ['探索者', '守护者'],
      lastActive: '2小时前'
    },
    {
      id: '2',
      name: '陶瓷茶杯',
      description: '承载温暖的容器',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbOSZQGsITjNO3XakuH7MmEXmGq36JzwlOvLObjRW3zNoIMW5mYkSNgmYPajOcjeyHvly0I2LR0_jsdML4GXMCSIU-pbT3plJqNvCyVaVg3mfaFh8qRFk5sS5h6DwA293sW8dTzZR5zmhLmCQyzRzcyuOKfa88wCeV0RnVnu7H-QyoaJzU_WS1P4fU7FIt4nRo8p6f4skT0y_8jNEOjL2B4eBtsN_dWgq-2Om-7s4VSL-uEdyd_xqwZobZTfqsO1_JVPqhubBu7RE',
      tags: ['思考者', '创造者'],
      lastActive: '1天前'
    }
  ];

  return (
    <View style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenu}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ECHOWORLD</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* 主内容区域 */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 欢迎区域 */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>您的数字居所</Text>
          <Text style={styles.welcomeSubtitle}>这里居住着 {residents.length} 位数字生命</Text>
        </View>

        {/* 创建居民按钮 */}
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateResident}
        >
          <View style={styles.createButtonIcon}>
            <Text style={styles.createButtonIconText}>+</Text>
          </View>
          <Text style={styles.createButtonText}>唤醒新的数字生命</Text>
        </TouchableOpacity>

        {/* 居民列表 */}
        <View style={styles.residentsSection}>
          <Text style={styles.sectionTitle}>活跃居民</Text>
          
          {residents.length > 0 ? (
            <View style={styles.residentsGrid}>
              {residents.map((resident) => (
                <TouchableOpacity
                  key={resident.id}
                  style={styles.residentCard}
                  onPress={() => handleResidentPress(resident)}
                >
                  <View style={styles.residentImage}>
                    <Text style={styles.residentImagePlaceholder}>
                      {resident.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.residentInfo}>
                    <Text style={styles.residentName}>{resident.name}</Text>
                    <Text style={styles.residentDescription} numberOfLines={1}>
                      {resident.description}
                    </Text>
                    <View style={styles.residentTags}>
                      {resident.tags.slice(0, 2).map((tag, index) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                    <Text style={styles.lastActive}>{resident.lastActive}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>居所空置</Text>
              <Text style={styles.emptyStateText}>
                您的居所目前还没有居民。
                点击上方按钮唤醒第一个数字生命。
              </Text>
            </View>
          )}
        </View>

        {/* 统计数据 */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{residents.length}</Text>
            <Text style={styles.statLabel}>活跃居民</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>对话记录</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>探索区域</Text>
          </View>
        </View>
      </ScrollView>

      {/* 底部导航栏 */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <Text style={styles.navIconActive}>🗺</Text>
          <Text style={styles.navLabelActive}>地图</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📚</Text>
          <Text style={styles.navLabel}>档案</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🌊</Text>
          <Text style={styles.navLabel}>回响</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>我的</Text>
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
  menuButton: {
    padding: SPACING.xs,
  },
  menuIcon: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
  },
  headerTitle: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  settingsButton: {
    padding: SPACING.xs,
  },
  settingsIcon: {
    ...TYPOGRAPHY.bodyLg,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  welcomeSection: {
    paddingVertical: SPACING.xl,
    alignItems: 'center',
  },
  welcomeTitle: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.primaryText,
    marginBottom: SPACING.xs,
  },
  welcomeSubtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
  },
  createButtonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  createButtonIconText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
  },
  createButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
  },
  residentsSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
    marginBottom: SPACING.md,
  },
  residentsGrid: {
    gap: SPACING.md,
  },
  residentCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceContainerLow,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  residentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  residentImagePlaceholder: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
  },
  residentInfo: {
    flex: 1,
  },
  residentName: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
    marginBottom: 2,
  },
  residentDescription: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    marginBottom: SPACING.xs,
  },
  residentTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  tag: {
    backgroundColor: COLORS.tertiaryContainer,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  tagText: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.primaryText,
  },
  lastActive: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.outlineVariant,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyStateTitle: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.secondaryText,
    marginBottom: SPACING.xs,
  },
  emptyStateText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    textAlign: 'center',
    maxWidth: 200,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.surfaceContainerLow,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xxl,
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
    ...DESIGN_PRINCIPLES.glassmorphism,
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    alignItems: 'center',
  },
  navIcon: {
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.outlineVariant,
    marginBottom: 2,
  },
  navIconActive: {
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.primary,
    marginBottom: 2,
  },
  navLabel: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.outlineVariant,
    letterSpacing: 1,
  },
  navLabelActive: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.primary,
    letterSpacing: 1,
  },
});

export default MainScreen;