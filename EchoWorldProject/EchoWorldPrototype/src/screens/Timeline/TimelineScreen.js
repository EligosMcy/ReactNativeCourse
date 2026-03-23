import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTimelineStore } from '../../stores/timelineStore';
import { Ionicons } from '@expo/vector-icons';

export default function TimelineScreen({ navigation }) {
  const { posts, filters, selectedFilter, fetchPosts, toggleLike, setSelectedFilter } = useTimelineStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = selectedFilter === 'all' 
    ? posts 
    : posts.filter(post => post.characterId === selectedFilter);

  useEffect(() => {
    console.log('过滤器状态:', selectedFilter);
    console.log('过滤后的帖子数量:', filteredPosts.length);
    console.log('filters数组:', filters);
  }, [selectedFilter, filteredPosts, filters]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const renderFilter = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        selectedFilter === item.id && styles.filterChipActive
      ]}
      onPress={() => setSelectedFilter(item.id)}
    >
      <Text style={[
        styles.filterText,
        selectedFilter === item.id && styles.filterTextActive
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <TouchableOpacity
        style={styles.postHeader}
        onPress={() => navigation.navigate('Profile', {
          characterId: item.characterId,
          character: {
            id: item.characterId,
            name: item.characterName,
            avatar: item.characterAvatar
          }
        })}
      >
        <Image source={{ uri: item.characterAvatar }} style={styles.postAvatar} />
        <View style={styles.postHeaderInfo}>
          <Text style={styles.postAuthor}>{item.characterName}</Text>
          <Text style={styles.postTime}>
            {formatRelativeTime(item.timestamp)}
          </Text>
        </View>
        {item.location && (
          <View style={styles.postLocation}>
            <Ionicons name="location-outline" size={12} color="#666" />
            <Text style={styles.postLocationText}>{item.location.name}</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.postContent}>{item.content}</Text>

      {item.images && item.images.length > 0 && (
        <View style={styles.postImages}>
          {item.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={[
                styles.postImage,
                item.images.length === 1 && styles.postImageSingle
              ]}
            />
          ))}
        </View>
      )}

      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleLike(item.id)}
        >
          <Ionicons
            name={item.userLiked ? 'heart' : 'heart-outline'}
            size={20}
            color={item.userLiked ? '#FF3B30' : '#666'}
          />
          <Text style={[styles.actionText, item.userLiked && styles.actionTextActive]}>
            {item.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{item.comments.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {item.comments.length > 0 && (
        <View style={styles.postComments}>
          {item.comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <Text style={styles.commentAuthor}>{comment.characterName}</Text>
              <Text style={styles.commentContent}>{comment.content}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>发现</Text>
      </View>

      <View style={styles.filterContainer}>
        {filters && filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              selectedFilter === filter.id && styles.filterChipActive
            ]}
            onPress={() => {
              console.log('点击过滤器:', filter.id);
              setSelectedFilter(filter.id);
            }}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.filterTextActive
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postList}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={48} color="#CCC" />
            <Text style={styles.emptyText}>暂无内容</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

function formatRelativeTime(timestamp) {
  const now = new Date();
  const postTime = new Date(timestamp);
  const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));

  if (diffInMinutes< 1) return '刚刚';
  if (diffInMinutes < 60) return `${diffInMinutes}分钟前`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}小时前`;
  if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}天前`;
  
  return postTime.toLocaleDateString('zh-CN');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#fff',
  },
  filterChip: {
    width: 80,
    height: 36,
    backgroundColor: '#F0F0F0',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  postList: {
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postHeaderInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  postTime: {
    fontSize: 12,
    color: '#999',
  },
  postLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  postLocationText: {
    fontSize: 12,
    color: '#666',
  },
  postContent: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 12,
  },
  postImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  postImage: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  postImageSingle: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
  },
  actionTextActive: {
    color: '#FF3B30',
  },
  postComments: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  commentAuthor: {
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
  },
});