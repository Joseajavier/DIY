// ═══════════════════════════════════════════════════════════════
// WOODZY HOME SCREEN — preview del theme Woodzy sobre un Home real
// ───────────────────────────────────────────────────────────────
// Esta pantalla NO está registrada en AppNavigator. Es una plantilla
// de preview para ver el theme en vivo. Para activarla, añadir a
// RootStackParamList y registrar en AppNavigator.tsx:
//
//   WoodzyHome: undefined;
//   <Stack.Screen name="WoodzyHome" component={WoodzyHomeScreen} />
//
// Usa exclusivamente tokens de src/theme/woodzy.ts y no depende
// del theme actual (colors/spacing/etc.) para que se vea "al natural".
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { woodzy } from '../theme/woodzy';

// ─── Datos demo (solo para pintar la plantilla) ────────────────
type DemoCategory = { id: string; icon: string; label: string; highlight?: boolean };
type DemoProduct = { id: string; name: string; price: string; emoji: string };

const DEMO_CATEGORIES: DemoCategory[] = [
  { id: 'chairs', icon: '🪑', label: 'Sillas' },
  { id: 'tables', icon: '🪵', label: 'Mesas', highlight: true },
  { id: 'shelves', icon: '📚', label: 'Estantes' },
  { id: 'beds', icon: '🛏️', label: 'Camas' },
];

const DEMO_PRODUCTS: DemoProduct[] = [
  { id: '1', name: 'Mesa Roble Nórdico', price: '€420', emoji: '🪑' },
  { id: '2', name: 'Silla Nogal', price: '€180', emoji: '🪑' },
  { id: '3', name: 'Estantería Pino', price: '€95', emoji: '📚' },
];

// ═══════════════════════════════════════════════════════════════
// COMPONENTES LOCALES (una vez extraídos a src/components/woodzy/*
// se pueden reutilizar en el resto de pantallas)
// ═══════════════════════════════════════════════════════════════

function TopBar() {
  return (
    <View style={styles.topBar}>
      <View>
        <Text style={[woodzy.type.caption, { color: woodzy.colors.textSecondary }]}>
          Buenos días
        </Text>
        <Text style={[woodzy.type.title, { color: woodzy.colors.textPrimary }]}>
          Woodzy
        </Text>
      </View>
      <Pressable
        style={styles.avatar}
        accessibilityRole="button"
        accessibilityLabel="Abrir perfil"
      >
        <Text style={{ fontSize: 18 }}>👤</Text>
      </Pressable>
    </View>
  );
}

function SearchBar() {
  return (
    <Pressable
      style={styles.search}
      accessibilityRole="search"
      accessibilityLabel="Buscar en el catálogo"
    >
      <Text style={{ fontSize: 16, marginRight: woodzy.spacing.sm }}>🔍</Text>
      <Text style={[woodzy.type.body, { color: woodzy.colors.textMuted, flex: 1 }]}>
        Busca muebles, maderas, acabados…
      </Text>
      <Text style={{ fontSize: 16 }}>⚙️</Text>
    </Pressable>
  );
}

function HeroBanner() {
  return (
    <View style={styles.hero}>
      {/* Líneas curvas estilizadas (patrón, no foto de madera) */}
      <View style={[styles.heroCurve, styles.heroCurve1]} />
      <View style={[styles.heroCurve, styles.heroCurve2]} />
      <View style={[styles.heroCurve, styles.heroCurve3]} />

      <Text
        style={[
          woodzy.type.display,
          { color: woodzy.colors.heroText, fontSize: 26, lineHeight: 32 },
        ]}
      >
        Hecho{'\n'}a medida
      </Text>
      <Text
        style={[
          woodzy.type.body,
          { color: woodzy.colors.heroText, opacity: 0.85, marginTop: woodzy.spacing.sm },
        ]}
      >
        Artesanía en madera para tu casa
      </Text>

      <Pressable style={styles.heroCta} accessibilityRole="button">
        <Text style={[woodzy.type.button, { color: woodzy.colors.textPrimary }]}>
          Descubrir
        </Text>
      </Pressable>
    </View>
  );
}

