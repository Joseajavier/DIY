# Checklist de ejecucion por fase

## Para cada fase, verificar:

### Pre-implementacion
- [ ] Spec de fase leida y entendida
- [ ] Dependencias de fases anteriores cerradas
- [ ] Librerias necesarias identificadas

### Implementacion
- [ ] Archivos creados/modificados segun spec
- [ ] TypeScript compila sin errores (app)
- [ ] TypeScript compila sin errores (backend, si aplica)
- [ ] Modelos actualizados si hace falta
- [ ] Navegacion actualizada si hay pantallas nuevas

### Validacion
- [ ] Flujo funcional probado en simulador o dispositivo
- [ ] Estados de error manejados
- [ ] Empty states cubiertos
- [ ] No hay textos "undefined" o errores de dev visibles
- [ ] i18n actualizado si hay textos nuevos

### Cierre
- [ ] Commit con mensaje descriptivo
- [ ] PHASE_STATUS.md actualizado
- [ ] Sin archivos temporales o debug en el commit

## Orden de ejecucion recomendado

```
Fase 1 → Fase 2 → Fase 3 → Fase 4A → Fase 5 → Fase 6 → Fase 7 → Fase 8 → Fase 9
         ↓                    ↓
         (requiere prebuild)  (requiere backend)
```

### Fases secuenciales (no solapar)
- 1 → 2 (la persistencia necesita la estructura base)
- 4A → 5 (la integracion necesita el backend)
- 6 → 7 (la beta necesita el MVP pulido)

### Fases parcialmente paralelizables
- 3 (motor) puede empezar con 2 (persistencia) en paralelo
- 8 (roadmap) puede empezar mientras se cierra 7

### Cuando parar de construir y validar
- Despues de Fase 7: PARAR y lanzar beta
- No construir V2 sin datos de beta reales
- Minimo 2 semanas de beta antes de decidir V2
