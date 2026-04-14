import { getOpenAI } from './openaiClient';
import { PRO_SYSTEM_PROMPT, TOOL_DEFINITIONS } from '../schemas/proSchema';
import { executeTool } from '../tools/toolRegistry';

export interface ProPlanRequest {
  pieces: { width: number; height: number; quantity: number }[];
  boardWidth: number;
  boardHeight: number;
  projectContext?: string;
  language?: string;
}

export async function generateProPlanWithAI(req: ProPlanRequest) {
  const openai = getOpenAI();

  const userMessage = `
Proyecto: ${req.projectContext || 'Proyecto de carpintería profesional'}
Piezas: ${JSON.stringify(req.pieces)}
Tablero: ${req.boardWidth} × ${req.boardHeight} cm

Analiza este proyecto. Usa las herramientas para:
1. Optimizar los cortes (optimizeCuts)
2. Estimar materiales (estimateMaterials) — necesitarás el totalBoards del paso anterior
3. Comparar opciones de compra (compareStoreOptions)

Después explica los resultados al usuario.`.trim();

  let messages: any[] = [
    { role: 'system', content: PRO_SYSTEM_PROMPT },
    { role: 'user', content: userMessage },
  ];

  const toolResults: Record<string, any> = {};

  // Tool-calling loop (max 5 iterations)
  for (let i = 0; i < 5; i++) {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      tools: TOOL_DEFINITIONS,
      temperature: 0.3,
      max_tokens: 3000,
    });

    const choice = response.choices[0];
    const msg = choice.message;
    messages.push(msg);

    // If no tool calls, we're done
    if (!msg.tool_calls || msg.tool_calls.length === 0) {
      return {
        explanation: msg.content || '',
        toolResults,
      };
    }

    // Execute each tool call
    for (const toolCall of msg.tool_calls) {
      const tc = toolCall as any;
      const fnName = tc.function?.name ?? tc.name ?? '';
      let args: any;
      try {
        args = JSON.parse(tc.function?.arguments ?? tc.arguments ?? '{}');
      } catch {
        args = {};
      }

      let result: any;
      try {
        result = executeTool(fnName, args);
        toolResults[fnName] = result;
      } catch (err: any) {
        result = { error: err.message };
      }

      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }
  }

  // If we exhaust iterations, return what we have
  return {
    explanation: 'Análisis completado con las herramientas disponibles.',
    toolResults,
  };
}
