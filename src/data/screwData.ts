// ═══════════════════════════════════════════════════════════════
// SCREW DATA — enciclopedia de tornillos, selección rápida,
// errores comunes y marcas en España.
// ───────────────────────────────────────────────────────────────
// Fuente: ChatGPT research 2026-04. 4 secciones:
//   1. Tipos de tornillo (18)
//   2. Tabla selección rápida por material (12)
//   3. Errores comunes (10)
//   4. Marcas disponibles en España (13)
// ═══════════════════════════════════════════════════════════════

// ── 1. Tipos de tornillo ───────────────────────────────────────

export type ExtractionStrength = 'baja' | 'media' | 'alta';

export type ScrewType = {
  id: string;
  nombre: string;
  nombreEN: string;
  imagenURL: string;
  diagramaURL: string;
  descripcion: string;
  porQueEsMejor: string;
  material: string;
  cabeza: string;
  rosca: string;
  punta: string;
  diametrosComunes: string[];
  longitudesComunes: string[];
  mejorPara: string[];
  evitarEn: string[];
  fuerzaExtraccion: ExtractionStrength;
  necesitaPretaladro: boolean;
  parConApriete: string;
  marcasRecomendadas: string[];
  precioOrientativo: string;
  videoYT: string;
};

export const SCREW_TYPES: ScrewType[] = [
  {
    id: 'tornillo_madera_din97',
    nombre: 'Tornillo para madera estándar (DIN 97)',
    nombreEN: 'Classic slotted wood screw (DIN 97)',
    imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wood_screw.jpg',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Wood%20screw%20with%20legend.svg',
    descripcion: 'Es el tornillo clásico para madera, con cabeza avellanada ranurada y rosca pensada para penetrar en fibra. Hoy se usa sobre todo en restauración, herrajes tradicionales y trabajos donde importa el aspecto clásico más que la velocidad de montaje.',
    porQueEsMejor: 'Es el mejor cuando buscas estética tradicional y un asiento limpio en avellanado. Su caña parcial ayuda a arrastrar la primera pieza contra la segunda.',
    material: 'Acero zincado o inoxidable A2',
    cabeza: 'Avellanada ranurada',
    rosca: 'Parcial',
    punta: 'Con punta',
    diametrosComunes: ['2.5mm', '3mm', '3.5mm', '4mm', '4.5mm', '5mm'],
    longitudesComunes: ['12mm', '16mm', '20mm', '25mm', '30mm', '40mm'],
    mejorPara: ['madera blanda', 'herrajes clásicos', 'restauración', 'latón/inox visto'],
    evitarEn: ['MDF en canto', 'melamina', 'montaje rápido en serie', 'uniones estructurales modernas'],
    fuerzaExtraccion: 'media',
    necesitaPretaladro: true,
    parConApriete: '1.5–3 N·m',
    marcasRecomendadas: ['Fabory', 'Index', 'Würth', 'Celo'],
    precioOrientativo: '8–18 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=IScxhX6i9w8',
  },
  {
    id: 'tornillo_aglomerado_melamina',
    nombre: 'Tornillo para aglomerado / melamina',
    nombreEN: 'Chipboard / melamine screw',
    imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wood_screw.jpg',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20head%20types.png',
    descripcion: 'Es el tornillo estándar moderno para tableros aglomerados y melaminas. Rosca ancha, punta viva, cabeza avellanada.',
    porQueEsMejor: 'En tablero aglomerado la rosca ancha muerde más material débil y mejora la resistencia al arrancamiento. La cabeza avellanada queda enrasada.',
    material: 'Acero zincado, bicromatado o recubrimiento lubricado',
    cabeza: 'Avellanada PZ/TX',
    rosca: 'Total o parcial',
    punta: 'Con punta',
    diametrosComunes: ['3mm', '3.5mm', '4mm', '4.5mm', '5mm', '6mm'],
    longitudesComunes: ['16mm', '20mm', '25mm', '30mm', '35mm', '40mm', '50mm'],
    mejorPara: ['tablero', 'aglomerado', 'melamina', 'contrachapado'],
    evitarEn: ['MDF en canto sin pretaladro', 'exterior sin inox', 'cargas estructurales altas'],
    fuerzaExtraccion: 'media',
    necesitaPretaladro: false,
    parConApriete: '2–4 N·m',
    marcasRecomendadas: ['Spax', 'Celo', 'Index', 'Würth', 'Mustad'],
    precioOrientativo: '4–10 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=7bvLKifgeug',
  },
  {
    id: 'tornillo_spax_cut_moderno',
    nombre: 'Tornillo SPAX tipo CUT / 4CUT',
    nombreEN: 'Modern CUT-point wood screw',
    imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wood_screw.jpg',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20thread%20geometry-diagram.png',
    descripcion: 'El tornillo universal moderno de referencia: punta de corte, lubricación y geometría para atornillar rápido. Evita pretaladro y reduce rajado.',
    porQueEsMejor: 'El mejor todoterreno: la punta corta fibras en vez de abrirlas, entra con menos par y menos fisuras.',
    material: 'Acero endurecido con recubrimiento WIROX o similar',
    cabeza: 'Avellanada TX',
    rosca: 'Total o parcial',
    punta: 'CUT / 4CUT',
    diametrosComunes: ['3mm', '3.5mm', '4mm', '4.5mm', '5mm', '6mm'],
    longitudesComunes: ['16mm', '20mm', '25mm', '30mm', '40mm', '50mm', '60mm', '80mm'],
    mejorPara: ['madera blanda', 'tablero', 'contrachapado', 'OSB', 'uso general'],
    evitarEn: ['terraza sin inox', 'ambiente marino si no es A4', 'confirmat de mueble'],
    fuerzaExtraccion: 'alta',
    necesitaPretaladro: false,
    parConApriete: '2–6 N·m',
    marcasRecomendadas: ['Spax', 'Heco', 'Würth', 'Celo', 'Mustad'],
    precioOrientativo: '4–12 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=IScxhX6i9w8',
  },
  {
    id: 'tornillo_mdf',
    nombre: 'Tornillo para MDF',
    nombreEN: 'MDF screw',
    imagenURL: 'https://www.wuerth.com/web/media/images/variant/500Wx500H/027743_500Wx500H.jpg',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20thread%20geometry-diagram.png',
    descripcion: 'Geometría adaptada a MDF: punta perforante y cabeza que no abomba. Para material homogéneo pero frágil al borde.',
    porQueEsMejor: 'Reduce el efecto cuña que abre el canto y genera bultos. Rosca optimizada para fibras finas y densas.',
    material: 'Acero endurecido zincado',
    cabeza: 'Avellanada TX',
    rosca: 'Total o parcial',
    punta: 'Perforante / antiraja',
    diametrosComunes: ['3.5mm', '4mm', '4.5mm', '5mm'],
    longitudesComunes: ['20mm', '25mm', '30mm', '35mm', '40mm', '50mm'],
    mejorPara: ['MDF', 'MDF lacado', 'tableros densos', 'herrajes sobre MDF'],
    evitarEn: ['estructura pesada', 'terraza exterior', 'madera maciza gruesa'],
    fuerzaExtraccion: 'alta',
    necesitaPretaladro: false,
    parConApriete: '2–4 N·m',
    marcasRecomendadas: ['Würth', 'Spax', 'Heco', 'Celo', 'Mustad'],
    precioOrientativo: '8–18 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=7bvLKifgeug',
  },
  {
    id: 'tirafondo_din571',
    nombre: 'Tirafondo hexagonal (DIN 571)',
    nombreEN: 'Hex head lag screw (DIN 571)',
    imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Din_571.jpg/120px-Din_571.jpg',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20head%20types.png',
    descripcion: 'Hexagonal clásico para estructuras de madera, postes, vigas, soportes y tacos. Se aprieta con llave.',
    porQueEsMejor: 'Su cabeza hexagonal transmite mucho par sin dañar la impronta y permite comprimir piezas gruesas.',
    material: 'Acero zincado o inoxidable A2',
    cabeza: 'Hexagonal',
    rosca: 'Parcial',
    punta: 'Con punta',
    diametrosComunes: ['6mm', '8mm', '10mm', '12mm'],
    longitudesComunes: ['40mm', '50mm', '60mm', '80mm', '100mm', '120mm', '160mm'],
    mejorPara: ['estructura pesada', 'madera maciza', 'anclaje con taco', 'herrajes estructurales'],
    evitarEn: ['tablero fino', 'melamina vista', 'muebles delicados'],
    fuerzaExtraccion: 'alta',
    necesitaPretaladro: true,
    parConApriete: '10–40 N·m',
    marcasRecomendadas: ['Index', 'Celo', 'Würth', 'Fischer', 'Fabory'],
    precioOrientativo: '10–30 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=7bvLKifgeug',
  },
  {
    id: 'autorroscante_chapa_madera',
    nombre: 'Autorroscante para chapa en madera',
    nombreEN: 'Sheet-metal self-tapping screw into wood',
    imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Skruvar_part3.jpg',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20head%20types.png',
    descripcion: 'Para fijar herraje metálico, chapa fina o cerradura sobre madera. Cabeza pan, lenteja o avellanada.',
    porQueEsMejor: 'La rosca completa aprieta de forma constante el herraje. Cabeza pan/lenteja reparte la presión sin deformar.',
    material: 'Acero zincado, bicromatado o inoxidable',
    cabeza: 'Pan / lenteja / avellanada',
    rosca: 'Total',
    punta: 'Autorroscante',
    diametrosComunes: ['3mm', '3.5mm', '4mm', '4.2mm', '4.8mm'],
    longitudesComunes: ['9.5mm', '13mm', '16mm', '19mm', '25mm', '32mm'],
    mejorPara: ['herraje metálico', 'cerraduras', 'bisagras especiales', 'chapa fina sobre madera'],
    evitarEn: ['unión madera-madera estructural', 'terraza exterior sin inox', 'canto de MDF'],
    fuerzaExtraccion: 'media',
    necesitaPretaladro: false,
    parConApriete: '1–3 N·m',
    marcasRecomendadas: ['Mustad', 'Würth', 'Celo', 'Index', 'Fischer'],
    precioOrientativo: '5–12 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=7bvLKifgeug',
  },
  {
    id: 'allen_cilindrica_herrajes',
    nombre: 'Tornillo cilíndrico Allen',
    nombreEN: 'Hex socket cap screw',
    imagenURL: 'https://www.fabory.com/medias/Primary-media-51051-300Wx300H-0-DIN912STST.webp',
    diagramaURL: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Socket_head_cap_screw.png',
    descripcion: 'Tornillo métrico para insertos, tuercas embutidas o barriletes. Común en mueble desmontable.',
    porQueEsMejor: 'Unión desmontable y repetible con rosca metálica. Cabeza cilíndrica Allen transmite mucho par en poco espacio.',
    material: 'Acero 8.8, zincado o inoxidable A2',
    cabeza: 'Cilíndrica Allen',
    rosca: 'Métrica',
    punta: 'Sin punta',
    diametrosComunes: ['M4', 'M5', 'M6', 'M8'],
    longitudesComunes: ['12mm', '16mm', '20mm', '25mm', '30mm', '40mm', '50mm'],
    mejorPara: ['herrajes', 'insertos roscados', 'mueble desmontable', 'patas con tuerca'],
    evitarEn: ['roscado directo en madera sin inserto', 'MDF sin casquillo', 'exterior sin inox'],
    fuerzaExtraccion: 'alta',
    necesitaPretaladro: true,
    parConApriete: '3–15 N·m',
    marcasRecomendadas: ['Fabory', 'Würth', 'Index', 'Celo'],
    precioOrientativo: '8–20 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=8XG2Fv_NWtQ',
  },
  {
    id: 'pocket_hole_kreg',
    nombre: 'Tornillo pocket hole (Kreg)',
    nombreEN: 'Pocket hole screw',
    imagenURL: 'https://www.kregtool.com/dw/image/v2/BDZM_PRD/on/demandware.static/-/Sites-master-kreg/default/dw86755908/images/hi-res/SPS-F075-01.jpg?sh=140&sw=140',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20head%20types.png',
    descripcion: 'Tornillo para uniones inclinadas tipo pocket hole. Cabeza washer para no hundirse en el bolsillo.',
    porQueEsMejor: 'Cabeza ancha que empuja como arandela y hace tope. Rosca gruesa para blandas/MDF, fina para duras.',
    material: 'Acero zincado o inox',
    cabeza: 'Washer / Maxi-Loc',
    rosca: 'Total, gruesa o fina',
    punta: 'Autoperforante',
    diametrosComunes: ['3.8mm', '4mm', '4.2mm'],
    longitudesComunes: ['25mm', '32mm', '38mm', '50mm', '64mm'],
    mejorPara: ['unión rápida de muebles', 'marcos', 'frentes', 'MDF', 'contrachapado'],
    evitarEn: ['canto visto sin plantilla', 'exterior sin inox', 'invisible por ambas caras'],
    fuerzaExtraccion: 'alta',
    necesitaPretaladro: false,
    parConApriete: '2–4 N·m',
    marcasRecomendadas: ['Kreg', 'Milescraft', 'Würth', 'Spax', 'Celo'],
    precioOrientativo: '8–20 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=Y6-cTMmEsa8',
  },
  {
    id: 'hanger_bolt_doble_rosca',
    nombre: 'Tornillo doble rosca / hanger bolt',
    nombreEN: 'Hanger bolt / double-ended screw',
    imagenURL: 'https://www.harfington.com/cdn/shop/files/ux_f22041400ux0455_ux_d01_1800x1800.jpg?v=1764282494',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20thread%20forms.png',
    descripcion: 'Rosca madera en un extremo y rosca métrica en el otro. Para patas de mesa, niveladores, uniones desmontables.',
    porQueEsMejor: 'Fijación centrada, desmontable y más fiable que roscar una varilla cualquiera en madera.',
    material: 'Acero zincado o inoxidable',
    cabeza: 'Sin cabeza',
    rosca: 'Doble: madera + métrica',
    punta: 'Con punta en lado madera',
    diametrosComunes: ['M6', 'M8', 'M10'],
    longitudesComunes: ['40mm', '50mm', '60mm', '80mm', '100mm'],
    mejorPara: ['patas de mesa', 'niveladores', 'mueble desmontable', 'accesorios roscados'],
    evitarEn: ['tablero muy fino', 'MDF sin inserto', 'cargas excéntricas sin pletina'],
    fuerzaExtraccion: 'alta',
    necesitaPretaladro: true,
    parConApriete: '4–10 N·m',
    marcasRecomendadas: ['Marcopol', 'Index', 'Würth', 'Celo', 'Häfele'],
    precioOrientativo: '15–40 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=ZSfQSnfjTOg',
  },
  {
    id: 'confirmat_7x50',
    nombre: 'Confirmat / tornillo de mueble (7×50)',
    nombreEN: 'Confirmat furniture screw',
    imagenURL: 'https://assets.gtv.com.pl/thumbnails/photos/product/7719/image-thumb__7719__B2B_full/WK-CF0750-01.fc9d99bc.jpg',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Confirmat%20%D0%B0ssembly%20drawing.svg',
    descripcion: 'Tornillo típico de mueble modular para unir tableros a 90°. Cuerpo grueso, rosca para tablero.',
    porQueEsMejor: 'Da carcasa más rígida y predecible que un tirafondo fino en canto de aglomerado/MDF.',
    material: 'Acero zincado',
    cabeza: 'Avellanada/cilíndrica Allen o PZ',
    rosca: 'Confirmat',
    punta: 'Sin punta agresiva',
    diametrosComunes: ['5mm', '6.3mm', '7mm'],
    longitudesComunes: ['40mm', '50mm', '60mm', '70mm'],
    mejorPara: ['melamina', 'aglomerado', 'MDF', 'mueble modular'],
    evitarEn: ['madera maciza fina', 'uniones visibles de alta gama', 'sin broca específica'],
    fuerzaExtraccion: 'alta',
    necesitaPretaladro: true,
    parConApriete: '3–5 N·m',
    marcasRecomendadas: ['GTV', 'Häfele', 'Würth', 'Hettich', 'Index'],
    precioOrientativo: '8–16 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=hTL2_kOH9Qg',
  },
  {
    id: 'tornillo_bisagra_cazoleta_3516',
    nombre: 'Tornillo bisagra de cazoleta (3.5×16)',
    nombreEN: 'Cabinet hinge screw 3.5×16',
    imagenURL: 'https://fixfit.co.uk/cdn/shop/files/hinge-black-screw-onyx-blacks-cabinet-hinge-3.5x16.jpg?v=1714341973&width=1946',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20head%20types.png',
    descripcion: 'Tornillo pequeño para bisagras, placas y herrajes ligeros a tablero de 16–19 mm.',
    porQueEsMejor: 'Ø3.5 encaja con herrajes europeos y 16 mm sujeta sin atravesar tableros estándar.',
    material: 'Acero zincado, niquelado o negro',
    cabeza: 'Avellanada / especial herraje',
    rosca: 'Total',
    punta: 'Con punta',
    diametrosComunes: ['3mm', '3.5mm', '4mm'],
    longitudesComunes: ['12mm', '14mm', '16mm', '18mm'],
    mejorPara: ['bisagras de cazoleta', 'placas', 'correderas', 'herrajes ligeros'],
    evitarEn: ['cargas estructurales', 'madera exterior', 'tablero < 12 mm'],
    fuerzaExtraccion: 'media',
    necesitaPretaladro: false,
    parConApriete: '0.8–1.8 N·m',
    marcasRecomendadas: ['Blum', 'Hettich', 'Würth', 'FixFit', 'Häfele'],
    precioOrientativo: '3–8 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=8XG2Fv_NWtQ',
  },
  {
    id: 'tornillo_terraza_exterior_a2_a4',
    nombre: 'Tornillo terraza / exterior (inox A2/A4)',
    nombreEN: 'Decking screw stainless A2/A4',
    imagenURL: 'https://api.spaxpacific.com/uploads/decking_screw_a2_a112ab418d_8d2b083c14.webp',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/WoodDeck-9912.jpg',
    descripcion: 'Inoxidable para tarima exterior. A2 general, A4 para ambientes marinos. Punta de corte y cabeza reducida.',
    porQueEsMejor: 'Resiste corrosión, reduce manchas y rajados, acabado limpio en tarimas vistas.',
    material: 'Acero inoxidable A2 o A4',
    cabeza: 'Avellanada pequeña / reducida',
    rosca: 'Parcial o doble tramo',
    punta: 'CUT / autoperforante suave',
    diametrosComunes: ['4mm', '4.5mm', '5mm', '5.5mm'],
    longitudesComunes: ['40mm', '50mm', '60mm', '70mm', '80mm'],
    mejorPara: ['exterior', 'terraza', 'madera tratada', 'cercos exteriores'],
    evitarEn: ['interior económico', 'estructura sin homologación', 'A2 en ambiente marino'],
    fuerzaExtraccion: 'alta',
    necesitaPretaladro: false,
    parConApriete: '3–6 N·m',
    marcasRecomendadas: ['Spax', 'Heco', 'Simpson Strong-Tie', 'Rothoblaas', 'Mustad'],
    precioOrientativo: '18–45 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=7bvLKifgeug',
  },
  {
    id: 'tornillo_estructural_sdws',
    nombre: 'Tornillo estructural SDWS',
    nombreEN: 'Structural wood screw',
    imagenURL: 'https://www.strongtie.co.uk/sites/default/files/styles/media_product_image_detail/public/field_media_image_7/2024/06/19/050128/f-sdw22500-r50e-3d-cad-mult-prod.png?itok=T8sLdWiv',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20thread%20forms.png',
    descripcion: 'Largo y de alta resistencia para entramado, vigas, cerchas y carpintería estructural.',
    porQueEsMejor: 'Combina resistencia a cizalla con instalación rápida. Sustituye tirafondos y parte de tornillería pasante.',
    material: 'Acero endurecido con recubrimiento estructural',
    cabeza: 'Hexagonal interna / arandela / trompeta',
    rosca: 'Parcial o total estructural',
    punta: 'Autoperforante de alta penetración',
    diametrosComunes: ['6mm', '8mm', '10mm', '12mm'],
    longitudesComunes: ['80mm', '100mm', '120mm', '160mm', '200mm', '240mm', '300mm'],
    mejorPara: ['estructura pesada', 'vigas', 'entramado', 'refuerzo estructural'],
    evitarEn: ['mueble fino', 'melamina', 'trabajos de acabado', 'sin cálculo si es crítico'],
    fuerzaExtraccion: 'alta',
    necesitaPretaladro: false,
    parConApriete: '8–30 N·m',
    marcasRecomendadas: ['Simpson Strong-Tie', 'Rothoblaas', 'Heco', 'Spax', 'Celo'],
    precioOrientativo: '40–140 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=1mTRipKpZ-I',
  },
  {
    id: 'tornillo_pladur_madera',
    nombre: 'Tornillo para pladur en montante de madera',
    nombreEN: 'Drywall screw for timber studs',
    imagenURL: 'https://productdata.hilti.com/APQ_HC_f1200/L062034.jpg',
    diagramaURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Drywall-screws-v1_%281%29.png/120px-Drywall-screws-v1_%281%29.png',
    descripcion: 'Tornillo negro de pladur con cabeza trompeta y rosca gruesa para placas de yeso a madera.',
    porQueEsMejor: 'La cabeza bugle hunde el cartón sin cortarlo y la rosca gruesa agarra bien en madera blanda.',
    material: 'Acero fosfatado negro',
    cabeza: 'Trompeta / bugle',
    rosca: 'Total gruesa',
    punta: 'Autoperforante',
    diametrosComunes: ['3.5mm', '3.9mm', '4.2mm'],
    longitudesComunes: ['25mm', '35mm', '45mm', '55mm', '70mm'],
    mejorPara: ['pladur', 'panel yeso', 'OSB fino a montante', 'trabajo rápido en seco'],
    evitarEn: ['mueble', 'uniones estructurales', 'exterior', 'herraje visto'],
    fuerzaExtraccion: 'media',
    necesitaPretaladro: false,
    parConApriete: '2–4 N·m',
    marcasRecomendadas: ['Hilti', 'Knauf', 'Würth', 'Celo', 'Fischer'],
    precioOrientativo: '4–12 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=U-RuPfVm02c',
  },
  {
    id: 'tornillo_suelo_madera',
    nombre: 'Tornillo para suelos de madera',
    nombreEN: 'Flooring screw',
    imagenURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/WoodDeck-9912.jpg',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20thread%20geometry-diagram.png',
    descripcion: 'Para tarima interior con cabeza pequeña y tramo de fijación especial. Fija sin levantar fibra.',
    porQueEsMejor: 'Cabeza discreta, reduce juegos y crujidos, mejora estabilidad a largo plazo.',
    material: 'Acero endurecido WIROX/zincado o inoxidable',
    cabeza: 'Mini avellanada / reducida',
    rosca: 'Parcial o tramo de fijación',
    punta: 'CUT / autoavellanante',
    diametrosComunes: ['3.5mm', '4mm', '4.5mm', '5mm'],
    longitudesComunes: ['35mm', '40mm', '45mm', '50mm', '60mm'],
    mejorPara: ['suelos de madera', 'tarima interior', 'reparación de crujidos', 'OSB a rastrel'],
    evitarEn: ['muebles finos', 'melamina', 'exterior costero sin inox'],
    fuerzaExtraccion: 'alta',
    necesitaPretaladro: false,
    parConApriete: '2.5–5 N·m',
    marcasRecomendadas: ['Spax', 'Heco', 'Würth', 'Rothoblaas', 'Celo'],
    precioOrientativo: '10–24 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=IScxhX6i9w8',
  },
  {
    id: 'clavo_brad_18g',
    nombre: 'Clavo brad 18G',
    nombreEN: '18 gauge brad nail',
    imagenURL: 'https://www.rapid.com/en-gw/products/rapid-tools/stapling/rapid-no--8-brad-nail-30-mm5/',
    diagramaURL: 'https://www.rapid.com/product/pictogram/600_logo-6ee8bb18eb6e96e294c2175644b76ea7/jpg',
    descripcion: 'Clavo fino para clavadora de acabado. Para molduras, tapetas y traseras ligeras. Marca mínima.',
    porQueEsMejor: 'Rapidez y mínima marca visible. Abre menos fibra y deja agujero muy pequeño.',
    material: 'Acero galvanizado',
    cabeza: 'Sin cabeza / microcabeza',
    rosca: 'Sin rosca',
    punta: 'Aguda',
    diametrosComunes: ['1.0mm', '1.2mm'],
    longitudesComunes: ['15mm', '20mm', '25mm', '30mm', '35mm', '40mm', '50mm'],
    mejorPara: ['molduras', 'tapetas', 'marcos ligeros', 'acabados'],
    evitarEn: ['carga estructural', 'estanterías', 'tracción'],
    fuerzaExtraccion: 'baja',
    necesitaPretaladro: false,
    parConApriete: 'no aplica',
    marcasRecomendadas: ['Rapid', 'Tacwise', 'Senco', 'DeWalt', 'Makita'],
    precioOrientativo: '4–8 €/1000–2000 uds',
    videoYT: 'https://www.youtube.com/watch?v=mGe1i4L8EiA',
  },
  {
    id: 'clavo_acabado_16g',
    nombre: 'Clavo de acabado 16G',
    nombreEN: '16 gauge finish nail',
    imagenURL: 'https://www.bostitch.com/',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20head%20types.png',
    descripcion: 'Más grueso que el brad 18G. Para molduras grandes, zócalos y jambas.',
    porQueEsMejor: 'Cuando el 18G se queda corto. Más sección, aguanta mejor vibraciones y piezas largas.',
    material: 'Acero galvanizado',
    cabeza: 'Cabeza mínima de acabado',
    rosca: 'Sin rosca',
    punta: 'Aguda',
    diametrosComunes: ['1.4mm', '1.6mm'],
    longitudesComunes: ['25mm', '32mm', '38mm', '45mm', '50mm', '64mm'],
    mejorPara: ['zócalos', 'molduras grandes', 'tapajuntas', 'remates de puerta'],
    evitarEn: ['estructura', 'exterior sin inox', 'mucha tracción'],
    fuerzaExtraccion: 'media',
    necesitaPretaladro: false,
    parConApriete: 'no aplica',
    marcasRecomendadas: ['Bostitch', 'Senco', 'Tacwise', 'DeWalt', 'Rapid'],
    precioOrientativo: '5–12 €/1000–2500 uds',
    videoYT: 'https://www.youtube.com/watch?v=mGe1i4L8EiA',
  },
  {
    id: 'grapa_tipo_90',
    nombre: 'Grapa tipo 90',
    nombreEN: 'Type 90 narrow crown staple',
    imagenURL: 'https://www.rapid.com/en-gw/products/rapid-tools/stapling/rapid-no--90-narrow-crown-staple-35-mm/',
    diagramaURL: 'https://www.rapid.com/product/pictogram/607_logo-e87d166286c82a2bb1f4c578220b7ebc/jpg',
    descripcion: 'Grapa estrecha para fondos de cajón, traseras, panelados ligeros. Dos patas resisten mejor al giro.',
    porQueEsMejor: 'Reparte mejor la carga, sujeta piezas delgadas sin partirlas. Con cola, montaje muy eficaz.',
    material: 'Acero galvanizado o inoxidable',
    cabeza: 'Corona estrecha',
    rosca: 'Sin rosca',
    punta: 'Patas agudas',
    diametrosComunes: ['1.0mm', '1.2mm'],
    longitudesComunes: ['12mm', '16mm', '20mm', '25mm', '30mm', '35mm'],
    mejorPara: ['fondo de cajón', 'panel trasero', 'tapizado ligero', 'traseras de mueble'],
    evitarEn: ['estructura', 'tablero duro sin máquina potente', 'unión desmontable'],
    fuerzaExtraccion: 'media',
    necesitaPretaladro: false,
    parConApriete: 'no aplica',
    marcasRecomendadas: ['Rapid', 'Tacwise', 'Senco', 'Bostitch', 'BeA'],
    precioOrientativo: '4–10 €/1000–2000 uds',
    videoYT: 'https://www.youtube.com/watch?v=mGe1i4L8EiA',
  },
  {
    id: 'espiga_madera',
    nombre: 'Espiga de madera',
    nombreEN: 'Wood dowel pin',
    imagenURL: 'https://www.wolfcraft-prod.de/products/medias/cmv-300Wx300H-2905000-PRO-PHO-PRI-CPA-SQA-01-2015-01.png',
    diagramaURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cheville%20en%20bois%20%28menuiserie%29.PNG',
    descripcion: 'Espiga cilíndrica de haya como alternativa clásica al metal. Con cola para alinear y unir.',
    porQueEsMejor: 'Unión limpia, invisible, sin oxidación ni cabezas vistas. Reparto homogéneo de esfuerzos.',
    material: 'Madera de haya seca y estriada',
    cabeza: 'Sin cabeza',
    rosca: 'Sin rosca',
    punta: 'Chaflanada',
    diametrosComunes: ['6mm', '8mm', '10mm'],
    longitudesComunes: ['30mm', '35mm', '40mm', '50mm', '60mm'],
    mejorPara: ['mueble fino', 'paneles', 'cantos', 'unión invisible', 'macizo'],
    evitarEn: ['desmontable', 'sin plantilla', 'ambiente húmedo sin cola adecuada'],
    fuerzaExtraccion: 'alta',
    necesitaPretaladro: true,
    parConApriete: 'no aplica',
    marcasRecomendadas: ['Wolfcraft', 'Lamello', 'Häfele', 'Würth'],
    precioOrientativo: '3–8 €/200 uds',
    videoYT: 'https://www.youtube.com/watch?v=OJtmhrogyzU',
  },
];

