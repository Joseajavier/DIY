// ═══════════════════════════════════════════════════════════════
// TOOL CATEGORIES SCREEN — grid de subcategorías estilo Parkside
// ───────────────────────────────────────────────────────────────
// Landing del catálogo de herramientas. Muestra las 10 categorías
// como tarjetas grandes con icono + nombre + contador de productos.
// Tap → ToolSearch filtrado por categoryId.
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
import { colors, spacing, radius, typography } from '../theme';
import { TOOL_CATEGORIES, TOOL_TYPES, TOOL_PRODUCTS } from '../data/toolData';
import { fetchToolCatalog } from '../services/catalogApiClient';
import Icon from '../components/Icon';
import { categoryIcon, categoryColor } from '../utils/categoryIcons';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ToolCategories'>;
};

type CategoryCount = {
  id: string;
  name: string;
  /** Icono emoji del dato original (unused en UI; mantenemos por compat). */
  icon: string;
  typeCount: number;
  productCount: number;
};

export default function ToolCategoriesScreen({ navigation }: Props) {
  const [counts, setCounts] = useState<CategoryCount[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Intenta datos remotos; si fallan, usa locales.
    let cancelled = false;

    const computeFromLocal = () => {
      const typesByCategory: Record<string, string[]> = {};
      for (const t of TOOL_TYPES) {
        if (!typesByCategory[t.categoryId]) typesByCategory[t.categoryId] = [];
        typesByCategory[t.categoryId].push(t.id);
      }
      const productsByType: Record<string, number> = {};
      for (const p of TOOL_PRODUCTS) {
        productsByType[p.typeId] = (productsByType[p.typeId] || 0) + 1;
      }
      const result: CategoryCount[] = TOOL_CATEGORIES.map((c) => {
        const typeIds = typesByCategory[c.id] || [];
        const productCount = typeIds.reduce(
          (acc, tid) => acc + (productsByType[tid] || 0),
          0,
        );
        return {
          id: c.id,
          name: c.name,
          icon: c.icon,
          typeCount: typeIds.length,
          productCount,
        };
      });
      return result;
    };

    fetchToolCatalog()
      .then((res) => {
        if (cancelled) return;
        if (res && Array.isArray(res.products) && res.products.length > 0) {
          // Calcular desde remoto.
          const typesByCategory: Record<string, string[]> = {};
          for (const t of (res.types || TOOL_TYPES) as Array<{
            id: string;
            categoryId: string;
          }>) {
            if (!typesByCategory[t.categoryId]) typesByCategory[t.categoryId] = [];
            typesByCategory[t.categoryId].push(t.id);
          }
          const productsByType: Record<string, number> = {};
          for (const p of res.products as Array<{ typeId: string }>) {
            productsByType[p.typeId] = (productsByType[p.typeId] || 0) + 1;
          }
          const remoteCats = (res.categories || TOOL_CATEGORIES) as Array<{
            id: string;
            name: string;
            icon: string;
          }>;
          const result: CategoryCount[] = remoteCats.map((c) => {
            const typeIds = typesByCategory[c.id] || [];
            const productCount = typeIds.reduce(
              (acc, tid) => acc + (productsByType[tid] || 0),
              0,
            );
            return {
              id: c.id,
              name: c.name,
              icon: c.icon,
              typeCount: typeIds.length,
              productCount,
            };
          });
          setCounts(result);
          setTotal(res.products.length);
        } else {
          const local = computeFromLocal();
          setCounts(local);
          setTotal(TOOL_PRODUCTS.length);
        }
      })
      .catch(() => {
        if (cancelled) return;
        const local = computeFromLocal();
        setCounts(local);
        setTotal(TOOL_PRODUCTS.length);
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
        <Text style={styles.title}>Productos por{'\n'}subcategoría</Text>
        <Text style={styles.subtitle}>
          {total} herramientas en {counts.length} categorías
        </Text>

        <View style={styles.grid}>
          {counts.map((c) => (
            <Pressable
              key={c.id}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() =>
                navigation.navigate('ToolSearch', { categoryId: c.id })
              }
              accessibilityRole="button"
              accessibilityLabel={`${c.name}, ${c.productCount} productos`}
            >
              <View style={styles.cardTextCol}>
                <Text style={styles.cardName} numberOfLines={2}>
                  {c.name}
                </Text>
                <Text style={styles.cardMeta}>
                  {c.productCount} producto{c.productCount !== 1 ? 's' : ''}
                  {c.typeCount > 0 ? ` · ${c.typeCount} tipo${c.typeCount !== 1 ? 's' : ''}` : ''}
                </Text>
              </View>
              <View
                style={[
                  styles.cardIconCol,
                  { backgroundColor: categoryColor(c.id) + '33' },
                ]}
              >
                <Icon
                  name={categoryIcon(c.id)}
                  size={36}
                  color={categoryColor(c.id)}
                />
              </View>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.allBtn}
          onPress={() =>
            navigation.navigate('ToolSearch', { categoryId: undefined })
          }
        >
          <Text style={styles.allBtnText}>Ver todas las herramientas</Text>
          <Icon name="forward" size={18} color={TEXT_ON_DARK} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════
// ESTILOS — fondo oscuro estilo Parkside pero con la paleta del app
// ═══════════════════════════════════════════════════════════════

const DARK_BG = '#0F0E0D';
const CARD_BG = '#1E1C1A';
const CARD_BORDER = '#2B2724';
const TEXT_ON_DARK = '#F2EEE8';
const TEXT_MUTED_DARK = '#8A8178';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  title: {
    color: TEXT_ON_DARK,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: TEXT_MUTED_DARK,
    fontSize: 13,
    marginBottom: spacing.xl,
  },
  grid: {
    gap: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: spacing.xl,
    minHeight: 96,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  cardTextCol: {
    flex: 1,
    paddingRight: spacing.lg,
  },
  cardName: {
    color: TEXT_ON_DARK,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  cardMeta: {
    color: TEXT_MUTED_DARK,
    fontSize: 12,
    marginTop: 4,
  },
  cardIconCol: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
    backgroundColor: '#2A2623',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    fontSize: 40,
  },
  allBtn: {
    marginTop: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radius.full,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  allBtnText: {
    color: TEXT_ON_DARK,
    fontSize: 14,
    fontWeight: '600',
  },
});
