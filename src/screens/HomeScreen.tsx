import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🪵 DIY</Text>
      <Text style={styles.subtitle}>Carpintería & Bricolaje</Text>
      <Text style={styles.description}>
        Tu asistente inteligente para proyectos de madera
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ModeSelection')}
      >
        <Text style={styles.buttonText}>Empezar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#e2b04a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#f5f5f5',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#e2b04a',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
  },
});
