import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../theme';
import { EfficiencyGauge, BoardDiagram } from '../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProResults'>;
  route: RouteProp<RootStackParamList, 'ProResults'>;
};

export default function ProResultsScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { width: screenWidth } = useWindowDimensions();
  const { projectName, optimization, materials } = route.params;

  const diagramWidth = Math.min(screenWidth - spacing.xl * 2, 360);
  const bw = optimization.boardWidth ?? 244;
  const bh = optimization.boardHeight ?? 122;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={[typography.h1, { color: colors.accent }]}>
        {t('pro.results')}
      </Text>
      <Text style={[typography.bodySmall, { marginBottom: spacing.xl }]}>
        {projectName}
      </Text>

      {/* Resumen de eficiencia */}
      <View style={[styles.summaryCard, shadows.sm]}>
        <Text style={[typography.h3, { marginBottom: spacing.lg }]}>
          {t('pro.optimizationSummary')}
        </Text>
        <Text style={[typography.body, { marginBottom: spacing.md }]}>
          {t('pro.boardsNeeded')}:{' '}
          <Text style={{ fontWeight: '700', color: colors.accent }}>
            {optimization.totalBoards}
          </Text>
        </Text>
        <EfficiencyGauge
          value={optimization.efficiency}
          label={t('pro.totalEfficiency')}
          size="large"
        />
        <EfficiencyGauge
          value={100 - optimization.totalWaste}
          label={`${t('pro.totalWaste')} (${optimization.totalWaste.toFixed(1)}%)`}
          size="small"
        />
      </View>

      {/* Coste estimado */}
      <View style={[styles.costCard, shadows.sm]}>
        <Text style={typography.bodySmall}>Coste estimado tableros</Text>
        <Text style={styles.costValue}>
          {(optimization.totalBoards * 25).toFixed(2)} €
        </Text>
        <Text style={typography.caption}>~25€/tablero melamina 244×122cm</Text>
      </View>

      {/* Planos de corte */}
      <Text style={[typography.label, { marginTop: spacing.xl, marginBottom: spacing.md }]}>
        🪚 Planos de corte
      </Text>
      <Text style={[typography.caption, { color: colors.textMuted, marginBottom: spacing.lg }]}>
        Cada rectángulo representa una pieza a su posición exacta en el tablero.
      </Text>

      {optimization.boards.map((board) => (
        <View key={board.boardIndex} style={[styles.diagramCard, shadows.sm]}>
          <BoardDiagram
            pieces={board.pieces}
            boardWidth={bw}
            boardHeight={bh}
            displayWidth={diagramWidth}
            boardIndex={board.boardIndex}
            wastePercentage={board.wastePercentage}
          />
        </View>
      ))}

      {/* Lista de materiales */}
      <Text style={[typography.label, { marginTop: spacing.xl, marginBottom: spacing.lg }]}>
        {t('pro.estimatedMaterials')}
      </Text>
      {materials.map((mat, i) => (
        <View key={i} style={styles.row}>
          <Text style={typography.body}>{mat.name}</Text>
          <Text style={[typography.body, { color: colors.accent, fontWeight: '600' }]}>
            {mat.quantity} {mat.unit || 'ud'}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        style={[styles.button, shadows.md]}
        onPress={() => navigation.navigate('Shop', { materials, mode: 'pro' })}
      >
        <Text style={[typography.button, { color: colors.textOnAccent }]}>
          {t('shop.whereToBuy')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  costCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.accent + '44',
  },
  costValue: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.success,
    marginVertical: spacing.sm,
  },
  diagramCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 18,
    borderRadius: radius.lg,
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
});
