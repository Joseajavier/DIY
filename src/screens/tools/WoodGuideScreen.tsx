// ═══════════════════════════════════════════════════════════════
// WOOD GUIDE — guía visual de 20 especies de madera
// ───────────────────────────────────────────────────────────────
// Datos: nombre ES/EN, dureza Janka, origen, usos, imagen de veta.
// ═══════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';

type HardnessLevel = 'blanda' | 'media' | 'dura' | 'muy dura';

type WoodSpecies = {
  id: string;
  nombre: string;
  nombreEN: string;
  aka: string[];
  origen: string;
  jankaN: number;        // Janka en Newtons
  jankaLabel: string;    // ej. "4,980 N"
  hardness: HardnessLevel;
  usos: string;
  imagenVeta: string;
  videoUrl?: string;
  accent: string;
};

function hardnessFromJanka(n: number): HardnessLevel {
  if (n < 2500) return 'blanda';
  if (n < 4500) return 'media';
  if (n < 7000) return 'dura';
  return 'muy dura';
}

const hardnessColor: Record<HardnessLevel, string> = {
  blanda: '#6B8E7A',
  media: '#C8A14B',
  dura: '#AB630A',
  'muy dura': '#AB130A',
};

const WOODS: WoodSpecies[] = [
  {
    id: 'pino', nombre: 'Pino silvestre', nombreEN: 'Scots Pine',
    aka: ['Scotch pine', 'Pinus sylvestris'],
    origen: 'Europa y norte de Asia', jankaN: 2420, jankaLabel: '2,420 N',
    hardness: hardnessFromJanka(2420),
    usos: 'Construcción, tarimas, cajas, postes, carpintería general y madera estructural.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/scots-pine-151x200.jpg',
    accent: '#C8A14B',
  },
  {
    id: 'abeto', nombre: 'Abeto', nombreEN: 'Norway Spruce',
    aka: ['European Spruce', 'Picea abies'],
    origen: 'Norte y centro de Europa', jankaN: 1680, jankaLabel: '1,680 N',
    hardness: hardnessFromJanka(1680),
    usos: 'Estructuras ligeras, carpintería, molduras, cajas y tapas armónicas de instrumentos.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/norway-spruce-145x200.jpg',
    accent: '#8B9A6B',
  },
  {
    id: 'roble', nombre: 'Roble europeo', nombreEN: 'English Oak',
    aka: ['European Oak', 'Quercus robur'],
    origen: 'Europa, Asia Menor y norte de África', jankaN: 4980, jankaLabel: '4,980 N',
    hardness: hardnessFromJanka(4980),
    usos: 'Muebles, ebanistería, suelos, barricas, interiorismo, chapas y construcción naval.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/english-oak-s-200x200.jpg',
    accent: '#8B5A3C',
  },
  {
    id: 'haya', nombre: 'Haya', nombreEN: 'European Beech',
    aka: ['Common Beech', 'Fagus sylvatica'],
    origen: 'Europa', jankaN: 6460, jankaLabel: '6,460 N',
    hardness: hardnessFromJanka(6460),
    usos: 'Mobiliario, tableros contrachapados, torneado, instrumentos, suelos y carpintería interior.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/fagus-sylvatica-225x450.jpg',
    accent: '#B8844A',
  },
  {
    id: 'fresno', nombre: 'Fresno', nombreEN: 'European Ash',
    aka: ['Common Ash', 'Fraxinus excelsior'],
    origen: 'Europa y sudoeste de Asia', jankaN: 6580, jankaLabel: '6,580 N',
    hardness: hardnessFromJanka(6580),
    usos: 'Manguitos de herramienta, mobiliario, tarimas, cajas y piezas que necesitan elasticidad.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/european-ash-s-200x200.jpg',
    accent: '#7A6E5A',
  },
  {
    id: 'abedul', nombre: 'Abedul', nombreEN: 'Silver Birch',
    aka: ['Betula pendula'],
    origen: 'Europa y sudoeste de Asia', jankaN: 5360, jankaLabel: '5,360 N',
    hardness: hardnessFromJanka(5360),
    usos: 'Contrachapado, cajas, torneado, molduras y pequeños objetos de carpintería fina.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/silver-birch-s-200x200.jpg',
    accent: '#D4C5A0',
  },
  {
    id: 'nogal', nombre: 'Nogal europeo', nombreEN: 'English Walnut',
    aka: ['European Walnut', 'Juglans regia'],
    origen: 'Europa oriental y Asia occidental', jankaN: 5410, jankaLabel: '5,410 N',
    hardness: hardnessFromJanka(5410),
    usos: 'Ebanistería fina, muebles, culatas, panelados, chapas decorativas y torneado.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/english-walnut-200x200.jpg',
    accent: '#4A3728',
  },
  {
    id: 'cerezo', nombre: 'Cerezo', nombreEN: 'Sweet Cherry',
    aka: ['Wild Cherry', 'Prunus avium'],
    origen: 'Europa y Asia', jankaN: 5120, jankaLabel: '5,120 N',
    hardness: hardnessFromJanka(5120),
    usos: 'Muebles, chapas, tallas, instrumentos y piezas decorativas de interior.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/wild-cherry-s-200x200.jpg',
    accent: '#A0522D',
  },
  {
    id: 'arce', nombre: 'Arce', nombreEN: 'Sycamore Maple',
    aka: ['European Sycamore', 'Acer pseudoplatanus'],
    origen: 'Europa y sudoeste de Asia', jankaN: 4680, jankaLabel: '4,680 N',
    hardness: hardnessFromJanka(4680),
    usos: 'Instrumentos, torneado, cajas, tableros, pequeños objetos y carpintería interior.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/acer-pseudoplatanus-225x450.jpg',
    accent: '#E8DCC8',
  },
  {
    id: 'castano', nombre: 'Castaño', nombreEN: 'Sweet Chestnut',
    aka: ['Spanish Chestnut', 'Castanea sativa'],
    origen: 'Europa y Asia Menor', jankaN: 3010, jankaLabel: '3,010 N',
    hardness: hardnessFromJanka(3010),
    usos: 'Mobiliario, chapas, carpintería exterior ligera, vigas y piezas decorativas.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/sweet-chestnut-s-200x200.jpg',
    accent: '#8B7355',
  },
  {
    id: 'olivo', nombre: 'Olivo', nombreEN: 'Olive',
    aka: ['Mediterranean Olive', 'Olea europaea'],
    origen: 'Región mediterránea', jankaN: 12060, jankaLabel: '12,060 N',
    hardness: hardnessFromJanka(12060),
    usos: 'Objetos de lujo, mangos, torneado, chapas y piezas pequeñas de alto valor visual.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/olea-europaea-225x450.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=Aay5r-zoklY',
    accent: '#6B6B3A',
  },
  {
    id: 'iroko', nombre: 'Iroko', nombreEN: 'Iroko',
    aka: ['African Teak', 'Milicia excelsa'],
    origen: 'África tropical', jankaN: 5310, jankaLabel: '5,310 N',
    hardness: hardnessFromJanka(5310),
    usos: 'Exterior, muebles, carpintería naval, suelos, encimeras y carpintería resistente a humedad.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/milicia-excelsa-225x450.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=truRWVuRZY8',
    accent: '#8B6914',
  },
  {
    id: 'sapelli', nombre: 'Sapelli', nombreEN: 'Sapele',
    aka: ['Sapelli Mahogany', 'Entandrophragma cylindricum'],
    origen: 'África tropical', jankaN: 6060, jankaLabel: '6,060 N',
    hardness: hardnessFromJanka(6060),
    usos: 'Muebles, chapas, suelos, instrumentos, barcos y carpintería decorativa de veta marcada.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/entandrophragma-cylindricum-225x450.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=CxjoyddMtKw',
    accent: '#A0522D',
  },
  {
    id: 'teca', nombre: 'Teca', nombreEN: 'Teak',
    aka: ['Burmese Teak', 'Tectona grandis'],
    origen: 'Asia meridional; plantaciones en África y América Latina', jankaN: 4740, jankaLabel: '4,740 N',
    hardness: hardnessFromJanka(4740),
    usos: 'Exterior, cubiertas de barco, mobiliario, chapas, carpintería húmeda y piezas durables.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/tectona-grandis-225x450.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=HsJFU2IggVI',
    accent: '#B8860B',
  },
  {
    id: 'wengue', nombre: 'Wengué', nombreEN: 'Wenge',
    aka: ['Millettia laurentii'],
    origen: 'África central', jankaN: 8600, jankaLabel: '8,600 N',
    hardness: hardnessFromJanka(8600),
    usos: 'Mobiliario oscuro, panelados, instrumentos, torneado y piezas decorativas premium.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/millettia-laurentii-300x600.jpg',
    accent: '#2F1B0E',
  },
  {
    id: 'cedro', nombre: 'Cedro', nombreEN: 'Spanish Cedar',
    aka: ['Cedrela odorata'],
    origen: 'Centroamérica, Sudamérica y Caribe', jankaN: 2670, jankaLabel: '2,670 N',
    hardness: hardnessFromJanka(2670),
    usos: 'Humidores, guitarras, chapas, contrachapado, carpintería ligera y náutica.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/spanish-cedar-200x200.jpg',
    accent: '#CD853F',
  },
  {
    id: 'alamo', nombre: 'Álamo', nombreEN: 'Black Poplar',
    aka: ['Lombardy Poplar', 'Populus nigra'],
    origen: 'Europa, Asia occidental y norte de África', jankaN: 2020, jankaLabel: '2,020 N',
    hardness: hardnessFromJanka(2020),
    usos: 'Cajas, contrachapado, bastidores, muebles ligeros y elementos ocultos o pintados.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/black-poplar-147x200.jpg',
    accent: '#C4B896',
  },
  {
    id: 'olmo', nombre: 'Olmo', nombreEN: 'English Elm',
    aka: ['Carpathian Elm', 'Ulmus procera'],
    origen: 'Europa occidental', jankaN: 3620, jankaLabel: '3,620 N',
    hardness: hardnessFromJanka(3620),
    usos: 'Muebles, chapas, piezas curvas, arcos, mangos y carpintería de carácter rústico.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/english-elm-s-200x200.jpg',
    accent: '#6B4226',
  },
  {
    id: 'aliso', nombre: 'Aliso', nombreEN: 'European Alder',
    aka: ['Black Alder', 'Alnus glutinosa'],
    origen: 'Europa occidental', jankaN: 2890, jankaLabel: '2,890 N',
    hardness: hardnessFromJanka(2890),
    usos: 'Muebles pintados, torneado, contrachapado, carpintería interior y pequeños objetos.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/alnus-glutinosa-225x450.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=fl1dBIEbMoA',
    accent: '#D2691E',
  },
  {
    id: 'sipo', nombre: 'Mukali / Sipo', nombreEN: 'Utile / Sipo',
    aka: ['Sipo Mahogany', 'Entandrophragma utile'],
    origen: 'África occidental y central', jankaN: 5260, jankaLabel: '5,260 N',
    hardness: hardnessFromJanka(5260),
    usos: 'Muebles, carpintería fina, chapas, náutica, pavimentos y molduras de calidad.',
    imagenVeta: 'https://www.wood-database.com/wp-content/uploads/entandrophragma-utile-225x450.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=06msIiiGHrY',
    accent: '#8B4513',
  },
];

