export const DIY_RESPONSE_SCHEMA = {
  type: 'object' as const,
  properties: {
    projectName: { type: 'string' as const },
    summary: { type: 'string' as const },
    difficulty: { type: 'string' as const, enum: ['easy', 'medium', 'hard'] },
    estimatedTime: { type: 'string' as const },
    steps: {
      type: 'array' as const,
      items: {
        type: 'object' as const,
        properties: {
          number: { type: 'number' as const },
          title: { type: 'string' as const },
          description: { type: 'string' as const },
        },
        required: ['number', 'title', 'description'],
        additionalProperties: false,
      },
    },
    materials: {
      type: 'array' as const,
      items: {
        type: 'object' as const,
        properties: {
          name: { type: 'string' as const },
          quantity: { type: 'number' as const },
          unit: { type: 'string' as const },
        },
        required: ['name', 'quantity', 'unit'],
        additionalProperties: false,
      },
    },
    tools: {
      type: 'array' as const,
      items: {
        type: 'object' as const,
        properties: {
          name: { type: 'string' as const },
          optional: { type: 'boolean' as const },
        },
        required: ['name', 'optional'],
        additionalProperties: false,
      },
    },
  },
  required: ['projectName', 'summary', 'difficulty', 'estimatedTime', 'steps', 'materials', 'tools'],
  additionalProperties: false,
};

export const DIY_SYSTEM_PROMPT = `Eres un experto carpintero y profesor de bricolaje. El usuario te describe un proyecto DIY y tú generas un plan completo.

Responde siempre en el idioma del usuario.

Reglas:
- Pasos claros y prácticos, numerados desde 1
- Materiales con cantidad y unidad realistas
- Herramientas marcando cuáles son opcionales
- Dificultad: easy (principiante, <2h), medium (algo de experiencia, 2-5h), hard (avanzado, >5h)
- Tiempo estimado realista
- No inventar herramientas raras
- Tornillos: ~8 por unión como regla general
- Siempre incluir cola de carpintero y lija
- Si el proyecto es ambiguo, asume dimensiones estándar razonables`;
