import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { colors, borderRadius, typography, spacing } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  showPasswordToggle,
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.text.tertiary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !showPassword}
          {...props}
        />
        {showPasswordToggle && secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>{showPassword ? '👁' : '👁'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.caption.fontSize,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.input,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  inputFocused: {
    borderColor: colors.accent.primary,
  },
  inputError: {
    borderColor: colors.accent.danger,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.md,
    fontSize: typography.body.fontSize,
    color: colors.text.primary,
  },
  toggleButton: {
    paddingHorizontal: spacing.md,
  },
  toggleText: {
    fontSize: 18,
  },
  errorText: {
    fontSize: typography.small.fontSize,
    color: colors.accent.danger,
    marginTop: spacing.xs,
  },
});
