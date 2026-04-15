// ═══════════════════════════════════════════════════════════════
// CATEGORY ICONS — mapeo category/type → IconName del componente Icon.
// ───────────────────────────────────────────────────────────────
// Los datos (TOOL_CATEGORIES, TOOL_TYPES) todavía llevan emojis como
// campo `icon` porque así vienen del catálogo. Para pintar iconos
// vectoriales en UI usamos estos mapeos.
// ═══════════════════════════════════════════════════════════════

import { IconName } from '../components/Icon';

export const TOOL_CATEGORY_ICON: Record<string, IconName> = {
  cut: 'saw',
  drill: 'drill',
  sand: 'sander',
  plane: 'wood',
  measure: 'measure',
  clamp: 'clamp',
  finish: 'paint',
  extract: 'wrench',
  safety: 'safety',
  accessory: 'bolt',
};

export const TOOL_CATEGORY_COLOR: Record<string, string> = {
  cut: '#D94F4F',
  drill: '#E08A2B',
  sand: '#C8A14B',
  plane: '#8B5A3C',
  measure: '#5A7D9A',
  clamp: '#6B7280',
  finish: '#B24A6E',
  extract: '#4A8BB2',
  safety: '#6B8E5A',
  accessory: '#8A6E5D',
};

export function categoryIcon(categoryId: string): IconName {
  return TOOL_CATEGORY_ICON[categoryId] ?? 'tools';
}

export function categoryColor(categoryId: string): string {
  return TOOL_CATEGORY_COLOR[categoryId] ?? '#C4804A';
}

export const WOOD_CATEGORY_ICON: Record<string, IconName> = {
  hardwood: 'wood',
  softwood: 'tree',
  board: 'board',
  strips: 'materials',
  special: 'materials',
};

export function woodIcon(categoryId: string): IconName {
  return WOOD_CATEGORY_ICON[categoryId] ?? 'wood';
}
