// ═══════════════════════════════════════════════════════════════
// TABLE GENERATOR — genera despiece de mesa paramétrica.
// ───────────────────────────────────────────────────────────────
// Construcción estándar:
//   • 4 patas macizas (listón cuadrado legSection × legSection).
//   • 1 tablero superior (tablero contrachapado/macizo).
//   • Faldón opcional: 4 tablones de refuerzo bajo el tablero,
//     que unen las patas en los 4 lados.
//   • Balda inferior opcional: tablero entre las 4 patas.
//
// Unidades: length/width/height/legSection en CM, thickness en MM.
// Salida dual:
//   - pieces[]        → tableros (optimizador 2D de cortes)
//   - lumberPieces[]  → listones macizos (pedido lineal)
// ═══════════════════════════════════════════════════════════════

import {
  Piece,
  LumberPiece,
  ParametricOutput,
  TableGeneratorParams,
  HardwareItem,
} from '../../models';

export const TABLE_DEFAULTS: TableGeneratorParams = {
  length: 180,
  width: 90,
  height: 75,
  legSection: 6,
  topThickness: 25,
  hasApron: true,
  apronHeight: 10,
  hasLowerShelf: false,
};

export function generateTable(params: TableGeneratorParams): ParametricOutput {
  const warnings: string[] = [];
  const notes: string[] = [];

  const {
    length,
    width,
    height,
    legSection,
    topThickness,
    hasApron,
    apronHeight,
    hasLowerShelf,
  } = params;

  const topTcm = topThickness / 10;

  // ── Validaciones ────────────────────────────────────────────
  if (length <= 0 || width <= 0 || height <= 0) {
    warnings.push('Todas las medidas deben ser mayores que 0');
  }
  if (legSection < 3 || legSection > 12) {
    warnings.push(
      `Sección de pata ${legSection}cm fuera de rango razonable (3-12cm)`
    );
  }
  if (height < 40) {
    warnings.push(`Altura ${height}cm muy baja para mesa (mínimo 40cm)`);
  }
  if (height > 110) {
    warnings.push(`Altura ${height}cm muy alta (máx. recomendado 110cm, mesa alta/taburete)`);
  }
  if (length < legSection * 2 + 10 || width < legSection * 2 + 10) {
    warnings.push('Tablero superior demasiado pequeño frente a las patas');
  }
  if (hasApron && apronHeight < 5) {
    notes.push('Faldón muy bajo — valora 8-12cm para rigidez suficiente');
  }

  const hasCritical =
    length <= 0 || width <= 0 || height <= 0 || legSection < 3;
  if (hasCritical) {
    return {
      pieces: [],
      lumberPieces: [],
      summary: 'Medidas inválidas — ajusta los parámetros',
      notes,
      warnings,
    };
  }

  // ── Despiece ────────────────────────────────────────────────
  const pieces: Piece[] = [];
  const lumberPieces: LumberPiece[] = [];

  // 4 Patas — listón cuadrado, largo = altura total - grosor tablero
  const legLength = +(height - topTcm).toFixed(2);
  lumberPieces.push({
    name: 'Pata',
    section: `${legSection}×${legSection}cm`,
    length: legLength,
    quantity: 4,
  });

  // 1 Tablero superior — dimensiones completas
  pieces.push({
    name: 'Tablero superior',
    width: length,
    height: width,
    quantity: 1,
    thickness: topThickness,
  });

  // Faldones (4 tablones bajo el tablero)
  if (hasApron) {
    // Faldones largos (frontal + trasero): largo = length - 2*legSection
    const apronLongLen = +(length - 2 * legSection).toFixed(2);
    // Faldones cortos (laterales): largo = width - 2*legSection
    const apronShortLen = +(width - 2 * legSection).toFixed(2);

    if (apronLongLen > 0) {
      pieces.push({
        name: 'Faldón frente/trasera',
        width: apronLongLen,
        height: apronHeight,
        quantity: 2,
        thickness: topThickness,
      });
    }
    if (apronShortLen > 0) {
      pieces.push({
        name: 'Faldón lateral',
        width: apronShortLen,
        height: apronHeight,
        quantity: 2,
        thickness: topThickness,
      });
    }
    notes.push(
      `Faldón de ${apronHeight}cm rigidiza y aloja las uniones con las patas`
    );
  }

  // Balda inferior opcional
  if (hasLowerShelf) {
    const shelfLen = +(length - 2 * legSection).toFixed(2);
    const shelfWidth = +(width - 2 * legSection).toFixed(2);
    if (shelfLen > 0 && shelfWidth > 0) {
      pieces.push({
        name: 'Balda inferior',
        width: shelfLen,
        height: shelfWidth,
        quantity: 1,
        thickness: topThickness,
      });
      notes.push(
        'Balda inferior va encastrada entre las 4 patas, a ~15-20cm del suelo'
      );
    }
  }

  // ── Resumen ─────────────────────────────────────────────────
  notes.unshift(
    `Construcción: 4 patas macizas unidas por faldón, tablero fijado por arriba`
  );
  notes.unshift(
    `Ratio largo/ancho: ${(length / width).toFixed(2)} · Una mesa estándar ronda 1.8-2.2`
  );

  // ── Herrajes ────────────────────────────────────────────────
  const hardware: HardwareItem[] = [];
  // Escuadras metálicas en las 4 esquinas (unir patas al tablero)
  hardware.push({
    name: 'Escuadra metálica reforzada 80×80mm',
    spec: '80×80mm zincada',
    quantity: 4,
    category: 'bracket',
    notes: 'Atornillar bajo el tablero, una en cada esquina',
  });
  // Tornillos para las escuadras (3 por escuadra × 2 caras = 6, ×4 esquinas)
  hardware.push({
    name: 'Tornillo rosca madera 4×30mm',
    spec: '4×30mm',
    quantity: 24,
    category: 'screw',
    notes: 'Fijación de escuadras al tablero y a las patas',
  });
  // Faldón
  if (hasApron) {
    hardware.push({
      name: 'Tirafondo 6×80mm',
      spec: '6×80mm',
      quantity: 8,
      category: 'screw',
      notes: 'Unir faldón con patas (2 por esquina)',
    });
  }
  // Balda inferior entre patas
  if (hasLowerShelf) {
    hardware.push({
      name: 'Tornillo rosca madera 4×40mm',
      spec: '4×40mm',
      quantity: 16,
      category: 'screw',
      notes: 'Sujetar balda inferior a las patas (4 por pata)',
    });
  }

  const totalBoardPieces = pieces.reduce((s, p) => s + p.quantity, 0);
  const totalLumberPieces = lumberPieces.reduce((s, p) => s + p.quantity, 0);
  const summary = `Mesa ${length}×${width}×${height}cm · ${totalBoardPieces} tablero${totalBoardPieces === 1 ? '' : 's'} + ${totalLumberPieces} pata${totalLumberPieces === 1 ? '' : 's'}`;

  return { pieces, lumberPieces, hardware, summary, notes, warnings };
}
