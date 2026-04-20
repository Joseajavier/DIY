import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SectionList, Linking, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useScrollMemory } from '../../../hooks/useScrollMemory';
import { getBrandLogo } from '../../../assets/brands';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../../../theme';
import { ToolFilter, ToolTier, ToolUse, ToolPower, ToolProduct, ToolBrand } from '../../../models/tools';
import { searchTools, getToolBrandName, getToolTypeName } from '../../../services/toolSearchService';
import { TOOL_TYPES, TOOL_PRODUCTS, TOOL_BRANDS } from '../../../data/toolData';
import { fetchToolCatalog } from '../../../services/catalogApiClient';
import Icon, { IconName } from '../../../components/Icon';
import RetailerSheet from '../../../components/RetailerSheet';
import { categoryIcon, categoryColor } from '../../../utils/categoryIcons';
import CatalogImage from '../../../components/CatalogImage';
import { getToolImageUrl } from '../../../utils/catalogImages';
import { Deal } from '../../../models/deal';
import { getDeals, scoreDealMatch } from '../../../services/dealsService';
import { getCurrentCountry } from '../../../services/locationService';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ToolSearch'>;
  route: RouteProp<RootStackParamList, 'ToolSearch'>;
};

type ToolSection = {
  typeId: string;
  title: string;
  categoryId: string;
  data: ToolProduct[];
  isBrandGroup: boolean;
};

const TIERS: { key: ToolTier | ''; label: string; dot?: string }[] = [
  { key: '', label: 'Todas' },
  { key: 'basic', label: 'Básica', dot: colors.success },
  { key: 'mid', label: 'Media', dot: colors.warning },
  { key: 'pro', label: 'Pro', dot: colors.danger },
];
const USES: { key: ToolUse | ''; label: string }[] = [
  { key: '', label: 'Todos' },
  { key: 'home', label: 'Casa' },
  { key: 'workshop', label: 'Taller' },
  { key: 'construction', label: 'Obra' },
];
const POWERS: { key: ToolPower | ''; label: string; icon?: IconName }[] = [
  { key: '', label: 'Todas' },
  { key: 'battery', label: 'Batería', icon: 'battery' },
  { key: 'corded', label: 'Cable', icon: 'plug' },
  { key: 'manual', label: 'Manual', icon: 'hand' },
];

const tierColors: Record<ToolTier, string> = { basic: colors.success, mid: colors.warning, pro: colors.danger };
const tierLabels: Record<ToolTier, string> = { basic: 'Básica', mid: 'Media', pro: 'Profesional' };

