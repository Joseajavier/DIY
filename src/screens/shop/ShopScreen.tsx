import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { getStoreRecommendations } from '../../services/storeRecommender';
import { comparePrices } from '../../services/priceComparator';
import { saveShopOptions } from '../../storage/shopRepository';
import { getLastProjectId } from '../../storage/settingsStorage';
import { colors, spacing, radius, typography, shadows } from '../../theme';
import HeroBanner from '../../components/HeroBanner';
import SectionHeader from '../../components/SectionHeader';
import Icon from '../../components/Icon';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Shop'>;
  route: RouteProp<RootStackParamList, 'Shop'>;
};

export default function ShopScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { materials, mode } = route.params;
  const stores = useMemo(() => getStoreRecommendations(materials), [materials]);
  const comparison = useMemo(() => comparePrices(stores), [stores]);

  useEffect(() => {
    const pid = getLastProjectId();
    if (pid && stores.length) saveShopOptions(pid, stores);
  }, [stores]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <HeroBanner
        eyebrow={t('shop.title')}
        title={comparison.best?.name ?? t('shop.title')}
        subtitle={mode === 'diy' ? t('shop.diyRecommendations') : t('shop.proComparison')}
      />

      {comparison.best && (
        <View style={[styles.bestCard, shadows.md]}>
          <View style={styles.bestBadgeRow}>
            <Icon name="trophy" size={14} color={colors.primary} />
            <Text style={styles.bestBadgeText}>{t('shop.bestOption')}</Text>
          </View>
          <Text style={[typography.h2, { marginTop: spacing.sm }]}>{comparison.best.name}</Text>
          <Text style={styles.bestPrice}>{comparison.best.price.toFixed(2)} €</Text>
          <Text style={typography.caption}>{t('shop.delivery')}: {comparison.best.time}</Text>
        </View>
      )}

      {comparison.recommendation && (
        <View style={styles.recoCard}>
          <View style={styles.recoRow}>
            <Icon name="info" size={16} color={colors.primary} />
            <Text style={[typography.bodySmall, { lineHeight: 20, flex: 1 }]}>{comparison.recommendation}</Text>
          </View>
        </View>
      )}

      <SectionHeader>{t('shop.allOptions')}</SectionHeader>
      {comparison.ranked.map((store, i) => (
        <View key={i} style={[styles.storeCard, shadows.sm]}>
          <View style={styles.storeHeader}>
            <Text style={typography.h3}>{store.name}</Text>
            <View style={[styles.badge, { backgroundColor: store.type === 'online' ? colors.accent : colors.primary }]}>
              <Text style={[typography.caption, { color: colors.text }]}>{store.type === 'online' ? t('shop.online') : t('shop.store')}</Text>
            </View>
          </View>
          <View style={styles.storeDetails}>
            <Text style={[typography.body, { fontWeight: '700', color: colors.success }]}>{store.price.toFixed(2)} €</Text>
            <Text style={typography.caption}>{store.time}</Text>
            <View style={styles.scoreBar}><View style={[styles.scoreFill, { width: `${store.score * 10}%` }]} /></View>
            <Text style={[typography.caption, { color: colors.primary, fontWeight: '600' }]}>{store.score}/10</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.popToTop()}>
        <Text style={[typography.buttonSmall, { color: colors.text }]}>{t('shop.backHome')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  bestCard: { backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.xl, alignItems: 'center', borderWidth: 2, borderColor: colors.primary, marginTop: spacing.xl, marginBottom: spacing.xl },
  bestBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  bestBadgeText: { ...typography.caption, color: colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  bestPrice: { fontSize: 30, fontWeight: '800', color: colors.success, marginVertical: spacing.sm },
  recoCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, borderLeftWidth: 3, borderLeftColor: colors.primary, marginBottom: spacing.lg },
  recoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  storeCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md },
  storeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  badge: { borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  storeDetails: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  scoreBar: { width: 60, height: 6, backgroundColor: colors.border, borderRadius: 3 },
  scoreFill: { height: 6, backgroundColor: colors.primary, borderRadius: 3 },
  homeBtn: { backgroundColor: colors.surfaceLight, paddingVertical: 16, borderRadius: radius.lg, alignItems: 'center', marginTop: spacing.xxl },
});
