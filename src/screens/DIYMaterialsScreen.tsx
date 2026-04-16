import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Material, Tool } from '../models';
import { colors, spacing, radius, typography, shadows } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DIYMaterials'>;
  route: RouteProp<RootStackParamList, 'DIYMaterials'>;
};

export default function DIYMaterialsScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { result } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={[typography.h1, { color: colors.primary, marginBottom: spacing.xl }]}>{t('materials.title')}</Text>
      {result.materials.map((mat: Material, i: number) => (
        <View key={i} style={styles.row}>
          <Text style={typography.body}>{mat.name}</Text>
          <Text style={[typography.body, { color: colors.primary, fontWeight: '600' }]}>{mat.quantity} {mat.unit || 'ud'}</Text>
        </View>
      ))}

      <Text style={[typography.h1, { color: colors.primary, marginTop: spacing.xxl, marginBottom: spacing.xl }]}>{t('materials.tools')}</Text>
      {result.tools.map((tool: Tool, i: number) => (
        <View key={i} style={styles.row}>
          <Text style={typography.body}>{tool.name}</Text>
          {tool.optional && <Text style={[typography.caption, { fontStyle: 'italic' }]}>{t('materials.optional')}</Text>}
        </View>
      ))}

      <TouchableOpacity style={[styles.button, shadows.md]} onPress={() => navigation.navigate('Shop', { materials: result.materials, mode: 'diy' })}>
        <Text style={[typography.button, { color: colors.textOnAccent }]}>{t('shop.whereToBuy')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.sm },
  button: { backgroundColor: colors.accent, paddingVertical: 18, borderRadius: radius.lg, alignItems: 'center', marginTop: spacing.xxl },
});
