// ═══════════════════════════════════════════════════════════════
// SAVE PARAMETRIC PROJECT — persiste el output del generador.
// ───────────────────────────────────────────────────────────────
// Convierte ParametricOutput en un Project (modo 'pro') + Pieces
// (tableros para optimizador 2D) + Materials (listones macizos
// convertidos a metros lineales).
// Devuelve el projectId para que el caller pueda navegar a él o
// continuar al optimizador.
// ═══════════════════════════════════════════════════════════════

import { ParametricOutput, Material } from '../../models';
import { createProject } from '../../storage/projectRepository';
import { createPieces } from '../../storage/pieceRepository';
import { createMaterials } from '../../storage/materialRepository';
import { setLastProjectId } from '../../storage/settingsStorage';

/**
 * Convierte LumberPiece[] en Material[] usando metros lineales totales.
 * Ej: 4 patas de 70cm cada una → 1 material "Pata 6×6cm" con quantity 2.8m.
 */
function lumberToMaterials(output: ParametricOutput): Material[] {
  if (!output.lumberPieces || output.lumberPieces.length === 0) return [];
  return output.lumberPieces.map((l) => ({
    name: `${l.name} (${l.section})`,
    quantity: +((l.length * l.quantity) / 100).toFixed(2),
    unit: 'm',
  }));
}

/**
 * Persiste el output paramétrico como proyecto 'pro'. Deja el ID
 * almacenado como "último proyecto" para que ProOptimization pueda
 * vincular su optimización al mismo proyecto.
 */
export async function saveParametricProject(
  name: string,
  output: ParametricOutput
): Promise<string> {
  const projectId = await createProject(name, 'pro', '', {
    summary: output.summary,
  });

  if (output.pieces.length > 0) {
    await createPieces(projectId, output.pieces);
  }

  const lumberMaterials = lumberToMaterials(output);
  if (lumberMaterials.length > 0) {
    await createMaterials(projectId, lumberMaterials);
  }

  setLastProjectId(projectId);
  return projectId;
}
