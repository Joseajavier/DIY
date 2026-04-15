// ═══════════════════════════════════════════════════════════════
// DEALS SERVICE — ofertas reales del grupo Pepper (Chollometro,
// MyDealz, HotUKDeals, Dealabs, Pepper.it, Pepper.pt).
// ───────────────────────────────────────────────────────────────
// Cómo funciona:
//   1. Por país seleccionado, tiramos del RSS oficial del grupo
//      de "bricolaje / herramientas / jardín" correspondiente.
//   2. Lo parseamos con fast-xml-parser.
//   3. Extraemos precio del título/descripción con regex.
//   4. Cacheamos el JSON normalizado en MMKV con TTL de 1h.
//   5. Si falla la red, devolvemos lo que haya en caché (aunque
//      esté expirado) para que la app no se rompa offline.
//
// Fuentes por país (RSS público, oficial del grupo Pepper):
//   • ES → chollometro.com/rss/grupo/bricolaje-herramientas-y-jardin
//   • DE → mydealz.de/rss/gruppe/heimwerker-garten
//   • GB → hotukdeals.com/rss/group/home-garden-diy
//   • FR → dealabs.com/rss/groupe/bricolage-outillage
//   • IT → pepper.it/rss/gruppo/bricolage-giardino
//   • PT → pepper.pt/rss/grupo/bricolage-ferramentas
//
// NOTAS:
//   • Los feeds responden con User-Agent de fetch normal — OK.
//   • Parseamos XML directamente en RN (fast-xml-parser es pure JS,
//     no hay CORS porque estamos en nativo).
//   • Si Pepper cambia la URL de un grupo, actualizar DEAL_FEEDS.
// ═══════════════════════════════════════════════════════════════

import { XMLParser } from 'fast-xml-parser';
import { Deal, DealSource } from '../models/deal';

let storage: any = null;
const memoryFallback: Record<string, string> = {};

try {
  const { createMMKV } = require('react-native-mmkv');
  storage = createMMKV({ id: 'deals-cache' });
} catch {
  console.warn('[Deals] MMKV native module not available, using memory fallback');
}
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hora

type FeedConfig = {
  source: DealSource;
  country: string;
  currency: 'EUR' | 'GBP';
  urls: string[]; // Varias URLs por fallback (categorías similares)
};

const DEAL_FEEDS: Record<string, FeedConfig> = {
  ES: {
    source: 'chollometro',
    country: 'ES',
    currency: 'EUR',
    urls: [
      'https://www.chollometro.com/rss/grupo/bricolaje-herramientas-y-jardin',
      'https://www.chollometro.com/rss/nuevos',
    ],
  },
  DE: {
    source: 'mydealz',
    country: 'DE',
    currency: 'EUR',
    urls: [
      'https://www.mydealz.de/rss/gruppe/heimwerker-garten',
      'https://www.mydealz.de/rss/neue-deals',
    ],
  },
  GB: {
    source: 'hotukdeals',
    country: 'GB',
    currency: 'GBP',
    urls: [
      'https://www.hotukdeals.com/rss/group/home-garden-diy',
      'https://www.hotukdeals.com/rss/new',
    ],
  },
  FR: {
    source: 'dealabs',
    country: 'FR',
    currency: 'EUR',
    urls: [
      'https://www.dealabs.com/rss/groupe/bricolage-outillage',
      'https://www.dealabs.com/rss/nouveaux',
    ],
  },
  IT: {
    source: 'pepper_it',
    country: 'IT',
    currency: 'EUR',
    urls: [
      'https://www.pepper.it/rss/gruppo/bricolage-giardino',
      'https://www.pepper.it/rss/nuovi',
    ],
  },
  PT: {
    source: 'pepper_pt',
    country: 'PT',
    currency: 'EUR',
    urls: [
      'https://www.pepper.pt/rss/grupo/bricolage-ferramentas',
      'https://www.pepper.pt/rss/novos',
    ],
  },
};

// ═══════════════════════════════════════════════════════════════
// REGEX DE EXTRACCIÓN
// ───────────────────────────────────────────────────────────────
// Precio: "99,95€" "€99.95" "£29.99" "99€" "Por 149,95€" "ahora 79€"
// No captura precios de envío ("+3€ envío"). Capta también £/EUR/eur.
// ═══════════════════════════════════════════════════════════════
const PRICE_RE =
  /(?:€|eur\s*|£)?\s*(\d{1,5})(?:[.,](\d{2}))?\s*(?:€|eur\b|£)/i;

// Regex de descuento: "−50%" "-30%" "50% OFF" "−30 %" "-50 %"
const DISCOUNT_RE = /[-−–]\s*(\d{1,2})\s*%|\b(\d{1,2})\s*%\s*(?:off|dto|de\s*descuento)\b/i;

