// ═══════════════════════════════════════════════════════════════
// IsometricWrapper — ErrorBoundary para los previews SVG 3D.
// Si react-native-svg no está disponible (Expo Go en algunos
// entornos) muestra un placeholder con las dimensiones.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

interface Props {
  children: React.ReactNode;
  label?: string;
}

interface State {
  hasError: boolean;
}

export default class IsometricWrapper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.placeholder}>
          <Text style={styles.icon}>🪵</Text>
          <Text style={styles.text}>
            {this.props.label ?? 'Vista 3D no disponible en Expo Go'}
          </Text>
          <Text style={styles.sub}>
            Instala un Development Build para ver la vista 3D
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  icon: { fontSize: 36, marginBottom: spacing.sm },
  text: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '600',
  },
  sub: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
