import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../utils/theme';
import { EfficiencyGauge } from '../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProResults'>;
  route: RouteProp<RootStackParamList, 'ProResults'>;
};

export default function ProResultsScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { projectName, optimization, materials } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('pro.results')}</Text>
      <Text style={styles.subtitle}>{projectName}</Text>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>{t('pro.optimizationSummary')}</Text>
        <Text style={styles.line}>{t('pro.boardsNeeded')}: <Text style={styles.bold}>{optimization.totalBoards}</Text></Text>
        <EfficiencyGauge value={optimization.efficiency} label={t('pro.totalEfficiency')} size="large" />
        <EfficiencyGauge value={100 - optimization.totalWaste} label={t('pro.totalWaste') + ` (${optimization.totalWaste.toFixed(1)}%)`} size="small" />
      </View>

      {/* Estimated total cost */}
      <View style={styles.costCard}>
        <Text style={styles.costLabel}>Coste estimado tableros</Text>
        <Text style={styles.costValue}>{(optimization.totalBoards * 25).toFixed(2)} €</Text>
        <Text style={styles.costNote}>~25€/tablero melamina 244×122cm</Text>
      </View>
      <Text style={styles.section}>{t('pro.estimatedMaterials')}</Text>
      {materials.map((mat, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.matName}>{mat.name}</Text>
          <Text style={styles.matQty}>{mat.quantity} {mat.unit || 'ud'}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Shop', { materials, mode: 'pro' })}>
        <Text style={styles.buttonText}>{t('shop.whereToBuy')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.accentPro, marginBottom: 4 },
  subtitle: { fontSize: 16, color: colors.textSecondary, marginBottom: 24 },
  summaryCard: { backgroundColor: colors.card, borderRadius: 12, padding: 20, marginBottom: 28, borderLeftWidth: 4, borderLeftColor: colors.accentPro },
  summaryTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 12 },
  line: { fontSize: 14, color: colors.textSecondary, marginBottom: 12 },
  bold: { fontWeight: 'bold', color: colors.accentPro },
  costCard: { backgroundColor: colors.card, borderRadius: 12, padding: 20, marginBottom: 28, alignItems: 'center', borderWidth: 1, borderColor: colors.accentPro + '44' },
  costLabel: { fontSize: 14, color: colors.textSecondary, marginBottom: 4 },
  costValue: { fontSize: 28, fontWeight: 'bold', color: colors.success },
  costNote: { fontSize: 11, color: colors.textMuted, marginTop: 4 },
  section: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.card, borderRadius: 10, padding: 14, marginBottom: 8 },
  matName: { fontSize: 15, color: colors.text },
  matQty: { fontSize: 14, color: colors.accentPro, fontWeight: '600' },
  button: { backgroundColor: colors.accentPro, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  buttonText: { fontSize: 16, fontWeight: '600', color: colors.white },
});
