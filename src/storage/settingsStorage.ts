import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV({ id: 'diy-settings' });

const KEYS = {
  SELECTED_MODE: '@diy_selected_mode',
  LAST_PROJECT_ID: '@diy_last_project_id',
  USER_UNITS: '@diy_user_units',
  HAS_SEEN_ONBOARDING: '@diy_has_seen_onboarding',
} as const;

// ── Mode ──
export function getSelectedMode(): 'diy' | 'pro' {
  const value = storage.getString(KEYS.SELECTED_MODE);
  return value === 'pro' ? 'pro' : 'diy';
}

export function setSelectedMode(mode: 'diy' | 'pro'): void {
  storage.set(KEYS.SELECTED_MODE, mode);
}

// ── Last Project ──
export function getLastProjectId(): string | null {
  return storage.getString(KEYS.LAST_PROJECT_ID) ?? null;
}

export function setLastProjectId(id: string): void {
  storage.set(KEYS.LAST_PROJECT_ID, id);
}

// ── Units ──
export function getUserUnits(): 'cm' | 'mm' | 'in' {
  const value = storage.getString(KEYS.USER_UNITS);
  if (value === 'mm' || value === 'in') return value;
  return 'cm';
}

export function setUserUnits(units: 'cm' | 'mm' | 'in'): void {
  storage.set(KEYS.USER_UNITS, units);
}

// ── Onboarding ──
export function getHasSeenOnboarding(): boolean {
  return storage.getBoolean(KEYS.HAS_SEEN_ONBOARDING) ?? false;
}

export function setHasSeenOnboarding(value: boolean): void {
  storage.set(KEYS.HAS_SEEN_ONBOARDING, value);
}
