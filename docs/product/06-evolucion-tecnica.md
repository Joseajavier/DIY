# Evolucion tecnica post-beta

## Hacer pronto (si hay traccion)
| Cambio | Por que | Esfuerzo |
|---|---|---|
| Cache IA en backend (Redis/SQLite) | Reduce coste OpenAI 50-70% | 2-3 dias |
| Rate limiting por usuario (no solo IP) | Evita abuso cuando haya auth | 1 dia |
| Logs estructurados (JSON) en backend | Mejor observabilidad en produccion | 1 dia |
| Migrar a gpt-4o-mini con fallback a gpt-3.5 | Control de costes con calidad | 1 dia |
| Feature flags basicos (MMKV) | Activar/desactivar features sin deploy | 1 dia |

## Hacer si hay traccion real (>1000 usuarios activos)
| Cambio | Por que | Esfuerzo |
|---|---|---|
| Auth (email + Apple/Google) | Necesario para sync, pago y multi-dispositivo | 1-2 semanas |
| Sync nube (Supabase o propia) | Backup y multi-dispositivo | 2-3 semanas |
| API de precios reales | Credibilidad de recomendaciones de compra | 1-2 semanas |
| In-app purchases | Monetizacion real | 1 semana |
| Panel admin web | Ver analytics, feedback, gestionar usuarios | 2-3 semanas |
| Motor compartido app/backend (monorepo) | Evitar duplicar logica determinista | 1 semana |

## No tocar todavia
| Cambio | Por que |
|---|---|
| Microservicios | Sobreingenieria para este volumen |
| GraphQL | REST funciona bien para este caso |
| Real-time / WebSockets | No hay caso de uso colaborativo aun |
| Kubernetes / contenedores complejos | Railway/Render es suficiente |
| ML propio | OpenAI cubre las necesidades actuales |
