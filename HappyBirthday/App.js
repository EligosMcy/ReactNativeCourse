import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

export default function App() {
  const [opened, setOpened] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const CARD_COUNT = 64;
  const wishes = useMemo(
    () => [
      '生日快乐',
      '天天开心',
      '心想事成',
      '万事顺意',
      '平安喜乐',
      '好运连连',
      '永远年轻',
      '笑口常开',
      '幸福满满',
      '愿你闪耀',
      '愿你被爱',
      '愿你如愿',
      '热爱生活',
      '不止今天',
      '快乐加倍',
      '有梦可追',
      '一路生花',
      '所愿皆成',
      '甜度爆表',
      '未来可期',
      '好事发生',
      '岁岁欢愉',
      '平安顺遂',
      '万事胜意',
    ],
    []
  );

  const heartWidth = Math.min(screenWidth - 40, 360);
  const heartHeight = Math.min(screenHeight * 0.55, heartWidth * 0.95);
  const heartOriginX = (screenWidth - heartWidth) / 2;
  const heartOriginY = (screenHeight - heartHeight) / 2 + (opened ? 120 : 0);

  const cardTargets = useMemo(() => {
    const targets = [];
    const sx = heartWidth / 34;
    const sy = heartHeight / 34;
    const cx = heartWidth / 2;
    const cy = heartHeight / 2;

    for (let i = 0; i < CARD_COUNT; i += 1) {
      const t = (i / CARD_COUNT) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      targets.push({ x: cx + x * sx, y: cy - y * sy });
    }

    return targets;
  }, [CARD_COUNT, heartHeight, heartWidth]);

  const cardTranslateX = useRef(
    Array.from({ length: CARD_COUNT }, () => new Animated.Value(0))
  ).current;
  const cardOpacity = useRef(
    Array.from({ length: CARD_COUNT }, () => new Animated.Value(0))
  ).current;
  const cardScale = useRef(
    Array.from({ length: CARD_COUNT }, () => new Animated.Value(1))
  ).current;
  const mainCardTranslateY = useRef(new Animated.Value(0)).current;
  const mainCardScale = useRef(new Animated.Value(1)).current;

  const getCardColor = (i) => {
    const lightness = 78 + ((i * 7) % 10);
    const hue = 330 + ((i * 11) % 16);
    return `hsl(${hue}, 92%, ${lightness}%)`;
  };

  const onReset = () => {
    for (let i = 0; i < CARD_COUNT; i += 1) {
      cardTranslateX[i].stopAnimation();
      cardOpacity[i].stopAnimation();
      cardScale[i].stopAnimation();
      cardTranslateX[i].setValue(0);
      cardOpacity[i].setValue(0);
      cardScale[i].setValue(1);
    }
    mainCardTranslateY.stopAnimation();
    mainCardScale.stopAnimation();
    mainCardTranslateY.setValue(0);
    mainCardScale.setValue(1);
    setShowHeart(false);
    setOpened(false);
  };

  const onConfirm = () => {
    if (opened) return;
    setOpened(true);
    setShowHeart(true);

    Animated.parallel([
      Animated.timing(mainCardTranslateY, {
        toValue: -170,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(mainCardScale, {
        toValue: 0.78,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    const fromDistance = screenWidth + 40;
    const animations = [];

    for (let i = 0; i < CARD_COUNT; i += 1) {
      const fromLeft = i % 2 === 0;
      cardTranslateX[i].setValue(fromLeft ? -fromDistance : fromDistance);
      cardOpacity[i].setValue(0);
      cardScale[i].setValue(0.96);

      animations.push(
        Animated.parallel([
          Animated.timing(cardTranslateX[i], {
            toValue: 0,
            duration: 720,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(cardOpacity[i], {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.spring(cardScale[i], {
            toValue: 1,
            speed: 14,
            bounciness: 6,
            useNativeDriver: true,
          }),
        ])
      );
    }

    Animated.stagger(45, animations).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              { translateY: mainCardTranslateY },
              { scale: mainCardScale },
            ],
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.titleRow}>
            <Text style={styles.cakeIcon}>🎂</Text>
            <Text style={styles.title}>生日快乐</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.bodyContent}>
            <Text style={styles.message}>
              {opened ? '祝福正在送达…' : '你有一份生日礼物，确定要打开吗？'}
            </Text>
            <Pressable
              onPress={onConfirm}
              disabled={opened}
              style={({ pressed }) => [
                styles.button,
                pressed && !opened ? styles.buttonPressed : null,
                opened ? styles.buttonDisabled : null,
              ]}
            >
              <Text style={styles.buttonText}>{opened ? '已打开' : '确定'}</Text>
            </Pressable>
            {opened ? (
              <Pressable
                onPress={onReset}
                style={({ pressed }) => [
                  styles.resetButton,
                  pressed ? styles.resetButtonPressed : null,
                ]}
              >
                <Text style={styles.resetButtonText}>重置</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </Animated.View>
      {showHeart ? (
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.heartOverlay]}>
          <View
            style={[
              styles.heartLayer,
              {
                left: heartOriginX,
                top: heartOriginY,
                width: heartWidth,
                height: heartHeight,
              },
            ]}
          >
            {cardTargets.map((p, i) => {
              const cardW = 74;
              const cardH = 28;
              const rotate = `${((i % 9) - 4) * 1.2}deg`;
              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.miniCard,
                    {
                      left: p.x - cardW / 2,
                      top: p.y - cardH / 2,
                      width: cardW,
                      height: cardH,
                      backgroundColor: getCardColor(i),
                    },
                    {
                      opacity: cardOpacity[i],
                      transform: [
                        { translateX: cardTranslateX[i] },
                        { scale: cardScale[i] },
                        { rotate },
                      ],
                    },
                  ]}
                >
                  <Text numberOfLines={1} style={styles.miniCardText}>
                    {wishes[i % wishes.length]}
                  </Text>
                </Animated.View>
              );
            })}
          </View>
        </View>
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4F2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  card: {
    width: '84%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    height: 300,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardHeader: {
    flex: 1,
    backgroundColor: '#FF4D8D',
    paddingHorizontal: 18,
    paddingVertical: 16,
    justifyContent: 'flex-start',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cakeIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'left',
  },
  cardBody: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  bodyContent: {
    width: '100%',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 18,
  },
  button: {
    width: '100%',
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: '#FF62A8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF4D8D',
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FF87BC',
  },
  buttonPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  buttonDisabled: {
    backgroundColor: '#F9A8D4',
    borderColor: '#F9A8D4',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  resetButton: {
    width: '100%',
    height: 40,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 77, 141, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 141, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonPressed: {
    opacity: 0.9,
  },
  resetButtonText: {
    color: '#FF4D8D',
    fontSize: 14,
    fontWeight: '700',
  },
  heartOverlay: {
    zIndex: 50,
    elevation: 50,
  },
  heartLayer: {
    position: 'absolute',
  },
  miniCard: {
    position: 'absolute',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 141, 0.35)',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  miniCardText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7A0038',
    paddingHorizontal: 6,
  },
});
