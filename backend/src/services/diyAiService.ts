import { getOpenAI } from './openaiClient';
import { DIY_SYSTEM_PROMPT, DIY_RESPONSE_SCHEMA } from '../schemas/diySchema';

export interface DIYGenerateRequest {
  prompt: string;
  language?: string;
}

export async function generateDIYWithAI(req: DIYGenerateRequest) {
  const openai = getOpenAI();

  const userMessage = req.language === 'en'
    ? `Generate a DIY woodworking project for: ${req.prompt}`
    : `Genera un proyecto DIY de carpintería para: ${req.prompt}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: DIY_SYSTEM_PROMPT },
      { role: 'user', content: userMessage },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'diy_project',
        strict: true,
        schema: DIY_RESPONSE_SCHEMA,
      },
    },
    temperature: 0.7,
    max_tokens: 2000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('Empty response from OpenAI');

  return JSON.parse(content);
}
