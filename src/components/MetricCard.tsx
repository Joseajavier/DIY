import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

type Props = {
  value: string;
  label: string;
  color?: string;
};

export default function MetricCard({ value, label, color = colors.primary }: Props) {
  return (
    <View style={styles.card}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  value: {
    ...typography.h1,
    fontSize: 24,
  },
  label: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
});
