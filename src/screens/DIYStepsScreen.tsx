import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { DIYStep } from '../models';
import { colors, spacing, radius, typography, shadows } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DIYSteps'>;
  route: RouteProp<RootStackParamList, 'DIYSteps'>;
};

type Difficulty = 'easy' | 'medium' | 'hard';
const diffColors: Record<Difficulty, string> = { easy: colors.success, medium: colors.warning, hard: colors.danger };
const diffLabels: Record<Difficulty, string> = { easy: '🟢 Facil', medium: '🟡 Media', hard: '🔴 Dificil' };

export default function DIYStepsScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { result } = route.params;

  // Fallback a 'easy' si difficulty viene con valor inesperado desde la IA
  const difficulty: Difficulty = (['easy', 'medium', 'hard'] as const).includes(result.difficulty as Difficulty)
    ? (result.difficulty as Difficulty)
    : 'easy';
  const diffColor = diffColors[difficulty];
  const diffLabel = diffLabels[difficulty];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={[typography.h1, { color: colors.primary }]}>{result.projectName}</Text>
      {result.summary && <Text style={[typography.bodySmall, { marginTop: spacing.sm, marginBottom: spacing.lg }]}>{result.summary}</Text>}

      <View style={styles.metaRow}>
        <View style={[styles.chip, { backgroundColor: diffColor + '22' }]}>
          <Text style={[typography.caption, { color: diffColor }]}>{diffLabel}</Text>
        </View>
        <View style={styles.chip}>
          <Text style={typography.caption}>⏱ {result.estimatedTime}</Text>
        </View>
      </View>

      <Text style={[typography.label, { marginBottom: spacing.lg }]}>{t('diy.steps')}</Text>
      {result.steps.map((step: DIYStep) => (
        <View key={step.number} style={[styles.stepCard, shadows.sm]}>
          <View style={styles.stepNum}>
            <Text style={styles.stepNumText}>{step.number}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={typography.h3}>{step.title}</Text>
            <Text style={[typography.bodySmall, { marginTop: spacing.xs }]}>{step.description}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity style={[styles.button, shadows.md]} onPress={() => navigation.navigate('DIYMaterials', { result })}>
        <Text style={[typography.button, { color: colors.textOnPrimary }]}>{t('diy.viewMaterials')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  metaRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
  chip: { backgroundColor: colors.surface, borderRadius: radius.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  stepCard: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md },
  stepNum: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.lg },
  stepNumText: { ...typography.button, color: colors.textOnPrimary, fontSize: 14 },
  button: { backgroundColor: colors.primary, paddingVertical: 18, borderRadius: radius.lg, alignItems: 'center', marginTop: spacing.xl },
});
