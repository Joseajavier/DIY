// ═══════════════════════════════════════════════════════════════
// VARNISH DATA — enciclopedia de barnices, lacas y acabados,
// selección rápida, errores comunes y marcas en España.
// ───────────────────────────────────────────────────────────────
// Fuente: ChatGPT research 2026-04. 4 secciones:
//   1. Tipos de barniz/acabado (18)
//   2. Tabla selección rápida por uso/madera (12)
//   3. Errores comunes (10)
//   4. Marcas disponibles en España (12-14)
// ═══════════════════════════════════════════════════════════════

// ── 1. Tipos de barniz/acabado ─────────────────────────────────

export type VarnishDurability = 'baja' | 'media' | 'alta' | 'muy_alta';
export type VarnishFinish = 'mate' | 'satinado' | 'semibrillo' | 'brillo';
export type VarnishBase =
  | 'agua'
  | 'disolvente'
  | 'aceite'
  | 'cera'
  | 'poliuretano'
  | 'nitrocelulosa'
  | 'goma_laca';

export type VarnishType = {
  id: string;
  nombre: string;
  nombreEN: string;
  imagenURL: string;
  diagramaURL: string;
  descripcion: string;
  porQueEsMejor: string;
  base: VarnishBase;
  acabado: VarnishFinish[];
  transparencia: string;
  interiorExterior: 'interior' | 'exterior' | 'ambos';
  numeroCapas: string;
  tiempoSecadoCapas: string;
  tiempoCuradoTotal: string;
  aplicacion: string[];
  diluyente: string;
  rendimiento: string;
  lijadoEntreCapas: string;
  durabilidad: VarnishDurability;
  resistenciaRayado: 'baja' | 'media' | 'alta';
  resistenciaHumedad: 'baja' | 'media' | 'alta';
  resistenciaUV: 'baja' | 'media' | 'alta';
  olor: 'bajo' | 'medio' | 'fuerte';
  amarillea: boolean;
  reversible: boolean;
  aptoAlimentario: boolean;
  mejorPara: string[];
  evitarEn: string[];
  marcasRecomendadas: string[];
  precioOrientativo: string;
  videoYT: string;
};

