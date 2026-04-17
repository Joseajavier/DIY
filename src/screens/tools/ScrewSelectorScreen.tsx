// ═══════════════════════════════════════════════════════════════
// SCREW SELECTOR — Qué tornillo usar según materiales y contexto
// ───────────────────────────────────────────────────────────────
// Flujo: elige material superior (lo que atraviesas) +
//        material base (donde entra el tornillo) +
//        contexto (interior / exterior)
//        → recomendación con tipo, Ø, longitud y consejo práctico
// ═══════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../../theme';

// ── Tipos ────────────────────────────────────────────────────────

type MaterialId =
  | 'madera_blanda'
  | 'madera_dura'
  | 'mdf'
  | 'aglomerado'
  | 'contrachapado'
  | 'osb'
  | 'pladur'
  | 'metal';

type Context = 'interior' | 'exterior';

interface MaterialDef {
  id: MaterialId;
  label: string;
  sub: string;
  icon: string;
  color: string;
}

interface ScrewRec {
  type: string;
  head: string;
  drive: string;
  diameter: string;
  length: string;
  material: string;
  tip: string;
  warning?: string;
  accent: string;
}

// ── Catálogo de materiales ────────────────────────────────────────

const MATERIALS: MaterialDef[] = [
  {
    id: 'madera_blanda',
    label: 'Madera blanda',
    sub: 'Pino · Abeto · Chopo',
    icon: '🪵',
    color: '#C8A14B',
  },
  {
    id: 'madera_dura',
    label: 'Madera dura',
    sub: 'Roble · Haya · Nogal',
    icon: '🌳',
    color: '#8B5A3C',
  },
  {
    id: 'mdf',
    label: 'MDF / DM',
    sub: 'MDF estándar y lacado',
    icon: '📋',
    color: '#7A8A6A',
  },
  {
    id: 'aglomerado',
    label: 'Aglomerado',
    sub: 'Melamina · Partículas',
    icon: '📦',
    color: '#B38B59',
  },
  {
    id: 'contrachapado',
    label: 'Contrachapado',
    sub: 'Okumé · Marino · Pino',
    icon: '📐',
    color: '#9A7A55',
  },
  {
    id: 'osb',
    label: 'OSB',
    sub: 'Tablero de virutas',
    icon: '🏗️',
    color: '#AA8866',
  },
  {
    id: 'pladur',
    label: 'Pladur / Cartón-yeso',
    sub: 'Tabique de yeso',
    icon: '🧱',
    color: '#AAA',
  },
  {
    id: 'metal',
    label: 'Metal',
    sub: 'Chapa · Perfil · Angular',
    icon: '⚙️',
    color: '#7A9AAA',
  },
];

// ── Motor de recomendación ────────────────────────────────────────

