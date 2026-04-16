// ═══════════════════════════════════════════════════════════════
// HardwareCard — lista visual de herrajes calculados por los
// generadores paramétricos. Reutilizable desde cualquier pantalla
// del generador. Agrupa los ítems por categoría y muestra total,
// spec y notas.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography, shadows } from '../theme';
import { HardwareItem, HardwareCategory } from '../models';

interface Props {
  items: HardwareItem[];
}

const CATEGORY_ICON: Record<HardwareCategory, string> = {
  screw: '🔩',
  nail: '📌',
  dowel: '🪵',
  hinge: '🚪',
  drawer_runner: '↔️',
  handle: '🤚',
  shelf_pin: '📍',
  bracket: '📐',
  rod: '➖',
  other: '🔧',
};

export default function HardwareCard({ items }: Props) {
  if (!items || items.length === 0) return null;

  const totalUnits = items.reduce((s, it) => s + it.quantity, 0);

  return (
    <>
      <Text style={[typography.label, styles.sectionHeading]}>
        🔩 FERRETERÍA · lista de la compra
      </Text>
      <View style={[styles.card, shadows.sm]}>
        {items.map((it, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.icon}>{CATEGORY_ICON[it.category]}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{it.name}</Text>
              <Text style={styles.spec}>{it.spec}</Text>
              {it.notes ? <Text style={styles.notes}>{it.notes}</Text> : null}
            </View>
            <Text style={styles.qty}>×{it.quantity}</Text>
          </View>
        ))}
        <Text style={styles.footer}>
          Total: {items.length} referencia{items.length === 1 ? '' : 's'} ·{' '}
          {totalUnits} unidades
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeading: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    color: colors.accent,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  icon: {
    fontSize: 22,
    width: 28,
    textAlign: 'center',
  },
  name: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600' as const,
  },
  spec: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  notes: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic' as const,
    marginTop: 2,
  },
  qty: {
    ...typography.body,
    color: colors.accent,
    fontWeight: '700' as const,
    minWidth: 52,
    textAlign: 'right',
  },
  footer: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    fontStyle: 'italic' as const,
  },
});
