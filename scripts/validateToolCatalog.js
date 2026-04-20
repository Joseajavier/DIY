#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// VALIDADOR DEL CATÁLOGO DE HERRAMIENTAS
// ───────────────────────────────────────────────────────────────
// Comprueba integridad de src/data/toolData.ts:
//   1. Categorías: ids únicos.
//   2. Tipos: ids únicos, categoryId apunta a categoría existente.
//   3. Marcas: ids únicos, tiers ⊆ {basic,mid,pro}.
//   4. Productos: ids únicos globales, typeId/brandId existen,
//      priceMin ≤ priceMax (ambos > 0), tier ∈ {basic,mid,pro},
//      power ∈ {battery,corded,manual}, use[] ⊆ {home,workshop,construction},
//      tier ∈ brand.tiers (warning si no).
//
// Uso:
//   node scripts/validateToolCatalog.js
//   → exit 0 si todo OK, 1 si hay errores (warnings no rompen).
// ═══════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'data', 'toolData.ts');
const src = fs.readFileSync(FILE, 'utf8');

const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

// ── Helpers ────────────────────────────────────────────────────
function extractArrayBlock(name) {
  const re = new RegExp(`export const ${name}[^\\[]*\\[([\\s\\S]*?)^\\];`, 'm');
  const m = src.match(re);
  if (!m) throw new Error(`No encuentro el array ${name}`);
  return m[1];
}

