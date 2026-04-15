/**
 * Registro centralizado de logos de marcas.
 * Logos locales (21 PNGs normalizados del pack Fase 20).
 * URLs remotas para las marcas sin logo local.
 */
import { ImageSourcePropType } from 'react-native';

export const BRAND_LOGOS: Record<string, ImageSourcePropType> = {
  // ── Logos locales ──────────────────────────────────────────
  aeg:                    require('./aeg.png'),
  bessey:                 require('./bessey.png'),
  blackdecker:            require('./blackdecker.png'),
  bosch:                  require('./bosch.png'),
  bosch_blue:             require('./bosch.png'),
  bosch_green:            require('./bosch.png'),
  cmt_orange_tools:       require('./cmt_orange_tools.png'),
  dewalt:                 require('./dewalt.png'),
  einhell:                require('./einhell.png'),
  einhell_professional:   require('./einhell.png'),
  facom:                  require('./facom.png'),
  festool:                require('./festool.png'),
  hikoki:                 require('./hikoki.png'),
  mafell:                 require('./mafell.png'),
  makita:                 require('./makita.png'),
  metabo:                 require('./metabo.png'),
  milwaukee:              require('./milwaukee.png'),
  parkside:               require('./parkside.png'),
  parkside_performance:   require('./parkside.png'),
  ryobi:                  require('./ryobi.png'),
  skil:                   require('./skil.png'),
  stanley:                require('./stanley.png'),
  stanley_fatmax:         require('./stanley.png'),
  stayer:                 require('./stayer.png'),
  virutex:                require('./virutex.png'),
  wolfcraft:              require('./wolfcraft.png'),

  // ── URLs remotas (sin logo local) ─────────────────────────
  kreg:       { uri: 'https://assets.stickpng.com/images/5ec3adf508d0120004e84fdb.png' },
  lamello:    { uri: 'https://getlogo.net/wp-content/uploads/2020/05/lamello-ag-logo-vector.png' },
  triton:     { uri: 'https://getlogovector.com/wp-content/uploads/2021/01/triton-tools-logo-vector.png' },
  femi:       { uri: 'https://www.femi.it/assets/img/logo-femi-big.png' },
  freud:      { uri: 'https://images.seeklogo.com/logo-png/5/1/freud-logo-png_seeklogo-57688.png' },
  piher:      { uri: 'https://www.ferreshop.com.mx/cdn/shop/collections/PIHER-LOGO_1350x311.jpg?v=1646160169' },
  kwb:        { uri: 'https://logovectorseek.com/wp-content/uploads/2019/09/kwb-germany-gmbh-logo-vector.png' },
  vito:       { uri: 'https://images.seeklogo.com/logo-png/48/1/vito-hand-tools-logo-png_seeklogo-485791.png' },
  powerplus:  { uri: 'https://images.seeklogo.com/logo-png/37/1/power-plus-logo-png_seeklogo-379186.png' },
  evolution:  { uri: 'https://evolutionpowertoolscareers.com/wp-content/uploads/2018/09/cropped-evolution-power-tools-logo-orange-on-black.jpg' },
  koma_tools: { uri: 'https://elektro3.com/assets/front-home/img/home-marca-komatools.png' },
  toolson:    { uri: 'https://media.cdn.bauhaus/s/bahagcom/assets/81/89/818985_21540453.jpg' },
};

/** Devuelve el logo de una marca o undefined si no hay ninguno */
export function getBrandLogo(brandId: string): ImageSourcePropType | undefined {
  return BRAND_LOGOS[brandId];
}
