import { WoodProduct, WoodFilter } from '../models/wood';
import { WOOD_PRODUCTS } from '../data/woodData';

/**
 * Busca maderas aplicando un filtro.
 * @param filter criterio de busqueda
 * @param source productos a buscar. Si se omite, usa el catalogo LOCAL (fallback).
 *   Pasa aqui la respuesta del backend (fetchWoodCatalog) para usar datos remotos.
 */
export function searchWood(filter: WoodFilter, source?: WoodProduct[]): WoodProduct[] {
  let results = [...(source ?? WOOD_PRODUCTS)];

  if (filter.categoryId) results = results.filter(p => p.categoryId === filter.categoryId);
  if (filter.use) results = results.filter(p => p.use === filter.use || p.use === 'both');
  if (filter.hardness) results = results.filter(p => p.hardness === filter.hardness);
  if (filter.priceLevel) results = results.filter(p => p.priceLevel === filter.priceLevel);
  if (filter.query) {
    const q = filter.query.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.bestFor.toLowerCase().includes(q)
    );
  }

  return results;
}
