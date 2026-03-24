import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { colors } from '../../theme';

interface AvatarProps {
  uri?: string | null;
  name?: string;
  size?: number;
  style?: ImageStyle;
  borderColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 48,
  style,
  borderColor = colors.accent.primary,
}) => {
  const containerStyle: ImageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 1.5,
    borderColor,
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[containerStyle, styles.image, style]}
      />
    );
  }

  return (
    <View style={[containerStyle, styles.placeholder, style]}>
      <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
        {name ? getInitials(name) : '?'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.background.secondary,
  },
  placeholder: {
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: colors.text.secondary,
    fontWeight: '500',
  },
});
