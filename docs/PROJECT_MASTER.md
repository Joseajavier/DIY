# DIY App — Documento Maestro

## Vision
App movil de carpinteria y bricolaje que ayuda a usuarios (principiantes y profesionales) a planificar, calcular y ejecutar proyectos de madera, con IA opcional y funcionamiento offline.

## Arquitectura final
- **App**: React Native + TypeScript + Expo (prebuild)
- **Persistencia**: expo-sqlite (datos) + react-native-mmkv (preferencias)
- **Backend**: Node.js + Express + TypeScript
- **IA**: OpenAI (gpt-4o-mini) via backend con structured outputs + tool calling
- **Builds**: EAS Build (dev/preview/production)
- **Monitoring**: Sentry (crash) + analytics propio + feedback in-app

## Stack completo
| Capa | Tecnologia |
|---|---|
| UI | React Native 0.81 + Expo SDK 54 |
| Navegacion | React Navigation (native-stack) |
| DB local | expo-sqlite (5 tablas, migraciones) |
| Preferencias | react-native-mmkv v4 |
| i18n | i18next + react-i18next + expo-localization |
| Backend | Express 5 + TypeScript |
| IA | OpenAI SDK v6 (structured outputs + tools) |
| Crash | @sentry/react-native |
| Builds | EAS Build |

## Fases del proyecto

| Fase | Descripcion | Estado |
|---|---|---|
| 1 | Base y navegacion | HECHA |
| 2 v2 | Persistencia local (SQLite + MMKV) | HECHA |
| 3 | Motor de logica + UX rustica + i18n | HECHA |
| 4A | Backend con IA real (OpenAI + tools) | HECHA |
| 5 | Integracion end-to-end | HECHA |
| 6 | Cierre MVP y pulido | HECHA |
| 7 | Beta, publicacion y operacion | HECHA |
| 8 | Roadmap post-beta y estrategia | HECHA |
| 9 | Documentacion maestra | HECHA |

## Estructura del proyecto
```
DIY/
  App.tsx                    # Entry point con Sentry
  app.config.ts              # Config por entornos
  eas.json                   # Perfiles de build
  src/
    screens/       (13)      # Pantallas
    components/    (7)       # Card, Button, Gauge, Loading, Error, etc.
    hooks/         (4)       # useAsyncAction, useDIYWorkflow, useProWorkflow, useProjects
    services/      (9)       # Logica, API client, analytics, feedback, monitoring
    storage/       (9)       # SQLite repos + MMKV + migraciones
    models/        (1)       # Tipos TypeScript
    navigation/    (1)       # Stack navigator
    i18n/          (3)       # Config + ES + EN
    utils/         (2)       # Theme + unit converter
  backend/
    src/
      routes/      (3)       # /ai, /feedback, /analytics
      services/    (3)       # OpenAI client, DIY AI, PRO AI
      tools/       (4)       # optimizeCuts, estimateMaterials, compareStores, registry
      schemas/     (2)       # DIY + PRO schemas
      utils/       (2)       # Env + errors
  docs/
    release/       (3)       # Checklist, entornos, analytics events
    product/       (9)       # Analisis, metricas, backlog, V2, monetizacion, riesgos
  Data/FASES/      (10)      # Specs originales de cada fase
```

## Proximas acciones
1. Configurar .env en backend con OPENAI_API_KEY real
2. Ejecutar `eas build --profile preview` para generar build beta
3. Distribuir beta internamente
4. Recoger metricas y feedback durante 2-4 semanas
5. Decidir Go/No-Go para V2 segun plan de decision (doc 08)