export const VARNISH_TYPES: VarnishType[] = [
  {
    id: 'barniz_poliuretano_agua',
    nombre: 'Barniz de poliuretano al agua',
    nombreEN: 'Water-based polyurethane varnish',
    imagenURL: 'https://img.youtube.com/vi/aLe3AMYCgM4/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/owXp9o15F-c/hqdefault.jpg',
    descripcion:
      'Es el barniz transparente más agradecido para bricolaje interior cuando quieres buena resistencia sin llenar la casa de olor. Seca rápido, suele nivelar bien y deja un tono bastante limpio sobre pino, roble, haya o MDF chapado.',
    porQueEsMejor:
      'Lo elegiría antes que un sintético al disolvente para muebles, puertas o estanterías de casa porque amarillea menos, se limpia con agua y permite trabajar por fases en el mismo día.',
    base: 'poliuretano',
    acabado: ['mate', 'satinado', 'semibrillo', 'brillo'],
    transparencia: 'transparente o ligeramente tintado',
    interiorExterior: 'interior',
    numeroCapas: '2-3 capas',
    tiempoSecadoCapas: '2-4 h entre capas',
    tiempoCuradoTotal: '5-7 días',
    aplicacion: ['brocha', 'rodillo', 'pistola'],
    diluyente: 'agua',
    rendimiento: '10-12 m²/L',
    lijadoEntreCapas: 'Grano 240-320 entre capas',
    durabilidad: 'alta',
    resistenciaRayado: 'alta',
    resistenciaHumedad: 'alta',
    resistenciaUV: 'media',
    olor: 'bajo',
    amarillea: false,
    reversible: false,
    aptoAlimentario: false,
    mejorPara: [
      'muebles interior',
      'puertas interiores',
      'estanterías',
      'tableros chapados',
      'mesas de comedor',
    ],
    evitarEn: [
      'tarima exterior',
      'sol directo continuo',
      'restauración histórica a muñequilla',
    ],
    marcasRecomendadas: ['Titan', 'V33', 'Bruguer', 'Blanchon', 'Barpimo'],
    precioOrientativo: '18-35 €/L',
    videoYT: 'https://www.youtube.com/watch?v=aLe3AMYCgM4',
  },
  {
    id: 'barniz_poliuretano_disolvente',
    nombre: 'Barniz de poliuretano al disolvente',
    nombreEN: 'Solvent-based polyurethane varnish',
    imagenURL: 'https://img.youtube.com/vi/m2NRRbDd0-w/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/N0fS0vPrJSM/hqdefault.jpg',
    descripcion:
      'Es un barniz de película dura y muy resistente, habitual en carpintería clásica, puertas y muebles de más trote. Aguanta mejor golpes y agua puntual que muchos barnices sencillos al agua, pero huele bastante más y tarda más en quedar fino.',
    porQueEsMejor:
      'Compensa cuando priorizas dureza, cuerpo y resistencia química básica por encima de comodidad de aplicación. En mesas, bancos o puertas castigadas sigue siendo una apuesta muy sólida.',
    base: 'poliuretano',
    acabado: ['mate', 'satinado', 'semibrillo', 'brillo'],
    transparencia: 'transparente o ligeramente ambarino',
    interiorExterior: 'ambos',
    numeroCapas: '2-3 capas',
    tiempoSecadoCapas: '6-12 h entre capas',
    tiempoCuradoTotal: '7 días',
    aplicacion: ['brocha', 'rodillo', 'pistola'],
    diluyente: 'disolvente universal',
    rendimiento: '10-13 m²/L',
    lijadoEntreCapas: 'Grano 240-320 entre capas',
    durabilidad: 'alta',
    resistenciaRayado: 'alta',
    resistenciaHumedad: 'alta',
    resistenciaUV: 'media',
    olor: 'fuerte',
    amarillea: true,
    reversible: false,
    aptoAlimentario: false,
    mejorPara: [
      'mesas de uso intensivo',
      'bancos de trabajo',
      'puertas',
      'muebles interior',
      'barandillas interiores',
    ],
    evitarEn: [
      'habitaciones sin ventilación',
      'juguetes infantiles',
      'restauración reversible',
    ],
    marcasRecomendadas: ['Titan', 'Procolor', 'Barpimo', 'Sayerlack', 'Milesi'],
    precioOrientativo: '15-30 €/L',
    videoYT: 'https://www.youtube.com/watch?v=m2NRRbDd0-w',
  },
  {
    id: 'barniz_marino_yate',
    nombre: 'Barniz marino o de yate',
    nombreEN: 'Marine / yacht varnish',
    imagenURL: 'https://img.youtube.com/vi/sdqfbwfEhSE/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/rzaSSMRepyk/hqdefault.jpg',
    descripcion:
      'Es un barniz flexible pensado para humedad, salitre y cambios de dilatación en exterior. Suele llevar filtros UV y resinas más elásticas para que la película no reviente tan fácil en puertas, contraventanas o piezas náuticas.',
    porQueEsMejor:
      'Lo elegiría frente a un barniz interior normal cuando la madera va a sufrir lluvia, condensación o ambiente marino. No es el acabado más cómodo de mantener, pero protege mejor en condiciones duras.',
    base: 'disolvente',
    acabado: ['satinado', 'semibrillo', 'brillo'],
    transparencia: 'transparente o ligeramente tintado',
    interiorExterior: 'exterior',
    numeroCapas: '3-6 capas',
    tiempoSecadoCapas: '12-24 h entre capas',
    tiempoCuradoTotal: '7-10 días',
    aplicacion: ['brocha', 'rodillo', 'pistola'],
    diluyente: 'aguarrás o diluyente del fabricante',
    rendimiento: '10-12 m²/L',
    lijadoEntreCapas: 'Grano 240-320 entre capas',
    durabilidad: 'alta',
    resistenciaRayado: 'media',
    resistenciaHumedad: 'alta',
    resistenciaUV: 'alta',
    olor: 'fuerte',
    amarillea: true,
    reversible: false,
    aptoAlimentario: false,
    mejorPara: [
      'puertas exteriores',
      'ventanas expuestas',
      'muebles de barco',
      'barandillas',
      'madera exterior de alta humedad',
    ],
    evitarEn: [
      'muebles infantiles',
      'superficies de contacto alimentario',
      'piezas que quieras repasar sin lijar apenas',
    ],
    marcasRecomendadas: ['Titan', 'Procolor', 'Xylazel', 'Bondex', 'Barpimo'],
    precioOrientativo: '18-45 €/L',
    videoYT: 'https://www.youtube.com/watch?v=sdqfbwfEhSE',
  },
  {
    id: 'barniz_acrilico_agua',
    nombre: 'Barniz acrílico al agua',
    nombreEN: 'Water-based acrylic varnish',
    imagenURL: 'https://img.youtube.com/vi/aLe3AMYCgM4/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/Q5M2usTPwsc/hqdefault.jpg',
    descripcion:
      'Es un acabado al agua más ligero y sencillo que un poliuretano, muy usado para proteger muebles, manualidades, juguetes y piezas decorativas. Da buena transparencia, seca rápido y suele respetar bastante el color original de la madera.',
    porQueEsMejor:
      'Es mejor opción que un poliuretano duro cuando buscas facilidad, poca toxicidad percibida y un acabado limpio en muebles de uso medio. También va bien sobre tintes al agua si quieres mantener el tono claro.',
    base: 'agua',
    acabado: ['mate', 'satinado', 'brillo'],
    transparencia: 'transparente o translúcido',
    interiorExterior: 'ambos',
    numeroCapas: '2-3 capas',
    tiempoSecadoCapas: '1-3 h entre capas',
    tiempoCuradoTotal: '3-5 días',
    aplicacion: ['brocha', 'rodillo', 'pistola'],
    diluyente: 'agua',
    rendimiento: '10-14 m²/L',
    lijadoEntreCapas: 'Grano 280-320 entre capas',
    durabilidad: 'media',
    resistenciaRayado: 'media',
    resistenciaHumedad: 'media',
    resistenciaUV: 'media',
    olor: 'bajo',
    amarillea: false,
    reversible: false,
    aptoAlimentario: false,
    mejorPara: [
      'juguetes',
      'muebles decorativos',
      'manualidades',
      'madera interior clara',
      'piezas con poco olor en obra',
    ],
    evitarEn: [
      'suelos de alto tránsito',
      'encimeras exigentes',
      'exterior muy castigado',
    ],
    marcasRecomendadas: ['Titan', 'Bruguer', 'V33', 'Xylazel', 'Barpimo'],
    precioOrientativo: '14-25 €/L',
    videoYT: 'https://www.youtube.com/watch?v=aLe3AMYCgM4',
  },
  {
    id: 'laca_nitrocelulosa',
    nombre: 'Laca nitrocelulosa',
    nombreEN: 'Nitrocellulose lacquer',
    imagenURL: 'https://img.youtube.com/vi/3Lg7xhzKEDw/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/61PvJbqU82Y/hqdefault.jpg',
    descripcion:
      'Es la laca clásica de secado muy rápido usada en carpintería y ebanistería para muebles, frentes y piezas de taller. Permite aplicar varias manos en poco tiempo y se lija muy bien, pero resiste peor agua y calor que un poliuretano 2K.',
    porQueEsMejor:
      'La usaría cuando necesitas producción rápida, tacto fino y facilidad de reparación localizada. Para muebles interiores y series pequeñas sigue siendo muy práctica.',
    base: 'nitrocelulosa',
    acabado: ['mate', 'satinado', 'semibrillo', 'brillo'],
    transparencia: 'transparente o lacado pigmentado',
    interiorExterior: 'interior',
    numeroCapas: '3-4 capas finas',
    tiempoSecadoCapas: '20-40 min entre capas',
    tiempoCuradoTotal: '24-48 h',
    aplicacion: ['pistola', 'brocha'],
    diluyente: 'disolvente nitro',
    rendimiento: '8-10 m²/L',
    lijadoEntreCapas: 'Grano 320-400 entre capas',
    durabilidad: 'media',
    resistenciaRayado: 'media',
    resistenciaHumedad: 'media',
    resistenciaUV: 'baja',
    olor: 'fuerte',
    amarillea: true,
    reversible: true,
    aptoAlimentario: false,
    mejorPara: [
      'muebles de taller',
      'frentes de cajón',
      'ebanistería interior',
      'instrumentos',
      'acabado rápido',
    ],
    evitarEn: ['baños sin ventilación', 'encimeras', 'exterior directo'],
    marcasRecomendadas: ['Sayerlack', 'Milesi', 'Dipistol', 'Irurena', 'Barpimo'],
    precioOrientativo: '12-22 €/L',
    videoYT: 'https://www.youtube.com/watch?v=3Lg7xhzKEDw',
  },
  {
    id: 'laca_poliuretano_bicomponente',
    nombre: 'Laca poliuretano bicomponente',
    nombreEN: 'Two-component polyurethane lacquer',
    imagenURL: 'https://img.youtube.com/vi/lDtDvZD42UE/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/hQ2Mey_gGjM/hqdefault.jpg',
    descripcion:
      'Es el acabado profesional de cabina para muebles de mucha calidad, cocinas, baños y carpintería lacada. Mezcla base y catalizador, nivela muy bien y da mucha resistencia a roce, humedad y productos domésticos.',
    porQueEsMejor:
      'Es superior a una nitro o a muchos esmaltes DIY cuando buscas un lacado blanco duro, lavable y con aspecto serio. El peaje es que exige mezcla exacta, ventilación y un mínimo de oficio.',
    base: 'poliuretano',
    acabado: ['mate', 'satinado', 'semibrillo', 'brillo'],
    transparencia: 'transparente o opaco lacado',
    interiorExterior: 'interior',
    numeroCapas: '2-3 capas',
    tiempoSecadoCapas: '4-6 h entre capas',
    tiempoCuradoTotal: '5-7 días',
    aplicacion: ['pistola'],
    diluyente: 'disolvente PU del fabricante',
    rendimiento: '8-10 m²/L',
    lijadoEntreCapas: 'Grano 320-400 entre capas',
    durabilidad: 'muy_alta',
    resistenciaRayado: 'alta',
    resistenciaHumedad: 'alta',
    resistenciaUV: 'media',
    olor: 'fuerte',
    amarillea: true,
    reversible: false,
    aptoAlimentario: false,
    mejorPara: [
      'mueble de cocina',
      'mueble de baño',
      'frentes lacados',
      'mueble blanco',
      'carpintería profesional',
    ],
    evitarEn: [
      'aplicación sin ventilación',
      'proyecto doméstico sin pistola',
      'restauración reversible',
    ],
    marcasRecomendadas: ['Sayerlack', 'Milesi', 'Irurena', 'Procolor', 'Barpimo'],
    precioOrientativo: '22-45 €/L',
    videoYT: 'https://www.youtube.com/watch?v=lDtDvZD42UE',
  },
  {
    id: 'aceite_duro_hardwax',
    nombre: 'Aceite duro tipo Hardwax Oil',
    nombreEN: 'Hardwax oil finish',
    imagenURL: 'https://img.youtube.com/vi/bGpQt8IjR3k/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/uK9KTf6sWps/hqdefault.jpg',
    descripcion:
      'Combina aceites y ceras duras para proteger desde dentro sin crear una película gruesa. Deja un tacto muy natural, repara bien por zonas y funciona especialmente bien en madera maciza, encimeras, mesas y suelos interiores.',
    porQueEsMejor:
      'Lo elegiría frente a un barniz de película cuando quieres poder retocar arañazos localmente sin lijar toda la pieza. También da un aspecto más cálido y menos plástico.',
    base: 'aceite',
    acabado: ['mate', 'satinado'],
    transparencia: 'transparente o ligeramente entonado',
    interiorExterior: 'interior',
    numeroCapas: '2 capas finas',
    tiempoSecadoCapas: '8-12 h entre capas',
    tiempoCuradoTotal: '7-10 días',
    aplicacion: ['brocha', 'rodillo', 'muñequilla'],
    diluyente: 'no diluir',
    rendimiento: '18-24 m²/L',
    lijadoEntreCapas:
      'Lijado muy suave grano 320 si hace falta despeluzado',
    durabilidad: 'alta',
    resistenciaRayado: 'media',
    resistenciaHumedad: 'alta',
    resistenciaUV: 'baja',
    olor: 'bajo',
    amarillea: false,
    reversible: true,
    aptoAlimentario: true,
    mejorPara: [
      'encimeras interiores',
      'mesas',
      'madera maciza',
      'suelos interiores',
      'juguetes de madera',
    ],
    evitarEn: [
      'sol directo exterior',
      'muebles que quieras en brillo alto',
      'acabado completamente sellado',
    ],
    marcasRecomendadas: [
      'Osmo',
      'Blanchon',
      'Rubio Monocoat',
      'Liberon',
      'Barpimo',
    ],
    precioOrientativo: '35-65 €/L',
    videoYT: 'https://www.youtube.com/watch?v=bGpQt8IjR3k',
  },
  {
    id: 'aceite_teca',
    nombre: 'Aceite de teca',
    nombreEN: 'Teak oil',
    imagenURL: 'https://img.youtube.com/vi/_wkFYAYVti4/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/S8VhfqScPKQ/hqdefault.jpg',
    descripcion:
      'Es un aceite de mantenimiento para maderas tropicales y mobiliario exterior, formulado para nutrir, avivar color y frenar el envejecimiento visual. No crea una capa gruesa como un barniz, así que el mantenimiento es más sencillo pero también más frecuente.',
    porQueEsMejor:
      'Es mejor que barnizar teca, iroko o acacia cuando prefieres mantenimiento simple y no quieres una película que termine cuarteando. Va muy bien en jardines, bancos y muebles plegables.',
    base: 'aceite',
    acabado: ['mate', 'satinado'],
    transparencia: 'transparente ambarino o miel',
    interiorExterior: 'exterior',
    numeroCapas: '1-2 capas',
    tiempoSecadoCapas: '6-12 h entre capas',
    tiempoCuradoTotal: '2-3 días',
    aplicacion: ['brocha', 'rodillo', 'muñequilla'],
    diluyente: 'no diluir',
    rendimiento: '10-14 m²/L',
    lijadoEntreCapas:
      'Lijado ligero grano 180-240 solo si hay fibra levantada',
    durabilidad: 'media',
    resistenciaRayado: 'baja',
    resistenciaHumedad: 'media',
    resistenciaUV: 'media',
    olor: 'medio',
    amarillea: true,
    reversible: true,
    aptoAlimentario: false,
    mejorPara: [
      'muebles de jardín',
      'teca',
      'iroko',
      'acacia exterior',
      'tarima exterior de mantenimiento fácil',
    ],
    evitarEn: [
      'suelos de alto tránsito interior',
      'mueble blanco',
      'acabados brillo',
    ],
    marcasRecomendadas: ['Xylazel', 'Bondex', 'Liberon', 'Barpimo', 'V33'],
    precioOrientativo: '16-28 €/L',
    videoYT: 'https://www.youtube.com/watch?v=_wkFYAYVti4',
  },
  {
    id: 'aceite_linaza',
    nombre: 'Aceite de linaza',
    nombreEN: 'Linseed oil',
    imagenURL: 'https://img.youtube.com/vi/TaTwah5ZM8M/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/FWeXXjcaLQ4/hqdefault.jpg',
    descripcion:
      'Es el acabado tradicional para nutrir madera, oscurecer ligeramente el tono y dejar un aspecto cálido y artesanal. Funciona bien en restauración sencilla, mangos, piezas rústicas y muebles donde no necesitas una resistencia moderna muy alta.',
    porQueEsMejor:
      'Lo elegiría por sencillez, precio y estética tradicional cuando la pieza no va a sufrir mucha agua ni detergentes. También es útil como base en ciertos trabajos rústicos o de restauración amable.',
    base: 'aceite',
    acabado: ['mate', 'satinado'],
    transparencia: 'transparente ambarino',
    interiorExterior: 'ambos',
    numeroCapas: '2-3 capas muy finas',
    tiempoSecadoCapas: '12-24 h entre capas',
    tiempoCuradoTotal: '7-30 días según formulación',
    aplicacion: ['brocha', 'muñequilla'],
    diluyente: 'esencia de trementina o no diluir según formulación',
    rendimiento: '12-15 m²/L',
    lijadoEntreCapas:
      'Lana de acero fina o grano 320 si hace falta',
    durabilidad: 'baja',
    resistenciaRayado: 'baja',
    resistenciaHumedad: 'baja',
    resistenciaUV: 'baja',
    olor: 'medio',
    amarillea: true,
    reversible: true,
    aptoAlimentario: false,
    mejorPara: [
      'muebles rústicos',
      'mangos de herramienta',
      'restauración sencilla',
      'madera vista interior',
      'piezas artesanales',
    ],
    evitarEn: [
      'encimeras de cocina exigentes',
      'baños',
      'parquet de mucho trote',
    ],
    marcasRecomendadas: ['Liberon', 'Titan', 'Barpimo', 'Montó', 'Xylazel'],
    precioOrientativo: '8-18 €/L',
    videoYT: 'https://www.youtube.com/watch?v=TaTwah5ZM8M',
  },
  {
    id: 'cera_natural_madera',
    nombre: 'Cera natural para madera',
    nombreEN: 'Natural wood wax',
    imagenURL: 'https://img.youtube.com/vi/ksocw83dV68/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/d4IJjKu48AY/hqdefault.jpg',
    descripcion:
      'La cera de abejas o carnauba embellece mucho el poro y deja un tacto sedoso muy agradable. Es un acabado de bajo espesor, ideal para muebles decorativos o como mantenimiento sobre otras superficies ya selladas.',
    porQueEsMejor:
      'Es mejor que un barniz cuando solo quieres realzar, dar tacto y facilitar pequeños repasos. En restauración decorativa funciona muy bien, siempre que aceptes su baja resistencia al agua y al calor.',
    base: 'cera',
    acabado: ['mate', 'satinado'],
    transparencia: 'transparente o ligeramente miel',
    interiorExterior: 'interior',
    numeroCapas: '1-2 capas finas',
    tiempoSecadoCapas: '1-4 h entre capas',
    tiempoCuradoTotal: '2-7 días',
    aplicacion: ['muñequilla', 'brocha'],
    diluyente: 'no diluir',
    rendimiento: '20-30 m²/L',
    lijadoEntreCapas: 'Sin lijado; pulido con paño o lana 0000',
    durabilidad: 'baja',
    resistenciaRayado: 'baja',
    resistenciaHumedad: 'baja',
    resistenciaUV: 'baja',
    olor: 'bajo',
    amarillea: false,
    reversible: true,
    aptoAlimentario: true,
    mejorPara: [
      'mueble antiguo decorativo',
      'acabado tacto natural',
      'mantenimiento',
      'pequeños objetos',
      'cajones interiores',
    ],
    evitarEn: ['mesas de cocina', 'baños', 'suelos', 'sol directo exterior'],
    marcasRecomendadas: ['Liberon', 'Osmo', 'Rubio Monocoat', 'Titan', 'Barpimo'],
    precioOrientativo: '8-18 €/250 ml',
    videoYT: 'https://www.youtube.com/watch?v=ksocw83dV68',
  },
  {
    id: 'goma_laca_shellac',
    nombre: 'Goma laca / shellac',
    nombreEN: 'Shellac finish',
    imagenURL: 'https://img.youtube.com/vi/HHje2mg26KE/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/JJSuY4HD1vM/hqdefault.jpg',
    descripcion:
      'Es el acabado clásico de restauración fina, normalmente aplicado a muñequilla en capas muy delgadas. Da una profundidad preciosa y repara bien, pero no soporta bien agua, alcohol ni calor directo.',
    porQueEsMejor:
      'La elegiría en restauración de muebles antiguos, instrumentos o piezas nobles donde importa más el respeto histórico y la reparabilidad que la resistencia moderna.',
    base: 'goma_laca',
    acabado: ['mate', 'satinado', 'semibrillo', 'brillo'],
    transparencia: 'transparente ámbar, rubia o anaranjada',
    interiorExterior: 'interior',
    numeroCapas: '4-8 capas muy finas',
    tiempoSecadoCapas: '30-60 min entre capas finas',
    tiempoCuradoTotal: '5-7 días',
    aplicacion: ['muñequilla', 'brocha'],
    diluyente: 'alcohol etílico',
    rendimiento: '12-16 m²/L',
    lijadoEntreCapas:
      'Lijado muy fino grano 400 o lana 0000 si hace falta',
    durabilidad: 'baja',
    resistenciaRayado: 'baja',
    resistenciaHumedad: 'baja',
    resistenciaUV: 'baja',
    olor: 'medio',
    amarillea: true,
    reversible: true,
    aptoAlimentario: false,
    mejorPara: [
      'restauración',
      'mueble antiguo',
      'instrumentos',
      'piezas nobles',
      'ebanistería clásica',
    ],
    evitarEn: ['encimeras', 'suelos', 'baños', 'muebles de uso duro'],
    marcasRecomendadas: ['Liberon', 'Barpimo', 'Sayerlack', 'Dipistol', 'Titan'],
    precioOrientativo: '12-25 €/250 ml',
    videoYT: 'https://www.youtube.com/watch?v=HHje2mg26KE',
  },
  {
    id: 'tinte_agua_madera',
    nombre: 'Tinte al agua para madera',
    nombreEN: 'Water-based wood stain',
    imagenURL: 'https://img.youtube.com/vi/cBtywunA7y8/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/jrsuUIQa6QQ/hqdefault.jpg',
    descripcion:
      'No es un barniz, pero forma parte del sistema de acabado porque da color antes del sellado. Penetra bien, permite mucha variedad de tonos y funciona muy bien si luego rematas con barniz o aceite compatible.',
    porQueEsMejor:
      'Es mejor que usar barnices tintados cuando quieres controlar el color por separado y no depender de que la protección te cambie el tono en exceso. También facilita igualar reparaciones antes del acabado final.',
    base: 'agua',
    acabado: ['mate'],
    transparencia: 'tintado translúcido',
    interiorExterior: 'interior',
    numeroCapas: '1 capa; 2 si buscas más intensidad',
    tiempoSecadoCapas: '2-6 h antes de sellar',
    tiempoCuradoTotal: 'No aplica; necesita acabado final',
    aplicacion: ['brocha', 'muñequilla', 'pistola'],
    diluyente: 'agua',
    rendimiento: '8-15 m²/L',
    lijadoEntreCapas:
      'Lijado muy suave grano 320 tras despeluzado, antes del barniz',
    durabilidad: 'baja',
    resistenciaRayado: 'baja',
    resistenciaHumedad: 'baja',
    resistenciaUV: 'baja',
    olor: 'bajo',
    amarillea: false,
    reversible: true,
    aptoAlimentario: false,
    mejorPara: [
      'igualar color',
      'restauración',
      'parquet teñido',
      'mueble interior',
      'muestras de acabado',
    ],
    evitarEn: [
      'uso sin sellado',
      'exterior sin protección posterior',
      'encimeras sin acabado final',
    ],
    marcasRecomendadas: ['Rubio Monocoat', 'Sayerlack', 'Milesi', 'Titan', 'Barpimo'],
    precioOrientativo: '8-18 €/250 ml',
    videoYT: 'https://www.youtube.com/watch?v=cBtywunA7y8',
  },
  {
    id: 'fondo_tapaporos_madera',
    nombre: 'Fondo tapaporos / imprimación para madera',
    nombreEN: 'Wood sealer / pore filler primer',
    imagenURL: 'https://img.youtube.com/vi/L6eFPeUzsEE/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/f5x0dF-Ompo/hqdefault.jpg',
    descripcion:
      'Es la capa que sella absorción, rellena algo de poro y deja la base lista para barniz o laca. En roble, fresno, sapelli o MDF ahorra disgustos porque uniforma mucho más el acabado posterior.',
    porQueEsMejor:
      'Lo usaría siempre que quieras un acabado más fino, menos consumo de laca y menos riesgo de rechupados o brillos irregulares. En MDF y maderas de poro abierto marca mucho la diferencia.',
    base: 'nitrocelulosa',
    acabado: ['mate'],
    transparencia: 'transparente o ligeramente lechoso',
    interiorExterior: 'interior',
    numeroCapas: '1-2 capas',
    tiempoSecadoCapas: '30-60 min entre capas',
    tiempoCuradoTotal: '12-24 h antes de acabado exigente',
    aplicacion: ['brocha', 'pistola', 'rodillo'],
    diluyente: 'disolvente nitro o del sistema',
    rendimiento: '8-12 m²/L',
    lijadoEntreCapas: 'Grano 240-320 para abrir y nivelar',
    durabilidad: 'baja',
    resistenciaRayado: 'baja',
    resistenciaHumedad: 'baja',
    resistenciaUV: 'baja',
    olor: 'fuerte',
    amarillea: true,
    reversible: true,
    aptoAlimentario: false,
    mejorPara: ['MDF', 'roble', 'fresno', 'sapelli', 'base para lacado'],
    evitarEn: [
      'uso como acabado final',
      'exterior sin capa de terminación',
      'madera húmeda',
    ],
    marcasRecomendadas: ['Dipistol', 'Sayerlack', 'Milesi', 'Barpimo', 'Procolor'],
    precioOrientativo: '12-24 €/L',
    videoYT: 'https://www.youtube.com/watch?v=L6eFPeUzsEE',
  },
  {
    id: 'lasur_exterior_decorativo',
    nombre: 'Lasur decorativo exterior',
    nombreEN: 'Exterior decorative wood stain / lasur',
    imagenURL: 'https://img.youtube.com/vi/CJ6urZNPjPM/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/NOpbimO92Xs/hqdefault.jpg',
    descripcion:
      'El lasur protege a poro abierto: penetra, deja ver veta y deja salir la humedad interna de la madera. Es el producto más práctico para puertas, ventanas, pérgolas o vallas porque no suele escamar como un barniz de película.',
    porQueEsMejor:
      'Lo elegiría por mantenimiento sencillo y porque envejece mejor en exterior que un barniz tradicional. Cuando toca renovar, normalmente limpias, matizas y reaplicas sin tener que decapar media vida.',
    base: 'agua',
    acabado: ['mate', 'satinado', 'semibrillo'],
    transparencia: 'translúcido decorativo',
    interiorExterior: 'exterior',
    numeroCapas: '2-3 capas',
    tiempoSecadoCapas: '4-12 h entre capas',
    tiempoCuradoTotal: '3-5 días',
    aplicacion: ['brocha', 'rodillo', 'pistola'],
    diluyente: 'agua',
    rendimiento: '8-12 m²/L',
    lijadoEntreCapas:
      'Grano 180-240 solo si la fibra se levanta o para mantenimiento',
    durabilidad: 'alta',
    resistenciaRayado: 'media',
    resistenciaHumedad: 'alta',
    resistenciaUV: 'alta',
    olor: 'bajo',
    amarillea: false,
    reversible: true,
    aptoAlimentario: false,
    mejorPara: ['puertas exteriores', 'ventanas', 'vallas', 'pérgolas', 'casetas de jardín'],
    evitarEn: ['encimeras', 'muebles alto brillo', 'suelos interiores'],
    marcasRecomendadas: ['Sikkens Cetol', 'Xylazel', 'Bondex', 'V33', 'Bruguer'],
    precioOrientativo: '16-32 €/L',
    videoYT: 'https://www.youtube.com/watch?v=CJ6urZNPjPM',
  },
  {
    id: 'barniz_parquet_suelos',
    nombre: 'Barniz para suelos / parquet',
    nombreEN: 'Floor / parquet varnish',
    imagenURL: 'https://img.youtube.com/vi/kfLarUOAHUw/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/kwkfcGuckro/hqdefault.jpg',
    descripcion:
      'Es un barniz formulado para abrasión, rozamiento, limpieza y uso continuo en pavimentos. Suele ser bastante más duro que el barniz de mueble y hay versiones al agua y al disolvente, domésticas y profesionales.',
    porQueEsMejor:
      'Lo elegiría siempre para parquet, escaleras o pasillos en lugar de reutilizar un barniz cualquiera. En suelo el acabado bonito no basta: tiene que soportar pisadas, sillas y fregado.',
    base: 'poliuretano',
    acabado: ['mate', 'satinado', 'brillo'],
    transparencia: 'transparente',
    interiorExterior: 'interior',
    numeroCapas: '2-3 capas',
    tiempoSecadoCapas: '4-6 h entre capas',
    tiempoCuradoTotal: '7 días',
    aplicacion: ['rodillo', 'brocha', 'pistola'],
    diluyente: 'agua o disolvente según sistema',
    rendimiento: '10-12 m²/L',
    lijadoEntreCapas: 'Grano 180-220 entre capas',
    durabilidad: 'muy_alta',
    resistenciaRayado: 'alta',
    resistenciaHumedad: 'alta',
    resistenciaUV: 'media',
    olor: 'medio',
    amarillea: false,
    reversible: false,
    aptoAlimentario: false,
    mejorPara: ['parquet', 'escaleras interiores', 'pasillos', 'salones', 'suelos de madera'],
    evitarEn: [
      'muebles decorativos pequeños',
      'exterior sin producto específico',
      'madera con humedad alta',
    ],
    marcasRecomendadas: ['Blanchon', 'V33', 'Bona', 'Sayerlack', 'Osmo'],
    precioOrientativo: '18-55 €/L',
    videoYT: 'https://www.youtube.com/watch?v=kfLarUOAHUw',
  },
  {
    id: 'barniz_ignifugo_madera',
    nombre: 'Barniz ignífugo para madera',
    nombreEN: 'Fire-retardant wood varnish',
    imagenURL: 'https://img.youtube.com/vi/lLfjJjbZkXc/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/oqP09bYju04/hqdefault.jpg',
    descripcion:
      'Es un recubrimiento técnico pensado para mejorar la reacción al fuego de revestimientos y elementos de madera. En obra real hay que respetar sistema, gramaje, soporte y certificados del fabricante; no es un barniz decorativo cualquiera.',
    porQueEsMejor:
      'Lo eliges cuando el proyecto pide seguridad contra fuego o una clasificación concreta, no por estética. Frente a un barniz normal aporta una función técnica que cambia de verdad el comportamiento de la madera.',
    base: 'agua',
    acabado: ['mate', 'satinado'],
    transparencia: 'transparente incoloro o ligeramente lechoso en húmedo',
    interiorExterior: 'ambos',
    numeroCapas: '2-3 capas según certificado',
    tiempoSecadoCapas: '4-8 h entre capas',
    tiempoCuradoTotal: '7 días',
    aplicacion: ['brocha', 'rodillo', 'pistola'],
    diluyente: 'agua',
    rendimiento: '8-11 m²/L por mano',
    lijadoEntreCapas:
      'Normalmente no lijar salvo indicación del sistema',
    durabilidad: 'alta',
    resistenciaRayado: 'media',
    resistenciaHumedad: 'media',
    resistenciaUV: 'media',
    olor: 'bajo',
    amarillea: false,
    reversible: false,
    aptoAlimentario: false,
    mejorPara: ['frisos', 'techos de madera', 'revestimientos', 'vigas vistas', 'espacios con exigencia técnica'],
    evitarEn: [
      'muebles sin necesidad técnica',
      'aplicación improvisada sin ficha',
      'retoques mezclando marcas',
    ],
    marcasRecomendadas: ['Cedria', 'Irurena', 'Barpimo', 'Milesi', 'Montó'],
    precioOrientativo: '35-70 €/L',
    videoYT: 'https://www.youtube.com/watch?v=lLfjJjbZkXc',
  },
  {
    id: 'rubio_monocoat_aceite_coloreado',
    nombre: 'Aceite coloreado monocapa tipo Rubio Monocoat',
    nombreEN: 'Single-coat pigmented oil finish',
    imagenURL: 'https://img.youtube.com/vi/_Uo69FVqypA/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/dRf22lE4TpY/hqdefault.jpg',
    descripcion:
      'Es un aceite de alta gama que colorea y protege en una sola capa si se aplica bien y se retira todo el exceso. Es muy valorado en suelos, encimeras, muebles y trabajos donde quieres color uniforme sin crear película gruesa.',
    porQueEsMejor:
      'Lo elegiría frente a un sistema tinte más barniz cuando quieres un proceso corto, tacto natural y reparaciones localizadas razonables. Sale caro, pero el resultado y el mantenimiento suelen compensar.',
    base: 'aceite',
    acabado: ['mate', 'satinado'],
    transparencia: 'tintado translúcido con color monocapa',
    interiorExterior: 'interior',
    numeroCapas: '1 capa única',
    tiempoSecadoCapas: '1 capa; retirar exceso a los 5-15 min',
    tiempoCuradoTotal: '5 días',
    aplicacion: ['muñequilla', 'brocha', 'rodillo'],
    diluyente: 'no diluir',
    rendimiento: '30-50 m²/L',
    lijadoEntreCapas: 'No aplica; monocapa',
    durabilidad: 'alta',
    resistenciaRayado: 'media',
    resistenciaHumedad: 'alta',
    resistenciaUV: 'baja',
    olor: 'bajo',
    amarillea: false,
    reversible: true,
    aptoAlimentario: true,
    mejorPara: ['encimeras', 'mesas', 'suelos interiores', 'muebles de diseño', 'madera con color natural o ahumado'],
    evitarEn: [
      'madera exterior sin sistema específico',
      'acabado alto brillo',
      'aplicar de más y dejar charcos',
    ],
    marcasRecomendadas: ['Rubio Monocoat', 'Osmo', 'Blanchon', 'Liberon', 'Milesi'],
    precioOrientativo: '75-95 €/L',
    videoYT: 'https://www.youtube.com/watch?v=_Uo69FVqypA',
  },
  {
    id: 'esmalte_sintetico_opaco',
    nombre: 'Esmalte sintético opaco para madera',
    nombreEN: 'Synthetic opaque enamel for wood',
    imagenURL: 'https://img.youtube.com/vi/ZB5WziWG7VA/hqdefault.jpg',
    diagramaURL: 'https://img.youtube.com/vi/PG5N_g63ApE/hqdefault.jpg',
    descripcion:
      'No es barniz, pero en DIY mucha gente lo mete en el mismo saco porque se usa para terminar puertas y muebles. Cubre la veta con un acabado opaco, bastante duro y sencillo de encontrar en blanco, negro y colores clásicos.',
    porQueEsMejor:
      'Lo elegiría cuando no te importa perder la veta y prefieres cubrir, unificar y renovar con un producto fácil de comprar. Para muebles viejos, puertas o carpintería pintada es más lógico que empeñarse en barnizar lo irreparable.',
    base: 'disolvente',
    acabado: ['mate', 'satinado', 'brillo'],
    transparencia: 'opaco lacado',
    interiorExterior: 'ambos',
    numeroCapas: '2 capas',
    tiempoSecadoCapas: '12-24 h entre capas',
    tiempoCuradoTotal: '7 días',
    aplicacion: ['brocha', 'rodillo', 'pistola'],
    diluyente: 'aguarrás o disolvente sintético',
    rendimiento: '10-14 m²/L',
    lijadoEntreCapas: 'Grano 240-320 entre capas',
    durabilidad: 'alta',
    resistenciaRayado: 'media',
    resistenciaHumedad: 'media',
    resistenciaUV: 'media',
    olor: 'fuerte',
    amarillea: true,
    reversible: false,
    aptoAlimentario: false,
    mejorPara: ['puertas', 'muebles pintados', 'cocinas antiguas a renovar', 'MDF sellado', 'acabado blanco clásico'],
    evitarEn: [
      'madera bonita que quieras lucir',
      'restauración de valor',
      'juguetes que se mordisquean',
    ],
    marcasRecomendadas: ['Titan', 'Bruguer', 'Procolor', 'Barpimo', 'Montó'],
    precioOrientativo: '18-30 €/L',
    videoYT: 'https://www.youtube.com/watch?v=ZB5WziWG7VA',
  },
];

