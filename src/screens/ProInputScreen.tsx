import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Piece } from '../models';
import { createProject } from '../storage/projectRepository';
import { createPieces } from '../storage/pieceRepository';
import { setLastProjectId } from '../storage/settingsStorage';
import { colors } from '../utils/theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'ProInput'> };

export default function ProInputScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [projectName, setProjectName] = useState('');
  const [boardWidth, setBoardWidth] = useState('244');
  const [boardHeight, setBoardHeight] = useState('122');
  const [pieces, setPieces] = useState<Piece[]>([{ width: 60, height: 40, quantity: 2 }]);

  const addPiece = () => setPieces([...pieces, { width: 0, height: 0, quantity: 1 }]);
  const updatePiece = (i: number, field: keyof Piece, value: string) => {
    const u = [...pieces]; u[i] = { ...u[i], [field]: Number(value) || 0 }; setPieces(u);
  };
  const removePiece = (i: number) => { if (pieces.length > 1) setPieces(pieces.filter((_, j) => j !== i)); };

  const handleOptimize = async () => {
    if (!projectName.trim()) { Alert.alert(t('errors.error'), t('errors.noName')); return; }
    const valid = pieces.filter((p) => p.width > 0 && p.height > 0 && p.quantity > 0);
    if (!valid.length) { Alert.alert(t('errors.error'), t('errors.noPieces')); return; }
    const id = await createProject(projectName.trim(), 'pro');
    await createPieces(id, valid);
    setLastProjectId(id);
    navigation.navigate('ProOptimization', { projectName: projectName.trim(), pieces: valid, boardWidth: Number(boardWidth) || 244, boardHeight: Number(boardHeight) || 122 });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('pro.title')}</Text>
      <Text style={styles.label}>{t('pro.projectName')}</Text>
      <TextInput style={styles.input} placeholder={t('pro.projectNamePlaceholder')} placeholderTextColor={colors.textMuted} value={projectName} onChangeText={setProjectName} />
      <Text style={styles.label}>{t('pro.boardSize')}</Text>
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.half]} placeholder={t('pro.width')} placeholderTextColor={colors.textMuted} value={boardWidth} onChangeText={setBoardWidth} keyboardType="numeric" />
        <Text style={styles.x}>×</Text>
        <TextInput style={[styles.input, styles.half]} placeholder={t('pro.height')} placeholderTextColor={colors.textMuted} value={boardHeight} onChangeText={setBoardHeight} keyboardType="numeric" />
      </View>
      <Text style={styles.section}>{t('pro.piecesToCut')}</Text>
      {pieces.map((p, i) => (
        <View key={i} style={styles.row}>
          <TextInput style={[styles.input, styles.pieceIn]} placeholder={t('pro.width')} placeholderTextColor={colors.textMuted} value={p.width ? String(p.width) : ''} onChangeText={(v) => updatePiece(i, 'width', v)} keyboardType="numeric" />
          <Text style={styles.x}>×</Text>
          <TextInput style={[styles.input, styles.pieceIn]} placeholder={t('pro.height')} placeholderTextColor={colors.textMuted} value={p.height ? String(p.height) : ''} onChangeText={(v) => updatePiece(i, 'height', v)} keyboardType="numeric" />
          <Text style={styles.x}>×</Text>
          <TextInput style={[styles.input, styles.qtyIn]} placeholder={t('pro.qty')} placeholderTextColor={colors.textMuted} value={p.quantity ? String(p.quantity) : ''} onChangeText={(v) => updatePiece(i, 'quantity', v)} keyboardType="numeric" />
          {pieces.length > 1 && <TouchableOpacity onPress={() => removePiece(i)} style={styles.rm}><Text style={styles.rmTxt}>✕</Text></TouchableOpacity>}
        </View>
      ))}
      <TouchableOpacity style={styles.addBtn} onPress={addPiece}><Text style={styles.addTxt}>{t('pro.addPiece')}</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleOptimize}><Text style={styles.buttonText}>{t('pro.optimize')}</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.accentPro, marginBottom: 24 },
  label: { fontSize: 14, color: colors.textSecondary, marginBottom: 8 },
  section: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 14, marginTop: 8 },
  input: { backgroundColor: colors.card, borderRadius: 10, padding: 14, fontSize: 16, color: colors.text, borderWidth: 1, borderColor: colors.border, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },
  half: { flex: 1 },
  x: { color: colors.textMuted, fontSize: 18, marginHorizontal: 8, marginBottom: 12 },
  pieceIn: { flex: 2 },
  qtyIn: { flex: 1 },
  rm: { marginLeft: 8, marginBottom: 12, padding: 8 },
  rmTxt: { color: colors.danger, fontSize: 16, fontWeight: 'bold' },
  addBtn: { borderWidth: 1, borderColor: colors.accentPro, borderStyle: 'dashed', borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 20 },
  addTxt: { color: colors.accentPro, fontSize: 15 },
  button: { backgroundColor: colors.accentPro, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { fontSize: 18, fontWeight: '600', color: colors.white },
});
