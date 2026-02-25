import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// aquí se importan los idiomas
import en from "@/translate/en.json";
import es from "@/translate/es.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: "es",
  fallbackLng: "es",
  interpolation: { escapeValue: false },
});

export default i18n;
