# WOODZY THEME — Plantilla de reconstrucción

Reconstrucción del theme **"Woodzy – Woodworking & Carpentry App UI Design"** de Zahra Mortazavi (Dribbble) como sistema reutilizable para una app real.

> ⚠️ No existe demo pública navegable ni Figma oficial confirmado. Este documento reconstruye el sistema visual a partir del shot y separa **dato observado** de **inferencia razonada**.

Archivos entregables de esta plantilla:
- `src/theme/woodzy.ts` — tokens exportables (colores, spacing, radius, tipografía, sombras, layout).
- `Data/FASES/WOODZY_THEME.md` — este documento.

---

## 1. ADN visual

1. **Fondo gris cálido** (`#EAE8E8`) con textura de puntitos sutil — ancla todo el diseño en un gris muy claro, no blanco.
2. **Superficies blancas puras** en tarjetas y pantallas de detalle — contraste suave contra el fondo.
3. **Acento terracota quemado** (`#AB130A`) reservado al hero banner y a momentos clave, nunca como fondo general.
4. **Negro profundo** (`#0D0C0C`) en CTAs y titulares — da premium, no industrial.
5. **Tipografía con personalidad serif** en titulares + **sans limpia** en UI — la tensión entre serif rústico y sans moderno es lo que hace "modern and rustic".
6. **Esquinas amplias pero no infantiles**: tarjetas en ~20px, hero en ~28px, botones full pill.
7. **Iconografía line-weight medio**, trazos limpios, nada de glifos gruesos ni estilo "tool".
8. **Categorías con fondo blanco + icono grande + label corto** — nunca con foto de madera real.
9. **Una categoría destacada en azul petróleo oscuro** (`#1F3A3F` aprox) — rompe la paleta cálida con un acento frío único.
10. **Hero banner con líneas curvas orgánicas** que evocan veta de madera sin imitarla literalmente.
11. **Barra de búsqueda tipo pill** con icono lupa a la izquierda y placeholder discreto.
12. **Chips de atributos** (material, medidas, acabado) en detalle de producto, estilo pill, borde fino.
13. **Mucho whitespace vertical** entre secciones — nada de listas densas.
14. **Sin sombras duras**: profundidad por contraste fondo/superficie, no por drop shadow.
15. **Producto centrado sobre blanco** en detalle, sin sombras ni reflejos cursis.

### ¿Por qué se ve "modern and rustic" al mismo tiempo?
- **Modern**: rejilla limpia, mucho aire, tipografía sans en UI, esquinas muy redondeadas, CTA negro profundo, ausencia de texturas de madera literales.
- **Rustic**: paleta cálida (crema/topo/terracota), serif en titulares, curvas orgánicas en el hero, acento terracota que recuerda barniz y ladrillo.

La clave: **lo rústico entra por color, producto y curva**, no por texturas de madera pegadas.

### Decorativo vs sistema reutilizable
| Decorativo (no generalizar) | Sistema (reutilizable) |
|---|---|
| Veta orgánica concreta del hero | Patrón de curvas como "marca del hero" |
| Fotos específicas del shot | Ratio 1:1 + fondo blanco + centrado |
| Color azul petróleo de una categoría | Un slot "categoría destacada" con color contrastante |
| Copy del shot | Estructura: banner → search → categorías → destacados |

### Errores que romperían la estética
- Meter **texturas de madera fotográficas** de fondo.
- Usar **naranja fluor** o terracota saturado en vez del `#AB130A` tirando a ladrillo.
- CTAs **no negros** (azul, verde, morado).
- **Fondos oscuros** tipo "dark mode industrial".
- **Sombras fuertes** bajo tarjetas.
- Usar **solo sans serif**, pierde la personalidad rústica.
- **Listas densas** sin whitespace vertical.
- **Iconografía filled gruesa** tipo material design.

---

## 2. Datos observados vs inferencias

### ✅ Dato observado (del shot o de la página de Dribbble)
- Paleta oficial citada: `#EAE8E8 #C1B1AE #0D0C0C #5B5B5C #AB130A #5D1810 #9B8377 #AD5F4A`.
- Composición: home + detalle de producto en mockups de iPhone.
- Hero banner terracota con curvas orgánicas.
- Barra de búsqueda pill.
- Grid de categorías con iconos.
- Una categoría destacada en color frío.
- Detalle de producto con chips de atributos y CTA oscuro.
- Look "modern and rustic", carpintería a medida, mobiliario premium.