// ── 2. Tabla selección rápida por uso/madera ───────────────────

export type VarnishQuickSelection = {
  uso: string;
  madera: string;
  acabadoRecomendado: string;
  porQue: string;
  preparacion: string;
  numCapas: string;
  imagenURL: string;
};

export const VARNISH_QUICK_SELECTIONS: VarnishQuickSelection[] = [
  {
    uso: 'Suelo de parquet de roble interior',
    madera: 'Roble macizo o multicapa lijado',
    acabadoRecomendado: 'barniz_parquet_suelos',
    porQue: 'Es el que mejor aguanta tránsito, sillas, limpieza y rozamiento diario.',
    preparacion:
      'Lijado progresivo 80-120, aspirado muy fino y, si el sistema lo pide, imprimación compatible.',
    numCapas: '2-3 capas',
    imagenURL: 'https://img.youtube.com/vi/kfLarUOAHUw/hqdefault.jpg',
  },
  {
    uso: 'Mesa de comedor de madera maciza',
    madera: 'Roble, nogal, haya o fresno',
    acabadoRecomendado: 'barniz_poliuretano_agua',
    porQue: 'Da buena protección contra uso diario sin meter demasiado tono amarillo.',
    preparacion:
      'Lijado 120-180, despolvado y primera mano fina para evitar marcas de brocha.',
    numCapas: '2-3 capas',
    imagenURL: 'https://img.youtube.com/vi/owXp9o15F-c/hqdefault.jpg',
  },
  {
    uso: 'Mesa de cocina o superficie con contacto ocasional de alimentos',
    madera: 'Roble, haya, arce o nogal',
    acabadoRecomendado: 'aceite_duro_hardwax',
    porQue: 'Tacto natural, mantenimiento sencillo y opciones aptas tras curado en gamas tipo encimera.',
    preparacion:
      'Lijado fino 120-180, aspirado y aplicación muy medida retirando siempre el exceso.',
    numCapas: '2 capas finas',
    imagenURL: 'https://img.youtube.com/vi/bGpQt8IjR3k/hqdefault.jpg',
  },
  {
    uso: 'Mueble infantil o juguete de madera',
    madera: 'Pino, haya o contrachapado de abedul',
    acabadoRecomendado: 'barniz_acrilico_agua',
    porQue: 'Es cómodo de aplicar en casa, huele poco y suele secar rápido.',
    preparacion:
      'Lijado 150-220, redondear cantos y eliminar muy bien el polvo antes de barnizar.',
    numCapas: '2-3 capas',
    imagenURL: 'https://img.youtube.com/vi/Q5M2usTPwsc/hqdefault.jpg',
  },
  {
    uso: 'Puerta exterior de entrada o porche',
    madera: 'Pino tratado, iroko o sapelli',
    acabadoRecomendado: 'lasur_exterior_decorativo',
    porQue: 'En exterior envejece mejor y se mantiene con menos drama que un barniz cerrado.',
    preparacion:
      'Lijado 120-150, fondo si la madera está desnuda y aplicación en veta sin dejar charcos.',
    numCapas: '2-3 capas',
    imagenURL: 'https://img.youtube.com/vi/CJ6urZNPjPM/hqdefault.jpg',
  },
  {
    uso: 'Valla exterior o cerramiento de jardín',
    madera: 'Pino, abeto o madera tratada autoclave',
    acabadoRecomendado: 'lasur_exterior_decorativo',
    porQue: 'Permite mantenimiento periódico sin tener que decapar como ocurre con muchos barnices exteriores.',
    preparacion:
      'Cepillado, limpieza de verdín y humedad, secado completo y aplicación generosa a brocha.',
    numCapas: '2 capas',
    imagenURL: 'https://img.youtube.com/vi/CJ6urZNPjPM/hqdefault.jpg',
  },
  {
    uso: 'Ventana exterior muy expuesta',
    madera: 'Pino laminado, iroko o meranti',
    acabadoRecomendado: 'lasur_exterior_decorativo',
    porQue: 'Microporoso, flexible y más razonable de mantener en piezas que se mueven con el clima.',
    preparacion:
      'Lijado suave, especial atención a testas y cantos, y repaso de sellado en uniones.',
    numCapas: '3 capas en cantos y zonas castigadas',
    imagenURL: 'https://img.youtube.com/vi/CJ6urZNPjPM/hqdefault.jpg',
  },
  {
    uso: 'Mueble restaurado antiguo',
    madera: 'Nogal, caoba, cerezo o chapas nobles',
    acabadoRecomendado: 'goma_laca_shellac',
    porQue: 'Respeta mejor la lógica de restauración y deja profundidad muy bonita en madera noble.',
    preparacion:
      'Desencerado, limpieza, tapado puntual y muñequilla muy fina sin empapar la pieza.',
    numCapas: '4-8 capas finas',
    imagenURL: 'https://img.youtube.com/vi/HHje2mg26KE/hqdefault.jpg',
  },
  {
    uso: 'Encimera de madera interior',
    madera: 'Roble, nogal, iroko o haya vaporizada',
    acabadoRecomendado: 'rubio_monocoat_aceite_coloreado',
    porQue: 'Protege bien, se repara localmente y hay versiones con cumplimiento para contacto alimentario.',
    preparacion:
      'Lijado uniforme hasta 120-150, limpieza absoluta y retirada total del exceso tras aplicar.',
    numCapas: '1 capa única',
    imagenURL: 'https://img.youtube.com/vi/_Uo69FVqypA/hqdefault.jpg',
  },
  {
    uso: 'Terraza o tarima exterior',
    madera: 'Teca, iroko, cumarú o pino tratado',
    acabadoRecomendado: 'aceite_teca',
    porQue: 'En horizontal suele ser más agradecido de mantener que un barniz de película.',
    preparacion:
      'Limpieza profunda, secado, lijado suave o cepillado y reaplicación periódica sin exceso.',
    numCapas: '1-2 capas',
    imagenURL: 'https://img.youtube.com/vi/_wkFYAYVti4/hqdefault.jpg',
  },
  {
    uso: 'Estantería interior de MDF',
    madera: 'MDF estándar o hidrófugo',
    acabadoRecomendado: 'fondo_tapaporos_madera',
    porQue: 'En MDF el sellado del canto manda; si no lo haces, el acabado final queda pobre y se hunde.',
    preparacion:
      'Sellar especialmente cantos, lijar 240-320 y rematar después con barniz o esmalte compatible.',
    numCapas: '1-2 capas de fondo + acabado final',
    imagenURL: 'https://img.youtube.com/vi/L6eFPeUzsEE/hqdefault.jpg',
  },
  {
    uso: 'Mueble lacado blanco',
    madera: 'MDF, DM hidrófugo o tablero bien sellado',
    acabadoRecomendado: 'laca_poliuretano_bicomponente',
    porQue: 'Es el sistema que da el blanco más serio, duro y lavable si buscas resultado de carpintería.',
    preparacion:
      'Masillado, tapaporos o fondo PU, lijado fino 320-400 y aplicación a pistola en ambiente controlado.',
    numCapas: '2-3 capas',
    imagenURL: 'https://img.youtube.com/vi/lDtDvZD42UE/hqdefault.jpg',
  },
];

