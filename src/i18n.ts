import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "./locales/translations";

i18n.use(initReactI18next).init({
  resources: translations,
  lng: navigator.language.split("-")[0],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
