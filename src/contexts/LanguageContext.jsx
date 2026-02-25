import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }, [language, i18n]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isSpanish: language === "es",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
