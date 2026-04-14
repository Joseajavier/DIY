# Propuesta V2

## Nombre: DIY v2.0 — "Del taller a la tienda"

## Que entra
1. **Precios reales** — conexion con API de Leroy Merlin o scraping de Amazon para precios actualizados
2. **Exportar lista de compra** — texto + PDF con materiales, cantidades y precios
3. **Diagrama de cortes 2D** — visualizacion simple de donde van las piezas en cada tablero
4. **Presupuesto total** — suma automatica: tableros + materiales + extras
5. **Sugerencias en DIYInput** — chips con ideas populares (estanteria, mesa, banco, etc.)
6. **Cache IA en backend** — respuestas cacheadas por hash de prompt, reduce coste OpenAI ~60%
7. **Fotos de referencia** — adjuntar 1-3 fotos al proyecto como inspiracion

## Que se queda fuera (y por que)
| Feature | Por que no |
|---|---|
| Cuentas de usuario | Complejidad alta, bajo ROI en v2 — el usuario no pierde datos locales |
| Sync nube | Requiere auth + infra — prematura sin traccion |
| Version web | El valor esta en movil, en el taller |
| Colaboracion | Requiere auth + real-time — v3 como pronto |
| Voz | Bonito pero no resuelve un pain real todavia |

## Valor que aporta V2
- **Credibilidad**: precios reales hacen que la recomendacion de compra sea accionable
- **Utilidad directa**: el usuario se lleva la lista de compra al Leroy Merlin
- **Comprension visual**: ve como quedan las piezas en el tablero antes de cortar
- **Reduccion de coste**: cache IA baja la factura de OpenAI

## Complejidad tecnica
- Precios reales: 1-2 semanas (API o scraping + backend)
- Diagrama 2D: 1 semana (react-native-svg o canvas simple)
- PDF: 2-3 dias (expo-print o react-native-html-to-pdf)
- Cache: 2-3 dias (Redis o SQLite en backend)
- Sugerencias + presupuesto: 1-2 dias
- Fotos: 3-4 dias (expo-image-picker + storage local)

## Timeline estimado: 4-6 semanas
