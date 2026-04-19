// ═══════════════════════════════════════════════════════════════
// VARNISH GUIDE — enciclopedia de barnices, errores y marcas
// ───────────────────────────────────────────────────────────────
// 3 pestañas:
//   1. Tipos (18) — catálogo completo con vídeos
//   2. Errores (10) — qué no hacer y por qué
//   3. Marcas (14) — las mejores en España
//
// Clona el patrón de ScrewGuideScreen: cabecera con badges,
// tarjeta expandible con imagen + descripción + ficha técnica,
// enlaces a vídeo y diagrama.
// ═══════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';
import {
  VARNISH_TYPES,
  VARNISH_COMMON_MISTAKES,
  VARNISH_BRANDS,
  VarnishType,
  VarnishCommonMistake,
  VarnishBrand,
  VarnishBrandLevel,
  VarnishDurability,
} from '../../data/varnishData';

// ── Pestañas ──────────────────────────────────────────────────

type Tab = 'tipos' | 'errores' | 'marcas';

const TABS: { key: Tab; label: string }[] = [
  { key: 'tipos', label: 'Tipos' },
  { key: 'errores', label: 'Errores' },
  { key: 'marcas', label: 'Marcas' },
];

// ── Colores por nivel ─────────────────────────────────────────

const LEVEL_COLOR: Record<VarnishBrandLevel, string> = {
  premium: '#C8A14B',
  profesional: '#5A7D9A',
  media: '#6B8E7A',
  básica: '#7A6E5A',
};

const LEVEL_ORDER: VarnishBrandLevel[] = ['premium', 'profesional', 'media', 'básica'];

const DURABILITY_COLOR: Record<VarnishDurability, string> = {
  muy_alta: colors.success,
  alta: colors.success,
  media: colors.warning,
  baja: colors.danger,
};

const DURABILITY_LABEL: Record<VarnishDurability, string> = {
  muy_alta: 'muy alta',
  alta: 'alta',
  media: 'media',
  baja: 'baja',
};

const USE_LABEL: Record<'interior' | 'exterior' | 'ambos', string> = {
  interior: '🏠 Int',
  exterior: '☀️ Ext',
  ambos: '🔄 Int/Ext',
};

// ── Pantalla principal ────────────────────────────────────────

export default function VarnishGuideScreen() {
  const [tab, setTab] = useState<Tab>('tipos');
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tabBtn, tab === t.key && styles.tabBtnActive]}
            onPress={() => { setTab(t.key); setExpanded(null); }}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {tab === 'tipos' && (
          <TiposTab expanded={expanded} setExpanded={setExpanded} />
        )}
        {tab === 'errores' && (
          <ErroresTab expanded={expanded} setExpanded={setExpanded} />
        )}
        {tab === 'marcas' && <MarcasTab />}
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Tab 1: Tipos ──────────────────────────────────────────────

function TiposTab({
  expanded,
  setExpanded,
}: {
  expanded: string | null;
  setExpanded: (id: string | null) => void;
}) {
  return (
    <>
      <Text style={styles.sectionTitle}>
        {VARNISH_TYPES.length} tipos de barniz y acabado
      </Text>
      <Text style={styles.sectionSub}>
        Toca para ver base, capas, secado y para qué usarlo.
      </Text>
      {VARNISH_TYPES.map((varnish) => (
        <VarnishCard
          key={varnish.id}
          varnish={varnish}
          open={expanded === varnish.id}
          onPress={() => setExpanded(expanded === varnish.id ? null : varnish.id)}
        />
      ))}
    </>
  );
}

