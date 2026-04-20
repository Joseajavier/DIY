import { ToolCategory, ToolType, ToolBrand, ToolProduct } from '../models/tools';

export const TOOL_CATEGORIES: ToolCategory[] = [
  { id: 'cut',        name: 'Corte',                      icon: '🪚' },
  { id: 'drill',      name: 'Taladrado y atornillado',    icon: '🔩' },
  { id: 'routing',    name: 'Fresado y mecanizado',       icon: '⚙️' },
  { id: 'plane',      name: 'Cepillado y regruesado',     icon: '🪵' },
  { id: 'sand',       name: 'Lijado y acabado',           icon: '✨' },
  { id: 'join',       name: 'Unión y ensamblaje',         icon: '🔗' },
  { id: 'clamp',      name: 'Sujeción y fijación',        icon: '🔧' },
  { id: 'measure',    name: 'Medición y trazado',         icon: '📏' },
  { id: 'extract',    name: 'Aspiración y polvo',         icon: '💨' },
  { id: 'accessories',name: 'Accesorios y consumibles',   icon: '🔄' },
  { id: 'battery',    name: 'Baterías y cargadores',      icon: '🔋' },
  { id: 'storage',    name: 'Organización y taller',      icon: '📦' },
  { id: 'machinery',  name: 'Maquinaria de taller',       icon: '🏭' },
  { id: 'finish',     name: 'Acabado superficial',        icon: '🎨' },
];

