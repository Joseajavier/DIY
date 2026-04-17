// ═══════════════════════════════════════════════════════════════
// SECTION HEADER — cabecera estándar para bloques de pantalla.
// ───────────────────────────────────────────────────────────────
// Reemplaza el patrón duplicado "sectionLabel" que existía en varias
// pantallas (Home, Utilities, Catalog…) con estilos distintos.
//
// Variantes:
//   default  — label gris uppercase tracking amplio (secciones de home)
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
      <Text style={isLabel ? styles.label : styles.plain}>{children}</Text>
      {action && <View>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  plain: {
    ...typography.h3,
    color: colors.text,
  },
});
