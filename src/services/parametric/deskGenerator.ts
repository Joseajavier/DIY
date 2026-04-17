// ═══════════════════════════════════════════════════════════════
// DESK GENERATOR — escritorio paramétrico con patas macizas.
// ───────────────────────────────────────────────────────────────
// Construcción:
//   • Tablero superior (tablero de melamina/DM).
//   • 4 patas macizas (listón cuadrado) — o 6 para escritorios largos.
//   • Faldones opcionales bajo el tablero (rigidez).
//   • Balda inferior entre patas (opcional).
//   • Cajón lateral deslizante (opcional, un cajón único a un lado).
// Unidades: length/width/height/legSection en CM, topThickness en MM.
// ═══════════════════════════════════════════════════════════════

import {
  Piece,
  LumberPiece,
  ParametricOutput,
  DeskGeneratorParams,
  HardwareItem,
} from '../../models';

export const DESK_DEFAULTS: DeskGeneratorParams = {
  length: 140,
  width: 70,
  height: 75,
  legSection: 6,
  topThickness: 25,
  hasDrawer: true,
  hasShelf: false,
  numLegs: 4,
};

export function generateDesk(params: DeskGeneratorParams): ParametricOutput {
  const warnings: string[] = [];
  const notes: string[] = [];

  const {
    length,
    width,
    height,
    legSection,
    topThickness,
    hasDrawer,
    hasShelf,
    numLegs,
  } = params;

  const tCm = topThickness / 10;

  // ── Validaciones ────────────────────────────────────────────
  if (length <= 0 || width <= 0 || height <= 0) {
    warnings.push('Todas las medidas deben ser mayores que 0');
  }
  if (legSection < 4) {
    warnings.push(`Sección de pata ${legSection}cm muy pequeña — mínimo 4cm recomendado`);
  }
  if (height < 65 || height > 85) {
    warnings.push(`Altura ${height}cm fuera del rango ergonómico recomendado (65-85cm)`);
  }
  if (length > 200 && numLegs === 4) {
    warnings.push(`Escritorio de ${length}cm — considera 6 patas para evitar flexión del tablero`);
  }
  if (length > 250) {
    warnings.push(`Longitud ${length}cm muy grande — divide en dos módulos`);
  }

  const hasCritical = length <= 0 || width <= 0 || height <= 0;
  if (hasCritical) {
    return { pieces: [], summary: 'Medidas inválidas', notes, warnings };
  }

  // ── Medidas derivadas ───────────────────────────────────────
  const legHeight = height - tCm;            // altura pata libre
  const innerLength = length - 2 * legSection; // espacio entre patas largo
  const innerWidth = width - 2 * legSection;   // espacio entre patas ancho

  // ── Despiece tableros ────────────────────────────────────────
  const pieces: Piece[] = [];

  // Tablero superior
  pieces.push({
    name: 'Tablero superior',
    width: length,
    height: width,
    quantity: 1,
    thickness: topThickness,
  });

  // Faldones largos (2 — frontal y trasero) bajo el tablero
  const apronThickness = 19; // mm
  const apronHeight = Math.min(10, legHeight * 0.15); // 10cm o 15% del alto
  pieces.push({
    name: 'Faldón largo',
    width: innerLength,
    height: apronHeight,
    quantity: 2,
    thickness: apronThickness,
  });

  // Faldones cortos (2 — laterales)
  pieces.push({
    name: 'Faldón corto',
    width: innerWidth,
    height: apronHeight,
    quantity: 2,
    thickness: apronThickness,
  });

  // Cajón (caja simple bajo el tablero lateral)
  const DRAWER_THICKNESS = 16; // mm
  const drawerW = Math.round(innerLength * 0.4);  // 40% del largo interior
  const drawerH = Math.round(apronHeight * 0.8);   // 80% del faldón
  const drawerD = Math.round(width * 0.75);         // 75% del fondo

  if (hasDrawer) {
    // Frontal cajón
    pieces.push({
      name: 'Frontal cajón',
      width: drawerW,
      height: drawerH,
      quantity: 1,
      thickness: DRAWER_THICKNESS,
    });
    // Laterales cajón
    pieces.push({
      name: 'Lateral cajón',
      width: drawerD - 2,
      height: drawerH - 2,
      quantity: 2,
      thickness: DRAWER_THICKNESS,
    });
    // Trasero cajón
    pieces.push({
      name: 'Trasero cajón',
      width: drawerW - 2 * (DRAWER_THICKNESS / 10),
      height: drawerH - 2,
      quantity: 1,
      thickness: DRAWER_THICKNESS,
    });
    // Fondo cajón (DM fino)
    pieces.push({
      name: 'Fondo cajón',
      width: drawerW,
      height: drawerD,
      quantity: 1,
      thickness: 4,
    });
    notes.push(`Cajón: ${drawerW}×${drawerD}cm (ancho×fondo) · guías telescópicas de ${Math.round(drawerD)}cm`);
  }

  // Balda inferior entre patas
  if (hasShelf) {
    pieces.push({
      name: 'Balda inferior',
      width: innerLength,
      height: innerWidth,
      quantity: 1,
      thickness: apronThickness,
    });
    notes.push('Balda inferior: encastrar entre las patas con tarugos o escuadras pequeñas');
  }

  // ── Listones (patas) ─────────────────────────────────────────
  const lumberPieces: LumberPiece[] = [];
  lumberPieces.push({
    name: `Pata ${legSection}×${legSection}cm`,
    section: `${legSection}×${legSection}cm`,
    length: Math.round(legHeight * 10) / 10,
    quantity: numLegs,
  });

  if (numLegs === 6) {
    notes.push('6 patas: 2 centrales equidistantes entre los 4 extremos');
  }

  // ── Notas ────────────────────────────────────────────────────
  notes.unshift('Construcción: tablero sobre patas macizas reforzadas con faldones perimetrales');
  notes.push(`Ergonomía: altura real de trabajo ${height}cm (recomendado 72-78cm)`);
  if (length >= 120) {
    notes.push('Espacio suficiente para dos monitores en paralelo');
  }

  // ── Herrajes ─────────────────────────────────────────────────
  const hardware: HardwareItem[] = [];

  // Escuadras de unión tablero-patas (1 por pata)
  hardware.push({
    name: 'Escuadra metálica 80×80mm',
    spec: '80×80mm zincada',
    quantity: numLegs,
    category: 'bracket',
    notes: 'Atornillar bajo el tablero, pegada a cada pata',
  });
  // Tornillos escuadras
  hardware.push({
    name: 'Tornillo rosca madera 4×30mm',
    spec: '4×30mm',
    quantity: numLegs * 6,
    category: 'screw',
    notes: '3 por cara × 2 caras × cada escuadra',
  });
  // Faldones con tirafondos a las patas
  hardware.push({
    name: 'Tirafondo 6×60mm',
    spec: '6×60mm',
    quantity: 8,
    category: 'screw',
    notes: '2 por esquina, faldón a pata (4 esquinas)',
  });
  // Cajón
  if (hasDrawer) {
    hardware.push({
      name: `Guía telescópica ${Math.round(drawerD)}cm`,
      spec: `${Math.round(drawerD)}cm par`,
      quantity: 1,
      category: 'drawer_runner',
      notes: 'Atornillar al faldón y al lateral del cajón',
    });
    hardware.push({
      name: 'Tornillo 3.5×16mm',
      spec: '3.5×16mm',
      quantity: 12,
      category: 'screw',
      notes: 'Fijación guías + montaje cajón',
    });
    hardware.push({
      name: 'Tirador metálico 128mm',
      spec: '128mm',
      quantity: 1,
      category: 'handle',
      notes: 'Tirador en el frontal del cajón',
    });
  }
  // Balda inferior
  if (hasShelf) {
    hardware.push({
      name: 'Ángulo metálico 40×40mm',
      spec: '40×40mm',
      quantity: 4,
      category: 'bracket',
      notes: 'Sujetar balda a las patas interiores',
    });
  }

  // ── Summary ──────────────────────────────────────────────────
  const totalPieces = pieces.reduce((s, p) => s + p.quantity, 0);
  const summary = `Escritorio ${length}×${width}×${height}cm · ${numLegs} patas · ${totalPieces} piezas${hasDrawer ? ' + cajón' : ''}`;

  return { pieces, lumberPieces, hardware, summary, notes, warnings };
}
