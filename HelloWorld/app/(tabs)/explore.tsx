import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F0F4C3', dark: '#558B2F' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#8BC34A"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          探索
        </ThemedText>
      </ThemedView>
      <ThemedText>此应用包含帮助您入门的示例代码。</ThemedText>
      <Collapsible title="基于文件的路由">
        <ThemedText>
          此应用有两个屏幕：{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> 和{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          布局文件位于 <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          设置了标签导航器。
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">了解更多</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS 和 Web 支持">
        <ThemedText>
          您可以在 Android, iOS 和 Web 上打开此项目。要打开 Web 版本，请按{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> 在运行此项目的终端中。
        </ThemedText>
      </Collapsible>
      <Collapsible title="图片">
        <ThemedText>
          对于静态图片，您可以使用 <ThemedText type="defaultSemiBold">@2x</ThemedText> 和{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> 后缀来为不同的屏幕密度提供文件
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">了解更多</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="亮色和暗色模式组件">
        <ThemedText>
          此模板支持亮色和暗色模式。{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook 允许您检查用户当前的颜色方案，以便相应地调整 UI 颜色。
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">了解更多</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="动画">
        <ThemedText>
          此模板包含一个动画组件的示例。{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> 组件使用了强大的{' '}
          <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
            react-native-reanimated
          </ThemedText>{' '}
          库来创建挥手动画。
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              组件为标题图片提供了视差效果。
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#8BC34A',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
