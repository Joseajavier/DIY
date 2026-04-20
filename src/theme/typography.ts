import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography: Record<string, TextStyle> = {
  // Titular grande de pantalla (hero banners). Máximo peso visual.
  display: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.6,
    lineHeight: 40,
  },
  hero: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  h1: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
    lineHeight: 34,
  },
  h2: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 19,
  },
  caption: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textMuted,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Micro-label tracking amplio, para eyebrow de sección.
  overline: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  button: {
    fontSize: 16,
    fontWeight: '700',
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Tabular: dimensiones y cantidades en generators / detalles.
  numeric: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    fontVariant: ['tabular-nums'],
  },
};
