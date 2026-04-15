# DIY APP — ROADMAP COMPLETO Y ESTADO REAL

**Última actualización:** 2026-04-15 (sesión Claude Code, post-deriva)
**Propósito:** Una sola fuente de verdad para no perder nada en el tintero.
**Documento hermano:** `PLAN_MAESTRO_v2.md` (oficial, lo actualiza Progress Consolidator cada noche). Este de aquí captura el plan oficial **+ todo lo extra que se ha ido haciendo fuera de él** + las decisiones pendientes.

---

## 0. CONTEXTO — ¿POR QUÉ EXISTE ESTE DOCUMENTO?

Durante la sesión del 2026-04-15 lanzamos varios agentes en paralelo y rutinas remotas, y el trabajo se desvió del Plan Maestro. Hay 36 archivos en working tree sin commitear, varias features nuevas que NO están en el plan, 9 rutinas remotas (algunas duplicadas o rotas), y peticiones del usuario sueltas que estaban a punto de perderse. Este documento las junta TODAS para no olvidar nada.

---

## 1. PLAN MAESTRO OFICIAL (de `PLAN_MAESTRO_v2.md`)

### 🟡 BLOQUE A — Catálogos completos (PRIORIDAD MÁXIMA)

| ID | Tarea | Estado | Falta | Fuente de verdad |
|---|---|---|---|---|
| **A1** | Catálogo completo de herramientas | 🟡 98/150 (65%) | +52 productos | `backend/data/tools.json` |
| **A2** | Catálogo completo de maderas | 🟡 25/40 (62%) | +15 maderas + crear backend | `src/data/woodData.ts` (frontend) — el backend `wood.json` no existe aún |
| **A3** | Conectar app↔backend para catálogos | ⏳ 0% | Wire `ToolSearchScreen` y `WoodCatalogScreen` al backend con fallback local | — |

**Marcas pendientes para A1:** Tacklife, Hychika, AEG, Ridgid, Fein, Virutex, Powermatic, Jet, Laguna, SawStop.
**Tipos pendientes para A1:** sierra de marquetería, torno, lijadora de tambor, escopleadora, espigadora, fresadora de mesa, clavadora.

### ⏳ BLOQUE B — Actualización dinámica

| ID | Tarea | Estado | Bloqueo |
|---|---|---|---|
| **B1** | Google Sheets como CMS | ⏳ No iniciado | A3 cerrado + setup Google Cloud |

### 🚫 BLOQUE C — Productos reales y monetización

| ID | Tarea | Estado | Bloqueo |
|---|---|---|---|
| **C1** | Integración Amazon Associates PA-API | 🚫 BLOQUEADO | Necesita 3 ventas en 180 días para activar PA-API |

**Pre-trabajo ya hecho** (sin commitear, ver §2): `src/services/amazonPriceService.ts` (stubs), `src/config/affiliates.ts`, `AMAZON_SETUP.md`, integración del tag en `src/data/retailers.ts`.

### ⏳ BLOQUE D — Pulido y QA

| ID | Tarea | Estado |
|---|---|---|
| **D1** | QA hardening (flujos, edge cases, perf, a11y, i18n) | ⏳ No iniciado |
| **D2** | Mejora visual final (cards Amazon-like, animaciones, iconos Lucide) | ⏳ No iniciado |

### ⏳ BLOQUE E — Deploy

| ID | Tarea | Estado |
|---|---|---|
| **E1** | Deploy backend en AWS (EC2 t3.small + Docker + nginx + SSL) | ⏳ No iniciado |
| **E2** | EAS Build production + TestFlight/Internal Testing | ⏳ No iniciado |

---

## 2. EXTRAS NO CONTEMPLADOS EN EL PLAN MAESTRO

**Esto está todo en working tree sin commitear**, lo añadieron varios agentes en la sesión del 2026-04-15. Hay que decidir qué hacemos con cada bloque (mantener / borrar / mover a rama experimental).

### 2.1 — Chollometro / Sistema de chollos (FUNCIONAL)

