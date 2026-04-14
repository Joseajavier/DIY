interface Piece { width: number; height: number; quantity: number; }
interface FlatPiece { width: number; height: number; }

export function optimizeCuts(pieces: Piece[], boardWidth: number, boardHeight: number) {
  const flatPieces: FlatPiece[] = [];
  for (const piece of pieces) {
    for (let i = 0; i < piece.quantity; i++) {
      flatPieces.push({
        width: Math.min(piece.width, piece.height),
        height: Math.max(piece.width, piece.height),
      });
    }
  }

  flatPieces.sort((a, b) => b.width * b.height - a.width * a.height);

  const boardArea = boardWidth * boardHeight;
  const boards: { pieces: FlatPiece[]; usedArea: number }[] = [];

  for (const piece of flatPieces) {
    const pieceArea = piece.width * piece.height;
    const fitsNormal = piece.width <= boardWidth && piece.height <= boardHeight;
    const fitsRotated = piece.height <= boardWidth && piece.width <= boardHeight;

    if (!fitsNormal && !fitsRotated) {
      boards.push({ pieces: [piece], usedArea: pieceArea });
      continue;
    }

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

  const totalUsedArea = boards.reduce((s, b) => s + b.usedArea, 0);
  const totalBoardArea = boards.length * boardArea;
  const totalWaste = ((totalBoardArea - totalUsedArea) / totalBoardArea) * 100;

  return {
    totalBoards: boards.length,
    efficiency: +(100 - totalWaste).toFixed(1),
    wastePercentage: +totalWaste.toFixed(1),
    boards: boards.map((b, i) => ({
      boardIndex: i + 1,
      pieces: b.pieces,
      wastePercentage: +((boardArea - b.usedArea) / boardArea * 100).toFixed(1),
    })),
  };
}
