// ═══════════════════════════════════════════════════════════════
// AMAZON PRICE SERVICE — integración con Amazon Product Advertising
// API 5.0 (PA-API 5.0) para obtener precios, disponibilidad y
// enlaces de afiliado de productos de bricolaje/herramientas.
// ───────────────────────────────────────────────────────────────
// ESTADO: DESACTIVADO POR DEFECTO.
//
// Amazon Afiliados exige realizar 3 ventas cualificadas dentro
// de los primeros 180 días para habilitar el acceso a la PA-API.
// Hasta que no se cumpla ese requisito, las credenciales no
// funcionan y la API devuelve 403. Por eso el scaffold está
// deshabilitado y cualquier llamada lanza un error explícito.
//
// Cómo activarlo cuando tengas el acceso:
//   1. Obtén ACCESS_KEY + SECRET_KEY en la consola de PA-API.
//   2. Registra tu PARTNER_TAG (p. ej. "diyapp-21").
//   3. Carga las credenciales vía react-native-config o
//      expo-constants (NO vía process.env en RN) y pásalas
//      al proxy serverless (ver más abajo).
//   4. Pon AMAZON_PA_API_ENABLED = true.
//   5. Implementa la llamada real en searchAmazonItems()
//      siguiendo el bloque comentado de referencia.
//
// Arquitectura recomendada:
//   RN app  ─►  Cloudflare Worker / AWS Lambda  ─►  PA-API
//   (sin secret)        (firma SigV4)             (Amazon)
//
// Más info: ver AMAZON_SETUP.md en la raíz del repo.
//
// Dependencias externas (ya instaladas en el proyecto):
//   • react-native-mmkv — caché persistente (TTL 24h).
// ═══════════════════════════════════════════════════════════════

// ─── Flag maestro de activación ───────────────────────────────
// Poner a `true` SOLO cuando las credenciales de PA-API estén
// verificadas y el proxy serverless esté desplegado.
export const AMAZON_PA_API_ENABLED = false;

const DISABLED_ERROR =
  'PA-API not yet enabled — complete the 3 qualifying sales first';

// ─── Credenciales (stub) ──────────────────────────────────────
// En React Native NO uses `process.env` directamente: el bundler
// no inlinea env vars a runtime de la forma que espera la app.
// Usa `react-native-config` (nativo) o `expo-constants` (Expo).
//
// DO NOT ship AWS secret key in the mobile app — use a serverless proxy.
// El SECRET_KEY jamás debe viajar dentro del bundle de la app.
// En su lugar, la app llama a un endpoint propio (Cloudflare
// Worker / AWS Lambda) que firma la petición SigV4 en el servidor
// y reenvía la respuesta a la app. El secreto vive solo en el
// entorno del Worker/Lambda.
//
// const ACCESS_KEY = process.env.AMAZON_PA_API_ACCESS_KEY ?? '';
// const SECRET_KEY = process.env.AMAZON_PA_API_SECRET_KEY ?? '';
// const PARTNER_TAG = process.env.AMAZON_AFFILIATE_TAG ?? '';

// ─── Tipos públicos ───────────────────────────────────────────

export type AmazonProduct = {
  asin: string;
  title: string;
  image?: string;
  price?: number;
  currency: 'EUR';
  url: string;
  availability?: string;
  brand?: string;
  features?: string[];
};

export type SearchItemsRequest = {
  keywords: string;
  itemCount?: number;
  searchIndex?: string;
};

export type GetItemsRequest = {
  asins: string[];
};

// ─── Caché MMKV ───────────────────────────────────────────────
// Namespace separado del resto del app ('amazon-cache') para
// poder limpiar solo los productos sin tocar deals ni ajustes.

let amazonStorage: any = null;
const amazonMemoryFallback: Record<string, string> = {};

try {
  const { MMKV } = require('react-native-mmkv');
  amazonStorage = new MMKV({ id: 'amazon-cache' });
} catch {
  console.warn('[Amazon] MMKV native module not available, using memory fallback');
}

const AMAZON_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 horas

type AmazonCacheEntry<T> = {
  fetchedAt: number;
  data: T;
};

function amzGetString(key: string): string | undefined {
  if (amazonStorage) return amazonStorage.getString(key);
  return amazonMemoryFallback[key];
}

