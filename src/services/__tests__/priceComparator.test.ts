import { comparePrices } from '../priceComparator';
import { StoreOption } from '../../models';

function store(
  name: string,
  price: number,
  time: string,
  score: number,
): StoreOption {
  return { name, price, time, score, type: 'online' };
}

describe('comparePrices', () => {
  test('devuelve resultado vacío si no hay tiendas', () => {
    const result = comparePrices([]);
    expect(result.ranked).toEqual([]);
    expect(result.best).toBeNull();
    expect(result.cheapest).toBeNull();
    expect(result.fastest).toBeNull();
  });

  test('identifica la más barata y la más rápida por separado', () => {
    const stores = [
      store('Leroy', 100, '3-5 días', 8),
      store('Bauhaus', 120, 'Disponible hoy', 9),
      store('Amazon', 90, '15-30 días', 7),
    ];
    const result = comparePrices(stores);
    expect(result.cheapest?.name).toBe('Amazon');
    expect(result.fastest?.name).toBe('Bauhaus');
    expect(result.ranked).toHaveLength(3);
  });

  test('cuando una sola tienda gana en todo, la recomendación lo refleja', () => {
    const stores = [
      store('Ganadora', 50, 'Disponible hoy', 10),
      store('Otra', 200, '15-30 días', 2),
    ];
    const result = comparePrices(stores);
    expect(result.best?.name).toBe('Ganadora');
    expect(result.cheapest?.name).toBe('Ganadora');
    expect(result.fastest?.name).toBe('Ganadora');
    expect(result.recommendation).toContain('Ganadora');
    expect(result.recommendation).toContain('más barato');
    expect(result.recommendation).toContain('más rápido');
  });

  test('ranked está ordenado por score descendente', () => {
    const stores = [
      store('A', 100, '3-5 días', 5),
      store('B', 80, '1-2 días', 7),
      store('C', 150, '5-7 días', 9),
    ];
    const result = comparePrices(stores);
    for (let i = 0; i < result.ranked.length - 1; i++) {
      expect(result.ranked[i].score).toBeGreaterThanOrEqual(
        result.ranked[i + 1].score,
      );
    }
  });

  test('un tiempo de entrega desconocido no rompe el cálculo', () => {
    const stores = [
      store('Rara', 100, 'Plazo inventado', 7),
      store('Normal', 120, '1-2 días', 7),
    ];
    const result = comparePrices(stores);
    expect(result.ranked).toHaveLength(2);
    expect(result.best).not.toBeNull();
  });
});
