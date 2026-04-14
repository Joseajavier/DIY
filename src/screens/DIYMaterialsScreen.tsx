import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DIYMaterials'>;
  route: RouteProp<RootStackParamList, 'DIYMaterials'>;
};

export default function DIYMaterialsScreen({ navigation, route }: Props) {
  const { result } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Materiales</Text>
      {result.materials.map((mat, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.matName}>{mat.name}</Text>
          <Text style={styles.matQty}>
            {mat.quantity} {mat.unit || 'ud'}
          </Text>
        </View>
      ))}

      <Text style={[styles.title, { marginTop: 28 }]}>Herramientas</Text>
      {result.tools.map((tool, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.matName}>{tool.name}</Text>
          {tool.optional && <Text style={styles.optional}>opcional</Text>}
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Shop', {
            materials: result.materials,
            mode: 'diy',
          })
        }
      >
        <Text style={styles.buttonText}>¿Dónde comprar?</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e2b04a',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  matName: {
    fontSize: 15,
    color: '#f5f5f5',
  },
  matQty: {
    fontSize: 14,
    color: '#e2b04a',
    fontWeight: '600',
  },
  optional: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#4a9fe2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
