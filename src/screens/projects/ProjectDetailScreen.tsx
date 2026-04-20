import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Project, Piece, Material, StoreOption, OptimizationRow, ProjectStep } from '../../models';
import { getProjectById } from '../../storage/projectRepository';
import { getPiecesByProject } from '../../storage/pieceRepository';
import { getMaterialsByProject } from '../../storage/materialRepository';
import { getOptimizationByProject } from '../../storage/optimizationRepository';
import { getShopOptionsByProject } from '../../storage/shopRepository';
import { getStepsByProject, toggleStep as toggleStepDb } from '../../storage/stepRepository';
import { colors, spacing, radius, typography, shadows } from '../../theme';
import { Card, EfficiencyGauge, Icon, IconLabel } from '../../components';
import { useProjects } from '../../hooks/useProjects';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProjectDetail'>;
  route: RouteProp<RootStackParamList, 'ProjectDetail'>;
};

export default function ProjectDetailScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { projectId } = route.params;
  const { remove, rename, duplicate } = useProjects();
  const [project, setProject] = useState<Project | null>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [optimization, setOptimization] = useState<OptimizationRow | null>(null);
  const [shops, setShops] = useState<StoreOption[]>([]);
  const [steps, setSteps] = useState<ProjectStep[]>([]);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');

  useFocusEffect(useCallback(() => {
    (async () => {
      const p = await getProjectById(projectId);
      setProject(p);
      if (p) setEditName(p.name);
      setPieces(await getPiecesByProject(projectId));
      setMaterials(await getMaterialsByProject(projectId));
      setOptimization(await getOptimizationByProject(projectId));
      setShops(await getShopOptionsByProject(projectId));
      setSteps(await getStepsByProject(projectId));
    })();
  }, [projectId]));

  const handleToggleStep = async (step: ProjectStep) => {
    if (!step.id) return;
    // Optimistic update
    setSteps((prev) =>
      prev.map((s) => (s.id === step.id ? { ...s, completed: !s.completed } : s)),
    );
    try {
      await toggleStepDb(step.id);
      // Refrescar project para que el % suba
      const p = await getProjectById(projectId);
      if (p) setProject(p);
    } catch {
      // Revertir
      setSteps((prev) =>
        prev.map((s) => (s.id === step.id ? { ...s, completed: !s.completed } : s)),
      );
    }
  };

  const handleRename = async () => {
    if (editName.trim() && editName !== project?.name) {
      await rename(projectId, editName.trim());
      setProject(p => p ? { ...p, name: editName.trim() } : p);
    }
    setEditing(false);
  };

  const handleDuplicate = async () => {
    const newId = await duplicate(projectId);
    if (newId) { Alert.alert('Proyecto duplicado'); navigation.replace('ProjectDetail', { projectId: newId }); }
  };

  const handleDelete = () => {
    Alert.alert(t('projects.delete'), t('projects.deleteConfirm', { name: project?.name }), [
      { text: t('projects.cancel'), style: 'cancel' },
      { text: t('projects.deleteBtn'), style: 'destructive', onPress: async () => { await remove(projectId); navigation.goBack(); } },
    ]);
  };

  const handleShare = async () => {
    if (!project) return;
    let text = `🪵 ${project.name} (${project.mode.toUpperCase()})\n`;
    if (project.description) text += `${project.description}\n\n`;
    if (pieces.length) { text += '📐 Piezas:\n'; pieces.forEach(p => { text += `  • ${p.width}×${p.height}cm × ${p.quantity}ud\n`; }); text += '\n'; }
    if (optimization) text += `📊 ${optimization.total_boards} tableros, ${optimization.efficiency.toFixed(1)}% eficiencia\n\n`;
    if (materials.length) { text += '📦 Materiales:\n'; materials.forEach(m => { text += `  • ${m.name}: ${m.quantity} ${m.unit || 'ud'}\n`; }); text += '\n'; }
    if (shops.length) { text += '🛒 Tiendas:\n'; shops.forEach(s => { text += `  • ${s.name}: ${s.price.toFixed(2)}€\n`; }); }
    text += '\n— DIY App';
    await Share.share({ message: text });
  };

  if (!project) return <View style={styles.container}><Text style={[typography.bodySmall, { textAlign: 'center', marginTop: spacing.xxxl }]}>Cargando...</Text></View>;

  const accentColor = project.mode === 'diy' ? colors.primary : colors.accent;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {editing ? (
        <View style={styles.editRow}>
          <TextInput style={styles.editInput} value={editName} onChangeText={setEditName} autoFocus onSubmitEditing={handleRename} />
          <TouchableOpacity onPress={handleRename} style={styles.editBtn}>
            <Icon name="check" size={18} color={colors.textOnPrimary} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setEditing(true)} style={styles.titleRow} activeOpacity={0.7}>
          <Text style={[typography.h1, { color: accentColor, flex: 1 }]}>{project.name}</Text>
          <Icon name="edit" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      )}

      <View style={styles.tagRow}>
        <View style={[styles.tag, { backgroundColor: accentColor + '1A' }]}>
          <Text style={[typography.caption, { color: accentColor, fontWeight: '700' }]}>
            {project.mode.toUpperCase()}
          </Text>
        </View>
        {project.difficulty && (
          <View style={[styles.tag, styles.tagRowInner, { backgroundColor: colors.warning + '1A' }]}>
            <View
              style={[
                styles.diffDot,
                {
                  backgroundColor:
                    project.difficulty === 'easy'
                      ? colors.success
                      : project.difficulty === 'medium'
                      ? colors.warning
                      : colors.danger,
                },
              ]}
            />
            <Text style={[typography.caption, { color: colors.warning, fontWeight: '700' }]}>
              {project.difficulty === 'easy' ? 'Fácil' : project.difficulty === 'medium' ? 'Media' : 'Difícil'}
            </Text>
          </View>
        )}
        {project.estimatedTime && (
          <View style={[styles.tag, styles.tagRowInner]}>
            <Icon name="time" size={12} color={colors.textSecondary} />
            <Text style={typography.caption}>{project.estimatedTime}</Text>
          </View>
        )}
        {project.createdAt && <Text style={typography.caption}>{new Date(project.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</Text>}
      </View>
      {project.summary ? <Text style={[typography.bodySmall, { marginBottom: spacing.sm, fontStyle: 'italic', color: colors.textSecondary }]}>{project.summary}</Text> : null}
      {project.description ? <Text style={[typography.bodySmall, { marginBottom: spacing.lg }]}>{project.description}</Text> : null}

      {/* Progreso de pasos (si hay) */}
      {(project.totalSteps ?? 0) > 0 && (
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={[typography.label, { color: colors.text }]}>Progreso</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              {project.completedSteps ?? 0} / {project.totalSteps} pasos
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.round(((project.completedSteps ?? 0) / (project.totalSteps || 1)) * 100)}%`,
                  backgroundColor:
                    project.status === 'completed' ? colors.success : accentColor,
                },
              ]}
            />
          </View>
          {project.status === 'completed' && (
            <View style={styles.completedRow}>
              <Icon name="trophy" size={14} color={colors.success} />
              <Text style={styles.completedLabel}>¡Proyecto terminado!</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleDuplicate} activeOpacity={0.7}>
          <IconLabel icon="copy" label="Duplicar" color={colors.textSecondary} size={14} textStyle={typography.caption} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={handleShare} activeOpacity={0.7}>
          <IconLabel icon="share" label="Compartir" color={colors.textSecondary} size={14} textStyle={typography.caption} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.danger + '44' }]} onPress={handleDelete} activeOpacity={0.7}>
          <IconLabel icon="trash" label="Borrar" color={colors.danger} size={14} textStyle={[typography.caption, { color: colors.danger }]} />
        </TouchableOpacity>
      </View>

      {steps.length > 0 && (
        <>
          <Text style={[typography.label, { marginTop: spacing.xl, marginBottom: spacing.md }]}>
            Pasos ({steps.filter(s => s.completed).length} / {steps.length})
          </Text>
          {steps.map((step) => (
            <TouchableOpacity
              key={step.id ?? step.number}
              style={[styles.stepRow, step.completed && styles.stepRowDone]}
              onPress={() => handleToggleStep(step)}
              activeOpacity={0.7}
            >
              <View style={[styles.stepCheckbox, step.completed && styles.stepCheckboxDone]}>
                {step.completed && <Text style={styles.stepCheckboxIcon}>✓</Text>}
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    typography.body,
                    { fontWeight: '700' },
                    step.completed && { textDecorationLine: 'line-through', color: colors.textMuted },
                  ]}
                >
                  {step.number}. {step.title}
                </Text>
                <Text
                  style={[
                    typography.bodySmall,
                    { marginTop: 2 },
                    step.completed && { color: colors.textMuted },
                  ]}
                  numberOfLines={3}
                >
                  {step.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}

      {pieces.length > 0 && (
        <>
          <Text style={[typography.label, { marginTop: spacing.xl, marginBottom: spacing.md }]}>Piezas ({pieces.length})</Text>
          {pieces.map((p, i) => (
            <View key={i} style={styles.row}><Text style={typography.body}>{p.width} × {p.height} cm — {p.quantity} ud</Text></View>
          ))}
        </>
      )}

      {optimization && (
        <>
          <Text style={[typography.label, { marginTop: spacing.xl, marginBottom: spacing.md }]}>Optimizacion</Text>
          <View style={[styles.optCard, shadows.sm]}>
            <Text style={[typography.body, { marginBottom: spacing.sm }]}>Tableros: <Text style={{ fontWeight: '700', color: colors.accent }}>{optimization.total_boards}</Text></Text>
            <EfficiencyGauge value={optimization.efficiency} label="Eficiencia" size="small" />
          </View>
        </>
      )}

      {materials.length > 0 && (
        <>
          <Text style={[typography.label, { marginTop: spacing.xl, marginBottom: spacing.md }]}>{t('materials.title')} ({materials.length})</Text>
          {materials.map((m, i) => (
            <View key={i} style={styles.row}>
              <Text style={typography.body}>{m.name}</Text>
              <Text style={[typography.body, { color: colors.primary, fontWeight: '600' }]}>{m.quantity} {m.unit || 'ud'}</Text>
            </View>
          ))}
        </>
      )}

      {shops.length > 0 && (
        <>
          <Text style={[typography.label, { marginTop: spacing.xl, marginBottom: spacing.md }]}>{t('shop.title')} ({shops.length})</Text>
          {shops.map((s, i) => (
            <View key={i} style={styles.row}>
              <Text style={typography.body}>{s.name}</Text>
              <Text style={[typography.body, { color: colors.success, fontWeight: '600' }]}>{s.price.toFixed(2)} €</Text>
            </View>
          ))}
        </>
      )}

      <TouchableOpacity
        style={[styles.mainBtn, { backgroundColor: accentColor }, shadows.md]}
        onPress={() => project.mode === 'diy' ? navigation.navigate('DIYInput') : navigation.navigate('ProInput')}
        activeOpacity={0.85}
      >
        <IconLabel
          icon="refresh"
          label={project.mode === 'diy' ? 'Regenerar' : 'Recalcular'}
          color={project.mode === 'diy' ? colors.textOnPrimary : colors.textOnAccent}
          textStyle={[typography.button, { color: project.mode === 'diy' ? colors.textOnPrimary : colors.textOnAccent }]}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  editRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  editInput: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, fontSize: 18, fontWeight: 'bold', color: colors.text, borderWidth: 1, borderColor: colors.primary },
  editBtn: { marginLeft: spacing.sm, backgroundColor: colors.primary, borderRadius: radius.full, width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  tagRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm, marginBottom: spacing.md },
  tag: { borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: 4 },
  tagRowInner: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  diffDot: { width: 8, height: 8, borderRadius: 4 },
  actions: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  actionBtn: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, paddingVertical: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.sm },
  optCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.xl },
  mainBtn: { paddingVertical: 18, borderRadius: radius.lg, alignItems: 'center', marginTop: spacing.xxl },
  // Progreso
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
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
    height: 4,
    backgroundColor: colors.bgAlt,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 4,
    borderRadius: radius.full,
  },
  completedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  completedLabel: {
    ...typography.caption,
    color: colors.success,
    fontWeight: '700',
  },
  // Steps con checkboxes
  stepRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  stepRowDone: {
    backgroundColor: colors.success + '11',
    borderColor: colors.success + '44',
  },
  stepCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepCheckboxDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  stepCheckboxIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
