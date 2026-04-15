// ═══════════════════════════════════════════════════════════════
// COMPARE SHEET — modal con comparativa side-by-side de 2-3 tools.
// ───────────────────────────────────────────────────────────────
// Se suscribe al compareService y pinta una tabla con columnas:
//   - Columna de etiquetas (100px, fija a la izquierda)
//   - Una columna por producto (160px)
// Todo envuelto en un ScrollView horizontal.
//
// Si hay menos de 2 productos, muestra estado vacío.
// Botón inferior "Vaciar comparación" llama a clearCompare().
// ═══════════════════════════════════════════════════════════════

import React, { useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, radius, typography } from '../theme';
import Icon from './Icon';
import {
  useCompare,
  removeFromCompare,
  clearCompare,
} from '../services/compareService';
import { TOOL_PRODUCTS } from '../data/toolData';
import { ToolProduct, ToolTier, ToolUse, ToolPower } from '../models/tools';
import {
  getToolBrandName,
  getToolTypeName,
} from '../services/toolSearchService';
import type { IconName } from './Icon';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const LABEL_COL_WIDTH = 100;
const PRODUCT_COL_WIDTH = 160;

const TIER_COLORS: Record<ToolTier, string> = {
  basic: colors.success,
  mid: colors.warning,
  pro: colors.danger,
};

const TIER_LABELS: Record<ToolTier, string> = {
  basic: 'Básica',
  mid: 'Media',
  pro: 'Pro',
};

const POWER_ICONS: Record<ToolPower, IconName> = {
  battery: 'battery',
  corded: 'plug',
  manual: 'hand',
};

const POWER_LABELS: Record<ToolPower, string> = {
  battery: 'Batería',
  corded: 'Cable',
  manual: 'Manual',
};

const USE_LABELS: Record<ToolUse, string> = {
  home: 'Casa',
  workshop: 'Taller',
  construction: 'Obra',
};

function formatUses(uses: ToolUse[]): string {
  return uses.map((u) => USE_LABELS[u]).join(' · ');
}

function formatPrice(min: number, max: number): string {
  return `${min}€ – ${max}€`;
}

// Identifica qué filas tienen valores distintos entre productos,
// para pintar fondo tintado en las celdas (resalta diferencias).
function allEqual(values: string[]): boolean {
  if (values.length <= 1) return true;
  const first = values[0];
  return values.every((v) => v === first);
}

