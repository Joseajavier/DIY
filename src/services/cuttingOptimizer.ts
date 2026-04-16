// ═══════════════════════════════════════════════════════════════
// CUTTING OPTIMIZER — algoritmo de corte 2D con coordenadas reales
// ───────────────────────────────────────────────────────────────
// Usa "Next Fit Shelf" para asignar posiciones X,Y a cada pieza,
// permitiendo renderizar un diagrama visual del tablero.
// ═══════════════════════════════════════════════════════════════

import { Piece, PlacedPiece, CutResult, OptimizationResult } from '../models';

// ── Internals ─────────────────────────────────────────────────

interface RawPiece {
  width: number;
  height: number;
  label: string;
  globalIndex: number; // used for color rotation
}

interface Shelf {
  y: number;
  height: number; // tallest piece on this shelf
  usedX: number;
}

/**
 * Tries to pack all rawPieces onto a single board.
 * Returns placed pieces (with x,y) and unplaced remainder.
 */
function packBoard(
  pieces: RawPiece[],
  boardWidth: number,
  boardHeight: number
): { placed: PlacedPiece[]; unplaced: RawPiece[]; usedArea: number } {
  const placed: PlacedPiece[] = [];
  const unplaced: RawPiece[] = [];
  const shelves: Shelf[] = [];
  let nextShelfY = 0;

  for (const piece of pieces) {
    // Try both orientations (normal + rotated 90°)
    const orientations: { w: number; h: number; rot: boolean }[] = [
      { w: piece.width, h: piece.height, rot: false },
      { w: piece.height, h: piece.width, rot: true },
    ].filter((o) => o.w <= boardWidth && o.h <= boardHeight);

    if (orientations.length === 0) {
      // Piece is too large for this board size — place anyway on its own board
      unplaced.push(piece);
      continue;
    }

    let wasPlaced = false;

    // ① Try fitting in an existing shelf (any orientation)
    for (const shelf of shelves) {
      if (wasPlaced) break;
      for (const { w, h, rot } of orientations) {
        if (shelf.usedX + w <= boardWidth && h <= shelf.height) {
          placed.push({
            x: shelf.usedX,
            y: shelf.y,
            width: w,
            height: h,
            label: piece.label,
            rotated: rot,
            colorIndex: piece.globalIndex,
          });
          shelf.usedX += w;
          wasPlaced = true;
          break;
        }
      }
    }

    if (wasPlaced) continue;

    // ② Open a new shelf
    const { w, h, rot } = orientations[0];
    if (nextShelfY + h <= boardHeight) {
      shelves.push({ y: nextShelfY, height: h, usedX: w });
      placed.push({
        x: 0,
        y: nextShelfY,
        width: w,
        height: h,
        label: piece.label,
        rotated: rot,
        colorIndex: piece.globalIndex,
      });
      nextShelfY += h;
    } else {
      // Board is full — defer to next board
      unplaced.push(piece);
    }
  }

  const usedArea = placed.reduce((sum, p) => sum + p.width * p.height, 0);
  return { placed, unplaced, usedArea };
}

// ── Public API ────────────────────────────────────────────────

/**
 * Optimizes the cutting layout using a Next Fit Shelf algorithm.
 * Each piece in the result has real x,y coordinates so a diagram
 * can be rendered directly.
 */
export function optimizeCuts(
  pieces: Piece[],
  boardWidth: number,
  boardHeight: number
): OptimizationResult {
  // Expand by quantity and flatten to raw pieces
  const allPieces: RawPiece[] = [];
  let globalIndex = 0;
  for (const piece of pieces) {
    for (let i = 0; i < piece.quantity; i++) {
      allPieces.push({
        width: piece.width,
        height: piece.height,
        label: piece.name
          ? `${piece.name}${piece.quantity > 1 ? ` (${i + 1}/${piece.quantity})` : ''}`
          : `${piece.width}×${piece.height}`,
        globalIndex: globalIndex,
      });
    }
    globalIndex++;
  }

  // Sort by area descending (largest piece first = better packing)
  allPieces.sort((a, b) => b.width * b.height - a.width * a.height);

  // Pack board by board until all pieces are placed
  const cutResults: CutResult[] = [];
  let remaining: RawPiece[] = allPieces;
  const boardArea = boardWidth * boardHeight;

  let safetyCount = 0;
  while (remaining.length > 0 && safetyCount < 100) {
    safetyCount++;
    const { placed, unplaced, usedArea } = packBoard(
      remaining,
      boardWidth,
      boardHeight
    );

    if (placed.length === 0) {
      // Piece(s) too large — force them onto individual boards
      const oversized = unplaced;
      for (const p of oversized) {
        cutResults.push({
          boardIndex: cutResults.length,
          pieces: [{ x: 0, y: 0, width: p.width, height: p.height, label: p.label, colorIndex: p.globalIndex }],
          wastePercentage: Math.max(0, ((boardArea - p.width * p.height) / boardArea) * 100),
        });
      }
      break;
    }

    const wastePercentage = Math.max(
      0,
      ((boardArea - usedArea) / boardArea) * 100
    );
    cutResults.push({
      boardIndex: cutResults.length,
      pieces: placed,
      wastePercentage,
    });
    remaining = unplaced;
  }

  const totalBoardArea = cutResults.length * boardArea;
  const totalUsedArea = cutResults.reduce(
    (sum, b) => sum + b.pieces.reduce((s, p) => s + p.width * p.height, 0),
    0
  );
  const totalWaste =
    totalBoardArea > 0
      ? ((totalBoardArea - totalUsedArea) / totalBoardArea) * 100
      : 0;

  return {
    boards: cutResults,
    totalBoards: cutResults.length,
    totalWaste,
    efficiency: 100 - totalWaste,
    boardWidth,
    boardHeight,
  };
}
