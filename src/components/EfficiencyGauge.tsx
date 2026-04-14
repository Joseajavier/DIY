import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';

type Props = {
  value: number; // 0-100
  label: string;
  size?: 'small' | 'large';
};

export default function EfficiencyGauge({ value, label, size = 'large' }: Props) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const barColor = clampedValue > 80 ? colors.success : clampedValue > 50 ? colors.accent : colors.danger;
  const isLarge = size === 'large';

  return (
    <View style={[styles.container, isLarge && styles.containerLarge]}>
      <View style={styles.headerRow}>
        <Text style={[styles.label, isLarge && styles.labelLarge]}>{label}</Text>
        <Text style={[styles.value, isLarge && styles.valueLarge, { color: barColor }]}>
          {clampedValue.toFixed(1)}%
        </Text>
      </View>
      <View style={[styles.bar, isLarge && styles.barLarge]}>
        <View style={[styles.fill, { width: `${clampedValue}%`, backgroundColor: barColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  containerLarge: { marginBottom: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  label: { fontSize: 13, color: colors.textSecondary },
  labelLarge: { fontSize: 15, fontWeight: '600' },
  value: { fontSize: 14, fontWeight: 'bold' },
  valueLarge: { fontSize: 20 },
  bar: { height: 8, backgroundColor: colors.border, borderRadius: 4 },
  barLarge: { height: 12, borderRadius: 6 },
  fill: { height: '100%', borderRadius: 4 },
});
