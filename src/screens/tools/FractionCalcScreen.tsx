// ═══════════════════════════════════════════════════════════════
// FRACTION CALCULATOR
// ───────────────────────────────────────────────────────────────
// Suma / resta / multiplicación / división de dos fracciones.
// Resultado siempre reducido a términos mínimos.
// Muestra también el decimal equivalente y lo sitúa sobre una
// regla de madera con marcas cada 1/16".
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

// ── Paleta de madera (roble/nogal) ────────────────────────────
const wood = {
  deep: '#3D2817',
  dark: '#5C3A1E',
  medium: '#7A4E28',
  main: '#9B6835',
  light: '#B8844A',
  highlight: '#D4A574',
  back: '#2A1810',
};

type Op = '+' | '−' | '×' | '÷';

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

function reduce(num: number, den: number): { n: number; d: number } {
  if (den === 0) return { n: NaN, d: 0 };
  const sign = den < 0 ? -1 : 1;
  num *= sign;
  den *= sign;
  const g = gcd(Math.round(num), Math.round(den));
  return { n: Math.round(num) / g, d: Math.round(den) / g };
}

function compute(
  a: number,
  b: number,
  c: number,
  d: number,
  op: Op,
): { n: number; d: number } {
  switch (op) {
    case '+':
      return reduce(a * d + c * b, b * d);
    case '−':
      return reduce(a * d - c * b, b * d);
    case '×':
      return reduce(a * c, b * d);
    case '÷':
      return reduce(a * d, b * c);
  }
}

// Fracciones comunes de carpintería (sixteenths hasta 1")
const COMMON_FRACTIONS: Array<{ label: string; value: number }> = [
  { label: '1/16', value: 1 / 16 },
  { label: '1/8', value: 1 / 8 },
  { label: '3/16', value: 3 / 16 },
  { label: '1/4', value: 1 / 4 },
  { label: '5/16', value: 5 / 16 },
  { label: '3/8', value: 3 / 8 },
  { label: '7/16', value: 7 / 16 },
  { label: '1/2', value: 1 / 2 },
  { label: '9/16', value: 9 / 16 },
  { label: '5/8', value: 5 / 8 },
  { label: '11/16', value: 11 / 16 },
  { label: '3/4', value: 3 / 4 },
  { label: '13/16', value: 13 / 16 },
  { label: '7/8', value: 7 / 8 },
  { label: '15/16', value: 15 / 16 },
  { label: '1', value: 1 },
];

