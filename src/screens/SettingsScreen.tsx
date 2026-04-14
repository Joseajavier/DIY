import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../utils/theme';
import { getUserUnits, setUserUnits, getSelectedMode, setSelectedMode } from '../storage/settingsStorage';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const [units, setUnitsState] = useState(getUserUnits());
  const [mode, setModeState] = useState(getSelectedMode());

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const changeUnits = (u: 'cm' | 'mm' | 'in') => {
    setUserUnits(u);
    setUnitsState(u);
  };

  const changeMode = (m: 'diy' | 'pro') => {
    setSelectedMode(m);
    setModeState(m);
  };

  const OptionRow = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
    <TouchableOpacity style={[styles.option, selected && styles.optionSelected]} onPress={onPress}>
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
      <View style={styles.optionRow}>
        <OptionRow label="🇪🇸 Español" selected={i18n.language === 'es'} onPress={() => changeLanguage('es')} />
        <OptionRow label="🇬🇧 English" selected={i18n.language === 'en'} onPress={() => changeLanguage('en')} />
      </View>

      <Text style={styles.sectionTitle}>Unidades</Text>
      <View style={styles.optionRow}>
        <OptionRow label="cm" selected={units === 'cm'} onPress={() => changeUnits('cm')} />
        <OptionRow label="mm" selected={units === 'mm'} onPress={() => changeUnits('mm')} />
        <OptionRow label="in" selected={units === 'in'} onPress={() => changeUnits('in')} />
      </View>

      <Text style={styles.sectionTitle}>Modo por defecto</Text>
      <View style={styles.optionRow}>
        <OptionRow label="🔨 DIY" selected={mode === 'diy'} onPress={() => changeMode('diy')} />
        <OptionRow label="📐 PRO" selected={mode === 'pro'} onPress={() => changeMode('pro')} />
      </View>

      <View style={styles.about}>
        <Text style={styles.aboutTitle}>🪵 DIY v1.0</Text>
        <Text style={styles.aboutText}>Carpintería & Bricolaje</Text>
        <Text style={styles.aboutText}>SQLite + MMKV + OpenAI</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 40 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 12, marginTop: 20 },
  optionRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  option: { flex: 1, backgroundColor: colors.card, borderRadius: 10, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  optionSelected: { borderColor: colors.accent, backgroundColor: colors.accent + '22' },
  optionText: { fontSize: 15, color: colors.textSecondary, fontWeight: '500' },
  optionTextSelected: { color: colors.accent, fontWeight: '700' },
  about: { marginTop: 40, alignItems: 'center' },
  aboutTitle: { fontSize: 20, fontWeight: 'bold', color: colors.accent, marginBottom: 4 },
  aboutText: { fontSize: 13, color: colors.textMuted },
});
