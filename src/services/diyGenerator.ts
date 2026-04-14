import { DIYResult, DIYStep, Material, Tool } from '../models';

const PROJECT_TEMPLATES: Record<
  string,
  { steps: DIYStep[]; materials: Material[]; tools: Tool[] }
> = {
  estanteria: {
    steps: [
      { number: 1, title: 'Medir y planificar', description: 'Mide el espacio donde irá la estantería. Decide número de estantes y separación entre ellos.' },
      { number: 2, title: 'Cortar tableros', description: 'Corta los tableros laterales y los estantes a la medida. Lija los bordes.' },
      { number: 3, title: 'Ensamblar estructura', description: 'Une los laterales con los estantes usando tornillos y cola. Usa escuadras para mantener ángulos rectos.' },
      { number: 4, title: 'Reforzar trasera', description: 'Coloca un panel trasero de contrachapado fino para dar rigidez.' },
      { number: 5, title: 'Lijar y acabar', description: 'Lija toda la superficie. Aplica barniz, pintura o aceite según el acabado deseado.' },
      { number: 6, title: 'Anclar a la pared', description: 'Fija la estantería a la pared con escuadras o tacos. Verifica nivel.' },
    ],
    materials: [
      { name: 'Tablero de pino 200×30cm', quantity: 2, unit: 'ud' },
      { name: 'Tablero de pino 80×30cm', quantity: 4, unit: 'ud' },
      { name: 'Panel contrachapado 200×80cm', quantity: 1, unit: 'ud' },
      { name: 'Tornillos 4×40mm', quantity: 32, unit: 'ud' },
      { name: 'Cola de carpintero', quantity: 1, unit: 'bote' },
      { name: 'Escuadras metálicas', quantity: 4, unit: 'ud' },
      { name: 'Tacos + tirafondos pared', quantity: 4, unit: 'ud' },
      { name: 'Barniz / Pintura', quantity: 1, unit: 'bote' },
    ],
    tools: [
      { name: 'Sierra de calar / circular' },
      { name: 'Taladro atornillador' },
      { name: 'Lijadora orbital', optional: true },
      { name: 'Metro y lápiz' },
      { name: 'Escuadra de carpintero' },
      { name: 'Nivel de burbuja' },
      { name: 'Brocha o rodillo' },
    ],
  },
  mesa: {
    steps: [
      { number: 1, title: 'Diseñar medidas', description: 'Define largo, ancho y alto de la mesa. Estándar: 120×60×75cm.' },
      { number: 2, title: 'Cortar patas', description: 'Corta 4 patas de sección cuadrada (6×6cm) a 73cm de alto.' },
      { number: 3, title: 'Cortar tablero', description: 'Corta el tablero superior a la medida deseada.' },
      { number: 4, title: 'Montar bastidor', description: 'Une las patas con travesaños formando un marco rectangular. Usa espigas o tornillos.' },
      { number: 5, title: 'Fijar tablero', description: 'Atornilla el tablero al bastidor desde abajo.' },
      { number: 6, title: 'Acabado', description: 'Lija, redondea cantos y aplica el acabado deseado.' },
    ],
    materials: [
      { name: 'Tablero macizo 120×60cm', quantity: 1, unit: 'ud' },
      { name: 'Listón 6×6cm (2.4m)', quantity: 2, unit: 'ud' },
      { name: 'Listón 6×3cm (2.4m)', quantity: 2, unit: 'ud' },
      { name: 'Tornillos 5×60mm', quantity: 16, unit: 'ud' },
      { name: 'Tornillos 4×30mm', quantity: 8, unit: 'ud' },
      { name: 'Cola de carpintero', quantity: 1, unit: 'bote' },
      { name: 'Lija grano 120 y 220', quantity: 4, unit: 'hojas' },
      { name: 'Barniz / Aceite', quantity: 1, unit: 'bote' },
    ],
    tools: [
      { name: 'Sierra de calar / circular' },
      { name: 'Taladro atornillador' },
      { name: 'Sargentos (mínimo 2)' },
      { name: 'Lijadora orbital', optional: true },
      { name: 'Metro y lápiz' },
      { name: 'Escuadra de carpintero' },
    ],
  },
};

const DEFAULT_TEMPLATE = {
  steps: [
    { number: 1, title: 'Planificar el proyecto', description: 'Define medidas, haz un boceto y decide los materiales que necesitas.' },
    { number: 2, title: 'Comprar materiales', description: 'Consigue todos los materiales y herramientas antes de empezar.' },
    { number: 3, title: 'Cortar piezas', description: 'Corta todas las piezas a medida según tu planificación.' },
    { number: 4, title: 'Lijar superficies', description: 'Lija todas las piezas empezando con grano grueso (80-120) y terminando con fino (220).' },
    { number: 5, title: 'Ensamblar', description: 'Une las piezas con tornillos y cola. Usa sargentos para sujetar mientras seca.' },
    { number: 6, title: 'Acabado final', description: 'Aplica barniz, pintura o aceite. Deja secar entre capas.' },
  ],
  materials: [
    { name: 'Tableros de madera', quantity: 3, unit: 'ud' },
    { name: 'Tornillos surtidos', quantity: 24, unit: 'ud' },
    { name: 'Cola de carpintero', quantity: 1, unit: 'bote' },
    { name: 'Lija grano 120 y 220', quantity: 4, unit: 'hojas' },
    { name: 'Barniz / Pintura', quantity: 1, unit: 'bote' },
  ],
  tools: [
    { name: 'Sierra de calar / circular' },
    { name: 'Taladro atornillador' },
    { name: 'Lijadora orbital', optional: true },
    { name: 'Metro y lápiz' },
    { name: 'Escuadra de carpintero' },
    { name: 'Sargentos', optional: true },
  ],
};

function matchTemplate(description: string) {
  const lower = description.toLowerCase();
  if (lower.includes('estanter') || lower.includes('balda') || lower.includes('repisa')) {
    return PROJECT_TEMPLATES.estanteria;
  }
  if (lower.includes('mesa') || lower.includes('escritorio') || lower.includes('table')) {
    return PROJECT_TEMPLATES.mesa;
  }
  return DEFAULT_TEMPLATE;
}

export function generateDIYProject(name: string, description: string): DIYResult {
  const template = matchTemplate(description);
  return {
    projectName: name,
    steps: template.steps,
    materials: template.materials,
    tools: template.tools,
  };
}
