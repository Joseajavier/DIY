import { Piece } from '../models';

export function validateProjectName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return 'El nombre es obligatorio';
  if (trimmed.length < 2) return 'El nombre debe tener al menos 2 caracteres';
  if (trimmed.length > 100) return 'El nombre es demasiado largo';
  return null;
}

export function validateDescription(desc: string): string | null {
  const trimmed = desc.trim();
  if (!trimmed) return 'La descripción es obligatoria';
  if (trimmed.length < 5) return 'Describe un poco más tu proyecto';
  return null;
}

export function validatePiece(piece: Piece): string | null {
  if (piece.width <= 0) return 'El ancho debe ser mayor que 0';
  if (piece.height <= 0) return 'El alto debe ser mayor que 0';
  if (piece.quantity <= 0) return 'La cantidad debe ser mayor que 0';
  if (piece.width > 1000) return 'El ancho es demasiado grande (max 1000cm)';
  if (piece.height > 1000) return 'El alto es demasiado grande (max 1000cm)';
  if (piece.quantity > 100) return 'Demasiadas piezas (max 100)';
  return null;
}

export function validatePieces(pieces: Piece[]): { valid: Piece[]; errors: string[] } {
  const valid: Piece[] = [];
  const errors: string[] = [];

  for (let i = 0; i < pieces.length; i++) {
    const p = pieces[i];
    if (p.width <= 0 && p.height <= 0 && p.quantity <= 0) continue; // empty row, skip
    const err = validatePiece(p);
    if (err) {
      errors.push(`Pieza ${i + 1}: ${err}`);
    } else {
      valid.push(p);
    }
  }

  if (valid.length === 0) {
    errors.push('Añade al menos una pieza con dimensiones válidas');
  }

  return { valid, errors };
}

export function validateBoardSize(width: number, height: number): string | null {
  if (width <= 0 || height <= 0) return 'El tablero debe tener dimensiones positivas';
  if (width > 500 || height > 500) return 'Tablero demasiado grande (max 500cm)';
  return null;
}
