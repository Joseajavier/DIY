// ═══════════════════════════════════════════════════════════════
// WOOD CATEGORIES SCREEN — grid de subcategorías de madera.
// ───────────────────────────────────────────────────────────────
// Refactorizado a CategoryCard + SectionHeader (fase 13).
// Iconos y accents por categoría vienen de CAT_META.
// Sección "Guías de madera" (WoodGuide + NominalActual) al final.
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { colors, spacing, radius, typography } from '../../../theme';
import { WOOD_CATEGORIES, WOOD_PRODUCTS } from '../../../data/woodData';
import { fetchWoodCatalog } from '../../../services/catalogApiClient';
import { CategoryCard, CategoryGrid, SectionHeader, Icon, IconName } from '../../../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WoodCategories'>;
};

type CategoryCount = {
  id: string;
  name: string;
  productCount: number;
};

// Iconos + colores por categoría (tema claro).
const CAT_META: Record<string, { icon: IconName; color: string }> = {
  board:   { icon: 'board',     color: '#B88658' },
  plywood: { icon: 'materials', color: '#8A5A3C' },
  solid:   { icon: 'wood',      color: '#6B8E5A' },
  strips:  { icon: 'ruler',     color: '#C4804A' },
  special: { icon: 'info',      color: '#B24A6E' },
};

function metaFor(id: string): { icon: IconName; color: string } {
  return CAT_META[id] ?? { icon: 'wood', color: '#8A5A3C' };
}

export default function WoodCategoriesScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [counts, setCounts] = useState<CategoryCount[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const computeFromLocal = () => {
      const byCat: Record<string, number> = {};
      for (const p of WOOD_PRODUCTS) {
        byCat[p.categoryId] = (byCat[p.categoryId] || 0) + 1;
      }
      return WOOD_CATEGORIES.map((c) => ({
        id: c.id,
        name: c.name,
        productCount: byCat[c.id] || 0,
      }));
    };

    fetchWoodCatalog()
      .then((res) => {
        if (cancelled) return;
        if (res && Array.isArray(res.products) && res.products.length > 0) {
          const byCat: Record<string, number> = {};
          for (const p of res.products as Array<{ categoryId: string }>) {
            byCat[p.categoryId] = (byCat[p.categoryId] || 0) + 1;
          }
          const remoteCats = (res.categories || WOOD_CATEGORIES) as Array<{
            id: string;
            name: string;
          }>;
          setCounts(
            remoteCats.map((c) => ({
              id: c.id,
              name: c.name,
              productCount: byCat[c.id] || 0,
            })),
          );
          setTotal(res.products.length);
        } else {
          setCounts(computeFromLocal());
          setTotal(WOOD_PRODUCTS.length);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setCounts(computeFromLocal());
        setTotal(WOOD_PRODUCTS.length);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const pluralProduct = (n: number) =>
    `${n} ${n === 1 ? t('catalog.product') : t('catalog.products')}`;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          {t('catalog.totalCount', { total, cats: counts.length })}
        </Text>

        <CategoryGrid>
          {counts.map((c) => {
            const meta = metaFor(c.id);
            return (
              <CategoryCard
                key={c.id}
                compact
                icon={meta.icon}
                title={c.name}
                subtitle={pluralProduct(c.productCount)}
                accent={meta.color}
                onPress={() => navigation.navigate('WoodCatalog', { categoryId: c.id })}
              />
            );
          })}
        </CategoryGrid>

        <Pressable
          style={({ pressed }) => [
            styles.allBtn,
            pressed && { opacity: 0.85 },
          ]}
          onPress={() => navigation.navigate('WoodCatalog', { categoryId: undefined })}
        >
          <Icon name="search" size={18} color={colors.primary} />
          <Text style={styles.allBtnText}>{t('catalog.allWood')}</Text>
          <Icon name="forward" size={18} color={colors.primary} />
        </Pressable>

        <SectionHeader>{t('catalog.woodGuides')}</SectionHeader>
        <CategoryGrid>
          <CategoryCard
            compact
            icon="tree"
            title={t('nav.woodGuide')}
            subtitle={t('catalog.woodGuideSub')}
            accent={colors.category.wood}
            onPress={() => navigation.navigate('WoodGuide')}
          />
          <CategoryCard
            compact
            icon="ruler"
            title={t('nav.nominalActual')}
            subtitle={t('catalog.nominalSub')}
            accent={colors.category.guide}
            onPress={() => navigation.navigate('NominalActual')}
          />
        </CategoryGrid>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { flex: 1 },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  allBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingVertical: spacing.lg,
    borderRadius: radius.full,
    backgroundColor: colors.primaryMuted,
    borderWidth: 1,
    borderColor: colors.primary + '55',
  },
  allBtnText: {
    ...typography.buttonSmall,
    color: colors.primary,
    fontWeight: '700',
  },
});
