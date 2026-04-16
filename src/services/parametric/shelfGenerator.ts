// ═══════════════════════════════════════════════════════════════
// SHELF GENERATOR — genera despiece de estantería paramétrica
// ───────────────────────────────────────────────────────────────
// Construcción estándar IKEA-style:
//   • Laterales POR FUERA (altura completa × fondo).
//   • Techo, base y baldas ENTRE laterales (ancho interior).
//   • Trasero opcional clavado por detrás (mismo alto × ancho exterior).
//
// Unidades: width/height/depth en CM, thickness en MM.
// Salida: Piece[] compatible con el optimizador de cortes existente.
// ═══════════════════════════════════════════════════════════════

import { Piece, ParametricOutput, ShelfGeneratorParams } from '../../models';

export const SHELF_DEFAULTS: ShelfGeneratorParams = {
  width: 80,
  height: 180,
  depth: 30,
  numShelves: 4,
  thickness: 16,
  hasBack: true,
  backThickness: 4,
};

export function generateShelf(params: ShelfGeneratorParams): ParametricOutput {
  const warnings: string[] = [];
  const notes: string[] = [];

  const {
    width,
    height,
    depth,
    numShelves,
    thickness,
    hasBack,
    backThickness,
  } = params;

  // thickness viene en mm, width/height/depth en cm
  const tCm = thickness / 10;
  const innerWidth = +(width - 2 * tCm).toFixed(2);
  const innerHeight = +(height - 2 * tCm).toFixed(2);

  // ── Validaciones / warnings ─────────────────────────────────
  if (width <= 0 || height <= 0 || depth <= 0) {
    warnings.push('Todas las medidas deben ser mayores que 0');
  }
  if (innerWidth <= 0) {
    warnings.push(
      `Ancho ${width}cm demasiado estrecho para grosor ${thickness}mm`
    );
  }
  if (innerHeight <= 0) {
    warnings.push(
      `Alto ${height}cm demasiado corto para grosor ${thickness}mm`
    );
  }
  if (numShelves < 0 || numShelves > 20) {
    warnings.push(`Número de baldas fuera de rango razonable (0-20)`);
  }
  if (depth < 15) {
    warnings.push(`Fondo ${depth}cm es poco habitual (min. recomendado 15cm)`);
  }

  // Espacio libre entre baldas (solo informativo si es válido)
  let shelfSpacing = 0;
  if (innerHeight > 0 && numShelves >= 0) {
    shelfSpacing = (innerHeight - numShelves * tCm) / (numShelves + 1);
    if (numShelves > 0 && shelfSpacing < 15) {
      warnings.push(
        `Espacio entre baldas ${shelfSpacing.toFixed(1)}cm < 15cm (puede ser poco práctico)`
      );
    }
  }

  if (depth > 60) {
    notes.push(
      `Fondo ${depth}cm es amplio — valora balda en dos tableros en forma de T`
    );
  }

  // Si hay warnings críticos, devuelvo sin piezas para evitar despiece absurdo
  const hasCritical =
    innerWidth <= 0 || innerHeight <= 0 || width <= 0 || height <= 0;
  if (hasCritical) {
    return {
      pieces: [],
      summary: 'Medidas inválidas — ajusta los parámetros',
      notes,
      warnings,
    };
  }

  // ── Despiece ────────────────────────────────────────────────
  const pieces: Piece[] = [];

  // 2 Laterales — fondo × alto completo
  pieces.push({
    name: 'Lateral',
    width: depth,
    height: height,
    quantity: 2,
    thickness: thickness,
  });

  // 1 Techo — ancho interior × fondo
  pieces.push({
    name: 'Techo',
    width: innerWidth,
    height: depth,
    quantity: 1,
    thickness: thickness,
  });

  // 1 Base — ancho interior × fondo
  pieces.push({
    name: 'Base',
    width: innerWidth,
    height: depth,
    quantity: 1,
    thickness: thickness,
  });

  // N Baldas interiores
  if (numShelves > 0) {
    pieces.push({
      name: 'Balda',
      width: innerWidth,
      height: depth,
      quantity: numShelves,
      thickness: thickness,
    });
  }

  // Trasero — ancho exterior × alto exterior, grosor fino
  if (hasBack) {
    pieces.push({
      name: 'Trasero',
      width: width,
      height: height,
      quantity: 1,
      thickness: backThickness,
    });
    notes.push(
      `Trasero en DM/contrachapado de ${backThickness}mm (material distinto al resto)`
    );
  }

  // ── Notas informativas ──────────────────────────────────────
  notes.unshift(
    'Construcción: laterales por fuera, techo/base/baldas encastrados entre laterales'
  );
  if (shelfSpacing > 0) {
    notes.push(`Espacio útil entre baldas: ${shelfSpacing.toFixed(1)}cm`);
  }

  const totalPieces = pieces.reduce((s, p) => s + p.quantity, 0);
  const summary = `Estantería ${width}×${height}×${depth}cm · ${numShelves} balda${numShelves === 1 ? '' : 's'} · ${totalPieces} pieza${totalPieces === 1 ? '' : 's'}`;

  return { pieces, summary, notes, warnings };
}
