// ═══════════════════════════════════════════════════════════════
// ICON — wrapper centralizado sobre @expo/vector-icons.
// ───────────────────────────────────────────────────────────────
// Sustituye emojis (que no renderizan bien en todos los simuladores)
// por iconos vectoriales de verdad. Usa MaterialCommunityIcons
// porque tiene el repertorio más completo para herramientas/DIY.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme';

export type IconName =
  // App / navegación
  | 'home'
  | 'menu'
  | 'settings'
  | 'back'
  | 'forward'
  | 'close'
  | 'check'
  | 'search'
  | 'plus'
  | 'language'
  // Proyectos
  | 'projects'
  | 'folder'
  | 'project'
  | 'note'
  // Catálogos
  | 'tools'
  | 'wood'
  | 'calculator'
  | 'shop'
  // Funciones
  | 'steps'
  | 'optimize'
  | 'materials'
  | 'feedback'
  | 'theme'
  // Modos
  | 'hammer'
  | 'ruler'
  // Subcategorías herramientas
  | 'drill'
  | 'saw'
  | 'sander'
  | 'screwdriver'
  | 'wrench'
  | 'measure'
  | 'clamp'
  | 'paint'
  | 'safety'
  | 'bolt'
  // Subcategorías madera
  | 'tree'
  | 'board'
  // Power
  | 'battery'
  | 'plug'
  | 'hand'
  // Calculadoras
  | 'golden'
  | 'wall'
  | 'shelf'
  | 'fraction'
  | 'info';

// Usamos variantes RELLENAS (no -outline) para que los iconos
// tengan más presencia visual, como los emojis que se veían antes.
const MAP: Record<IconName, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  home: 'home',
  menu: 'menu',
  settings: 'cog',
  back: 'arrow-left-circle',
  forward: 'arrow-right',
  close: 'close-circle',
  check: 'check-circle',
  search: 'magnify',
  plus: 'plus-circle',
  language: 'translate',

  projects: 'folder-multiple',
  folder: 'folder',
  project: 'clipboard-text',
  note: 'note-text',

  tools: 'toolbox',
  wood: 'pine-tree',
  calculator: 'calculator-variant',
  shop: 'cart',

  steps: 'format-list-numbered',
  optimize: 'view-grid',
  materials: 'package-variant-closed',
  feedback: 'message-text',
  theme: 'palette',

  hammer: 'hammer',
  ruler: 'ruler-square',

  drill: 'screw-machine-flat-top',
  saw: 'saw-blade',
  sander: 'blur',
  screwdriver: 'screwdriver',
  wrench: 'wrench',
  measure: 'tape-measure',
  clamp: 'vector-square',
  paint: 'format-paint',
  safety: 'shield-check',
  bolt: 'cog',

  tree: 'pine-tree',
  board: 'view-dashboard',

  battery: 'battery-charging',
  plug: 'power-plug',
  hand: 'hand-back-right',

  golden: 'sigma',
  wall: 'wall',
  shelf: 'bookshelf',
  fraction: 'division',
  info: 'information',
};

type Props = {
  name: IconName;
  size?: number;
  color?: string;
};

export default function Icon({ name, size = 24, color = colors.text }: Props) {
  return <MaterialCommunityIcons name={MAP[name]} size={size} color={color} />;
}
