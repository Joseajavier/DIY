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

export async function updatePiece(id: string, piece: Partial<Piece>): Promise<void> {
  const db = await getDatabase();
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (piece.width !== undefined) { fields.push('width = ?'); values.push(piece.width); }
  if (piece.height !== undefined) { fields.push('height = ?'); values.push(piece.height); }
  if (piece.quantity !== undefined) { fields.push('quantity = ?'); values.push(piece.quantity); }
  if (piece.thickness !== undefined) { fields.push('thickness = ?'); values.push(piece.thickness); }

  if (fields.length === 0) return;
  values.push(id);
  await db.runAsync(`UPDATE pieces SET ${fields.join(', ')} WHERE id = ?`, ...values);
}

export async function deletePiece(id: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM pieces WHERE id = ?', id);
}

export async function deletePiecesByProject(projectId: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM pieces WHERE project_id = ?', projectId);
}
