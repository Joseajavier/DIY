// ═══════════════════════════════════════════════════════════════
// BOARD FOOT CALCULATOR — calcula el volumen de piezas de madera
// ───────────────────────────────────────────────────────────────
// Fórmula (sistema imperial):
//   board_feet = (thickness_in × width_in × length_ft) / 12
//
// En sistema métrico:
//   1 pie tablero = 144 pulg³ = 2359.74 cm³
//   volume_dm³ = (largo_cm × ancho_cm × grosor_cm) / 1000
// ═══════════════════════════════════════════════════════════════

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';

const CM3_PER_BOARD_FOOT = 2359.74;

function parse(s: string): number {
  const n = parseFloat(s.replace(',', '.'));
  return isNaN(n) || n < 0 ? 0 : n;
}

type Piece = { lengthStr: string; widthStr: string; thicknessStr: string; qtyStr: string };

const EMPTY_PIECE: Piece = { lengthStr: '', widthStr: '', thicknessStr: '', qtyStr: '1' };

export default function BoardFootCalcScreen() {
  const [pieces, setPieces] = useState<Piece[]>([
    { lengthStr: '200', widthStr: '14', thicknessStr: '2', qtyStr: '4' },
  ]);

  const addPiece = () => setPieces(prev => [...prev, { ...EMPTY_PIECE }]);

  const removePiece = (i: number) =>
    setPieces(prev => prev.filter((_, idx) => idx !== i));

  const updateField = (i: number, field: keyof Piece, val: string) =>
    setPieces(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: val } : p));

  const results = useMemo(() => {
    return pieces.map(p => {
      const l = parse(p.lengthStr);
      const w = parse(p.widthStr);
      const t = parse(p.thicknessStr);
      const q = Math.max(1, Math.floor(parse(p.qtyStr) || 1));
      const vol1 = l * w * t; // cm³
      const volTotal = vol1 * q;
      const bf1 = vol1 / CM3_PER_BOARD_FOOT;
      const bfTotal = bf1 * q;
      return { vol1, volTotal, bf1, bfTotal, q, valid: l > 0 && w > 0 && t > 0 };
    });
  }, [pieces]);

  const grandTotal = useMemo(() => {
    const volCm3  = results.reduce((s, r) => s + (r.valid ? r.volTotal : 0), 0);
    const bf      = results.reduce((s, r) => s + (r.valid ? r.bfTotal : 0), 0);
    return { volCm3, volDm3: volCm3 / 1000, bf };
  }, [results]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Volumen de madera</Text>
        <Text style={styles.subtitle}>
          Calcula cuánta madera necesitas en dm³ y pies tablero (board feet).
        </Text>

        {/* Piezas */}
        {pieces.map((piece, i) => {
          const res = results[i];
          return (
            <View key={i} style={styles.pieceCard}>
              <View style={styles.pieceHeader}>
                <Text style={styles.pieceTitle}>Pieza {i + 1}</Text>
                {pieces.length > 1 && (
                  <TouchableOpacity onPress={() => removePiece(i)}>
                    <Text style={styles.removeText}>✕ Eliminar</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.fieldsRow}>
                <View style={styles.field}>
                  <Text style={styles.label}>Largo (cm)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="decimal-pad"
                    value={piece.lengthStr}
                    onChangeText={v => updateField(i, 'lengthStr', v)}
                    placeholder="200"
                    placeholderTextColor={colors.textMuted}
                  />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Ancho (cm)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="decimal-pad"
                    value={piece.widthStr}
                    onChangeText={v => updateField(i, 'widthStr', v)}
                    placeholder="14"
                    placeholderTextColor={colors.textMuted}
                  />
                </View>
              </View>

              <View style={styles.fieldsRow}>
                <View style={styles.field}>
                  <Text style={styles.label}>Grosor (cm)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="decimal-pad"
                    value={piece.thicknessStr}
                    onChangeText={v => updateField(i, 'thicknessStr', v)}
                    placeholder="2"
                    placeholderTextColor={colors.textMuted}
                  />
                </View>
                <View style={styles.field}>
                  <Text style={styles.label}>Cantidad</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={piece.qtyStr}
                    onChangeText={v => updateField(i, 'qtyStr', v)}
                    placeholder="1"
                    placeholderTextColor={colors.textMuted}
                  />
                </View>
              </View>

              {/* Resultado de esta pieza */}
              {res.valid && (
                <View style={styles.pieceResult}>
                  <View style={styles.pieceResultItem}>
                    <Text style={styles.pieceResultValue}>
                      {(res.vol1 / 1000).toFixed(3)}
                    </Text>
                    <Text style={styles.pieceResultUnit}>dm³/ud</Text>
                  </View>
                  <View style={styles.pieceResultDivider} />
                  <View style={styles.pieceResultItem}>
                    <Text style={styles.pieceResultValue}>
                      {res.bf1.toFixed(2)}
                    </Text>
                    <Text style={styles.pieceResultUnit}>BF/ud</Text>
                  </View>
                  {res.q > 1 && (
                    <>
                      <View style={styles.pieceResultDivider} />
                      <View style={styles.pieceResultItem}>
                        <Text style={[styles.pieceResultValue, { color: colors.primary }]}>
                          {(res.volTotal / 1000).toFixed(3)}
                        </Text>
                        <Text style={styles.pieceResultUnit}>dm³ total</Text>
                      </View>
                    </>
                  )}
                </View>
              )}
            </View>
          );
        })}

        {/* Añadir pieza */}
        <TouchableOpacity style={styles.addBtn} onPress={addPiece} activeOpacity={0.8}>
          <Text style={styles.addBtnText}>+ Añadir pieza</Text>
        </TouchableOpacity>

        {/* Total general */}
        {grandTotal.volCm3 > 0 && (
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <View style={styles.totalRow}>
              <View style={styles.totalItem}>
                <Text style={styles.totalValue}>{grandTotal.volDm3.toFixed(3)}</Text>
                <Text style={styles.totalUnit}>dm³</Text>
              </View>
              <View style={styles.totalDivider} />
              <View style={styles.totalItem}>
                <Text style={styles.totalValue}>{grandTotal.bf.toFixed(2)}</Text>
                <Text style={styles.totalUnit}>board feet</Text>
              </View>
            </View>
          </View>
        )}

        {/* Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>¿Qué es un board foot?</Text>
          <Text style={styles.infoText}>
            Un pie tablero (board foot) es la unidad anglosajona para medir volumen
            de madera. Equivale a una pieza de 12" × 12" × 1" de grosor.{'\n\n'}
            1 board foot = 144 pulg³ = 2.360 dm³ ≈ 2.36 litros{'\n'}
            1 m³ de madera ≈ 424 board feet
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

  // ── Tarjeta de pieza ──────────────────────────────────────
  pieceCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  pieceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  pieceTitle: { ...typography.h3, color: colors.text },
  removeText: { ...typography.caption, color: colors.danger },

  fieldsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  field: { flex: 1 },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.sm,
  },

  pieceResult: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  pieceResultItem: { flex: 1, alignItems: 'center' },
  pieceResultValue: { ...typography.h3, color: colors.text },
  pieceResultUnit: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  pieceResultDivider: { width: 1, height: 32, backgroundColor: colors.border },

  // ── Botón añadir ──────────────────────────────────────────
  addBtn: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  addBtnText: { ...typography.body, color: colors.primary, fontWeight: '600' },

  // ── Total ─────────────────────────────────────────────────
  totalCard: {
    backgroundColor: colors.primaryMuted,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  totalLabel: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  totalRow: { flexDirection: 'row', alignItems: 'center' },
  totalItem: { flex: 1, alignItems: 'center' },
  totalValue: { fontSize: 36, fontWeight: '800', color: colors.text, letterSpacing: -1 },
  totalUnit: { ...typography.caption, color: colors.primary, fontWeight: '600', marginTop: 2 },
  totalDivider: { width: 1, height: 48, backgroundColor: colors.primary + '44' },

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
