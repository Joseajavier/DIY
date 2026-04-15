# PROPUESTAS CIERRE DIARIO — 2026-04-15

**Agente:** cierre diario automático (08:00 Madrid)
**Generado:** 2026-04-15T08:00
**Rutinas nocturnas ejecutadas:** ✅ 6 rutinas (02:00, 03:00, 04:00, 05:00, 06:00, 07:30)
**Commits nocturnos detectados:** 6 commits (4 de datos + 1 corrección + 1 refresh matinal 07:30)

> **ALERTA:** Ninguna rutina corrigió errores TypeScript. Las rutinas solo agregan datos y generan informes. Hay 75 errores lógicos TS en frontend y 7 en backend sin tocar durante múltiples noches.

---

## Estado Medido Hoy (08:00)

| Métrica | Valor medido | Objetivo | Notas |
|---------|-------------|----------|-------|
| Herramientas (`tools.json`) | **103** | 150 | +5 del refresh matinal 07:30 (plan decía 98) |
| Maderas (`woodData.ts`) | **25** | 40 | Solo frontend, sin backend |
| `backend/data/wood.json` | **NO EXISTE** | Requerido | Maderas viven solo en `src/data/woodData.ts` |
| Errores TS lógicos — frontend | **~75** | 0 | 7 críticos (crash potencial), 68 medios |
| Errores TS lógicos — backend | **7** | 0 | 2 lógicos + 5 config tsconfig |
| "Botones rotos" (`onPress` vacíos) | **0** | 0 | ✅ Ninguno |
| Features incompletas/stub | **4** | 0 | ShopScreen, IA fallback, afiliado, wood backend |
| Pantallas | **16** | 16 | ✅ Completo |
| Componentes | **11 + index.ts** | — | Button, Card, EmptyState, ErrorState, LoadingState... |

---

## Progreso por Bloque

| Bloque | % Real | Estado | Notas |
|--------|--------|--------|-------|
| A1 — Herramientas completas | **68.7%** (103/150) | 🟡 EN PROGRESO | Plan decía 65% (98); matinal 07:30 sumó +5 |
| A2 — Maderas completas | **62.5%** (25/40) | 🟡 EN PROGRESO | Sin backend; falta wood.json + endpoint |
| A3 — Conectar app con backend | **0%** | ⏳ PENDIENTE | No iniciado; depende de A1+A2 pero podría empezar ya |
| B1 — Google Sheets CMS | **0%** | ⏳ PENDIENTE | Depende de A3 |
| C1 — Amazon Associates | **0%** | 🔴 BLOQUEADO | Espera credenciales externas (días/semanas) |
| D1 — QA y hardening | **~5%** | 🟡 INFORME SOLO | Informe generado pero 0 bugs corregidos |
| D2 — Mejora visual final | **0%** | ⏳ PENDIENTE | Depende de D1 |
| E1 — Deploy AWS | **0%** | ⏳ PENDIENTE | Depende de A+B |
| E2 — Build producción | **0%** | ⏳ PENDIENTE | Depende de E1 |

---

## Bloqueos Detectados

1. **D1 lleva ≥3 noches sin fixes aplicados.** El agente QA genera informes excelentes pero ninguna rutina aplica las correcciones. Los 75 errores TS siguen acumulándose.

2. **A3 podría iniciarse ya (parcialmente).** A1 está al 68.7% y A2 al 62.5%. La arquitectura de fallback local no requiere que los catálogos estén completos al 100%. Se pierde tiempo esperando.

3. **backend/tsconfig.json** tiene `console` no encontrado (TS2584) en 5 archivos. Es un fix de 2 líneas que ninguna rutina aplica. Bloquea el typecheck limpio del backend.

4. **C1 (Amazon) totalmente bloqueado** por proceso externo. No hay acción técnica posible mientras no lleguen las credenciales. Considerarlo fuera del sprint activo.

5. **wood.json backend no existe.** La rutina de madrugada añadió 5 maderas al frontend (`woodData.ts`) pero no hay endpoint backend. A3 no puede conectar maderas sin él.

6. **103 productos en tools.json pero el Plan Maestro aún dice 98.** La corrección del commit `cc67f2b` no actualizó el número en el bloque A1 del plan.

---

## PROPUESTAS DE CAMBIO AL PLAN MAESTRO

### 1. Actualizar cifras de A1 en el Plan Maestro
**Problema:** El bloque A1 dice "98 / 150 productos (65%)" pero tools.json tiene 103 productos (68.7%).
**Propuesta:** Cambiar a "103 / 150 productos (68.7%)" en el siguiente log nocturno.
**Prioridad:** Baja (cosmética pero evita confusión).

