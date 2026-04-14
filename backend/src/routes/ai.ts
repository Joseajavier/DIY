import { Router, Request, Response } from 'express';
import { generateDIYWithAI } from '../services/diyAiService';
import { generateProPlanWithAI } from '../services/proAiService';
import { AppError } from '../utils/errors';

const router = Router();

// POST /ai/diy-generate
router.post('/diy-generate', async (req: Request, res: Response) => {
  const { prompt, language } = req.body;

  if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 3) {
    throw new AppError(400, 'prompt is required (min 3 characters)');
  }

  const result = await generateDIYWithAI({ prompt: prompt.trim(), language });
  res.json(result);
});

// POST /ai/pro-plan
router.post('/pro-plan', async (req: Request, res: Response) => {
  const { pieces, boardWidth, boardHeight, projectContext, language } = req.body;

  if (!Array.isArray(pieces) || pieces.length === 0) {
    throw new AppError(400, 'pieces array is required');
  }

  for (const p of pieces) {
    if (!p.width || !p.height || !p.quantity) {
      throw new AppError(400, 'Each piece needs width, height, and quantity');
    }
  }

  const result = await generateProPlanWithAI({
    pieces,
    boardWidth: boardWidth || 244,
    boardHeight: boardHeight || 122,
    projectContext,
    language,
  });

  res.json(result);
});

export default router;
