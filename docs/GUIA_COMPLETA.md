# DIY App — Guia completa de todo lo construido

## Que es esta app
Una app movil de carpinteria y bricolaje con dos modos:
- **DIY Mode**: para principiantes. Describe tu idea y la app genera pasos, materiales, herramientas y donde comprar.
- **PRO Mode**: para profesionales. Introduce piezas con medidas exactas y la app optimiza los cortes, calcula materiales y compara tiendas.

Opcionalmente usa **IA real (OpenAI)** para generar proyectos mas creativos, pero funciona 100% offline con logica local.

---

## Como arrancarlo

### App movil (simulador)
```bash
cd ~/Documents/CODE/DIY

# Primera vez: instalar dependencias
yarn

# Generar proyecto nativo (solo la primera vez o tras instalar modulos nativos)
npx expo prebuild --clean

# Compilar e instalar en simulador iOS
LANG=en_US.UTF-8 npx expo run:ios

# O solo recargar JS (si ya esta compilado)
# Cmd+R en el simulador
```

### Backend (para IA)
```bash
cd ~/Documents/CODE/DIY/backend

# Instalar dependencias
yarn

# Crear archivo .env
cp .env.example .env
# Editar .env y poner tu OPENAI_API_KEY

# Arrancar en desarrollo
yarn dev
# → http://localhost:3001
# → http://localhost:3001/health para verificar
```

**Sin el backend la app funciona perfectamente** usando logica local. El backend solo es necesario si activas el toggle "Usar IA".

---

## Estructura del proyecto

