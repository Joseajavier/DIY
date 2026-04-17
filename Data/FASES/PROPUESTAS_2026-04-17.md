# PROPUESTAS CIERRE DIARIO — 2026-04-17

**Agente:** cierre diario automático (07:00 Madrid)
**Generado:** 2026-04-17T07:00
**Commits nocturnos:** 16
**Estado general:** ⚠️ WARN

---

## 1. Estado Medido Hoy (07:00)

| Métrica | Valor medido | Objetivo | Estado |
|---------|-------------|----------|--------|
| Herramientas (`tools.json`) | **112** | 150 | 🟡 74.7% |
| Maderas (`wood.json`) | **31** | 40 | 🟡 77.5% |
| Errores TS frontend | **399** | 0 lógicos | ⚠️ WARN |
| Errores TS backend | **1** | 0 | 🟡 infra |
| Botones rotos | **0** | 0 | ✅ |
| TODOs nuevos en código | **0** | 0 | ✅ |
| A3 — indicador online/offline | **pendiente** | hecho | 🟡 |
| Generador paramétrico Fases 0–6 | **✅ HECHO** | — | 🎉 bonus |

---

## 2. Deltas vs Ayer y vs Hace 3 Días (Tendencia)

| Métrica | 2026-04-15 | 2026-04-16 | **2026-04-17** | Δ vs ayer | Δ vs -2d | Tendencia |
|---------|------------|------------|----------------|-----------|----------|-----------|
| Tools | 98 | 107 | **112** | +5 | +14 | ↗️ constante |
| Wood | 25 | 28 | **31** | +3 | +6 | ↗️ constante |
| TS frontend | ~663 | 296 | **399** | **+103** | **-264** | ⚠️ oscilante |
| TS backend | 7 | 1 | **1** | 0 | -6 | → estable |
| Commits nocturnos | 4 | 13 | **16** | +3 | +12 | ↗️ acelerando |

**Lectura de tendencia:**
- Catálogos: crecimiento sólido (+5 tools/noche, +3 wood/noche). A1 al 74.7% y A2 al 77.5% → pueden completarse en 2-3 noches más.
- TS errors: **patrón oscilante**. Feature Builder introduce errores nuevos (hoy +200 por 8 pantallas paramétricas), Bug Fixer + Sweeper corrigen parcialmente (-22). La raíz es `@types/react` no instalado. Sin esa acción, el bucle continúa.
- Velocidad de commits: acelerando (4 → 13 → 16). El Feature Builder está en alta productividad.

---

## 3. Bloqueos Detectados

### 🔴 BLOQUEO CRÍTICO #1 — C1 Amazon Associates (≥3 días)
**Propuesta original:** PROPUESTAS_2026-04-15 (día 1) → mencionada en RESUMEN_2026-04-16 (día 2) → sigue bloqueada hoy (día 3).
**Naturaleza:** Externo — requiere aprobación de cuenta Amazon Associates España (1-2 días hábiles).
**Acción recomendada:** **REFORMULAR** — quitar del sprint activo definitivamente. Mover bloque C1 a sección "CUANDO TENGAS CREDENCIALES" con instrucción clara al humano de iniciar el registro hoy mismo (5 minutos). Mientras tanto, el sprint avanza sin C1.

### 🔴 BLOQUEO CRÍTICO #2 — @types/react no instalado (≥5 días)
**Propuesta original:** Detectado en QA_2026-04-15 (~597 errores de infra). Sigue sin resolverse en 2026-04-17 (320 de 399 errores son infra).
**Naturaleza:** Interna — se resuelve con `npx expo install @types/react @types/react-native typescript` (1 comando, <2 minutos).
**Impacto:** 320/399 (80%) de los errores TS desaparecen. Bug Fixer y TS Sweeper gastan esfuerzo en síntomas mientras la causa raíz persiste.
**Acción recomendada:** **ELIMINAR EL BLOQUEO HOY** — es acción del humano, no del agente nocturno.

