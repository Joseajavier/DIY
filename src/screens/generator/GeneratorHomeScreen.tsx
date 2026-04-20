// ═══════════════════════════════════════════════════════════════
// GENERATOR HOME — hub del diseñador de muebles paramétricos.
// ───────────────────────────────────────────────────────────────
// Refactorizado a CategoryCard + SectionHeader. Sin estilos ad-hoc.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing } from '../../theme';
import { CategoryCard, CategoryGrid, HeroBanner, IconName } from '../../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ParametricHome'>;
};

type Template = {
  id: string;
  icon: IconName;
  titleKey: string;
  subtitleKey: string;
  route: keyof RootStackParamList;
};

const TEMPLATES: Template[] = [
  { id: 'shelf',   icon: 'shelf',  titleKey: 'designer.shelf.t',   subtitleKey: 'designer.shelf.s',   route: 'ShelfGenerator' },
  { id: 'table',   icon: 'table',  titleKey: 'designer.table.t',   subtitleKey: 'designer.table.s',   route: 'TableGenerator' },
  { id: 'drawer',  icon: 'folder', titleKey: 'designer.drawer.t',  subtitleKey: 'designer.drawer.s',  route: 'DrawerCabinetGenerator' },
  { id: 'box',     icon: 'cube',   titleKey: 'designer.box.t',     subtitleKey: 'designer.box.s',     route: 'BoxGenerator' },
  { id: 'cabinet', icon: 'wall',   titleKey: 'designer.cabinet.t', subtitleKey: 'designer.cabinet.s', route: 'CabinetGenerator' },
  { id: 'bench',   icon: 'board',  titleKey: 'designer.bench.t',   subtitleKey: 'designer.bench.s',   route: 'BenchGenerator' },
  { id: 'desk',    icon: 'table',  titleKey: 'designer.desk.t',    subtitleKey: 'designer.desk.s',    route: 'DeskGenerator' },
];

export default function GeneratorHomeScreen({ navigation }: Props) {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <HeroBanner
        eyebrow={t('nav.designer')}
        title="Muebles a medida"
        subtitle={t('designer.intro')}
      />

      <CategoryGrid>
        {TEMPLATES.map((tpl) => (
          <CategoryCard
            key={tpl.id}
            compact
            icon={tpl.icon}
            title={t(tpl.titleKey)}
            subtitle={t(tpl.subtitleKey)}
            accent={colors.category.designer}
            onPress={() => navigation.navigate(tpl.route as never)}
          />
        ))}
      </CategoryGrid>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
});
