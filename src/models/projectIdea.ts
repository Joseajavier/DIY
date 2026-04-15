// ═══════════════════════════════════════════════════════════════
// PROJECT IDEA — idea de proyecto DIY con herramientas requeridas.
// ───────────────────────────────────────────────────────────────
// Diferencia con `projects.ts`:
//   • projects.ts → proyectos GUARDADOS del usuario (con estado)
//   • projectIdea.ts → BIBLIOTECA estática de ideas inspiracionales
// ═══════════════════════════════════════════════════════════════

export type ProjectDifficulty = 'easy' | 'medium' | 'hard';
export type ProjectCategory =
  | 'furniture'
  | 'storage'
  | 'decor'
  | 'outdoor'
  | 'kids'
  | 'kitchen'
  | 'workshop'
  | 'repair';

export type ProjectIdea = {
  id: string;
  title: string;
  /** Short pitch shown on the card (1 line). */
  tagline: string;
  /** Longer description shown on detail (3-5 sentences). */
  description: string;
  category: ProjectCategory;
  difficulty: ProjectDifficulty;
  /** Estimated total time in hours (active work). */
  timeHours: number;
  /** Rough material cost in EUR (low-high range). */
  costMinEur: number;
  costMaxEur: number;
  /** Tool TYPE IDs required (must match IDs from TOOL_TYPES). */
  toolTypeIds: string[];
  /** Optional: list of materials (high level) in Spanish. */
  materials: string[];
  /** Optional emoji that represents the project. */
  emoji?: string;
  /** Optional tags for search. */
  tags: string[];
};
