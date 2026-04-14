import { Material, StoreOption } from '../models';

const STORE_CATALOG: Record<string, Omit<StoreOption, 'price'> & { priceMultiplier: number }> = {
  amazon: {
    name: 'Amazon',
    type: 'online',
    time: '1-2 días',
    score: 8,
    priceMultiplier: 1.0,
  },
  aliexpress: {
    name: 'AliExpress',
    type: 'online',
    time: '15-30 días',
    score: 6,
    priceMultiplier: 0.6,
  },
  leroymerlin: {
    name: 'Leroy Merlin',
    type: 'physical',
    time: 'Disponible hoy',
    score: 9,
    priceMultiplier: 1.15,
  },
  bricomart: {
    name: 'Bricomart',
    type: 'physical',
    time: 'Disponible hoy',
    score: 7,
    priceMultiplier: 0.85,
  },
  manomano: {
    name: 'ManoMano',
    type: 'online',
    time: '3-5 días',
    score: 7,
    priceMultiplier: 0.9,
  },
};

// Rough base prices per material type
function estimateBasePrice(materialName: string, quantity: number): number {
  const lower = materialName.toLowerCase();
  let unitPrice = 5; // default

  if (lower.includes('tablero') || lower.includes('madera')) unitPrice = 25;
  else if (lower.includes('tornillo') || lower.includes('confirmat')) unitPrice = 0.08;
  else if (lower.includes('cola')) unitPrice = 6;
  else if (lower.includes('barniz') || lower.includes('pintura') || lower.includes('aceite')) unitPrice = 12;
  else if (lower.includes('lija')) unitPrice = 1.5;
  else if (lower.includes('escuadra')) unitPrice = 2;
  else if (lower.includes('taco') || lower.includes('tirafondo')) unitPrice = 0.5;
  else if (lower.includes('cinta') || lower.includes('canto')) unitPrice = 1.2;
  else if (lower.includes('tapón') || lower.includes('tapon') || lower.includes('cubre')) unitPrice = 0.05;
  else if (lower.includes('panel') || lower.includes('contrachapado')) unitPrice = 18;
  else if (lower.includes('listón') || lower.includes('liston')) unitPrice = 8;

  return unitPrice * quantity;
}

export function getStoreRecommendations(materials: Material[]): StoreOption[] {
  const totalBasePrice = materials.reduce(
    (sum, mat) => sum + estimateBasePrice(mat.name, mat.quantity),
    0
  );

  return Object.values(STORE_CATALOG).map((store) => ({
    name: store.name,
    type: store.type,
    time: store.time,
    score: store.score,
    price: Math.round(totalBasePrice * store.priceMultiplier * 100) / 100,
  }));
}
