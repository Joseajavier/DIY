import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../utils/theme';
import { Card } from '../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();

  const features = [
    { icon: '📋', title: t('home.features.steps'), desc: t('home.features.stepsDesc') },
    { icon: '🪚', title: t('home.features.optimize'), desc: t('home.features.optimizeDesc') },
    { icon: '📦', title: t('home.features.materials'), desc: t('home.features.materialsDesc') },
    { icon: '🛒', title: t('home.features.shop'), desc: t('home.features.shopDesc') },
  ];

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.langBtn} onPress={toggleLang}>
          <Text style={styles.langText}>
            {i18n.language === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.langBtn} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.langText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <Text style={styles.logo}>🪵</Text>
        <Text style={styles.title}>{t('app.name')}</Text>
        <Text style={styles.subtitle}>{t('app.subtitle')}</Text>
        <Text style={styles.tagline}>{t('app.tagline')}</Text>
      </View>

      <TouchableOpacity
        style={styles.ctaButton}
        onPress={() => navigation.navigate('ModeSelection')}
        activeOpacity={0.8}
      >
        <Text style={styles.ctaText}>{t('home.start')}</Text>
        <Text style={styles.ctaArrow}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.projectsButton}
        onPress={() => navigation.navigate('Projects')}
        activeOpacity={0.8}
      >
        <Text style={styles.projectsIcon}>📂</Text>
        <Text style={styles.projectsText}>{t('home.myProjects')}</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>{t('home.whatCanYouDo')}</Text>
      <View style={styles.featuresGrid}>
        {features.map((f, i) => (
          <Card key={i} style={styles.featureCard}>
            <Text style={styles.featureIcon}>{f.icon}</Text>
            <Text style={styles.featureTitle}>{f.title}</Text>
            <Text style={styles.featureDesc}>{f.desc}</Text>
          </Card>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{t('home.availableModes')}</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('DIYInput')}>
        <Card highlight="accent" style={styles.modeCard}>
          <View style={styles.modeHeader}>
            <Text style={styles.modeEmoji}>🔨</Text>
            <View style={styles.modeInfo}>
              <Text style={styles.modeName}>{t('modes.diy')}</Text>
              <Text style={styles.modeDesc}>{t('modes.diyLong')}</Text>
            </View>
          </View>
          <View style={styles.modeTagRow}>
            <View style={[styles.tag, { backgroundColor: colors.accent + '33' }]}>
              <Text style={[styles.tagText, { color: colors.accent }]}>{t('modes.diyTag')}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: colors.accent + '33' }]}>
              <Text style={[styles.tagText, { color: colors.accent }]}>{t('modes.diyTag2')}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ProInput')}>
        <Card highlight="pro" style={styles.modeCard}>
          <View style={styles.modeHeader}>
            <Text style={styles.modeEmoji}>📐</Text>
            <View style={styles.modeInfo}>
              <Text style={styles.modeName}>{t('modes.pro')}</Text>
              <Text style={styles.modeDesc}>{t('modes.proLong')}</Text>
            </View>
          </View>
          <View style={styles.modeTagRow}>
            <View style={[styles.tag, { backgroundColor: colors.accentPro + '33' }]}>
              <Text style={[styles.tagText, { color: colors.accentPro }]}>{t('modes.proTag')}</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: colors.accentPro + '33' }]}>
              <Text style={[styles.tagText, { color: colors.accentPro }]}>{t('modes.proTag2')}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t('app.name')} {t('app.version')} — {t('app.footer')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 40 },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  langBtn: {
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langText: { fontSize: 14, color: colors.text, fontWeight: '600' },
  hero: { alignItems: 'center', marginTop: 12, marginBottom: 28 },
  logo: { fontSize: 56, marginBottom: 4 },
  title: { fontSize: 42, fontWeight: 'bold', color: colors.accent },
  subtitle: { fontSize: 18, color: colors.text, marginTop: 2 },
  tagline: { fontSize: 13, color: colors.textSecondary, marginTop: 8, textAlign: 'center' },
  ctaButton: {
    backgroundColor: colors.accent,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 14,
    marginBottom: 12,
  },
  ctaText: { fontSize: 18, fontWeight: '700', color: colors.textDark, marginRight: 8 },
  ctaArrow: { fontSize: 20, color: colors.textDark },
  projectsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 32,
  },
  projectsIcon: { fontSize: 18, marginRight: 8 },
  projectsText: { fontSize: 15, color: colors.textSecondary, fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 14 },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 28 },
  featureCard: { width: '48%', alignItems: 'center', paddingVertical: 20 },
  featureIcon: { fontSize: 28, marginBottom: 8 },
  featureTitle: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 4 },
  featureDesc: { fontSize: 11, color: colors.textSecondary, textAlign: 'center' },
  modeCard: { marginBottom: 14 },
  modeHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  modeEmoji: { fontSize: 36, marginRight: 14 },
  modeInfo: { flex: 1 },
  modeName: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
  modeDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 19 },
  modeTagRow: { flexDirection: 'row', marginTop: 12, gap: 8 },
  tag: { borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 11, fontWeight: '600' },
  footer: { alignItems: 'center', marginTop: 32 },
  footerText: { fontSize: 12, color: colors.textMuted },
});
