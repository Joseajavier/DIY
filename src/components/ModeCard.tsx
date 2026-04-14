import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography, shadows } from '../theme';

type Props = {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  variant: 'diy' | 'pro';
  onPress: () => void;
};

export default function ModeCard({ icon, title, description, tags, variant, onPress }: Props) {
  const accentColor = variant === 'diy' ? colors.primary : colors.accent;

  return (
    <TouchableOpacity style={[styles.card, shadows.md, { borderLeftColor: accentColor }]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.info}>
          <Text style={[typography.h2, { color: accentColor }]}>{title}</Text>
          <Text style={[typography.bodySmall, { marginTop: 4 }]}>{description}</Text>
        </View>
      </View>
      <View style={styles.tagRow}>
        {tags.map((tag, i) => (
          <View key={i} style={[styles.tag, { backgroundColor: accentColor + '1A' }]}>
            <Text style={[typography.caption, { color: accentColor }]}>{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
  },
  header: { flexDirection: 'row', alignItems: 'flex-start' },
  icon: { fontSize: 36, marginRight: spacing.lg },
  info: { flex: 1 },
  tagRow: { flexDirection: 'row', marginTop: spacing.md, gap: spacing.sm },
  tag: { borderRadius: radius.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
});
