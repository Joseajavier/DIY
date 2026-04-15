// ═══════════════════════════════════════════════════════════════
// AMAZON DISCLAIMER — aviso legal de afiliación (Amazon Associates).
// ───────────────────────────────────────────────────────────────
// Componente reutilizable con 3 variantes visuales:
//   • compact — línea sutil con icono pequeño, para footers.
//   • card    — tarjeta completa con título + cuerpo (Settings).
//   • banner  — banda horizontal coloreada, para top/bottom.
//
// Texto requerido por el programa de afiliados de Amazon España.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';
import Icon from './Icon';

export const AMAZON_DISCLAIMER_ES =
  'Como Afiliado de Amazon, DIY obtiene ingresos por las compras adscritas que cumplen los requisitos aplicables. Los precios y la disponibilidad pueden variar.';

type Props = {
  variant?: 'compact' | 'card' | 'banner';
  style?: ViewStyle;
};

export default function AmazonDisclaimer({ variant = 'card', style }: Props) {
  if (variant === 'compact') {
    return (
      <View style={[styles.compact, style]}>
        <Icon name="info" size={12} color={colors.textMuted} />
        <Text style={styles.compactText} numberOfLines={0}>
          {AMAZON_DISCLAIMER_ES}
        </Text>
      </View>
    );
  }

  if (variant === 'banner') {
    return (
      <View style={[styles.banner, style]}>
        <Icon name="info" size={16} color={colors.primary} />
        <Text style={styles.bannerText}>{AMAZON_DISCLAIMER_ES}</Text>
      </View>
    );
  }

  // card (default)
  return (
    <View style={[styles.card, style]}>
      <View style={styles.cardHeader}>
        <Icon name="info" size={16} color={colors.primary} />
        <Text style={styles.cardTitle}>Aviso de afiliación</Text>
      </View>
      <Text style={styles.cardBody}>{AMAZON_DISCLAIMER_ES}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // ─── compact ─────────────────────────────────────────────
  compact: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  compactText: {
    ...typography.caption,
    color: colors.textMuted,
    flex: 1,
    fontSize: 10,
    lineHeight: 14,
  },

  // ─── card ────────────────────────────────────────────────
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  cardTitle: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '700',
  },
  cardBody: {
    ...typography.caption,
    color: colors.textMuted,
    lineHeight: 16,
  },

  // ─── banner ──────────────────────────────────────────────
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primaryMuted,
    borderWidth: 1,
    borderColor: colors.primary + '33',
    borderRadius: radius.md,
    padding: spacing.md,
    width: '100%',
  },
  bannerText: {
    ...typography.caption,
    color: colors.primary,
    flex: 1,
    lineHeight: 16,
  },
});
