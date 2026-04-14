import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';

type Props = {
  children: string;
  color?: string;
};

export default function SectionTitle({ children, color }: Props) {
  return (
    <Text style={[styles.title, color ? { color } : {}]}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 14,
    marginTop: 8,
  },
});
