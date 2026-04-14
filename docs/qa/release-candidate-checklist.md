# Release Candidate Checklist — DIY App v1.0

## Build
- [ ] `npx tsc --noEmit` sin errores (app)
- [ ] `npx tsc --noEmit` sin errores (backend)
- [ ] `eas build --profile preview --platform ios` exitoso
- [ ] `eas build --profile preview --platform android` exitoso
- [ ] App instala y abre en dispositivo real

## Flujos criticos
- [ ] DIY sin IA: input → pasos → materiales → tiendas (completo)
- [ ] DIY con IA: genera con OpenAI, resultado estructurado
- [ ] PRO sin IA: input → optimizacion → resultados → tiendas (completo)
- [ ] PRO con IA: tool calling funciona, datos correctos
- [ ] Fallback: IA desactivada/caida → logica local funciona
- [ ] Guardar proyecto → aparece en historial
- [ ] Reabrir proyecto → datos completos
- [ ] Borrar proyecto → confirmacion + desaparece

## Estabilidad
- [ ] No hay crashes en 10 minutos de uso normal
- [ ] Doble tap protegido (no dobles envios)
- [ ] Inputs vacios muestran error, no crash
- [ ] Sin internet + IA → fallback limpio, sin crash
- [ ] Timeout de API a 30s → mensaje claro
- [ ] Navegacion back durante loading → no crashea

## UX
- [ ] Textos en ES correctos (no claves i18n)
- [ ] Textos en EN correctos
- [ ] Empty states bonitos en proyectos vacios
- [ ] Loading states visibles
- [ ] Error states con boton retry
- [ ] Tema rustico consistente
- [ ] No hay textos "undefined", "null" o errores de dev

## Backend
- [ ] /health responde OK
- [ ] /ai/diy-generate responde JSON valido
- [ ] /ai/pro-plan ejecuta tools y responde
- [ ] /feedback recibe y loguea
- [ ] /analytics/events recibe batch
- [ ] Rate limiting activo (30 req/min AI)
- [ ] Logs no exponen API key

## Monitoring
- [ ] Sentry configurado (DSN valido)
- [ ] Analytics trackea app_opened
- [ ] Crash en produccion se reporta a Sentry

## Seguridad
- [ ] API key solo en backend .env
- [ ] .env en .gitignore
- [ ] No hay secretos en el codigo fuente
- [ ] CORS configurado

## Decision
- [ ] RC aprobado para distribucion beta
- [ ] Fecha de inicio de beta: ___________
