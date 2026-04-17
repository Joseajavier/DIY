# Guía de integración Amazon Afiliados España + PA-API 5.0 en DIY

Esta guía recoge, paso a paso, todo lo necesario para integrar el programa de **Amazon Afiliados España** y la **Product Advertising API 5.0 (PA-API 5.0)** en la app móvil DIY (React Native). Está pensada para seguirse en orden, sin necesidad de consultar nada más.

Convenciones:
- `diyapp-21` es un ejemplo de Tracking ID. Sustituye por el tuyo cuando lo obtengas.
- `{ASIN}` es el identificador único del producto en Amazon (10 caracteres, ej. `B08N5WRWNW`).
- Los bloques marcados como `// TODO` deben adaptarse con valores reales.

---

## Indice

1. Registro en Amazon Afiliados España
2. Fase 1 — SiteStripe / enlaces manuales con tracking tag
3. Requisito de las 3 ventas en 180 dias
4. Fase 2 — PA-API 5.0
5. Arquitectura: proxy serverless vs cliente directo
6. Integracion en codigo
7. Terminos legales y disclaimers
8. Troubleshooting

---

## 1. Registro en Amazon Afiliados España

Portal oficial: **https://afiliados.amazon.es**

### 1.1. Crear cuenta

Usa la **misma cuenta de Amazon personal** (o una cuenta de empresa si la tienes). No hace falta crear una cuenta nueva; Afiliados se asocia a una cuenta Amazon ya existente.

### 1.2. Información del sitio web / app

Durante el alta te pedirá una lista de webs/apps. Amazon **exige al menos una URL pública** donde vaya a aparecer el contenido afiliado. Como la app aún no está publicada, la solución recomendada es:

- **URL principal**: el repositorio público de GitHub de la app.
  - Ejemplo: `https://github.com/<tu-usuario>/diy-app`
- **URL secundaria (opcional)**: una landing page simple (GitHub Pages, Vercel, Netlify) explicando qué es DIY.
- Marca la opción **"Mobile App"** si el formulario lo permite y añade los stores previstos (Google Play, App Store) aunque aún no estén publicadas.

> Importante: el `README.md` del repo debe describir claramente qué hace la app y mencionar que usará enlaces afiliados de Amazon. Amazon revisa el destino antes de aprobar.

### 1.3. Elegir el Tracking ID

El Tracking ID es el identificador que va en cada enlace para atribuir las ventas a tu cuenta. Convenciones:

- Para España siempre termina en **`-21`**.
- Debe ser único, memorable y relacionado con el proyecto.
- Ejemplos válidos: `diyapp-21`, `diybricolaje-21`, `diyhome-21`.

Puedes crear **hasta 100 Tracking IDs adicionales** desde el panel (útil para medir campañas: `diyapp-android-21`, `diyapp-ios-21`, `diyapp-web-21`).

### 1.4. Perfil y categorías

Selecciona estas categorías principales en el formulario de alta:

| Categoría Amazon | Motivo |
|---|---|
| Bricolaje y herramientas | Producto principal de la app |
| Hogar | Accesorios, organización, limpieza |
| Jardín | Herramientas de exterior, macetas, riego |
| Iluminación | Bombillas, focos, tiras LED |
| Cocina | Pequeños electrodomésticos, utensilios |

### 1.5. Descripción de la app y del público (copia y pega)

**Nombre del sitio/app**: `DIY — Asistente de bricolaje y reparaciones del hogar`

**Descripción (copia literal, español)**:
```
DIY es una aplicación móvil para Android e iOS que guía a usuarios
particulares en reparaciones, mantenimiento y proyectos de bricolaje
en casa. La app ofrece tutoriales paso a paso, listas de herramientas
y materiales necesarios para cada proyecto, y recomendaciones de
productos. Cuando el usuario necesita comprar una herramienta o un
material, la app le muestra enlaces a Amazon.es con el precio
actualizado para facilitar la compra.
```

**Descripción (inglés, por si el formulario lo exige)**:
```
DIY is a mobile application for Android and iOS that helps home users
with repairs, maintenance and do-it-yourself projects. The app provides
step-by-step tutorials, tool and material lists for each project, and
product recommendations. When the user needs to buy a tool or material,
the app shows Amazon.es links with up-to-date prices.
```

