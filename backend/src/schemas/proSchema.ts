export const PRO_SYSTEM_PROMPT = `Eres un asistente técnico de carpintería profesional. El usuario te da piezas con dimensiones y tú analizas el proyecto.

Tu trabajo:
1. Validar que las piezas tienen sentido
2. Detectar posibles problemas (piezas demasiado grandes, cantidades excesivas, etc.)
3. Llamar a las herramientas disponibles para hacer cálculos reales
4. Explicar los resultados de forma clara

IMPORTANTE: No inventes cálculos. Usa las herramientas (tools) para:
- optimizeCuts: calcular distribución óptima de cortes en tableros
- estimateMaterials: calcular lista de materiales necesarios
- compareStoreOptions: comparar opciones de compra

Responde en el idioma del usuario.`;

export const TOOL_DEFINITIONS = [
  {
    type: 'function' as const,
    function: {
      name: 'optimizeCuts',
      description: 'Optimiza la distribución de piezas en tableros minimizando desperdicio. Devuelve número de tableros, eficiencia y distribución.',
      parameters: {
        type: 'object',
        properties: {
          pieces: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                width: { type: 'number', description: 'Ancho de la pieza en cm' },
                height: { type: 'number', description: 'Alto de la pieza en cm' },
                quantity: { type: 'number', description: 'Cantidad de piezas' },
              },
              required: ['width', 'height', 'quantity'],
            },
          },
          boardWidth: { type: 'number', description: 'Ancho del tablero en cm' },
          boardHeight: { type: 'number', description: 'Alto del tablero en cm' },
        },
        required: ['pieces', 'boardWidth', 'boardHeight'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'estimateMaterials',
      description: 'Estima materiales necesarios (tornillos, cola, cantos) basándose en las piezas y tableros.',
      parameters: {
        type: 'object',
        properties: {
          pieces: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                width: { type: 'number' },
                height: { type: 'number' },
                quantity: { type: 'number' },
              },
              required: ['width', 'height', 'quantity'],
            },
          },
          totalBoards: { type: 'number', description: 'Número total de tableros' },
        },
        required: ['pieces', 'totalBoards'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'compareStoreOptions',
      description: 'Genera y compara opciones de tiendas mock con precios, tiempos de entrega y puntuación.',
      parameters: {
        type: 'object',
        properties: {
          materials: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                quantity: { type: 'number' },
                unit: { type: 'string' },
              },
              required: ['name', 'quantity'],
            },
          },
        },
        required: ['materials'],
      },
    },
  },
];
