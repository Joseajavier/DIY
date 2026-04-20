// ═══════════════════════════════════════════════════════════════
// BENCH GENERATOR SCREEN — banco con respaldo opcional.
// ───────────────────────────────────────────────────────────────
// Reutiliza TableIsometric (4 patas + tablero) como preview. El
// respaldo no se dibuja en 3D — se indica en la ficha de despiece.
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
  generateBench,
  BENCH_DEFAULTS,
} from '../../services/parametric';
import { TableIsometric, IconLabel, InputGroup } from '../../components';
import HardwareCard from '../../components/HardwareCard';
import IsometricWrapper from '../../components/IsometricWrapper';
import { DespiezarLink } from '../../components';
import { useSaveAndOptimize } from '../../hooks/useSaveAndOptimize';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BenchGenerator'>;
};

export default function BenchGeneratorScreen({ navigation }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const [length, setLength] = useState(String(BENCH_DEFAULTS.length));
  const [width, setWidth] = useState(String(BENCH_DEFAULTS.width));
  const [height, setHeight] = useState(String(BENCH_DEFAULTS.height));
  const [legSection, setLegSection] = useState(String(BENCH_DEFAULTS.legSection));
  const [topThickness, setTopThickness] = useState(String(BENCH_DEFAULTS.topThickness));
  const [hasBackrest, setHasBackrest] = useState(BENCH_DEFAULTS.hasBackrest);
  const [backrestHeight, setBackrestHeight] = useState(
    String(BENCH_DEFAULTS.backrestHeight)
  );

  const previewSize = Math.min(screenWidth - spacing.xl * 2, 320);

  const numericParams = useMemo(() => ({
    len: parseFloat(length) || 0,
    w: parseFloat(width) || 0,
    h: parseFloat(height) || 0,
    ls: parseFloat(legSection) || 0,
    t: parseFloat(topThickness) || 25,
    bh: parseFloat(backrestHeight) || 40,
  }), [length, width, height, legSection, topThickness, backrestHeight]);

  const output = useMemo(() => {
    return generateBench({
      length: numericParams.len,
      width: numericParams.w,
      height: numericParams.h,
      legSection: numericParams.ls,
      topThickness: numericParams.t,
      hasBackrest,
      backrestHeight: numericParams.bh,
    });
  }, [numericParams, hasBackrest]);

  const canProceed = output.pieces.length > 0 && output.warnings.length === 0;

  const { saveOnly, saveAndOptimize, exportPdf, saving } = useSaveAndOptimize();
  const projectName = `Banco ${length}×${width}×${height}`;
  const pdfDims = { length: numericParams.len, width: numericParams.w, height: numericParams.h };
  const handleSave = () => saveOnly(projectName, output);
  const handleOptimize = () =>
    saveAndOptimize(projectName, output, 244, 122);
  const handleExportPdf = () => exportPdf(projectName, pdfDims, output);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[typography.h1, { color: colors.accent }]}>🪵 Banco</Text>
      <Text
        style={[
          typography.bodySmall,
          { marginBottom: spacing.lg, color: colors.textSecondary },
        ]}
      >
        4 patas macizas + asiento, con respaldo opcional. Perfecto para
        comedor corrido, pie de cama o entrada.
      </Text>

      {/* Preview 3D — reusa TableIsometric sin faldón */}
      <View style={[styles.previewCard, shadows.sm]}>
        <IsometricWrapper><TableIsometric
          length={numericParams.len}
          width={numericParams.w}
          height={numericParams.h}
          legSection={numericParams.ls}
          topThickness={numericParams.t}
          hasApron={false}
          apronHeight={0}
          hasLowerShelf={false}
          displaySize={previewSize}
        />
        </IsometricWrapper>
        <Text style={[typography.caption, styles.previewCaption]}>
          Vista 3D · {numericParams.len}×{numericParams.w}×{numericParams.h}cm
          {hasBackrest ? ` + respaldo ${numericParams.bh}cm` : ''}
        </Text>
      </View>

      {/* Inputs — Dimensiones */}
      <InputGroup title="Dimensiones" subtitle="Medidas del banco">
        <FormRow label="Largo" value={length} onChange={setLength} unit="cm" />
        <FormRow label="Ancho asiento" value={width} onChange={setWidth} unit="cm" />
        <FormRow label="Altura asiento" value={height} onChange={setHeight} unit="cm" />
      </InputGroup>

      {/* Inputs — Estructura */}
      <InputGroup title="Estructura" subtitle="Patas, grosor y respaldo">
        <FormRow
          label="Sección pata"
          value={legSection}
          onChange={setLegSection}
          unit="cm"
        />
        <FormRow
          label="Grosor asiento"
          value={topThickness}
          onChange={setTopThickness}
          unit="mm"
        />

        <TouchableOpacity
          style={styles.toggleRow}
          onPress={() => setHasBackrest(!hasBackrest)}
          activeOpacity={0.7}
        >
          <View style={{ flex: 1 }}>
            <Text style={typography.body}>Respaldo</Text>
            <Text style={[typography.caption, { color: colors.textMuted }]}>
              Las patas traseras se prolongan como montantes
            </Text>
          </View>
          <View style={[styles.toggle, hasBackrest && styles.toggleOn]}>
            <View style={[styles.toggleBall, hasBackrest && styles.toggleBallOn]} />
          </View>
        </TouchableOpacity>

        {hasBackrest && (
          <FormRow
            label="Altura respaldo"
            value={backrestHeight}
            onChange={setBackrestHeight}
            unit="cm"
          />
        )}
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
          label="Exportar PDF del despiece"
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