### 🤔 Inferencia razonada (no confirmado, reconstruido)
- **Tipografía exacta**: no confirmada. Perfil ideal y combinaciones reales en Fase 3.
- **Valores numéricos de radius/spacing**: reconstruidos a ojo desde el shot.
- **Azul petróleo de la categoría destacada**: estimado en `#1F3A3F`, podría ir de `#1A3337` a `#223F44`.
- **Bottom nav**: su existencia y forma exacta no están confirmadas en el shot, se propone estándar mobile.
- **Pantalla Search, Favorites, Cart, Profile**: NO existen en el shot original. Se reconstruyen respetando el lenguaje del home y el detalle.
- **Dark mode**: no existe versión oscura en el shot. Recomendación explícita: **no hacer dark mode** de este theme (rompería la calidez). Si fuera imprescindible, ver Fase 6.

---

## 3. Design tokens — JSON

```json
{
  "colors": {
    "background": "#EAE8E8",
    "surface": "#FFFFFF",
    "surfaceSecondary": "#F4F1EF",
    "textPrimary": "#0D0C0C",
    "textSecondary": "#5B5B5C",
    "textMuted": "#9B8377",
    "accentPrimary": "#AB130A",
    "accentPrimaryDark": "#5D1810",
    "accentWarm": "#AD5F4A",
    "border": "#C1B1AE",
    "borderSubtle": "#E6DFDB",
    "icon": "#0D0C0C",
    "iconMuted": "#5B5B5C",
    "cta": "#0D0C0C",
    "ctaPressed": "#2A2826",
    "categorySelected": "#1F3A3F",
    "categoryUnselected": "#FFFFFF",
    "heroBackground": "#AB130A",
    "heroPattern": "#5D1810"
  },
  "radius": {
    "sm": 10,
    "md": 16,
    "lg": 20,
    "xl": 28,
    "pill": 999
  },
  "spacing": {
    "xs": 4,
    "sm": 8,
    "md": 12,
    "lg": 16,
    "xl": 20,
    "xxl": 24,
    "xxxl": 32,
    "xxxxl": 48
  },
  "iconSize": { "sm": 16, "md": 20, "lg": 24, "xl": 32, "category": 28, "hero": 40 },
  "button":   { "heightSm": 40, "heightMd": 48, "heightLg": 56, "paddingH": 24, "radius": 999 },
  "chip":     { "height": 36, "paddingH": 14, "paddingV": 8, "radius": 999, "gap": 8 },
  "border":   { "hairline": 1, "regular": 1.5, "thick": 2 },
  "shadow": {
    "card":     { "y": 2, "blur": 8,  "opacity": 0.06, "color": "#0D0C0C" },
    "hero":     { "y": 6, "blur": 16, "opacity": 0.12, "color": "#5D1810" },
    "floating": { "y": 8, "blur": 20, "opacity": 0.12, "color": "#0D0C0C" }
  }
}
```

---

## 4. Tabla de tokens (legible)

### Colores
| Token | Hex | Uso |
|---|---|---|
| `background` | `#EAE8E8` | Fondo global de la app |
| `surface` | `#FFFFFF` | Tarjetas, detalle de producto |
| `surfaceSecondary` | `#F4F1EF` | Secciones alternas, listas |
| `textPrimary` | `#0D0C0C` | Titulares, CTAs |
| `textSecondary` | `#5B5B5C` | Subtítulos, meta |
| `textMuted` | `#9B8377` | Placeholders, hints |
| `accentPrimary` | `#AB130A` | Hero, momento fuerte |
| `accentPrimaryDark` | `#5D1810` | Hover, veta, gradiente |
| `accentWarm` | `#AD5F4A` | Chips, iconos secundarios |
| `border` | `#C1B1AE` | Divisores, outlines |
| `borderSubtle` | `#E6DFDB` | Outlines de tarjetas |
| `cta` | `#0D0C0C` | Botón primario |
| `categorySelected` | `#1F3A3F` | Pill/chip activo contrastante |
| `heroBackground` | `#AB130A` | Fondo del hero banner |

### Radios
| Token | px | Uso |
|---|---|---|
| `sm` | 10 | Badges, input pequeño |
| `md` | 16 | Inputs, search bar |
| `lg` | 20 | Tarjetas producto, categorías |
| `xl` | 28 | Hero banner |
| `pill` | 999 | Botones, chips, search |