### 2. Desbloquear A3 cuando A1+A2 lleguen al 75% (no al 100%)
**Problema:** El plan dice "Dependencias: A1, A2" pero interpretar eso como "A1 y A2 al 100%" retrasa semanas una tarea de 1-2h. A3 usa fallback local si el backend no tiene todos los datos.
**Propuesta:** Añadir nota en A3: *"Puede iniciarse cuando A1 ≥ 75% Y A2 ≥ 75% Y wood.json backend existe. El fallback local cubre los datos pendientes."*
**Justificación:** A1 está al 68.7% y A2 al 62.5%. En 2-3 noches estarán al 75%+. Iniciar A3 en paralelo ahorraría ~1 semana.
**Prioridad:** ALTA.

### 3. Añadir bloque D0 — Fix TypeScript Incremental (NUEVO BLOQUE)
**Problema:** Hay 75 errores TS lógicos en frontend (7 críticos) y 7 en backend. Ninguna rutina los corrige; solo los detecta. Si esto no se aborda antes del release, la app tendrá crashes potenciales en producción.
**Propuesta:** Crear bloque **D0** con prioridad ANTES de D1 (QA completo):
```
D0 — Fix TypeScript incremental
Estado: URGENTE — 75 errores frontend, 7 backend
Que hacer:
  - Fix críticos (D0a): DIYStepsScreen, HomeScreen, ToolSearchScreen, WoodCatalogScreen — tipar renderItem y añadir fallbacks
  - Fix backend (D0b): backend/tsconfig.json — añadir "types": ["node"], "lib": ["es2020"]
  - Fix medios (D0c): tipar parámetros de callbacks en useProjects, ProResultsScreen, etc.
Esfuerzo: 1-2h (D0a+D0b muy rápidos)
Dependencias: Ninguna — se puede hacer hoy mismo
```
**Justificación:** Los errores críticos de `any` indexando enums pueden causar pantalla en blanco silenciosa en producción. Es riesgo real.
**Prioridad:** MUY ALTA.

### 4. Migrar de FlatList a FlashList (mejora de rendimiento)
**Investigación:** FlashList v2 (Shopify, 2025) es 5-10x más rápido que FlatList. Es drop-in replacement. Totalmente soportado en Expo SDK 51+. Para el catálogo de 150 herramientas y listas filtradas, FlashList eliminaría los blank flashes al scrollear rápido.
**Propuesta:** Añadir al bloque D2 (mejora visual):
```
- Reemplazar FlatList por FlashList en ToolSearchScreen, WoodCatalogScreen y ProjectsScreen
  Cambio: import { FlashList } from "@shopify/flash-list" + estimatedItemSize
  Coste: ~30min
```
**Justificación:** API casi idéntica, impacto directo en UX con 150+ productos en el catálogo.
**Prioridad:** Media (incluir en D2, no urgente ahora).

### 5. Migración futura a Expo Router (bloque F — roadmap)
**Investigación:** Expo SDK 55 incluye Expo Router por defecto. El proyecto usa `react-navigation` manual. Expo Router ofrece typed routes, deep linking automático, lazy bundling y navegación por ficheros (como Next.js).
**Propuesta:** Añadir como **Bloque F (roadmap post-beta)**:
```
F1 — Migración a Expo Router
Estado: POST-BETA
Que hacer: Migrar estructura de navegación de AppNavigator.tsx a carpeta app/
Ventajas: typed routes, deep linking, universal links sin config manual
Esfuerzo: 3-4h
Dependencias: E2 completado (beta lanzada)
```
**Justificación:** No urgente ahora, pero vale la pena planificarlo para v2. Facilita el mantenimiento a largo plazo.
**Prioridad:** Baja (post-beta).

### 6. Separar C1 del sprint activo
**Problema:** C1 (Amazon Associates) está listado en el flujo principal pero lleva semanas bloqueado por credenciales externas. Ocupa espacio mental sin poder avanzar.
**Propuesta:** Mover C1 a sección "CUANDO TENGAS CREDENCIALES" con nota más visible y quitar del orden de ejecución semanal activo. El plan ya lo menciona en notas pero el bloque C sigue apareciendo en el flujo principal.
**Prioridad:** Baja (reorganización).

---

## PROPUESTAS DE FIX PARA ERRORES CRÍTICOS (Top 5 del QA)

