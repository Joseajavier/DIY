// ═══════════════════════════════════════════════════════════════
// GOLDEN RATIO CALCULATOR
// ───────────────────────────────────────────────────────────────
// φ = 1.6180339887...
// Tres modos:
//   • width→height: dado el ancho, altura = ancho / φ
//   • height→width: dada la altura, ancho = altura · φ
//   • sum→parts:    dada una suma, parte mayor = T·φ/(1+φ), menor = T/(1+φ)
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
import HeroBanner from '../../components/HeroBanner';
import SectionHeader from '../../components/SectionHeader';

// ── Paleta de madera ──────────────────────────────────────────
const wood = {
  deep: '#3D2817',
  dark: '#5C3A1E',
  medium: '#7A4E28',
  main: '#9B6835',
  light: '#B8844A',
  highlight: '#D4A574',
  back: '#2A1810',
};

const PHI = 1.6180339887498949;
const INV_PHI = 1 / PHI; // 0.6180339887...

type Mode = 'widthToHeight' | 'heightToWidth' | 'sumToParts';
type Unit = 'cm' | 'in';

const REFERENCES: Array<{ name: string; w: number; h: number }> = [
  { name: 'Mesa de juego', w: 91, h: 56 },
  { name: 'Estantería', w: 180, h: 111 },
  { name: 'Frontal de cajón', w: 80, h: 49 },
  { name: 'Marco de cuadro', w: 60, h: 37 },
  { name: 'Cabecero cama', w: 160, h: 99 },
];

