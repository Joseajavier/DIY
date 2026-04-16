// ═══════════════════════════════════════════════════════════════
// BOX GENERATOR — despiece de caja rectangular paramétrica.
// ───────────────────────────────────────────────────────────────
// Construcción clásica "fondo + 4 laterales":
//   • Frontal y trasero: ancho completo × alto.
//   • Laterales izq/der: (ancho - 2*grosor) × alto, encastrados
//     entre frontal y trasero.
//   • Fondo: ancho × (profundidad - 2*grosor), encastrado entre
//     frontal y trasero, apoyado sobre laterales.
//   • Tapa opcional: ancho × profundidad completos (apoya encima).
// ═══════════════════════════════════════════════════════════════

import {
  Piece,
  ParametricOutput,
  BoxGeneratorParams,
  HardwareItem,
} from '../../models';

export const BOX_DEFAULTS: BoxGeneratorParams = {
  length: 40,
  width: 30,
  height: 20,
  thickness: 16,
  hasLid: false,
  hasBottom: true,
};

export function generateBox(params: BoxGeneratorParams): ParametricOutput {
  const warnings: string[] = [];
  const notes: string[] = [];

  const { length, width, height, thickness, hasLid, hasBottom } = params;
  const tCm = thickness / 10;

  // Validaciones
  if (length <= 0 || width <= 0 || height <= 0) {
    warnings.push('Todas las medidas deben ser mayores que 0');
  }
  if (length <= 2 * tCm || width <= 2 * tCm) {
    warnings.push(
      `Dimensiones demasiado pequeñas para el grosor ${thickness}mm`
    );
  }
  if (height < 3) {
    warnings.push(`Altura ${height}cm muy baja (mínimo 3cm)`);
  }

  const hasCritical = length <= 2 * tCm || width <= 2 * tCm || height <= 0;
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

  // Frontal + trasero: ancho completo × alto
  pieces.push({
    name: 'Frontal/trasero',
    width: length,
    height: height,
    quantity: 2,
    thickness: thickness,
  });

  // Laterales izq/der: encastrados entre frontal y trasero
  const sideLen = +(width - 2 * tCm).toFixed(2);
  pieces.push({
    name: 'Lateral',
    width: sideLen,
    height: height,
    quantity: 2,
    thickness: thickness,
  });

  // Fondo
  if (hasBottom) {
    const bottomLen = +(length - 2 * tCm).toFixed(2);
    const bottomWidth = +(width - 2 * tCm).toFixed(2);
    pieces.push({
      name: 'Fondo',
      width: bottomLen,
      height: bottomWidth,
      quantity: 1,
      thickness: thickness,
    });
  }

  // Tapa (se apoya encima — dimensiones exteriores)
  if (hasLid) {
    pieces.push({
      name: 'Tapa',
      width: length,
      height: width,
      quantity: 1,
      thickness: thickness,
    });
    notes.push('Tapa apoyada encima (sin bisagras en esta versión)');
  }

  // ── Notas ───────────────────────────────────────────────────
  notes.unshift(
    'Construcción: frontal y trasero por fuera, laterales encastrados entre ellos'
  );
  if (!hasBottom) {
    notes.push('Sin fondo — ideal para bandejas o boxes abiertos');
  }

  // ── Herrajes ────────────────────────────────────────────────
  const hardware: HardwareItem[] = [];
  // Uniones de los 4 laterales entre sí (4 esquinas verticales)
  hardware.push({
    name: 'Tornillo aglomerado 3.5×30mm',
    spec: '3.5×30mm',
    quantity: 12,
    category: 'screw',
    notes: 'Unir los 4 laterales por las esquinas',
  });
  if (hasBottom) {
    const perimeter = 2 * (length + width);
    const fixings = Math.max(8, Math.ceil(perimeter / 12));
    hardware.push({
      name: 'Tornillo avellanado 3×20mm',
      spec: '3×20mm',
      quantity: fixings,
      category: 'screw',
      notes: 'Fijar fondo al perímetro de los laterales',
    });
  }
  if (hasLid) {
    hardware.push({
      name: 'Bisagra plana latonada 40mm',
      spec: '40mm',
      quantity: 2,
      category: 'hinge',
      notes: 'Unir tapa al lateral trasero',
    });
    hardware.push({
      name: 'Tornillo avellanado 3×15mm',
      spec: '3×15mm',
      quantity: 16,
      category: 'screw',
      notes: 'Fijación de bisagras',
    });
  }

  const totalPieces = pieces.reduce((s, p) => s + p.quantity, 0);
  const summary = `Caja ${length}×${width}×${height}cm · ${totalPieces} pieza${totalPieces === 1 ? '' : 's'}`;

  return { pieces, hardware, summary, notes, warnings };
}
