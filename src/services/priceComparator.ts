import { StoreOption } from '../models';

export interface ComparisonResult {
  ranked: StoreOption[];
  best: StoreOption | null;
  cheapest: StoreOption | null;
  fastest: StoreOption | null;
}

/**
 * Ranks stores by a composite score that weighs:
 * - Price (40%)
 * - Delivery speed (30%)
 * - Base score (30%)
 */
export function comparePrices(stores: StoreOption[]): ComparisonResult {
  if (stores.length === 0) {
    return { ranked: [], best: null, cheapest: null, fastest: null };
  }

  const maxPrice = Math.max(...stores.map((s) => s.price));
  const minPrice = Math.min(...stores.map((s) => s.price));

  const deliveryOrder: Record<string, number> = {
    'Disponible hoy': 10,
    '1-2 días': 8,
    '3-5 días': 6,
    '5-7 días': 4,
    '15-30 días': 2,
  };

  const scored = stores.map((store) => {
    // Normalize price: cheaper = higher score (0-10)
    const priceRange = maxPrice - minPrice || 1;
    const priceScore = ((maxPrice - store.price) / priceRange) * 10;

    // Delivery score
    const deliveryScore = deliveryOrder[store.time] ?? 5;

    // Composite
    const composite =
      priceScore * 0.4 + deliveryScore * 0.3 + store.score * 0.3;

    return {
      ...store,
      score: Math.round(composite * 10) / 10,
    };
  });

  // Sort by composite score descending
  scored.sort((a, b) => b.score - a.score);

  const cheapest = [...stores].sort((a, b) => a.price - b.price)[0];
  const fastest = [...stores].sort(
    (a, b) => (deliveryOrder[b.time] ?? 5) - (deliveryOrder[a.time] ?? 5)
  )[0];

  return {
    ranked: scored,
    best: scored[0],
    cheapest,
    fastest,
  };
}
