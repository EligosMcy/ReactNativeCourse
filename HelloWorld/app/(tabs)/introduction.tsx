import { StyleSheet, Image, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function IntroductionScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E1F5FE', dark: '#01579B' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#2196F3"
          name="info.circle.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">技术栈介绍</ThemedText>
      </ThemedView>
      
      <ThemedText>本项目主要使用了以下核心技术构建：</ThemedText>

      {/* React Native Card */}
      <View style={[styles.card, styles.reactCard]}>
        <View style={styles.cardHeader}>
             <Image source={require('@/assets/images/react-logo.png')} style={styles.logo} />
             <ThemedText type="subtitle">React Native</ThemedText>
        </View>
        <ThemedText style={styles.cardContent}>
          React Native 是一个使用 React 构建原生应用程序的框架。它允许开发者使用 JavaScript 和 React 来构建 iOS 和 Android 应用程序。
        </ThemedText>
        <View style={styles.featureList}>
            <ThemedText style={styles.featureItem}>• 跨平台：一次编写，多端运行</ThemedText>
            <ThemedText style={styles.featureItem}>• 原生性能：渲染为原生组件</ThemedText>
            <ThemedText style={styles.featureItem}>• 热更新：快速迭代开发</ThemedText>
        </View>
      </View>

      {/* Node.js Card */}
      <View style={[styles.card, styles.nodeCard]}>
         <View style={styles.cardHeader}>
             <IconSymbol name="chevron.left.forwardslash.chevron.right" size={32} color="#68a063" /> 
             <ThemedText type="subtitle" style={{marginLeft: 12}}>Node.js</ThemedText>
        </View>
        <ThemedText style={styles.cardContent}>
          Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时。它允许开发者在服务器端运行 JavaScript 代码。
        </ThemedText>
        <View style={styles.featureList}>
            <ThemedText style={styles.featureItem}>• 事件驱动：非阻塞 I/O 模型</ThemedText>
            <ThemedText style={styles.featureItem}>• 轻量高效：适合数据密集型实时应用</ThemedText>
            <ThemedText style={styles.featureItem}>• 生态丰富：拥有庞大的 npm 包管理器</ThemedText>
        </View>
      </View>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#2196F3',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reactCard: {
    backgroundColor: 'rgba(97, 218, 251, 0.15)', // Light React Blue background
    borderColor: 'rgba(97, 218, 251, 0.5)',
  },
  nodeCard: {
    backgroundColor: 'rgba(104, 160, 99, 0.15)', // Light Node Green background
    borderColor: 'rgba(104, 160, 99, 0.5)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingBottom: 8,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  cardContent: {
      lineHeight: 24,
      marginBottom: 12,
  },
  featureList: {
      gap: 4,
  },
  featureItem: {
      fontSize: 14,
      opacity: 0.8,
  }
});
