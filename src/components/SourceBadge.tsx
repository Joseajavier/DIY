import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';

type Props = {
  source: 'ai' | 'local';
};

export default function SourceBadge({ source }: Props) {
  return (
    <View style={[styles.badge, source === 'ai' ? styles.ai : styles.local]}>
      <Text style={styles.text}>
        {source === 'ai' ? '🤖 Generado con IA' : '📐 Cálculo local'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, marginBottom: 16 },
  ai: { backgroundColor: '#4a9fe233' },
  local: { backgroundColor: colors.accent + '33' },
  text: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
});
