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
  HardwareItem,
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

  // ── Herrajes ────────────────────────────────────────────────
  const hardware: HardwareItem[] = [];
  // Carcasa
  hardware.push({
    name: 'Tornillo aglomerado 4×50mm',
    spec: '4×50mm',
    quantity: 12,
    category: 'screw',
    notes: 'Unir techo/base con laterales',
  });
  // Trasero
  const backPerimeter = 2 * (width + height);
  hardware.push({
    name: 'Puntilla cabeza perdida 3×20mm',
    spec: '3×20mm',
    quantity: Math.ceil(backPerimeter / 10),
    category: 'nail',
    notes: 'Fijar trasero perimetralmente',
  });
  // Bisagras cazoleta (2 por puerta)
  hardware.push({
    name: 'Bisagra cazoleta 35mm',
    spec: '35mm recta',
    quantity: numDoors * 2,
    category: 'hinge',
    notes: '2 bisagras por puerta — requiere fresa Ø35mm para la cazoleta',
  });
  // Tornillos bisagras (8 por bisagra: 4 cazoleta + 4 brazo)
  hardware.push({
    name: 'Tornillo cabeza plana 3.5×16mm',
    spec: '3.5×16mm',
    quantity: numDoors * 2 * 8,
    category: 'screw',
    notes: 'Fijación de bisagras cazoleta',
  });
  // Tirador por puerta
  hardware.push({
    name: 'Tirador metálico',
    spec: '96-128mm',
    quantity: numDoors,
    category: 'handle',
    notes: '1 tirador por puerta',
  });
  // Pernos de balda (4 por balda regulable)
  if (numShelves > 0) {
    hardware.push({
      name: 'Perno balda 5mm (pernete)',
      spec: 'Ø5mm níquel',
      quantity: numShelves * 4,
      category: 'shelf_pin',
      notes: 'Taladrar agujeros Ø5mm en laterales',
    });
  }
  // Barra de colgar
  if (hasHangingRod) {
    hardware.push({
      name: 'Soporte barra cromada',
      spec: 'Para tubo Ø25mm',
      quantity: 2,
      category: 'bracket',
      notes: 'Uno en cada lateral, a la altura deseada',
    });
  }

  const totalBoardPieces = pieces.reduce((s, p) => s + p.quantity, 0);
  const summary = `Armario ${width}×${height}×${depth}cm · ${numDoors} puerta${numDoors === 1 ? '' : 's'} · ${numShelves} balda${numShelves === 1 ? '' : 's'} · ${totalBoardPieces} piezas`;

  return {
    pieces,
    lumberPieces: lumberPieces.length > 0 ? lumberPieces : undefined,
    hardware,
    summary,
    notes,
    warnings,
  };
}
