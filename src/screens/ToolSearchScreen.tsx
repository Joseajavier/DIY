import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, ScrollView, Linking, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../theme';
import { ToolFilter, ToolTier, ToolUse, ToolPower } from '../models/tools';
import { searchTools, getToolBrandName, getToolTypeName } from '../services/toolSearchService';
import { TOOL_CATEGORIES, TOOL_TYPES } from '../data/toolData';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'ToolSearch'> };

const TIERS: { key: ToolTier | ''; label: string }[] = [
  { key: '', label: 'Todas' }, { key: 'basic', label: '🟢 Básica' }, { key: 'mid', label: '🟡 Media' }, { key: 'pro', label: '🔴 Pro' },
];
const USES: { key: ToolUse | ''; label: string }[] = [
  { key: '', label: 'Todos' }, { key: 'home', label: '🏠 Casa' }, { key: 'workshop', label: '🔧 Taller' }, { key: 'construction', label: '🏗 Obra' },
];
const POWERS: { key: ToolPower | ''; label: string }[] = [
  { key: '', label: 'Todas' }, { key: 'battery', label: '🔋 Batería' }, { key: 'corded', label: '🔌 Cable' }, { key: 'manual', label: '✋ Manual' },
];

const tierColors = { basic: colors.success, mid: colors.warning, pro: colors.danger };
const tierLabels = { basic: 'Básica', mid: 'Media', pro: 'Profesional' };

export default function ToolSearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tier, setTier] = useState<ToolTier | ''>('');
  const [use, setUse] = useState<ToolUse | ''>('');
  const [power, setPower] = useState<ToolPower | ''>('');

  const filter: ToolFilter = {
    query: query || undefined,
    categoryId: categoryId || undefined,
    tier: tier || undefined,
    use: use || undefined,
    power: power || undefined,
  };

  const results = useMemo(() => searchTools(filter), [query, categoryId, tier, use, power]);

  const Chip = ({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) => (
    <TouchableOpacity style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
      <Text style={[typography.caption, { color: active ? colors.primary : colors.textMuted }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput style={styles.search} placeholder="Buscar herramienta..." placeholderTextColor={colors.textMuted} value={query} onChangeText={setQuery} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
        <Chip label="Todas" active={!categoryId} onPress={() => setCategoryId('')} />
        {TOOL_CATEGORIES.map(c => <Chip key={c.id} label={`${c.icon} ${c.name}`} active={categoryId === c.id} onPress={() => setCategoryId(categoryId === c.id ? '' : c.id)} />)}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
        {TIERS.map(t => <Chip key={t.key} label={t.label} active={tier === t.key} onPress={() => setTier(tier === t.key ? '' : t.key as ToolTier)} />)}
        <View style={styles.divider} />
        {USES.map(u => <Chip key={u.key} label={u.label} active={use === u.key} onPress={() => setUse(use === u.key ? '' : u.key as ToolUse)} />)}
        <View style={styles.divider} />
        {POWERS.map(p => <Chip key={p.key} label={p.label} active={power === p.key} onPress={() => setPower(power === p.key ? '' : p.key as ToolPower)} />)}
      </ScrollView>

      <Text style={[typography.caption, { marginHorizontal: spacing.xl, marginBottom: spacing.sm }]}>{results.length} resultado{results.length !== 1 ? 's' : ''}</Text>

      <FlatList
        data={results}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: spacing.xl, paddingTop: 0 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, shadows.sm]} activeOpacity={0.8}
            onPress={() => Linking.openURL(`https://www.amazon.es/s?k=${encodeURIComponent(getToolBrandName(item.brandId) + ' ' + item.model)}`)}
          >
            <View style={styles.cardRow}>
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.cardImage} resizeMode="contain" />
              ) : (
                <View style={styles.cardImagePlaceholder}>
                  <Text style={{ fontSize: 28 }}>{TOOL_CATEGORIES.find(c => TOOL_TYPES.find(t => t.id === item.typeId)?.categoryId === c.id)?.icon || '🔧'}</Text>
                </View>
              )}
              <View style={{ flex: 1 }}>
                <View style={styles.cardHeader}>
                  <Text style={[typography.h3, { flex: 1 }]}>{getToolBrandName(item.brandId)}</Text>
                  <View style={[styles.tierBadge, { backgroundColor: tierColors[item.tier] + '22' }]}>
                    <Text style={[typography.caption, { color: tierColors[item.tier] }]}>{tierLabels[item.tier]}</Text>
                  </View>
                </View>
                <Text style={[typography.bodySmall, { fontWeight: '600' }]}>{item.model}</Text>
                <Text style={[typography.caption, { marginTop: 2 }]}>{getToolTypeName(item.typeId)}</Text>
                <Text style={[typography.bodySmall, { marginTop: spacing.xs }]} numberOfLines={2}>{item.description}</Text>
                <View style={styles.cardFooter}>
                  <Text style={[typography.h3, { color: colors.primary }]}>{item.priceMin}-{item.priceMax}€</Text>
                  <View style={styles.tags}>
                    {item.power === 'battery' && <Text style={typography.caption}>🔋</Text>}
                    {item.power === 'corded' && <Text style={typography.caption}>🔌</Text>}
                    {item.use.includes('home') && <Text style={typography.caption}>🏠</Text>}
                    {item.use.includes('workshop') && <Text style={typography.caption}>🔧</Text>}
                    {item.use.includes('construction') && <Text style={typography.caption}>🏗</Text>}
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.amazonBtn} onPress={() => Linking.openURL(`https://www.amazon.es/s?k=${encodeURIComponent(getToolBrandName(item.brandId) + ' ' + item.model)}`)}>
              <Text style={[typography.buttonSmall, { color: colors.primary }]}>🛒 Ver en Amazon</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  search: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, fontSize: 15, color: colors.text, borderWidth: 1, borderColor: colors.border, margin: spacing.xl, marginBottom: spacing.sm },
  chipScroll: { paddingHorizontal: spacing.xl, marginBottom: spacing.sm, maxHeight: 40 },
  chip: { backgroundColor: colors.surface, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, marginRight: spacing.sm, borderWidth: 1, borderColor: colors.border },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
  divider: { width: 1, backgroundColor: colors.border, marginHorizontal: spacing.sm },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md },
  cardRow: { flexDirection: 'row', gap: spacing.md },
  cardImage: { width: 72, height: 72, borderRadius: radius.md, backgroundColor: colors.bgAlt },
  cardImagePlaceholder: { width: 72, height: 72, borderRadius: radius.md, backgroundColor: colors.bgAlt, justifyContent: 'center', alignItems: 'center' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  tierBadge: { borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  tags: { flexDirection: 'row', gap: spacing.sm },
  amazonBtn: { backgroundColor: colors.primaryMuted, borderRadius: radius.md, paddingVertical: spacing.sm, alignItems: 'center', marginTop: spacing.md, borderWidth: 1, borderColor: colors.primary + '33' },
});
