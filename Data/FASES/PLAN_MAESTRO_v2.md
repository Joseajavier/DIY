# PLAN MAESTRO DIY APP v2

**Fecha:** 2026-04-14 | **Última actualización:** 2026-04-16 (log nocturno automático)
**Estado actual:** MVP funcional con 16+ pantallas, backend con IA, catalogos conectados al backend — Bloque A en progreso (107 herramientas · 28 maderas en main)

---

## RESUMEN DE LO QUE YA ESTA HECHO (Fases 1-9)

| # | Fase | Estado |
|---|------|--------|
| 1 | Base proyecto + navegacion | HECHO |
| 2 | SQLite + MMKV persistencia | HECHO |
| 3a | Motor logica (cortador FFD, materiales, tiendas) | HECHO |
| 3b | Tema rustico + i18n ES/EN | HECHO |
| 4 | Backend Express + OpenAI (DIY + PRO con tools) | HECHO |
| 5 | Integracion end-to-end (hooks, fallback, persistencia) | HECHO |
| 6 | MVP polish (proyectos, onboarding, settings, compartir) | HECHO |
| 7 | Beta ops (EAS builds, Sentry, analytics, feedback) | HECHO |
| 8 | Roadmap post-beta (9 docs estrategia) | HECHO |
| 9 | Documentacion maestra | HECHO |

**Lo que funciona hoy:**
- App completa DIY + PRO con IA y fallback local
- 76 herramientas + 20 maderas en catalogos con filtros
- Backend CRUD para herramientas (JSON file)
- Tema claro rustico (crema + cobre)
- i18n ES/EN
- SQLite para proyectos, MMKV para preferencias
- Sentry + analytics basico

---

## FASES PENDIENTES REORGANIZADAS

### BLOQUE A: CATALOGOS COMPLETOS (hacer ahora)

#### A1 — Catalogo completo de herramientas
**Antes:** Fases 13 + 16 (duplicadas)
**Estado:** 🟡 EN PROGRESO — **107 / 150 productos** (71%) — actualizado 2026-04-16
**Que hacer:**
- ~~Ampliar de 76~~ → ya en 107 (+31 desde base, +9 esta noche). Faltan ~43 para llegar a 150
- Marcas faltantes: Tacklife, Hychika, Ridgid, Fein, Powermatic, Jet, Laguna, SawStop
- Tipos faltantes: sierra de marqueteria, torno, lijadora de tambor, escopleadora, espigadora, fresadora de mesa, clavadora
- Rating y reviewCount reales (investigar Amazon/reviews)
- Mejorar diseño de tarjeta (mas info visible, mejor layout)
**Dependencias:** Ninguna
**Esfuerzo:** 3-4 horas (restante ~2h)

#### A2 — Catalogo completo de maderas
**Antes:** Fase 14 (parcialmente hecha)
**Estado:** 🟡 EN PROGRESO — **28 / 40 maderas** (70%) en `backend/data/wood.json` — actualizado 2026-04-16
✅ **`backend/data/wood.json` CREADO** — endpoint GET /catalog/wood activo
**Que hacer:**
- ~~Ampliar de 20~~ → ya en 28 (+8 total, +3 esta noche). Faltan ~12 para llegar a 40
- Completar precios reales mercado español 2024-2026
- Añadir variantes de tamaño con precios por cada madera
- ~~Crear `backend/data/wood.json`~~ ✅ HECHO (2026-04-16)
- ~~Endpoint GET /catalog/wood~~ ✅ HECHO (2026-04-16)
**Dependencias:** Ninguna
**Esfuerzo:** 2-3 horas (restante ~1h)

#### A3 — Conectar app con backend para catalogos
**Antes:** Parte de Fase 15
**Estado:** 🟢 EN PROGRESO — **85%** — actualizado 2026-04-16
**Que hacer:**
- ~~ToolSearchScreen: intentar GET /catalog/tools primero, fallback a datos locales~~ ✅ HECHO (bd4b7e7)
- ~~WoodCatalogScreen: intentar GET /catalog/wood primero, fallback a datos locales~~ ✅ HECHO
- ~~Cache en memoria 24h (ya existe catalogApiClient.ts base)~~ ✅ HECHO
- Indicador de "datos actualizados" vs "datos offline" — pendiente
**Dependencias:** A1, A2 (ambas en progreso)
**Esfuerzo:** restante ~0.5h

