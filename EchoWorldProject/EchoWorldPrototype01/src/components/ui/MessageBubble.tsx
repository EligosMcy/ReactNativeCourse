import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, typography } from '../../theme';
import type { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isPlayer = message.sender === 'player';
  const showStatus = isPlayer;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / 3600000;
    
    if (diffHours < 1) return '刚刚';
    if (diffHours < 24) return `${Math.floor(diffHours)}小时前`;
    return `${Math.floor(diffHours / 24)}天前`;
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending': return '○';
      case 'sent': return '✓';
      case 'read': return '✓✓';
      case 'failed': return '!';
      default: return '';
    }
  };

  const getStatusColor = () => {
    switch (message.status) {
      case 'read': return colors.accent.primary;
      case 'failed': return colors.accent.danger;
      default: return colors.text.tertiary;
    }
  };

  return (
    <View style={[styles.container, isPlayer ? styles.playerContainer : styles.characterContainer]}>
      <View style={[styles.bubble, isPlayer ? styles.playerBubble : styles.characterBubble]}>
        <Text style={[styles.content, isPlayer && styles.playerContent]}>
          {message.content}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.time}>{formatTime(message.timestamp)}</Text>
          {showStatus && (
            <Text style={[styles.status, { color: getStatusColor() }]}>
              {getStatusIcon()}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
    paddingHorizontal: spacing.pagePadding,
  },
  playerContainer: {
    alignItems: 'flex-end',
  },
  characterContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.bubble,
  },
  playerBubble: {
    backgroundColor: colors.message.player,
  },
  characterBubble: {
    backgroundColor: colors.message.character,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  content: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
    lineHeight: 22,
  },
  playerContent: {
    color: colors.text.inverse,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  time: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
  },
  status: {
    fontSize: typography.small.fontSize,
  },
});