type Filter = 'all' | HardnessLevel;

function JankaBar({ value, max = 12060 }: { value: number; max?: number }) {
  const pct = Math.min((value / max) * 100, 100);
  const hl = hardnessFromJanka(value);
  return (
    <View style={barStyles.track}>
      <View style={[barStyles.fill, { width: `${pct}%`, backgroundColor: hardnessColor[hl] }]} />
    </View>
  );
}

const barStyles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
    marginTop: 4,
    overflow: 'hidden',
  },
  fill: { height: 6, borderRadius: 3 },
});

export default function WoodGuideScreen() {
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filters: Filter[] = ['all', 'blanda', 'media', 'dura', 'muy dura'];
  const filtered = filter === 'all' ? WOODS : WOODS.filter(w => w.hardness === filter);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Guía de maderas</Text>
        <Text style={styles.subtitle}>
          {WOODS.length} especies — dureza Janka, origen, usos y veta.
        </Text>

        {/* Filtro dureza */}
        <View style={styles.filterRow}>
          {filters.map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
              onPress={() => setFilter(f)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f === 'all' ? 'Todas' : f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tarjetas */}
        {filtered.map(wood => {
          const open = expanded === wood.id;
          return (
            <TouchableOpacity
              key={wood.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => setExpanded(open ? null : wood.id)}
            >
              {/* Cabecera */}
              <View style={styles.cardHeader}>
                {wood.imagenVeta ? (
                  <Image
                    source={{ uri: wood.imagenVeta }}
                    style={styles.vetaImg}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[styles.vetaImg, { backgroundColor: wood.accent + '33' }]} />
                )}
                <View style={{ flex: 1 }}>
                  <Text style={styles.woodName}>{wood.nombre}</Text>
                  <Text style={styles.woodNameEn}>{wood.nombreEN}</Text>
                  <View style={styles.badges}>
                    <View style={[styles.badge, { backgroundColor: hardnessColor[wood.hardness] + '22' }]}>
                      <Text style={[styles.badgeText, { color: hardnessColor[wood.hardness] }]}>
                        {wood.hardness}
                      </Text>
                    </View>
                    <Text style={styles.jankaText}>{wood.jankaLabel}</Text>
                  </View>
                  <JankaBar value={wood.jankaN} />
                </View>
                <Text style={styles.chevron}>{open ? '▲' : '▼'}</Text>
              </View>

              {/* Expandido */}
              {open && (
                <View style={styles.expandedContent}>
                  <View style={[styles.accentBar, { backgroundColor: wood.accent }]} />
                  <View style={styles.expandedInner}>
                    <Text style={styles.sectionLabel}>Origen</Text>
                    <Text style={styles.sectionText}>{wood.origen}</Text>

                    <Text style={[styles.sectionLabel, { marginTop: spacing.sm }]}>Usos principales</Text>
                    <Text style={styles.sectionText}>{wood.usos}</Text>

                    {wood.aka.length > 0 && (
                      <>
                        <Text style={[styles.sectionLabel, { marginTop: spacing.sm }]}>
                          Otros nombres
                        </Text>
                        <Text style={styles.sectionText}>{wood.aka.join(', ')}</Text>
                      </>
                    )}

                    {/* Link vídeo */}
                    {wood.videoUrl && (
                      <TouchableOpacity
                        style={styles.videoBtn}
                        onPress={() => Linking.openURL(wood.videoUrl!)}
                      >
                        <Text style={styles.videoBtnText}>▶ Ver vídeo</Text>
                      </TouchableOpacity>
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
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },

  title: { ...typography.hero, color: colors.text, marginBottom: spacing.xs },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },

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
  },
  vetaImg: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
  },
  woodName: { ...typography.h3, color: colors.text },
  woodNameEn: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  badgeText: { ...typography.caption, fontWeight: '700', fontSize: 11 },
  jankaText: { ...typography.caption, color: colors.textMuted, fontSize: 11 },
  chevron: { ...typography.caption, color: colors.textMuted, fontSize: 12, marginTop: 4 },

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
  sectionLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  sectionText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  videoBtn: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: '#FF000018',
    alignSelf: 'flex-start',
  },
  videoBtnText: {
    ...typography.caption,
    fontWeight: '700',
    fontSize: 12,
    color: '#CC0000',
  },
});
