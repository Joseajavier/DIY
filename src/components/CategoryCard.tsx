// ═══════════════════════════════════════════════════════════════
// CATEGORY CARD — tarjeta estándar para hubs/catálogos.
// ───────────────────────────────────────────────────────────────
// Uso: Home (accesos), ToolCategories, WoodCategories, Utilities,
// GeneratorHome. Unifica el patrón icono + título + subtítulo + "›".
//
// Props:
//   icon      — IconName vectorial (Icon component)
//   title     — string principal
//   subtitle  — opcional, 1 línea
//   accent    — color del icon box (colors.category.*)
//   badge     — opcional, etiqueta a la derecha ('PRÓXIMAMENTE', '🔥', …)
//   disabled  — si true, baja opacidad y anula onPress
//   compact   — si true, layout reducido (para grids 2×N)
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
  const iconSize = compact ? 26 : 28;
  const iconBoxSize = compact ? 48 : 52;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        shadows.sm,
        compact && styles.cardCompact,
        disabled && styles.cardDisabled,
      ]}
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={0.85}
    >
      <View
        style={[
          styles.iconBox,
          { width: iconBoxSize, height: iconBoxSize, backgroundColor: accent + '1A' },
        ]}
      >
        <Icon name={icon} size={iconSize} color={accent} />
      </View>
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={compact ? 2 : 1}>
            {subtitle}
          </Text>
        )}
      </View>
      {!compact && !disabled && (
        <Icon name="forward" size={18} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  cardCompact: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardDisabled: { opacity: 0.5 },
  iconBox: {
    borderRadius: radius.md,
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
    backgroundColor: colors.textMuted + '33',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  badgeText: {
    fontSize: 9,
    color: colors.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
