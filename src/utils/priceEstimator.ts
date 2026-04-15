// ═══════════════════════════════════════════════════════════════
// PRICE ESTIMATOR — precios estimados por tienda.
// ───────────────────────────────────────────────────────────────
// No tenemos API real de precios, así que estimamos de forma
// DETERMINISTA a partir del rango del producto (priceMin/priceMax)
// y del tipo de tienda (marketplace/diy/pro):
//
//   • marketplace (Amazon)        → 0.90 - 0.97  (suele más barato)
//   • generalist (hipermercado)   → 0.93 - 1.00
//   • diy  (Leroy/Bricodepot…)    → 0.98 - 1.08  (precio base)
//   • pro  (Ferretería online)    → 1.08 - 1.20  (premium)
//
// Además metemos una variación determinista por retailer.id (hash
// simple) para que dentro del mismo kind cada tienda tenga un
// precio distinto, pero estable entre renders.
//
// ⚠ Son ESTIMACIONES. La UI debe marcarlo claramente para no
// engañar al usuario. El botón lleva al buscador real de la tienda.
// ═══════════════════════════════════════════════════════════════

import { Retailer, RetailerKind } from '../data/retailers';

// Rango de multiplicadores por tipo de tienda.
const KIND_RANGE: Record<RetailerKind, [number, number]> = {
  marketplace: [0.9, 0.97],
  generalist: [0.93, 1.0],
  diy: [0.98, 1.08],
  pro: [1.08, 1.2],
};

// Hash determinista (djb2 reducido a [0, 1]).
function hash01(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  // Reducir a [0, 1]
  return ((h >>> 0) % 10000) / 10000;
}

/**
 * Estima el precio de un producto para un retailer concreto.
 * Devuelve un número entero (redondeado al euro).
 */
export function estimatePrice(
  priceMin: number,
  priceMax: number,
  retailer: Retailer,
): number {
  const base = (priceMin + priceMax) / 2;
  const [lo, hi] = KIND_RANGE[retailer.kind] ?? [1, 1];
  const t = hash01(retailer.id);
  const mult = lo + (hi - lo) * t;
  const raw = base * mult;
  return Math.round(raw);
}

export type PriceRow = {
  retailer: Retailer;
  price: number;
  isCheapest: boolean;
  savingsVsMax: number; // % de ahorro vs el más caro
};

/**
 * Devuelve la lista de retailers ordenada por precio ascendente,
 * con el flag isCheapest en el primero y el ahorro vs el más caro.
 */
export function priceComparison(
  priceMin: number,
  priceMax: number,
  retailers: Retailer[],
): PriceRow[] {
  const rows = retailers.map((r) => ({
    retailer: r,
    price: estimatePrice(priceMin, priceMax, r),
    isCheapest: false,
    savingsVsMax: 0,
  }));
  rows.sort((a, b) => a.price - b.price);
  if (rows.length === 0) return rows;
  const max = rows[rows.length - 1].price;
  rows[0].isCheapest = true;
  for (const row of rows) {
    row.savingsVsMax =
      max > 0 ? Math.round(((max - row.price) / max) * 100) : 0;
  }
  return rows;
}