### Fix #1 — `src/screens/DIYStepsScreen.tsx:27-28` — Crash potencial `difficulty`
**Problema:** `result.difficulty` es `any`; si la IA/generador devuelve `undefined` o `'muy fácil'`, la indexación en `DIFFICULTY_LABELS` devuelve `undefined` silenciosamente.
```typescript
// ANTES (línea 27-28)
const label = DIFFICULTY_LABELS[result.difficulty];
const color = DIFFICULTY_COLORS[result.difficulty];

// DESPUÉS
const label = DIFFICULTY_LABELS[result.difficulty as keyof typeof DIFFICULTY_LABELS]
  ?? DIFFICULTY_LABELS.easy;
const color = DIFFICULTY_COLORS[result.difficulty as keyof typeof DIFFICULTY_COLORS]
  ?? DIFFICULTY_COLORS.easy;
```
**Alternativa más robusta:** Tipar `result` con la interfaz `DIYResult` (ya debe existir en el proyecto).

### Fix #2 — `src/screens/HomeScreen.tsx:133` — Props incorrectos en componente
**Problema:** TS2322 — el objeto pasado como props no coincide con el tipo `Props` del componente. La prop `key` de React no debe estar en el tipo explícito del componente.
```typescript
// La raíz: el tipo Props del componente interno probablemente no incluye "project"
// SOLUCIÓN: Revisar la interfaz Props del componente en línea y añadir:
interface Props {
  project: Project;  // o el tipo correcto
  onPress: () => void;
}
// Y NO declarar key en Props (React la maneja internamente)
```

### Fix #3 — `src/screens/ToolSearchScreen.tsx:107-108` y `WoodCatalogScreen.tsx:78-87` — Tipar `renderItem`
**Problema:** Los callbacks de `renderItem` reciben `item` como `any`, lo que provoca error al indexar en objetos tipados.
```typescript
// ANTES (ToolSearchScreen)
renderItem={({ item }) => (
  <Text>{TIER_LABELS[item.tier]}</Text>  // item es any → error TS7053
)}

// DESPUÉS
renderItem={({ item }: { item: ToolProduct }) => (
  <Text>{TIER_LABELS[item.tier as keyof typeof TIER_LABELS] ?? item.tier}</Text>
)}

// ANTES (WoodCatalogScreen)
renderItem={({ item }) => (
  <Text>{HARDNESS_LABELS[item.hardness]}</Text>
)}

// DESPUÉS
renderItem={({ item }: { item: WoodProduct }) => (
  <Text>{HARDNESS_LABELS[item.hardness as keyof typeof HARDNESS_LABELS] ?? item.hardness}</Text>
)}
```

### Fix #4 — `backend/tsconfig.json` — `console` no encontrado (TS2584)
**Problema:** 5 archivos backend fallan con `Cannot find name 'console'` porque `lib` del tsconfig no incluye las APIs de entorno Node.
```json
// backend/tsconfig.json — AÑADIR/MODIFICAR:
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["es2020"],
    "types": ["node"],
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```
**Efecto:** Elimina los 5 errores TS2584 (`console`) y los TS2591 (`fs`, `path`, `process`).

### Fix #5 — `src/screens/ToolSearchScreen.tsx:70,74,76,78` — Prop `key` en Chip
**Problema:** El tipo `Chip` declara `{ label, active, onPress }` pero al mapear una lista se añade `key` implícitamente como prop, causando TS2322 cuando `item` es `any`.
```typescript
// La raíz es el TS7006 en el callback .map() — tipar el callback lo resuelve:
// ANTES
filters.map((f) => <Chip key={f.id} label={f.label} ... />)

// DESPUÉS
filters.map((f: FilterItem) => <Chip key={f.id} label={f.label} ... />)
// o con tipado inline:
(filters as FilterItem[]).map((f) => <Chip key={f.id} label={f.label} ... />)
```

---

## PROPUESTAS DE NUEVAS RUTINAS NOCTURNAS

### Rutina D0-Fix (02:00 ó 03:00) — Corrección TypeScript Incremental
**Qué haría:** Aplicar automáticamente los fixes de los 7 errores críticos detectados por QA. No investigar, solo corregir los ya conocidos del informe QA.
**Archivos a tocar:** `DIYStepsScreen.tsx`, `HomeScreen.tsx`, `ToolSearchScreen.tsx`, `WoodCatalogScreen.tsx`, `backend/tsconfig.json`.
**Por qué hace falta:** La rutina QA detecta pero no corrige. Se acumulan errores durante semanas.
**Precaución:** Solo corregir errores ya documentados en el informe QA, nunca modificar lógica de negocio.

