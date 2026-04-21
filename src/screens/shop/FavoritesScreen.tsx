// ═══════════════════════════════════════════════════════════════
// FAVORITES SCREEN — lista de herramientas marcadas como favoritas.
// ───────────────────────────────────────────────────────────────
// Lee los IDs del store (favoritesService) y los mapea contra
// TOOL_PRODUCTS. Filtra IDs huérfanos (producto ya no existe).
// Reutiliza el mismo estilo de tarjeta que ToolSearchScreen para
// mantener la coherencia visual del catálogo.
// ═══════════════════════════════════════════════════════════════

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../../theme';
import { ToolProduct, ToolTier } from '../../models/tools';
import { TOOL_PRODUCTS, TOOL_TYPES } from '../../data/toolData';
import {
  getToolBrandName,
  getToolTypeName,
} from '../../services/toolSearchService';
import { useFavorites } from '../../services/favoritesService';
import FavoriteButton from '../../components/FavoriteButton';
import Icon from '../../components/Icon';
import CatalogImage from '../../components/CatalogImage';
import RetailerSheet from '../../components/RetailerSheet';
import HeroBanner from '../../components/HeroBanner';
import { getToolImageUrl } from '../../utils/catalogImages';
import { categoryIcon, categoryColor } from '../../utils/categoryIcons';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Favorites'>;
};

const tierColors: Record<ToolTier, string> = {
  basic: colors.success,
  mid: colors.warning,
  pro: colors.danger,
};
const tierLabels: Record<ToolTier, string> = {
  basic: 'Básica',
  mid: 'Media',
  pro: 'Profesional',
};

export default function FavoritesScreen({ navigation }: Props) {
  const favoriteIds = useFavorites();
  const [sheetProduct, setSheetProduct] = useState<ToolProduct | null>(null);

  // Índice id → ToolProduct para resolución O(1) y filtrado de huérfanos.
  const productsById = useMemo(() => {
    const map = new Map<string, ToolProduct>();
    for (const p of TOOL_PRODUCTS) map.set(p.id, p);
    return map;
  }, []);

  const favoriteProducts = useMemo(() => {
    const out: ToolProduct[] = [];
    for (const id of favoriteIds) {
      const p = productsById.get(id);
      if (p) out.push(p);
    }
    return out;
  }, [favoriteIds, productsById]);

  const count = favoriteProducts.length;

  const renderItem = ({ item }: { item: ToolProduct }) => {
    const catId = TOOL_TYPES.find((t) => t.id === item.typeId)?.categoryId ?? '';
    const cColor = categoryColor(catId);
    return (
      <TouchableOpacity style={[styles.card, shadows.sm]} activeOpacity={0.85} onPress={() => setSheetProduct(item)} accessibilityRole="button" accessibilityLabel={`${getToolBrandName(item.brandId)} ${item.model}, ${item.priceMin === item.priceMax ? `${item.priceMin} euros` : `entre ${item.priceMin} y ${item.priceMax} euros`}`}>
        <View style={styles.cardRow}>
          <CatalogImage uri={getToolImageUrl(item)} accentColor={cColor} icon={categoryIcon(catId)} badgeText={getToolBrandName(item.brandId)} />
          <View style={{ flex: 1 }}>
            <View style={styles.cardHeader}>
              <Text style={[typography.h3, { flex: 1 }]} numberOfLines={1}>{getToolBrandName(item.brandId)}</Text>
              <View style={[styles.tierBadge, { backgroundColor: tierColors[item.tier] + '22' }]}>
                <Text style={[typography.caption, { color: tierColors[item.tier] }]}>{tierLabels[item.tier]}</Text>
              </View>
            </View>
            <Text style={[typography.bodySmall, { fontWeight: '600' }]}>{item.model}</Text>
            <Text style={[typography.caption, { marginTop: 2 }]}>{getToolTypeName(item.typeId)}</Text>
            <Text style={styles.priceValue}>
              {item.priceMin === item.priceMax
                ? `${item.priceMin} €`
                : `${item.priceMin}–${item.priceMax} €`}
            </Text>
            <View style={styles.cardFooter}>
              <View style={styles.tags}>
                {item.power === 'battery' && <Icon name="battery" size={14} color={colors.textMuted} />}
                {item.power === 'corded' && <Icon name="plug" size={14} color={colors.textMuted} />}
                {item.power === 'manual' && <Icon name="hand" size={14} color={colors.textMuted} />}
                {item.use.includes('home') && <Icon name="home" size={14} color={colors.textMuted} />}
                {item.use.includes('workshop') && <Icon name="wrench" size={14} color={colors.textMuted} />}
              </View>
              <Icon name="shop" size={14} color={colors.primary} />
            </View>
          </View>
          <FavoriteButton productId={item.id} style={styles.favBtn} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeroBanner
          eyebrow="Favoritos"
          title="Mis herramientas guardadas"
          subtitle={`${count} herramienta${count !== 1 ? 's' : ''} guardada${count !== 1 ? 's' : ''}`}
        />
      </View>

      {count === 0 ? (
        <View style={styles.emptyWrap}>
          <View style={styles.emptyIconBox}>
            <Icon name="heart" size={42} color={colors.danger} />
          </View>
          <Text style={[typography.h2, { textAlign: 'center' }]}>
            Aún no tienes favoritos
          </Text>
          <Text
            style={[
              typography.bodySmall,
              { textAlign: 'center', marginTop: spacing.sm },
            ]}
          >
            Toca el corazón en cualquier herramienta del catálogo para
            guardarla aquí y recibir avisos de chollos.
          </Text>
          <TouchableOpacity
            style={styles.emptyCta}
            onPress={() => navigation.navigate('ToolCategories')}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Ve al catálogo"
          >
            <Icon name="tools" size={18} color={colors.textOnPrimary} />
            <Text
              style={[
                typography.buttonSmall,
                { color: colors.textOnPrimary, marginLeft: spacing.sm },
              ]}
            >
              Ve al catálogo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.emptyCtaSecondary}
            onPress={() => navigation.navigate('Deals')}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Ver chollos del día"
          >
            <Icon name="fire" size={14} color={colors.primary} />
            <Text style={styles.emptyCtaSecondaryText}>
              O mira los chollos del día
            </Text>
            <Icon name="forward" size={12} color={colors.primary} />
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item: ToolProduct) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <RetailerSheet
        visible={sheetProduct !== null}
        onClose={() => setSheetProduct(null)}
        query={sheetProduct ? `${getToolBrandName(sheetProduct.brandId)} ${sheetProduct.model}` : ''}
        productLabel={sheetProduct ? `${getToolBrandName(sheetProduct.brandId)} · ${sheetProduct.model}` : undefined}
        priceMin={sheetProduct?.priceMin}
        priceMax={sheetProduct?.priceMax}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: 0,
  },
  listContent: {
    padding: spacing.xl,
    paddingTop: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  tierBadge: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  priceValue: { fontSize: 20, fontWeight: '800', color: colors.primary, letterSpacing: -0.3, marginTop: spacing.sm },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  tags: { flexDirection: 'row', gap: spacing.sm },
  favBtn: {
    marginLeft: spacing.xs,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  emptyIconBox: {
    width: 84,
    height: 84,
    borderRadius: radius.full,
    backgroundColor: colors.danger + '18',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },
  emptyCtaSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  emptyCtaSecondaryText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});
