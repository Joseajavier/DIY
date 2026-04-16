# Fase 22 — Roadmap de mejoras de la app (post-Fase 6)

> Menú consolidado de mejoras sobre la app DIY tras cerrar Fases 4/5/6
> (generadores paramétricos + guardar como proyecto + exportar PDF).
> Ordenado por **impacto visible al usuario / esfuerzo**.

## 🎯 Top 5 recomendadas

### 22.1 — Más plantillas paramétricas (2-3 h cada una)
Actualmente hay 6: Estantería, Mesa, Caja, Cajonera, Armario, Banco.
Siguientes candidatas (reutilizan todo el motor + isométrico + PDF):
- **Escritorio con cajones** (mesa + 1-2 cajoneras laterales)
- **Cama con canapé** (estructura rectangular + somier de lamas)
- **Zapatero** (cajonera horizontal con puertas abatibles hacia delante)
- **Estantería en L** (dos estanterías unidas en esquina)
- **Cómoda** (cajonera ancha estilo dormitorio)
- **Botellero** (rombos o celdas cuadradas diagonales)

### 22.2 — Lista de herrajes automática (2 h) ← EN CURSO
Cada plantilla calcula los herrajes según sus uniones:
- Tornillos (4×40, 4×50, 6×80 según caso)
- Bisagras (cazoleta 35mm para puertas, rectas para tapas)
- Guías telescópicas por cajón (par)
- Tiradores (1 por cajón/puerta)
- Pernos de balda (4 por balda regulable)
- Escuadras metálicas (refuerzo mesas/bancos)
- Puntillas 3×20 para traseros clavados

Salida en UI (card) + sección nueva en PDF.
Impacto: enorme en percepción de "app profesional".

### 22.3 — Recortes aprovechables (3 h) ⭐ diferenciador
Al optimizar los cortes, los sobrantes útiles (área > 225 cm² ≈ 15×15 cm)
se guardan en un "Almacén de recortes" por material.
Al diseñar un proyecto nuevo, la app detecta si hay recortes compatibles
(material + grosor + dimensión suficiente) y sugiere:
> "Puedes usar este recorte de 40×28 del proyecto Mesa salón (26/03)"

**Nadie tiene esto en el mercado.** Ahorro real de dinero y madera.

### 22.4 — Editar / duplicar proyecto guardado (2 h)
Problema actual: creas un proyecto paramétrico → se guarda como tipo 'pro'
→ pierdes los parámetros originales → no puedes reabrir en el generador
para modificar 2cm de ancho.

Solución: persistir también los `ParametricGeneratorParams` originales +
`ParametricTemplateId` en SQLite. Añadir botón "✏️ Editar parámetros" en
`ProjectDetail` que reabra la pantalla correspondiente prellenada.

### 22.5 — Planos cotados por pieza en el PDF (2 h)
El PDF actual tiene vistas generales (alzado/planta/perfil).
Añadir **una hoja por pieza** (o por tipo de pieza) con:
- Rectángulo a escala de la pieza
- Cotas milimétricas en los 4 lados
- Ubicación de taladros/espigas/cajeados si los hay
- Nombre + cantidad

Flujo: imprimes, pegas sobre el tablón, cortas con sierra circular.

---

## 🍒 Golosinas visuales (≈1 h cada)

### 22.6 — Animación 3D de montaje
En el isométrico, piezas apareciendo una a una al hacer tap. Easing suave,
orden lógico (laterales → base → techo → baldas → trasero).

### 22.7 — Modo oscuro del theme Woodzy
Variante oscura de la paleta Woodzy respetando la calidez artesanal.
Toggle en Settings. Usa `useColorScheme()` para detectar preferencia SO.

### 22.8 — Favoritos en herramientas y maderas
Icono ⭐ en las cards. Persistir en MMKV. Sección "Favoritos" en catálogo.

### 22.9 — Onboarding de 3 pantallas
Swiper al primer inicio: qué hace la app · cómo optimizar cortes ·
cómo guardar proyectos. Persistir flag `onboardingDone` en MMKV.

---

## 🧠 Más ambiciosas (día entero cada una)

### 22.10 — Diario del proyecto
En cada proyecto, tab "Diario": fotos de avance + notas por fecha.
expo-image-picker + FlatList con timeline.

### 22.11 — Tutoriales de montaje paso a paso
Usando los isométricos, generar 5-7 pasos ordenados con texto explicativo:
"Paso 1: atornilla la base al lateral izquierdo usando 3 tornillos…"

### 22.12 — Modo AR (Android + iOS)
Ver el mueble a escala 1:1 en tu habitación con la cámara.
`expo-three` + `@react-three/fiber/native` + `expo-gl` + `ARKit`/`ARCore`.
Alta complejidad técnica, impacto viral en marketing.

---

## Orden de ataque sugerido

| # | Fase | Horas | Valor percibido |
|---|------|-------|-----------------|
| 1 | 22.2 Herrajes | 2 | ⭐⭐⭐⭐⭐ |
| 2 | 22.1a Escritorio | 3 | ⭐⭐⭐⭐ |
| 3 | 22.4 Editar proyecto | 2 | ⭐⭐⭐⭐ |
| 4 | 22.5 Planos cotados | 2 | ⭐⭐⭐⭐⭐ |
| 5 | 22.3 Recortes | 3 | ⭐⭐⭐⭐⭐ diferenciador |
| 6 | 22.6-9 Golosinas | 4 | ⭐⭐⭐ polish |
| 7 | 22.10-12 Ambiciosas | 3 días | ⭐⭐⭐⭐⭐ marketing |

## Criterio de cierre Fase 22
La fase 22 se considera cerrada cuando:
- [ ] 22.1 tiene al menos 3 plantillas nuevas (9 totales)
- [ ] 22.2 herrajes aparecen en UI + PDF de todas las plantillas
- [ ] 22.3 recortes aprovechables funcionan end-to-end
- [ ] 22.4 editar proyecto paramétrico guardado funciona
- [ ] 22.5 PDF incluye hoja por pieza con cotas
- [ ] Al menos 2 golosinas visuales implementadas
