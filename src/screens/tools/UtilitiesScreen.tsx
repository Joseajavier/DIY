// ═══════════════════════════════════════════════════════════════
// UTILITIES SCREEN — hub de calculadoras + referencias.
// ───────────────────────────────────────────────────────────────
// Refactorizado a CategoryCard + SectionHeader (sin estilos ad-hoc).
// Secciones:
//   • Calculadoras — herramientas numéricas interactivas
//   • Referencias  — guías y tablas de consulta
//
// WoodGuide vive en Maderas; ScrewGuide + ScrewSelector en Herramientas.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, radius, typography } from '../../theme';
import { CategoryCard, CategoryGrid, SectionHeader, Icon, IconName } from '../../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Calculators'>;
};

type UtilItem = {
  id: string;
  icon: IconName;
  titleKey: string;
  subtitleKey: string;
  route: keyof RootStackParamList;
};

const CALCULATORS: UtilItem[] = [
  { id: 'despiece',  icon: 'saw',      titleKey: 'util.despiece.t', subtitleKey: 'util.despiece.s', route: 'Despiece' },
  { id: 'golden',    icon: 'golden',   titleKey: 'util.golden.t',   subtitleKey: 'util.golden.s',   route: 'GoldenRatio' },
  { id: 'wainscot',  icon: 'wall',     titleKey: 'util.wainscot.t', subtitleKey: 'util.wainscot.s', route: 'WainscotCalc' },
  { id: 'shelf',     icon: 'shelf',    titleKey: 'util.shelf.t',    subtitleKey: 'util.shelf.s',    route: 'ShelfCalc' },
  { id: 'fraction',  icon: 'fraction', titleKey: 'util.fraction.t', subtitleKey: 'util.fraction.s', route: 'FractionCalc' },
  { id: 'boardfoot', icon: 'cube',     titleKey: 'util.board.t',    subtitleKey: 'util.board.s',    route: 'BoardFootCalc' },
];

const REFERENCES: UtilItem[] = [
  { id: 'nominal', icon: 'table', titleKey: 'util.nominal.t', subtitleKey: 'util.nominal.s', route: 'NominalActual' },
  { id: 'joints',  icon: 'joint', titleKey: 'util.joints.t',  subtitleKey: 'util.joints.s',  route: 'JointTypes' },
];

export default function UtilitiesScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const renderItem = (item: UtilItem) => (
    <CategoryCard
      key={item.id}
      compact
      icon={item.icon}
      title={t(item.titleKey)}
      subtitle={t(item.subtitleKey)}
      accent={colors.category.utilities}
      onPress={() => navigation.navigate(item.route as never)}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader first>{t('util.section.calc')}</SectionHeader>
        <CategoryGrid>{CALCULATORS.map(renderItem)}</CategoryGrid>

        <SectionHeader>{t('util.section.ref')}</SectionHeader>
        <CategoryGrid>{REFERENCES.map(renderItem)}</CategoryGrid>

        <View style={styles.infoBox}>
          <Icon name="info" size={18} color={colors.textSecondary} />
          <Text style={[styles.infoText, { flex: 1 }]}>
            {t('util.offline')}
          </Text>
        </View>
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
  infoBox: {
    marginTop: spacing.lg,
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
