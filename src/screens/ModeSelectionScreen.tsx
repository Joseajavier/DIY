import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../utils/theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ModeSelection'>;
};

export default function ModeSelectionScreen({ navigation }: Props) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('modes.select')}</Text>

      <TouchableOpacity
        style={[styles.card, styles.diyCard]}
        onPress={() => navigation.navigate('DIYInput')}
      >
        <Text style={styles.cardEmoji}>🔨</Text>
        <Text style={styles.cardTitle}>{t('modes.diy')}</Text>
        <Text style={styles.cardDesc}>{t('modes.diyDesc')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, styles.proCard]}
        onPress={() => navigation.navigate('ProInput')}
      >
        <Text style={styles.cardEmoji}>📐</Text>
        <Text style={styles.cardTitle}>{t('modes.pro')}</Text>
        <Text style={styles.cardDesc}>{t('modes.proDesc')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.text, textAlign: 'center', marginBottom: 32 },
  card: { borderRadius: 16, padding: 24, marginBottom: 20, alignItems: 'center' },
  diyCard: { backgroundColor: colors.card, borderWidth: 2, borderColor: colors.accent },
  proCard: { backgroundColor: colors.card, borderWidth: 2, borderColor: colors.accentPro },
  cardEmoji: { fontSize: 40, marginBottom: 12 },
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  cardDesc: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
});
