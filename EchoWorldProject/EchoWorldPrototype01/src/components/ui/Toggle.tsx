import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius } from '../../theme';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ value, onValueChange, disabled = false }) => {
  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        disabled && styles.disabled,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <View
        style={[
          styles.track,
          value && styles.trackActive,
        ]}
      >
        <View
          style={[
            styles.thumb,
            value && styles.thumbActive,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  disabled: {
    opacity: 0.4,
  },
  track: {
    width: 44,
    height: 24,
    borderRadius: borderRadius.button,
    backgroundColor: colors.border.default,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  trackActive: {
    backgroundColor: colors.accent.primary,
  },
  thumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.background.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    transform: [{ translateX: 0 }],
  },
  thumbActive: {
    transform: [{ translateX: 20 }],
  },
});
