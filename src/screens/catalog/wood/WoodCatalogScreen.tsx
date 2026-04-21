// ═══════════════════════════════════════════════════════════════
// WOOD CATALOG SCREEN — búsqueda + filtros + listado de maderas.
// ───────────────────────────────────────────────────────────────
// Fase I:
//   • Reemplazadas las etiquetas con emoji (🏠☀️🔄💰🟢⚪⏳✓✗🛒)
//     por Icon + texto. Consistencia con el resto de la app.
//   • Agrupación de filtros: categorías en una fila, atributos
//     (uso + dureza + precio) en otra con separadores internos.
//   • Búsqueda en barra "píldora" con icono delante.
// ═══════════════════════════════════════════════════════════════

import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useScrollMemory } from '../../../hooks/useScrollMemory';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../../../theme';
import { WoodFilter, WoodUse, WoodHardness, WoodPrice, WoodProduct } from '../../../models/wood';
import { searchWood } from '../../../services/woodSearchService';
import { WOOD_CATEGORIES, WOOD_PRODUCTS } from '../../../data/woodData';
import { fetchWoodCatalog } from '../../../services/catalogApiClient';
import ErrorState from '../../../components/ErrorState';
import CatalogImage from '../../../components/CatalogImage';
import { getWoodImageUrl } from '../../../utils/catalogImages';
import { woodIcon } from '../../../utils/categoryIcons';
import Icon, { IconName } from '../../../components/Icon';

const WOOD_CATEGORY_COLORS: Record<string, string> = {
  board: '#C4804A',
  solid: '#8B5A3C',
  plywood: '#B38B59',
  strips: '#7A8A6A',
  special: '#5A7D9A',
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WoodCatalog'>;
  route: RouteProp<RootStackParamList, 'WoodCatalog'>;
};

const USES: { key: WoodUse | ''; label: string; icon?: IconName }[] = [
  { key: '',         label: 'Todos' },
  { key: 'interior', label: 'Interior', icon: 'home' },
  { key: 'exterior', label: 'Exterior', icon: 'tree' },
  { key: 'both',     label: 'Ambos',    icon: 'refresh' },
];
const HARDNESS: { key: WoodHardness | ''; label: string }[] = [
  { key: '',           label: 'Todas' },
  { key: 'soft',       label: 'Blanda' },
  { key: 'medium',     label: 'Media' },
  { key: 'hard',       label: 'Dura' },
  { key: 'very_hard',  label: 'Muy dura' },
];
const PRICES: { key: WoodPrice | ''; label: string; tier: 0 | 1 | 2 | 3 }[] = [
  { key: '',        label: 'Todos',    tier: 0 },
  { key: 'budget',  label: 'Económico', tier: 1 },
  { key: 'mid',     label: 'Medio',    tier: 2 },
  { key: 'premium', label: 'Premium',  tier: 3 },
];

const hardnessColors: Record<WoodHardness, string> = { soft: colors.success, medium: colors.warning, hard: colors.primary, very_hard: colors.danger };
const hardnessLabels: Record<WoodHardness, string> = { soft: 'Blanda', medium: 'Media', hard: 'Dura', very_hard: 'Muy dura' };
const useMeta: Record<WoodUse, { label: string; icon: IconName }> = {
  interior: { label: 'Interior',  icon: 'home' },
  exterior: { label: 'Exterior',  icon: 'tree' },
  both:     { label: 'Int/Ext',   icon: 'refresh' },
};

