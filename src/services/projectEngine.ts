import { Piece, FullDIYResult, FullProResult } from '../models';
import { generateDIYProject } from './diyGenerator';
import { optimizeCuts } from './cuttingOptimizer';
import { generateMaterials } from './materialsGenerator';
import { getStoreRecommendations } from './storeRecommender';
import { comparePrices } from './priceComparator';

/**
 * Orchestrates a full DIY project:
 * idea → steps + materials + tools + stores + comparison
 */
export function runDIYProject(name: string, description: string): FullDIYResult {
  const project = generateDIYProject(name, description);
  const stores = getStoreRecommendations(project.materials);
  const comparison = comparePrices(stores);

  return { project, stores, comparison };
}

/**
 * Orchestrates a full PRO project:
 * pieces → optimization + materials + stores + comparison
 */
export function runProProject(
  projectName: string,
  pieces: Piece[],
  boardWidth: number,
  boardHeight: number
): FullProResult {
  const optimization = optimizeCuts(pieces, boardWidth, boardHeight);
  const materials = generateMaterials(pieces, optimization.totalBoards);
  const stores = getStoreRecommendations(materials);
  const comparison = comparePrices(stores);

  return { projectName, optimization, materials, stores, comparison };
}
