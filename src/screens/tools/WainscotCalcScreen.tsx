// ═══════════════════════════════════════════════════════════════
// WAINSCOT / PANEL CALCULATOR
// ───────────────────────────────────────────────────────────────
// Reparte N paneles iguales en una pared con separaciones
// idénticas entre ellos. Opcionalmente los márgenes exteriores
// pueden coincidir con la separación interior.
//
// Si márgenes = separación:
//   frameWidth = (wall - (n + 1) * spacing) / n
//
// Si márgenes independientes:
//   frameWidth = (wall - 2 * margin - (n - 1) * spacing) / n
//
// También calcula el recuento óptimo si el usuario indica un
// ancho preferido de panel, respetando la altura, zócalo y
// línea de chair rail (1/3 de la altura de pared).
// ═══════════════════════════════════════════════════════════════

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  Switch,
} from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';

// ── Paleta de madera ──────────────────────────────────────────
const wood = {
  deep: '#3D2817',
  dark: '#5C3A1E',
  medium: '#7A4E28',
  main: '#9B6835',
  light: '#B8844A',
  highlight: '#D4A574',
  back: '#2A1810',
};

type FramePos = {
  idx: number;
  left: number;
  right: number;
  center: number;
};

// Constantes de diseño
const BASEBOARD_HEIGHT = 12; // cm — altura del zócalo
const CHAIR_RAIL_RATIO = 1 / 3; // chair rail a ~1/3 desde el suelo
const CHAIR_RAIL_THICK = 4; // grosor visual del chair rail

