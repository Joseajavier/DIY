import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, typography } from '../theme';
import { ModeCard } from '../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ModeSelection'>;
};

export default function ModeSelectionScreen({ navigation }: Props) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={[typography.h1, { textAlign: 'center', marginBottom: spacing.xxl }]}>{t('modes.select')}</Text>
      <ModeCard
        icon="🔨" title={t('modes.diy')} description={t('modes.diyDesc')}
        tags={[t('modes.diyTag'), t('modes.diyTag2')]} variant="diy"
        onPress={() => navigation.navigate('DIYInput')}
      />
      <ModeCard
        icon="📐" title={t('modes.pro')} description={t('modes.proDesc')}
        tags={[t('modes.proTag'), t('modes.proTag2')]} variant="pro"
        onPress={() => navigation.navigate('ProInput')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: spacing.xl, justifyContent: 'center' },
});