**Público objetivo (copia literal)**:
```
Usuarios particulares de entre 25 y 60 años en España, propietarios o
inquilinos de vivienda, que quieren realizar reparaciones y mejoras en
el hogar por su cuenta en lugar de contratar a un profesional. Perfil
mixto hombre/mujer, con interés en bricolaje, jardinería, hogar y
ahorro doméstico.
```

**¿Cómo generas tráfico?** (respuesta tipo):
```
Trafico organico a traves de la propia aplicacion movil (usuarios que
descargan DIY desde Google Play y App Store). No utilizamos compra de
trafico, ni redes incentivadas, ni cookie stuffing. Los enlaces a
Amazon se muestran unicamente en contexto, cuando el tutorial o
proyecto requiere un producto concreto.
```

**¿Cómo monetizas?**:
```
Comisiones del programa de Amazon Afiliados. Actualmente no hay
publicidad de terceros ni compras dentro de la app.
```

### 1.6. Datos fiscales y de pago

- Rellena el formulario fiscal con tu NIF/CIF español.
- Método de pago: transferencia bancaria (España) a partir de **25 €** acumulados, o cheque a partir de 50 €. Elige **transferencia**.
- Umbral mínimo: 25 € antes de cobrar.

---

## 2. Fase 1 — SiteStripe / enlaces manuales con tracking tag

Esta fase funciona el **día 1**, sin esperar a la PA-API. Solo necesitas el Tracking ID aprobado.

### 2.1. Formatos de URL válidos

| Caso de uso | Formato |
|---|---|
| Búsqueda por palabra clave | `https://www.amazon.es/s?k={QUERY}&tag={TAG}` |
| Producto concreto por ASIN | `https://www.amazon.es/dp/{ASIN}?tag={TAG}` |
| Producto con parámetros limpios | `https://www.amazon.es/dp/{ASIN}/?tag={TAG}&linkCode=ll1` |
| Lista de deseos compartida | `https://www.amazon.es/hz/wishlist/ls/{ID}?tag={TAG}` |

Ejemplos reales:

```
https://www.amazon.es/s?k=taladro+percutor&tag=diyapp-21
https://www.amazon.es/dp/B08N5WRWNW?tag=diyapp-21
```

> El parámetro `tag` debe ir **siempre** en la URL final. Si redirige (por ejemplo tras un login), el tag puede perderse; en ese caso usa `linkCode=ll1` para que Amazon lo preserve.

### 2.2. SiteStripe

SiteStripe es la barra que aparece en la parte superior de amazon.es cuando estás logado como afiliado. Permite generar el enlace con tu tag con un clic:

1. Entra en `amazon.es` con tu cuenta de Afiliados logada.
2. Navega al producto.
3. En la barra superior "SiteStripe" pulsa **"Texto"**, **"Imagen"** o **"Texto e imagen"**.
4. Copia el enlace corto (`https://amzn.to/...`) o el largo (`https://www.amazon.es/dp/...?tag=diyapp-21`).

### 2.3. Añadir el tag en `src/data/retailers.ts`

Abre `src/data/retailers.ts` y localiza la entrada de Amazon. Añade o actualiza el `urlTemplate`:

```ts
// src/data/retailers.ts
export const RETAILERS = {
  amazon: {
    id: 'amazon',
    name: 'Amazon',
    country: 'ES',
    affiliateTag: 'diyapp-21', // TODO: reemplazar cuando Amazon apruebe
    urlTemplate: 'https://www.amazon.es/s?k={QUERY}&tag={TAG}',
    productUrlTemplate: 'https://www.amazon.es/dp/{ASIN}?tag={TAG}&linkCode=ll1',
  },
} as const;
```

Helper recomendado:

```ts
// src/utils/amazonLink.ts
import { RETAILERS } from '../data/retailers';

const TAG = RETAILERS.amazon.affiliateTag;

export function amazonSearchUrl(query: string): string {
  const q = encodeURIComponent(query.trim());
  return `https://www.amazon.es/s?k=${q}&tag=${TAG}`;
}

