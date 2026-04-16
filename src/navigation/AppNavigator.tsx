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
import ToolCategoriesScreen from '../screens/ToolCategoriesScreen';
import WoodCatalogScreen from '../screens/WoodCatalogScreen';
import WoodCategoriesScreen from '../screens/WoodCategoriesScreen';
import WoodzyHomeScreen from '../screens/WoodzyHomeScreen';
import CalculatorsScreen from '../screens/CalculatorsScreen';
import DealsScreen from '../screens/DealsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProjectIdeasScreen from '../screens/ProjectIdeasScreen';
import GoldenRatioScreen from '../screens/calculators/GoldenRatioScreen';
import WainscotCalcScreen from '../screens/calculators/WainscotCalcScreen';
import ShelfCalcScreen from '../screens/calculators/ShelfCalcScreen';
import FractionCalcScreen from '../screens/calculators/FractionCalcScreen';
import NominalActualScreen from '../screens/calculators/NominalActualScreen';
import BoardFootCalcScreen from '../screens/calculators/BoardFootCalcScreen';
import JointTypesScreen from '../screens/calculators/JointTypesScreen';
import WoodGuideScreen from '../screens/calculators/WoodGuideScreen';
import ScrewGuideScreen from '../screens/calculators/ScrewGuideScreen';
import ScrewSelectorScreen from '../screens/ScrewSelectorScreen';
import ParametricHomeScreen from '../screens/parametric/ParametricHomeScreen';
import ShelfGeneratorScreen from '../screens/parametric/ShelfGeneratorScreen';
import TableGeneratorScreen from '../screens/parametric/TableGeneratorScreen';
import BoxGeneratorScreen from '../screens/parametric/BoxGeneratorScreen';
import { getHasSeenOnboarding } from '../storage/settingsStorage';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Projects: undefined;
  ProjectDetail: { projectId: string };
  Settings: undefined;
  Feedback: undefined;
  ToolCategories: undefined;
  ToolSearch: { categoryId?: string; query?: string } | undefined;
  WoodCategories: undefined;
  WoodCatalog: { categoryId?: string } | undefined;
  WoodzyHome: undefined;
  Calculators: undefined;
  Deals: undefined;
  Favorites: undefined;
  ProjectIdeas: undefined;
  GoldenRatio: undefined;
  WainscotCalc: undefined;
  ShelfCalc: undefined;
  FractionCalc: undefined;
  ScrewSelector: undefined;
  NominalActual: undefined;
  BoardFootCalc: undefined;
  JointTypes: undefined;
  WoodGuide: undefined;
  ScrewGuide: undefined;
  ParametricHome: undefined;
  ShelfGenerator: undefined;
  TableGenerator: undefined;
  BoxGenerator: undefined;
  ModeSelection: undefined;
  DIYInput: undefined;
  DIYSteps: { result: DIYResult; projectId?: string };
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
      <Stack.Screen name="ToolCategories" component={ToolCategoriesScreen} options={{ title: 'Herramientas' }} />
      <Stack.Screen name="ToolSearch" component={ToolSearchScreen} options={{ title: 'Catálogo' }} />
      <Stack.Screen name="WoodCategories" component={WoodCategoriesScreen} options={{ title: 'Maderas' }} />
      <Stack.Screen name="WoodCatalog" component={WoodCatalogScreen} options={{ title: 'Catálogo' }} />
      <Stack.Screen name="WoodzyHome" component={WoodzyHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Calculators" component={CalculatorsScreen} options={{ title: '🧮 Calculadoras' }} />
      <Stack.Screen name="Deals" component={DealsScreen} options={{ title: '🔥 Chollos' }} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: '❤️ Favoritos' }} />
      <Stack.Screen name="ProjectIdeas" component={ProjectIdeasScreen} options={{ title: '💡 Ideas de proyectos' }} />
      <Stack.Screen name="GoldenRatio" component={GoldenRatioScreen} options={{ title: 'φ Proporción áurea' }} />
      <Stack.Screen name="WainscotCalc" component={WainscotCalcScreen} options={{ title: '🪟 Wainscot' }} />
      <Stack.Screen name="ShelfCalc" component={ShelfCalcScreen} options={{ title: '📚 Baldas' }} />
      <Stack.Screen name="FractionCalc" component={FractionCalcScreen} options={{ title: '½ Fracciones' }} />
      <Stack.Screen name="ScrewSelector" component={ScrewSelectorScreen} options={{ title: '🔩 Selector de tornillos' }} />
      <Stack.Screen name="NominalActual" component={NominalActualScreen} options={{ title: '📏 Nominal → Real' }} />
      <Stack.Screen name="BoardFootCalc" component={BoardFootCalcScreen} options={{ title: '🪵 Volumen de madera' }} />
      <Stack.Screen name="JointTypes" component={JointTypesScreen} options={{ title: '🤝 Uniones de carpintería' }} />
      <Stack.Screen name="WoodGuide" component={WoodGuideScreen} options={{ title: '🌳 Guía de maderas' }} />
      <Stack.Screen name="ScrewGuide" component={ScrewGuideScreen} options={{ title: '🔩 Enciclopedia de tornillos' }} />
      <Stack.Screen name="ParametricHome" component={ParametricHomeScreen} options={{ title: '🔨 Generador' }} />
      <Stack.Screen name="ShelfGenerator" component={ShelfGeneratorScreen} options={{ title: '📚 Estantería' }} />
      <Stack.Screen name="TableGenerator" component={TableGeneratorScreen} options={{ title: '🪑 Mesa' }} />
      <Stack.Screen name="BoxGenerator" component={BoxGeneratorScreen} options={{ title: '📦 Caja' }} />
    </Stack.Navigator>
  );
}
