// ═══════════════════════════════════════════════════════════════
// FRACTION CALCULATOR
// ───────────────────────────────────────────────────────────────
// Suma / resta / multiplicación / división de dos fracciones.
// Resultado siempre reducido a términos mínimos.
// Muestra también el decimal equivalente.
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

  const ops: Op[] = ['+', '−', '×', '÷'];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Calculadora de fracciones</Text>
        <Text style={styles.subtitle}>
          Suma, resta, multiplica o divide dos fracciones
        </Text>

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

        {/* Decimal */}
        <View style={[styles.card, styles.highlightCard]}>
          <Text style={styles.label}>Equivalente decimal</Text>
          <Text style={styles.bigResult}>
            {valid && !isNaN(decimal) ? decimal.toFixed(4) : '—'}
          </Text>
          {!valid && (
            <Text style={styles.errorText}>
              División entre cero. Revisa los denominadores.
            </Text>
          )}
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
  bigResult: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -1,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.danger,
    marginTop: spacing.sm,
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
