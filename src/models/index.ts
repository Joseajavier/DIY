export interface Piece {
  width: number;
  height: number;
  quantity: number;
}

export interface Material {
  name: string;
  quantity: number;
  unit?: string;
}

export interface Tool {
  name: string;
  optional?: boolean;
}

export interface StoreOption {
  name: string;
  type: 'online' | 'physical';
  price: number;
  time: string;
  score: number;
}

export interface DIYStep {
  number: number;
  title: string;
  description: string;
}

export interface DIYResult {
  projectName: string;
  steps: DIYStep[];
  materials: Material[];
  tools: Tool[];
}

export interface CutResult {
  boardIndex: number;
  pieces: { width: number; height: number }[];
  wastePercentage: number;
}

export interface OptimizationResult {
  boards: CutResult[];
  totalBoards: number;
  totalWaste: number;
  efficiency: number;
}

export interface Project {
  id: string;
  name: string;
  mode: 'diy' | 'pro';
  pieces: Piece[];
  description?: string;
}
