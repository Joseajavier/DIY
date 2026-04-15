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
      style={[styles.card, shadows.md, { borderLeftColor: accentColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.iconBox,
            { backgroundColor: accentColor + '1A' },
          ]}
        >
          <Icon name={iconName} size={28} color={accentColor} />
        </View>
        <View style={styles.info}>
          <Text style={[typography.h2, { color: accentColor }]}>{title}</Text>
          <Text style={[typography.bodySmall, { marginTop: 4 }]}>
            {description}
          </Text>
        </View>
      </View>
      <View style={styles.tagRow}>
        {tags.map((tag, i) => (
          <View
            key={i}
            style={[styles.tag, { backgroundColor: accentColor + '1A' }]}
          >
            <Text style={[typography.caption, { color: accentColor }]}>
              {tag}
            </Text>
          </View>
        ))}
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
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
  },
  header: { flexDirection: 'row', alignItems: 'center' },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  info: { flex: 1 },
  tagRow: { flexDirection: 'row', marginTop: spacing.md, gap: spacing.sm },
  tag: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
});
