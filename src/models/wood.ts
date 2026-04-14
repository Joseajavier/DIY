export type WoodUse = 'interior' | 'exterior' | 'both';
export type WoodHardness = 'soft' | 'medium' | 'hard' | 'very_hard';
export type WoodPrice = 'budget' | 'mid' | 'premium';

export interface WoodCategory {
  id: string;
  name: string;
  icon: string;
}

export interface WoodProduct {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  use: WoodUse;
  hardness: WoodHardness;
  priceLevel: WoodPrice;
  priceRange: string;
  commonSizes: string[];
  thicknesses?: number[];
  pros: string[];
  cons: string[];
  bestFor: string;
  color: string;
}

export interface WoodFilter {
  categoryId?: string;
  use?: WoodUse;
  hardness?: WoodHardness;
  priceLevel?: WoodPrice;
  query?: string;
}
