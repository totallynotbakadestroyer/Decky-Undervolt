import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './LangModules/about/en.json';
import ru from './LangModules/about/rus.json';


i18n.use(initReactI18next).init({
   resources: {
     en: { translation: en },
     ru: { translation: ru }
   },
   lng: 'en', // default language
   fallbackLng: 'en',
   interpolation: {
     escapeValue: false
   }
 });

export default i18n;