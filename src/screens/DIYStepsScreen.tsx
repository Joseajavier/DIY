import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DIYSteps'>;
  route: RouteProp<RootStackParamList, 'DIYSteps'>;
};

export default function DIYStepsScreen({ navigation, route }: Props) {
  const { result } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{result.projectName}</Text>
      <Text style={styles.sectionTitle}>Pasos de montaje</Text>

      {result.steps.map((step) => (
        <View key={step.number} style={styles.stepCard}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{step.number}</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDesc}>{step.description}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DIYMaterials', { result })}
      >
        <Text style={styles.buttonText}>Ver materiales y herramientas</Text>
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e2b04a',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e2b04a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  stepNumberText: {
    fontWeight: 'bold',
    color: '#1a1a2e',
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f5f5f5',
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 13,
    color: '#aaa',
    lineHeight: 19,
  },
  button: {
    backgroundColor: '#e2b04a',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
  },
});
