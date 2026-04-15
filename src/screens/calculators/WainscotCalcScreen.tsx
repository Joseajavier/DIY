// ═══════════════════════════════════════════════════════════════
// WAINSCOT / PANEL CALCULATOR
// ───────────────────────────────────────────────────────────────
// Reparte N marcos (paneles) iguales en una pared con separaciones
// idénticas entre ellos. Opcionalmente los márgenes exteriores
// pueden coincidir con la separación interior.
//
// Si márgenes = separación:
//   frameWidth = (wall - (n + 1) * spacing) / n
//
// Si márgenes independientes:
//   frameWidth = (wall - 2 * margin - (n - 1) * spacing) / n
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
  Switch,
} from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';

type FramePos = {
  idx: number;
  left: number;
  right: number;
  center: number;
};

export default function WainscotCalcScreen() {
  const [wallStr, setWallStr] = useState('125');
  const [countStr, setCountStr] = useState('3');
  const [spacingStr, setSpacingStr] = useState('5');
  const [marginStr, setMarginStr] = useState('5');
  const [sameMargin, setSameMargin] = useState(true);

  const parse = (s: string) => {
    const n = parseFloat(s.replace(',', '.'));
    return isNaN(n) ? 0 : n;
  };

  const wall = parse(wallStr);
  const count = Math.max(1, Math.floor(parse(countStr)));
  const gap = Math.max(0, parse(spacingStr));
  const margin = sameMargin ? gap : Math.max(0, parse(marginStr));

  const { frameWidth, positions, valid } = useMemo(() => {
    if (wall <= 0 || count <= 0) {
      return { frameWidth: 0, positions: [] as FramePos[], valid: false };
    }
    const totalGaps = (count - 1) * gap;
    const usable = wall - 2 * margin - totalGaps;
    const fw = usable / count;
    if (fw <= 0) {
      return { frameWidth: fw, positions: [] as FramePos[], valid: false };
    }
    const pos: FramePos[] = [];
    for (let i = 0; i < count; i++) {
      const left = margin + i * (fw + gap);
      const right = left + fw;
      pos.push({ idx: i + 1, left, right, center: (left + right) / 2 });
    }
    return { frameWidth: fw, positions: pos, valid: true };
  }, [wall, count, gap, margin]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Calculadora wainscot</Text>
        <Text style={styles.subtitle}>
          Reparte N paneles iguales en una pared con separaciones idénticas
        </Text>

        {/* Inputs */}
        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Ancho total de la pared (cm)</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={wallStr}
              onChangeText={setWallStr}
              placeholder="125"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Número de marcos</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={countStr}
              onChangeText={setCountStr}
              placeholder="3"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Separación entre marcos (cm)</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={spacingStr}
              onChangeText={setSpacingStr}
              placeholder="5"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Márgenes exteriores = separación</Text>
              <Text style={styles.hint}>
                {sameMargin
                  ? 'El hueco lateral es igual al hueco entre marcos'
                  : 'Márgenes laterales personalizados'}
              </Text>
            </View>
            <Switch
              value={sameMargin}
              onValueChange={setSameMargin}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          {!sameMargin && (
            <View style={styles.field}>
              <Text style={styles.label}>Margen lateral (cm)</Text>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                value={marginStr}
                onChangeText={setMarginStr}
                placeholder="5"
                placeholderTextColor={colors.textMuted}
              />
            </View>
          )}
        </View>

        {/* Resultado principal */}
        <View style={[styles.card, styles.highlightCard]}>
          <Text style={styles.label}>Ancho de cada marco</Text>
          <Text style={styles.bigResult}>
            {valid ? frameWidth.toFixed(2) : '—'}{' '}
            <Text style={styles.bigResultUnit}>cm</Text>
          </Text>
          {!valid && (
            <Text style={styles.errorText}>
              Los valores no caben en la pared. Reduce marcos o separación.
            </Text>
          )}
        </View>

        {/* Visualización */}
        {valid && (
          <View style={styles.card}>
            <Text style={styles.label}>Visualización</Text>
            <View style={styles.wall}>
              {positions.map((p) => (
                <View
                  key={p.idx}
                  style={[
                    styles.frame,
                    {
                      left: `${(p.left / wall) * 100}%`,
                      width: `${(frameWidth / wall) * 100}%`,
                    },
                  ]}
                >
                  <Text style={styles.frameLabel}>{p.idx}</Text>
                </View>
              ))}
            </View>
            <View style={styles.wallLegend}>
              <Text style={styles.legendText}>0</Text>
              <Text style={styles.legendText}>{wall} cm</Text>
            </View>
          </View>
        )}

        {/* Posiciones */}
        {valid && (
          <View style={styles.card}>
            <Text style={styles.label}>Posiciones (desde la izquierda)</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.th, { flex: 0.6 }]}>#</Text>
              <Text style={styles.th}>Izq.</Text>
              <Text style={styles.th}>Centro</Text>
              <Text style={styles.th}>Der.</Text>
            </View>
            {positions.map((p) => (
              <View key={p.idx} style={styles.tableRow}>
                <Text style={[styles.td, { flex: 0.6, fontWeight: '700' }]}>
                  {p.idx}
                </Text>
                <Text style={styles.td}>{p.left.toFixed(2)}</Text>
                <Text style={[styles.td, { color: colors.primary }]}>
                  {p.center.toFixed(2)}
                </Text>
                <Text style={styles.td}>{p.right.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Fórmula</Text>
          <Text style={styles.infoText}>
            ancho = (pared − 2·margen − (n−1)·separación) / n{'\n'}
            posición i = margen + i·(ancho + separación)
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
  hint: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  input: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.sm,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
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
  wall: {
    position: 'relative',
    height: 80,
    backgroundColor: colors.bgAlt,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  frame: {
    position: 'absolute',
    top: 8,
    bottom: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameLabel: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  wallLegend: {
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
