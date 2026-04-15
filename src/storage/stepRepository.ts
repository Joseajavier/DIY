// ═══════════════════════════════════════════════════════════════
// STEP REPOSITORY — pasos persistentes de un proyecto DIY
// ───────────────────────────────────────────────────────────────
// Cada proyecto puede tener N pasos (de la generación IA o local).
// Los pasos se marcan como completados con checkboxes y se guarda
// completed_at para timeline.
// Asociado a tabla `project_steps` (migration V2).
// ═══════════════════════════════════════════════════════════════

import { getDatabase } from './database';
import { DIYStep, ProjectStep, ProjectStepRow } from '../models';
import { generateId, nowISO } from './utils';

function rowToStep(row: ProjectStepRow): ProjectStep {
  return {
    id: row.id,
    projectId: row.project_id,
    number: row.step_number,
    title: row.title,
    description: row.description,
    completed: row.completed === 1,
    completedAt: row.completed_at ?? undefined,
    notes: row.notes,
  };
}

/** Crea N pasos asociados a un proyecto (todos sin completar). */
export async function createSteps(
  projectId: string,
  steps: DIYStep[],
): Promise<void> {
  const db = await getDatabase();
  const now = nowISO();
  for (const step of steps) {
    const id = generateId();
    await db.runAsync(
      'INSERT INTO project_steps (id, project_id, step_number, title, description, completed, completed_at, notes, created_at) VALUES (?, ?, ?, ?, ?, 0, NULL, ?, ?)',
      id,
      projectId,
      step.number,
      step.title,
      step.description,
      '',
      now,
    );
  }
}

/** Devuelve los pasos de un proyecto ordenados por número. */
export async function getStepsByProject(
  projectId: string,
): Promise<ProjectStep[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<ProjectStepRow>(
    'SELECT * FROM project_steps WHERE project_id = ? ORDER BY step_number ASC',
    projectId,
  );
  return rows.map(rowToStep);
}

/**
 * Toggle del estado completed de un paso. Devuelve el nuevo estado.
 * Si pasa a completed → registra completed_at. Si vuelve a pending → null.
 */
export async function toggleStep(stepId: string): Promise<boolean> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{ completed: number }>(
    'SELECT completed FROM project_steps WHERE id = ?',
    stepId,
  );
  if (!row) return false;
  const newCompleted = row.completed === 1 ? 0 : 1;
  await db.runAsync(
    'UPDATE project_steps SET completed = ?, completed_at = ? WHERE id = ?',
    newCompleted,
    newCompleted ? nowISO() : null,
    stepId,
  );
  return newCompleted === 1;
}

/** Actualiza la nota libre de un paso. */
export async function updateStepNotes(
  stepId: string,
  notes: string,
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'UPDATE project_steps SET notes = ? WHERE id = ?',
    notes,
    stepId,
  );
}

/** Devuelve { total, completed } de un proyecto. */
export async function getProjectProgress(
  projectId: string,
): Promise<{ total: number; completed: number }> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{ total: number; completed: number }>(
    'SELECT COUNT(*) as total, COALESCE(SUM(completed), 0) as completed FROM project_steps WHERE project_id = ?',
    projectId,
  );
  return { total: row?.total ?? 0, completed: row?.completed ?? 0 };
}

/** Borra todos los pasos de un proyecto (al regenerar, etc.). */
export async function deleteStepsByProject(projectId: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM project_steps WHERE project_id = ?', projectId);
}
