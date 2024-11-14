import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { enAbout, enIndex, enSettings, enDynamicAction, enDynamicIndex, enDynamicPreset, enDynamicPresetSel, enStaticAction, enStaticIndex, enStaticPreset, enUnderStatus } from "./locales/en/translation";
import { ruAbout, ruIndex, ruSettings, ruDynamicAction, ruDynamicIndex, ruDynamicPreset, ruDynamicPresetSel, ruStaticAction, ruStaticIndex, ruStaticPreset, ruUnderStatus } from "./locales/ru/translation";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      about: enAbout,
      settings: enSettings,
      index: enIndex,
      dynamicAction: enDynamicAction,
      dynamicIndex: enDynamicIndex,
      dynamicPreset: enDynamicPreset,
      dynamicPSel:enDynamicPresetSel,
      staticAction: enStaticAction,
      staticIndex: enStaticIndex,
      staticPreset: enStaticPreset,
      underStatus: enUnderStatus,
    },
    ru: {
      about: ruAbout,
      settings: ruSettings,
      index: ruIndex,
      dynamicAction: ruDynamicAction,
      dynamicIndex: ruDynamicIndex,
      dynamicPreset: ruDynamicPreset,
      dynamicPSel: ruDynamicPresetSel,
      staticAction: ruStaticAction,
      staticIndex: ruStaticIndex,
      staticPreset: ruStaticPreset,
      underStatus: ruUnderStatus,
    },
  },
  lng: navigator.language.split("-")[0],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },

  ns: ["about", "settings", "index", "dynamicAction", "dynamicIndex", "dynamicPreset", "dynamicPSel", "staticAction", "staticIndex", "staticPreset", "underStatus"],
  defaultNS: "index",
});

export default i18n;
