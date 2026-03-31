import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Avatar, MessageBubble } from '../../components/ui';
import { useCharacterStore, useChatStore } from '../../stores';
import { api } from '../../services/api';
import type { RootStackParamList, Message } from '../../types';

type ChatRouteProp = RouteProp<RootStackParamList, 'CharacterChat'>;
type ChatNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ChatScreen: React.FC = () => {
  const navigation = useNavigation<ChatNavigationProp>();
  const route = useRoute<ChatRouteProp>();
  const { characters } = useCharacterStore();
  const { messages, appendMessage } = useChatStore();
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  
  // 从路由参数获取角色ID
  const characterId = route.params?.characterId;
  // 根据角色ID查找角色
  const character = characters.find(c => c.id === characterId);

  const characterMessages = character ? messages[character.id] || [] : [];

  useEffect(() => {
    const loadMessages = async () => {
      if (character) {
        const data = await api.messages.getList(character.id);
        data.forEach(msg => appendMessage(character.id, msg));
      }
    };
    loadMessages();
  }, [character?.id]);

  const handleSend = async () => {
    if (!inputText.trim() || !character) return;

    setInputText('');
    setSending(true);

    try {
      const sentMessage = await api.messages.send(character.id, inputText.trim());
      appendMessage(character.id, sentMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleInputPress = () => {
    if (!character) return;
    
    if (character.isAbandoned) {
      Alert.alert(
        '发送消息即表示回来',
        '发送消息即表示回来，倒计时解除',
        [
          { text: '取消', style: 'cancel' },
          { text: '继续发送', onPress: () => { /* 可以在这里处理取消放弃的逻辑 */ } }
        ]
      );
    }
  };

  const getStatusText = () => {
    if (!character) return '';
    return character.currentBehaviorDescription || '在线';
  };

  const getLocationText = () => {
    if (!character) return '';
    const location = character.currentLocation;
    return `${location.city} · ${new Date(location.localTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerInfo}
            onPress={() => navigation.navigate('CharacterStatus', { characterId: character?.id || '' })}
          >
            <View style={[
              styles.avatarContainer,
              character?.isAbandoned && styles.avatarAbandoned,
              character?.isLost && styles.avatarLost
            ]}>
              <Avatar name={character?.name || '?'} size={36} style={character?.isLost && styles.avatarGrayscale} />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerName}>{character?.name || ''}</Text>
              <Text style={styles.headerStatus}>{getStatusText()}</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.headerLocation}>{getLocationText()}</Text>
        </View>

        <View style={styles.messageContainer}>
          <FlatList
            ref={flatListRef}
            data={characterMessages}
            renderItem={({ item }) => <MessageBubble message={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          />
          {character?.isLost && (
            <View style={styles.messageGradientMask} />
          )}
        </View>

        {!character?.isLost ? (
          <View style={styles.inputContainer}>
            <TouchableOpacity 
              style={styles.inputWrapper}
              onPress={handleInputPress}
              disabled={!character?.isAbandoned}
            >
              <TextInput
                style={styles.input}
                placeholder={character?.isAbandoned ? "发一条消息，就是你回来了" : "..."}
                placeholderTextColor={colors.text.tertiary}
                value={character?.isAbandoned ? "" : inputText}
                onChangeText={character?.isAbandoned ? undefined : setInputText}
                multiline
                maxLength={500}
                editable={!character?.isAbandoned}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.sendButton, 
                ((!inputText.trim() || sending) || character?.isAbandoned) && styles.sendButtonDisabled
              ]}
              onPress={handleSend}
              disabled={(!inputText.trim() || sending) || character?.isAbandoned}
            >
              <Text style={styles.sendIcon}>▶</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.lostMessageContainer}>
            <Text style={styles.lostMessage}>
              {character?.name}已失踪于 {new Date().toLocaleDateString('zh-CN')}
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.pagePadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  backButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 20,
    color: colors.text.secondary,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
    fontWeight: '500',
  },
  headerStatus: {
    fontSize: typography.small.fontSize,
    color: colors.text.secondary,
  },
  headerLocation: {
    fontSize: typography.small.fontSize,
    color: colors.text.tertiary,
    textAlign: 'right',
  },
  avatarContainer: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  avatarAbandoned: {
    borderWidth: 2,
    borderColor: '#9E4A3A',
    opacity: 0.75,
  },
  avatarLost: {
    borderWidth: 2,
    borderColor: '#C4B5A5',
    opacity: 0.35,
  },
  avatarGrayscale: {
    opacity: 0.35,
  },
  messageContainer: {
    flex: 1,
    position: 'relative',
  },
  messageList: {
    paddingVertical: spacing.md,
  },
  messageGradientMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: colors.background.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.pagePadding,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
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
  lostMessageContainer: {
    paddingHorizontal: spacing.pagePadding,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
    alignItems: 'center',
  },
  lostMessage: {
    fontSize: typography.body.fontSize,
    color: colors.text.secondary,
  },
});
