import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ModeSelection'>;
};

export default function ModeSelectionScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige tu modo</Text>

      <TouchableOpacity
        style={[styles.card, styles.diyCard]}
        onPress={() => navigation.navigate('DIYInput')}
      >
        <Text style={styles.cardEmoji}>🔨</Text>
        <Text style={styles.cardTitle}>DIY Mode</Text>
        <Text style={styles.cardDesc}>
          Proyectos sencillos paso a paso.{'\n'}Ideal para principiantes.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, styles.proCard]}
        onPress={() => navigation.navigate('ProInput')}
      >
        <Text style={styles.cardEmoji}>📐</Text>
        <Text style={styles.cardTitle}>PRO Mode</Text>
        <Text style={styles.cardDesc}>
          Cálculos exactos y optimización.{'\n'}Para profesionales.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f5f5f5',
    textAlign: 'center',
    marginBottom: 32,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
  diyCard: {
    backgroundColor: '#16213e',
    borderWidth: 2,
    borderColor: '#e2b04a',
  },
  proCard: {
    backgroundColor: '#16213e',
    borderWidth: 2,
    borderColor: '#4a9fe2',
  },
  cardEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f5f5f5',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 20,
  },
});
