// ═══════════════════════════════════════════════════════════════
// PARAMETRIC HOME — hub del generador de muebles paramétricos.
// ───────────────────────────────────────────────────────────────
// Lista las plantillas disponibles. Por ahora solo "estantería" está
// activa; el resto son placeholders "próximamente" como hoja de ruta.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ParametricHome'>;
};

interface TemplateCard {
  id: string;
  icon: string;
  name: string;
  description: string;
  available: boolean;
  onPress?: () => void;
}

export default function ParametricHomeScreen({ navigation }: Props) {
  const templates: TemplateCard[] = [
    {
      id: 'shelf',
      icon: '📚',
      name: 'Estantería',
      description:
        'Ajusta medidas y nº de baldas. Ideal para librerías, trasteros, baños.',
      available: true,
      onPress: () => navigation.navigate('ShelfGenerator'),
    },
    {
      id: 'table',
      icon: '🪑',
      name: 'Mesa',
      description:
        'Mesa con 4 patas macizas y tablero superior. Faldón y balda inferior opcionales.',
      available: true,
      onPress: () => navigation.navigate('TableGenerator'),
    },
    {
      id: 'drawer',
      icon: '🗄️',
      name: 'Cajonera',
      description:
        'N cajones con guías metálicas extraíbles. Reserva holgura para hardware.',
      available: true,
      onPress: () => navigation.navigate('DrawerCabinetGenerator'),
    },
    {
      id: 'box',
      icon: '📦',
      name: 'Caja',
      description:
        'Caja rectangular simple — almacenaje, bandejas, cajas de regalo.',
      available: true,
      onPress: () => navigation.navigate('BoxGenerator'),
    },
    {
      id: 'cabinet',
      icon: '🚪',
      name: 'Armario',
      description:
        'Puertas batientes, baldas y barra de colgar opcional.',
      available: true,
      onPress: () => navigation.navigate('CabinetGenerator'),
    },
    {
      id: 'bench',
      icon: '🪵',
      name: 'Banco',
      description:
        '4 patas + asiento con respaldo opcional. Comedor, pie de cama, entrada.',
      available: true,
      onPress: () => navigation.navigate('BenchGenerator'),
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={[typography.h1, { color: colors.accent }]}>
        🔨 Generador de muebles
      </Text>
      <Text
        style={[
          typography.bodySmall,
          { marginBottom: spacing.xl, color: colors.textSecondary },
        ]}
      >
        Elige una plantilla, ajusta medidas y obtén automáticamente el
        despiece + plan de cortes optimizado.
      </Text>

      {templates.map((tpl) => (
        <TouchableOpacity
          key={tpl.id}
          style={[
            styles.card,
            shadows.sm,
            !tpl.available && styles.cardDisabled,
          ]}
          onPress={tpl.onPress}
          disabled={!tpl.available}
          activeOpacity={0.85}
        >
          <Text style={styles.iconText}>{tpl.icon}</Text>
          <View style={styles.cardBody}>
            <View style={styles.headerRow}>
              <Text style={typography.h3}>{tpl.name}</Text>
              {!tpl.available && (
                <View style={styles.soonBadge}>
                  <Text style={styles.soonText}>PRÓXIMAMENTE</Text>
                </View>
              )}
            </View>
            <Text
              style={[
                typography.caption,
                { color: colors.textSecondary, marginTop: 2 },
              ]}
            >
              {tpl.description}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
    alignItems: 'center',
  },
  cardDisabled: { opacity: 0.5 },
  iconText: { fontSize: 36 },
  cardBody: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  soonBadge: {
    backgroundColor: colors.textMuted + '33',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  soonText: {
    fontSize: 9,
    color: colors.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
