import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getStoreRecommendations } from '../services/storeRecommender';
import { comparePrices } from '../services/priceComparator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Shop'>;
  route: RouteProp<RootStackParamList, 'Shop'>;
};

export default function ShopScreen({ navigation, route }: Props) {
  const { materials, mode } = route.params;

  const stores = useMemo(() => getStoreRecommendations(materials), [materials]);
  const comparison = useMemo(() => comparePrices(stores), [stores]);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'online': return '#4a9fe2';
      case 'physical': return '#27ae60';
      default: return '#888';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Dónde comprar</Text>
      <Text style={styles.subtitle}>
        {mode === 'diy' ? 'Recomendaciones DIY' : 'Comparativa PRO'}
      </Text>

      {comparison.best && (
        <View style={styles.bestCard}>
          <Text style={styles.bestLabel}>⭐ Mejor opción</Text>
          <Text style={styles.bestName}>{comparison.best.name}</Text>
          <Text style={styles.bestPrice}>{comparison.best.price.toFixed(2)} €</Text>
          <Text style={styles.bestTime}>Entrega: {comparison.best.time}</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Todas las opciones</Text>
      {comparison.ranked.map((store, i) => (
        <View key={i} style={styles.storeCard}>
          <View style={styles.storeHeader}>
            <Text style={styles.storeName}>{store.name}</Text>
            <View style={[styles.badge, { backgroundColor: getBadgeColor(store.type) }]}>
              <Text style={styles.badgeText}>
                {store.type === 'online' ? 'Online' : 'Tienda'}
              </Text>
            </View>
          </View>
          <View style={styles.storeDetails}>
            <Text style={styles.storePrice}>{store.price.toFixed(2)} €</Text>
            <Text style={styles.storeTime}>{store.time}</Text>
            <View style={styles.scoreBar}>
              <View
                style={[
                  styles.scoreFill,
                  { width: `${store.score * 10}%` },
                ]}
              />
            </View>
            <Text style={styles.scoreText}>{store.score}/10</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.homeButtonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  content: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#e2b04a', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#aaa', marginBottom: 24 },
  bestCard: {
    backgroundColor: '#16213e',
    borderRadius: 14,
    padding: 20,
    marginBottom: 28,
    borderWidth: 2,
    borderColor: '#e2b04a',
    alignItems: 'center',
  },
  bestLabel: { fontSize: 14, color: '#e2b04a', marginBottom: 8 },
  bestName: { fontSize: 20, fontWeight: 'bold', color: '#f5f5f5' },
  bestPrice: { fontSize: 28, fontWeight: 'bold', color: '#27ae60', marginTop: 4 },
  bestTime: { fontSize: 13, color: '#aaa', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#f5f5f5', marginBottom: 14 },
  storeCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  storeName: { fontSize: 16, fontWeight: '600', color: '#f5f5f5' },
  badge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 11, color: '#fff', fontWeight: '600' },
  storeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storePrice: { fontSize: 16, fontWeight: 'bold', color: '#27ae60' },
  storeTime: { fontSize: 12, color: '#aaa' },
  scoreBar: {
    width: 60,
    height: 6,
    backgroundColor: '#2a2a4a',
    borderRadius: 3,
  },
  scoreFill: {
    height: 6,
    backgroundColor: '#e2b04a',
    borderRadius: 3,
  },
  scoreText: { fontSize: 12, color: '#e2b04a', fontWeight: '600' },
  homeButton: {
    backgroundColor: '#2a2a4a',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  homeButtonText: { fontSize: 16, color: '#f5f5f5' },
});