```
DIY/
├── App.tsx                  ← Entrada principal (Sentry + i18n + Navigation)
├── app.config.ts            ← Config por entorno (dev/preview/production)
├── eas.json                 ← Perfiles de build (EAS Build)
│
├── src/
│   ├── screens/             ← 13 pantallas
│   │   ├── HomeScreen.tsx           Pantalla principal con hero, modos, proyectos recientes
│   │   ├── ModeSelectionScreen.tsx  Elegir DIY o PRO
│   │   ├── OnboardingScreen.tsx     4 slides de bienvenida (solo 1a vez)
│   │   ├── SettingsScreen.tsx       Idioma, unidades, modo por defecto
│   │   ├── FeedbackScreen.tsx       Enviar bug/sugerencia al backend
│   │   ├── ProjectsScreen.tsx       Lista de proyectos con busqueda
│   │   ├── ProjectDetailScreen.tsx  Detalle: renombrar, duplicar, compartir, borrar
│   │   ├── DIYInputScreen.tsx       Describe tu proyecto + toggle IA
│   │   ├── DIYStepsScreen.tsx       Pasos generados con dificultad y tiempo
│   │   ├── DIYMaterialsScreen.tsx   Materiales y herramientas
│   │   ├── ProInputScreen.tsx       Introduce piezas + toggle IA
│   │   ├── ProOptimizationScreen.tsx  Barras de uso por tablero
│   │   ├── ProResultsScreen.tsx     Eficiencia, coste, materiales
│   │   └── ShopScreen.tsx           Comparativa de tiendas
│   │
│   ├── components/          ← 11 componentes reutilizables
│   │   ├── Card.tsx                 Tarjeta generica
│   │   ├── Button.tsx               Boton con 4 variantes
│   │   ├── ModeCard.tsx             Tarjeta de modo (DIY/PRO) con borde de color
│   │   ├── ProjectCard.tsx          Tarjeta de proyecto con linea lateral
│   │   ├── MetricCard.tsx           Valor + label (tableros, eficiencia, etc.)
│   │   ├── EfficiencyGauge.tsx      Barra de progreso con colores adaptativos
│   │   ├── EmptyState.tsx           Estado vacio con icono, titulo y accion
│   │   ├── LoadingState.tsx         Spinner + mensaje
│   │   ├── ErrorState.tsx           Error + boton retry
│   │   ├── SourceBadge.tsx          Indica si resultado es IA o local
│   │   └── SectionTitle.tsx         Titulo de seccion
│   │
│   ├── hooks/               ← 4 hooks
│   │   ├── useAsyncAction.ts        Gestion idle/loading/success/error + anti-doble-tap
│   │   ├── useDIYWorkflow.ts        Orquesta DIY: IA/local → persistencia → resultado
│   │   ├── useProWorkflow.ts        Orquesta PRO: IA/local → optimizacion → persistencia
│   │   └── useProjects.ts           CRUD proyectos: refresh, rename, duplicate, delete
│   │
│   ├── services/            ← Logica de negocio
│   │   ├── diyGenerator.ts          9 templates DIY con pasos, materiales, herramientas
│   │   ├── materialsGenerator.ts    Estima tableros, tornillos, cola, cantos
│   │   ├── cuttingOptimizer.ts      Algoritmo FFD de optimizacion de cortes
│   │   ├── storeRecommender.ts      5 tiendas mock con precios estimados
│   │   ├── priceComparator.ts       Ranking multi-criterio + recomendacion textual
│   │   ├── projectEngine.ts         Orquestador: runDIYProject, runProProject
│   │   ├── apiClient.ts             Cliente HTTP al backend con timeout 30s
│   │   ├── analytics/events.ts      17 eventos de producto con cola y batch
│   │   ├── feedback/feedbackService.ts  Enviar feedback al backend
│   │   └── monitoring/sentry.ts     Crash reporting con Sentry
│   │
│   ├── storage/             ← Persistencia local
│   │   ├── database.ts              Singleton SQLite (WAL + FK)
│   │   ├── migrations.ts            Esquema v1: 5 tablas con indices
│   │   ├── projectRepository.ts     CRUD proyectos
│   │   ├── pieceRepository.ts       CRUD piezas (create, update, delete)
│   │   ├── materialRepository.ts    CRUD materiales
│   │   ├── optimizationRepository.ts  Guardar/leer optimizacion
│   │   ├── shopRepository.ts        Guardar/leer opciones de tienda
│   │   ├── settingsStorage.ts       MMKV con fallback a memoria
│   │   └── utils.ts                 generateId, nowISO
│   │
│   ├── models/index.ts     ← Todos los tipos TypeScript
│   ├── navigation/AppNavigator.tsx  ← Stack navigator con 14 rutas
│   ├── i18n/                ← Multiidioma
│   │   ├── index.ts                 Config i18next
│   │   └── locales/es.json, en.json  ~100 strings cada uno
│   │
│   ├── theme/               ← Sistema de diseno "Modern Rustic Workshop"
│   │   ├── colors.ts                Espresso, cobre, verde salvia, arena
│   │   ├── spacing.ts               Spacing + radius tokens
│   │   ├── typography.ts            hero, h1-h3, body, caption, label, button
│   │   └── shadows.ts               sm, md, lg
│   │
│   └── utils/               ← Utilidades
│       ├── theme.ts                 Re-export backwards compat
│       ├── unitConverter.ts         Conversion cm/mm/in
│       ├── validation.ts            Validar nombre, descripcion, piezas, tablero
│       └── errors.ts                Normalizar errores a mensajes humanos
│
├── backend/                 ← Servidor Node.js + Express + OpenAI
│   └── src/
│       ├── app.ts                   Express con CORS, rate limiting, rutas
│       ├── server.ts                Arranque con validacion env
│       ├── routes/
│       │   ├── ai.ts                POST /ai/diy-generate y /ai/pro-plan
│       │   ├── feedback.ts          POST /feedback
│       │   └── analytics.ts         POST /analytics/events
│       ├── services/
│       │   ├── openaiClient.ts      Singleton OpenAI
│       │   ├── diyAiService.ts      IA con structured outputs (json_schema)
│       │   └── proAiService.ts      IA con tool calling (loop max 5)
│       ├── tools/
│       │   ├── optimizeCuts.ts      FFD bin packing (replica de app)
│       │   ├── estimateMaterials.ts Estimacion materiales
│       │   ├── compareStoreOptions.ts  Comparador de tiendas
│       │   └── toolRegistry.ts      Dispatcher de tools
│       ├── schemas/
│       │   ├── diySchema.ts         JSON schema + system prompt DIY
│       │   └── proSchema.ts         System prompt PRO + tool definitions
│       └── utils/
│           ├── env.ts               Variables de entorno
│           └── errors.ts            Error handler middleware
│
└── docs/                    ← Documentacion
    ├── PROJECT_MASTER.md            Vision, arquitectura, estado
    ├── PHASE_STATUS.md              11 fases con criterios de cierre
    ├── EXECUTION_CHECKLIST.md       Checklist por fase + orden
    ├── BACKLOG_LIVE.md              Ideas futuras priorizadas
    ├── GUIA_COMPLETA.md             Este documento
    ├── release/
    │   ├── beta-checklist.md        40+ items pre-release
    │   ├── environments.md          Tabla entornos + comandos
    │   └── analytics-events.md      17 eventos documentados
    ├── product/
    │   ├── 01-analisis-post-beta.md
    │   ├── 02-metricas-post-beta.md
    │   ├── 03-backlog-priorizado.md
    │   ├── 04-propuesta-v2.md
    │   ├── 05-monetizacion.md
    │   ├── 06-evolucion-tecnica.md
    │   ├── 07-riesgos-y-mitigaciones.md
    │   ├── 08-plan-decision-post-beta.md
    │   └── 09-plantilla-review-semanal.md
    └── qa/
        ├── manual-test-plan.md      10 flujos, 50+ checks
        └── release-candidate-checklist.md  40+ items RC
```

