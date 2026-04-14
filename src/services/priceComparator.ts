import { StoreOption, ComparisonResult } from '../models';

const DELIVERY_SCORE: Record<string, number> = {
  'Disponible hoy': 10,
  '1-2 días': 8,
  '3-5 días': 6,
  '5-7 días': 4,
  '15-30 días': 2,
};

/**
 * Ranks stores by composite score:
 * - Price (40%) — cheaper = higher
 * - Delivery (30%) — faster = higher
 * - Base score (30%)
 */
export function comparePrices(stores: StoreOption[]): ComparisonResult {
  if (!stores.length) {
    return { ranked: [], best: null, cheapest: null, fastest: null };
  }

  const maxPrice = Math.max(...stores.map((s) => s.price));
  const minPrice = Math.min(...stores.map((s) => s.price));
  const priceRange = maxPrice - minPrice || 1;

  const scored = stores.map((store) => {
    const priceScore = ((maxPrice - store.price) / priceRange) * 10;
    const deliveryScore = DELIVERY_SCORE[store.time] ?? 5;
    const composite = priceScore * 0.4 + deliveryScore * 0.3 + store.score * 0.3;

    return { ...store, score: Math.round(composite * 10) / 10 };
  });

  scored.sort((a, b) => b.score - a.score);

  const cheapest = [...stores].sort((a, b) => a.price - b.price)[0];
  const fastest = [...stores].sort(
    (a, b) => (DELIVERY_SCORE[b.time] ?? 5) - (DELIVERY_SCORE[a.time] ?? 5)
  )[0];

  const best = scored[0];

  // Generate recommendation text
  let recommendation = '';
  if (best) {
    if (best.name === cheapest.name && best.name === fastest.name) {
      recommendation = `${best.name} es la mejor opción: el más barato y el más rápido.`;
    } else if (best.name === cheapest.name) {
      recommendation = `${best.name} ofrece el mejor precio. Si necesitas rapidez, ${fastest.name} entrega antes.`;
    } else if (best.name === fastest.name) {
      recommendation = `${best.name} es la opción más rápida. Si buscas ahorrar, ${cheapest.name} es más económico.`;
    } else {
      recommendation = `${best.name} ofrece el mejor equilibrio calidad-precio-rapidez. Más barato: ${cheapest.name}. Más rápido: ${fastest.name}.`;
    }
  }

  return { ranked: scored, best, cheapest, fastest, recommendation };
}