function amzSetString(key: string, value: string): void {
  if (amazonStorage) amazonStorage.set(key, value);
  amazonMemoryFallback[key] = value;
}

function amzDeleteKey(key: string): void {
  if (amazonStorage) amazonStorage.delete(key);
  delete amazonMemoryFallback[key];
}

function searchCacheKey(keywords: string): string {
  return `amz:search:${keywords.trim().toLowerCase()}`;
}

function asinCacheKey(asin: string): string {
  return `amz:asin:${asin.trim().toUpperCase()}`;
}

function readCache<T>(key: string): T | null {
  const raw = amzGetString(key);
  if (!raw) return null;
  try {
    const entry = JSON.parse(raw) as AmazonCacheEntry<T>;
    if (Date.now() - entry.fetchedAt > AMAZON_CACHE_TTL_MS) {
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T): void {
  const entry: AmazonCacheEntry<T> = { fetchedAt: Date.now(), data };
  amzSetString(key, JSON.stringify(entry));
}

/** Limpia la caché de Amazon (toda o por clave). */
export function clearAmazonCache(key?: string): void {
  if (key) {
    amzDeleteKey(key);
  } else if (amazonStorage) {
    amazonStorage.clearAll();
  } else {
    for (const k of Object.keys(amazonMemoryFallback)) {
      delete amazonMemoryFallback[k];
    }
  }
}

// ─── Helpers de URL de afiliado (funcionan ya) ────────────────

/**
 * Construye un enlace directo a una ficha de producto por ASIN
 * con el tag de afiliado. NO requiere llamada a la API.
 */
export function buildAffiliateUrl(asin: string, tag: string): string {
  return `https://www.amazon.es/dp/${asin}?tag=${tag}`;
}

/**
 * Construye un enlace de búsqueda en Amazon con el tag de
 * afiliado. Útil como fallback cuando no hay ASIN concreto.
 */
export function buildAffiliateSearchUrl(query: string, tag: string): string {
  return `https://www.amazon.es/s?k=${encodeURIComponent(query)}&tag=${tag}`;
}

// ─── Funciones de API (stubs — lanzan error si no activado) ───

/**
 * Busca productos en Amazon por palabras clave.
 * Cachea el resultado 24h en MMKV (`amz:search:{keywords}`).
 */
export async function searchAmazonItems(
  req: SearchItemsRequest,
): Promise<AmazonProduct[]> {
  if (!AMAZON_PA_API_ENABLED) {
    throw new Error(DISABLED_ERROR);
  }

  // Mirar caché antes de hacer red
  const key = searchCacheKey(req.keywords);
  const cached = readCache<AmazonProduct[]>(key);
  if (cached) return cached;

  // ────────────────────────────────────────────────────────────
  // REFERENCIA DE IMPLEMENTACIÓN (comentada — NO activar tal cual
  // desde la app: firmar SigV4 con el secret key en el cliente
  // expondría la credencial en el bundle. Desplegar esto en un
  // Cloudflare Worker / AWS Lambda y llamar al proxy desde RN).
  //
  //   DO NOT ship AWS secret key in the mobile app — use a
  //   serverless proxy.
  //
  //   Endpoint:
  //     POST https://webservices.amazon.es/paapi5/searchitems
  //
  //   Host / región:
  //     host   = 'webservices.amazon.es'
  //     region = 'eu-west-1'
  //     service = 'ProductAdvertisingAPI'
  //
  //   Headers obligatorios:
  //     'content-type'     : 'application/json; charset=utf-8'
  //     'host'             : 'webservices.amazon.es'
  //     'x-amz-date'       : '<YYYYMMDDTHHMMSSZ>'
  //     'x-amz-target'     : 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems'
  //     'content-encoding' : 'amz-1.0'
  //     'Authorization'    : 'AWS4-HMAC-SHA256 Credential=...' (SigV4)
  //
  //   Cuerpo JSON de ejemplo:
  //     {
  //       "PartnerTag": PARTNER_TAG,
  //       "PartnerType": "Associates",
  //       "Marketplace": "www.amazon.es",
  //       "Keywords": req.keywords,
  //       "ItemCount": req.itemCount ?? 10,
  //       "SearchIndex": req.searchIndex ?? "Tools",
  //       "Resources": [
  //         "Images.Primary.Medium",
  //         "ItemInfo.Title",
  //         "ItemInfo.ByLineInfo",
  //         "ItemInfo.Features",
  //         "Offers.Listings.Price",
  //         "Offers.Listings.Availability.Message"
  //       ]
  //     }
  //
  //   Flujo SigV4 (resumen):
  //     1. canonicalRequest = METHOD + '\n' + CANONICAL_URI +
  //        '\n' + CANONICAL_QUERY + '\n' + CANONICAL_HEADERS +
  //        '\n' + SIGNED_HEADERS + '\n' + HEX(SHA256(body))
  //     2. stringToSign = 'AWS4-HMAC-SHA256' + '\n' + amzDate +
  //        '\n' + credentialScope + '\n' + HEX(SHA256(canonicalRequest))
  //     3. signingKey = HMAC(HMAC(HMAC(HMAC('AWS4'+SECRET_KEY,
  //        dateStamp), region), service), 'aws4_request')
  //     4. signature = HEX(HMAC(signingKey, stringToSign))
  //     5. Authorization = 'AWS4-HMAC-SHA256 Credential=' +
  //        ACCESS_KEY + '/' + credentialScope +
  //        ', SignedHeaders=' + signedHeaders +
  //        ', Signature=' + signature
  //
  //   Llamada recomendada desde RN (vía proxy propio):
  //     const res = await fetch('https://tu-worker.workers.dev/amazon/search', {
  //       method: 'POST',
  //       headers: { 'content-type': 'application/json' },
  //       body: JSON.stringify({
  //         keywords: req.keywords,
  //         itemCount: req.itemCount ?? 10,
  //         searchIndex: req.searchIndex ?? 'Tools',
  //       }),
  //     });
  //     const json = await res.json();
  //     const products: AmazonProduct[] = (json.SearchResult?.Items ?? []).map(mapItemToProduct);
  //     writeCache(key, products);
  //     return products;
  // ────────────────────────────────────────────────────────────

  throw new Error(DISABLED_ERROR);
}

/**
 * Obtiene una lista de productos por ASIN.
 * Cachea cada producto individualmente (`amz:asin:{ASIN}`) para
 * maximizar hits cuando el mismo ASIN aparece en varias llamadas.
 */
export async function getAmazonItems(
  req: GetItemsRequest,
): Promise<AmazonProduct[]> {
  if (!AMAZON_PA_API_ENABLED) {
    throw new Error(DISABLED_ERROR);
  }

  // Resolver desde caché los que ya tengamos
  const cached: AmazonProduct[] = [];
  const missing: string[] = [];
  for (const asin of req.asins) {
    const hit = readCache<AmazonProduct>(asinCacheKey(asin));
    if (hit) cached.push(hit);
    else missing.push(asin);
  }

  if (missing.length === 0) return cached;

  // ────────────────────────────────────────────────────────────
  // REFERENCIA: el endpoint es idéntico al de SearchItems pero
  // cambia x-amz-target y el cuerpo:
  //
  //   x-amz-target = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems'
  //
  //   body = {
  //     "PartnerTag": PARTNER_TAG,
  //     "PartnerType": "Associates",
  //     "Marketplace": "www.amazon.es",
  //     "ItemIds": missing,
  //     "Resources": [ ... mismos que en SearchItems ... ]
  //   }
  //
  //   Tras recibir la respuesta, guardar cada producto:
  //     for (const p of products) writeCache(asinCacheKey(p.asin), p);
  // ────────────────────────────────────────────────────────────

  throw new Error(DISABLED_ERROR);
}

/**
 * Busca por `query` y devuelve el producto más barato encontrado,
 * o null si no hay resultados. Útil para enriquecer una ficha de
 * herramienta con el mejor precio del catálogo.
 */
export async function getBestPriceFor(
  query: string,
): Promise<AmazonProduct | null> {
  if (!AMAZON_PA_API_ENABLED) {
    throw new Error(DISABLED_ERROR);
  }

  const results = await searchAmazonItems({ keywords: query, itemCount: 10 });
  if (results.length === 0) return null;

  let best: AmazonProduct | null = null;
  for (const p of results) {
    if (p.price == null) continue;
    if (best == null || (best.price != null && p.price < best.price)) {
      best = p;
    }
  }
  return best ?? results[0];
}
