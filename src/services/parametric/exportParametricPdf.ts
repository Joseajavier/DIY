// ═══════════════════════════════════════════════════════════════
// EXPORT PARAMETRIC PDF — genera un PDF imprimible del despiece.
// ───────────────────────────────────────────────────────────────
// Usa expo-print para convertir HTML → PDF en disco y expo-sharing
// para que el usuario lo comparta (mail, WhatsApp, guardar archivos).
// Incluye 3 vistas ortográficas esquemáticas en SVG inline:
//   • Alzado (frente)
//   • Planta (arriba)
//   • Perfil (lateral)
// Y tablas de despiece (tableros + listones) listas para comprar.
// ═══════════════════════════════════════════════════════════════

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { ParametricOutput } from '../../models';

interface Dims {
  // Medidas para los planos ortográficos (todo en cm).
  // Usamos length×depth×height como convención genérica: si el mueble
  // no tiene "length" (ej. estantería) pasamos width en su lugar.
  length: number;
  width: number;
  height: number;
}

// ── Helpers de formato HTML ──────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * SVG ortográfico simple de una caja 3D a 3 vistas: alzado, planta, perfil.
 * Cada vista cotada con las medidas pertinentes.
 */
function orthoSvg(dims: Dims): string {
  const { length, width: depth, height } = dims;
  if (length <= 0 || depth <= 0 || height <= 0) return '';

  // Escala: que la vista más grande ocupe ~220px máximo.
  const MAX = 220;
  const maxDim = Math.max(length, depth, height);
  const k = MAX / maxDim;

  const L = length * k;
  const D = depth * k;
  const H = height * k;

  // Dibujamos 3 rectángulos alineados en fila con gaps y etiquetas
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320"
     style="width:100%;max-width:720px;background:#fafaf7;border:1px solid #ddd;border-radius:6px">
  <style>
    .label { font: 600 11px sans-serif; fill: #5a4a33; }
    .dim   { font: 11px sans-serif; fill: #888; }
    .box   { fill: #f3ebd5; stroke: #5a4a33; stroke-width: 1.2; }
    .tick  { stroke: #888; stroke-width: 0.6; }
  </style>

  <!-- ALZADO (frontal) — length × height -->
  <g transform="translate(30, 40)">
    <text class="label" x="0" y="-10">ALZADO · frontal</text>
    <rect class="box" x="0" y="0" width="${L.toFixed(1)}" height="${H.toFixed(1)}" />
    <text class="dim" x="${(L / 2).toFixed(1)}" y="${(H + 18).toFixed(1)}" text-anchor="middle">${length} cm</text>
    <text class="dim" x="-8" y="${(H / 2 + 4).toFixed(1)}" text-anchor="end">${height} cm</text>
  </g>

  <!-- PLANTA (desde arriba) — length × depth -->
  <g transform="translate(270, 40)">
    <text class="label" x="0" y="-10">PLANTA · desde arriba</text>
    <rect class="box" x="0" y="0" width="${L.toFixed(1)}" height="${D.toFixed(1)}" />
    <text class="dim" x="${(L / 2).toFixed(1)}" y="${(D + 18).toFixed(1)}" text-anchor="middle">${length} cm</text>
    <text class="dim" x="-8" y="${(D / 2 + 4).toFixed(1)}" text-anchor="end">${depth} cm</text>
  </g>

  <!-- PERFIL (lateral) — depth × height -->
  <g transform="translate(510, 40)">
    <text class="label" x="0" y="-10">PERFIL · lateral</text>
    <rect class="box" x="0" y="0" width="${D.toFixed(1)}" height="${H.toFixed(1)}" />
    <text class="dim" x="${(D / 2).toFixed(1)}" y="${(H + 18).toFixed(1)}" text-anchor="middle">${depth} cm</text>
    <text class="dim" x="-8" y="${(H / 2 + 4).toFixed(1)}" text-anchor="end">${height} cm</text>
  </g>
</svg>
  `.trim();
}

function buildHtml(
  title: string,
  dims: Dims,
  output: ParametricOutput
): string {
  const date = new Date().toLocaleDateString('es-ES');

  const piecesRows = output.pieces
    .map(
      (p) => `
    <tr>
      <td>${escapeHtml(p.name ?? '—')}</td>
      <td class="num">${p.width}</td>
      <td class="num">${p.height}</td>
      <td class="num">${p.thickness ?? '—'}</td>
      <td class="num">${p.quantity}</td>
    </tr>`
    )
    .join('');

  const lumberRows = (output.lumberPieces ?? [])
    .map(
      (l) => `
    <tr>
      <td>${escapeHtml(l.name)}</td>
      <td>${escapeHtml(l.section)}</td>
      <td class="num">${l.length}</td>
      <td class="num">${l.quantity}</td>
      <td class="num">${((l.length * l.quantity) / 100).toFixed(2)}</td>
    </tr>`
    )
    .join('');

  const hardwareRows = (output.hardware ?? [])
    .map(
      (h) => `
    <tr>
      <td>${escapeHtml(h.name)}</td>
      <td>${escapeHtml(h.spec)}</td>
      <td class="num">${h.quantity}</td>
      <td class="small-note">${escapeHtml(h.notes ?? '')}</td>
    </tr>`
    )
    .join('');

  const notesHtml = output.notes
    .map((n) => `<li>${escapeHtml(n)}</li>`)
    .join('');

  const warningsHtml = output.warnings
    .map((w) => `<li>${escapeHtml(w)}</li>`)
    .join('');

  return `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<style>
  @page { size: A4; margin: 16mm; }
  body {
    font-family: -apple-system, Helvetica, Arial, sans-serif;
    color: #2c2012;
    font-size: 11pt;
    margin: 0;
  }
  h1 {
    color: #b07a2c;
    font-size: 20pt;
    margin: 0 0 4pt 0;
  }
  .subtitle { color: #888; font-size: 10pt; margin-bottom: 16pt; }
  h2 {
    font-size: 12pt;
    color: #5a4a33;
    border-bottom: 1px solid #ddd;
    padding-bottom: 4pt;
    margin-top: 20pt;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8pt;
    font-size: 10pt;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 5pt 8pt;
    text-align: left;
  }
  th {
    background: #f3ebd5;
    font-weight: 600;
    color: #5a4a33;
  }
  .num { text-align: right; font-variant-numeric: tabular-nums; }
  .small-note { font-size: 9pt; color: #7a6a50; font-style: italic; }
  ul { margin: 8pt 0; padding-left: 18pt; }
  li { margin-bottom: 3pt; }
  .warning {
    background: #fff3e0;
    border-left: 3px solid #e67e22;
    padding: 8pt 12pt;
    margin-top: 8pt;
    border-radius: 0 4pt 4pt 0;
  }
  .footer {
    margin-top: 30pt;
    padding-top: 10pt;
    border-top: 1px solid #ddd;
    color: #aaa;
    font-size: 9pt;
    text-align: center;
  }
  .summary-box {
    background: #faf6ec;
    padding: 10pt 14pt;
    border-radius: 6pt;
    margin-bottom: 14pt;
    font-size: 10.5pt;
  }
</style>
</head>
<body>
  <h1>🔨 ${escapeHtml(title)}</h1>
  <div class="subtitle">Generado con DIY Carpintería · ${date}</div>

  <div class="summary-box">${escapeHtml(output.summary)}</div>

  <h2>Vistas ortográficas</h2>
  ${orthoSvg(dims)}

  ${
    output.pieces.length > 0
      ? `
  <h2>🪵 Despiece de tableros</h2>
  <table>
    <thead>
      <tr>
        <th>Pieza</th>
        <th class="num">Ancho (cm)</th>
        <th class="num">Alto (cm)</th>
        <th class="num">Grosor (mm)</th>
        <th class="num">Cantidad</th>
      </tr>
    </thead>
    <tbody>${piecesRows}</tbody>
  </table>`
      : ''
  }

  ${
    output.lumberPieces && output.lumberPieces.length > 0
      ? `
  <h2>🪵 Listones macizos (compra lineal)</h2>
  <table>
    <thead>
      <tr>
        <th>Pieza</th>
        <th>Sección</th>
        <th class="num">Largo (cm)</th>
        <th class="num">Cantidad</th>
        <th class="num">Total (m)</th>
      </tr>
    </thead>
    <tbody>${lumberRows}</tbody>
  </table>`
      : ''
  }

  ${
    output.hardware && output.hardware.length > 0
      ? `
  <h2>🔩 Ferretería · lista de la compra</h2>
  <table>
    <thead>
      <tr>
        <th>Herraje</th>
        <th>Especificación</th>
        <th class="num">Unidades</th>
        <th>Notas de montaje</th>
      </tr>
    </thead>
    <tbody>${hardwareRows}</tbody>
  </table>`
      : ''
  }

  ${
    notesHtml
      ? `
  <h2>📝 Notas</h2>
  <ul>${notesHtml}</ul>`
      : ''
  }

  ${
    warningsHtml
      ? `
  <div class="warning">
    <strong>⚠️ Atención</strong>
    <ul>${warningsHtml}</ul>
  </div>`
      : ''
  }

  <div class="footer">
    Medidas en cm salvo los grosores (mm). Revisa las holguras para
    bisagras / guías antes de cortar.
  </div>
</body>
</html>
  `.trim();
}

/**
 * Genera el PDF y lanza el diálogo de compartir.
 * Devuelve la URI local del PDF creado (útil para tests).
 */
export async function exportParametricPdf(
  title: string,
  dims: Dims,
  output: ParametricOutput
): Promise<string | null> {
  try {
    const html = buildHtml(title, dims, output);
    const { uri } = await Print.printToFileAsync({ html, base64: false });

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: `Despiece ${title}`,
        UTI: 'com.adobe.pdf',
      });
    }
    return uri;
  } catch (e) {
    return null;
  }
}
