// ═══════════════════════════════════════════════════════════════
// BOARD DIAGRAM — diagrama visual de cortes en un tablero
// ───────────────────────────────────────────────────────────────
// Renderiza un tablero a escala con las piezas posicionadas
// usando Views absolutos. No requiere react-native-svg.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlacedPiece } from '../models';
import { colors, radius, typography } from '../theme';

// ── Paleta de colores para las piezas ────────────────────────

const PIECE_PALETTE = [
  '#4A90E2', // azul
  '#7B6CCD', // morado
  '#50C878', // verde esmeralda
  '#E8944E', // naranja
  '#E25555', // rojo
  '#3ABBB5', // verde azulado
  '#C9A84C', // dorado
  '#8B6F47', // marrón madera
  '#6BAED6', // azul claro
  '#D4A5A5', // rosa
  '#66BB6A', // verde claro
  '#AB47BC', // violeta
];

function pieceColor(colorIndex?: number): string {
  const idx = (colorIndex ?? 0) % PIECE_PALETTE.length;
  return PIECE_PALETTE[idx];
}

// ── Tipos ─────────────────────────────────────────────────────

interface Props {
  pieces: PlacedPiece[];
  boardWidth: number;   // mm o cm (la unidad da igual, lo que importa es la proporción)
  boardHeight: number;
  displayWidth?: number; // px en pantalla (default 320)
  boardIndex?: number;
  wastePercentage?: number;
}

// ── Componente ────────────────────────────────────────────────

export default function BoardDiagram({
  pieces,
  boardWidth,
  boardHeight,
  displayWidth = 320,
  boardIndex,
  wastePercentage,
}: Props) {
  const scale = displayWidth / boardWidth;
  const displayHeight = Math.round(boardHeight * scale);

  // Eficiencia para color del borde
  const efficiency = wastePercentage !== undefined ? 100 - wastePercentage : undefined;
  const borderColor =
    efficiency === undefined
      ? colors.border
      : efficiency >= 80
      ? colors.success
      : efficiency >= 50
      ? colors.warning
      : colors.danger;

  return (
    <View style={styles.wrapper}>
      {/* Cabecera del tablero */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {boardIndex !== undefined ? `Tablero ${boardIndex + 1}` : 'Tablero'}
        </Text>
        {wastePercentage !== undefined && (
          <Text style={[styles.efficiency, { color: borderColor }]}>
            {(100 - wastePercentage).toFixed(0)}% aprovechado
          </Text>
        )}
        <Text style={styles.dims}>
          {boardWidth} × {boardHeight}
        </Text>
      </View>

      {/* El tablero a escala */}
      <View
        style={[
          styles.board,
          {
            width: displayWidth,
            height: displayHeight,
            borderColor,
          },
        ]}
      >
        {/* Zona de desperdicio (fondo rayado visual) */}
        <View style={[StyleSheet.absoluteFill, styles.wasteBg]} />

        {/* Piezas */}
        {pieces.map((piece, idx) => {
          const color = pieceColor(piece.colorIndex ?? idx);
          const left = Math.round(piece.x * scale);
          const top = Math.round(piece.y * scale);
          const w = Math.max(2, Math.round(piece.width * scale));
          const h = Math.max(2, Math.round(piece.height * scale));

          // Mostrar label si la pieza es lo bastante grande
          const showLabel = w > 36 && h > 20;
          const showDims = w > 48 && h > 30;

          return (
            <View
              key={idx}
              style={[
                styles.piece,
                {
                  left,
                  top,
                  width: w,
                  height: h,
                  backgroundColor: color + 'CC', // 80% opacidad
                  borderColor: color,
                },
              ]}
            >
              {showLabel && piece.label ? (
                <Text
                  style={styles.pieceLabel}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {piece.label}
                </Text>
              ) : null}
              {showDims && (
                <Text style={styles.pieceDims} numberOfLines={1} adjustsFontSizeToFit>
                  {piece.width}×{piece.height}
                </Text>
              )}
            </View>
          );
        })}
      </View>

      {/* Leyenda de piezas */}
      {pieces.length > 0 && (
        <View style={styles.legend}>
          {pieces.map((piece, idx) => {
            const color = pieceColor(piece.colorIndex ?? idx);
            return (
              <View key={idx} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: color }]} />
                <Text style={styles.legendText} numberOfLines={1}>
                  {piece.label ?? `${piece.width}×${piece.height}`}
                  {piece.rotated ? ' ↻' : ''}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

// ── Estilos ───────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
  },
  efficiency: {
    ...typography.caption,
    fontWeight: '700',
  },
  dims: {
    ...typography.caption,
    color: colors.textMuted,
  },

  // Tablero
  board: {
    borderWidth: 2,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceLight,
    overflow: 'hidden',
    position: 'relative',
  },
  wasteBg: {
    backgroundColor: colors.border + '33',
  },

  // Pieza
  piece: {
    position: 'absolute',
    borderWidth: 1.5,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  pieceLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
  },
  pieceDims: {
    fontSize: 7,
    color: '#fff',
    opacity: 0.85,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },

  // Leyenda
  legend: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    maxWidth: 160,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    flexShrink: 0,
  },
  legendText: {
    fontSize: 10,
    color: colors.textSecondary,
    flex: 1,
  },
});
