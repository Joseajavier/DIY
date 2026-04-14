import { Piece, CutResult, OptimizationResult } from '../models';

interface FlatPiece {
  width: number;
  height: number;
}

/**
 * Simple First Fit Decreasing (FFD) bin packing algorithm.
 * Sorts pieces by area (largest first) and packs them into boards.
 */
export function optimizeCuts(
  pieces: Piece[],
  boardWidth: number,
  boardHeight: number
): OptimizationResult {
  // Expand pieces by quantity
  const flatPieces: FlatPiece[] = [];
  for (const piece of pieces) {
    for (let i = 0; i < piece.quantity; i++) {
      // Try both orientations, pick the one that fits better
      const w = Math.min(piece.width, piece.height);
      const h = Math.max(piece.width, piece.height);
      flatPieces.push({ width: w, height: h });
    }
  }

  // Sort by area descending
  flatPieces.sort((a, b) => b.width * b.height - a.width * a.height);

  const boardArea = boardWidth * boardHeight;
  const boards: { pieces: FlatPiece[]; usedArea: number }[] = [];

  for (const piece of flatPieces) {
    const pieceArea = piece.width * piece.height;

    // Verify piece fits in a board at all
    const fitsNormal = piece.width <= boardWidth && piece.height <= boardHeight;
    const fitsRotated = piece.height <= boardWidth && piece.width <= boardHeight;

    if (!fitsNormal && !fitsRotated) {
      // Piece too large — put it alone (will show waste)
      boards.push({ pieces: [piece], usedArea: pieceArea });
      continue;
    }

    // Try to fit in existing board
    let placed = false;
    for (const board of boards) {
      if (board.usedArea + pieceArea <= boardArea) {
        board.pieces.push(piece);
        board.usedArea += pieceArea;
        placed = true;
        break;
      }
    }

    if (!placed) {
      boards.push({ pieces: [piece], usedArea: pieceArea });
    }
  }

  const totalUsedArea = boards.reduce((sum, b) => sum + b.usedArea, 0);
  const totalBoardArea = boards.length * boardArea;
  const totalWaste = ((totalBoardArea - totalUsedArea) / totalBoardArea) * 100;
  const efficiency = 100 - totalWaste;

  const cutResults: CutResult[] = boards.map((board, index) => ({
    boardIndex: index,
    pieces: board.pieces,
    wastePercentage: ((boardArea - board.usedArea) / boardArea) * 100,
  }));

  return {
    boards: cutResults,
    totalBoards: boards.length,
    totalWaste,
    efficiency,
  };
}
