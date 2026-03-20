import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';

const { width, height } = Dimensions.get('window');

const ConversationScreen = ({ navigation, route }) => {
  // 安全地获取参数，防止undefined错误
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

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.residentInfo}>
          <Text style={styles.residentName}>{resident.name}</Text>
          <Text style={styles.status}>在线</Text>
        </View>
        
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        ref={ref => {
          if (ref) {
            setTimeout(() => ref.scrollToEnd({ animated: true }), 100);
          }
        }}
      >
        {messages.map((message) => (
          <View 
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userBubble : styles.residentBubble
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
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="输入消息..."
            placeholderTextColor="#adb3b0"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendIcon}>↑</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.suggestions}>
          <TouchableOpacity style={styles.suggestionButton}>
            <Text style={styles.suggestionText}>介绍一下你自己</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionButton}>
            <Text style={styles.suggestionText}>你有什么记忆？</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f4f2',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 20,
    color: '#5f5e5e',
  },
  residentInfo: {
    alignItems: 'center',
  },
  residentName: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3432',
    marginBottom: 2,
  },
  status: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#767c79',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 20,
    color: '#5f5e5e',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    marginBottom: 16,
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#5f5e5e',
    borderBottomRightRadius: 4,
  },
  residentBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f2f4f2',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#faf7f6',
  },
  residentMessageText: {
    color: '#2d3432',
  },
  timestamp: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#adb3b0',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f2f4f2',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f2f4f2',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#2d3432',
    maxHeight: 100,
    padding: 0,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#5f5e5e',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendIcon: {
    fontSize: 16,
    color: '#faf7f6',
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionButton: {
    backgroundColor: '#e5e9e6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  suggestionText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#51616e',
  },
});

export default ConversationScreen;