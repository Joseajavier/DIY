# DIY App — Beta Release Checklist

## Pre-Build
- [ ] Variables de entorno configuradas (.env backend, app.config.ts)
- [ ] OPENAI_API_KEY válida en backend
- [ ] Sentry DSN configurado
- [ ] API URL apunta al entorno correcto (staging/production)
- [ ] Bundle ID actualizado (com.diyapp.preview para beta)

## Backend
- [ ] Backend desplegado (Railway/Render/VPS)
- [ ] `GET /health` responde `{ status: "ok" }`
- [ ] `POST /ai/diy-generate` funciona con prompt real
- [ ] `POST /ai/pro-plan` funciona con piezas reales
- [ ] `POST /feedback` recibe y loguea correctamente
- [ ] `POST /analytics/events` recibe eventos
- [ ] Rate limiting activo si procede
- [ ] Logs no exponen API key ni datos sensibles

## App — Funcionalidad
- [ ] Onboarding se muestra la primera vez
- [ ] Flujo DIY completo: input → pasos → materiales → tiendas
- [ ] Flujo PRO completo: input → optimización → resultados → tiendas
- [ ] Toggle IA funciona en ambos modos
- [ ] Fallback a lógica local cuando IA no disponible
- [ ] Indicador visual cuando usa fallback local
- [ ] Loading states claros
- [ ] Error states con retry
- [ ] Proyectos se guardan en SQLite
- [ ] Lista de proyectos funciona
- [ ] Detalle de proyecto carga datos completos
- [ ] Renombrar proyecto funciona
- [ ] Duplicar proyecto funciona
- [ ] Borrar proyecto con confirmación funciona
- [ ] Compartir proyecto genera texto correcto
- [ ] Settings: idioma, unidades, modo por defecto
- [ ] Feedback se envía correctamente

## App — UX
- [ ] Sin textos "undefined" o errores de desarrollador visibles
- [ ] Empty states decentes en todas las pantallas
- [ ] Botones no permiten doble pulsación (useAsyncAction)
- [ ] Tema rústico consistente en todas las pantallas
- [ ] Multiidioma funciona (ES/EN)
- [ ] Navegación fluida sin pérdida de contexto

## Build
- [ ] `npx tsc --noEmit` sin errores (app)
- [ ] `npx tsc --noEmit` sin errores (backend)
- [ ] `eas build --profile preview --platform ios` exitoso
- [ ] `eas build --profile preview --platform android` exitoso
- [ ] App se instala y abre correctamente en dispositivo

## Monitoring
- [ ] Sentry captura errores (probar error forzado)
- [ ] Analytics registra eventos clave
- [ ] Logs de backend accesibles

## Seguridad
- [ ] API key NO está en la app (solo backend)
- [ ] .env en .gitignore
- [ ] Logs no filtran datos sensibles
- [ ] CORS configurado correctamente

## Post-Launch
- [ ] Canal de feedback activo
- [ ] Proceso de rollback documentado
- [ ] Monitorización de errores activa
