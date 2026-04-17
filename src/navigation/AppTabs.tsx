// ═══════════════════════════════════════════════════════════════
// AppTabs — ESQUELETO DE PREWORK (NO ENGANCHADO EN PRODUCCIÓN).
// ───────────────────────────────────────────────────────────────
// Estado: DRAFT — pendiente de cerrar wireframes, Home final,
// nombres de tabs, reglas de ocultar tab bar y comportamiento de
// modales fullscreen antes de conectarlo en App.tsx.
//
// Estructura tentativa (pendiente de validar con UX):
//   Tab 1  HomeTab        → Inicio (continuar proyecto, accesos rápidos)
//   Tab 2  CreateTab      → Hub de creación (DIY, PRO, Diseñador)
//   Tab 3  LibraryTab     → Proyectos guardados + Favoritos
//   Tab 4  DealsTab       → Chollos del país
//
// Para activarlo en su momento:
//   1. Reemplazar `AppNavigator` por este en `App.tsx`
//   2. Crear los hubs CreateHubScreen + LibraryHomeScreen (pendiente)
//   3. Ajustar reglas: ocultar tab bar en DIYSteps, ProOptimization,
//      ProjectDetail, Onboarding
//   4. ProOptimization pasa a `presentation: 'fullScreenModal'`
//
// MIENTRAS TANTO este archivo no se importa en ningún sitio y no
// afecta a la UX actual. Está aquí como base para la migración.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme';
import Icon, { IconName } from '../components/Icon';

// Reutilizamos screens existentes — la migración real sustituirá Home
// por un nuevo diseño y añadirá los hubs.
import HomeScreen from '../screens/home/HomeScreen';
import ProjectsScreen from '../screens/projects/ProjectsScreen';
import FavoritesScreen from '../screens/shop/FavoritesScreen';
import DealsScreen from '../screens/shop/DealsScreen';

// Placeholders — cuando tengamos los hubs reales sustituimos estos imports.
// Por ahora un stub mínimo evita romper la compilación del esqueleto.
import { View, Text, StyleSheet } from 'react-native';

type TabName = 'HomeTab' | 'CreateTab' | 'LibraryTab' | 'DealsTab';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const CreateStack = createNativeStackNavigator();
const LibraryStack = createNativeStackNavigator();
const DealsStack = createNativeStackNavigator();

// ── Stub hubs (DRAFT — sustituir por pantallas reales) ─────────
function CreateHubStub() {
  return (
    <View style={stubStyles.wrap}>
      <Text style={stubStyles.title}>Crear</Text>
      <Text style={stubStyles.body}>Hub pendiente. Incluirá: DIY, PRO, Diseñador.</Text>
    </View>
  );
}

function LibraryHubStub() {
  return (
    <View style={stubStyles.wrap}>
      <Text style={stubStyles.title}>Biblioteca</Text>
      <Text style={stubStyles.body}>Hub pendiente. Incluirá: Proyectos, Favoritos, Catálogos.</Text>
    </View>
  );
}

// ── Stack por tab (esqueleto mínimo) ───────────────────────────
function HomeStackNav() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

function CreateStackNav() {
  return (
    <CreateStack.Navigator screenOptions={{ headerShown: false }}>
      <CreateStack.Screen name="CreateHub" component={CreateHubStub} />
    </CreateStack.Navigator>
  );
}

function LibraryStackNav() {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen name="LibraryHub" component={LibraryHubStub} options={{ headerShown: false }} />
      <LibraryStack.Screen name="Projects" component={ProjectsScreen} />
      <LibraryStack.Screen name="Favorites" component={FavoritesScreen} />
    </LibraryStack.Navigator>
  );
}

function DealsStackNav() {
  return (
    <DealsStack.Navigator screenOptions={{ headerShown: false }}>
      <DealsStack.Screen name="Deals" component={DealsScreen} />
    </DealsStack.Navigator>
  );
}

// ── Iconos por tab ─────────────────────────────────────────────
const tabIcons: Record<TabName, IconName> = {
  HomeTab: 'home',
  CreateTab: 'plus',
  LibraryTab: 'folder',
  DealsTab: 'shop',
};

export default function AppTabs() {
  const { t: _t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.bgAlt,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ color, size }) => {
          const name = tabIcons[route.name as TabName] ?? 'home';
          return <Icon name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNav} options={{ title: 'Inicio' }} />
      <Tab.Screen name="CreateTab" component={CreateStackNav} options={{ title: 'Crear' }} />
      <Tab.Screen name="LibraryTab" component={LibraryStackNav} options={{ title: 'Biblioteca' }} />
      <Tab.Screen name="DealsTab" component={DealsStackNav} options={{ title: 'Chollos' }} />
    </Tab.Navigator>
  );
}

const stubStyles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: colors.bg },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 12 },
  body: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
});
