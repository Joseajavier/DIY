import { ToolProduct, ToolFilter } from '../models/tools';
import { TOOL_PRODUCTS, TOOL_TYPES, TOOL_BRANDS } from '../data/toolData';

export function searchTools(filter: ToolFilter): ToolProduct[] {
  let results = [...TOOL_PRODUCTS];

  if (filter.categoryId) {
    const typeIds = TOOL_TYPES.filter(t => t.categoryId === filter.categoryId).map(t => t.id);
    results = results.filter(p => typeIds.includes(p.typeId));
  }
  if (filter.typeId) results = results.filter(p => p.typeId === filter.typeId);
  if (filter.tier) results = results.filter(p => p.tier === filter.tier);
  if (filter.use) results = results.filter(p => p.use.includes(filter.use!));
  if (filter.power) results = results.filter(p => p.power === filter.power);
  if (filter.priceMax) results = results.filter(p => p.priceMin <= filter.priceMax!);
  if (filter.query) {
    const q = filter.query.toLowerCase();
    results = results.filter(p => {
      const brand = TOOL_BRANDS.find(b => b.id === p.brandId);
      const type = TOOL_TYPES.find(t => t.id === p.typeId);
      return p.model.toLowerCase().includes(q) ||
        (brand?.name.toLowerCase().includes(q)) ||
        (type?.name.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q);
    });
  }

  return results;
}

export function getToolBrandName(brandId: string): string {
  return TOOL_BRANDS.find(b => b.id === brandId)?.name ?? brandId;
}

export function getToolTypeName(typeId: string): string {
  return TOOL_TYPES.find(t => t.id === typeId)?.name ?? typeId;
}
