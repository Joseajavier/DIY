import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { generateDIYProject } from '../services/diyGenerator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DIYInput'>;
};

export default function DIYInputScreen({ navigation }: Props) {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  const handleGenerate = () => {
    if (!projectName.trim()) {
      Alert.alert('Error', 'Introduce un nombre para el proyecto');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Describe qué quieres construir');
      return;
    }

    const result = generateDIYProject(projectName.trim(), description.trim());
    navigation.navigate('DIYSteps', { result });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Nuevo proyecto DIY</Text>
      <Text style={styles.label}>Nombre del proyecto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Estantería de pared"
        placeholderTextColor="#666"
        value={projectName}
        onChangeText={setProjectName}
      />
      <Text style={styles.label}>¿Qué quieres construir?</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe tu proyecto: materiales, tamaño aproximado, uso..."
        placeholderTextColor="#666"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
      />
      <TouchableOpacity style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>Generar proyecto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e2b04a',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#2a2a4a',
    marginBottom: 20,
  },
  textArea: {
    minHeight: 120,
  },
  button: {
    backgroundColor: '#e2b04a',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
  },
});
