import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, radius, typography } from '../../theme';
import {
  getUserUnits,
  setUserUnits,
  getSelectedMode,
  setSelectedMode,
} from '../../storage/settingsStorage';
import Icon from '../../components/Icon';
import AmazonDisclaimer from '../../components/AmazonDisclaimer';
import HeroBanner from '../../components/HeroBanner';
import SectionHeader from '../../components/SectionHeader';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const [units, setUnitsState] = useState(getUserUnits());
  const [mode, setModeState] = useState(getSelectedMode());

  const changeLang = (lang: string) => i18n.changeLanguage(lang);
  const changeUnits = (u: 'cm' | 'mm' | 'in') => {
    setUserUnits(u);
    setUnitsState(u);
  };
  const changeMode = (m: 'diy' | 'pro') => {
    setSelectedMode(m);
    setModeState(m);
  };

  const Segmented = ({
    options,
  }: {
    options: { label: string; selected: boolean; onPress: () => void }[];
  }) => (
    <View style={styles.segWrap}>
      {options.map((o, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.seg, o.selected && styles.segActive]}
          onPress={o.onPress}
          activeOpacity={0.85}
        >
          <Text
            style={[
              typography.buttonSmall,
              { color: o.selected ? colors.primary : colors.textSecondary },
            ]}
          >
            {o.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const LinkRow = ({
    label,
    onPress,
    value,
    first,
    last,
  }: {
    label: string;
    onPress?: () => void;
    value?: string;
    first?: boolean;
    last?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.linkRow,
        first && styles.linkRowFirst,
        last && styles.linkRowLast,
        !last && styles.linkRowDivider,
      ]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Text style={[typography.body, { flex: 1, color: colors.text }]}>
        {label}
      </Text>
      {value ? (
        <Text
          style={[
            typography.bodySmall,
            { color: colors.textMuted, marginRight: spacing.sm },
          ]}
        >
          {value}
        </Text>
      ) : null}
      {onPress ? (
        <Icon name="forward" size={18} color={colors.textMuted} />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <HeroBanner
        eyebrow={t('tabs.settings') ?? 'Ajustes'}
        title="Configuración"
        subtitle="Idioma, unidades y preferencias del taller."
      />

      <SectionHeader first>{t('settings.language')}</SectionHeader>
      <Segmented
        options={[
          {
            label: '🇪🇸 Español',
            selected: i18n.language === 'es',
            onPress: () => changeLang('es'),
          },
          {
            label: '🇬🇧 English',
            selected: i18n.language === 'en',
            onPress: () => changeLang('en'),
          },
        ]}
      />

      <SectionHeader>Unidades</SectionHeader>
      <Segmented
        options={[
          { label: 'cm', selected: units === 'cm', onPress: () => changeUnits('cm') },
          { label: 'mm', selected: units === 'mm', onPress: () => changeUnits('mm') },
          { label: 'in', selected: units === 'in', onPress: () => changeUnits('in') },
        ]}
      />

      <SectionHeader>Modo por defecto</SectionHeader>
      <Segmented
        options={[
          { label: 'DIY', selected: mode === 'diy', onPress: () => changeMode('diy') },
          { label: 'PRO', selected: mode === 'pro', onPress: () => changeMode('pro') },
        ]}
      />

      <SectionHeader>Legal y afiliación</SectionHeader>
      <AmazonDisclaimer variant="card" style={{ marginBottom: spacing.sm }} />
      <View style={styles.group}>
        <LinkRow
          first
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
            Linking.openURL(
              'https://afiliados.amazon.es/help/operating/policies',
            ).catch(() => {})
          }
        />
        <LinkRow last label="Versión de la app" value="1.0.0" />
      </View>

      <View style={styles.about}>
        <View style={styles.aboutIcon}>
          <Icon name="hammer" size={28} color={colors.primary} />
        </View>
        <Text style={[typography.h2, { color: colors.primary, marginTop: spacing.sm }]}>
          DIY v1.0
        </Text>
        <Text style={[typography.bodySmall, { marginTop: spacing.xs }]}>
          Carpintería & Bricolaje
        </Text>
        <Text style={[typography.caption, { marginTop: spacing.xs }]}>
          SQLite · MMKV · OpenAI
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },

  // Segmented control (language, units, mode)
  segWrap: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    padding: 4,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  seg: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    borderRadius: radius.full,
  },
  segActive: {
    backgroundColor: colors.primaryMuted,
  },

  // Grouped link rows (iOS-style)
  group: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    backgroundColor: colors.surface,
  },
  linkRowFirst: {},
  linkRowLast: {},
  linkRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },

  about: {
    marginTop: spacing.xxxl,
    alignItems: 'center',
  },
  aboutIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
