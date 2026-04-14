import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../utils/theme';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  highlight?: 'accent' | 'pro' | 'none';
};

export default function Card({ children, style, highlight = 'none' }: Props) {
  const borderStyle =
    highlight === 'accent'
      ? { borderWidth: 2, borderColor: colors.accent }
      : highlight === 'pro'
      ? { borderWidth: 2, borderColor: colors.accentPro }
      : {};

  return <View style={[styles.card, borderStyle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
  },
});
