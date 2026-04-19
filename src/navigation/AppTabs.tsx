// ═══════════════════════════════════════════════════════════════
// AppTabs — bottom tab navigator raíz de la UX.
// ───────────────────────────────────────────────────────────────
// 4 tabs de navegación principal:
//   HomeTab     → HomeScreen (inicio + crear + explorar rápido)
//   CreateTab   → CreateHubScreen (DIY / PRO / Diseñador)
//   LibraryTab  → LibraryHubScreen (proyectos + catálogos + utilidades)
//   DealsTab    → DealsScreen (chollos cercanos)
//
// Las pantallas de detalle (DIYInput, ProInput, Projects, etc.) NO
// viven dentro de los tabs: están en el Stack raíz (AppNavigator).
// Al navegar a ellas, React Navigation las apila por encima del
// tab bar, ocultándolo visualmente — que es el comportamiento que
// queremos para pasos lineales (planner, detalle de proyecto).
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme';
import Icon, { IconName } from '../components/Icon';

import HomeScreen from '../screens/home/HomeScreen';
import CreateHubScreen from '../screens/home/CreateHubScreen';
import LibraryHubScreen from '../screens/home/LibraryHubScreen';
import DealsScreen from '../screens/shop/DealsScreen';

export type TabParamList = {
  HomeTab: undefined;
  CreateTab: undefined;
  LibraryTab: undefined;
  DealsTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const tabIcons: Record<keyof TabParamList, IconName> = {
  HomeTab: 'home',
  CreateTab: 'plus',
  LibraryTab: 'folder',
  DealsTab: 'shop',
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
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: t('tabs.home') }} />
      <Tab.Screen name="CreateTab" component={CreateHubScreen} options={{ title: t('tabs.create') }} />
      <Tab.Screen name="LibraryTab" component={LibraryHubScreen} options={{ title: t('tabs.library') }} />
      <Tab.Screen name="DealsTab" component={DealsScreen} options={{ title: t('tabs.deals') }} />
    </Tab.Navigator>
  );
}
