import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getStoreRecommendations } from '../services/storeRecommender';
import { comparePrices } from '../services/priceComparator';
import { colors } from '../utils/theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Shop'>;
  route: RouteProp<RootStackParamList, 'Shop'>;
};

export default function ShopScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { materials, mode } = route.params;
  const stores = useMemo(() => getStoreRecommendations(materials), [materials]);
  const comparison = useMemo(() => comparePrices(stores), [stores]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('shop.title')}</Text>
      <Text style={styles.subtitle}>{mode === 'diy' ? t('shop.diyRecommendations') : t('shop.proComparison')}</Text>

      {comparison.best && (
        <View style={styles.bestCard}>
          <Text style={styles.bestLabel}>⭐ {t('shop.bestOption')}</Text>
          <Text style={styles.bestName}>{comparison.best.name}</Text>
          <Text style={styles.bestPrice}>{comparison.best.price.toFixed(2)} €</Text>
          <Text style={styles.bestTime}>{t('shop.delivery')}: {comparison.best.time}</Text>
        </View>
      )}

      {comparison.recommendation && (
        <View style={styles.recoCard}>
          <Text style={styles.recoText}>💡 {comparison.recommendation}</Text>
        </View>
      )}

      <Text style={styles.section}>{t('shop.allOptions')}</Text>
      {comparison.ranked.map((store, i) => (
        <View key={i} style={styles.storeCard}>
          <View style={styles.storeHeader}>
            <Text style={styles.storeName}>{store.name}</Text>
            <View style={[styles.badge, { backgroundColor: store.type === 'online' ? colors.accentPro : colors.accent }]}>
              <Text style={styles.badgeText}>{store.type === 'online' ? t('shop.online') : t('shop.store')}</Text>
            </View>
          </View>
          <View style={styles.storeDetails}>
            <Text style={styles.storePrice}>{store.price.toFixed(2)} €</Text>
            <Text style={styles.storeTime}>{store.time}</Text>
            <View style={styles.scoreBar}><View style={[styles.scoreFill, { width: `${store.score * 10}%` }]} /></View>
            <Text style={styles.scoreText}>{store.score}/10</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.popToTop()}>
        <Text style={styles.homeButtonText}>{t('shop.backHome')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.accent, marginBottom: 4 },
  subtitle: { fontSize: 16, color: colors.textSecondary, marginBottom: 24 },
  bestCard: { backgroundColor: colors.card, borderRadius: 14, padding: 20, marginBottom: 28, borderWidth: 2, borderColor: colors.accent, alignItems: 'center' },
  bestLabel: { fontSize: 14, color: colors.accent, marginBottom: 8 },
  bestName: { fontSize: 20, fontWeight: 'bold', color: colors.text },
  bestPrice: { fontSize: 28, fontWeight: 'bold', color: colors.success, marginTop: 4 },
  bestTime: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  recoCard: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 20, borderLeftWidth: 3, borderLeftColor: colors.accent },
  recoText: { fontSize: 13, color: colors.textSecondary, lineHeight: 19 },
  section: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 14 },
  storeCard: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 12 },
  storeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  storeName: { fontSize: 16, fontWeight: '600', color: colors.text },
  badge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 11, color: colors.white, fontWeight: '600' },
  storeDetails: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  storePrice: { fontSize: 16, fontWeight: 'bold', color: colors.success },
  storeTime: { fontSize: 12, color: colors.textSecondary },
  scoreBar: { width: 60, height: 6, backgroundColor: colors.border, borderRadius: 3 },
  scoreFill: { height: 6, backgroundColor: colors.accent, borderRadius: 3 },
  scoreText: { fontSize: 12, color: colors.accent, fontWeight: '600' },
  homeButton: { backgroundColor: colors.bgAlt, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  homeButtonText: { fontSize: 16, color: colors.text },
});
