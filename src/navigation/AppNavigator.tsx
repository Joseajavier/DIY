import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { DIYResult, Material, OptimizationResult, Piece } from '../models';
import { colors } from '../theme';

// ── Home ───────────────────────────────────────────────────────
import HomeScreen from '../screens/home/HomeScreen';
import OnboardingScreen from '../screens/home/OnboardingScreen';

// ── Projects ───────────────────────────────────────────────────
import ProjectsScreen from '../screens/projects/ProjectsScreen';
import ProjectDetailScreen from '../screens/projects/ProjectDetailScreen';

// ── Planner (DIY + Pro) ────────────────────────────────────────
import DIYInputScreen from '../screens/planner/DIYInputScreen';
import DIYStepsScreen from '../screens/planner/DIYStepsScreen';
import DIYMaterialsScreen from '../screens/planner/DIYMaterialsScreen';
import ProInputScreen from '../screens/planner/ProInputScreen';
import ProOptimizationScreen from '../screens/planner/ProOptimizationScreen';
import ProResultsScreen from '../screens/planner/ProResultsScreen';

// ── Catálogos ──────────────────────────────────────────────────
import ToolCategoriesScreen from '../screens/catalog/tools/ToolCategoriesScreen';
import ToolSearchScreen from '../screens/catalog/tools/ToolSearchScreen';
import WoodCategoriesScreen from '../screens/catalog/wood/WoodCategoriesScreen';
import WoodCatalogScreen from '../screens/catalog/wood/WoodCatalogScreen';

// ── Utilidades (calculadoras + guías) ──────────────────────────
import UtilitiesScreen from '../screens/tools/UtilitiesScreen';
import GoldenRatioScreen from '../screens/tools/GoldenRatioScreen';
import WainscotCalcScreen from '../screens/tools/WainscotCalcScreen';
import ShelfCalcScreen from '../screens/tools/ShelfCalcScreen';
import FractionCalcScreen from '../screens/tools/FractionCalcScreen';
import NominalActualScreen from '../screens/tools/NominalActualScreen';
import BoardFootCalcScreen from '../screens/tools/BoardFootCalcScreen';
import JointTypesScreen from '../screens/tools/JointTypesScreen';
import WoodGuideScreen from '../screens/tools/WoodGuideScreen';
import ScrewGuideScreen from '../screens/tools/ScrewGuideScreen';
import ScrewSelectorScreen from '../screens/tools/ScrewSelectorScreen';

// ── Diseñador paramétrico ──────────────────────────────────────
import GeneratorHomeScreen from '../screens/generator/GeneratorHomeScreen';
import ShelfGeneratorScreen from '../screens/generator/ShelfGeneratorScreen';
import TableGeneratorScreen from '../screens/generator/TableGeneratorScreen';
import BoxGeneratorScreen from '../screens/generator/BoxGeneratorScreen';
import DrawerCabinetGeneratorScreen from '../screens/generator/DrawerCabinetGeneratorScreen';
import CabinetGeneratorScreen from '../screens/generator/CabinetGeneratorScreen';
import BenchGeneratorScreen from '../screens/generator/BenchGeneratorScreen';
import DeskGeneratorScreen from '../screens/generator/DeskGeneratorScreen';

// ── Shop ───────────────────────────────────────────────────────
import ShopScreen from '../screens/shop/ShopScreen';
import DealsScreen from '../screens/shop/DealsScreen';
import FavoritesScreen from '../screens/shop/FavoritesScreen';