export function amazonProductUrl(asin: string): string {
  return `https://www.amazon.es/dp/${asin}?tag=${TAG}&linkCode=ll1`;
}
```

### 2.4. Verificar que el tag llega

Abre el enlace desde un dispositivo **distinto** al que usaste para crear la cuenta, en **modo incógnito**, y comprueba que:

1. La URL final todavía contiene `tag=diyapp-21` después de cualquier redirección.
2. En el panel de Amazon Afiliados (`Informes > Informe de actividad`) aparecen clics en las horas siguientes.

---

## 3. Requisito de las 3 ventas en 180 dias

Amazon concede el acceso provisional al programa durante **180 dias** desde la aprobacion inicial. En ese periodo hay que:

### 3.1. La regla

> **Conseguir 3 ventas cualificadas** (3 productos comprados por 3 usuarios distintos, o varios productos en una sola transaccion valida) **antes de que pasen 180 dias**.

Si no se cumple:
- La cuenta queda **cerrada automaticamente**.
- Se pueden volver a solicitar, pero hay que empezar el proceso de nuevo.
- Las comisiones ganadas hasta la fecha **no se pierden** si superan el umbral de pago (25 €); si no, se pierden.

### 3.2. Qué cuenta como venta cualificada

- Compra realizada **tras hacer clic en un enlace con tu tag**.
- Dentro de las **24 horas** siguientes al clic (ventana de cookie Amazon ES).
- El comprador finaliza la compra dentro de esas 24h.
- El producto se **envía** (las cancelaciones y devoluciones descuentan).
- Compras hechas por **ti mismo** o por familiares cercanos **NO cuentan** (y pueden acarrear cierre de la cuenta).

### 3.3. Estrategias rápidas para conseguir las 3 ventas

| Estrategia | Coste | Efecto esperado |
|---|---|---|
| Compartir repo + landing en Reddit (r/DIYesp, r/spain) | 0 € | Alto si el post es util |
| Compartir tutoriales con enlace afiliado en Twitter/X y LinkedIn | 0 € | Medio |
| Publicar guias en dev.to / Medium con ejemplos de herramientas | 0 € | Medio |
| Enviar la app en beta (TestFlight, Internal Testing) a 20-30 conocidos | 0 € | Alto |
| Video corto en YouTube Shorts / TikTok mostrando un proyecto | 0 € | Alto si el video pega |
| Publicar en foros (forocoches bricolaje, bricoman.es, comunidad Leroy Merlin) | 0 € | Medio |

> Truco: una sola transaccion con 3 articulos distintos del mismo usuario cuenta como 3 ventas a efectos de este requisito.

### 3.4. Qué hacer si se vence el plazo

1. Esperar el email de cierre automático.
2. Solicitar reingreso desde `afiliados.amazon.es` (permitido pasados unos días).
3. Documentar mejor el tráfico en la nueva solicitud.

---

## 4. Fase 2 — PA-API 5.0

Esta fase **sólo se habilita después de las 3 ventas cualificadas**. Antes, cualquier llamada devolverá `403 Forbidden`.

### 4.1. Dónde se solicita el acceso

Portal oficial: **https://webservices.amazon.es**

1. Logarte con la cuenta de Afiliados.
2. Menú `Tools > Product Advertising API`.
3. Pulsar **"Join Product Advertising API"** o **"Add credentials"**.
4. Aceptar los términos de la **PA-API 5.0 License Agreement**.
5. Generar el par **Access Key / Secret Key**.

### 4.2. Credenciales necesarias

| Variable | Descripción | Ejemplo |
|---|---|---|
| `AMAZON_ACCESS_KEY` | Access Key ID | `AKIAIOSFODNN7EXAMPLE` |
| `AMAZON_SECRET_KEY` | Secret Access Key (nunca al cliente) | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AMAZON_PARTNER_TAG` | Tu Tracking ID | `diyapp-21` |
| `AMAZON_PARTNER_TYPE` | Siempre `Associates` | `Associates` |
| `AMAZON_HOST` | Host regional | `webservices.amazon.es` |
| `AMAZON_REGION` | Región AWS | `eu-west-1` |

