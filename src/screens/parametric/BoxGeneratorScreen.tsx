// ═══════════════════════════════════════════════════════════════
// BOX GENERATOR SCREEN — caja rectangular paramétrica.
// ───────────────────────────────────────────────────────────────
// Reutiliza ShelfIsometric con numShelves=0 para el preview 3D, ya
// que geométricamente una caja cerrada es una estantería sin baldas.
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
import { generateBox, BOX_DEFAULTS } from '../../services/parametric';
import { ShelfIsometric } from '../../components';
import HardwareCard from '../../components/HardwareCard';
import { useSaveAndOptimize } from '../../hooks/useSaveAndOptimize';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BoxGenerator'>;
};

export default function BoxGeneratorScreen({ navigation }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const [length, setLength] = useState(String(BOX_DEFAULTS.length));
  const [width, setWidth] = useState(String(BOX_DEFAULTS.width));
  const [height, setHeight] = useState(String(BOX_DEFAULTS.height));
  const [thickness, setThickness] = useState(String(BOX_DEFAULTS.thickness));
  const [hasLid, setHasLid] = useState(BOX_DEFAULTS.hasLid);
  const [hasBottom, setHasBottom] = useState(BOX_DEFAULTS.hasBottom);

  const previewSize = Math.min(screenWidth - spacing.xl * 2, 300);

  const numericParams = useMemo(() => ({
    len: parseFloat(length) || 0,
    w: parseFloat(width) || 0,
    h: parseFloat(height) || 0,
    t: parseFloat(thickness) || 16,
  }), [length, width, height, thickness]);

  const output = useMemo(() => {
    return generateBox({
      length: numericParams.len,
      width: numericParams.w,
      height: numericParams.h,
      thickness: numericParams.t,
      hasLid,
      hasBottom,
    });
  }, [numericParams, hasLid, hasBottom]);

  const canProceed = output.pieces.length > 0 && output.warnings.length === 0;

  const { saveOnly, saveAndOptimize, exportPdf, saving } = useSaveAndOptimize();
  const projectName = `Caja ${length}×${width}×${height}`;
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
      <Text style={[typography.h1, { color: colors.accent }]}>📦 Caja</Text>
      <Text
        style={[
          typography.bodySmall,
          { marginBottom: spacing.lg, color: colors.textSecondary },
        ]}
      >
        Caja rectangular simple. Útil para almacenaje, bandejas, cajas de
        regalo, boxes apilables.
      </Text>

      {/* Preview 3D */}
      <View style={[styles.previewCard, shadows.sm]}>
        <ShelfIsometric
          width={numericParams.len}
          height={numericParams.h}
          depth={numericParams.w}
          numShelves={0}
          thickness={numericParams.t}
          hasBack={hasBottom}
          displaySize={previewSize}
        />
        <Text style={[typography.caption, styles.previewCaption]}>
          Vista 3D · {numericParams.len}×{numericParams.w}×{numericParams.h}cm
        </Text>
      </View>

      {/* Inputs */}
      <View style={[styles.card, shadows.sm]}>
        <FormRow label="Largo" value={length} onChange={setLength} unit="cm" />
        <FormRow label="Ancho (fondo)" value={width} onChange={setWidth} unit="cm" />
        <FormRow label="Alto" value={height} onChange={setHeight} unit="cm" />
        <FormRow
          label="Grosor tablero"
          value={thickness}
          onChange={setThickness}
          unit="mm"
        />

        <TouchableOpacity
          style={styles.toggleRow}
          onPress={() => setHasBottom(!hasBottom)}
          activeOpacity={0.7}
        >
          <View style={{ flex: 1 }}>
            <Text style={typography.body}>Incluir fondo</Text>
            <Text style={[typography.caption, { color: colors.textMuted }]}>
              Sin fondo → caja abierta tipo bandeja
            </Text>
          </View>
          <View style={[styles.toggle, hasBottom && styles.toggleOn]}>
            <View style={[styles.toggleBall, hasBottom && styles.toggleBallOn]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toggleRow}
          onPress={() => setHasLid(!hasLid)}
          activeOpacity={0.7}
        >
          <View style={{ flex: 1 }}>
            <Text style={typography.body}>Incluir tapa</Text>
            <Text style={[typography.caption, { color: colors.textMuted }]}>
              Tapa apoyada encima (sin bisagras)
            </Text>
          </View>
          <View style={[styles.toggle, hasLid && styles.toggleOn]}>
            <View style={[styles.toggleBall, hasLid && styles.toggleBallOn]} />
          </View>
        </TouchableOpacity>
      </View>

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

      {/* Despiece */}
      <Text
        style={[
          typography.label,
          { marginTop: spacing.xl, marginBottom: spacing.md },
        ]}
      >
        DESPIECE GENERADO
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
          <Text style={[typography.button, { color: colors.accent }]}>
            💾 Guardar
          </Text>
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
          <Text style={[typography.button, { color: colors.textOnAccent }]}>
            🪚 Optimizar cortes
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.pdfLink}
        onPress={handleExportPdf}
        disabled={!canProceed || saving}
        activeOpacity={0.7}
      >
        <Text
          style={[
            typography.body,
            {
              color: colors.accent,
              textAlign: 'center',
              opacity: !canProceed || saving ? 0.4 : 1,
            },
          ]}
        >
          📄 Exportar PDF del despiece
        </Text>
      </TouchableOpacity>
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
