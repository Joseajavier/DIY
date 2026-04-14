import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { optimizeCuts } from '../services/cuttingOptimizer';
import { generateMaterials } from '../services/materialsGenerator';
import { saveOptimization } from '../storage/optimizationRepository';
import { createMaterials } from '../storage/materialRepository';
import { getLastProjectId } from '../storage/settingsStorage';
import { colors, spacing, radius, typography, shadows } from '../theme';
import { MetricCard } from '../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProOptimization'>;
  route: RouteProp<RootStackParamList, 'ProOptimization'>;
};

export default function ProOptimizationScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { projectName, pieces, boardWidth, boardHeight } = route.params;
  const optimization = useMemo(() => optimizeCuts(pieces, boardWidth, boardHeight), [pieces, boardWidth, boardHeight]);
  const materials = useMemo(() => generateMaterials(pieces, optimization.totalBoards), [pieces, optimization.totalBoards]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={[typography.h1, { color: colors.accent }]}>{t('pro.optimization')}</Text>
      <Text style={[typography.bodySmall, { marginBottom: spacing.xl }]}>{projectName}</Text>

      <View style={styles.metricsRow}>
        <MetricCard value={String(optimization.totalBoards)} label={t('pro.boards')} color={colors.accent} />
        <MetricCard value={`${optimization.efficiency.toFixed(1)}%`} label={t('pro.efficiency')} color={colors.success} />
        <MetricCard value={`${optimization.totalWaste.toFixed(1)}%`} label={t('pro.waste')} color={colors.warning} />
      </View>

      <Text style={[typography.label, { marginTop: spacing.xl, marginBottom: spacing.lg }]}>{t('pro.boardDistribution')}</Text>
      {optimization.boards.map((board, i) => {
        const usedPct = 100 - board.wastePercentage;
        const barColor = usedPct > 80 ? colors.success : usedPct > 50 ? colors.warning : colors.danger;
        return (
          <View key={i} style={[styles.boardCard, shadows.sm]}>
            <View style={styles.boardHeader}>
              <Text style={[typography.h3, { color: colors.primary }]}>{t('pro.board')} {board.boardIndex + 1}</Text>
              <Text style={[typography.body, { color: barColor, fontWeight: '700' }]}>{usedPct.toFixed(0)}%</Text>
            </View>
            <View style={styles.bar}><View style={[styles.barFill, { width: `${usedPct}%`, backgroundColor: barColor }]} /></View>
            <Text style={[typography.caption, { marginBottom: spacing.sm }]}>{t('pro.waste')}: {board.wastePercentage.toFixed(1)}%</Text>
            {board.pieces.map((p, j) => <Text key={j} style={typography.bodySmall}>• {p.width} × {p.height} cm</Text>)}
          </View>
        );
      })}

      <TouchableOpacity style={[styles.button, shadows.md]} onPress={async () => {
        const pid = getLastProjectId();
        if (pid) {
          await saveOptimization({ projectId: pid, boardWidth, boardHeight, totalBoards: optimization.totalBoards, wastePercentage: optimization.totalWaste, efficiency: optimization.efficiency });
          await createMaterials(pid, materials);
        }
        navigation.navigate('ProResults', { projectName, optimization, materials });
      }}>
        <Text style={[typography.button, { color: colors.textOnAccent }]}>{t('pro.viewResults')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  boardCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md },
  boardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bar: { height: 10, backgroundColor: colors.border, borderRadius: 5, marginVertical: spacing.sm },
  barFill: { height: 10, borderRadius: 5 },
  button: { backgroundColor: colors.accent, paddingVertical: 18, borderRadius: radius.lg, alignItems: 'center', marginTop: spacing.xl },
});
