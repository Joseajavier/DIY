# Test Plan Manual — DIY App

## Flujo 1: Onboarding
- [ ] Abrir app por primera vez → ve onboarding
- [ ] Navegar 4 slides con "Siguiente"
- [ ] Pulsar "Saltar" salta al Home
- [ ] Cerrar y reabrir app → NO ve onboarding otra vez

## Flujo 2: DIY sin IA
- [ ] Home → Empezar → DIY
- [ ] Dejar nombre vacio → error "nombre obligatorio"
- [ ] Dejar descripcion vacia → error
- [ ] Escribir "estanteria de pared" → generar
- [ ] Ve pasos con numeracion
- [ ] Ve dificultad y tiempo estimado
- [ ] Navegar a materiales → lista correcta
- [ ] Navegar a tiendas → ve opciones con precios
- [ ] Volver al inicio → proyecto en "recientes"

## Flujo 3: DIY con IA
- [ ] Activar toggle IA
- [ ] Generar proyecto → loading visible
- [ ] Si backend caido → ve alerta "IA no disponible" y resultado local
- [ ] Si backend funciona → resultado con badge "Generado con IA"

## Flujo 4: PRO sin IA
- [ ] Home → Empezar → PRO
- [ ] Dejar nombre vacio → error
- [ ] Añadir pieza 60x40 x2
- [ ] Añadir pieza 30x20 x4
- [ ] Optimizar → ve tableros con barras de uso
- [ ] Ve eficiencia y desperdicio
- [ ] Navegar a resultados → ve materiales y coste estimado
- [ ] Navegar a tiendas → ve comparativa

## Flujo 5: PRO con IA
- [ ] Activar toggle IA
- [ ] Optimizar → loading
- [ ] Resultado con datos de tools (optimizeCuts, estimateMaterials)

## Flujo 6: Proyectos
- [ ] Home → Mis proyectos → ve lista
- [ ] Buscar por nombre → filtrado funciona
- [ ] Tap proyecto → ProjectDetail
- [ ] Ve piezas, materiales, optimizacion, tiendas
- [ ] Renombrar (tap titulo) → funciona
- [ ] Duplicar → crea copia con "(copia)"
- [ ] Compartir → abre sheet de compartir con texto formateado
- [ ] Borrar → confirmacion → desaparece de lista

## Flujo 7: Settings
- [ ] Home → ⚙️ → SettingsScreen
- [ ] Cambiar idioma ES/EN → textos cambian
- [ ] Cambiar unidades cm/mm/in → se guarda
- [ ] Cambiar modo por defecto → se guarda

## Flujo 8: Feedback
- [ ] Home → Enviar feedback → FeedbackScreen
- [ ] Seleccionar tipo (bug/sugerencia/otro)
- [ ] Escribir mensaje → enviar
- [ ] Ve confirmacion "Gracias"

## Flujo 9: Edge cases
- [ ] Input con solo espacios → error
- [ ] Pieza con ancho 0 → no se incluye
- [ ] 50 piezas → la app no crashea
- [ ] Sin internet + IA activada → fallback a local
- [ ] Doble tap en boton → solo un envio
- [ ] Volver atras durante loading → no crashea

## Flujo 10: Continuar proyecto
- [ ] Crear proyecto → volver a Home
- [ ] "Continuar ultimo proyecto" → abre ProjectDetail correcto
