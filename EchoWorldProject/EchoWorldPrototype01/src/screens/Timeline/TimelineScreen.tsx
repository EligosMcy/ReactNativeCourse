import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Avatar, Card } from '../../components/ui';
import { useCharacterStore } from '../../stores';
import { mockApi } from '../../services/mockApi';
import type { RootStackParamList, TimelinePost } from '../../types';

type TimelineNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TimelineScreen: React.FC = () => {
  const navigation = useNavigation<TimelineNavigationProp>();
  const { characters, currentCharacterId } = useCharacterStore();
  const [posts, setPosts] = useState<TimelinePost[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  // 如果没有角色，重定向到创建角色页面
  useEffect(() => {
    if (characters.length === 0) {
      navigation.replace('CreateCharacter');
    }
  }, [characters, navigation]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await mockApi.timeline.getPosts();
      
      // 检查是否有新角色需要生成帖子
      const existingCharacterIds = new Set(data.map(post => post.characterId));
      const newCharacters = characters.filter(char => !existingCharacterIds.has(char.id));
      
      // 如果没有数据，或者有新角色，生成帖子
      if (data.length === 0 || newCharacters.length > 0) {
        // 随机帖子内容
        const postTexts = [
          '今天天气真好，适合出去走走！',
          '刚读完一本很棒的书，推荐给大家。',
          '周末和朋友聚会，玩得很开心！',
          '今天尝试了新的食谱，味道不错！',
          '最近在学习新技能，感觉很有收获。',
          '看到美丽的日落，心情特别好。',
          '今天工作很顺利，完成了很多任务。',
          '和家人一起度过了愉快的一天。',
          '早上跑步时遇到了可爱的小狗。',
          '发现了一家很棒的咖啡店。',
          '今天看了一部感人的电影。',
          '学习了新的摄影技巧。',
          '整理了房间，感觉心情舒畅。',
          '和朋友视频聊天，分享了很多趣事。',
          '尝试了冥想，感觉很放松。'
        ];
        
        const locations = ['公园', '咖啡馆', '图书馆', '美术馆', '餐厅', '家里', '办公室', '健身房', '书店', '电影院'];
        
        const generatedPosts: TimelinePost[] = [];
        
        // 为每个角色生成随机帖子
        characters.forEach((char, charIndex) => {
          for (let i = 0; i < 5; i++) {
            const isImagePost = Math.random() > 0.5;
            generatedPosts.push({
              id: `${char.id}-post-${i}`,
              characterId: char.id,
              characterName: char.name,
              characterAvatarUrl: null,
              text: postTexts[Math.floor(Math.random() * postTexts.length)],
              locationLabel: locations[Math.floor(Math.random() * locations.length)],
              contentType: isImagePost ? 'image' : 'text',
              imageUrl: isImagePost ? `https://picsum.photos/800/600?random=${charIndex}-${i}` : null,
              publishedAt: new Date(Date.now() - 1000 * 60 * 60 * Math.floor(Math.random() * 72)).toISOString(),
              likeCount: Math.floor(Math.random() * 50),
              replyCount: Math.floor(Math.random() * 20),
              isLikedByPlayer: Math.random() > 0.7,
            });
          }
        });
        
        mockApi.timeline.savePosts(generatedPosts);
        setPosts(generatedPosts);
      } else {
        setPosts(data);
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [])
  );

  const handleLike = async (postId: string, isLiked: boolean) => {
    try {
      if (isLiked) {
        await mockApi.timeline.unlike(postId);
      } else {
        await mockApi.timeline.like(postId);
      }
      setPosts(posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLikedByPlayer: !isLiked,
              likeCount: isLiked ? post.likeCount - 1 : post.likeCount + 1
            }
          : post
      ));
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / 3600000;
    
    if (diffHours < 1) return '刚刚';
    if (diffHours < 24) return `${Math.floor(diffHours)}小时前`;
    if (diffHours < 168) return `${Math.floor(diffHours / 24)}天前`;
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const renderPost = ({ item }: { item: TimelinePost }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { postId: item.id })}>
      <Card style={styles.postCard}>
        <View style={styles.postHeader}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('CharacterStatus', { characterId: item.characterId })}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Avatar name={item.characterName} size={36} />
          </TouchableOpacity>
          <View style={styles.postMeta}>
            <Text style={styles.postName}>{item.characterName}</Text>
            <Text style={styles.postLocation}>
              {item.locationLabel} · {formatTime(item.publishedAt)}
            </Text>
          </View>
        </View>

        {item.contentType === 'image' && item.imageUrl && (
          <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
        )}

        <Text style={styles.postText}>{item.text}</Text>

        <View style={styles.postActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              handleLike(item.id, item.isLikedByPlayer);
            }}
          >
            <Text style={[styles.actionText, item.isLikedByPlayer && styles.likedText]}>
              {item.isLikedByPlayer ? '♥' : '♡'} {item.likeCount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              navigation.navigate('PostDetail', { postId: item.id });
            }}
          >
            <Text style={styles.actionText}>💬 {item.replyCount}</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
      </View>

      {characters.length > 0 && (
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterOption, selectedFilter === 'all' && styles.filterSelected]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.filterText, selectedFilter === 'all' && styles.filterTextSelected]}>
              全部
            </Text>
          </TouchableOpacity>
          {/* 显示所有用户创建的角色按钮 */}
          {characters.map((char) => (
            <TouchableOpacity
              key={char.id}
              style={[styles.filterOption, selectedFilter === char.id && styles.filterSelected]}
              onPress={() => setSelectedFilter(char.id)}
            >
              <Text style={[styles.filterText, selectedFilter === char.id && styles.filterTextSelected]}>
                {char.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={selectedFilter === 'all' 
          ? posts 
          : posts.filter(post => post.characterId === selectedFilter)
        }
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={loadPosts}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: spacing.pagePadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: 15,
    color: colors.text.primary,
    textAlign: 'center',
    letterSpacing: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.pagePadding,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  filterOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  filterSelected: {
    backgroundColor: colors.accent.primary,
    borderColor: colors.accent.primary,
  },
  filterText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  filterTextSelected: {
    color: colors.text.inverse,
  },
  listContent: {
    paddingHorizontal: spacing.pagePadding,
    paddingBottom: spacing.xl,
  },
  postCard: {
    marginBottom: spacing.md,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.card,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    padding: spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  postMeta: {
    flex: 1,
  },
  postName: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
  },
  postLocation: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
  },
  postImage: {
    width: '100%',
    height: 220,
    borderRadius: borderRadius.card,
    marginBottom: spacing.sm,
  },
  postText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  postActions: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
  },
  actionButton: {
    paddingVertical: spacing.xs,
  },
  actionText: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
  },
  likedText: {
    color: colors.accent.primary,
  },
});