export default function CompareSheet({ visible, onClose }: Props) {
  const ids = useCompare();

  const products = useMemo<ToolProduct[]>(() => {
    return ids
      .map((id) => TOOL_PRODUCTS.find((p) => p.id === id))
      .filter((p): p is ToolProduct => !!p);
  }, [ids]);

  const hasEnough = products.length >= 2;

  // Precompute row values for diff detection
  const rows = useMemo(() => {
    return {
      brand: products.map((p) => getToolBrandName(p.brandId)),
      model: products.map((p) => p.model),
      type: products.map((p) => getToolTypeName(p.typeId)),
      tier: products.map((p) => p.tier),
      power: products.map((p) => p.power),
      use: products.map((p) => formatUses(p.use)),
      price: products.map((p) => formatPrice(p.priceMin, p.priceMax)),
      description: products.map((p) => p.description),
    };
  }, [products]);

  const diffs = useMemo(
    () => ({
      brand: !allEqual(rows.brand),
      model: !allEqual(rows.model),
      type: !allEqual(rows.type),
      tier: !allEqual(rows.tier),
      power: !allEqual(rows.power),
      use: !allEqual(rows.use),
      price: !allEqual(rows.price),
      description: !allEqual(rows.description),
    }),
    [rows],
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          {/* Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Comparar herramientas</Text>
              <Text style={styles.subtitle}>
                {products.length} de 3 seleccionadas
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Icon name="close" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Body */}
          {!hasEnough ? (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyTitle}>
                Añade al menos 2 herramientas
              </Text>
              <Text style={styles.emptySubtitle}>
                Toca el icono de comparar en una herramienta del catálogo para
                añadirla. Puedes comparar hasta 3 a la vez.
              </Text>
            </View>
          ) : (
            <ScrollView
              style={styles.tableWrap}
              contentContainerStyle={{ paddingBottom: spacing.xl }}
              showsVerticalScrollIndicator={false}
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
              >
                <View style={{ flexDirection: 'row' }}>
                  {/* ── Label column ─────────────────────────── */}
                  <View
                    style={[styles.col, { width: LABEL_COL_WIDTH }]}
                  >
                    <View style={[styles.headerCell, styles.labelHeaderCell]}>
                      <Text style={styles.labelHeaderText}>Producto</Text>
                    </View>
                    <LabelCell text="Marca" diff={diffs.brand} />
                    <LabelCell text="Modelo" diff={diffs.model} alt />
                    <LabelCell text="Categoría" diff={diffs.type} />
                    <LabelCell text="Gama" diff={diffs.tier} alt />
                    <LabelCell text="Alimentación" diff={diffs.power} />
                    <LabelCell text="Uso" diff={diffs.use} alt />
                    <LabelCell text="Precio" diff={diffs.price} />
                    <LabelCell
                      text="Descripción"
                      diff={diffs.description}
                      alt
                      tall
                    />
                  </View>

                  {/* ── Product columns ──────────────────────── */}
                  {products.map((p) => {
                    const tierColor = TIER_COLORS[p.tier];
                    return (
                      <View
                        key={p.id}
                        style={[styles.col, { width: PRODUCT_COL_WIDTH }]}
                      >
                        {/* Header cell with brand + model + remove btn */}
                        <View style={[styles.headerCell, styles.prodHeaderCell]}>
                          <View style={{ flex: 1, paddingRight: spacing.xs }}>
                            <Text
                              style={styles.prodHeaderBrand}
                              numberOfLines={1}
                            >
                              {getToolBrandName(p.brandId)}
                            </Text>
                            <Text
                              style={styles.prodHeaderModel}
                              numberOfLines={1}
                            >
                              {p.model}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => removeFromCompare(p.id)}
                            hitSlop={8}
                            style={styles.removeBtn}
                          >
                            <Icon
                              name="close"
                              size={14}
                              color={colors.textMuted}
                            />
                          </TouchableOpacity>
                        </View>

                        <ValueCell diff={diffs.brand}>
                          <Text style={styles.cellText} numberOfLines={2}>
                            {getToolBrandName(p.brandId)}
                          </Text>
                        </ValueCell>

                        <ValueCell diff={diffs.model} alt>
                          <Text style={styles.cellText} numberOfLines={2}>
                            {p.model}
                          </Text>
                        </ValueCell>

                        <ValueCell diff={diffs.type}>
                          <Text style={styles.cellText} numberOfLines={2}>
                            {getToolTypeName(p.typeId)}
                          </Text>
                        </ValueCell>

                        <ValueCell diff={diffs.tier} alt>
                          <View style={styles.tierRow}>
                            <View
                              style={[
                                styles.tierDot,
                                { backgroundColor: tierColor },
                              ]}
                            />
                            <Text
                              style={[styles.cellText, { color: tierColor }]}
                              numberOfLines={1}
                            >
                              {TIER_LABELS[p.tier]}
                            </Text>
                          </View>
                        </ValueCell>

                        <ValueCell diff={diffs.power}>
                          <View style={styles.tierRow}>
                            <Icon
                              name={POWER_ICONS[p.power]}
                              size={14}
                              color={colors.textSecondary}
                            />
                            <Text style={styles.cellText} numberOfLines={1}>
                              {POWER_LABELS[p.power]}
                            </Text>
                          </View>
                        </ValueCell>

                        <ValueCell diff={diffs.use} alt>
                          <Text style={styles.cellText} numberOfLines={2}>
                            {formatUses(p.use)}
                          </Text>
                        </ValueCell>

                        <ValueCell diff={diffs.price}>
                          <Text
                            style={[styles.cellText, styles.priceText]}
                            numberOfLines={1}
                          >
                            {formatPrice(p.priceMin, p.priceMax)}
                          </Text>
                        </ValueCell>

                        <ValueCell diff={diffs.description} alt tall>
                          <Text
                            style={[styles.cellText, styles.descText]}
                            numberOfLines={2}
                          >
                            {p.description}
                          </Text>
                        </ValueCell>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </ScrollView>
          )}

          {/* Footer action */}
          {hasEnough && (
            <TouchableOpacity
              onPress={clearCompare}
              style={styles.clearBtn}
              activeOpacity={0.8}
            >
              <Icon name="close" size={16} color={colors.danger} />
              <Text style={styles.clearBtnText}>Vaciar comparación</Text>
            </TouchableOpacity>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function LabelCell({
  text,
  diff,
  alt,
  tall,
}: {
  text: string;
  diff: boolean;
  alt?: boolean;
  tall?: boolean;
}) {
  return (
    <View
      style={[
        styles.cell,
        styles.labelCell,
        alt && styles.cellAlt,
        diff && styles.cellDiff,
        tall && styles.cellTall,
      ]}
    >
      <Text style={styles.labelText} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
}

function ValueCell({
  children,
  diff,
  alt,
  tall,
}: {
  children: React.ReactNode;
  diff: boolean;
  alt?: boolean;
  tall?: boolean;
}) {
  return (
    <View
      style={[
        styles.cell,
        alt && styles.cellAlt,
        diff && styles.cellDiff,
        tall && styles.cellTall,
      ]}
    >
      {children}
    </View>
  );
}

// ── Styles ──────────────────────────────────────────────────────

const ROW_HEIGHT = 44;
const ROW_HEIGHT_TALL = 64;
const HEADER_HEIGHT = 56;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
    maxHeight: '85%',
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Empty state
  emptyWrap: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
  },

  // Table
  tableWrap: {
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  col: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  headerCell: {
    height: HEADER_HEIGHT,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  labelHeaderCell: {
    justifyContent: 'center',
  },
  labelHeaderText: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  prodHeaderCell: {
    justifyContent: 'space-between',
  },
  prodHeaderBrand: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  prodHeaderModel: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '700',
    marginTop: 1,
  },
  removeBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  cell: {
    height: ROW_HEIGHT,
    paddingHorizontal: spacing.sm,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  cellAlt: {
    backgroundColor: colors.surfaceLight,
  },
  cellDiff: {
    backgroundColor: colors.primaryMuted,
  },
  cellTall: {
    height: ROW_HEIGHT_TALL,
  },
  labelCell: {
    backgroundColor: colors.bgAlt,
  },
  labelText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cellText: {
    ...typography.bodySmall,
    color: colors.text,
  },
  priceText: {
    fontWeight: '700',
    color: colors.primary,
  },
  descText: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  tierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  tierDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Footer
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  clearBtnText: {
    ...typography.buttonSmall,
    color: colors.danger,
  },
});
