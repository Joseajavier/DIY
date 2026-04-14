import { getDatabase } from './database';
import { OptimizationRow } from '../models';
import { generateId, nowISO } from './utils';

export interface OptimizationData {
  projectId: string;
  boardWidth: number;
  boardHeight: number;
  totalBoards: number;
  wastePercentage: number;
  efficiency: number;
}

export async function saveOptimization(data: OptimizationData): Promise<string> {
  const db = await getDatabase();
  const id = generateId();

  // Delete previous optimization for this project
  await db.runAsync(
    'DELETE FROM optimizations WHERE project_id = ?',
    data.projectId
  );

  await db.runAsync(
    'INSERT INTO optimizations (id, project_id, board_width, board_height, total_boards, waste_percentage, efficiency, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    id, data.projectId, data.boardWidth, data.boardHeight, data.totalBoards, data.wastePercentage, data.efficiency, nowISO()
  );

  return id;
}

export async function getOptimizationByProject(projectId: string): Promise<OptimizationRow | null> {
  const db = await getDatabase();
  return await db.getFirstAsync<OptimizationRow>(
    'SELECT * FROM optimizations WHERE project_id = ? ORDER BY created_at DESC LIMIT 1',
    projectId
  );
}
