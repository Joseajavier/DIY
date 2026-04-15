import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, ScrollView, Linking, Image, SectionList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../theme';
import { ToolFilter, ToolTier, ToolUse, ToolPower, ToolProduct } from '../models/tools';
import { searchTools, getToolBrandName, getToolTypeName } from '../services/toolSearchService';
import { TOOL_CATEGORIES, TOOL_TYPES } from '../data/toolData';
import { fetchToolCatalog } from '../services/catalogApiClient';
import Icon, { IconName } from '../components/Icon';
import RetailerSheet from '../components/RetailerSheet';
import { categoryIcon, categoryColor } from '../utils/categoryIcons';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ToolSearch'>;
  route: RouteProp<RootStackParamList, 'ToolSearch'>;
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
  const initialCategoryId = route.params?.categoryId ?? '';
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [tier, setTier] = useState<ToolTier | ''>('');
  const [use, setUse] = useState<ToolUse | ''>('');
  const [power, setPower] = useState<ToolPower | ''>('');
  const [sheetProduct, setSheetProduct] = useState<ToolProduct | null>(null);

  const filter: ToolFilter = {
    query: query || undefined,
    categoryId: categoryId || undefined,
    tier: tier || undefined,
    use: use || undefined,
    power: power || undefined,
  };

  const results = useMemo(() => searchTools(filter), [query, categoryId, tier, use, power]);

  // Group results by type for sections
  const sections = useMemo(() => {
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
      };
    });
  }, [results]);

  const Chip = ({
    label,
    active,
    onPress,
    leftDot,
    leftIcon,
  }: {
    label: string;
    active: boolean;
    onPress: () => void;
    leftDot?: string;
    leftIcon?: IconName;
  }) => (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
    >
      {leftDot && (
        <View style={[styles.chipDot, { backgroundColor: leftDot }]} />
      )}
      {leftIcon && (
        <Icon
          name={leftIcon}
          size={14}
          color={active ? colors.primary : colors.textMuted}
        />
      )}
      <Text
        style={[
          typography.caption,
          { color: active ? colors.primary : colors.textMuted },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput style={styles.search} placeholder="Buscar herramienta..." placeholderTextColor={colors.textMuted} value={query} onChangeText={setQuery} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
        <Chip label="Todas" active={!categoryId} onPress={() => setCategoryId('')} />
        {TOOL_CATEGORIES.map((c: { id: string; name: string }) => (
          <Chip
            key={c.id}
            label={c.name}
            leftIcon={categoryIcon(c.id)}
            active={categoryId === c.id}
            onPress={() => setCategoryId(categoryId === c.id ? '' : c.id)}
          />
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
        {TIERS.map((t) => (
          <Chip
            key={t.key || 'all'}
            label={t.label}
            leftDot={t.dot}
            active={tier === t.key}
            onPress={() => setTier(tier === t.key ? '' : (t.key as ToolTier))}
          />
        ))}
        <View style={styles.divider} />
        {USES.map((u) => (
          <Chip
            key={u.key || 'all'}
            label={u.label}
            active={use === u.key}
            onPress={() => setUse(use === u.key ? '' : (u.key as ToolUse))}
          />
        ))}
        <View style={styles.divider} />
        {POWERS.map((p) => (
          <Chip
            key={p.key || 'all'}
            label={p.label}
            leftIcon={p.icon}
            active={power === p.key}
            onPress={() => setPower(power === p.key ? '' : (p.key as ToolPower))}
          />
        ))}
      </ScrollView>

      <Text style={[typography.caption, { marginHorizontal: spacing.xl, marginBottom: spacing.sm }]}>{results.length} herramienta{results.length !== 1 ? 's' : ''} en {sections.length} categoría{sections.length !== 1 ? 's' : ''}</Text>

      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: spacing.xl, paddingTop: 0 }}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <View
              style={[
                styles.sectionIconBox,
                { backgroundColor: categoryColor(section.categoryId) + '22' },
              ]}
            >
              <Icon
                name={categoryIcon(section.categoryId)}
                size={18}
                color={categoryColor(section.categoryId)}
              />
            </View>
            <Text style={[typography.h2, { flex: 1 }]}>{section.title}</Text>
            <Text style={typography.caption}>{section.data.length}</Text>
          </View>
        )}
        renderItem={({ item }: { item: ToolProduct }) => (
          <TouchableOpacity style={[styles.card, shadows.sm]} activeOpacity={0.8}
            onPress={() => setSheetProduct(item)}
          >
            <View style={styles.cardRow}>
              {(() => {
                const catId =
                  TOOL_TYPES.find((t) => t.id === item.typeId)?.categoryId ?? '';
                const powerIcon: IconName =
                  item.power === 'battery'
                    ? 'battery'
                    : item.power === 'corded'
                    ? 'plug'
                    : 'hand';
                return (
                  <View
                    style={[
                      styles.cardImagePlaceholder,
                      { backgroundColor: categoryColor(catId) + '1F' },
                    ]}
                  >
                    <Icon
                      name={categoryIcon(catId)}
                      size={30}
                      color={categoryColor(catId)}
                    />
                    <Icon name={powerIcon} size={12} color={colors.textMuted} />
                  </View>
                );
              })()}
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
                  <Text style={[typography.h3, { color: colors.primary }]}>
                    {item.priceMin}-{item.priceMax}€
                  </Text>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  search: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, fontSize: 15, color: colors.text, borderWidth: 1, borderColor: colors.border, margin: spacing.xl, marginBottom: spacing.sm },
  chipScroll: { paddingHorizontal: spacing.xl, marginBottom: spacing.sm, maxHeight: 40 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
  chipDot: { width: 8, height: 8, borderRadius: 4 },
  divider: { width: 1, backgroundColor: colors.border, marginHorizontal: spacing.sm },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xl, marginBottom: spacing.md, paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  sectionIconBox: { width: 32, height: 32, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md },
  cardRow: { flexDirection: 'row', gap: spacing.md },
  cardImage: { width: 72, height: 72, borderRadius: radius.md, backgroundColor: colors.bgAlt },
  cardImagePlaceholder: { width: 72, height: 72, borderRadius: radius.md, backgroundColor: colors.bgAlt, justifyContent: 'center', alignItems: 'center' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  tierBadge: { borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  tags: { flexDirection: 'row', gap: spacing.sm },
  amazonBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primaryMuted, borderRadius: radius.md, paddingVertical: spacing.sm, marginTop: spacing.md, borderWidth: 1, borderColor: colors.primary + '33' },
});