### Spacing
| Token | px | Uso |
|---|---|---|
| `xs` | 4 | Gap iconos inline |
| `sm` | 8 | Gap dentro de un componente |
| `md` | 12 | Gap entre chips |
| `lg` | 16 | Padding tarjetas |
| `xl` | 20 | Padding lateral pantalla |
| `xxl` | 24 | Padding interior de hero |
| `xxxl` | 32 | Separación entre secciones |
| `xxxxl` | 48 | Respiración superior/inferior |

### Iconos y botones
| Token | Valor | Uso |
|---|---|---|
| `icon.md` | 20 | Icono en top bar |
| `icon.category` | 28 | Icono en category card |
| `button.heightMd` | 48 | Altura CTA estándar |
| `chip.height` | 36 | Altura chip atributo |
| `border.hairline` | 1px | Divisor sutil |

---

## 5. Tipografía

### 5.1 Perfil tipográfico ideal
- **Display**: serif contemporáneo, cálido, con personalidad pero legible. Algo entre *display serif editorial* y *transitional*. Contraste medio-alto, sin ser didone.
- **Text (UI)**: sans-serif geométrico-humanista. Legible en cuerpos pequeños. Sin personalidad agresiva.

### 5.2 Tres combinaciones reales (todas gratis / Google Fonts)

**Combinación A — recomendada para mobile**
- Display: **Fraunces** (serif variable, muy cálido, personalidad artesanal).
- Text: **Inter** (sans UI estándar, legible a cualquier tamaño).
- Por qué: Fraunces aporta la calidez rústica, Inter garantiza UI limpia y legible en iOS/Android.

**Combinación B — más editorial**
- Display: **DM Serif Display**.
- Text: **DM Sans**.
- Por qué: misma familia, contraste alto en titulares, look más magazine.

**Combinación C — más rústica**
- Display: **Recoleta** (de Latinotype, no es gratis) o **Playfair Display** como alternativa libre.
- Text: **Manrope**.
- Por qué: Recoleta es casi idéntica al "feeling Woodzy", Playfair es el fallback libre.

### 5.3 Recomendación para app móvil
→ **Combinación A — Fraunces + Inter**. Rinde en cuerpos pequeños, carga desde Expo Google Fonts, y Fraunces da la personalidad rústica sin sacrificar legibilidad.

### 5.4 Jerarquía
| Nivel | Font | Size | Line | Weight | Uso |
|---|---|---|---|---|---|
| `display` | Fraunces | 34 | 40 | 700 | Título hero pantalla |
| `title` | Fraunces | 24 | 30 | 600 | Título de producto en detalle |
| `subtitle` | Inter | 18 | 24 | 600 | Título de sección |
| `body` | Inter | 15 | 22 | 400 | Descripción, texto corrido |
| `bodyStrong` | Inter | 15 | 22 | 500 | Body enfatizado |
| `caption` | Inter | 12 | 16 | 400 | Meta, labels, placeholders |
| `button` | Inter | 15 | 20 | 600 | CTAs |
| `chip` | Inter | 13 | 16 | 500 | Texto de chip/pill |

---

## 6. Componentes

### 6.1 Top bar
- **Propósito**: identidad + acción lateral (perfil, notificaciones).
- **Anatomía**: saludo izquierda + avatar/icono derecha, transparente sobre `background`.
- **Padding**: `xl` horizontal, `lg` vertical.
- **Radio**: — (no tiene contenedor).
- **Colores**: texto `textPrimary`, icono `icon`.
- **Estados**: default / con badge de notificación.
- **Notas**: sin borde inferior, la separación la hace el whitespace.

### 6.2 Search bar
- **Propósito**: buscar producto/categoría.
- **Anatomía**: icono lupa + input + (opcional) icono filtro.
- **Padding**: `lg` horizontal, `md` vertical.
- **Radio**: `pill` (999).
- **Colores**: fondo `surface`, borde `borderSubtle`, texto `textPrimary`, placeholder `textMuted`.
- **Estados**: default / focus (borde `accentPrimary`) / con texto.
- **Notas**: altura 48. Sin sombra.

