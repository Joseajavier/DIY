# PLAN MAESTRO DIY APP v2

**Fecha:** 2026-04-14
**Estado actual:** MVP funcional con 16 pantallas, backend con IA, catalogos locales

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
**Que hacer:**
- Ampliar de 76 a ~150 productos
- Marcas faltantes: Tacklife, Hychika, AEG, Ridgid, Fein, Virutex, Powermatic, Jet, Laguna, SawStop
- Tipos faltantes: sierra de marqueteria, torno, lijadora de tambor, escopleadora, espigadora, fresadora de mesa, clavadora
- Rating y reviewCount reales (investigar Amazon/reviews)
- Mejorar diseño de tarjeta (mas info visible, mejor layout)
**Dependencias:** Ninguna
**Esfuerzo:** 3-4 horas

#### A2 — Catalogo completo de maderas
**Antes:** Fase 14 (parcialmente hecha)
**Que hacer:**
- Ampliar de 20 a ~40 productos
- Completar precios reales mercado español 2024-2026
- Añadir variantes de tamaño con precios por cada madera
- Backend CRUD para maderas (como ya existe para herramientas)
- Endpoint GET /catalog/wood con filtros
**Dependencias:** Ninguna
**Esfuerzo:** 2-3 horas

#### A3 — Conectar app con backend para catalogos
**Antes:** Parte de Fase 15
**Que hacer:**
- ToolSearchScreen: intentar GET /catalog/tools primero, fallback a datos locales
- WoodCatalogScreen: intentar GET /catalog/wood primero, fallback a datos locales
- Cache en memoria 24h (ya existe catalogApiClient.ts base)
- Indicador de "datos actualizados" vs "datos offline"
**Dependencias:** A1, A2
**Esfuerzo:** 1-2 horas

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
