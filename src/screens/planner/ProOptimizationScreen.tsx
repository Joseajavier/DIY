import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { optimizeCuts } from '../../services/cuttingOptimizer';
import { generateMaterials } from '../../services/materialsGenerator';
import { saveOptimization } from '../../storage/optimizationRepository';
import { createMaterials } from '../../storage/materialRepository';
import { getLastProjectId } from '../../storage/settingsStorage';
import { colors, spacing, radius, typography, shadows } from '../../theme';
import { MetricCard, BoardDiagram } from '../../components';
import HeroBanner from '../../components/HeroBanner';
import SectionHeader from '../../components/SectionHeader';
import Icon from '../../components/Icon';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProOptimization'>;
  route: RouteProp<RootStackParamList, 'ProOptimization'>;
};

export default function ProOptimizationScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { width: screenWidth } = useWindowDimensions();
  const { projectName, pieces, boardWidth, boardHeight, kerf } = route.params;

  const optimization = useMemo(
    () => optimizeCuts(pieces, boardWidth, boardHeight, kerf),
    [pieces, boardWidth, boardHeight, kerf]
  );
  const materials = useMemo(
    () => generateMaterials(pieces, optimization.totalBoards),
    [pieces, optimization.totalBoards]
  );

  // Ancho del diagrama = pantalla menos padding
  const diagramWidth = Math.min(screenWidth - spacing.xl * 2, 360);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <HeroBanner
        variant="accent"
        eyebrow={t('pro.optimization')}
        title={projectName}
        subtitle={t('pro.kerfApplied', { value: kerf.toFixed(2) })}
      />

      {/* Métricas resumen */}
      <View style={styles.metricsRow}>
        <MetricCard
          value={String(optimization.totalBoards)}
          label={t('pro.boards')}
          color={colors.accent}
        />
        <MetricCard
          value={`${optimization.efficiency.toFixed(1)}%`}
          label={t('pro.efficiency')}
          color={colors.success}
        />
        <MetricCard
          value={`${optimization.totalWaste.toFixed(1)}%`}
          label={t('pro.waste')}
          color={colors.warning}
        />
      </View>

      {/* Diagramas de tablero */}
      <SectionHeader>{t('pro.boardDistribution')}</SectionHeader>

      {optimization.boards.map((board) => (
        <View key={board.boardIndex} style={[styles.boardCard, shadows.sm]}>
          <BoardDiagram
            pieces={board.pieces}
            boardWidth={optimization.boardWidth ?? boardWidth}
            boardHeight={optimization.boardHeight ?? boardHeight}
            displayWidth={diagramWidth}
            boardIndex={board.boardIndex}
            wastePercentage={board.wastePercentage}
          />
        </View>
      ))}

      {/* Botón continuar */}
      <TouchableOpacity
        style={[styles.button, shadows.md]}
        onPress={async () => {
          const pid = getLastProjectId();
          if (pid) {
            await saveOptimization({
              projectId: pid,
              boardWidth,
              boardHeight,
              totalBoards: optimization.totalBoards,
              wastePercentage: optimization.totalWaste,
              efficiency: optimization.efficiency,
            });
            await createMaterials(pid, materials);
          }
          navigation.navigate('ProResults', {
            projectName,
            optimization,
            materials,
          });
        }}
      >
        <Icon name="optimize" size={18} color={colors.textOnAccent} />
        <Text style={[typography.button, { color: colors.textOnAccent }]}>
          {t('pro.viewResults')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  boardCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    paddingVertical: 18,
    borderRadius: radius.lg,
    marginTop: spacing.xl,
  },
});
