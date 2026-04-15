import { getDatabase } from './database';
import {
  Project,
  ProjectRow,
  ProjectDifficulty,
  ProjectStatus,
} from '../models';
import { generateId, nowISO } from './utils';

/** Fila enriquecida con count de pasos (left join). */
type ProjectRowWithProgress = ProjectRow & {
  total_steps: number | null;
  completed_steps: number | null;
};

function deriveStatus(total: number, completed: number): ProjectStatus {
  if (total === 0) return 'pending';
  if (completed >= total) return 'completed';
  if (completed > 0) return 'in_progress';
  return 'pending';
}

function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    mode: row.mode as 'diy' | 'pro',
    description: row.description,
    pieces: [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    difficulty: (row.difficulty ?? undefined) as ProjectDifficulty | undefined,
    estimatedTime: row.estimated_time ?? undefined,
    summary: row.summary ?? undefined,
  };
}

function rowToProjectWithProgress(row: ProjectRowWithProgress): Project {
  const total = row.total_steps ?? 0;
  const completed = row.completed_steps ?? 0;
  return {
    ...rowToProject(row),
    totalSteps: total,
    completedSteps: completed,
    status: deriveStatus(total, completed),
  };
}

/**
 * Crea un proyecto. Acepta metadata DIY opcional (difficulty / estimated_time
 * / summary) que viene del resultado de la generación (IA o local).
 */
export async function createProject(
  name: string,
  mode: 'diy' | 'pro',
  description = '',
  metadata?: {
    difficulty?: ProjectDifficulty;
    estimatedTime?: string;
    summary?: string;
  },
): Promise<string> {
  const db = await getDatabase();
  const id = generateId();
  const now = nowISO();

  await db.runAsync(
    'INSERT INTO projects (id, name, mode, description, difficulty, estimated_time, summary, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    id,
    name,
    mode,
    description,
    metadata?.difficulty ?? null,
    metadata?.estimatedTime ?? null,
    metadata?.summary ?? null,
    now,
    now,
  );

  return id;
}

export async function getProjects(): Promise<Project[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<ProjectRowWithProgress>(
    `SELECT p.*,
            s.total AS total_steps,
            s.completed AS completed_steps
       FROM projects p
       LEFT JOIN (
         SELECT project_id,
                COUNT(*) AS total,
                COALESCE(SUM(completed), 0) AS completed
           FROM project_steps
          GROUP BY project_id
       ) s ON s.project_id = p.id
      ORDER BY p.updated_at DESC`,
  );
  return rows.map(rowToProjectWithProgress);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<ProjectRowWithProgress>(
    `SELECT p.*,
            s.total AS total_steps,
            s.completed AS completed_steps
       FROM projects p
       LEFT JOIN (
         SELECT project_id,
                COUNT(*) AS total,
                COALESCE(SUM(completed), 0) AS completed
           FROM project_steps
          GROUP BY project_id
       ) s ON s.project_id = p.id
      WHERE p.id = ?`,
    id,
  );
  return row ? rowToProjectWithProgress(row) : null;
}

export async function updateProject(
  id: string,
  data: Partial<Pick<Project, 'name' | 'mode' | 'description'>>
): Promise<void> {
  const db = await getDatabase();
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (data.name !== undefined) { fields.push('name = ?'); values.push(data.name); }
  if (data.mode !== undefined) { fields.push('mode = ?'); values.push(data.mode); }
  if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description); }

  if (fields.length === 0) return;

  fields.push('updated_at = ?');
  values.push(nowISO());
  values.push(id);

  await db.runAsync(
    `UPDATE projects SET ${fields.join(', ')} WHERE id = ?`,
    ...values
  );
}

export async function deleteProject(id: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM projects WHERE id = ?', id);
}
