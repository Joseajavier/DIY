// ═══════════════════════════════════════════════════════════════
// FAVORITE BUTTON — botón circular con corazón que marca/desmarca
// un producto como favorito. Suscrito al store para reflejar el
// estado actual sin necesidad de prop-drilling.
// ───────────────────────────────────────────────────────────────
// Nota: Icon.tsx no expone 'heart' ni 'star', así que importamos
// Ionicons directamente aquí (sin modificar Icon.tsx).
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import {
  isFavorite,
  toggleFavorite,
  subscribeFavorites,
} from '../services/favoritesService';

type Props = {
  productId: string;
  /** Tamaño del botón (ancho = alto = size). Default 36. */
  size?: number;
  style?: ViewStyle;
};

export default function FavoriteButton({ productId, size = 36, style }: Props) {
  const [fav, setFav] = useState<boolean>(() => isFavorite(productId));

  useEffect(() => {
    // Nos re-suscribimos si cambia el productId.
    return subscribeFavorites(() => setFav(isFavorite(productId)));
  }, [productId]);

  return (
    <TouchableOpacity
      onPress={() => toggleFavorite(productId)}
      style={[
        styles.btn,
        { width: size, height: size, borderRadius: size / 2 },
        fav && styles.btnActive,
        style,
      ]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      accessibilityState={{ selected: fav }}
    >
      <Ionicons
        name={fav ? 'heart' : 'heart-outline'}
        size={Math.round(size * 0.55)}
        color={fav ? colors.danger : colors.textMuted}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    borderColor: colors.danger + '55',
    backgroundColor: colors.danger + '11',
  },
});
