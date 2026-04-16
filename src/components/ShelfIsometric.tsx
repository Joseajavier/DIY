// ═══════════════════════════════════════════════════════════════
// SHELF ISOMETRIC — vista 3D axonométrica de la estantería.
// ───────────────────────────────────────────────────────────────
// Proyección isométrica clásica (30° desde horizontal) dibujada con
// react-native-svg. Muestra las 3 caras visibles del mueble:
//   • Frontal   (normal)
//   • Superior  (más clara — simula luz cenital)
//   • Lateral D (más oscura — simula sombra)
// Cada balda dibuja su canto visible en la cara lateral.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Polygon, Line, G } from 'react-native-svg';
import { colors } from '../theme';

interface Props {
  width: number;       // cm — ancho exterior
  height: number;      // cm — alto exterior
  depth: number;       // cm — fondo
  numShelves: number;  // baldas interiores
  thickness: number;   // mm — grosor tablero
  hasBack: boolean;
  displaySize?: number; // px — lado máximo del canvas (default 300)
  /**
   * Panels frontales opcionales: convierte la estantería visualmente
   * en armario (N puertas verticales) o cajonera (N cajones horizontales).
   */
  frontPanels?: {
    type: 'door' | 'drawer';
    count: number;
  };
}

// Paleta madera
const WOOD_FRONT = '#C9A56A';
const WOOD_TOP = '#E0BE82';       // más claro (luz cenital)
const WOOD_SIDE = '#A08050';      // más oscuro (sombra)
const WOOD_BACK = '#8B6F47';      // trasero (más oscuro y saturado)
const WOOD_EDGE = '#6B4F2F';      // canto de baldas
const OUTLINE = '#3B2817';

// Ángulo isométrico
const ISO_ANGLE = 30; // grados
const COS = Math.cos((ISO_ANGLE * Math.PI) / 180); // ≈ 0.866
const SIN = Math.sin((ISO_ANGLE * Math.PI) / 180); // ≈ 0.5

// Paleta adicional para panels frontales
const PANEL_FILL = '#B8935A';
const PANEL_HANDLE = '#3B2817';

