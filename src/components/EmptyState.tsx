import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

type Props = {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({ icon, title, description, actionLabel, onAction }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[typography.h2, { textAlign: 'center', marginBottom: spacing.sm }]}>{title}</Text>
      <Text style={[typography.bodySmall, { textAlign: 'center', marginBottom: spacing.xl }]}>{description}</Text>
      {actionLabel && onAction && (
        <TouchableOpacity style={styles.button} onPress={onAction}>
          <Text style={[typography.button, { color: colors.textOnPrimary }]}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxxl,
    backgroundColor: colors.bg,
  },
  icon: { fontSize: 56, marginBottom: spacing.xl },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    borderRadius: 12,
  },
});
