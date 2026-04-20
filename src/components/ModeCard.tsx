// ═══════════════════════════════════════════════════════════════
// MODE CARD — variante DIY / PRO en la home.
// ───────────────────────────────────────────────────────────────
// Usa Icon (MaterialCommunityIcons) en lugar de emoji para que
// renderice bien en todos los dispositivos y simuladores.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography, shadows } from '../theme';
import Icon, { IconName } from './Icon';

type Props = {
  /**
   * Retrocompat: antes se pasaba un emoji string. Ahora aceptamos
   * un IconName del Icon component. Si se pasa emoji se ignora
   * y se usa el icono por defecto de la variante.
   */
  icon?: IconName | string;
  title: string;
  description: string;
  tags: string[];
  variant: 'diy' | 'pro';
  onPress: () => void;
};

const VARIANT_ICON: Record<'diy' | 'pro', IconName> = {
  diy: 'hammer',
  pro: 'ruler',
};

export default function ModeCard({
  icon,
  title,
  description,
  tags,
  variant,
  onPress,
}: Props) {
  const accentColor = variant === 'diy' ? colors.primary : colors.accent;
  // Si icon es un IconName válido lo usamos; si es emoji o undefined, default.
  const iconName: IconName =
    typeof icon === 'string' && isIconName(icon) ? icon : VARIANT_ICON[variant];

  return (
    <TouchableOpacity
      style={[styles.card, shadows.md]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Barra superior de acento — señaliza el modo */}
      <View style={[styles.topBar, { backgroundColor: accentColor }]} />

      <View style={styles.body}>
        <View style={styles.header}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: accentColor + '1A', borderColor: accentColor + '33' },
            ]}
          >
            <Icon name={iconName} size={32} color={accentColor} />
          </View>
          <View style={styles.info}>
            <Text style={[typography.h1, { color: accentColor, fontSize: 22 }]}>
              {title}
            </Text>
            <Text style={[typography.bodySmall, { marginTop: 4 }]}>
              {description}
            </Text>
          </View>
          <Icon name="forward" size={18} color={colors.textMuted} />
        </View>
        <View style={styles.tagRow}>
          {tags.map((tag, i) => (
            <View
              key={i}
              style={[styles.tag, { backgroundColor: accentColor + '14' }]}
            >
              <Text style={[typography.caption, { color: accentColor, fontWeight: '700' }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Lista mínima de nombres válidos para no romper tipado en runtime.
const VALID_ICON_NAMES = new Set<string>([
  'hammer',
  'ruler',
  'tools',
  'wood',
  'calculator',
  'steps',
  'optimize',
  'materials',
  'shop',
  'project',
]);

function isIconName(value: string): value is IconName {
  return VALID_ICON_NAMES.has(value);
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  topBar: {
    height: 4,
    width: '100%',
  },
  body: {
    padding: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  info: { flex: 1 },
  tagRow: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  tag: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 1,
  },
});