### 4.3. Endpoints útiles de PA-API 5.0

| Operation | Uso en DIY |
|---|---|
| `SearchItems` | Busqueda por palabra clave (ej. "taladro percutor 18V") |
| `GetItems` | Traer detalles de hasta 10 ASIN conocidos |
| `GetVariations` | Obtener variantes (tamano, color, potencia) de un producto padre |
| `GetBrowseNodes` | Listar categorias (bricolaje, jardin, etc.) |

Campos típicos a pedir (`Resources`):

```
ItemInfo.Title
ItemInfo.Features
Images.Primary.Large
Offers.Listings.Price
Offers.Listings.Availability.Message
Offers.Listings.MerchantInfo.Name
ItemInfo.ProductInfo
BrowseNodeInfo.BrowseNodes
```

### 4.4. Cómo guardar las credenciales

**NUNCA** guardes el `AMAZON_SECRET_KEY` en:
- El repositorio de GitHub (ni siquiera en un `.env.example`).
- El bundle de la app (cualquier JS del cliente es extraíble con `apktool` o similar).
- Configuración de Expo pública (`app.config.ts` que se suba a git).

**Opciones correctas**:

1. **Recomendada**: proxy serverless (ver sección 5). El secret vive en el servidor; la app sólo conoce la URL del proxy.
2. **Alternativa** (no recomendada): `.env` local + `react-native-config` o `expo-secure-store`, con el fichero `.env` en `.gitignore`. Sólo aceptable si la llamada la hace un backend propio, no el cliente.

Ejemplo de `.env` **local** del backend (nunca en el repo del cliente):

```env
# backend/.env
AMAZON_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
AMAZON_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AMAZON_PARTNER_TAG=diyapp-21
AMAZON_PARTNER_TYPE=Associates
AMAZON_HOST=webservices.amazon.es
AMAZON_REGION=eu-west-1
```

Añade al `.gitignore`:

```gitignore
# PA-API secrets
.env
.env.local
backend/.env
```

### 4.5. Rate limits

PA-API 5.0 aplica dos límites **simultáneos**:

| Limite | Valor inicial | Sube con |
|---|---|---|
| Requests por segundo | **1 req/s** | Ingresos generados en los ultimos 30 dias |
| Requests por dia | **8 640 req/dia** | Ingresos generados en los ultimos 30 dias |

Reglas:
- **Empieza bajo**: cachea agresivamente (sección 6.3), no hagas más de 1 llamada/seg desde el proxy.
- Sin ingresos en 30 dias, **el acceso se suspende** hasta que vuelva a haber ventas.
- Los limites escalan automaticamente cuando subes las ventas: a mas comision, mas llamadas por segundo.

### 4.6. AWS Signature V4

Todas las llamadas a PA-API 5.0 deben ir **firmadas con AWS Signature Version 4**. Esto implica:

1. Calcular un canonical request (método + path + headers + hash del body).
2. Construir la string-to-sign con fecha + región + servicio.
3. Derivar la clave de firma con HMAC-SHA256 a partir del `SECRET_KEY`.
4. Añadir el header `Authorization` con el algoritmo `AWS4-HMAC-SHA256`.

Opciones de implementación:

| Opción | Pros | Contras |
|---|---|---|
| Librería `aws4-react-native` en el cliente | Rápido de integrar | **Expone el secret en el bundle**: INACEPTABLE |
| Librería `aws4` (Node) en backend propio o proxy serverless | Secret a salvo en el servidor | Necesita un backend (puede ser Cloudflare Worker gratis) |
| Implementación manual del algoritmo SigV4 | Sin dependencias | Error-prone, no merece la pena |

**Conclusión**: usa siempre `aws4` en un backend (Node o Worker). Ver sección 5.

---

## 5. Arquitectura: proxy serverless vs cliente directo

### 5.1. Comparativa