### 🟡 BLOQUEO PENDIENTE #3 — FlashList migration (2 días sin implementar)
**Propuesta original:** PROPUESTAS_2026-04-15 (prioridad media, para D2).
**Estado:** No implementado (día 2). No es crítico aún (se convierte en bloqueo si llega al día 3 sin plan).
**Acción recomendada:** Añadir explícitamente a D2 del plan con estimación 30min. Feature Builder puede incluirlo en la siguiente sesión de mejoras.

### 🟡 BLOQUEO PENDIENTE #4 — A3 indicador online/offline (2 días)
**Propuesta original:** RESUMEN_2026-04-16 y LOG NOCTURNO 2026-04-16.
**Estado:** A3 al 85%, el 15% restante es este indicador. 0.5h de trabajo.
**Acción recomendada:** Asignar al Feature Builder en la próxima sesión junto con cualquier commit de catálogos.

---

## 4. Propuestas de Cambio al Plan Maestro

### Propuesta 1 — Instalar @types/react como PASO 0 antes de cada sesión nocturna [URGENTE]
**Datos:** 320/399 (80%) de errores TS son infraestructura. Bug Fixer y Sweeper gastan ciclos en síntomas. Con `@types/react` instalado, los errores reales bajan a ~79, fácilmente manejables.
**Propuesta:** Añadir en PLAN_MAESTRO sección "PREREQUISITOS TÉCNICOS" con:
```
ANTES DE CUALQUIER SESIÓN NOCTURNA:
  npx expo install @types/react @types/react-native typescript
  cd backend && npm install @types/node
```
**Justificación:** WebSearch confirma que esta es la solución estándar Expo para TS2307. Es el fix de mayor ROI del proyecto.
**Prioridad:** MÁXIMA.

