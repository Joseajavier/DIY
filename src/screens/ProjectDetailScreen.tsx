import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Project, Piece, Material, StoreOption, OptimizationRow } from '../models';
import { getProjectById, updateProject } from '../storage/projectRepository';
import { getPiecesByProject } from '../storage/pieceRepository';
import { getMaterialsByProject } from '../storage/materialRepository';
import { getOptimizationByProject } from '../storage/optimizationRepository';
import { getShopOptionsByProject } from '../storage/shopRepository';
import { colors } from '../utils/theme';
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

  const loadProject = useCallback(async () => {
    const p = await getProjectById(projectId);
    setProject(p);
    if (p) setEditName(p.name);
    setPieces(await getPiecesByProject(projectId));
    setMaterials(await getMaterialsByProject(projectId));
    setOptimization(await getOptimizationByProject(projectId));
    setShops(await getShopOptionsByProject(projectId));
  }, [projectId]);

  useFocusEffect(useCallback(() => { loadProject(); }, [loadProject]));

  const handleRename = async () => {
    if (editName.trim() && editName !== project?.name) {
      await rename(projectId, editName.trim());
      setProject((p) => p ? { ...p, name: editName.trim() } : p);
    }
    setEditing(false);
  };

  const handleDuplicate = async () => {
    const newId = await duplicate(projectId);
    if (newId) {
      Alert.alert('Proyecto duplicado', 'Se ha creado una copia del proyecto.');
      navigation.replace('ProjectDetail', { projectId: newId });
    }
  };

  const handleDelete = () => {
    Alert.alert(t('projects.delete'), t('projects.deleteConfirm', { name: project?.name }), [
      { text: t('projects.cancel'), style: 'cancel' },
      {
        text: t('projects.deleteBtn'),
        style: 'destructive',
        onPress: async () => {
          await remove(projectId);
          navigation.goBack();
        },
      },
    ]);
  };

  const handleShare = async () => {
    if (!project) return;
    let text = `🪵 ${project.name} (${project.mode.toUpperCase()})\n`;
    if (project.description) text += `${project.description}\n`;
    text += '\n';
    if (pieces.length) {
      text += '📐 Piezas:\n';
      pieces.forEach((p) => { text += `  • ${p.width}×${p.height}cm × ${p.quantity}ud\n`; });
      text += '\n';
    }
    if (optimization) {
      text += `📊 Optimización: ${optimization.total_boards} tableros, ${optimization.efficiency.toFixed(1)}% eficiencia\n\n`;
    }
    if (materials.length) {
      text += '📦 Materiales:\n';
      materials.forEach((m) => { text += `  • ${m.name}: ${m.quantity} ${m.unit || 'ud'}\n`; });
      text += '\n';
    }
    if (shops.length) {
      text += '🛒 Tiendas:\n';
      shops.forEach((s) => { text += `  • ${s.name}: ${s.price.toFixed(2)}€ (${s.time})\n`; });
    }
    text += '\n— Generado con DIY App';
    await Share.share({ message: text });
  };

  if (!project) {
    return <View style={styles.container}><Text style={styles.empty}>Cargando...</Text></View>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {editing ? (
        <View style={styles.editRow}>
          <TextInput
            style={styles.editInput}
            value={editName}
            onChangeText={setEditName}
            autoFocus
            onSubmitEditing={handleRename}
          />
          <TouchableOpacity onPress={handleRename} style={styles.editBtn}>
            <Text style={styles.editBtnText}>✓</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setEditing(true)}>
          <Text style={styles.title}>{project.name} ✏️</Text>
        </TouchableOpacity>
      )}

      <View style={styles.tagRow}>
        <View style={[styles.tag, { backgroundColor: project.mode === 'diy' ? colors.accent + '33' : colors.accentPro + '33' }]}>
          <Text style={[styles.tagText, { color: project.mode === 'diy' ? colors.accent : colors.accentPro }]}>
            {project.mode.toUpperCase()}
          </Text>
        </View>
        {project.createdAt && (
          <Text style={styles.date}>
            {new Date(project.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
          </Text>
        )}
      </View>
      {project.description ? <Text style={styles.desc}>{project.description}</Text> : null}

      {/* Actions bar */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleDuplicate}>
          <Text style={styles.actionText}>📋 Duplicar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
          <Text style={styles.actionText}>📤 Compartir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.actionDanger]} onPress={handleDelete}>
          <Text style={[styles.actionText, { color: colors.danger }]}>🗑 Borrar</Text>
        </TouchableOpacity>
      </View>

      {pieces.length > 0 && (
        <>
          <Text style={styles.section}>Piezas ({pieces.length})</Text>
          {pieces.map((p, i) => (
            <Card key={i}>
              <Text style={styles.pieceText}>
                {p.width} × {p.height} cm — {p.quantity} ud {p.thickness ? `(${p.thickness}mm)` : ''}
              </Text>
            </Card>
          ))}
        </>
      )}

      {optimization && (
        <>
          <Text style={styles.section}>Optimización</Text>
          <Card>
            <Text style={styles.infoLine}>Tableros: <Text style={styles.bold}>{optimization.total_boards}</Text></Text>
            <EfficiencyGauge value={optimization.efficiency} label="Eficiencia" size="small" />
          </Card>
        </>
      )}

      {materials.length > 0 && (
        <>
          <Text style={styles.section}>{t('materials.title')} ({materials.length})</Text>
          {materials.map((m, i) => (
            <View key={i} style={styles.matRow}>
              <Text style={styles.matName}>{m.name}</Text>
              <Text style={styles.matQty}>{m.quantity} {m.unit || 'ud'}</Text>
            </View>
          ))}
        </>
      )}

      {shops.length > 0 && (
        <>
          <Text style={styles.section}>{t('shop.title')} ({shops.length})</Text>
          {shops.map((s, i) => (
            <View key={i} style={styles.matRow}>
              <Text style={styles.matName}>{s.name}</Text>
              <Text style={styles.matQty}>{s.price.toFixed(2)} €</Text>
            </View>
          ))}
        </>
      )}

      {/* Recalculate / Re-run */}
      <TouchableOpacity
        style={project.mode === 'diy' ? styles.buttonAccent : styles.buttonPro}
        onPress={() => {
          if (project.mode === 'diy') navigation.navigate('DIYInput');
          else navigation.navigate('ProInput');
        }}
      >
        <Text style={project.mode === 'diy' ? styles.buttonText : styles.buttonTextWhite}>
          🔄 {project.mode === 'diy' ? 'Regenerar' : 'Recalcular'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 40 },
  empty: { color: colors.textMuted, fontSize: 16, textAlign: 'center', marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  editRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  editInput: { flex: 1, backgroundColor: colors.card, borderRadius: 10, padding: 12, fontSize: 18, fontWeight: 'bold', color: colors.text, borderWidth: 1, borderColor: colors.accent },
  editBtn: { marginLeft: 10, backgroundColor: colors.accent, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10 },
  editBtnText: { fontSize: 18, fontWeight: 'bold', color: colors.textDark },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  tag: { borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 12, fontWeight: '700' },
  date: { fontSize: 13, color: colors.textMuted },
  desc: { fontSize: 14, color: colors.textSecondary, lineHeight: 20, marginBottom: 12 },
  actionsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  actionBtn: { flex: 1, backgroundColor: colors.card, borderRadius: 10, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  actionDanger: { borderColor: colors.danger + '44' },
  actionText: { fontSize: 13, color: colors.textSecondary, fontWeight: '500' },
  section: { fontSize: 17, fontWeight: '600', color: colors.accent, marginTop: 24, marginBottom: 12 },
  pieceText: { fontSize: 14, color: colors.text },
  infoLine: { fontSize: 14, color: colors.textSecondary, marginBottom: 8 },
  bold: { fontWeight: 'bold', color: colors.accentPro },
  matRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.card, borderRadius: 10, padding: 12, marginBottom: 6 },
  matName: { fontSize: 14, color: colors.text },
  matQty: { fontSize: 14, color: colors.accent, fontWeight: '600' },
  buttonAccent: { backgroundColor: colors.accent, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  buttonPro: { backgroundColor: colors.accentPro, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  buttonText: { fontSize: 16, fontWeight: '600', color: colors.textDark },
  buttonTextWhite: { fontSize: 16, fontWeight: '600', color: colors.white },
});
