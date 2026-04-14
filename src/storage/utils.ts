export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function nowISO(): string {
  return new Date().toISOString();
}
