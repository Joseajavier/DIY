// ═══════════════════════════════════════════════════════════════
// HOME SCREEN — reestructurado (fase 12.1)
// ───────────────────────────────────────────────────────────────
// Cambios clave:
// • Iconos vectoriales (MaterialCommunityIcons) en lugar de emojis
//   → arreglan los cuadrados `[?]` que aparecían en el simulador.
// • Layout más limpio: hero compacto, CTA, grid 2×2 de accesos,
//   modos, recientes, footer.
// • "Herramientas" ahora navega a ToolCategories (grid Parkside),
//   no directamente a ToolSearch.
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
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../theme';
import { ModeCard, ProjectCard, Icon, IconName } from '../components';
import { Project } from '../models';
import { getProjects } from '../storage/projectRepository';
import { getLastProjectId } from '../storage/settingsStorage';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

type QuickAction = {
  key: string;
  icon: IconName;
  label: string;
  color: string;
  onPress: () => void;
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

  const quickActions: QuickAction[] = [
    {
      key: 'projects',
      icon: 'projects',
      label: t('home.myProjects'),
      color: colors.primary,
      onPress: () => navigation.navigate('Projects'),
    },
    {
      key: 'tools',
      icon: 'tools',
      label: 'Herramientas',
      color: '#C4804A',
      onPress: () => navigation.navigate('ToolCategories'),
    },
    {
      key: 'wood',
      icon: 'wood',
      label: 'Maderas',
      color: '#6B8E5A',
      onPress: () => navigation.navigate('WoodCatalog'),
    },
    {
      key: 'calculators',
      icon: 'calculator',
      label: 'Calculadoras',
      color: '#5A7D9A',
      onPress: () => navigation.navigate('Calculators'),
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.chipBtn} onPress={toggleLang}>
            <Icon name="language" size={14} color={colors.text} />
            <Text style={styles.chipText}>
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chipBtn}
            onPress={() => navigation.navigate('Settings')}
          >
            <Icon name="settings" size={14} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Hero compacto */}
        <View style={styles.hero}>
          <View style={styles.logoBox}>
            <Icon name="hammer" size={32} color={colors.primary} />
          </View>
          <Text style={typography.hero}>{t('app.name')}</Text>
          <Text style={styles.heroSubtitle}>{t('app.subtitle')}</Text>
        </View>

        {/* CTA principal */}
        <TouchableOpacity
          style={[styles.ctaButton, shadows.md]}
          onPress={() => navigation.navigate('ModeSelection')}
          activeOpacity={0.85}
        >
          <Text
            style={[typography.button, { color: colors.textOnPrimary }]}
          >
            {t('home.start')}
          </Text>
          <Icon name="forward" size={20} color={colors.textOnPrimary} />
        </TouchableOpacity>

        {/* Continuar último proyecto */}
        {lastProjectId && (
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() =>
              navigation.navigate('ProjectDetail', { projectId: lastProjectId })
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
              Continuar último proyecto
            </Text>
          </TouchableOpacity>
        )}

        {/* Accesos rápidos 2×2 */}
        <Text style={styles.sectionLabel}>Accesos rápidos</Text>
        <View style={styles.grid}>
          {quickActions.map((a) => (
            <TouchableOpacity
              key={a.key}
              style={[styles.quickCard, shadows.sm]}
              onPress={a.onPress}
              activeOpacity={0.85}
            >
              <View
                style={[
                  styles.quickIconBox,
                  { backgroundColor: a.color + '1A' },
                ]}
              >
                <Icon name={a.icon} size={28} color={a.color} />
              </View>
              <Text style={styles.quickLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Modos */}
        <Text style={styles.sectionLabel}>{t('home.availableModes')}</Text>
        <ModeCard
          icon="hammer"
          title={t('modes.diy')}
          description={t('modes.diyLong')}
          tags={[t('modes.diyTag'), t('modes.diyTag2')]}
          variant="diy"
          onPress={() => navigation.navigate('DIYInput')}
        />
        <ModeCard
          icon="ruler"
          title={t('modes.pro')}
          description={t('modes.proLong')}
          tags={[t('modes.proTag'), t('modes.proTag2')]}
          variant="pro"
          onPress={() => navigation.navigate('ProInput')}
        />

        {/* Recientes */}
        {recentProjects.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Proyectos recientes</Text>
            {recentProjects.map((p: Project) => (
              <ProjectCard
                key={p.id}
                project={p}
                onPress={() =>
                  navigation.navigate('ProjectDetail', { projectId: p.id })
                }
              />
            ))}
          </>
        )}

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
              Enviar feedback
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerLink}
            onPress={() => navigation.navigate('WoodzyHome')}
          >
            <Icon name="theme" size={14} color={colors.textMuted} />
            <Text
              style={[
                typography.caption,
                { color: colors.textMuted, marginLeft: spacing.xs },
              ]}
            >
              Preview theme Woodzy
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
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  chipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: { ...typography.caption, color: colors.text },
  hero: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 18,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
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
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.textSecondary,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickIconBox: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickLabel: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
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
