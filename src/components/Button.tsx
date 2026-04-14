import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../utils/theme';

type Variant = 'accent' | 'pro' | 'outline' | 'muted';

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  style?: ViewStyle;
  disabled?: boolean;
};

const variantStyles: Record<Variant, { bg: string; text: string; border?: string }> = {
  accent: { bg: colors.accent, text: colors.bg },
  pro: { bg: colors.accentPro, text: colors.white },
  outline: { bg: 'transparent', text: colors.accentPro, border: colors.accentPro },
  muted: { bg: colors.border, text: colors.text },
};

export default function Button({
  title,
  onPress,
  variant = 'accent',
  style,
  disabled = false,
}: Props) {
  const v = variantStyles[variant];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: v.bg },
        v.border ? { borderWidth: 1, borderColor: v.border, borderStyle: 'dashed' as const } : {},
        disabled ? styles.disabled : {},
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: v.text }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
