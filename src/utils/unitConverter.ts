type Unit = 'cm' | 'mm' | 'in';

const TO_CM: Record<Unit, number> = {
  cm: 1,
  mm: 0.1,
  in: 2.54,
};

const FROM_CM: Record<Unit, number> = {
  cm: 1,
  mm: 10,
  in: 1 / 2.54,
};

export function convert(value: number, from: Unit, to: Unit): number {
  if (from === to) return value;
  const inCm = value * TO_CM[from];
  return Math.round(inCm * FROM_CM[to] * 100) / 100;
}

export function formatWithUnit(value: number, unit: Unit): string {
  return `${value} ${unit}`;
}

export function getUnitLabel(unit: Unit): string {
  switch (unit) {
    case 'cm': return 'centímetros';
    case 'mm': return 'milímetros';
    case 'in': return 'pulgadas';
  }
}
