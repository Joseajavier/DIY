import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { optimizeCuts } from '../services/cuttingOptimizer';
import { generateMaterials } from '../services/materialsGenerator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProOptimization'>;
  route: RouteProp<RootStackParamList, 'ProOptimization'>;
};

export default function ProOptimizationScreen({ navigation, route }: Props) {
  const { projectName, pieces, boardWidth, boardHeight } = route.params;

  const optimization = useMemo(
    () => optimizeCuts(pieces, boardWidth, boardHeight),
    [pieces, boardWidth, boardHeight]
  );

  const materials = useMemo(
    () => generateMaterials(pieces, optimization.totalBoards),
    [pieces, optimization.totalBoards]
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Optimización de cortes</Text>
      <Text style={styles.subtitle}>{projectName}</Text>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{optimization.totalBoards}</Text>
          <Text style={styles.statLabel}>Tableros</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{optimization.efficiency.toFixed(1)}%</Text>
          <Text style={styles.statLabel}>Eficiencia</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{optimization.totalWaste.toFixed(1)}%</Text>
          <Text style={styles.statLabel}>Desperdicio</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Distribución por tablero</Text>
      {optimization.boards.map((board, i) => (
        <View key={i} style={styles.boardCard}>
          <Text style={styles.boardTitle}>Tablero {board.boardIndex + 1}</Text>
          <Text style={styles.boardWaste}>
            Desperdicio: {board.wastePercentage.toFixed(1)}%
          </Text>
          {board.pieces.map((p, j) => (
            <Text key={j} style={styles.pieceText}>
              • {p.width} × {p.height} cm
            </Text>
          ))}
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('ProResults', {
            projectName,
            optimization,
            materials,
          })
        }
      >
        <Text style={styles.buttonText}>Ver resultados completos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  content: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4a9fe2', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#aaa', marginBottom: 24 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  stat: {
    flex: 1,
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#4a9fe2' },
  statLabel: { fontSize: 12, color: '#aaa', marginTop: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f5f5f5',
    marginBottom: 14,
  },
  boardCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  boardTitle: { fontSize: 16, fontWeight: '600', color: '#e2b04a' },
  boardWaste: { fontSize: 13, color: '#aaa', marginBottom: 8 },
  pieceText: { fontSize: 14, color: '#ccc', marginLeft: 8, marginBottom: 2 },
  button: {
    backgroundColor: '#4a9fe2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});
