import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing, shadows } from '../theme';

type Props = { children: React.ReactNode; style?: ViewStyle; highlight?: 'primary' | 'accent' | 'none' };

export default function Card({ children, style, highlight = 'none' }: Props) {
  const border = highlight === 'primary' ? { borderWidth: 2, borderColor: colors.primary }
    : highlight === 'accent' ? { borderWidth: 2, borderColor: colors.accent } : {};

  return <View style={[styles.card, shadows.sm, border, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md },
});
