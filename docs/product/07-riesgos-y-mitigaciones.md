# Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigacion |
|---|---|---|---|
| **Coste IA demasiado alto** | Media | Alto | Cache agresiva + gpt-4o-mini + limitar creditos gratis |
| **Resultado IA inconsistente** | Media | Alto | Structured outputs + validacion server-side + fallback local |
| **Tiendas mock restan credibilidad** | Alta | Medio | P0 en v2: conectar API precios reales |
| **Poco uso de modo PRO** | Media | Medio | Si se confirma, integrar PRO como opcion avanzada dentro de DIY |
| **Demasiada complejidad para principiante** | Media | Alto | Mejorar onboarding + sugerencias + ejemplos visuales |
| **Baja retencion** | Alta | Alto | Notificaciones utiles + proyectos reutilizables + historial valioso |
| **App util pero no imprescindible** | Alta | Critico | Enfocar en el momento de uso: "estoy en la tienda, que compro" |
| **Backend cae y no hay IA** | Baja | Medio | Fallback local ya implementado, funciona offline |
| **Competencia directa** | Baja | Medio | El optimizador de cortes + IA es diferencial |
| **OpenAI cambia precios o API** | Baja | Alto | Abstraer via backend, posible migrar a Anthropic/local |