function CategoryCard({ item }: { item: DemoCategory }) {
  const bg = item.highlight ? woodzy.colors.categorySelected : woodzy.colors.surface;
  const fg = item.highlight
    ? woodzy.colors.categorySelectedText
    : woodzy.colors.textPrimary;
  return (
    <Pressable
      style={[
        styles.categoryCard,
        {
          backgroundColor: bg,
          borderColor: item.highlight ? 'transparent' : woodzy.colors.borderSubtle,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Categoría ${item.label}`}
    >
      <Text style={{ fontSize: woodzy.iconSize.category }}>{item.icon}</Text>
      <Text style={[woodzy.type.chip, { color: fg, marginTop: woodzy.spacing.sm }]}>
        {item.label}
      </Text>
    </Pressable>
  );
}

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={[woodzy.type.subtitle, { color: woodzy.colors.textPrimary }]}>
        {title}
      </Text>
      {action && (
        <Pressable accessibilityRole="link">
          <Text style={[woodzy.type.caption, { color: woodzy.colors.textSecondary }]}>
            {action} →
          </Text>
        </Pressable>
      )}
    </View>
  );
}

function ProductCard({ item }: { item: DemoProduct }) {
  return (
    <Pressable style={styles.productCard} accessibilityRole="button">
      <View style={styles.productImage}>
        <Text style={{ fontSize: 48 }}>{item.emoji}</Text>
      </View>
      <Text
        style={[woodzy.type.bodyStrong, { color: woodzy.colors.textPrimary }]}
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <Text style={[woodzy.type.caption, { color: woodzy.colors.textSecondary }]}>
        {item.price}
      </Text>
    </Pressable>
  );
}

function BottomNav() {
  const items = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '🔍', label: 'Buscar', active: false },
    { icon: '❤️', label: 'Favs', active: false },
    { icon: '👤', label: 'Perfil', active: false },
  ];
  return (
    <View style={styles.bottomNav}>
      {items.map((it) => (
        <Pressable
          key={it.label}
          style={styles.navItem}
          accessibilityRole="button"
          accessibilityLabel={it.label}
        >
          <Text style={{ fontSize: 22, opacity: it.active ? 1 : 0.45 }}>{it.icon}</Text>
          {it.active && <View style={styles.navDot} />}
        </Pressable>
      ))}
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════
// PANTALLA
// ═══════════════════════════════════════════════════════════════

export default function WoodzyHomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={woodzy.colors.background} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TopBar />
        <View style={{ height: woodzy.spacing.lg }} />
        <SearchBar />
        <View style={{ height: woodzy.spacing.xxl }} />
        <HeroBanner />
        <View style={{ height: woodzy.spacing.xxxl }} />

        <SectionHeader title="Categorías" action="Ver todo" />
        <View style={{ height: woodzy.spacing.lg }} />
        <View style={styles.categoryGrid}>
          {DEMO_CATEGORIES.map((c) => (
            <CategoryCard key={c.id} item={c} />
          ))}
        </View>

        <View style={{ height: woodzy.spacing.xxxl }} />
        <SectionHeader title="Popular" action="Ver todo" />
        <View style={{ height: woodzy.spacing.lg }} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productRow}
        >
          {DEMO_PRODUCTS.map((p) => (
            <ProductCard key={p.id} item={p} />
          ))}
        </ScrollView>
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════
// ESTILOS
// ═══════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: woodzy.colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: woodzy.layout.screenPaddingH,
    paddingTop: woodzy.spacing.lg,
    paddingBottom: woodzy.layout.bottomNavHeight + woodzy.spacing.xxxl,
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: woodzy.spacing.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: woodzy.radius.pill,
    backgroundColor: woodzy.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: woodzy.border.hairline,
    borderColor: woodzy.colors.borderSubtle,
  },

  // Search
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: woodzy.colors.surface,
    borderRadius: woodzy.radius.pill,
    paddingHorizontal: woodzy.spacing.xl,
    height: 52,
    borderWidth: woodzy.border.hairline,
    borderColor: woodzy.colors.borderSubtle,
  },

  // Hero
  hero: {
    backgroundColor: woodzy.colors.heroBackground,
    borderRadius: woodzy.layout.heroRadius,
    padding: woodzy.spacing.xxl,
    minHeight: woodzy.layout.heroHeight,
    justifyContent: 'center',
    overflow: 'hidden',
    ...woodzy.shadow.hero,
  },
  heroCurve: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: woodzy.colors.heroPattern,
    borderRadius: 999,
    opacity: 0.55,
  },
  heroCurve1: {
    width: 340,
    height: 340,
    right: -120,
    top: -80,
  },
  heroCurve2: {
    width: 260,
    height: 260,
    right: -60,
    top: -20,
  },
  heroCurve3: {
    width: 180,
    height: 180,
    right: 0,
    top: 40,
  },
  heroCta: {
    marginTop: woodzy.spacing.xl,
    alignSelf: 'flex-start',
    backgroundColor: woodzy.colors.surface,
    paddingHorizontal: woodzy.spacing.xxl,
    height: woodzy.button.heightSm,
    borderRadius: woodzy.radius.pill,
    justifyContent: 'center',
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Categories
  categoryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: woodzy.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: woodzy.border.hairline,
  },

  // Products
  productRow: {
    gap: woodzy.spacing.md,
    paddingRight: woodzy.spacing.xl,
  },
  productCard: {
    width: 160,
    backgroundColor: woodzy.colors.surface,
    borderRadius: woodzy.radius.lg,
    padding: woodzy.spacing.md,
    borderWidth: woodzy.border.hairline,
    borderColor: woodzy.colors.borderSubtle,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: woodzy.colors.surfaceSecondary,
    borderRadius: woodzy.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: woodzy.spacing.md,
  },

  // Bottom nav
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: woodzy.layout.bottomNavHeight,
    backgroundColor: woodzy.colors.surface,
    borderTopWidth: woodzy.border.hairline,
    borderTopColor: woodzy.colors.borderSubtle,
    paddingBottom: woodzy.spacing.sm,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: woodzy.spacing.xs,
  },
  navDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: woodzy.colors.accentPrimary,
  },
});
