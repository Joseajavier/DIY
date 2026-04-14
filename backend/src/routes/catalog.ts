import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const TOOLS_PATH = path.join(__dirname, '../../data/tools.json');

function readTools() {
  const raw = fs.readFileSync(TOOLS_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeTools(data: any) {
  fs.writeFileSync(TOOLS_PATH, JSON.stringify(data, null, 2), 'utf-8');
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

export default router;
