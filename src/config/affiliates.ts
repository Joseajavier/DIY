// ═══════════════════════════════════════════════════════════════
// AFFILIATE CONFIG — tags de afiliado por programa.
// ───────────────────────────────────────────────────────────────
// El tag se añade al urlTemplate de cada retailer en retailers.ts
// para que las búsquedas que abre el usuario incluyan nuestro tag
// y generen comisión si compra.
//
// IMPORTANTE: el tag de Amazon España lleva sufijo "-21" que Amazon
// añade automáticamente en el dashboard. Aquí debe estar COMPLETO
// (con el "-21"), porque lo pegamos crudo en la URL.
// ═══════════════════════════════════════════════════════════════

/** Tag de afiliado de Amazon.es. TEMPORAL hasta que se apruebe el alta. */
export const AMAZON_AFFILIATE_TAG = 'diyapp-21';

/** Construye una URL de búsqueda afiliada en Amazon.es */
export function amazonSearchUrl(query: string): string {
  return `https://www.amazon.es/s?k=${encodeURIComponent(query)}&tag=${AMAZON_AFFILIATE_TAG}`;
}

/** Construye una URL de producto afiliada en Amazon.es a partir de un ASIN */
export function amazonProductUrl(asin: string): string {
  return `https://www.amazon.es/dp/${asin}?tag=${AMAZON_AFFILIATE_TAG}`;
}
