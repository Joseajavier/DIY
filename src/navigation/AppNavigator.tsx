import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { DIYResult, Material, OptimizationResult, Piece } from '../models';
import { colors } from '../theme';

import HomeScreen from '../screens/HomeScreen';
import ModeSelectionScreen from '../screens/ModeSelectionScreen';
import DIYInputScreen from '../screens/DIYInputScreen';
import DIYStepsScreen from '../screens/DIYStepsScreen';
import DIYMaterialsScreen from '../screens/DIYMaterialsScreen';
import ProInputScreen from '../screens/ProInputScreen';
import ProOptimizationScreen from '../screens/ProOptimizationScreen';
import ProResultsScreen from '../screens/ProResultsScreen';
import ShopScreen from '../screens/ShopScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ProjectDetailScreen from '../screens/ProjectDetailScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import ToolSearchScreen from '../screens/ToolSearchScreen';
import WoodCatalogScreen from '../screens/WoodCatalogScreen';
import { getHasSeenOnboarding } from '../storage/settingsStorage';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Projects: undefined;
  ProjectDetail: { projectId: string };
  Settings: undefined;
  Feedback: undefined;
  ToolSearch: undefined;
  WoodCatalog: undefined;
  ModeSelection: undefined;
  DIYInput: undefined;
  DIYSteps: { result: DIYResult };
  DIYMaterials: { result: DIYResult };
  ProInput: undefined;
  ProOptimization: { projectName: string; pieces: Piece[]; boardWidth: number; boardHeight: number };
  ProResults: { projectName: string; optimization: OptimizationResult; materials: Material[] };
  Shop: { materials: Material[]; mode: 'diy' | 'pro' };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { t } = useTranslation();

  const screenOptions = {
    headerStyle: { backgroundColor: colors.bgAlt },
    headerTintColor: colors.text,
    headerTitleStyle: { fontWeight: '600' as const },
    contentStyle: { backgroundColor: colors.bg },
  };

  const hasSeenOnboarding = getHasSeenOnboarding();

  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={hasSeenOnboarding ? 'Home' : 'Onboarding'}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Projects" component={ProjectsScreen} options={{ title: t('nav.myProjects') }} />
      <Stack.Screen name="ModeSelection" component={ModeSelectionScreen} options={{ title: t('nav.selectMode') }} />
      <Stack.Screen name="DIYInput" component={DIYInputScreen} options={{ title: t('nav.newDIY') }} />
      <Stack.Screen name="DIYSteps" component={DIYStepsScreen} options={{ title: t('nav.steps') }} />
      <Stack.Screen name="DIYMaterials" component={DIYMaterialsScreen} options={{ title: t('nav.materials') }} />
      <Stack.Screen name="ProInput" component={ProInputScreen} options={{ title: t('nav.proPro') }} />
      <Stack.Screen name="ProOptimization" component={ProOptimizationScreen} options={{ title: t('nav.optimization') }} />
      <Stack.Screen name="ProResults" component={ProResultsScreen} options={{ title: t('nav.results') }} />
      <Stack.Screen name="Shop" component={ShopScreen} options={{ title: t('nav.shops') }} />
      <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} options={{ title: 'Proyecto' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: '⚙️' }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: '💬 Feedback' }} />
      <Stack.Screen name="ToolSearch" component={ToolSearchScreen} options={{ title: '🔧 Herramientas' }} />
      <Stack.Screen name="WoodCatalog" component={WoodCatalogScreen} options={{ title: '🪵 Maderas' }} />
    </Stack.Navigator>
  );
}
