import { StyleSheet, Text, View, TextInput, Button, Switch, Platform, Image, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.formContainer}> */}
        <KeyboardAvoidingView behavior='padding' style={styles.formContainer}>
          <Image style={styles.logo} source={require('./assets/icon.png')} />
          <Text style={styles.label}>用户名:</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="请输入用户名"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>密码:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="请输入密码"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
          <Button style={styles.button} title="登录" onPress={() => alert('登录按钮被点击了')} />
          <Button style={styles.button} title="注册" onPress={() => alert('注册按钮被点击了')} />
          <View height={20} />
        </KeyboardAvoidingView>
        {/* </View> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',  // 柔和的浅灰色背景
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingVertical: 20,
  },
  formContainer: {
    backgroundColor: '#ffffff',  // 白色表单背景
    padding: 20,
    borderRadius: 12,
    width: '85%',
    borderWidth: 1,
    borderColor: '#e1e5e9',  // 浅灰色边框
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 25,
    alignSelf: 'center',
    borderRadius: 60,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: '#2d3748',  // 深灰色文字
  },
  input: {
    height: 48,
    borderColor: '#cbd5e0',  // 浅灰色边框
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f7fafc',  // 浅灰色背景
    fontSize: 16,
    color: '#2d3748',  // 深灰色文字
  },
  button: {
    height: 48,
    backgroundColor: '#3182ce',  // 蓝色按钮
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 12,
  },
});