// ── 3. Errores comunes ─────────────────────────────────────────

export type VarnishCommonMistake = {
  error: string;
  consecuencia: string;
  solucion: string;
  imagenURL: string;
};

export const VARNISH_COMMON_MISTAKES: VarnishCommonMistake[] = [
  {
    error: 'Aplicar la segunda capa sin lijar ni matizar cuando el sistema lo necesita',
    consecuencia:
      'Mala adherencia, tacto áspero y riesgo de cascarilla o descuelgue entre manos.',
    solucion:
      'Respeta la ventana de repintado y matiza con grano 240-320, luego elimina el polvo antes de seguir.',
    imagenURL: 'https://img.youtube.com/vi/aLe3AMYCgM4/hqdefault.jpg',
  },
  {
    error: 'Usar rodillo de espuma con poliuretano al disolvente',
    consecuencia:
      'Se generan burbujas, cráteres y una piel muy fea que luego cuesta corregir.',
    solucion:
      'Usa brocha de calidad, rodillo adecuado para esmaltes/barnices o pistola, según el producto.',
    imagenURL: 'https://img.youtube.com/vi/m2NRRbDd0-w/hqdefault.jpg',
  },
  {
    error: 'Barnizar con humedad alta o con frío por debajo de unos 10 °C',
    consecuencia:
      'Secado pobre, velados, blanqueos, pegajosidad y curado muy lento.',
    solucion:
      'Trabaja idealmente entre 12 y 25 °C, con soporte seco y humedad ambiente razonable.',
    imagenURL: 'https://img.youtube.com/vi/CJ6urZNPjPM/hqdefault.jpg',
  },
  {
    error: 'No tapar poros en maderas abiertas como roble o fresno antes de lacar',
    consecuencia:
      'El acabado se hunde, salen rechupados y el tacto queda poco fino.',
    solucion:
      'Aplica fondo tapaporos o un sistema de poro cerrado y lija hasta nivelar antes del acabado final.',
    imagenURL: 'https://img.youtube.com/vi/L6eFPeUzsEE/hqdefault.jpg',
  },
  {
    error: 'Poner poliuretano al agua sobre base aceite sin sellar ni comprobar compatibilidad',
    consecuencia: 'Rechazo, arrugado, mala adherencia o secado eterno.',
    solucion:
      'Haz siempre prueba previa y, si cambias de familia, sella o aísla con el sistema recomendado por el fabricante.',
    imagenURL: 'https://img.youtube.com/vi/bGpQt8IjR3k/hqdefault.jpg',
  },
  {
    error: 'Usar un barniz interior normal en exterior',
    consecuencia:
      'El sol lo destruye: pierde brillo, cuartea, amarillea y acaba pelándose.',
    solucion:
      'En exterior usa lasur, marino o sistema exterior con protección UV real.',
    imagenURL: 'https://img.youtube.com/vi/rzaSSMRepyk/hqdefault.jpg',
  },
  {
    error: 'Aplicar capas demasiado gruesas "para terminar antes"',
    consecuencia:
      'Descuelgues, piel de naranja, marcas de brocha y curado deficiente por dentro.',
    solucion:
      'Da capas finas y controladas. Mejor tres manos bien puestas que una mano gorda.',
    imagenURL: 'https://img.youtube.com/vi/hQ2Mey_gGjM/hqdefault.jpg',
  },
  {
    error: 'No remover el producto antes y durante la aplicación',
    consecuencia:
      'Brillos irregulares, mate mal repartido y color poco uniforme en tintados o lasures.',
    solucion:
      'Remueve despacio hasta homogeneizar, sin batir como si fuera un batido.',
    imagenURL: 'https://img.youtube.com/vi/NOpbimO92Xs/hqdefault.jpg',
  },
  {
    error: 'No respetar el curado total antes de usar la pieza',
    consecuencia:
      'Aparecen marcas por peso, huellas, vasos pegados o arañazos prematuros.',
    solucion:
      'Aunque al tacto parezca seco, espera los días de curado real antes de cargar o limpiar fuerte.',
    imagenURL: 'https://img.youtube.com/vi/kfLarUOAHUw/hqdefault.jpg',
  },
  {
    error: 'Reutilizar brocha, rodillo o filtro con producto endurecido o contaminado',
    consecuencia:
      'Pelos, grumos, rayas y suciedad incrustada en la película.',
    solucion:
      'Usa herramienta limpia y, en acabados finos, no te juegues el resultado por ahorrar una brocha.',
    imagenURL: 'https://img.youtube.com/vi/3Lg7xhzKEDw/hqdefault.jpg',
  },
];

