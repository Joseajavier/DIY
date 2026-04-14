import { ToolCategory, ToolType, ToolBrand, ToolProduct } from '../models/tools';

export const TOOL_CATEGORIES: ToolCategory[] = [
  { id: 'cut', name: 'Corte', icon: '🪚' },
  { id: 'drill', name: 'Taladro', icon: '🔩' },
  { id: 'sand', name: 'Lijado', icon: '✨' },
  { id: 'measure', name: 'Medición', icon: '📏' },
  { id: 'clamp', name: 'Sujeción', icon: '🔧' },
  { id: 'finish', name: 'Acabado', icon: '🎨' },
];

export const TOOL_TYPES: ToolType[] = [
  { id: 'circular_saw', categoryId: 'cut', name: 'Sierra circular', icon: '🪚' },
  { id: 'jigsaw', categoryId: 'cut', name: 'Sierra de calar', icon: '🪚' },
  { id: 'miter_saw', categoryId: 'cut', name: 'Sierra ingletadora', icon: '🪚' },
  { id: 'table_saw', categoryId: 'cut', name: 'Sierra de mesa', icon: '🪚' },
  { id: 'reciprocating_saw', categoryId: 'cut', name: 'Sierra de sable', icon: '🪚' },
  { id: 'multi_tool', categoryId: 'cut', name: 'Multiherramienta', icon: '🪚' },
  { id: 'drill_driver', categoryId: 'drill', name: 'Taladro atornillador', icon: '🔩' },
  { id: 'hammer_drill', categoryId: 'drill', name: 'Taladro percutor', icon: '🔩' },
  { id: 'impact_driver', categoryId: 'drill', name: 'Atornillador impacto', icon: '🔩' },
  { id: 'orbital_sander', categoryId: 'sand', name: 'Lijadora orbital', icon: '✨' },
  { id: 'belt_sander', categoryId: 'sand', name: 'Lijadora de banda', icon: '✨' },
  { id: 'detail_sander', categoryId: 'sand', name: 'Lijadora de detalle', icon: '✨' },
  { id: 'router', categoryId: 'sand', name: 'Fresadora', icon: '✨' },
  { id: 'laser_measure', categoryId: 'measure', name: 'Metro láser', icon: '📏' },
  { id: 'laser_level', categoryId: 'measure', name: 'Nivel láser', icon: '📏' },
  { id: 'digital_square', categoryId: 'measure', name: 'Escuadra digital', icon: '📏' },
  { id: 'clamps', categoryId: 'clamp', name: 'Sargentos', icon: '🔧' },
  { id: 'bench_vise', categoryId: 'clamp', name: 'Tornillo de banco', icon: '🔧' },
  { id: 'spray_gun', categoryId: 'finish', name: 'Pistola de pintura', icon: '🎨' },
  { id: 'heat_gun', categoryId: 'finish', name: 'Pistola de calor', icon: '🎨' },
];

export const TOOL_BRANDS: ToolBrand[] = [
  { id: 'parkside', name: 'Parkside', tiers: ['basic'] },
  { id: 'einhell', name: 'Einhell', tiers: ['basic', 'mid'] },
  { id: 'vevor', name: 'Vevor', tiers: ['basic'] },
  { id: 'blackdecker', name: 'Black+Decker', tiers: ['basic', 'mid'] },
  { id: 'ryobi', name: 'Ryobi', tiers: ['basic', 'mid'] },
  { id: 'worx', name: 'Worx', tiers: ['basic', 'mid'] },
  { id: 'bosch_green', name: 'Bosch (verde)', tiers: ['mid'] },
  { id: 'bosch_blue', name: 'Bosch Professional', tiers: ['pro'] },
  { id: 'makita', name: 'Makita', tiers: ['mid', 'pro'] },
  { id: 'dewalt', name: 'DeWalt', tiers: ['mid', 'pro'] },
  { id: 'metabo', name: 'Metabo', tiers: ['mid', 'pro'] },
  { id: 'milwaukee', name: 'Milwaukee', tiers: ['pro'] },
  { id: 'festool', name: 'Festool', tiers: ['pro'] },
  { id: 'hikoki', name: 'HiKOKI', tiers: ['mid', 'pro'] },
  { id: 'hilti', name: 'Hilti', tiers: ['pro'] },
];

