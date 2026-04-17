import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Switch, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Piece } from '../../models';
import { createProject } from '../../storage/projectRepository';
import { createPieces } from '../../storage/pieceRepository';
import { setLastProjectId } from '../../storage/settingsStorage';
import { optimizeCuts } from '../../services/cuttingOptimizer';
import { generateMaterials } from '../../services/materialsGenerator';
import { generateProPlanWithAI } from '../../services/apiClient';
import { colors, spacing, radius, typography, shadows } from '../../theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'ProInput'> };

export default function ProInputScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const [projectName, setProjectName] = useState('');
  const [boardWidth, setBoardWidth] = useState('244');
  const [boardHeight, setBoardHeight] = useState('122');
  const [pieces, setPieces] = useState<Piece[]>([{ width: 60, height: 40, quantity: 2 }]);
  const [useAI, setUseAI] = useState(false);
  const [loading, setLoading] = useState(false);

  const addPiece = () => setPieces([...pieces, { width: 0, height: 0, quantity: 1 }]);
  const updatePiece = (i: number, field: keyof Piece, value: string) => {
    const u = [...pieces]; u[i] = { ...u[i], [field]: Number(value) || 0 }; setPieces(u);
  };
  const removePiece = (i: number) => { if (pieces.length > 1) setPieces(pieces.filter((_, j) => j !== i)); };

  const handleOptimize = async () => {
    if (!projectName.trim()) { Alert.alert(t('errors.error'), t('errors.noName')); return; }
    const valid = pieces.filter(p => p.width > 0 && p.height > 0 && p.quantity > 0);
    if (!valid.length) { Alert.alert(t('errors.error'), t('errors.noPieces')); return; }
    const bw = Number(boardWidth) || 244;
    const bh = Number(boardHeight) || 122;
    setLoading(true);
    const id = await createProject(projectName.trim(), 'pro');
    await createPieces(id, valid);
    setLastProjectId(id);

    if (useAI) {
      try {
        const ai = await generateProPlanWithAI({ pieces: valid, boardWidth: bw, boardHeight: bh, projectContext: projectName.trim(), language: i18n.language });
        const opt = ai.toolResults.optimizeCuts ? { ...ai.toolResults.optimizeCuts, boards: ai.toolResults.optimizeCuts.boards || [] } : optimizeCuts(valid, bw, bh);
        const mats = ai.toolResults.estimateMaterials || generateMaterials(valid, opt.totalBoards);
        setLoading(false);
        navigation.navigate('ProResults', { projectName: projectName.trim(), optimization: opt, materials: mats });
        return;
      } catch { Alert.alert('IA no disponible', 'Usando calculo local.'); }
    }
    setLoading(false);
    navigation.navigate('ProOptimization', { projectName: projectName.trim(), pieces: valid, boardWidth: bw, boardHeight: bh });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={[typography.h1, { color: colors.accent, marginBottom: spacing.xl }]}>{t('pro.title')}</Text>

      <View style={styles.toggle}>
        <Text style={[typography.body, { color: colors.text }]}>🤖 Usar IA</Text>
        <Switch value={useAI} onValueChange={setUseAI} trackColor={{ false: colors.border, true: colors.accent }} thumbColor={useAI ? colors.accentLight : colors.textMuted} />
      </View>

      <Text style={typography.label}>{t('pro.projectName')}</Text>
      <TextInput style={styles.input} placeholder={t('pro.projectNamePlaceholder')} placeholderTextColor={colors.textMuted} value={projectName} onChangeText={setProjectName} />

      <Text style={typography.label}>{t('pro.boardSize')}</Text>
      <View style={styles.row}>
        <TextInput style={[styles.input, { flex: 1 }]} placeholder={t('pro.width')} placeholderTextColor={colors.textMuted} value={boardWidth} onChangeText={setBoardWidth} keyboardType="numeric" />
        <Text style={styles.x}>×</Text>
        <TextInput style={[styles.input, { flex: 1 }]} placeholder={t('pro.height')} placeholderTextColor={colors.textMuted} value={boardHeight} onChangeText={setBoardHeight} keyboardType="numeric" />
      </View>

      <Text style={[typography.label, { marginTop: spacing.lg }]}>{t('pro.piecesToCut')}</Text>
      {pieces.map((p, i) => (
        <View key={i} style={styles.row}>
          <TextInput style={[styles.input, { flex: 2 }]} placeholder={t('pro.width')} placeholderTextColor={colors.textMuted} value={p.width ? String(p.width) : ''} onChangeText={v => updatePiece(i, 'width', v)} keyboardType="numeric" />
          <Text style={styles.x}>×</Text>
          <TextInput style={[styles.input, { flex: 2 }]} placeholder={t('pro.height')} placeholderTextColor={colors.textMuted} value={p.height ? String(p.height) : ''} onChangeText={v => updatePiece(i, 'height', v)} keyboardType="numeric" />
          <Text style={styles.x}>×</Text>
          <TextInput style={[styles.input, { flex: 1 }]} placeholder={t('pro.qty')} placeholderTextColor={colors.textMuted} value={p.quantity ? String(p.quantity) : ''} onChangeText={v => updatePiece(i, 'quantity', v)} keyboardType="numeric" />
          {pieces.length > 1 && <TouchableOpacity onPress={() => removePiece(i)} style={{ marginLeft: spacing.sm, padding: spacing.sm }}><Text style={{ color: colors.danger, fontSize: 16, fontWeight: 'bold' }}>✕</Text></TouchableOpacity>}
        </View>
      ))}

      <TouchableOpacity style={styles.addBtn} onPress={addPiece}><Text style={[typography.buttonSmall, { color: colors.accent }]}>{t('pro.addPiece')}</Text></TouchableOpacity>

      <TouchableOpacity style={[styles.button, loading && { opacity: 0.6 }, shadows.md]} onPress={handleOptimize} disabled={loading}>
        {loading ? <ActivityIndicator color={colors.textOnAccent} /> : <Text style={[typography.button, { color: colors.textOnAccent }]}>{useAI ? '🤖 ' : ''}{t('pro.optimize')}</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  toggle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.xl, borderWidth: 1, borderColor: colors.border },
  input: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, fontSize: 16, color: colors.text, borderWidth: 1, borderColor: colors.border, marginTop: spacing.sm, marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center' },
  x: { color: colors.textMuted, fontSize: 18, marginHorizontal: spacing.sm },
  addBtn: { borderWidth: 1, borderColor: colors.accent, borderStyle: 'dashed', borderRadius: radius.md, padding: spacing.lg, alignItems: 'center', marginBottom: spacing.xl },
  button: { backgroundColor: colors.accent, paddingVertical: 18, borderRadius: radius.lg, alignItems: 'center' },
});
