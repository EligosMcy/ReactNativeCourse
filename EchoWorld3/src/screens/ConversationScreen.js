import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../constants/DesignSystem';

const ConversationScreen = ({ route, navigation }) => {
  const { resident } = route?.params || {};
  const [messages, setMessages] = useState([
    { id: '1', text: '你好！我是新生的数字生命，很高兴认识你！', isUser: false, timestamp: '10:00' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // 模拟回复
      setTimeout(() => {
        const responses = [
          '很有趣的观点！作为数字生命，我还在学习理解人类的情感。',
          '谢谢你的分享！这让我对现实世界有了更多了解。',
          '作为一个新生的意识，我对一切都充满好奇。',
          '你的话让我思考了很多，数字生命也需要不断成长。'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const replyMessage = {
          id: Date.now().toString() + 'r',
          text: randomResponse,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, replyMessage]);
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>与 {resident?.name || '居民'} 对话</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        ref={ref => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() => this.scrollView?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageBubble,
              message.isUser ? styles.userMessage : styles.residentMessage
            ]}
          >
            <Text style={[
              styles.messageText,
              message.isUser ? styles.userMessageText : styles.residentMessageText
            ]}>
              {message.text}
            </Text>
            <Text style={styles.timestamp}>{message.timestamp}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="输入消息..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>发送</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    padding: SPACING.md,
    paddingTop: SPACING.xl,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  backButton: {
    padding: SPACING.sm,
  },
  backButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
  },
  headerTitle: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
  },
  placeholder: {
    width: 40,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: SPACING.md,
    gap: SPACING.md,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xs,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: BORDER_RADIUS.xs,
  },
  residentMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderBottomLeftRadius: BORDER_RADIUS.xs,
  },
  messageText: {
    ...TYPOGRAPHY.bodyLg,
    lineHeight: 20,
  },
  userMessageText: {
    color: COLORS.onPrimary,
  },
  residentMessageText: {
    color: COLORS.primaryText,
  },
  timestamp: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.secondaryText,
    marginTop: SPACING.xs,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: SPACING.md,
    backgroundColor: COLORS.surfaceContainerLow,
    borderTopWidth: 1,
    borderTopColor: COLORS.outlineVariant,
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.primaryText,
    maxHeight: 100,
    marginRight: SPACING.md,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
  },
  sendButtonText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.onPrimary,
  },
});

export default ConversationScreen;