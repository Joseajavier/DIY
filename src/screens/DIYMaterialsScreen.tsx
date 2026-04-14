import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../utils/theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DIYMaterials'>;
  route: RouteProp<RootStackParamList, 'DIYMaterials'>;
};

export default function DIYMaterialsScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { result } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('materials.title')}</Text>
      {result.materials.map((mat, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.matName}>{mat.name}</Text>
          <Text style={styles.matQty}>{mat.quantity} {mat.unit || 'ud'}</Text>
        </View>
      ))}
      <Text style={[styles.title, { marginTop: 28 }]}>{t('materials.tools')}</Text>
      {result.tools.map((tool, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.matName}>{tool.name}</Text>
          {tool.optional && <Text style={styles.optional}>{t('materials.optional')}</Text>}
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Shop', { materials: result.materials, mode: 'diy' })}>
        <Text style={styles.buttonText}>{t('shop.whereToBuy')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.accent, marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.card, borderRadius: 10, padding: 14, marginBottom: 8 },
  matName: { fontSize: 15, color: colors.text },
  matQty: { fontSize: 14, color: colors.accent, fontWeight: '600' },
  optional: { fontSize: 12, color: colors.textMuted, fontStyle: 'italic' },
  button: { backgroundColor: colors.accentPro, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  buttonText: { fontSize: 16, fontWeight: '600', color: colors.white },
});
