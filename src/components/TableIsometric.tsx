// ═══════════════════════════════════════════════════════════════
// TABLE ISOMETRIC — vista 3D axonométrica de mesa paramétrica.
// ───────────────────────────────────────────────────────────────
// Reutiliza la misma proyección isométrica que ShelfIsometric.
// Dibuja: 4 patas (prismas cuadrados), faldón opcional, balda inferior
// opcional, y tablero superior (siempre encima).
//
// Orden de pintado (Z-order manual, sin depth buffer):
//   1. Patas traseras     (más lejanas)
//   2. Balda inferior
//   3. Faldones
//   4. Patas delanteras
//   5. Tablero superior   (siempre encima — es lo último)
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { colors } from '../theme';

interface Props {
  length: number;       // cm — largo (eje X)
  width: number;        // cm — ancho / fondo (eje Z)
  height: number;       // cm — alto (eje Y)
  legSection: number;   // cm — sección cuadrada de pata
  topThickness: number; // mm — grosor tablero
  hasApron: boolean;
  apronHeight: number;  // cm
  hasLowerShelf: boolean;
  displaySize?: number;
}

// Paleta madera
const WOOD_FRONT = '#C9A56A';
const WOOD_TOP = '#E0BE82';
const WOOD_SIDE = '#A08050';
const OUTLINE = '#3B2817';

const ISO = 30;
const COS = Math.cos((ISO * Math.PI) / 180);
const SIN = Math.sin((ISO * Math.PI) / 180);

export default function TableIsometric({
  length,
  width,
  height,
  legSection,
  topThickness,
  hasApron,
  apronHeight,
  hasLowerShelf,
  displaySize = 300,
}: Props) {
  if (length <= 0 || width <= 0 || height <= 0 || legSection <= 0) {
    return (
      <View
        style={[styles.placeholder, { width: displaySize, height: displaySize }]}
      />
    );
  }

  const topTcm = topThickness / 10;

  // Escala para que la mesa quepa en el canvas
  const projW = length + width * COS;
  const projH = height + width * SIN;
  const scale = Math.min(displaySize / projW, displaySize / projH) * 0.88;

  const scaledProjW = projW * scale;
  const scaledProjH = projH * scale;
  const originX = displaySize / 2 - scaledProjW / 2;
  const originY = displaySize / 2 + scaledProjH / 2;

  const p = (x: number, y: number, z: number): [number, number] => {
    const sx = originX + (x + z * COS) * scale;
    const sy = originY - (y + z * SIN) * scale;
    return [sx, sy];
  };
  const pt = (pts: [number, number][]) =>
    pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  // Helper: pinta un prisma rectangular (3 caras visibles)
  const renderPrism = (
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    z1: number,
    z2: number,
    keyPrefix: string,
    colorOverride?: { front?: string; top?: string; side?: string }
  ) => {
    const front = [p(x1, y1, z1), p(x2, y1, z1), p(x2, y2, z1), p(x1, y2, z1)];
    const top = [p(x1, y2, z1), p(x2, y2, z1), p(x2, y2, z2), p(x1, y2, z2)];
    const side = [p(x2, y1, z1), p(x2, y2, z1), p(x2, y2, z2), p(x2, y1, z2)];
    return (
      <React.Fragment key={keyPrefix}>
        <Polygon
          points={pt(top)}
          fill={colorOverride?.top ?? WOOD_TOP}
          stroke={OUTLINE}
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <Polygon
          points={pt(side)}
          fill={colorOverride?.side ?? WOOD_SIDE}
          stroke={OUTLINE}
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <Polygon
          points={pt(front)}
          fill={colorOverride?.front ?? WOOD_FRONT}
          stroke={OUTLINE}
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
      </React.Fragment>
    );
  };

  // ── Cálculos de posiciones ──────────────────────────────────
  const legY1 = 0;
  const legY2 = +(height - topTcm).toFixed(3);

  // 4 patas (orden: traseras primero, delanteras después)
  // Trasera izquierda: x[0,ls], z[width-ls, width]
  // Trasera derecha:   x[length-ls, length], z[width-ls, width]
  // Delantera izq:     x[0,ls], z[0,ls]
  // Delantera der:     x[length-ls, length], z[0,ls]

  // Balda inferior (~18cm del suelo)
  const shelfY = 18;
  const shelfThicknessCm = topTcm; // misma que tablero
  const shelfY2 = shelfY + shelfThicknessCm;

  // Faldones: debajo del tablero, apoyados en la cara interna de las patas
  const apronY2 = +(height - topTcm).toFixed(3);
  const apronY1 = +(apronY2 - apronHeight).toFixed(3);

  return (
    <View
      style={[styles.container, { width: displaySize, height: displaySize }]}
    >
      <Svg width={displaySize} height={displaySize}>
        {/* 1-2. Patas traseras */}
        {renderPrism(
          0,
          legSection,
          legY1,
          legY2,
          width - legSection,
          width,
          'leg-bl'
        )}
        {renderPrism(
          length - legSection,
          length,
          legY1,
          legY2,
          width - legSection,
          width,
          'leg-br'
        )}

        {/* 3. Balda inferior (opcional) */}
        {hasLowerShelf &&
          renderPrism(
            legSection,
            length - legSection,
            shelfY,
            shelfY2,
            legSection,
            width - legSection,
            'lower-shelf'
          )}

        {/* 4. Faldón trasero */}
        {hasApron &&
          renderPrism(
            legSection,
            length - legSection,
            apronY1,
            apronY2,
            width - legSection - 1,
            width - legSection,
            'apron-back',
            { front: '#AE8B55' }
          )}

        {/* 5-6. Patas delanteras */}
        {renderPrism(
          0,
          legSection,
          legY1,
          legY2,
          0,
          legSection,
          'leg-fl'
        )}
        {renderPrism(
          length - legSection,
          length,
          legY1,
          legY2,
          0,
          legSection,
          'leg-fr'
        )}

        {/* 7-8. Faldones delantero y laterales */}
        {hasApron && (
          <>
            {renderPrism(
              legSection,
              length - legSection,
              apronY1,
              apronY2,
              legSection,
              legSection + 1,
              'apron-front',
              { front: WOOD_FRONT }
            )}
            {renderPrism(
              length - legSection - 1,
              length - legSection,
              apronY1,
              apronY2,
              legSection,
              width - legSection,
              'apron-right',
              { front: '#AE8B55' }
            )}
          </>
        )}

        {/* 9. Tablero superior — siempre al final para quedar encima */}
        {renderPrism(
          0,
          length,
          height - topTcm,
          height,
          0,
          width,
          'top'
        )}
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
