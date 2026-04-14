import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DIYResult, Material, OptimizationResult, Piece } from '../models';

import HomeScreen from '../screens/HomeScreen';
import ModeSelectionScreen from '../screens/ModeSelectionScreen';
import DIYInputScreen from '../screens/DIYInputScreen';
import DIYStepsScreen from '../screens/DIYStepsScreen';
import DIYMaterialsScreen from '../screens/DIYMaterialsScreen';
import ProInputScreen from '../screens/ProInputScreen';
import ProOptimizationScreen from '../screens/ProOptimizationScreen';
import ProResultsScreen from '../screens/ProResultsScreen';
import ShopScreen from '../screens/ShopScreen';

export type RootStackParamList = {
  Home: undefined;
  ModeSelection: undefined;
  DIYInput: undefined;
  DIYSteps: { result: DIYResult };
  DIYMaterials: { result: DIYResult };
  ProInput: undefined;
  ProOptimization: {
    projectName: string;
    pieces: Piece[];
    boardWidth: number;
    boardHeight: number;
  };
  ProResults: {
    projectName: string;
    optimization: OptimizationResult;
    materials: Material[];
  };
  Shop: {
    materials: Material[];
    mode: 'diy' | 'pro';
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerStyle: { backgroundColor: '#16213e' },
  headerTintColor: '#f5f5f5',
  headerTitleStyle: { fontWeight: '600' as const },
  contentStyle: { backgroundColor: '#1a1a2e' },
};

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModeSelection"
        component={ModeSelectionScreen}
        options={{ title: 'Seleccionar modo' }}
      />
      <Stack.Screen
        name="DIYInput"
        component={DIYInputScreen}
        options={{ title: 'Nuevo proyecto DIY' }}
      />
      <Stack.Screen
        name="DIYSteps"
        component={DIYStepsScreen}
        options={{ title: 'Pasos' }}
      />
      <Stack.Screen
        name="DIYMaterials"
        component={DIYMaterialsScreen}
        options={{ title: 'Materiales' }}
      />
      <Stack.Screen
        name="ProInput"
        component={ProInputScreen}
        options={{ title: 'Proyecto PRO' }}
      />
      <Stack.Screen
        name="ProOptimization"
        component={ProOptimizationScreen}
        options={{ title: 'Optimización' }}
      />
      <Stack.Screen
        name="ProResults"
        component={ProResultsScreen}
        options={{ title: 'Resultados' }}
      />
      <Stack.Screen
        name="Shop"
        component={ShopScreen}
        options={{ title: 'Tiendas' }}
      />
    </Stack.Navigator>
  );
}
