import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';

type Props = {
  message?: string;
};

export default function LoadingState({ message = 'Procesando...' }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.accent} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, backgroundColor: colors.bg },
  text: { fontSize: 16, color: colors.textSecondary, marginTop: 16 },
});
