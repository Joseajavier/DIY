// ═══════════════════════════════════════════════════════════════
// PARAMETRIC — punto de entrada único a los generadores.
// ───────────────────────────────────────────────────────────────
// Cada plantilla expone una función generateX(params) que devuelve
// un ParametricOutput con Piece[] compatible con el optimizador 2D.
// ═══════════════════════════════════════════════════════════════

export { generateShelf, SHELF_DEFAULTS } from './shelfGenerator';
export { generateTable, TABLE_DEFAULTS } from './tableGenerator';
export { generateBox, BOX_DEFAULTS } from './boxGenerator';
export { generateDrawerCabinet, DRAWER_CABINET_DEFAULTS } from './drawerCabinetGenerator';
export { generateCabinet, CABINET_DEFAULTS } from './cabinetGenerator';
export { generateBench, BENCH_DEFAULTS } from './benchGenerator';
