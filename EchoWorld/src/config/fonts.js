import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Inter': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Light': require('../../assets/fonts/Inter-Light.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    'Noto-Serif': require('../../assets/fonts/NotoSerif-Regular.ttf'),
    'Noto-Serif-Italic': require('../../assets/fonts/NotoSerif-Italic.ttf'),
    'Noto-Serif-Bold': require('../../assets/fonts/NotoSerif-Bold.ttf'),
  });
};

export const fontConfig = {
  Inter: {
    light: 'Inter-Light',
    normal: 'Inter',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  'Noto Serif': {
    normal: 'Noto-Serif',
    italic: 'Noto-Serif-Italic',
    bold: 'Noto-Serif-Bold',
  },
};