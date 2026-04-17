import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, radius, typography } from '../../theme';
import { getUserUnits, setUserUnits, getSelectedMode, setSelectedMode } from '../../storage/settingsStorage';
import Icon from '../../components/Icon';
import AmazonDisclaimer from '../../components/AmazonDisclaimer';

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

  const LinkRow = ({ label, onPress, value }: { label: string; onPress?: () => void; value?: string }) => (
    <TouchableOpacity
      style={styles.linkRow}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Text style={[typography.body, { flex: 1, color: colors.text }]}>{label}</Text>
      {value ? (
        <Text style={[typography.bodySmall, { color: colors.textMuted, marginRight: spacing.sm }]}>{value}</Text>
      ) : null}
      {onPress ? <Icon name="forward" size={18} color={colors.textMuted} /> : null}
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

      <Text style={typography.label}>Legal y afiliación</Text>
      <View style={styles.legalSection}>
        <AmazonDisclaimer variant="card" style={{ marginBottom: spacing.sm }} />
        <LinkRow
          label="Política de privacidad"
          onPress={() => Alert.alert('Política de privacidad', 'Por venir.')}
        />
        <LinkRow
          label="Términos de uso"
          onPress={() => Alert.alert('Términos', 'Por venir.')}
        />
        <LinkRow
          label="Aviso de afiliados Amazon"
          onPress={() =>
            Linking.openURL('https://afiliados.amazon.es/help/operating/policies').catch(() => {})
          }
        />
        <LinkRow label="Versión de la app" value="1.0.0" />
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
  legalSection: { marginTop: spacing.sm, marginBottom: spacing.xl, gap: spacing.xs },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  about: { marginTop: spacing.xxxl, alignItems: 'center' },
});
