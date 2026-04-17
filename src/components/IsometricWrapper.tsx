// ═══════════════════════════════════════════════════════════════
// IsometricWrapper — oculta el SVG en Expo Go donde react-native-svg
// no está disponible como módulo nativo. En dev-build / release
// renderiza el componente SVG normalmente.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { colors, spacing, radius, typography } from '../theme';

// Expo Go tiene appOwnership === 'expo'. En dev-build/release es null.
const SVG_AVAILABLE = Constants.appOwnership !== 'expo';

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
    if (!SVG_AVAILABLE || this.state.hasError) {
      return <Placeholder label={this.props.label} />;
    }
    return this.props.children;
  }
}

function Placeholder({ label }: { label?: string }) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.icon}>📐</Text>
      <Text style={styles.text}>Vista 3D disponible en la app instalada</Text>
      {label ? <Text style={styles.sub}>{label}</Text> : null}
    </View>
  );
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
