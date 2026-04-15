import { ToolCategory, ToolType, ToolBrand, ToolProduct } from '../models/tools';

export const TOOL_CATEGORIES: ToolCategory[] = [
  { id: 'cut', name: 'Corte', icon: '🪚' },
  { id: 'drill', name: 'Taladro y atornillado', icon: '🔩' },
  { id: 'sand', name: 'Lijado y fresado', icon: '✨' },
  { id: 'plane', name: 'Cepillado', icon: '🪵' },
  { id: 'measure', name: 'Medición', icon: '📏' },
  { id: 'clamp', name: 'Sujeción', icon: '🔧' },
  { id: 'finish', name: 'Acabado', icon: '🎨' },
  { id: 'extract', name: 'Aspiración', icon: '💨' },
];

export const TOOL_TYPES: ToolType[] = [
  { id: 'circular_saw', categoryId: 'cut', name: 'Sierra circular', icon: '🪚' },
  { id: 'plunge_saw', categoryId: 'cut', name: 'Sierra de inmersión / carril', icon: '🪚' },
  { id: 'jigsaw', categoryId: 'cut', name: 'Sierra de calar', icon: '🪚' },
  { id: 'miter_saw', categoryId: 'cut', name: 'Sierra ingletadora', icon: '🪚' },
  { id: 'table_saw', categoryId: 'cut', name: 'Sierra de mesa', icon: '🪚' },
  { id: 'band_saw', categoryId: 'cut', name: 'Sierra de cinta', icon: '🪚' },
  { id: 'reciprocating_saw', categoryId: 'cut', name: 'Sierra de sable', icon: '🪚' },
  { id: 'multi_tool', categoryId: 'cut', name: 'Multiherramienta oscilante', icon: '🪚' },
  { id: 'drill_driver', categoryId: 'drill', name: 'Taladro atornillador', icon: '🔩' },
  { id: 'hammer_drill', categoryId: 'drill', name: 'Taladro percutor', icon: '🔩' },
  { id: 'impact_driver', categoryId: 'drill', name: 'Atornillador de impacto', icon: '🔩' },
  { id: 'drill_press', categoryId: 'drill', name: 'Taladro de columna', icon: '🔩' },
  { id: 'pocket_hole', categoryId: 'drill', name: 'Sistema pocket hole', icon: '🔩' },
  { id: 'domino_joiner', categoryId: 'drill', name: 'Fresadora de espigas (Domino)', icon: '🔩' },
  { id: 'biscuit_joiner', categoryId: 'drill', name: 'Engalletadora', icon: '🔩' },
  { id: 'orbital_sander', categoryId: 'sand', name: 'Lijadora orbital / excéntrica', icon: '✨' },
  { id: 'belt_sander', categoryId: 'sand', name: 'Lijadora de banda', icon: '✨' },
  { id: 'detail_sander', categoryId: 'sand', name: 'Lijadora de detalle', icon: '✨' },
  { id: 'router', categoryId: 'sand', name: 'Fresadora de superficie', icon: '✨' },
  { id: 'trim_router', categoryId: 'sand', name: 'Fresadora de cantos', icon: '✨' },
  { id: 'electric_planer', categoryId: 'plane', name: 'Cepillo eléctrico', icon: '🪵' },
  { id: 'benchtop_planer', categoryId: 'plane', name: 'Regruesadora', icon: '🪵' },
  { id: 'jointer_planer', categoryId: 'plane', name: 'Cepilladora-regruesadora', icon: '🪵' },
  { id: 'laser_measure', categoryId: 'measure', name: 'Metro láser', icon: '📏' },
  { id: 'laser_level', categoryId: 'measure', name: 'Nivel láser', icon: '📏' },
  { id: 'digital_caliper', categoryId: 'measure', name: 'Calibre digital', icon: '📏' },
  { id: 'moisture_meter', categoryId: 'measure', name: 'Medidor de humedad', icon: '📏' },
  { id: 'f_clamps', categoryId: 'clamp', name: 'Sargentos F', icon: '🔧' },
  { id: 'quick_clamps', categoryId: 'clamp', name: 'Sargentos rápidos', icon: '🔧' },
  { id: 'corner_clamps', categoryId: 'clamp', name: 'Sargentos de esquina', icon: '🔧' },
  { id: 'bench_vise', categoryId: 'clamp', name: 'Tornillo de banco', icon: '🔧' },
  { id: 'workbench', categoryId: 'clamp', name: 'Banco de trabajo', icon: '🔧' },
  { id: 'spray_gun', categoryId: 'finish', name: 'Pistola HVLP', icon: '🎨' },
  { id: 'nail_gun', categoryId: 'finish', name: 'Clavadora', icon: '🎨' },
  { id: 'heat_gun', categoryId: 'finish', name: 'Pistola de calor', icon: '🎨' },
  { id: 'shop_vac', categoryId: 'extract', name: 'Aspirador de taller', icon: '💨' },
  { id: 'dust_collector', categoryId: 'extract', name: 'Sistema de aspiración', icon: '💨' },

  // ── Fase 20 — tipos nuevos ──────────────────────────────────
  // Corte manual
  { id: 'hand_saw', categoryId: 'cut', name: 'Serrucho manual / japonés', icon: '🪚' },
  { id: 'saw_blade', categoryId: 'cut', name: 'Discos y hojas de sierra', icon: '🪚' },
  // Lijado / fresado
  { id: 'abrasives', categoryId: 'sand', name: 'Abrasivos y lijas', icon: '✨' },
  { id: 'router_bits', categoryId: 'sand', name: 'Fresas y accesorios de fresadora', icon: '✨' },
  { id: 'spindle_sander', categoryId: 'sand', name: 'Lijadora de bobina', icon: '✨' },
  // Cepillado manual
  { id: 'hand_plane', categoryId: 'plane', name: 'Cepillo manual', icon: '🪵' },
  // Medición
  { id: 'marking_square', categoryId: 'measure', name: 'Escuadras y falsos escuadros', icon: '📏' },
  { id: 'marking_gauge', categoryId: 'measure', name: 'Gramil y útiles de trazado', icon: '📏' },
  // Sujeción
  { id: 'guide_rail', categoryId: 'clamp', name: 'Carriles guía y plantillas', icon: '🔧' },
  // Acabado
  { id: 'brad_nailer', categoryId: 'finish', name: 'Clavadora de cuadradillo', icon: '🎨' },
];

export const TOOL_BRANDS: ToolBrand[] = [
  { id: 'parkside', name: 'Parkside', tiers: ['basic'] },
  { id: 'einhell', name: 'Einhell', tiers: ['basic', 'mid'] },
  { id: 'vevor', name: 'Vevor', tiers: ['basic'] },
  { id: 'blackdecker', name: 'Black+Decker', tiers: ['basic', 'mid'] },
  { id: 'ryobi', name: 'Ryobi', tiers: ['basic', 'mid'] },
  { id: 'worx', name: 'Worx', tiers: ['basic', 'mid'] },
  { id: 'bosch_green', name: 'Bosch Verde', tiers: ['mid'] },
  { id: 'bosch_blue', name: 'Bosch Professional', tiers: ['pro'] },
  { id: 'makita', name: 'Makita', tiers: ['mid', 'pro'] },
  { id: 'dewalt', name: 'DeWalt', tiers: ['mid', 'pro'] },
  { id: 'metabo', name: 'Metabo', tiers: ['mid', 'pro'] },
  { id: 'milwaukee', name: 'Milwaukee', tiers: ['pro'] },
  { id: 'festool', name: 'Festool', tiers: ['pro'] },
  { id: 'hikoki', name: 'HiKOKI', tiers: ['mid', 'pro'] },
  { id: 'scheppach', name: 'Scheppach', tiers: ['basic', 'mid'] },
  { id: 'kreg', name: 'Kreg', tiers: ['mid'] },
  { id: 'triton', name: 'Triton', tiers: ['mid'] },
  { id: 'stanley', name: 'Stanley', tiers: ['basic', 'mid'] },
  { id: 'mafell', name: 'Mafell', tiers: ['pro'] },
  { id: 'silverline', name: 'Silverline', tiers: ['basic'] },
  { id: 'evolution', name: 'Evolution', tiers: ['basic', 'mid'] },
  { id: 'enjoywood', name: 'Enjoywood', tiers: ['basic'] },
  { id: 'erbauer', name: 'Erbauer', tiers: ['mid'] },
  { id: 'titan', name: 'Titan', tiers: ['basic'] },
  { id: 'katsu', name: 'Katsu', tiers: ['basic'] },
  { id: 'holzmann', name: 'Holzmann', tiers: ['mid', 'pro'] },
  { id: 'proxxon', name: 'Proxxon', tiers: ['mid'] },
  { id: 'fein', name: 'Fein', tiers: ['pro'] },
  { id: 'flex', name: 'Flex', tiers: ['mid', 'pro'] },
  { id: 'trend', name: 'Trend', tiers: ['mid'] },
  { id: 'rockwell', name: 'Rockwell', tiers: ['mid'] },
  { id: 'skil', name: 'Skil', tiers: ['basic', 'mid'] },
  { id: 'craftsman', name: 'Craftsman', tiers: ['basic', 'mid'] },
  { id: 'incra', name: 'Incra', tiers: ['pro'] },
  { id: 'wen', name: 'WEN', tiers: ['basic', 'mid'] },
  { id: 'jet', name: 'Jet', tiers: ['pro'] },
  { id: 'grizzly', name: 'Grizzly', tiers: ['mid', 'pro'] },
  { id: 'laguna', name: 'Laguna', tiers: ['pro'] },
  { id: 'sawstop', name: 'SawStop', tiers: ['pro'] },
  { id: 'lamello', name: 'Lamello', tiers: ['pro'] },
  { id: 'bessey', name: 'Bessey', tiers: ['mid', 'pro'] },
  { id: 'irwin', name: 'Irwin', tiers: ['mid'] },
  { id: 'mitutoyo', name: 'Mitutoyo', tiers: ['pro'] },
  { id: 'wagner', name: 'Wagner', tiers: ['basic', 'mid'] },
  { id: 'keter', name: 'Keter', tiers: ['basic', 'mid'] },
  { id: 'sjobergs', name: 'Sjöbergs', tiers: ['pro'] },
  { id: 'graco', name: 'Graco', tiers: ['pro'] },
  { id: 'fuji', name: 'Fuji Spray', tiers: ['pro'] },
  { id: 'steinel', name: 'Steinel', tiers: ['mid', 'pro'] },
  { id: 'karcher', name: 'Kärcher', tiers: ['basic', 'mid'] },
  { id: 'leica', name: 'Leica', tiers: ['pro'] },

  // ── Fase 20 — marcas nuevas ─────────────────────────────────
  // Generalistas España
  { id: 'stayer', name: 'Stayer', tiers: ['basic', 'mid'], level: 'diy', origin: 'ES' },
  { id: 'aeg', name: 'AEG', tiers: ['mid', 'pro'], level: 'prosumer', origin: 'DE' },
  { id: 'dexter', name: 'Dexter', tiers: ['basic'], level: 'diy', origin: 'FR' },
  { id: 'parkside_performance', name: 'Parkside Performance', tiers: ['mid'], level: 'prosumer', origin: 'DE' },
  { id: 'einhell_professional', name: 'Einhell Professional', tiers: ['mid', 'pro'], level: 'prosumer', origin: 'DE' },
  { id: 'stanley_fatmax', name: 'Stanley FatMax', tiers: ['mid', 'pro'], level: 'prosumer', origin: 'US' },
  { id: 'femi', name: 'Femi', tiers: ['mid', 'pro'], level: 'pro', origin: 'IT' },
  { id: 'powerplus', name: 'PowerPlus', tiers: ['basic'], level: 'diy', origin: 'BE' },
  { id: 'koma_tools', name: 'Koma Tools', tiers: ['basic', 'mid'], level: 'diy', origin: 'ES' },
  { id: 'toolson', name: 'Toolson', tiers: ['basic', 'mid'], level: 'diy', origin: 'DE' },
  { id: 'vito', name: 'Vito', tiers: ['basic', 'mid'], level: 'diy', origin: 'ES' },

  // Carpintería especializada
  { id: 'cmt_orange_tools', name: 'CMT Orange Tools', tiers: ['pro'], level: 'accessories', origin: 'IT' },
  { id: 'freud', name: 'Freud', tiers: ['pro'], level: 'accessories', origin: 'IT' },

  // Sujeción y accesorios
  { id: 'piher', name: 'Piher', tiers: ['mid'], level: 'accessories', origin: 'ES' },
  { id: 'wolfcraft', name: 'Wolfcraft', tiers: ['basic', 'mid'], level: 'accessories', origin: 'DE' },
  { id: 'kwb', name: 'KWB', tiers: ['basic', 'mid'], level: 'accessories', origin: 'DE' },

  // Otras relevantes
  { id: 'facom', name: 'Facom', tiers: ['pro'], level: 'pro', origin: 'FR' },
];

