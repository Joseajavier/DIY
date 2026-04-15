// ═══════════════════════════════════════════════════════════════
// CALCULATORS HUB — 4 calculadoras prácticas de carpintería
// ───────────────────────────────────────────────────────────────
// 1. Proporción áurea (φ)
// 2. Wainscot / paneles pared
// 3. Distribución de baldas
// 4. Calculadora de fracciones
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, radius, typography } from '../theme';
import Icon, { IconName } from '../components/Icon';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Calculators'>;
};

type CalcItem = {
  id: string;
  icon: IconName;
  title: string;
  subtitle: string;
  route: keyof RootStackParamList;
  accent: string;
};

const ITEMS: CalcItem[] = [
  {
    id: 'golden',
    icon: 'golden',
    title: 'Proporción áurea',
    subtitle: 'Divide una medida en 61.8% / 38.2%',
    route: 'GoldenRatio',
    accent: '#C8A14B',
  },
  {
    id: 'wainscot',
    icon: 'wall',
    title: 'Wainscot / paneles',
    subtitle: 'Reparte N marcos iguales en una pared',
    route: 'WainscotCalc',
    accent: '#8B5A3C',
  },
  {
    id: 'shelf',
    icon: 'shelf',
    title: 'Distribución de baldas',
    subtitle: 'Huecos idénticos entre N estantes',
    route: 'ShelfCalc',
    accent: '#6B8E7A',
  },
  {
    id: 'fraction',
    icon: 'fraction',
    title: 'Calculadora de fracciones',
    subtitle: 'Suma, resta, multiplica y divide',
    route: 'FractionCalc',
    accent: '#AB130A',
  },
  {
    id: 'screws',
    icon: 'screw',
    title: 'Selector de tornillos',
    subtitle: '¿Qué tornillo uso? Elige materiales y te digo cuál',
    route: 'ScrewSelector',
    accent: '#5A7D9A',
  },
];

export default function CalculatorsScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Calculadoras</Text>
        <Text style={styles.subtitle}>
          Herramientas rápidas para tus proyectos de carpintería
        </Text>

        <View style={styles.grid}>
          {ITEMS.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() => navigation.navigate(item.route as never)}
              accessibilityRole="button"
              accessibilityLabel={item.title}
            >
              <View
                style={[styles.iconBox, { backgroundColor: item.accent + '22' }]}
              >
                <Icon name={item.icon} size={30} color={item.accent} />
              </View>
              <View style={styles.textCol}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
              <Icon name="forward" size={20} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Icon name="info" size={18} color={colors.textSecondary} />
          <Text style={[styles.infoText, { flex: 1 }]}>
            Las calculadoras funcionan sin conexión. Los resultados se actualizan
            al instante mientras tecleas.
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
  title: {
    ...typography.hero,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  grid: {
    gap: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: {
    flex: 1,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
  },
  cardSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  infoBox: {
    marginTop: spacing.xl,
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