// ── 2. Tabla selección rápida por material ─────────────────────

export type QuickSelection = {
  materialA: string;
  materialB: string;
  tornilloRecomendado: string;
  porQue: string;
  pretaladro: string;
  par: string;
  imagenURL: string;
};

export const QUICK_SELECTIONS: QuickSelection[] = [
  { materialA: 'MDF 16mm', materialB: 'MDF 16mm (estantería)', tornilloRecomendado: 'Confirmat 7×50', porQue: 'El confirmat trabaja muy bien en tablero denso y en uniones de carcasa a 90°.', pretaladro: 'Broca escalonada confirmat 5/7mm', par: '3–4.5 N·m', imagenURL: 'https://assets.gtv.com.pl/thumbnails/photos/product/7719/image-thumb__7719__B2B_full/WK-CF0750-01.fc9d99bc.jpg' },
  { materialA: 'Melamina 16mm', materialB: 'Melamina 16mm (cocina)', tornilloRecomendado: 'Confirmat 7×50', porQue: 'Opción más segura para laterales y baldas si el taladro está bien hecho.', pretaladro: 'Broca escalonada confirmat 5/7mm', par: '3–4 N·m', imagenURL: 'https://assets.gtv.com.pl/thumbnails/photos/product/7719/image-thumb__7719__B2B_full/WK-CF0750-01.fc9d99bc.jpg' },
  { materialA: 'Pino 18mm', materialB: 'Pino 18mm (marco)', tornilloRecomendado: 'SPAX / universal CUT 4×50 rosca parcial', porQue: 'Rosca parcial cierra mejor dos listones; punta CUT entra con poco esfuerzo.', pretaladro: 'No necesario; cerca de borde: broca 2.5–3mm', par: '3–5 N·m', imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wood_screw.jpg' },
  { materialA: 'Contrachapado 12mm', materialB: 'Listón pino (fondo cajón)', tornilloRecomendado: 'Universal 3.5×25 o grapa 90 de 20mm + cola', porQue: 'Tornillo si desmontable; grapa+cola si producción rápida.', pretaladro: 'No; cerca de borde: broca 2mm', par: '1.5–2.5 N·m', imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wood_screw.jpg' },
  { materialA: 'Roble 20mm', materialB: 'Roble 20mm (mueble macizo)', tornilloRecomendado: 'Universal premium 4.5×50 + pretaladro', porQue: 'En madera dura el piloto manda: evita roturas y reduce el par.', pretaladro: '3–3.5mm + agujero de paso en primera pieza', par: '4–6 N·m', imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wood_screw.jpg' },
  { materialA: 'Tablero OSB', materialB: 'Estructura de pino (taller)', tornilloRecomendado: 'Madera 5×60 rosca parcial', porQue: 'OSB agradece rosca agresiva y diámetro medio.', pretaladro: 'No necesario', par: '4–6 N·m', imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wood_screw.jpg' },
  { materialA: 'Tabla de terraza', materialB: 'Rastrel exterior', tornilloRecomendado: 'Inox A2/A4 terraza 5×60', porQue: 'Inox evita corrosión y manchas; cabeza discreta.', pretaladro: 'No en blandas; en duras: broca 3.5–4mm', par: '3–6 N·m', imagenURL: 'https://api.spaxpacific.com/uploads/decking_screw_a2_a112ab418d_8d2b083c14.webp' },
  { materialA: 'MDF', materialB: 'Pared (colgar estante)', tornilloRecomendado: 'Taco + tirafondo 6×70 o 8×80', porQue: 'Aquí manda la pared, no el MDF. Tornillo con taco adecuado al soporte.', pretaladro: 'Según taco: broca pared 6mm u 8mm', par: '8–15 N·m', imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Din_571.jpg/120px-Din_571.jpg' },
  { materialA: 'Herraje metálico', materialB: 'Madera (bisagra, cerradura)', tornilloRecomendado: 'Autorroscante pan head 4×16 o 4×20', porQue: 'Cabeza pan aprieta bien el herraje sin deformarlo.', pretaladro: 'No; en dura: broca 2.5–3mm', par: '1.5–3 N·m', imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Skruvar_part3.jpg' },
  { materialA: 'Pata de mesa', materialB: 'Tablero (doble rosca)', tornilloRecomendado: 'Hanger bolt M8 + placa o inserto', porQue: 'Solución desmontable con rosca métrica. Aguanta vibraciones y reaprietes.', pretaladro: '6mm aprox para M8 lado madera', par: '5–10 N·m', imagenURL: 'https://www.harfington.com/cdn/shop/files/ux_f22041400ux0455_ux_d01_1800x1800.jpg?v=1764282494' },
  { materialA: 'Rodapié', materialB: 'Pared con taco', tornilloRecomendado: 'Taco nylon + tornillo 5×60', porQue: 'Medida equilibrada; fácil de tapar con masilla o tapón.', pretaladro: 'Broca pared 6mm para taco 6', par: '4–8 N·m', imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Din_571.jpg/120px-Din_571.jpg' },
  { materialA: 'Panel trasero 3mm', materialB: 'Mueble', tornilloRecomendado: 'Grapa 90 de 12–16mm o brad 18G de 20mm', porQue: 'Para trasera fina no compensa tornillo: grapa/brad más rápido y menos riesgo.', pretaladro: 'No necesario', par: 'no aplica', imagenURL: 'https://www.rapid.com/en-gw/products/rapid-tools/stapling/rapid-no--90-narrow-crown-staple-35-mm/' },
];

// ── 3. Errores comunes ─────────────────────────────────────────

export type CommonMistake = {
  error: string;
  consecuencia: string;
  solucion: string;
  imagenURL: string;
};

export const COMMON_MISTAKES: CommonMistake[] = [
  { error: 'Usar tornillo de aglomerado normal en canto de MDF sin piloto', consecuencia: 'El canto se abre, se abomba la superficie y la unión pierde resistencia.', solucion: 'Usa tornillo para MDF o confirmat, y haz pretaladro. Controla el par.', imagenURL: 'https://www.wuerth.com/web/media/images/variant/500Wx500H/027743_500Wx500H.jpg' },
  { error: 'No pretaladrar en madera dura (roble, haya, fresno)', consecuencia: 'Se parte el tornillo, raja la pieza o entra torcido.', solucion: 'Haz piloto ajustado al núcleo y agujero de paso en la primera pieza.', imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wood_screw.jpg' },
  { error: 'Tornillo demasiado largo que atraviesa la cara vista', consecuencia: 'Estropeas la pieza y creas arista peligrosa.', solucion: 'El tornillo debe penetrar 2/3 del espesor de la segunda pieza sin salir.', imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wood_screw.jpg' },
  { error: 'Apretar de más con atornillador de impacto en tableros', consecuencia: 'Se hunde la cabeza, se pasa la rosca.', solucion: 'Usa embrague, baja el par y termina el último giro con control.', imagenURL: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Wood_screw.jpg' },
  { error: 'Usar tornillo de interior en exterior', consecuencia: 'Oxida, mancha la madera y debilita la fijación.', solucion: 'Para exterior usa inoxidable A2; en costa, A4.', imagenURL: 'https://api.spaxpacific.com/uploads/decking_screw_a2_a112ab418d_8d2b083c14.webp' },
  { error: 'Pocket holes con rosca incorrecta', consecuencia: 'En dura rajas con gruesa; en blanda/MDF la fina agarra peor.', solucion: 'Rosca gruesa para pino/contrachapado/MDF; fina para roble/haya.', imagenURL: 'https://www.kregtool.com/dw/image/v2/BDZM_PRD/on/demandware.static/-/Sites-master-kreg/default/dw86755908/images/hi-res/SPS-F075-01.jpg?sh=140&sw=140' },
  { error: 'Tornillo de pladur para muebles o uniones estructurales', consecuencia: 'Puede partir por fragilidad.', solucion: 'Reserva pladur para panel yeso. Para madera usa universal o específico.', imagenURL: 'https://productdata.hilti.com/APQ_HC_f1200/L062034.jpg' },
  { error: 'No hacer agujero de paso en primera pieza', consecuencia: 'La rosca muerde ambas piezas y no cierra bien.', solucion: 'Agujero de paso o rosca parcial para que la primera pieza deslice.', imagenURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Wood%20screw%20sidescetch%20use%20fortunate.svg' },
  { error: 'Atornillar demasiado cerca del borde', consecuencia: 'La madera raja y pierdes sujeción.', solucion: 'Aléjate del canto, usa punta CUT/4CUT o haz pretaladro.', imagenURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Wood%20screw%20sidescetch%20use%20unfortunate.svg' },
  { error: 'Usar la cabeza equivocada para el herraje', consecuencia: 'La pieza no asienta bien, baila o se deforma.', solucion: 'Sin avellanado → pan/lenteja; con avellanado → avellanada; pocket hole → washer.', imagenURL: 'https://commons.wikimedia.org/wiki/Special:FilePath/Screw%20head%20types.png' },
];

// ── 4. Marcas disponibles en España ────────────────────────────

export type ScrewBrandLevel = 'premium' | 'profesional' | 'media' | 'básica';

export type ScrewBrand = {
  marca: string;
  pais: string;
  nivel: ScrewBrandLevel;
  dondeComprar: string[];
  especialidad: string;
  gama: string;
  imagenLogo: string | null;
};

export const SCREW_BRANDS: ScrewBrand[] = [
  { marca: 'Spax', pais: 'Alemania', nivel: 'premium', dondeComprar: ['Leroy Merlin', 'Amazon', 'ferretería', 'distribuidor profesional'], especialidad: 'Tornillo universal de alto rendimiento, terraza, suelo y estructura ligera', gama: 'Universal WIROX, A2 Decking, Flooring, Construction', imagenLogo: 'https://logo.clearbit.com/spax.com' },
  { marca: 'Heco', pais: 'Alemania', nivel: 'premium', dondeComprar: ['ferretería', 'distribuidor profesional', 'Amazon'], especialidad: 'Tornillería estructural y profesional para madera maciza y construcción', gama: 'TOPIX, HECO-UNIX, HECO-TOPIX-plus', imagenLogo: 'https://logo.clearbit.com/heco-schrauben.com' },
  { marca: 'Würth', pais: 'Alemania', nivel: 'profesional', dondeComprar: ['Würth', 'distribuidor profesional', 'ferretería'], especialidad: 'Amplísima gama profesional: MDF, herraje y estructura', gama: 'ASSY, ASSY plus 4 CS MDF, tirafondos, inox', imagenLogo: 'https://logo.clearbit.com/wuerth.com' },
  { marca: 'Fischer', pais: 'Alemania', nivel: 'profesional', dondeComprar: ['Leroy Merlin', 'Amazon', 'ferretería', 'distribuidor profesional'], especialidad: 'Combinación taco + tornillo y soluciones de fijación para pared y madera', gama: 'PowerFast, DuoPower, tirafondos y anclajes', imagenLogo: 'https://logo.clearbit.com/fischer.group' },
  { marca: 'Celo', pais: 'España', nivel: 'profesional', dondeComprar: ['Amazon', 'ferretería', 'distribuidor profesional', 'tienda online CELO'], especialidad: 'Marca histórica en España; buena relación tornillo profesional y disponibilidad local', gama: 'VELOX, DIN 571, tornillos para aglomerado, estructurales', imagenLogo: 'https://logo.clearbit.com/celo.com' },
  { marca: 'Hilti', pais: 'Liechtenstein', nivel: 'premium', dondeComprar: ['Hilti', 'distribuidor profesional'], especialidad: 'Fijación profesional, pladur, anclaje y sistemas de obra', gama: 'Drywall screws, tornillería técnica, anclajes', imagenLogo: 'https://logo.clearbit.com/hilti.com' },
  { marca: 'Simpson Strong-Tie', pais: 'Estados Unidos', nivel: 'premium', dondeComprar: ['distribuidor profesional', 'ferretería técnica', 'Amazon'], especialidad: 'Conectores y tornillos estructurales homologados para carpintería de armar', gama: 'SDW, SDWS, conectores estructurales', imagenLogo: 'https://logo.clearbit.com/strongtie.com' },
  { marca: 'Rothoblaas', pais: 'Italia', nivel: 'premium', dondeComprar: ['distribuidor profesional', 'ferretería técnica'], especialidad: 'Estructura de madera, CLT, herrajes y tornillería de alto nivel', gama: 'HBS, VGZ, VGS, tornillería estructural y fachada', imagenLogo: 'https://logo.clearbit.com/rothoblaas.com' },
  { marca: 'Mustad', pais: 'Italia', nivel: 'media', dondeComprar: ['Amazon', 'ferretería', 'distribuidor profesional'], especialidad: 'Buena gama para madera, aglomerado, herrajes y exterior a precio razonable', gama: 'Panelvit Universal, Panelvit PF, Panelvit AF, Inox A2', imagenLogo: 'https://logo.clearbit.com/mustad.it' },
  { marca: 'Index', pais: 'España', nivel: 'media', dondeComprar: ['Bricomart', 'ferretería', 'distribuidor profesional', 'Amazon'], especialidad: 'Muy presente en España, fuerte en tirafondos, anclajes y fijación general', gama: 'DIN 571, tirafondos, tacos y fijación profesional', imagenLogo: 'https://logo.clearbit.com/indexfix.com' },
];

// ── Helpers ─────────────────────────────────────────────────────

export function getScrewTypeById(id: string): ScrewType | undefined {
  return SCREW_TYPES.find((s) => s.id === id);
}

export function screwsForMaterial(material: string): ScrewType[] {
  const lower = material.toLowerCase();
  return SCREW_TYPES.filter((s) =>
    s.mejorPara.some((m) => m.toLowerCase().includes(lower)),
  );
}

export function brandsByLevel(level: ScrewBrandLevel): ScrewBrand[] {
  return SCREW_BRANDS.filter((b) => b.nivel === level);
}