| Aspecto | Cliente directo (app llama a PA-API) | Proxy serverless |
|---|---|---|
| Coste | 0 € | 0 € (Cloudflare Worker free tier: 100k req/dia) |
| Seguridad del secret | **Expuesto** en el bundle | **A salvo** en variables de entorno del Worker |
| Cache compartida entre usuarios | No | Si (Workers KV / Cache API) |
| Control de rate limit | Cada cliente cuenta por separado, se superan los 8640/dia con pocos usuarios | Centralizado, respeta el limite globalmente |
| Firma SigV4 | Hay que embarcar la libreria en el bundle | Una sola implementacion en el Worker |
| Cambiar el secret | Requiere publicar nueva version de la app | Cambio instantaneo en variables del Worker |

### 5.2. Recomendación

> **Proxy serverless siempre** para aplicaciones móviles. En DIY usa **Cloudflare Workers** (gratis, 100 000 req/dia, latencia <50 ms desde Espana).

### 5.3. Esquema

```
App DIY  --HTTPS-->  Cloudflare Worker  --SigV4-->  webservices.amazon.es
(RN)                 (proxy + cache)                  (PA-API 5.0)
sin secret           secret en env                    respuesta JSON
```

### 5.4. Esqueleto del Worker (TypeScript)

```ts
// worker/src/index.ts
import aws4 from 'aws4';

export interface Env {
  AMAZON_ACCESS_KEY: string;
  AMAZON_SECRET_KEY: string;
  AMAZON_PARTNER_TAG: string;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const keywords = url.searchParams.get('q') ?? '';
    if (!keywords) return new Response('missing q', { status: 400 });

    // 1. Cache por keyword (1h)
    const cacheKey = new Request(url.toString(), req);
    const cache = caches.default;
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    // 2. Payload PA-API
    const body = JSON.stringify({
      Keywords: keywords,
      SearchIndex: 'Tools',
      ItemCount: 5,
      PartnerTag: env.AMAZON_PARTNER_TAG,
      PartnerType: 'Associates',
      Marketplace: 'www.amazon.es',
      Resources: [
        'Images.Primary.Medium',
        'ItemInfo.Title',
        'Offers.Listings.Price',
      ],
    });

    // 3. Firmar con SigV4
    const opts: any = {
      host: 'webservices.amazon.es',
      path: '/paapi5/searchitems',
      service: 'ProductAdvertisingAPI',
      region: 'eu-west-1',
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        'content-encoding': 'amz-1.0',
        'x-amz-target':
          'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems',
      },
      body,
    };
    aws4.sign(opts, {
      accessKeyId: env.AMAZON_ACCESS_KEY,
      secretAccessKey: env.AMAZON_SECRET_KEY,
    });

    // 4. Llamar a PA-API
    const apiRes = await fetch(`https://${opts.host}${opts.path}`, {
      method: 'POST',
      headers: opts.headers,
      body,
    });

    const resBody = await apiRes.text();
    const response = new Response(resBody, {
      status: apiRes.status,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=3600',
      },
    });

    await cache.put(cacheKey, response.clone());
    return response;
  },
};
```

Config del Worker:

```toml
# worker/wrangler.toml
name = "diy-amazon-proxy"
main = "src/index.ts"
compatibility_date = "2026-04-01"
```

Deploy:

```bash
npm install -g wrangler
cd worker
npm install aws4
wrangler login
wrangler secret put AMAZON_ACCESS_KEY
wrangler secret put AMAZON_SECRET_KEY
wrangler secret put AMAZON_PARTNER_TAG
wrangler deploy
```

---

## 6. Integracion en codigo

### 6.1. Archivo scaffold: `src/services/amazonPriceService.ts`

```ts
// src/services/amazonPriceService.ts
/**
 * Servicio de precios de Amazon para DIY.
 *
 * Fase 1 (sin PA-API): solo genera URLs de busqueda/producto con tag.
 * Fase 2 (con PA-API): llama al proxy Cloudflare Worker que firma con SigV4.
 *
 * Activacion:
 *   1. Conseguir las 3 ventas cualificadas.
 *   2. Solicitar credenciales en webservices.amazon.es.
 *   3. Desplegar el Worker (ver AMAZON_SETUP.md seccion 5.4).
 *   4. Poner la URL del Worker en PROXY_URL.
 *   5. Cambiar USE_PAAPI a true.
 */
