// ═══════════════════════════════════════════════════════════════
// CATEGORY GRID — wrapper para grids 2-columnas de CategoryCard.
// ───────────────────────────────────────────────────────────────
// Usa `<CategoryCard compact />` como hijo. Ajusta ancho de cada
// ítem a ~48% y separación vertical uniforme. Si hay un número
// impar de ítems, el último queda en fila solo alineado izquierda.
//
// Motivo: catálogos (Tool, Wood, Utilities, LibraryHub) venían en
// lista 1-col de CategoryCards gordas → scroll muy largo. El grid
// 2-col reduce scroll ~50% y mejora la exploración visual.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../theme';

type Props = {
  children: React.ReactNode;
};

export default function CategoryGrid({ children }: Props) {
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <View style={styles.grid}>
      {items.map((child, i) => (
        <View key={i} style={styles.item}>
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '48.5%',
    marginBottom: spacing.md,
  },
});
