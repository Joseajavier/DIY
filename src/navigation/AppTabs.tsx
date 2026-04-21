// ═══════════════════════════════════════════════════════════════
// AppTabs — bottom tab navigator raíz de la UX.
// ───────────────────────────────────────────────────────────────
// 4 tabs de navegación principal:
//   HomeTab      → HomeScreen (inicio + crear + explorar rápido)
//   ProjectsTab  → ProjectsScreen (lista de proyectos guardados)
//   LibraryTab   → LibraryHubScreen (catálogos + utilidades + chollos)
//   SettingsTab  → SettingsScreen (preferencias)
//
// Las pantallas de detalle (DIYInput, ProInput, Projects detail,
// Generator, etc.) NO viven dentro de los tabs: están en el Stack
// raíz (AppNavigator). Al navegar a ellas, React Navigation las
// apila por encima del tab bar, ocultándolo — el comportamiento
// que queremos para pasos lineales (planner, detalle de proyecto).
//
// Retirados en fase B:
//   • CreateTab   — redundante; HomeScreen ya lanza DIY/PRO/Diseñador.
//   • DealsTab    — absorbido por Explorar (Library + Home).
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme';
import Icon, { IconName } from '../components/Icon';
import ErrorBoundary from '../components/ErrorBoundary';

import HomeScreen from '../screens/home/HomeScreen';
import ProjectsScreen from '../screens/projects/ProjectsScreen';
import LibraryHubScreen from '../screens/home/LibraryHubScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

// Cada tab se renderiza como children de Tab.Screen envuelto en su
// propio ErrorBoundary: un crash en una tab no saca al usuario de
// las demás, y el botón "Reintentar" sólo resetea la tab afectada.
// Usamos render-prop para conservar el tipado de props de React
// Navigation (navigation, route) sin HOC.
function renderWithBoundary<C extends React.ComponentType<any>>(
  Component: C,
) {
  return (props: React.ComponentProps<C>) => (
    <ErrorBoundary>
      <Component {...(props as any)} />
    </ErrorBoundary>
  );
}

export type TabParamList = {
  HomeTab: undefined;
  ProjectsTab: undefined;
  LibraryTab: undefined;
  SettingsTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const tabIcons: Record<keyof TabParamList, IconName> = {
  HomeTab: 'home',
  ProjectsTab: 'projects',
  LibraryTab: 'folder',
  SettingsTab: 'settings',
};

export default function AppTabs() {
  const { t } = useTranslation();

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
          const name = tabIcons[route.name as keyof TabParamList] ?? 'home';
          return <Icon name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" options={{ title: t('tabs.home') }}>
        {renderWithBoundary(HomeScreen)}
      </Tab.Screen>
      <Tab.Screen name="ProjectsTab" options={{ title: t('tabs.projects') }}>
        {renderWithBoundary(ProjectsScreen)}
      </Tab.Screen>
      <Tab.Screen name="LibraryTab" options={{ title: t('tabs.library') }}>
        {renderWithBoundary(LibraryHubScreen)}
      </Tab.Screen>
      <Tab.Screen name="SettingsTab" options={{ title: t('tabs.settings') }}>
        {renderWithBoundary(SettingsScreen)}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
