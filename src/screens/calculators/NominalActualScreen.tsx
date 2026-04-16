// ═══════════════════════════════════════════════════════════════
// NOMINAL TO ACTUAL — tabla de dimensiones reales de madera
// ───────────────────────────────────────────────────────────────
// La madera se vende por su "tamaño nominal" (ej. 2×4) pero las
// dimensiones reales son menores. Esta pantalla muestra la
// equivalencia en pulgadas y milímetros.
// ═══════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';

type Row = {
  nominal: string;
  inchW: string;
  inchH: string;
  mmW: number;
  mmH: number;
};

const DATA: Row[] = [
  // ── Serie 1× ──────────────────────────────────────────────
  { nominal: '1×2',  inchW: '¾',   inchH: '1½',   mmW: 19,  mmH: 38  },
  { nominal: '1×3',  inchW: '¾',   inchH: '2½',   mmW: 19,  mmH: 64  },
  { nominal: '1×4',  inchW: '¾',   inchH: '3½',   mmW: 19,  mmH: 89  },
  { nominal: '1×6',  inchW: '¾',   inchH: '5½',   mmW: 19,  mmH: 140 },
  { nominal: '1×8',  inchW: '¾',   inchH: '7¼',   mmW: 19,  mmH: 184 },
  { nominal: '1×10', inchW: '¾',   inchH: '9¼',   mmW: 19,  mmH: 235 },
  { nominal: '1×12', inchW: '¾',   inchH: '11¼',  mmW: 19,  mmH: 286 },
  // ── Serie 2× ──────────────────────────────────────────────
  { nominal: '2×2',  inchW: '1½',  inchH: '1½',   mmW: 38,  mmH: 38  },
  { nominal: '2×3',  inchW: '1½',  inchH: '2½',   mmW: 38,  mmH: 64  },
  { nominal: '2×4',  inchW: '1½',  inchH: '3½',   mmW: 38,  mmH: 89  },
  { nominal: '2×6',  inchW: '1½',  inchH: '5½',   mmW: 38,  mmH: 140 },
  { nominal: '2×8',  inchW: '1½',  inchH: '7¼',   mmW: 38,  mmH: 184 },
  { nominal: '2×10', inchW: '1½',  inchH: '9¼',   mmW: 38,  mmH: 235 },
  { nominal: '2×12', inchW: '1½',  inchH: '11¼',  mmW: 38,  mmH: 286 },
  // ── Serie 4× y 6× ─────────────────────────────────────────
  { nominal: '4×4',  inchW: '3½',  inchH: '3½',   mmW: 89,  mmH: 89  },
  { nominal: '4×6',  inchW: '3½',  inchH: '5½',   mmW: 89,  mmH: 140 },
  { nominal: '6×6',  inchW: '5½',  inchH: '5½',   mmW: 140, mmH: 140 },
];

type Unit = 'mm' | 'in';

export default function NominalActualScreen() {
  const [unit, setUnit] = useState<Unit>('mm');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Nominal → Real</Text>
        <Text style={styles.subtitle}>
          La madera se vende por tamaño nominal, pero sus medidas reales son menores.
        </Text>

        {/* Toggle unidades */}
        <View style={styles.toggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, unit === 'mm' && styles.toggleActive]}
            onPress={() => setUnit('mm')}
          >
            <Text style={[styles.toggleText, unit === 'mm' && styles.toggleTextActive]}>
              Milímetros
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, unit === 'in' && styles.toggleActive]}
            onPress={() => setUnit('in')}
          >
            <Text style={[styles.toggleText, unit === 'in' && styles.toggleTextActive]}>
              Pulgadas
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cabecera tabla */}
        <View style={styles.tableHeader}>
          <Text style={[styles.th, styles.thNominal]}>Nominal</Text>
          <Text style={styles.th}>Real (ancho)</Text>
          <Text style={styles.th}>Real (alto)</Text>
        </View>

        {/* Filas */}
        {DATA.map((row, i) => {
          const wLabel = unit === 'mm' ? `${row.mmW} mm` : `${row.inchW}"`;
          const hLabel = unit === 'mm' ? `${row.mmH} mm` : `${row.inchH}"`;
          const isEven = i % 2 === 0;
          return (
            <View key={row.nominal} style={[styles.tableRow, isEven && styles.tableRowEven]}>
              <Text style={[styles.tdNominal, styles.thNominal]}>{row.nominal}</Text>
              <Text style={styles.td}>{wLabel}</Text>
              <Text style={[styles.td, styles.tdHighlight]}>{hLabel}</Text>
            </View>
          );
        })}

        {/* Nota */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>¿Por qué hay diferencia?</Text>
          <Text style={styles.infoText}>
            El aserradero seca y cepilla la madera tras el corte. Un tablón de 2×4 pierde
            ~12 mm en cada cara durante el proceso. Los valores mostrados son los estándar
            NHLA para madera seca (19% de humedad o menos).
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Equivalencias rápidas</Text>
          <Text style={styles.infoText}>
            1 pulgada = 25.4 mm{'\n'}
            1 pie = 30.48 cm{'\n'}
            1 pie tablero = 144 pulg³ ≈ 2360 cm³
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },

  title: { ...typography.hero, color: colors.text, marginBottom: spacing.xs },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    lineHeight: 22,
  },

  // ── Toggle ────────────────────────────────────────────────
  toggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 4,
    marginBottom: spacing.lg,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.md,
  },
  toggleActive: { backgroundColor: colors.primary },
  toggleText: { ...typography.bodySmall, color: colors.textMuted, fontWeight: '600' },
  toggleTextActive: { color: colors.textOnPrimary },

  // ── Tabla ─────────────────────────────────────────────────
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.md,
    marginBottom: 2,
  },
  th: {
    flex: 1,
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 11,
    textAlign: 'center',
  },
  thNominal: { flex: 0.8, textAlign: 'left' },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '44',
  },
  tableRowEven: { backgroundColor: colors.surface + '66' },

  tdNominal: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'monospace',
  },
  td: {
    flex: 1,
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  tdHighlight: { color: colors.primary, fontWeight: '600' },

  // ── Info ──────────────────────────────────────────────────
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
