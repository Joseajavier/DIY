import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, radius, typography } from '../theme';
import { getUserUnits, setUserUnits, getSelectedMode, setSelectedMode } from '../storage/settingsStorage';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const [units, setUnitsState] = useState(getUserUnits());
  const [mode, setModeState] = useState(getSelectedMode());

  const changeLang = (lang: string) => i18n.changeLanguage(lang);
  const changeUnits = (u: 'cm' | 'mm' | 'in') => { setUserUnits(u); setUnitsState(u); };
  const changeMode = (m: 'diy' | 'pro') => { setSelectedMode(m); setModeState(m); };

  const Opt = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
    <TouchableOpacity style={[styles.opt, selected && styles.optActive]} onPress={onPress}>
      <Text style={[typography.buttonSmall, { color: selected ? colors.primary : colors.textSecondary }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={[typography.label, { marginTop: spacing.xl }]}>{t('settings.language')}</Text>
      <View style={styles.optRow}>
        <Opt label="🇪🇸 Español" selected={i18n.language === 'es'} onPress={() => changeLang('es')} />
        <Opt label="🇬🇧 English" selected={i18n.language === 'en'} onPress={() => changeLang('en')} />
      </View>

      <Text style={typography.label}>Unidades</Text>
      <View style={styles.optRow}>
        <Opt label="cm" selected={units === 'cm'} onPress={() => changeUnits('cm')} />
        <Opt label="mm" selected={units === 'mm'} onPress={() => changeUnits('mm')} />
        <Opt label="in" selected={units === 'in'} onPress={() => changeUnits('in')} />
      </View>

      <Text style={typography.label}>Modo por defecto</Text>
      <View style={styles.optRow}>
        <Opt label="🔨 DIY" selected={mode === 'diy'} onPress={() => changeMode('diy')} />
        <Opt label="📐 PRO" selected={mode === 'pro'} onPress={() => changeMode('pro')} />
      </View>

      <View style={styles.about}>
        <Text style={[typography.h2, { color: colors.primary }]}>🪵 DIY v1.0</Text>
        <Text style={[typography.bodySmall, { marginTop: spacing.xs }]}>Carpinteria & Bricolaje</Text>
        <Text style={[typography.caption, { marginTop: spacing.xs }]}>SQLite + MMKV + OpenAI</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  optRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm, marginBottom: spacing.xl },
  opt: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  optActive: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
  about: { marginTop: spacing.xxxl, alignItems: 'center' },
});
