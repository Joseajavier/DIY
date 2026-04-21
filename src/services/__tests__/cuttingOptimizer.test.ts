import { optimizeCuts } from '../cuttingOptimizer';
import { Piece } from '../../models';

function piece(
  name: string,
  width: number,
  height: number,
  quantity = 1,
): Piece {
  return { name, width, height, quantity };
}

describe('optimizeCuts', () => {
  test('devuelve 0 tableros si no hay piezas', () => {
    const result = optimizeCuts([], 2440, 1220);
    expect(result.totalBoards).toBe(0);
    expect(result.boards).toEqual([]);
    expect(result.boardWidth).toBe(2440);
    expect(result.boardHeight).toBe(1220);
  });

  test('coloca una única pieza en (0,0) en un solo tablero', () => {
    const result = optimizeCuts([piece('lateral', 500, 300)], 2440, 1220);
    expect(result.totalBoards).toBe(1);
    expect(result.boards[0].pieces).toHaveLength(1);
    expect(result.boards[0].pieces[0]).toMatchObject({
      x: 0,
      y: 0,
      width: 500,
      height: 300,
      label: 'lateral',
    });
  });

  test('expande la cantidad: 3 piezas iguales ⇒ 3 placed pieces', () => {
    const result = optimizeCuts(
      [piece('estante', 400, 300, 3)],
      2440,
      1220,
    );
    const totalPlaced = result.boards.reduce(
      (sum, b) => sum + b.pieces.length,
      0,
    );
    expect(totalPlaced).toBe(3);
  });

  test('etiqueta piezas con (i/total) cuando quantity > 1', () => {
    const result = optimizeCuts(
      [piece('estante', 400, 300, 3)],
      2440,
      1220,
    );
    const labels = result.boards.flatMap((b) =>
      b.pieces.map((p) => p.label),
    );
    expect(labels).toContain('estante (1/3)');
    expect(labels).toContain('estante (2/3)');
    expect(labels).toContain('estante (3/3)');
  });

  test('las piezas colocadas no se superponen entre sí', () => {
    const result = optimizeCuts(
      [piece('A', 600, 400, 4), piece('B', 500, 300, 2)],
      2440,
      1220,
    );
    for (const board of result.boards) {
      const placed = board.pieces;
      for (let i = 0; i < placed.length; i++) {
        for (let j = i + 1; j < placed.length; j++) {
          const a = placed[i];
          const b = placed[j];
          const overlapX = a.x < b.x + b.width && b.x < a.x + a.width;
          const overlapY = a.y < b.y + b.height && b.y < a.y + a.height;
          expect(overlapX && overlapY).toBe(false);
        }
      }
    }
  });

  test('ninguna pieza sale de los límites del tablero', () => {
    const result = optimizeCuts(
      [piece('A', 800, 600, 3), piece('B', 500, 400, 5)],
      2440,
      1220,
    );
    for (const board of result.boards) {
      for (const p of board.pieces) {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.x + p.width).toBeLessThanOrEqual(2440);
        expect(p.y + p.height).toBeLessThanOrEqual(1220);
      }
    }
  });

  test('eficiencia + merma suman ~100%', () => {
    const result = optimizeCuts(
      [piece('A', 600, 400, 4)],
      2440,
      1220,
    );
    expect(result.efficiency + result.totalWaste).toBeCloseTo(100, 5);
  });

  test('kerf reserva espacio: el mismo conjunto ocupa más con kerf > 0', () => {
    const pieces = [piece('A', 600, 400, 4), piece('B', 500, 300, 3)];
    const withoutKerf = optimizeCuts(pieces, 2440, 1220, 0);
    const withKerf = optimizeCuts(pieces, 2440, 1220, 5);
    // Con kerf = 5mm la eficiencia efectiva debe bajar (menos piezas caben
    // en el mismo hueco) o permanecer igual; nunca debe subir.
    expect(withKerf.efficiency).toBeLessThanOrEqual(withoutKerf.efficiency);
  });

  test('una pieza más grande que el tablero se coloca sola en su propio tablero', () => {
    const result = optimizeCuts(
      [piece('gigante', 3000, 1500)],
      2440,
      1220,
    );
    expect(result.totalBoards).toBe(1);
    expect(result.boards[0].pieces).toHaveLength(1);
  });
});
