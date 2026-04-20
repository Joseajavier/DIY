export type ToolTier = 'basic' | 'mid' | 'pro';
export type ToolUse = 'home' | 'workshop' | 'construction';
export type ToolPower = 'battery' | 'corded' | 'manual';

export interface ToolCategory {
  id: string;
  name: string;
  /** Clave i18n opcional; si existe, prevalece sobre `name` al mostrar */
  nameKey?: string;
  icon: string;
}

export interface ToolType {
  id: string;
  categoryId: string;
  name: string;
  /** Clave i18n opcional; si existe, prevalece sobre `name` al mostrar */
  nameKey?: string;
  icon: string;
}

export interface ToolBrand {
  id: string;
  name: string;
  tiers: ToolTier[];
  /** Imagen local require() o URL remota */
  logo?: any;
  /** Nivel de la marca: diy / prosumer / pro / premium / accessories */
  level?: 'diy' | 'prosumer' | 'pro' | 'premium' | 'accessories';
  /** País de origen */
  origin?: string;
}

export interface ToolProduct {
  id: string;
  typeId: string;
  brandId: string;
  model: string;
  tier: ToolTier;
  use: ToolUse[];
  power: ToolPower;
  priceMin: number;
  priceMax: number;
  description: string;
  features: string[];
  bestFor: string;
  /** URL absoluta a imagen del producto (fabricante, Amazon, tienda oficial). Optional. */
  imageUrl?: string;
}

export interface ToolFilter {
  typeId?: string;
  categoryId?: string;
  tier?: ToolTier;
  use?: ToolUse;
  priceMax?: number;
  power?: ToolPower;
  query?: string;
}
