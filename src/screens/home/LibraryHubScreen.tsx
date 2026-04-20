// ═══════════════════════════════════════════════════════════════
// LIBRARY HUB — tab "Biblioteca" del bottom navigator.
// ───────────────────────────────────────────────────────────────
// Agrupa todo el material de referencia + proyectos guardados:
//   • Mis proyectos
//   • Catálogo de herramientas
//   • Catálogo de maderas
//   • Calculadoras / utilidades
//   • Favoritos
//   • Chollos (acceso a DealsScreen desde aquí)
//
// Navega a rutas del stack raíz para que el detalle se apile por
// encima del tab bar.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing } from '../../theme';
import {
  CategoryCard,
  CategoryGrid,
  SectionHeader,
  HeroBanner,
} from '../../components';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function LibraryHubScreen() {
  const navigation = useNavigation<Nav>();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <HeroBanner
          variant="accent"
          eyebrow={t('library_hub.title')}
          title="Todo tu material, a un toque"
          subtitle="Proyectos, catálogos, calculadoras y chollos."
        />

        <SectionHeader first>{t('library_hub.my_projects')}</SectionHeader>
        <CategoryGrid>
          <CategoryCard
            compact
            icon="projects"
            title={t('library_hub.my_projects')}
            accent={colors.category.projects}
            onPress={() => navigation.navigate('Projects')}
          />
          <CategoryCard
            compact
            icon="heart"
            title={t('nav.favorites')}
            accent={colors.category.guide}
            onPress={() => navigation.navigate('Favorites')}
          />
        </CategoryGrid>

        <SectionHeader>{t('homeSections.explore')}</SectionHeader>
        <CategoryGrid>
          <CategoryCard
            compact
            icon="tools"
            title={t('library_hub.tools_catalog')}
            accent={colors.category.tools}
            onPress={() => navigation.navigate('ToolCategories')}
          />
          <CategoryCard
            compact
            icon="wood"
            title={t('library_hub.wood_catalog')}
            accent={colors.category.wood}
            onPress={() => navigation.navigate('WoodCategories')}
          />
          <CategoryCard
            compact
            icon="calculator"
            title={t('library_hub.calculators')}
            accent={colors.category.utilities}
            onPress={() => navigation.navigate('Calculators')}
          />
          <CategoryCard
            compact
            icon="shop"
            title={t('nav.deals')}
            accent={colors.category.deals}
            onPress={() => navigation.navigate('Deals')}
          />
        </CategoryGrid>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
});
