import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../utils/theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DIYSteps'>;
  route: RouteProp<RootStackParamList, 'DIYSteps'>;
};

const difficultyColors = { easy: '#5a9e6f', medium: '#c97b3d', hard: '#b54a3a' };
const difficultyLabels = { easy: '🟢 Fácil', medium: '🟡 Media', hard: '🔴 Difícil' };

export default function DIYStepsScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { result } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{result.projectName}</Text>
      {result.summary && <Text style={styles.summary}>{result.summary}</Text>}

      <View style={styles.metaRow}>
        <View style={[styles.metaBadge, { backgroundColor: difficultyColors[result.difficulty] + '33' }]}>
          <Text style={[styles.metaText, { color: difficultyColors[result.difficulty] }]}>
            {difficultyLabels[result.difficulty]}
          </Text>
        </View>
        <View style={styles.metaBadge}>
          <Text style={styles.metaText}>⏱ {result.estimatedTime}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>{t('diy.steps')}</Text>
      {result.steps.map((step) => (
        <View key={step.number} style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{step.number}</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDesc}>{step.description}</Text>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DIYMaterials', { result })}>
        <Text style={styles.buttonText}>{t('diy.viewMaterials')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.accent, marginBottom: 4 },
  summary: { fontSize: 14, color: colors.textSecondary, lineHeight: 20, marginBottom: 16 },
  metaRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  metaBadge: { backgroundColor: colors.card, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  metaText: { fontSize: 13, fontWeight: '600', color: colors.textSecondary },
  sectionTitle: { fontSize: 16, color: colors.textSecondary, marginBottom: 16 },
  stepCard: { flexDirection: 'row', backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 12 },
  stepNumber: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.accent, justifyContent: 'center', alignItems: 'center', marginRight: 14, marginTop: 2 },
  stepNumberText: { fontWeight: 'bold', color: colors.textDark, fontSize: 14 },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 4 },
  stepDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 19 },
  button: { backgroundColor: colors.accent, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  buttonText: { fontSize: 16, fontWeight: '600', color: colors.textDark },
});
