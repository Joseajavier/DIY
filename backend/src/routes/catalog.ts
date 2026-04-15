import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const TOOLS_PATH = path.join(__dirname, '../../data/tools.json');
const WOOD_PATH = path.join(__dirname, '../../data/wood.json');

function readTools() {
  const raw = fs.readFileSync(TOOLS_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeTools(data: any) {
  fs.writeFileSync(TOOLS_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function readWood() {
  const raw = fs.readFileSync(WOOD_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeWood(data: any) {
  fs.writeFileSync(WOOD_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// GET /catalog/tools — devuelve todo el catálogo con filtros opcionales
router.get('/tools', (req: Request, res: Response) => {
  const data = readTools();

  let products = data.products || [];

  // Filtros opcionales por query params
  const { category, type, tier, use, power, q } = req.query;

  if (category) {
    const typeIds = data.types
      .filter((t: any) => t.categoryId === category)
      .map((t: any) => t.id);
    products = products.filter((p: any) => typeIds.includes(p.typeId));
  }
  if (type) products = products.filter((p: any) => p.typeId === type);
  if (tier) products = products.filter((p: any) => p.tier === tier);
  if (use) products = products.filter((p: any) => p.use?.includes(use));
  if (power) products = products.filter((p: any) => p.power === power);
  if (q) {
    const query = String(q).toLowerCase();
    products = products.filter((p: any) => {
      const brand = data.brands.find((b: any) => b.id === p.brandId);
      return p.model?.toLowerCase().includes(query) ||
        brand?.name?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query);
    });
  }

  res.json({
    version: data.version,
    lastUpdated: data.lastUpdated,
    categories: data.categories,
    types: data.types,
    brands: data.brands,
    products,
    totalProducts: products.length,
  });
});

// GET /catalog/tools/stats — estadísticas del catálogo
router.get('/tools/stats', (_req: Request, res: Response) => {
  const data = readTools();
  const products = data.products || [];

  res.json({
    version: data.version,
    lastUpdated: data.lastUpdated,
    totalProducts: products.length,
    totalBrands: data.brands.length,
    totalTypes: data.types.length,
    totalCategories: data.categories.length,
    byTier: {
      basic: products.filter((p: any) => p.tier === 'basic').length,
      mid: products.filter((p: any) => p.tier === 'mid').length,
      pro: products.filter((p: any) => p.tier === 'pro').length,
    },
  });
});

// POST /catalog/tools/product — añadir un producto (admin)
router.post('/tools/product', (req: Request, res: Response) => {
  const data = readTools();
  const product = req.body;

  if (!product.id || !product.typeId || !product.brandId || !product.model) {
    res.status(400).json({ error: 'Faltan campos: id, typeId, brandId, model' });
    return;
  }

  // Comprobar que el id no existe
  if (!data.products) data.products = [];
  const exists = data.products.find((p: any) => p.id === product.id);
  if (exists) {
    res.status(409).json({ error: `El producto ${product.id} ya existe` });
    return;
  }

  // Valores por defecto
  const newProduct = {
    id: product.id,
    typeId: product.typeId,
    brandId: product.brandId,
    model: product.model,
    tier: product.tier || 'mid',
    use: product.use || ['workshop'],
    power: product.power || 'corded',
    priceMin: product.priceMin || 0,
    priceMax: product.priceMax || 0,
    description: product.description || '',
    features: product.features || [],
    bestFor: product.bestFor || '',
    rating: product.rating || 4.0,
    reviewCount: product.reviewCount || 0,
    imageUrl: product.imageUrl || null,
  };

  data.products.push(newProduct);
  data.version = (data.version || 0) + 1;
  data.lastUpdated = new Date().toISOString().split('T')[0];

  writeTools(data);

  res.json({ ok: true, product: newProduct, totalProducts: data.products.length });
});

// PUT /catalog/tools/product/:id — actualizar un producto
router.put('/tools/product/:id', (req: Request, res: Response) => {
  const data = readTools();
  if (!data.products) data.products = [];

  const idx = data.products.findIndex((p: any) => p.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: `Producto ${req.params.id} no encontrado` });
    return;
  }

  data.products[idx] = { ...data.products[idx], ...req.body, id: req.params.id };
  data.version = (data.version || 0) + 1;
  data.lastUpdated = new Date().toISOString().split('T')[0];

  writeTools(data);

  res.json({ ok: true, product: data.products[idx] });
});

// DELETE /catalog/tools/product/:id — eliminar un producto
router.delete('/tools/product/:id', (req: Request, res: Response) => {
  const data = readTools();
  if (!data.products) data.products = [];

  const before = data.products.length;
  data.products = data.products.filter((p: any) => p.id !== req.params.id);

  if (data.products.length === before) {
    res.status(404).json({ error: `Producto ${req.params.id} no encontrado` });
    return;
  }

  data.version = (data.version || 0) + 1;
  data.lastUpdated = new Date().toISOString().split('T')[0];

  writeTools(data);

  res.json({ ok: true, deleted: req.params.id });
});

// ════════════════════════════════════════════════════════════
// WOOD CATALOG — paralelo al de tools
// ════════════════════════════════════════════════════════════

// GET /catalog/wood — devuelve el catalogo de maderas con filtros opcionales
router.get('/wood', (req: Request, res: Response) => {
  const data = readWood();
  let products = data.products || [];

  const { category, hardness, priceLevel, use, q } = req.query;

  if (category) products = products.filter((p: any) => p.categoryId === category);
  if (hardness) products = products.filter((p: any) => p.hardness === hardness);
  if (priceLevel) products = products.filter((p: any) => p.priceLevel === priceLevel);
  if (use) products = products.filter((p: any) => p.use === use || p.use === 'both');
  if (q) {
    const query = String(q).toLowerCase();
    products = products.filter((p: any) =>
      p.name?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.bestFor?.toLowerCase().includes(query)
    );
  }

  res.json({
    version: data.version,
    lastUpdated: data.lastUpdated,
    categories: data.categories,
    products,
    totalProducts: products.length,
  });
});

// GET /catalog/wood/stats — estadisticas del catalogo de maderas
router.get('/wood/stats', (_req: Request, res: Response) => {
  const data = readWood();
  const products = data.products || [];

  res.json({
    version: data.version,
    lastUpdated: data.lastUpdated,
    totalProducts: products.length,
    totalCategories: data.categories?.length || 0,
    byHardness: {
      soft: products.filter((p: any) => p.hardness === 'soft').length,
      medium: products.filter((p: any) => p.hardness === 'medium').length,
      hard: products.filter((p: any) => p.hardness === 'hard').length,
      very_hard: products.filter((p: any) => p.hardness === 'very_hard').length,
    },
    byPriceLevel: {
      budget: products.filter((p: any) => p.priceLevel === 'budget').length,
      mid: products.filter((p: any) => p.priceLevel === 'mid').length,
      premium: products.filter((p: any) => p.priceLevel === 'premium').length,
    },
    byUse: {
      interior: products.filter((p: any) => p.use === 'interior').length,
      exterior: products.filter((p: any) => p.use === 'exterior').length,
      both: products.filter((p: any) => p.use === 'both').length,
    },
  });
});

// POST /catalog/wood/product — añadir una madera (admin)
router.post('/wood/product', (req: Request, res: Response) => {
  const data = readWood();
  const product = req.body;

  if (!product.id || !product.categoryId || !product.name) {
    res.status(400).json({ error: 'Faltan campos: id, categoryId, name' });
    return;
  }

  if (!data.products) data.products = [];
  const exists = data.products.find((p: any) => p.id === product.id);
  if (exists) {
    res.status(409).json({ error: `La madera ${product.id} ya existe` });
    return;
  }

  const newProduct = {
    id: product.id,
    categoryId: product.categoryId,
    name: product.name,
    description: product.description || '',
    use: product.use || 'interior',
    hardness: product.hardness || 'medium',
    priceLevel: product.priceLevel || 'mid',
    priceRange: product.priceRange || '',
    commonSizes: product.commonSizes || [],
    thicknesses: product.thicknesses || undefined,
    pros: product.pros || [],
    cons: product.cons || [],
    bestFor: product.bestFor || '',
    color: product.color || '',
  };

  data.products.push(newProduct);
  data.version = (data.version || 0) + 1;
  data.lastUpdated = new Date().toISOString().split('T')[0];
  data.totalProducts = data.products.length;

  writeWood(data);

  res.json({ ok: true, product: newProduct, totalProducts: data.products.length });
});

// PUT /catalog/wood/product/:id — actualizar una madera
router.put('/wood/product/:id', (req: Request, res: Response) => {
  const data = readWood();
  if (!data.products) data.products = [];

  const idx = data.products.findIndex((p: any) => p.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: `Madera ${req.params.id} no encontrada` });
    return;
  }

  data.products[idx] = { ...data.products[idx], ...req.body, id: req.params.id };
  data.version = (data.version || 0) + 1;
  data.lastUpdated = new Date().toISOString().split('T')[0];

  writeWood(data);

  res.json({ ok: true, product: data.products[idx] });
});

// DELETE /catalog/wood/product/:id — eliminar una madera
router.delete('/wood/product/:id', (req: Request, res: Response) => {
  const data = readWood();
  if (!data.products) data.products = [];

  const before = data.products.length;
  data.products = data.products.filter((p: any) => p.id !== req.params.id);

  if (data.products.length === before) {
    res.status(404).json({ error: `Madera ${req.params.id} no encontrada` });
    return;
  }

  data.version = (data.version || 0) + 1;
  data.lastUpdated = new Date().toISOString().split('T')[0];
  data.totalProducts = data.products.length;

  writeWood(data);

  res.json({ ok: true, deleted: req.params.id });
});

export default router;
