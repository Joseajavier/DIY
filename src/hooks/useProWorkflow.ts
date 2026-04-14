import { useCallback } from 'react';
import { Piece, Material, OptimizationResult } from '../models';
import { optimizeCuts } from '../services/cuttingOptimizer';
import { generateMaterials } from '../services/materialsGenerator';
import { generateProPlanWithAI } from '../services/apiClient';
import { createProject } from '../storage/projectRepository';
import { createPieces } from '../storage/pieceRepository';
import { createMaterials } from '../storage/materialRepository';
import { saveOptimization } from '../storage/optimizationRepository';
import { setLastProjectId } from '../storage/settingsStorage';
import { useAsyncAction } from './useAsyncAction';

export interface ProWorkflowInput {
  name: string;
  pieces: Piece[];
  boardWidth: number;
  boardHeight: number;
  useAI: boolean;
  language: string;
}

export interface ProWorkflowResult {
  projectId: string;
  optimization: OptimizationResult;
  materials: Material[];
  source: 'ai' | 'local';
  aiExplanation?: string;
}

export function useProWorkflow() {
  const action = useAsyncAction<ProWorkflowResult>();

  const optimize = useCallback(
    (input: ProWorkflowInput) =>
      action.execute(async () => {
        let optimization: OptimizationResult;
        let materials: Material[];
        let source: 'ai' | 'local' = 'local';
        let aiExplanation: string | undefined;

        if (input.useAI) {
          try {
            const aiResult = await generateProPlanWithAI({
              pieces: input.pieces,
              boardWidth: input.boardWidth,
              boardHeight: input.boardHeight,
              projectContext: input.name,
              language: input.language,
            });
            const optData = aiResult.toolResults.optimizeCuts;
            if (optData) {
              optimization = {
                boards: optData.boards || [],
                totalBoards: optData.totalBoards,
                totalWaste: optData.wastePercentage,
                efficiency: optData.efficiency,
              };
            } else {
              optimization = optimizeCuts(input.pieces, input.boardWidth, input.boardHeight);
            }
            materials = aiResult.toolResults.estimateMaterials || generateMaterials(input.pieces, optimization.totalBoards);
            aiExplanation = aiResult.explanation;
            source = 'ai';
          } catch {
            optimization = optimizeCuts(input.pieces, input.boardWidth, input.boardHeight);
            materials = generateMaterials(input.pieces, optimization.totalBoards);
          }
        } else {
          optimization = optimizeCuts(input.pieces, input.boardWidth, input.boardHeight);
          materials = generateMaterials(input.pieces, optimization.totalBoards);
        }

        // Persist
        const projectId = await createProject(input.name, 'pro');
        await createPieces(projectId, input.pieces);
        await createMaterials(projectId, materials);
        await saveOptimization({
          projectId,
          boardWidth: input.boardWidth,
          boardHeight: input.boardHeight,
          totalBoards: optimization.totalBoards,
          wastePercentage: optimization.totalWaste,
          efficiency: optimization.efficiency,
        });
        setLastProjectId(projectId);

        return { projectId, optimization, materials, source, aiExplanation };
      }),
    [action]
  );

  return { ...action, optimize };
}
