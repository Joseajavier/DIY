import { getDatabase } from './database';
import { Material, MaterialRow } from '../models';
import { generateId } from './utils';

function rowToMaterial(row: MaterialRow): Material {
  return {
    id: row.id,
    projectId: row.project_id,
    name: row.name,
    quantity: row.quantity,
    unit: row.unit,
  };
}

export async function createMaterial(projectId: string, material: Material): Promise<string> {
  const db = await getDatabase();
  const id = generateId();

  await db.runAsync(
    'INSERT INTO materials (id, project_id, name, quantity, unit) VALUES (?, ?, ?, ?, ?)',
    id, projectId, material.name, material.quantity, material.unit ?? 'ud'
  );

  return id;
}

export async function createMaterials(projectId: string, materials: Material[]): Promise<void> {
  const db = await getDatabase();
  for (const mat of materials) {
    const id = generateId();
    await db.runAsync(
      'INSERT INTO materials (id, project_id, name, quantity, unit) VALUES (?, ?, ?, ?, ?)',
      id, projectId, mat.name, mat.quantity, mat.unit ?? 'ud'
    );
  }
}

export async function getMaterialsByProject(projectId: string): Promise<Material[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<MaterialRow>(
    'SELECT * FROM materials WHERE project_id = ?',
    projectId
  );
  return rows.map(rowToMaterial);
}

export async function deleteMaterialsByProject(projectId: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM materials WHERE project_id = ?', projectId);
}
