// ═══════════════════════════════════════════════════════════════
// CREATE HUB — tab "Crear" del bottom navigator.
// ───────────────────────────────────────────────────────────────
// Pantalla intermedia que agrupa los 3 puntos de partida:
//   • DIY    — planner guiado paso a paso
//   • PRO    — medidas exactas + optimizador de cortes
//   • Diseñador — plantillas paramétricas
//
// Navega al stack raíz (DIYInput, ProInput, ParametricHome), así
// que los detalles se apilan por encima del tab bar.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, typography } from '../../theme';
import { CategoryCard, SectionHeader } from '../../components';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function CreateHubScreen() {
  const navigation = useNavigation<Nav>();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={typography.hero}>{t('create_hub.title')}</Text>
          <Text style={styles.subtitle}>{t('create_hub.subtitle')}</Text>
        </View>

        <SectionHeader first>{t('modes.select')}</SectionHeader>

        <CategoryCard
          icon="hammer"
          title={t('create_hub.diy_title')}
          subtitle={t('create_hub.diy_description')}
          accent={colors.category.projects}
          onPress={() => navigation.navigate('DIYInput')}
        />
        <CategoryCard
          icon="ruler"
          title={t('create_hub.pro_title')}
          subtitle={t('create_hub.pro_description')}
          accent={colors.category.utilities}
          onPress={() => navigation.navigate('ProInput')}
        />
        <CategoryCard
          icon="cube"
          title={t('create_hub.designer_title')}
          subtitle={t('create_hub.designer_description')}
          accent={colors.category.designer}
          onPress={() => navigation.navigate('ParametricHome')}
        />
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
  header: { marginBottom: spacing.lg },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
