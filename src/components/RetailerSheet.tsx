// ═══════════════════════════════════════════════════════════════
// RETAILER SHEET — modal "Comprar en..." con tiendas por país.
// ───────────────────────────────────────────────────────────────
// Se le pasa un `query` (ej. "Makita DHP483") y muestra todas las
// tiendas del país actual con urlTemplate aplicado. Al tocar una,
// abre el resultado de búsqueda en el navegador del sistema.
//
// Incluye un selector horizontal de país en la cabecera para
// cambiar rápido entre mercados.
// ═══════════════════════════════════════════════════════════════

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, radius, typography } from '../theme';
import Icon from './Icon';
import {
  retailersForCountry,
  buildSearchUrl,
  SUPPORTED_COUNTRIES,
} from '../data/retailers';
import {
  getCurrentCountry,
  setUserCountry,
} from '../services/locationService';

type Props = {
  visible: boolean;
  onClose: () => void;
  query: string;
  /** Label opcional del producto para mostrar en cabecera. */
  productLabel?: string;
};

export default function RetailerSheet({
  visible,
  onClose,
  query,
  productLabel,
}: Props) {
  const [country, setCountry] = useState<string>(getCurrentCountry());
  const retailers = useMemo(() => retailersForCountry(country), [country]);

  const handlePick = (urlTemplate: string) => {
    const url = urlTemplate.replace('{q}', encodeURIComponent(query));
    Linking.openURL(url).catch(() => {});
  };

  const handleCountry = (c: string) => {
    setCountry(c);
    setUserCountry(c);
  };

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

          {/* Selector de país */}
          <Text style={styles.sectionLabel}>País</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.countryScroll}
            contentContainerStyle={{ paddingRight: spacing.xl }}
          >
            {SUPPORTED_COUNTRIES.map((c) => (
              <TouchableOpacity
                key={c.code}
                style={[
                  styles.countryChip,
                  country === c.code && styles.countryChipActive,
                ]}
                onPress={() => handleCountry(c.code)}
              >
                <Text
                  style={[
                    styles.countryCode,
                    country === c.code && styles.countryCodeActive,
                  ]}
                >
                  {c.code}
                </Text>
                <Text
                  style={[
                    styles.countryName,
                    country === c.code && styles.countryNameActive,
                  ]}
                >
                  {c.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

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
                  <Text style={styles.retailerName}>{r.name}</Text>
                  <Text style={styles.retailerKind}>{kindLabel(r.kind)}</Text>
                </View>
                <Icon name="forward" size={18} color={colors.textMuted} />
              </TouchableOpacity>
            ))}
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
  countryScroll: {
    flexGrow: 0,
    marginBottom: spacing.sm,
  },
  countryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    alignItems: 'center',
    minWidth: 72,
  },
  countryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 0.5,
  },
  countryCodeActive: { color: colors.textOnPrimary },
  countryName: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 10,
  },
  countryNameActive: { color: colors.textOnPrimary + 'cc' },
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
  },
  retailerKind: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
});
