// ═══════════════════════════════════════════════════════════════
// BENCH GENERATOR — banco con o sin respaldo.
// ───────────────────────────────────────────────────────────────
// Construcción:
//   • 4 patas macizas (listón cuadrado legSection × legSection).
//   • 1 tablero de asiento.
//   • Respaldo opcional: tablero vertical sujeto por 2 montantes
//     macizos que prolongan las patas traseras.
// Unidades: length/width/height/legSection/backrestHeight en CM,
//           topThickness en MM.
// ═══════════════════════════════════════════════════════════════

import {
  Piece,
  LumberPiece,
  ParametricOutput,
  BenchGeneratorParams,
  HardwareItem,
} from '../../models';

export const BENCH_DEFAULTS: BenchGeneratorParams = {
  length: 140,
  width: 35,
  height: 45,
  legSection: 5,
  topThickness: 25,
  hasBackrest: false,
  backrestHeight: 40,
};

export function generateBench(
  params: BenchGeneratorParams
): ParametricOutput {
  const warnings: string[] = [];
  const notes: string[] = [];

  const {
    length,
    width,
    height,
    legSection,
    topThickness,
    hasBackrest,
    backrestHeight,
  } = params;

  const topTcm = topThickness / 10;

  // ── Validaciones ────────────────────────────────────────────
  if (length <= 0 || width <= 0 || height <= 0) {
    warnings.push('Todas las medidas deben ser mayores que 0');
  }
  if (legSection < 3 || legSection > 10) {
    warnings.push(
      `Sección de pata ${legSection}cm fuera de rango razonable (3-10cm)`
    );
  }
  if (height < 35) {
    warnings.push(`Altura ${height}cm muy baja para un banco (mínimo 35cm)`);
  }
  if (height > 55) {
    warnings.push(
      `Altura ${height}cm muy alta para asiento (estándar 42-48cm)`
    );
  }
  if (width < 20) {
    warnings.push(
      `Ancho ${width}cm muy estrecho — incómodo (recomendado 28-40cm)`
    );
  }
  if (hasBackrest && backrestHeight < 20) {
    notes.push('Respaldo muy bajo — valora 30-45cm para apoyo lumbar');
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

  // Patas delanteras: altura - grosor asiento
  const frontLegLen = +(height - topTcm).toFixed(2);
  lumberPieces.push({
    name: 'Pata delantera',
    section: `${legSection}×${legSection}cm`,
    length: frontLegLen,
    quantity: 2,
  });

  // Patas traseras: si hay respaldo, se prolongan hacia arriba
  if (hasBackrest) {
    const rearLegLen = +(height - topTcm + backrestHeight).toFixed(2);
    lumberPieces.push({
      name: 'Pata trasera (con montante)',
      section: `${legSection}×${legSection}cm`,
      length: rearLegLen,
      quantity: 2,
    });
  } else {
    lumberPieces.push({
      name: 'Pata trasera',
      section: `${legSection}×${legSection}cm`,
      length: frontLegLen,
      quantity: 2,
    });
  }

  // Tablero de asiento
  pieces.push({
    name: 'Asiento',
    width: length,
    height: width,
    quantity: 1,
    thickness: topThickness,
  });

  // Respaldo (tablero vertical entre los montantes traseros)
  if (hasBackrest) {
    const backBoardLen = +(length - 2 * legSection).toFixed(2);
    if (backBoardLen > 0) {
      pieces.push({
        name: 'Respaldo',
        width: backBoardLen,
        height: backrestHeight,
        quantity: 1,
        thickness: topThickness,
      });
    }
  }

  // ── Notas ───────────────────────────────────────────────────
  notes.unshift(
    hasBackrest
      ? `Banco con respaldo — las patas traseras se prolongan ${backrestHeight}cm para sujetar el respaldo`
      : 'Banco sin respaldo — ideal para comedor corrido o pie de cama'
  );
  notes.push('Fija las patas al asiento con escuadras metálicas o espigas (ocultas)');
  if (length > 160) {
    notes.push(
      `Banco largo (${length}cm) — considera añadir 1 pata central de refuerzo`
    );
  }

  // ── Herrajes ────────────────────────────────────────────────
  const hardware: HardwareItem[] = [];
  // Escuadras metálicas para unir asiento a patas (1 por pata)
  hardware.push({
    name: 'Escuadra metálica reforzada 60×60mm',
    spec: '60×60mm zincada',
    quantity: 4,
    category: 'bracket',
    notes: 'Unir asiento a cada pata, por dentro',
  });
  // Tornillos para escuadras
  hardware.push({
    name: 'Tornillo rosca madera 4×30mm',
    spec: '4×30mm',
    quantity: 24,
    category: 'screw',
    notes: '3 tornillos por cara × 2 caras × 4 escuadras',
  });
  // Respaldo
  if (hasBackrest) {
    hardware.push({
      name: 'Tirafondo 6×60mm',
      spec: '6×60mm',
      quantity: 4,
      category: 'screw',
      notes: 'Fijar respaldo a los montantes traseros (2 por montante)',
    });
  }

  const totalBoardPieces = pieces.reduce((s, p) => s + p.quantity, 0);
  const totalLumberPieces = lumberPieces.reduce((s, p) => s + p.quantity, 0);
  const summary = `Banco ${length}×${width}×${height}cm${hasBackrest ? ` + respaldo ${backrestHeight}cm` : ''} · ${totalBoardPieces} tablero${totalBoardPieces === 1 ? '' : 's'} + ${totalLumberPieces} patas`;

  return { pieces, lumberPieces, hardware, summary, notes, warnings };
}
