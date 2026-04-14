import { DIYResult, DIYStep, Material, Tool, ProjectDifficulty } from '../models';

interface TemplateData {
  steps: DIYStep[];
  materials: Material[];
  tools: Tool[];
  difficulty: ProjectDifficulty;
  estimatedTime: string;
  summary: string;
}

const TEMPLATES: Record<string, TemplateData> = {
  estanteria: {
    summary: 'Estantería de madera para pared con varios estantes y panel trasero.',
    difficulty: 'medium',
    estimatedTime: '3-4 horas',
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
    summary: 'Mesa de madera maciza con patas cuadradas y bastidor reforzado.',
    difficulty: 'medium',
    estimatedTime: '4-5 horas',
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
  caja: {
    summary: 'Caja de madera con tapa abatible y bisagras. Proyecto rápido ideal para principiantes.',
    difficulty: 'easy',
    estimatedTime: '1-2 horas',
    steps: [
      { number: 1, title: 'Cortar las 6 caras', description: 'Corta base (30×20cm), tapa (30×20cm), 2 laterales largos (30×15cm) y 2 cortos (20×15cm).' },
      { number: 2, title: 'Lijar todas las piezas', description: 'Lija con grano 120 y repasa con 220 para un acabado suave.' },
      { number: 3, title: 'Montar la base y laterales', description: 'Pega y atornilla los 4 laterales a la base. Usa escuadra para ángulos rectos.' },
      { number: 4, title: 'Instalar la tapa', description: 'Coloca bisagras pequeñas para que la tapa abra y cierre.' },
      { number: 5, title: 'Acabado', description: 'Aplica barniz, pintura o decora a tu gusto. Puedes añadir un cierre.' },
    ],
    materials: [
      { name: 'Tablero de pino 60×40cm', quantity: 1, unit: 'ud' },
      { name: 'Tornillos 3×20mm', quantity: 16, unit: 'ud' },
      { name: 'Bisagras pequeñas', quantity: 2, unit: 'ud' },
      { name: 'Cola de carpintero', quantity: 1, unit: 'bote' },
      { name: 'Lija grano 120 y 220', quantity: 2, unit: 'hojas' },
      { name: 'Barniz / Pintura', quantity: 1, unit: 'bote' },
    ],
    tools: [
      { name: 'Sierra de calar' },
      { name: 'Taladro atornillador' },
      { name: 'Metro y lápiz' },
      { name: 'Escuadra de carpintero' },
      { name: 'Lijadora orbital', optional: true },
    ],
  },
  banco: {
    summary: 'Banco de madera resistente para exterior o interior con travesaños reforzados.',
    difficulty: 'medium',
    estimatedTime: '3-4 horas',
    steps: [
      { number: 1, title: 'Cortar patas', description: 'Corta 4 patas de 7×7cm a 43cm de alto (altura estándar de banco).' },
      { number: 2, title: 'Cortar asiento', description: 'Corta 3 tablones de 100×12cm o un tablero macizo de 100×35cm.' },
      { number: 3, title: 'Montar travesaños', description: 'Une las patas con travesaños a 10cm del suelo y a 10cm del asiento.' },
      { number: 4, title: 'Fijar asiento', description: 'Atornilla los tablones del asiento al bastidor. Deja 5mm entre tablones para drenaje si es exterior.' },
      { number: 5, title: 'Reforzar', description: 'Añade una cruceta diagonal debajo para mayor estabilidad.' },
      { number: 6, title: 'Acabado', description: 'Lija y aplica aceite de teca (exterior) o barniz (interior). 2 capas mínimo.' },
    ],
    materials: [
      { name: 'Listón 7×7cm (2m)', quantity: 2, unit: 'ud' },
      { name: 'Tablón 100×12cm', quantity: 3, unit: 'ud' },
      { name: 'Listón 5×3cm (2m)', quantity: 2, unit: 'ud' },
      { name: 'Tornillos 5×70mm', quantity: 16, unit: 'ud' },
      { name: 'Tornillos 4×40mm', quantity: 12, unit: 'ud' },
      { name: 'Cola de carpintero', quantity: 1, unit: 'bote' },
      { name: 'Aceite de teca / Barniz', quantity: 1, unit: 'bote' },
      { name: 'Lija grano 80, 120 y 220', quantity: 3, unit: 'hojas' },
    ],
    tools: [
      { name: 'Sierra circular / ingletadora' },
      { name: 'Taladro atornillador' },
      { name: 'Sargentos (mínimo 4)' },
      { name: 'Metro y lápiz' },
      { name: 'Escuadra de carpintero' },
      { name: 'Lijadora orbital', optional: true },
    ],
  },
  perchero: {
    summary: 'Perchero de pared con ganchos sobre tabla de madera maciza.',
    difficulty: 'easy',
    estimatedTime: '1 hora',
    steps: [
      { number: 1, title: 'Cortar tabla base', description: 'Corta un tablón de 80×15cm que servirá de soporte para los ganchos.' },
      { number: 2, title: 'Lijar y redondear', description: 'Lija la tabla y redondea las esquinas con lija o fresadora.' },
      { number: 3, title: 'Marcar posiciones', description: 'Marca los puntos para los ganchos cada 15cm, centrados en la tabla.' },
      { number: 4, title: 'Instalar ganchos', description: 'Atornilla los ganchos de percha en las marcas. Predrillar para evitar grietas.' },
      { number: 5, title: 'Acabado', description: 'Aplica barniz, pintura o cera. Puedes añadir una balda superior.' },
      { number: 6, title: 'Montar en pared', description: 'Fija con tacos y tirafondos a la pared. Verifica nivel.' },
    ],
    materials: [
      { name: 'Tablón macizo 80×15cm', quantity: 1, unit: 'ud' },
      { name: 'Ganchos de percha', quantity: 5, unit: 'ud' },
      { name: 'Tornillos 3×20mm', quantity: 10, unit: 'ud' },
      { name: 'Tacos + tirafondos pared', quantity: 3, unit: 'ud' },
      { name: 'Barniz / Pintura', quantity: 1, unit: 'bote' },
      { name: 'Lija grano 120 y 220', quantity: 2, unit: 'hojas' },
    ],
    tools: [
      { name: 'Sierra de calar' },
      { name: 'Taladro atornillador' },
      { name: 'Metro y lápiz' },
      { name: 'Nivel de burbuja' },
      { name: 'Fresadora', optional: true },
    ],
  },
  marco: {
    summary: 'Marco de madera con cortes a inglete para foto, espejo o cuadro.',
    difficulty: 'hard',
    estimatedTime: '2-3 horas',
    steps: [
      { number: 1, title: 'Cortar listones a 45°', description: 'Corta 4 listones con inglete a 45° en ambos extremos. Medida exterior según foto/espejo.' },
      { number: 2, title: 'Lijar cortes', description: 'Lija las superficies y los cortes en inglete para un ajuste perfecto.' },
      { number: 3, title: 'Encolar y unir', description: 'Aplica cola en los ingletes y une con sargentos de esquina. Refuerza con clavos sin cabeza.' },
      { number: 4, title: 'Fresar rebajo', description: 'Haz un rebajo en la parte trasera para encajar el cristal/foto. Si no tienes fresadora, usa listones finos.' },
      { number: 5, title: 'Acabado', description: 'Lija, tiñe o pinta el marco. Inserta el contenido y cierra con clips o tapa trasera.' },
    ],
    materials: [
      { name: 'Listón moldura 3×2cm (2m)', quantity: 1, unit: 'ud' },
      { name: 'Clavos sin cabeza 20mm', quantity: 8, unit: 'ud' },
      { name: 'Cola de carpintero', quantity: 1, unit: 'bote' },
      { name: 'Clips sujeta-marco', quantity: 4, unit: 'ud' },
      { name: 'Tinte / Pintura', quantity: 1, unit: 'bote' },
    ],
    tools: [
      { name: 'Sierra ingletadora / caja de ingletes' },
      { name: 'Sargentos de esquina' },
      { name: 'Martillo pequeño' },
      { name: 'Metro y lápiz' },
      { name: 'Fresadora', optional: true },
    ],
  },
  soporte_plantas: {
    summary: 'Soporte escalado para macetas con varios niveles.',
    difficulty: 'easy',
    estimatedTime: '2 horas',
    steps: [
      { number: 1, title: 'Cortar bases', description: 'Corta 3 cuadrados de diferentes tamaños: 30×30, 25×25 y 20×20cm.' },
      { number: 2, title: 'Cortar patas', description: 'Corta 4 listones de 3×3cm a 25cm para el nivel inferior y 4 a 20cm para el superior.' },
      { number: 3, title: 'Lijar todo', description: 'Lija todas las piezas con grano 120 y 220.' },
      { number: 4, title: 'Montar niveles', description: 'Atornilla las patas a cada base creando una estructura escalonada.' },
      { number: 5, title: 'Acabado impermeable', description: 'Aplica aceite o barniz impermeable ya que estará en contacto con agua de riego.' },
    ],
    materials: [
      { name: 'Tablero de pino 60×30cm', quantity: 1, unit: 'ud' },
      { name: 'Listón 3×3cm (2m)', quantity: 2, unit: 'ud' },
      { name: 'Tornillos 4×30mm', quantity: 16, unit: 'ud' },
      { name: 'Barniz impermeable', quantity: 1, unit: 'bote' },
      { name: 'Lija grano 120 y 220', quantity: 2, unit: 'hojas' },
    ],
    tools: [
      { name: 'Sierra de calar' },
      { name: 'Taladro atornillador' },
      { name: 'Metro y lápiz' },
      { name: 'Escuadra de carpintero' },
    ],
  },
  zapatero: {
    summary: 'Zapatero abierto de madera con 3-4 estantes inclinados.',
    difficulty: 'medium',
    estimatedTime: '3 horas',
    steps: [
      { number: 1, title: 'Cortar laterales', description: 'Corta 2 tableros laterales de 80×25cm.' },
      { number: 2, title: 'Cortar estantes', description: 'Corta 3-4 estantes de 60×20cm.' },
      { number: 3, title: 'Marcar inclinación', description: 'Marca en los laterales la posición de cada estante con 10° de inclinación hacia atrás.' },
      { number: 4, title: 'Ensamblar', description: 'Fija los estantes a los laterales con tornillos y cola. La inclinación evita que caigan los zapatos.' },
      { number: 5, title: 'Añadir tope', description: 'Coloca un listón fino en el borde de cada estante como tope.' },
      { number: 6, title: 'Acabado', description: 'Lija y aplica barniz o pintura. Opcional: ruedas en la base.' },
    ],
    materials: [
      { name: 'Tablero de pino 80×25cm', quantity: 2, unit: 'ud' },
      { name: 'Tablero de pino 60×20cm', quantity: 4, unit: 'ud' },
      { name: 'Listón fino 60cm', quantity: 4, unit: 'ud' },
      { name: 'Tornillos 4×40mm', quantity: 24, unit: 'ud' },
      { name: 'Cola de carpintero', quantity: 1, unit: 'bote' },
      { name: 'Barniz / Pintura', quantity: 1, unit: 'bote' },
    ],
    tools: [
      { name: 'Sierra de calar' },
      { name: 'Taladro atornillador' },
      { name: 'Transportador de ángulos', optional: true },
      { name: 'Metro y lápiz' },
      { name: 'Escuadra de carpintero' },
    ],
  },
};

const DEFAULT_TEMPLATE: TemplateData = {
  summary: 'Proyecto de carpintería personalizado con materiales básicos.',
  difficulty: 'medium',
  estimatedTime: '2-4 horas',
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

const KEYWORD_MAP: [string[], string][] = [
  [['estanter', 'balda', 'repisa', 'librería', 'libreria'], 'estanteria'],
  [['mesa', 'escritorio', 'table'], 'mesa'],
  [['caja', 'cofre', 'baúl', 'baul', 'cajón', 'cajon'], 'caja'],
  [['banco', 'banqueta', 'asiento', 'taburete'], 'banco'],
  [['perchero', 'colgador', 'gancho'], 'perchero'],
  [['marco', 'cuadro', 'espejo'], 'marco'],
  [['planta', 'maceta', 'soporte', 'jardinera'], 'soporte_plantas'],
  [['zapatero', 'zapato', 'calzado'], 'zapatero'],
];

function matchTemplate(description: string): TemplateData {
  const lower = description.toLowerCase();
  for (const [keywords, templateKey] of KEYWORD_MAP) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return TEMPLATES[templateKey];
    }
  }
  return DEFAULT_TEMPLATE;
}

export function generateDIYProject(name: string, description: string): DIYResult {
  const template = matchTemplate(description);
  return {
    projectName: name,
    summary: template.summary,
    steps: template.steps,
    materials: template.materials,
    tools: template.tools,
    difficulty: template.difficulty,
    estimatedTime: template.estimatedTime,
  };
}
