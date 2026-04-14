import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../theme';
import { ModeCard, ProjectCard } from '../components';
import { Project } from '../models';
import { getProjects } from '../storage/projectRepository';
import { getLastProjectId } from '../storage/settingsStorage';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const features = [
  { icon: '📋', key: 'steps' },
  { icon: '🪚', key: 'optimize' },
  { icon: '📦', key: 'materials' },
  { icon: '🛒', key: 'shop' },
];

export default function HomeScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [lastProjectId, setLastPid] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      getProjects().then((all) => setRecentProjects(all.slice(0, 3)));
      setLastPid(getLastProjectId());
    }, [])
  );

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.chipBtn} onPress={toggleLang}>
          <Text style={styles.chipText}>{i18n.language === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chipBtn} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.chipText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.logoIcon}>🪵</Text>
        <Text style={typography.hero}>{t('app.name')}</Text>
        <Text style={[typography.h3, { color: colors.textSecondary, marginTop: spacing.xs }]}>
          {t('app.subtitle')}
        </Text>
        <Text style={[typography.bodySmall, { marginTop: spacing.sm, textAlign: 'center' }]}>
          {t('app.tagline')}
        </Text>
      </View>

      {/* CTA */}
      <TouchableOpacity style={[styles.ctaButton, shadows.md]} onPress={() => navigation.navigate('ModeSelection')} activeOpacity={0.8}>
        <Text style={[typography.button, { color: colors.textOnPrimary }]}>{t('home.start')}</Text>
        <Text style={styles.ctaArrow}>→</Text>
      </TouchableOpacity>

      {/* Continue last project */}
      {lastProjectId && (
        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('ProjectDetail', { projectId: lastProjectId })} activeOpacity={0.8}>
          <Text style={[typography.buttonSmall, { color: colors.accent }]}>↩️ Continuar ultimo proyecto</Text>
        </TouchableOpacity>
      )}

      {/* My projects */}
      <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('Projects')} activeOpacity={0.8}>
        <Text style={[typography.buttonSmall, { color: colors.textSecondary }]}>📂 {t('home.myProjects')}</Text>
      </TouchableOpacity>

      {/* Catalogs */}
      <View style={styles.catalogRow}>
        <TouchableOpacity style={[styles.catalogBtn, shadows.sm]} onPress={() => navigation.navigate('ToolSearch')} activeOpacity={0.8}>
          <Text style={{ fontSize: 28 }}>🔧</Text>
          <Text style={[typography.buttonSmall, { color: colors.text, marginTop: spacing.sm }]}>Herramientas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.catalogBtn, shadows.sm]} onPress={() => navigation.navigate('WoodCatalog')} activeOpacity={0.8}>
          <Text style={{ fontSize: 28 }}>🪵</Text>
          <Text style={[typography.buttonSmall, { color: colors.text, marginTop: spacing.sm }]}>Maderas</Text>
        </TouchableOpacity>
      </View>

      {/* Features grid */}
      <Text style={[typography.label, { marginTop: spacing.xxl, marginBottom: spacing.lg }]}>{t('home.whatCanYouDo')}</Text>
      <View style={styles.grid}>
        {features.map((f) => (
          <View key={f.key} style={[styles.featureCard, shadows.sm]}>
            <Text style={styles.featureIcon}>{f.icon}</Text>
            <Text style={[typography.bodySmall, { fontWeight: '600', color: colors.text, textAlign: 'center' }]}>
              {t(`home.features.${f.key}`)}
            </Text>
            <Text style={[typography.caption, { textAlign: 'center', marginTop: 2 }]}>
              {t(`home.features.${f.key}Desc`)}
            </Text>
          </View>
        ))}
      </View>

      {/* Modes */}
      <Text style={[typography.label, { marginTop: spacing.xl, marginBottom: spacing.lg }]}>{t('home.availableModes')}</Text>
      <ModeCard
        icon="🔨"
        title={t('modes.diy')}
        description={t('modes.diyLong')}
        tags={[t('modes.diyTag'), t('modes.diyTag2')]}
        variant="diy"
        onPress={() => navigation.navigate('DIYInput')}
      />
      <ModeCard
        icon="📐"
        title={t('modes.pro')}
        description={t('modes.proLong')}
        tags={[t('modes.proTag'), t('modes.proTag2')]}
        variant="pro"
        onPress={() => navigation.navigate('ProInput')}
      />

      {/* Recent projects */}
      {recentProjects.length > 0 && (
        <>
          <Text style={[typography.label, { marginTop: spacing.xl, marginBottom: spacing.lg }]}>Proyectos recientes</Text>
          {recentProjects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onPress={() => navigation.navigate('ProjectDetail', { projectId: p.id })}
            />
          ))}
        </>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
          <Text style={[typography.caption, { color: colors.primary }]}>💬 Enviar feedback</Text>
        </TouchableOpacity>
        <Text style={[typography.caption, { marginTop: spacing.sm }]}>
          {t('app.name')} {t('app.version')} — {t('app.footer')}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.sm },
  chipBtn: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: { ...typography.caption, color: colors.text },
  hero: { alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.xxl },
  logoIcon: { fontSize: 52, marginBottom: spacing.sm },
  ctaButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
  },
  ctaArrow: { ...typography.button, color: colors.textOnPrimary, marginLeft: spacing.sm },
  continueBtn: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.accentMuted,
    borderWidth: 1,
    borderColor: colors.accent,
    marginBottom: spacing.sm,
  },
  secondaryBtn: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  featureCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featureIcon: { fontSize: 26, marginBottom: spacing.sm },
  catalogRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.lg },
  catalogBtn: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.xl, alignItems: 'center' },
  footer: { alignItems: 'center', marginTop: spacing.xxxl },
});