### Rutina wood-backend (04:00 ó 05:00) — Crear `backend/data/wood.json`
**Qué haría:** Leer `src/data/woodData.ts`, extraer los objetos de maderas y generar `backend/data/wood.json` con el mismo formato que `tools.json`. Añadir endpoint `GET /catalog/wood` en `backend/src/routes/catalog.ts`.
**Por qué hace falta:** A2 lleva varias noches sin el backend JSON. A3 no puede conectar maderas sin él.
**Precaución:** No modificar `woodData.ts` (solo leer). No tocar el endpoint de herramientas.

### Rutina plan-sync (07:00) — Sincronizar cifras del Plan Maestro
**Qué haría:** Leer los JSONs y contar productos reales. Actualizar el log nocturno del Plan Maestro con las cifras exactas (hoy decía 98 pero hay 103).
**Por qué hace falta:** Las cifras del plan se desfasan cuando hay commits intermedios (como el refresh matinal 07:30).

---

## PROPUESTAS DE DEPRECACION

### Deprecar referencias a "Fases 10-17" en documentación
El Plan Maestro v2 ya consolidó las 17 fases en 8 bloques, pero los commits más antiguos y algunos comentarios en código todavía referencian "Fase 13", "Fase 14", etc. Propuesta: eliminar la sección "COMPARATIVA: ANTES vs AHORA" del Plan Maestro (ya no es necesaria, genera ruido) y asegurarse de que los commits nuevos usen nomenclatura de bloques (A1, A2, D0...).

### No iniciar B1 (Google Sheets CMS) hasta tener backend en producción
B1 requiere setup de Google Cloud + Service Account, que solo tiene sentido si el backend estará en un servidor real accesible. Hacer esto en local no aporta valor. Propuesta: mover B1 al mismo nivel que E1, marcarlo como "hacer en paralelo con deploy".

---

## SUGERENCIA PARA MAÑANA

**Acción prioritaria única:**

> **Crear `backend/data/wood.json` + endpoint `GET /catalog/wood`** (bloque A2 backend)

**Por qué esta y no otra:**
- Es la acción más pequeña con mayor impacto en desbloquear el siguiente paso.
- Desbloquea A3 (conectar app) que lleva 0% y tiene esfuerzo estimado de solo 1-2h.
- Las herramientas YA tienen endpoint funcional — las maderas no tienen nada.
- A1 llegará al 75% (~113 productos) en 2-3 noches más sin intervención manual.
- Los fixes TypeScript pueden hacerse en la misma sesión (son cambios pequeños, < 30min).

**Orden sugerido para mañana:**
1. Crear `backend/data/wood.json` con las 25 maderas actuales
2. Añadir endpoint `GET /catalog/wood` en `backend/src/routes/catalog.ts`
3. Fix `backend/tsconfig.json` (2 líneas — `lib` + `types`)
4. Fix `DIYStepsScreen.tsx:27-28` (fallback difficulty)

---

## Resumen de Propuestas

| # | Tipo | Bloque Afectado | Prioridad |
|---|------|-----------------|-----------|
| 1 | Actualizar cifras plan | A1 | Baja |
| 2 | Desbloquear A3 al 75% | A3 | **Alta** |
| 3 | Nuevo bloque D0 Fix TS | D0 (nuevo) | **Muy alta** |
| 4 | FlashList en lugar de FlatList | D2 | Media |
| 5 | Bloque F Expo Router roadmap | F (nuevo) | Baja |
| 6 | Separar C1 del sprint activo | C1 | Baja |
| Fix #1 | DIYStepsScreen:27-28 crash | D0 | **Crítico** |
| Fix #2 | HomeScreen:133 props | D0 | **Crítico** |
| Fix #3 | ToolSearchScreen + WoodCatalog renderItem | D0 | **Crítico** |
| Fix #4 | backend/tsconfig.json lib+types | D0 | **Crítico** |
| Fix #5 | Chip typing en filtros | D0 | Media |
| Rutina nueva | D0-Fix TS incremental | — | **Alta** |
| Rutina nueva | wood-backend JSON+endpoint | A2 | **Alta** |
| Rutina nueva | plan-sync cifras exactas | Docs | Baja |
| Deprecar | Sección "Antes vs Ahora" del plan | Docs | Baja |
| Deprecar | B1 mover junto a E1 | B1 | Baja |

**Total propuestas:** 16 (6 plan maestro + 5 fixes código + 3 rutinas nuevas + 2 deprecaciones)
**Bloques afectados:** A1, A2, A3, B1, C1, D0 (nuevo), D2, F (nuevo)
**Prioridad TOP 1 para mañana:** Crear `backend/data/wood.json` + endpoint + fix tsconfig backend

---

*Generado automáticamente por agente cierre diario — DIY Project — 2026-04-15T08:00*
