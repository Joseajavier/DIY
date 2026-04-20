import { ToolProduct, ToolFilter } from '../models/tools';
import { TOOL_PRODUCTS, TOOL_TYPES, TOOL_BRANDS, TOOL_CATEGORIES } from '../data/toolData';
import i18n from '../i18n';

export function searchTools(filter: ToolFilter, products?: ToolProduct[]): ToolProduct[] {
  let results = [...(products ?? TOOL_PRODUCTS)];

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
  const tt = TOOL_TYPES.find(t => t.id === typeId);
  if (!tt) return typeId;
  if (tt.nameKey) return i18n.t(tt.nameKey, { defaultValue: tt.name });
  return tt.name;
}

export function getToolCategoryName(categoryId: string): string {
  const c = TOOL_CATEGORIES.find(x => x.id === categoryId);
  if (!c) return categoryId;
  if (c.nameKey) return i18n.t(c.nameKey, { defaultValue: c.name });
  return c.name;
}
