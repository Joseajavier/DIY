// ═══════════════════════════════════════════════════════════════
// CATEGORY CARD — tarjeta estándar para hubs/catálogos.
// ───────────────────────────────────────────────────────────────
// Uso: Home (accesos), ToolCategories, WoodCategories, Utilities,
// GeneratorHome. Unifica el patrón icono + título + subtítulo + "›".
//
// Variantes:
//   • default   — fila horizontal (icono + texto + flecha) para hubs
//                 listados 1 columna.
//   • compact   — formato vertical para grids 2×N: icono dominante
//                 en bloque coloreado arriba, texto centrado debajo.
//                 Mayor presencia visual (pide foco, no "caja vacía").
//
// Props:
//   icon      — IconName vectorial (Icon component)
//   title     — string principal
//   subtitle  — opcional, 1 línea
//   accent    — color principal (colors.category.*)
//   badge     — opcional, etiqueta a la derecha ('PRÓXIMAMENTE', '🔥', …)
//   disabled  — si true, baja opacidad y anula onPress
//   compact   — si true, layout cuadrado vertical para grids
//   onPress
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, radius, typography, shadows } from '../theme';
import Icon, { IconName } from './Icon';

type Props = {
  icon: IconName;
  title: string;
  subtitle?: string;
  accent?: string;
  badge?: string;
  disabled?: boolean;
  compact?: boolean;
  onPress?: () => void;
};

export default function CategoryCard({
  icon,
  title,
  subtitle,
  accent = colors.primary,
  badge,
  disabled = false,
  compact = false,
  onPress,
}: Props) {
  if (compact) {
    // ── Layout vertical cuadrado para grid 2-columnas ─────────────
    return (
      <TouchableOpacity
        style={[
          styles.cardCompact,
          shadows.sm,
          { borderColor: accent + '40' },
          disabled && styles.cardDisabled,
        ]}
        onPress={onPress}
        disabled={disabled || !onPress}
        activeOpacity={0.85}
      >
        <View
          style={[
            styles.iconBlockCompact,
            { backgroundColor: accent + '22' },
          ]}
        >
          <Icon name={icon} size={36} color={accent} />
          {badge && (
            <View style={[styles.badgeFloat, { backgroundColor: accent }]}>
              <Text style={styles.badgeFloatText}>{badge}</Text>
            </View>
          )}
        </View>
        <View style={styles.bodyCompact}>
          <Text style={styles.titleCompact} numberOfLines={2}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitleCompact} numberOfLines={2}>
              {subtitle}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  // ── Layout horizontal clásico (hubs 1 columna) ───────────────────
  return (
    <TouchableOpacity
      style={[
        styles.card,
        shadows.sm,
        disabled && styles.cardDisabled,
      ]}
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={0.85}
    >
      <View
        style={[
          styles.iconBox,
          {
            backgroundColor: accent + '26',
            borderColor: accent + '55',
          },
        ]}
      >
        <Icon name={icon} size={28} color={accent} />
      </View>
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {badge && (
            <View style={[styles.badge, { backgroundColor: accent + '22' }]}>
              <Text style={[styles.badgeText, { color: accent }]}>{badge}</Text>
            </View>
          )}
        </View>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      {!disabled && (
        <Icon name="forward" size={18} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // ── Default (horizontal) ─────────────────────────────────────────
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardDisabled: { opacity: 0.5 },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    ...typography.h3,
    flexShrink: 1,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ── Compact (vertical, grid 2-col) ──────────────────────────────
  cardCompact: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    minHeight: 148,
  },
  iconBlockCompact: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeFloat: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  badgeFloatText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textOnPrimary,
    letterSpacing: 0.5,
  },
  bodyCompact: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  titleCompact: {
    ...typography.h3,
    fontSize: 15,
    lineHeight: 19,
  },
  subtitleCompact: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 14,
  },
});
