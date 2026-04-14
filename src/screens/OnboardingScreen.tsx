import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { setHasSeenOnboarding } from '../storage/settingsStorage';
import { colors } from '../utils/theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'> };

const { width } = Dimensions.get('window');

const slides = [
  {
    icon: '🪵',
    title: 'Bienvenido a DIY',
    desc: 'Tu asistente inteligente para proyectos de carpintería y bricolaje.',
  },
  {
    icon: '🔨',
    title: 'Modo DIY',
    desc: 'Describe tu idea y genera automáticamente pasos, materiales y herramientas.',
  },
  {
    icon: '📐',
    title: 'Modo PRO',
    desc: 'Introduce medidas exactas y optimiza cortes de madera para minimizar desperdicio.',
  },
  {
    icon: '🤖',
    title: 'Con o sin IA',
    desc: 'Usa inteligencia artificial para proyectos más creativos, o lógica local para trabajar sin conexión.',
  },
];

export default function OnboardingScreen({ navigation }: Props) {
  const [page, setPage] = useState(0);

  const handleFinish = () => {
    setHasSeenOnboarding(true);
    navigation.replace('Home');
  };

  const handleNext = () => {
    if (page < slides.length - 1) setPage(page + 1);
    else handleFinish();
  };

  const slide = slides[page];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={handleFinish}>
        <Text style={styles.skipText}>Saltar</Text>
      </TouchableOpacity>

      <View style={styles.slideContent}>
        <Text style={styles.icon}>{slide.icon}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.desc}>{slide.desc}</Text>
      </View>

      <View style={styles.dotsRow}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, i === page && styles.dotActive]} />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {page < slides.length - 1 ? 'Siguiente' : 'Empezar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 24, justifyContent: 'space-between' },
  skipBtn: { alignSelf: 'flex-end', paddingTop: 20 },
  skipText: { color: colors.textMuted, fontSize: 15 },
  slideContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 72, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.accent, marginBottom: 16, textAlign: 'center' },
  desc: { fontSize: 16, color: colors.textSecondary, textAlign: 'center', lineHeight: 24, paddingHorizontal: 20 },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 24 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.accent, width: 24 },
  button: { backgroundColor: colors.accent, paddingVertical: 18, borderRadius: 14, alignItems: 'center', marginBottom: 20 },
  buttonText: { fontSize: 18, fontWeight: '700', color: colors.textDark },
});
