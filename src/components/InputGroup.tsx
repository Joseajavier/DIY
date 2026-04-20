// ═══════════════════════════════════════════════════════════════
// INPUT GROUP — tarjeta con título para agrupar campos.
// ───────────────────────────────────────────────────────────────
// Sustituye al patrón "<View style={styles.card}>" suelto en los
// generadores, dando estructura visual a los parámetros del form.
// Un generador puede apilar varios (Dimensiones, Estructura, …).
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing, radius, typography, shadows } from '../theme';

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function InputGroup({ title, subtitle, children, style }: Props) {
  return (
    <View style={[styles.card, shadows.sm, style]}>
      <View style={styles.header}>
        <View style={styles.bar} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  bar: {
    width: 3,
    height: 14,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  title: {
    ...typography.label,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  body: {
    marginTop: spacing.xs,
  },
});