---

### BLOQUE B: ACTUALIZACION DINAMICA DE CATALOGOS (hacer despues de A)

#### B1 — Google Sheets como CMS
**Antes:** Fase 15
**Que hacer:**
- Google Sheet con pestañas: Herramientas, Maderas
- Backend lee Sheet cada 6h con cron (google-spreadsheet npm)
- Cache en memoria del backend + fallback a JSON estatico
- El propietario edita precios/productos desde Google Sheets sin tocar codigo
**Prerrequisitos:**
- Crear proyecto Google Cloud (gratis)
- Habilitar Google Sheets API
- Service Account + credenciales JSON
**Dependencias:** A3 (endpoints ya funcionando)
**Esfuerzo:** 3-4 horas (incluye setup Google Cloud)

---

### BLOQUE C: PRODUCTOS REALES Y MONETIZACION (necesita registro externo)

#### C1 — Integracion Amazon Associates
**Antes:** Fase 12
**Que hacer:**
- Registrarse en Amazon Associates España (1-2 dias aprobacion)
- Backend: amazonProductService.ts con PA-API 5.0
- Endpoints: POST /shop/search, POST /shop/materials-search
- Cache 1h en backend
- App: ProductCard con foto real + precio + enlace afiliado
- ShopScreen muestra productos reales en vez de tiendas mock
- Fallback a mock si API falla
**Prerrequisitos (BLOQUEANTE):**
- Cuenta Amazon Associates aprobada
- Associate Tag + Access Key + Secret Key
**Multi-pais:** Detectar idioma del usuario para .es/.co.uk/.fr/.de/.it
**Comision estimada:** 1-10% por categoria (3-5% tipico tools/DIY)
**Dependencias:** Bloque A completado
**Esfuerzo:** 4-5 horas (una vez tenga credenciales)

---

### BLOQUE D: PULIDO Y QA (hacer antes de release publico)

#### D1 — QA y hardening
**Antes:** Fase 11
**Que hacer:**
- Validar flujos criticos: DIY completo, PRO completo, editar proyecto, eliminar, duplicar
- Edge cases: inputs vacios, medidas invalidas, backend caido, respuesta IA corrupta, doble submit
- Performance: renders innecesarios, listas grandes, memoizacion
- Accesibilidad: tamaños/contrastes, accessibilityLabel, targets tactiles
- Loading/error/empty states consistentes en todas las pantallas
- Revisar textos i18n (completar traducciones faltantes)
**Dependencias:** Bloques A y B
**Esfuerzo:** 4-5 horas

#### D2 — Mejora visual final
**Antes:** Fase 10
**Que hacer:**
- Repasar consistencia visual entre pantallas
- Mejorar cards de herramientas y maderas (aspecto Amazon-like)
- Componentes reutilizables: AppHeader, HeroCard mejorado
- Animaciones sutiles (entrada de cards, transiciones)
- Iconos Lucide en vez de emojis donde proceda
**Dependencias:** D1
**Esfuerzo:** 3-4 horas

---

### BLOQUE E: DEPLOY (hacer cuando todo lo anterior este listo)

#### E1 — Deploy backend en AWS
**Antes:** Fase 17
**Que hacer:**
1. EC2 t3.small + Ubuntu 22.04
2. Docker + Docker Compose (backend + nginx)
3. SSL con Let's Encrypt
4. .env con OPENAI_API_KEY
5. Elastic IP
6. Dominio (si tiene) apuntando al IP
7. CloudWatch basico (CPU, RAM, disco)
8. Alertas si CPU > 80%
**Coste:** ~15€/mes VM + 50-100€/mes OpenAI = 65-115€/mes
**Prerrequisitos:**
- Confirmar que quiere Opcion A (t3.small + OpenAI)
- Fases anteriores cerradas para beta real
**Esfuerzo:** 2-3 horas

#### E2 — Build de produccion de la app
**Que hacer:**
- EAS Build perfil production
- Testflight (iOS) / Internal Testing (Android)
- Verificar app apunta al backend AWS
- Smoke test completo
**Dependencias:** E1
**Esfuerzo:** 1-2 horas

