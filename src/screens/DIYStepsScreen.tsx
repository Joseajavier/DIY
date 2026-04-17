// ═══════════════════════════════════════════════════════════════
// DIY STEPS SCREEN — pasos interactivos del proyecto
// ───────────────────────────────────────────────────────────────
// Si llega `projectId` en params: carga los pasos persistidos de
// SQLite y permite marcarlos como completados (toggle), con barra
// de progreso. Si NO hay projectId: renderiza el `result` en
// memoria (preview legacy) sin persistencia.
// ═══════════════════════════════════════════════════════════════

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ProjectStep } from '../models';
import {
  getStepsByProject,
  toggleStep as toggleStepDb,
} from '../storage/stepRepository';
import { colors, spacing, radius, typography, shadows } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DIYSteps'>;
  route: RouteProp<RootStackParamList, 'DIYSteps'>;
};

type Difficulty = 'easy' | 'medium' | 'hard';
const diffColors: Record<Difficulty, string> = {
  easy: colors.success,
  medium: colors.warning,
  hard: colors.danger,
};
const diffLabels: Record<Difficulty, string> = {
  easy: '🟢 Facil',
  medium: '🟡 Media',
  hard: '🔴 Dificil',
};

export default function DIYStepsScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { result, projectId } = route.params;

  const [steps, setSteps] = useState<ProjectStep[] | null>(null);
  const [loading, setLoading] = useState(false);

  // Si tenemos projectId → cargar pasos persistidos al enfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      if (!projectId) {
        setSteps(null);
        return;
      }
      let cancelled = false;
      setLoading(true);
      getStepsByProject(projectId)
        .then((rows) => {
          if (!cancelled) setSteps(rows);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
      return () => {
        cancelled = true;
      };
    }, [projectId]),
  );

  // Fallback a 'easy' si difficulty viene con valor inesperado
  const difficulty: Difficulty = (['easy', 'medium', 'hard'] as const).includes(
    result.difficulty as Difficulty,
  )
    ? (result.difficulty as Difficulty)
    : 'easy';
  const diffColor = diffColors[difficulty];
  const diffLabel = diffLabels[difficulty];

  // Si hay steps en DB, los usamos; si no, fallback al result en memoria
  const renderableSteps: ProjectStep[] =
    steps ??
    result.steps.map<ProjectStep>((s: any) => ({
      number: s.number,
      title: s.title,
      description: s.description,
      completed: false,
    }));

  const completed = renderableSteps.filter((s) => s.completed).length;
  const total = renderableSteps.length;
  const progressPct = total === 0 ? 0 : Math.round((completed / total) * 100);

  const handleToggle = async (step: ProjectStep) => {
    if (!projectId || !step.id) return; // Modo preview, no se persiste
    // Optimistic update
    setSteps((prev: ProjectStep[] | null) =>
      prev
        ? prev.map((s: ProjectStep) =>
            s.id === step.id ? { ...s, completed: !s.completed } : s,
          )
        : prev,
    );
    try {
      await toggleStepDb(step.id);
    } catch {
      // Revertir si falla
      setSteps((prev: ProjectStep[] | null) =>
        prev
          ? prev.map((s: ProjectStep) =>
              s.id === step.id ? { ...s, completed: !s.completed } : s,
            )
          : prev,
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={[typography.h1, { color: colors.primary }]}>{result.projectName}</Text>
      {result.summary && (
        <Text
          style={[typography.bodySmall, { marginTop: spacing.sm, marginBottom: spacing.lg }]}
        >
          {result.summary}
        </Text>
      )}

      <View style={styles.metaRow}>
        <View style={[styles.chip, { backgroundColor: diffColor + '22' }]}>
          <Text style={[typography.caption, { color: diffColor }]}>{diffLabel}</Text>
        </View>
        <View style={styles.chip}>
          <Text style={typography.caption}>⏱ {result.estimatedTime}</Text>
        </View>
      </View>

      {/* Barra de progreso (solo si hay projectId persistido) */}
      {projectId && total > 0 && (
        <View style={styles.progressWrap}>
          <View style={styles.progressHeader}>
            <Text style={[typography.label, { color: colors.text }]}>
              Progreso
            </Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              {completed} / {total} ({progressPct}%)
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${progressPct}%`,
                  backgroundColor:
                    progressPct === 100 ? colors.success : colors.primary,
                },
              ]}
            />
          </View>
          {progressPct === 100 && (
            <Text style={styles.completedLabel}>🎉 ¡Proyecto terminado!</Text>
          )}
        </View>
      )}

      <Text style={[typography.label, { marginBottom: spacing.lg }]}>
        {t('diy.steps')}
      </Text>

      {loading && (
        <View style={{ paddingVertical: spacing.xl, alignItems: 'center' }}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )}

      {renderableSteps.map((step) => {
        const isCompleted = step.completed;
        const isInteractive = !!projectId && !!step.id;
        return (
          <TouchableOpacity
            key={step.id ?? step.number}
            style={[styles.stepCard, shadows.sm, isCompleted && styles.stepCardDone]}
            onPress={() => isInteractive && handleToggle(step)}
            activeOpacity={isInteractive ? 0.7 : 1}
          >
            <View style={[styles.stepNum, isCompleted && styles.stepNumDone]}>
              {isCompleted ? (
                <Text style={styles.stepNumText}>✓</Text>
              ) : (
                <Text style={styles.stepNumText}>{step.number}</Text>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  typography.h3,
                  isCompleted && {
                    textDecorationLine: 'line-through',
                    color: colors.textMuted,
                  },
                ]}
              >
                {step.title}
              </Text>
              <Text
                style={[
                  typography.bodySmall,
                  { marginTop: spacing.xs },
                  isCompleted && { color: colors.textMuted },
                ]}
              >
                {step.description}
              </Text>
              {isInteractive && (
                <Text
                  style={[
                    typography.caption,
                    {
                      marginTop: spacing.xs,
                      color: isCompleted ? colors.success : colors.textMuted,
                      fontSize: 11,
                    },
                  ]}
                >
                  {isCompleted ? '✓ Completado · Toca para deshacer' : 'Toca para marcar como hecho'}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={[styles.button, shadows.md]}
        onPress={() => navigation.navigate('DIYMaterials', { result })}
      >
        <Text style={[typography.button, { color: colors.textOnPrimary }]}>
          {t('diy.viewMaterials')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  chip: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  progressWrap: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: colors.bg,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
  },
  completedLabel: {
    ...typography.caption,
    color: colors.success,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepCardDone: {
    backgroundColor: colors.success + '11',
    borderColor: colors.success + '44',
  },
  stepNum: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  stepNumDone: {
    backgroundColor: colors.success,
  },
  stepNumText: {
    ...typography.button,
    color: colors.textOnPrimary,
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: radius.lg,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
});