### 6.3 Hero banner
- **Propósito**: mensaje principal + CTA promocional.
- **Anatomía**: bloque terracota con patrón curva, título serif grande, subtítulo corto, CTA pill claro.
- **Padding**: `xxl` (24).
- **Radio**: `xl` (28).
- **Colores**: fondo `heroBackground`, patrón `heroPattern`, texto `#FFFFFF`, CTA `surface` sobre terracota con texto `textPrimary`.
- **Estados**: default.
- **Altura**: 180.
- **Notas**: las curvas son SVG generado, no imagen fotográfica. Ver sección 9 para prompt de generación.

### 6.4 Category card
- **Propósito**: navegación a subcatálogo.
- **Anatomía**: cuadrado con icono centrado arriba + label debajo.
- **Tamaño**: 104 × 104 (variable con grid 3-4 columnas).
- **Padding**: `lg`.
- **Radio**: `lg` (20).
- **Colores**: fondo `surface`, icono `icon`, label `textPrimary`, borde `borderSubtle` 1px.
- **Estados**: default / selected (fondo `categorySelected`, icono + texto blanco).
- **Notas**: el item "destacado" usa el estado selected como default permanente.

### 6.5 Selected category pill
- **Propósito**: filtro horizontal de subcategoría.
- **Anatomía**: pill con texto.
- **Padding**: `lg` horizontal, `sm` vertical.
- **Altura**: 36.
- **Radio**: `pill`.
- **Colores**: inactivo → fondo `surface`, borde `border`, texto `textSecondary`. Activo → fondo `textPrimary`, texto `#FFFFFF`, sin borde.
- **Estados**: default / active.

### 6.6 Product card
- **Propósito**: item de catálogo.
- **Anatomía**: imagen cuadrada (ratio 1:1) + nombre + precio + (opcional) icono favorito.
- **Padding**: `md`.
- **Radio**: `lg`.
- **Colores**: fondo `surface`, texto `textPrimary`, precio `textPrimary` con weight 600.
- **Estados**: default / pressed (escala 0.98) / favorito activo (corazón terracota).
- **Notas**: sin sombra. Separación por gap.

### 6.7 Product gallery / image container
- **Propósito**: imagen principal en detalle producto.
- **Anatomía**: cuadrado grande con imagen centrada.
- **Radio**: `xl`.
- **Colores**: fondo `surfaceSecondary` (para que el producto "flote").
- **Ratio**: 1:1, ocupa ~70% del ancho de pantalla.
- **Notas**: producto centrado, sin sombra del objeto.

### 6.8 Attribute chip
- **Propósito**: mostrar atributo del producto (acabado, medidas, material).
- **Anatomía**: pill con label corto + (opcional) valor.
- **Padding**: 14 horizontal, 8 vertical.
- **Altura**: 36.
- **Radio**: `pill`.
- **Colores**: fondo `surface`, borde `border` 1px, texto `textPrimary`.
- **Estados**: default / selected (fondo `textPrimary`, texto blanco).

### 6.9 Primary CTA button
- **Propósito**: acción principal (añadir al carrito, solicitar presupuesto).
- **Anatomía**: pill ancho con label + (opcional) icono derecho.
- **Altura**: 56 (versión hero) o 48.
- **Padding**: `xxl` horizontal.
- **Radio**: `pill`.
- **Colores**: fondo `cta` (`#0D0C0C`), texto `#FFFFFF`.
- **Estados**: default / pressed (`ctaPressed`) / disabled (`ctaDisabled`).

### 6.10 Secondary button
- **Propósito**: acción secundaria (guardar, compartir).
- **Anatomía**: pill con borde.
- **Altura**: 48.
- **Radio**: `pill`.
- **Colores**: fondo `surface`, borde `textPrimary` 1.5px, texto `textPrimary`.
- **Estados**: default / pressed (fondo `surfaceSecondary`).

### 6.11 Bottom navigation
- **Propósito**: navegación raíz de la app.
- **Anatomía**: 4-5 iconos sobre fondo `surface`, item activo con indicador.
- **Altura**: 72.
- **Colores**: fondo `surface`, borde superior `borderSubtle`, icono inactivo `iconMuted`, activo `textPrimary` con pill/punto terracota.
- **Notas**: inferido, no aparece explícito en el shot.

### 6.12 Section header
- **Propósito**: encabezar sección ("Categorías", "Popular", "Nuevo").
- **Anatomía**: título a la izquierda + "Ver todo" a la derecha.
- **Colores**: título `textPrimary` subtitle, link `textSecondary` caption.
- **Notas**: sin separador, solo whitespace.

