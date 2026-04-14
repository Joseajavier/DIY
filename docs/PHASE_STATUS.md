# Estado de fases y criterios de aceptacion

## Fase 1 — Base y navegacion
**Estado**: HECHA
**Criterio de cierre**:
- [x] Estructura src/ con screens, components, services, models, utils, navigation
- [x] 9+ pantallas creadas y navegables
- [x] React Navigation configurado
- [x] TypeScript compila sin errores
- [x] Proyecto arranca en simulador

## Fase 2 v2 — Persistencia local
**Estado**: HECHA
**Criterio de cierre**:
- [x] expo-sqlite instalado y funcionando
- [x] react-native-mmkv instalado y funcionando
- [x] 5 tablas SQLite con migraciones versionadas
- [x] 5 repositorios CRUD completos
- [x] MMKV para preferencias (modo, idioma, unidades, onboarding, lastProjectId)
- [x] Expo prebuild genera ios/ y android/
- [x] Build iOS exitoso

## Fase 3 — Motor de logica + UX + i18n
**Estado**: HECHA
**Criterio de cierre**:
- [x] diyGenerator con 9 templates, dificultad y tiempo
- [x] cuttingOptimizer con FFD bin packing
- [x] materialsGenerator con estimacion de tornillos, cola, cantos
- [x] storeRecommender con 5 tiendas mock
- [x] priceComparator con ranking y recomendacion
- [x] projectEngine orquestador
- [x] Tema rustico carpintero aplicado
- [x] i18n ES/EN completo (~100 strings)
- [x] Selector de idioma funcional

## Fase 4A — IA real
**Estado**: HECHA
**Criterio de cierre**:
- [x] Backend Express + TypeScript compilando
- [x] POST /ai/diy-generate con structured outputs
- [x] POST /ai/pro-plan con tool calling
- [x] 3 tools implementadas (optimizeCuts, estimateMaterials, compareStoreOptions)
- [x] API client en Expo con fallback local
- [x] Toggle IA en pantallas DIY y PRO
- [x] API key solo en backend (.env)

## Fase 5 — Integracion end-to-end
**Estado**: HECHA
**Criterio de cierre**:
- [x] Hook useAsyncAction (idle/loading/success/error + double-tap protection)
- [x] Hook useDIYWorkflow y useProWorkflow
- [x] Componentes LoadingState, ErrorState, SourceBadge
- [x] Fallback IA → local con indicador visual
- [x] Persistencia automatica en ambos flujos
- [x] Proyectos reabribles desde historial

## Fase 6 — Cierre MVP
**Estado**: HECHA
**Criterio de cierre**:
- [x] ProjectsScreen con busqueda
- [x] ProjectDetailScreen con renombrar, duplicar, compartir, borrar
- [x] OnboardingScreen (4 slides, persistido en MMKV)
- [x] SettingsScreen (idioma, unidades, modo)
- [x] Proyectos recientes en Home
- [x] Continuar ultimo proyecto
- [x] Confirmacion antes de borrar
- [x] Empty states en todas las pantallas

## Fase 7 — Beta y operacion
**Estado**: HECHA
**Criterio de cierre**:
- [x] app.config.ts con 3 entornos
- [x] eas.json con perfiles dev/preview/production
- [x] Sentry integrado e inicializado
- [x] Analytics con 17 eventos de producto
- [x] FeedbackScreen funcional
- [x] Backend: /feedback + /analytics/events + rate limiting
- [x] Release checklist (40+ items)
- [x] Documentacion de entornos y builds

## Fase 8 — Roadmap post-beta
**Estado**: HECHA
**Criterio de cierre**:
- [x] Analisis critico del producto
- [x] Metricas accionables definidas
- [x] Backlog P0-P3 priorizado
- [x] Propuesta V2 acotada
- [x] Estrategia de monetizacion
- [x] Evolucion tecnica planificada
- [x] 10 riesgos con mitigaciones
- [x] Plan de decision post-beta (6 escenarios)
- [x] Plantilla review semanal

## Fase 9 — Documentacion maestra
**Estado**: HECHA
**Criterio de cierre**:
- [x] PROJECT_MASTER.md
- [x] PHASE_STATUS.md
- [x] EXECUTION_CHECKLIST.md
- [x] BACKLOG_LIVE.md