export default function WainscotCalcScreen() {
  const [wallStr, setWallStr] = useState('300');
  const [heightStr, setHeightStr] = useState('250');
  const [prefWidthStr, setPrefWidthStr] = useState('40');
  const [spacingStr, setSpacingStr] = useState('5');
  const [marginStr, setMarginStr] = useState('5');
  const [sameMargin, setSameMargin] = useState(true);

  const parse = (s: string) => {
    const n = parseFloat(s.replace(',', '.'));
    return isNaN(n) ? 0 : n;
  };

  const wall = parse(wallStr);
  const wallH = Math.max(0, parse(heightStr));
  const prefW = Math.max(1, parse(prefWidthStr));
  const gap = Math.max(0, parse(spacingStr));
  const marginInput = Math.max(0, parse(marginStr));

  // Calcular N automáticamente a partir del ancho preferido.
  // Con márgenes = separación: wall ≈ (n+1)*gap + n*prefW → n ≈ (wall - gap) / (prefW + gap)
  // Con márgenes custom:       wall ≈ 2*margin + (n-1)*gap + n*prefW → n ≈ (wall - 2*margin + gap) / (prefW + gap)
  const autoCount = useMemo(() => {
    if (wall <= 0 || prefW <= 0) return 1;
    const m = sameMargin ? gap : marginInput;
    const denom = prefW + gap;
    if (denom <= 0) return 1;
    const n = (wall - 2 * m + gap) / denom;
    return Math.max(1, Math.round(n));
  }, [wall, prefW, gap, marginInput, sameMargin]);

  const margin = sameMargin ? gap : marginInput;
  const count = autoCount;

  const { frameWidth, positions, valid } = useMemo(() => {
    if (wall <= 0 || count <= 0) {
      return { frameWidth: 0, positions: [] as FramePos[], valid: false };
    }
    const totalGaps = (count - 1) * gap;
    const usable = wall - 2 * margin - totalGaps;
    const fw = usable / count;
    if (fw <= 0) {
      return { frameWidth: fw, positions: [] as FramePos[], valid: false };
    }
    const pos: FramePos[] = [];
    for (let i = 0; i < count; i++) {
      const left = margin + i * (fw + gap);
      const right = left + fw;
      pos.push({ idx: i + 1, left, right, center: (left + right) / 2 });
    }
    return { frameWidth: fw, positions: pos, valid: true };
  }, [wall, count, gap, margin]);

  // Alturas verticales derivadas
  const chairRailY = wallH * CHAIR_RAIL_RATIO;
  const panelHeight = Math.max(
    0,
    chairRailY - BASEBOARD_HEIGHT - CHAIR_RAIL_THICK,
  );

  // Error del ancho resultante respecto al preferido
  const ratioDiff =
    valid && prefW > 0 ? (frameWidth - prefW) / prefW : 0;
  const ratioPct = ratioDiff * 100;
  // Barra visual: centrada en 0, rango ±50%
  const ratioBarPos = Math.max(-50, Math.min(50, ratioPct));
  const ratioBarLeft = 50 + ratioBarPos; // 0..100

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Calculadora wainscot</Text>
        <Text style={styles.subtitle}>
          Reparte paneles iguales en una pared con zócalo y chair rail
        </Text>

        {/* Inputs */}
        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Ancho de la pared (cm)</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={wallStr}
              onChangeText={setWallStr}
              placeholder="300"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Alto de la pared (cm)</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={heightStr}
              onChangeText={setHeightStr}
              placeholder="250"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Ancho preferido de panel (cm)</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={prefWidthStr}
              onChangeText={setPrefWidthStr}
              placeholder="40"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Separación entre paneles (cm)</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={spacingStr}
              onChangeText={setSpacingStr}
              placeholder="5"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Márgenes exteriores = separación</Text>
              <Text style={styles.hint}>
                {sameMargin
                  ? 'El hueco lateral es igual al hueco entre paneles'
                  : 'Márgenes laterales personalizados'}
              </Text>
            </View>
            <Switch
              value={sameMargin}
              onValueChange={setSameMargin}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          {!sameMargin && (
            <View style={styles.field}>
              <Text style={styles.label}>Margen lateral (cm)</Text>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                value={marginStr}
                onChangeText={setMarginStr}
                placeholder="5"
                placeholderTextColor={colors.textMuted}
              />
            </View>
          )}
        </View>

        {/* Resultado principal: ancho real + número */}
        <View style={[styles.card, styles.highlightCard]}>
          <View style={styles.primaryResultRow}>
            <View style={styles.primaryCol}>
              <Text style={styles.label}>Ancho de panel</Text>
              <Text style={styles.bigResult}>
                {valid ? frameWidth.toFixed(1) : '—'}
                <Text style={styles.bigResultUnit}> cm</Text>
              </Text>
            </View>
            <View style={styles.primaryDivider} />
            <View style={styles.primaryCol}>
              <Text style={styles.label}>Número de paneles</Text>
              <Text style={styles.bigResult}>{valid ? count : '—'}</Text>
            </View>
          </View>
          {!valid && (
            <Text style={styles.errorText}>
              Los valores no caben. Ajusta el ancho preferido o la separación.
            </Text>
          )}
        </View>

        {/* Medidor "antes/después" */}
        {valid && (
          <View style={styles.card}>
            <Text style={styles.label}>Desviación frente al preferido</Text>
            <View style={styles.meterTrack}>
              <View style={styles.meterCenter} />
              <View
                style={[
                  styles.meterMarker,
                  {
                    left: `${ratioBarLeft}%`,
                    backgroundColor:
                      Math.abs(ratioPct) < 5
                        ? '#2E7D32'
                        : Math.abs(ratioPct) < 15
                        ? wood.main
                        : '#C0392B',
                  },
                ]}
              />
            </View>
            <View style={styles.meterLegend}>
              <Text style={styles.legendText}>-50%</Text>
              <Text style={styles.legendText}>preferido {prefW} cm</Text>
              <Text style={styles.legendText}>+50%</Text>
            </View>
            <Text style={styles.meterValue}>
              {ratioPct >= 0 ? '+' : ''}
              {ratioPct.toFixed(1)}% · real {frameWidth.toFixed(1)} cm vs{' '}
              {prefW.toFixed(1)} cm
            </Text>
          </View>
        )}

        {/* Visualización: elevación de pared */}
        {valid && wallH > 0 && (
          <View style={styles.card}>
            <Text style={styles.label}>Alzado de la pared</Text>
            <View style={styles.elevationWrap}>
              <View style={styles.wallOuter}>
                <View style={styles.wallTopCap} />
                <View style={styles.wallInnerRow}>
                  <View style={styles.wallSideLeft} />
                  <View style={styles.wallInside}>
                    {/* Zona alta por encima del chair rail */}
                    <View
                      style={[
                        styles.upperWall,
                        {
                          height: `${
                            ((wallH - chairRailY) / wallH) * 100
                          }%`,
                        },
                      ]}
                    />
                    {/* Chair rail */}
                    <View
                      style={[
                        styles.chairRail,
                        {
                          bottom: `${(chairRailY / wallH) * 100}%`,
                        },
                      ]}
                    />
                    {/* Paneles */}
                    {positions.map((p) => {
                      const leftPct = (p.left / wall) * 100;
                      const widthPct = (frameWidth / wall) * 100;
                      const bottomPct =
                        (BASEBOARD_HEIGHT / wallH) * 100;
                      const heightPct = (panelHeight / wallH) * 100;
                      return (
                        <View
                          key={p.idx}
                          style={[
                            styles.panel,
                            {
                              left: `${leftPct}%`,
                              width: `${widthPct}%`,
                              bottom: `${bottomPct}%`,
                              height: `${heightPct}%`,
                            },
                          ]}
                        >
                          <View style={styles.panelInner}>
                            <Text style={styles.panelLabel}>{p.idx}</Text>
                          </View>
                        </View>
                      );
                    })}
                    {/* Zócalo */}
                    <View
                      style={[
                        styles.baseboard,
                        {
                          height: `${(BASEBOARD_HEIGHT / wallH) * 100}%`,
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.wallSideRight} />
                </View>
                <View style={styles.wallBottomCap} />
              </View>
            </View>
            <Text style={styles.elevationCaption}>
              {wall} × {wallH} cm · zócalo {BASEBOARD_HEIGHT} cm · chair rail a{' '}
              {chairRailY.toFixed(0)} cm
            </Text>
          </View>
        )}

        {/* Posiciones */}
        {valid && (
          <View style={styles.card}>
            <Text style={styles.label}>Posiciones (desde la izquierda)</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.th, { flex: 0.6 }]}>#</Text>
              <Text style={styles.th}>Izq.</Text>
              <Text style={styles.th}>Centro</Text>
              <Text style={styles.th}>Der.</Text>
            </View>
            {positions.map((p) => (
              <View key={p.idx} style={styles.tableRow}>
                <Text style={[styles.td, { flex: 0.6, fontWeight: '700' }]}>
                  {p.idx}
                </Text>
                <Text style={styles.td}>{p.left.toFixed(1)}</Text>
                <Text style={[styles.td, { color: colors.primary }]}>
                  {p.center.toFixed(1)}
                </Text>
                <Text style={styles.td}>{p.right.toFixed(1)}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Fórmula</Text>
          <Text style={styles.infoText}>
            ancho = (pared − 2·margen − (n−1)·sep) / n{'\n'}
            n ≈ (pared − 2·margen + sep) / (prefW + sep){'\n'}
            chair rail ≈ alto / 3 · zócalo = {BASEBOARD_HEIGHT} cm
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  title: { ...typography.hero, color: colors.text, marginBottom: spacing.xs },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  highlightCard: {
    backgroundColor: colors.primaryMuted,
    borderColor: colors.primary,
  },
  field: { marginBottom: spacing.md },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  hint: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  input: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.sm,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  primaryResultRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryCol: { flex: 1 },
  primaryDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.primary + '55',
    marginHorizontal: spacing.md,
  },
  bigResult: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -1,
  },
  bigResultUnit: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.danger,
    marginTop: spacing.sm,
  },
  // ── Medidor ──────────────────────────────────────────────────
  meterTrack: {
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.sm,
    position: 'relative',
    overflow: 'visible',
  },
  meterCenter: {
    position: 'absolute',
    left: '50%',
    top: -4,
    bottom: -4,
    width: 2,
    marginLeft: -1,
    backgroundColor: colors.textMuted,
  },
  meterMarker: {
    position: 'absolute',
    top: -3,
    width: 14,
    height: 18,
    marginLeft: -7,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#00000055',
  },
  meterLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  meterValue: {
    ...typography.caption,
    color: colors.text,
    textAlign: 'center',
    marginTop: 4,
    fontSize: 11,
    fontWeight: '700',
  },
  legendText: { ...typography.caption, color: colors.textMuted, fontSize: 10 },
  // ── Alzado de pared ─────────────────────────────────────────
  elevationWrap: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  wallOuter: {
    height: 260,
  },
  wallTopCap: {
    height: 10,
    backgroundColor: wood.main,
    borderTopWidth: 2,
    borderTopColor: wood.highlight,
    borderBottomWidth: 1,
    borderBottomColor: wood.deep,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  wallBottomCap: {
    height: 12,
    backgroundColor: wood.dark,
    borderBottomWidth: 2,
    borderBottomColor: wood.deep,
    borderTopWidth: 1,
    borderTopColor: wood.highlight,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  wallInnerRow: {
    flex: 1,
    flexDirection: 'row',
  },
  wallSideLeft: {
    width: 10,
    backgroundColor: wood.dark,
    borderRightWidth: 1,
    borderRightColor: wood.deep,
    borderLeftWidth: 2,
    borderLeftColor: wood.light,
  },
  wallSideRight: {
    width: 10,
    backgroundColor: wood.dark,
    borderLeftWidth: 1,
    borderLeftColor: wood.deep,
    borderRightWidth: 2,
    borderRightColor: wood.medium,
  },
  wallInside: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F5EFE6',
    overflow: 'hidden',
  },
  upperWall: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#EDE4D3',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chairRail: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: CHAIR_RAIL_THICK,
    backgroundColor: wood.main,
    borderTopWidth: 1,
    borderTopColor: wood.highlight,
    borderBottomWidth: 1,
    borderBottomColor: wood.deep,
    zIndex: 3,
  },
  panel: {
    position: 'absolute',
    backgroundColor: wood.light,
    borderWidth: 2,
    borderTopColor: wood.highlight,
    borderLeftColor: wood.highlight,
    borderRightColor: wood.deep,
    borderBottomColor: wood.deep,
    borderRadius: 2,
    zIndex: 2,
  },
  panelInner: {
    flex: 1,
    margin: 3,
    borderWidth: 1,
    borderTopColor: wood.deep,
    borderLeftColor: wood.deep,
    borderRightColor: wood.highlight,
    borderBottomColor: wood.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: wood.medium + '22',
  },
  panelLabel: {
    color: wood.deep,
    fontWeight: '800',
    fontSize: 11,
  },
  baseboard: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: wood.main,
    borderTopWidth: 2,
    borderTopColor: wood.highlight,
    borderBottomWidth: 1,
    borderBottomColor: wood.deep,
    zIndex: 3,
  },
  elevationCaption: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
    fontSize: 11,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  th: {
    flex: 1,
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 11,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '55',
  },
  td: { flex: 1, ...typography.bodySmall, color: colors.text },
  infoBox: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  infoTitle: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 22,
    fontFamily: 'monospace',
  },
});