| Archivo | Tipo | Estado |
|---|---|---|
| `src/services/dealsService.ts` | Servicio RSS Pepper group (6 países) | ✅ Funcional, fetch runtime, caché MMKV |
| `src/models/deal.ts` | Tipo `Deal` | ✅ |
| `src/screens/DealsScreen.tsx` | Pantalla feed completo | ✅ Cableado en AppNavigator |
| `src/screens/HomeScreen.tsx` (mod) | Quick action `🔥 Chollos` | ✅ |
| `src/screens/ToolSearchScreen.tsx` (mod) | Badge `🔥 Chollo` sobre cards con match | ⚠ Cableado pero no verificado el matching real |

**Decisión pendiente:** ¿Mantener Chollometro como feature principal (commit a main) o moverlo a rama experimental hasta que A1+A2+A3 estén cerrados?
**Pendiente técnico si se queda:** Verificar que el matching producto↔chollo funciona con datos reales (puede que el `model` del catálogo no coincida con los títulos del RSS).

### 2.2 — Favorites (FUNCIONAL pero no cableado)

| Archivo | Tipo | Estado |
|---|---|---|
| `src/services/favoritesService.ts` | MMKV + hook `useFavorites()` | ✅ |
| `src/components/FavoriteButton.tsx` | Botón toggle | ✅ |
| `src/screens/FavoritesScreen.tsx` | Pantalla lista | ⚠ TS error: `'Favorites'` no está en `RootStackParamList` |

**Decisión pendiente:** ¿Cablear (`AppNavigator` + Home) o descartar?

### 2.3 — Project Ideas (FUNCIONAL pero no cableado)

| Archivo | Tipo | Estado |
|---|---|---|
| `src/models/projectIdea.ts` | Tipo + helpers | ✅ |
| `src/data/projectIdeas.ts` | 45 ideas DIY catalogadas | ✅ |
| `src/screens/ProjectIdeasScreen.tsx` | Pantalla browse + filtros | ⚠ TS error: `'ProjectIdeas'` no está en `RootStackParamList` |

**Decisión pendiente:** Igual que Favorites.

### 2.4 — Compare Tools Sheet (FUNCIONAL pero no cableado)

| Archivo | Tipo | Estado |
|---|---|---|
| `src/services/compareService.ts` | MMKV + hook `useCompare()`, max 3 productos | ✅ |
| `src/components/CompareSheet.tsx` | Modal comparativa side-by-side | ✅ |

**Decisión pendiente:** ¿Cablear el trigger (botón "Comparar" en ToolCard) o descartar?

### 2.5 — Amazon disclaimer + Settings legal section

| Archivo | Tipo | Estado |
|---|---|---|
| `src/components/AmazonDisclaimer.tsx` | 3 variantes (compact/card/banner) | ✅ |
| `src/screens/SettingsScreen.tsx` (mod) | Sección "Legal y afiliación" | ✅ |

**Decisión:** Mantener (es necesario para C1 cuando se active).

### 2.6 — Catálogo de imágenes

| Archivo | Tipo | Estado |
|---|---|---|
| `src/components/CatalogImage.tsx` | Componente con fallback | ✅ |
| `src/utils/catalogImages.ts` | Mapeo brandId → URL | ⚠ Vacío o parcial — agente C de imágenes murió por límite de tokens |

**Pendiente técnico crítico:** Reintentar imágenes vía **script local** (no agente remoto), cuando reseteen los tokens.

### 2.7 — Calculadoras pulidas (4 pantallas)

| Archivo | Cambio | Estado |
|---|---|---|
| `ShelfCalcScreen.tsx` | Visualización estantería madera + libros | ✅ |
| `FractionCalcScreen.tsx` | Regla con marker + fracciones comunes | ✅ |
| `GoldenRatioScreen.tsx` | 3 modos + golden rectangle visual | ✅ |
| `WainscotCalcScreen.tsx` | Cálculo automático count + visualización pared | ✅ |

