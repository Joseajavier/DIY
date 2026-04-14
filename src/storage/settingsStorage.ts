// MMKV with graceful fallback to in-memory if native module is missing
let storage: any = null;
const memoryFallback: Record<string, any> = {};

try {
  const { createMMKV } = require('react-native-mmkv');
  storage = createMMKV({ id: 'diy-settings' });
} catch {
  console.warn('[Settings] MMKV native module not available, using memory fallback');
}

function getString(key: string): string | undefined {
  if (storage) return storage.getString(key);
  return memoryFallback[key];
}

function setString(key: string, value: string): void {
  if (storage) storage.set(key, value);
  memoryFallback[key] = value;
}

function getBoolean(key: string): boolean | undefined {
  if (storage) return storage.getBoolean(key);
  return memoryFallback[key];
}

function setBool(key: string, value: boolean): void {
  if (storage) storage.set(key, value);
  memoryFallback[key] = value;
}

const KEYS = {
  SELECTED_MODE: '@diy_selected_mode',
  LAST_PROJECT_ID: '@diy_last_project_id',
  USER_UNITS: '@diy_user_units',
  HAS_SEEN_ONBOARDING: '@diy_has_seen_onboarding',
} as const;

// ── Mode ──
export function getSelectedMode(): 'diy' | 'pro' {
  const value = getString(KEYS.SELECTED_MODE);
  return value === 'pro' ? 'pro' : 'diy';
}

export function setSelectedMode(mode: 'diy' | 'pro'): void {
  setString(KEYS.SELECTED_MODE, mode);
}

// ── Last Project ──
export function getLastProjectId(): string | null {
  return getString(KEYS.LAST_PROJECT_ID) ?? null;
}

export function setLastProjectId(id: string): void {
  setString(KEYS.LAST_PROJECT_ID, id);
}

// ── Units ──
export function getUserUnits(): 'cm' | 'mm' | 'in' {
  const value = getString(KEYS.USER_UNITS);
  if (value === 'mm' || value === 'in') return value;
  return 'cm';
}

export function setUserUnits(units: 'cm' | 'mm' | 'in'): void {
  setString(KEYS.USER_UNITS, units);
}

// ── Onboarding ──
export function getHasSeenOnboarding(): boolean {
  return getBoolean(KEYS.HAS_SEEN_ONBOARDING) ?? false;
}

export function setHasSeenOnboarding(value: boolean): void {
  setBool(KEYS.HAS_SEEN_ONBOARDING, value);
}
