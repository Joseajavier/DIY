// ── Piece ──
export interface Piece {
  id?: string;
  projectId?: string;
  name?: string;
  width: number;
  height: number;
  quantity: number;
  thickness?: number;
}

// ── PlacedPiece — pieza con posición X,Y en el tablero ──
export interface PlacedPiece {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  rotated?: boolean;
  colorIndex?: number;
}

// ── Material ──
export interface Material {
  id?: string;
  projectId?: string;
  name: string;
  quantity: number;
  unit?: string;
}

// ── Tool ──
export interface Tool {
  name: string;
  optional?: boolean;
}

// ── Store ──
export interface StoreOption {
  id?: string;
  projectId?: string;
  name: string;
  type: 'online' | 'physical';
  price: number;
  time: string;
  score: number;
}

// ── DIY Flow ──
export interface DIYStep {
  number: number;
  title: string;
  description: string;
}

export type ProjectDifficulty = 'easy' | 'medium' | 'hard';

export interface DIYResult {
  projectName: string;
  summary?: string;
  steps: DIYStep[];
  materials: Material[];
  tools: Tool[];
  difficulty: ProjectDifficulty;
  estimatedTime: string;
}

// ── Cutting Optimization ──
export interface CutResult {
  boardIndex: number;
  pieces: PlacedPiece[];
  wastePercentage: number;
}

export interface OptimizationResult {
  id?: string;
  projectId?: string;
  boards: CutResult[];
  totalBoards: number;
  totalWaste: number;
  efficiency: number;
  boardWidth?: number;
  boardHeight?: number;
  createdAt?: string;
}

// ── Project Step (persisted, with completion state) ──
export interface ProjectStep {
  id?: string;
  projectId?: string;
  number: number;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface ProjectStepRow {
  id: string;
  project_id: string;
  step_number: number;
  title: string;
  description: string;
  completed: number; // SQLite 0/1
  completed_at: string | null;
  notes: string;
  created_at: string;
}

export type ProjectStatus = 'pending' | 'in_progress' | 'completed';

// ── Project ──
export interface Project {
  id: string;
  name: string;
  mode: 'diy' | 'pro';
  description?: string;
  pieces: Piece[];
  createdAt?: string;
  updatedAt?: string;
  // V2 — DIY metadata persistente
  difficulty?: ProjectDifficulty;
  estimatedTime?: string;
  summary?: string;
  // Derivado de project_steps (no almacenado directo)
  status?: ProjectStatus;
  totalSteps?: number;
  completedSteps?: number;
}

// ── DB row types (flat, no nested objects) ──
export interface ProjectRow {
  id: string;
  name: string;
  mode: string;
  description: string;
  created_at: string;
  updated_at: string;
  // V2 — añadidos via ALTER TABLE (pueden ser NULL en filas antiguas)
  difficulty: string | null;
  estimated_time: string | null;
  summary: string | null;
}

export interface PieceRow {
  id: string;
  project_id: string;
  width: number;
  height: number;
  quantity: number;
  thickness: number;
}

export interface MaterialRow {
  id: string;
  project_id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface OptimizationRow {
  id: string;
  project_id: string;
  board_width: number;
  board_height: number;
  total_boards: number;
  waste_percentage: number;
  efficiency: number;
  created_at: string;
}

export interface ShopOptionRow {
  id: string;
  project_id: string;
  store_name: string;
  type: string;
  price: number;
  delivery_time: string;
  score: number;
}

// ── Comparison ──
export interface ComparisonResult {
  ranked: StoreOption[];
  best: StoreOption | null;
  cheapest: StoreOption | null;
  fastest: StoreOption | null;
  recommendation?: string;
}

// ── Full Project Result (orquestador) ──
export interface FullDIYResult {
  project: DIYResult;
  stores: StoreOption[];
  comparison: ComparisonResult;
}

export interface FullProResult {
  projectName: string;
  optimization: OptimizationResult;
  materials: Material[];
  stores: StoreOption[];
  comparison: ComparisonResult;
}

// ── User Settings (MMKV) ──
export interface UserSettings {
  selectedMode: 'diy' | 'pro';
  lastProjectId: string | null;
  userUnits: 'cm' | 'mm' | 'in';
  hasSeenOnboarding: boolean;
}

// ── Parametric Generator ──
// Plantillas paramétricas: el usuario introduce medidas → se genera
// despiece (Piece[]) listo para el optimizador de cortes.
export type ParametricTemplateId =
  | 'shelf'
  | 'table'
  | 'drawer'
  | 'cabinet'
  | 'bench'
  | 'box';

// Piezas de madera maciza (listones / tacos) que no van al optimizador
// de cortes 2D sino al pedido de material lineal.
export interface LumberPiece {
  name: string;
  section: string;   // ej. "6×6cm" o "4×8cm"
  length: number;    // cm
  quantity: number;
}

export interface ParametricOutput {
  pieces: Piece[];                 // tableros → optimizador 2D
  lumberPieces?: LumberPiece[];    // listones macizos → compra lineal
  summary: string;
  notes: string[];
  warnings: string[];
}

export interface ShelfGeneratorParams {
  width: number;          // cm — ancho exterior
  height: number;         // cm — alto exterior
  depth: number;          // cm — fondo
  numShelves: number;     // baldas interiores (sin contar techo ni base)
  thickness: number;      // mm — grosor tablero principal (16/19/25)
  hasBack: boolean;
  backThickness: number;  // mm — grosor trasero (normalmente 4)
}

export interface TableGeneratorParams {
  length: number;         // cm — largo de la mesa
  width: number;          // cm — ancho (fondo)
  height: number;         // cm — alto total
  legSection: number;     // cm — sección cuadrada de pata (ej 6 = 6×6cm)
  topThickness: number;   // mm — grosor tablero superior
  hasApron: boolean;      // faldón de refuerzo bajo el tablero
  apronHeight: number;    // cm — altura del faldón
  hasLowerShelf: boolean; // balda inferior entre patas
}