// Regex para detectar comercio en el título ("en Amazon", "en Leroy Merlin", "@ B&Q", "#Amazon")
const MERCHANT_RE =
  /(?:\b(?:en|at|bei|chez|in|da)\s+|@\s*|#)([A-Za-zÀ-ÿ&+.' ]{2,30})/i;

// Regex de temperatura de la comunidad Pepper: "250°" "+250°" "Temperatura: 250º"
// Rechazamos si va seguido de "C", "Celsius" o "grados Celsius".
const TEMPERATURE_RE =
  /(?:\+?\s*(\d{2,4})\s*[°º](?!\s*(?:C\b|Celsius|grados\s*Celsius))|temperat(?:ur[ae]?):\s*(\d{2,4}))/i;

/**
 * Lista de comercios conocidos (España + Europa). Se buscan como substring
 * case-insensitive en el título para extraer merchant aunque no haya
 * preposición ("en"/"at"/"bei"/...).
 * Ordenada por longitud descendente para que "Leroy Merlin" capture
 * antes que "Leroy" solo.
 */
export const KNOWN_MERCHANTS: string[] = [
  'Leroy Merlin',
  'Bricodepot',
  'Bricomart',
  'Bricoking',
  'Bauhaus',
  'Manomano',
  'Mano Mano',
  'Decathlon',
  'Carrefour',
  'Worten',
  'MediaMarkt',
  'PcComponentes',
  'Amazon',
  'eBay',
  'AliExpress',
  'Lidl',
  'Aldi',
  'Aki',
  'B&Q',
  'Screwfix',
  'Wickes',
  'Toom',
  'Hornbach',
  'Obi',
  'Castorama',
];

/**
 * Keywords DIY por país — se usan para post-filtrar items de un feed
 * "nuevos" (fallback) cuando el RSS específico de bricolaje no responde.
 * Si el título no matchea, el item se descarta.
 */
export const DIY_KEYWORDS: Record<string, RegExp> = {
  ES: /(taladro|sierra|martillo|destornillador|bricolaje|herramient|lijadora|fresadora|atornillador|compresor|soplador|desbrozadora)/i,
  DE: /(bohrer|säge|hammer|schraube|werkzeug|schleif|fräse|kompressor)/i,
  GB: /(drill|saw|hammer|screwdriver|tool|sander|router|compressor)/i,
  FR: /(perceuse|scie|marteau|tournevis|outil|bricolage|ponceuse|défonceuse|compresseur)/i,
  IT: /(trapano|sega|martello|cacciavite|utensile|bricolage|levigatrice|fresatrice|compressore)/i,
  PT: /(berbequim|serra|martelo|chave|ferramenta|bricolage|lixadeira|tupia|compressor)/i,
};

/**
 * Devuelve true si el título contiene alguna palabra clave DIY del país.
 * Si el país no tiene lista, permite pasar todo (no filtra).
 */
export function matchesDiyKeywords(title: string, country: string): boolean {
  const re = DIY_KEYWORDS[country];
  if (!re) return true;
  return re.test(title);
}

function cleanText(s: string): string {
  return s
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function getString(key: string): string | undefined {
  if (storage) return storage.getString(key);
  return memoryFallback[key];
}

function setString(key: string, value: string): void {
  if (storage) storage.set(key, value);
  memoryFallback[key] = value;
}

function deleteKey(key: string): void {
  if (storage) storage.delete(key);
  delete memoryFallback[key];
}

function extractPrice(text: string): { price?: number; priceOriginal?: number } {
  // Buscar todos los matches para detectar "99€ antes 149€" / "Por 149,95€" / "ahora 79€"
  const re = new RegExp(PRICE_RE.source, 'gi');
  const matches: number[] = [];
  let m;
  while ((m = re.exec(text)) !== null && matches.length < 5) {
    const whole = m[1];
    const frac = m[2];
    if (!whole) continue;
    const n = parseFloat(`${whole}.${frac || '0'}`);
    // Filtrar importes absurdos (envío, años, códigos postales) y
    // precios de envío bajos tipo "+3€ envío".
    if (!isNaN(n) && n > 0 && n < 100000) matches.push(n);
  }
  if (matches.length === 0) return {};
  if (matches.length === 1) return { price: matches[0] };
  // Si hay exactamente 2, el más bajo = oferta, el más alto = tachado.
  // Si hay 3+, mismo criterio pero usando min y max.
  const sorted = [...matches].sort((a, b) => a - b);
  return { price: sorted[0], priceOriginal: sorted[sorted.length - 1] };
}

function extractDiscount(text: string): number | undefined {
  const m = DISCOUNT_RE.exec(text);
  if (!m) return undefined;
  const n = parseInt(m[1] || m[2], 10);
  return isNaN(n) ? undefined : n;
}

function extractMerchant(text: string): string | undefined {
  // 1) Buscar por lista de comercios conocidos (case-insensitive).
  //    Empezamos por los más largos para que "Leroy Merlin" gane a "Leroy".
  const sorted = [...KNOWN_MERCHANTS].sort((a, b) => b.length - a.length);
  const lower = text.toLowerCase();
  for (const merchant of sorted) {
    if (lower.includes(merchant.toLowerCase())) {
      return merchant;
    }
  }
  // 2) Regex por preposición / hashtag / @
  const m = MERCHANT_RE.exec(text);
  if (m) {
    return m[1].trim().replace(/[.,;:]$/, '');
  }
  // 3) Último recurso: patrón de final de título tipo "Taladro Bosch 123 - Amazon"
  const dashEnd = /[-–—]\s*([A-Za-zÀ-ÿ&+.' ]{2,30})\s*$/.exec(text);
  if (dashEnd) {
    return dashEnd[1].trim().replace(/[.,;:]$/, '');
  }
  return undefined;
}

function extractTemperature(text: string): number | undefined {
  const m = TEMPERATURE_RE.exec(text);
  if (!m) return undefined;
  const raw = m[1] || m[2];
  if (!raw) return undefined;
  const n = parseInt(raw, 10);
  if (isNaN(n)) return undefined;
  // Rango razonable para "grados de comunidad" en Pepper (-999 a 9999).
  if (n < -999 || n > 9999) return undefined;
  return n;
}

type RssItem = {
  title?: unknown;
  description?: unknown;
  link?: unknown;
  guid?: unknown;
  pubDate?: unknown;
  'media:thumbnail'?: { '@_url'?: string } | string;
  'media:content'?: { '@_url'?: string } | Array<{ '@_url'?: string }>;
  enclosure?: { '@_url'?: string };
  category?: unknown;
};

function parseFeedXml(xml: string, feed: FeedConfig, isFallback = false): Deal[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
  });
  let parsed: any;
  try {
    parsed = parser.parse(xml);
  } catch (err) {
    console.warn('[dealsService] failed to parse', feed.source, err);
    return [];
  }
  const channel = parsed?.rss?.channel ?? parsed?.feed;
  if (!channel) {
    console.warn('[dealsService] no channel/feed root', feed.source);
    return [];
  }
  const items: RssItem[] = Array.isArray(channel.item)
    ? channel.item
    : channel.item
    ? [channel.item]
    : Array.isArray(channel.entry)
    ? channel.entry
    : [];

  const deals: Deal[] = [];
  for (const it of items) {
    const rawTitle = typeof it.title === 'string'
      ? it.title
      : (it.title as any)?.['#text'] ?? '';
    const title = cleanText(String(rawTitle));
    const rawDesc = typeof it.description === 'string'
      ? it.description
      : (it.description as any)?.['#text'] ?? '';
    const description = cleanText(String(rawDesc));
    const rawLink = typeof it.link === 'string'
      ? it.link
      : (it.link as any)?.['@_href'] ?? (it.link as any)?.['#text'] ?? '';
    const link = String(rawLink).trim();
    const pubDate = String(it.pubDate ?? '');
    const guid = typeof it.guid === 'string'
      ? it.guid
      : (it.guid as any)?.['#text'] ?? link;

    if (!title || !link) continue;

    // Filtro DIY para feeds "nuevos"/"neue"/... (fallback): descartamos
    // items que no parezcan de bricolaje según las keywords del país.
    if (isFallback && !matchesDiyKeywords(title, feed.country)) {
      continue;
    }

    // ── Imagen: varios campos posibles ──
    let image: string | undefined;
    const mediaT = (it as any)['media:thumbnail'];
    if (mediaT) image = typeof mediaT === 'string' ? mediaT : mediaT['@_url'];
    const mediaC = (it as any)['media:content'];
    if (!image && mediaC) {
      if (Array.isArray(mediaC)) image = mediaC[0]?.['@_url'];
      else image = mediaC['@_url'];
    }
    // media:group > media:content (anidado)
    const mediaG = (it as any)['media:group'];
    if (!image && mediaG) {
      const gc = mediaG['media:content'] ?? mediaG['media:thumbnail'];
      if (Array.isArray(gc)) image = gc[0]?.['@_url'];
      else if (gc) image = gc['@_url'];
    }
    if (!image && it.enclosure) image = it.enclosure['@_url'];
    // itunes:image
    const itunesImg = (it as any)['itunes:image'];
    if (!image && itunesImg) {
      image = typeof itunesImg === 'string' ? itunesImg : itunesImg['@_href'];
    }
    if (!image) {
      // Fallback: primera <img> de la descripción
      const m = /<img[^>]+src=["']([^"']+)["']/i.exec(String(rawDesc));
      if (m) image = m[1];
    }
    if (!image) {
      // og:image en el description HTML
      const m = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i.exec(
        String(rawDesc),
      );
      if (m) image = m[1];
    }

    const combinedText = `${title} ${description}`;
    const { price, priceOriginal } = extractPrice(combinedText);
    const discountPct = extractDiscount(combinedText);
    const merchant = extractMerchant(title) ?? extractMerchant(description);
    const temperature = extractTemperature(combinedText);

    deals.push({
      id: String(guid),
      source: feed.source,
      country: feed.country,
      title,
      description: description.slice(0, 500),
      link,
      image,
      price,
      priceOriginal,
      discountPct,
      currency: feed.currency,
      merchant,
      temperature,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
    });
  }
  return deals;
}

type CacheEntry = {
  fetchedAt: number;
  deals: Deal[];
};

function cacheKey(country: string): string {
  return `deals:${country}`;
}

function readCache(country: string): CacheEntry | null {
  const raw = getString(cacheKey(country));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CacheEntry;
  } catch {
    return null;
  }
}

function writeCache(country: string, deals: Deal[]) {
  const entry: CacheEntry = { fetchedAt: Date.now(), deals };
  setString(cacheKey(country), JSON.stringify(entry));
}

async function fetchWithTimeout(url: string, ms = 8000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'DIY-App/1.0 (+https://github.com/Joseajavier/DIY) RSS reader',
        Accept: 'application/rss+xml, application/xml, text/xml, */*',
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Devuelve los chollos del país. Usa caché si está fresca (<1h).
 * Si force=true, ignora la caché y va a la red.
 */
export async function getDeals(
  country: string,
  force = false,
): Promise<{ deals: Deal[]; source: 'network' | 'cache' | 'empty'; fetchedAt: number | null }> {
  const feed = DEAL_FEEDS[country];
  if (!feed) {
    return { deals: [], source: 'empty', fetchedAt: null };
  }

  if (!force) {
    const cached = readCache(country);
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
      return { deals: cached.deals, source: 'cache', fetchedAt: cached.fetchedAt };
    }
  }

  // Intentamos cada URL del feed hasta que alguna responda con items.
  // La primera URL es siempre el grupo específico de bricolaje; las
  // siguientes son fallbacks "nuevos" que filtramos con DIY_KEYWORDS.
  for (let i = 0; i < feed.urls.length; i++) {
    const url = feed.urls[i];
    const isFallback = i > 0;
    try {
      const res = await fetchWithTimeout(url);
      if (!res.ok) {
        console.warn('[dealsService] HTTP', res.status, 'for', feed.source, url);
        continue;
      }
      const xml = await res.text();
      const deals = parseFeedXml(xml, feed, isFallback);
      if (deals.length > 0) {
        writeCache(country, deals);
        return { deals, source: 'network', fetchedAt: Date.now() };
      }
    } catch (err) {
      console.warn('[dealsService] fetch failed', feed.source, url, err);
      // seguir con la siguiente URL
    }
  }

  // Fallback: devolver caché aunque esté expirada
  const stale = readCache(country);
  if (stale) {
    return { deals: stale.deals, source: 'cache', fetchedAt: stale.fetchedAt };
  }
  return { deals: [], source: 'empty', fetchedAt: null };
}

/** Limpia la caché de un país (o de todos si no se pasa). */
export function clearDealsCache(country?: string) {
  if (country) {
    deleteKey(cacheKey(country));
  } else {
    if (storage) storage.clearAll();
    for (const k of Object.keys(memoryFallback)) delete memoryFallback[k];
  }
}

// ── Matching con el catálogo de productos ──

/**
 * Intenta encontrar si un Deal coincide con un ToolProduct
 * por presencia de marca+modelo en el título (case insensitive).
 * Devuelve un score 0-1, donde >0.5 se considera match.
 */
export function scoreDealMatch(
  dealTitle: string,
  brandName: string,
  modelCode: string,
): number {
  const t = dealTitle.toLowerCase();
  const b = brandName.toLowerCase();
  const m = modelCode.toLowerCase().replace(/\s+/g, '');
  const titleNoSpaces = t.replace(/\s+/g, '');

  const hasBrand = t.includes(b);
  const hasModel = titleNoSpaces.includes(m);

  if (hasBrand && hasModel) return 1.0;
  if (hasModel) return 0.85; // modelo es muy específico
  if (hasBrand) return 0.4; // solo marca → débil
  return 0;
}
