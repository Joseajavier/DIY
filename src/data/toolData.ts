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
];
