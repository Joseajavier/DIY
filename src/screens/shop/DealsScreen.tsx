// ═══════════════════════════════════════════════════════════════
// DEALS SCREEN — feed real de chollos del grupo Pepper.
// ───────────────────────────────────────────────────────────────
// Fuentes: Chollometro / MyDealz / HotUKDeals / Dealabs / Pepper.it
// / Pepper.pt según el país DETECTADO POR GPS. Datos REALES vía RSS.
//
// UI:
//   • Pill con el país detectado (no editable — se hace por GPS)
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
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../../theme';
import Icon from '../../components/Icon';
import HeroBanner from '../../components/HeroBanner';
import { Deal } from '../../models/deal';
import { getDeals } from '../../services/dealsService';
import { SUPPORTED_COUNTRIES } from '../../data/retailers';
import {
  getCurrentCountry,
  refreshCountry,
} from '../../services/locationService';

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

export default function DealsScreen({ navigation: _navigation }: Props) {
  const [country, setCountry] = useState<string>(getCurrentCountry());
  const [detectingCountry, setDetectingCountry] = useState<boolean>(true);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [source, setSource] = useState<'network' | 'cache' | 'empty'>('empty');
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);

  const load = useCallback(
    async (forceRefresh = false, countryCode = country) => {
      if (forceRefresh) setRefreshing(true);
      else setLoading(true);
      try {
        const res = await getDeals(countryCode, forceRefresh);
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

  // Detección GPS al montar: pide permiso, reverseGeocode y dispara fetch.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const detected = await refreshCountry();
        if (cancelled) return;
        setCountry(detected);
        await load(false, detected);
      } finally {
        if (!cancelled) setDetectingCountry(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = (deal: Deal) => {
    Linking.openURL(deal.link).catch(() => {});
  };

  const renderItem = ({ item }: { item: Deal }) => (
    <TouchableOpacity
      style={[styles.card, shadows.sm]}
      onPress={() => handleOpen(item)}
      activeOpacity={0.85}
      accessibilityRole="link"
      accessibilityLabel={`Oferta: ${item.title}${item.price !== undefined ? `, ${formatPrice(item.price, item.currency)}` : ''}${item.discountPct !== undefined ? `, ${item.discountPct}% de descuento` : ''}`}
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
        <HeroBanner
          eyebrow="Chollos"
          title="Ofertas del día"
          subtitle="Ofertas reales de la comunidad · actualizado cada hora"
        />
      </View>

      {/* País detectado por GPS — no editable */}
      <View style={styles.countryPillWrap}>
        <View style={styles.countryPill}>
          {detectingCountry ? (
            <>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.countryPillText}>Detectando ubicación…</Text>
            </>
          ) : (
            <>
              <Icon name="info" size={14} color={colors.primary} />
              <Text style={styles.countryPillText}>
                País detectado:{' '}
                <Text style={styles.countryPillCode}>{country}</Text>
                {' · '}
                {SUPPORTED_COUNTRIES.find((c) => c.code === country)?.name ?? ''}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Status bar */}
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>
          {deals.length} {deals.length === 1 ? 'chollo' : 'chollos'}
        </Text>
        <View style={styles.statusSource}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  source === 'network'
                    ? colors.success
                    : source === 'cache'
                    ? colors.warning
                    : colors.textMuted,
              },
            ]}
          />
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
              ? 'en vivo'
              : source === 'cache'
              ? `caché${fetchedAt ? ' · ' + timeAgo(new Date(fetchedAt).toISOString()) : ''}`
              : 'sin datos'}
          </Text>
        </View>
      </View>

      {(loading || detectingCountry) && deals.length === 0 ? (
        <View style={styles.emptyCenter}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.emptyText}>
            {detectingCountry
              ? 'Detectando tu ubicación…'
              : 'Cargando chollos…'}
          </Text>
        </View>
      ) : deals.length === 0 ? (
        <View style={styles.emptyCenter}>
          <View style={styles.emptyIconBox}>
            <Icon name="shop" size={40} color={colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>
            {source === 'empty'
              ? 'No hay chollos ahora mismo'
              : 'Sin conexión'}
          </Text>
          <Text style={styles.emptyText}>
            {source === 'empty'
              ? `La comunidad aún no ha publicado ofertas para ${country}. Vuelve más tarde o tira de pull-to-refresh.`
              : 'No hemos podido cargar las ofertas. Comprueba tu conexión e inténtalo de nuevo.'}
          </Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => load(true)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Reintentar"
          >
            <Icon name="forward" size={14} color={colors.primary} />
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
  countryPillWrap: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.md,
    alignItems: 'flex-start',
  },
  countryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.primaryMuted,
    borderWidth: 1,
    borderColor: colors.primary + '55',
  },
  countryPillText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  countryPillCode: {
    color: colors.primary,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  statusText: { ...typography.caption, color: colors.textMuted },
  statusSource: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
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
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  priceOld: {
    ...typography.caption,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: colors.danger,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  discountText: {
    ...typography.caption,
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.5,
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
  emptyIconBox: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
  },
  emptyText: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
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
