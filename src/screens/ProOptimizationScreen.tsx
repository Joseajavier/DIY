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
import { colors } from '../utils/theme';

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
      <Text style={styles.title}>{t('pro.optimization')}</Text>
      <Text style={styles.subtitle}>{projectName}</Text>
      <View style={styles.statsRow}>
        <View style={styles.stat}><Text style={styles.statVal}>{optimization.totalBoards}</Text><Text style={styles.statLbl}>{t('pro.boards')}</Text></View>
        <View style={styles.stat}><Text style={styles.statVal}>{optimization.efficiency.toFixed(1)}%</Text><Text style={styles.statLbl}>{t('pro.efficiency')}</Text></View>
        <View style={styles.stat}><Text style={styles.statVal}>{optimization.totalWaste.toFixed(1)}%</Text><Text style={styles.statLbl}>{t('pro.waste')}</Text></View>
      </View>
      <Text style={styles.section}>{t('pro.boardDistribution')}</Text>
      {optimization.boards.map((board, i) => {
        const usedPct = 100 - board.wastePercentage;
        return (
          <View key={i} style={styles.boardCard}>
            <View style={styles.boardHeader}>
              <Text style={styles.boardTitle}>{t('pro.board')} {board.boardIndex + 1}</Text>
              <Text style={styles.boardPct}>{usedPct.toFixed(0)}%</Text>
            </View>
            <View style={styles.usageBar}>
              <View style={[styles.usageFill, { width: `${usedPct}%`, backgroundColor: usedPct > 80 ? colors.success : usedPct > 50 ? colors.accent : colors.danger }]} />
            </View>
            <Text style={styles.boardWaste}>{t('pro.waste')}: {board.wastePercentage.toFixed(1)}%</Text>
            {board.pieces.map((p, j) => <Text key={j} style={styles.pieceText}>• {p.width} × {p.height} cm</Text>)}
          </View>
        );
      })}
      <TouchableOpacity style={styles.button} onPress={async () => {
        const pid = getLastProjectId();
        if (pid) {
          await saveOptimization({ projectId: pid, boardWidth, boardHeight, totalBoards: optimization.totalBoards, wastePercentage: optimization.totalWaste, efficiency: optimization.efficiency });
          await createMaterials(pid, materials);
        }
        navigation.navigate('ProResults', { projectName, optimization, materials });
      }}>
        <Text style={styles.buttonText}>{t('pro.viewResults')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.accentPro, marginBottom: 4 },
  subtitle: { fontSize: 16, color: colors.textSecondary, marginBottom: 24 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 },
  stat: { flex: 1, backgroundColor: colors.card, borderRadius: 12, padding: 16, alignItems: 'center', marginHorizontal: 4 },
  statVal: { fontSize: 22, fontWeight: 'bold', color: colors.accentPro },
  statLbl: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  section: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 14 },
  boardCard: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 12 },
  boardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  boardTitle: { fontSize: 16, fontWeight: '600', color: colors.accent },
  boardPct: { fontSize: 14, fontWeight: 'bold', color: colors.accentPro },
  usageBar: { height: 8, backgroundColor: colors.border, borderRadius: 4, marginVertical: 8 },
  usageFill: { height: 8, borderRadius: 4 },
  boardWaste: { fontSize: 13, color: colors.textSecondary, marginBottom: 8 },
  pieceText: { fontSize: 14, color: colors.textSecondary, marginLeft: 8, marginBottom: 2 },
  button: { backgroundColor: colors.accentPro, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  buttonText: { fontSize: 16, fontWeight: '600', color: colors.white },
});
