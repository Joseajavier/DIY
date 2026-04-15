// ═══════════════════════════════════════════════════════════════
// FAVORITES SERVICE — guarda IDs de productos favoritos en MMKV.
// ───────────────────────────────────────────────────────────────
// Uso:
//   addFavorite('bosch-gbh-18v-26')
//   removeFavorite('bosch-gbh-18v-26')
//   isFavorite('bosch-gbh-18v-26')  // boolean
//   getFavorites()                   // string[] (IDs)
//   subscribeFavorites(cb)           // hook-friendly
//   useFavorites()                   // React hook
//
// Si el módulo nativo de MMKV no está disponible (p.ej. en tests o
// en web sin JSI), caemos a un Map en memoria como hace dealsService.
// ═══════════════════════════════════════════════════════════════

import React from 'react';

let storage: any = null;
const memoryFallback: Map<string, string> = new Map();

try {
  const { MMKV } = require('react-native-mmkv');
  storage = new MMKV({ id: 'favorites' });
} catch {
  console.warn('[Favorites] MMKV native module not available, using memory fallback');
}

const KEY = 'fav:tools';

type Listener = (ids: string[]) => void;
const listeners = new Set<Listener>();

function getString(key: string): string | undefined {
  if (storage) return storage.getString(key);
  return memoryFallback.get(key);
}

function setString(key: string, value: string): void {
  if (storage) {
    storage.set(key, value);
    return;
  }
  memoryFallback.set(key, value);
}

function read(): string[] {
  const raw = getString(KEY);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function write(ids: string[]): void {
  setString(KEY, JSON.stringify(ids));
  for (const l of listeners) l(ids);
}

export function getFavorites(): string[] {
  return read();
}

export function isFavorite(id: string): boolean {
  return read().includes(id);
}

export function addFavorite(id: string): void {
  const cur = read();
  if (cur.includes(id)) return;
  write([...cur, id]);
}

export function removeFavorite(id: string): void {
  const cur = read();
  if (!cur.includes(id)) return;
  write(cur.filter((x) => x !== id));
}

export function toggleFavorite(id: string): boolean {
  if (isFavorite(id)) {
    removeFavorite(id);
    return false;
  }
  addFavorite(id);
  return true;
}

export function clearFavorites(): void {
  write([]);
}

/** Subscribe to favorites changes. Returns unsubscribe fn. */
export function subscribeFavorites(cb: Listener): () => void {
  listeners.add(cb);
  cb(read()); // initial emit
  return () => {
    listeners.delete(cb);
  };
}

/** React hook helper. */
export function useFavorites(): string[] {
  const [state, setState] = React.useState<string[]>(() => read());
  React.useEffect(() => subscribeFavorites(setState), []);
  return state;
}