// ── 4. Marcas disponibles en España ────────────────────────────

export type VarnishBrandLevel =
  | 'premium'
  | 'profesional'
  | 'media'
  | 'básica';

export type VarnishBrand = {
  marca: string;
  pais: string;
  nivel: VarnishBrandLevel;
  dondeComprar: string[];
  especialidad: string;
  gama: string;
  imagenLogo: string | null;
};

export const VARNISH_BRANDS: VarnishBrand[] = [
  {
    marca: 'Titan',
    pais: 'España',
    nivel: 'media',
    dondeComprar: [
      'Leroy Merlin',
      'Amazon',
      'ferretería',
      'tienda de pintura',
    ],
    especialidad: 'Barnices DIY, esmaltes y mantenimiento doméstico.',
    gama: 'Titanlux Barniz al Agua, Barniz Sintético, Esmalte Sintético y Esmalte al Agua Ecológico.',
    imagenLogo: 'https://logo.clearbit.com/titanlux.es',
  },
  {
    marca: 'Xylazel',
    pais: 'España',
    nivel: 'media',
    dondeComprar: [
      'Leroy Merlin',
      'ferretería',
      'Amazon',
      'tienda de pintura',
    ],
    especialidad:
      'Protección exterior, lasures, aceites para teca y tratamientos para madera.',
    gama: 'Lasur Hidrofugante, Aceite para Teca, Barniz Universal, gama Plus Decora.',
    imagenLogo: 'https://logo.clearbit.com/xylazel.com',
  },
  {
    marca: 'Bondex',
    pais: 'Dinamarca',
    nivel: 'media',
    dondeComprar: [
      'Leroy Merlin',
      'Brico Depôt',
      'Amazon',
      'tienda de pintura',
    ],
    especialidad: 'Lasures y protectores exteriores de mantenimiento sencillo.',
    gama: 'Bondex Protector Classic, Bondex ADN, fondos y tratamientos para madera.',
    imagenLogo: 'https://logo.clearbit.com/bondex.com',
  },
  {
    marca: 'V33',
    pais: 'Francia',
    nivel: 'media',
    dondeComprar: [
      'Leroy Merlin',
      'Amazon',
      'ferretería',
      'tienda de bricolaje',
    ],
    especialidad:
      'Barnices de interior, parquet y soluciones exteriores muy enfocadas a usuario doméstico.',
    gama: 'Barniz Parquet Ultra Resistente, Agua-Protect, lasures y aceites.',
    imagenLogo: 'https://logo.clearbit.com/v33.es',
  },
  {
    marca: 'Blanchon',
    pais: 'Francia',
    nivel: 'premium',
    dondeComprar: [
      'Amazon',
      'distribuidor parquet',
      'tienda profesional',
      'almacén de pintura',
    ],
    especialidad:
      'Parquet, aceites duros, vitrificadores y mantenimiento profesional de madera.',
    gama: 'Vitrificadores de parquet, aceites hardwax, fondos y sistemas de renovación.',
    imagenLogo: 'https://logo.clearbit.com/blanchon.com',
  },
  {
    marca: 'Osmo',
    pais: 'Alemania',
    nivel: 'premium',
    dondeComprar: [
      'Amazon',
      'distribuidor oficial',
      'ferretería especializada',
      'tienda profesional',
    ],
    especialidad:
      'Aceites y ceras duras para interior, encimeras, suelos y madera maciza.',
    gama: 'Polyx-Oil, TopOil, tintes hardwax y acabados naturales.',
    imagenLogo: 'https://logo.clearbit.com/osmo.de',
  },
  {
    marca: 'Rubio Monocoat',
    pais: 'Bélgica',
    nivel: 'premium',
    dondeComprar: [
      'distribuidor oficial',
      'tienda parquet',
      'Amazon',
      'tienda profesional',
    ],
    especialidad:
      'Aceites monocapa coloreados y sistemas de mantenimiento natural.',
    gama: 'Oil Plus 2C, Precolor Easy, SheenPlus y mantenimiento certificado food contact.',
    imagenLogo: 'https://logo.clearbit.com/rubiomonocoat.com',
  },
  {
    marca: 'Sikkens Cetol',
    pais: 'Países Bajos',
    nivel: 'premium',
    dondeComprar: [
      'distribuidor Procolor',
      'tienda profesional',
      'almacén de pintura',
      'carpintería técnica',
    ],
    especialidad:
      'Lasures y sistemas exteriores de alta duración para carpintería de madera.',
    gama: 'Cetol HLS Plus, Cetol Novatech Next, Cetol Filter 7, Cetol BL.',
    imagenLogo: 'https://logo.clearbit.com/sikkens-wood-coatings.com',
  },
  {
    marca: 'Sayerlack',
    pais: 'Italia',
    nivel: 'profesional',
    dondeComprar: [
      'Amazon',
      'distribuidor industrial',
      'tienda profesional',
      'almacén de barnices',
    ],
    especialidad: 'Lacas nitro, poliuretanos, tintes y sistemas de taller.',
    gama: 'Acabados nitro, fondos y lacas poliuretano para mueble y carpintería interior.',
    imagenLogo: 'https://logo.clearbit.com/sayerlack.it',
  },
  {
    marca: 'Bruguer',
    pais: 'España',
    nivel: 'media',
    dondeComprar: [
      'Leroy Merlin',
      'ferretería',
      'Amazon',
      'gran superficie',
    ],
    especialidad:
      'Pinturas, esmaltes y algunos protectores para madera orientados a bricolaje.',
    gama: 'Lasur Extra Aquatech, laca para puertas, esmaltes multisuperficie y barnices decorativos.',
    imagenLogo: 'https://logo.clearbit.com/bruguer.es',
  },
  {
    marca: 'Procolor',
    pais: 'España',
    nivel: 'profesional',
    dondeComprar: [
      'distribuidor oficial',
      'almacén de pintura',
      'tienda profesional',
      'ferretería industrial',
    ],
    especialidad:
      'Sistemas profesionales de pintura y madera, incluido el entorno Cetol.',
    gama: 'Procobar, Cetol by Sikkens, soluciones para carpintería y mantenimiento profesional.',
    imagenLogo: 'https://logo.clearbit.com/procolor.es',
  },
  {
    marca: 'Liberon',
    pais: 'Francia',
    nivel: 'media',
    dondeComprar: [
      'Amazon',
      'ferretería',
      'tienda de restauración',
      'bricolaje especializado',
    ],
    especialidad:
      'Restauración, ceras, goma laca, aceites y productos de ebanistería.',
    gama: 'Acabado a la Antigua, Barniz Ebanistería, ceras y aceites tradicionales.',
    imagenLogo: 'https://logo.clearbit.com/liberon.es',
  },
  {
    marca: 'Barpimo',
    pais: 'España',
    nivel: 'profesional',
    dondeComprar: [
      'tienda de pintura',
      'distribuidor profesional',
      'ferretería',
      'Amazon',
    ],
    especialidad:
      'Barnices, esmaltes, tratamientos para madera y soluciones técnicas.',
    gama: 'Barnices para madera, sistemas técnicos, imprimaciones y acabados industriales.',
    imagenLogo: 'https://logo.clearbit.com/barpimo.com',
  },
  {
    marca: 'Milesi',
    pais: 'Italia',
    nivel: 'profesional',
    dondeComprar: [
      'distribuidor industrial',
      'tienda profesional',
      'carpintería industrial',
      'almacén de pintura',
    ],
    especialidad:
      'Sistemas completos para mueble y carpintería: nitro, PU, agua, exterior e ignífugos.',
    gama: 'Barnices para madera, soluciones de resistencia mecánica, química, exterior y fuego.',
    imagenLogo: 'https://logo.clearbit.com/milesi.com',
  },
];

// ── Helpers ─────────────────────────────────────────────────────

export function getVarnishTypeById(id: string): VarnishType | undefined {
  return VARNISH_TYPES.find((v) => v.id === id);
}

export function varnishesForUse(use: string): VarnishType[] {
  const lower = use.toLowerCase();
  return VARNISH_TYPES.filter((v) =>
    v.mejorPara.some((m) => m.toLowerCase().includes(lower)),
  );
}

export function varnishBrandsByLevel(
  level: VarnishBrandLevel,
): VarnishBrand[] {
  return VARNISH_BRANDS.filter((b) => b.nivel === level);
}
