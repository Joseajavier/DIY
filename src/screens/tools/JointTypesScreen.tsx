// ═══════════════════════════════════════════════════════════════
// JOINT TYPES — guía visual de uniones de carpintería
// ───────────────────────────────────────────────────────────────
// Tarjetas con nombre, descripción, nivel de dificultad y
// resistencia de cada tipo de unión clásica.
// ═══════════════════════════════════════════════════════════════

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';
import { HeroBanner } from '../../components';

type Difficulty = 'Fácil' | 'Media' | 'Difícil';
type Strength   = 1 | 2 | 3;

type Joint = {
  id: string;
  emoji: string;
  name: string;
  nameEn: string;
  difficulty: Difficulty;
  strength: Strength;       // 1–3 estrellas
  uses: string;
  description: string;
  tip: string;
  accent: string;
  videoUrl?: string;
  diagramaUrl?: string;
};

const JOINTS: Joint[] = [
  {
    id: 'butt',
    emoji: '📐',
    name: 'A tope',
    nameEn: 'Butt joint',
    difficulty: 'Fácil',
    strength: 1,
    uses: 'Cajas, marcos ligeros',
    description:
      'La más simple: dos piezas se unen frontalmente. Sin refuerzo mecánico, depende ' +
      'únicamente del adhesivo o de la tornillería.',
    tip: 'Usa mínimo 2 tornillos y encola bien para mejorar la resistencia.',
    accent: '#6B8E7A',
    videoUrl: 'https://www.youtube.com/watch?v=hbbRlHi8xUA',
    diagramaUrl: 'https://en.wikipedia.org/wiki/Butt_joint',
  },
  {
    id: 'miter',
    emoji: '🔪',
    name: 'Inglete (45°)',
    nameEn: 'Miter joint',
    difficulty: 'Fácil',
    strength: 1,
    uses: 'Marcos de cuadros, molduras, esquinas limpias',
    description:
      'Corte a 45° en ambas piezas para ocultar la veta del canto. ' +
      'La unión queda limpia visualmente pero es débil sin espigas o clavos de refuerzo.',
    tip: 'Añade una espiga o galletero en el eje del corte para triplicar la resistencia.',
    accent: '#C8A14B',
    videoUrl: 'https://www.youtube.com/watch?v=xBgPxYSY8iw',
    diagramaUrl: 'https://en.wikipedia.org/wiki/Miter_joint',
  },
  {
    id: 'halflap',
    emoji: '🔄',
    name: 'Media madera',
    nameEn: 'Half-lap joint',
    difficulty: 'Fácil',
    strength: 2,
    uses: 'Marcos, esquinas de bastidores',
    description:
      'Cada pieza pierde la mitad de su grosor en la zona de unión, de modo que ' +
      'ambas quedan al mismo nivel. Resistente y rápida de hacer con fresadora o sierra.',
    tip: 'Corta siempre con la pieza bien sujeta para evitar que la sierra "muera".',
    accent: '#8B5A3C',
    videoUrl: 'https://www.youtube.com/watch?v=OU_i8I-007c',
    diagramaUrl: 'https://commons.wikimedia.org/wiki/File%3ALap_joint.png',
  },
  {
    id: 'dado',
    emoji: '🗃️',
    name: 'Ranura / dado',
    nameEn: 'Dado / groove',
    difficulty: 'Fácil',
    strength: 2,
    uses: 'Baldas en librerías, paneles laterales',
    description:
      'Una ranura transversal recibe el canto o el panel de la otra pieza. ' +
      'La balda queda encajada y soporta cargas verticales sin necesidad de tornillos.',
    tip: 'El dado debe ser exactamente el grosor de la pieza que encaja; usa una espiga de ajuste.',
    accent: '#5A7D9A',
    videoUrl: 'https://www.youtube.com/watch?v=n3e6Ba6IfhM',
    diagramaUrl: 'https://en.wikipedia.org/wiki/Dado_%28joinery%29',
  },
  {
    id: 'rabbet',
    emoji: '📦',
    name: 'Bisel / rebaje',
    nameEn: 'Rabbet joint',
    difficulty: 'Fácil',
    strength: 2,
    uses: 'Fondos de cajones, encuadres de puertas',
    description:
      'Canal en el borde de una pieza donde encaja el panel o el fondo. ' +
      'Clásico para cajones: el fondo se aloja en el rebaje de las paredes laterales.',
    tip: 'Profundidad del rebaje = ½ grosor de la pieza para no debilitar demasiado.',
    accent: '#7A6E5A',
    videoUrl: 'https://www.youtube.com/watch?v=KCpYIpqoMU4',
    diagramaUrl: 'https://commons.wikimedia.org/wiki/File%3AWoodworking-joint-rebate.gif',
  },
  {
    id: 'dowel',
    emoji: '🔩',
    name: 'Espigas redondas',
    nameEn: 'Dowel joint',
    difficulty: 'Media',
    strength: 2,
    uses: 'Uniones invisibles, muebles planos (flat-pack)',
    description:
      'Clavijas cilíndricas de madera (o metal) ocultas entre dos piezas. ' +
      'Alinea perfectamente y es estética: no hay tornillos a la vista.',
    tip: 'Usa un centrador de espigas (jig) para que los taladros queden perfectamente alineados.',
    accent: '#AB630A',
    videoUrl: 'https://www.youtube.com/watch?v=0SI6QtNRYP4',
    diagramaUrl: 'https://en.wikipedia.org/?redirect=no&title=Dowel_joint',
  },
  {
    id: 'biscuit',
    emoji: '🍪',
    name: 'Galleta / lamelo',
    nameEn: 'Biscuit / plate joint',
    difficulty: 'Media',
    strength: 2,
    uses: 'Tableros de canto a canto, ensanchado de tablas',
    description:
      'Ovalos de madera prensada que se insertan en ranuras hechas con fresadora de galletero. ' +
      'Alinean y refuerzan la unión; muy populares en tableros encolados.',
    tip: 'Humedece ligeramente la galleta antes de encolar: se hincha y aprieta sola.',
    accent: '#B8844A',
    videoUrl: 'https://www.youtube.com/watch?v=WgMpRs-1ZhA',
    diagramaUrl: 'https://en.wikipedia.org/?redirect=no&title=Biscuit_joint',
  },
  {
    id: 'mortise',
    emoji: '🏛️',
    name: 'Espiga y mortaja',
    nameEn: 'Mortise & Tenon',
    difficulty: 'Difícil',
    strength: 3,
    uses: 'Sillas, marcos de puertas, estructuras con carga',
    description:
      'Un saliente (espiga) encaja en una cavidad (mortaja). Es la unión clásica ' +
      'de la carpintería tradicional: resiste fuerzas en todas las direcciones con encolado.',
    tip: 'La espiga debe cubrir ⅓ del grosor de la pieza. Grosor mayor reduce resistencia.',
    accent: '#6B4C3B',
    videoUrl: 'https://www.youtube.com/watch?v=r-08PY3stgo',
    diagramaUrl: 'https://commons.wikimedia.org/wiki/File%3AMortise_and_Tenon.png',
  },
  {
    id: 'finger',
    emoji: '🤝',
    name: 'Caja y espiga (dedos)',
    nameEn: 'Box / finger joint',
    difficulty: 'Difícil',
    strength: 3,
    uses: 'Cajas de madera, cajones de alta calidad',
    description:
      'Dedos rectangulares entrelazados con gran superficie de encolado. ' +
      'Muy resistente y decorativo. Requiere fresadora con plantilla o mesa de sierra con guía.',
    tip: 'La clave es la precisión: un ajuste holgado arruina la estética; uno apretado rompe la pieza.',
    accent: '#3A6B5A',
    videoUrl: 'https://www.youtube.com/watch?v=w78HWLdZiHM',
    diagramaUrl: 'https://en.wikipedia.org/wiki/Finger_joint',
  },
  {
    id: 'dovetail',
    emoji: '🕊️',
    name: 'Cola de milano',
    nameEn: 'Dovetail joint',
    difficulty: 'Difícil',
    strength: 3,
    uses: 'Cajones de lujo, cofres, carpintería fina',
    description:
      'Dientes en abanico con ángulo que impide el desmontaje en tracción. ' +
      'Es la unión más resistente para esquinas y la más valorada estéticamente. ' +
      'Marca diferencia en muebles de alta gama.',
    tip: 'A mano requiere mucha práctica. Con plantilla (jig) y fresadora el resultado es impecable.',
    accent: '#AB130A',
    videoUrl: 'https://www.youtube.com/watch?v=0wkw39o_3MQ',
    diagramaUrl: 'https://en.wikipedia.org/wiki/Dovetail_joint',
  },
  {
    id: 'tongue',
    emoji: '🪵',
    name: 'Lengüeta y ranura',
    nameEn: 'Tongue & groove',
    difficulty: 'Media',
    strength: 3,
    uses: 'Suelos, paneles de pared, tarima',
    description:
      'Una pieza tiene una lengüeta longitudinal que encaja en la ranura de la siguiente. ' +
      'Permite montaje sin cola, autoespaciado y movimiento de la madera con la humedad.',
    tip: 'Deja siempre 1–2 mm de holgura para que la madera trabaje sin abombar.',
    accent: '#3A7A5C',
    videoUrl: 'https://www.youtube.com/watch?v=OFZA253-xvo',
    diagramaUrl: 'https://en.wikipedia.org/wiki/Tongue_and_groove',
  },
  // ── Nuevas del JSON de recursos ──────────────────────────────
  {
    id: 'scarf',
    emoji: '↗️',
    name: 'Empalme a bisel',
    nameEn: 'Scarf joint',
    difficulty: 'Media',
    strength: 2,
    uses: 'Alargar piezas, vigas, quillas de barcos',
    description:
      'Dos extremos cortados en ángulo largo que se solapan y encolan. ' +
      'Permite extender la longitud de una pieza sin que el empalme sea visible ni débil. ' +
      'Clásico en carpintería naval y estructural.',
    tip: 'El ángulo ideal es 1:8 — cuanto más largo el bisel, mayor superficie de encolado.',
    accent: '#4A6E8A',
    videoUrl: 'https://www.youtube.com/watch?v=YvmZj7jGgIg',
    diagramaUrl: 'https://en.wikipedia.org/wiki/Scarf_joint',
  },
  {
    id: 'tabled_scarf',
    emoji: '🔗',
    name: 'Empalme escalonado',
    nameEn: 'Tabled scarf joint',
    difficulty: 'Difícil',
    strength: 3,
    uses: 'Vigas estructurales, restauración de edificios, construcción naval',
    description:
      'Variante del scarf con escalones (tables) que impiden el deslizamiento lateral. ' +
      'A menudo lleva cuñas o pernos. Es una de las uniones más robustas para alargar vigas ' +
      'que soportan carga.',
    tip: 'Marca los escalones con gramil y escuadra; la precisión es crítica para que cierre bien.',
    accent: '#6A4A3A',
    videoUrl: 'https://www.youtube.com/shorts/o09u7mdx2vU',
    diagramaUrl: 'https://commons.wikimedia.org/wiki/File:Cassells_Carpentry.236_Tabled_Scarf_Joint.png',
  },
];