---

## Como funciona cada flujo

### Flujo DIY
1. **HomeScreen** → pulsa "Empezar un proyecto" → elige DIY
2. **DIYInputScreen** → escribe nombre + descripcion
   - Toggle IA OFF: usa `diyGenerator.ts` local (match por keywords → template)
   - Toggle IA ON: llama `POST /ai/diy-generate` → OpenAI genera con json_schema
   - Si IA falla: fallback automatico a local con alerta
3. **DIYStepsScreen** → ve pasos numerados + dificultad + tiempo
4. **DIYMaterialsScreen** → lista de materiales + herramientas (opcionales marcadas)
5. **ShopScreen** → 5 tiendas comparadas con precio, tiempo, score + recomendacion

En cada paso el proyecto se guarda en SQLite automaticamente.

### Flujo PRO
1. **HomeScreen** → PRO
2. **ProInputScreen** → nombre + tamaño tablero + lista de piezas (ancho x alto x cantidad)
   - Puedes añadir/quitar piezas dinamicamente
   - Toggle IA OFF: calculo local directo
   - Toggle IA ON: OpenAI orquesta tools (optimizeCuts, estimateMaterials, compareStoreOptions)
3. **ProOptimizationScreen** → distribucion por tablero con barras de uso (colores: verde >80%, naranja >50%, rojo)
4. **ProResultsScreen** → resumen con EfficiencyGauge + coste estimado tableros + materiales
5. **ShopScreen** → comparativa igual que DIY

### Gestion de proyectos
- **ProjectsScreen**: lista con busqueda, tap para abrir detalle
- **ProjectDetailScreen**: ve todo (piezas, optimizacion, materiales, tiendas)
  - Renombrar: tap en el titulo
  - Duplicar: crea copia con piezas y materiales
  - Compartir: genera texto formateado y abre Share nativo
  - Borrar: con confirmacion
  - Regenerar/Recalcular: vuelve al input del modo correspondiente

### Continuar proyecto
- Desde Home, "Continuar ultimo proyecto" abre directamente el ProjectDetail del ultimo proyecto guardado

---

## Tecnologias clave

| Que | Tecnologia | Para que |
|---|---|---|
| App | React Native + Expo SDK 54 | UI movil |
| Lenguaje | TypeScript | Tipos seguros |
| Navegacion | React Navigation | Stack de pantallas |
| DB local | expo-sqlite | Proyectos, piezas, materiales, optimizaciones, tiendas |
| Preferencias | react-native-mmkv | Modo, idioma, unidades, onboarding |
| Idiomas | i18next | ES + EN, deteccion automatica |
| Backend | Express 5 + TypeScript | API para IA |
| IA | OpenAI gpt-4o-mini | Generacion DIY + tool calling PRO |
| Crash | Sentry | Errores en produccion |
| Analytics | Servicio propio | 17 eventos de producto |
| Builds | EAS Build | dev/preview/production |

---

## Que necesitas para que funcione

### Minimo (sin IA)
- Node.js 18+
- Yarn
- Xcode (para iOS) o Android Studio
- `yarn` → `npx expo prebuild` → `npx expo run:ios`

### Con IA
- Todo lo anterior +
- Clave OpenAI (OPENAI_API_KEY)
- Backend corriendo (`cd backend && yarn dev`)
- La app detecta automaticamente si el backend esta disponible

---

## Numeros finales

- **20 commits**
- **~90 archivos** de codigo + docs
- **13 pantallas**
- **11 componentes** reutilizables
- **4 hooks** de estado
- **9 servicios** de logica
- **5 repositorios** SQLite
- **5 tablas** de base de datos
- **3 tools** de IA (optimizeCuts, estimateMaterials, compareStoreOptions)
- **5 endpoints** backend
- **9 templates** DIY
- **2 idiomas** (ES, EN)
- **17 eventos** de analytics
- **11 fases** completadas
- **9 documentos** de producto
- **2 checklists** de QA
