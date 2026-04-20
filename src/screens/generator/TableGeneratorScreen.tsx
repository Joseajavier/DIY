// ═══════════════════════════════════════════════════════════════
// TABLE GENERATOR SCREEN — form de mesa paramétrica.
// ───────────────────────────────────────────────────────────────
// Diferencia clave con Shelf: la mesa genera DOS listas:
//   • pieces[]       → tableros (van al optimizador 2D)
//   • lumberPieces[] → patas (listones macizos, pedido lineal)
// Ambas se muestran separadas y solo las boardPieces abren el optimizador.
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
import { generateTable, TABLE_DEFAULTS } from '../../services/parametric';
import { TableIsometric, IconLabel, InputGroup } from '../../components';
import HardwareCard from '../../components/HardwareCard';
import IsometricWrapper from '../../components/IsometricWrapper';
import { DespiezarLink } from '../../components';
import { useSaveAndOptimize } from '../../hooks/useSaveAndOptimize';
import HeroBanner from '../../components/HeroBanner';
import SectionHeader from '../../components/SectionHeader';
import Icon from '../../components/Icon';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TableGenerator'>;
};

export default function TableGeneratorScreen({ navigation }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const [length, setLength] = useState(String(TABLE_DEFAULTS.length));
  const [width, setWidth] = useState(String(TABLE_DEFAULTS.width));
  const [height, setHeight] = useState(String(TABLE_DEFAULTS.height));
  const [legSection, setLegSection] = useState(String(TABLE_DEFAULTS.legSection));
  const [topThickness, setTopThickness] = useState(String(TABLE_DEFAULTS.topThickness));
  const [apronHeight, setApronHeight] = useState(String(TABLE_DEFAULTS.apronHeight));
  const [hasApron, setHasApron] = useState(TABLE_DEFAULTS.hasApron);
  const [hasLowerShelf, setHasLowerShelf] = useState(TABLE_DEFAULTS.hasLowerShelf);

  const previewSize = Math.min(screenWidth - spacing.xl * 2, 320);
  const numericParams = useMemo(() => ({
    len: parseFloat(length) || 0,
    w: parseFloat(width) || 0,
    h: parseFloat(height) || 0,
    ls: parseFloat(legSection) || 0,
    t: parseFloat(topThickness) || 25,
    ah: parseFloat(apronHeight) || 10,
  }), [length, width, height, legSection, topThickness, apronHeight]);

  const output = useMemo(() => {
    return generateTable({
      length: numericParams.len,
      width: numericParams.w,
      height: numericParams.h,
      legSection: numericParams.ls,
      topThickness: numericParams.t,
      hasApron,
      apronHeight: numericParams.ah,
      hasLowerShelf,
    });
  }, [numericParams, hasApron, hasLowerShelf]);

  const canProceed = output.pieces.length > 0 && output.warnings.length === 0;

  const { saveOnly, saveAndOptimize, exportPdf, saving } = useSaveAndOptimize();
  const projectName = `Mesa ${length}×${width}×${height}`;
  const pdfDims = {
    length: numericParams.len,
    width: numericParams.w,
    height: numericParams.h,
  };
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
      <HeroBanner
        variant="accent"
        eyebrow="Generador"
        title="Mesa"
        subtitle="4 patas macizas + tablero + faldón opcional. Genera tableros (cortes 2D) y listones (compra lineal) por separado."
      />

      {/* Preview 3D */}
      <View style={[styles.previewCard, shadows.sm]}>
        <IsometricWrapper><TableIsometric
          length={numericParams.len}
          width={numericParams.w}
          height={numericParams.h}
          legSection={numericParams.ls}
          topThickness={numericParams.t}
          hasApron={hasApron}
          apronHeight={numericParams.ah}
          hasLowerShelf={hasLowerShelf}
          displaySize={previewSize}
        />
        </IsometricWrapper>
        <Text style={[typography.caption, styles.previewCaption]}>
          Vista 3D · {numericParams.len}×{numericParams.w}×{numericParams.h}cm
        </Text>
      </View>

      {/* Inputs — Dimensiones */}
      <InputGroup title="Dimensiones" subtitle="Medidas de la mesa">
        <FormRow label="Largo" value={length} onChange={setLength} unit="cm" />
        <FormRow label="Ancho (fondo)" value={width} onChange={setWidth} unit="cm" />
        <FormRow label="Alto total" value={height} onChange={setHeight} unit="cm" />
      </InputGroup>

      {/* Inputs — Estructura */}
      <InputGroup title="Estructura" subtitle="Patas, tablero y refuerzos">
        <FormRow
          label="Sección de pata"
          value={legSection}
          onChange={setLegSection}
          unit="cm"
        />
        <FormRow
          label="Grosor tablero"
          value={topThickness}
          onChange={setTopThickness}
          unit="mm"
        />

        <TouchableOpacity
          style={styles.toggleRow}
          onPress={() => setHasApron(!hasApron)}
          activeOpacity={0.7}
        >
          <View style={{ flex: 1 }}>
            <Text style={typography.body}>Faldón de refuerzo</Text>
            <Text style={[typography.caption, { color: colors.textMuted }]}>
              Tablón bajo el tablero que une las patas
            </Text>
          </View>
          <View style={[styles.toggle, hasApron && styles.toggleOn]}>
            <View style={[styles.toggleBall, hasApron && styles.toggleBallOn]} />
          </View>
        </TouchableOpacity>

        {hasApron && (
          <FormRow
            label="Altura faldón"
            value={apronHeight}
            onChange={setApronHeight}
            unit="cm"
          />
        )}

        <TouchableOpacity
          style={styles.toggleRow}
          onPress={() => setHasLowerShelf(!hasLowerShelf)}
          activeOpacity={0.7}
        >
          <View style={{ flex: 1 }}>
            <Text style={typography.body}>Balda inferior</Text>
            <Text style={[typography.caption, { color: colors.textMuted }]}>
              Tablero entre las patas (a ~15-20cm del suelo)
            </Text>
          </View>
          <View style={[styles.toggle, hasLowerShelf && styles.toggleOn]}>
            <View style={[styles.toggleBall, hasLowerShelf && styles.toggleBallOn]} />
          </View>
        </TouchableOpacity>
      </InputGroup>

      {/* Warnings */}
      {output.warnings.length > 0 && (
        <View style={[styles.warningCard, shadows.sm]}>
          <View style={styles.warningHeader}>
            <Icon name="info" size={16} color={colors.warning} />
            <Text style={[typography.label, { color: colors.warning }]}>
              Atención
            </Text>
          </View>
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
          <SectionHeader>Tableros (cortes 2D)</SectionHeader>
          <View style={[styles.card, shadows.sm]}>
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

      {/* Listones macizos */}
      {output.lumberPieces && output.lumberPieces.length > 0 && (
        <>
          <SectionHeader>Listones macizos (compra lineal)</SectionHeader>
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
              Los listones no entran al optimizador 2D — se compran a metros
              en la sección de maderas macizas.
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
        activeOpacity={0.7}
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

// ── Sub-componente FormRow ───────────────────────────────────

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
  previewCaption: {
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
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
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },

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
  unit: {
    ...typography.caption,
    color: colors.textMuted,
    marginLeft: 4,
  },

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
  toggleBall: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
  },
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
  buttonDisabled: {
    opacity: 0.5,
  },
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
