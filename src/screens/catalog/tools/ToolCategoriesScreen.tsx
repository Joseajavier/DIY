// ═══════════════════════════════════════════════════════════════
// TOOL CATEGORIES SCREEN — grid de subcategorías de herramientas.
// ───────────────────────────────────────────────────────────────
// Refactorizado a CategoryCard + SectionHeader (fase 13).
// Quitado el contador redundante de "tipos" (ruido informativo).
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react';
import {
  View,
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
import { TOOL_CATEGORIES, TOOL_TYPES, TOOL_PRODUCTS } from '../../../data/toolData';
import { fetchToolCatalog } from '../../../services/catalogApiClient';
import { CategoryCard, SectionHeader, Icon } from '../../../components';
import { categoryIcon, categoryColor } from '../../../utils/categoryIcons';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ToolCategories'>;
};

type CategoryCount = {
  id: string;
  name: string;
  productCount: number;
};

export default function ToolCategoriesScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [counts, setCounts] = useState<CategoryCount[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const computeFromLocal = () => {
      const typesByCategory: Record<string, string[]> = {};
      for (const tt of TOOL_TYPES) {
        if (!typesByCategory[tt.categoryId]) typesByCategory[tt.categoryId] = [];
        typesByCategory[tt.categoryId].push(tt.id);
      }
      const productsByType: Record<string, number> = {};
      for (const p of TOOL_PRODUCTS) {
        productsByType[p.typeId] = (productsByType[p.typeId] || 0) + 1;
      }
      return TOOL_CATEGORIES.map((c) => {
        const typeIds = typesByCategory[c.id] || [];
        const productCount = typeIds.reduce(
          (acc, tid) => acc + (productsByType[tid] || 0),
          0,
        );
        return { id: c.id, name: c.name, productCount };
      });
    };

    fetchToolCatalog()
      .then((res) => {
        if (cancelled) return;
        if (res && Array.isArray(res.products) && res.products.length > 0) {
          const typesByCategory: Record<string, string[]> = {};
          for (const tt of (res.types || TOOL_TYPES) as Array<{
            id: string;
            categoryId: string;
          }>) {
            if (!typesByCategory[tt.categoryId]) typesByCategory[tt.categoryId] = [];
            typesByCategory[tt.categoryId].push(tt.id);
          }
          const productsByType: Record<string, number> = {};
          for (const p of res.products as Array<{ typeId: string }>) {
            productsByType[p.typeId] = (productsByType[p.typeId] || 0) + 1;
          }
          const remoteCats = (res.categories || TOOL_CATEGORIES) as Array<{
            id: string;
            name: string;
          }>;
          setCounts(
            remoteCats.map((c) => {
              const typeIds = typesByCategory[c.id] || [];
              const productCount = typeIds.reduce(
                (acc, tid) => acc + (productsByType[tid] || 0),
                0,
              );
              return { id: c.id, name: c.name, productCount };
            }),
          );
          setTotal(res.products.length);
        } else {
          setCounts(computeFromLocal());
          setTotal(TOOL_PRODUCTS.length);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setCounts(computeFromLocal());
        setTotal(TOOL_PRODUCTS.length);
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

        {counts.map((c) => (
          <CategoryCard
            key={c.id}
            icon={categoryIcon(c.id)}
            title={c.name}
            subtitle={pluralProduct(c.productCount)}
            accent={categoryColor(c.id)}
            onPress={() => navigation.navigate('ToolSearch', { categoryId: c.id })}
          />
        ))}

        <SectionHeader>{t('catalog.screwsAndFixings')}</SectionHeader>
        <CategoryCard
          icon="screw"
          title={t('nav.screwSelector')}
          subtitle={t('catalog.screwSelectorSub')}
          accent={colors.category.utilities}
          onPress={() => navigation.navigate('ScrewSelector')}
        />
        <CategoryCard
          icon="screw"
          title={t('nav.screwGuide')}
          subtitle={t('catalog.screwGuideSub')}
          accent={colors.category.guide}
          onPress={() => navigation.navigate('ScrewGuide')}
        />
        <CategoryCard
          icon="paint"
          title={t('nav.varnishGuide')}
          subtitle={t('catalog.varnishGuideSub')}
          accent={colors.category.guide}
          onPress={() => navigation.navigate('VarnishGuide')}
        />

        <Pressable
          style={({ pressed }) => [
            styles.allBtn,
            pressed && { opacity: 0.85 },
          ]}
          onPress={() => navigation.navigate('ToolSearch', { categoryId: undefined })}
        >
          <Icon name="search" size={18} color={colors.primary} />
          <Text style={styles.allBtnText}>{t('catalog.allTools')}</Text>
          <Icon name="forward" size={18} color={colors.primary} />
        </Pressable>
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
    marginTop: spacing.xl,
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