export default function ShelfIsometric({
  width,
  height,
  depth,
  numShelves,
  thickness,
  hasBack,
  displaySize = 300,
  frontPanels,
}: Props) {
  // ── Validaciones tempranas ──────────────────────────────────
  if (width <= 0 || height <= 0 || depth <= 0) {
    return <View style={[styles.placeholder, { width: displaySize, height: displaySize }]} />;
  }

  const tCm = thickness / 10;

  // ── Calcular escala para que todo quepa en displaySize ──────
  // Caja de proyección (antes de escalar):
  //   ancho proyectado = width + depth*COS
  //   alto proyectado  = height + depth*SIN
  const projW = width + depth * COS;
  const projH = height + depth * SIN;
  const scale = Math.min(displaySize / projW, displaySize / projH) * 0.88;

  // Offset para centrar en el canvas
  const centerX = displaySize / 2;
  const centerY = displaySize / 2;
  const scaledProjW = projW * scale;
  const scaledProjH = projH * scale;
  const originX = centerX - scaledProjW / 2;
  const originY = centerY + scaledProjH / 2;

  // ── Proyección 3D → 2D (isométrica) ─────────────────────────
  // Sistema 3D: x horizontal (0→width), y vertical arriba (0→height), z fondo (0→depth)
  // Origen 3D: esquina delantera-inferior-izquierda.
  const p = (x: number, y: number, z: number): [number, number] => {
    const sx = originX + (x + z * COS) * scale;
    const sy = originY - (y + z * SIN) * scale;
    return [sx, sy];
  };

  const pt = (pts: [number, number][]): string =>
    pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  // ── Generar polígonos de las 3 caras ────────────────────────

  // CARA FRONTAL (z = 0) — rectángulo
  const front = [
    p(0, 0, 0),
    p(width, 0, 0),
    p(width, height, 0),
    p(0, height, 0),
  ];

  // CARA SUPERIOR (y = height) — paralelogramo
  const top = [
    p(0, height, 0),
    p(width, height, 0),
    p(width, height, depth),
    p(0, height, depth),
  ];

  // CARA LATERAL DERECHA (x = width) — paralelogramo
  const right = [
    p(width, 0, 0),
    p(width, height, 0),
    p(width, height, depth),
    p(width, 0, depth),
  ];

  // ── Baldas visibles en la cara lateral ──────────────────────
  // Si numShelves >= 0 y tenemos espacio interior, dibujo cantos
  const innerHeight = height - 2 * tCm;
  const shelfLines: Array<{ y: number; isEdge: boolean }> = [];
  if (innerHeight > 0 && numShelves >= 0) {
    const spacing = (innerHeight - numShelves * tCm) / (numShelves + 1);
    // base
    shelfLines.push({ y: tCm, isEdge: true });
    // baldas interiores
    let currentY = tCm + spacing;
    for (let i = 0; i < numShelves; i++) {
      shelfLines.push({ y: currentY, isEdge: false });
      shelfLines.push({ y: currentY + tCm, isEdge: false });
      currentY += spacing + tCm;
    }
    // techo
    shelfLines.push({ y: height - tCm, isEdge: true });
  }

  // ── Render ──────────────────────────────────────────────────
  return (
    <View style={[styles.container, { width: displaySize, height: displaySize }]}>
      <Svg width={displaySize} height={displaySize}>
        {/* Cara superior (con luz cenital — más clara) */}
        <Polygon
          points={pt(top)}
          fill={WOOD_TOP}
          stroke={OUTLINE}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* Cara lateral derecha (sombreada — más oscura) */}
        <Polygon
          points={pt(right)}
          fill={WOOD_SIDE}
          stroke={OUTLINE}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* Líneas de los cantos de baldas en la cara lateral */}
        <G>
          {shelfLines.map((line, i) => {
            const [x1, y1] = p(width, line.y, 0);
            const [x2, y2] = p(width, line.y, depth);
            return (
              <Line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={line.isEdge ? OUTLINE : WOOD_EDGE}
                strokeWidth={line.isEdge ? 1 : 0.6}
              />
            );
          })}
        </G>

        {/* Cara frontal — SE DIBUJA DESPUÉS para que quede encima */}
        <Polygon
          points={pt(front)}
          fill={hasBack ? WOOD_FRONT : 'transparent'}
          stroke={OUTLINE}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* Si no hay trasero, mostramos interior oscuro visible por el frente */}
        {!hasBack && (
          <Polygon
            points={pt([
              p(tCm, tCm, depth - 0.1),
              p(width - tCm, tCm, depth - 0.1),
              p(width - tCm, height - tCm, depth - 0.1),
              p(tCm, height - tCm, depth - 0.1),
            ])}
            fill="#2C1F14"
            stroke={OUTLINE}
            strokeWidth={0.6}
          />
        )}

        {/* Divisiones horizontales en la cara frontal (baldas) */}
        <G>
          {shelfLines.map((line, i) => {
            const [x1, y1] = p(tCm, line.y, 0);
            const [x2, y2] = p(width - tCm, line.y, 0);
            return (
              <Line
                key={`f-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={line.isEdge ? OUTLINE : WOOD_EDGE}
                strokeWidth={line.isEdge ? 1 : 0.8}
              />
            );
          })}
        </G>

        {/* Laterales internos dibujados (bordes de grosor) en cara frontal */}
        {tCm > 0 && (
          <G>
            <Line
              x1={p(tCm, 0, 0)[0]}
              y1={p(tCm, 0, 0)[1]}
              x2={p(tCm, height, 0)[0]}
              y2={p(tCm, height, 0)[1]}
              stroke={OUTLINE}
              strokeWidth={0.8}
            />
            <Line
              x1={p(width - tCm, 0, 0)[0]}
              y1={p(width - tCm, 0, 0)[1]}
              x2={p(width - tCm, height, 0)[0]}
              y2={p(width - tCm, height, 0)[1]}
              stroke={OUTLINE}
              strokeWidth={0.8}
            />
          </G>
        )}

        {/* ── Panels frontales (puertas o cajones) ── */}
        {frontPanels && frontPanels.count > 0 && (() => {
          const { type, count } = frontPanels;
          const GAP = 0.3; // cm — hueco entre paneles y carcasa
          const panels: React.ReactNode[] = [];

          if (type === 'door') {
            // Puertas: N paneles verticales full-height
            const totalGap = (count + 1) * GAP;
            const panelW = (width - totalGap) / count;
            const panelH = height - 2 * GAP;
            for (let i = 0; i < count; i++) {
              const x0 = GAP + i * (panelW + GAP);
              const x1 = x0 + panelW;
              const y0 = GAP;
              const y1 = y0 + panelH;
              panels.push(
                <Polygon
                  key={`door-${i}`}
                  points={pt([
                    p(x0, y0, 0),
                    p(x1, y0, 0),
                    p(x1, y1, 0),
                    p(x0, y1, 0),
                  ])}
                  fill={PANEL_FILL}
                  stroke={OUTLINE}
                  strokeWidth={1}
                  strokeLinejoin="round"
                />
              );
              // Tirador: pequeño círculo cerca del borde interior (hacia el centro)
              const isLeftDoor = count === 2 && i === 0;
              const handleX = isLeftDoor
                ? x1 - 2.5
                : count === 2 && i === 1
                ? x0 + 2.5
                : x0 + panelW / 2; // 1 puerta: centrado
              const handleY = (y0 + y1) / 2;
              const [hx, hy] = p(handleX, handleY, 0);
              panels.push(
                <Polygon
                  key={`door-handle-${i}`}
                  points={`${hx - 2},${hy - 0.5} ${hx + 2},${hy - 0.5} ${hx + 2},${hy + 0.5} ${hx - 2},${hy + 0.5}`}
                  fill={PANEL_HANDLE}
                />
              );
            }
          } else {
            // Cajones: N paneles horizontales full-width
            const totalGap = (count + 1) * GAP;
            const panelH = (height - totalGap) / count;
            const panelW = width - 2 * GAP;
            for (let i = 0; i < count; i++) {
              // El cajón 0 es el de ARRIBA visualmente, así que calculamos y desde arriba
              const y1 = height - GAP - i * (panelH + GAP);
              const y0 = y1 - panelH;
              const x0 = GAP;
              const x1 = x0 + panelW;
              panels.push(
                <Polygon
                  key={`drawer-${i}`}
                  points={pt([
                    p(x0, y0, 0),
                    p(x1, y0, 0),
                    p(x1, y1, 0),
                    p(x0, y1, 0),
                  ])}
                  fill={PANEL_FILL}
                  stroke={OUTLINE}
                  strokeWidth={1}
                  strokeLinejoin="round"
                />
              );
              // Tirador centrado
              const handleCx = x0 + panelW / 2;
              const handleCy = (y0 + y1) / 2;
              const handleHalf = Math.min(panelW * 0.15, 4);
              const [hx1, hy1] = p(handleCx - handleHalf, handleCy, 0);
              const [hx2, hy2] = p(handleCx + handleHalf, handleCy, 0);
              panels.push(
                <Line
                  key={`drawer-handle-${i}`}
                  x1={hx1}
                  y1={hy1}
                  x2={hx2}
                  y2={hy2}
                  stroke={PANEL_HANDLE}
                  strokeWidth={2.2}
                  strokeLinecap="round"
                />
              );
            }
          }

          return <G>{panels}</G>;
        })()}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  placeholder: {
    backgroundColor: colors.border,
    borderRadius: 12,
    opacity: 0.3,
  },
});
