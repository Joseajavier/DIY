// ═══════════════════════════════════════════════════════════════
// DESPIECE SCREEN — utilidad pura de despiece de tableros.
// ───────────────────────────────────────────────────────────────
// Entrada: piezas (ancho × alto × qty) + tablero (ancho × alto)
//          + grosor de hoja (kerf).
// Salida:  diagrama visual de cortes + nº de tableros + kerf total
//          gastado.
//
// NO guarda proyecto, NO genera materiales, NO lista tiendas, NO IA.
// Es una calculadora. Vive en Utilidades, junto al resto de cálculos.
// ═══════════════════════════════════════════════════════════════

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Piece } from '../../models';
import { optimizeCuts } from '../../services/cuttingOptimizer';
import { colors, spacing, radius, typography, shadows } from '../../theme';
import { BoardDiagram, MetricCard } from '../../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Despiece'>;
  route: RouteProp<RootStackParamList, 'Despiece'>;
};

// ── Presets de grosor de hoja (kerf) ──────────────────────────
type KerfOption = {
  value: number;
  labelKey: string;
  subtitleKey: string;
};

const KERF_OPTIONS: KerfOption[] = [
  { value: 0,   labelKey: 'pro.kerfOptNoneLabel',     subtitleKey: 'pro.kerfOptNoneSub' },
  { value: 0.1, labelKey: 'pro.kerfOptHandLabel',     subtitleKey: 'pro.kerfOptHandSub' },
  { value: 0.2, labelKey: 'pro.kerfOptMultiLabel',    subtitleKey: 'pro.kerfOptMultiSub' },
  { value: 0.3, labelKey: 'pro.kerfOptCircularLabel', subtitleKey: 'pro.kerfOptCircularSub' },
  { value: 0.4, labelKey: 'pro.kerfOptJigsawLabel',   subtitleKey: 'pro.kerfOptJigsawSub' },
  { value: 0.5, labelKey: 'pro.kerfOptTableLabel',    subtitleKey: 'pro.kerfOptTableSub' },
];

