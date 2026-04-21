import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Switch, ActivityIndicator, Modal, Pressable } from 'react-native';
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
import { HeroBanner, SectionHeader, IconLabel, Icon } from '../../components';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'ProInput'> };

// ── Presets de grosor de hoja (kerf) ──────────────────────────────
// Valor en cm (coherente con el resto de inputs del formulario).
// Cubren las sierras típicas de carpintería doméstica + opción "sin sierra".
type KerfOption = {
  value: number;       // cm
  labelKey: string;    // clave i18n
  subtitleKey: string; // clave i18n (descripción corta)
};

const KERF_OPTIONS: KerfOption[] = [
  { value: 0,   labelKey: 'pro.kerfOptNoneLabel',     subtitleKey: 'pro.kerfOptNoneSub' },
  { value: 0.1, labelKey: 'pro.kerfOptHandLabel',     subtitleKey: 'pro.kerfOptHandSub' },
  { value: 0.2, labelKey: 'pro.kerfOptMultiLabel',    subtitleKey: 'pro.kerfOptMultiSub' },
  { value: 0.3, labelKey: 'pro.kerfOptCircularLabel', subtitleKey: 'pro.kerfOptCircularSub' },
  { value: 0.4, labelKey: 'pro.kerfOptJigsawLabel',   subtitleKey: 'pro.kerfOptJigsawSub' },
  { value: 0.5, labelKey: 'pro.kerfOptTableLabel',    subtitleKey: 'pro.kerfOptTableSub' },
];

