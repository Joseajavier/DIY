import Constants from 'expo-constants';

const BASE_URL: string =
  Constants.expoConfig?.extra?.apiUrl ??
  (__DEV__ ? 'http://localhost:3001' : 'https://diy-backend.up.railway.app');

// In-memory cache
let toolsCache: any = null;
let toolsCacheTime = 0;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export interface CatalogResponse {
  version: number;
  lastUpdated: string;
  categories: any[];
  types: any[];
  brands: any[];
  products: any[];
  totalProducts: number;
}

/**
 * Fetch tool catalog from backend.
 * Uses in-memory cache (24h TTL).
 * Falls back to null if backend unavailable.
 */
export async function fetchToolCatalog(params?: {
  category?: string;
  type?: string;
  tier?: string;
  use?: string;
  power?: string;
  q?: string;
}): Promise<CatalogResponse | null> {
  // If no params and cache is fresh, use cache
  if (!params && toolsCache && Date.now() - toolsCacheTime < CACHE_TTL) {
    return toolsCache;
  }

  try {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.set('category', params.category);
    if (params?.type) queryParams.set('type', params.type);
    if (params?.tier) queryParams.set('tier', params.tier);
    if (params?.use) queryParams.set('use', params.use);
    if (params?.power) queryParams.set('power', params.power);
    if (params?.q) queryParams.set('q', params.q);

    const qs = queryParams.toString();
    const url = `${BASE_URL}/catalog/tools${qs ? `?${qs}` : ''}`;

    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;

    const data = await res.json();

    // Cache only full (unfiltered) responses
    if (!params) {
      toolsCache = data;
      toolsCacheTime = Date.now();
    }

    return data;
  } catch {
    return null; // Backend not available, use local data
  }
}

/**
 * Check if backend catalog is available and newer than local
 */
export async function checkCatalogVersion(): Promise<{ available: boolean; version: number } | null> {
  try {
    const res = await fetch(`${BASE_URL}/catalog/tools/stats`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const data = await res.json();
    return { available: true, version: data.version };
  } catch {
    return null;
  }
}
