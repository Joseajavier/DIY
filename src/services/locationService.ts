// ═══════════════════════════════════════════════════════════════
// LOCATION SERVICE — detecta el país del dispositivo.
// ───────────────────────────────────────────────────────────────
// Usa expo-localization para obtener el región del sistema.
// Si el usuario cambia manualmente el país desde la UI, lo
// persistimos con MMKV (via settingsStorage) y esa preferencia
// tiene prioridad sobre la detección automática.
// ═══════════════════════════════════════════════════════════════

import * as Localization from 'expo-localization';

const SUPPORTED = new Set([
  'ES',
  'DE',
  'FR',
  'GB',
  'IT',
  'PT',
  'US',
]);

let userOverride: string | null = null;

/**
 * Devuelve el código ISO del país (alpha-2) del dispositivo o la
 * preferencia del usuario si existe. Fallback: 'ES'.
 */
export function getCurrentCountry(): string {
  if (userOverride && SUPPORTED.has(userOverride)) return userOverride;
  try {
    const locales = Localization.getLocales();
    const region = locales?.[0]?.regionCode?.toUpperCase();
    if (region && SUPPORTED.has(region)) return region;
  } catch {
    // fall through
  }
  return 'ES';
}

/** Permite al usuario fijar manualmente un país desde la UI. */
export function setUserCountry(country: string): void {
  if (SUPPORTED.has(country.toUpperCase())) {
    userOverride = country.toUpperCase();
  }
}

/** Borra el override del usuario. */
export function clearUserCountry(): void {
  userOverride = null;
}
