import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import {enAbout} from './LangModules/about/en';
import {ruAbout} from './LangModules/about/rus';
import {enSettings} from './LangModules/settings/en';
import {ruSettings} from './LangModules/settings/rus';
import {enIndex} from './LangModules/index/en';
import {ruIndex} from './LangModules/index/rus';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      about: enAbout,
      settings: enSettings,
      index: enIndex,
    },
    ru: {
      about: ruAbout,
      settings: ruSettings,
      index: ruIndex,
    },
  },
  lng: 'ru', 
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false, 
  },
  
  ns: ['about', 'settings', 'Index'],
  defaultNS: 'Index', 
});

export default i18n;