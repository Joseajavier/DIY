// ═══════════════════════════════════════════════════════════════
// DRAWER CABINET GENERATOR SCREEN — cajonera con N cajones.
// ───────────────────────────────────────────────────────────────
// Usa ShelfIsometric con numShelves = (numDrawers - 1) como preview
// aproximado (las separaciones entre cajones se parecen visualmente
// a las baldas interiores de una estantería).
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
  generateDrawerCabinet,
  DRAWER_CABINET_DEFAULTS,
} from '../../services/parametric';
import { ShelfIsometric, IconLabel, InputGroup } from '../../components';
import HardwareCard from '../../components/HardwareCard';
import IsometricWrapper from '../../components/IsometricWrapper';
import { DespiezarLink } from '../../components';
import HeroBanner from '../../components/HeroBanner';
import SectionHeader from '../../components/SectionHeader';
import Icon from '../../components/Icon';
import { useSaveAndOptimize } from '../../hooks/useSaveAndOptimize';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DrawerCabinetGenerator'>;
};

export default function DrawerCabinetGeneratorScreen({ navigation }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const [width, setWidth] = useState(String(DRAWER_CABINET_DEFAULTS.width));
  const [height, setHeight] = useState(String(DRAWER_CABINET_DEFAULTS.height));
  const [depth, setDepth] = useState(String(DRAWER_CABINET_DEFAULTS.depth));
  const [numDrawers, setNumDrawers] = useState(String(DRAWER_CABINET_DEFAULTS.numDrawers));
  const [thickness, setThickness] = useState(String(DRAWER_CABINET_DEFAULTS.thickness));
  const [drawerThickness, setDrawerThickness] = useState(
    String(DRAWER_CABINET_DEFAULTS.drawerThickness)
  );
  const [drawerBottomThickness, setDrawerBottomThickness] = useState(
    String(DRAWER_CABINET_DEFAULTS.drawerBottomThickness)
  );

  const previewSize = Math.min(screenWidth - spacing.xl * 2, 300);

  const numericParams = useMemo(() => ({
    w: parseFloat(width) || 0,
    h: parseFloat(height) || 0,
    d: parseFloat(depth) || 0,
    n: parseInt(numDrawers, 10) || 0,
    t: parseFloat(thickness) || 16,
    dt: parseFloat(drawerThickness) || 12,
    dbt: parseFloat(drawerBottomThickness) || 4,
  }), [width, height, depth, numDrawers, thickness, drawerThickness, drawerBottomThickness]);

  const output = useMemo(() => {
    return generateDrawerCabinet({
      width: numericParams.w,
      height: numericParams.h,
      depth: numericParams.d,
      numDrawers: numericParams.n,
      thickness: numericParams.t,
      drawerThickness: numericParams.dt,
      drawerBottomThickness: numericParams.dbt,
    });
  }, [numericParams]);

  const canProceed = output.pieces.length > 0 && output.warnings.length === 0;

  const { saveOnly, saveAndOptimize, exportPdf, saving } = useSaveAndOptimize();
  const projectName = `Cajonera ${width}×${height}×${depth}`;
  const pdfDims = { length: numericParams.w, width: numericParams.d, height: numericParams.h };
  const handleSave = () => saveOnly(projectName, output);
  const handleOptimize = () =>
    saveAndOptimize(projectName, output, 244, 122);
  const handleExportPdf = () => exportPdf(projectName, pdfDims, output);

  const adjustDrawers = (delta: number) => {
    const current = parseInt(numDrawers, 10) || 0;
    const next = Math.max(1, Math.min(10, current + delta));
    setNumDrawers(String(next));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <HeroBanner
        variant="accent"
        eyebrow="Generador"
        title="Cajonera"
        subtitle="Carcasa + N cajones con guías metálicas extraíbles. Reserva 1.3cm por lado para las guías (hardware, no madera)."
      />

      {/* Preview 3D — aproximado con ShelfIsometric */}
      <View style={[styles.previewCard, shadows.sm]}>
        <IsometricWrapper><ShelfIsometric
          width={numericParams.w}
          height={numericParams.h}
          depth={numericParams.d}
          numShelves={0}
          thickness={numericParams.t}
          hasBack={true}
          displaySize={previewSize}
          frontPanels={{ type: 'drawer', count: numericParams.n }}
        />
        </IsometricWrapper>
        <Text style={[typography.caption, styles.previewCaption]}>
          Vista 3D aprox. · {numericParams.w}×{numericParams.h}×{numericParams.d}cm
        </Text>
      </View>

      {/* Inputs — Dimensiones */}
      <InputGroup title="Dimensiones" subtitle="Medidas exteriores del cajonera">
        <FormRow label="Ancho" value={width} onChange={setWidth} unit="cm" />
        <FormRow label="Alto" value={height} onChange={setHeight} unit="cm" />
        <FormRow label="Fondo" value={depth} onChange={setDepth} unit="cm" />
      </InputGroup>

      {/* Inputs — Estructura */}
      <InputGroup title="Estructura" subtitle="Cajones y grosores">
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Nº de cajones</Text>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => adjustDrawers(-1)}
            >
              <Text style={styles.stepBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.stepValue}>{numDrawers}</Text>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => adjustDrawers(1)}
            >
              <Text style={styles.stepBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FormRow
          label="Grosor carcasa"
          value={thickness}
          onChange={setThickness}
          unit="mm"
        />
        <FormRow
          label="Grosor cajón"
          value={drawerThickness}
          onChange={setDrawerThickness}
          unit="mm"
        />
        <FormRow
          label="Fondo cajón"
          value={drawerBottomThickness}
          onChange={setDrawerBottomThickness}
          unit="mm"
        />
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

      {/* Despiece */}
      <SectionHeader>Plan de cortes</SectionHeader>
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
  warningHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.xs },

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
  stepBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.accent,
  },
  stepValue: {
    ...typography.h3,
    minWidth: 32,
    textAlign: 'center',
  },

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
