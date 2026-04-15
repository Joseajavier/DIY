import { ToolProduct } from '../models/tools';
import { WoodProduct } from '../models/wood';

function lockFromText(text: string): string {
  return encodeURIComponent(text.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
}

function lorem(tags: string[], seed: string): string {
  const path = tags.map((t) => t.replace(/\s+/g, '-').toLowerCase()).join(',');
  return `https://loremflickr.com/640/640/${path}?lock=${lockFromText(seed)}`;
}

const TOOL_TYPE_TAGS: Record<string, string[]> = {
  circular_saw: ['circular-saw', 'woodworking', 'tool'],
  plunge_saw: ['track-saw', 'woodworking', 'tool'],
  jigsaw: ['jigsaw', 'woodworking', 'tool'],
  miter_saw: ['miter-saw', 'woodworking', 'tool'],
  table_saw: ['table-saw', 'woodworking', 'tool'],
  band_saw: ['bandsaw', 'woodworking', 'tool'],
  reciprocating_saw: ['reciprocating-saw', 'tool'],
  multi_tool: ['multi-tool', 'tool'],
  drill_driver: ['drill', 'tool'],
  hammer_drill: ['hammer-drill', 'tool'],
  impact_driver: ['impact-driver', 'tool'],
  drill_press: ['drill-press', 'workshop'],
  pocket_hole: ['woodworking-jig', 'workshop'],
  domino_joiner: ['woodworking-jig', 'joinery'],
  biscuit_joiner: ['biscuit-joiner', 'woodworking'],
  orbital_sander: ['orbital-sander', 'woodworking'],
  belt_sander: ['belt-sander', 'woodworking'],
  detail_sander: ['sander', 'woodworking'],
  router: ['router', 'woodworking'],
  trim_router: ['router', 'woodworking'],
  electric_planer: ['electric-planer', 'woodworking'],
  benchtop_planer: ['thickness-planer', 'woodworking'],
  jointer_planer: ['jointer', 'woodworking'],
  laser_measure: ['laser-measure', 'tool'],
  laser_level: ['laser-level', 'tool'],
  digital_caliper: ['digital-caliper', 'tool'],
  moisture_meter: ['moisture-meter', 'tool'],
  f_clamps: ['clamp', 'woodworking'],
  quick_clamps: ['clamp', 'woodworking'],
  corner_clamps: ['clamp', 'woodworking'],
  bench_vise: ['vise', 'workshop'],
  workbench: ['workbench', 'woodworking'],
  spray_gun: ['spray-gun', 'tool'],
  nail_gun: ['nail-gun', 'tool'],
  heat_gun: ['heat-gun', 'tool'],
  shop_vac: ['shop-vac', 'workshop'],
  dust_collector: ['dust-collector', 'woodworking'],
};

const WOOD_TAGS_BY_CATEGORY: Record<string, string[]> = {
  board: ['wood-board', 'panel', 'woodworking'],
  solid: ['hardwood', 'timber', 'wood'],
  plywood: ['plywood', 'wood-panel'],
  strips: ['wood-strip', 'timber', 'woodworking'],
  special: ['wood-material', 'woodworking'],
};

export function getToolImageUrl(product: ToolProduct): string {
  if (product.imageUrl) return product.imageUrl;
  const tags = TOOL_TYPE_TAGS[product.typeId] ?? ['tool', 'workshop'];
  return lorem(tags, `${product.brandId}-${product.model}`);
}

export function getWoodImageUrl(product: WoodProduct): string {
  const tags = WOOD_TAGS_BY_CATEGORY[product.categoryId] ?? ['wood', 'material'];
  return lorem(tags, `${product.categoryId}-${product.name}`);
}
