import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

type Props = { value: number; label: string; size?: 'small' | 'large' };

export default function EfficiencyGauge({ value, label, size = 'large' }: Props) {
  const v = Math.max(0, Math.min(100, value));
  const barColor = v > 80 ? colors.success : v > 50 ? colors.warning : colors.danger;
  const lg = size === 'large';

  return (
    <View style={{ marginBottom: lg ? spacing.xl : spacing.md }}>
      <View style={styles.header}>
        <Text style={lg ? typography.body : typography.bodySmall}>{label}</Text>
        <Text style={[lg ? typography.h2 : typography.body, { color: barColor }]}>{v.toFixed(1)}%</Text>
      </View>
      <View style={[styles.bar, lg && styles.barLg]}>
        <View style={[styles.fill, lg && styles.fillLg, { width: `${v}%`, backgroundColor: barColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  bar: { height: 8, backgroundColor: colors.border, borderRadius: radius.sm },
  barLg: { height: 12 },
  fill: { height: 8, borderRadius: radius.sm },
  fillLg: { height: 12 },
});