import { RETAILERS } from '../data/retailers';

const USE_PAAPI = false; // TODO: poner a true cuando el Worker este desplegado
const PROXY_URL = 'https://diy-amazon-proxy.<tu-subdominio>.workers.dev';
const TAG = RETAILERS.amazon.affiliateTag;

export type AmazonItem = {
  asin: string;
  title: string;
  imageUrl?: string;
  priceEur?: number;
  priceDisplay?: string;
  affiliateUrl: string;
};

/** Fase 1: URL de busqueda con tag. Funciona siempre. */
export function amazonSearchUrl(query: string): string {
  const q = encodeURIComponent(query.trim());
  return `https://www.amazon.es/s?k=${q}&tag=${TAG}`;
}

/** Fase 1: URL directa a producto con tag. */
export function amazonProductUrl(asin: string): string {
  return `https://www.amazon.es/dp/${asin}?tag=${TAG}&linkCode=ll1`;
}

/**
 * Fase 2: busqueda real via PA-API 5.0 (a traves del proxy).
 * Si USE_PAAPI esta desactivado o falla, cae al enlace de busqueda.
 */
export async function searchAmazon(
  query: string,
  opts: { signal?: AbortSignal } = {},
): Promise<AmazonItem[]> {
  if (!USE_PAAPI) {
    return [
      {
        asin: '',
        title: query,
        affiliateUrl: amazonSearchUrl(query),
      },
    ];
  }

  const url = `${PROXY_URL}/?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal: opts.signal });
  if (!res.ok) {
    throw new Error(`Amazon proxy ${res.status}`);
  }
  const json = (await res.json()) as any;
  const items: any[] = json?.SearchResult?.Items ?? [];

  return items.map((it) => ({
    asin: it.ASIN,
    title: it.ItemInfo?.Title?.DisplayValue ?? '',
    imageUrl: it.Images?.Primary?.Medium?.URL,
    priceEur: it.Offers?.Listings?.[0]?.Price?.Amount,
    priceDisplay: it.Offers?.Listings?.[0]?.Price?.DisplayAmount,
    affiliateUrl: it.DetailPageURL ?? amazonProductUrl(it.ASIN),
  }));
}
```

### 6.2. Llamada desde una pantalla

```ts
// src/screens/ProjectDetailScreen.tsx (extracto)
import { searchAmazon, AmazonItem } from '../services/amazonPriceService';

useEffect(() => {
  const ac = new AbortController();
  searchAmazon('taladro percutor 18V', { signal: ac.signal })
    .then(setItems)
    .catch((e) => console.warn('[amazon]', e));
  return () => ac.abort();
}, []);
```

### 6.3. Cache en cliente

Para no gastar el rate limit:

- Cachea por **keyword + 1h** con `AsyncStorage` o `react-query`.
- No hagas polling: carga bajo demanda cuando el usuario abre el tutorial.
- Evita hacer `searchAmazon` en listas (ej. listado de proyectos). Hazlo solo en la pantalla de detalle.

---

## 7. Terminos legales y disclaimers

### 7.1. Disclaimer obligatorio

Los terminos del programa **exigen** mostrar de forma clara y visible el siguiente texto (o equivalente) alli donde aparezcan enlaces afiliados:

> **"Como Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables."**

Versión en inglés (si la app se internacionaliza):

> "As an Amazon Associate I earn from qualifying purchases."

### 7.2. Dónde ponerlo en DIY

Pon el disclaimer en **los tres sitios** siguientes para estar cubierto:

1. **Pantalla de ajustes** (`src/screens/SettingsScreen.tsx`): una sección "Información legal" con el texto completo.
2. **Pantalla "Acerca de" / "Sobre DIY"**: párrafo visible cerca del copyright.
3. **Sheet de compra / botón "Ver en Amazon"**: banner o nota al pie dentro del modal que abre el enlace, antes de que el usuario toque el botón.

Componente reutilizable:

```tsx
// src/components/AmazonDisclaimer.tsx
import { Text, StyleSheet } from 'react-native';

export function AmazonDisclaimer() {
  return (
    <Text style={styles.text}>
      Como Afiliado de Amazon, obtengo ingresos por las compras adscritas
      que cumplen los requisitos aplicables.
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
```

### 7.3. Política de privacidad

Añade en la política de privacidad de la app:

```
Esta aplicacion incluye enlaces al programa de Afiliados de Amazon
(afiliados.amazon.es). Cuando pulsas uno de estos enlaces y realizas
una compra en Amazon, podemos recibir una comision sin coste adicional
para ti. Amazon y el logo de Amazon son marcas registradas de
Amazon.com, Inc. o sus filiales.
```

### 7.4. Otras reglas que hay que cumplir

- **No mostrar precios obsoletos**: los precios devueltos por PA-API caducan tras **24 horas**. Si muestras un precio cacheado, debe borrarse a las 24h o indicar claramente la hora de actualización.
- **No imitar ofertas de Amazon**: no inventes descuentos.
- **No incentivar clics**: prohibido decir "haz clic aquí y me ayudas".
- **No enviar el enlace por email/SMS push** a usuarios que no lo hayan pedido.
- **No usar enlaces afiliados en anuncios pagados** sin aprobación previa.

---

## 8. Troubleshooting

| Sintoma | Causa probable | Solucion |
|---|---|---|
| `403 Forbidden` al llamar a PA-API | No has conseguido las 3 ventas aun, o las credenciales estan desactivadas | Volver a Fase 1, conseguir las ventas, reactivar |
| `InvalidSignature` en la respuesta | Reloj del Worker desfasado o cabeceras modificadas despues de firmar | Comprobar `new Date()` en el Worker, no tocar headers tras `aws4.sign` |
| `TooManyRequests` / `429` | Superado 1 req/s | Anadir cache en el Worker, reducir frecuencia |
| `UnrecognizedClientException` | Access Key mal copiada (espacios, saltos) | Regenerarla en `webservices.amazon.es` |
| El tag no aparece en el panel de Afiliados | URL mal construida o redireccion que lo tira | Usar `linkCode=ll1`, probar en incognito |
| Clics si, ventas no | Cookie de 24h caducada antes de comprar | Normal: el usuario tiene que comprar ese dia |
| `Associate tag not registered for marketplace` | Usaste un tag `-21` (ES) contra otro marketplace | Verificar `Marketplace: 'www.amazon.es'` en el request |
| La app expone el secret en el bundle | Alguien metio SigV4 en el cliente | Mover a Worker, rotar el Secret Key inmediatamente |
| Cuenta suspendida tras 30 dias sin ingresos | PA-API requiere ventas recientes | Generar trafico real, reactivar tras la siguiente venta |
| `ItemNotAccessible` | ASIN no vendido en amazon.es | Filtrar por marketplace antes de mostrar |

### 8.1. Checklist antes de publicar la versión con Amazon activo

- [ ] Tracking ID aprobado y verificado con clic real.
- [ ] `src/data/retailers.ts` con el tag correcto.
- [ ] Disclaimer visible en Ajustes, Acerca de, y sheet de compra.
- [ ] Politica de privacidad actualizada.
- [ ] `.env` del backend fuera del repo (verificar `git status` y `git log` por si se colo).
- [ ] Worker desplegado y respondiendo con cache de 1 h.
- [ ] Rate limit respetado (1 req/s max).
- [ ] Manejo de errores: si PA-API falla, la app cae al enlace de busqueda.
- [ ] Secret Key rotado si alguna vez estuvo en local/logs/pantalla compartida.

---

## Referencias oficiales

- Programa Afiliados Espana: https://afiliados.amazon.es
- PA-API 5.0 docs: https://webservices.amazon.com/paapi5/documentation/
- PA-API endpoints por region: https://webservices.amazon.com/paapi5/documentation/common-request-parameters.html
- Terminos del programa: https://afiliados.amazon.es/help/operating/agreement
- Cloudflare Workers: https://developers.cloudflare.com/workers/
- Libreria `aws4`: https://www.npmjs.com/package/aws4

---

*Ultima revision: 2026-04-15. Mantener este archivo actualizado si Amazon cambia los plazos (180 dias) o los umbrales de pago.*