**Decisión:** Mantener (cosmético, ya está hecho, no estorba).

### 2.8 — OnboardingScreen pulido

| Archivo | Cambio | Estado |
|---|---|---|
| `src/screens/OnboardingScreen.tsx` | 4 slides con ilustraciones drawn-by-views, paginación FlatList | ✅ |

**Decisión:** Mantener.

### 2.9 — RetailerSheet (sin selector de país)

| Archivo | Cambio | Estado |
|---|---|---|
| `src/components/RetailerSheet.tsx` | Removed selector país (usa global), sigue funcionando | ✅ |
| `src/data/retailers.ts` (mod) | Tag afiliados Amazon en URLs ES/PT | ✅ |

**Decisión:** Mantener.

### 2.10 — Pre-trabajo C1 (Amazon)

| Archivo | Tipo | Estado |
|---|---|---|
| `src/services/amazonPriceService.ts` | PA-API client stub | ✅ Stub, throws disabled error |
| `src/config/affiliates.ts` | Tag + URL helpers | ✅ |
| `src/utils/priceEstimator.ts` | (sin verificar contenido) | ⚠ Verificar si se usa o es deuda |
| `AMAZON_SETUP.md` | Guía de registro Afiliados + setup PA-API | ✅ |

**Decisión:** Mantener todo, es pre-trabajo válido para cuando C1 se desbloquee.

---

## 3. PETICIONES SUELTAS DEL USUARIO (no perder)

| # | Petición | Estado | Quién la atiende |
|---|---|---|---|
| 1 | "Agrupa ToolSearchScreen por MARCA cuando el filtro está activo" (sierras → DeWalt, Milwaukee, Bosch, Evolution, Parkside…) | ⏳ Pendiente | Yo en foreground, 1 archivo |
| 2 | "Las imágenes del catálogo no están" (agente C murió) | ⏳ Pendiente | Script local, no agente |
| 3 | "El Chollometro… ¿dónde se ve?" | ✅ Respondido (DealsScreen + badge ToolSearch) — pendiente verificar matching badge |
| 4 | "Aplicar Fase 20 (taxonomía obligatoria)" | ⏳ Pendiente decisión | Requiere refactor de `toolBrands.ts`/`toolTypes.ts` + extender `ToolProduct` con atributos filtrables del Fase 20 |
| 5 | "Las rutinas, ¿todas son importantes?" | ✅ Auditadas y limpiadas en esta sesión |

---

## 4. ESTADO DE LAS RUTINAS REMOTAS (post-cleanup 2026-04-15)

### ✅ Activas (7)

| Hora 🇪🇸 | Cron UTC | Nombre | ID | Veredicto |
|---|---|---|---|---|
| 02:00 | `0 0 * * *` | DIY Catalog Adaptive | `trig_019mG6wbG2BqFpDxkC3T1ztj` | Trabajo real sobre `backend/data/tools.json` (A1) |
| 03:00 | `0 1 * * *` | DIY Bug Fixer | `trig_01Y6ynkpvPZVCMh6VBn6zW9J` | Aplica top 3 fixes del último QA, auto-revierte |
| 04:00 | `0 2 * * *` | DIY Feature Builder | `trig_017j96ydRLyFu8AcZiugQ2Ey` | Avanza features (sin Amazon, sacada de la rotación 2026-04-15) |
| 05:00 | `0 3 * * *` | DIY QA Daily | `trig_01MWtz7zWbRDeAix2jt7nccp` | Mide y reporta |
| 06:00 | `0 4 * * *` | DIY TypeScript Sweeper | `trig_01M99HWXUddN9hACeYqqRvob` | Reduce 5 errores TS/noche |
| 07:00 | `0 5 * * *` | DIY Progress Consolidator | `trig_01GpzNgujC1t8QJMDbztXmVx` | Genera `RESUMEN_DIARIO_*.md` |
| 07:45 | `45 5 * * *` | DIY Daily Proposals | `trig_0129RpoVunnhN82oHoqVNv7Y` | Solo si el usuario lee `PROPUESTAS_*.md` (decisión pendiente) |

