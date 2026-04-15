// ═══════════════════════════════════════════════════════════════
// SHELF CALCULATOR — distribuye N baldas en un hueco vertical
// ───────────────────────────────────────────────────────────────
// Dado:
//   distance  = altura total del hueco (cm)
//   thickness = grosor de cada balda (cm)
//   count     = número de baldas
//
// Si las baldas se reparten con el MISMO hueco libre arriba, abajo y entre ellas:
//   gap = (distance − count·thickness) / (count + 1)
//
// Posición del borde inferior de la balda i (1-indexed), desde abajo:
//   bottom_i = i·gap + (i−1)·thickness
// Centro:
//   center_i = bottom_i + thickness/2
// ═══════════════════════════════════════════════════════════════

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';

type ShelfRow = {
  idx: number;
  bottom: number;
  center: number;
  top: number;
};

export default function ShelfCalcScreen() {
  const [distanceStr, setDistanceStr] = useState('180');
  const [thicknessStr, setThicknessStr] = useState('1.8');
  const [countStr, setCountStr] = useState('4');

  const parse = (s: string) => {
    const n = parseFloat(s.replace(',', '.'));
    return isNaN(n) ? 0 : n;
  };

  const distance = parse(distanceStr);
  const thickness = Math.max(0, parse(thicknessStr));
  const count = Math.max(1, Math.floor(parse(countStr)));

  const { gap, rows, valid } = useMemo(() => {
    if (distance <= 0 || thickness < 0 || count <= 0) {
      return { gap: 0, rows: [] as ShelfRow[], valid: false };
    }
    const g = (distance - count * thickness) / (count + 1);
    if (g <= 0) return { gap: g, rows: [] as ShelfRow[], valid: false };
    const out: ShelfRow[] = [];
    for (let i = 1; i <= count; i++) {
      const bottom = i * g + (i - 1) * thickness;
      const top = bottom + thickness;
      out.push({ idx: i, bottom, top, center: (bottom + top) / 2 });
    }
    return { gap: g, rows: out, valid: true };
  }, [distance, thickness, count]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Calculadora de baldas</Text>
        <Text style={styles.subtitle}>
          Reparte N baldas con huecos idénticos en un hueco vertical
        </Text>

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Altura total del hueco (cm)</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={distanceStr}
              onChangeText={setDistanceStr}
              placeholder="180"
              placeholderTextColor={colors.textMuted}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Grosor de cada balda (cm)</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={thicknessStr}
              onChangeText={setThicknessStr}
              placeholder="1.8"
              placeholderTextColor={colors.textMuted}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Número de baldas</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={countStr}
              onChangeText={setCountStr}
              placeholder="4"
              placeholderTextColor={colors.textMuted}
            />
          </View>
        </View>

        <View style={[styles.card, styles.highlightCard]}>
          <Text style={styles.label}>Hueco entre baldas</Text>
          <Text style={styles.bigResult}>
            {valid ? gap.toFixed(2) : '—'}{' '}
            <Text style={styles.bigResultUnit}>cm</Text>
          </Text>
          {!valid && (
            <Text style={styles.errorText}>
              Las baldas no caben. Reduce el número o el grosor.
            </Text>
          )}
        </View>

        {/* Visualización vertical */}
        {valid && (
          <View style={styles.card}>
            <Text style={styles.label}>Visualización</Text>
            <View style={styles.column}>
              {rows
                .slice()
                .reverse()
                .map((r) => (
                  <View
                    key={r.idx}
                    style={[
                      styles.shelf,
                      {
                        bottom: `${(r.bottom / distance) * 100}%`,
                        height: `${(thickness / distance) * 100}%`,
                      },
                    ]}
                  >
                    <Text style={styles.shelfLabel}>Balda {r.idx}</Text>
                  </View>
                ))}
            </View>
            <View style={styles.columnLegend}>
              <Text style={styles.legendText}>0</Text>
              <Text style={styles.legendText}>{distance} cm</Text>
            </View>
          </View>
        )}

        {/* Tabla */}
        {valid && (
          <View style={styles.card}>
            <Text style={styles.label}>Posición desde abajo</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.th, { flex: 0.6 }]}>#</Text>
              <Text style={styles.th}>Inf.</Text>
              <Text style={styles.th}>Centro</Text>
              <Text style={styles.th}>Sup.</Text>
            </View>
            {rows
              .slice()
              .reverse()
              .map((r) => (
                <View key={r.idx} style={styles.tableRow}>
                  <Text style={[styles.td, { flex: 0.6, fontWeight: '700' }]}>
                    {r.idx}
                  </Text>
                  <Text style={styles.td}>{r.bottom.toFixed(2)}</Text>
                  <Text style={[styles.td, { color: colors.primary }]}>
                    {r.center.toFixed(2)}
                  </Text>
                  <Text style={styles.td}>{r.top.toFixed(2)}</Text>
                </View>
              ))}
          </View>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Fórmula</Text>
          <Text style={styles.infoText}>
            hueco = (altura − n·grosor) / (n + 1){'\n'}
            inferior_i = i·hueco + (i−1)·grosor
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  title: { ...typography.hero, color: colors.text, marginBottom: spacing.xs },
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
  highlightCard: {
    backgroundColor: colors.primaryMuted,
    borderColor: colors.primary,
  },
  field: { marginBottom: spacing.md },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.sm,
  },
  bigResult: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -1,
  },
  bigResultUnit: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.danger,
    marginTop: spacing.sm,
  },
  column: {
    position: 'relative',
    height: 260,
    backgroundColor: colors.bgAlt,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  shelf: {
    position: 'absolute',
    left: 12,
    right: 12,
    minHeight: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shelfLabel: { color: '#FFFFFF', fontWeight: '700', fontSize: 11 },
  columnLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  legendText: { ...typography.caption, color: colors.textMuted },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  th: {
    flex: 1,
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 11,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '55',
  },
  td: { flex: 1, ...typography.bodySmall, color: colors.text },
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
    fontFamily: 'monospace',
  },
});
