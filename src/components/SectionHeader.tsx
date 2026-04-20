// ═══════════════════════════════════════════════════════════════
// SECTION HEADER — cabecera estándar para bloques de pantalla.
// ───────────────────────────────────────────────────────────────
// Reemplaza el patrón duplicado "sectionLabel" que existía en varias
// pantallas (Home, Utilities, Catalog…) con estilos distintos.
//
// Variantes:
//   default  — label uppercase tracking amplio + filete acento izq
//              (secciones de home / hubs). Tiene "peso": se nota
//              dónde empieza una sección.
//   plain    — h3 normal, para pantallas internas (formularios)
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

type Props = {
  children: string;
  variant?: 'default' | 'plain';
  action?: React.ReactNode; // e.g. "Ver todo →"
  first?: boolean;          // sin marginTop si es la 1ª sección
};

export default function SectionHeader({
  children,
  variant = 'default',
  action,
  first = false,
}: Props) {
  const isLabel = variant === 'default';
  return (
    <View
      style={[
        styles.row,
        { marginTop: first ? 0 : isLabel ? spacing.xl : spacing.lg },
      ]}
    >
      {isLabel && <View style={styles.bar} />}
      <Text style={isLabel ? styles.label : styles.plain}>{children}</Text>
      {action && <View style={styles.action}>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  bar: {
    width: 3,
    height: 16,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  label: {
    ...typography.label,
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    flex: 1,
  },
  plain: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
  },
  action: {
    marginLeft: 'auto',
  },
});
