// ═══════════════════════════════════════════════════════════════
// CABINET GENERATOR SCREEN — armario con puertas batientes.
// ───────────────────────────────────────────────────────────────
// Genera tableros (carcasa + puertas + baldas) y opcionalmente
// un listón redondo macizo (barra de colgar Ø28mm).
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
import {
  generateCabinet,
  CABINET_DEFAULTS,
} from '../../services/parametric';
import { ShelfIsometric, IconLabel, InputGroup } from '../../components';
import HardwareCard from '../../components/HardwareCard';
import IsometricWrapper from '../../components/IsometricWrapper';
import { DespiezarLink } from '../../components';
import { useSaveAndOptimize } from '../../hooks/useSaveAndOptimize';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CabinetGenerator'>;
};

export default function CabinetGeneratorScreen({ navigation }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const [width, setWidth] = useState(String(CABINET_DEFAULTS.width));
  const [height, setHeight] = useState(String(CABINET_DEFAULTS.height));
  const [depth, setDepth] = useState(String(CABINET_DEFAULTS.depth));
  const [numDoors, setNumDoors] = useState<1 | 2>(CABINET_DEFAULTS.numDoors);
  const [numShelves, setNumShelves] = useState(String(CABINET_DEFAULTS.numShelves));
  const [thickness, setThickness] = useState(String(CABINET_DEFAULTS.thickness));
  const [hasHangingRod, setHasHangingRod] = useState(CABINET_DEFAULTS.hasHangingRod);

  const previewSize = Math.min(screenWidth - spacing.xl * 2, 300);

  const numericParams = useMemo(() => ({
    w: parseFloat(width) || 0,
    h: parseFloat(height) || 0,
    d: parseFloat(depth) || 0,
    ns: parseInt(numShelves, 10) || 0,
    t: parseFloat(thickness) || 16,
  }), [width, height, depth, numShelves, thickness]);

  const output = useMemo(() => {
    return generateCabinet({
      width: numericParams.w,
      height: numericParams.h,
      depth: numericParams.d,
      numDoors,
      numShelves: numericParams.ns,
      thickness: numericParams.t,
      hasHangingRod,
    });
  }, [numericParams, numDoors, hasHangingRod]);

  const canProceed = output.pieces.length > 0 && output.warnings.length === 0;

  const { saveOnly, saveAndOptimize, exportPdf, saving } = useSaveAndOptimize();
  const projectName = `Armario ${width}×${height}×${depth}`;
  const pdfDims = { length: numericParams.w, width: numericParams.d, height: numericParams.h };
  const handleSave = () => saveOnly(projectName, output);
  const handleOptimize = () =>
    saveAndOptimize(projectName, output, 244, 122);
  const handleExportPdf = () => exportPdf(projectName, pdfDims, output);

  const adjustShelves = (delta: number) => {
    const current = parseInt(numShelves, 10) || 0;
    const next = Math.max(0, Math.min(8, current + delta));
    setNumShelves(String(next));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[typography.h1, { color: colors.accent }]}>🚪 Armario</Text>
      <Text
        style={[
          typography.bodySmall,
          { marginBottom: spacing.lg, color: colors.textSecondary },
        ]}
      >
        Armario con puertas batientes, baldas interiores y barra de colgar
        opcional. Genera tableros (cortes 2D) y listón redondo aparte.
      </Text>

      {/* Preview 3D */}
      <View style={[styles.previewCard, shadows.sm]}>
        <IsometricWrapper><ShelfIsometric
          width={numericParams.w}
          height={numericParams.h}
          depth={numericParams.d}
          numShelves={numericParams.ns}
          thickness={numericParams.t}
          hasBack={true}
          displaySize={previewSize}
          frontPanels={{ type: 'door', count: numDoors }}
        />
        </IsometricWrapper>
        <Text style={[typography.caption, styles.previewCaption]}>
          Vista 3D · {numericParams.w}×{numericParams.h}×{numericParams.d}cm ·
          {' '}{numDoors} puerta{numDoors === 1 ? '' : 's'}
        </Text>
      </View>

      {/* Inputs — Dimensiones */}
      <InputGroup title="Dimensiones" subtitle="Medidas exteriores del armario">
        <FormRow label="Ancho" value={width} onChange={setWidth} unit="cm" />
        <FormRow label="Alto" value={height} onChange={setHeight} unit="cm" />
        <FormRow label="Fondo" value={depth} onChange={setDepth} unit="cm" />
      </InputGroup>

      {/* Inputs — Estructura */}
      <InputGroup title="Estructura" subtitle="Puertas, baldas y grosor">
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Puertas batientes</Text>
          <View style={styles.segmented}>
            {[1, 2].map((n) => (
              <TouchableOpacity
                key={n}
                style={[
                  styles.segment,
                  numDoors === n && styles.segmentActive,
                ]}
                onPress={() => setNumDoors(n as 1 | 2)}
              >
                <Text
                  style={[
                    styles.segmentText,
                    numDoors === n && styles.segmentTextActive,
                  ]}
                >
                  {n}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Baldas interiores</Text>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => adjustShelves(-1)}
            >
              <Text style={styles.stepBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.stepValue}>{numShelves}</Text>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => adjustShelves(1)}
            >
              <Text style={styles.stepBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FormRow
          label="Grosor"
          value={thickness}
          onChange={setThickness}
          unit="mm"
        />

        <TouchableOpacity
          style={styles.toggleRow}
          onPress={() => setHasHangingRod(!hasHangingRod)}
          activeOpacity={0.7}
        >
          <View style={{ flex: 1 }}>
            <Text style={typography.body}>Barra para colgar</Text>
            <Text style={[typography.caption, { color: colors.textMuted }]}>
              Listón redondo Ø28mm para perchas
            </Text>
          </View>
          <View style={[styles.toggle, hasHangingRod && styles.toggleOn]}>
            <View style={[styles.toggleBall, hasHangingRod && styles.toggleBallOn]} />
          </View>
        </TouchableOpacity>
      </InputGroup>

      {/* Warnings */}
      {output.warnings.length > 0 && (
        <View style={[styles.warningCard, shadows.sm]}>
          <Text style={[typography.label, { color: colors.warning }]}>
            ⚠️ Atención
          </Text>
          {output.warnings.map((w, i) => (
            <Text
              key={i}
              style={[
                typography.bodySmall,
                { color: colors.warning, marginTop: 4 },
              ]}
            >
              • {w}
            </Text>
          ))}
        </View>
      )}

      {/* Despiece tableros */}
      {output.pieces.length > 0 && (
        <>
          <Text style={[typography.label, styles.sectionHeading]}>
            🪵 TABLEROS (cortes 2D)
          </Text>
          <View style={[styles.card, shadows.sm]}>
            <Text
              style={[
                typography.bodySmall,
                { color: colors.textMuted, marginBottom: spacing.md },
              ]}
            >
              {output.summary}
            </Text>
            {output.pieces.map((p, i) => (
              <View key={i} style={styles.pieceRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.pieceName}>{p.name}</Text>
                  <Text style={styles.pieceDims}>
                    {p.width}×{p.height}cm · {p.thickness}mm
                  </Text>
                </View>
                <Text style={styles.pieceQty}>×{p.quantity}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Lumber */}
      {output.lumberPieces && output.lumberPieces.length > 0 && (
        <>
          <Text style={[typography.label, styles.sectionHeading]}>
            🪵 LISTONES MACIZOS (compra lineal)
          </Text>
          <View style={[styles.card, shadows.sm]}>
            {output.lumberPieces.map((p, i) => (
              <View key={i} style={styles.pieceRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.pieceName}>{p.name}</Text>
                  <Text style={styles.pieceDims}>
                    Sección {p.section} · Largo {p.length}cm
                  </Text>
                </View>
                <Text style={styles.pieceQty}>×{p.quantity}</Text>
              </View>
            ))}
            <Text style={styles.lumberNote}>
              El listón no entra al optimizador 2D — se compra a metros.
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
            <Text
              key={i}
              style={[
                typography.caption,
                { color: colors.textSecondary, marginBottom: 4 },
              ]}
            >
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
          <IconLabel icon="save" label="Guardar" color={colors.accent} textStyle={typography.button} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            shadows.md,
            (!canProceed || saving) && styles.buttonDisabled,
            { flex: 1, marginTop: 0 },
          ]}
          onPress={handleOptimize}
          disabled={!canProceed || saving}
          activeOpacity={0.85}
        >
          <IconLabel icon="saw" label="Optimizar cortes" color={colors.textOnAccent} textStyle={typography.button} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.pdfLink}
        onPress={handleExportPdf}
        disabled={!canProceed || saving}
      >
        <IconLabel
          icon="pdf"
          label="Exportar PDF del plan de cortes"
          color={colors.accent}
          textStyle={[typography.body, { textAlign: 'center' }]}
          style={{ opacity: !canProceed || saving ? 0.4 : 1 }}
        />
      </TouchableOpacity>

      <DespiezarLink pieces={output.pieces} disabled={!canProceed || saving} />
    </ScrollView>
  );
}

// ── FormRow ──────────────────────────────────────────────────

interface FormRowProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit: string;
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

// ── Estilos ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  previewCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  previewCaption: { color: colors.textMuted, marginTop: spacing.sm },
  warningCard: {
    backgroundColor: colors.warning + '15',
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  notesCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionHeading: { marginTop: spacing.lg, marginBottom: spacing.md },

  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  formLabel: { ...typography.body, flex: 1 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    width: 120,
    backgroundColor: colors.bg,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm,
    color: colors.text,
    textAlign: 'right',
    fontSize: 16,
  },
  unit: { ...typography.caption, color: colors.textMuted, marginLeft: 4 },

  segmented: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    overflow: 'hidden',
    width: 120,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    backgroundColor: colors.bg,
  },
  segmentActive: { backgroundColor: colors.accent },
  segmentText: { ...typography.body, fontWeight: '600', color: colors.text },
  segmentTextActive: { color: colors.textOnAccent },

  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    width: 120,
    justifyContent: 'space-between',
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent + '22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: { fontSize: 20, fontWeight: '700', color: colors.accent },
  stepValue: { ...typography.h3, minWidth: 32, textAlign: 'center' },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
  },
  toggle: {
    width: 46,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.border,
    padding: 2,
    justifyContent: 'center',
  },
  toggleOn: { backgroundColor: colors.accent },
  toggleBall: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff' },
  toggleBallOn: { transform: [{ translateX: 20 }] },

  pieceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pieceName: { ...typography.body, fontWeight: '600' },
  pieceDims: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  pieceQty: {
    ...typography.body,
    fontWeight: '700',
    color: colors.accent,
    marginLeft: spacing.md,
  },
  lumberNote: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.md,
    fontStyle: 'italic',
  },

  button: {
    backgroundColor: colors.accent,
    paddingVertical: 18,
    borderRadius: radius.lg,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  buttonDisabled: { opacity: 0.5 },
  ctaRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  saveButton: {
    backgroundColor: colors.surface,
    paddingVertical: 18,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfLink: {
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
  },
});
