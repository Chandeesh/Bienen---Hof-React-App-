import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translations: require('./en/translations.json')
    },
    de: {
      translations: require('./de/translations.json')
    }
  },
  ns: ['translations'],
  debug: true,
  defaultNS: 'translations'
});

i18n.languages = ['en', 'de'];

export default i18n;