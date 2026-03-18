import { StyleSheet, Text, View, StatusBar, TextInput, Switch } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';


export default function App() {

  const [name, setName] = useState('');
  const [multilineName, setMultilineName] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  // 根据文字长度获取动态颜色
  const getDynamicColor = (text) => {
    const length = text.length;
    if (length === 0) return '#1976d2'; // 默认蓝色
    if (length <= 5) return '#4caf50';  // 短文本：绿色
    if (length <= 10) return '#ff9800'; // 中等文本：橙色
    return '#f44336';                  // 长文本：红色
  };

  // 根据文字长度获取动态样式
  const getDynamicTextStyle = (text) => ({
    fontSize: 16 + Math.min(text.length * 0.5, 10), // 字体大小随长度增加
    fontWeight: text.length > 0 ? 'bold' : 'normal', // 有内容时加粗
    color: getDynamicColor(text),
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            {/* 单行输入框 */}
            <TextInput
              style={[styles.input, { borderColor: getDynamicColor(name) }]}
              value={name}
              onChangeText={setName}
              placeholder="请输入单行内容"
              placeholderTextColor="#999"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="done"
              clearButtonMode="while-editing"
            />

            {/* 动态显示单行输入内容 */}
            <View style={styles.textContainer}>
              <Text style={styles.label}>单行输入:</Text>
              <Text style={[styles.dynamicText, getDynamicTextStyle(name)]}>
                {name || "（空）"}
              </Text>
              <Text style={styles.lengthInfo}>
                长度: {name.length} 字符
                {name.length > 0 && ` (${getColorDescription(name.length)})`}
              </Text>
            </View>

            {/* 多行输入框 */}
            <TextInput
              style={[styles.multilineInput, { borderColor: getDynamicColor(multilineName) }]}
              value={multilineName}
              onChangeText={setMultilineName}
              placeholder="请输入多行内容"
              placeholderTextColor="#999"
              multiline={true}
              numberOfLines={4}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="done"
              clearButtonMode="while-editing"
            />

            {/* 动态显示多行输入内容 */}
            <View style={styles.textContainer}>
              <Text style={styles.label}>多行输入:</Text>
              <Text style={[styles.dynamicText, getDynamicTextStyle(multilineName)]}>
                {multilineName || "（空）"}
              </Text>
              <Text style={styles.lengthInfo}>
                长度: {multilineName.length} 字符
                {multilineName.length > 0 && ` (${getColorDescription(multilineName.length)})`}
              </Text>
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.label}>开关:</Text>
              <Switch
                value={isEnabled}
                onValueChange={setIsEnabled}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            </View>

          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// 获取颜色描述
const getColorDescription = (length) => {
  if (length <= 5) return "短文本";
  if (length <= 10) return "中等文本";
  return "长文本";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '80%',
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    color: '#1976d2',
    backgroundColor: '#ffffff',
  },
  multilineInput: {
    height: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    color: '#1976d2',
    textAlignVertical: 'top',
    backgroundColor: '#ffffff',
  },
  textContainer: {
    marginVertical: 15,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dynamicText: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
  lengthInfo: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
});