export default function GoldenRatioScreen() {
  const [mode, setMode] = useState<Mode>('widthToHeight');
  const [input, setInput] = useState('128');
  const [unit, setUnit] = useState<Unit>('cm');

  const total = useMemo(() => {
    const n = parseFloat(input.replace(',', '.'));
    return isNaN(n) || n <= 0 ? 0 : n;
  }, [input]);

  // Derivadas según modo
  const { width, height, big, small, primaryLabel, primaryValue } = useMemo(() => {
    if (mode === 'widthToHeight') {
      const w = total;
      const h = total * INV_PHI;
      return {
        width: w,
        height: h,
        big: w,
        small: h,
        primaryLabel: 'Altura',
        primaryValue: h,
      };
    }
    if (mode === 'heightToWidth') {
      const h = total;
      const w = total * PHI;
      return {
        width: w,
        height: h,
        big: w,
        small: h,
        primaryLabel: 'Ancho',
        primaryValue: w,
      };
    }
    // sumToParts
    const b = total * (PHI / (1 + PHI));
    const s = total * (1 / (1 + PHI));
    return {
      width: b + s,
      height: s,
      big: b,
      small: s,
      primaryLabel: 'Parte mayor',
      primaryValue: b,
    };
  }, [mode, total]);

  const modes: Array<{ key: Mode; label: string }> = [
    { key: 'widthToHeight', label: 'Ancho → Alto' },
    { key: 'heightToWidth', label: 'Alto → Ancho' },
    { key: 'sumToParts', label: 'Suma → Partes' },
  ];

  const secondaryLabel =
    mode === 'widthToHeight'
      ? 'Ancho dado'
      : mode === 'heightToWidth'
      ? 'Alto dado'
      : 'Parte menor';
  const secondaryValue =
    mode === 'widthToHeight' ? width : mode === 'heightToWidth' ? height : small;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <HeroBanner
          variant="accent"
          eyebrow="Calculadora"
          title="Proporción áurea"
          subtitle="Divide con ratio φ ≈ 1.618 para proporciones de mueble."
        />

        <SectionHeader first>Modo</SectionHeader>

        {/* Modo */}
        <View style={styles.card}>
          <View style={styles.modeRow}>
            {modes.map((m) => (
              <Pressable
                key={m.key}
                onPress={() => setMode(m.key)}
                style={[
                  styles.modeBtn,
                  mode === m.key && styles.modeBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.modeText,
                    mode === m.key && styles.modeTextActive,
                  ]}
                >
                  {m.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Input */}
        <View style={styles.card}>
          <Text style={styles.label}>
            {mode === 'widthToHeight'
              ? 'Ancho'
              : mode === 'heightToWidth'
              ? 'Alto'
              : 'Medida total'}
          </Text>
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
                <Text
                  style={[
                    styles.unitText,
                    unit === 'cm' && styles.unitTextActive,
                  ]}
                >
                  cm
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setUnit('in')}
                style={[styles.unitBtn, unit === 'in' && styles.unitBtnActive]}
              >
                <Text
                  style={[
                    styles.unitText,
                    unit === 'in' && styles.unitTextActive,
                  ]}
                >
                  in
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Resultado grande */}
        <View style={[styles.card, styles.highlightCard]}>
          <Text style={styles.label}>{primaryLabel}</Text>
          <Text style={styles.bigResult}>
            {total > 0 ? primaryValue.toFixed(2) : '—'}{' '}
            <Text style={styles.bigResultUnit}>{unit}</Text>
          </Text>
          <Text style={styles.subResult}>
            {secondaryLabel}:{' '}
            <Text style={styles.subResultStrong}>
              {total > 0 ? secondaryValue.toFixed(2) : '—'} {unit}
            </Text>
          </Text>
        </View>

        {/* Visualización: rectángulo áureo anidado */}
        {total > 0 && (
          <View style={styles.card}>
            <Text style={styles.label}>Rectángulo áureo</Text>
            <GoldenVisual />
            <Text style={styles.visCaption}>
              {width.toFixed(1)} × {height.toFixed(1)} {unit} · ratio{' '}
              {height > 0 ? (width / height).toFixed(3) : '—'}
            </Text>
          </View>
        )}

        {/* Referencias */}
        <View style={styles.card}>
          <Text style={styles.label}>Proporciones áureas comunes</Text>
          <View style={styles.refWrap}>
            {REFERENCES.map((r) => (
              <View key={r.name} style={styles.refChip}>
                <Text style={styles.refName}>{r.name}</Text>
                <Text style={styles.refDims}>
                  {r.w}×{r.h} cm
                </Text>
              </View>
            ))}
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

// ── Componente visual: rectángulo áureo con cuadrado inscrito ─
// Construimos recursivamente rectángulos anidados para sugerir
// la espiral áurea. Usamos posicionamiento absoluto dentro de un
// rectángulo de proporciones 1 : φ.
function GoldenVisual() {
  // Altura fija, ancho = φ · alto
  const H = 170;
  const W = H * PHI; // ~ 275

  return (
    <View style={styles.visWrap}>
      <View style={[styles.frame, { width: W, height: H }]}>
        {/* Cuadrado grande a la izquierda (lado = H) */}
        <View
          style={[
            styles.square,
            { left: 0, top: 0, width: H, height: H, backgroundColor: wood.main },
          ]}
        />
        {/* Rectángulo restante a la derecha (ancho = W - H) */}
        <View
          style={[
            styles.innerRect,
            {
              left: H,
              top: 0,
              width: W - H,
              height: H,
            },
          ]}
        >
          {/* Cuadrado arriba (lado = W - H) */}
          <View
            style={[
              styles.square,
              {
                left: 0,
                top: 0,
                width: W - H,
                height: W - H,
                backgroundColor: wood.medium,
              },
            ]}
          />
          {/* Rectángulo restante abajo */}
          <View
            style={[
              styles.innerRect,
              {
                left: 0,
                top: W - H,
                width: W - H,
                height: H - (W - H),
              },
            ]}
          >
            {/* Cuadrado a la derecha */}
            <View
              style={[
                styles.square,
                {
                  right: 0,
                  top: 0,
                  width: H - (W - H),
                  height: H - (W - H),
                  backgroundColor: wood.light,
                },
              ]}
            />
            {/* Rectángulo a la izquierda */}
            <View
              style={[
                styles.innerRect,
                {
                  left: 0,
                  top: 0,
                  width: (W - H) - (H - (W - H)),
                  height: H - (W - H),
                  backgroundColor: wood.highlight,
                },
              ]}
            />
          </View>
        </View>
        {/* Etiquetas */}
        <Text style={[styles.visLabel, { left: 8, top: 8 }]}>A</Text>
        <Text style={[styles.visLabel, { left: H + 4, top: 4 }]}>B</Text>
      </View>
    </View>
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
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modeRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  modeBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
  },
  modeBtnActive: {
    backgroundColor: wood.main,
    borderColor: wood.deep,
  },
  modeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  modeTextActive: {
    color: '#FFFFFF',
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
  unitText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  unitTextActive: { color: colors.textOnPrimary },
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
  subResult: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  subResultStrong: {
    fontWeight: '700',
    color: colors.text,
  },
  // ── Visualización ────────────────────────────────────────────
  visWrap: {
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  frame: {
    position: 'relative',
    backgroundColor: wood.back,
    borderWidth: 4,
    borderColor: wood.deep,
    borderTopColor: wood.highlight,
    borderLeftColor: wood.light,
    borderBottomColor: wood.deep,
    borderRightColor: wood.deep,
    borderRadius: 4,
    overflow: 'hidden',
  },
  square: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: wood.deep,
  },
  innerRect: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: wood.deep,
    backgroundColor: wood.dark,
  },
  visLabel: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  visCaption: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
    fontSize: 11,
  },
  // ── Referencias ──────────────────────────────────────────────
  refWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  refChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceLight,
  },
  refName: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
  },
  refDims: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 1,
  },
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
