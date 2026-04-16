// ═══════════════════════════════════════════════════════════════
// DRAWER CABINET GENERATOR — cajonera con N cajones.
// ───────────────────────────────────────────────────────────────
// Carcasa tipo caja + N cajones iguales distribuidos en altura.
// Cada cajón lleva: 1 frontal, 2 laterales, 1 trasero y 1 fondo.
// Se reserva 1.3cm a cada lado del cajón para guías metálicas
// (no son madera, son hardware).
// ═══════════════════════════════════════════════════════════════

import {
  Piece,
  ParametricOutput,
  DrawerCabinetParams,
  HardwareItem,
} from '../../models';

export const DRAWER_CABINET_DEFAULTS: DrawerCabinetParams = {
  width: 50,
  height: 80,
  depth: 45,
  numDrawers: 4,
  thickness: 16,
  drawerThickness: 12,
  drawerBottomThickness: 4,
};

// Holgura para guías (por lado)
const RUNNER_CLEARANCE = 1.3; // cm
// Hueco entre cajones
const DRAWER_GAP = 0.5; // cm

export function generateDrawerCabinet(
  params: DrawerCabinetParams
): ParametricOutput {
  const warnings: string[] = [];
  const notes: string[] = [];

  const {
    width,
    height,
    depth,
    numDrawers,
    thickness,
    drawerThickness,
    drawerBottomThickness,
  } = params;

  const tCm = thickness / 10;
  const dtCm = drawerThickness / 10;

  // Validaciones
  if (width <= 0 || height <= 0 || depth <= 0) {
    warnings.push('Todas las medidas deben ser mayores que 0');
  }
  if (numDrawers < 1 || numDrawers > 10) {
    warnings.push('Número de cajones fuera de rango (1-10)');
  }
  if (width < 20) {
    warnings.push(`Ancho ${width}cm muy pequeño para cajones con guías`);
  }
  if (depth < 25) {
    warnings.push(`Fondo ${depth}cm muy corto (recomendado 30cm+)`);
  }

  const innerWidth = width - 2 * tCm;
  const innerHeight = height - 2 * tCm;
  const drawerOuterWidth = innerWidth - 2 * RUNNER_CLEARANCE;
  const totalGap = (numDrawers + 1) * DRAWER_GAP;
  const drawerHeight = (innerHeight - totalGap) / numDrawers;

  if (drawerHeight < 6) {
    warnings.push(
      `Cajones muy bajos (${drawerHeight.toFixed(1)}cm) — reduce el nº de cajones`
    );
  }

  const hasCritical =
    width <= 0 ||
    height <= 0 ||
    depth <= 0 ||
    numDrawers < 1 ||
    drawerHeight <= 0 ||
    drawerOuterWidth <= 0;
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

  // CARCASA (como estantería sin baldas)
  pieces.push({
    name: 'Lateral carcasa',
    width: depth,
    height: height,
    quantity: 2,
    thickness: thickness,
  });
  pieces.push({
    name: 'Techo/base carcasa',
    width: innerWidth,
    height: depth,
    quantity: 2,
    thickness: thickness,
  });
  pieces.push({
    name: 'Trasero carcasa',
    width: width,
    height: height,
    quantity: 1,
    thickness: 4,
  });

  // CAJONES — todos iguales, agrupados por quantity
  const drawerDepth = depth - 2; // 2cm holgura por detrás

  // Frontal (cara visible — mismo grosor que carcasa para uniformidad)
  pieces.push({
    name: 'Frontal cajón',
    width: innerWidth - 2 * RUNNER_CLEARANCE,
    height: drawerHeight,
    quantity: numDrawers,
    thickness: thickness,
  });

  // Laterales del cajón
  pieces.push({
    name: 'Lateral cajón',
    width: drawerDepth,
    height: drawerHeight - drawerBottomThickness / 10,
    quantity: numDrawers * 2,
    thickness: drawerThickness,
  });

  // Trasero del cajón (encastrado entre laterales)
  pieces.push({
    name: 'Trasero cajón',
    width: drawerOuterWidth - 2 * dtCm,
    height: drawerHeight - drawerBottomThickness / 10,
    quantity: numDrawers,
    thickness: drawerThickness,
  });

  // Fondo del cajón (DM fino, ranurado entre lados)
  pieces.push({
    name: 'Fondo cajón',
    width: drawerOuterWidth - 2 * dtCm,
    height: drawerDepth - dtCm,
    quantity: numDrawers,
    thickness: drawerBottomThickness,
  });

  // ── Notas ───────────────────────────────────────────────────
  notes.push(
    `Cajones de ${drawerHeight.toFixed(1)}cm de alto × ${drawerOuterWidth.toFixed(1)}cm`
  );
  notes.push(
    `Reservados ${RUNNER_CLEARANCE}cm por lado para guías metálicas extraíbles`
  );
  notes.push(
    `Trasero carcasa y fondos cajón en ${drawerBottomThickness}mm (DM/contrachapado fino)`
  );
  notes.push(
    `Necesitarás ${numDrawers} par${numDrawers === 1 ? '' : 'es'} de guías metálicas (hardware, no madera)`
  );

  // ── Herrajes ────────────────────────────────────────────────
  const hardware: HardwareItem[] = [];
  // Carcasa (techo/base con laterales): 12 tornillos
  hardware.push({
    name: 'Tornillo aglomerado 4×50mm',
    spec: '4×50mm',
    quantity: 12,
    category: 'screw',
    notes: 'Unir techo/base con laterales',
  });
  // Trasero clavado
  const backPerimeter = 2 * (width + height);
  hardware.push({
    name: 'Puntilla cabeza perdida 3×20mm',
    spec: '3×20mm',
    quantity: Math.ceil(backPerimeter / 10),
    category: 'nail',
    notes: 'Fijar trasero perimetralmente',
  });
  // Guías telescópicas (un par por cajón)
  const drawerRunnerLen = Math.round(depth - 2);
  hardware.push({
    name: `Guía telescópica ${drawerRunnerLen}cm`,
    spec: `${drawerRunnerLen}cm par`,
    quantity: numDrawers,
    category: 'drawer_runner',
    notes: '1 par por cajón (contiene 2 raíles, izq+der)',
  });
  // Tornillos para las guías (8 por par)
  hardware.push({
    name: 'Tornillo cabeza plana 3.5×16mm',
    spec: '3.5×16mm',
    quantity: numDrawers * 8,
    category: 'screw',
    notes: 'Fijación de guías (4 a carcasa + 4 al cajón por lado)',
  });
  // Caja del cajón: 8 tornillos por cajón
  hardware.push({
    name: 'Tornillo aglomerado 4×35mm',
    spec: '4×35mm',
    quantity: numDrawers * 8,
    category: 'screw',
    notes: 'Montaje de cada cajón (frontal + trasero + laterales)',
  });
  // Tirador por cajón
  hardware.push({
    name: 'Tirador metálico',
    spec: '96-128mm',
    quantity: numDrawers,
    category: 'handle',
    notes: '1 tirador por frontal de cajón',
  });

  const totalPieces = pieces.reduce((s, p) => s + p.quantity, 0);
  const summary = `Cajonera ${width}×${height}×${depth}cm · ${numDrawers} cajón${numDrawers === 1 ? '' : 'es'} · ${totalPieces} piezas`;

  return { pieces, hardware, summary, notes, warnings };
}
