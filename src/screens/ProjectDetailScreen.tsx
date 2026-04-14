import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Project, Piece, Material, StoreOption, OptimizationRow } from '../models';
import { getProjectById } from '../storage/projectRepository';
import { getPiecesByProject } from '../storage/pieceRepository';
import { getMaterialsByProject } from '../storage/materialRepository';
import { getOptimizationByProject } from '../storage/optimizationRepository';
import { getShopOptionsByProject } from '../storage/shopRepository';
import { colors, spacing, radius, typography, shadows } from '../theme';
import { Card, EfficiencyGauge } from '../components';
import { useProjects } from '../hooks/useProjects';

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
    })();
  }, [projectId]));

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
          <TouchableOpacity onPress={handleRename} style={styles.editBtn}><Text style={[typography.button, { color: colors.textOnPrimary }]}>✓</Text></TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setEditing(true)}>
          <Text style={[typography.h1, { color: accentColor }]}>{project.name} ✏️</Text>
        </TouchableOpacity>
      )}

      <View style={styles.tagRow}>
        <View style={[styles.tag, { backgroundColor: accentColor + '22' }]}>
          <Text style={[typography.caption, { color: accentColor }]}>{project.mode.toUpperCase()}</Text>
        </View>
        {project.createdAt && <Text style={typography.caption}>{new Date(project.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</Text>}
      </View>
      {project.description ? <Text style={[typography.bodySmall, { marginBottom: spacing.lg }]}>{project.description}</Text> : null}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleDuplicate}><Text style={[typography.caption, { color: colors.textSecondary }]}>📋 Duplicar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={handleShare}><Text style={[typography.caption, { color: colors.textSecondary }]}>📤 Compartir</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.danger + '44' }]} onPress={handleDelete}><Text style={[typography.caption, { color: colors.danger }]}>🗑 Borrar</Text></TouchableOpacity>
      </View>

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

      <TouchableOpacity style={[styles.mainBtn, { backgroundColor: accentColor }, shadows.md]} onPress={() => project.mode === 'diy' ? navigation.navigate('DIYInput') : navigation.navigate('ProInput')}>
        <Text style={[typography.button, { color: project.mode === 'diy' ? colors.textOnPrimary : colors.textOnAccent }]}>🔄 {project.mode === 'diy' ? 'Regenerar' : 'Recalcular'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  editRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  editInput: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, fontSize: 18, fontWeight: 'bold', color: colors.text, borderWidth: 1, borderColor: colors.primary },
  editBtn: { marginLeft: spacing.sm, backgroundColor: colors.primary, borderRadius: radius.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.sm, marginBottom: spacing.md },
  tag: { borderRadius: radius.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  actions: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  actionBtn: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, paddingVertical: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.sm },
  optCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.xl },
  mainBtn: { paddingVertical: 18, borderRadius: radius.lg, alignItems: 'center', marginTop: spacing.xxl },
});