export const TOOL_TYPES: ToolType[] = [
  { id: 'circular_saw', categoryId: 'cut', name: 'Sierra circular', icon: '🪚' },
  { id: 'plunge_saw', categoryId: 'cut', name: 'Sierra de inmersión / carril', icon: '🪚' },
  { id: 'jigsaw', categoryId: 'cut', name: 'Sierra de calar', icon: '🪚' },
  { id: 'miter_saw', categoryId: 'cut', name: 'Sierra ingletadora', icon: '🪚' },
  { id: 'table_saw', categoryId: 'machinery', name: 'Sierra de mesa', icon: '🏭' },
  { id: 'band_saw',  categoryId: 'machinery', name: 'Sierra de cinta', icon: '🏭' },
  { id: 'reciprocating_saw', categoryId: 'cut', name: 'Sierra de sable', icon: '🪚' },
  { id: 'multi_tool', categoryId: 'cut', name: 'Multiherramienta oscilante', icon: '🪚' },
  { id: 'drill_driver', categoryId: 'drill', name: 'Taladro atornillador', icon: '🔩' },
  { id: 'hammer_drill', categoryId: 'drill', name: 'Taladro percutor', icon: '🔩' },
  { id: 'impact_driver', categoryId: 'drill', name: 'Atornillador de impacto', icon: '🔩' },
  { id: 'drill_press', categoryId: 'machinery', name: 'Taladro de columna', icon: '🏭' },
  { id: 'pocket_hole', categoryId: 'drill', name: 'Sistema pocket hole', icon: '🔩' },
  { id: 'domino_joiner', categoryId: 'drill', name: 'Fresadora de espigas (Domino)', icon: '🔩' },
  { id: 'biscuit_joiner', categoryId: 'drill', name: 'Engalletadora', icon: '🔩' },
  { id: 'orbital_sander', categoryId: 'sand',    name: 'Lijadora orbital / excéntrica',    icon: '✨' },
  { id: 'belt_sander',    categoryId: 'sand',    name: 'Lijadora de banda',                icon: '✨' },
  { id: 'detail_sander',  categoryId: 'sand',    name: 'Lijadora de detalle',              icon: '✨' },
  { id: 'router',         categoryId: 'routing', name: 'Fresadora de superficie',          icon: '⚙️' },
  { id: 'trim_router',    categoryId: 'routing', name: 'Fresadora de cantos (recortadora)', icon: '⚙️' },
  { id: 'electric_planer',categoryId: 'plane',   name: 'Cepillo eléctrico',               icon: '🪵' },
  { id: 'benchtop_planer',categoryId: 'machinery',name: 'Regruesadora de banco',           icon: '🏭' },
  { id: 'jointer_planer', categoryId: 'machinery',name: 'Cepilladora-regruesadora',        icon: '🏭' },
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

  // ── Fase 20 — tipos añadidos ────────────────────────────────
  // Corte manual
  { id: 'hand_saw',      categoryId: 'cut',   name: 'Serrucho manual / japonés',            icon: '🪚' },
  { id: 'saw_blade',     categoryId: 'accessories', name: 'Discos y hojas de sierra',        icon: '🔄' },
  // Lijado
  { id: 'abrasives',      categoryId: 'accessories', name: 'Abrasivos y lijas',               icon: '🔄' },
  { id: 'router_bits',    categoryId: 'routing',     name: 'Fresas y accesorios de fresadora', icon: '⚙️' },
  { id: 'spindle_sander', categoryId: 'machinery',   name: 'Lijadora de bobina (de columna)',  icon: '🏭' },
  // Cepillado manual
  { id: 'hand_plane',    categoryId: 'plane', name: 'Cepillo manual',                        icon: '🪵' },
  // Medición
  { id: 'marking_square',categoryId: 'measure', name: 'Escuadras y falsos escuadros',        icon: '📏' },
  { id: 'marking_gauge', categoryId: 'measure', name: 'Gramil y útiles de trazado',          icon: '📏' },
  // Sujeción
  { id: 'guide_rail',    categoryId: 'clamp', name: 'Carriles guía y plantillas',            icon: '🔧' },
  // Acabado
  { id: 'brad_nailer',   categoryId: 'finish', name: 'Clavadora de cuadradillo',             icon: '🎨' },

  // ── Ampliación taxonomía completa ────────────────────────────
  // Corte
  { id: 'scroll_saw',   categoryId: 'machinery', name: 'Sierra de marquetería',             icon: '🏭' },
  { id: 'scoring_saw',  categoryId: 'cut',       name: 'Sierra de inmersión / incisión',    icon: '🪚' },
  { id: 'chainsaw',     categoryId: 'cut',       name: 'Motosierra',                        icon: '🪚' },

  // Taladrado y atornillado — accesorios y variantes
  { id: 'screwdriver_tool', categoryId: 'drill', name: 'Atornillador',                      icon: '🔩' },
  { id: 'wood_bits',        categoryId: 'drill', name: 'Brocas para madera',                icon: '🔩' },
  { id: 'forstner_bits',    categoryId: 'drill', name: 'Brocas Forstner',                   icon: '🔩' },
  { id: 'spade_bits',       categoryId: 'drill', name: 'Brocas de pala',                    icon: '🔩' },
  { id: 'countersink',      categoryId: 'drill', name: 'Avellanadores',                     icon: '🔩' },
  { id: 'bit_set',          categoryId: 'drill', name: 'Sets de puntas y brocas',           icon: '🔩' },
  { id: 'stapler',          categoryId: 'drill', name: 'Grapadora',                         icon: '🔩' },
  { id: 'pneumatic_nailer', categoryId: 'drill', name: 'Clavadora neumática',               icon: '🔩' },

  // Lijado y acabado de superficie — ampliación
  { id: 'delta_sander', categoryId: 'sand',      name: 'Lijadora delta / triangular',        icon: '✨' },
  { id: 'combo_sander', categoryId: 'machinery', name: 'Estación lijadora banda + disco',    icon: '🏭' },
  { id: 'polisher',     categoryId: 'sand',      name: 'Pulidora / satinadora',              icon: '✨' },
  { id: 'disc_sander',  categoryId: 'machinery', name: 'Lijadora de disco (estacionaria)',   icon: '🏭' },

  // Fresado y mecanizado — ampliación
  { id: 'mortiser', categoryId: 'routing',   name: 'Escopleadora',                         icon: '⚙️' },
  { id: 'shaper',   categoryId: 'machinery', name: 'Tupi / fresadora de mesa',              icon: '🏭' },

  // Medición y trazado — ampliación
  { id: 'tape_measure',   categoryId: 'measure', name: 'Metro / cinta métrica',             icon: '📏' },
  { id: 'straight_edge',  categoryId: 'measure', name: 'Regla de precisión',                icon: '📏' },
  { id: 'protractor',     categoryId: 'measure', name: 'Goniómetro / transferidor de ángulos', icon: '📏' },
  { id: 'inclinometer',   categoryId: 'measure', name: 'Inclinómetro digital',              icon: '📏' },

  // Sujeción y fijación — ampliación
  { id: 'bar_clamps',     categoryId: 'clamp',  name: 'Gatos de barra',                    icon: '🔧' },
  { id: 'spring_clamps',  categoryId: 'clamp',  name: 'Pinzas de resorte',                 icon: '🔧' },
  { id: 'frame_clamps',   categoryId: 'clamp',  name: 'Útiles para marcos',                icon: '🔧' },
  { id: 'pipe_clamps',    categoryId: 'clamp',  name: 'Sargentos de tubo',                 icon: '🔧' },
  { id: 'toggle_clamps',  categoryId: 'clamp',  name: 'Palomillas de apriete',             icon: '🔧' },
  { id: 'bench_dogs',     categoryId: 'clamp',  name: 'Perros de banco',                   icon: '🔧' },

  // Acabado — ampliación
  { id: 'glue_gun',       categoryId: 'finish', name: 'Pistola de cola caliente',           icon: '🎨' },
  { id: 'finish_nailer',  categoryId: 'finish', name: 'Clavadora de acabado 16G',           icon: '🎨' },

  // ── NUEVA CATEGORÍA: Unión y ensamblaje ─────────────────────
  { id: 'dowel_jig',      categoryId: 'join',   name: 'Plantilla de espigas redondas',     icon: '🔗' },
  { id: 'wood_glue',      categoryId: 'join',   name: 'Colas y adhesivos para madera',     icon: '🔗' },
  { id: 'joint_hardware', categoryId: 'join',   name: 'Herrajes de unión y conectores',    icon: '🔗' },
  { id: 'assembly_clamp', categoryId: 'join',   name: 'Prensas de ensamblaje',             icon: '🔗' },
  { id: 'frame_jig',      categoryId: 'join',   name: 'Útiles para marcos y puertas',      icon: '🔗' },
  { id: 'pocket_screw',   categoryId: 'join',   name: 'Tornillos y consumibles pocket hole', icon: '🔗' },

  // ── MAQUINARIA DE TALLER — tipos propios ────────────────────
  { id: 'wood_lathe',     categoryId: 'machinery', name: 'Torno para madera',                 icon: '🏭' },
  { id: 'cnc_router',     categoryId: 'machinery', name: 'CNC / Router CNC',                  icon: '🏭' },
  { id: 'planer_thicknesser', categoryId: 'machinery', name: 'Cepilladora + Regruesadora combinada', icon: '🏭' },
  { id: 'edge_bander',    categoryId: 'machinery', name: 'Canteadora',                        icon: '🏭' },

  // ── ACCESORIOS Y CONSUMIBLES — tipos propios ─────────────────
  { id: 'chisel_set',     categoryId: 'accessories', name: 'Formones y escoplos',             icon: '🔄' },
  { id: 'marking_knife',  categoryId: 'accessories', name: 'Cuchillas de marcar',             icon: '🔄' },
  { id: 'lubricants',     categoryId: 'accessories', name: 'Lubricantes y mantenimiento',     icon: '🔄' },
  { id: 'sandpaper',      categoryId: 'accessories', name: 'Papel de lija (hojas y rollos)',  icon: '🔄' },
  { id: 'finishing_products', categoryId: 'accessories', name: 'Barnices, aceites y ceras',   icon: '🔄' },

  // ── NUEVA CATEGORÍA: Baterías y cargadores ───────────────────
  { id: 'battery_pack',    categoryId: 'battery', name: 'Baterías',                        icon: '🔋' },
  { id: 'charger',         categoryId: 'battery', name: 'Cargadores',                      icon: '🔋' },
  { id: 'battery_kit',     categoryId: 'battery', name: 'Kits de inicio con batería',      icon: '🔋' },
  { id: 'battery_station', categoryId: 'battery', name: 'Estaciones de carga',             icon: '🔋' },

  // ── NUEVA CATEGORÍA: Organización y taller ───────────────────
  { id: 'toolbox',          categoryId: 'storage', name: 'Cajas de herramientas',           icon: '📦' },
  { id: 'systainer',        categoryId: 'storage', name: 'Sistemas modulares (SYSTAINER / TSTAK)', icon: '📦' },
  { id: 'wall_storage',     categoryId: 'storage', name: 'Almacenamiento de pared',         icon: '📦' },
  { id: 'tool_cart',        categoryId: 'storage', name: 'Carros de herramientas',          icon: '📦' },
  { id: 'workbench_acc',    categoryId: 'storage', name: 'Accesorios de banco de trabajo',  icon: '📦' },
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

  // Carpintería española
  { id: 'virutex', name: 'Virutex', tiers: ['mid', 'pro'], level: 'pro', origin: 'ES' },

  // Adhesivos y consumibles
  { id: 'titebond', name: 'Titebond', tiers: ['mid', 'pro'], level: 'accessories', origin: 'US' },
  { id: 'ceys', name: 'Ceys', tiers: ['basic', 'mid'], level: 'accessories', origin: 'ES' },

  // Medición especializada
  { id: 'stabila', name: 'Stabila', tiers: ['mid', 'pro'], level: 'accessories', origin: 'DE' },
  { id: 'tajima', name: 'Tajima', tiers: ['mid'], level: 'accessories', origin: 'JP' },

  // Organización
  { id: 'sortimo', name: 'Sortimo', tiers: ['pro'], level: 'pro', origin: 'DE' },

  // ── Acabado superficial y abrasivos ──────────────────────────────
  { id: 'osmo', name: 'Osmo', tiers: ['mid', 'pro'], level: 'accessories', origin: 'DE' },
  { id: 'rubio_monocoat', name: 'Rubio Monocoat', tiers: ['pro'], level: 'accessories', origin: 'BE' },
  { id: 'mirka', name: 'Mirka', tiers: ['mid', 'pro'], level: 'accessories', origin: 'FI' },
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

  // ─── DEXTER (Brico Dépôt, básica francesa) ───────────────────
  { id: 'dexter-dd18v', typeId: 'drill_driver', brandId: 'dexter', model: 'Taladro 18V Li-Ion', tier: 'basic', use: ['home'], power: 'battery', priceMin: 25, priceMax: 45, description: 'Taladro atornillador 18V de la marca propia de Brico Dépôt. Batería y cargador incluidos.', features: ['18V', '25Nm', 'Batería incluida', '10 posiciones par'], bestFor: 'Primeras herramientas de bricolaje' },
  { id: 'dexter-cs165', typeId: 'circular_saw', brandId: 'dexter', model: 'Sierra Circular 1200W', tier: 'basic', use: ['home'], power: 'corded', priceMin: 25, priceMax: 40, description: 'Sierra circular 1200W, disco 165mm. Muy económica para cortes ocasionales en tableros.', features: ['1200W', '165mm', 'Guía paralela', 'Precio Brico Dépôt'], bestFor: 'Cortes esporádicos en bricolaje' },
  { id: 'dexter-os125', typeId: 'orbital_sander', brandId: 'dexter', model: 'Lijadora Orbital 230W', tier: 'basic', use: ['home'], power: 'corded', priceMin: 15, priceMax: 28, description: 'Lijadora orbital 230W, plato 125mm. La más económica del mercado con aspiración.', features: ['230W', '125mm', 'Aspiración', 'Muy económica'], bestFor: 'Lijar muebles de forma ocasional' },

  // ─── POWERPLUS (básica belga) ─────────────────────────────────
  { id: 'pp-pow00820', typeId: 'drill_driver', brandId: 'powerplus', model: 'POWX00820', tier: 'basic', use: ['home'], power: 'battery', priceMin: 28, priceMax: 48, description: 'Taladro atornillador 20V con batería de litio. Muy accesible para empezar.', features: ['20V', '25Nm', 'LED', 'Batería incluida'], bestFor: 'Primeras herramientas en casa' },
  { id: 'pp-pow48100', typeId: 'jigsaw', brandId: 'powerplus', model: 'POWX048100', tier: 'basic', use: ['home'], power: 'corded', priceMin: 18, priceMax: 32, description: 'Sierra de calar 450W. Corta madera hasta 60mm. Velocidad variable.', features: ['450W', '60mm madera', 'Velocidad variable', 'Económica'], bestFor: 'Cortes curvos en tableros finos' },
  { id: 'pp-pow7010', typeId: 'orbital_sander', brandId: 'powerplus', model: 'POWX0701', tier: 'basic', use: ['home'], power: 'corded', priceMin: 14, priceMax: 26, description: 'Lijadora orbital 135W, base 93×185mm. La opción de menor precio del mercado.', features: ['135W', '93×185mm', 'Aspiración', 'Bajo precio'], bestFor: 'Lijar con presupuesto muy ajustado' },

  // ─── KOMA TOOLS (básica española) ────────────────────────────
  { id: 'koma-dd18v', typeId: 'drill_driver', brandId: 'koma_tools', model: 'Taladro 18V', tier: 'basic', use: ['home'], power: 'battery', priceMin: 22, priceMax: 40, description: 'Taladro atornillador 18V de la marca española Koma. Habitual en ferreterías y bricocentros.', features: ['18V', '28Nm', 'Batería NiMH', 'Maletín'], bestFor: 'Bricolaje doméstico básico' },
  { id: 'koma-cs190', typeId: 'circular_saw', brandId: 'koma_tools', model: 'Sierra Circular 1200W', tier: 'basic', use: ['home'], power: 'corded', priceMin: 22, priceMax: 38, description: 'Sierra circular 1200W, disco 190mm. Distribuida en ferreterías españolas. Precio mínimo.', features: ['1200W', '190mm', 'Profundidad 63mm', 'Guía paralela'], bestFor: 'Cortes de tablero en casa' },
  { id: 'koma-os125', typeId: 'orbital_sander', brandId: 'koma_tools', model: 'Lijadora Orbital 180W', tier: 'basic', use: ['home'], power: 'corded', priceMin: 14, priceMax: 25, description: 'Lijadora orbital compacta 180W, 125mm. Ligera y fácil de manejar.', features: ['180W', '125mm', 'Bolsa aspiración'], bestFor: 'Lijar con herramienta española económica' },

  // ─── TOOLSON (básica alemana) ─────────────────────────────────
  { id: 'toolson-dd20v', typeId: 'drill_driver', brandId: 'toolson', model: 'Taladro 20V', tier: 'basic', use: ['home'], power: 'battery', priceMin: 32, priceMax: 55, description: 'Taladro atornillador 20V con batería de litio. Marca blanca alemana de calidad básica.', features: ['20V', '30Nm', '13 posiciones', 'LED'], bestFor: 'Bricolaje doméstico general' },
  { id: 'toolson-cs185', typeId: 'circular_saw', brandId: 'toolson', model: 'Sierra Circular 1400W', tier: 'basic', use: ['home'], power: 'corded', priceMin: 30, priceMax: 52, description: 'Sierra circular 1400W, disco 185mm. Potencia ligeramente superior al mínimo de la gama.', features: ['1400W', '185mm', 'Profundidad 68mm', 'Guía aluminio'], bestFor: 'Cortes en tableros y madera de sección media' },
  { id: 'toolson-ms210', typeId: 'miter_saw', brandId: 'toolson', model: 'Ingletadora 1600W', tier: 'basic', use: ['home', 'workshop'], power: 'corded', priceMin: 65, priceMax: 110, description: 'Ingletadora de mesa 1600W, disco 210mm. Giros ±45°. Precio de entrada al mundo de los ingletes.', features: ['1600W', '210mm', '±45° inglete', 'Mesa ajustable'], bestFor: 'Cortes de rodapiés y molduras en casa' },

  // ─── VITO (básica española) ───────────────────────────────────
  { id: 'vito-vtdd18', typeId: 'drill_driver', brandId: 'vito', model: 'VTDL18LI', tier: 'basic', use: ['home'], power: 'battery', priceMin: 22, priceMax: 42, description: 'Taladro atornillador 18V litio. Marca española con presencia en ferreterías y grandes superficies.', features: ['18V', '28Nm', '2 velocidades', 'LED'], bestFor: 'Montar muebles y colgar elementos' },
  { id: 'vito-vtsc190', typeId: 'circular_saw', brandId: 'vito', model: 'VTSC190', tier: 'basic', use: ['home'], power: 'corded', priceMin: 20, priceMax: 36, description: 'Sierra circular 1200W, disco 190mm. Alternativa española muy económica para cortes de tablero.', features: ['1200W', '190mm', 'Guía paralela', 'Muy económica'], bestFor: 'Cortes ocasionales de tableros' },
  { id: 'vito-vtos125', typeId: 'orbital_sander', brandId: 'vito', model: 'VTOS125', tier: 'basic', use: ['home'], power: 'corded', priceMin: 14, priceMax: 26, description: 'Lijadora orbital 200W, plato 125mm. Compacta y ligera para uso doméstico.', features: ['200W', '125mm', 'Aspiración', 'Ligera'], bestFor: 'Lijar muebles y superficies pequeñas' },

  // ─── KWB (accesorios alemanes) ────────────────────────────────
  { id: 'kwb-abr125s', typeId: 'abrasives', brandId: 'kwb', model: 'Set lijas 125mm 50 uds', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 8, priceMax: 16, description: 'Set 50 discos de lija 125mm multiperforados. Granos P40-P240. Compatible con cualquier orbital.', features: ['50 uds', '125mm', 'Granos P40-P240', 'Multiperforado'], bestFor: 'Reabastecer lijas de lijadora orbital' },
  { id: 'kwb-sb190t', typeId: 'saw_blade', brandId: 'kwb', model: 'Disco 190mm 40D madera', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 7, priceMax: 14, description: 'Disco de sierra circular 190mm, 40 dientes para madera. Corte limpio en tableros y pino.', features: ['190mm', '40 dientes', 'Madera blanda y tableros', 'Alemán'], bestFor: 'Cortes de uso general en madera' },
  { id: 'kwb-rb6s', typeId: 'router_bits', brandId: 'kwb', model: 'Set 6 fresas vástago 6mm', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 14, priceMax: 25, description: 'Set básico 6 fresas de carburo, vástago 6mm. Perfilado, redondeado, ranurado. Precio entrada.', features: ['6 fresas', 'Vástago 6mm', 'Carburo', 'Maletín'], bestFor: 'Iniciarse en el fresado con router pequeño' },

  // ═══ BROCAS FORSTNER ═══
  { id: 'fors-bosch15s', typeId: 'forstner_bits', brandId: 'bosch_blue', model: 'Set Forstner 6 pcs (15–35 mm)', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 42, priceMax: 65, description: 'Set 6 brocas Forstner HSS 15, 20, 25, 30, 35 mm + llave. Ideal para bisagras y taladros de fondo plano.', features: ['6 piezas', '15–35 mm', 'HSS', 'Corte limpio'], bestFor: 'Taladrar cavidades planas para bisagras y cajones' },
  { id: 'fors-mak5s',   typeId: 'forstner_bits', brandId: 'makita',    model: 'D-36887 Set Forstner 5 pcs', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 22, priceMax: 38, description: '5 brocas Forstner 15–35 mm. Mango hexagonal evita el resbalamiento. Calidad Makita a precio medio.', features: ['5 piezas', '15–35 mm', 'Mango hex'], bestFor: 'Taller doméstico y semiprofesional' },
  { id: 'fors-sil13s',  typeId: 'forstner_bits', brandId: 'silverline', model: '598549 Set 13 pcs', tier: 'basic', use: ['home'], power: 'manual', priceMin: 12, priceMax: 20, description: 'Set 13 brocas Forstner 10–50 mm. Acero carbono. Económico para uso ocasional.', features: ['13 piezas', '10–50 mm', 'Acero carbono'], bestFor: 'Bricolaje doméstico esporádico' },
  { id: 'fors-famag35',  typeId: 'forstner_bits', brandId: 'festool',   model: 'Famag 35 mm IG', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 28, priceMax: 45, description: 'Broca Forstner 35 mm para bisagras de cazoleta europeas. Larga vida útil en producción.', features: ['35 mm', 'Para bisagras europeas', 'Acero inox'], bestFor: 'Instalación de bisagras de cazoleta en serie' },

  // ═══ BROCAS PARA MADERA ═══
  { id: 'wb-cmt7s',  typeId: 'wood_bits', brandId: 'cmt_orange_tools', model: 'Set 7 brocas espiral C Helical', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 38, priceMax: 60, description: '7 brocas de espiral helicoidal 3–10 mm. Corte limpio en madera maciza. Recubrimiento PTFE naranja.', features: ['7 piezas', '3–10 mm', 'Espiral helicoidal', 'PTFE'], bestFor: 'Taladrado limpio en ebanistería' },
  { id: 'wb-bosch8s', typeId: 'wood_bits', brandId: 'bosch_blue', model: '2608577308 Set 6 brocas madera', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 18, priceMax: 30, description: '6 brocas espiral para madera 3–10 mm. Punta de cuchilla de acero. Gran rendimiento en taladros Bosch.', features: ['6 piezas', '3–10 mm', 'Punta cuchilla'], bestFor: 'Uso general en madera y tablero' },
  { id: 'wb-irwin10s', typeId: 'wood_bits', brandId: 'irwin',      model: 'SPEEDBOR Max Set 10 pcs', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 22, priceMax: 38, description: '10 brocas Speedbor con doble punta de guía. Velocidad de avance muy alta.', features: ['10 piezas', '6–25 mm', 'Doble punta guía', 'Alta velocidad'], bestFor: 'Taladrado rápido en obra y taller' },

  // ═══ BROCAS DE PALA ═══
  { id: 'spade-stl6s',  typeId: 'spade_bits', brandId: 'stanley',    model: 'STA52035 Set 6 pcs 16–38 mm', tier: 'basic', use: ['home'], power: 'manual', priceMin: 10, priceMax: 18, description: 'Set 6 brocas de pala 16, 19, 22, 25, 32, 38 mm. Acero carbono. Básico y muy económico.', features: ['6 piezas', '16–38 mm', 'Acero carbono'], bestFor: 'Pasar cable o tubería por madera' },
  { id: 'spade-irw8s',  typeId: 'spade_bits', brandId: 'irwin',      model: 'SPEEDBOR Spade Set 8 pcs', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 18, priceMax: 30, description: '8 brocas de pala Irwin con borde palmeado para evacuación rápida de virutas. 16–38 mm.', features: ['8 piezas', '16–38 mm', 'Evacuación rápida', 'Borde palmeado'], bestFor: 'Instalaciones eléctricas y fontanería' },

  // ═══ AVELLANADORES ═══
  { id: 'csink-wf4s', typeId: 'countersink', brandId: 'wolfcraft',  model: '2577000 Set 4 avellanadores', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 9, priceMax: 16, description: 'Set 4 avellanadores combinados con broca integrada para tornillo de 3 a 5 mm. Mango hex.', features: ['4 piezas', '3–5 mm tornillo', 'Broca integrada', 'Mango hex'], bestFor: 'Ocultar cabeza de tornillo en madera' },
  { id: 'csink-trd3s', typeId: 'countersink', brandId: 'trend',     model: 'SNAP/CS/SET3 Snappy Set', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 22, priceMax: 38, description: 'Set 3 avellanadores rápidos con cambio de broca snap-action. Profundidad ajustable. Calidad profesional.', features: ['3 piezas', 'Snap-action', 'Profundidad ajustable'], bestFor: 'Semiprofesional con pocket hole y ensamblaje fino' },
  { id: 'csink-kw1',  typeId: 'countersink', brandId: 'kwb',        model: 'Avellanador 5 en 1 ø 4 mm', tier: 'basic', use: ['home'], power: 'manual', priceMin: 6, priceMax: 12, description: 'Avellanador 5 en 1 para tornillo ø4. Broca + avellanado + espiga. Económico.', features: ['5 en 1', 'ø4 mm', 'Espiga', 'Broca'], bestFor: 'Bricolaje doméstico' },

  // ═══ SETS DE PUNTAS Y BROCAS ═══
  { id: 'bits-bosch103', typeId: 'bit_set', brandId: 'bosch_blue', model: '2607017164 Set 103 piezas', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 55, priceMax: 80, description: '103 piezas: brocas HSS, madera, hormigón, puntas PH/PZ/TX, adaptadores. Todo en una caja.', features: ['103 piezas', 'Multi-material', 'Caja organizada'], bestFor: 'Taller completo sin buscar piezas sueltas' },
  { id: 'bits-stl68',   typeId: 'bit_set', brandId: 'stanley',    model: 'STA-57-541 Set 68 piezas', tier: 'basic', use: ['home'], power: 'manual', priceMin: 18, priceMax: 30, description: '68 piezas con brocas y puntas de uso común. Estuche compacto. Perfecto para el hogar.', features: ['68 piezas', 'Maletín compacto', 'Multi-material'], bestFor: 'Bricolaje doméstico general' },
  { id: 'bits-mak40',   typeId: 'bit_set', brandId: 'makita',    model: 'D-30667 Set 40 puntas Impact', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 22, priceMax: 36, description: '40 puntas Impact-rated para atornilladores de impacto. PH, PZ, TX, planas. Acero CrMo.', features: ['40 puntas', 'Impact-rated', 'CrMo', 'Magnéticas'], bestFor: 'Atornillado intensivo con impacto' },

  // ═══ GRAPADORAS ═══
  { id: 'stpl-stl-tr150', typeId: 'stapler', brandId: 'stanley',   model: 'TR150HL Heavy Duty', tier: 'basic', use: ['home'], power: 'manual', priceMin: 18, priceMax: 30, description: 'Tacker manual resistente para grapas de 6 a 14 mm. Antibloqueo. Muy popular en España.', features: ['6–14 mm', 'Antibloqueo', 'Mango bimaterial'], bestFor: 'Tapizado, fijación de tela y lonas' },
  { id: 'stpl-wf-7039',   typeId: 'stapler', brandId: 'wolfcraft', model: '7039000 Set con grapas', tier: 'basic', use: ['home'], power: 'manual', priceMin: 12, priceMax: 20, description: 'Grapadora manual + 1000 grapas incluidas. Apta para 6–14 mm. Para manualidades y DIY.', features: ['6–14 mm', '1000 grapas incluidas', 'Ligera'], bestFor: 'Proyectos de manualidades y tapizado ligero' },

  // ═══ GATOS DE BARRA (bar clamps) ═══
  { id: 'bc-besy-kr90',  typeId: 'bar_clamps', brandId: 'bessey',  model: 'KR3.524+2K 90 cm', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 38, priceMax: 58, description: 'Gato de barra Bessey KR 90 cm con mordaza de 300 kgf. El estándar de taller europeo.', features: ['90 cm', '300 kgf', 'Mordaza giratoria', 'Bimaterial'], bestFor: 'Encolado de tableros y marcos grandes' },
  { id: 'bc-besy-kr60',  typeId: 'bar_clamps', brandId: 'bessey',  model: 'KR3.518+2K 60 cm', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 28, priceMax: 44, description: 'Gato de barra 60 cm. Presión uniforme para encolado fino. Referencia en carpintería fina.', features: ['60 cm', '300 kgf', 'Doble mordaza'], bestFor: 'Encolado de marcos y puertas' },
  { id: 'bc-piher-600',  typeId: 'bar_clamps', brandId: 'piher',   model: 'Maxipress 600 mm', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 16, priceMax: 26, description: 'Gato de barra Piher 600 mm, fabricación española. Relación calidad-precio imbatible.', features: ['600 mm', 'Fabricado en España', 'Rueda rápida'], bestFor: 'Encolado y presión con relación calidad-precio' },
  { id: 'bc-irw-qg60',   typeId: 'bar_clamps', brandId: 'irwin',   model: 'Quick-Grip 600 mm', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 20, priceMax: 35, description: 'Sargento de acción rápida 600 mm, 113 kgf. Disparo con una mano. Muy versátil.', features: ['600 mm', '113 kgf', 'Una mano', 'Giro invertido (separador)'], bestFor: 'Sujeción rápida en obras y taller' },

  // ═══ PINZAS DE RESORTE (spring clamps) ═══
  { id: 'sc-wf-100mm',  typeId: 'spring_clamps', brandId: 'wolfcraft', model: 'Set 6 pinzas 100 mm', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 10, priceMax: 18, description: '6 pinzas de resorte 100 mm con mordaza de plástico protectora. Uso doméstico y taller.', features: ['100 mm', '6 unidades', 'Mordaza plástico', 'Rápidas'], bestFor: 'Sujetar piezas pequeñas durante el secado de cola' },
  { id: 'sc-stl-mixed4', typeId: 'spring_clamps', brandId: 'stanley',  model: 'FMHT0-83234 Set 4 Mixed', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 14, priceMax: 22, description: '4 pinzas de resorte mix: 2×75mm + 2×150mm. FatMax con agarre ergonómico. Resistencia extra.', features: ['4 unidades', 'Mix 75+150 mm', 'FatMax', 'Ergonómica'], bestFor: 'Versatilidad en pequeñas fijaciones' },
  { id: 'sc-irw-150',   typeId: 'spring_clamps', brandId: 'irwin',    model: '10506484 150 mm', tier: 'basic', use: ['home'], power: 'manual', priceMin: 7, priceMax: 13, description: 'Pinza de resorte 150 mm. Mango bimaterial. Económica y resistente.', features: ['150 mm', 'Bimaterial', 'Económica'], bestFor: 'Sujeción general DIY' },

  // ═══ ÚTILES PARA MARCOS (frame clamps) ═══
  { id: 'fc-wf-marco4', typeId: 'frame_clamps', brandId: 'wolfcraft', model: '3415000 Prensa de marcos 4 cantos', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 22, priceMax: 38, description: '4 esquineros + cuerda con tensor para prensar marcos de hasta 1000 mm por lado.', features: ['4 esquineros', 'Cuerda tensor', 'Hasta 1000 mm', 'Con nivel'], bestFor: 'Fabricar marcos de cuadros y puertas pequeñas' },
  { id: 'fc-besy-mfk',  typeId: 'frame_clamps', brandId: 'bessey',   model: 'MFK Set 4 esquinas', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 55, priceMax: 85, description: 'Set 4 esquineros Bessey MFT ajustables 0–90°. Encolado de marcos complejos. Referencia profesional.', features: ['4 piezas', '0–90°', 'Ajustables', 'Profesional'], bestFor: 'Marcos de ventana, cuadros y puertas en taller' },

  // ═══ SARGENTOS DE TUBO (pipe clamps) ═══
  { id: 'pc-besy-tp40', typeId: 'pipe_clamps', brandId: 'bessey', model: 'TP400S Mordaza para tubo ø40', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 28, priceMax: 45, description: 'Mordaza Bessey para tubo de ø40 mm. Capacidad ilimitada según longitud de tubo. Ideal para tableros.', features: ['ø40 mm', 'Capacidad ilimitada', 'Acero'], bestFor: 'Encolado de tableros anchos a medida' },
  { id: 'pc-irw-pipe',  typeId: 'pipe_clamps', brandId: 'irwin',  model: 'PRO-LOCK Mordaza de tubo', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 18, priceMax: 30, description: 'Mordaza para tubo ø3/4". Acción rápida con palanca. Compatible con tubo estándar de ferretería.', features: ['ø3/4"', 'Palanca rápida', 'Compatible tubo estándar'], bestFor: 'Encolado de largo alcance en taller' },

  // ═══ LIJADORA DELTA / TRIANGULAR ═══
  { id: 'ds-boschgss18', typeId: 'delta_sander', brandId: 'bosch_blue',  model: 'GSS 18V-10 (Batería)', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 140, priceMax: 190, description: 'Lijadora delta 18V sin cable. 3 mm de órbita. Perfecta para rincones y perfiles. Aspiración integrada.', features: ['18V', '3 mm órbita', 'Sin cable', 'Aspiración'], bestFor: 'Lijar esquinas y perfiles complejos' },
  { id: 'ds-boschpss250', typeId: 'delta_sander', brandId: 'bosch_green', model: 'PSM 250 (Multisander)', tier: 'basic', use: ['home'], power: 'corded', priceMin: 38, priceMax: 58, description: '250W, delta + orbital + línea. Platos intercambiables. Para muebles, rincones y superficies planas.', features: ['250W', '3 platos intercambiables', 'Delta + orbital'], bestFor: 'Todo en uno para el hogar' },
  { id: 'ds-stlfme430',  typeId: 'delta_sander', brandId: 'stanley_fatmax', model: 'FME430 Detail Sander', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 38, priceMax: 58, description: '220W con plato delta. Velcro. Compatible con sistema de aspiración. Perfilado limpio.', features: ['220W', 'Velcro', 'Aspiración', 'Perfiles'], bestFor: 'Lijar molduras y muebles con rincones' },

  // ═══ PULIDORA / SATINADORA ═══
  { id: 'pol-boschgpo12', typeId: 'polisher', brandId: 'bosch_blue',  model: 'GPO 12 CE 1200W', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 185, priceMax: 240, description: 'Pulidora excéntrica 1200W, 600–3000 rpm. Disco ø150. Para acabado de barnices, lacas y ceras.', features: ['1200W', '600–3000 rpm', 'ø150 mm', 'Excéntrica'], bestFor: 'Acabado fino de superficies lacadas y enceradas' },
  { id: 'pol-makpo5000',  typeId: 'polisher', brandId: 'makita',      model: 'PO5000C 1200W', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 130, priceMax: 175, description: 'Pulidora orbital Makita 1200W. Velocidad variable 600–2800 rpm. Ligera para trabajo largo.', features: ['1200W', '600–2800 rpm', '2.2 kg', 'Variable'], bestFor: 'Pulido de muebles y superficies barnizadas' },
  { id: 'pol-flex-pe14',  typeId: 'polisher', brandId: 'flex',        model: 'PE 14-2 150', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 210, priceMax: 280, description: 'Pulidora rotativa profesional 1400W. Máximo brillo en superficies tratadas. Referencia en acabados.', features: ['1400W', 'Rotativa', 'ø150 mm', 'Profesional'], bestFor: 'Acabado de laca poliuretano y cera de carnauba' },

  // ═══ ESTACIÓN LIJADORA BANDA + DISCO ═══
  { id: 'cbs-sch-bts900', typeId: 'combo_sander', brandId: 'scheppach', model: 'BTS900 (bandas + disco)', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 130, priceMax: 180, description: 'Estación combinada lijadora de banda 75×533mm + disco ø200mm. Mesa inclinable 0–45°. Mesa de trabajo resistente.', features: ['Banda 75×533', 'Disco ø200', 'Mesa 0–45°', '370W'], bestFor: 'Lijar cantos y conformar perfiles en taller' },
  { id: 'cbs-hol-sb250',  typeId: 'combo_sander', brandId: 'holzmann', model: 'BTS 250 (banda + disco)', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 145, priceMax: 200, description: 'Lijadora combinada banda + disco Holzmann. Potente y robusta para uso semiprofesional continuado.', features: ['Banda + disco', 'Mesa ajustable', 'Aspiración', 'Semipro'], bestFor: 'Lijado de conformado en taller doméstico avanzado' },

  // ═══ METRO / CINTA MÉTRICA ═══
  { id: 'tm-stl-fm8',  typeId: 'tape_measure', brandId: 'stanley',   model: 'FatMax 8m FMHT33865-1', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 16, priceMax: 26, description: 'Metro FatMax 8m con cinta BladeArmor. Cinta rígida auto-extensible 3.5m. El más vendido de España.', features: ['8 m', 'BladeArmor', 'Extensión 3.5 m', 'Gancho reforzado'], bestFor: 'Medición general en obra y taller' },
  { id: 'tm-stl-pl5',  typeId: 'tape_measure', brandId: 'stanley',   model: 'PowerLock 5m 33-158', tier: 'basic', use: ['home'], power: 'manual', priceMin: 8, priceMax: 14, description: 'Metro clásico PowerLock 5m. Referencia histórica de calidad-precio. Gancho magnético.', features: ['5 m', 'Gancho magnético', 'Clásico'], bestFor: 'Bricolaje doméstico' },
  { id: 'tm-tajima25', typeId: 'tape_measure', brandId: 'tajima',    model: 'GS-550MY 5.5m', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 32, priceMax: 50, description: 'Cinta Tajima 5.5m con regla endurancida ACCU-feel. Precisión JIS 1ª. Estándar japonés.', features: ['5.5 m', 'ACCU-feel', 'JIS 1ª', 'Gancho directo'], bestFor: 'Marcado de precisión en ebanistería y carpintería fina' },

  // ═══ INCLINÓMETRO DIGITAL ═══
  { id: 'incl-bos-wm4',   typeId: 'inclinometer', brandId: 'bosch_blue',  model: 'WM 4 Medidor digital 4 en 1', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 85, priceMax: 120, description: 'Medidor de ángulos, distancias, horizontal y vertical. Memoria de ángulos. Perfecto para ingletadoras.', features: ['4 funciones', 'Memoria', 'IP54', 'Para ingletadoras'], bestFor: 'Ajuste preciso de ángulos en cortes de inglete' },
  { id: 'incl-wf-4900',   typeId: 'inclinometer', brandId: 'wolfcraft',  model: 'Digitaler Winkelmesser', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 22, priceMax: 38, description: 'Inclinómetro digital 0–360° con imán integrado. Pantalla LCD. Precisión ±0,2°.', features: ['0–360°', 'Imán', 'LCD', '±0.2°'], bestFor: 'Verificar ángulos en ensamblaje y montaje' },

  // ═══ GONIÓMETRO / TRANSFERIDOR ═══
  { id: 'prot-wf-tp200', typeId: 'protractor', brandId: 'wolfcraft', model: '5209000 Transportador ajustable', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 18, priceMax: 30, description: 'Goniómetro ajustable 0–180° con bloqueo. Transfiere ángulos directamente a la sierra o fresadora.', features: ['0–180°', 'Bloqueo', 'Aluminio', 'Transferencia directa'], bestFor: 'Copiar y transferir ángulos en taller' },
  { id: 'prot-stl-bst', typeId: 'protractor', brandId: 'stanley',   model: 'Sliding Bevel STHT43122', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 12, priceMax: 20, description: 'Falsa escuadra de 300mm. Hoja de acero inoxidable. Bloqueo por palomilla. Clásico carpintero.', features: ['300 mm', 'Inox', 'Palomilla'], bestFor: 'Copiar ángulos en madera maciza y carpintería tradicional' },

  // ═══ SIERRA DE MARQUETERÍA ═══
  { id: 'ss-sch-sd1600', typeId: 'scroll_saw', brandId: 'scheppach', model: 'SD 1600V 100W', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 180, priceMax: 260, description: '100W, garganta 406mm, velocidad variable. Cortes curvos finos en madera de hasta 50mm. Mesa inclinable.', features: ['100W', 'Garganta 406mm', 'Vel. variable', 'Mesa inclinable'], bestFor: 'Marquetería, figuras y cortes curvos decorativos' },
  { id: 'ss-femi-401',   typeId: 'scroll_saw', brandId: 'femi',     model: 'CL-401 160W Promo', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 210, priceMax: 300, description: 'Sierra de cinta fina italiana 160W. Capacidad de corte 50mm. Robusta y estable para uso continuado.', features: ['160W', '50mm', 'Italiana', 'Robusta'], bestFor: 'Cortes finos de precisión en taller semiprofesional' },
  { id: 'ss-prox-ds230', typeId: 'scroll_saw', brandId: 'proxxon',  model: 'DS 230/E 90W', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 175, priceMax: 235, description: 'Sierra de hilo 90W, garganta 230mm. Para madera hasta 45mm y materiales blandos. Muy precisa.', features: ['90W', 'Garganta 230mm', '45mm madera', 'Muy precisa'], bestFor: 'Marquetería fina y piezas de pequeño formato' },

  // ═══ ESCOPLEADORA ═══
  { id: 'mort-jet-jbm5', typeId: 'mortiser', brandId: 'jet',       model: 'JBM-5 Benchtop', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 380, priceMax: 500, description: '600W, mesa XY ajustable, profundidad 89mm. El estándar americano para mortajas de precisión en taller.', features: ['600W', 'Mesa XY', '89mm prof.', 'Mordaza chuck 5/8"'], bestFor: 'Mortajas precisas para espiga y mortaja en carpintería fina' },
  { id: 'mort-hol-bkm', typeId: 'mortiser', brandId: 'holzmann',  model: 'BKM 16 (escoplo ø16)', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 220, priceMax: 310, description: '750W, escoplo hasta ø16mm, profundidad 80mm. Mesa basculante. Relación calidad-precio para taller doméstico.', features: ['750W', 'ø hasta 16mm', 'Mesa basculante', '80mm'], bestFor: 'Escopleado en madera maciza para taller avanzado' },

  // ═══ PISTOLA DE COLA CALIENTE ═══
  { id: 'gg-bosch-pkp18', typeId: 'glue_gun', brandId: 'bosch_green', model: 'PKP 18 E 200W', tier: 'basic', use: ['home'], power: 'corded', priceMin: 18, priceMax: 30, description: '200W, barra ø11mm, calentamiento en 5 min. Ideal para manualidades, tapizado y ensamblaje ligero.', features: ['200W', 'ø11mm', 'Calentamiento 5min', 'Seguridad térmida'], bestFor: 'Manualidades, decoración y ensamblaje rápido' },
  { id: 'gg-stl-ggk18',  typeId: 'glue_gun', brandId: 'stanley',    model: 'GR20K Kit con barras', tier: 'basic', use: ['home'], power: 'corded', priceMin: 12, priceMax: 22, description: 'Pistola 40W + 6 barras 11mm incluidas. Económica y ligera. Para trabajos ocasionales.', features: ['40W', '6 barras incluidas', 'Ligera', 'Económica'], bestFor: 'Bricolaje doméstico esporádico' },

  // ═══ CLAVADORA DE ACABADO 16G ═══
  { id: 'fn-dew-dcn660', typeId: 'finish_nailer', brandId: 'dewalt',  model: 'DCN660P2 Brushless 18V', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 280, priceMax: 370, description: 'Clavadora 16G sin gas, 18V brushless. Clavos 32–63mm. Modo profundidad ajustable. Referencia pro sin cable.', features: ['18V', '16G', '32–63mm', 'Sin gas', 'Brushless'], bestFor: 'Acabados de carpintería: rodapiés, molduras, paneles' },
  { id: 'fn-mak-dfn350', typeId: 'finish_nailer', brandId: 'makita',  model: 'DFN350Z 18V Brad', tier: 'mid', use: ['workshop'], power: 'battery', priceMin: 175, priceMax: 235, description: 'Clavadora de cuadradillo 18V (sin batería). Clavos 15–35mm. Silenciosa y sin compresor.', features: ['18V', '15–35mm', 'Sin batería', 'Sin compresor'], bestFor: 'Paneles, listones y trabajo fino en taller' },

  // ═══ BATERÍAS ═══
  { id: 'bat-mak-bl1850', typeId: 'battery_pack', brandId: 'makita',    model: 'BL1850B 18V 5,0Ah', tier: 'mid', use: ['workshop'], power: 'battery', priceMin: 55, priceMax: 78, description: 'Batería Li-ion 18V 5Ah con indicador de carga. Compatible con todo el ecosistema LXT de Makita.', features: ['18V', '5.0Ah', 'LXT', 'Indicador LED'], bestFor: 'Ampliar autonomía de cualquier herramienta Makita 18V' },
  { id: 'bat-dew-dcb184', typeId: 'battery_pack', brandId: 'dewalt',    model: 'DCB184 18V 5,0Ah XR', tier: 'mid', use: ['workshop'], power: 'battery', priceMin: 58, priceMax: 82, description: 'Batería XR 18V 5Ah. Compatible con toda la plataforma XR de DeWalt. Con indicador de 3 LEDs.', features: ['18V', '5.0Ah', 'XR', '3-LED'], bestFor: 'Batería de uso intensivo para profesionales DeWalt' },
  { id: 'bat-bos-gba50',  typeId: 'battery_pack', brandId: 'bosch_blue', model: 'GBA 18V 5,0Ah ProCore', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 72, priceMax: 100, description: 'ProCore 18V 5Ah. Gestión térmica avanzada. Carga en 35 min con GAL 18V-160. Profesional.', features: ['18V', '5.0Ah', 'ProCore', 'Carga 35 min'], bestFor: 'Uso profesional intensivo con herramientas Bosch Azul' },
  { id: 'bat-mil-hd50',   typeId: 'battery_pack', brandId: 'milwaukee',  model: 'M18 REDLITHIUM HD 5,0Ah', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 88, priceMax: 125, description: 'M18 REDLITHIUM HIGH DEMAND 5Ah. Máximo rendimiento en herramientas de alta demanda. 30% más potencia.', features: ['18V', '5.0Ah', 'REDLITHIUM HD', '+30% potencia'], bestFor: 'Herramientas M18 FUEL de alta demanda' },
  { id: 'bat-mak-bl1830', typeId: 'battery_pack', brandId: 'makita',    model: 'BL1830B 18V 3,0Ah', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 35, priceMax: 52, description: 'Batería compacta 18V 3Ah. Ligera y equilibrada. Perfecta para herramientas de mano.', features: ['18V', '3.0Ah', 'LXT', 'Compacta'], bestFor: 'Taladros y atornilladores de uso doméstico-taller' },

  // ═══ CARGADORES ═══
  { id: 'chg-mak-dc18rc', typeId: 'charger', brandId: 'makita',    model: 'DC18RC Rápido 18V', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 38, priceMax: 55, description: 'Cargador rápido 18V con refrigeración activa. Carga 3Ah en 22min, 5Ah en 45min. Indicador LED.', features: ['18V', 'Carga rápida', '22 min / 3Ah', 'LED'], bestFor: 'Taller activo con baterías Makita 18V' },
  { id: 'chg-dew-dcb115', typeId: 'charger', brandId: 'dewalt',    model: 'DCB115 18V Slim', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 30, priceMax: 48, description: 'Cargador compacto XR 18V. Carga 1.25A. Compatible con todas las baterías XR Li-ion. Silencioso.', features: ['18V', '1.25A', 'Slim', 'Compatible XR'], bestFor: 'Carga nocturna de baterías DeWalt en el hogar' },
  { id: 'chg-bos-gal40',  typeId: 'charger', brandId: 'bosch_blue', model: 'GAL 18V-40 Rápido', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 48, priceMax: 68, description: 'Cargador 18V 40A con refrigeración activa. Carga GBA 5Ah en 35 min. Pantalla de estado.', features: ['18V', '40A', 'Refrigeración activa', '35 min / 5Ah'], bestFor: 'Carga profesional intensiva de baterías Bosch Azul' },

  // ═══ KITS DE INICIO CON BATERÍA ═══
  { id: 'bkit-mak-dl2', typeId: 'battery_kit', brandId: 'makita',    model: 'DLX2176SY2 Kit 2 herramientas', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 220, priceMax: 310, description: 'Kit LXT: taladro DHP482 + atornillador DTD152 + 2 baterías 3Ah + cargador + maletín. Todo incluido.', features: ['2 herramientas', '2×3Ah', 'Cargador', 'Maletín'], bestFor: 'Empezar el taller 18V Makita con todo incluido' },
  { id: 'bkit-dew-dck2', typeId: 'battery_kit', brandId: 'dewalt',   model: 'DCK255P2 2 Tool Kit', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 250, priceMax: 340, description: 'Kit XR 18V: taladro DCD796 + atornillador DCF887 + 2×5Ah + cargador + maletín TSTAK.', features: ['2 herramientas', '2×5Ah XR', 'TSTAK', 'Cargador rápido'], bestFor: 'Kit completo para taller doméstico y obra' },

  // ═══ CAJAS DE HERRAMIENTAS ═══
  { id: 'tb-stl-1904',   typeId: 'toolbox', brandId: 'stanley',   model: '1-92-904 Metal Tool Box 51cm', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 35, priceMax: 55, description: 'Caja metálica 51cm con bandeja elevable. Cierre robusto. Clásico de taller desde 1950.', features: ['51 cm', 'Metal', 'Bandeja elevable', 'Cierre doble'], bestFor: 'Guardar herramientas manuales y accesorios en taller' },
  { id: 'tb-keter-roll', typeId: 'toolbox', brandId: 'keter',     model: "Stack'N'Roll Sistema modular", tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 65, priceMax: 100, description: 'Sistema apilable con ruedas. Incluye caja superior + carrito inferior. 100L de capacidad.', features: ['Sistema apilable', 'Ruedas', '100L', 'Resistente'], bestFor: 'Transporte y organización entre obra y furgoneta' },
  { id: 'tb-dew-tstak',  typeId: 'toolbox', brandId: 'dewalt',    model: 'DWST1-75614 TSTAK II', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 55, priceMax: 80, description: 'Caja modular TSTAK apilable con clips de encastre. Compatible con toda la gama TSTAK y FlipCart.', features: ['TSTAK', 'Modular', 'Clip-lock', 'IP54'], bestFor: 'Sistema modular de taller profesional DeWalt' },

  // ═══ SISTEMAS MODULARES (SYSTAINER / TSTAK) ═══
  { id: 'sys-fest-t-loc', typeId: 'systainer', brandId: 'festool',  model: 'Systainer³ SYS3 M 187', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 52, priceMax: 80, description: 'Systainer³ M187 con T-LOC. Apilable con Sortimo, Tanos, Makpac. Resistente IP54. Estándar europeo.', features: ['T-LOC', 'Apilable', 'IP54', 'Compatible SYS3'], bestFor: 'Organización profesional de herramientas y accesorios Festool' },
  { id: 'sys-bosch-lboxx', typeId: 'systainer', brandId: 'bosch_blue', model: 'L-BOXX 238 + Inset Box', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 55, priceMax: 82, description: 'L-BOXX con inset configurable. Apilable con toda la gama Click&Go. 15L de capacidad.', features: ['Click&Go', 'Inset configurable', '15L', 'Apilable'], bestFor: 'Sistema de taller profesional Bosch con organización a medida' },

  // ═══ PLANTILLA DE ESPIGAS (dowel jig) ═══
  { id: 'dj-wf-pro',    typeId: 'dowel_jig', brandId: 'wolfcraft', model: 'Dowel Pro 4640000', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 25, priceMax: 42, description: 'Plantilla para espigas redondas ø6, 8, 10mm. Con limitador de profundidad. Acero inox. Fácil de usar.', features: ['ø6/8/10 mm', 'Limitador', 'Acero inox', 'Autoencolado'], bestFor: 'Uniones invisibles con espigas en muebles y estantes' },
  { id: 'dj-kreg-kma',  typeId: 'dowel_jig', brandId: 'kreg',     model: 'Shelf Pin Jig KMA3200', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 32, priceMax: 50, description: 'Plantilla de pines de balda. Paso 32mm. Con tope de profundidad y soporte para taladradora.', features: ['Paso 32mm', 'Tope profundidad', 'Soporte taladro', 'Aluminio'], bestFor: 'Perforar galerías de baldas ajustables en librerías' },
  { id: 'dj-trd-lj6000', typeId: 'dowel_jig', brandId: 'trend',   model: 'LOCK/JIG/6000 Kit Completo', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 58, priceMax: 85, description: 'Kit plantilla de espigas Lock jig con adaptadores para ø6/8/10mm. Muy preciso, con guía autocentrante.', features: ['Autocentrante', 'ø6/8/10mm', 'Adaptadores', 'Alta precisión'], bestFor: 'Uniones de espiga precisas en carpintería semiprofesional' },

  // ═══ COLAS Y ADHESIVOS PARA MADERA ═══
  { id: 'glue-tb-ii',   typeId: 'wood_glue', brandId: 'titebond', model: 'Titebond II Premium 946ml', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 14, priceMax: 22, description: 'Cola PVA impermeable de primera calidad. Resistente al agua. Secado en 30min, curado en 24h.', features: ['946ml', 'Impermeable', 'PVA', 'Secado 30min'], bestFor: 'Encolado de tableros, marcos y piezas de exterior' },
  { id: 'glue-tb-iii',  typeId: 'wood_glue', brandId: 'titebond', model: 'Titebond III Ultimate 473ml', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 16, priceMax: 25, description: 'Cola PVA resistente a la inmersión. Certificación FDA. La referencia profesional americana.', features: ['473ml', 'Resistente inmersión', 'FDA', 'Profesional'], bestFor: 'Ebanistería, tallas y piezas de alta demanda' },
  { id: 'glue-ceys-col', typeId: 'wood_glue', brandId: 'ceys',    model: 'Cola Madera Extra 1kg', tier: 'basic', use: ['home'], power: 'manual', priceMin: 8, priceMax: 15, description: 'Cola de carpintero PVA extra 1kg. La más vendida en España. Rendimiento equilibrado para bricolaje.', features: ['1kg', 'PVA', 'Secado 20min', 'Española'], bestFor: 'Encolado doméstico de piezas de madera y MDF' },

  // ═══ HERRAJES DE UNIÓN ═══
  { id: 'jh-wf-esc',   typeId: 'joint_hardware', brandId: 'wolfcraft', model: 'Set escuadras de unión 30 pcs', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 10, priceMax: 18, description: '30 escuadras de acero galvanizado 40×40×17mm. Fijación oculta en tableros y estructuras.', features: ['30 unidades', '40×40mm', 'Galvanizado', 'Para tablero'], bestFor: 'Reforzar uniones a tope y ángulos en montaje de muebles' },
  { id: 'jh-kreg-jig', typeId: 'joint_hardware', brandId: 'kreg',     model: 'Jig K5 Master Sistema', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 85, priceMax: 125, description: 'Sistema pocket hole con guía, mordaza de banco y maletín. Crea uniones robustas sin espigas en minutos.', features: ['Guía incluida', 'Mordaza', 'Tornillos incluidos', 'Maletín'], bestFor: 'Fabricar muebles con uniones pocket hole rápidas y resistentes' },

  // ═══ ATORNILLADOR (simple, sin impacto) ═══
  { id: 'scr-bosch-go2', typeId: 'screwdriver_tool', brandId: 'bosch_green', model: 'GO 2 (pocket screwdriver)', tier: 'basic', use: ['home'], power: 'battery', priceMin: 28, priceMax: 45, description: 'Atornillador de bolsillo 3.6V, cabezal giratorio 6 posiciones. Cabe en el bolsillo. Ideal para montaje de muebles.', features: ['3.6V', 'Cabezal giratorio', 'Bolsillo', '5Nm'], bestFor: 'Montar muebles de flat-pack y atornillar en espacios reducidos' },
  { id: 'scr-mak-df033', typeId: 'screwdriver_tool', brandId: 'makita', model: 'DF033DWME 10.8V', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 75, priceMax: 110, description: 'Atornillador compacto 10.8V CXT con 2 baterías + cargador. Torque 25Nm, muy manejable.', features: ['10.8V CXT', '25Nm', 'Compacto', '2 baterías'], bestFor: 'Atornillar en ángulos difíciles y espacios reducidos' },
  { id: 'scr-dew-dce800', typeId: 'screwdriver_tool', brandId: 'dewalt', model: 'DCE800N XTREME 12V', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 65, priceMax: 95, description: 'Atornillador sin escobillas 12V XTREME. Cabezal giratorio y linterna. Sin batería (body only).', features: ['12V', 'Brushless', 'Cabezal giratorio', 'Linterna'], bestFor: 'Atornillar en instalaciones y montaje de mobiliario' },

  // ═══ SIERRA DE INCISIÓN (scoring saw) ═══
  { id: 'scs-fest-hkc55', typeId: 'scoring_saw', brandId: 'festool', model: 'HKC 55 EB-Basic 18V', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 650, priceMax: 820, description: 'Sierra de inmersión 18V con hoja de incisión. Corte de 0 a 55mm sin astillas en melamina y laminados. Referencia absoluta.', features: ['18V', '55mm', 'Hoja incisión', 'Sin cable', 'Carril FS'], bestFor: 'Corte de tableros melamínicos y laminados sin astillas' },
  { id: 'scs-bosch-gkt55', typeId: 'scoring_saw', brandId: 'bosch_blue', model: 'GKT 55 GCE 1200W', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 420, priceMax: 560, description: 'Sierra de inmersión 1200W con función de incisión. Profundidad 0–55mm. Sistema de carril Bosch.', features: ['1200W', '55mm', 'Carril Bosch', 'Incisión'], bestFor: 'Corte profesional de tableros melamínicos con carril guía' },
  { id: 'scs-mak-sp6000', typeId: 'scoring_saw', brandId: 'makita', model: 'SP6000J1 1300W con carril', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 360, priceMax: 480, description: 'Sierra de inmersión Makita 1300W con carril de 1.5m incluido. Corte limpio en melamina y aglomerado.', features: ['1300W', 'Carril 1.5m incluido', 'Incisión', '56mm'], bestFor: 'Taller de cocinas y carpintería de tablero' },

  // ═══ LIJADORA DE DISCO ═══
  { id: 'disc-sch-ts250', typeId: 'disc_sander', brandId: 'scheppach', model: 'TS250 ø250mm 250W', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 90, priceMax: 135, description: 'Lijadora de disco ø250mm, 250W. Mesa inclinable 0–45°. Ideal para conformar cantos y ángulos.', features: ['ø250mm', '250W', 'Mesa 0–45°', 'Aspiración'], bestFor: 'Dar forma a cantos y perfiles en taller doméstico' },
  { id: 'disc-hol-tsm250',typeId: 'disc_sander', brandId: 'holzmann', model: 'TSM 250 400W', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 110, priceMax: 160, description: 'Lijadora de disco 400W ø250mm con mesa basculante. Más potente para uso semiprofesional continuado.', features: ['400W', 'ø250mm', 'Mesa basculante', 'Semipro'], bestFor: 'Lijar y conformar piezas en taller de carpintería doméstico' },

  // ═══ REGLA DE PRECISIÓN (straight edge) ═══
  { id: 'se-fest-fs1400', typeId: 'straight_edge', brandId: 'festool', model: 'Guía FS 1400/2 aluminio', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 85, priceMax: 120, description: 'Carril-regla de aluminio 1400mm con borde anti-rebabas. Guía maestra del sistema Festool. Precisión ±0.1mm.', features: ['1400mm', 'Aluminio', 'Anti-rebabas', '±0.1mm'], bestFor: 'Cortes perfectamente rectos con sierra de inmersión Festool' },
  { id: 'se-stl-1000',   typeId: 'straight_edge', brandId: 'stanley',  model: 'Regla de aluminio 1000mm', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 12, priceMax: 22, description: 'Regla recta de aluminio 1000mm. Escala en mm y pulgadas. Para trazar y guiar cortes a mano.', features: ['1000mm', 'Aluminio', 'mm + pulgadas', 'Antideslizante'], bestFor: 'Trazar líneas de corte y verificar planicidad de superficies' },
  { id: 'se-bos-fs800',  typeId: 'straight_edge', brandId: 'bosch_blue', model: 'FSN 800 Carril 800mm', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 42, priceMax: 65, description: 'Carril de guía 800mm para sierras de inmersión Bosch. Con tira anti-astillas. Acoplable a FSN 1600.', features: ['800mm', 'Anti-astillas', 'Acoplable', 'Aluminio'], bestFor: 'Cortes de tablero de hasta 800mm con sierra Bosch' },

  // ═══ PALOMILLAS DE APRIETE (toggle clamps) ═══
  { id: 'tc-wf-hh50',  typeId: 'toggle_clamps', brandId: 'wolfcraft', model: 'Set 2 palomillas horizontales 50kg', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 18, priceMax: 30, description: '2 palomillas de apriete horizontal 50kg. Fijación rápida de piezas en mesa de router o taladradora de columna.', features: ['50 kg', 'Horizontal', '2 unidades', 'Acero'], bestFor: 'Fijar piezas en mesa de fresadora y taladradora de columna' },
  { id: 'tc-kreg-kbc3', typeId: 'toggle_clamps', brandId: 'kreg',     model: 'Face Clamp KBC3', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 22, priceMax: 38, description: 'Mordaza frontal Kreg para sistema pocket hole. Sujeta piezas perpendiculares automáticamente.', features: ['Para pocket hole', 'Autoajustable', 'Mango ergonómico'], bestFor: 'Asegurar piezas durante el atornillado pocket hole' },

  // ═══ TORNILLOS POCKET HOLE ═══
  { id: 'ps-kreg-sts150', typeId: 'pocket_screw', brandId: 'kreg', model: 'SML-C150-250 Coarse 38mm 250 uds', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 14, priceMax: 22, description: '250 tornillos pocket hole 38mm cabeza cónica, paso grueso. Para madera blanda y tableros. El original Kreg.', features: ['250 uds', '38mm', 'Paso grueso', 'Anticorrosión'], bestFor: 'Tablero, pino y MDF con sistema pocket hole Kreg' },
  { id: 'ps-kreg-hd150', typeId: 'pocket_screw', brandId: 'kreg', model: 'SML-F125-100 Fine 32mm 100 uds', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 12, priceMax: 20, description: '100 tornillos pocket hole 32mm paso fino para madera dura (roble, haya, nogal). Cabeza washer.', features: ['100 uds', '32mm', 'Paso fino', 'Madera dura'], bestFor: 'Pocket hole en roble, haya y maderas duras' },

  // ═══ ALMACENAMIENTO DE PARED ═══
  { id: 'ws-keter-track', typeId: 'wall_storage', brandId: 'keter', model: 'Track Wall System 5 piezas', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 35, priceMax: 58, description: 'Sistema de carril de pared con 5 accesorios: soporte brocas, herramientas, cajas. Riel de 120cm.', features: ['Riel 120cm', '5 accesorios', 'Sin tornillos', 'Modular'], bestFor: 'Organizar herramientas en pared de garaje o taller' },
  { id: 'ws-stl-pegboard', typeId: 'wall_storage', brandId: 'stanley', model: 'Panel perforado + 30 ganchos', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 28, priceMax: 45, description: 'Panel pegboard metálico 60×90cm con 30 ganchos variados. El clásico de taller. Resistente y modular.', features: ['60×90cm', '30 ganchos', 'Metálico', 'Modular'], bestFor: 'Colgar herramientas manuales a la vista en taller' },

  // ═══ CARROS DE HERRAMIENTAS ═══
  { id: 'tc-keter-mbl3', typeId: 'tool_cart', brandId: 'keter', model: 'Mobile Workstation Rouleau 3 cajones', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 110, priceMax: 165, description: 'Carro de taller 3 cajones + superficie de trabajo. Ruedas 150mm. 50kg de carga por cajón.', features: ['3 cajones', 'Superficie trabajo', 'Ruedas 150mm', '50kg/cajón'], bestFor: 'Organizar herramientas en taller con movilidad' },
  { id: 'tc-stl-fatmax',  typeId: 'tool_cart', brandId: 'stanley_fatmax', model: 'FMST1-73599 Carro 6 cajones', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 180, priceMax: 260, description: 'Carro FatMax 6 cajones con cierre de seguridad y encimera de madera. Rodamientos de bola. Profesional.', features: ['6 cajones', 'Cierre seguridad', 'Encimera madera', 'Profesional'], bestFor: 'Taller profesional con herramientas ordenadas y accesibles' },

  // ═══════════════════════════════════════════════════════════════
  // LOTE ChatGPT — productos reales por marca (16 abr 2026)
  // ═══════════════════════════════════════════════════════════════

  // ── DEXTER (Power X-Change 18V, Leroy Merlin) ────────────────
  { id: 'dexter_pxc18v_tp', typeId: 'hammer_drill', brandId: 'dexter', model: 'Power X-Change 18V Taladro percutor', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 73, priceMax: 100, description: 'Taladro percutor 18V del ecosistema Power X-Change de Leroy Merlin.', features: ['18V', 'Percutor', 'Ecosistema PXC'], bestFor: 'Taladrar y atornillar en bricolaje doméstico' },
  { id: 'dexter_pxc18v_sc', typeId: 'circular_saw', brandId: 'dexter', model: 'Power X-Change 18V Sierra circular', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 99, priceMax: 109, description: 'Sierra circular 18V a batería del ecosistema PXC Dexter.', features: ['18V', 'Sin cable', 'PXC'], bestFor: 'Cortes portátiles en tableros sin cable' },
  { id: 'dexter_pxc18v_jig', typeId: 'jigsaw', brandId: 'dexter', model: 'Power X-Change 18V Sierra de calar', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 80, priceMax: 90, description: 'Sierra de calar 18V a batería PXC.', features: ['18V', 'PXC', 'Corte curvo'], bestFor: 'Cortes curvos y calados en bricolaje' },
  { id: 'dexter_pxc18v_os', typeId: 'orbital_sander', brandId: 'dexter', model: 'Power X-Change 18V Lijadora excéntrica', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 70, priceMax: 95, description: 'Lijadora excéntrica 18V a batería del ecosistema PXC.', features: ['18V', 'Excéntrica', 'PXC'], bestFor: 'Lijado de muebles y superficies sin cable' },

  // ── POWERPLUS ─────────────────────────────────────────────────
  { id: 'pp_powc1061', typeId: 'drill_driver', brandId: 'powerplus', model: 'POWC1061 Taladro atornillador batería', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 44, priceMax: 60, description: 'Taladro atornillador a batería PowerPlus. Económico y versátil.', features: ['Batería', 'Compacto', 'Económico'], bestFor: 'Bricolaje doméstico básico' },
  { id: 'pp_powp4020', typeId: 'circular_saw', brandId: 'powerplus', model: 'POWP4020 Sierra circular 2000W 235mm', tier: 'basic', use: ['home', 'workshop'], power: 'corded', priceMin: 150, priceMax: 165, description: 'Sierra circular potente 2000W con disco de 235mm. Gran capacidad de corte.', features: ['2000W', '235mm', 'Disco grande'], bestFor: 'Cortes profundos en madera maciza y tableros gruesos' },
  { id: 'pp_powx1270', typeId: 'belt_sander', brandId: 'powerplus', model: 'POWX1270 Lijadora de banda 240W', tier: 'basic', use: ['home', 'workshop'], power: 'corded', priceMin: 90, priceMax: 100, description: 'Lijadora de banda 240W. Desbaste rápido de superficies.', features: ['240W', 'Banda', 'Desbaste'], bestFor: 'Desbastar y nivelar superficies de madera' },
  { id: 'pp_powc4010', typeId: 'orbital_sander', brandId: 'powerplus', model: 'POWC4010 Lijadora orbital 135W', tier: 'basic', use: ['home', 'workshop'], power: 'corded', priceMin: 29, priceMax: 40, description: 'Lijadora orbital compacta 135W. Muy económica.', features: ['135W', 'Orbital', 'Económica'], bestFor: 'Lijado fino para principiantes' },

  // ── KOMA TOOLS ────────────────────────────────────────────────
  { id: 'koma_08750', typeId: 'hammer_drill', brandId: 'koma_tools', model: '08750 Kit Taladro Percutor 20V', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 110, priceMax: 125, description: 'Kit taladro percutor 20V con batería y cargador. Marca española.', features: ['20V', 'Kit completo', 'Española'], bestFor: 'Taladrado en obra y bricolaje doméstico' },
  { id: 'koma_08764', typeId: 'circular_saw', brandId: 'koma_tools', model: '08764 Sierra circular 20V Pro Series', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 58, priceMax: 80, description: 'Sierra circular 20V Pro Series a batería. Compacta y sin cable.', features: ['20V', 'Pro Series', 'Sin cable'], bestFor: 'Cortes portátiles sin cable en obra' },
  { id: 'koma_08754', typeId: 'jigsaw', brandId: 'koma_tools', model: '08754 Sierra de calar 20V Pro Series', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 50, priceMax: 70, description: 'Sierra de calar 20V a batería. Cortes curvos y rectos.', features: ['20V', 'Pro Series', 'Pendular'], bestFor: 'Cortes curvos en tablero y madera blanda' },
  { id: 'koma_08753', typeId: 'orbital_sander', brandId: 'koma_tools', model: '08753 Lijadora excéntrica 20V Pro Series', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 40, priceMax: 60, description: 'Lijadora excéntrica 20V a batería del ecosistema Pro Series.', features: ['20V', 'Excéntrica', 'Sin cable'], bestFor: 'Lijado de muebles sin cable' },

  // ── TOOLSON ───────────────────────────────────────────────────
  { id: 'toolson_propbl2', typeId: 'hammer_drill', brandId: 'toolson', model: 'PRO-PBL2 Taladro percutor batería', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 109, priceMax: 119, description: 'Taladro percutor PRO de Toolson con motor brushless.', features: ['Brushless', 'Percutor', 'PRO'], bestFor: 'Taladrado doméstico avanzado' },
  { id: 'toolson_procp', typeId: 'circular_saw', brandId: 'toolson', model: 'PRO-CP Sierra circular batería', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 99, priceMax: 110, description: 'Sierra circular PRO a batería. Cortes limpios sin cable.', features: ['Batería', 'PRO', 'Limpio'], bestFor: 'Cortes en tablero y madera blanda' },
  { id: 'toolson_prolom', typeId: 'orbital_sander', brandId: 'toolson', model: 'PRO-LOM Lijadora orbital batería', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 59, priceMax: 69, description: 'Lijadora orbital PRO de Toolson a batería.', features: ['Batería', 'PRO', 'Orbital'], bestFor: 'Lijado sin cable en taller doméstico' },
  { id: 'toolson_pros', typeId: 'jigsaw', brandId: 'toolson', model: 'PRO-S Sierra de calar batería', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 60, priceMax: 70, description: 'Sierra de calar PRO a batería Toolson. Corte pendular.', features: ['Batería', 'PRO', 'Pendular'], bestFor: 'Cortes curvos sin cable' },

  // ── VITO ──────────────────────────────────────────────────────
  { id: 'vito_vibsfl144a', typeId: 'drill_driver', brandId: 'vito', model: 'VIBSFL144A Taladro atornillador 14,4V', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 90, priceMax: 110, description: 'Taladro atornillador 14.4V litio. Marca española.', features: ['14.4V', 'Li-ion', 'Española'], bestFor: 'Montaje de muebles y bricolaje' },
  { id: 'vito_vibe1050a', typeId: 'hammer_drill', brandId: 'vito', model: 'VIBE1050A Taladro percutor 1050W', tier: 'basic', use: ['home', 'workshop'], power: 'corded', priceMin: 45, priceMax: 65, description: 'Taladro percutor con cable 1050W. Potente y económico.', features: ['1050W', 'Percutor', 'Económico'], bestFor: 'Taladrar en obra y ladrillo' },
  { id: 'vito_ego_os20v', typeId: 'orbital_sander', brandId: 'vito', model: 'EGO LI Lijadora excéntrica 20V 125mm', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 80, priceMax: 150, description: 'Lijadora excéntrica orbital 20V del ecosistema EGO de Vito. 125mm.', features: ['20V', '125mm', 'EGO LI'], bestFor: 'Lijado de calidad sin cable' },
  { id: 'vito_ego_jig20v', typeId: 'jigsaw', brandId: 'vito', model: 'EGO LI Sierra de calar 20V', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 95, priceMax: 160, description: 'Sierra de calar 20V del ecosistema EGO de Vito.', features: ['20V', 'EGO LI', 'Pendular'], bestFor: 'Cortes curvos y calados sin cable' },

  // ── KWB (accesorios) ──────────────────────────────────────────
  { id: 'kwb_drillguide', typeId: 'pocket_hole', brandId: 'kwb', model: 'Drill Guide — Guía de perforación', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 25, priceMax: 35, description: 'Guía de perforación para taladros. Mantiene la broca recta y centrada.', features: ['Guía', 'Centrador', 'Manual'], bestFor: 'Perforaciones rectas y perpendiculares en madera' },
  { id: 'kwb_513190', typeId: 'countersink', brandId: 'kwb', model: '513190 Juego brocas avellanadoras 8 pcs', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 10, priceMax: 16, description: '8 brocas avellanadoras para madera. Avellanado limpio de tornillos.', features: ['8 piezas', 'Avellanador', 'Madera'], bestFor: 'Ocultar cabezas de tornillo en madera' },
  { id: 'kwb_512604', typeId: 'countersink', brandId: 'kwb', model: '5126-04 Broca con avellanador profundo', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 12, priceMax: 18, description: 'Broca para madera con avellanado profundo integrado.', features: ['Avellanador profundo', 'Integrado'], bestFor: 'Atornillar con acabado oculto en madera' },
  { id: 'kwb_1400x8_6tpi', typeId: 'saw_blade', brandId: 'kwb', model: 'Sierra de cinta 1400×8mm 6TPI', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 12, priceMax: 20, description: 'Hoja de sierra de cinta para madera 1400×8mm, 6 dientes por pulgada.', features: ['1400×8mm', '6 TPI', 'Madera'], bestFor: 'Recambio para sierras de cinta de banco' },

  // ── STAYER ────────────────────────────────────────────────────
  { id: 'stayer_cp125', typeId: 'circular_saw', brandId: 'stayer', model: 'CP 125 Sierra circular profesional ø125mm', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 100, priceMax: 130, description: 'Sierra circular compacta ø125mm. Ligera y manejable para cortes en taller.', features: ['ø125mm', 'Compacta', 'Profesional'], bestFor: 'Cortes de precisión en piezas pequeñas' },
  { id: 'stayer_s90pe', typeId: 'jigsaw', brandId: 'stayer', model: 'S 90 PE Sierra caladora profesional', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 75, priceMax: 85, description: 'Sierra caladora profesional con pendular y velocidad variable.', features: ['Pendular', 'Vel. variable', 'Profesional'], bestFor: 'Cortes curvos en taller semiprofesional' },
  { id: 'stayer_bj120', typeId: 'biscuit_joiner', brandId: 'stayer', model: 'BJ 120 Engalletadora profesional 860W', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 92, priceMax: 110, description: 'Engalletadora 860W para galletas nº 0, 10 y 20. Profesional.', features: ['860W', 'Galletas 0/10/20', 'Profesional'], bestFor: 'Ensamblaje profesional con galletas' },
  { id: 'stayer_prp6', typeId: 'router', brandId: 'stayer', model: 'PRP 6 Fresadora para pernios', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 93, priceMax: 115, description: 'Fresadora especializada para cajeado de pernios y cerraduras.', features: ['Cajeado pernios', 'Especializada', 'Profesional'], bestFor: 'Instalación de pernios y cerraduras en puertas' },

  // ── AEG ───────────────────────────────────────────────────────
  { id: 'aeg_bsb18g4', typeId: 'hammer_drill', brandId: 'aeg', model: 'BSB-18-G4 Taladro percutor 18V', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 120, priceMax: 220, description: 'Taladro percutor 18V AEG de la gama PRO. Robusto y potente.', features: ['18V', 'Percutor', 'PRO'], bestFor: 'Taladrado intensivo en obra y taller' },
  { id: 'aeg_bst18x2', typeId: 'jigsaw', brandId: 'aeg', model: 'BST18X2-0 Sierra de calar 18V', tier: 'mid', use: ['workshop'], power: 'battery', priceMin: 160, priceMax: 220, description: 'Sierra de calar 18V brushless AEG. Corte preciso sin cable.', features: ['18V', 'Brushless', 'Precisa'], bestFor: 'Cortes curvos en taller sin cable' },
  { id: 'aeg_ks662', typeId: 'circular_saw', brandId: 'aeg', model: 'KS 66-2 Sierra circular 1600W', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 150, priceMax: 210, description: 'Sierra circular 1600W con guía de corte. Potente y precisa.', features: ['1600W', 'Guía corte', 'Precisa'], bestFor: 'Cortes de tablero en taller semiprofesional' },
  { id: 'aeg_ex150es', typeId: 'orbital_sander', brandId: 'aeg', model: 'EX150ES Lijadora rotoorbital 440W 150mm', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 205, priceMax: 215, description: 'Lijadora rotoorbital potente 440W, plato 150mm. Calidad semipro.', features: ['440W', '150mm', 'Semipro'], bestFor: 'Lijado intensivo en superficies grandes' },

  // ── WOLFCRAFT (accesorios y bancos) ───────────────────────────
  { id: 'wf_master200', typeId: 'workbench', brandId: 'wolfcraft', model: 'Master 200 (6177000) Mesa de trabajo', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 82, priceMax: 95, description: 'Mesa de trabajo y sujeción compacta. Mandíbulas ajustables. Plegable.', features: ['Plegable', 'Mandíbulas', 'Compacta'], bestFor: 'Banco de trabajo portátil para bricolaje' },
  { id: 'wf_master600', typeId: 'workbench', brandId: 'wolfcraft', model: 'Master 600 (6182000) Mesa de trabajo', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 130, priceMax: 145, description: 'Mesa de trabajo XL con sistema de sujeción integrado. Gran superficie.', features: ['XL', 'Sistema sujeción', 'Gran superficie'], bestFor: 'Taller doméstico con espacio limitado' },
  { id: 'wf_underjig', typeId: 'pocket_hole', brandId: 'wolfcraft', model: 'Undercover-Jig PZ (4642000)', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 32, priceMax: 49, description: 'Plantilla pocket hole Wolfcraft. Uniones ocultas sin espiga.', features: ['Pocket hole', 'Uniones ocultas', 'Wolfcraft'], bestFor: 'Uniones ocultas pocket hole alternativa a Kreg' },
  { id: 'wf_ehzpro', typeId: 'quick_clamps', brandId: 'wolfcraft', model: 'EHZ PRO XL Set mordazas monomanuales', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 38, priceMax: 50, description: 'Set de mordazas de una mano EHZ PRO XL. Apriete rápido y firme.', features: ['Una mano', 'PRO XL', 'Set'], bestFor: 'Sujeción rápida en taller' },

  // ── PIHER (sujeción española) ─────────────────────────────────
  { id: 'piher_01020', typeId: 'f_clamps', brandId: 'piher', model: 'Aprieto M-20 cm', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 17, priceMax: 22, description: 'Sargento F clásico Piher de 20 cm. Fabricado en España.', features: ['20 cm', 'Sargento F', 'España'], bestFor: 'Sujeción básica en taller' },
  { id: 'piher_maxim20', typeId: 'f_clamps', brandId: 'piher', model: 'Maxipress M 20 cm', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 19, priceMax: 25, description: 'Sargento F Maxipress 20 cm. Mayor presión y ergonomía que el M básico.', features: ['20 cm', 'Maxipress', 'Ergonómico'], bestFor: 'Encolado con presión uniforme' },
  { id: 'piher_qp90', typeId: 'quick_clamps', brandId: 'piher', model: 'Quick Piher 90 cm', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 25, priceMax: 35, description: 'Sargento rápido Piher de 90 cm. Disparo con una mano. Profesional.', features: ['90 cm', 'Una mano', 'Profesional'], bestFor: 'Sujeción rápida de tableros y marcos' },
  { id: 'piher_a20', typeId: 'corner_clamps', brandId: 'piher', model: 'A-20 Mordaza de ángulo', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 35, priceMax: 45, description: 'Mordaza de ángulo 90° para madera. Ensamblaje de esquinas preciso.', features: ['90°', 'Esquinas', 'Profesional'], bestFor: 'Ensamblar marcos y cajones en ángulo recto' },

  // ── CMT ORANGE TOOLS (fresas profesionales) ───────────────────
  { id: 'cmt_912127', typeId: 'router_bits', brandId: 'cmt_orange_tools', model: '912.127.11 Straight Cutter ø12.7', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 20, priceMax: 30, description: 'Fresa recta ø12.7mm. Carburo cementado. Recubrimiento naranja PTFE.', features: ['ø12.7mm', 'Carburo', 'PTFE naranja'], bestFor: 'Ranurado y cajeado de precisión' },
  { id: 'cmt_806095', typeId: 'router_bits', brandId: 'cmt_orange_tools', model: '806.095.11 Flush Trim Bit', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 25, priceMax: 32, description: 'Fresa de raseo con rodamiento. Copia exacta de plantillas.', features: ['Raseo', 'Rodamiento', 'Copiado'], bestFor: 'Copiar plantillas y perfilar cantos' },
  { id: 'cmt_800627', typeId: 'router_bits', brandId: 'cmt_orange_tools', model: '800.627.11 Rail & Stile Set', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 55, priceMax: 75, description: 'Set fresa de perfil y contraperfil para marcos de puerta. Profesional.', features: ['Perfil + contraperfil', 'Marcos puerta', 'Set'], bestFor: 'Fabricación de marcos de puerta y ventana' },
  { id: 'cmt_838001', typeId: 'router_bits', brandId: 'cmt_orange_tools', model: '838.001.11 Estuche 3 fresas radio cóncavo', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 45, priceMax: 60, description: 'Estuche 3 fresas de radio cóncavo CMT. Acabado de molduras profesional.', features: ['3 fresas', 'Radio cóncavo', 'Estuche'], bestFor: 'Molduras y perfiles decorativos en madera' },

  // ── FREUD (hojas y fresas profesionales) ──────────────────────
  { id: 'freud_lu3d250', typeId: 'saw_blade', brandId: 'freud', model: 'LU3D Pro Industrial 250mm 80T', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 85, priceMax: 95, description: 'Disco 250mm 80T corte fino. Para sierra de mesa e ingletadora. Industrial.', features: ['250mm', '80T', 'Industrial', 'Corte fino'], bestFor: 'Corte de acabado en madera maciza y tablero' },
  { id: 'freud_lu80r', typeId: 'saw_blade', brandId: 'freud', model: 'LU80R010 Ultimate Melamina 254mm', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 40, priceMax: 55, description: 'Disco 254mm para melamina y contrachapado. Corte sin astilla. Ultimate.', features: ['254mm', 'Melamina', 'Sin astilla', 'Ultimate'], bestFor: 'Corte limpio en melamina sin astillas' },
  { id: 'freud_lu79r', typeId: 'saw_blade', brandId: 'freud', model: 'LU79R010 Melamina/Contrachapado 254mm 80T', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 65, priceMax: 85, description: 'Disco 254mm 80T para melamina y contrachapado. Referencia profesional.', features: ['254mm', '80T', 'TCG', 'Profesional'], bestFor: 'Corte profesional de tableros melamínicos' },
  { id: 'freud_91100', typeId: 'router_bits', brandId: 'freud', model: '91-100 Juego 13 fresas de carburo', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 250, priceMax: 335, description: 'Set profesional 13 fresas de carburo con maletín. Referencia premium americana.', features: ['13 fresas', 'Carburo', 'Maletín', 'Premium'], bestFor: 'Equipamiento completo de fresado profesional' },

  // ── FACOM (medición y manual) ─────────────────────────────────
  { id: 'facom_809a150', typeId: 'digital_caliper', brandId: 'facom', model: '809A.150 Calibre digital 150mm', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 80, priceMax: 120, description: 'Calibre digital de precisión 150mm. Acero inoxidable. Profesional francés.', features: ['150mm', 'Digital', 'Inox', 'Profesional'], bestFor: 'Medición de precisión en ebanistería y taller' },
  { id: 'facom_fcm601', typeId: 'hand_saw', brandId: 'facom', model: 'FCM601 Arco de sierra compacto', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 25, priceMax: 40, description: 'Arco de sierra compacto Facom. Ergonómico y resistente.', features: ['Compacto', 'Ergonómico', 'Francés'], bestFor: 'Cortes manuales en espacios reducidos' },
  { id: 'facom_dela625', typeId: 'marking_gauge', brandId: 'facom', model: 'DELA.625.00 Metro plegable 1m', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 20, priceMax: 22, description: 'Metro plegable 1m Facom. Regla articulada clásica profesional.', features: ['1 m', 'Plegable', 'Articulado'], bestFor: 'Medición y trazado en taller' },
  { id: 'facom_dela401', typeId: 'marking_gauge', brandId: 'facom', model: 'DELA.401.00 Metro plegable 2m', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 22, priceMax: 28, description: 'Metro plegable 2m. Regla articulada larga para medición en obra.', features: ['2 m', 'Plegable', 'Profesional'], bestFor: 'Medición de longitudes en obra y taller' },

  // ── FEMI (maquinaria italiana) ────────────────────────────────
  { id: 'femi_tr1025a', typeId: 'miter_saw', brandId: 'femi', model: 'TR1025/A Ingletadora telescópica 254mm', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 400, priceMax: 585, description: 'Ingletadora telescópica italiana 254mm. Motor potente y mesa amplia. Semiprofesional.', features: ['254mm', 'Telescópica', 'Italiana', 'Semipro'], bestFor: 'Cortes de inglete en rodapiés, marcos y molduras' },
  { id: 'femi_tr1025db', typeId: 'miter_saw', brandId: 'femi', model: 'TR1025DB Ingletadora telescópica doble bisel', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 500, priceMax: 650, description: 'Ingletadora telescópica doble bisel 254mm. Cortes compuestos precisos.', features: ['254mm', 'Doble bisel', 'Telescópica'], bestFor: 'Cortes compuestos en molduras de corona y marcos' },
  { id: 'femi_tr078', typeId: 'miter_saw', brandId: 'femi', model: 'TR078 Ingletadora con mesa superior', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 490, priceMax: 610, description: 'Ingletadora con mesa de trabajo integrada. 2 en 1: inglete + mesa de corte.', features: ['2 en 1', 'Mesa integrada', 'Robusta'], bestFor: 'Taller con espacio limitado que necesita inglete y mesa de corte' },
  { id: 'femi_fm28186', typeId: 'band_saw', brandId: 'femi', model: 'JOB LINE FM28-186 Sierra de cinta vertical', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 359, priceMax: 370, description: 'Sierra de cinta vertical para madera. Mesa inclinable. Fabricación italiana.', features: ['Vertical', 'Mesa inclinable', 'Italiana'], bestFor: 'Cortes curvos y re-serrado en taller' },

  // ── STANLEY FATMAX (V20 18V) ──────────────────────────────────
  { id: 'fatmax_sfmcd711', typeId: 'hammer_drill', brandId: 'stanley_fatmax', model: 'SFMCD711 Taladro percutor V20 18V', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 120, priceMax: 160, description: 'Taladro percutor V20 18V. Ecosistema FatMax sin cable. Brushless.', features: ['18V V20', 'Brushless', 'FatMax'], bestFor: 'Taladrado en casa y taller con el ecosistema V20' },
  { id: 'fatmax_sfmcf800', typeId: 'impact_driver', brandId: 'stanley_fatmax', model: 'SFMCF800 Atornillador impacto V20 18V', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 80, priceMax: 120, description: 'Atornillador de impacto V20 18V. Alto par para tornillos largos. Sin cable.', features: ['18V V20', 'Impacto', 'Alto par'], bestFor: 'Atornillar tornillos estructurales y largos' },
  { id: 'fatmax_sfmcs500', typeId: 'circular_saw', brandId: 'stanley_fatmax', model: 'SFMCS500 Sierra circular V20 18V', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 110, priceMax: 145, description: 'Sierra circular 18V V20 FatMax. Cortes sin cable con buen rendimiento.', features: ['18V V20', 'Sin cable', 'FatMax'], bestFor: 'Cortes portátiles en obra y taller' },
  { id: 'fatmax_sfmcw220', typeId: 'orbital_sander', brandId: 'stanley_fatmax', model: 'SFMCW220 Lijadora rotoorbital V20 18V', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 120, priceMax: 170, description: 'Lijadora rotoorbital 18V V20. Acabado fino sin cable.', features: ['18V V20', 'Rotoorbital', 'FatMax'], bestFor: 'Lijado de acabado portátil sin cable' },

  // ══════════════════════════════════════════════════════════════
  // LOTE 2 — Marcas principales (Bosch Pro, Makita, DeWalt, etc.)
  // ══════════════════════════════════════════════════════════════

  // ── BOSCH PROFESSIONAL (GKS, GST, GSB, GEX) ──────────────────
  { id: 'bosch_gks18v57g', typeId: 'circular_saw', brandId: 'bosch_blue', model: 'GKS 18V-57 G', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 190, priceMax: 270, description: 'Sierra circular 18V Biturbo con carril guía compatible. Corte 57mm en madera.', features: ['18V Biturbo', '165mm', 'Profundidad 57mm', 'Compatible carril guía'], bestFor: 'Corte portátil profesional en obra y taller' },
  { id: 'bosch_gst18v125s', typeId: 'jigsaw', brandId: 'bosch_blue', model: 'GST 18V-125 S', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 220, priceMax: 290, description: 'Caladora 18V Biturbo con corte en madera hasta 125mm. SDS para cambio rápido de hoja.', features: ['18V Biturbo', 'Corte 125mm', 'SDS cambio rápido', 'Soplador integrado'], bestFor: 'Cortes curvos profesionales en madera gruesa' },
  { id: 'bosch_gsb18v55', typeId: 'hammer_drill', brandId: 'bosch_blue', model: 'GSB 18V-55', tier: 'pro', use: ['home', 'workshop'], power: 'battery', priceMin: 135, priceMax: 220, description: 'Taladro percutor 18V brushless compacto. Par 55Nm. Ideal para madera y mampostería.', features: ['18V', 'Brushless', '55Nm', 'Compacto'], bestFor: 'Taladrado versátil en madera, metal y obra' },
  { id: 'bosch_gex18v125', typeId: 'orbital_sander', brandId: 'bosch_blue', model: 'GEX 18V-125', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 180, priceMax: 250, description: 'Lijadora excéntrica 18V ø125mm con sistema de aspiración y microvelcro.', features: ['18V', 'ø125mm', 'Microvelcro', 'Velocidad variable'], bestFor: 'Lijado profesional sin cable en taller' },

  // ── MAKITA (DJV, DHP, DBO — sin DHS680Z, ya existe como cs06) ─
  { id: 'makita_djv181z', typeId: 'jigsaw', brandId: 'makita', model: 'DJV181Z', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 220, priceMax: 300, description: 'Caladora 18V LXT brushless con movimiento orbital en 4 posiciones. Sin vibración.', features: ['18V LXT', 'Brushless', '4 posiciones orbitales', 'Anti-vibración'], bestFor: 'Cortes curvos profesionales de precisión' },
  { id: 'makita_dhp484z', typeId: 'hammer_drill', brandId: 'makita', model: 'DHP484Z', tier: 'pro', use: ['home', 'workshop'], power: 'battery', priceMin: 110, priceMax: 170, description: 'Taladro percutor 18V LXT brushless ultracompacto. 54Nm. Solo cuerpo.', features: ['18V LXT', 'Brushless', '54Nm', 'Ultracompacto'], bestFor: 'Taladrado en espacios reducidos y trabajo diario' },
  { id: 'makita_dbo180z', typeId: 'orbital_sander', brandId: 'makita', model: 'DBO180Z', tier: 'pro', use: ['home', 'workshop'], power: 'battery', priceMin: 95, priceMax: 140, description: 'Lijadora orbital 18V LXT con base de velcro 93×185mm. Ligera y eficaz.', features: ['18V LXT', '93×185mm', 'Velcro', 'Bolsa aspiración'], bestFor: 'Lijado rápido de superficies planas sin cable' },

  // ── DEWALT (DCS570, DCS334, DCD796, DCW210) ──────────────────
  { id: 'dewalt_dcs570n', typeId: 'circular_saw', brandId: 'dewalt', model: 'DCS570N-XJ', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 180, priceMax: 250, description: 'Sierra circular 18V XR brushless. Disco 184mm, corte 63mm. Freno eléctrico.', features: ['18V XR', 'Brushless', '184mm', 'Corte 63mm', 'Freno eléctrico'], bestFor: 'Cortes en obra y taller con máxima profundidad' },
  { id: 'dewalt_dcs334n', typeId: 'jigsaw', brandId: 'dewalt', model: 'DCS334N-XJ', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 210, priceMax: 290, description: 'Caladora 18V XR brushless con agarre superior. 4 posiciones orbitales.', features: ['18V XR', 'Brushless', 'Agarre superior', '4 orbitales'], bestFor: 'Cortes de precisión en madera y tablero' },
  { id: 'dewalt_dcd796n', typeId: 'hammer_drill', brandId: 'dewalt', model: 'DCD796N-XJ', tier: 'pro', use: ['home', 'workshop'], power: 'battery', priceMin: 110, priceMax: 180, description: 'Taladro percutor 18V XR brushless compacto. 70Nm. Referencia profesional.', features: ['18V XR', 'Brushless', '70Nm', 'LED integrado'], bestFor: 'Taladrado profesional versátil en cualquier material' },
  { id: 'dewalt_dcw210n', typeId: 'orbital_sander', brandId: 'dewalt', model: 'DCW210N-XJ', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 150, priceMax: 220, description: 'Lijadora excéntrica 18V XR brushless ø125mm con aspiración variable.', features: ['18V XR', 'Brushless', 'ø125mm', 'Velocidad variable'], bestFor: 'Lijado profesional de acabado en taller' },

  // ── METABO (KS 55, STEB 65, SB 18L, SXE 3150) ───────────────
  { id: 'metabo_ks55fs', typeId: 'circular_saw', brandId: 'metabo', model: 'KS 55 FS', tier: 'pro', use: ['home', 'workshop'], power: 'corded', priceMin: 165, priceMax: 180, description: 'Sierra circular con cable 1200W, corte 55mm. Conexión a carril guía.', features: ['1200W', '160mm', 'Corte 55mm', 'Compatible carril guía'], bestFor: 'Cortes rectos con guía en carpintería doméstica' },
  { id: 'metabo_steb65quick', typeId: 'jigsaw', brandId: 'metabo', model: 'STEB 65 Quick', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 95, priceMax: 140, description: 'Caladora 450W con cambio rápido de hoja Quick y corte a 65mm.', features: ['450W', 'Quick cambio', 'Corte 65mm', 'Soplador'], bestFor: 'Cortes curvos y rectos en bricolaje' },
  { id: 'metabo_sb18l', typeId: 'hammer_drill', brandId: 'metabo', model: 'SB 18 L', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 120, priceMax: 180, description: 'Taladro percutor 18V LiHD compacto. 50Nm. Compatible con sistema Metabo CAS.', features: ['18V LiHD', '50Nm', 'CAS compatible', 'Compacto'], bestFor: 'Taladrado en madera y mampostería ligera' },
  { id: 'metabo_sxe3150', typeId: 'orbital_sander', brandId: 'metabo', model: 'SXE 3150', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 90, priceMax: 130, description: 'Lijadora excéntrica 310W ø150mm. Órbita variable para control total del acabado.', features: ['310W', 'ø150mm', 'Órbita variable', 'Freno disco'], bestFor: 'Lijado doméstico con control profesional' },

  // ── RYOBI ONE+ (R18CS, R18JS, R18PD7, ROS300A) ───────────────
  { id: 'ryobi_r18cs0', typeId: 'circular_saw', brandId: 'ryobi', model: 'R18CS-0', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 90, priceMax: 140, description: 'Sierra circular 18V ONE+ 165mm. Corte 52mm. Compatible con todo el sistema ONE+.', features: ['18V ONE+', '165mm', 'Corte 52mm', 'Guía láser'], bestFor: 'Cortes portátiles en bricolaje y reformas' },
  { id: 'ryobi_r18js0', typeId: 'jigsaw', brandId: 'ryobi', model: 'R18JS-0', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 80, priceMax: 130, description: 'Caladora 18V ONE+ con corte orbital y LED integrado. Cambio rápido de hoja.', features: ['18V ONE+', 'Orbital', 'LED', 'Cambio rápido'], bestFor: 'Cortes curvos en bricolaje doméstico' },
  { id: 'ryobi_r18pd70', typeId: 'hammer_drill', brandId: 'ryobi', model: 'R18PD7-0', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 90, priceMax: 140, description: 'Taladro percutor 18V ONE+ brushless. 60Nm. Nueva generación compacta.', features: ['18V ONE+', 'Brushless', '60Nm', 'Compacto'], bestFor: 'Taladrado versátil en el ecosistema Ryobi' },
  { id: 'ryobi_ros300a', typeId: 'orbital_sander', brandId: 'ryobi', model: 'ROS300A', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 55, priceMax: 85, description: 'Lijadora orbital con cable 300W ø125mm. Bolsa de aspiración. Económica.', features: ['300W', 'ø125mm', 'Bolsa aspiración', 'Económica'], bestFor: 'Lijado básico de muebles y superficies' },

  // ── FESTOOL (TSC 55, CARVEX, CXS 18, ETS EC) ─────────────────
  { id: 'festool_tsc55k', typeId: 'plunge_saw', brandId: 'festool', model: 'TSC 55 K', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 650, priceMax: 900, description: 'Sierra de incisión 18V con carril guía. Corte limpio en tableros sin astilla. Referencia absoluta.', features: ['18V', 'Carril guía', 'Sin astilla', 'Splinterguard'], bestFor: 'Corte perfecto de tableros en ebanistería' },
  { id: 'festool_ps420ebqplus', typeId: 'jigsaw', brandId: 'festool', model: 'PS 420 EBQ-Plus CARVEX', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 500, priceMax: 700, description: 'Caladora CARVEX con triple guiado de hoja. Vibración mínima. La mejor caladora del mercado.', features: ['550W', 'Triple guiado', 'CARVEX', 'Anti-vibración'], bestFor: 'Cortes curvos de máxima precisión en ebanistería' },
  { id: 'festool_cxs18', typeId: 'drill_driver', brandId: 'festool', model: 'CXS 18', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 260, priceMax: 420, description: 'Atornillador compacto 18V Festool. Ultra ligero, ideal para montajes delicados.', features: ['18V', 'Ultracompacto', 'FastFix', 'Systainer'], bestFor: 'Montaje y atornillado de precisión' },
  { id: 'festool_etsec1503eq', typeId: 'orbital_sander', brandId: 'festool', model: 'ETS EC 150/3 EQ', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 500, priceMax: 700, description: 'Lijadora excéntrica 150mm con aspiración Festool. Acabado de exposición. Referencia premium.', features: ['400W', 'ø150mm', 'EQ control', 'Systainer'], bestFor: 'Acabado de exposición en ebanistería de lujo' },

  // ── VIRUTEX (SR165, FR66P, AB111N, LRT84H) ───────────────────
  { id: 'virutex_sr165', typeId: 'circular_saw', brandId: 'virutex', model: 'SR165', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 150, priceMax: 220, description: 'Sierra circular 1300W fabricada en España. Disco 165mm, corte preciso y robusto.', features: ['1300W', '165mm', 'Fabricación española', 'Robusta'], bestFor: 'Corte profesional en taller — marca española' },
  { id: 'virutex_fr66p', typeId: 'router', brandId: 'virutex', model: 'FR66P', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 165, priceMax: 250, description: 'Fresadora vertical 1100W con pinza de 6-8mm. Diseño compacto español.', features: ['1100W', 'Pinza 6/8mm', 'Española', 'Compacta'], bestFor: 'Fresado de cantos y ranuras en taller' },
  { id: 'virutex_ab111n', typeId: 'biscuit_joiner', brandId: 'virutex', model: 'AB111N', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 375, priceMax: 420, description: 'Engalletadora profesional 900W. Galletas estándar 0/10/20. Referencia española.', features: ['900W', 'Galletas 0/10/20', 'Profesional', 'Española'], bestFor: 'Ensamblaje profesional con galletas en ebanistería' },
  { id: 'virutex_lrt84h', typeId: 'orbital_sander', brandId: 'virutex', model: 'LRT84H', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 125, priceMax: 170, description: 'Lijadora rotorbital 350W ø150mm. Diseño ergonómico español. Aspiración eficaz.', features: ['350W', 'ø150mm', 'Ergonómica', 'Española'], bestFor: 'Lijado profesional en talleres de carpintería' },

  // ── PARKSIDE (PABS, PSBSA, PHKSA, PEXS) ──────────────────────
  { id: 'parkside_pabs20lie6', typeId: 'drill_driver', brandId: 'parkside', model: 'PABS 20-Li E6', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 30, priceMax: 60, description: 'Taladro atornillador 20V con batería incluida. Ecosistema Parkside X20V Team.', features: ['20V', 'Batería incluida', 'X20V Team', '30Nm'], bestFor: 'Atornillado y taladrado doméstico económico' },
  { id: 'parkside_psbsa20lic3', typeId: 'hammer_drill', brandId: 'parkside', model: 'PSBSA 20-Li C3', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 45, priceMax: 80, description: 'Taladro percutor 20V X20V Team. Percusión para mampostería ligera.', features: ['20V', 'Percutor', 'X20V Team', 'LED'], bestFor: 'Taladrado en casa con opción percutor' },
  { id: 'parkside_phksa20lia1', typeId: 'circular_saw', brandId: 'parkside', model: 'PHKSA 20-Li A1', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 45, priceMax: 80, description: 'Sierra circular 20V X20V Team compacta. Disco 150mm. Ideal para iniciarse.', features: ['20V', '150mm', 'X20V Team', 'Compacta'], bestFor: 'Primeros cortes en bricolaje a precio mínimo' },
  { id: 'parkside_pexs20lia1', typeId: 'orbital_sander', brandId: 'parkside', model: 'PEXS 20-Li A1', tier: 'basic', use: ['home', 'workshop'], power: 'battery', priceMin: 30, priceMax: 60, description: 'Lijadora excéntrica 20V X20V Team con velcro ø125mm. Sin cable, económica.', features: ['20V', 'ø125mm', 'X20V Team', 'Velcro'], bestFor: 'Lijado básico sin cable para principiantes' },

  // ── EINHELL (TE-CS, TE-JS, TE-CD, TE-RS) ─────────────────────
  { id: 'einhell_tecs18150lisolo', typeId: 'circular_saw', brandId: 'einhell', model: 'TE-CS 18/150 Li-Solo', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 70, priceMax: 105, description: 'Sierra circular 18V Power X-Change. Disco 150mm, corte 42mm. Solo cuerpo.', features: ['18V PXC', '150mm', 'Corte 42mm', 'Solo cuerpo'], bestFor: 'Cortes portátiles en el ecosistema Einhell' },
  { id: 'einhell_tejs1880lisolo', typeId: 'jigsaw', brandId: 'einhell', model: 'TE-JS 18/80 Li-Solo', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 70, priceMax: 100, description: 'Caladora 18V Power X-Change con corte a 80mm. Soplador y LED.', features: ['18V PXC', 'Corte 80mm', 'Soplador', 'LED'], bestFor: 'Cortes curvos en bricolaje sin cable' },
  { id: 'einhell_tecd1848lii', typeId: 'hammer_drill', brandId: 'einhell', model: 'TE-CD 18/48 Li-i', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 85, priceMax: 160, description: 'Taladro percutor 18V PXC brushless. 48Nm con kit 2 baterías + cargador.', features: ['18V PXC', 'Brushless', '48Nm', 'Kit completo'], bestFor: 'Taladrado doméstico con kit completo incluido' },
  { id: 'einhell_ters18lisolo', typeId: 'orbital_sander', brandId: 'einhell', model: 'TE-RS 18 Li-Solo', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 45, priceMax: 70, description: 'Lijadora excéntrica 18V PXC con velcro ø125mm. Ligera y sin cable.', features: ['18V PXC', 'ø125mm', 'Velcro', 'Ligera'], bestFor: 'Lijado portátil económico' },

  // ── MILWAUKEE M18 (CCS55, BJS, BLPD2, BOS125) ────────────────
  { id: 'milwaukee_m18ccs55', typeId: 'circular_saw', brandId: 'milwaukee', model: 'M18 CCS55', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 240, priceMax: 320, description: 'Sierra circular M18 FUEL brushless 165mm. Motor sin escobillas de alto rendimiento.', features: ['M18 FUEL', 'Brushless', '165mm', 'REDLINK Plus'], bestFor: 'Corte profesional en obra y carpintería pesada' },
  { id: 'milwaukee_m18bjs', typeId: 'jigsaw', brandId: 'milwaukee', model: 'M18 BJS', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 220, priceMax: 300, description: 'Caladora M18 brushless con orbital en 5 posiciones. Agarre tipo D.', features: ['M18', 'Brushless', '5 orbitales', 'Agarre D'], bestFor: 'Cortes curvos profesionales en construcción' },
  { id: 'milwaukee_m18blpd2', typeId: 'hammer_drill', brandId: 'milwaukee', model: 'M18 BLPD2', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 150, priceMax: 230, description: 'Taladro percutor M18 brushless compacto. 82Nm de par. Máxima potencia.', features: ['M18', 'Brushless', '82Nm', 'REDLINK Plus'], bestFor: 'Taladrado pesado profesional' },
  { id: 'milwaukee_m18bos125', typeId: 'orbital_sander', brandId: 'milwaukee', model: 'M18 BOS125', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 190, priceMax: 270, description: 'Lijadora excéntrica M18 ø125mm con velocidad variable y aspiración.', features: ['M18', 'ø125mm', 'Velocidad variable', 'Aspiración'], bestFor: 'Lijado de acabado en taller profesional' },

  // ── HIKOKI (C1806DB, CJ18DA, DV18DD, SV13YB) ─────────────────
  { id: 'hikoki_c1806db', typeId: 'circular_saw', brandId: 'hikoki', model: 'C1806DB', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 190, priceMax: 260, description: 'Sierra circular MultiVolt 36V con disco 165mm. Tecnología de doble voltaje.', features: ['MultiVolt 36V', '165mm', 'Brushless', 'Doble voltaje'], bestFor: 'Corte profesional con potencia de cable sin cable' },
  { id: 'hikoki_cj18da', typeId: 'jigsaw', brandId: 'hikoki', model: 'CJ18DA', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 190, priceMax: 260, description: 'Caladora 18V brushless con orbital en 4 posiciones. Bajo nivel de vibración.', features: ['18V', 'Brushless', '4 orbitales', 'Baja vibración'], bestFor: 'Cortes de precisión en madera y tablero' },
  { id: 'hikoki_dv18dd', typeId: 'hammer_drill', brandId: 'hikoki', model: 'DV18DD', tier: 'pro', use: ['home', 'workshop'], power: 'battery', priceMin: 130, priceMax: 190, description: 'Taladro percutor 18V brushless compacto. 64Nm. Excelente relación calidad-precio.', features: ['18V', 'Brushless', '64Nm', 'Compacto'], bestFor: 'Taladrado versátil profesional a buen precio' },
  { id: 'hikoki_sv13yb', typeId: 'orbital_sander', brandId: 'hikoki', model: 'SV13YB', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 110, priceMax: 170, description: 'Lijadora excéntrica 230W ø125mm con control de velocidad y aspiración eficiente.', features: ['230W', 'ø125mm', 'Velocidad variable', 'Aspiración'], bestFor: 'Lijado de calidad profesional con cable' },

  // ── TRITON (TTS1400, TRA001, MOF001, TCMBS) ──────────────────
  { id: 'triton_tts1400', typeId: 'plunge_saw', brandId: 'triton', model: 'TTS1400', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 280, priceMax: 380, description: 'Sierra de incisión 1400W con carril guía incluido. Gran relación calidad-precio.', features: ['1400W', 'Carril incluido', 'Corte 54mm', 'Anti-astilla'], bestFor: 'Alternativa asequible a Festool para corte de tableros' },
  { id: 'triton_tra001', typeId: 'router', brandId: 'triton', model: 'TRA001', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 330, priceMax: 420, description: 'Fresadora de superficie 2400W con doble pinza 8/12mm. Potencia bestial.', features: ['2400W', 'Pinza 8/12mm', 'Ajuste micrométrico', 'Encendido suave'], bestFor: 'Fresado pesado en mesa de fresado o a mano' },
  { id: 'triton_mof001', typeId: 'router', brandId: 'triton', model: 'MOF001', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 220, priceMax: 300, description: 'Fresadora compacta 1400W con pinza 8mm. Ideal para empezar con fresado.', features: ['1400W', 'Pinza 8mm', 'Compacta', 'Ajuste fino'], bestFor: 'Fresado versátil para aficionado avanzado' },
  { id: 'triton_tcmbs', typeId: 'belt_sander', brandId: 'triton', model: 'TCMBS', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 150, priceMax: 220, description: 'Lijadora de banda compacta con inversión. 64×406mm. Se monta en banco.', features: ['450W', '64×406mm', 'Montaje banco', 'Inversión'], bestFor: 'Lijado rápido de superficies y afilado con banda' },

  // ── LAMELLO (Classic X, Zeta P2, Top 21, Clamex P) ────────────
  { id: 'lamello_classicx', typeId: 'biscuit_joiner', brandId: 'lamello', model: 'Classic X', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 1400, priceMax: 1800, description: 'Engalletadora de referencia mundial. Inventores del sistema de galleta. Suiza.', features: ['780W', 'Sistema original', 'Suiza', 'Profundidad regulable'], bestFor: 'Ebanistería profesional de alta gama' },
  { id: 'lamello_zetap2', typeId: 'domino_joiner', brandId: 'lamello', model: 'Zeta P2', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 1298, priceMax: 1600, description: 'Sistema Zeta P2 de conexión oculta Clamex. Uniones desmontables invisibles.', features: ['Clamex', 'Uniones desmontables', 'Invisibles', 'P-System'], bestFor: 'Muebles desmontables con uniones ocultas premium' },
  { id: 'lamello_top21', typeId: 'biscuit_joiner', brandId: 'lamello', model: 'Top 21', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 1400, priceMax: 1900, description: 'Engalletadora Top 21 con guía en V y tope regulable. Máxima precisión suiza.', features: ['780W', 'Guía en V', 'Tope regulable', 'Premium'], bestFor: 'Ensamblaje de precisión para ebanistería de lujo' },
  { id: 'lamello_clamexpdrilljig', typeId: 'pocket_hole', brandId: 'lamello', model: 'Clamex P Drill Jig', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 120, priceMax: 220, description: 'Plantilla de taladrado para sistema Clamex P. Uniones ocultas desmontables.', features: ['Clamex P', 'Plantilla', 'Desmontable', 'Suizo'], bestFor: 'Preparación de uniones Clamex sin engalletadora' },

  // ── BESSEY (KRE35, EZS30, WS3, S10) ──────────────────────────
  { id: 'bessey_kre3531', typeId: 'f_clamps', brandId: 'bessey', model: 'KRE3531 K Body REVO', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 150, priceMax: 210, description: 'Sargento K Body REVO 310mm. El mejor sargento F del mundo. Mordazas paralelas.', features: ['310mm', 'K Body REVO', 'Mordazas paralelas', 'Alemán'], bestFor: 'Encolado profesional con presión uniforme' },
  { id: 'bessey_ezs308', typeId: 'quick_clamps', brandId: 'bessey', model: 'EZS30-8', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 28, priceMax: 45, description: 'Sargento rápido EZ de una mano 300mm. Apertura rápida, cierre firme.', features: ['300mm', 'Una mano', 'Apertura rápida', 'EZ'], bestFor: 'Sujeción rápida para encolados y montajes' },
  { id: 'bessey_ws3', typeId: 'corner_clamps', brandId: 'bessey', model: 'WS3', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 55, priceMax: 75, description: 'Sargento de ángulo WS3 para esquinas a 90°. Ideal para marcos y cajones.', features: ['90°', 'Esquinas', 'Marcos', 'Ajustable'], bestFor: 'Ensamblaje de marcos y cajones en escuadra' },
  { id: 'bessey_s10', typeId: 'bench_vise', brandId: 'bessey', model: 'S10 Bench Vise', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 80, priceMax: 130, description: 'Tornillo de banco Bessey con mordazas de 100mm. Base giratoria. Acero forjado.', features: ['100mm', 'Base giratoria', 'Acero forjado', 'Alemán'], bestFor: 'Sujeción fija de piezas en banco de trabajo' },

  // ── EVOLUTION POWER TOOLS (R185, R255SMS, R255TBL, ST1400) ────
  { id: 'evolution_r185ccsx', typeId: 'circular_saw', brandId: 'evolution', model: 'R185CCSX', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 108, priceMax: 145, description: 'Sierra circular 1600W 185mm multicorte: madera, metal, plástico con un solo disco.', features: ['1600W', '185mm', 'Multicorte', 'Guía láser'], bestFor: 'Corte de madera y metal con la misma sierra' },
  { id: 'evolution_r255smsplus', typeId: 'miter_saw', brandId: 'evolution', model: 'R255SMS+', tier: 'mid', use: ['home', 'workshop'], power: 'corded', priceMin: 230, priceMax: 320, description: 'Ingletadora telescópica 255mm multicorte. Corta madera, aluminio y acero suave.', features: ['255mm', 'Telescópica', 'Multicorte', 'Doble bisel'], bestFor: 'Taller que necesita cortar madera y metal' },
  { id: 'evolution_r255tbl', typeId: 'table_saw', brandId: 'evolution', model: 'R255TBL', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 346, priceMax: 390, description: 'Sierra de mesa 255mm multicorte con mesa extensible. Motor 1600W.', features: ['1600W', '255mm', 'Mesa extensible', 'Multicorte'], bestFor: 'Sierra de mesa económica para taller' },
  { id: 'evolution_st1400g2', typeId: 'guide_rail', brandId: 'evolution', model: 'ST1400-G2', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 75, priceMax: 120, description: 'Carril guía universal compatible con sierra circular. 1400mm de corte recto.', features: ['1400mm', 'Universal', 'Compatible múltiples sierras', 'Anti-astilla'], bestFor: 'Cortes rectos guiados sin invertir en Festool' },

  // ══════════════════════════════════════════════════════════════
  // LOTE 3 — Herramientas manuales, formones, cepillos, acabado
  // ══════════════════════════════════════════════════════════════

  // ── CEPILLOS MANUALES (hand_plane) ───────────────────────────
  { id: 'stanley_12140', typeId: 'hand_plane', brandId: 'stanley', model: 'No.4 Bailey 12-140', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 55, priceMax: 90, description: 'Cepillo Bailey N.º 4 de 50mm. Clásico americano. Hierro de corte de 2mm de grosor.', features: ['50mm', 'Bailey N.4', 'Hierro 2mm', 'Suela rectificada'], bestFor: 'Cepillado de caras y acabado fino de superficies planas' },
  { id: 'stanley_12220', typeId: 'hand_plane', brandId: 'stanley', model: 'No.5 Bailey 12-220', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 75, priceMax: 110, description: 'Cepillo Bailey N.º 5 Jack (largo 355mm). Ideal para aplanar tablones y juntas.', features: ['355mm', 'Bailey N.5', 'Hierro 50mm', 'Largo'], bestFor: 'Aplanado y enderezado de tablones antes del acabado' },
  { id: 'silverline_sl585716', typeId: 'hand_plane', brandId: 'silverline', model: '585716 Cepillo N.4 250mm', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 20, priceMax: 35, description: 'Cepillo tipo Bailey N.º 4 económico. Cuerpo de hierro fundido. Para iniciarse.', features: ['250mm', 'Hierro fundido', 'Ajuste básico', 'Económico'], bestFor: 'Primeras prácticas de cepillado sin gran inversión' },
  { id: 'holzmann_hb45', typeId: 'hand_plane', brandId: 'holzmann', model: 'HB45 Set 3 cepillos', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 60, priceMax: 90, description: 'Set de 3 cepillos (N.3, N.4, N.5) con maletín. Hierros de alta velocidad. Ajuste fino.', features: ['3 cepillos', 'N.3+N.4+N.5', 'HSS', 'Maletín'], bestFor: 'Kit completo para taller sin gastarse 200€' },

  // ── FORMONES / ESCOPLOS (chisel_set) ─────────────────────────
  { id: 'irwin_marples_ms500', typeId: 'chisel_set', brandId: 'irwin', model: 'Marples MS500 Set 6 uds', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 55, priceMax: 85, description: 'Set 6 formones Marples con mangos de polipropileno. Acero CrV. 6-12-18-25-32mm + bisel.', features: ['6 formones', 'CrV', 'Mangos PP azul', 'Clásico'], bestFor: 'Tallado de espigas, colas de milano y encajes' },
  { id: 'stanley_sweetheart_5002', typeId: 'chisel_set', brandId: 'stanley', model: 'Sweetheart 5002 Set 4 uds', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 70, priceMax: 105, description: 'Set 4 formones Sweetheart con mango de madera. Acero templado. 6-12-18-25mm.', features: ['4 formones', 'Mango madera', 'Acero templado', 'Bisel 25°'], bestFor: 'Ebanistería y carpintería de muebles' },
  { id: 'silverline_sl273235', typeId: 'chisel_set', brandId: 'silverline', model: '273235 Set 10 formones', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 22, priceMax: 35, description: 'Set 10 formones de mango coloreado. Acero CrV. 6 a 38mm. Para empezar.', features: ['10 formones', '6-38mm', 'CrV', 'Mango ergonómico'], bestFor: 'Kit de iniciación para bricolaje y proyectos DIY' },
  { id: 'holzmann_cset6', typeId: 'chisel_set', brandId: 'holzmann', model: 'CS6 Set 6 escoplos carpintería', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 35, priceMax: 55, description: 'Set 6 escoplos de carpintería con mango bimaterial. Acero CrMo. 6-12-19-25-32-38mm.', features: ['6 escoplos', 'CrMo', 'Bimaterial', 'Guarda cuero'], bestFor: 'Ensambles de carpintería de construcción ligera' },

  // ── CLAVADORA DE ACABADO 18ga (brad_nailer) ──────────────────
  { id: 'ryobi_r18n18g0', typeId: 'brad_nailer', brandId: 'ryobi', model: 'R18N18G-0', tier: 'mid', use: ['home', 'workshop'], power: 'battery', priceMin: 100, priceMax: 140, description: 'Clavadora 18V ONE+ para clavos 18ga de 15-50mm. Sin compresor. Ligera y manejable.', features: ['18V ONE+', '18ga', '15-50mm', 'Sin compresor'], bestFor: 'Colocación de molduras, rodapiés y tapajuntas sin compresor' },
  { id: 'dewalt_dcn680n', typeId: 'brad_nailer', brandId: 'dewalt', model: 'DCN680N-XJ', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 180, priceMax: 250, description: 'Clavadora 18V XR para clavos 18ga de 15-57mm. Brushless. Freno de clavos integrado.', features: ['18V XR', 'Brushless', '18ga', '15-57mm', 'Freno integrado'], bestFor: 'Clavado profesional de acabado en revestimientos y carpintería' },
  { id: 'makita_dpt353z', typeId: 'brad_nailer', brandId: 'makita', model: 'DPT353Z', tier: 'pro', use: ['workshop'], power: 'battery', priceMin: 200, priceMax: 280, description: 'Clavadora de acabado 18V LXT para clavos 15-35mm. Sin gas ni compresor.', features: ['18V LXT', '15-35mm', 'Sin gas', 'Ajuste profundidad'], bestFor: 'Montaje de paneles de madera y molduras en ebanistería' },
  { id: 'bosch_green_ptk36li', typeId: 'brad_nailer', brandId: 'bosch_green', model: 'PTK 36 Li', tier: 'basic', use: ['home'], power: 'battery', priceMin: 55, priceMax: 85, description: 'Grapadora/clavadora compacta 3.6V para grapas y clavos hasta 17mm. Sin cable.', features: ['3.6V', 'Grapas+clavos', '17mm', 'Compacta', 'Ligera'], bestFor: 'Tapicería, fondos de cajón y trabajos livianos en casa' },

  // ── LIJADORA DE BOBINA / COLUMNA (spindle_sander) ────────────
  { id: 'scheppach_bts900', typeId: 'spindle_sander', brandId: 'scheppach', model: 'BTS900', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 145, priceMax: 195, description: 'Lijadora de bobina oscilante 250W. Mesa inclinable 45°. 6 cilindros intercambiables.', features: ['250W', 'Oscilante', 'Mesa 45°', '6 cilindros', 'Extracción polvo'], bestFor: 'Lijado de curvas internas y contornos en tableros y madera maciza' },
  { id: 'holzmann_bts450', typeId: 'spindle_sander', brandId: 'holzmann', model: 'BTS450 Lijadora bobina banco', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 190, priceMax: 260, description: 'Lijadora de bobina de columna 450W. Mesa inclinable, 5 manguitos. Más potente.', features: ['450W', 'Columna', '5 manguitos', 'Mesa inclinable', 'Aspiración'], bestFor: 'Taller de carpintería con trabajo frecuente en curvas' },
  { id: 'jet_joss1ocs', typeId: 'spindle_sander', brandId: 'jet', model: 'JOSS-1 OCS Oscilante', tier: 'pro', use: ['workshop'], power: 'corded', priceMin: 350, priceMax: 500, description: 'Lijadora de bobina oscilante profesional JET. Mesa de aluminio fundido. Movimiento dual.', features: ['500W', 'Aluminio fundido', 'Oscilante dual', 'Regla ajustable', 'Mesa amplia'], bestFor: 'Taller profesional con producción continua de piezas curvadas' },

  // ── SERRUCHO JAPONÉS Y MANUAL (hand_saw — adicionales) ────────
  { id: 'stanley_fatmax_20045', typeId: 'hand_saw', brandId: 'stanley', model: 'FatMax 20-045 HardPoint 500mm', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 18, priceMax: 30, description: 'Serrucho FatMax 500mm con dientes HardPoint endurecidos. 8tpi. Corte en madera maciza y tableros.', features: ['500mm', 'HardPoint', '8tpi', 'Mango ergonómico'], bestFor: 'Cortes manuales rápidos en madera maciza, listones y tableros' },
  { id: 'irwin_jack_10505161', typeId: 'hand_saw', brandId: 'irwin', model: 'JACK 550mm 8tpi', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 25, priceMax: 40, description: 'Serrucho JACK 550mm 8tpi con dientes triples de alta eficiencia. Madera húmeda y seca.', features: ['550mm', '8tpi', 'Triple diente', 'Madera seca y húmeda'], bestFor: 'Cortes en obra, reformas y carpintería de construcción' },
  { id: 'silverline_sl731146', typeId: 'hand_saw', brandId: 'silverline', model: '731146 Serrucho japonés 250mm', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 12, priceMax: 20, description: 'Serrucho de tracción japonés 250mm con doble filo (corte cruzado y rip). Hoja flexible.', features: ['250mm', 'Tracción', 'Doble filo', 'Hoja flexible'], bestFor: 'Cortes de acabado en ebanistería y carpintería de muebles' },

  // ── CUCHILLO DE MARCAR (marking_knife) ───────────────────────
  { id: 'stanley_0110401', typeId: 'marking_knife', brandId: 'stanley', model: '0-10-401 Cuchillo de marcar', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 8, priceMax: 14, description: 'Cuchillo de marcar clásico Stanley. Hoja de acero reemplazable. Doble bisel.', features: ['Hoja reemplazable', 'Doble bisel', 'Mango madera', 'Clásico'], bestFor: 'Trazado de líneas de corte precisas en madera' },
  { id: 'irwin_10504772', typeId: 'marking_knife', brandId: 'irwin', model: '10504772 Cuchillo tallador + tope', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 18, priceMax: 30, description: 'Cuchillo de marcar Irwin con tope de profundidad. Hoja SK5. Mango bimaterial.', features: ['SK5', 'Tope profundidad', 'Bimaterial', 'Hoja cambiable'], bestFor: 'Marcado de precisión en ensambles y cola de milano' },

  // ── ESCUADRAS Y FALSOS ESCUADROS adicionales (marking_square) ─
  { id: 'stanley_046150', typeId: 'marking_square', brandId: 'stanley', model: '1-46-150 Escuadra de prueba 150mm', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 12, priceMax: 20, description: 'Escuadra de prueba 150mm con mango de madera. Hoja de acero inoxidable. Clásica.', features: ['150mm', 'Inox', 'Mango madera', 'Clásica'], bestFor: 'Verificar escuadras y marcar líneas a 90° en cualquier proyecto' },
  { id: 'irwin_t140', typeId: 'marking_square', brandId: 'irwin', model: 'T140 Escuadra combinada 300mm', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 25, priceMax: 45, description: 'Escuadra combinada 300mm con nivel de burbuja, regla graduada y cola de milano 45°.', features: ['300mm', 'Nivel burbuja', 'Doble ángulo', 'Regla graduada'], bestFor: 'Verificar 90° y 45°, marcar profundidades y niveles en taller' },
  { id: 'stabila_mb100', typeId: 'marking_square', brandId: 'stabila', model: 'MB100 Escuadra de aluminio', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 30, priceMax: 55, description: 'Escuadra de aluminio 300×200mm con ángulos 45° y 90°. Ligera y resistente.', features: ['300×200mm', 'Aluminio', '45° + 90°', 'Rebaje en L'], bestFor: 'Marcar escuadras grandes en tableros y puertas' },

  // ── CARRILES GUÍA adicionales (guide_rail) ─────────────────────
  { id: 'festool_fs14002', typeId: 'guide_rail', brandId: 'festool', model: 'FS 1400/2 Carril guía', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 155, priceMax: 195, description: 'Carril guía Festool 1400mm con tira antiastilla. Compatible TS/TSC/HKC. Guiado perfecto.', features: ['1400mm', 'Antiastilla', 'TS/TSC/HKC', 'Unión FS-VL'], bestFor: 'Cortes de tableros sin astilla con sierra de inmersión Festool' },
  { id: 'makita_194368_5', typeId: 'guide_rail', brandId: 'makita', model: '194368-5 Carril guía 1.5m', tier: 'pro', use: ['workshop', 'construction'], power: 'manual', priceMin: 120, priceMax: 165, description: 'Carril guía Makita 1500mm para sierras SP6000/DSP600. Perfil de aluminio robusto.', features: ['1500mm', 'Aluminio', 'SP6000/DSP600', 'Extensible'], bestFor: 'Cortes largos en tablero con sierra de inmersión Makita' },
  { id: 'bosch_blue_fsn16002', typeId: 'guide_rail', brandId: 'bosch_blue', model: 'FSN 1600/2 Carril guía', tier: 'pro', use: ['workshop', 'construction'], power: 'manual', priceMin: 130, priceMax: 180, description: 'Carril guía Bosch Professional 1600mm. Compatible GOF/GKS/GST. Antideslizante.', features: ['1600mm', 'GOF/GKS/GST', 'Antideslizante', 'Perfil aluminio'], bestFor: 'Cortes rectos con sierras Bosch Professional' },

  // ── ABRASIVOS adicionales (abrasives) ──────────────────────────
  { id: 'bosch_green_2608621154', typeId: 'abrasives', brandId: 'bosch_green', model: '2608621154 Set 50 lijas 125mm Rojo', tier: 'basic', use: ['home', 'workshop'], power: 'manual', priceMin: 12, priceMax: 20, description: 'Set 50 discos de lija 125mm (P80-P240). Óxido de aluminio. Multiperforados Bosch.', features: ['50 discos', '125mm', 'P80-P240', 'Multiperforado', 'Óxido aluminio'], bestFor: 'Reposición de lijas para lijadora orbital de bricolaje' },
  { id: 'makita_b21932', typeId: 'abrasives', brandId: 'makita', model: 'B-21932 Set 10 lijas velcro 150mm', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 10, priceMax: 18, description: 'Set 10 discos 150mm velcro (P80/P120/P180/P240). Para lijadoras Makita BO6040/BO6030.', features: ['10 discos', '150mm', 'Velcro', 'P80-P240', 'Makita OEM'], bestFor: 'Lijas originales para lijadoras excéntricas Makita 150mm' },
  { id: 'festool_201073', typeId: 'abrasives', brandId: 'festool', model: 'Granat 201073 Set 50 lijas 150mm', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 30, priceMax: 50, description: 'Set 50 discos Granat 150mm mix (P80-P320). La mejor lija del mercado para lijadora excéntrica.', features: ['50 discos', '150mm', 'P80-P320', 'Granat', 'Larga duración'], bestFor: 'Acabado de exposición en ebanistería y lacado de muebles' },

  // ── GRAMIL ADICIONAL (marking_gauge) ──────────────────────────
  { id: 'stanley_47_543', typeId: 'marking_gauge', brandId: 'stanley', model: '47-543 Gramil de rueda', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 18, priceMax: 28, description: 'Gramil de rueda Stanley 150mm. Tope de latón, cuerpo de madera de haya. Ajuste preciso.', features: ['150mm', 'Rueda de corte', 'Haya + latón', 'Ajuste fino'], bestFor: 'Marcar líneas paralelas al canto de tablones y tableros' },
  { id: 'irwin_t100', typeId: 'marking_gauge', brandId: 'irwin', model: 'T100 Gramil de mortaja doble', tier: 'mid', use: ['workshop'], power: 'manual', priceMin: 25, priceMax: 40, description: 'Gramil de mortaja con doble cuchilla. Dos líneas paralelas a la vez. Mango bimaterial.', features: ['Doble cuchilla', 'Mortaja', 'Bimaterial', 'Ajuste independiente'], bestFor: 'Marcar espigas y mortajas con una sola pasada' },

  // ══════════════════════════════════════════════════════════════
  // LOTE 4 — Acabado superficial, abrasivos hoja, torno y motosierra
  // Categorías previamente vacías: finishing_products, sandpaper,
  // wood_lathe, chainsaw  (2026-04-17)
  // ══════════════════════════════════════════════════════════════

  // ═══ ACABADO SUPERFICIAL — barnices, aceites y ceras ═══
  { id: 'fp01', typeId: 'finishing_products', brandId: 'osmo', model: 'Polyx-Oil 3054 Raw 0,75 L', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 30, priceMax: 48, description: 'Aceite cera duro natural para madera interior. Sin disolventes, sin biocidas. Rendimiento aprox. 25 m² en 2 manos.', features: ['0,75 L', 'Sin disolventes', '~25 m²', 'Interior', 'Efecto natural'], bestFor: 'Acabar mesas, encimeras y suelos de madera maciza con un resultado natural, transpirable y fácil de mantener' },
  { id: 'fp02', typeId: 'finishing_products', brandId: 'rubio_monocoat', model: 'Oil Plus 2C Component A 1,3 L', tier: 'pro', use: ['workshop'], power: 'manual', priceMin: 62, priceMax: 90, description: 'Aceite monocapa 0% VOC para madera. Se mezcla con el acelerador Comp. B (no incluido). Cubre 30-40 m² en 1 mano.', features: ['0% VOC', '1 sola capa', '30-40 m²', '+170 colores', 'Certificado'], bestFor: 'Acabado profesional de muebles macizos y suelos: una sola capa, curado químico permanente sin mantenimiento anual' },

  // ═══ PAPEL DE LIJA — hojas y rollos ═══
  { id: 'sp01', typeId: 'sandpaper', brandId: 'mirka', model: 'Gold 230×280 mm Set 50 hojas P80-P240', tier: 'mid', use: ['home', 'workshop'], power: 'manual', priceMin: 12, priceMax: 22, description: '50 hojas de lija Gold 230×280 mm surtidas en granos P80, P100, P120, P180 y P240. Óxido de aluminio con agente antideslizante.', features: ['50 hojas', '230×280 mm', 'P80-P240', 'Antideslizante', 'Lijado manual y con taco'], bestFor: 'Lijar a mano y con taco: preparación de superficies, interponados de barniz y acabado fino de muebles' },

  // ═══ TORNO PARA MADERA ═══
  { id: 'wl01', typeId: 'wood_lathe', brandId: 'holzmann', model: 'DB450N 500W', tier: 'mid', use: ['workshop'], power: 'corded', priceMin: 280, priceMax: 380, description: '500 W, distancia entre puntos 450 mm, volteo sobre bancada 250 mm. 5 velocidades: 630-3000 rpm. Mesa de herramientas ajustable en altura y ángulo.', features: ['500 W', '450 mm entre puntos', '250 mm volteo', '5 velocidades 630-3000rpm', 'Mesa ajustable'], bestFor: 'Iniciarse en el torneado de piezas medianas: patas de mesa, cuencos, mangos y piezas decorativas' },

  // ═══ MOTOSIERRA ═══
  { id: 'csaw01', typeId: 'chainsaw', brandId: 'makita', model: 'DUC353Z 36V (2×18V LXT) 35 cm', tier: 'pro', use: ['workshop', 'construction'], power: 'battery', priceMin: 180, priceMax: 250, description: 'Motosierra a batería 36V brushless (2×18V LXT, sin baterías). Espada 35 cm, freno de cadena, autolubricación. Peso 4,1 kg sin baterías.', features: ['36V Brushless', '35 cm espada', '2×18V LXT', 'Freno cadena', 'Autolubricado', '4,1 kg'], bestFor: 'Talar árboles pequeños, trocear leña y limpiar jardín sin humos ni cable, usando baterías del ecosistema Makita LXT' },
];