// ── Settings ───────────────────────────────────────────────────
import SettingsScreen from '../screens/settings/SettingsScreen';
import FeedbackScreen from '../screens/settings/FeedbackScreen';

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
  Calculators: undefined;
  Deals: undefined;
  Favorites: undefined;
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
  DrawerCabinetGenerator: undefined;
  CabinetGenerator: undefined;
  BenchGenerator: undefined;
  DeskGenerator: undefined;
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

      {/* Projects */}
      <Stack.Screen name="Projects" component={ProjectsScreen} options={{ title: t('nav.myProjects') }} />
      <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} options={{ title: t('nav.project') }} />

      {/* Planner — DIY */}
      <Stack.Screen name="DIYInput" component={DIYInputScreen} options={{ title: t('nav.newDIY') }} />
      <Stack.Screen name="DIYSteps" component={DIYStepsScreen} options={{ title: t('nav.steps') }} />
      <Stack.Screen name="DIYMaterials" component={DIYMaterialsScreen} options={{ title: t('nav.materials') }} />

      {/* Planner — Pro */}
      <Stack.Screen name="ProInput" component={ProInputScreen} options={{ title: t('nav.proPro') }} />
      <Stack.Screen name="ProOptimization" component={ProOptimizationScreen} options={{ title: t('nav.optimization') }} />
      <Stack.Screen name="ProResults" component={ProResultsScreen} options={{ title: t('nav.results') }} />

      {/* Shop */}
      <Stack.Screen name="Shop" component={ShopScreen} options={{ title: t('nav.shops') }} />
      <Stack.Screen name="Deals" component={DealsScreen} options={{ title: t('nav.deals') }} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: t('nav.favorites') }} />

      {/* Catalogos */}
      <Stack.Screen name="ToolCategories" component={ToolCategoriesScreen} options={{ title: t('nav.tools') }} />
      <Stack.Screen name="ToolSearch" component={ToolSearchScreen} options={{ title: t('nav.catalog') }} />
      <Stack.Screen name="WoodCategories" component={WoodCategoriesScreen} options={{ title: t('nav.wood') }} />
      <Stack.Screen name="WoodCatalog" component={WoodCatalogScreen} options={{ title: t('nav.catalog') }} />

      {/* Utilidades — calculadoras + guías */}
      <Stack.Screen name="Calculators" component={UtilitiesScreen} options={{ title: t('nav.utilities') }} />
      <Stack.Screen name="GoldenRatio" component={GoldenRatioScreen} options={{ title: t('nav.goldenRatio') }} />
      <Stack.Screen name="WainscotCalc" component={WainscotCalcScreen} options={{ title: t('nav.wainscot') }} />
      <Stack.Screen name="ShelfCalc" component={ShelfCalcScreen} options={{ title: t('nav.shelfCalc') }} />
      <Stack.Screen name="FractionCalc" component={FractionCalcScreen} options={{ title: t('nav.fractionCalc') }} />
      <Stack.Screen name="ScrewSelector" component={ScrewSelectorScreen} options={{ title: t('nav.screwSelector') }} />
      <Stack.Screen name="NominalActual" component={NominalActualScreen} options={{ title: t('nav.nominalActual') }} />
      <Stack.Screen name="BoardFootCalc" component={BoardFootCalcScreen} options={{ title: t('nav.boardFoot') }} />
      <Stack.Screen name="JointTypes" component={JointTypesScreen} options={{ title: t('nav.joints') }} />
      <Stack.Screen name="WoodGuide" component={WoodGuideScreen} options={{ title: t('nav.woodGuide') }} />
      <Stack.Screen name="ScrewGuide" component={ScrewGuideScreen} options={{ title: t('nav.screwGuide') }} />

      {/* Diseñador */}
      <Stack.Screen name="ParametricHome" component={GeneratorHomeScreen} options={{ title: t('nav.designer') }} />
      <Stack.Screen name="ShelfGenerator" component={ShelfGeneratorScreen} options={{ title: t('nav.shelfGen') }} />
      <Stack.Screen name="TableGenerator" component={TableGeneratorScreen} options={{ title: t('nav.tableGen') }} />
      <Stack.Screen name="BoxGenerator" component={BoxGeneratorScreen} options={{ title: t('nav.boxGen') }} />
      <Stack.Screen name="DrawerCabinetGenerator" component={DrawerCabinetGeneratorScreen} options={{ title: t('nav.drawerGen') }} />
      <Stack.Screen name="CabinetGenerator" component={CabinetGeneratorScreen} options={{ title: t('nav.cabinetGen') }} />
      <Stack.Screen name="BenchGenerator" component={BenchGeneratorScreen} options={{ title: t('nav.benchGen') }} />
      <Stack.Screen name="DeskGenerator" component={DeskGeneratorScreen} options={{ title: t('nav.deskGen') }} />

      {/* Settings */}
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: t('nav.settings') }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: t('nav.feedback') }} />
    </Stack.Navigator>
  );
}