function VarnishCard({
  varnish,
  open,
  onPress,
}: {
  varnish: VarnishType;
  open: boolean;
  onPress: () => void;
}) {
  const durabilityColor = DURABILITY_COLOR[varnish.durabilidad];

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      {/* Cabecera */}
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleCol}>
          <Text style={styles.cardTitle}>{varnish.nombre}</Text>
          <Text style={styles.cardSub}>{varnish.nombreEN}</Text>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: durabilityColor + '22' }]}>
              <Text style={[styles.badgeText, { color: durabilityColor }]}>
                Durabilidad {DURABILITY_LABEL[varnish.durabilidad]}
              </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: colors.primary + '22' }]}>
              <Text style={[styles.badgeText, { color: colors.primary }]}>
                {USE_LABEL[varnish.interiorExterior]}
              </Text>
            </View>
            {varnish.aptoAlimentario && (
              <View style={[styles.badge, { backgroundColor: colors.success + '22' }]}>
                <Text style={[styles.badgeText, { color: colors.success }]}>
                  🍽 Alimentario
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.parBadge}>
          <Text style={styles.parLabel}>Manos</Text>
          <Text style={styles.parValue}>
            {varnish.numeroCapas.replace(' capas', '').replace(' capa', '')}
          </Text>
          <Text style={styles.parUnit}>capas</Text>
        </View>
        <Text style={styles.chevron}>{open ? '▲' : '▼'}</Text>
      </View>

      {/* Resumen siempre visible */}
      <Text style={styles.usesText} numberOfLines={open ? undefined : 2}>
        ✓ {varnish.mejorPara.join(' · ')}
      </Text>

      {/* Expandido */}
      {open && (
        <View style={styles.expandedSection}>
          {/* Imagen del barniz */}
          {varnish.imagenURL ? (
            <Image
              source={{ uri: varnish.imagenURL }}
              style={styles.screwImage}
              resizeMode="contain"
            />
          ) : null}

          <Text style={styles.porQueBox}>{varnish.porQueEsMejor}</Text>

          <Text style={styles.description}>{varnish.descripcion}</Text>

          <View style={styles.infoGrid}>
            <InfoRow label="Base" value={varnish.base} />
            <InfoRow label="Acabado" value={varnish.acabado.join(', ')} />
            <InfoRow label="Transparencia" value={varnish.transparencia} />
            <InfoRow label="Nº capas" value={varnish.numeroCapas} />
            <InfoRow label="Secado" value={varnish.tiempoSecadoCapas} />
            <InfoRow label="Curado total" value={varnish.tiempoCuradoTotal} />
            <InfoRow label="Aplicación" value={varnish.aplicacion.join(', ')} />
            <InfoRow label="Diluyente" value={varnish.diluyente} />
            <InfoRow label="Rendimiento" value={varnish.rendimiento} />
            <InfoRow label="Lijado" value={varnish.lijadoEntreCapas} />
            <InfoRow label="R. rayado" value={varnish.resistenciaRayado} />
            <InfoRow label="R. humedad" value={varnish.resistenciaHumedad} />
            <InfoRow label="R. UV" value={varnish.resistenciaUV} />
            <InfoRow label="Olor" value={varnish.olor} />
            <InfoRow label="Amarillea" value={varnish.amarillea ? 'sí' : 'no'} />
            <InfoRow label="Reversible" value={varnish.reversible ? 'sí' : 'no'} />
            <InfoRow label="Precio aprox." value={varnish.precioOrientativo} />
          </View>

          <View style={styles.listBlock}>
            <Text style={styles.listLabel}>✖ Evitar en</Text>
            <Text style={styles.listText}>{varnish.evitarEn.join(' · ')}</Text>
          </View>

          <View style={styles.listBlock}>
            <Text style={styles.listLabel}>🏷 Marcas</Text>
            <Text style={styles.listText}>
              {varnish.marcasRecomendadas.join(' · ')}
            </Text>
          </View>

          <View style={styles.linksRow}>
            {varnish.videoYT ? (
              <TouchableOpacity
                style={styles.videoBtn}
                onPress={() => Linking.openURL(varnish.videoYT)}
              >
                <Text style={styles.videoBtnText}>▶ Ver vídeo</Text>
              </TouchableOpacity>
            ) : null}
            {varnish.diagramaURL ? (
              <TouchableOpacity
                style={styles.diagramBtn}
                onPress={() => Linking.openURL(varnish.diagramaURL)}
              >
                <Text style={styles.diagramBtnText}>📖 Diagrama</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

// ── Tab 2: Errores ────────────────────────────────────────────

function ErroresTab({
  expanded,
  setExpanded,
}: {
  expanded: string | null;
  setExpanded: (id: string | null) => void;
}) {
  return (
    <>
      <Text style={styles.sectionTitle}>
        {VARNISH_COMMON_MISTAKES.length} errores comunes
      </Text>
      <Text style={styles.sectionSub}>
        Lo que más falla con barnices y cómo evitarlo.
      </Text>
      {VARNISH_COMMON_MISTAKES.map((m, i) => (
        <MistakeCard
          key={i}
          mistake={m}
          index={i}
          open={expanded === `error_${i}`}
          onPress={() =>
            setExpanded(expanded === `error_${i}` ? null : `error_${i}`)
          }
        />
      ))}
    </>
  );
}

function MistakeCard({
  mistake,
  index,
  open,
  onPress,
}: {
  mistake: VarnishCommonMistake;
  index: number;
  open: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.mistakeHeader}>
        <View style={[styles.mistakeNum, { backgroundColor: colors.danger + '22' }]}>
          <Text style={[styles.mistakeNumText, { color: colors.danger }]}>
            {index + 1}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.mistakeTitle} numberOfLines={open ? undefined : 2}>
            {mistake.error}
          </Text>
        </View>
        <Text style={styles.chevron}>{open ? '▲' : '▼'}</Text>
      </View>

      {open && (
        <View style={styles.expandedSection}>
          <View style={styles.mistakeBlock}>
            <Text style={[styles.mistakeBlockLabel, { color: colors.danger }]}>
              ⚡ Consecuencia
            </Text>
            <Text style={styles.mistakeBlockText}>{mistake.consecuencia}</Text>
          </View>
          <View style={styles.mistakeBlock}>
            <Text style={[styles.mistakeBlockLabel, { color: colors.success }]}>
              ✓ Solución
            </Text>
            <Text style={styles.mistakeBlockText}>{mistake.solucion}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

// ── Tab 3: Marcas ─────────────────────────────────────────────

function MarcasTab() {
  return (
    <>
      <Text style={styles.sectionTitle}>Marcas en España</Text>
      <Text style={styles.sectionSub}>
        Por nivel de gama y dónde comprarlas.
      </Text>
      {LEVEL_ORDER.map((level) => {
        const brands = VARNISH_BRANDS.filter((b) => b.nivel === level);
        if (brands.length === 0) return null;
        return (
          <View key={level} style={styles.levelSection}>
            <View
              style={[
                styles.levelHeader,
                { backgroundColor: LEVEL_COLOR[level] + '22' },
              ]}
            >
              <Text
                style={[styles.levelLabel, { color: LEVEL_COLOR[level] }]}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </View>
            {brands.map((brand) => (
              <BrandCard key={brand.marca} brand={brand} />
            ))}
          </View>
        );
      })}
    </>
  );
}

function BrandCard({ brand }: { brand: VarnishBrand }) {
  const levelColor = LEVEL_COLOR[brand.nivel];
  return (
    <View style={styles.brandCard}>
      <View style={styles.brandHeader}>
        <Text style={styles.brandName}>{brand.marca}</Text>
        <Text style={styles.brandCountry}>{brand.pais}</Text>
      </View>
      <Text style={styles.brandSpecialty}>{brand.especialidad}</Text>
      <Text style={styles.brandGama}>🗂 {brand.gama}</Text>
      <View style={styles.shopRow}>
        {brand.dondeComprar.map((shop) => (
          <View
            key={shop}
            style={[styles.shopChip, { backgroundColor: levelColor + '18' }]}
          >
            <Text style={[styles.shopChipText, { color: levelColor }]}>
              {shop}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ── Estilos ───────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.bg,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  tabBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textMuted,
  },
  tabTextActive: { color: colors.primary },

  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },

  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sectionSub: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },

  // Tarjeta
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
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  cardTitleCol: { flex: 1 },
  cardTitle: { ...typography.h3, color: colors.text },
  cardSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  badgeText: { ...typography.caption, fontWeight: '700', fontSize: 10 },
  parBadge: {
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: spacing.sm,
    minWidth: 52,
  },
  parLabel: { ...typography.caption, color: colors.textMuted, fontSize: 9 },
  parValue: { ...typography.h3, color: colors.text, fontSize: 14 },
  parUnit: { ...typography.caption, color: colors.textMuted, fontSize: 9 },
  chevron: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  usesText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  // Expandido
  expandedSection: {
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border + '66',
    paddingTop: spacing.md,
  },
  description: {
    ...typography.bodySmall,
    color: colors.text,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  infoGrid: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
    width: 90,
    flexShrink: 0,
  },
  infoValue: {
    ...typography.caption,
    color: colors.text,
    flex: 1,
    textAlign: 'right',
  },
  listBlock: { marginBottom: spacing.sm },
  listLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  listText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  screwImage: {
    width: '100%',
    height: 160,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceLight,
    marginBottom: spacing.md,
  },
  porQueBox: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
    lineHeight: 20,
    backgroundColor: colors.primaryMuted,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  linksRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
    flexWrap: 'wrap',
  },
  videoBtn: {
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
  diagramBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: 'flex-start',
  },
  diagramBtnText: {
    ...typography.caption,
    fontWeight: '700',
    fontSize: 12,
    color: colors.textSecondary,
  },

  // Errores
  mistakeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  mistakeNum: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  mistakeNumText: { ...typography.h3, fontSize: 14, fontWeight: '800' },
  mistakeTitle: { ...typography.bodySmall, color: colors.text, lineHeight: 22 },
  mistakeBlock: {
    marginBottom: spacing.md,
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  mistakeBlockLabel: {
    ...typography.caption,
    fontWeight: '700',
    marginBottom: 4,
  },
  mistakeBlockText: {
    ...typography.bodySmall,
    color: colors.text,
    lineHeight: 20,
  },

  // Marcas
  levelSection: { marginBottom: spacing.lg },
  levelHeader: {
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
    alignSelf: 'flex-start',
  },
  levelLabel: { ...typography.caption, fontWeight: '800', fontSize: 12 },
  brandCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  brandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
  },
  brandName: { ...typography.h3, color: colors.text },
  brandCountry: { ...typography.caption, color: colors.textMuted },
  brandSpecialty: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  brandGama: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  shopRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  shopChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  shopChipText: { ...typography.caption, fontWeight: '600', fontSize: 10 },
});
