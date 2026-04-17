// ═══════════════════════════════════════════════════════════════
// DESK GENERATOR SCREEN — escritorio paramétrico con cajón opcional.
// ═══════════════════════════════════════════════════════════════

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../../theme';
import { generateDesk, DESK_DEFAULTS } from '../../services/parametric';
import { TableIsometric } from '../../components';
import HardwareCard from '../../components/HardwareCard';
import { useSaveAndOptimize } from '../../hooks/useSaveAndOptimize';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DeskGenerator'>;
};

export default function DeskGeneratorScreen({ navigation: _navigation }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const [length, setLength] = useState(String(DESK_DEFAULTS.length));
  const [width, setWidth] = useState(String(DESK_DEFAULTS.width));
  const [height, setHeight] = useState(String(DESK_DEFAULTS.height));
  const [legSection, setLegSection] = useState(String(DESK_DEFAULTS.legSection));
  const [topThickness, setTopThickness] = useState(String(DESK_DEFAULTS.topThickness));
  const [hasDrawer, setHasDrawer] = useState(DESK_DEFAULTS.hasDrawer);
  const [hasShelf, setHasShelf] = useState(DESK_DEFAULTS.hasShelf);
  const [numLegs, setNumLegs] = useState<4 | 6>(DESK_DEFAULTS.numLegs);

  const previewSize = Math.min(screenWidth - spacing.xl * 2, 320);

  const numericParams = useMemo(() => ({
    len: parseFloat(length) || 0,
    w: parseFloat(width) || 0,
    h: parseFloat(height) || 0,
    ls: parseFloat(legSection) || 0,
    t: parseFloat(topThickness) || 25,
  }), [length, width, height, legSection, topThickness]);

  const output = useMemo(() => generateDesk({
    length: numericParams.len,
    width: numericParams.w,
    height: numericParams.h,
    legSection: numericParams.ls,
    topThickness: numericParams.t,
    hasDrawer,
    hasShelf,
    numLegs,
  }), [numericParams, hasDrawer, hasShelf, numLegs]);

  const canProceed = output.pieces.length > 0 && output.warnings.length === 0;

  const { saveOnly, saveAndOptimize, exportPdf, saving } = useSaveAndOptimize();
  const projectName = `Escritorio ${length}×${width}×${height}`;
  const pdfDims = { length: numericParams.len, width: numericParams.w, height: numericParams.h };
  const handleSave = () => saveOnly(projectName, output);
  const handleOptimize = () => saveAndOptimize(projectName, output, 244, 122);
  const handleExportPdf = () => exportPdf(projectName, pdfDims, output);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[typography.h1, { color: colors.accent }]}>🖥️ Escritorio</Text>
      <Text style={[typography.bodySmall, { marginBottom: spacing.lg, color: colors.textSecondary }]}>
        Tablero sobre patas macizas con faldones de rigidez. Cajón lateral
        y balda inferior opcionales.
      </Text>

      {/* Preview 3D */}
      <View style={[styles.previewCard, shadows.sm]}>
        <TableIsometric
          length={numericParams.len}
          width={numericParams.w}
          height={numericParams.h}
          legSection={numericParams.ls}
          topThickness={numericParams.t}
          hasApron={true}
          apronHeight={10}
          hasLowerShelf={hasShelf}
          displaySize={previewSize}
        />
        <Text style={[typography.caption, styles.previewCaption]}>
          Vista 3D · {numericParams.len}×{numericParams.w}×{numericParams.h}cm
        </Text>
      </View>

      {/* Parámetros */}
      <View style={[styles.card, shadows.sm]}>
        <FormRow label="Largo tablero" value={length} onChange={setLength} unit="cm" />
        <FormRow label="Fondo tablero" value={width} onChange={setWidth} unit="cm" />
        <FormRow label="Altura" value={height} onChange={setHeight} unit="cm" />
        <FormRow label="Sección pata" value={legSection} onChange={setLegSection} unit="cm" />
        <FormRow label="Grosor tablero" value={topThickness} onChange={setTopThickness} unit="mm" />

        {/* Nº de patas */}
        <View style={styles.segmentedRow}>
          <Text style={styles.formLabel}>Nº de patas</Text>
          <View style={styles.segmented}>
            {([4, 6] as (4|6)[]).map((n) => (
              <TouchableOpacity
                key={n}
                style={[styles.segment, numLegs === n && styles.segmentActive]}
                onPress={() => setNumLegs(n)}
              >
                <Text style={[styles.segmentText, numLegs === n && styles.segmentTextActive]}>
                  {n}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Toggle cajón */}
        <Toggle
          label="Cajón lateral"
          description="Cajón deslizante bajo el tablero"
          value={hasDrawer}
          onChange={setHasDrawer}
        />

        {/* Toggle balda */}
        <Toggle
          label="Balda inferior"
          description="Repisa entre las patas"
          value={hasShelf}
          onChange={setHasShelf}
        />
      </View>

      {/* Warnings */}
      {output.warnings.length > 0 && (
        <View style={[styles.warningCard, shadows.sm]}>
          <Text style={[typography.label, { color: colors.warning }]}>⚠️ Atención</Text>
          {output.warnings.map((w, i) => (
            <Text key={i} style={[typography.bodySmall, { color: colors.warning, marginTop: 4 }]}>
              • {w}
            </Text>
          ))}
        </View>
      )}

      {/* Tableros */}
      {output.pieces.length > 0 && (
        <>
          <Text style={[typography.label, styles.sectionHeading]}>🪵 TABLEROS (cortes 2D)</Text>
          <View style={[styles.card, shadows.sm]}>
            <Text style={[typography.bodySmall, { color: colors.textMuted, marginBottom: spacing.md }]}>
              {output.summary}
            </Text>
            {output.pieces.map((p, i) => (
              <View key={i} style={styles.pieceRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.pieceName}>{p.name}</Text>
                  <Text style={styles.pieceDims}>{p.width}×{p.height}cm · {p.thickness}mm</Text>
                </View>
                <Text style={styles.pieceQty}>×{p.quantity}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Listones */}
      {output.lumberPieces && output.lumberPieces.length > 0 && (
        <>
          <Text style={[typography.label, styles.sectionHeading]}>🪵 PATAS MACIZAS (compra lineal)</Text>
          <View style={[styles.card, shadows.sm]}>
            {output.lumberPieces.map((p, i) => (
              <View key={i} style={styles.pieceRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.pieceName}>{p.name}</Text>
                  <Text style={styles.pieceDims}>Sección {p.section} · Largo {p.length}cm</Text>
                </View>
                <Text style={styles.pieceQty}>×{p.quantity}</Text>
              </View>
            ))}
            <Text style={styles.lumberNote}>
              Los listones no entran al optimizador 2D — se compran a metros.
            </Text>
          </View>
        </>
      )}

      {/* Herrajes */}
      <HardwareCard items={output.hardware ?? []} />

      {/* Notas */}
      {output.notes.length > 0 && (
        <View style={styles.notesCard}>
          {output.notes.map((n, i) => (
            <Text key={i} style={[typography.caption, { color: colors.textSecondary, marginBottom: 4 }]}>
              • {n}
            </Text>
          ))}
        </View>
      )}

      {/* CTAs */}
      <View style={styles.ctaRow}>
        <TouchableOpacity
          style={[styles.saveButton, (!canProceed || saving) && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={!canProceed || saving}
          activeOpacity={0.85}
        >
          <Text style={[typography.button, { color: colors.accent }]}>💾 Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, shadows.md, (!canProceed || saving) && styles.buttonDisabled, { flex: 1, marginTop: 0 }]}
          onPress={handleOptimize}
          disabled={!canProceed || saving}
          activeOpacity={0.85}
        >
          <Text style={[typography.button, { color: colors.textOnAccent }]}>🪚 Optimizar cortes</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.pdfLink}
        onPress={handleExportPdf}
        disabled={!canProceed || saving}
      >
        <Text style={[typography.body, { color: colors.accent, textAlign: 'center', opacity: !canProceed || saving ? 0.4 : 1 }]}>
          📄 Exportar PDF del despiece
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ── Subcomponentes ────────────────────────────────────────────

interface FormRowProps {
  label: string; value: string;
  onChange: (v: string) => void; unit: string;
}
function FormRow({ label, value, onChange, unit }: FormRowProps) {
  return (
    <View style={styles.formRow}>
      <Text style={styles.formLabel}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          keyboardType="numeric"
          selectTextOnFocus
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
}

interface ToggleProps {
  label: string; description: string;
  value: boolean; onChange: (v: boolean) => void;
}
function Toggle({ label, description, value, onChange }: ToggleProps) {
  return (
    <TouchableOpacity style={styles.toggleRow} onPress={() => onChange(!value)} activeOpacity={0.7}>
      <View style={{ flex: 1 }}>
        <Text style={typography.body}>{label}</Text>
        <Text style={[typography.caption, { color: colors.textMuted }]}>{description}</Text>
      </View>
      <View style={[styles.toggle, value && styles.toggleOn]}>
        <View style={[styles.toggleBall, value && styles.toggleBallOn]} />
      </View>
    </TouchableOpacity>
  );
}

// ── Estilos ───────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  card: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.lg, marginBottom: spacing.md,
  },
  previewCard: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.lg, marginBottom: spacing.lg, alignItems: 'center',
  },
  previewCaption: { color: colors.textMuted, marginTop: spacing.sm },
  warningCard: {
    backgroundColor: colors.warning + '15', borderRadius: radius.lg,
    padding: spacing.lg, marginBottom: spacing.md,
    borderLeftWidth: 4, borderLeftColor: colors.warning,
  },
  notesCard: {
    backgroundColor: colors.surface, borderRadius: radius.md,
    padding: spacing.md, marginTop: spacing.sm, marginBottom: spacing.md,
  },
  sectionHeading: { marginTop: spacing.lg, marginBottom: spacing.md },
  formRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: spacing.md,
  },
  formLabel: { ...typography.body, flex: 1 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.sm, paddingHorizontal: spacing.md,
    width: 120, backgroundColor: colors.bg,
  },
  input: {
    flex: 1, paddingVertical: spacing.sm,
    color: colors.text, textAlign: 'right', fontSize: 16,
  },
  unit: { ...typography.caption, color: colors.textMuted, marginLeft: 4 },
  segmentedRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: spacing.md,
  },
  segmented: { flexDirection: 'row', borderRadius: radius.sm, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  segment: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, backgroundColor: colors.bg },
  segmentActive: { backgroundColor: colors.accent },
  segmentText: { ...typography.body, color: colors.text },
  segmentTextActive: { color: colors.textOnAccent, fontWeight: '700' },
  toggleRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: spacing.sm, paddingVertical: spacing.sm,
  },
  toggle: { width: 46, height: 26, borderRadius: 13, backgroundColor: colors.border, padding: 2, justifyContent: 'center' },
  toggleOn: { backgroundColor: colors.accent },
  toggleBall: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff' },
  toggleBallOn: { transform: [{ translateX: 20 }] },
  pieceRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: spacing.sm,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  pieceName: { ...typography.body, fontWeight: '600' },
  pieceDims: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  pieceQty: { ...typography.body, fontWeight: '700', color: colors.accent, marginLeft: spacing.md },
  lumberNote: { ...typography.caption, color: colors.textMuted, marginTop: spacing.md, fontStyle: 'italic' },
  button: {
    backgroundColor: colors.accent, paddingVertical: 18,
    borderRadius: radius.lg, alignItems: 'center', marginTop: spacing.xl,
  },
  buttonDisabled: { opacity: 0.5 },
  ctaRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
  saveButton: {
    backgroundColor: colors.surface, paddingVertical: 18,
    paddingHorizontal: spacing.lg, borderRadius: radius.lg,
    borderWidth: 2, borderColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  pdfLink: { marginTop: spacing.lg, paddingVertical: spacing.sm },
});
