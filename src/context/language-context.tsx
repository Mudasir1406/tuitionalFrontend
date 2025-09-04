"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Locale, I18nContextType } from "@/types/i18n.types";

// Import translation files
import enTranslations from "@/locales/en.json";
import arTranslations from "@/locales/ar.json";

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isClient, setIsClient] = useState(false);

  // Initialize client state first
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize locale from URL path or localStorage after client mount
  useEffect(() => {
    if (isClient && typeof window !== "undefined") {
      // First check if we're on an /ar route
      const pathLocale = window.location.pathname.startsWith('/ar') ? 'ar' : 'en';
      setLocaleState(pathLocale);
      
      // Also update localStorage to match the current page
      localStorage.setItem('tuitional-locale', pathLocale);
    }
  }, [isClient]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (isClient && typeof window !== "undefined") {
      localStorage.setItem('tuitional-locale', newLocale);
    }
  };

  // Translation function with fallback
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    // Navigate through nested keys
    for (const k of keys) {
      value = value?.[k];
    }
    
    // If translation not found, fallback to English
    if (value === undefined && locale !== 'en') {
      let fallbackValue: any = translations.en;
      for (const k of keys) {
        fallbackValue = fallbackValue?.[k];
      }
      return fallbackValue || key;
    }
    
    return value || key;
  };

  const isRTL = locale === 'ar';

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};