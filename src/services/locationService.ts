// ═══════════════════════════════════════════════════════════════
// LOCATION SERVICE — detecta el país del usuario.
// ───────────────────────────────────────────────────────────────
// Prioridad:
//   1. GPS real (expo-location + reverseGeocode) — requiere permiso
//   2. Región del sistema operativo (expo-localization)
//   3. Fallback duro: 'ES'
//
// API:
//   • getCurrentCountry()   — sync, devuelve el país cacheado o el
//                             fallback del SO si aún no hay cache.
//   • refreshCountry()      — async, pide permiso, lee GPS, hace
//                             reverseGeocode y actualiza cache.
//   • getCountryFromLocale() — sync, solo SO.
//
// El selector manual de país ha sido eliminado deliberadamente —
// el país se fija por ubicación y no debe ser editable por el
// usuario.
// ═══════════════════════════════════════════════════════════════

import * as Localization from 'expo-localization';
import * as Location from 'expo-location';

const SUPPORTED = new Set([
  'ES',
  'DE',
  'FR',
  'GB',
  'IT',
  'PT',
  'US',
]);

let cachedCountry: string | null = null;

/** Devuelve el código ISO (alpha-2) según la configuración del SO. */
export function getCountryFromLocale(): string {
  try {
    const locales = Localization.getLocales();
    const region = locales?.[0]?.regionCode?.toUpperCase();
    if (region && SUPPORTED.has(region)) return region;
  } catch {
    // fall through
  }
  return 'ES';
}

/**
 * Devuelve el último país detectado. Si aún no se ha ejecutado
 * refreshCountry(), usa la región del SO como fallback sync.
 */
export function getCurrentCountry(): string {
  return cachedCountry ?? getCountryFromLocale();
}

/**
 * Pide permiso de ubicación, lee el GPS y hace reverseGeocode para
 * determinar el país real. Si el usuario niega permisos o hay
 * cualquier error, cae al país del SO. Actualiza la cache interna.
 */
export async function refreshCountry(): Promise<string> {
  try {
    const perm = await Location.requestForegroundPermissionsAsync();
    if (perm.status !== 'granted') {
      const fallback = getCountryFromLocale();
      cachedCountry = fallback;
      return fallback;
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
    });

    const results = await Location.reverseGeocodeAsync({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    const iso = results?.[0]?.isoCountryCode?.toUpperCase();
    if (iso && SUPPORTED.has(iso)) {
      cachedCountry = iso;
      return iso;
    }

    const fallback = getCountryFromLocale();
    cachedCountry = fallback;
    return fallback;
  } catch {
    const fallback = getCountryFromLocale();
    cachedCountry = fallback;
    return fallback;
  }
}