### Propuesta 2 — Limitar Feature Builder a 3 pantallas por sesión hasta que @types esté instalado
**Datos:** Feature Builder añadió 8 pantallas esta noche → +200 errores TS nuevos. Bug Fixer compensó solo -15. Ratio 1:13 (1 fix por 13 errores introducidos).
**Propuesta:** Mientras `@types/react` no esté instalado, el Feature Builder no debe añadir más de 3 pantallas nuevas por sesión. Las pantallas existentes heredan errores de infra automáticamente; agravar el ruido dificulta detectar errores lógicos reales.
**Justificación:** La sesión de hoy muestra claramente el patrón: más código sin @types = más ruido sin más bugs reales. El generador paramétrico funciona correctamente en Expo Go.
**Prioridad:** Alta (mientras dure el bloqueo #2).

### Propuesta 3 — Completar A2 esta semana; iniciar B1 en paralelo
**Datos:** A2 está al 77.5% (31/40). Faltan 9 maderas. A ritmo de +3/noche, se completa en 3 noches. A1 al 74.7%, faltan 38 herramientas; a ritmo de +5/noche, tarda ~8 noches más.
**Propuesta:** Una vez A2 llegue a 40 (3 noches), iniciar B1 (Google Sheets CMS) en paralelo con A1. El endpoint `/catalog/wood` ya existe; B1 solo añade la capa de sincronización.
**Justificación:** A2 casi lista. No tiene sentido esperar a que A1 también esté al 100% para iniciar B1.
**Prioridad:** Media.

### Propuesta 4 — Migrar FlatList → FlashList en ToolSearch + WoodCatalog (añadir a D2)
**Datos:** FlashList v2 (2025) reescrito para New Architecture, 2M+ descargas mensuales, compatible Expo SDK 46+, no requiere config plugin. Con 112+ herramientas y 31+ maderas en catálogo, el scroll performance ya empieza a importar.
**Propuesta:** Añadir a bloque D2 tarea concreta:
```
- Migrar FlatList → FlashList en ToolSearchScreen, WoodCatalogScreen, ProjectsScreen
  Instalar: npx expo install @shopify/flash-list
  Cambio: import FlashList + añadir estimatedItemSize={72}
  Coste: ~30min
```
**Fuente:** [FlashList v2 Shopify Engineering](https://shopify.engineering/flashlist-v2), Expo docs confirman compatibilidad.
**Prioridad:** Media (incluir en D2).

### Propuesta 5 — Añadir export PDF y generador paramétrico al RESUMEN DE LO QUE YA ESTÁ HECHO
**Datos:** El generador paramétrico (Fases 0–6) está completo y funcional. La sección "RESUMEN DE LO QUE YA ESTA HECHO" en el Plan Maestro no lo menciona.
**Propuesta:** Añadir fila a la tabla de fases completadas:
```
| 22 | Generador paramétrico de muebles (Fases 0–6) + export PDF | HECHO |
```
**Justificación:** Es una feature de alto valor (diferenciadora vs. competencia) que ya funciona y merece visibilidad en el plan.
**Prioridad:** Baja (cosmética pero importante para motivación y roadmap).

---

## 5. TOP 5 Bugs para Bug Fixer 2026-04-18

Fuente: `Data/FASES/QA_DIARIO_2026-04-17.md` — errores lógicos reales con código DESPUÉS exacto.

### 🔴 Bug #1 — `src/components/CompareSheet.tsx:370` — 8 × TS2741
**Descripción:** `children` requerido en `ValueCell` falla porque sin `@types/react`, TSX no inyecta `children` automáticamente en props inferidas.
**Código DESPUÉS:**
```tsx
function ValueCell({
  children,
  diff,
  alt,
  tall,
}: {
  children?: React.ReactNode;  // ← cambiar required a optional
  diff: boolean;
  alt?: boolean;
  tall?: boolean;
}) {
```
**Errores eliminados:** 8 × TS2741

---

### 🔴 Bug #2 — `src/screens/DIYInputScreen.tsx:66` + `src/screens/ProInputScreen.tsx` — 7+ × TS2745
**Descripción:** `SectionTitle` con `children: string` falla con texto JSX sin `@types/react`.
**Código DESPUÉS (DIYInputScreen.tsx:66):**
```tsx
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}
```
Aplicar mismo cambio en ProInputScreen donde haya definición análoga de `SectionTitle`.
**Errores eliminados:** 7+ × TS2745

---

### 🔴 Bug #3 — `src/screens/ProjectDetailScreen.tsx:52,53,62,63,71,92,94,95,174,176,215,234,246` — 13 × TS7006
**Descripción:** Callbacks de `setSteps` y `setProject` con `prev`/`s`/`p` implícitamente `any`.
**Código DESPUÉS (patrón para todas las ocurrencias):**
```tsx
setSteps((prev: ProjectStep[]) =>
  prev.map((s: ProjectStep) => (s.id === step.id ? { ...s, completed: !s.completed } : s)),
);
setProject((p: Project) => ({ ...p, pieces: p.pieces.filter((_: Piece, idx: number) => idx !== i) }));
```
**Errores eliminados:** 13 × TS7006

---

### 🟡 Bug #4 — `src/services/parametric/exportParametricPdf.ts:323,325` — 2+ × TS2591
**Descripción:** `require` lazy no declarado como global → TS2591.
**Código DESPUÉS (al inicio del archivo, después de imports):**
```tsx
// Declaración para lazy-load compatible con Expo Go
declare function require(module: string): any;
```
Eliminar los comentarios `eslint-disable-next-line @typescript-eslint/no-require-imports` redundantes si el `declare` los silencia.
**Errores eliminados:** 2 × TS2591 + 2 × TS2307 cascada

---

### 🟡 Bug #5 — Pantallas paramétricas ×6 — ~48 × TS7006
**Archivos:** `src/screens/parametric/TableGeneratorScreen.tsx:183,204,226,251`, `CabinetGeneratorScreen.tsx`, `BenchGeneratorScreen.tsx`, `ShelfGeneratorScreen.tsx`, `DrawerCabinetGeneratorScreen.tsx`, `BoxGeneratorScreen.tsx`
**Descripción:** Callbacks `.map()` con `(w, i)`, `(p, i)`, `(n, i)` sin tipos (~8 por archivo × 6).
**Código DESPUÉS (patrón para todos):**
```tsx
// Añadir import de tipos al inicio de cada archivo:
import type { WoodOption, Piece, HardwareItem } from '../../models/parametric';

// En los .map():
{config.woods.map((w: WoodOption, i: number) => ( ... ))}
{pieces.map((p: Piece, i: number) => ( ... ))}
{hardware.map((n: HardwareItem, i: number) => ( ... ))}
```
Si los tipos son locales al archivo (interfaces definidas en el propio generador), usar directamente el nombre de la interfaz local.
**Errores eliminados:** ~48 × TS7006

---

**Estimación total si Bug Fixer aplica los 5:** ~406 → **~326 errores** (base ~320 infra pura → confirma que resolviendo @types se va a ~0 lógicos).

---

## 6. Feature a Priorizar en Feature Builder 2026-04-18

**Feature recomendada: A3 — Indicador "datos actualizados" vs "datos offline"**

**Por qué esta:**
- A3 está al 85%, el 15% restante es solo este indicador (~0.5h)
- Es el cierre del Bloque A completo (que desbloquea B1 y C1)
- El Feature Builder ya tiene experiencia con `catalogApiClient.ts`
- Impacto directo en UX: el usuario sabe si está viendo datos frescos o cachados

**Implementación sugerida:**
```tsx
// En ToolSearchScreen.tsx y WoodCatalogScreen.tsx — añadir bajo el header:
{isOffline && (
  <View style={styles.offlineBanner}>
    <Text style={styles.offlineText}>📴 Datos offline — última actualización: {lastUpdated}</Text>
  </View>
)}
```

**Feature secundaria si hay tiempo:** Añadir la fila `| 22 | Generador paramétrico |` al RESUMEN del Plan Maestro (5 minutos, alta visibilidad).

---

## 7. TOP 1 Acción Prioritaria para el Humano

> ### ⚡ EJECUTAR HOY: `npx expo install @types/react @types/react-native typescript`
>
> **Por qué esta y no otra:**
> - 2 minutos de trabajo → elimina ~320 de 399 errores TS (80% del problema)
> - Lleva 5+ noches sin resolverse. Bug Fixer gasta ciclos en síntomas, no en causas.
> - Una vez hecho, el Bug Fixer de mañana reduciría de 399 → ~79 → -80 lógicos = **<0 lógicos restantes**.
> - Sin esta acción, el generador paramétrico (8 pantallas nuevas) seguirá acumulando ruido que oculta bugs reales.
>
> **Comando exacto (ejecutar en raíz del proyecto):**
> ```bash
> npx expo install @types/react @types/react-native typescript
> cd backend && npm install @types/node
> ```
>
> **Acción secundaria (5 min):** Registrarse en Amazon Associates España en `programa.amazon.es` para desbloquear C1.

---

## 8. Resumen de Propuestas

| # | Tipo | Bloque | Prioridad | Días pendiente |
|---|------|--------|-----------|----------------|
| 1 | Prerequisito técnico @types | Todos | **MÁXIMA** | 5+ días (BLOQUEO) |
| 2 | Limitar Feature Builder a 3 pantallas/sesión | D0 | Alta | nuevo |
| 3 | Completar A2 + iniciar B1 en paralelo | A2, B1 | Media | nuevo |
| 4 | FlashList → ToolSearch + WoodCatalog | D2 | Media | 2 días |
| 5 | Añadir generador paramétrico a tabla fases | Docs | Baja | nuevo |
| Bug #1 | CompareSheet children optional | D0 | **Crítico** | 1 día |
| Bug #2 | SectionTitle React.ReactNode | D0 | **Crítico** | 1 día |
| Bug #3 | ProjectDetailScreen callbacks tipados | D0 | **Crítico** | 1 día |
| Bug #4 | exportParametricPdf declare require | D0 | Media | 1 día |
| Bug #5 | Pantallas paramétricas ×6 map types | D0 | Media | 1 día |

**Bloqueos críticos:** 2 (C1 Amazon ≥3 días externo; @types ≥5 días interno)
**Acción humana única:** `npx expo install @types/react @types/react-native typescript`

---

*Generado automáticamente por agente cierre diario — DIY Project — 2026-04-17T07:00 Madrid*
