interface Material { name: string; quantity: number; unit?: string; }

const STORES = [
  { name: 'Amazon', type: 'online' as const, time: '1-2 días', baseScore: 8, multiplier: 1.0 },
  { name: 'AliExpress', type: 'online' as const, time: '15-30 días', baseScore: 6, multiplier: 0.6 },
  { name: 'Leroy Merlin', type: 'physical' as const, time: 'Disponible hoy', baseScore: 9, multiplier: 1.15 },
  { name: 'Bricomart', type: 'physical' as const, time: 'Disponible hoy', baseScore: 7, multiplier: 0.85 },
  { name: 'ManoMano', type: 'online' as const, time: '3-5 días', baseScore: 7, multiplier: 0.9 },
];

function estimateBasePrice(name: string, qty: number): number {
  const l = name.toLowerCase();
  let unit = 5;
  if (l.includes('tablero') || l.includes('madera')) unit = 25;
  else if (l.includes('tornillo') || l.includes('confirmat')) unit = 0.08;
  else if (l.includes('cola')) unit = 6;
  else if (l.includes('barniz') || l.includes('pintura') || l.includes('aceite')) unit = 12;
  else if (l.includes('lija')) unit = 1.5;
  else if (l.includes('escuadra')) unit = 2;
  else if (l.includes('cinta') || l.includes('canto')) unit = 1.2;
  else if (l.includes('tapón') || l.includes('tapon') || l.includes('cubre')) unit = 0.05;
  return unit * qty;
}

export function compareStoreOptions(materials: Material[]) {
  const basePrice = materials.reduce((s, m) => s + estimateBasePrice(m.name, m.quantity), 0);

  const options = STORES.map((store) => ({
    name: store.name,
    type: store.type,
    price: Math.round(basePrice * store.multiplier * 100) / 100,
    time: store.time,
    score: store.baseScore,
  }));

  const maxP = Math.max(...options.map((o) => o.price));
  const minP = Math.min(...options.map((o) => o.price));
  const range = maxP - minP || 1;

  const deliveryScore: Record<string, number> = {
    'Disponible hoy': 10, '1-2 días': 8, '3-5 días': 6, '15-30 días': 2,
  };

  const ranked = options.map((o) => {
    const pScore = ((maxP - o.price) / range) * 10;
    const dScore = deliveryScore[o.time] ?? 5;
    const composite = pScore * 0.4 + dScore * 0.3 + o.score * 0.3;
    return { ...o, score: Math.round(composite * 10) / 10 };
  }).sort((a, b) => b.score - a.score);

  const cheapest = [...options].sort((a, b) => a.price - b.price)[0];
  const fastest = [...options].sort((a, b) => (deliveryScore[b.time] ?? 5) - (deliveryScore[a.time] ?? 5))[0];

  return {
    ranked,
    best: ranked[0],
    cheapest,
    fastest,
    recommendation: `${ranked[0].name} ofrece el mejor equilibrio. Más barato: ${cheapest.name}. Más rápido: ${fastest.name}.`,
  };
}
