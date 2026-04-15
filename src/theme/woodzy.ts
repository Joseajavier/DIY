// ═══════════════════════════════════════════════════════════════
// WOODZY THEME — reconstrucción del shot de Zahra Mortazavi
// "Woodzy – Woodworking & Carpentry App UI Design"
// ───────────────────────────────────────────────────────────────
// Theme paralelo al actual (src/theme/colors.ts). NO sustituye al
// tema oficial de la app, es una plantilla para prototipar pantallas
// con el look Modern Rustic del shot original.
//
// Uso:
//   import { woodzy } from '@/theme/woodzy';
//   <View style={{ backgroundColor: woodzy.colors.background }} />
// ═══════════════════════════════════════════════════════════════

export const woodzyColors = {
  // ─── Superficies ────────────────────────────────────────────
  background: '#EAE8E8',         // gris cálido muy claro (fondo exterior)
  surface: '#FFFFFF',            // blanco puro (tarjetas, detalle producto)
  surfaceSecondary: '#F4F1EF',   // crema muy claro (secciones alternas)

  // ─── Texto ─────────────────────────────────────────────────
  textPrimary: '#0D0C0C',        // casi negro (titulares, CTAs)
  textSecondary: '#5B5B5C',      // gris medio (subtítulos, meta)
  textMuted: '#9B8377',          // topo cálido (placeholders, hints)
  textOnAccent: '#FFFFFF',
  textOnCta: '#FFFFFF',

  // ─── Acento principal (terracota) ───────────────────────────
  accentPrimary: '#AB130A',      // rojo terracota del hero
  accentPrimaryDark: '#5D1810',  // marsala muy oscuro (hover, veta)
  accentWarm: '#AD5F4A',         // teja suave (chips, iconos)

  // ─── Bordes + separadores ───────────────────────────────────
  border: '#C1B1AE',             // topo claro (divisores, outlines)
  borderSubtle: '#E6DFDB',       // casi invisible (cards contra surface)

  // ─── Iconografía ────────────────────────────────────────────
  icon: '#0D0C0C',
  iconMuted: '#5B5B5C',
  iconOnAccent: '#FFFFFF',

  // ─── CTA (botón primario) ───────────────────────────────────
  cta: '#0D0C0C',                // negro profundo
  ctaPressed: '#2A2826',
  ctaDisabled: '#C1B1AE',

  // ─── Categorías ─────────────────────────────────────────────
  categorySelected: '#1F3A3F',   // azul petróleo oscuro (pill activa)
  categorySelectedText: '#FFFFFF',
  categoryUnselected: '#FFFFFF',
  categoryUnselectedText: '#0D0C0C',

  // ─── Hero banner ────────────────────────────────────────────
  heroBackground: '#AB130A',     // terracota plano
  heroPattern: '#5D1810',        // líneas veta estilizadas (oscurecen el hero)
  heroText: '#FFFFFF',

  // ─── Semántico ──────────────────────────────────────────────
  success: '#5B8A5B',
  warning: '#C8923A',
  danger: '#AB130A',

  // ─── Overlays ───────────────────────────────────────────────
  overlay: 'rgba(13, 12, 12, 0.5)',
  cardShadow: 'rgba(13, 12, 12, 0.08)',
} as const;

// ─── Radios ────────────────────────────────────────────────────
// El shot usa esquinas amplias pero no exageradas. Botones y pills
// full round, tarjetas con lg, hero con xl.
export const woodzyRadius = {
  none: 0,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

// ─── Spacing scale ─────────────────────────────────────────────
// Escala de 4px. El shot respira mucho: usar xl/xxl entre secciones.
export const woodzySpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 48,
} as const;

// ─── Tamaños de iconos ─────────────────────────────────────────
export const woodzyIconSize = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  category: 28,   // icono dentro de category card
  hero: 40,
} as const;

// ─── Alturas de botones ────────────────────────────────────────
export const woodzyButton = {
  heightSm: 40,
  heightMd: 48,
  heightLg: 56,
  paddingH: 24,
  radius: 999, // full pill
} as const;

// ─── Tamaños de chips ──────────────────────────────────────────
export const woodzyChip = {
  height: 36,
  paddingH: 14,
  paddingV: 8,
  radius: 999,
  gap: 8,
} as const;

// ─── Bordes ────────────────────────────────────────────────────
export const woodzyBorder = {
  hairline: 1,
  regular: 1.5,
  thick: 2,
} as const;

// ─── Sombras ───────────────────────────────────────────────────
// Muy sutiles: el shot prácticamente no usa sombras, la profundidad
// viene del fondo gris + superficies blancas. Usar con moderación.
export const woodzyShadow = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  card: {
    shadowColor: '#0D0C0C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  hero: {
    shadowColor: '#5D1810',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  floating: {
    shadowColor: '#0D0C0C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
} as const;

// ─── Tipografía (pesos + tamaños) ─────────────────────────────
// NO se ha confirmado la fuente exacta del shot. Se define el
// perfil tipográfico ideal + alias para mapearlo a system fonts o
// a cargas custom (ver WOODZY_THEME.md para combinaciones reales).
export const woodzyFont = {
  // Familias lógicas (mapear a cargas reales en el consumidor)
  display: 'Fraunces',          // serif cálido para títulos hero
  text: 'Inter',                // sans-serif geométrica limpia
  mono: 'JetBrainsMono',        // solo si hace falta (SKUs)

  // Fallback stacks por si no se carga custom
  systemDisplay: 'serif',
  systemText: 'System',

  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const woodzyType = {
  display: {
    fontFamily: woodzyFont.display,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: woodzyFont.weight.bold,
    letterSpacing: -0.5,
  },
  title: {
    fontFamily: woodzyFont.display,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: woodzyFont.weight.semibold,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontFamily: woodzyFont.text,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: woodzyFont.weight.semibold,
  },
  body: {
    fontFamily: woodzyFont.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: woodzyFont.weight.regular,
  },
  bodyStrong: {
    fontFamily: woodzyFont.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: woodzyFont.weight.medium,
  },
  caption: {
    fontFamily: woodzyFont.text,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: woodzyFont.weight.regular,
    letterSpacing: 0.2,
  },
  button: {
    fontFamily: woodzyFont.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: woodzyFont.weight.semibold,
    letterSpacing: 0.2,
  },
  chip: {
    fontFamily: woodzyFont.text,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: woodzyFont.weight.medium,
  },
} as const;

// ─── Layout tokens ─────────────────────────────────────────────
export const woodzyLayout = {
  screenPaddingH: 20,
  sectionGap: 28,
  cardGap: 12,
  heroHeight: 180,
  heroRadius: 28,
  productImageRatio: 1,       // 1:1 para gallery principal
  categoryCardSize: 104,      // cuadrado
  bottomNavHeight: 72,
} as const;

// ─── Export agregado ───────────────────────────────────────────
export const woodzy = {
  colors: woodzyColors,
  radius: woodzyRadius,
  spacing: woodzySpacing,
  iconSize: woodzyIconSize,
  button: woodzyButton,
  chip: woodzyChip,
  border: woodzyBorder,
  shadow: woodzyShadow,
  font: woodzyFont,
  type: woodzyType,
  layout: woodzyLayout,
} as const;

export type WoodzyTheme = typeof woodzy;
