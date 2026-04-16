import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../theme';
import { WoodFilter, WoodUse, WoodHardness, WoodPrice, WoodProduct } from '../models/wood';
import { searchWood } from '../services/woodSearchService';
import { WOOD_CATEGORIES } from '../data/woodData';
import { fetchWoodCatalog } from '../services/catalogApiClient';
import CatalogImage from '../components/CatalogImage';
import { getWoodImageUrl } from '../utils/catalogImages';
import { woodIcon } from '../utils/categoryIcons';

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

const USES: { key: WoodUse | ''; label: string }[] = [
  { key: '', label: 'Todos' }, { key: 'interior', label: '🏠 Interior' }, { key: 'exterior', label: '☀️ Exterior' }, { key: 'both', label: '🔄 Ambos' },
];
const HARDNESS: { key: WoodHardness | ''; label: string }[] = [
  { key: '', label: 'Todas' }, { key: 'soft', label: 'Blanda' }, { key: 'medium', label: 'Media' }, { key: 'hard', label: 'Dura' }, { key: 'very_hard', label: 'Muy dura' },
];
const PRICES: { key: WoodPrice | ''; label: string }[] = [
  { key: '', label: 'Todos' }, { key: 'budget', label: '💰 Económico' }, { key: 'mid', label: '💰💰 Medio' }, { key: 'premium', label: '💰💰💰 Premium' },
];

const hardnessColors: Record<WoodHardness, string> = { soft: colors.success, medium: colors.warning, hard: colors.primary, very_hard: colors.danger };
const hardnessLabels: Record<WoodHardness, string> = { soft: 'Blanda', medium: 'Media', hard: 'Dura', very_hard: 'Muy dura' };
const useLabels: Record<WoodUse, string> = { interior: '🏠 Interior', exterior: '☀️ Exterior', both: '🔄 Int/Ext' };