function getRecommendation(
  top: MaterialId,
  base: MaterialId,
  ctx: Context,
): ScrewRec {
  const ext = ctx === 'exterior';

  // Material del tornillo según contexto
  const mat = ext ? 'Inox A2 o galvanizado en caliente' : 'Acero zincado';

  // Casos especiales primero ──────────────────────────────────────

  // Pladur como base
  if (base === 'pladur') {
    return {
      type: 'Tornillo para pladur',
      head: 'Trompeta / avellanada fina',
      drive: 'PH2',
      diameter: 'Ø 3,5 mm',
      length: '25 – 35 mm',
      material: ext ? 'Inox A2' : 'Fosfatado negro',
      tip: 'El pladur aguanta poco a tracción. Para colgar peso añade un taco de expansión o llega al montante metálico.',
      warning: '⚠️ Sin anclaje a montante, max ~3 kg por punto.',
      accent: colors.textMuted,
    };
  }

  // Metal como base
  if (base === 'metal') {
    return {
      type: 'Tornillo autotaladrante',
      head: 'Cabeza hexagonal o avellanada',
      drive: 'HEX 8 / PH2',
      diameter: 'Ø 4,2 – 5,5 mm',
      length: '16 – 25 mm (o pasante + tuerca)',
      material: ext ? 'Inox A2' : 'Zincado bicromado',
      tip: 'El autotaladrante perfora y rosca en un paso. Si la chapa es ≥ 3 mm, pretaladra con broca para metal.',
      accent: '#7A9AAA',
    };
  }

  // MDF como base
  if (base === 'mdf') {
    const len =
      top === 'mdf' || top === 'aglomerado' ? '35 – 50 mm' : '40 – 60 mm';
    return {
      type: 'Tornillo para MDF',
      head: 'Avellanada parcial',
      drive: 'PZ2',
      diameter: 'Ø 3,5 – 4 mm',
      length: len,
      material: mat,
      tip: 'Usa tornillo de hilo fino apretado específico para MDF. En el canto el agarre es débil: refuerza con cola o escuadra.',
      warning: ext ? '⚠️ El MDF no es apto para exterior sin tratamiento.' : undefined,
      accent: '#7A8A6A',
    };
  }

  // Aglomerado / melamina como base
  if (base === 'aglomerado') {
    return {
      type: 'Tornillo para tablero',
      head: 'Avellanada',
      drive: 'PZ2',
      diameter: 'Ø 4 – 5 mm',
      length: '35 – 50 mm',
      material: mat,
      tip: 'Hilo grueso y paso largo para no arrancar. En cantos sin canto-PVC evita el tornillo y usa escuadra oculta.',
      warning: ext ? '⚠️ El aglomerado se hincha con humedad. Sella bordes.' : undefined,
      accent: '#B38B59',
    };
  }

  // Madera dura como base (roble, haya…)
  if (base === 'madera_dura') {
    return {
      type: 'Tornillo para madera',
      head: 'Avellanada o cilíndrica',
      drive: 'PZ2 / TX25',
      diameter: 'Ø 4 – 5 mm',
      length: calcLength(top),
      material: ext ? 'Inox A2' : 'Acero zincado o pavonado',
      tip: '¡Pretaladra siempre! Broca Ø 3 mm a 2/3 de la longitud del tornillo. Sin esto la madera dura se parte.',
      warning: '⚠️ Pretaladrado obligatorio en roble, haya y nogal.',
      accent: '#8B5A3C',
    };
  }

  // Contrachapado como base
  if (base === 'contrachapado') {
    return {
      type: 'Tornillo para madera',
      head: 'Avellanada',
      drive: 'PZ2',
      diameter: 'Ø 3,5 – 4 mm',
      length: calcLength(top),
      material: ext ? 'Inox A2' : 'Acero zincado',
      tip: 'El contrachapado tiene buena resistencia al tornillo en cara y canto. Cerca del borde deja ≥ 12 mm.',
      accent: '#9A7A55',
    };
  }

  // OSB como base
  if (base === 'osb') {
    return {
      type: 'Tornillo para madera hilo grueso',
      head: 'Avellanada',
      drive: 'PZ2 / TX25',
      diameter: 'Ø 4 – 4,5 mm',
      length: calcLength(top),
      material: ext ? 'Inox A4' : 'Galvanizado',
      tip: 'Las fibras del OSB son irregulares. Usa hilo grueso para mayor agarre y evita el canto sin refuerzo.',
      accent: '#AA8866',
    };
  }

  // Madera blanda como base (default general)
  return {
    type: 'Tornillo para madera',
    head: 'Avellanada',
    drive: 'PZ2',
    diameter: 'Ø 4 mm',
    length: calcLength(top),
    material: mat,
    tip: 'El tornillo estándar de carpintería. Hilo grueso, entrada autorroscante. Apto para pino, abeto y chopo sin pretaladrar.',
    accent: colors.primary,
  };
}

/** Estima la longitud recomendada según el material superior (regla 3×espesor +20mm) */
function calcLength(top: MaterialId): string {
  const map: Record<MaterialId, string> = {
    madera_blanda: '40 – 60 mm',
    madera_dura: '50 – 70 mm',
    mdf: '35 – 50 mm',
    aglomerado: '35 – 50 mm',
    contrachapado: '30 – 50 mm',
    osb: '40 – 55 mm',
    pladur: '25 – 35 mm',
    metal: '20 – 35 mm',
  };
  return map[top];
}

// ── Tabla guía rápida ─────────────────────────────────────────────

const QUICK_GUIDE = [
  { icon: '🔩', label: 'Madera blanda', tip: 'Hilo grueso · Ø4 · sin pretaladrar' },
  { icon: '🌳', label: 'Madera dura', tip: 'Hilo grueso · Ø4-5 · pretaladrar Ø3' },
  { icon: '📋', label: 'MDF / DM', tip: 'Hilo fino MDF · Ø3.5 · no en canto' },
  { icon: '📦', label: 'Aglomerado', tip: 'Tornillo tablero · Ø4-5 · no en canto' },
  { icon: '🌧️', label: 'Exterior', tip: 'Inox A2 siempre · nunca zincado normal' },
  { icon: '🧱', label: 'Pladur', tip: 'Taco si hay carga · llega al montante' },
];

