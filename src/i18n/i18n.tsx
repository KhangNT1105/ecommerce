import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import EN from './en.json';
import VN from './vn.json';
const resources = {
  en: {
    translation: EN
  },
  vn: {
    translation: VN
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'vn',

  keySeparator: false,

  interpolation: {
    escapeValue: false
  }
});

export default i18n;