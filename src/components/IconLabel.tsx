// ═══════════════════════════════════════════════════════════════
// ICON LABEL — fila con icono + texto centrada.
// ───────────────────────────────────────────────────────────────
// Sustituye al patrón "<Text>💾 Guardar</Text>" en botones y links.
// Mantiene el alineamiento correcto (Icon NO es un Text, no puede
// ir como hijo directo de <Text>).
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle, StyleProp } from 'react-native';
import { spacing, colors } from '../theme';
import Icon, { IconName } from './Icon';

type Props = {
  icon: IconName;
  label: string;
  color?: string;
  size?: number;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  /** Alinea todo a la izquierda en vez de centrado. */
  left?: boolean;
};

export default function IconLabel({
  icon,
  label,
  color = colors.text,
  size = 18,
  textStyle,
  style,
  left = false,
}: Props) {
  return (
    <View style={[styles.row, !left && styles.center, style]}>
      <Icon name={icon} size={size} color={color} />
      <Text style={[{ color }, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  center: { justifyContent: 'center' },
});