export default function ToolSearchScreen({ navigation, route }: Props) {
  const { i18n } = useTranslation();
  const initialCategoryId = route.params?.categoryId ?? '';
  const initialQuery = route.params?.query ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [categoryId] = useState(initialCategoryId); // conservado para nav compat
  const [selectedBrand, setSelectedBrand] = useState('');
  const [tier, setTier] = useState<ToolTier | ''>('');
  const [use, setUse] = useState<ToolUse | ''>('');
  const [power, setPower] = useState<ToolPower | ''>('');
  const [sheetProduct, setSheetProduct] = useState<ToolProduct | null>(null);
  const [groupByBrand, setGroupByBrand] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [remoteProducts, setRemoteProducts] = useState<ToolProduct[] | null>(null);
  const [source, setSource] = useState<'loading' | 'online' | 'offline'>('loading');

  // Memoria de scroll: restaura la última posición al volver a la pantalla.
  // Clave específica por categoría para que cada vertical recuerde la suya.
  const scrollKey = `ToolSearch:${initialCategoryId || 'all'}`;
  const { scrollRef, onScroll } = useScrollMemory<SectionList<ToolProduct, ToolSection>>(scrollKey);

  // Carga catálogo remoto; si falla usa local (fallback)
  useEffect(() => {
    let active = true;
    fetchToolCatalog()
      .then((res) => {
        if (!active) return;
        const prods = res?.products;
        if (prods && prods.length > 0) {
          setRemoteProducts(prods as ToolProduct[]);
          setSource('online');
        } else {
          setSource('offline');
        }
      })
      .catch(() => { if (active) setSource('offline'); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      const country = getCurrentCountry();
      const res = await getDeals(country, false);
      if (active) setDeals(res.deals);
    })();
    return () => {
      active = false;
    };
  }, []);

  const filter: ToolFilter = {
    query: query || undefined,
    categoryId: categoryId || undefined,
    tier: tier || undefined,
    use: use || undefined,
    power: power || undefined,
  };

  const productPool = remoteProducts ?? TOOL_PRODUCTS;

  // Marcas que realmente tienen productos en el pool actual
  const brandsInPool = useMemo(() => {
    const ids = new Set(productPool.map((p: ToolProduct) => p.brandId));
    return TOOL_BRANDS.filter((b: ToolBrand) => ids.has(b.id));
  }, [productPool]);

  const results = useMemo(() => {
    let res = searchTools(filter, productPool);
    if (selectedBrand) res = res.filter(p => p.brandId === selectedBrand);
    return res;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, categoryId, tier, use, power, productPool, selectedBrand]);

  const dealMatchByProduct = useMemo(() => {
    const map = new Map<string, { score: number; deal: Deal }>();
    for (const p of results) {
      const brand = getToolBrandName(p.brandId);
      let best: { score: number; deal: Deal } | null = null;
      for (const d of deals) {
        const s = scoreDealMatch(d.title, brand, p.model);
        if (s >= 0.5 && (!best || s > best.score)) best = { score: s, deal: d };
      }
      if (best) map.set(p.id, best);
    }
    return map;
  }, [results, deals]);

  // Agrupar por marca solo si toggle activo Y no hay marca concreta seleccionada
  const showBrands = groupByBrand && !selectedBrand;

  // Agrupa por MARCA si toggle activo o hay categoría; por TIPO en vista general
  const sections = useMemo<ToolSection[]>(() => {
    if (showBrands) {
      // ── Vista por marca ────────────────────────────────────────
      const grouped: Record<string, ToolProduct[]> = {};
      for (const p of results) {
        if (!grouped[p.brandId]) grouped[p.brandId] = [];
        grouped[p.brandId].push(p);
      }
      return Object.entries(grouped)
        .sort((a, b) => b[1].length - a[1].length)
        .map(([brandId, data]) => ({
          typeId: brandId,
          title: getToolBrandName(brandId),
          categoryId: categoryId || '',
          data,
          isBrandGroup: true,
        }));
    }
    // ── Vista por tipo ─────────────────────────────────────────
    const grouped: Record<string, ToolProduct[]> = {};
    for (const p of results) {
      if (!grouped[p.typeId]) grouped[p.typeId] = [];
      grouped[p.typeId].push(p);
    }
    return Object.entries(grouped).map(([typeId, data]) => {
      const type = TOOL_TYPES.find((t) => t.id === typeId);
      return {
        typeId,
        title: getToolTypeName(typeId),
        categoryId: type?.categoryId ?? '',
        data,
        isBrandGroup: false,
      };
    });
  // i18n.language dep: re-renderiza títulos de tipo al cambiar idioma
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, showBrands, categoryId, i18n.language]);

  return (
    <View style={styles.container}>
      <TextInput style={styles.search} placeholder="Buscar herramienta..." placeholderTextColor={colors.textMuted} value={query} onChangeText={setQuery} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll} contentContainerStyle={styles.chipScrollContent}>
        <TouchableOpacity
          style={[styles.brandChip, !selectedBrand && styles.brandChipActive]}
          onPress={() => setSelectedBrand('')}
        >
          <Text style={[styles.brandChipText, !selectedBrand && styles.brandChipTextActive]}>Todas</Text>
        </TouchableOpacity>
        {brandsInPool.map((b: ToolBrand) => {
          const logo = getBrandLogo(b.id);
          const active = selectedBrand === b.id;
          return (
            <TouchableOpacity
              key={b.id}
              style={[styles.brandChip, active && styles.brandChipActive]}
              onPress={() => setSelectedBrand(active ? '' : b.id)}
            >
              {logo
                ? <Image source={logo} style={styles.brandChipLogo} resizeMode="contain" />
                : <Text style={[styles.brandChipText, active && styles.brandChipTextActive]}>{b.name}</Text>
              }
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.resultBar}>
        <Text style={[typography.caption, { flex: 1 }]}>
          {results.length} herramienta{results.length !== 1 ? 's' : ''}{' '}
          · {sections.length} {showBrands ? 'marca' : 'tipo'}{sections.length !== 1 ? 's' : ''}
        </Text>
        {source === 'online' && <Text style={styles.sourceBadge}>🌐</Text>}
        {source === 'offline' && <Text style={[styles.sourceBadge, { color: colors.textMuted }]}>📦</Text>}
        <View style={styles.groupToggle}>
          <TouchableOpacity
            style={[styles.groupBtn, !showBrands && styles.groupBtnActive]}
            onPress={() => setGroupByBrand(false)}
          >
            <Text style={[typography.caption, { color: !showBrands ? colors.primary : colors.textMuted }]}>Tipos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.groupBtn, showBrands && styles.groupBtnActive]}
            onPress={() => setGroupByBrand(true)}
          >
            <Text style={[typography.caption, { color: showBrands ? colors.primary : colors.textMuted }]}>Marcas</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SectionList
        ref={scrollRef}
        sections={sections}
        keyExtractor={(item: ToolProduct) => item.id}
        contentContainerStyle={{ padding: spacing.xl, paddingTop: 0 }}
        stickySectionHeadersEnabled={false}
        onScroll={onScroll}
        scrollEventThrottle={32}
        renderSectionHeader={({ section }: { section: ToolSection }) => {
          if (section.isBrandGroup) {
            // ── Cabecera de marca ──────────────────────────────
            const tiers = [...new Set(section.data.map((p: ToolProduct) => p.tier))];
            const typeNames = [...new Set(section.data.map((p: ToolProduct) => getToolTypeName(p.typeId)))];
            const logo = getBrandLogo(section.typeId);
            return (
              <View style={styles.sectionHeader}>
                {logo ? (
                  <Image source={logo} style={styles.brandLogo} resizeMode="contain" />
                ) : (
                  <View style={styles.tierDots}>
                    {(tiers as string[]).includes('basic') && <View style={[styles.tierDot, { backgroundColor: colors.success }]} />}
                    {(tiers as string[]).includes('mid') && <View style={[styles.tierDot, { backgroundColor: colors.warning }]} />}
                    {(tiers as string[]).includes('pro') && <View style={[styles.tierDot, { backgroundColor: colors.danger }]} />}
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <Text style={typography.h2}>{section.title}</Text>
                  <Text style={[typography.caption, { color: colors.textMuted }]} numberOfLines={1}>
                    {typeNames.slice(0, 3).join(' · ')}{typeNames.length > 3 ? ` +${typeNames.length - 3}` : ''}
                  </Text>
                </View>
                <View style={styles.tierDots}>
                  {(tiers as string[]).includes('basic') && <View style={[styles.tierDot, { backgroundColor: colors.success }]} />}
                  {(tiers as string[]).includes('mid') && <View style={[styles.tierDot, { backgroundColor: colors.warning }]} />}
                  {(tiers as string[]).includes('pro') && <View style={[styles.tierDot, { backgroundColor: colors.danger }]} />}
                </View>
                <Text style={typography.caption}>{section.data.length}</Text>
              </View>
            );
          }
          // ── Cabecera de tipo ───────────────────────────────────
          return (
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconBox, { backgroundColor: categoryColor(section.categoryId) + '22' }]}>
                <Icon name={categoryIcon(section.categoryId)} size={18} color={categoryColor(section.categoryId)} />
              </View>
              <Text style={[typography.h2, { flex: 1 }]}>{section.title}</Text>
              <Text style={typography.caption}>{section.data.length}</Text>
            </View>
          );
        }}
        renderItem={({ item }: { item: ToolProduct }) => (
          <TouchableOpacity style={[styles.card, shadows.sm]} activeOpacity={0.8}
            onPress={() => setSheetProduct(item)}
          >
            <View style={styles.cardRow}>
              {(() => {
                const catId =
                  TOOL_TYPES.find((t) => t.id === item.typeId)?.categoryId ?? '';
                const cColor = categoryColor(catId);
                return (
                  <CatalogImage
                    uri={getToolImageUrl(item)}
                    accentColor={cColor}
                    icon={categoryIcon(catId)}
                    badgeText={getToolBrandName(item.brandId)}
                  />
                );
              })()}
              <View style={{ flex: 1 }}>
                <View style={styles.cardHeader}>
                  <Text style={[typography.h3, { flex: 1 }]}>{getToolBrandName(item.brandId)}</Text>
                  {dealMatchByProduct.has(item.id) && (
                    <TouchableOpacity
                      style={styles.dealBadge}
                      onPress={() => {
                        const m = dealMatchByProduct.get(item.id);
                        if (m) Linking.openURL(m.deal.link);
                      }}
                    >
                      <Text style={styles.dealBadgeText}>🔥 Chollo</Text>
                    </TouchableOpacity>
                  )}
                  <View style={[styles.tierBadge, { backgroundColor: tierColors[item.tier] + '22' }]}>
                    <Text style={[typography.caption, { color: tierColors[item.tier] }]}>{tierLabels[item.tier]}</Text>
                  </View>
                </View>
                <Text style={[typography.bodySmall, { fontWeight: '600' }]}>{item.model}</Text>
                <Text style={[typography.caption, { marginTop: 2 }]}>{getToolTypeName(item.typeId)}</Text>
                <Text style={[typography.bodySmall, { marginTop: spacing.xs }]} numberOfLines={2}>{item.description}</Text>
                <View style={styles.cardFooter}>
                  <View style={styles.tags}>
                    {item.power === 'battery' && (
                      <Icon name="battery" size={14} color={colors.textMuted} />
                    )}
                    {item.power === 'corded' && (
                      <Icon name="plug" size={14} color={colors.textMuted} />
                    )}
                    {item.power === 'manual' && (
                      <Icon name="hand" size={14} color={colors.textMuted} />
                    )}
                    {item.use.includes('home') && (
                      <Icon name="home" size={14} color={colors.textMuted} />
                    )}
                    {item.use.includes('workshop') && (
                      <Icon name="wrench" size={14} color={colors.textMuted} />
                    )}
                    {item.use.includes('construction') && (
                      <Icon name="safety" size={14} color={colors.textMuted} />
                    )}
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.amazonBtn}
              onPress={() => setSheetProduct(item)}
            >
              <Icon name="shop" size={16} color={colors.primary} />
              <Text
                style={[
                  typography.buttonSmall,
                  { color: colors.primary, marginLeft: spacing.sm },
                ]}
              >
                Comprar en…
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <RetailerSheet
        visible={sheetProduct !== null}
        onClose={() => setSheetProduct(null)}
        query={
          sheetProduct
            ? `${getToolBrandName(sheetProduct.brandId)} ${sheetProduct.model}`
            : ''
        }
        productLabel={
          sheetProduct
            ? `${getToolBrandName(sheetProduct.brandId)} · ${sheetProduct.model}`
            : undefined
        }
        priceMin={sheetProduct?.priceMin}
        priceMax={sheetProduct?.priceMax}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  search: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, fontSize: 15, color: colors.text, borderWidth: 1, borderColor: colors.border, margin: spacing.xl, marginBottom: spacing.sm },
  chipScroll: { paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  chipScrollContent: { alignItems: 'center', paddingVertical: 4 },
  brandChip: {
    height: 44,
    minWidth: 72,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandChipActive: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.primaryMuted,
  },
  brandChipLogo: {
    width: 56,
    height: 24,
  },
  brandChipText: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
    textAlign: 'center',
  },
  brandChipTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  resultBar: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginHorizontal: spacing.xl, marginBottom: spacing.sm },
  sourceBadge: { ...typography.caption, color: colors.primary },
  groupToggle: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radius.full, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  groupBtn: { paddingHorizontal: spacing.md, paddingVertical: 4 },
  groupBtnActive: { backgroundColor: colors.primaryMuted },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xl, marginBottom: spacing.md, paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  sectionIconBox: { width: 32, height: 32, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  brandLogo: { width: 64, height: 28, marginRight: spacing.sm },
  tierDots: { flexDirection: 'row', gap: 4, alignItems: 'center', marginRight: spacing.sm },
  tierDot: { width: 10, height: 10, borderRadius: 5 },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md },
  cardRow: { flexDirection: 'row', gap: spacing.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  tierBadge: { borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  dealBadge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginRight: spacing.xs,
    backgroundColor: colors.danger + '22',
    borderWidth: 1,
    borderColor: colors.danger + '55',
    justifyContent: 'center',
  },
  dealBadgeText: {
    ...typography.caption,
    color: colors.danger,
    fontWeight: '700',
  },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  tags: { flexDirection: 'row', gap: spacing.sm },
  amazonBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primaryMuted, borderRadius: radius.md, paddingVertical: spacing.sm, marginTop: spacing.md, borderWidth: 1, borderColor: colors.primary + '33' },
});
