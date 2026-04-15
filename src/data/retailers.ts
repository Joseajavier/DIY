// ═══════════════════════════════════════════════════════════════
// RETAILERS — tiendas online de bricolaje agrupadas por país.
// ───────────────────────────────────────────────────────────────
// Cada retailer expone un urlTemplate con `{q}` que se sustituye
// por el término de búsqueda ya codificado (encodeURIComponent).
//
// La idea: detectamos el país del dispositivo con expo-localization
// y mostramos solo los retailers relevantes para ese mercado, más
// Amazon como fallback global.
// ═══════════════════════════════════════════════════════════════

import { IconName } from '../components/Icon';
import { AMAZON_AFFILIATE_TAG } from '../config/affiliates';

export type RetailerKind = 'marketplace' | 'diy' | 'pro' | 'generalist';

export type Retailer = {
  id: string;
  name: string;
  /** ISO 3166-1 alpha-2 (ES, DE, FR, GB, IT, PT, US, MX…). */
  country: string;
  kind: RetailerKind;
  /** Color de marca para la chip/botón (opcional). */
  color?: string;
  /** Icono del Icon component. */
  icon: IconName;
  /** URL template con `{q}` como placeholder. */
  urlTemplate: string;
};

export const RETAILERS: Retailer[] = [
  // ─── ESPAÑA ────────────────────────────────────────────────
  {
    id: 'amazon_es',
    name: 'Amazon',
    country: 'ES',
    kind: 'marketplace',
    color: '#FF9900',
    icon: 'shop',
    urlTemplate: `https://www.amazon.es/s?k={q}&tag=${AMAZON_AFFILIATE_TAG}`,
  },
  {
    id: 'leroy_es',
    name: 'Leroy Merlin',
    country: 'ES',
    kind: 'diy',
    color: '#78BE20',
    icon: 'tools',
    urlTemplate: 'https://www.leroymerlin.es/search?search={q}',
  },
  {
    id: 'bricodepot_es',
    name: 'Bricodepot',
    country: 'ES',
    kind: 'diy',
    color: '#F08C00',
    icon: 'tools',
    urlTemplate: 'https://www.bricodepot.es/catalogsearch/result?q={q}',
  },
  {
    id: 'bauhaus_es',
    name: 'Bauhaus',
    country: 'ES',
    kind: 'diy',
    color: '#DA291C',
    icon: 'tools',
    urlTemplate: 'https://www.bauhaus.es/search?query={q}',
  },
  {
    id: 'ferreteria_es',
    name: 'Ferretería online',
    country: 'ES',
    kind: 'pro',
    color: '#2E5266',
    icon: 'wrench',
    urlTemplate: 'https://www.ferreteria.es/catalogsearch/result/?q={q}',
  },

  // ─── ALEMANIA ──────────────────────────────────────────────
  {
    id: 'amazon_de',
    name: 'Amazon',
    country: 'DE',
    kind: 'marketplace',
    color: '#FF9900',
    icon: 'shop',
    // TODO: añadir tag cuando se registre afiliado en amazon.de
    urlTemplate: 'https://www.amazon.de/s?k={q}',
  },
  {
    id: 'obi_de',
    name: 'OBI',
    country: 'DE',
    kind: 'diy',
    color: '#FF6600',
    icon: 'tools',
    urlTemplate: 'https://www.obi.de/search/{q}',
  },
  {
    id: 'hornbach_de',
    name: 'Hornbach',
    country: 'DE',
    kind: 'diy',
    color: '#F25C00',
    icon: 'tools',
    urlTemplate: 'https://www.hornbach.de/shop/search/artikel/{q}',
  },
  {
    id: 'bauhaus_de',
    name: 'Bauhaus',
    country: 'DE',
    kind: 'diy',
    color: '#DA291C',
    icon: 'tools',
    urlTemplate: 'https://www.bauhaus.info/search?query={q}',
  },

  // ─── FRANCIA ───────────────────────────────────────────────
  {
    id: 'amazon_fr',
    name: 'Amazon',
    country: 'FR',
    kind: 'marketplace',
    color: '#FF9900',
    icon: 'shop',
    // TODO: añadir tag cuando se registre afiliado en amazon.fr
    urlTemplate: 'https://www.amazon.fr/s?k={q}',
  },
  {
    id: 'leroy_fr',
    name: 'Leroy Merlin',
    country: 'FR',
    kind: 'diy',
    color: '#78BE20',
    icon: 'tools',
    urlTemplate: 'https://www.leroymerlin.fr/produits/?q={q}',
  },
  {
    id: 'castorama_fr',
    name: 'Castorama',
    country: 'FR',
    kind: 'diy',
    color: '#005EB8',
    icon: 'tools',
    urlTemplate: 'https://www.castorama.fr/search?term={q}',
  },
  {
    id: 'bricomarche_fr',
    name: 'Bricomarché',
    country: 'FR',
    kind: 'diy',
    color: '#E30613',
    icon: 'tools',
    urlTemplate: 'https://www.bricomarche.com/recherche?q={q}',
  },

  // ─── REINO UNIDO ───────────────────────────────────────────
  {
    id: 'amazon_uk',
    name: 'Amazon',
    country: 'GB',
    kind: 'marketplace',
    color: '#FF9900',
    icon: 'shop',
    // TODO: añadir tag cuando se registre afiliado en amazon.co.uk
    urlTemplate: 'https://www.amazon.co.uk/s?k={q}',
  },
  {
    id: 'bq_uk',
    name: 'B&Q',
    country: 'GB',
    kind: 'diy',
    color: '#FF6600',
    icon: 'tools',
    urlTemplate: 'https://www.diy.com/search?term={q}',
  },
  {
    id: 'screwfix_uk',
    name: 'Screwfix',
    country: 'GB',
    kind: 'pro',
    color: '#0072CE',
    icon: 'wrench',
    urlTemplate: 'https://www.screwfix.com/search?search={q}',
  },
  {
    id: 'toolstation_uk',
    name: 'Toolstation',
    country: 'GB',
    kind: 'pro',
    color: '#005BAA',
    icon: 'wrench',
    urlTemplate: 'https://www.toolstation.com/search?q={q}',
  },

  // ─── ITALIA ────────────────────────────────────────────────
  {
    id: 'amazon_it',
    name: 'Amazon',
    country: 'IT',
    kind: 'marketplace',
    color: '#FF9900',
    icon: 'shop',
    // TODO: añadir tag cuando se registre afiliado en amazon.it
    urlTemplate: 'https://www.amazon.it/s?k={q}',
  },
  {
    id: 'leroy_it',
    name: 'Leroy Merlin',
    country: 'IT',
    kind: 'diy',
    color: '#78BE20',
    icon: 'tools',
    urlTemplate: 'https://www.leroymerlin.it/ricerca?q={q}',
  },
  {
    id: 'bricoman_it',
    name: 'Bricoman',
    country: 'IT',
    kind: 'diy',
    color: '#E30613',
    icon: 'tools',
    urlTemplate: 'https://www.bricoman.it/search?text={q}',
  },
  {
    id: 'obi_it',
    name: 'OBI',
    country: 'IT',
    kind: 'diy',
    color: '#FF6600',
    icon: 'tools',
    urlTemplate: 'https://www.obi-italia.it/search/{q}',
  },

  // ─── PORTUGAL ──────────────────────────────────────────────
  {
    id: 'amazon_pt',
    name: 'Amazon',
    country: 'PT',
    kind: 'marketplace',
    color: '#FF9900',
    icon: 'shop',
    // Apunta a amazon.es (no hay amazon.pt), reutiliza el tag ES.
    urlTemplate: `https://www.amazon.es/s?k={q}&tag=${AMAZON_AFFILIATE_TAG}`,
  },
  {
    id: 'leroy_pt',
    name: 'Leroy Merlin',
    country: 'PT',
    kind: 'diy',
    color: '#78BE20',
    icon: 'tools',
    urlTemplate: 'https://www.leroymerlin.pt/pesquisa?q={q}',
  },
  {
    id: 'bricomarche_pt',
    name: 'Bricomarché',
    country: 'PT',
    kind: 'diy',
    color: '#E30613',
    icon: 'tools',
    urlTemplate: 'https://www.bricomarche.pt/search?q={q}',
  },
  {
    id: 'aki_pt',
    name: 'AKI',
    country: 'PT',
    kind: 'diy',
    color: '#FF6A13',
    icon: 'tools',
    urlTemplate: 'https://www.aki.pt/pesquisa?q={q}',
  },

  // ─── ESTADOS UNIDOS ────────────────────────────────────────
  {
    id: 'amazon_us',
    name: 'Amazon',
    country: 'US',
    kind: 'marketplace',
    color: '#FF9900',
    icon: 'shop',
    urlTemplate: 'https://www.amazon.com/s?k={q}',
  },
  {
    id: 'homedepot_us',
    name: 'Home Depot',
    country: 'US',
    kind: 'diy',
    color: '#F96302',
    icon: 'tools',
    urlTemplate: 'https://www.homedepot.com/s/{q}',
  },
  {
    id: 'lowes_us',
    name: "Lowe's",
    country: 'US',
    kind: 'diy',
    color: '#004990',
    icon: 'tools',
    urlTemplate: 'https://www.lowes.com/search?searchTerm={q}',
  },
  {
    id: 'acehardware_us',
    name: 'Ace Hardware',
    country: 'US',
    kind: 'diy',
    color: '#E4002B',
    icon: 'wrench',
    urlTemplate: 'https://www.acehardware.com/search?query={q}',
  },
];

export const SUPPORTED_COUNTRIES = [
  { code: 'ES', name: 'España', flag: 'ES' },
  { code: 'DE', name: 'Alemania', flag: 'DE' },
  { code: 'FR', name: 'Francia', flag: 'FR' },
  { code: 'GB', name: 'Reino Unido', flag: 'GB' },
  { code: 'IT', name: 'Italia', flag: 'IT' },
  { code: 'PT', name: 'Portugal', flag: 'PT' },
  { code: 'US', name: 'Estados Unidos', flag: 'US' },
];

export function retailersForCountry(country: string): Retailer[] {
  const upper = country.toUpperCase();
  const list = RETAILERS.filter((r) => r.country === upper);
  if (list.length > 0) return list;
  // Fallback: si el país no está soportado, devolvemos Amazon internacional
  // + las tiendas de España como mínimo común europeo.
  return RETAILERS.filter((r) => r.country === 'ES');
}

export function buildSearchUrl(retailer: Retailer, query: string): string {
  return retailer.urlTemplate.replace('{q}', encodeURIComponent(query));
}
