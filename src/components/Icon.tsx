// ═══════════════════════════════════════════════════════════════
// ICON — wrapper centralizado sobre @expo/vector-icons.
// ───────────────────────────────────────────────────────────────
// Mezcla DOS sets para quedar más elegante:
//   • Ionicons (estética iOS nativa, limpio) → navegación, UI.
//   • MaterialCommunityIcons → iconos específicos de herramientas
//     que Ionicons no tiene (taladro, sierra, llave inglesa…).
//
// Filled/sharp por defecto para tener presencia visual.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
  | 'screw'
  | 'info'
  | 'table'
  | 'cube'
  | 'joint';

type IonName = React.ComponentProps<typeof Ionicons>['name'];
type MciName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

type Mapping =
  | { pack: 'ion'; name: IonName }
  | { pack: 'mci'; name: MciName };

// Mapeo: Ionicons por defecto, MCI cuando Ionicons no tiene
// la herramienta (saw, drill, sander, etc).
const MAP: Record<IconName, Mapping> = {
  // App / nav — todo Ionicons
  home: { pack: 'ion', name: 'home' },
  menu: { pack: 'ion', name: 'menu' },
  settings: { pack: 'ion', name: 'settings-sharp' },
  back: { pack: 'ion', name: 'chevron-back' },
  forward: { pack: 'ion', name: 'chevron-forward' },
  close: { pack: 'ion', name: 'close' },
  check: { pack: 'ion', name: 'checkmark' },
  search: { pack: 'ion', name: 'search' },
  plus: { pack: 'ion', name: 'add' },
  language: { pack: 'ion', name: 'language' },

  // Proyectos
  projects: { pack: 'ion', name: 'folder-open' },
  folder: { pack: 'ion', name: 'folder' },
  project: { pack: 'ion', name: 'document-text' },
  note: { pack: 'ion', name: 'reader' },

  // Catálogos
  tools: { pack: 'ion', name: 'construct' },
  wood: { pack: 'ion', name: 'leaf' },
  calculator: { pack: 'ion', name: 'calculator' },
  shop: { pack: 'ion', name: 'cart' },

  // Funciones
  steps: { pack: 'ion', name: 'list' },
  optimize: { pack: 'ion', name: 'grid' },
  materials: { pack: 'ion', name: 'cube' },
  feedback: { pack: 'ion', name: 'chatbubble-ellipses' },
  theme: { pack: 'ion', name: 'color-palette' },

  // Modos — Ionicons hammer (iOS nativo) + MCI ruler
  hammer: { pack: 'ion', name: 'hammer' },
  ruler: { pack: 'mci', name: 'ruler-square' },

  // Subcategorías herramientas — iconos reales de MCI
  // drill: no existe un icono "drill" en ningún set; screwdriver
  // es lo más parecido visualmente a un taladro inalámbrico
  drill: { pack: 'mci', name: 'screwdriver' },
  saw: { pack: 'mci', name: 'circular-saw' },
  sander: { pack: 'mci', name: 'texture' },
  screwdriver: { pack: 'mci', name: 'screwdriver' },
  wrench: { pack: 'mci', name: 'wrench' },
  measure: { pack: 'mci', name: 'tape-measure' },
  clamp: { pack: 'mci', name: 'pliers' },
  paint: { pack: 'mci', name: 'format-paint' },
  safety: { pack: 'mci', name: 'shield-check' },
  bolt: { pack: 'mci', name: 'bolt' },

  // Madera
  tree: { pack: 'mci', name: 'pine-tree' },
  board: { pack: 'mci', name: 'rectangle' },

  // Power
  battery: { pack: 'mci', name: 'battery-charging' },
  plug: { pack: 'mci', name: 'power-plug' },
  hand: { pack: 'mci', name: 'hand-back-right' },

  // Calculadoras — usamos símbolos matemáticos reales
  golden: { pack: 'mci', name: 'sigma' },
  wall: { pack: 'mci', name: 'wall' },
  shelf: { pack: 'mci', name: 'bookshelf' },
  fraction: { pack: 'mci', name: 'fraction-one-half' },
  screw: { pack: 'mci', name: 'screw-flat-top' },
  info: { pack: 'ion', name: 'information-circle' },
  table: { pack: 'mci', name: 'table' },
  cube: { pack: 'mci', name: 'cube-outline' },
  joint: { pack: 'mci', name: 'vector-intersection' },
};

type Props = {
  name: IconName;
  size?: number;
  color?: string;
};

export default function Icon({ name, size = 24, color = colors.text }: Props) {
  const m = MAP[name];
  if (m.pack === 'ion') {
    return <Ionicons name={m.name} size={size} color={color} />;
  }
  return <MaterialCommunityIcons name={m.name} size={size} color={color} />;
}