export const TOOL_PRODUCTS: ToolProduct[] = [
  // ── SIERRAS CIRCULARES ──
  { id: 'cs1', typeId: 'circular_saw', brandId: 'parkside', model: 'PHKS 1350', tier: 'basic', use: ['home'], power: 'corded', priceMin: 35, priceMax: 50, description: 'Sierra potente para su precio. 1350W, disco 190mm.', features: ['1350W', 'Disco 190mm', 'Profundidad 66mm', 'Guía paralela'], bestFor: 'Cortes básicos en tableros y listones' },
  { id: 'cs2', typeId: 'circular_saw', brandId: 'einhell', model: 'TC-CS 1400', tier: 'basic', use: ['home'], power: 'corded', priceMin: 45, priceMax: 65, description: 'Buena relación calidad-precio para bricolaje ocasional.', features: ['1400W', 'Disco 190mm', 'Profundidad 66mm', 'Aspiración de polvo'], bestFor: 'Bricolaje en casa, cortes rectos' },
  { id: 'cs3', typeId: 'circular_saw', brandId: 'vevor', model: '185mm 1200W', tier: 'basic', use: ['home'], power: 'corded', priceMin: 30, priceMax: 45, description: 'La opción más económica. Aceptable para uso puntual.', features: ['1200W', 'Disco 185mm', 'Guía láser'], bestFor: 'Cortes puntuales con presupuesto ajustado' },
  { id: 'cs4', typeId: 'circular_saw', brandId: 'bosch_green', model: 'PKS 66 AF', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 120, priceMax: 155, description: 'Línea verde Bosch. Guía integrada CutControl.', features: ['1600W', 'Disco 190mm', 'Profundidad 66mm', 'CutControl', 'CleanSystem'], bestFor: 'Cortes precisos en tableros gruesos' },
  { id: 'cs5', typeId: 'circular_saw', brandId: 'makita', model: 'HS7611', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 130, priceMax: 165, description: 'Robusta y fiable. La favorita de muchos carpinteros hobby.', features: ['1600W', 'Disco 190mm', 'Profundidad 65mm', '5500 rpm', 'Ligera 4kg'], bestFor: 'Uso frecuente en taller' },
  { id: 'cs6', typeId: 'circular_saw', brandId: 'dewalt', model: 'DWE560', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 140, priceMax: 175, description: 'Compacta y precisa. Buena extracción de polvo.', features: ['1350W', 'Disco 184mm', 'Profundidad 65mm', 'Freno eléctrico'], bestFor: 'Cortes precisos en obra y taller' },
  { id: 'cs7', typeId: 'circular_saw', brandId: 'bosch_blue', model: 'GKS 190', tier: 'pro', use: ['workshop', 'construction'], power: 'corded', priceMin: 160, priceMax: 200, description: 'Línea azul. Estándar de la industria.', features: ['1400W', 'Disco 190mm', 'Profundidad 70mm', 'Turbo soplador', 'Arranque suave'], bestFor: 'Uso profesional diario' },
  { id: 'cs8', typeId: 'circular_saw', brandId: 'makita', model: 'DHS680Z', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 200, priceMax: 260, description: 'Batería LXT 18V. Libertad sin perder potencia.', features: ['18V LXT', 'Disco 165mm', 'Profundidad 57mm', 'Brushless', 'Solo cuerpo'], bestFor: 'Profesional móvil, sin cables' },
  { id: 'cs9', typeId: 'circular_saw', brandId: 'dewalt', model: 'DCS570N', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 220, priceMax: 285, description: 'Sistema XR 18V. Corte impecable, motor brushless.', features: ['18V XR', 'Disco 184mm', 'Profundidad 65mm', 'Brushless', 'Solo cuerpo'], bestFor: 'Obra y taller profesional' },
  { id: 'cs10', typeId: 'circular_saw', brandId: 'milwaukee', model: 'M18 CCS55', tier: 'pro', use: ['construction'], power: 'battery', priceMin: 250, priceMax: 320, description: 'Potencia brutal. M18 FUEL brushless.', features: ['18V M18', 'Disco 165mm', 'FUEL brushless', 'REDLINK+'], bestFor: 'Profesionales exigentes' },
  { id: 'cs11', typeId: 'circular_saw', brandId: 'festool', model: 'TS 55 REBQ', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 500, priceMax: 620, description: 'La referencia absoluta. Corte perfecto con carril guía.', features: ['1200W', 'Disco 160mm', 'Profundidad 55mm', 'Carril guía', 'Aspiración integrada'], bestFor: 'Ebanistería y carpintería de precisión' },

  // ── TALADROS ATORNILLADORES ──
  { id: 'dd1', typeId: 'drill_driver', brandId: 'parkside', model: 'PABS 20-Li', tier: 'basic', use: ['home'], power: 'battery', priceMin: 30, priceMax: 50, description: 'Taladro batería Lidl. Suficiente para casa.', features: ['20V', '2 velocidades', '30Nm', 'LED'], bestFor: 'Colgar cuadros, montar muebles' },
  { id: 'dd2', typeId: 'drill_driver', brandId: 'einhell', model: 'TE-CD 18/40 Li', tier: 'basic', use: ['home'], power: 'battery', priceMin: 50, priceMax: 75, description: 'Batería Power X-Change compatible con otras Einhell.', features: ['18V', '40Nm', '2 velocidades', 'Portabrocas 13mm'], bestFor: 'Bricolaje variado en casa' },
  { id: 'dd3', typeId: 'drill_driver', brandId: 'bosch_green', model: 'EasyDrill 18V-40', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 80, priceMax: 110, description: 'Línea verde 18V. Ligero y cómodo.', features: ['18V', '40Nm', 'Power for All', 'Compacto'], bestFor: 'Atornillado y taladrado ligero' },
  { id: 'dd4', typeId: 'drill_driver', brandId: 'makita', model: 'DDF484Z', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 140, priceMax: 190, description: 'LXT 18V brushless. Compacto y potente.', features: ['18V LXT', '54Nm', 'Brushless', 'Portabrocas 13mm'], bestFor: 'Uso profesional intensivo' },
  { id: 'dd5', typeId: 'drill_driver', brandId: 'dewalt', model: 'DCD791D2', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 180, priceMax: 240, description: 'XR 18V brushless. Kit con 2 baterías.', features: ['18V XR', '70Nm', 'Brushless', '2 baterías 2Ah'], bestFor: 'Profesional que necesita autonomía' },
  { id: 'dd6', typeId: 'drill_driver', brandId: 'milwaukee', model: 'M18 FDD2', tier: 'pro', use: ['construction'], power: 'battery', priceMin: 200, priceMax: 270, description: 'M18 FUEL. Máxima potencia en su clase.', features: ['18V M18', '135Nm', 'FUEL brushless', 'REDLINK+'], bestFor: 'Obra y construcción pesada' },

  // ── SIERRAS DE CALAR ──
  { id: 'js1', typeId: 'jigsaw', brandId: 'parkside', model: 'PSTK 800', tier: 'basic', use: ['home'], power: 'corded', priceMin: 25, priceMax: 40, description: '800W, corte en madera hasta 80mm.', features: ['800W', 'Corte 80mm madera', 'Regulación velocidad'], bestFor: 'Cortes curvos básicos' },
  { id: 'js2', typeId: 'jigsaw', brandId: 'bosch_green', model: 'PST 700 E', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 65, priceMax: 85, description: 'SDS para cambio rápido de hoja. Muy cómoda.', features: ['500W', 'SDS', 'Low vibration', 'Soplador'], bestFor: 'Cortes curvos y rectos en tableros' },
  { id: 'js3', typeId: 'jigsaw', brandId: 'makita', model: 'DJV182Z', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 180, priceMax: 230, description: 'LXT 18V brushless. Corte limpio y sin vibraciones.', features: ['18V LXT', 'Brushless', 'Orbital 3 posiciones', 'LED'], bestFor: 'Cortes de precisión profesional' },

  // ── LIJADORAS ORBITALES ──
  { id: 'os1', typeId: 'orbital_sander', brandId: 'einhell', model: 'TC-RS 38 E', tier: 'basic', use: ['home'], power: 'corded', priceMin: 25, priceMax: 40, description: 'Lijadora orbital básica. Velcro y pinza.', features: ['220W', 'Velcro', 'Aspiración', 'Regulación'], bestFor: 'Lijar muebles pequeños' },
  { id: 'os2', typeId: 'orbital_sander', brandId: 'bosch_green', model: 'PEX 220 A', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 55, priceMax: 75, description: 'Excéntrica 125mm. Buen acabado.', features: ['220W', 'Disco 125mm', 'Microvelcro', 'Aspiración'], bestFor: 'Acabados finos en madera' },
  { id: 'os3', typeId: 'orbital_sander', brandId: 'festool', model: 'ETS 125 REQ', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 280, priceMax: 350, description: 'La referencia en lijado. Aspiración perfecta.', features: ['250W', 'Disco 125mm', 'Systainer', 'Aspiración Plug-it'], bestFor: 'Acabado profesional impecable' },

  // ── FRESADORAS ──
  { id: 'rt1', typeId: 'router', brandId: 'einhell', model: 'TC-RO 1155 E', tier: 'basic', use: ['home'], power: 'corded', priceMin: 55, priceMax: 75, description: '1100W con pinzas de 6 y 8mm.', features: ['1100W', 'Pinza 6/8mm', 'Regulación', 'Guía paralela'], bestFor: 'Ranurar y redondear cantos' },
  { id: 'rt2', typeId: 'router', brandId: 'bosch_green', model: 'POF 1400 ACE', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 130, priceMax: 170, description: 'Electrónica constante. Muy versátil.', features: ['1400W', 'Pinza 6/8mm', 'Electrónica', 'LED', 'Aspiración'], bestFor: 'Fresado preciso en taller hobby' },
  { id: 'rt3', typeId: 'router', brandId: 'makita', model: 'RT0702CX2J', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 200, priceMax: 260, description: 'Fresadora de cantos compacta. Muy precisa.', features: ['710W', 'Pinza 6/8mm', 'Bases intercambiables', 'Makpac'], bestFor: 'Canteado y fresado de detalle profesional' },

  // ── METROS LASER ──
  { id: 'lm1', typeId: 'laser_measure', brandId: 'vevor', model: '50m', tier: 'basic', use: ['home'], power: 'battery', priceMin: 15, priceMax: 25, description: 'Metro láser básico. 50m alcance.', features: ['50m', 'Área y volumen', 'Pitágoras', 'Pantalla LCD'], bestFor: 'Medir habitaciones' },
  { id: 'lm2', typeId: 'laser_measure', brandId: 'bosch_green', model: 'PLR 50 C', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 70, priceMax: 95, description: 'Bluetooth + app. Muy preciso.', features: ['50m', 'Bluetooth', 'App', 'Inclinómetro'], bestFor: 'Medición precisa con documentación' },
  { id: 'lm3', typeId: 'laser_measure', brandId: 'bosch_blue', model: 'GLM 50-27 CG', tier: 'pro', use: ['construction'], power: 'battery', priceMin: 150, priceMax: 200, description: 'Profesional. Láser verde visible, IP65.', features: ['50m', 'Láser verde', 'IP65', 'Bluetooth', 'USB-C'], bestFor: 'Medición profesional en obra' },

  // ── SARGENTOS ──
  { id: 'cl1', typeId: 'clamps', brandId: 'vevor', model: 'Pack 4 uds 300mm', tier: 'basic', use: ['home'], power: 'manual', priceMin: 15, priceMax: 25, description: 'Pack de 4 sargentos rápidos de 300mm.', features: ['300mm apertura', 'Pack 4 uds', 'Rápido apriete'], bestFor: 'Pegado y sujeción básica' },
  { id: 'cl2', typeId: 'clamps', brandId: 'worx', model: 'Clamping Table', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 80, priceMax: 120, description: 'Mesa de trabajo con sistema de sujeción.', features: ['Mesa plegable', 'Mordazas integradas', 'Portátil'], bestFor: 'Taller móvil o espacio reducido' },
  { id: 'cl3', typeId: 'clamps', brandId: 'festool', model: 'Sargento MFT', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 40, priceMax: 60, description: 'Sargento para mesa MFT/3. Precisión absoluta.', features: ['Compatible MFT', 'Apriete rápido', 'Acero'], bestFor: 'Sistema Festool MFT' },
];