export default function ProInputScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const [projectName, setProjectName] = useState('');
  const [kerfValue, setKerfValue] = useState<number>(0.3); // default circular ~3mm
  const [kerfPickerOpen, setKerfPickerOpen] = useState(false);
  const [boardWidth, setBoardWidth] = useState('244');
  const [boardHeight, setBoardHeight] = useState('122');
  const [pieces, setPieces] = useState<Piece[]>([{ width: 60, height: 40, quantity: 2 }]);
  const [useAI, setUseAI] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedKerf = useMemo(
    () => KERF_OPTIONS.find((o) => o.value === kerfValue) ?? KERF_OPTIONS[3],
    [kerfValue]
  );

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
    const kerfVal = Math.max(0, kerfValue);
    setLoading(true);
    const id = await createProject(projectName.trim(), 'pro');
    await createPieces(id, valid);
    setLastProjectId(id);

    if (useAI) {
      try {
        const ai = await generateProPlanWithAI({ pieces: valid, boardWidth: bw, boardHeight: bh, projectContext: projectName.trim(), language: i18n.language });
        const opt = ai.toolResults.optimizeCuts ? { ...ai.toolResults.optimizeCuts, boards: ai.toolResults.optimizeCuts.boards || [] } : optimizeCuts(valid, bw, bh, kerfVal);
        const mats = ai.toolResults.estimateMaterials || generateMaterials(valid, opt.totalBoards);
        setLoading(false);
        navigation.navigate('ProResults', { projectName: projectName.trim(), optimization: opt, materials: mats });
        return;
      } catch { Alert.alert(t('alerts.aiUnavailableTitle'), t('alerts.aiUnavailablePro')); }
    }
    setLoading(false);
    navigation.navigate('ProOptimization', { projectName: projectName.trim(), pieces: valid, boardWidth: bw, boardHeight: bh, kerf: kerfVal });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <HeroBanner
        variant="accent"
        eyebrow="PRO"
        title={t('pro.title')}
        subtitle="Medidas exactas, cortes optimizados."
      />

      {/* ── Grosor de hoja (selector) ──────────────────────────── */}
      <SectionHeader first>{t('pro.kerfTitle')}</SectionHeader>
      <Text style={[typography.bodySmall, { color: colors.textMuted, marginTop: -spacing.sm, marginBottom: spacing.md }]}>
        {t('pro.kerfHelp')}
      </Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setKerfPickerOpen(true)}
        activeOpacity={0.7}
      >
        <View style={{ flex: 1 }}>
          <Text style={[typography.body, { color: colors.text, fontWeight: '600' }]}>
            {t(selectedKerf.labelKey)}
          </Text>
          <Text style={[typography.bodySmall, { color: colors.textMuted, marginTop: 2 }]}>
            {t(selectedKerf.subtitleKey)}
          </Text>
        </View>
        <Icon name="forward" size={16} color={colors.textMuted} />
      </TouchableOpacity>

      {/* Picker modal */}
      <Modal
        visible={kerfPickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setKerfPickerOpen(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setKerfPickerOpen(false)}>
          <Pressable style={styles.modalSheet} onPress={(e) => e.stopPropagation()}>
            <Text style={[typography.h2, { color: colors.text, marginBottom: spacing.md }]}>
              {t('pro.kerfTitle')}
            </Text>
            {KERF_OPTIONS.map((opt) => {
              const active = opt.value === kerfValue;
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[styles.optionRow, active && styles.optionRowActive]}
                  onPress={() => { setKerfValue(opt.value); setKerfPickerOpen(false); }}
                  activeOpacity={0.7}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[typography.body, { color: colors.text, fontWeight: active ? '700' : '500' }]}>
                      {t(opt.labelKey)}
                    </Text>
                    <Text style={[typography.bodySmall, { color: colors.textMuted, marginTop: 2 }]}>
                      {t(opt.subtitleKey)}
                    </Text>
                  </View>
                  {active && <Text style={styles.check}>✓</Text>}
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setKerfPickerOpen(false)}>
              <Text style={[typography.button, { color: colors.accent }]}>{t('common.close')}</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      <View style={styles.toggle}>
        <IconLabel
          icon="sparkles"
          label="Usar IA"
          color={colors.accent}
          size={16}
          textStyle={[typography.body, { color: colors.text }]}
          left
        />
        <Switch value={useAI} onValueChange={setUseAI} trackColor={{ false: colors.border, true: colors.accent }} thumbColor={useAI ? colors.accentLight : colors.textMuted} />
      </View>

      <SectionHeader>{t('pro.projectName')}</SectionHeader>
      <TextInput style={styles.input} placeholder={t('pro.projectNamePlaceholder')} placeholderTextColor={colors.textMuted} value={projectName} onChangeText={setProjectName} />

      <SectionHeader>{t('pro.boardSize')}</SectionHeader>
      <View style={styles.row}>
        <TextInput style={[styles.input, { flex: 1 }]} placeholder={t('pro.width')} placeholderTextColor={colors.textMuted} value={boardWidth} onChangeText={setBoardWidth} keyboardType="numeric" />
        <Text style={styles.x}>×</Text>
        <TextInput style={[styles.input, { flex: 1 }]} placeholder={t('pro.height')} placeholderTextColor={colors.textMuted} value={boardHeight} onChangeText={setBoardHeight} keyboardType="numeric" />
      </View>

      <SectionHeader>{t('pro.piecesToCut')}</SectionHeader>
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

      <TouchableOpacity style={styles.addBtn} onPress={addPiece} activeOpacity={0.7}>
        <IconLabel
          icon="plus"
          label={t('pro.addPiece')}
          color={colors.accent}
          size={14}
          textStyle={[typography.buttonSmall, { color: colors.accent }]}
        />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, loading && { opacity: 0.6 }, shadows.md]} onPress={handleOptimize} disabled={loading} activeOpacity={0.85}>
        {loading ? (
          <ActivityIndicator color={colors.textOnAccent} />
        ) : (
          <IconLabel
            icon={useAI ? 'sparkles' : 'optimize'}
            label={t('pro.optimize')}
            color={colors.textOnAccent}
            textStyle={[typography.button, { color: colors.textOnAccent }]}
          />
        )}
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
  // Selector "dropdown"
  selector: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.xl },
  selectorChevron: { color: colors.textMuted, fontSize: 18, marginLeft: spacing.md },
  // Modal
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: colors.bg, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, padding: spacing.xl, paddingBottom: spacing.xxl },
  optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.lg, paddingHorizontal: spacing.md, borderRadius: radius.md, marginVertical: 2 },
  optionRowActive: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.accent },
  check: { color: colors.accent, fontSize: 20, fontWeight: '700', marginLeft: spacing.md },
  modalCloseBtn: { alignSelf: 'center', marginTop: spacing.md, paddingVertical: spacing.md, paddingHorizontal: spacing.xl },
});
