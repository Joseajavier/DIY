import { ExpoConfig, ConfigContext } from 'expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getAppName = () => {
  if (IS_DEV) return 'DIY (Dev)';
  if (IS_PREVIEW) return 'DIY (Beta)';
  return 'DIY';
};

const getBundleId = () => {
  if (IS_DEV) return 'com.diyapp.dev';
  if (IS_PREVIEW) return 'com.diyapp.preview';
  return 'com.diyapp.production';
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: 'DIY',
  owner: 'josejaviercapilla',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#FAF5EE',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: getBundleId(),
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#2c1e1e',
    },
    package: getBundleId(),
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-sqlite',
    'expo-localization',
    [
      'expo-location',
      {
        locationWhenInUsePermission:
          'DIY usa tu ubicación para mostrarte chollos y tiendas de bricolaje cercanas.',
      },
    ],
    [
      '@sentry/react-native/expo',
      {
        organization: 'diy-app',
        project: 'diy-mobile',
      },
    ],
  ],
  extra: {
    appVariant: process.env.APP_VARIANT ?? 'production',
    apiUrl: IS_DEV
      ? 'http://localhost:3001'
      : IS_PREVIEW
      ? 'https://diy-backend-staging.up.railway.app'
      : 'https://diy-backend.up.railway.app',
    eas: {
      projectId: 'aa299165-5552-4ca4-bc3a-d308d0fb0dfd',
    },
  },
});
