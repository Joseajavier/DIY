// ═══════════════════════════════════════════════════════════════
// RETAILER SHEET — modal "Comprar en..." con tiendas del país actual.
// ───────────────────────────────────────────────────────────────
// Se le pasa un `query` (ej. "Makita DHP483") y muestra todas las
// tiendas del país YA seleccionado globalmente (locationService),
// con urlTemplate aplicado. Al tocar una, abre el resultado de
// búsqueda en el navegador del sistema.
//
// NOTA: el país se gestiona fuera (selector global). Este sheet
// NO muestra selector — solo usa el país actual de la sesión.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Linking,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { colors, spacing, radius, typography } from '../theme';
import Icon from './Icon';
import { retailersForCountry } from '../data/retailers';
import { getCurrentCountry } from '../services/locationService';

type Props = {
  visible: boolean;
  onClose: () => void;
  query: string;
  /** Label opcional del producto para mostrar en cabecera. */
  productLabel?: string;
  /** Rango de precio del producto (opcional, en euros). */
  priceMin?: number;
  priceMax?: number;
};

export default function RetailerSheet({
  visible,
  onClose,
  query,
  productLabel,
  priceMin,
  priceMax,
}: Props) {
  // País tomado del estado global. No se muestra selector aquí:
  // si el usuario quiere cambiar de país, lo hace en Ajustes o en
  // la pantalla de Chollos.
  const country = getCurrentCountry();
  const retailers = retailersForCountry(country);
  const hasPrices = priceMin !== undefined && priceMax !== undefined;

  const handlePick = (urlTemplate: string) => {
    const url = urlTemplate.replace('{q}', encodeURIComponent(query));
    Linking.openURL(url).catch(() => {});
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e: GestureResponderEvent) => e.stopPropagation()}>
          {/* Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Comprar en…</Text>
              {productLabel ? (
                <Text style={styles.product} numberOfLines={1}>
                  {productLabel}
                </Text>
              ) : null}
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Icon name="close" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Banner de rango de precio */}
          {hasPrices && (
            <View style={styles.priceBanner}>
              <View style={{ flex: 1 }}>
                <Text style={styles.priceBannerLabel}>Rango de mercado</Text>
                <Text style={styles.priceBannerRange}>
                  {priceMin}€ – {priceMax}€
                </Text>
              </View>
              <View style={styles.priceBannerBadge}>
                <Icon name="info" size={12} color={colors.textMuted} />
                <Text style={styles.priceBannerBadgeText}>estimado</Text>
              </View>
            </View>
          )}

          {/* Lista de tiendas */}
          <Text style={styles.sectionLabel}>Tiendas disponibles</Text>
          <ScrollView
            style={styles.list}
            contentContainerStyle={{ paddingBottom: spacing.xxl }}
            showsVerticalScrollIndicator={false}
          >
            {retailers.map((r) => (
              <TouchableOpacity
                key={r.id}
                style={styles.retailer}
                onPress={() => handlePick(r.urlTemplate)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.retailerIcon,
                    { backgroundColor: (r.color ?? colors.primary) + '22' },
                  ]}
                >
                  <Icon
                    name={r.icon}
                    size={22}
                    color={r.color ?? colors.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.retailerName} numberOfLines={1}>
                    {r.name}
                  </Text>
                  <Text style={styles.retailerKind}>{kindLabel(r.kind)}</Text>
                </View>
                <Icon name="forward" size={18} color={colors.textMuted} />
              </TouchableOpacity>
            ))}

            <Text style={styles.disclaimer}>
              Los precios cambian continuamente. Tocar una tienda abre su
              buscador con el modelo exacto para ver el precio real y
              disponibilidad en directo.
            </Text>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function kindLabel(kind: string): string {
  switch (kind) {
    case 'marketplace':
      return 'Marketplace';
    case 'diy':
      return 'Bricolaje / generalista';
    case 'pro':
      return 'Profesional';
    default:
      return 'Tienda';
  }
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  product: {
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
  sectionLabel: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  list: {
    marginTop: spacing.xs,
  },
  retailer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  retailerIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retailerName: {
    ...typography.h3,
    color: colors.text,
    flexShrink: 1,
  },
  retailerKind: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  priceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.primaryMuted,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.primary + '33',
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  priceBannerLabel: {
    ...typography.caption,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontSize: 10,
  },
  priceBannerRange: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: '800',
    marginTop: 2,
  },
  priceBannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  priceBannerBadgeText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  disclaimer: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
    marginTop: spacing.md,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
});
