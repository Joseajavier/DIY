// ═══════════════════════════════════════════════════════════════
// CABINET GENERATOR — armario con puertas batientes.
// ───────────────────────────────────────────────────────────────
// Carcasa tipo estantería + puertas batientes (1 ó 2) + barra de
// colgar opcional.
// ═══════════════════════════════════════════════════════════════

import {
  Piece,
  LumberPiece,
  ParametricOutput,
  CabinetGeneratorParams,
} from '../../models';

export const CABINET_DEFAULTS: CabinetGeneratorParams = {
  width: 80,
  height: 200,
  depth: 50,
  numDoors: 2,
  numShelves: 2,
  thickness: 16,
  hasHangingRod: true,
};

// Hueco entre puerta y carcasa (para bisagras)
const DOOR_GAP = 0.3; // cm

export function generateCabinet(
  params: CabinetGeneratorParams
): ParametricOutput {
  const warnings: string[] = [];
  const notes: string[] = [];

  const {
    width,
    height,
    depth,
    numDoors,
    numShelves,
    thickness,
    hasHangingRod,
  } = params;

  const tCm = thickness / 10;
  const innerWidth = width - 2 * tCm;
  const innerHeight = height - 2 * tCm;

  // Validaciones
  if (width <= 0 || height <= 0 || depth <= 0) {
    warnings.push('Todas las medidas deben ser mayores que 0');
  }
  if (width < 40 || height < 80) {
    warnings.push('Armario muy pequeño (mínimo 40×80cm)');
  }
  if (numShelves < 0 || numShelves > 8) {
    warnings.push('Número de baldas fuera de rango (0-8)');
  }

  const hasCritical =
    width <= 2 * tCm || height <= 2 * tCm || depth <= 0 || innerWidth <= 0;
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
  const lumberPieces: LumberPiece[] = [];

  // Carcasa: laterales, techo, base
  pieces.push({
    name: 'Lateral carcasa',
    width: depth,
    height: height,
    quantity: 2,
    thickness: thickness,
  });
  pieces.push({
    name: 'Techo/base',
    width: innerWidth,
    height: depth,
    quantity: 2,
    thickness: thickness,
  });

  // Baldas interiores
  if (numShelves > 0) {
    pieces.push({
      name: 'Balda interior',
      width: innerWidth,
      height: depth,
      quantity: numShelves,
      thickness: thickness,
    });
  }

  // Trasero
  pieces.push({
    name: 'Trasero',
    width: width,
    height: height,
    quantity: 1,
    thickness: 4,
  });

  // Puertas batientes
  const doorWidth = (width - (numDoors + 1) * DOOR_GAP) / numDoors;
  const doorHeight = height - 2 * DOOR_GAP;
  pieces.push({
    name: `Puerta batiente`,
    width: +doorWidth.toFixed(2),
    height: +doorHeight.toFixed(2),
    quantity: numDoors,
    thickness: thickness,
  });

  // Barra de colgar (listón redondo de 28mm típico)
  if (hasHangingRod) {
    const rodLength = +(innerWidth - 1).toFixed(2); // holgura para soportes
    lumberPieces.push({
      name: 'Barra de colgar',
      section: 'Ø28mm',
      length: rodLength,
      quantity: 1,
    });
    notes.push(
      `Barra de colgar de ${rodLength}cm en listón redondo Ø28mm (se vende a metros)`
    );
    notes.push('Necesitarás 2 soportes cilíndricos para la barra (hardware)');
  }

  // ── Notas ───────────────────────────────────────────────────
  notes.unshift(
    `${numDoors} puerta${numDoors === 1 ? '' : 's'} batiente${numDoors === 1 ? '' : 's'} de ${doorWidth.toFixed(1)}×${doorHeight.toFixed(1)}cm`
  );
  notes.push(
    `Necesitarás ${numDoors * 2} bisagras de cazoleta tipo cazoleta 35mm (2 por puerta)`
  );

  const totalBoardPieces = pieces.reduce((s, p) => s + p.quantity, 0);
  const summary = `Armario ${width}×${height}×${depth}cm · ${numDoors} puerta${numDoors === 1 ? '' : 's'} · ${numShelves} balda${numShelves === 1 ? '' : 's'} · ${totalBoardPieces} piezas`;

  return {
    pieces,
    lumberPieces: lumberPieces.length > 0 ? lumberPieces : undefined,
    summary,
    notes,
    warnings,
  };
}
