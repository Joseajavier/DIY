import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { setHasSeenOnboarding } from '../storage/settingsStorage';
import { colors, spacing, radius, typography } from '../theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'> };

const slides = [
  { icon: '🪵', title: 'Bienvenido a DIY', desc: 'Tu asistente inteligente para proyectos de carpinteria y bricolaje.' },
  { icon: '🔨', title: 'Modo DIY', desc: 'Describe tu idea y genera automaticamente pasos, materiales y herramientas.' },
  { icon: '📐', title: 'Modo PRO', desc: 'Introduce medidas exactas y optimiza cortes de madera para minimizar desperdicio.' },
  { icon: '🤖', title: 'Con o sin IA', desc: 'Usa inteligencia artificial para proyectos mas creativos, o logica local para trabajar sin conexion.' },
];

export default function OnboardingScreen({ navigation }: Props) {
  const [page, setPage] = useState(0);
  const handleFinish = () => { setHasSeenOnboarding(true); navigation.replace('Home'); };
  const handleNext = () => { if (page < slides.length - 1) setPage(page + 1); else handleFinish(); };
  const slide = slides[page];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={handleFinish}>
        <Text style={[typography.buttonSmall, { color: colors.textMuted }]}>Saltar</Text>
      </TouchableOpacity>
      <View style={styles.center}>
        <Text style={styles.icon}>{slide.icon}</Text>
        <Text style={[typography.hero, { textAlign: 'center', marginBottom: spacing.lg }]}>{slide.title}</Text>
        <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center', lineHeight: 24, paddingHorizontal: spacing.xl }]}>{slide.desc}</Text>
      </View>
      <View style={styles.dots}>
        {slides.map((_, i) => <View key={i} style={[styles.dot, i === page && styles.dotActive]} />)}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={[typography.button, { color: colors.textOnPrimary }]}>{page < slides.length - 1 ? 'Siguiente' : 'Empezar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: spacing.xl, justifyContent: 'space-between' },
  skipBtn: { alignSelf: 'flex-end', paddingTop: spacing.xl },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 72, marginBottom: spacing.xl },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm, marginBottom: spacing.xl },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 24 },
  button: { backgroundColor: colors.primary, paddingVertical: 18, borderRadius: radius.lg, alignItems: 'center', marginBottom: spacing.xl },
});
