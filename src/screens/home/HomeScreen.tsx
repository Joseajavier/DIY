// ═══════════════════════════════════════════════════════════════
// HOME SCREEN — rediseño UX (fase 14).
// ───────────────────────────────────────────────────────────────
// Jerarquía simplificada a 3 secciones visibles:
//   1. Top bar (idioma + settings)
//   2. Hero compacto (logo + nombre)
//   3. CREAR PROYECTO — DIY, PRO (ModeCards grandes) + Diseñador
//      (CategoryCard) como tercera vía de creación.
//   4. CONTINUAR — último proyecto + recientes (condicional).
//   5. EXPLORAR — catálogos (Herramientas, Maderas), calculadoras
//      y compras (Chollos, Favoritos) en una sola sección.
//   6. Footer minimalista (feedback + versión).
//
// Eliminado en esta fase: la sección "Herramientas y guías" — sus
// items se han redistribuido a Crear y Explorar para reducir
// fricción. El usuario ve menos títulos y todo cuelga del mismo
// mapa mental.
// ═══════════════════════════════════════════════════════════════

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, radius, typography } from '../../theme';
import {
  ModeCard,
  ProjectCard,
  Icon,
  CategoryCard,
  CategoryGrid,
  SectionHeader,
  HeroBanner,
} from '../../components';
import { Project } from '../../models';
import { getProjects } from '../../storage/projectRepository';
import { getLastProjectId } from '../../storage/settingsStorage';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function HomeScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [lastProjectId, setLastPid] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      getProjects().then((all) => setRecentProjects(all.slice(0, 3)));
      setLastPid(getLastProjectId());
    }, []),
  );

  const toggleLang = () =>
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar minimalista */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconBtn} onPress={toggleLang}>
            <Text style={styles.langText}>
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Settings')}
          >
            <Icon name="settings" size={18} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Hero banner — card cobre con patrón de veta */}
        <HeroBanner
          eyebrow={t('app.name')}
          title={t('app.tagline')}
          subtitle={t('app.subtitle')}
        />


        {/* ─── 1. CREAR PROYECTO ─── */}
        <SectionHeader first>{t('homeSections.newProject')}</SectionHeader>
        <ModeCard
          icon="hammer"
          title={t('modes.diy')}
          description={t('modes.diyLong')}
          tags={[t('modes.diyTag'), t('modes.diyTag2')]}
          variant="diy"
          onPress={() => navigation.navigate('DIYInput')}
        />
        <CategoryCard
          icon="cube"
          title={t('nav.designer')}
          subtitle={t('designer.intro')}
          accent={colors.category.designer}
          onPress={() => navigation.navigate('ParametricHome')}
        />

        {/* ─── 2. CONTINUAR ─── */}
        {(lastProjectId || recentProjects.length > 0) && (
          <>
            <SectionHeader>{t('homeSections.continue')}</SectionHeader>
            {lastProjectId && (
              <TouchableOpacity
                style={styles.continueBtn}
                onPress={() =>
                  navigation.navigate('ProjectDetail', {
                    projectId: lastProjectId,
                  })
                }
                activeOpacity={0.85}
              >
                <Icon name="back" size={16} color={colors.accent} />
                <Text
                  style={[
                    typography.buttonSmall,
                    { color: colors.accent, marginLeft: spacing.sm },
                  ]}
                >
                  {t('homeSections.lastProject')}
                </Text>
              </TouchableOpacity>
            )}
            {recentProjects.map((p: Project) => (
              <ProjectCard
                key={p.id}
                project={p}
                onPress={() =>
                  navigation.navigate('ProjectDetail', { projectId: p.id })
                }
              />
            ))}
            <TouchableOpacity
              style={styles.linkRow}
              onPress={() => navigation.navigate('Projects')}
              activeOpacity={0.7}
            >
              <Text style={styles.linkText}>{t('home.myProjects')}</Text>
              <Icon name="forward" size={14} color={colors.primary} />
            </TouchableOpacity>
          </>
        )}

        {/* ─── 3. EXPLORAR ─── */}
        <SectionHeader>{t('homeSections.explore')}</SectionHeader>
        <CategoryGrid>
          <CategoryCard
            compact
            icon="tools"
            title={t('nav.tools')}
            accent={colors.category.tools}
            onPress={() => navigation.navigate('ToolCategories')}
          />
          <CategoryCard
            compact
            icon="wood"
            title={t('nav.wood')}
            accent={colors.category.wood}
            onPress={() => navigation.navigate('WoodCategories')}
          />
          <CategoryCard
            compact
            icon="calculator"
            title={t('nav.utilities')}
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
          <CategoryCard
            compact
            icon="heart"
            title={t('nav.favorites')}
            accent={colors.category.guide}
            onPress={() => navigation.navigate('Favorites')}
          />
        </CategoryGrid>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerLink}
            onPress={() => navigation.navigate('Feedback')}
          >
            <Icon name="feedback" size={14} color={colors.primary} />
            <Text
              style={[
                typography.caption,
                { color: colors.primary, marginLeft: spacing.xs },
              ]}
            >
              {t('actions.sendFeedback')}
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerVersion}>
            {t('app.name')} {t('app.version')} · {t('app.footer')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { flex: 1 },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.accentMuted,
    borderWidth: 1,
    borderColor: colors.accent,
    marginBottom: spacing.md,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  linkText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.xxxl,
    gap: spacing.sm,
  },
  footerLink: { flexDirection: 'row', alignItems: 'center' },
  footerVersion: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
});
