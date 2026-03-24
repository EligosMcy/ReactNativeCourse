import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function DraftScreen({ navigation, route }) {
  const [drafts, setDrafts] = useState([
    {
      id: '1',
      name: '测试草稿',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      roomImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      maturity: '青年期',
      created: '2小时前',
      completed: false,
      progress: 0.7
    },
    {
      id: '2',
      name: '未命名草稿',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      roomImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      maturity: '壮年期',
      created: '1天前',
      completed: true,
      progress: 1
    }
  ]);

  const handleDraftPress = (draft) => {
    Alert.alert(
      '编辑草稿',
      `是否继续编辑"${draft.name}"？`,
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '继续编辑',
          onPress: () => navigation.navigate('CharacterCreation', { draftId: draft.id })
        },
        { 
          text: '删除草稿',
          style: 'destructive',
          onPress: () => handleDeleteDraft(draft.id)
        }
      ]
    );
  };

  const handleDeleteDraft = (draftId) => {
    Alert.alert(
      '删除草稿',
      '确定要删除这个草稿吗？',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '删除',
          style: 'destructive',
          onPress: () => {
            setDrafts(drafts.filter(draft => draft.id !== draftId));
            Alert.alert('提示', '草稿已删除');
          }
        }
      ]
    );
  };

  const renderDraft = ({ item }) => (
    <TouchableOpacity 
      style={styles.draftCard}
      onPress={() => handleDraftPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.draftHeader}>
        <Image source={{ uri: item.avatar }} style={styles.draftAvatar} />
        <View style={styles.draftInfo}>
          <Text style={styles.draftName}>{item.name}</Text>
          <Text style={styles.draftMaturity}>{item.maturity}</Text>
          <Text style={styles.draftCreated}>{item.created}</Text>
        </View>
        {item.completed ? (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={20} color="#34C759" />
            <Text style={styles.completedText}>已完成</Text>
          </View>
        ) : (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${item.progress * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{Math.round(item.progress * 100)}%</Text>
          </View>
        )}
      </View>
      {item.roomImage && (
        <Image source={{ uri: item.roomImage }} style={styles.roomImage} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>角色草稿</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CharacterCreation')}
          style={styles.newButton}
        >
          <Ionicons name="add" size={24} color="#5B9BD5" />
        </TouchableOpacity>
      </View>

      {drafts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-outline" size={64} color="#CCC" />
          <Text style={styles.emptyText}>暂无草稿</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('CharacterCreation')}
          >
            <Text style={styles.createButtonText}>创建新角色</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={drafts}
          renderItem={renderDraft}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  newButton: {
    padding: 8,
  },
  listContainer: {
    padding: 16,
  },
  draftCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  draftHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  draftAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  draftInfo: {
    flex: 1,
  },
  draftName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  draftMaturity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  draftCreated: {
    fontSize: 12,
    color: '#999',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
  },
  completedText: {
    fontSize: 12,
    color: '#34C759',
    marginLeft: 4,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: 50,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5B9BD5',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  roomImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F0F0F0',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  createButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#5B9BD5',
    borderRadius: 24,
  },
  createButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