export default function FractionCalcScreen() {
  const [a, setA] = useState('1');
  const [b, setB] = useState('2');
  const [c, setC] = useState('1');
  const [d, setD] = useState('4');
  const [op, setOp] = useState<Op>('+');

  const parseInt10 = (s: string) => {
    const n = parseInt(s, 10);
    return isNaN(n) ? 0 : n;
  };

  const na = parseInt10(a);
  const nb = parseInt10(b);
  const nc = parseInt10(c);
  const nd = parseInt10(d);

  const result = useMemo(() => compute(na, nb, nc, nd, op), [na, nb, nc, nd, op]);
  const valid = nb !== 0 && nd !== 0 && !(op === '÷' && nc === 0);
  const decimal = valid && result.d !== 0 ? result.n / result.d : NaN;

  // Ruler ocupa [0..1"]. Clamp del valor para dibujar la marca.
  const rulerClamped = !isNaN(decimal)
    ? Math.max(0, Math.min(1, decimal - Math.floor(decimal)))
    : 0;
  const fullUnits = !isNaN(decimal) ? Math.floor(decimal) : 0;

  const ops: Op[] = ['+', '−', '×', '÷'];

  // 16 marcas principales (cada 1/16) + borde 0 + borde 16.
  const ticks = Array.from({ length: 17 }, (_, i) => i);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <HeroBanner
          variant="accent"
          eyebrow="Calculadora"
          title="Fracciones"
          subtitle="Suma, resta, multiplica o divide dos fracciones. El resultado se reduce a términos mínimos."
        />

        <SectionHeader first>Ecuación</SectionHeader>

        {/* Ecuación */}
        <View style={styles.card}>
          <View style={styles.equation}>
            <Fraction num={a} den={b} onNum={setA} onDen={setB} />
            <View style={styles.opWrap}>
              <Text style={styles.opText}>{op}</Text>
            </View>
            <Fraction num={c} den={d} onNum={setC} onDen={setD} />
            <View style={styles.opWrap}>
              <Text style={styles.opText}>=</Text>
            </View>
            <ResultFraction n={result.n} d={result.d} valid={valid} />
          </View>

          {/* Selector operación */}
          <View style={styles.opRow}>
            {ops.map((o) => (
              <Pressable
                key={o}
                onPress={() => setOp(o)}
                style={[styles.opBtn, op === o && styles.opBtnActive]}
              >
                <Text
                  style={[
                    styles.opBtnText,
                    op === o && styles.opBtnTextActive,
                  ]}
                >
                  {o}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Resultado grande: decimal + fracción */}
        <View style={[styles.card, styles.highlightCard]}>
          <Text style={styles.label}>Resultado</Text>
          <View style={styles.resultRow}>
            <View style={styles.resultCol}>
              <Text style={styles.resultKind}>Decimal</Text>
              <Text style={styles.bigResult}>
                {valid && !isNaN(decimal) ? decimal.toFixed(4) : '—'}
              </Text>
            </View>
            <View style={styles.resultDivider} />
            <View style={styles.resultCol}>
              <Text style={styles.resultKind}>Fracción</Text>
              <Text style={styles.bigResult}>
                {valid && !isNaN(result.n)
                  ? result.d === 1
                    ? `${result.n}`
                    : `${result.n}/${result.d}`
                  : '—'}
              </Text>
            </View>
          </View>
          {!valid && (
            <Text style={styles.errorText}>
              División entre cero. Revisa los denominadores.
            </Text>
          )}
        </View>

        {/* Regla de madera con marca */}
        {valid && !isNaN(decimal) && (
          <View style={styles.card}>
            <Text style={styles.label}>Regla de 1&quot; (marcas cada 1/16&quot;)</Text>
            <View style={styles.rulerWrap}>
              <View style={styles.rulerBody}>
                <View style={styles.rulerTop} />
                <View style={styles.rulerFace}>
                  {ticks.map((i) => {
                    const isMajor = i === 0 || i === 16;
                    const isHalf = i === 8;
                    const isQuarter = i === 4 || i === 12;
                    const isEighth = i === 2 || i === 6 || i === 10 || i === 14;
                    let height = 10;
                    if (isMajor) height = 32;
                    else if (isHalf) height = 26;
                    else if (isQuarter) height = 20;
                    else if (isEighth) height = 14;
                    return (
                      <View
                        key={i}
                        style={[
                          styles.tick,
                          {
                            left: `${(i / 16) * 100}%`,
                            height,
                          },
                        ]}
                      />
                    );
                  })}
                  {/* Números 0..1 */}
                  <Text style={[styles.rulerNum, { left: '0%' }]}>0</Text>
                  <Text style={[styles.rulerNum, { left: '100%', marginLeft: -10 }]}>1</Text>

                  {/* Marcador rojo del valor actual */}
                  <View
                    style={[
                      styles.marker,
                      { left: `${rulerClamped * 100}%` },
                    ]}
                  >
                    <View style={styles.markerLine} />
                    <View style={styles.markerHead}>
                      <Text style={styles.markerText}>
                        {rulerClamped.toFixed(3)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.rulerBottom} />
              </View>
            </View>
            <Text style={styles.rulerCaption}>
              {fullUnits > 0
                ? `${fullUnits}" enteras + ${rulerClamped.toFixed(4)}" en la regla`
                : `${rulerClamped.toFixed(4)}" dentro de 1 pulgada`}
            </Text>
          </View>
        )}

        {/* Strip de fracciones comunes */}
        <View style={styles.card}>
          <Text style={styles.label}>Fracciones comunes</Text>
          <View style={styles.chipsWrap}>
            {COMMON_FRACTIONS.map((f) => {
              const active =
                !isNaN(decimal) &&
                Math.abs(rulerClamped - f.value) < 1 / 64;
              return (
                <View
                  key={f.label}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      active && styles.chipTextActive,
                    ]}
                  >
                    {f.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Reglas</Text>
          <Text style={styles.infoText}>
            • a/b + c/d = (ad + cb) / bd{'\n'}
            • a/b − c/d = (ad − cb) / bd{'\n'}
            • a/b × c/d = ac / bd{'\n'}
            • a/b ÷ c/d = ad / bc{'\n'}
            El resultado se reduce a términos mínimos con GCD.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Fraction({
  num,
  den,
  onNum,
  onDen,
}: {
  num: string;
  den: string;
  onNum: (s: string) => void;
  onDen: (s: string) => void;
}) {
  return (
    <View style={styles.fraction}>
      <TextInput
        style={styles.fracInput}
        value={num}
        onChangeText={onNum}
        keyboardType="number-pad"
      />
      <View style={styles.bar} />
      <TextInput
        style={styles.fracInput}
        value={den}
        onChangeText={onDen}
        keyboardType="number-pad"
      />
    </View>
  );
}

function ResultFraction({
  n,
  d,
  valid,
}: {
  n: number;
  d: number;
  valid: boolean;
}) {
  if (!valid || isNaN(n)) {
    return (
      <View style={styles.fraction}>
        <Text style={styles.fracResult}>—</Text>
      </View>
    );
  }
  if (d === 1) {
    return (
      <View style={styles.fraction}>
        <Text style={styles.fracResult}>{n}</Text>
      </View>
    );
  }
  return (
    <View style={styles.fraction}>
      <Text style={styles.fracResult}>{n}</Text>
      <View style={styles.bar} />
      <Text style={styles.fracResult}>{d}</Text>
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
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  equation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  fraction: {
    alignItems: 'center',
    minWidth: 56,
    paddingHorizontal: spacing.sm,
  },
  fracInput: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    minWidth: 40,
    textAlign: 'center',
    padding: 4,
  },
  bar: {
    height: 2,
    width: 44,
    backgroundColor: colors.text,
    marginVertical: 2,
  },
  fracResult: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
    minWidth: 40,
    textAlign: 'center',
  },
  opWrap: { paddingHorizontal: 2 },
  opText: { fontSize: 24, fontWeight: '700', color: colors.text },
  opRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  opBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  opBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  opBtnText: { fontSize: 20, fontWeight: '700', color: colors.text },
  opBtnTextActive: { color: colors.textOnPrimary },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  resultCol: { flex: 1, alignItems: 'center' },
  resultDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  resultKind: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bigResult: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -1,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.danger,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  // ── Regla de madera ──────────────────────────────────────────
  rulerWrap: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    paddingVertical: spacing.md,
  },
  rulerBody: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  rulerTop: {
    height: 6,
    backgroundColor: wood.light,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderTopWidth: 1,
    borderTopColor: wood.highlight,
  },
  rulerFace: {
    height: 56,
    backgroundColor: wood.main,
    position: 'relative',
    borderTopWidth: 1,
    borderTopColor: wood.highlight,
    borderBottomWidth: 1,
    borderBottomColor: wood.deep,
    paddingHorizontal: 12,
  },
  rulerBottom: {
    height: 6,
    backgroundColor: wood.dark,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomWidth: 2,
    borderBottomColor: wood.deep,
  },
  tick: {
    position: 'absolute',
    top: 0,
    width: 1.5,
    backgroundColor: wood.deep,
    marginLeft: 12,
  },
  rulerNum: {
    position: 'absolute',
    bottom: 2,
    fontSize: 11,
    fontWeight: '700',
    color: wood.deep,
    marginLeft: 12,
  },
  marker: {
    position: 'absolute',
    top: -8,
    bottom: -8,
    width: 0,
    marginLeft: 12,
    alignItems: 'center',
    zIndex: 5,
  },
  markerLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#C0392B',
  },
  markerHead: {
    position: 'absolute',
    top: -22,
    backgroundColor: '#C0392B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 48,
    alignItems: 'center',
  },
  markerText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  rulerCaption: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
    fontSize: 11,
  },
  // ── Chips ────────────────────────────────────────────────────
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceLight,
  },
  chipActive: {
    backgroundColor: wood.main,
    borderColor: wood.deep,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: '#FFFFFF',
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
