import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('Digital_Explorer');
  const [bio, setBio] = useState('在数字世界中寻找真实的回声');

  const moods = [
    { id: 'mood1', name: '平静', color: '#A8C3B8' },
    { id: 'mood2', name: '好奇', color: '#D4E5F4' },
    { id: 'mood3', name: '沉思', color: '#F2E3FA' },
    { id: 'mood4', name: '期待', color: '#E4E2E1' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.title}>个人档案</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editButton}>{isEditing ? '完成' : '编辑'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>DE</Text>
            </View>
          </View>

          {isEditing ? (
            <View style={styles.editForm}>
              <TextInput
                style={styles.editInput}
                value={username}
                onChangeText={setUsername}
                placeholder="用户名"
              />
              <TextInput
                style={[styles.editInput, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                placeholder="个人简介"
                multiline
                numberOfLines={3}
              />
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.bio}>{bio}</Text>
            </View>
          )}
        </View>

        <View style={styles.moodSection}>
          <Text style={styles.sectionTitle}>当前心境</Text>
          <View style={styles.moodGrid}>
            {moods.map((mood) => (
              <TouchableOpacity key={mood.id} style={styles.moodCard}>
                <View style={[styles.moodColor, { backgroundColor: mood.color }]} />
                <Text style={styles.moodName}>{mood.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>数据统计</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>对话次数</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>探索场景</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>18</Text>
              <Text style={styles.statLabel}>情感记录</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>活跃天数</Text>
            </View>
          </View>
        </View>

        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>偏好设置</Text>
          <View style={styles.preferenceList}>
            <TouchableOpacity style={styles.preferenceItem}>
              <Text style={styles.preferenceText}>通知设置</Text>
              <Text style={styles.preferenceArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.preferenceItem}>
              <Text style={styles.preferenceText}>隐私选项</Text>
              <Text style={styles.preferenceArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.preferenceItem}>
              <Text style={styles.preferenceText}>数据备份</Text>
              <Text style={styles.preferenceArrow}>›</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 64,
    paddingBottom: 32,
  },
  backButton: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#51616e',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3432',
  },
  editButton: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#5f5e5e',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#5f5e5e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'Inter',
    fontSize: 24,
    color: '#faf7f6',
    fontWeight: '600',
  },
  editForm: {
    width: '100%',
    gap: 16,
  },
  editInput: {
    backgroundColor: '#f2f4f2',
    padding: 12,
    borderRadius: 8,
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#2d3432',
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  profileInfo: {
    alignItems: 'center',
    gap: 8,
  },
  username: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '600',
    color: '#2d3432',
  },
  bio: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#767c79',
    textAlign: 'center',
    lineHeight: 24,
  },
  moodSection: {
    marginBottom: 40,
  },
  statsSection: {
    marginBottom: 40,
  },
  preferencesSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    letterSpacing: 2,
    color: '#2d3432',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  moodCard: {
    alignItems: 'center',
    gap: 8,
  },
  moodColor: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  moodName: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#767c79',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    width: '48%',
    backgroundColor: '#f2f4f2',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '600',
    color: '#2d3432',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#767c79',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  preferenceList: {
    gap: 1,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f4f2',
    padding: 16,
    borderRadius: 8,
  },
  preferenceText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#2d3432',
  },
  preferenceArrow: {
    fontFamily: 'Inter',
    fontSize: 20,
    color: '#767c79',
  },
});

export default ProfileScreen;