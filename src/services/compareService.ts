// ═══════════════════════════════════════════════════════════════
// COMPARE SERVICE — lista de IDs de productos a comparar (max 3).
// ───────────────────────────────────────────────────────────────
// Se persiste en MMKV para que entre navegaciones la selección
// no se pierda. Si el usuario añade un 4º, sale el más antiguo.
// ═══════════════════════════════════════════════════════════════

import React from 'react';

const MAX_COMPARE = 3;
const KEY = 'compare:ids';

// MMKV se carga vía require con fallback en memoria, igual que
// dealsService / favoritesService, para sobrevivir a entornos sin
// el módulo nativo (tests, web sin JSI, etc.).
let storage: any = null;
try {
  const { createMMKV } = require('react-native-mmkv');
  storage = createMMKV({ id: 'compare' });
} catch {
  storage = null;
}
const memFallback: { ids: string[] } = { ids: [] };

type Listener = (ids: string[]) => void;
const listeners = new Set<Listener>();

function read(): string[] {
  const raw = storage?.getString(KEY);
  if (raw) {
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr.filter((x) => typeof x === 'string');
    } catch {}
  }
  return memFallback.ids;
}

function write(ids: string[]) {
  memFallback.ids = ids;
  storage?.set(KEY, JSON.stringify(ids));
  for (const l of listeners) l(ids);
}

export function getCompareIds(): string[] {
  return read();
}

export function isInCompare(id: string): boolean {
  return read().includes(id);
}

export function addToCompare(id: string): { ok: boolean; full: boolean } {
  const cur = read();
  if (cur.includes(id)) return { ok: true, full: false };
  if (cur.length >= MAX_COMPARE) {
    // Drop oldest, add new
    write([...cur.slice(1), id]);
    return { ok: true, full: true };
  }
  write([...cur, id]);
  return { ok: true, full: false };
}

export function removeFromCompare(id: string): void {
  write(read().filter((x) => x !== id));
}

export function clearCompare(): void {
  write([]);
}

export function toggleCompare(id: string): boolean {
  if (isInCompare(id)) {
    removeFromCompare(id);
    return false;
  }
  addToCompare(id);
  return true;
}

export function subscribeCompare(cb: Listener): () => void {
  listeners.add(cb);
  cb(read());
  return () => {
    listeners.delete(cb);
  };
}

export function useCompare(): string[] {
  const [ids, setIds] = React.useState<string[]>(() => read());
  React.useEffect(() => subscribeCompare(setIds), []);
  return ids;
}

export { MAX_COMPARE };
