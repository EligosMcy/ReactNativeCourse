import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Avatar, MessageBubble } from '../../components/ui';
import { useCharacterStore, useChatStore } from '../../stores';
import { mockApi } from '../../services/mockApi';
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
        const data = await mockApi.messages.getList(character.id);
        data.forEach(msg => appendMessage(character.id, msg));
      }
    };
    loadMessages();
  }, [character?.id]);

  const handleSend = async () => {
    if (!inputText.trim() || !character) return;

    const tempMessage: Message = {
      id: 'temp-' + Date.now(),
      characterId: character.id,
      sender: 'player',
      content: inputText.trim(),
      timestamp: new Date().toISOString(),
      status: 'sending',
    };
    appendMessage(character.id, tempMessage);
    setInputText('');
    setSending(true);

    try {
      const sentMessage = await mockApi.messages.send(character.id, inputText.trim());
      appendMessage(character.id, sentMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const getStatusText = () => {
    if (!character) return '';
    const location = character.currentLocation;
    return `${location.landmarkName} · ${location.city} ${new Date(location.localTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
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
            <Avatar name={character?.name || '?'} size={36} />
            <View style={styles.headerText}>
              <Text style={styles.headerName}>{character?.name || ''}</Text>
              <Text style={styles.headerStatus}>{getStatusText()}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={characterMessages}
          renderItem={({ item }) => <MessageBubble message={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        />

        <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="..."
            placeholderTextColor={colors.text.tertiary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
        </View>
        <TouchableOpacity 
          style={[styles.sendButton, (!inputText.trim() || sending) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim() || sending}
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
    color: colors.text.tertiary,
  },
  messageList: {
    paddingVertical: spacing.md,
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
});