---

## ORDEN RECOMENDADO DE EJECUCION

```
SEMANA 1: CATALOGOS
  A1 → Herramientas completas (150 productos)
  A2 → Maderas completas (40 productos)
  A3 → Conectar app con backend

SEMANA 2: DINAMICO + CALIDAD
  B1 → Google Sheets CMS
  D1 → QA y hardening

SEMANA 3: VISUAL + DEPLOY
  D2 → Mejora visual final
  E1 → Deploy AWS
  E2 → Build produccion

CUANDO TENGA CREDENCIALES AMAZON:
  C1 → Amazon Associates (puede ser en paralelo)
```

---

## COMPARATIVA: ANTES vs AHORA

| Antes (17 fases) | Ahora (8 bloques) | Cambio |
|------|------|--------|
| Fase 10: Rediseño visual | D2 | Fusionada con QA |
| Fase 11: QA/Hardening | D1 | Mantenida, simplificada |
| Fase 12: Amazon Associates | C1 | Mantenida (bloqueada por registro) |
| Fase 13: Buscador herramientas | A1 | Fusionada con Fase 16 |
| Fase 14: Catalogo maderas | A2 | Simplificada (ya existe base) |
| Fase 15: Actualizacion catalogos | A3 + B1 | Dividida: conexion vs Google Sheets |
| Fase 16: Herramientas v2 | A1 | Fusionada con Fase 13 (eran la misma) |
| Fase 17: Deploy AWS | E1 + E2 | Dividida: backend vs app build |

**Resultado:** De 8 fases pendientes con solapamiento → 8 bloques claros sin duplicados, con dependencias explicitas y orden logico.

---

## METRICAS OBJETIVO PARA BETA PUBLICA

- 150+ herramientas en catalogo
- 40+ maderas/tableros en catalogo
- Catalogos actualizables sin deploy (Google Sheets)
- Backend desplegado en AWS con SSL
- App en TestFlight/Internal Testing
- 0 crashes criticos en flujos principales
- i18n completo ES/EN
- Fallback offline funcionando

---

## NOTAS

- **No hacer hasta tener credenciales:** Amazon Associates (C1)
- **No hacer hasta beta real:** Deploy AWS (E1)
- **Prioridad maxima ahora:** Completar catalogos (A1, A2, A3)
- **La app ya funciona:** Se puede usar hoy con datos locales

---

## LOG NOCTURNO 2026-04-15

### Commits de esta noche (integrados en main ✅)

**Total:** 4 commits nocturnos
| SHA | Mensaje |
|-----|---------|
| `ba790b6` | chore(qa): informe QA diario 2026-04-15 (+ bug hunt) |
| `03c770d` | feat(wood): +5 maderas investigadas via web (2026-04-15) |
| `c33544a` | feat(catalog): +10 productos herramientas investigados via web (2026-04-15) |
| `27afb28` | feat(catalog): +10 productos herramientas investigados via web (2026-04-14) |

### Productos en catalogos

- Herramientas (`backend/data/tools.json`): **98 productos** (de 76 base → +22 en dos sesiones)
- Maderas (`src/data/woodData.ts`): **25 maderas** (de 20 base → +5 esta noche; w21–w25)
- `backend/data/wood.json`: **NO EXISTE** — maderas viven solo en frontend

### Bloque A — progreso acumulado

- A1 (tools): 98/150 → 65% completado
- A2 (wood): 25/40 → 62% completado, falta crear backend JSON
- A3 (conectar): 0% — no iniciado

### QA diario

⚠️ WARN — ver `Data/FASES/QA_DIARIO_2026-04-15.md`
- ~75 errores TypeScript lógicos reales en frontend
- 7 errores backend reales
- 0 flujos rotos, 4 features incompletas (ShopScreen sin comprar, IA en DIYInput es fallback, Amazon sin afiliado, wood sin backend)
- Top fix: `DIYStepsScreen.tsx:27-28` (crash potencial por indexación `any`)

### Tareas para proxima noche

1. Completar A1: añadir ~52 herramientas más (marcas: Tacklife, AEG, Ridgid, Fein, SawStop...)
2. Completar A2: añadir ~15 maderas más + crear `backend/data/wood.json` + endpoint GET /catalog/wood
3. Opcional: iniciar A3 si A1 y A2 quedan cerca del objetivo

