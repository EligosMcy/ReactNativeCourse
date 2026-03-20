import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const ConversationScreen = ({ navigation, route }) => {
  const { character = 'Aurelius_01' } = route.params || {};
  const [messages, setMessages] = useState([
    { id: 1, text: '欢迎来到ECHOWORLD。我是Aurelius_01，您的数字伴侣。', sender: 'character', time: '14:30' },
    { id: 2, text: '今天您想探索哪个场景？或者有什么想要分享的感受？', sender: 'character', time: '14:31' },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        text: getCharacterResponse(inputText),
        sender: 'character',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const getCharacterResponse = (userInput) => {
    const responses = [
      '这是一个有趣的思考。在数字空间中，我们如何定义真实？',
      '我感受到您的好奇心。让我们继续探索这个主题。',
      '每个回声都承载着独特的意义。您觉得呢？',
      '在ECHOWORLD中，情感和思想可以自由流动。',
      '您的问题让我想起了记忆回廊中的某个片段。',
      '让我们深入探讨这个想法，看看它会带我们去哪里。',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.characterName}>{character}</Text>
        <View style={styles.statusIndicator}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>在线</Text>
        </View>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userMessage : styles.characterMessage
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.messageTime}>{message.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="输入您的消息..."
          placeholderTextColor="#adb3b0"
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>发送</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(222, 228, 224, 0.5)',
  },
  backButton: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#51616e',
  },
  characterName: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3432',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A8C3B8',
  },
  statusText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#767c79',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  messagesContent: {
    paddingVertical: 20,
    gap: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#5f5e5e',
    borderBottomRightRadius: 4,
  },
  characterMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f2f4f2',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  userMessageText: {
    color: '#faf7f6',
  },
  characterMessageText: {
    color: '#2d3432',
  },
  messageTime: {
    fontFamily: 'Inter',
    fontSize: 10,
    opacity: 0.6,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(222, 228, 224, 0.5)',
    backgroundColor: '#f9f9f7',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f2f4f2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 100,
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#2d3432',
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: '#5f5e5e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  sendButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#faf7f6',
    fontWeight: '600',
  },
});

export default ConversationScreen;