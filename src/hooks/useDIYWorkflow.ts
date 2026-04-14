import { useCallback } from 'react';
import { DIYResult } from '../models';
import { generateDIYProject } from '../services/diyGenerator';
import { generateDIYWithAI } from '../services/apiClient';
import { createProject } from '../storage/projectRepository';
import { createMaterials } from '../storage/materialRepository';
import { setLastProjectId } from '../storage/settingsStorage';
import { useAsyncAction } from './useAsyncAction';

export interface DIYWorkflowInput {
  name: string;
  description: string;
  useAI: boolean;
  language: string;
}

export interface DIYWorkflowResult {
  result: DIYResult;
  projectId: string;
  source: 'ai' | 'local';
}

export function useDIYWorkflow() {
  const action = useAsyncAction<DIYWorkflowResult>();

  const generate = useCallback(
    (input: DIYWorkflowInput) =>
      action.execute(async () => {
        let result: DIYResult;
        let source: 'ai' | 'local' = 'local';

        if (input.useAI) {
          try {
            const aiResult = await generateDIYWithAI({
              prompt: `${input.name}: ${input.description}`,
              language: input.language,
            });
            result = {
              projectName: aiResult.projectName,
              summary: aiResult.summary,
              steps: aiResult.steps,
              materials: aiResult.materials.map((m) => ({ name: m.name, quantity: m.quantity, unit: m.unit })),
              tools: aiResult.tools.map((t) => ({ name: t.name, optional: t.optional })),
              difficulty: aiResult.difficulty,
              estimatedTime: aiResult.estimatedTime,
            };
            source = 'ai';
          } catch {
            // Fallback to local
            result = generateDIYProject(input.name, input.description);
            source = 'local';
          }
        } else {
          result = generateDIYProject(input.name, input.description);
        }

        // Persist
        const projectId = await createProject(input.name, 'diy', input.description);
        await createMaterials(projectId, result.materials);
        setLastProjectId(projectId);

        return { result, projectId, source };
      }),
    [action]
  );

  return { ...action, generate };
}
