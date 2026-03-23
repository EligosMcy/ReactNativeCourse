import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../../stores/userStore';

export default function SettingsScreen({ navigation }) {
  const { user, preferences, updatePreferences, signOut } = useUserStore();

  const settingsSections = [
    {
      title: '账户',
      items: [
        {
          title: 'Profile',
          icon: 'person-outline',
          onPress: () => Alert.alert('提示', '编辑个人资料功能开发中'),
          type: 'navigation'
        },
        {
          title: 'Change Password',
          icon: 'lock-closed-outline',
          onPress: () => Alert.alert('提示', '修改密码功能开发中'),
          type: 'navigation'
        },
        {
          title: 'Sign Out',
          icon: 'log-out-outline',
          onPress: () => {
            Alert.alert(
              '退出登录',
              '确定要退出登录吗？',
              [
                { text: '取消', style: 'cancel' },
                { 
                  text: '确定', 
                  style: 'destructive',
                  onPress: () => {
                    signOut();
                    Alert.alert('提示', '已退出登录');
                  }
                }
              ]
            );
          },
          type: 'destructive'
        }
      ]
    },
    {
      title: '通知',
      items: [
        {
          title: '推送通知',
          icon: 'notifications-outline',
          type: 'toggle',
          value: preferences.notifications,
          onValueChange: (value) => updatePreferences({ notifications: value })
        },
        {
          title: '静默窗口',
          icon: 'moon-outline',
          onPress: () => Alert.alert('提示', '设置静默窗口功能开发中'),
          type: 'navigation'
        }
      ]
    },
    {
      title: '偏好',
      items: [
        {
          title: '语言',
          icon: 'language-outline',
          value: preferences.language === 'zh-CN' ? '简体中文' : 'English',
          onPress: () => Alert.alert('提示', '语言设置功能开发中'),
          type: 'navigation'
        },
        {
          title: '主题',
          icon: 'color-palette-outline',
          value: preferences.theme === 'light' ? '浅色' : '深色',
          onPress: () => Alert.alert('提示', '主题设置功能开发中'),
          type: 'navigation'
        }
      ]
    },
    {
      title: '支持',
      items: [
        {
          title: 'ECHOWORLD Docs',
          icon: 'document-text-outline',
          onPress: () => Alert.alert('提示', '文档功能开发中'),
          type: 'navigation'
        },
        {
          title: 'Customer Service',
          icon: 'headset-outline',
          onPress: () => Alert.alert('提示', '客服功能开发中'),
          type: 'navigation'
        }
      ]
    },
    {
      title: '法律',
      items: [
        {
          title: 'About Us',
          icon: 'information-circle-outline',
          onPress: () => Alert.alert('提示', '关于我们功能开发中'),
          type: 'navigation'
        },
        {
          title: 'Privacy Policy',
          icon: 'shield-outline',
          onPress: () => Alert.alert('提示', '隐私政策功能开发中'),
          type: 'navigation'
        },
        {
          title: 'Terms of Service',
          icon: 'document-outline',
          onPress: () => Alert.alert('提示', '服务条款功能开发中'),
          type: 'navigation'
        }
      ]
    }
  ];

  const renderSettingItem = (item, index) => {
    switch (item.type) {
      case 'toggle':
        return (
          <TouchableOpacity key={index} style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name={item.icon} size={24} color="#666" />
              <Text style={styles.settingItemTitle}>{item.title}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.onValueChange}
              trackColor={{ false: '#D1D1D6', true: '#34C759' }}
              thumbColor="#fff"
            />
          </TouchableOpacity>
        );
      case 'destructive':
        return (
          <TouchableOpacity
            key={index}
            style={styles.settingItem}
            onPress={item.onPress}
          >
            <View style={styles.settingItemLeft}>
              <Ionicons name={item.icon} size={24} color="#FF3B30" />
              <Text style={[styles.settingItemTitle, styles.destructiveText]}>
                {item.title}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
        );
      default:
        return (
          <TouchableOpacity
            key={index}
            style={styles.settingItem}
            onPress={item.onPress}
          >
            <View style={styles.settingItemLeft}>
              <Ionicons name={item.icon} size={24} color="#666" />
              <Text style={styles.settingItemTitle}>{item.title}</Text>
            </View>
            {item.value && (
              <Text style={styles.settingItemValue}>{item.value}</Text>
            )}
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>设置</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userSection}>
          <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => Alert.alert('提示', '编辑个人资料功能开发中')}
          >
            <Text style={styles.editButtonText}>编辑</Text>
          </TouchableOpacity>
        </View>

        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  settingsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  settingItemValue: {
    fontSize: 14,
    color: '#999',
    marginRight: 8,
  },
  destructiveText: {
    color: '#FF3B30',
  },
});