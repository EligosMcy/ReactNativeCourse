import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, BorderRadius } from '../../theme/DesignSystem';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = '请输入用户名';
    } else if (username.length< 3 || username.length >20) {
      newErrors.username = '用户名长度为3-20个字符';
    }

    if (!email.trim()) {
      newErrors.email = '请输入邮箱';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!password) {
      newErrors.password = '请输入密码';
    } else if (password.length< 8) {
      newErrors.password = '密码至少8位';
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
      newErrors.password = '密码必须包含字母和数字';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = '请确认密码';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      setLoading(true);
      
      setTimeout(() => {
        setLoading(false);
        Alert.alert(
          '注册成功',
          '欢迎加入ECHOWORLD！',
          [{ text: '确定', onPress: () =>navigation.navigate('Login') }]
        );
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>创建账号</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>用户名</Text>
            <TextInput
              style={[styles.input, errors.username && styles.inputError]}
              placeholder="请输入用户名（3-20个字符）"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (errors.username) {
                  setErrors({ ...errors, username: null });
                }
              }}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>邮箱</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="请输入邮箱地址"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) {
                  setErrors({ ...errors, email: null });
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>密码</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="请输入密码（至少8位，包含字母和数字）"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors({ ...errors, password: null });
                }
              }}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>确认密码</Text>
            <TextInput
              style={[styles.input, errors.confirmPassword && styles.inputError]}
              placeholder="请再次输入密码"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword) {
                  setErrors({ ...errors, confirmPassword: null });
                }
              }}
              secureTextEntry
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.registerButton, loading && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.registerButtonText}>
              {loading ? '注册中...' : '注册'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.surfaceContainerLow,
  },
  backButton: {
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.digitalInk,
    marginLeft: 24,
    fontFamily: Typography.serif,
    letterSpacing: Typography.titleLetterSpacing,
  },
  form: {
    padding: 32,
  },
  inputGroup: {
    marginBottom: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.onSurface,
    marginBottom: 12,
    fontFamily: Typography.sansSerif,
    letterSpacing: Typography.bodyLetterSpacing,
  },
  input: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 18,
    color: Colors.digitalInk,
    fontFamily: Typography.sansSerif,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
    borderBottomOpacity: 0.15,
  },
  inputError: {
    borderBottomColor: '#FF3B30',
    borderBottomOpacity: 1,
  },
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
    marginTop: 8,
    fontFamily: Typography.sansSerif,
  },
  registerButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: 32,
  },
  registerButtonDisabled: {
    backgroundColor: Colors.surfaceContainerHighest,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.onPrimary,
    fontFamily: Typography.sansSerif,
  },
});