export default function WoodCatalogScreen({ navigation: _nav, route }: Props) {
  const initialCategoryId = route.params?.categoryId ?? '';
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [use, setUse] = useState<WoodUse | ''>('');
  const [hardness, setHardness] = useState<WoodHardness | ''>('');
  const [priceLevel, setPriceLevel] = useState<WoodPrice | ''>('');
  const [remoteProducts, setRemoteProducts] = useState<WoodProduct[] | null>(null);
  const [source, setSource] = useState<'loading' | 'online' | 'offline'>('loading');
  const [fetchError, setFetchError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Memoria de scroll: al volver al catálogo conservamos la posición.
  const scrollKey = `WoodCatalog:${initialCategoryId || 'all'}`;
  const { scrollRef, onScroll } = useScrollMemory<FlatList<WoodProduct>>(scrollKey);

  useEffect(() => {
    let cancelled = false;
    setSource('loading');
    setFetchError(false);
    fetchWoodCatalog().then((res) => {
      if (cancelled) return;
      if (res && Array.isArray(res.products) && res.products.length > 0) {
        setRemoteProducts(res.products as WoodProduct[]);
        setSource('online');
      } else {
        setFetchError(true);
        setSource('offline');
      }
    });
    return () => { cancelled = true; };
  }, [retryCount]);

  const handleRetry = () => setRetryCount((c: number) => c + 1);

  const filter: WoodFilter = {
    query: query || undefined,
    categoryId: categoryId || undefined,
    use: use || undefined,
    hardness: hardness || undefined,
    priceLevel: priceLevel || undefined,
  };

  // ⚠ Hooks deben ir antes de cualquier early return.
  const results = useMemo(
    () => searchWood(filter, remoteProducts ?? undefined),
    [query, categoryId, use, hardness, priceLevel, remoteProducts]
  );

  if (fetchError && WOOD_PRODUCTS.length === 0) {
    return (
      <ErrorState
        message="No se pudo cargar el catálogo de maderas y no hay datos locales disponibles."
        onRetry={handleRetry}
      />
    );
  }

  const Chip = ({
    label,
    active,
    onPress,
    icon,
    leftDot,
  }: {
    label: string;
    active: boolean;
    onPress: () => void;
    icon?: IconName;
    leftDot?: string;
  }) => (
    <TouchableOpacity style={[styles.chip, active && styles.chipActive]} onPress={onPress} activeOpacity={0.75}>
      {leftDot && <View style={[styles.dot, { backgroundColor: leftDot }]} />}
      {icon && <Icon name={icon} size={13} color={active ? colors.primary : colors.textMuted} />}
      <Text
        style={[
          typography.caption,
          { color: active ? colors.primary : colors.textMuted, fontWeight: active ? '700' : '500', marginLeft: icon || leftDot ? 4 : 0 },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const priceDots = (tier: 0 | 1 | 2 | 3) => '·'.repeat(Math.max(tier, 1));

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda en píldora */}
      <View style={styles.searchWrap}>
        <Icon name="search" size={16} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar madera o tablero..."
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Fila 1: categorías */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScroll}
        contentContainerStyle={styles.chipScrollContent}
      >
        <Chip label="Todas" active={!categoryId} onPress={() => setCategoryId('')} />
        {WOOD_CATEGORIES.map((c: { id: string; name: string }) => (
          <Chip
            key={c.id}
            label={c.name}
            active={categoryId === c.id}
            onPress={() => setCategoryId(categoryId === c.id ? '' : c.id)}
            leftDot={WOOD_CATEGORY_COLORS[c.id]}
          />
        ))}
      </ScrollView>

      {/* Fila 2: atributos (uso + dureza + precio) con separadores */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScroll}
        contentContainerStyle={styles.chipScrollContent}
      >
        {USES.map((u) => (
          <Chip
            key={u.key || 'all-use'}
            label={u.label}
            active={use === u.key}
            onPress={() => setUse(use === u.key ? '' : (u.key as WoodUse))}
            icon={u.icon}
          />
        ))}
        <View style={styles.divider} />
        {HARDNESS.map((h) => (
          <Chip
            key={h.key || 'all-hard'}
            label={h.label}
            active={hardness === h.key}
            onPress={() => setHardness(hardness === h.key ? '' : (h.key as WoodHardness))}
          />
        ))}
        <View style={styles.divider} />
        {PRICES.map((p) => (
          <Chip
            key={p.key || 'all-price'}
            label={p.tier > 0 ? `${p.label} ${priceDots(p.tier)}` : p.label}
            active={priceLevel === p.key}
            onPress={() => setPriceLevel(priceLevel === p.key ? '' : (p.key as WoodPrice))}
          />
        ))}
      </ScrollView>

      {/* Barra de resultados + estado de la fuente */}
      <View style={styles.resultRow}>
        <Text style={typography.caption}>
          {results.length} resultado{results.length !== 1 ? 's' : ''}
        </Text>
        <View style={styles.sourceBadge}>
          {source === 'online' && (
            <>
              <Icon name="check" size={12} color={colors.success} />
              <Text style={[typography.caption, { color: colors.success, marginLeft: 4 }]}>Actualizado</Text>
            </>
          )}
          {source === 'offline' && (
            <>
              <Icon name="folder" size={12} color={colors.textMuted} />
              <Text style={[typography.caption, { color: colors.textMuted, marginLeft: 4 }]}>Offline</Text>
            </>
          )}
          {source === 'loading' && (
            <>
              <Icon name="time" size={12} color={colors.textMuted} />
              <Text style={[typography.caption, { color: colors.textMuted, marginLeft: 4 }]}>Cargando…</Text>
            </>
          )}
        </View>
      </View>

      <FlatList
        ref={scrollRef}
        data={results}
        keyExtractor={(item: WoodProduct) => item.id}
        contentContainerStyle={{ padding: spacing.xl, paddingTop: 0 }}
        onScroll={onScroll}
        scrollEventThrottle={32}
        renderItem={({ item }: { item: WoodProduct }) => {
          const uMeta = useMeta[item.use];
          return (
            <TouchableOpacity
              style={[styles.card, shadows.sm]}
              activeOpacity={0.8}
              onPress={() => Linking.openURL(`https://www.amazon.es/s?k=${encodeURIComponent(item.name + ' madera')}`)}
            >
              <View style={styles.cardTopRow}>
                <CatalogImage
                  uri={getWoodImageUrl(item)}
                  accentColor={WOOD_CATEGORY_COLORS[item.categoryId] ?? colors.primary}
                  icon={woodIcon(item.categoryId)}
                  badgeText={item.name}
                />
                <View style={{ flex: 1 }}>
                  <View style={styles.cardHeader}>
                    <Text style={[typography.h3, { flex: 1 }]}>{item.name}</Text>
                    <View style={[styles.badge, { backgroundColor: hardnessColors[item.hardness] + '22' }]}>
                      <Text style={[typography.caption, { color: hardnessColors[item.hardness], fontWeight: '700' }]}>
                        {hardnessLabels[item.hardness]}
                      </Text>
                    </View>
                  </View>

                  <Text style={[typography.bodySmall, { marginTop: spacing.sm }]}>{item.description}</Text>

                  <View style={styles.priceRow}>
                    <Text style={styles.priceValue}>{item.priceRange}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <View style={styles.useInline}>
                      <Icon name={uMeta.icon} size={12} color={colors.textMuted} />
                      <Text style={[typography.caption, { marginLeft: 4 }]}>{uMeta.label}</Text>
                    </View>
                  </View>

                  {item.commonSizes.length > 0 && (
                    <Text style={[typography.caption, { marginTop: spacing.xs }]}>Medidas: {item.commonSizes.join(', ')}</Text>
                  )}
                </View>
              </View>

              <View style={styles.prosConsRow}>
                <View style={{ flex: 1 }}>
                  {item.pros.slice(0, 2).map((p, i) => (
                    <View key={i} style={styles.prosLine}>
                      <Icon name="check" size={12} color={colors.success} />
                      <Text style={[typography.caption, { color: colors.success, marginLeft: 4, flex: 1 }]}>{p}</Text>
                    </View>
                  ))}
                </View>
                <View style={{ flex: 1 }}>
                  {item.cons.slice(0, 2).map((c, i) => (
                    <View key={i} style={styles.prosLine}>
                      <Icon name="close" size={12} color={colors.danger} />
                      <Text style={[typography.caption, { color: colors.danger, marginLeft: 4, flex: 1 }]}>{c}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <Text style={[typography.bodySmall, { marginTop: spacing.sm, fontStyle: 'italic' }]}>Ideal para: {item.bestFor}</Text>
              <View style={styles.searchOnAmazon}>
                <Icon name="shop" size={16} color={colors.textOnPrimary} />
                <Text style={styles.searchOnAmazonText}>Buscar en Amazon</Text>
                <Icon name="forward" size={14} color={colors.textOnPrimary} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    margin: spacing.xl,
    marginBottom: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    paddingVertical: 6,
  },
  chipScroll: { paddingHorizontal: spacing.xl, marginBottom: spacing.sm },
  chipScrollContent: { alignItems: 'center', paddingVertical: 2 },
  chip: {
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
  dot: { width: 8, height: 8, borderRadius: 4 },
  divider: { width: 1, height: 20, backgroundColor: colors.border, marginHorizontal: spacing.sm, alignSelf: 'center' },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md },
  cardTopRow: { flexDirection: 'row', gap: spacing.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  badge: { borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: spacing.sm },
  priceValue: { fontSize: 20, fontWeight: '800', color: colors.primary, letterSpacing: -0.3 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xs },
  useInline: { flexDirection: 'row', alignItems: 'center' },
  prosConsRow: { flexDirection: 'row', marginTop: spacing.sm, gap: spacing.md },
  prosLine: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 2 },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: spacing.xl, marginBottom: spacing.sm },
  sourceBadge: { flexDirection: 'row', alignItems: 'center' },
  searchOnAmazon: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: spacing.md, marginTop: spacing.md },
  searchOnAmazonText: { ...typography.button, color: colors.textOnPrimary, fontWeight: '700' },
});
