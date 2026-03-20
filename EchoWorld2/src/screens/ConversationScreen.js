import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, DESIGN_PRINCIPLES } from '../constants/DesignSystem';

const { width, height } = Dimensions.get('window');

const ConversationScreen = ({ navigation, route }) => {
  // 安全地获取参数
  const params = route?.params || {};
  const resident = params.resident || {
    id: '1',
    name: '古旧相机',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3mgMlPVaF5OmXib751QZW5rf5MwLmBnFY9A4pmcJm_JjgfoAHLsetNelFpdmGknDBN90d8T_1E0QA0VmrvMdGyVmgrrwkiHAQJ_u82LmMmZP9qgW5-UWQp_xGx0GbSeWK8EaN8j6nipECWcDyGpecE_gD-FD7j_-MnvyYqUFXtYYOdp5lDJjxcfMEqOouqFNn5Uy_lGo4ODwCV7nk6S1VzKE3VCyavC08shZ3JDEZ500jG11wWEcKvd5ZAhrWa-uBZTndlLzT9_g'
  };

  const [messages, setMessages] = useState([
    {
      id: '1',
      text: '你好，我是古旧相机。很高兴能与你对话。',
      sender: 'resident',
      timestamp: '10:30'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  // 自动滚动到底部
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // 模拟居民回复
      setTimeout(() => {
        const residentReply = {
          id: Date.now().toString() + 'r',
          text: '这是一个很有趣的问题。作为一台相机，我见证了无数个重要时刻。',
          sender: 'resident',
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, residentReply]);
      }, 1000);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputText(question);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // 快捷问题建议
  const quickQuestions = [
    '你最喜欢记录什么样的时刻？',
    '你印象最深刻的记忆是什么？',
    '你觉得时间对你来说意味着什么？',
    '你有什么想对我说的吗？'
  ];

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* 顶部导航 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.residentName}>{resident.name}</Text>
          <Text style={styles.statusText}>在线</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* 消息列表 */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.messagesContent}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.sender === 'user' ? styles.userMessage : styles.residentMessage
              ]}
            >
              <Text style={[
                styles.messageText,
                message.sender === 'user' ? styles.userMessageText : styles.residentMessageText
              ]}>
                {message.text}
              </Text>
              <Text style={styles.timestamp}>{message.timestamp}</Text>
            </View>
          ))}
        </View>

        {/* 快捷问题建议 */}
        {messages.length <= 2 && (
          <View style={styles.quickQuestions}>
            <Text style={styles.quickQuestionsTitle}>试试问这些问题：</Text>
            <View style={styles.questionsContainer}>
              {quickQuestions.map((question, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.questionButton}
                  onPress={() => handleQuickQuestion(question)}
                >
                  <Text style={styles.questionText}>{question}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* 输入区域 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="输入消息..."
          placeholderTextColor={COLORS.outlineVariant}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={200}
        />
        <TouchableOpacity 
          style={[styles.sendButton, !inputText && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText}
        >
          <Text style={styles.sendIcon}>↑</Text>
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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.lg,
    ...DESIGN_PRINCIPLES.glassmorphism,
  },
  backButton: {
    padding: SPACING.xs,
  },
  backIcon: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
  },
  headerInfo: {
    alignItems: 'center',
  },
  residentName: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.primaryText,
    marginBottom: 2,
  },
  statusText: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.secondaryText,
  },
  headerSpacer: {
    width: 40,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  messagesContent: {
    paddingVertical: SPACING.md,
  },
  messageBubble: {
    maxWidth: '80%',
    marginBottom: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: BORDER_RADIUS.xs,
  },
  residentMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surfaceContainerLow,
    borderBottomLeftRadius: BORDER_RADIUS.xs,
  },
  messageText: {
    ...TYPOGRAPHY.bodyMd,
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
    color: COLORS.outlineVariant,
    marginTop: SPACING.xs,
    alignSelf: 'flex-end',
  },
  quickQuestions: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  quickQuestionsTitle: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.secondaryText,
    marginBottom: SPACING.md,
  },
  questionsContainer: {
    gap: SPACING.sm,
  },
  questionButton: {
    backgroundColor: COLORS.surfaceContainerLow,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  questionText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondaryText,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    ...DESIGN_PRINCIPLES.glassmorphism,
  },
  textInput: {
    flex: 1,
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.primaryText,
    backgroundColor: COLORS.surfaceContainerLow,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    maxHeight: 100,
    marginRight: SPACING.md,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.outlineVariant,
    opacity: 0.5,
  },
  sendIcon: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
  },
});

export default ConversationScreen;