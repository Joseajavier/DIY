# Metricas y senales post-beta

## Metricas de activacion (el usuario entiende el producto)
| Metrica | Buena senal | Mala senal |
|---|---|---|
| % usuarios que completan 1 flujo DIY | >60% | <30% |
| % usuarios que completan 1 flujo PRO | >40% | <15% |
| Tiempo medio hasta primera generacion | <2 min | >5 min |

## Metricas de valor (el producto es util)
| Metrica | Buena senal | Mala senal |
|---|---|---|
| % proyectos guardados vs generados | >70% | <30% |
| % proyectos reabiertos al menos 1 vez | >30% | <10% |
| % usuarios que llegan a pantalla Shop | >50% | <20% |
| % usuarios que usan PRO mas de 1 vez | >25% | <5% |

## Metricas de retencion (el usuario vuelve)
| Metrica | Buena senal | Mala senal |
|---|---|---|
| Usuarios activos semana 2 / semana 1 | >40% | <15% |
| Proyectos por usuario activo | >2 | =1 |
| Uso de "Continuar ultimo proyecto" | >20% | <5% |

## Metricas de IA (la IA aporta valor)
| Metrica | Buena senal | Mala senal |
|---|---|---|
| % requests con IA activada | >50% | <20% |
| % fallback a local (IA fallo) | <10% | >30% |
| Satisfaccion: relanzan IA con mismo prompt | <15% | >40% |

## Metricas de friction (donde abandonan)
- Tasa de abandono en DIYInputScreen (no genera)
- Tasa de abandono en ProInputScreen (no optimiza)
- % que llegan a Shop pero no hacen nada
- % que abren Settings (exploracion sin proposito = confusion)

## Decision framework
- Si activacion alta + retencion baja → el producto engancha pero no retiene → mejorar profundidad
- Si activacion baja + feedback positivo → la UX de entrada es mala → mejorar onboarding
- Si IA se usa mucho + fallback alto → backend inestable → invertir en infra
- Si PRO se usa poco → simplificar o integrar en DIY como opcion avanzada