### ⏸ Pausadas (2)

| Nombre | ID | Motivo de pausa |
|---|---|---|
| DIY Fase 12 Woodzy Theme | `trig_01DFCMHtZJeKXfCmhuck2ikJ` | Ya cumplió. Si necesitas refinar, reactivar manual |
| DIY Catálogo de herramientas diario | `trig_01Tcwzu4yUbwyBTFPdVSHh4y` | Duplicada con Catalog Adaptive, escribía en `src/data/toolProducts.ts` (no es la fuente oficial) |

**NB:** Para borrar definitivamente cualquier rutina hay que ir a https://claude.ai/code/scheduled (la API no permite delete).

---

## 5. DECISIONES PENDIENTES DEL USUARIO

| # | Decisión | Opciones | Mi recomendación |
|---|---|---|---|
| 1 | ¿Lees los `PROPUESTAS_*.md` cada mañana? | Sí → mantener Daily Proposals · No → pausarlo | — (depende de ti) |
| 2 | Qué hacer con los 36 archivos sin commitear | A: commitear todo · B: commitear solo lo del Plan · C: stash todo y volver limpio | **C** para enfocarte. **B** si te da miedo perder algo |
| 3 | Por dónde empezar trabajo enfocado del usuario | A2 (backend wood.json) · A3 (wire pantallas backend) · ToolSearch agrupar por marca | **A2** primero (desbloquea A3), o la petición de marca si quieres ver feedback rápido |
| 4 | ¿Aplicar Fase 20 taxonomía obligatoria? | Sí ahora · Sí después · No | **Después** — primero cerrar Bloque A |
| 5 | ¿Qué hacemos con Favorites/ProjectIdeas/CompareSheet? | Cablear las 3 · Cablear solo Favorites · Descartar todas | **Cablear solo Favorites** (es la más simple y aporta) |

---

## 6. ORDEN DE EJECUCIÓN PROPUESTO (para cuando reanudemos)

```
PASO 0 (HECHO):   Limpiar rutinas (pausar Woodzy + 07:30, retocar Feature Builder)
PASO 1 (HECHO):   Crear este ROADMAP_COMPLETO.md
PASO 2 (USER):    Tomar las 5 decisiones de §5
PASO 3 (CLAUDE):  Limpiar working tree según decisión §5.2
PASO 4 (CLAUDE):  Bloque A — empezar por A2 o por petición §3.1 según §5.3
PASO 5 (CLAUDE):  Continuar A2 → A3 hasta cerrar el Bloque A
PASO 6 (CLAUDE):  Bloque D1 (QA) — primero el funcional, luego el cosmético D2
PASO 7 (USER):    Decidir B1 (Google Sheets CMS) cuando A esté cerrado
PASO 8 (USER):    Confirmar 3 ventas Amazon → desbloquear C1
PASO 9 (USER):    Decidir E1 (deploy AWS) — coste 65-115€/mes
```

---

## 7. REGLAS PARA NO VOLVER A DERIVAR

1. **Antes de spawnear cualquier sub-agente:** consultar `/Users/jjadd4u/.claude/projects/-Users-jjadd4u-Documents-CODE-gdsir/memory/session_20260415_parallel_agents_rules.md`. Máximo 2 en paralelo, scope minúsculo, tareas masivas → script local.
2. **Antes de añadir cualquier feature:** comprobar si está en este ROADMAP. Si no, preguntar al usuario antes de añadirla.
3. **Antes de tocar el catálogo manualmente:** recordar que `Catalog Adaptive` ya añade ~5 herramientas/noche al backend. No duplicar.
4. **Antes de crear rutina remota:** comprobar que no hay solapamiento con las 9 ya existentes (mirar §4 de este doc).
5. **Pulido cosmético (calculadoras, onboarding, themes):** se hace al FINAL, en el Bloque D2. No durante el Bloque A.
