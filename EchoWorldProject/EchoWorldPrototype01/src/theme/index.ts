export const colors = {
  background: {
    primary: '#FAF8F5',
    secondary: '#F2EDE6',
    elevated: '#EDE6DC',
  },
  text: {
    primary: '#1A1714',
    secondary: '#6B6259',
    tertiary: '#A89D92',
    inverse: '#FAF8F5',
  },
  accent: {
    primary: '#8B6F47',
    secondary: '#B5956A',
    light: '#E8DDD0',
    danger: '#9E4A3A',
  },
  border: {
    subtle: '#EAE3D9',
    default: '#D9CFC4',
    strong: '#C4B5A5',
  },
  state: {
    home: '#7A9E8A',
    outing: '#8B6F47',
    traveling: '#9B9692',
    sleeping: '#C4B5A5',
    unread: '#C0392B',
  },
  message: {
    character: '#F2EDE6',
    player: '#8B6F47',
  },
} as const;

export const typography = {
  pageTitle: {
    fontSize: 26,
    fontWeight: '300' as const,
    color: colors.text.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500' as const,
    color: colors.text.primary,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    color: colors.text.primary,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
    color: colors.text.secondary,
  },
  small: {
    fontSize: 11,
    fontWeight: '400' as const,
    color: colors.text.tertiary,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  pagePadding: 20,
} as const;

export const borderRadius = {
  button: 999,
  card: 16,
  input: 12,
  bubble: 18,
} as const;
