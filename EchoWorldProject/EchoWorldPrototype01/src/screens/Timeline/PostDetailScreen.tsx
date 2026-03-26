import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Avatar, Button } from '../../components/ui';
import { mockApi } from '../../services/mockApi';
import type { RootStackParamList, TimelinePost } from '../../types';

type PostDetailNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PostDetailRouteParams {
  postId: string;
}

export const PostDetailScreen: React.FC = () => {
  const navigation = useNavigation<PostDetailNavigationProp>();
  const route = useRoute();
  const { postId } = route.params as PostDetailRouteParams;
  
  const [post, setPost] = useState<TimelinePost | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<{ id: string; text: string; characterName: string; timestamp: string; isPlayer: boolean }[]>([]);

  useEffect(() => {
    loadPost();
    loadComments();
  }, [postId]);

  const loadPost = async () => {
    try {
      const foundPost = await mockApi.timeline.getPostById(postId);
      if (foundPost) {
        setPost(foundPost);
      }
    } catch (error) {
      console.error('Failed to load post:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      // 模拟评论数据
      const mockComments = [
        {
          id: 'comment-1',
          text: '这张照片拍得真好看！很有艺术感。',
          characterName: '王芳',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          isPlayer: false,
        },
        {
          id: 'comment-2',
          text: '好想去这个地方看看，感觉很宁静。',
          characterName: '李明',
          timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          isPlayer: false,
        },
      ];
      setComments(mockComments);
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  };

  const handleLike = async () => {
    if (!post) return;
    
    try {
      if (post.isLikedByPlayer) {
        await mockApi.timeline.unlike(post.id);
      } else {
        await mockApi.timeline.like(post.id);
      }
      setPost({
        ...post,
        isLikedByPlayer: !post.isLikedByPlayer,
        likeCount: post.isLikedByPlayer ? post.likeCount - 1 : post.likeCount + 1,
      });
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleSendComment = async () => {
    if (!commentText.trim()) return;
    
    try {
      const newComment = {
        id: `comment-${Date.now()}`,
        text: commentText,
        characterName: '我',
        timestamp: new Date().toISOString(),
        isPlayer: true,
      };
      setComments([...comments, newComment]);
      setCommentText('');
      
      if (post) {
        setPost({
          ...post,
          replyCount: post.replyCount + 1,
        });
      }
    } catch (error) {
      console.error('Failed to send comment:', error);
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

  if (loading || !post) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>帖子</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Post Content */}
          <View style={styles.postContainer}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('CharacterStatus', { characterId: post.characterId })}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Avatar name={post.characterName} size={36} />
            </TouchableOpacity>
            <View style={styles.postMeta}>
              <Text style={styles.characterName}>{post.characterName}</Text>
              <Text style={styles.postLocation}>
                {post.locationLabel} · {formatTime(post.publishedAt)}
              </Text>
            </View>

            {post.contentType === 'image' && post.imageUrl && (
              <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            )}

            <Text style={styles.postText}>{post.text}</Text>

            {/* Actions */}
            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleLike}
              >
                <Text style={[styles.actionText, post.isLikedByPlayer && styles.likedText]}>
                  {post.isLikedByPlayer ? '♥' : '♡'} {post.likeCount}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>💬 {post.replyCount}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Comments Section */}
          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>回复</Text>
            
            {comments.map((comment) => (
              <View key={comment.id} style={[styles.commentContainer, comment.isPlayer ? styles.playerCommentContainer : styles.characterCommentContainer]}>
                {!comment.isPlayer && (
                  <Avatar name={comment.characterName} size={32} />
                )}
                <View style={[styles.commentBubble, comment.isPlayer ? styles.playerCommentBubble : styles.characterCommentBubble]}>
                  {!comment.isPlayer && (
                    <Text style={styles.commentName}>{comment.characterName}</Text>
                  )}
                  <Text style={[styles.commentText, comment.isPlayer && styles.playerCommentText]}>
                    {comment.text}
                  </Text>
                  <Text style={styles.commentTime}>{formatTime(comment.timestamp)}</Text>
                </View>
                {comment.isPlayer && (
                  <Avatar name={comment.characterName} size={32} />
                )}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Comment Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="写下你的回复..."
              placeholderTextColor={colors.text.tertiary}
              value={commentText}
              onChangeText={setCommentText}
              multiline
              maxLength={200}
            />
          </View>
          <TouchableOpacity 
            style={[styles.sendButton, !commentText.trim() && styles.sendButtonDisabled]}
            onPress={handleSendComment}
            disabled={!commentText.trim()}
          >
            <Text style={styles.sendIcon}>▶</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: typography.body.fontSize,
    color: colors.text.secondary,
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
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: typography.sectionTitle.fontSize,
    color: colors.text.primary,
    fontWeight: '500',
  },
  placeholder: {
    width: 56,
  },
  postContainer: {
    paddingHorizontal: spacing.pagePadding,
    paddingVertical: spacing.lg,
  },
  postMeta: {
    flex: 1,
    marginTop: spacing.md,
  },
  characterName: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
  },
  postLocation: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  postText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  postImage: {
    width: '100%',
    height: 220,
    borderRadius: borderRadius.card,
    marginTop: spacing.md,
  },
  postActions: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingTop: spacing.sm,
    marginTop: spacing.sm,
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
  divider: {
    height: 1,
    backgroundColor: colors.border.subtle,
    marginHorizontal: spacing.pagePadding,
  },
  commentsSection: {
    paddingHorizontal: spacing.pagePadding,
    paddingTop: spacing.lg,
  },
  commentsTitle: {
    fontSize: typography.sectionTitle.fontSize,
    color: colors.text.primary,
    fontWeight: '500',
    marginBottom: spacing.md,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  characterCommentContainer: {
    justifyContent: 'flex-start',
  },
  playerCommentContainer: {
    justifyContent: 'flex-end',
  },
  commentBubble: {
    maxWidth: '70%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.bubble,
    marginHorizontal: spacing.sm,
  },
  characterCommentBubble: {
    backgroundColor: colors.message.character,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  playerCommentBubble: {
    backgroundColor: colors.message.player,
  },
  commentName: {
    fontSize: typography.caption.fontSize,
    color: colors.text.primary,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  commentText: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
    lineHeight: 20,
  },
  playerCommentText: {
    color: colors.text.inverse,
  },
  commentTime: {
    fontSize: typography.caption.fontSize,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.pagePadding,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
    backgroundColor: colors.background.primary,
    gap: spacing.sm,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border.default,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 44,
    maxHeight: 100,
  },
  input: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
    maxHeight: 80,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  sendIcon: {
    fontSize: 14,
    color: colors.text.inverse,
  },
});