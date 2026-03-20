// ECHOWORLD2 设计系统常量
// 基于 "数字居所" 设计理念

export const COLORS = {
  // 背景色 - 极浅灰/暖白，像干净的宣纸
  background: '#F9F9F7',
  
  // 文字色 - 深石墨色，提供柔和的高对比度
  primaryText: '#2D3432',
  secondaryText: '#5F5E5E',
  
  // 状态色 - 活性脉冲，仅在表示"数字生命"存在时使用
  activePulse: '#00F2FF',
  
  // 表面容器色 - 用于卡片和容器区分
  surfaceContainerLow: '#F2F4F2',
  surfaceContainerHighest: '#DEE4E0',
  surfaceContainerLowest: '#FFFFFF',
  
  // 辅助色
  outlineVariant: '#ADB3B0',
  tertiaryContainer: '#F2E3FA',
  
  // 交互状态
  primary: '#5F5E5E',
  onPrimary: '#FAF7F6',
  secondary: '#51616E',
  onSecondary: '#F5F9FF'
};

export const TYPOGRAPHY = {
  // 字体家族
  headline: 'Noto Serif SC', // 营造人文、典雅、档案馆般的质感
  body: 'Inter', // 保证移动端阅读的清晰度
  
  // 字号和字重
  displayLg: {
    fontSize: 56,
    fontFamily: 'Noto Serif SC',
    lineHeight: 64
  },
  headlineMd: {
    fontSize: 28,
    fontFamily: 'Noto Serif SC', 
    lineHeight: 36
  },
  titleMd: {
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 24
  },
  bodyLg: {
    fontSize: 16,
    fontFamily: 'Inter',
    lineHeight: 24
  },
  bodyMd: {
    fontSize: 14,
    fontFamily: 'Inter',
    lineHeight: 20
  },
  labelMd: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.5
  },
  labelSm: {
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 12,
    letterSpacing: 1
  }
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64
};

export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999
};

// 设计原则常量
export const DESIGN_PRINCIPLES = {
  // 无边框规则 - 使用背景色区分而不是边框
  noBorderRule: true,
  
  // 玻璃态效果 - 用于浮动元素
  glassmorphism: {
    background: 'rgba(249, 249, 247, 0.8)',
    backdropFilter: 'blur(20px)'
  },
  
  // 幽灵边框 - 仅在需要时使用
  ghostBorder: {
    color: 'rgba(173, 179, 176, 0.15)',
    width: 1
  }
};