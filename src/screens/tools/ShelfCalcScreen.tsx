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
import HeroBanner from '../../components/HeroBanner';
import SectionHeader from '../../components/SectionHeader';

// ── Paleta de madera (roble/nogal) para la estantería ─────────
const wood = {
  deep: '#3D2817',
  dark: '#5C3A1E',
  medium: '#7A4E28',
  main: '#9B6835',
  light: '#B8844A',
  highlight: '#D4A574',
  back: '#2A1810',
};

// Colores de libros (paleta cálida de tapas de tela) para decorar las baldas.
const BOOK_COLORS = [
  '#8B3A3A', '#3A5C8B', '#3A8B5C', '#8B6F3A',
  '#5C3A8B', '#C98742', '#2F4858', '#7D4B3A',
  '#A63D40', '#386641',
];

type Book = { w: number; h: number; color: string };

/** Genera una fila de libros determinista (misma fila cada render por balda). */
function booksForShelf(idx: number): Book[] {
  const seed = idx * 31 + 7;
  const n = 3 + (seed % 4); // 3..6 libros
  const out: Book[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      w: 5 + ((seed + i * 7) % 5),     // 5..9 px
      h: 16 + ((seed + i * 11) % 10),  // 16..25 px
      color: BOOK_COLORS[(seed + i * 13) % BOOK_COLORS.length],
    });
  }
  return out;
}

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
        <HeroBanner
          variant="accent"
          eyebrow="Calculadora"
          title="Baldas"
          subtitle="Reparte N baldas con huecos idénticos en un hueco vertical."
        />

        <SectionHeader first>Medidas</SectionHeader>
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

        {/* Visualización — estantería de madera */}
        {valid && (
          <View style={styles.card}>
            <Text style={styles.label}>Visualización</Text>
            <View style={styles.bookcaseWrap}>
              <View style={styles.bookcase}>
                <View style={styles.topCap} />
                <View style={styles.bookcaseBody}>
                  <View style={styles.sidePanelLeft} />
                  <View style={styles.inside}>
                    <View style={styles.insideTopShadow} />
                    {rows.map((r) => {
                      const bottomPct = (r.bottom / distance) * 100;
                      const heightPct = (thickness / distance) * 100;
                      return (
                        <View
                          key={r.idx}
                          style={[
                            styles.shelf,
                            {
                              bottom: `${bottomPct}%`,
                              height: `${heightPct}%`,
                            },
                          ]}
                        >
                          {/* Libros sentados encima de la balda */}
                          <View style={styles.booksRow}>
                            {booksForShelf(r.idx).map((b, i) => (
                              <View
                                key={i}
                                style={{
                                  width: b.w,
                                  height: b.h,
                                  backgroundColor: b.color,
                                  marginRight: 1.5,
                                  borderTopLeftRadius: 1,
                                  borderTopRightRadius: 1,
                                }}
                              />
                            ))}
                          </View>
                          {/* Tablero de madera */}
                          <View style={styles.shelfPlank} />
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.sidePanelRight} />
                </View>
                <View style={styles.bottomCap} />
              </View>
              {/* Regla con marcas cada 25% */}
              <View style={styles.ruler}>
                {[0, 25, 50, 75, 100].map((p) => (
                  <View
                    key={p}
                    style={[styles.rulerMark, { bottom: `${p}%` }]}
                  >
                    <View style={styles.rulerTick} />
                    <Text style={styles.rulerText}>
                      {Math.round((distance * p) / 100)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <Text style={styles.bookcaseCaption}>
              Altura total {distance} cm · hueco entre baldas {gap.toFixed(1)} cm
            </Text>
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
  // ── Estantería (visualización) ──────────────────────────────
  bookcaseWrap: {
    flexDirection: 'row',
    height: 340,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  bookcase: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  topCap: {
    height: 14,
    backgroundColor: wood.main,
    borderTopWidth: 2,
    borderTopColor: wood.highlight,
    borderBottomWidth: 1,
    borderBottomColor: wood.deep,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  bottomCap: {
    height: 18,
    backgroundColor: wood.dark,
    borderBottomWidth: 3,
    borderBottomColor: wood.deep,
    borderTopWidth: 1,
    borderTopColor: wood.highlight,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  bookcaseBody: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: wood.back,
  },
  sidePanelLeft: {
    width: 14,
    backgroundColor: wood.dark,
    borderRightWidth: 1,
    borderRightColor: wood.deep,
    borderLeftWidth: 2,
    borderLeftColor: wood.light,
  },
  sidePanelRight: {
    width: 14,
    backgroundColor: wood.dark,
    borderLeftWidth: 1,
    borderLeftColor: wood.deep,
    borderRightWidth: 2,
    borderRightColor: wood.medium,
  },
  inside: {
    flex: 1,
    position: 'relative',
    backgroundColor: wood.back,
    overflow: 'hidden',
  },
  insideTopShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: wood.deep,
    zIndex: 2,
  },
  shelf: {
    position: 'absolute',
    left: 0,
    right: 0,
    minHeight: 5,
  },
  shelfPlank: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: wood.main,
    borderTopWidth: 2,
    borderTopColor: wood.highlight,
    borderBottomWidth: 1,
    borderBottomColor: wood.deep,
  },
  booksRow: {
    position: 'absolute',
    bottom: '100%',
    left: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  ruler: {
    width: 40,
    position: 'relative',
    marginLeft: spacing.sm,
    marginTop: 14,
    marginBottom: 18,
  },
  rulerMark: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rulerTick: {
    width: 6,
    height: 1,
    backgroundColor: colors.border,
  },
  rulerText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textMuted,
    marginLeft: 4,
  },
  bookcaseCaption: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
    fontSize: 11,
  },
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