// ── Componente principal ──────────────────────────────────────────

export default function ScrewSelectorScreen() {
  const [topMat, setTopMat] = useState<MaterialId | null>(null);
  const [baseMat, setBaseMat] = useState<MaterialId | null>(null);
  const [ctx, setCtx] = useState<Context>('interior');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const rec = useMemo<ScrewRec | null>(() => {
    if (!topMat || !baseMat) return null;
    return getRecommendation(topMat, baseMat, ctx);
  }, [topMat, baseMat, ctx]);

  const reset = () => { setTopMat(null); setBaseMat(null); };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

        {/* Cabecera */}
        <Text style={styles.hero}>🔩 Selector de tornillos</Text>
        <Text style={styles.heroSub}>Elige los materiales que vas a unir y te digo qué tornillo usar.</Text>

        {/* Toggle interior / exterior */}
        <View style={styles.ctxRow}>
          <TouchableOpacity
            style={[styles.ctxBtn, ctx === 'interior' && styles.ctxBtnActive]}
            onPress={() => setCtx('interior')}
          >
            <Text style={[styles.ctxTxt, ctx === 'interior' && styles.ctxTxtActive]}>🏠 Interior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.ctxBtn, ctx === 'exterior' && styles.ctxBtnActiveExt]}
            onPress={() => setCtx('exterior')}
          >
            <Text style={[styles.ctxTxt, ctx === 'exterior' && styles.ctxTxtActive]}>☀️ Exterior</Text>
          </TouchableOpacity>
        </View>

        {/* Selector material SUPERIOR */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>1. Pieza superior</Text>
          <Text style={styles.sectionNote}>(lo que atraviesas con el tornillo)</Text>
        </View>
        <View style={styles.grid}>
          {MATERIALS.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[
                styles.matCard,
                topMat === m.id && { borderColor: m.color, backgroundColor: m.color + '18' },
              ]}
              onPress={() => setTopMat(m.id === topMat ? null : m.id)}
              activeOpacity={0.75}
            >
              <Text style={styles.matIcon}>{m.icon}</Text>
              <Text style={[styles.matLabel, topMat === m.id && { color: m.color }]}>{m.label}</Text>
              <Text style={styles.matSub}>{m.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Selector material BASE */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>2. Material base</Text>
          <Text style={styles.sectionNote}>(donde entra y agarra el tornillo)</Text>
        </View>
        <View style={styles.grid}>
          {MATERIALS.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[
                styles.matCard,
                baseMat === m.id && { borderColor: m.color, backgroundColor: m.color + '18' },
              ]}
              onPress={() => setBaseMat(m.id === baseMat ? null : m.id)}
              activeOpacity={0.75}
            >
              <Text style={styles.matIcon}>{m.icon}</Text>
              <Text style={[styles.matLabel, baseMat === m.id && { color: m.color }]}>{m.label}</Text>
              <Text style={styles.matSub}>{m.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── RESULTADO ─────────────────────────────────────── */}
        {rec ? (
          <View style={[styles.recCard, shadows.md, { borderLeftColor: rec.accent }]}>
            <View style={styles.recHeader}>
              <Text style={[styles.recTitle, { color: rec.accent }]}>{rec.type}</Text>
              <TouchableOpacity onPress={reset} style={styles.resetBtn}>
                <Text style={styles.resetTxt}>Cambiar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.specGrid}>
              <SpecRow label="Cabeza" value={rec.head} />
              <SpecRow label="Punta" value={rec.drive} />
              <SpecRow label="Diámetro" value={rec.diameter} accent />
              <SpecRow label="Longitud" value={rec.length} accent />
              <SpecRow label="Material" value={rec.material} />
            </View>

            <View style={styles.tipBox}>
              <Text style={styles.tipIcon}>💡</Text>
              <Text style={styles.tipText}>{rec.tip}</Text>
            </View>

            {rec.warning && (
              <View style={styles.warnBox}>
                <Text style={styles.warnText}>{rec.warning}</Text>
              </View>
            )}

            {ctx === 'exterior' && (
              <View style={styles.extBadge}>
                <Text style={styles.extBadgeTxt}>☀️ Exterior: usa siempre Inox A2/A4 o galvanizado en caliente</Text>
              </View>
            )}

            {/* Enlace a la enciclopedia completa */}
            <TouchableOpacity
              style={styles.encyclopediaBtn}
              onPress={() => navigation.navigate('ScrewGuide')}
              activeOpacity={0.8}
            >
              <Text style={styles.encyclopediaBtnText}>
                🔩 Ver enciclopedia completa de tornillos →
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>🔩</Text>
            <Text style={styles.placeholderText}>
              Selecciona los dos materiales{'\n'}para ver la recomendación
            </Text>
          </View>
        )}

        {/* ── Guía rápida ───────────────────────────────────── */}
        <Text style={[styles.sectionLabel, { marginTop: spacing.xxl }]}>Guía rápida</Text>
        {QUICK_GUIDE.map((g) => (
          <View key={g.label} style={styles.guideRow}>
            <Text style={styles.guideIcon}>{g.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.guideLabel}>{g.label}</Text>
              <Text style={styles.guideTip}>{g.tip}</Text>
            </View>
          </View>
        ))}

        {/* Nota longitud */}
        <View style={[styles.tipBox, { marginTop: spacing.xl }]}>
          <Text style={styles.tipIcon}>📏</Text>
          <Text style={styles.tipText}>
            <Text style={{ fontWeight: '700' }}>Regla de longitud:</Text>
            {' '}el tornillo debe penetrar en la base al menos 2× el espesor de la pieza superior. Ej: tablero 18mm → al menos 36mm dentro de la base.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-componente fila de especificación ─────────────────────────

function SpecRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <View style={specStyles.row}>
      <Text style={specStyles.label}>{label}</Text>
      <Text style={[specStyles.value, accent && specStyles.valueAccent]}>{value}</Text>
    </View>
  );
}

const specStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: { ...typography.caption, color: colors.textSecondary, flex: 1 },
  value: { ...typography.body, color: colors.text, fontWeight: '600', textAlign: 'right' },
  valueAccent: { color: colors.primary, fontSize: 15 },
});

// ── Estilos ───────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },

  hero: { ...typography.h1, color: colors.primary, marginBottom: spacing.xs },
  heroSub: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: spacing.xl },

  // Context toggle
  ctxRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  ctxBtn: { flex: 1, paddingVertical: spacing.md, alignItems: 'center' },
  ctxBtnActive: { backgroundColor: colors.primary + '22' },
  ctxBtnActiveExt: { backgroundColor: '#FF8C0022' },
  ctxTxt: { ...typography.body, color: colors.textMuted },
  ctxTxtActive: { color: colors.text, fontWeight: '700' },

  // Section headers
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionLabel: { ...typography.label, color: colors.text },
  sectionNote: { ...typography.caption, color: colors.textMuted },

  // Material grid (2 columnas)
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  matCard: {
    width: '47.5%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'flex-start',
  },
  matIcon: { fontSize: 22, marginBottom: 4 },
  matLabel: { ...typography.body, color: colors.text, fontWeight: '600', fontSize: 13 },
  matSub: { ...typography.caption, color: colors.textMuted, marginTop: 2, fontSize: 11 },

  // Resultado
  recCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderLeftWidth: 4,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  recHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  recTitle: { ...typography.h2, flex: 1 },
  resetBtn: {
    backgroundColor: colors.bg,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resetTxt: { ...typography.caption, color: colors.textSecondary },

  specGrid: { marginBottom: spacing.lg },

  tipBox: {
    flexDirection: 'row',
    backgroundColor: colors.primary + '12',
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  tipIcon: { fontSize: 18, marginTop: 1 },
  tipText: { ...typography.bodySmall, color: colors.text, flex: 1, lineHeight: 20 },

  warnBox: {
    backgroundColor: colors.danger + '12',
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  warnText: { ...typography.bodySmall, color: colors.danger },

  extBadge: {
    backgroundColor: '#FF8C0018',
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  extBadgeTxt: { ...typography.caption, color: '#CC7000', fontWeight: '600' },

  encyclopediaBtn: {
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border + '66',
    alignItems: 'center',
  },
  encyclopediaBtnText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },

  // Placeholder
  placeholder: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    marginBottom: spacing.xl,
  },
  placeholderIcon: { fontSize: 40, marginBottom: spacing.md },
  placeholderText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Guía rápida
  guideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  guideIcon: { fontSize: 22 },
  guideLabel: { ...typography.body, color: colors.text, fontWeight: '600' },
  guideTip: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
});