### 6.13 Info row
- **Propósito**: fila de dato en detalle producto/perfil.
- **Anatomía**: label izquierda + valor derecha.
- **Padding**: `md` vertical.
- **Colores**: label `textSecondary`, valor `textPrimary`.
- **Divisor**: `borderSubtle` 1px inferior.

### 6.14 Quantity / action bar
- **Propósito**: selector de cantidad o acción rápida en detalle.
- **Anatomía**: `-` | número | `+` dentro de una pill.
- **Altura**: 48.
- **Radio**: `pill`.
- **Colores**: fondo `surfaceSecondary`, números `textPrimary`, botones `textPrimary`.

---

## 7. Pantallas

### 7.1 Home
- **Objetivo**: presentar la marca, buscar, navegar por categorías, ver destacados.
- **Layout en bloques**:
  1. Top bar (saludo + perfil)
  2. Search bar pill
  3. Hero banner terracota
  4. Section header "Categorías"
  5. Grid de 4 category cards (1 destacada)
  6. Section header "Popular"
  7. Scroll horizontal de product cards
  8. Bottom navigation
- **Componentes**: TopBar, SearchBar, HeroBanner, CategoryCard (×4), ProductCard (×N), SectionHeader, BottomNav.
- **Jerarquía visual**: hero > categorías > productos.
- **Comportamiento**: hero estático, category tap → Categories, product tap → Product Detail.
- **Mantiene del shot**: todo excepto bottom nav.
- **Inferido**: bottom nav, scroll horizontal de popular.

### 7.2 Categories
- **Objetivo**: explorar una categoría a fondo.
- **Layout**:
  1. Top bar con back + título categoría
  2. Scroll horizontal de selected category pills (subcategorías)
  3. Grid 2 columnas de product cards
  4. Bottom nav
- **Componentes**: TopBar, SelectedCategoryPill, ProductCard, BottomNav.
- **Jerarquía**: filtros > grid.
- **Inferido**: pantalla completa no visible en el shot.

### 7.3 Product Detail
- **Objetivo**: ver producto y lanzar la acción principal.
- **Layout**:
  1. Top bar con back + favorito
  2. Product gallery (imagen 1:1)
  3. Título serif grande + precio
  4. Scroll horizontal de attribute chips (material, medidas, acabado)
  5. Descripción (body)
  6. Info rows (tiempo de entrega, artesano)
  7. Quantity/action bar (opcional)
  8. Primary CTA ancho ("Añadir al carrito" o "Solicitar presupuesto")
- **Componentes**: TopBar, ProductGallery, AttributeChip, InfoRow, QuantityBar, PrimaryCTA.
- **Jerarquía**: imagen > título > CTA.
- **Mantiene del shot**: todo.
- **Inferido**: info rows concretas.

### 7.4 Search
- **Objetivo**: búsqueda con resultados en vivo.
- **Layout**:
  1. Search bar focus + botón "Cancelar" a la derecha
  2. Sección "Recientes" (chips)
  3. Sección "Sugerido" (product cards mini)
- **Inferido**: pantalla no aparece en el shot.

### 7.5 Favorites
- **Objetivo**: lista de guardados.
- **Layout**:
  1. Top bar con título "Favoritos"
  2. Grid 2 columnas de product cards
  3. Vacío → ilustración suave + CTA secundario "Explorar catálogo"
- **Inferido**.

### 7.6 Request Quote (elegido sobre Cart)
> Encaja mejor con el estilo Woodzy — carpintería a medida y mobiliario artesanal — que un carrito de e-commerce.
- **Objetivo**: solicitar presupuesto de pieza a medida.
- **Layout**:
  1. Top bar "Solicitar presupuesto"
  2. Resumen de producto elegido (imagen mini + título + chips atributos)
  3. Info rows editables (medidas exactas, acabado, plazo deseado)
  4. Campo de texto libre para notas
  5. Primary CTA "Enviar solicitud"
- **Inferido**: formulario y flujo completos.

### 7.7 Profile básico
- **Objetivo**: datos del usuario + acceso a pedidos/ajustes.
- **Layout**:
  1. Avatar + nombre + email
  2. Grid 2×2 de acciones (Pedidos, Favoritos, Direcciones, Ajustes)
  3. Info rows secundarios (Ayuda, Términos, Cerrar sesión)
- **Inferido**.

---

## 8. Blueprint de implementación