export default function WoodCatalogScreen({ navigation, route }: Props) {
  const initialCategoryId = route.params?.categoryId ?? '';
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [use, setUse] = useState<WoodUse | ''>('');
  const [hardness, setHardness] = useState<WoodHardness | ''>('');
  const [priceLevel, setPriceLevel] = useState<WoodPrice | ''>('');
  const [remoteProducts, setRemoteProducts] = useState<WoodProduct[] | null>(null);
  const [source, setSource] = useState<'loading' | 'online' | 'offline'>('loading');

  // Intenta cargar el catalogo remoto al montar. Si falla, usa el local (fallback).
  useEffect(() => {
    let cancelled = false;
    fetchWoodCatalog().then((res) => {
      if (cancelled) return;
      if (res && Array.isArray(res.products) && res.products.length > 0) {
        setRemoteProducts(res.products as WoodProduct[]);
        setSource('online');
      } else {
        setSource('offline');
      }
    });
    return () => { cancelled = true; };
  }, []);

  const filter: WoodFilter = {
    query: query || undefined,
    categoryId: categoryId || undefined,
    use: use || undefined,
    hardness: hardness || undefined,
    priceLevel: priceLevel || undefined,
  };

  const results = useMemo(
    () => searchWood(filter, remoteProducts ?? undefined),
    [query, categoryId, use, hardness, priceLevel, remoteProducts]
  );

  const Chip = ({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) => (
    <TouchableOpacity style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
      <Text style={[typography.caption, { color: active ? colors.primary : colors.textMuted }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput style={styles.search} placeholder="Buscar madera o tablero..." placeholderTextColor={colors.textMuted} value={query} onChangeText={setQuery} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll} contentContainerStyle={styles.chipScrollContent}>
        <Chip label="Todas" active={!categoryId} onPress={() => setCategoryId('')} />
        {WOOD_CATEGORIES.map((c: { id: string; icon: string; name: string }) => (
          <Chip key={c.id} label={`${c.icon} ${c.name}`} active={categoryId === c.id} onPress={() => setCategoryId(categoryId === c.id ? '' : c.id)} />
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll} contentContainerStyle={styles.chipScrollContent}>
        {USES.map((u: { key: WoodUse | ''; label: string }) => (
          <Chip key={u.key || 'all'} label={u.label} active={use === u.key} onPress={() => setUse(use === u.key ? '' : u.key as WoodUse)} />
        ))}
        <View style={styles.divider} />
        {HARDNESS.map((h: { key: WoodHardness | ''; label: string }) => (
          <Chip key={h.key || 'all'} label={h.label} active={hardness === h.key} onPress={() => setHardness(hardness === h.key ? '' : h.key as WoodHardness)} />
        ))}
        <View style={styles.divider} />
        {PRICES.map((p: { key: WoodPrice | ''; label: string }) => (
          <Chip key={p.key || 'all'} label={p.label} active={priceLevel === p.key} onPress={() => setPriceLevel(priceLevel === p.key ? '' : p.key as WoodPrice)} />
        ))}
      </ScrollView>

      <View style={styles.resultRow}>
        <Text style={typography.caption}>{results.length} resultado{results.length !== 1 ? 's' : ''}</Text>
        <Text style={[typography.caption, { color: source === 'online' ? colors.success : source === 'offline' ? colors.textMuted : colors.textMuted }]}>
          {source === 'online' ? '🟢 datos actualizados' : source === 'offline' ? '⚪ offline' : '⏳ cargando...'}
        </Text>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item: WoodProduct) => item.id}
        contentContainerStyle={{ padding: spacing.xl, paddingTop: 0 }}
        renderItem={({ item }: { item: WoodProduct }) => (
          <TouchableOpacity style={[styles.card, shadows.sm]} activeOpacity={0.8}
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
                    <Text style={[typography.caption, { color: hardnessColors[item.hardness] }]}>{hardnessLabels[item.hardness]}</Text>
                  </View>
                </View>

                <Text style={[typography.bodySmall, { marginTop: spacing.sm }]}>{item.description}</Text>

                <View style={styles.metaRow}>
                  <Text style={[typography.caption, { color: colors.primary, fontWeight: '600' }]}>{item.priceRange}</Text>
                  <Text style={typography.caption}>{useLabels[item.use]}</Text>
                </View>

                {item.commonSizes.length > 0 && (
                  <Text style={[typography.caption, { marginTop: spacing.xs }]}>Medidas: {item.commonSizes.join(', ')}</Text>
                )}
              </View>
            </View>

            <View style={styles.prosConsRow}>
              <View style={{ flex: 1 }}>
                {item.pros.slice(0, 2).map((p, i) => <Text key={i} style={[typography.caption, { color: colors.success }]}>✓ {p}</Text>)}
              </View>
              <View style={{ flex: 1 }}>
                {item.cons.slice(0, 2).map((c, i) => <Text key={i} style={[typography.caption, { color: colors.danger }]}>✗ {c}</Text>)}
              </View>
            </View>

            <Text style={[typography.bodySmall, { marginTop: spacing.sm, fontStyle: 'italic' }]}>Ideal para: {item.bestFor}</Text>
            <Text style={[typography.caption, { color: colors.primary, marginTop: spacing.sm }]}>🛒 Buscar en Amazon →</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  search: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, fontSize: 15, color: colors.text, borderWidth: 1, borderColor: colors.border, margin: spacing.xl, marginBottom: spacing.sm },
  chipScroll: { paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  chipScrollContent: { alignItems: 'center', paddingVertical: 2 },
  chip: { height: 34, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.full, paddingHorizontal: spacing.md, marginRight: spacing.sm, borderWidth: 1, borderColor: colors.border },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
  divider: { width: 1, backgroundColor: colors.border, marginHorizontal: spacing.sm },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md },
  cardTopRow: { flexDirection: 'row', gap: spacing.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  badge: { borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md },
  prosConsRow: { flexDirection: 'row', marginTop: spacing.sm, gap: spacing.md },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: spacing.xl, marginBottom: spacing.sm },
});
