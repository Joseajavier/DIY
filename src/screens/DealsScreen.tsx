// ═══════════════════════════════════════════════════════════════
// DEALS SCREEN — feed real de chollos del grupo Pepper.
// ───────────────────────────────────────────────────────────────
// Fuentes: Chollometro / MyDealz / HotUKDeals / Dealabs / Pepper.it
// / Pepper.pt según el país seleccionado. Datos REALES vía RSS.
//
// UI:
//   • Selector horizontal de país arriba
//   • Lista de cards con imagen, título, precio, comercio, grados
//   • Pull-to-refresh para forzar fetch sin caché
//   • Estado vacío / cargando / offline
// ═══════════════════════════════════════════════════════════════

import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Linking,
  Image,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../theme';
import Icon from '../components/Icon';
import { Deal } from '../models/deal';
import { getDeals } from '../services/dealsService';
import { SUPPORTED_COUNTRIES } from '../data/retailers';
import {
  getCurrentCountry,
  setUserCountry,
} from '../services/locationService';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Deals'>;
};

function formatPrice(price: number, currency: 'EUR' | 'GBP'): string {
  const sym = currency === 'GBP' ? '£' : '€';
  return `${price.toFixed(2).replace('.', ',')}${sym}`;
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diffMs / 60000);
  if (m < 60) return `hace ${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `hace ${h}h`;
  const d = Math.floor(h / 24);
  return `hace ${d}d`;
}

export default function DealsScreen({ navigation }: Props) {
  const [country, setCountry] = useState<string>(getCurrentCountry());
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [source, setSource] = useState<'network' | 'cache' | 'empty'>('empty');
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);

  const load = useCallback(
    async (forceRefresh = false) => {
      if (forceRefresh) setRefreshing(true);
      else setLoading(true);
      try {
        const res = await getDeals(country, forceRefresh);
        setDeals(res.deals);
        setSource(res.source);
        setFetchedAt(res.fetchedAt);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [country],
  );

  useEffect(() => {
    load(false);
  }, [load]);

  const handleCountry = (c: string) => {
    setCountry(c);
    setUserCountry(c);
  };

  const handleOpen = (deal: Deal) => {
    Linking.openURL(deal.link).catch(() => {});
  };

  const renderItem = ({ item }: { item: Deal }) => (
    <TouchableOpacity
      style={[styles.card, shadows.sm]}
      onPress={() => handleOpen(item)}
      activeOpacity={0.85}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Icon name="shop" size={32} color={colors.textMuted} />
        </View>
      )}
      <View style={styles.cardBody}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.metaRow}>
          {item.price !== undefined && (
            <Text style={styles.price}>
              {formatPrice(item.price, item.currency)}
            </Text>
          )}
          {item.priceOriginal !== undefined &&
            item.priceOriginal > (item.price ?? 0) && (
              <Text style={styles.priceOld}>
                {formatPrice(item.priceOriginal, item.currency)}
              </Text>
            )}
          {item.discountPct !== undefined && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>−{item.discountPct}%</Text>
            </View>
          )}
        </View>
        <View style={styles.metaRow}>
          {item.merchant && (
            <View style={styles.merchantChip}>
              <Icon name="shop" size={11} color={colors.textMuted} />
              <Text style={styles.merchantText} numberOfLines={1}>
                {item.merchant}
              </Text>
            </View>
          )}
          <Text style={styles.timeText}>{timeAgo(item.publishedAt)}</Text>
        </View>
      </View>
      <Icon name="forward" size={18} color={colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.heroTitle}>🔥 Chollos</Text>
        <Text style={styles.heroSubtitle}>
          Ofertas reales de la comunidad · actualizado cada hora
        </Text>
      </View>

      {/* Selector de país */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.countryScroll}
        contentContainerStyle={styles.countryScrollContent}
      >
        {SUPPORTED_COUNTRIES.map((c) => (
          <TouchableOpacity
            key={c.code}
            style={[
              styles.countryChip,
              country === c.code && styles.countryChipActive,
            ]}
            onPress={() => handleCountry(c.code)}
          >
            <Text
              style={[
                styles.countryCode,
                country === c.code && styles.countryCodeActive,
              ]}
            >
              {c.code}
            </Text>
            <Text
              style={[
                styles.countryName,
                country === c.code && styles.countryNameActive,
              ]}
            >
              {c.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Status bar */}
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>
          {deals.length} {deals.length === 1 ? 'chollo' : 'chollos'}
        </Text>
        <Text
          style={[
            styles.statusText,
            {
              color:
                source === 'network'
                  ? colors.success
                  : source === 'cache'
                  ? colors.warning
                  : colors.textMuted,
            },
          ]}
        >
          {source === 'network'
            ? '🟢 en vivo'
            : source === 'cache'
            ? `📦 caché${fetchedAt ? ' · ' + timeAgo(new Date(fetchedAt).toISOString()) : ''}`
            : '⚪ sin datos'}
        </Text>
      </View>

      {loading && deals.length === 0 ? (
        <View style={styles.emptyCenter}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.emptyText}>Cargando chollos…</Text>
        </View>
      ) : deals.length === 0 ? (
        <View style={styles.emptyCenter}>
          <Icon name="info" size={40} color={colors.textMuted} />
          <Text style={styles.emptyText}>
            No hay chollos disponibles para este país ahora mismo.
          </Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => load(true)}
          >
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={deals}
          keyExtractor={(d: Deal) => d.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => load(true)}
              tintColor={colors.primary}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  heroTitle: { ...typography.hero, color: colors.text },
  heroSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 4,
  },
  countryScroll: {
    flexGrow: 0,
    marginTop: spacing.md,
  },
  countryScrollContent: {
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  countryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    alignItems: 'center',
    minWidth: 72,
  },
  countryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 0.5,
  },
  countryCodeActive: { color: colors.textOnPrimary },
  countryName: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 10,
  },
  countryNameActive: { color: colors.textOnPrimary + 'cc' },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  statusText: { ...typography.caption, color: colors.textMuted },
  list: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: radius.md,
    backgroundColor: colors.bgAlt,
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: { flex: 1, gap: 6 },
  title: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '700',
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  price: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '800',
  },
  priceOld: {
    ...typography.caption,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: colors.danger + '22',
    borderRadius: radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    ...typography.caption,
    color: colors.danger,
    fontWeight: '800',
    fontSize: 11,
  },
  merchantChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.bgAlt,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    maxWidth: 160,
  },
  merchantText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
  },
  timeText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
    marginLeft: 'auto',
  },
  emptyCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
  emptyText: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: spacing.sm,
    backgroundColor: colors.primaryMuted,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary + '55',
  },
  retryText: {
    ...typography.buttonSmall,
    color: colors.primary,
    fontWeight: '700',
  },
});
