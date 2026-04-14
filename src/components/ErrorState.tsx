import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography, shadows } from '../theme';

type Props = { message: string; onRetry?: () => void };

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 48, marginBottom: spacing.xl }}>⚠️</Text>
      <Text style={[typography.h2, { textAlign: 'center', marginBottom: spacing.sm }]}>Algo salio mal</Text>
      <Text style={[typography.bodySmall, { textAlign: 'center', marginBottom: spacing.xxl }]}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={[styles.button, shadows.md]} onPress={onRetry}>
          <Text style={[typography.button, { color: colors.textOnPrimary }]}>Reintentar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xxxl, backgroundColor: colors.bg },
  button: { backgroundColor: colors.primary, paddingHorizontal: spacing.xxl, paddingVertical: spacing.lg, borderRadius: radius.lg },
});