---

## LOG NOCTURNO 2026-04-16

### Commits integrados (13 commits nocturnos ✅)

| # | SHA | Mensaje |
|---|-----|---------|
| 1 | `6f3bf10` | feat(projects): persistencia real de pasos DIY con checkboxes interactivos |
| 2 | `34d0153` | feat(catalog): wire Favorites, ProjectIdeas y Deals al navigator + fix 0 errores TS |
| 3 | `8e8f61b` | feat(tools): selector de tornillos por material y contexto |
| 4 | `bd165c2` | data(wood): enriquecer catálogo con 4 nuevas maderas + species/uses |
| 5 | `bd4b7e7` | feat(tools): wire ToolSearch al backend + agrupar por marca en categoría |
| 6 | `e9a7b2a` | feat(brands): logos + marcas Fase 20 + nuevos tipos de herramienta |
| 7 | `e580cb6` | feat(catalog): productos Fase 20 — 20 productos para 11 marcas nuevas |
| 8 | `eb1fca5` | feat(catalog): +5 tools +3 wood (adaptive 2026-04-16) |
| 9 | `b09e032` | fix(D0): aplicar 3 fixes del QA (2026-04-16) |
| 10 | `30003bf` | feat: avance feature #1 (DIY-IA) (2026-04-16) |
| 11 | `2339424` | chore(qa): informe diario 2026-04-16 (delta: -490 errores TS) |
| 12 | `5b91fa0` | fix(ts): -14 errores TS (sweeper 2026-04-16) |
| 13 | `d7492b8` | merge: integrar commits nocturnos de agentes (catalog +5 tools +3 wood, -14 TS errors) |

### Productos en catalogos (medidos en main)

- Herramientas (`backend/data/tools.json`): **107 productos** (de 98 → +9 esta noche)
- Maderas (`backend/data/wood.json`): **28 maderas** (de 25 → +3; backend JSON creado esta noche)

### Bloque A — progreso acumulado

- A1 (tools): **107/150 → 71%** (+6pp vs ayer 65%)
- A2 (wood): **28/40 → 70%** (+8pp vs ayer 62%), backend JSON + endpoint ✅ RESUELTO
- A3 (conectar): **85%** (de 0% → conectado ToolSearch + WoodCatalog al backend)

### Errores TypeScript (medidos con npx tsc --noEmit)

| Scope | Errores |
|-------|---------|
| Frontend (raíz) | **296** (de 663 baseline → -367 en la noche) |
| Backend (`backend/`) | **1** (de 7 → -6 en la noche) |
| **TOTAL** | **297** |

### Fixes aplicados (BUG_FIXER + TS_SWEEPER)

Fuente: `Data/FASES/BUG_FIXER_2026-04-16.md` + commit `5b91fa0`

| Fix | Archivo | Delta |
|-----|---------|-------|
| tsconfig.json — jsx+lib+moduleResolution+exclude backend | `tsconfig.json` | -474 |
| renderItem tipado | `src/screens/ToolSearchScreen.tsx` | -6 |
| renderItem tipado | `src/screens/WoodCatalogScreen.tsx` | -10 |
| TS Sweeper (callbacks useProjects + DIYSteps + Materials) | varios | -14 |
| **Total fixes nocturnos** | | **-504 errores TS** |

### Feature avanzada (feature builder)

- `30003bf` — **DIY-IA**: `apiClient.ts` rediseñado con retry exponencial (2s→4s→8s→16s), timeouts, error handling robusto. App ya llama al backend real en lugar de siempre fallback local.

### Tareas para proxima noche

1. Completar A1: añadir ~43 herramientas más (marcas: Tacklife, Ridgid, Fein, Powermatic, Jet, Laguna, SawStop)
2. Completar A2: añadir ~12 maderas más para llegar a 40
3. Completar A3: añadir indicador "datos actualizados" vs "datos offline" (~0.5h)
4. Fix TS2591: `process.env` en `app.config.ts` y `require` en `settingsStorage.ts` (4 errores lógicos reales)
5. Fix TS2322: `key` prop en Chips y `HomeScreen.tsx:133` (9 errores lógicos reales)