const difficultyColor: Record<Difficulty, string> = {
  Fácil: colors.success,
  Media: colors.warning,
  Difícil: colors.danger,
};

type Filter = 'all' | Difficulty;

function Stars({ n }: { n: Strength }) {
  return (
    <Text style={{ fontSize: 14 }}>
      {'★'.repeat(n)}{'☆'.repeat(3 - n)}
    </Text>
  );
}

export default function JointTypesScreen() {
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filters: Filter[] = ['all', 'Fácil', 'Media', 'Difícil'];
  const filtered = filter === 'all' ? JOINTS : JOINTS.filter(j => j.difficulty === filter);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <HeroBanner
          eyebrow="Herramientas"
          title="Uniones de carpintería"
          subtitle={`${JOINTS.length} tipos de unión — toca para ver detalles, vídeos y diagramas.`}
        />

        {/* Filtro dificultad */}
        <View style={styles.filterRow}>
          {filters.map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
              onPress={() => setFilter(f)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f === 'all' ? 'Todas' : f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tarjetas */}
        {filtered.map(joint => {
          const open = expanded === joint.id;
          return (
            <TouchableOpacity
              key={joint.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => setExpanded(open ? null : joint.id)}
            >
              {/* Cabecera siempre visible */}
              <View style={styles.cardHeader}>
                <View style={[styles.emojiBox, { backgroundColor: joint.accent + '22' }]}>
                  <Text style={styles.emoji}>{joint.emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.jointName}>{joint.name}</Text>
                  <Text style={styles.jointNameEn}>{joint.nameEn}</Text>
                  <View style={styles.badges}>
                    <View style={[styles.badge, { backgroundColor: difficultyColor[joint.difficulty] + '22' }]}>
                      <Text style={[styles.badgeText, { color: difficultyColor[joint.difficulty] }]}>
                        {joint.difficulty}
                      </Text>
                    </View>
                    <Stars n={joint.strength} />
                  </View>
                </View>
                <Text style={styles.chevron}>{open ? '▲' : '▼'}</Text>
              </View>

              <Text style={styles.uses}>📌 {joint.uses}</Text>

              {/* Contenido expandido */}
              {open && (
                <View style={styles.expandedContent}>
                  <View style={[styles.accentBar, { backgroundColor: joint.accent }]} />
                  <View style={styles.expandedInner}>
                    <Text style={styles.description}>{joint.description}</Text>
                    <View style={styles.tipBox}>
                      <Text style={styles.tipLabel}>💡 Consejo</Text>
                      <Text style={styles.tipText}>{joint.tip}</Text>
                    </View>
                    {/* Enlaces externos */}
                    {(joint.videoUrl || joint.diagramaUrl) && (
                      <View style={styles.linksRow}>
                        {joint.videoUrl && (
                          <TouchableOpacity
                            style={[styles.linkBtn, { backgroundColor: '#FF000018' }]}
                            onPress={() => Linking.openURL(joint.videoUrl!)}
                          >
                            <Text style={[styles.linkText, { color: '#CC0000' }]}>
                              ▶ Ver vídeo
                            </Text>
                          </TouchableOpacity>
                        )}
                        {joint.diagramaUrl && (
                          <TouchableOpacity
                            style={[styles.linkBtn, { backgroundColor: colors.primaryMuted }]}
                            onPress={() => Linking.openURL(joint.diagramaUrl!)}
                          >
                            <Text style={[styles.linkText, { color: colors.primary }]}>
                              📖 Diagrama
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },

  // ── Filtros ───────────────────────────────────────────────
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    flexWrap: 'wrap',
  },
  filterBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterBtnActive: {
    backgroundColor: colors.primaryMuted,
    borderColor: colors.primary,
  },
  filterText: { ...typography.caption, color: colors.textMuted, fontWeight: '600' },
  filterTextActive: { color: colors.primary },

  // ── Tarjeta ───────────────────────────────────────────────
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  emojiBox: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 26 },
  jointName: { ...typography.h3, color: colors.text },
  jointNameEn: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  badges: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xs },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  badgeText: { ...typography.caption, fontWeight: '700', fontSize: 11 },
  chevron: { ...typography.caption, color: colors.textMuted, fontSize: 12, marginTop: 4 },

  uses: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },

  // ── Expandido ─────────────────────────────────────────────
  expandedContent: {
    flexDirection: 'row',
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border + '66',
    paddingTop: spacing.md,
  },
  accentBar: { width: 3, borderRadius: 2, marginRight: spacing.md },
  expandedInner: { flex: 1 },
  description: {
    ...typography.bodySmall,
    color: colors.text,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  tipBox: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  tipLabel: { ...typography.caption, fontWeight: '700', color: colors.text, marginBottom: 4 },
  tipText: { ...typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },

  // ── Links vídeo / diagrama ────────────────────────────────
  linksRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    flexWrap: 'wrap',
  },
  linkBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  linkText: {
    ...typography.caption,
    fontWeight: '700',
    fontSize: 12,
  },
});
