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

const CARD_COUNT = 64;
const MINI_CARD_WIDTH = 74;
const MINI_CARD_HEIGHT = 28;
const WISHES = [
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
];

const getCardColor = (i) => {
  const lightness = 78 + ((i * 7) % 10);
  const hue = 330 + ((i * 11) % 16);
  return `hsl(${hue}, 92%, ${lightness}%)`;
};

export default function App() {
  const [opened, setOpened] = useState(false);
  const [resetting, setResetting] = useState(false);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

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
  }, [heartHeight, heartWidth]);

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
  const nameOpacity = useRef(new Animated.Value(0)).current;

  const onReset = () => {
    if (!opened || resetting) return;
    setResetting(true);

    const toDistance = screenWidth + 40;
    const exitAnimations = [];

    for (let i = 0; i < CARD_COUNT; i += 1) {
      cardTranslateX[i].stopAnimation();
      cardOpacity[i].stopAnimation();
      cardScale[i].stopAnimation();

      const toLeft = i % 2 === 0;
      exitAnimations.push(
        Animated.parallel([
          Animated.timing(cardTranslateX[i], {
            toValue: toLeft ? -toDistance : toDistance,
            duration: 520,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(cardOpacity[i], {
            toValue: 0,
            duration: 380,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(cardScale[i], {
            toValue: 0.96,
            duration: 520,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
        ])
      );
    }

    mainCardTranslateY.stopAnimation();
    mainCardScale.stopAnimation();
    nameOpacity.stopAnimation();

    Animated.sequence([
      Animated.parallel([
        Animated.stagger(25, exitAnimations),
        Animated.timing(nameOpacity, {
          toValue: 0,
          duration: 220,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(mainCardTranslateY, {
          toValue: 0,
          duration: 520,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(mainCardScale, {
          toValue: 1,
          duration: 520,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start(({ finished }) => {
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
      nameOpacity.stopAnimation();
      nameOpacity.setValue(0);

      setResetting(false);
      if (finished) setOpened(false);
    });
  };

  const onConfirm = () => {
    if (opened || resetting) return;
    setOpened(true);
    nameOpacity.stopAnimation();
    nameOpacity.setValue(0);

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

    Animated.sequence([
      Animated.stagger(45, animations),
      Animated.timing(nameOpacity, {
        toValue: 1,
        duration: 680,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
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
              disabled={opened || resetting}
              style={({ pressed }) => [
                styles.button,
                pressed && !opened ? styles.buttonPressed : null,
                opened ? styles.buttonDisabled : null,
              ]}
            >
              <Text style={styles.buttonText}>{opened ? '已打开' : '确定'}</Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
      {opened ? (
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.heartOverlay]}
        >
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
            <View style={styles.heartCenter}>
              <Animated.Text style={[styles.centerName, { opacity: nameOpacity }]}>
                Eligos
              </Animated.Text>
            </View>
            {cardTargets.map((p, i) => {
              const rotate = `${((i % 9) - 4) * 1.2}deg`;
              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.miniCard,
                    {
                      left: p.x - MINI_CARD_WIDTH / 2,
                      top: p.y - MINI_CARD_HEIGHT / 2,
                      width: MINI_CARD_WIDTH,
                      height: MINI_CARD_HEIGHT,
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
                    {WISHES[i % WISHES.length]}
                  </Text>
                </Animated.View>
              );
            })}
          </View>
        </View>
      ) : null}
      {opened ? (
        <Pressable
          onPress={onReset}
          disabled={resetting}
          style={({ pressed }) => [
            styles.resetFab,
            pressed ? styles.resetFabPressed : null,
          ]}
        >
          <Text style={styles.resetFabText}>重置</Text>
        </Pressable>
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
    height: 272,
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
    paddingVertical: 14,
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
    marginBottom: 14,
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
  resetFab: {
    position: 'absolute',
    right: 18,
    bottom: 24,
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 141, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
    zIndex: 80,
  },
  resetFabPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  resetFabText: {
    color: '#FF4D8D',
    fontSize: 14,
    fontWeight: '800',
  },
  heartOverlay: {
    zIndex: 50,
    elevation: 50,
  },
  heartLayer: {
    position: 'absolute',
  },
  heartCenter: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerName: {
    color: '#FF4D8D',
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.12)',
    textShadowOffset: { width: 0, height: 6 },
    textShadowRadius: 10,
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
