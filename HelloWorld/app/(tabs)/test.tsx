import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function TestScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">测试界面</ThemedText>
      <ThemedText>这是一个空白的测试界面。</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
