import { getDatabase } from './database';
import { Project, ProjectRow } from '../models';
import { generateId, nowISO } from './utils';

function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    mode: row.mode as 'diy' | 'pro',
    description: row.description,
    pieces: [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createProject(
  name: string,
  mode: 'diy' | 'pro',
  description = ''
): Promise<string> {
  const db = await getDatabase();
  const id = generateId();
  const now = nowISO();

  await db.runAsync(
    'INSERT INTO projects (id, name, mode, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    id, name, mode, description, now, now
  );

  return id;
}

export async function getProjects(): Promise<Project[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<ProjectRow>(
    'SELECT * FROM projects ORDER BY updated_at DESC'
  );
  return rows.map(rowToProject);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<ProjectRow>(
    'SELECT * FROM projects WHERE id = ?',
    id
  );
  return row ? rowToProject(row) : null;
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
