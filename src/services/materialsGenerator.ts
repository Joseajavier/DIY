import { Material, Piece } from '../models';

export function generateMaterials(pieces: Piece[], totalBoards: number): Material[] {
  // Count total joints (each piece has ~4 edges that may join)
  const totalPieces = pieces.reduce((sum, p) => sum + p.quantity, 0);
  const estimatedJoints = totalPieces * 2; // average 2 joints per piece
  const screws = estimatedJoints * 8; // ~8 screws per joint

  const materials: Material[] = [
    {
      name: `Tablero melamina/aglomerado 244×122cm`,
      quantity: totalBoards,
      unit: 'ud',
    },
    {
      name: 'Tornillos confirmat 5×50mm',
      quantity: screws,
      unit: 'ud',
    },
    {
      name: 'Cola de carpintero',
      quantity: Math.max(1, Math.ceil(totalPieces / 10)),
      unit: 'botes',
    },
    {
      name: 'Tapones cubre-tornillos',
      quantity: screws,
      unit: 'ud',
    },
    {
      name: 'Cinta de canto',
      quantity: totalPieces * 2,
      unit: 'metros',
    },
  ];

  // Add brackets if many pieces
  if (totalPieces > 4) {
    materials.push({
      name: 'Escuadras de refuerzo',
      quantity: Math.ceil(totalPieces / 2),
      unit: 'ud',
    });
  }

  return materials;
}
