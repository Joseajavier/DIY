interface Piece { width: number; height: number; quantity: number; }
interface Material { name: string; quantity: number; unit: string; }

export function estimateMaterials(pieces: Piece[], totalBoards: number): Material[] {
  const totalPieces = pieces.reduce((s, p) => s + p.quantity, 0);
  const estimatedJoints = totalPieces * 2;
  const screws = estimatedJoints * 8;

  const materials: Material[] = [
    { name: 'Tablero melamina/aglomerado 244×122cm', quantity: totalBoards, unit: 'ud' },
    { name: 'Tornillos confirmat 5×50mm', quantity: screws, unit: 'ud' },
    { name: 'Cola de carpintero', quantity: Math.max(1, Math.ceil(totalPieces / 10)), unit: 'botes' },
    { name: 'Tapones cubre-tornillos', quantity: screws, unit: 'ud' },
    { name: 'Cinta de canto', quantity: totalPieces * 2, unit: 'metros' },
  ];

  if (totalPieces > 4) {
    materials.push({ name: 'Escuadras de refuerzo', quantity: Math.ceil(totalPieces / 2), unit: 'ud' });
  }

  return materials;
}
