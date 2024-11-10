import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { enAbout, enIndex, enSettings } from "./locales/en/translation";
import { ruAbout, ruIndex, ruSettings } from "./locales/ru/translation";

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
  lng: navigator.language.split("-")[0],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },

  ns: ["about", "settings", "index"],
  defaultNS: "index",
});

export default i18n;
