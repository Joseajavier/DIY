// ═══════════════════════════════════════════════════════════════
// GOLDEN RATIO CALCULATOR
// ───────────────────────────────────────────────────────────────
// Divide una medida total en dos partes con proporción áurea (φ).
// φ = 1.6180339887...
// Dado total T: parte mayor = T * (φ / (1 + φ)) = T * 0.618034
//                parte menor = T * (1 / (1 + φ)) = T * 0.381966
// ═══════════════════════════════════════════════════════════════

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';

const PHI = 1.6180339887498949;

type Unit = 'cm' | 'in';

export default function GoldenRatioScreen() {
  const [input, setInput] = useState('128');
  const [unit, setUnit] = useState<Unit>('cm');

  const total = useMemo(() => {
    const n = parseFloat(input.replace(',', '.'));
    return isNaN(n) || n <= 0 ? 0 : n;
  }, [input]);

  const big = useMemo(() => total * (PHI / (1 + PHI)), [total]);
  const small = useMemo(() => total * (1 / (1 + PHI)), [total]);

  const bigPct = total > 0 ? (big / total) * 100 : 61.8;
  const smallPct = total > 0 ? (small / total) * 100 : 38.2;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Proporción áurea</Text>
        <Text style={styles.subtitle}>
          Divide una medida total en dos partes con ratio φ ≈ 1.618
        </Text>

        {/* Input */}
        <View style={styles.card}>
          <Text style={styles.label}>Medida total</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              keyboardType="decimal-pad"
              placeholder="ej. 128"
              placeholderTextColor={colors.textMuted}
            />
            <View style={styles.unitRow}>
              <Pressable
                onPress={() => setUnit('cm')}
                style={[styles.unitBtn, unit === 'cm' && styles.unitBtnActive]}
              >
                <Text style={[styles.unitText, unit === 'cm' && styles.unitTextActive]}>
                  cm
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setUnit('in')}
                style={[styles.unitBtn, unit === 'in' && styles.unitBtnActive]}
              >
                <Text style={[styles.unitText, unit === 'in' && styles.unitTextActive]}>
                  in
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Barra visual */}
        <View style={styles.card}>
          <Text style={styles.label}>Visualización</Text>
          <View style={styles.bar}>
            <View style={[styles.barBig, { flex: bigPct }]}>
              <Text style={styles.barLabel}>A</Text>
            </View>
            <View style={[styles.barSmall, { flex: smallPct }]}>
              <Text style={styles.barLabel}>B</Text>
            </View>
          </View>
          <View style={styles.barLegend}>
            <Text style={styles.legendText}>61.8%</Text>
            <Text style={styles.legendText}>38.2%</Text>
          </View>
        </View>

        {/* Resultados */}
        <View style={styles.resultsRow}>
          <View style={[styles.resultCard, { backgroundColor: colors.primaryMuted }]}>
            <Text style={styles.resultLabel}>A (mayor)</Text>
            <Text style={styles.resultValue}>{big.toFixed(2)}</Text>
            <Text style={styles.resultUnit}>{unit}</Text>
          </View>
          <View style={[styles.resultCard, { backgroundColor: colors.accentMuted }]}>
            <Text style={styles.resultLabel}>B (menor)</Text>
            <Text style={styles.resultValue}>{small.toFixed(2)}</Text>
            <Text style={styles.resultUnit}>{unit}</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>¿Cuándo usarlo?</Text>
          <Text style={styles.infoText}>
            • Dividir un frontal de armario en dos cajones estéticos{'\n'}
            • Proporción alto/ancho de un cuadro o marco{'\n'}
            • Tamaño de los tiradores respecto a las puertas{'\n'}
            • Altura de zócalo respecto a altura total de pared
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  title: {
    ...typography.hero,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  input: {
    flex: 1,
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    padding: 0,
  },
  unitRow: { flexDirection: 'row', gap: spacing.xs },
  unitBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  unitBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  unitText: { ...typography.caption, color: colors.textSecondary, fontWeight: '600' },
  unitTextActive: { color: colors.textOnPrimary },
  bar: {
    flexDirection: 'row',
    height: 56,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginTop: spacing.sm,
  },
  barBig: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barSmall: {
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  barLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  legendText: { ...typography.caption, color: colors.textMuted },
  resultsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  resultCard: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  resultLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  resultUnit: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  infoBox: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  infoTitle: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
