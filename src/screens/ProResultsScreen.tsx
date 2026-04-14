import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProResults'>;
  route: RouteProp<RootStackParamList, 'ProResults'>;
};

export default function ProResultsScreen({ navigation, route }: Props) {
  const { projectName, optimization, materials } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Resultados</Text>
      <Text style={styles.subtitle}>{projectName}</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Resumen de optimización</Text>
        <Text style={styles.summaryLine}>
          Tableros necesarios: <Text style={styles.bold}>{optimization.totalBoards}</Text>
        </Text>
        <Text style={styles.summaryLine}>
          Eficiencia total: <Text style={styles.bold}>{optimization.efficiency.toFixed(1)}%</Text>
        </Text>
        <Text style={styles.summaryLine}>
          Desperdicio total: <Text style={styles.bold}>{optimization.totalWaste.toFixed(1)}%</Text>
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Materiales estimados</Text>
      {materials.map((mat, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.matName}>{mat.name}</Text>
          <Text style={styles.matQty}>
            {mat.quantity} {mat.unit || 'ud'}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Shop', {
            materials,
            mode: 'pro',
          })
        }
      >
        <Text style={styles.buttonText}>¿Dónde comprar?</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  content: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4a9fe2', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#aaa', marginBottom: 24 },
  summaryCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 28,
    borderLeftWidth: 4,
    borderLeftColor: '#4a9fe2',
  },
  summaryTitle: { fontSize: 16, fontWeight: '600', color: '#f5f5f5', marginBottom: 12 },
  summaryLine: { fontSize: 14, color: '#ccc', marginBottom: 6 },
  bold: { fontWeight: 'bold', color: '#4a9fe2' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#f5f5f5', marginBottom: 14 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  matName: { fontSize: 15, color: '#f5f5f5' },
  matQty: { fontSize: 14, color: '#4a9fe2', fontWeight: '600' },
  button: {
    backgroundColor: '#4a9fe2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});
