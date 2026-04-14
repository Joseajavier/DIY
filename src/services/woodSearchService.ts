import { WoodProduct, WoodFilter } from '../models/wood';
import { WOOD_PRODUCTS } from '../data/woodData';

export function searchWood(filter: WoodFilter): WoodProduct[] {
  let results = [...WOOD_PRODUCTS];

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