- **Grid**: 4 columnas en categorías, 2 en product grid, 1 en detalle.
- **Márgenes laterales**: `xl` = 20px en todas las pantallas.
- **Separación vertical entre secciones**: `xxxl` = 32px.
- **Altura del hero**: 180px.
- **Tamaño de category card**: 104 × 104 (o `(screenWidth - padding * 2 - gaps) / 4` para fluidez).
- **Tamaño de product card (grid)**: `(screenWidth - padding * 2 - gap) / 2`, imagen 1:1.
- **Product gallery (detalle)**: 70% del ancho, ratio 1:1, fondo `surfaceSecondary`.
- **Proporciones imagen/texto en detalle**: 60/40 vertical.
- **Responsive**:
  - < 360px → grid categorías a 3 columnas, padding lateral a 16px.
  - > 420px → grid categorías a 4, product grid a 2, el resto igual.
  - Tablets: no es el caso de uso principal. Si aplica, limitar `maxWidth: 560` y centrar.
- **Dark mode**: **NO recomendado**. La identidad Woodzy depende de la calidez del fondo claro y del blanco de las superficies. Un dark mode rompería el ADN. Si se necesita por accesibilidad, hacer solo un "dim mode" con fondo `#1A1817`, superficies `#262321`, acento intacto, texto `#EAE8E8`.
- **Accesibilidad**:
  - Contraste `textPrimary` sobre `background` ≈ 17:1 ✅
  - Contraste `textSecondary` sobre `background` ≈ 6.3:1 ✅
  - CTA `#FFFFFF` sobre `cta` ≈ 19:1 ✅
  - ¡Cuidado con `textMuted` (`#9B8377`) sobre `background`! ≈ 3.3:1 — usar solo en caption grande o placeholders.

---

## 9. Prompts derivados

### 9.1 Prompt para Figma AI
> Create a mobile UI system called "Woodzy" for a custom carpentry and handmade furniture app. Style: modern rustic, warm, premium, minimalist. Palette: background #EAE8E8, surfaces #FFFFFF, text #0D0C0C, secondary text #5B5B5C, warm accent #AB130A for hero banner, very dark marsala #5D1810 for hero pattern, cool contrasting category #1F3A3F. Typography: Fraunces serif for titles, Inter sans for UI. Radius: 20 cards, 28 hero, 999 pills. Screens: Home (top bar + pill search + terracotta hero with organic curves + 4 category cards where 1 is highlighted in dark teal + horizontal scroll of product cards + bottom nav), Product Detail (back + favorite top bar, square image on light surface, serif title, horizontal attribute chips, info rows, black pill CTA). No wood photographic textures. No hard shadows. Lots of whitespace.

### 9.2 Prompt para Claude
> Actúa como UI engineer. Usando los tokens del archivo `src/theme/woodzy.ts` de este repo, genera la pantalla [X] en React Native + TypeScript + Expo respetando estrictamente: fondo `woodzy.colors.background`, superficies `woodzy.colors.surface`, CTA `woodzy.colors.cta`, tipografía `woodzy.type.*`, radios `woodzy.radius.*`. Componentes mínimos: [lista]. No uses texturas fotográficas de madera. No uses sombras duras. Mantén `layout.screenPaddingH` en márgenes laterales y `layout.sectionGap` entre secciones. Usa `Pressable` para tactilidad y `accessibilityRole` donde aplique. Devuelve un único archivo `src/screens/[Nombre]Screen.tsx` listo para pegar.

### 9.3 Prompt para React Native + NativeWind
> Build a `HomeScreen.tsx` in React Native with NativeWind. Extend tailwind.config.js with these colors: `woodzy-bg: '#EAE8E8'`, `woodzy-surface: '#FFFFFF'`, `woodzy-text: '#0D0C0C'`, `woodzy-muted: '#5B5B5C'`, `woodzy-accent: '#AB130A'`, `woodzy-accent-dark: '#5D1810'`, `woodzy-cool: '#1F3A3F'`. Use `rounded-[28px]` for hero, `rounded-[20px]` for cards, `rounded-full` for pills and buttons. Font families: serif (Fraunces) for titles via `font-serif` and sans (Inter) for UI via `font-sans`. Layout: SafeAreaView → ScrollView with `px-5 pt-4 pb-20` → TopBar → SearchBar (pill, `h-12 bg-white border border-[#E6DFDB]`) → Hero (`h-[180px] bg-[#AB130A] rounded-[28px] p-6`) with SVG curves using react-native-svg → Section "Categorías" → Grid of 4 category cards (3 white + 1 dark teal) → Section "Popular" → Horizontal FlatList of product cards. No shadows except `shadow-sm` on product cards when pressed.

