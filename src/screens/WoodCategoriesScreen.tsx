// ═══════════════════════════════════════════════════════════════
// WOOD CATEGORIES SCREEN — grid de subcategorías de madera.
// ───────────────────────────────────────────────────────────────
// Usa el TEMA CLARO de la app (mismo que Home, Calculadoras, etc).
// Diferenciado a propósito de ToolCategories (que es oscuro).
//
// Estructura:
//   • Tableros (MDF, melamina, OSB, alistonado, etc)
//   • Contrachapado
//   • Madera maciza
//   • Listones y molduras
//   • Especiales (termotratada, composite, corcho…)
//
// Tap sobre una card → WoodCatalog filtrado por categoryId.
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
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../theme';
import { WOOD_CATEGORIES, WOOD_PRODUCTS } from '../data/woodData';
import { fetchWoodCatalog } from '../services/catalogApiClient';
import Icon, { IconName } from '../components/Icon';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WoodCategories'>;
};

type CategoryCount = {
  id: string;
  name: string;
  productCount: number;
};

// Iconos + colores por categoría (tema claro).
const CAT_META: Record<
  string,
  { icon: IconName; color: string; subtitle: string }
> = {
  board: {
    icon: 'board',
    color: '#B88658',
    subtitle: 'MDF · Melamina · OSB · Alistonado',
  },
  plywood: {
    icon: 'materials',
    color: '#8A5A3C',
    subtitle: 'Abedul · Okumé · Fenólico · Marino',
  },
  solid: {
    icon: 'wood',
    color: '#6B8E5A',
    subtitle: 'Pino · Roble · Haya · Nogal · Teca',
  },
  strips: {
    icon: 'ruler',
    color: '#C4804A',
    subtitle: 'Cuadrados · Rectangulares · Molduras',
  },
  special: {
    icon: 'info',
    color: '#B24A6E',
    subtitle: 'Termotratada · WPC · Corcho',
  },
};

function metaFor(id: string) {
  return (
    CAT_META[id] ?? {
      icon: 'wood' as IconName,
      color: '#8A5A3C',
      subtitle: '',
    }
  );
}

export default function WoodCategoriesScreen({ navigation }: Props) {
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
          const local = computeFromLocal();
          setCounts(local);
          setTotal(WOOD_PRODUCTS.length);
        }
      })
      .catch(() => {
        if (cancelled) return;
        const local = computeFromLocal();
        setCounts(local);
        setTotal(WOOD_PRODUCTS.length);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Maderas{'\n'}por tipo</Text>
        <Text style={styles.subtitle}>
          {total} productos en {counts.length} subcategorías
        </Text>

        <View style={styles.grid}>
          {counts.map((c) => {
            const meta = metaFor(c.id);
            return (
              <Pressable
                key={c.id}
                style={({ pressed }) => [
                  styles.card,
                  shadows.sm,
                  pressed && styles.cardPressed,
                ]}
                onPress={() =>
                  navigation.navigate('WoodCatalog', { categoryId: c.id })
                }
                accessibilityRole="button"
                accessibilityLabel={`${c.name}, ${c.productCount} productos`}
              >
                <View
                  style={[
                    styles.cardIconBox,
                    { backgroundColor: meta.color + '1A' },
                  ]}
                >
                  <Icon name={meta.icon} size={36} color={meta.color} />
                </View>
                <View style={styles.cardTextCol}>
                  <Text style={styles.cardName} numberOfLines={1}>
                    {c.name}
                  </Text>
                  <Text style={styles.cardSubtitle} numberOfLines={2}>
                    {meta.subtitle}
                  </Text>
                  <Text style={styles.cardMeta}>
                    {c.productCount} producto
                    {c.productCount !== 1 ? 's' : ''}
                  </Text>
                </View>
                <Icon name="forward" size={20} color={colors.textMuted} />
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.allBtn,
            pressed && { opacity: 0.85 },
          ]}
          onPress={() =>
            navigation.navigate('WoodCatalog', { categoryId: undefined })
          }
        >
          <Icon name="search" size={18} color={colors.primary} />
          <Text style={styles.allBtnText}>Ver todas las maderas</Text>
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
  title: {
    ...typography.hero,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  grid: {
    gap: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    minHeight: 96,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  cardIconBox: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextCol: {
    flex: 1,
  },
  cardName: {
    ...typography.h3,
    color: colors.text,
    fontWeight: '700',
  },
  cardSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cardMeta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 11,
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
