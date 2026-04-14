import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import es from './locales/es.json';
import en from './locales/en.json';

let deviceLang = 'es';
try {
  const code = getLocales()?.[0]?.languageCode;
  if (code && code.startsWith('en')) deviceLang = 'en';
} catch {
  // fallback
}

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: deviceLang,
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
