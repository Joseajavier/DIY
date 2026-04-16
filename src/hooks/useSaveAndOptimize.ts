// ═══════════════════════════════════════════════════════════════
// useSaveAndOptimize — hook compartido por las pantallas del
// generador paramétrico.
// ───────────────────────────────────────────────────────────────
// Expone dos acciones:
//   • saveOnly            → guarda el proyecto y avisa al usuario.
//   • saveAndOptimize     → guarda y navega al optimizador 2D.
// Persiste siempre vía saveParametricProject (que además registra
// el last-project-id para que ProOptimization pueda enlazar su
// optimización).
// ═══════════════════════════════════════════════════════════════

import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParametricOutput } from '../models';
import {
  saveParametricProject,
  exportParametricPdf,
} from '../services/parametric';
import { RootStackParamList } from '../navigation/AppNavigator';

interface Dims {
  length: number;
  width: number;
  height: number;
}

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function useSaveAndOptimize() {
  const navigation = useNavigation<Nav>();
  const [saving, setSaving] = useState(false);

  const saveOnly = useCallback(
    async (name: string, output: ParametricOutput) => {
      setSaving(true);
      try {
        const projectId = await saveParametricProject(name, output);
        setSaving(false);
        Alert.alert(
          '✅ Proyecto guardado',
          'Lo encontrarás en "Mis proyectos".',
          [
            { text: 'Seguir aquí', style: 'cancel' },
            {
              text: 'Ver proyecto',
              onPress: () =>
                navigation.navigate('ProjectDetail', { projectId }),
            },
          ]
        );
      } catch {
        setSaving(false);
        Alert.alert('Error', 'No se pudo guardar el proyecto');
      }
    },
    [navigation]
  );

  const saveAndOptimize = useCallback(
    async (
      name: string,
      output: ParametricOutput,
      boardWidth: number,
      boardHeight: number
    ) => {
      setSaving(true);
      try {
        await saveParametricProject(name, output);
      } catch {
        // Si falla el guardado, igualmente dejamos optimizar (no bloqueante).
      }
      setSaving(false);
      navigation.navigate('ProOptimization', {
        projectName: name,
        pieces: output.pieces,
        boardWidth,
        boardHeight,
      });
    },
    [navigation]
  );

  const exportPdf = useCallback(
    async (name: string, dims: Dims, output: ParametricOutput) => {
      setSaving(true);
      const uri = await exportParametricPdf(name, dims, output);
      setSaving(false);
      if (!uri) {
        Alert.alert('Error', 'No se pudo generar el PDF');
      }
    },
    []
  );

  return { saveOnly, saveAndOptimize, exportPdf, saving };
}
