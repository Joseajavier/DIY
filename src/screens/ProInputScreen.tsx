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
import { Piece } from '../models';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProInput'>;
};

export default function ProInputScreen({ navigation }: Props) {
  const [projectName, setProjectName] = useState('');
  const [boardWidth, setBoardWidth] = useState('244');
  const [boardHeight, setBoardHeight] = useState('122');
  const [pieces, setPieces] = useState<Piece[]>([
    { width: 60, height: 40, quantity: 2 },
  ]);

  const addPiece = () => {
    setPieces([...pieces, { width: 0, height: 0, quantity: 1 }]);
  };

  const updatePiece = (index: number, field: keyof Piece, value: string) => {
    const updated = [...pieces];
    updated[index] = { ...updated[index], [field]: Number(value) || 0 };
    setPieces(updated);
  };

  const removePiece = (index: number) => {
    if (pieces.length <= 1) return;
    setPieces(pieces.filter((_, i) => i !== index));
  };

  const handleOptimize = () => {
    if (!projectName.trim()) {
      Alert.alert('Error', 'Introduce un nombre para el proyecto');
      return;
    }
    const validPieces = pieces.filter((p) => p.width > 0 && p.height > 0 && p.quantity > 0);
    if (validPieces.length === 0) {
      Alert.alert('Error', 'Añade al menos una pieza con dimensiones válidas');
      return;
    }

    navigation.navigate('ProOptimization', {
      projectName: projectName.trim(),
      pieces: validPieces,
      boardWidth: Number(boardWidth) || 244,
      boardHeight: Number(boardHeight) || 122,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Proyecto PRO</Text>

      <Text style={styles.label}>Nombre del proyecto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Armario empotrado"
        placeholderTextColor="#666"
        value={projectName}
        onChangeText={setProjectName}
      />

      <Text style={styles.label}>Tamaño del tablero (cm)</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Ancho"
          placeholderTextColor="#666"
          value={boardWidth}
          onChangeText={setBoardWidth}
          keyboardType="numeric"
        />
        <Text style={styles.x}>×</Text>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Alto"
          placeholderTextColor="#666"
          value={boardHeight}
          onChangeText={setBoardHeight}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.sectionTitle}>Piezas a cortar</Text>
      {pieces.map((piece, index) => (
        <View key={index} style={styles.pieceRow}>
          <TextInput
            style={[styles.input, styles.pieceInput]}
            placeholder="Ancho"
            placeholderTextColor="#666"
            value={piece.width ? String(piece.width) : ''}
            onChangeText={(v) => updatePiece(index, 'width', v)}
            keyboardType="numeric"
          />
          <Text style={styles.x}>×</Text>
          <TextInput
            style={[styles.input, styles.pieceInput]}
            placeholder="Alto"
            placeholderTextColor="#666"
            value={piece.height ? String(piece.height) : ''}
            onChangeText={(v) => updatePiece(index, 'height', v)}
            keyboardType="numeric"
          />
          <Text style={styles.x}>×</Text>
          <TextInput
            style={[styles.input, styles.qtyInput]}
            placeholder="Qty"
            placeholderTextColor="#666"
            value={piece.quantity ? String(piece.quantity) : ''}
            onChangeText={(v) => updatePiece(index, 'quantity', v)}
            keyboardType="numeric"
          />
          {pieces.length > 1 && (
            <TouchableOpacity onPress={() => removePiece(index)} style={styles.removeBtn}>
              <Text style={styles.removeTxt}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addBtn} onPress={addPiece}>
        <Text style={styles.addBtnText}>+ Añadir pieza</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleOptimize}>
        <Text style={styles.buttonText}>Optimizar cortes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  content: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4a9fe2', marginBottom: 24 },
  label: { fontSize: 14, color: '#ccc', marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#f5f5f5', marginBottom: 14, marginTop: 8 },
  input: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#2a2a4a',
    marginBottom: 12,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  halfInput: { flex: 1 },
  x: { color: '#666', fontSize: 18, marginHorizontal: 8, marginBottom: 12 },
  pieceRow: { flexDirection: 'row', alignItems: 'center' },
  pieceInput: { flex: 2 },
  qtyInput: { flex: 1 },
  removeBtn: { marginLeft: 8, marginBottom: 12, padding: 8 },
  removeTxt: { color: '#e74c3c', fontSize: 16, fontWeight: 'bold' },
  addBtn: {
    borderWidth: 1,
    borderColor: '#4a9fe2',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  addBtnText: { color: '#4a9fe2', fontSize: 15 },
  button: {
    backgroundColor: '#4a9fe2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { fontSize: 18, fontWeight: '600', color: '#fff' },
});