export const TOOL_PRODUCTS: ToolProduct[] = [
  // ═══ SIERRA CIRCULAR ═══
  { id: 'cs01', typeId: 'circular_saw', brandId: 'parkside', model: 'PHKS 1350 C3', tier: 'basic', use: ['home'], power: 'corded', priceMin: 35, priceMax: 50, description: '1350W, disco 190mm, profundidad 66mm.', features: ['1350W', '190mm', '66mm'], bestFor: 'Cortes básicos en tableros' },
  { id: 'cs02', typeId: 'circular_saw', brandId: 'einhell', model: 'TC-CS 1400', tier: 'basic', use: ['home'], power: 'corded', priceMin: 45, priceMax: 65, description: '1400W con aspiración de polvo.', features: ['1400W', '190mm', 'Aspiración'], bestFor: 'Bricolaje en casa' },
  { id: 'cs03', typeId: 'circular_saw', brandId: 'bosch_green', model: 'PKS 66 AF', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 120, priceMax: 155, description: 'Guía CutControl integrada. 1600W.', features: ['1600W', '190mm', 'CutControl'], bestFor: 'Cortes precisos en tableros' },
  { id: 'cs04', typeId: 'circular_saw', brandId: 'makita', model: 'HS7611', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 130, priceMax: 165, description: 'Robusta, ligera (4kg), 5500rpm.', features: ['1600W', '190mm', '4kg'], bestFor: 'Uso frecuente en taller' },
  { id: 'cs05', typeId: 'circular_saw', brandId: 'bosch_blue', model: 'GKS 190', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 160, priceMax: 200, description: 'Profundidad 70mm. Estándar profesional.', features: ['1400W', '190mm', '70mm'], bestFor: 'Uso profesional diario' },
  { id: 'cs06', typeId: 'circular_saw', brandId: 'makita', model: 'DHS680Z', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 200, priceMax: 260, description: '18V LXT brushless.', features: ['18V', '165mm', 'Brushless'], bestFor: 'Profesional sin cable' },
  { id: 'cs07', typeId: 'circular_saw', brandId: 'milwaukee', model: 'M18 CCS55-0', tier: 'pro', use: ['construction'], power: 'battery', priceMin: 250, priceMax: 320, description: 'M18 FUEL. Potencia máxima.', features: ['18V FUEL', '165mm', 'Brushless'], bestFor: 'Profesionales exigentes' },

  // ═══ SIERRA DE INMERSIÓN / CARRIL ═══
  { id: 'ps01', typeId: 'plunge_saw', brandId: 'scheppach', model: 'PL55', tier: 'basic', use: ['home', 'workshop'], power: 'corded', priceMin: 100, priceMax: 140, description: 'Con carril 1400mm incluido. 1200W.', features: ['1200W', '160mm', 'Carril 1.4m'], bestFor: 'Cortes rectos en tableros grandes' },
  { id: 'ps02', typeId: 'plunge_saw', brandId: 'dewalt', model: 'DWS520KT', tier: 'mid', use: ['workshop', 'construction'], power: 'corded', priceMin: 350, priceMax: 430, description: 'Con carril 1500mm. 1300W.', features: ['1300W', '165mm', 'Carril 1.5m'], bestFor: 'Obra y taller' },
  { id: 'ps03', typeId: 'plunge_saw', brandId: 'makita', model: 'SP6000J', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 300, priceMax: 380, description: 'Inmersión precisa. Makpac.', features: ['1300W', '165mm', 'Makpac'], bestFor: 'Carpintería de precisión' },
  { id: 'ps04', typeId: 'plunge_saw', brandId: 'festool', model: 'TS 55 REBQ-Plus', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 520, priceMax: 620, description: 'La referencia absoluta. Aspiración Plug-it.', features: ['1200W', '160mm', 'Plug-it', 'Systainer'], bestFor: 'Ebanistería de alta precisión' },
  { id: 'ps05', typeId: 'plunge_saw', brandId: 'mafell', model: 'MT 55 CC', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 600, priceMax: 750, description: 'Alternativa premium a Festool.', features: ['1400W', '162mm', 'CuprexMotor'], bestFor: 'Profesional premium alemán' },

  // ═══ SIERRA DE CALAR ═══
  { id: 'js01', typeId: 'jigsaw', brandId: 'parkside', model: 'PSTK 800 D3', tier: 'basic', use: ['home'], power: 'corded', priceMin: 25, priceMax: 40, description: '800W, corte madera 80mm.', features: ['800W', '80mm madera'], bestFor: 'Cortes curvos básicos' },
  { id: 'js02', typeId: 'jigsaw', brandId: 'bosch_green', model: 'PST 700 E', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 65, priceMax: 85, description: 'SDS cambio rápido. Low vibration.', features: ['500W', 'SDS', 'Low vibration'], bestFor: 'Cortes curvos en tableros' },
  { id: 'js03', typeId: 'jigsaw', brandId: 'bosch_blue', model: 'GST 150 CE', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 200, priceMax: 260, description: 'Orbital 4 posiciones. 780W.', features: ['780W', 'SDS', 'Orbital 4 pos.'], bestFor: 'Cortes profesionales' },
  { id: 'js04', typeId: 'jigsaw', brandId: 'makita', model: 'DJV182Z', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 180, priceMax: 230, description: '18V LXT brushless.', features: ['18V', 'Brushless', 'Orbital 3 pos.'], bestFor: 'Precisión sin cable' },

  // ═══ SIERRA INGLETADORA ═══
  { id: 'ms01', typeId: 'miter_saw', brandId: 'einhell', model: 'TC-MS 2112', tier: 'basic', use: ['home'], power: 'corded', priceMin: 80, priceMax: 120, description: '1600W, disco 210mm.', features: ['1600W', '210mm'], bestFor: 'Ingletes básicos' },
  { id: 'ms02', typeId: 'miter_saw', brandId: 'metabo', model: 'KGS 216 M', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 200, priceMax: 260, description: 'Telescópica 216mm con láser.', features: ['1500W', '216mm', 'Telescópica', 'Láser'], bestFor: 'Rodapiés y molduras' },
  { id: 'ms03', typeId: 'miter_saw', brandId: 'dewalt', model: 'DWS780', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 550, priceMax: 680, description: 'Telescópica 305mm. XPS LED shadow.', features: ['1675W', '305mm', 'XPS LED'], bestFor: 'Carpintería profesional' },
  { id: 'ms04', typeId: 'miter_saw', brandId: 'makita', model: 'LS1019L', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 500, priceMax: 620, description: 'Telescópica 260mm. Direct Drive.', features: ['1510W', '260mm', 'Direct Drive'], bestFor: 'Taller profesional' },

  // ═══ SIERRA DE MESA ═══
  { id: 'ts01', typeId: 'table_saw', brandId: 'einhell', model: 'TC-TS 2025/2 U', tier: 'basic', use: ['home', 'workshop'], power: 'corded', priceMin: 130, priceMax: 180, description: '2000W. Mesa extensible con soporte.', features: ['2000W', '250mm', 'Mesa extensible'], bestFor: 'Cortes repetitivos' },
  { id: 'ts02', typeId: 'table_saw', brandId: 'bosch_blue', model: 'GTS 10 XC', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 700, priceMax: 850, description: 'Compacta profesional. Freno de disco.', features: ['2100W', '254mm', 'Freno disco'], bestFor: 'Taller profesional' },
  { id: 'ts03', typeId: 'table_saw', brandId: 'dewalt', model: 'DWE7492', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 600, priceMax: 750, description: 'Portátil profesional. Rack & Pinion.', features: ['2000W', '250mm', 'R&P fence'], bestFor: 'Carpintería de obra' },

  // ═══ SIERRA DE CINTA ═══
  { id: 'bs01', typeId: 'band_saw', brandId: 'scheppach', model: 'BASA1', tier: 'basic', use: ['workshop'], power: 'corded', priceMin: 180, priceMax: 240, description: 'Garganta 305mm. 300W.', features: ['300W', '305mm garganta'], bestFor: 'Cortes curvos en madera maciza' },
  { id: 'bs02', typeId: 'band_saw', brandId: 'metabo', model: 'BAS 318 Precision', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 400, priceMax: 520, description: 'Garganta 318mm. Profesional.', features: ['900W', '318mm', '170mm prof.'], bestFor: 'Rebanado y curvas precisas' },

  // ═══ SIERRA DE SABLE ═══
  { id: 'rs01', typeId: 'reciprocating_saw', brandId: 'einhell', model: 'TE-AP 750 E', tier: 'basic', use: ['home'], power: 'corded', priceMin: 40, priceMax: 60, description: '750W. Corta madera, metal, PVC.', features: ['750W', 'Pendular', '150mm madera'], bestFor: 'Demolición y poda' },
  { id: 'rs02', typeId: 'reciprocating_saw', brandId: 'makita', model: 'DJR186Z', tier: 'pro', use: ['construction'], power: 'battery', priceMin: 130, priceMax: 170, description: '18V LXT. Corte 255mm madera.', features: ['18V', '255mm madera'], bestFor: 'Demolición profesional' },

  // ═══ MULTIHERRAMIENTA OSCILANTE ═══
  { id: 'mt01', typeId: 'multi_tool', brandId: 'parkside', model: 'PMFW 310 D2', tier: 'basic', use: ['home'], power: 'corded', priceMin: 25, priceMax: 35, description: '310W. Corta, lija, raspa.', features: ['310W', 'Cambio rápido'], bestFor: 'Repasos y esquinas' },
  { id: 'mt02', typeId: 'multi_tool', brandId: 'bosch_green', model: 'PMF 350 CES', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 100, priceMax: 130, description: 'Starlock. 350W. Electrónica.', features: ['350W', 'Starlock'], bestFor: 'Renovaciones' },
  { id: 'mt03', typeId: 'multi_tool', brandId: 'makita', model: 'DTM52Z', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 180, priceMax: 230, description: '18V LXT brushless. Starlock Max.', features: ['18V', 'Brushless', 'Starlock Max'], bestFor: 'Profesional sin cable' },

  // ═══ TALADRO ATORNILLADOR ═══
  { id: 'dd01', typeId: 'drill_driver', brandId: 'parkside', model: 'PABS 20-Li E6', tier: 'basic', use: ['home'], power: 'battery', priceMin: 30, priceMax: 50, description: '20V, 30Nm.', features: ['20V', '30Nm', 'LED'], bestFor: 'Montar muebles, colgar cuadros' },
  { id: 'dd02', typeId: 'drill_driver', brandId: 'bosch_green', model: 'EasyDrill 18V-40', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 80, priceMax: 110, description: '18V. Power for All.', features: ['18V', '40Nm', 'Compacto'], bestFor: 'Bricolaje general' },
  { id: 'dd03', typeId: 'drill_driver', brandId: 'makita', model: 'DDF484Z', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 140, priceMax: 190, description: '18V LXT brushless. 54Nm.', features: ['18V', '54Nm', 'Brushless'], bestFor: 'Uso profesional intensivo' },
  { id: 'dd04', typeId: 'drill_driver', brandId: 'dewalt', model: 'DCD791D2', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 180, priceMax: 240, description: 'XR 18V brushless. 2 baterías.', features: ['18V XR', '70Nm', '2 bat.'], bestFor: 'Profesional con autonomía' },
  { id: 'dd05', typeId: 'drill_driver', brandId: 'milwaukee', model: 'M18 FDD2-502X', tier: 'pro', use: ['construction'], power: 'battery', priceMin: 280, priceMax: 350, description: 'M18 FUEL. 135Nm.', features: ['18V', '135Nm', 'FUEL'], bestFor: 'Construcción pesada' },

  // ═══ ATORNILLADOR DE IMPACTO ═══
  { id: 'id01', typeId: 'impact_driver', brandId: 'ryobi', model: 'RID18C-0', tier: 'basic', use: ['home'], power: 'battery', priceMin: 50, priceMax: 70, description: '18V ONE+. 200Nm.', features: ['18V', '200Nm', 'ONE+'], bestFor: 'Atornillado rápido' },
  { id: 'id02', typeId: 'impact_driver', brandId: 'makita', model: 'DTD172Z', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 140, priceMax: 180, description: '18V LXT brushless. 4 velocidades.', features: ['18V', '180Nm', 'Brushless'], bestFor: 'Atornillado profesional' },
  { id: 'id03', typeId: 'impact_driver', brandId: 'dewalt', model: 'DCF887N', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 130, priceMax: 170, description: '18V XR brushless. 205Nm.', features: ['18V', '205Nm', 'Brushless'], bestFor: 'Impacto profesional' },

  // ═══ TALADRO DE COLUMNA ═══
  { id: 'dp01', typeId: 'drill_press', brandId: 'einhell', model: 'TC-BD 630', tier: 'basic', use: ['workshop'], power: 'corded', priceMin: 120, priceMax: 160, description: '630W. Mesa inclinable.', features: ['630W', 'Mesa inclinable', '16mm portabrocas'], bestFor: 'Taladros perpendiculares precisos' },
  { id: 'dp02', typeId: 'drill_press', brandId: 'scheppach', model: 'DP16VLS', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 180, priceMax: 240, description: 'Velocidad variable. Láser.', features: ['550W', 'Variable', 'Láser', 'LED'], bestFor: 'Taller de carpintería' },

  // ═══ SISTEMA POCKET HOLE ═══
  { id: 'ph01', typeId: 'pocket_hole', brandId: 'kreg', model: 'Jig 320', tier: 'basic', use: ['home'], power: 'manual', priceMin: 30, priceMax: 45, description: 'Sistema básico uniones ocultas.', features: ['Portátil', '12-38mm'], bestFor: 'Muebles básicos' },
  { id: 'ph02', typeId: 'pocket_hole', brandId: 'kreg', model: 'Jig 720 PRO', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 130, priceMax: 170, description: 'Base fija con pinza automática.', features: ['Base fija', 'Pinza auto', 'Repetible'], bestFor: 'Producción en serie' },

  // ═══ FRESADORA ESPIGAS DOMINO ═══
  { id: 'dj01', typeId: 'domino_joiner', brandId: 'festool', model: 'DF 500 Q-Plus', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 850, priceMax: 1000, description: 'Sistema Domino. Espigas 4-10mm.', features: ['420W', 'Espigas 4-10mm', 'Systainer'], bestFor: 'Uniones profesionales de marcos' },

  // ═══ CEPILLO ELÉCTRICO ═══
  { id: 'ep01', typeId: 'electric_planer', brandId: 'einhell', model: 'TC-PL 750', tier: 'basic', use: ['home'], power: 'corded', priceMin: 35, priceMax: 50, description: '750W, 82mm ancho, 2mm profundidad.', features: ['750W', '82mm', '2mm prof.'], bestFor: 'Ajustar puertas y tablas' },
  { id: 'ep02', typeId: 'electric_planer', brandId: 'bosch_green', model: 'PHO 2000', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 85, priceMax: 110, description: '680W. Cuchillas reversibles.', features: ['680W', '82mm', 'Reversibles'], bestFor: 'Cepillado de calidad' },
  { id: 'ep03', typeId: 'electric_planer', brandId: 'makita', model: 'KP0810', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 180, priceMax: 230, description: '850W, 82mm. Robusto.', features: ['850W', '82mm', '4mm prof.'], bestFor: 'Cepillado intensivo' },
  { id: 'ep04', typeId: 'electric_planer', brandId: 'makita', model: 'DKP181Z', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 250, priceMax: 320, description: '18V LXT brushless.', features: ['18V', '82mm', 'Brushless'], bestFor: 'Cepillado profesional sin cable' },

  // ═══ REGRUESADORA ═══
  { id: 'bp01', typeId: 'benchtop_planer', brandId: 'einhell', model: 'TC-SP 204', tier: 'basic', use: ['workshop'], power: 'corded', priceMin: 200, priceMax: 280, description: '204mm ancho. 1500W.', features: ['1500W', '204mm', '120mm alto'], bestFor: 'Regruesar tablas' },
  { id: 'bp02', typeId: 'benchtop_planer', brandId: 'metabo', model: 'DH 330', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 400, priceMax: 520, description: '330mm ancho. Automática.', features: ['1800W', '330mm'], bestFor: 'Tablas anchas' },
  { id: 'bp03', typeId: 'benchtop_planer', brandId: 'dewalt', model: 'DW733-QS', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 500, priceMax: 650, description: '317mm portátil. Referencia.', features: ['1800W', '317mm', 'Portátil'], bestFor: 'Taller profesional' },

  // ═══ LIJADORA ORBITAL ═══
  { id: 'os01', typeId: 'orbital_sander', brandId: 'einhell', model: 'TE-RS 40 E', tier: 'basic', use: ['home'], power: 'corded', priceMin: 30, priceMax: 45, description: 'Excéntrica 125mm. 400W.', features: ['400W', '125mm'], bestFor: 'Lijar muebles' },
  { id: 'os02', typeId: 'orbital_sander', brandId: 'bosch_green', model: 'PEX 400 AE', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 70, priceMax: 90, description: 'Excéntrica 125mm. Buen acabado.', features: ['350W', '125mm', 'Microvelcro'], bestFor: 'Acabados finos' },
  { id: 'os03', typeId: 'orbital_sander', brandId: 'festool', model: 'ETS 125 REQ-Plus', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 280, priceMax: 350, description: 'Aspiración perfecta. Systainer.', features: ['250W', '125mm', 'Plug-it'], bestFor: 'Acabado profesional' },

  // ═══ LIJADORA DE BANDA ═══
  { id: 'bls01', typeId: 'belt_sander', brandId: 'einhell', model: 'TC-BS 8038', tier: 'basic', use: ['home'], power: 'corded', priceMin: 40, priceMax: 55, description: '800W. Banda 76×457mm.', features: ['800W', '76×457mm'], bestFor: 'Desbastar superficies grandes' },
  { id: 'bls02', typeId: 'belt_sander', brandId: 'makita', model: '9403', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 250, priceMax: 320, description: '1200W. Banda 100×610mm.', features: ['1200W', '100×610mm', 'Profesional'], bestFor: 'Desbaste profesional' },

  // ═══ FRESADORA DE SUPERFICIE ═══
  { id: 'rt01', typeId: 'router', brandId: 'einhell', model: 'TC-RO 1155 E', tier: 'basic', use: ['home'], power: 'corded', priceMin: 55, priceMax: 75, description: '1100W. Pinzas 6 y 8mm.', features: ['1100W', '6/8mm'], bestFor: 'Ranurar y redondear' },
  { id: 'rt02', typeId: 'router', brandId: 'bosch_green', model: 'POF 1400 ACE', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 130, priceMax: 170, description: '1400W. LED. Electrónica.', features: ['1400W', '6/8mm', 'LED'], bestFor: 'Fresado versátil' },
  { id: 'rt03', typeId: 'router', brandId: 'dewalt', model: 'DW625E-QS', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 300, priceMax: 380, description: '2000W. Inmersión. Pinza 12mm.', features: ['2000W', '12mm', 'Inmersión'], bestFor: 'Fresado profesional pesado' },
  { id: 'rt04', typeId: 'router', brandId: 'festool', model: 'OF 1400 EBQ-Plus', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 650, priceMax: 800, description: 'Referencia en fresado. Aspiración.', features: ['1400W', '6/8/12mm', 'Plug-it'], bestFor: 'Ebanistería de precisión' },

  // ═══ FRESADORA DE CANTOS ═══
  { id: 'tr01', typeId: 'trim_router', brandId: 'makita', model: 'RT0702CX2J', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 200, priceMax: 260, description: 'Compacta. 3 bases intercambiables.', features: ['710W', '6/8mm', '3 bases'], bestFor: 'Canteado de detalle' },
  { id: 'tr02', typeId: 'trim_router', brandId: 'dewalt', model: 'DCW600N', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 220, priceMax: 280, description: '18V XR brushless. Sin cable.', features: ['18V', 'Brushless', '8mm'], bestFor: 'Canteado profesional móvil' },

  // ═══ METRO LÁSER ═══
  { id: 'lm01', typeId: 'laser_measure', brandId: 'vevor', model: '50m básico', tier: 'basic', use: ['home'], power: 'battery', priceMin: 15, priceMax: 25, description: 'Metro láser 50m.', features: ['50m', 'Área', 'LCD'], bestFor: 'Medir habitaciones' },
  { id: 'lm02', typeId: 'laser_measure', brandId: 'bosch_green', model: 'PLR 50 C', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 70, priceMax: 95, description: 'Bluetooth + app.', features: ['50m', 'Bluetooth', 'App'], bestFor: 'Medición con documentación' },
  { id: 'lm03', typeId: 'laser_measure', brandId: 'bosch_blue', model: 'GLM 50-27 CG', tier: 'pro', use: ['construction'], power: 'battery', priceMin: 150, priceMax: 200, description: 'Láser verde. IP65.', features: ['50m', 'Verde', 'IP65'], bestFor: 'Medición en obra' },

  // ═══ SARGENTOS ═══
  { id: 'cl01', typeId: 'quick_clamps', brandId: 'silverline', model: 'Pack 4×300mm', tier: 'basic', use: ['home'], power: 'manual', priceMin: 15, priceMax: 25, description: 'Pack 4 sargentos rápidos.', features: ['300mm', 'Pack 4'], bestFor: 'Pegado básico' },
  { id: 'cl02', typeId: 'f_clamps', brandId: 'stanley', model: 'FatMax 300mm', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 15, priceMax: 25, description: 'Sargento F robusto. 300kg.', features: ['300mm', '300kg'], bestFor: 'Encolados con presión' },
  { id: 'cl03', typeId: 'corner_clamps', brandId: 'vevor', model: 'Pack 4 esquinas', tier: 'basic', use: ['home'], power: 'manual', priceMin: 15, priceMax: 25, description: '4 sargentos esquina 90°.', features: ['90°', 'Pack 4'], bestFor: 'Marcos y cajones' },

  // ═══ BANCO DE TRABAJO ═══
  { id: 'wb01', typeId: 'workbench', brandId: 'bosch_green', model: 'PWB 600', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 90, priceMax: 130, description: 'Plegable. Mordazas. 200kg.', features: ['Plegable', '200kg', 'Mordazas'], bestFor: 'Taller con poco espacio' },

  // ═══ CLAVADORA ═══
  { id: 'ng01', typeId: 'nail_gun', brandId: 'einhell', model: 'TC-PN 50', tier: 'basic', use: ['home'], power: 'corded', priceMin: 30, priceMax: 45, description: 'Neumática. Clavos 15-50mm.', features: ['Neumática', '15-50mm'], bestFor: 'Molduras y tapicería' },
  { id: 'ng02', typeId: 'nail_gun', brandId: 'dewalt', model: 'DCN660N', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 300, priceMax: 380, description: '18V XR. 16GA sin compresor.', features: ['18V', '16GA', '32-63mm'], bestFor: 'Acabados profesionales' },
  { id: 'ng03', typeId: 'nail_gun', brandId: 'milwaukee', model: 'M18 FN15GA', tier: 'pro', use: ['construction'], power: 'battery', priceMin: 350, priceMax: 430, description: 'M18 FUEL 15GA.', features: ['18V FUEL', '15GA', '32-64mm'], bestFor: 'Carpintería de acabado' },

  // ═══ PISTOLA DE CALOR ═══
  { id: 'hg01', typeId: 'heat_gun', brandId: 'parkside', model: 'PHLG 2000 E4', tier: 'basic', use: ['home'], power: 'corded', priceMin: 15, priceMax: 25, description: '2000W. 2 temperaturas.', features: ['2000W', '350°/550°'], bestFor: 'Decapar pintura' },
  { id: 'hg02', typeId: 'heat_gun', brandId: 'bosch_green', model: 'EasyHeat 500', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 40, priceMax: 55, description: 'Regulación continua.', features: ['1600W', '300-500°', 'Regulación'], bestFor: 'Decapado y termoformado' },

  // ═══ ASPIRADOR DE TALLER ═══
  { id: 'sv01', typeId: 'shop_vac', brandId: 'einhell', model: 'TE-VC 2025 SACL', tier: 'basic', use: ['home', 'workshop'], power: 'corded', priceMin: 80, priceMax: 110, description: '25L. Enchufe sincronizado.', features: ['1250W', '25L', 'Sincronizado'], bestFor: 'Aspirar viruta' },
  { id: 'sv02', typeId: 'shop_vac', brandId: 'bosch_blue', model: 'GAS 35 M AFC', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 350, priceMax: 430, description: 'Clase M. Autolimpieza filtro.', features: ['1380W', '35L', 'Clase M'], bestFor: 'Aspiración profesional' },
  { id: 'sv03', typeId: 'shop_vac', brandId: 'festool', model: 'CTL 26 E', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 500, priceMax: 620, description: 'Plug-it. Autoclean. Systainer.', features: ['1200W', '26L', 'Plug-it'], bestFor: 'Sistema Festool' },

  // ═══ SIERRA INGLETADORA (ampliación) ═══
  { id: 'ms05', typeId: 'miter_saw', brandId: 'parkside', model: 'PKS 1500 A1', tier: 'basic', use: ['home'], power: 'corded', priceMin: 60, priceMax: 90, description: '1500W. Disco 210mm. Inglete ±45°.', features: ['1500W', '210mm', '±45°'], bestFor: 'Bricolaje ocasional' },
  { id: 'ms06', typeId: 'miter_saw', brandId: 'evolution', model: 'R210CMS', tier: 'basic', use: ['home', 'workshop'], power: 'corded', priceMin: 110, priceMax: 150, description: '1200W. Disco multi-material 210mm.', features: ['1200W', '210mm', 'Multi-material'], bestFor: 'Corta madera, acero y aluminio' },
  { id: 'ms07', typeId: 'miter_saw', brandId: 'evolution', model: 'R255SMS+', tier: 'mid', use: ['workshop', 'construction'], power: 'corded', priceMin: 220, priceMax: 290, description: 'Telescópica 255mm multi-material.', features: ['2000W', '255mm', 'Telescópica', 'Multi-material'], bestFor: 'Multi-material versátil' },
  { id: 'ms08', typeId: 'miter_saw', brandId: 'bosch_green', model: 'PCM 8 S', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 180, priceMax: 230, description: '1200W. Telescópica 216mm.', features: ['1200W', '216mm', 'Telescópica'], bestFor: 'Bricolaje avanzado' },
  { id: 'ms09', typeId: 'miter_saw', brandId: 'bosch_blue', model: 'GCM 8 SJL', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 450, priceMax: 560, description: '1600W. 216mm. Sistema deslizante patentado.', features: ['1600W', '216mm', 'Axial glide'], bestFor: 'Carpintería profesional' },
  { id: 'ms10', typeId: 'miter_saw', brandId: 'festool', model: 'Kapex KS 60 E', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 1100, priceMax: 1350, description: 'La ingletadora de referencia. Sistema de aspiración.', features: ['1200W', '216mm', 'Plug-it'], bestFor: 'Ebanistería premium' },
  { id: 'ms11', typeId: 'miter_saw', brandId: 'makita', model: 'DLS714NZ', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 400, priceMax: 520, description: '18Vx2 LXT brushless. 190mm.', features: ['36V', '190mm', 'Brushless'], bestFor: 'Profesional sin cable' },
  { id: 'ms12', typeId: 'miter_saw', brandId: 'metabo', model: 'KGS 254 M', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 280, priceMax: 360, description: '2000W. Telescópica 254mm.', features: ['2000W', '254mm', 'Telescópica'], bestFor: 'Taller de carpintería' },

  // ═══ SIERRA DE MESA (ampliación) ═══
  { id: 'ts04', typeId: 'table_saw', brandId: 'parkside', model: 'PTK 2000 F5', tier: 'basic', use: ['home'], power: 'corded', priceMin: 120, priceMax: 160, description: '2000W. Disco 254mm.', features: ['2000W', '254mm'], bestFor: 'Bricolaje ocasional' },
  { id: 'ts05', typeId: 'table_saw', brandId: 'scheppach', model: 'HS100S', tier: 'basic', use: ['home', 'workshop'], power: 'corded', priceMin: 160, priceMax: 220, description: '2000W. Mesa ensanchable lateral.', features: ['2000W', '254mm', 'Ensanchable'], bestFor: 'Pequeños talleres' },
  { id: 'ts06', typeId: 'table_saw', brandId: 'evolution', model: 'RAGE 5-S', tier: 'mid', use: ['workshop', 'construction'], power: 'corded', priceMin: 350, priceMax: 450, description: 'Multi-material 255mm.', features: ['1500W', '255mm', 'Multi-material'], bestFor: 'Obra con materiales mixtos' },
  { id: 'ts07', typeId: 'table_saw', brandId: 'makita', model: 'MLT100N', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 400, priceMax: 520, description: '1500W. Disco 260mm. Guía paralela.', features: ['1500W', '260mm', 'Guía paralela'], bestFor: 'Taller de carpintería' },
  { id: 'ts08', typeId: 'table_saw', brandId: 'metabo', model: 'TS 254', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 380, priceMax: 480, description: '2000W. Portátil. Extensión trasera.', features: ['2000W', '254mm', 'Portátil'], bestFor: 'Taller y obra' },
  { id: 'ts09', typeId: 'table_saw', brandId: 'festool', model: 'TKS 80 EBS', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 1800, priceMax: 2200, description: 'SawStop tecnología SawStop. 254mm.', features: ['2200W', '254mm', 'SawStop'], bestFor: 'Ebanistería premium segura' },
  { id: 'ts10', typeId: 'table_saw', brandId: 'sawstop', model: 'JSS-120A60', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 1600, priceMax: 2000, description: 'Jobsite Saw Pro con flesh-detect.', features: ['1800W', '254mm', 'Flesh-detect'], bestFor: 'Máxima seguridad profesional' },
  { id: 'ts11', typeId: 'table_saw', brandId: 'holzmann', model: 'TS250F', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 450, priceMax: 600, description: 'Estacionaria 250mm con extensión.', features: ['1800W', '250mm', 'Estacionaria'], bestFor: 'Taller estacionario' },

  // ═══ SIERRA DE CINTA (ampliación) ═══
  { id: 'bs03', typeId: 'band_saw', brandId: 'einhell', model: 'TC-SB 200/1', tier: 'basic', use: ['home', 'workshop'], power: 'corded', priceMin: 140, priceMax: 190, description: '250W. Garganta 200mm.', features: ['250W', '200mm garganta'], bestFor: 'Cortes curvos caseros' },
  { id: 'bs04', typeId: 'band_saw', brandId: 'proxxon', model: 'MBS 240/E', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 200, priceMax: 260, description: 'Micro sierra de cinta. Precisión.', features: ['100W', '240mm', 'Variable'], bestFor: 'Modelismo y piezas pequeñas' },
  { id: 'bs05', typeId: 'band_saw', brandId: 'holzmann', model: 'HBS 400', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 700, priceMax: 900, description: 'Garganta 395mm. Estacionaria.', features: ['750W', '395mm', 'Guía magnética'], bestFor: 'Carpintería seria' },
  { id: 'bs06', typeId: 'band_saw', brandId: 'jet', model: 'JWBS-14SFX', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 1100, priceMax: 1400, description: 'Referencia americana 14".', features: ['1100W', '14"', 'Guías cerámicas'], bestFor: 'Taller profesional americano' },
  { id: 'bs07', typeId: 'band_saw', brandId: 'laguna', model: '14|12', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 1800, priceMax: 2300, description: '14" con 12" de altura. Guías cerámicas.', features: ['1800W', '14"', '12" alto'], bestFor: 'Ebanistería alta gama' },
  { id: 'bs08', typeId: 'band_saw', brandId: 'grizzly', model: 'G0555LX', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 700, priceMax: 900, description: '14" Deluxe con freno.', features: ['1HP', '14"', 'Freno'], bestFor: 'Taller avanzado' },

  // ═══ SIERRA DE SABLE (ampliación) ═══
  { id: 'rs03', typeId: 'reciprocating_saw', brandId: 'parkside', model: 'PFS 710 B2', tier: 'basic', use: ['home'], power: 'corded', priceMin: 30, priceMax: 45, description: '710W. Pendular.', features: ['710W', 'Pendular'], bestFor: 'Poda y demolición ligera' },
  { id: 'rs04', typeId: 'reciprocating_saw', brandId: 'bosch_green', model: 'PSA 700 E', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 70, priceMax: 95, description: '710W. SDS cambio rápido.', features: ['710W', 'SDS'], bestFor: 'Bricolaje' },
  { id: 'rs05', typeId: 'reciprocating_saw', brandId: 'dewalt', model: 'DCS367N', tier: 'pro', use: ['construction'], power: 'battery', priceMin: 160, priceMax: 210, description: '18V XR brushless compacta.', features: ['18V', 'Brushless', 'Compacta'], bestFor: 'Obra en espacios reducidos' },
  { id: 'rs06', typeId: 'reciprocating_saw', brandId: 'milwaukee', model: 'M18 FSZ', tier: 'pro', use: ['construction'], power: 'battery', priceMin: 280, priceMax: 360, description: 'M18 FUEL SAWZALL.', features: ['18V FUEL', 'Brushless', 'One-Key'], bestFor: 'Demolición intensiva' },
  { id: 'rs07', typeId: 'reciprocating_saw', brandId: 'hikoki', model: 'CR18DBL', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 200, priceMax: 260, description: '18V Multivolt brushless.', features: ['18V', 'Brushless', 'AHB'], bestFor: 'Profesional versátil' },

  // ═══ MULTIHERRAMIENTA OSCILANTE (ampliación) ═══
  { id: 'mt04', typeId: 'multi_tool', brandId: 'fein', model: 'MultiMaster AFMM 14', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 350, priceMax: 450, description: 'El inventor del sistema. 350W.', features: ['350W', 'Starlock Max', '3D oscillation'], bestFor: 'Uso profesional intensivo' },
  { id: 'mt05', typeId: 'multi_tool', brandId: 'fein', model: 'FMM 350 QSL', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 280, priceMax: 360, description: 'QuickIn cambio útil. 350W.', features: ['350W', 'QuickIn', 'Starlock Max'], bestFor: 'Renovación profesional' },
  { id: 'mt06', typeId: 'multi_tool', brandId: 'dewalt', model: 'DCS355N', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 150, priceMax: 200, description: '18V XR brushless. Cambio rápido.', features: ['18V', 'Brushless', 'Quick change'], bestFor: 'Profesional sin cable' },
  { id: 'mt07', typeId: 'multi_tool', brandId: 'bosch_blue', model: 'GOP 55-36', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 300, priceMax: 380, description: '550W. Starlock Max.', features: ['550W', 'Starlock Max', 'Electrónica'], bestFor: 'Profesional con cable' },
  { id: 'mt08', typeId: 'multi_tool', brandId: 'einhell', model: 'TE-MG 300 CE', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 70, priceMax: 95, description: '300W. Velocidad variable.', features: ['300W', 'Variable', 'Cambio rápido'], bestFor: 'Bricolaje avanzado' },

  // ═══ TALADRO DE COLUMNA (ampliación) ═══
  { id: 'dp03', typeId: 'drill_press', brandId: 'parkside', model: 'PTBM 500 G4', tier: 'basic', use: ['home', 'workshop'], power: 'corded', priceMin: 90, priceMax: 130, description: '500W. Láser y LED.', features: ['500W', 'Láser', 'LED'], bestFor: 'Bricolaje casero' },
  { id: 'dp04', typeId: 'drill_press', brandId: 'proxxon', model: 'TBM 220', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 220, priceMax: 290, description: 'Taladro de mesa de precisión.', features: ['100W', 'Precisión', 'MK1'], bestFor: 'Modelismo y relojería' },
  { id: 'dp05', typeId: 'drill_press', brandId: 'metabo', model: 'B 32/3', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 380, priceMax: 480, description: '710W. Portabrocas 32mm.', features: ['710W', '32mm', '12 velocidades'], bestFor: 'Taller profesional' },
  { id: 'dp06', typeId: 'drill_press', brandId: 'holzmann', model: 'SB 4116H', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 500, priceMax: 650, description: 'Estacionaria industrial 16mm.', features: ['750W', '16mm', 'Estacionaria'], bestFor: 'Taller industrial' },
  { id: 'dp07', typeId: 'drill_press', brandId: 'wen', model: '4208T', tier: 'basic', use: ['home', 'workshop'], power: 'corded', priceMin: 140, priceMax: 190, description: '8" 5 velocidades.', features: ['1/3HP', '8"', '5 vel.'], bestFor: 'Taller doméstico' },
  { id: 'dp08', typeId: 'drill_press', brandId: 'jet', model: 'JDP-17', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 900, priceMax: 1200, description: '17" profesional.', features: ['3/4HP', '17"', 'Variable'], bestFor: 'Taller americano premium' },

  // ═══ POCKET HOLE (ampliación) ═══
  { id: 'ph03', typeId: 'pocket_hole', brandId: 'kreg', model: 'K4', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 80, priceMax: 110, description: 'Sistema intermedio con base.', features: ['Base', '19-38mm'], bestFor: 'Aficionado avanzado' },
  { id: 'ph04', typeId: 'pocket_hole', brandId: 'kreg', model: 'Pocket-Hole Jig 520 Pro', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 80, priceMax: 110, description: 'Portátil con ajuste automático.', features: ['Portátil', 'Auto-ajuste'], bestFor: 'Proyectos variados' },
  { id: 'ph05', typeId: 'pocket_hole', brandId: 'katsu', model: 'Jig clon Kreg', tier: 'basic', use: ['home'], power: 'manual', priceMin: 20, priceMax: 35, description: 'Clon económico estilo Kreg.', features: ['Económico', '3 taladros'], bestFor: 'Probar el sistema' },
  { id: 'ph06', typeId: 'pocket_hole', brandId: 'triton', model: 'TWPHJ', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 60, priceMax: 85, description: 'Sistema pocket hole con tope.', features: ['Tope profundidad', 'Compacto'], bestFor: 'Alternativa a Kreg' },
  { id: 'ph07', typeId: 'pocket_hole', brandId: 'kreg', model: 'Foreman DB210', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 350, priceMax: 450, description: 'Máquina de pocket holes eléctrica.', features: ['Eléctrica', 'Producción'], bestFor: 'Producción en serie' },

  // ═══ FRESADORA ESPIGAS (ampliación) ═══
  { id: 'dj02', typeId: 'domino_joiner', brandId: 'festool', model: 'DF 700 EQ-Plus', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 1400, priceMax: 1700, description: 'Domino XL para ebanistería pesada.', features: ['720W', 'Espigas 8-14mm', 'XL'], bestFor: 'Muebles grandes y puertas' },
  { id: 'dj03', typeId: 'domino_joiner', brandId: 'triton', model: 'TDJ600', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 280, priceMax: 380, description: 'Alternativa económica al Domino.', features: ['710W', '6/8/10mm'], bestFor: 'Uniones sin Festool' },

  // ═══ ENGALLETADORA ═══
  { id: 'bj01', typeId: 'biscuit_joiner', brandId: 'einhell', model: 'TC-BJ 900', tier: 'basic', use: ['home', 'workshop'], power: 'corded', priceMin: 90, priceMax: 130, description: '860W. Galletas 0/10/20.', features: ['860W', '0/10/20'], bestFor: 'Uniones rápidas tablero' },
  { id: 'bj02', typeId: 'biscuit_joiner', brandId: 'makita', model: 'PJ7000', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 250, priceMax: 320, description: '700W. Ajuste preciso.', features: ['700W', '6 posiciones'], bestFor: 'Taller de carpintería' },
  { id: 'bj03', typeId: 'biscuit_joiner', brandId: 'dewalt', model: 'DW682K', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 280, priceMax: 360, description: '600W. Referencia profesional.', features: ['600W', 'Profundidad ajustable'], bestFor: 'Uso profesional' },
  { id: 'bj04', typeId: 'biscuit_joiner', brandId: 'triton', model: 'TBJ001', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 130, priceMax: 180, description: '760W. Ángulo 0-135°.', features: ['760W', '0-135°'], bestFor: 'Aficionado avanzado' },
  { id: 'bj05', typeId: 'biscuit_joiner', brandId: 'lamello', model: 'Classic X', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 900, priceMax: 1200, description: 'El inventor del sistema de galletas.', features: ['800W', 'Suizo', 'Precisión'], bestFor: 'Ebanistería premium' },

  // ═══ LIJADORA ORBITAL (ampliación) ═══
  { id: 'os04', typeId: 'orbital_sander', brandId: 'makita', model: 'BO5041', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 130, priceMax: 170, description: '300W. 125mm. Variable.', features: ['300W', '125mm', 'Variable'], bestFor: 'Taller de carpintería' },
  { id: 'os05', typeId: 'orbital_sander', brandId: 'festool', model: 'ETS EC 125/3 EQ', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 380, priceMax: 480, description: 'Brushless. Órbita 3mm ultra-fina.', features: ['250W', 'Brushless', '3mm'], bestFor: 'Acabado premium' },
  { id: 'os06', typeId: 'orbital_sander', brandId: 'festool', model: 'ETS EC 150/5 EQ', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 450, priceMax: 560, description: '150mm brushless. Acabado fino.', features: ['400W', '150mm', 'Brushless'], bestFor: 'Ebanistería profesional' },
  { id: 'os07', typeId: 'orbital_sander', brandId: 'flex', model: 'ORE 150-3', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 280, priceMax: 360, description: 'Orbital 150mm. Alemana.', features: ['350W', '150mm', '3mm órbita'], bestFor: 'Alternativa profesional' },
  { id: 'os08', typeId: 'orbital_sander', brandId: 'bosch_blue', model: 'GEX 125-150 AVE', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 240, priceMax: 310, description: '400W. Platos 125/150mm.', features: ['400W', '125/150mm'], bestFor: 'Profesional versátil' },

  // ═══ LIJADORA DE BANDA (ampliación) ═══
  { id: 'bls03', typeId: 'belt_sander', brandId: 'bosch_green', model: 'PBS 75 A', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 85, priceMax: 115, description: '710W. Banda 75×533mm.', features: ['710W', '75×533mm'], bestFor: 'Desbastar tableros' },
  { id: 'bls04', typeId: 'belt_sander', brandId: 'bosch_blue', model: 'GBS 75 AE', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 260, priceMax: 330, description: '750W. Banda 75×533mm.', features: ['750W', '75×533mm', 'Variable'], bestFor: 'Profesional taller' },
  { id: 'bls05', typeId: 'belt_sander', brandId: 'metabo', model: 'BAE 75', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 250, priceMax: 320, description: '1010W. Ancha y estable.', features: ['1010W', '75×533mm'], bestFor: 'Desbaste intensivo' },
  { id: 'bls06', typeId: 'belt_sander', brandId: 'triton', model: 'T41200BS', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 100, priceMax: 140, description: '1200W. Banda 76×533mm.', features: ['1200W', '76×533mm'], bestFor: 'Desbaste potente económico' },

  // ═══ LIJADORA DE DETALLE ═══
  { id: 'ds01', typeId: 'detail_sander', brandId: 'blackdecker', model: 'KA161BC', tier: 'basic', use: ['home'], power: 'corded', priceMin: 25, priceMax: 40, description: 'Mouse. 55W. Esquinas.', features: ['55W', 'Triangular'], bestFor: 'Esquinas y detalles' },
  { id: 'ds02', typeId: 'detail_sander', brandId: 'bosch_green', model: 'PSM 200 AES', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 60, priceMax: 85, description: '200W. Plato delta intercambiable.', features: ['200W', 'Delta', 'Cambio fácil'], bestFor: 'Muebles y molduras' },
  { id: 'ds03', typeId: 'detail_sander', brandId: 'makita', model: 'BO4565', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 90, priceMax: 120, description: '200W. Delta robusta.', features: ['200W', 'Delta'], bestFor: 'Taller profesional' },
  { id: 'ds04', typeId: 'detail_sander', brandId: 'einhell', model: 'TE-OS 18/150', tier: 'basic', use: ['home'], power: 'battery', priceMin: 45, priceMax: 65, description: '18V PXC. Delta.', features: ['18V', 'Delta'], bestFor: 'Bricolaje sin cable' },
  { id: 'ds05', typeId: 'detail_sander', brandId: 'fein', model: 'FMM 350 QSL', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 300, priceMax: 380, description: 'MultiMaster con accesorio delta.', features: ['350W', 'Starlock', 'Multi'], bestFor: 'Profesional versátil' },

  // ═══ FRESADORA SUPERFICIE (ampliación) ═══
  { id: 'rt05', typeId: 'router', brandId: 'makita', model: 'RP2301FCXJ', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 380, priceMax: 480, description: '2100W. Pinza 12mm. Inmersión.', features: ['2100W', '12mm', 'Inmersión'], bestFor: 'Fresado pesado taller' },
  { id: 'rt06', typeId: 'router', brandId: 'triton', model: 'TRA001', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 260, priceMax: 340, description: '2400W. Ideal para mesa.', features: ['2400W', '12mm', 'Para mesa'], bestFor: 'Montaje en mesa' },
  { id: 'rt07', typeId: 'router', brandId: 'bosch_blue', model: 'GOF 1600 CE', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 450, priceMax: 560, description: '1600W. Constant Electronic.', features: ['1600W', '12mm', 'CE'], bestFor: 'Profesional versátil' },
  { id: 'rt08', typeId: 'router', brandId: 'dewalt', model: 'DW625EK', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 320, priceMax: 420, description: '2000W. Clásica profesional.', features: ['2000W', '12mm', 'Electrónica'], bestFor: 'Ebanistería tradicional' },
  { id: 'rt09', typeId: 'router', brandId: 'hikoki', model: 'M12VE', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 300, priceMax: 400, description: '2000W. Japonesa robusta.', features: ['2000W', '12mm'], bestFor: 'Profesional japonés' },

  // ═══ FRESADORA DE CANTOS (ampliación) ═══
  { id: 'tr03', typeId: 'trim_router', brandId: 'katsu', model: '103690 palm router', tier: 'basic', use: ['home'], power: 'corded', priceMin: 30, priceMax: 50, description: 'Palm router clon económico.', features: ['530W', '6/8mm'], bestFor: 'Probar el fresado' },
  { id: 'tr04', typeId: 'trim_router', brandId: 'bosch_green', model: 'POF 1200 AE', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 110, priceMax: 150, description: '1200W. Compacta.', features: ['1200W', '6/8mm'], bestFor: 'Bricolaje avanzado' },
  { id: 'tr05', typeId: 'trim_router', brandId: 'bosch_blue', model: 'GKF 600', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 180, priceMax: 240, description: '600W. Canteadora profesional.', features: ['600W', '8mm'], bestFor: 'Canteado profesional' },
  { id: 'tr06', typeId: 'trim_router', brandId: 'festool', model: 'MFK 700 EQ', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 550, priceMax: 680, description: '720W. Base 0° y 1.5°.', features: ['720W', '8mm', 'Doble base'], bestFor: 'Canteado premium' },
  { id: 'tr07', typeId: 'trim_router', brandId: 'makita', model: 'DRT50Z', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 230, priceMax: 300, description: '18V brushless compacta.', features: ['18V', 'Brushless', '6/8mm'], bestFor: 'Canteado sin cable' },

  // ═══ CEPILLO ELÉCTRICO (ampliación) ═══
  { id: 'ep05', typeId: 'electric_planer', brandId: 'parkside', model: 'PEH 30 C3', tier: 'basic', use: ['home'], power: 'corded', priceMin: 30, priceMax: 45, description: '750W. 82mm.', features: ['750W', '82mm', '3mm prof.'], bestFor: 'Ajustar puertas ocasional' },
  { id: 'ep06', typeId: 'electric_planer', brandId: 'bosch_blue', model: 'GHO 40-82 C', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 280, priceMax: 360, description: '850W. 4mm profundidad.', features: ['850W', '82mm', '4mm prof.'], bestFor: 'Carpintería de obra' },
  { id: 'ep07', typeId: 'electric_planer', brandId: 'dewalt', model: 'DCP580N', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 230, priceMax: 300, description: '18V XR brushless.', features: ['18V', '82mm', 'Brushless'], bestFor: 'Cepillado profesional móvil' },

  // ═══ REGRUESADORA (ampliación) ═══
  { id: 'bp04', typeId: 'benchtop_planer', brandId: 'scheppach', model: 'HMS1070', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 350, priceMax: 450, description: '254mm. Combinada.', features: ['1500W', '254mm'], bestFor: 'Taller de carpintería' },
  { id: 'bp05', typeId: 'benchtop_planer', brandId: 'wen', model: 'PL1326', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 300, priceMax: 400, description: '13" con 3 cuchillas.', features: ['15A', '13"', '3 cuchillas'], bestFor: 'Taller americano' },
  { id: 'bp06', typeId: 'benchtop_planer', brandId: 'makita', model: '2012NB', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 550, priceMax: 700, description: '304mm portátil japonesa.', features: ['1650W', '304mm', 'Silenciosa'], bestFor: 'Taller profesional' },
  { id: 'bp07', typeId: 'benchtop_planer', brandId: 'holzmann', model: 'HOB305PRO', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 700, priceMax: 900, description: '305mm con cabezal helicoidal.', features: ['1500W', '305mm', 'Helicoidal'], bestFor: 'Taller semi-industrial' },

  // ═══ CEPILLADORA-REGRUESADORA ═══
  { id: 'jp01', typeId: 'jointer_planer', brandId: 'scheppach', model: 'HMC3200', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 900, priceMax: 1200, description: 'Combinada 260mm.', features: ['1900W', '260mm', 'Combo'], bestFor: 'Taller completo' },
  { id: 'jp02', typeId: 'jointer_planer', brandId: 'holzmann', model: 'HOB260ECO', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 1100, priceMax: 1500, description: '260mm combinada europea.', features: ['2200W', '260mm', '2-en-1'], bestFor: 'Taller intermedio' },
  { id: 'jp03', typeId: 'jointer_planer', brandId: 'jet', model: 'JPT-310', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 2000, priceMax: 2600, description: '310mm profesional.', features: ['2500W', '310mm', 'Helicoidal'], bestFor: 'Taller profesional' },
  { id: 'jp04', typeId: 'jointer_planer', brandId: 'metabo', model: 'HC 260 C', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 1200, priceMax: 1600, description: '260mm profesional alemana.', features: ['2800W', '260mm'], bestFor: 'Profesional europeo' },

  // ═══ METRO LÁSER (ampliación) ═══
  { id: 'lm04', typeId: 'laser_measure', brandId: 'bosch_green', model: 'Zamo IV', tier: 'basic', use: ['home'], power: 'battery', priceMin: 35, priceMax: 55, description: '20m. Compacto.', features: ['20m', 'Simple'], bestFor: 'Bricolaje básico' },
  { id: 'lm05', typeId: 'laser_measure', brandId: 'stanley', model: 'TLM99', tier: 'basic', use: ['home'], power: 'battery', priceMin: 30, priceMax: 50, description: '30m. Robusto.', features: ['30m', 'IP54'], bestFor: 'Bricolaje general' },
  { id: 'lm06', typeId: 'laser_measure', brandId: 'leica', model: 'Disto D2', tier: 'mid', use: ['construction'], power: 'battery', priceMin: 120, priceMax: 170, description: 'Suizo. 100m. Bluetooth.', features: ['100m', 'Bluetooth', 'Suizo'], bestFor: 'Construcción profesional' },

  // ═══ NIVEL LÁSER ═══
  { id: 'll01', typeId: 'laser_level', brandId: 'parkside', model: 'PKLL 7 C4', tier: 'basic', use: ['home'], power: 'battery', priceMin: 25, priceMax: 40, description: 'Cruz. Horizontal+vertical.', features: ['Cruz', '10m'], bestFor: 'Colgar cuadros' },
  { id: 'll02', typeId: 'laser_level', brandId: 'bosch_green', model: 'Quigo', tier: 'basic', use: ['home'], power: 'battery', priceMin: 40, priceMax: 65, description: 'Láser de línea autonivelante.', features: ['Cruz', 'Autonivel', '10m'], bestFor: 'Bricolaje doméstico' },
  { id: 'll03', typeId: 'laser_level', brandId: 'bosch_blue', model: 'GLL 3-80 CG', tier: 'pro', use: ['construction'], power: 'battery', priceMin: 450, priceMax: 580, description: 'Multilínea verde. 360°.', features: ['3 líneas 360°', 'Verde', 'Bluetooth'], bestFor: 'Obra profesional' },
  { id: 'll04', typeId: 'laser_level', brandId: 'dewalt', model: 'DW088CG', tier: 'mid', use: ['workshop', 'construction'], power: 'battery', priceMin: 140, priceMax: 190, description: 'Cruz verde. Autonivel.', features: ['Cruz verde', '15m'], bestFor: 'Reformas' },
  { id: 'll05', typeId: 'laser_level', brandId: 'makita', model: 'SK105GDZ', tier: 'pro', use: ['construction'], power: 'battery', priceMin: 350, priceMax: 450, description: '12V CXT láser verde.', features: ['12V', 'Verde', '5 líneas'], bestFor: 'Obra Makita' },

  // ═══ CALIBRE DIGITAL ═══
  { id: 'dc01', typeId: 'digital_caliper', brandId: 'parkside', model: 'PDMS 150 A1', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 10, priceMax: 20, description: '150mm. LCD.', features: ['150mm', 'Digital'], bestFor: 'Medidas caseras precisas' },
  { id: 'dc02', typeId: 'digital_caliper', brandId: 'stanley', model: 'STHT0-77364', tier: 'mid', use: ['workshop'], power: 'battery', priceMin: 25, priceMax: 40, description: '150mm. mm/pulgadas.', features: ['150mm', 'Dual'], bestFor: 'Taller general' },
  { id: 'dc03', typeId: 'digital_caliper', brandId: 'mitutoyo', model: '500-196-30', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 130, priceMax: 180, description: 'Calidad japonesa. Precisión 0.01mm.', features: ['150mm', '0.01mm', 'Japonés'], bestFor: 'Taller de precisión' },
  { id: 'dc04', typeId: 'digital_caliper', brandId: 'proxxon', model: '28114', tier: 'mid', use: ['workshop'], power: 'battery', priceMin: 50, priceMax: 75, description: 'Digital 150mm. Alemán.', features: ['150mm', '0.01mm'], bestFor: 'Modelismo' },

  // ═══ MEDIDOR DE HUMEDAD ═══
  { id: 'mm01', typeId: 'moisture_meter', brandId: 'parkside', model: 'PMSS A1', tier: 'basic', use: ['home'], power: 'battery', priceMin: 10, priceMax: 20, description: 'Medidor pinchos madera.', features: ['Pinchos', 'Madera'], bestFor: 'Verificar leña' },
  { id: 'mm02', typeId: 'moisture_meter', brandId: 'bosch_blue', model: 'GMH 3300', tier: 'pro', use: ['construction'], power: 'battery', priceMin: 180, priceMax: 240, description: 'Profesional madera y materiales.', features: ['Multimaterial', 'Pro'], bestFor: 'Inspección profesional' },
  { id: 'mm03', typeId: 'moisture_meter', brandId: 'stanley', model: '0-77-030', tier: 'mid', use: ['workshop', 'construction'], power: 'battery', priceMin: 40, priceMax: 60, description: 'Pinchos. Madera y materiales.', features: ['Pinchos', 'LCD'], bestFor: 'Reformas' },
  { id: 'mm04', typeId: 'moisture_meter', brandId: 'wagner', model: 'MMC220', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 300, priceMax: 400, description: 'Pinless profesional.', features: ['Sin pinchos', 'Pro'], bestFor: 'Ebanistería profesional' },

  // ═══ SARGENTOS F (ampliación) ═══
  { id: 'cl04', typeId: 'f_clamps', brandId: 'bessey', model: 'TGK 300', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 25, priceMax: 40, description: 'Sargento F alemán clásico.', features: ['300mm', '5000N'], bestFor: 'Taller profesional' },
  { id: 'cl05', typeId: 'f_clamps', brandId: 'bessey', model: 'GZ600', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 30, priceMax: 50, description: 'Sargento F 600mm.', features: ['600mm', '6000N'], bestFor: 'Encolados largos' },
  { id: 'cl06', typeId: 'f_clamps', brandId: 'irwin', model: 'Pro 600mm', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 25, priceMax: 40, description: 'Sargento F robusto.', features: ['600mm'], bestFor: 'Encolados' },
  { id: 'cl07', typeId: 'f_clamps', brandId: 'silverline', model: 'Pack 4×200mm', tier: 'basic', use: ['home'], power: 'manual', priceMin: 12, priceMax: 20, description: 'Pack económico.', features: ['200mm', 'Pack 4'], bestFor: 'Bricolaje casero' },
  { id: 'cl08', typeId: 'f_clamps', brandId: 'vevor', model: 'Pack 6×400mm', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 25, priceMax: 40, description: 'Pack económico 6 uds.', features: ['400mm', 'Pack 6'], bestFor: 'Comenzar un taller' },

  // ═══ SARGENTOS RÁPIDOS (ampliación) ═══
  { id: 'cl09', typeId: 'quick_clamps', brandId: 'bessey', model: 'EZS 300', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 20, priceMax: 30, description: 'Bessey rápido a una mano.', features: ['300mm', 'Una mano'], bestFor: 'Sujeción rápida' },
  { id: 'cl10', typeId: 'quick_clamps', brandId: 'irwin', model: 'Quick-Grip 300mm', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 20, priceMax: 30, description: 'Clásico Quick-Grip.', features: ['300mm', 'Una mano'], bestFor: 'Uso diario' },
  { id: 'cl11', typeId: 'quick_clamps', brandId: 'stanley', model: 'FatMax XL', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 15, priceMax: 25, description: 'Sargento rápido XL.', features: ['450mm'], bestFor: 'Pegados medianos' },

  // ═══ SARGENTOS DE ESQUINA (ampliación) ═══
  { id: 'cl12', typeId: 'corner_clamps', brandId: 'bessey', model: 'WS3', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 35, priceMax: 55, description: 'Sargento de esquina Bessey.', features: ['90°', 'Ajustable'], bestFor: 'Marcos profesionales' },
  { id: 'cl13', typeId: 'corner_clamps', brandId: 'kreg', model: 'KHC-90DCC', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 25, priceMax: 40, description: 'Automaxx 90°.', features: ['Automaxx', '90°'], bestFor: 'Carpintería' },

  // ═══ TORNILLO DE BANCO ═══
  { id: 'bv01', typeId: 'bench_vise', brandId: 'vevor', model: 'Tornillo 5"', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 35, priceMax: 55, description: '5" fundición. Giratorio.', features: ['125mm', 'Giratorio'], bestFor: 'Taller doméstico' },
  { id: 'bv02', typeId: 'bench_vise', brandId: 'irwin', model: 'Record 6"', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 150, priceMax: 220, description: 'Record 6" clásico.', features: ['150mm', 'Record'], bestFor: 'Taller serio' },
  { id: 'bv03', typeId: 'bench_vise', brandId: 'stanley', model: 'Maxsteel 4"', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 50, priceMax: 80, description: '4" con yunque.', features: ['100mm', 'Yunque'], bestFor: 'Bricolaje general' },
  { id: 'bv04', typeId: 'bench_vise', brandId: 'rockwell', model: 'JawHorse RK9003', tier: 'mid', use: ['workshop', 'construction'], power: 'manual', priceMin: 180, priceMax: 240, description: 'Caballete-mordaza portátil.', features: ['Portátil', '1ton presión'], bestFor: 'Sujeción grande portátil' },

  // ═══ BANCO DE TRABAJO (ampliación) ═══
  { id: 'wb02', typeId: 'workbench', brandId: 'blackdecker', model: 'Workmate WM550', tier: 'basic', use: ['home'], power: 'manual', priceMin: 60, priceMax: 90, description: 'Workmate clásica plegable.', features: ['Plegable', 'Mordaza'], bestFor: 'Bricolaje ocasional' },
  { id: 'wb03', typeId: 'workbench', brandId: 'keter', model: 'Master Pro', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 90, priceMax: 130, description: 'Banco plegable robusto.', features: ['Plegable', 'Cajones'], bestFor: 'Garaje doméstico' },
  { id: 'wb04', typeId: 'workbench', brandId: 'sjobergs', model: 'Elite 1500', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 700, priceMax: 900, description: 'Banco ebanisteria sueco.', features: ['Madera maciza', '2 mordazas'], bestFor: 'Ebanisteria' },
  { id: 'wb05', typeId: 'workbench', brandId: 'festool', model: 'MFT/3', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 600, priceMax: 750, description: 'Multifunction Table sistema Festool.', features: ['Sistema', 'Agujeros', 'Modular'], bestFor: 'Sistema Festool' },
  { id: 'wb06', typeId: 'workbench', brandId: 'triton', model: 'Superjaws SJA200E', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 250, priceMax: 340, description: 'Mordaza de pie con pedal.', features: ['Pedal', '1ton'], bestFor: 'Sujeción grande portátil' },

  // ═══ PISTOLA HVLP ═══
  { id: 'sg01', typeId: 'spray_gun', brandId: 'wagner', model: 'W100', tier: 'basic', use: ['home'], power: 'corded', priceMin: 50, priceMax: 80, description: '280W. Pintura acuosa.', features: ['280W', 'HVLP'], bestFor: 'Pintar muebles' },
  { id: 'sg02', typeId: 'spray_gun', brandId: 'wagner', model: 'FLEXiO 590', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 130, priceMax: 180, description: 'X-Boost turbina. Múltiples pinturas.', features: ['630W', 'X-Boost'], bestFor: 'Pintar paredes y muebles' },
  { id: 'sg03', typeId: 'spray_gun', brandId: 'bosch_green', model: 'PFS 5000 E', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 180, priceMax: 240, description: '1200W. Sistema ALLPaint.', features: ['1200W', 'ALLPaint'], bestFor: 'Pintado profesional casero' },
  { id: 'sg04', typeId: 'spray_gun', brandId: 'graco', model: 'Magnum X5', tier: 'pro', use: ['construction'], power: 'corded', priceMin: 350, priceMax: 480, description: 'Airless profesional portátil.', features: ['Airless', '100L/min'], bestFor: 'Obra profesional' },
  { id: 'sg05', typeId: 'spray_gun', brandId: 'fuji', model: 'Mini-Mite 4 PLATINUM', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 700, priceMax: 900, description: 'HVLP premium. Acabados finos.', features: ['HVLP', '4 etapas'], bestFor: 'Ebanistería de acabados' },

  // ═══ CLAVADORA (ampliación) ═══
  { id: 'ng04', typeId: 'nail_gun', brandId: 'makita', model: 'DBN500Z', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 320, priceMax: 420, description: '18V LXT. Clavos 18GA 15-50mm.', features: ['18V', '18GA', '15-50mm'], bestFor: 'Acabados sin compresor' },
  { id: 'ng05', typeId: 'nail_gun', brandId: 'bosch_blue', model: 'GSK 18V-LI', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 300, priceMax: 400, description: '18V. Clavos 18GA.', features: ['18V', '18GA'], bestFor: 'Carpintería acabado' },
  { id: 'ng06', typeId: 'nail_gun', brandId: 'parkside', model: 'PDT 40 D5', tier: 'basic', use: ['home'], power: 'battery', priceMin: 30, priceMax: 50, description: '40V. Grapadora/clavadora.', features: ['40V', '6-14mm'], bestFor: 'Tapicería y molduras' },
  { id: 'ng07', typeId: 'nail_gun', brandId: 'ryobi', model: 'R18N18G-0', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 180, priceMax: 240, description: '18V ONE+ 18GA.', features: ['18V', '18GA', '15-50mm'], bestFor: 'Bricolaje avanzado' },

  // ═══ PISTOLA DE CALOR (ampliación) ═══
  { id: 'hg03', typeId: 'heat_gun', brandId: 'bosch_blue', model: 'GHG 20-63', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 130, priceMax: 180, description: '2000W. LCD. 50-630°.', features: ['2000W', 'LCD', '50-630°'], bestFor: 'Profesional' },
  { id: 'hg04', typeId: 'heat_gun', brandId: 'makita', model: 'HG6531CK', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 100, priceMax: 140, description: '2000W. Pantalla digital.', features: ['2000W', 'Digital'], bestFor: 'Taller profesional' },
  { id: 'hg05', typeId: 'heat_gun', brandId: 'steinel', model: 'HL 2020 E', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 140, priceMax: 190, description: 'Alemana. 2200W LCD.', features: ['2200W', 'LCD', 'Alemana'], bestFor: 'Profesional exigente' },

  // ═══ ASPIRADOR TALLER (ampliación) ═══
  { id: 'sv04', typeId: 'shop_vac', brandId: 'parkside', model: 'PNTS 1500 C4', tier: 'basic', use: ['home'], power: 'corded', priceMin: 50, priceMax: 80, description: '1500W. 30L.', features: ['1500W', '30L'], bestFor: 'Limpieza taller doméstico' },
  { id: 'sv05', typeId: 'shop_vac', brandId: 'karcher', model: 'WD 6 P', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 160, priceMax: 220, description: '1300W. 30L. Enchufe.', features: ['1300W', '30L', 'Enchufe'], bestFor: 'Taller y casa' },
  { id: 'sv06', typeId: 'shop_vac', brandId: 'makita', model: 'VC3012L', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 260, priceMax: 340, description: '1000W. 30L. Clase L.', features: ['1000W', '30L', 'Clase L'], bestFor: 'Obra profesional' },
  { id: 'sv07', typeId: 'shop_vac', brandId: 'metabo', model: 'ASR 35 M ACP', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 400, priceMax: 520, description: 'Clase M. 35L. Autolimpieza.', features: ['1400W', '35L', 'Clase M'], bestFor: 'Profesional con polvo fino' },

  // ═══ SISTEMA ASPIRACIÓN ═══
  { id: 'dcol01', typeId: 'dust_collector', brandId: 'einhell', model: 'TE-VE 550/2 A', tier: 'basic', use: ['workshop'], power: 'corded', priceMin: 150, priceMax: 200, description: '550W. Colector 65L.', features: ['550W', '65L'], bestFor: 'Taller pequeño' },
  { id: 'dcol02', typeId: 'dust_collector', brandId: 'scheppach', model: 'HA1000', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 200, priceMax: 280, description: '550W. 75L. Móvil.', features: ['550W', '75L'], bestFor: 'Taller de carpintería' },
  { id: 'dcol03', typeId: 'dust_collector', brandId: 'holzmann', model: 'ABS1080', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 250, priceMax: 340, description: '550W. 1080 m³/h.', features: ['550W', '1080m³/h'], bestFor: 'Taller europeo' },
  { id: 'dcol04', typeId: 'dust_collector', brandId: 'jet', model: 'DC-1100VX', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 700, priceMax: 900, description: '1.5HP ciclónico.', features: ['1.5HP', '1100 CFM'], bestFor: 'Taller americano' },
  { id: 'dcol05', typeId: 'dust_collector', brandId: 'laguna', model: 'P|Flux 1', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 900, priceMax: 1200, description: 'Ciclónico premium.', features: ['1HP', 'Ciclónico'], bestFor: 'Ebanistería premium' },
  { id: 'dcol06', typeId: 'dust_collector', brandId: 'festool', model: 'CT 36 AC', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 700, priceMax: 900, description: 'Autoclean 36L. Plug-it.', features: ['1200W', '36L', 'Autoclean'], bestFor: 'Sistema Festool completo' },

  // ═══ FESTOOL ADICIONAL ═══
  { id: 'dd06', typeId: 'drill_driver', brandId: 'festool', model: 'CXS 18', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 350, priceMax: 450, description: 'Taladro compacto premium.', features: ['18V', 'Compacto', 'Brushless'], bestFor: 'Ebanistería precisa' },

  // ══════════════════════════════════════════════════════════════
  // ═══ FASE 20 — Marcas nuevas ══════════════════════════════════
  // ══════════════════════════════════════════════════════════════

  // ─── STAYER (básica española) ─────────────────────────────────
  { id: 'stayer-cs190', typeId: 'circular_saw', brandId: 'stayer', model: 'BCS 190', tier: 'basic', use: ['home'], power: 'corded', priceMin: 28, priceMax: 45, description: 'Sierra circular 1200W, disco 190mm. Relación calidad-precio española.', features: ['1200W', '190mm', 'Guía paralela', 'Ligera 3.5kg'], bestFor: 'Cortes básicos en tableros de bricolaje' },
  { id: 'stayer-dd13', typeId: 'drill_driver', brandId: 'stayer', model: 'BDD 13-1', tier: 'basic', use: ['home'], power: 'battery', priceMin: 30, priceMax: 50, description: 'Taladro atornillador 18V con batería incluida. Ideal para montar muebles.', features: ['18V', '30Nm', '13mm', 'Batería incluida'], bestFor: 'Bricolaje doméstico general' },
  { id: 'stayer-os125', typeId: 'orbital_sander', brandId: 'stayer', model: 'BOS 125/A', tier: 'basic', use: ['home'], power: 'corded', priceMin: 18, priceMax: 32, description: 'Lijadora orbital 230W, plato 125mm. Aspiración integrada.', features: ['230W', '125mm', 'Aspiración', 'Cambio lija rápido'], bestFor: 'Lijar muebles en casa' },

  // ─── AEG (prosumer alemán) ────────────────────────────────────
  { id: 'aeg-bss18bl', typeId: 'circular_saw', brandId: 'aeg', model: 'BSS 18BL', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 155, priceMax: 210, description: 'Sierra circular 18V brushless sin batería. 165mm, eje compatible Milwaukee M18.', features: ['18V Brushless', '165mm', 'Compatible M18', 'Freno rápido'], bestFor: 'Taller o reforma sin cable' },
  { id: 'aeg-bs18bl', typeId: 'drill_driver', brandId: 'aeg', model: 'BS 18BL', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 85, priceMax: 130, description: 'Taladro atornillador 18V brushless, 60Nm. Plataforma AEG/Milwaukee.', features: ['18V Brushless', '60Nm', 'Compacto', '2 velocidades'], bestFor: 'Bricolaje avanzado y taller' },
  { id: 'aeg-bex18bl', typeId: 'orbital_sander', brandId: 'aeg', model: 'BEX 18BL', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 95, priceMax: 140, description: 'Lijadora excéntrica 18V brushless, 125mm. Sin cable para talleres pequeños.', features: ['18V Brushless', '125mm', 'Sin cable', 'Aspiración'], bestFor: 'Lijar sin cables en taller o obra' },

  // ─── WOLFCRAFT (accesorios alemanes) ──────────────────────────
  { id: 'wolfcraft-5005', typeId: 'f_clamps', brandId: 'wolfcraft', model: '5005000 400mm', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 7, priceMax: 14, description: 'Sargento F clásico 400mm de apertura. Acero robusto para encolados.', features: ['400mm apertura', 'Acero', 'Mordazas protegidas'], bestFor: 'Encolados básicos de tableros' },
  { id: 'wolfcraft-3440', typeId: 'quick_clamps', brandId: 'wolfcraft', model: '3440000 150mm', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 6, priceMax: 12, description: 'Sargento rápido a una mano 150mm. Reversible para separar piezas.', features: ['150mm', 'Una mano', 'Reversible'], bestFor: 'Sujeción rápida en bricolaje' },
  { id: 'wolfcraft-5109', typeId: 'workbench', brandId: 'wolfcraft', model: 'Master 700', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 110, priceMax: 170, description: 'Banco de trabajo plegable 700mm con mordaza. Sistema de topes integrado.', features: ['Plegable', 'Mordaza 140mm', 'Topes', '200kg carga'], bestFor: 'Taller doméstico versátil' },

  // ─── PIHER (sargentos españoles) ──────────────────────────────
  { id: 'piher-mf300', typeId: 'f_clamps', brandId: 'piher', model: 'Max-Force 300mm', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 11, priceMax: 20, description: 'Sargento F español Max-Force 300mm. Alta presión 5500N. Referencia en carpintería.', features: ['300mm', '5500N', 'Fabricado en España', 'Tornillo rápido'], bestFor: 'Encolados de carpintería' },
  { id: 'piher-nx300', typeId: 'quick_clamps', brandId: 'piher', model: 'New Xtreme 300mm', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 13, priceMax: 22, description: 'Sargento rápido New Xtreme 300mm. Presión 340kg, accionamiento a una mano.', features: ['300mm', '340kg presión', 'Una mano', 'Cabezal giratorio'], bestFor: 'Trabajos frecuentes en taller' },

  // ─── CMT ORANGE TOOLS (fresas y discos pro) ───────────────────
  { id: 'cmt-rb12s', typeId: 'router_bits', brandId: 'cmt_orange_tools', model: 'Set 12 fresas 8mm', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 75, priceMax: 130, description: 'Set 12 fresas profesionales vástago 8mm. Carburo micrograno, recubrimiento naranja.', features: ['12 fresas', 'Vástago 8mm', 'Carburo micrograno', 'Recubrimiento PTFE'], bestFor: 'Fresadora de taller profesional' },
  { id: 'cmt-sb250060', typeId: 'saw_blade', brandId: 'cmt_orange_tools', model: '215.060.10 250×60D', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 45, priceMax: 75, description: 'Disco sierra 250mm 60 dientes para ingletadora. ATB+, acabado fino.', features: ['250mm', '60 dientes', 'ATB+', 'Antirruido'], bestFor: 'Cortes de acabado en ingletadora' },

  // ─── FREUD (discos y fresas premium) ──────────────────────────
  { id: 'freud-lm74m', typeId: 'saw_blade', brandId: 'freud', model: 'LM 74 M 250×60D', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 48, priceMax: 82, description: 'Disco LM 74M 250mm 60 dientes. Tecnología TiCo, larga vida. Referencia profesional.', features: ['250mm', '60 dientes', 'TiCo carburo', 'Anti-vibraciones'], bestFor: 'Sierra de mesa y ingletadora profesional' },
  { id: 'freud-rb8s', typeId: 'router_bits', brandId: 'freud', model: 'Set 15 fresas vástago 8mm', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 65, priceMax: 105, description: 'Set 15 fresas carburo, vástago 8mm. Recubrimiento antifricción rojo Freud.', features: ['15 fresas', 'Vástago 8mm', 'Carburo TiCo', 'Maletín'], bestFor: 'Fresadora de sobremesa profesional' },

  // ─── FACOM (medición profesional francesa) ────────────────────
  { id: 'facom-904a150', typeId: 'digital_caliper', brandId: 'facom', model: '904A.150', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 50, priceMax: 90, description: 'Calibre digital 150mm acero inoxidable. Resolución 0.01mm. Lectura mm/pulgadas.', features: ['150mm', '0.01mm', 'Inox', 'mm/pulgadas'], bestFor: 'Taller de precisión profesional' },
  { id: 'facom-ms150', typeId: 'marking_square', brandId: 'facom', model: 'MS.150', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 35, priceMax: 60, description: 'Escuadra de acero templado 150mm. Tolerancia ±0.02mm. Uso profesional.', features: ['150mm', '±0.02mm', 'Acero templado', 'Certificada'], bestFor: 'Marcado preciso en ebanistería' },

  // ─── FEMI (máquinas italianas) ────────────────────────────────
  { id: 'femi-n650xl', typeId: 'band_saw', brandId: 'femi', model: 'N 650 XL', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 270, priceMax: 380, description: 'Sierra de cinta italiana 370W. Garganta 310mm, corte 150mm altura. Construcción profesional.', features: ['370W', '310mm garganta', '150mm altura corte', 'Guía paralela'], bestFor: 'Carpintería de curvas y rebanado' },
  { id: 'femi-703175', typeId: 'drill_press', brandId: 'femi', model: '703/175', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 310, priceMax: 440, description: 'Taladro de columna 550W, portabrocas 16mm. Mesa inclinable ±45°. Made in Italy.', features: ['550W', '16mm portabrocas', 'Mesa ±45°', 'Made in Italy'], bestFor: 'Taladros perpendiculares de precisión' },

  // ─── PARKSIDE PERFORMANCE (prosumer) ─────────────────────────
  { id: 'pp-pabs20li', typeId: 'drill_driver', brandId: 'parkside_performance', model: 'PBS 20-Li A1', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 60, priceMax: 95, description: 'Taladro atornillador 20V brushless, 65Nm. Versión Performance de Parkside.', features: ['20V Brushless', '65Nm', 'LED', 'Cinturón compatible'], bestFor: 'Bricolaje intensivo y taller doméstico' },

  // ─── EINHELL PROFESSIONAL ────────────────────────────────────
  { id: 'ep-tebba18', typeId: 'drill_driver', brandId: 'einhell_professional', model: 'TE-BBA 18/45 BL Li-i', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 80, priceMax: 125, description: 'Taladro atornillador brushless 18V, 80Nm. Versión Professional con más autonomía.', features: ['18V Brushless', '80Nm', 'Brushless', 'Compatible Power X-Change'], bestFor: 'Taladrado y atornillado intensivo' },

  // ─── STANLEY FATMAX ──────────────────────────────────────────
  { id: 'sfm-fmht83191', typeId: 'quick_clamps', brandId: 'stanley_fatmax', model: 'FMHT83191 450mm', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 14, priceMax: 24, description: 'Sargento rápido FatMax 450mm, presión 340kg. Ergonómico, una mano.', features: ['450mm', '340kg presión', 'Una mano', 'Cabeza antivibraciones'], bestFor: 'Encolados y sujeciones frecuentes' },
];
