import { getDatabase } from './database';
import { Piece, PieceRow } from '../models';
import { generateId } from './utils';

function rowToPiece(row: PieceRow): Piece {
  return {
    id: row.id,
    projectId: row.project_id,
    width: row.width,
    height: row.height,
    quantity: row.quantity,
    thickness: row.thickness,
  };
}

export async function createPiece(projectId: string, piece: Piece): Promise<string> {
  const db = await getDatabase();
  const id = generateId();

  await db.runAsync(
    'INSERT INTO pieces (id, project_id, width, height, quantity, thickness) VALUES (?, ?, ?, ?, ?, ?)',
    id, projectId, piece.width, piece.height, piece.quantity, piece.thickness ?? 18
  );

  return id;
}

export async function createPieces(projectId: string, pieces: Piece[]): Promise<void> {
  const db = await getDatabase();
  for (const piece of pieces) {
    const id = generateId();
    await db.runAsync(
      'INSERT INTO pieces (id, project_id, width, height, quantity, thickness) VALUES (?, ?, ?, ?, ?, ?)',
      id, projectId, piece.width, piece.height, piece.quantity, piece.thickness ?? 18
    );
  }
}

export async function getPiecesByProject(projectId: string): Promise<Piece[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<PieceRow>(
    'SELECT * FROM pieces WHERE project_id = ?',
    projectId
  );
  return rows.map(rowToPiece);
}

export async function deletePiecesByProject(projectId: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM pieces WHERE project_id = ?', projectId);
}