### 9.4 Prompt para modelo visual / mockup UI
> Premium mobile app concept shot for a handmade carpentry and custom furniture app. Two iPhone mockups on a warm light gray background (#EAE8E8) with subtle dot texture. Left mockup: home screen with a pill search bar, a terracotta red hero banner (#AB130A) with organic curved line pattern (not a wood photo), a grid of four category cards where one is highlighted in dark teal, and a horizontal scroll of product cards. Right mockup: product detail screen with a centered wooden object on a white surface, serif title, horizontal pill chips for attributes, and a black pill CTA. Style: modern rustic, minimalist, premium, warm, artisanal, clean. Muted palette. No wood grain backgrounds. No hard shadows. Editorial magazine feel. Dribbble-quality, Zahra Mortazavi aesthetic.

---

## 10. Resumen ejecutivo final

### A. Resumen ejecutivo del theme
Woodzy es un sistema **modern rustic** para apps de carpintería a medida, mobiliario artesanal y pedido de piezas. Su identidad nace del contraste entre un fondo gris cálido claro, superficies blancas, un acento terracota quemado reservado a momentos clave, y la tensión entre una serif con personalidad (titulares) y una sans UI limpia (interfaz). Los errores fatales serían: fondos oscuros, sombras duras, texturas fotográficas de madera, CTAs no negros.

### B. Lo que sabemos seguro
- Paleta oficial de 8 colores.
- Existencia de home + product detail con hero terracota, search pill, grid de categorías con una destacada, chips de atributos, CTA oscuro.
- Tono "modern and rustic", carpintería premium.

### C. Lo que estamos infiriendo
- Tipografía exacta (propuesta: Fraunces + Inter).
- Valores numéricos (radios, spacing, alturas).
- Pantallas que no aparecen en el shot (Categories, Search, Favorites, Request Quote, Profile).
- Bottom navigation.
- Color exacto de la "categoría destacada" (estimado `#1F3A3F`).

### D. Nivel de fidelidad alcanzable
- **Home + Product Detail**: ~90% de fidelidad visual partiendo del shot.
- **Resto de pantallas**: fidelidad conceptual, no literal — pero consistentes con el ADN.
- **Tipografía**: 80% si se usa Fraunces + Inter; 100% solo con la fuente original (no identificada).

### E. Qué haría primero para clonarlo rápido
1. Instalar `expo-font` + `@expo-google-fonts/fraunces` + `@expo-google-fonts/inter`.
2. Importar `src/theme/woodzy.ts` (ya creado junto a este documento).
3. Reconstruir `HomeScreen` siguiendo el layout del punto 7.1.
4. Reconstruir `ProductDetailScreen` siguiendo 7.3.
5. Pintar el hero con `react-native-svg` para las curvas orgánicas en lugar de una imagen.

### F. Qué haría para convertirlo en producto real
1. **Pantallas faltantes**: Categories, Search, Favorites, Request Quote, Profile — usando los tokens y componentes del sistema.
2. **Componentes reales**: crear `src/components/woodzy/*` con cada componente de la sección 6 (TopBar, SearchBar, HeroBanner, CategoryCard, ProductCard, AttributeChip, PrimaryCTA, SecondaryButton, BottomNav, SectionHeader, InfoRow, QuantityBar).
3. **Navegación**: stack + bottom tabs con el BottomNav del sistema.
4. **Datos**: conectar a un catálogo real (en este repo ya existe `fetchWoodCatalog()` y `fetchToolCatalog()`, se pueden reutilizar si el producto pivota a carpintería).
5. **Accesibilidad**: revisar contrastes, añadir `accessibilityRole` y `accessibilityLabel` en todos los botones y chips.
6. **Performance**: imágenes producto con `expo-image` + placeholder `surfaceSecondary`, `FlatList` con `getItemLayout` para grids.
7. **Theming**: exponer `WoodzyThemeProvider` que inyecte tokens vía Context para permitir swap con el theme actual de DIY sin tocar componentes.
8. **Decidir estratégicamente** si Woodzy reemplaza al theme actual o convive como skin opcional — **no es una decisión de diseño, es de producto**.
