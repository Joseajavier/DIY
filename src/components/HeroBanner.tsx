// ═══════════════════════════════════════════════════════════════
// HERO BANNER — banner superior para pantallas hub (Home, Library).
// ───────────────────────────────────────────────────────────────
// Diseño:
//   - Card grande con fondo primary (cobre cálido).
//   - Patrón sutil de veta vertical (líneas más oscuras al 8%).
//   - Eyebrow uppercase + titular display + subcopy opcional.
//   - CTA pill blanco opcional alineado abajo.
//
// Props:
//   eyebrow?   — micro-label arriba (p.ej. "Bienvenido")
//   title      — titular grande (display)
//   subtitle?  — descripción 1-2 líneas
//   ctaLabel?  — texto CTA pill
//   onCtaPress?— callback CTA
//   variant?   — 'primary' (cobre, default) | 'accent' (salvia)
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, radius, typography, shadows } from '../theme';
import Icon, { IconName } from './Icon';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaIcon?: IconName;
  onCtaPress?: () => void;
  variant?: 'primary' | 'accent';
};

export default function HeroBanner({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaIcon,
  onCtaPress,
  variant = 'primary',
}: Props) {
  const bg = variant === 'accent' ? colors.accent : colors.primary;
  const bgDark =
    variant === 'accent' ? colors.accentDark : colors.primaryDark;

  return (
    <View style={[styles.card, shadows.md, { backgroundColor: bg }]}>
      {/* Patrón de veta — líneas verticales decorativas muy sutiles */}
      <View pointerEvents="none" style={styles.pattern}>
        {[0, 1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={[
              styles.grain,
              {
                left: `${15 + i * 18}%`,
                backgroundColor: bgDark,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.inner}>
        {eyebrow && (
          <Text style={[typography.overline, styles.eyebrow]}>{eyebrow}</Text>
        )}
        <Text style={[typography.display, styles.title]}>{title}</Text>
        {subtitle && (
          <Text style={[typography.body, styles.subtitle]}>{subtitle}</Text>
        )}

        {ctaLabel && onCtaPress && (
          <TouchableOpacity
            style={styles.cta}
            onPress={onCtaPress}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={ctaLabel}
          >
            {ctaIcon && (
              <Icon name={ctaIcon} size={16} color={bg} />
            )}
            <Text style={[typography.button, { color: bg }]}>{ctaLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    minHeight: 180,
  },
  pattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.18,
  },
  grain: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1.5,
  },
  inner: {
    padding: spacing.xl,
    justifyContent: 'center',
    minHeight: 180,
  },
  eyebrow: {
    color: '#FFFFFF',
    opacity: 0.75,
    marginBottom: spacing.sm,
  },
  title: {
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: '#FFFFFF',
    opacity: 0.85,
    marginBottom: spacing.lg,
  },
  cta: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#FFFFFF',
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    marginTop: spacing.sm,
  },
});
