// ═══════════════════════════════════════════════════════════════
// PARAMETRIC — punto de entrada único a los generadores.
// ───────────────────────────────────────────────────────────────
// Cada plantilla expone una función generateX(params) que devuelve
// un ParametricOutput con Piece[] compatible con el optimizador 2D.
// ═══════════════════════════════════════════════════════════════

export { generateShelf, SHELF_DEFAULTS } from './shelfGenerator';
export { generateTable, TABLE_DEFAULTS } from './tableGenerator';