export default function DespieceScreen({ navigation: _nav, route }: Props) {
  const { t } = useTranslation();
  const { width: screenWidth } = useWindowDimensions();

  const params = route.params;
  const seededPieces: Piece[] | undefined = params?.initialPieces?.length
    ? params.initialPieces.map((p) => ({
        width: p.width,
        height: p.height,
        quantity: p.quantity,
        name: p.name,
        thickness: p.thickness,
      }))
    : undefined;

  const [kerfValue, setKerfValue] = useState<number>(0.3);
  const [kerfPickerOpen, setKerfPickerOpen] = useState(false);
  const [boardWidth, setBoardWidth] = useState(
    params?.initialBoardWidth ? String(params.initialBoardWidth) : '244'
  );
  const [boardHeight, setBoardHeight] = useState(
    params?.initialBoardHeight ? String(params.initialBoardHeight) : '122'
  );
  const [pieces, setPieces] = useState<Piece[]>(
    seededPieces ?? [{ width: 60, height: 40, quantity: 2 }]
  );

  const selectedKerf = useMemo(
    () => KERF_OPTIONS.find((o) => o.value === kerfValue) ?? KERF_OPTIONS[3],
    [kerfValue]
  );

  const addPiece = () => setPieces([...pieces, { width: 0, height: 0, quantity: 1 }]);
  const updatePiece = (i: number, field: keyof Piece, value: string) => {
    const u = [...pieces];
    u[i] = { ...u[i], [field]: Number(value) || 0 };
    setPieces(u);
  };
  const removePiece = (i: number) => {
    if (pieces.length > 1) setPieces(pieces.filter((_, j) => j !== i));
  };

  const bw = Number(boardWidth) || 0;
  const bh = Number(boardHeight) || 0;
  const validPieces = pieces.filter((p) => p.width > 0 && p.height > 0 && p.quantity > 0);
  const canCompute = bw > 0 && bh > 0 && validPieces.length > 0;

  const optimization = useMemo(() => {
    if (!canCompute) return null;
    return optimizeCuts(validPieces, bw, bh, kerfValue);
  }, [canCompute, validPieces, bw, bh, kerfValue]);

  const diagramWidth = Math.min(screenWidth - spacing.xl * 2, 360);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={[typography.h1, { color: colors.accent, marginBottom: spacing.sm }]}>
        {t('despiece.title')}
      </Text>
      <Text style={[typography.bodySmall, { color: colors.textMuted, marginBottom: spacing.xl }]}>
        {t('despiece.subtitle')}
      </Text>

      {/* ── Grosor de hoja ──────────────────────────────────── */}
      <Text style={typography.label}>{t('pro.kerfTitle')}</Text>
      <Text style={[typography.bodySmall, { color: colors.textMuted, marginTop: 4, marginBottom: spacing.md }]}>
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
        <Text style={styles.selectorChevron}>▾</Text>
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

      {/* ── Tablero ──────────────────────────────────────────── */}
      <Text style={[typography.label, { marginTop: spacing.lg }]}>{t('pro.boardSize')}</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder={t('pro.width')}
          placeholderTextColor={colors.textMuted}
          value={boardWidth}
          onChangeText={setBoardWidth}
          keyboardType="numeric"
        />
        <Text style={styles.x}>×</Text>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder={t('pro.height')}
          placeholderTextColor={colors.textMuted}
          value={boardHeight}
          onChangeText={setBoardHeight}
          keyboardType="numeric"
        />
      </View>

      {/* ── Piezas ───────────────────────────────────────────── */}
      <Text style={[typography.label, { marginTop: spacing.lg }]}>{t('pro.piecesToCut')}</Text>
      {pieces.map((p, i) => (
        <View key={i} style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            placeholder={t('pro.width')}
            placeholderTextColor={colors.textMuted}
            value={p.width ? String(p.width) : ''}
            onChangeText={(v) => updatePiece(i, 'width', v)}
            keyboardType="numeric"
          />
          <Text style={styles.x}>×</Text>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            placeholder={t('pro.height')}
            placeholderTextColor={colors.textMuted}
            value={p.height ? String(p.height) : ''}
            onChangeText={(v) => updatePiece(i, 'height', v)}
            keyboardType="numeric"
          />
          <Text style={styles.x}>×</Text>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder={t('pro.qty')}
            placeholderTextColor={colors.textMuted}
            value={p.quantity ? String(p.quantity) : ''}
            onChangeText={(v) => updatePiece(i, 'quantity', v)}
            keyboardType="numeric"
          />
          {pieces.length > 1 && (
            <TouchableOpacity
              onPress={() => removePiece(i)}
              style={{ marginLeft: spacing.sm, padding: spacing.sm }}
            >
              <Text style={{ color: colors.danger, fontSize: 16, fontWeight: 'bold' }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.addBtn} onPress={addPiece}>
        <Text style={[typography.buttonSmall, { color: colors.accent }]}>{t('pro.addPiece')}</Text>
      </TouchableOpacity>

      {/* ── Resultado en vivo ────────────────────────────────── */}
      {optimization ? (
        <View style={{ marginTop: spacing.xl }}>
          <Text style={[typography.h2, { color: colors.text, marginBottom: spacing.md }]}>
            {t('despiece.resultTitle')}
          </Text>

          <View style={styles.metricsRow}>
            <MetricCard
              value={String(optimization.totalBoards)}
              label={t('pro.boards')}
              color={colors.accent}
            />
            <MetricCard
              value={`${optimization.efficiency.toFixed(1)}%`}
              label={t('pro.efficiency')}
              color={colors.success}
            />
            <MetricCard
              value={`${optimization.totalWaste.toFixed(1)}%`}
              label={t('pro.waste')}
              color={colors.warning}
            />
          </View>

          <Text style={[typography.bodySmall, { color: colors.textMuted, marginTop: spacing.md, marginBottom: spacing.lg }]}>
            {t('pro.kerfApplied', { value: kerfValue.toFixed(2) })}
          </Text>

          {optimization.boards.map((board) => (
            <View key={board.boardIndex} style={[styles.boardCard, shadows.sm]}>
              <BoardDiagram
                pieces={board.pieces}
                boardWidth={optimization.boardWidth ?? bw}
                boardHeight={optimization.boardHeight ?? bh}
                displayWidth={diagramWidth}
                boardIndex={board.boardIndex}
                wastePercentage={board.wastePercentage}
              />
            </View>
          ))}
        </View>
      ) : (
        <Text style={[typography.bodySmall, { color: colors.textMuted, marginTop: spacing.xl, textAlign: 'center' }]}>
          {t('despiece.fillToCompute')}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  x: { color: colors.textMuted, fontSize: 18, marginHorizontal: spacing.sm },
  addBtn: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderStyle: 'dashed',
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  boardCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  // Selector
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  selectorChevron: { color: colors.textMuted, fontSize: 18, marginLeft: spacing.md },
  // Modal
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginVertical: 2,
  },
  optionRowActive: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.accent },
  check: { color: colors.accent, fontSize: 20, fontWeight: '700', marginLeft: spacing.md },
  modalCloseBtn: {
    alignSelf: 'center',
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
});
