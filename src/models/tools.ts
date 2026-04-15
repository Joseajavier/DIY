export type ToolTier = 'basic' | 'mid' | 'pro';
export type ToolUse = 'home' | 'workshop' | 'construction';
export type ToolPower = 'battery' | 'corded' | 'manual';

export interface ToolCategory {
  id: string;
  name: string;
  icon: string;
}

export interface ToolType {
  id: string;
  categoryId: string;
  name: string;
  icon: string;
}

export interface ToolBrand {
  id: string;
  name: string;
  tiers: ToolTier[];
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
