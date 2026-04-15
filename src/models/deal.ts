// ═══════════════════════════════════════════════════════════════
// DEAL — oferta real parseada desde un RSS del grupo Pepper
// (Chollometro, MyDealz, HotUKDeals, Dealabs, Pepper.it, .pt).
// ───────────────────────────────────────────────────────────────
// Los feeds no exponen precio estructurado, así que extraemos lo
// que podemos del título y la descripción. Los campos opcionales
// son los que a veces no se pueden determinar.
// ═══════════════════════════════════════════════════════════════

export type DealSource =
  | 'chollometro'
  | 'mydealz'
  | 'hotukdeals'
  | 'dealabs'
  | 'pepper_it'
  | 'pepper_pt';

export type Deal = {
  id: string;
  source: DealSource;
  /** Código ISO país (ES, DE, FR, GB, IT, PT). */
  country: string;
  /** Título original del chollo (incluye marca y a veces precio). */
  title: string;
  /** Descripción HTML limpiada (sin tags). */
  description: string;
  /** URL al chollo original (lleva a la tienda del comercio final). */
  link: string;
  /** Imagen del chollo, si la hay. */
  image?: string;
  /** Precio extraído del título con regex (en €/£). undefined si no se ha podido. */
  price?: number;
  /** Precio tachado / original si lo hay (para calcular descuento). */
  priceOriginal?: number;
  /** Porcentaje de descuento, si el título lo menciona. */
  discountPct?: number;
  /** Moneda detectada (EUR, GBP). */
  currency: 'EUR' | 'GBP';
  /** Comercio si se pudo extraer (amazon, leroy merlin, lidl, bauhaus…). */
  merchant?: string;
  /** Temperatura / grados del chollo en la comunidad (reputación). */
  temperature?: number;
  /** Fecha de publicación ISO. */
  publishedAt: string;
};