function str(block, key) {
  const m = block.match(new RegExp(`${key}:\\s*'([^']+)'`));
  return m ? m[1] : undefined;
}
function num(block, key) {
  const m = block.match(new RegExp(`${key}:\\s*(-?\\d+(?:\\.\\d+)?)`));
  return m ? Number(m[1]) : undefined;
}
function arrStr(block, key) {
  const m = block.match(new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`));
  if (!m) return [];
  return [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
}

// ── Parse TOOL_CATEGORIES ──────────────────────────────────────
const catBlock = extractArrayBlock('TOOL_CATEGORIES');
const categories = [];
for (const m of catBlock.matchAll(/\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)'/g)) {
  categories.push({ id: m[1], name: m[2] });
}

// ── Parse TOOL_TYPES ───────────────────────────────────────────
const typesBlock = extractArrayBlock('TOOL_TYPES');
const types = [];
for (const m of typesBlock.matchAll(/\{\s*id:\s*'([^']+)',\s*categoryId:\s*'([^']+)',\s*name:\s*'([^']+)'/g)) {
  types.push({ id: m[1], categoryId: m[2], name: m[3] });
}

// ── Parse TOOL_BRANDS ──────────────────────────────────────────
const brandBlock = extractArrayBlock('TOOL_BRANDS');
// Brands: split per line since each is one object per line
const brands = [];
for (const line of brandBlock.split('\n')) {
  const id = str(line, 'id');
  if (!id) continue;
  const name = str(line, 'name');
  const tiers = arrStr(line, 'tiers');
  brands.push({ id, name, tiers });
}

// ── Parse TOOL_PRODUCTS ────────────────────────────────────────
const prodBlock = extractArrayBlock('TOOL_PRODUCTS');
const products = [];
for (const line of prodBlock.split('\n')) {
  const id = str(line, 'id');
  if (!id) continue;
  products.push({
    line,
    id,
    typeId: str(line, 'typeId'),
    brandId: str(line, 'brandId'),
    model: str(line, 'model'),
    tier: str(line, 'tier'),
    power: str(line, 'power'),
    use: arrStr(line, 'use'),
    priceMin: num(line, 'priceMin'),
    priceMax: num(line, 'priceMax'),
  });
}

// ── Validaciones ───────────────────────────────────────────────
const VALID_TIERS  = new Set(['basic', 'mid', 'pro']);
const VALID_POWERS = new Set(['battery', 'corded', 'manual']);
const VALID_USES   = new Set(['home', 'workshop', 'construction']);

// 1. Categorías: ids únicos
const seenCat = new Set();
for (const c of categories) {
  if (seenCat.has(c.id)) err(`[categoría] id duplicado: '${c.id}'`);
  seenCat.add(c.id);
}

// 2. Tipos: ids únicos + categoryId existe
const seenTyp = new Set();
const catIds = new Set(categories.map((c) => c.id));
for (const t of types) {
  if (seenTyp.has(t.id)) err(`[tipo] id duplicado: '${t.id}'`);
  seenTyp.add(t.id);
  if (!catIds.has(t.categoryId)) err(`[tipo '${t.id}'] categoryId huérfano: '${t.categoryId}'`);
}

// 3. Marcas: ids únicos + tiers válidos
const seenBrand = new Set();
const brandMap = new Map();
for (const b of brands) {
  if (seenBrand.has(b.id)) err(`[marca] id duplicado: '${b.id}'`);
  seenBrand.add(b.id);
  brandMap.set(b.id, b);
  for (const t of b.tiers) {
    if (!VALID_TIERS.has(t)) err(`[marca '${b.id}'] tier inválido: '${t}'`);
  }
}

// 4. Productos
const seenProd = new Set();
const typeIds = new Set(types.map((t) => t.id));
for (const p of products) {
  if (seenProd.has(p.id)) err(`[producto] id duplicado: '${p.id}'`);
  seenProd.add(p.id);
  if (!p.typeId)  err(`[producto '${p.id}'] sin typeId`);
  else if (!typeIds.has(p.typeId)) err(`[producto '${p.id}'] typeId huérfano: '${p.typeId}'`);
  if (!p.brandId) err(`[producto '${p.id}'] sin brandId`);
  else if (!brandMap.has(p.brandId)) err(`[producto '${p.id}'] brandId huérfano: '${p.brandId}'`);
  if (p.tier && !VALID_TIERS.has(p.tier)) err(`[producto '${p.id}'] tier inválido: '${p.tier}'`);
  if (p.power && !VALID_POWERS.has(p.power)) err(`[producto '${p.id}'] power inválido: '${p.power}'`);
  for (const u of p.use) if (!VALID_USES.has(u)) err(`[producto '${p.id}'] use inválido: '${u}'`);
  if (p.priceMin === undefined || p.priceMax === undefined) {
    err(`[producto '${p.id}'] faltan priceMin/priceMax`);
  } else {
    if (p.priceMin < 0 || p.priceMax < 0) err(`[producto '${p.id}'] precio negativo`);
    if (p.priceMin > p.priceMax) err(`[producto '${p.id}'] priceMin (${p.priceMin}) > priceMax (${p.priceMax})`);
    if (p.priceMin === 0 && p.priceMax === 0) warn(`[producto '${p.id}'] precio 0/0 — ¿placeholder?`);
  }
  // Tier coherente con la marca (warning)
  if (p.tier && p.brandId && brandMap.has(p.brandId)) {
    const b = brandMap.get(p.brandId);
    if (!b.tiers.includes(p.tier)) {
      warn(`[producto '${p.id}'] tier '${p.tier}' no coincide con marca '${p.brandId}' (tiers: [${b.tiers.join(', ')}])`);
    }
  }
}

// ── Reporte ────────────────────────────────────────────────────
const rst = '\x1b[0m', red = '\x1b[31m', yel = '\x1b[33m', grn = '\x1b[32m', bold = '\x1b[1m', dim = '\x1b[2m';

console.log(`${bold}== Catálogo de herramientas ==${rst}`);
console.log(`  Categorías: ${categories.length}`);
console.log(`  Tipos:      ${types.length}`);
console.log(`  Marcas:     ${brands.length}`);
console.log(`  Productos:  ${products.length}`);
console.log('');

if (warnings.length) {
  console.log(`${yel}${bold}⚠ ${warnings.length} warning(s):${rst}`);
  warnings.forEach((w) => console.log(`  ${yel}•${rst} ${w}`));
  console.log('');
}

if (errors.length) {
  console.log(`${red}${bold}✖ ${errors.length} error(es):${rst}`);
  errors.forEach((e) => console.log(`  ${red}•${rst} ${e}`));
  console.log('');
  console.log(`${red}${bold}FAIL${rst}`);
  process.exit(1);
} else {
  console.log(`${grn}${bold}✓ OK — catálogo íntegro${rst}${warnings.length ? dim + ' (con warnings)' + rst : ''}`);
  process.exit(0);
}
