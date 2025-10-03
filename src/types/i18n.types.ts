export type Locale = 'en' | 'ar' | 'es';

export interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

export interface TranslationKeys {
  nav: {
    home: string;
    about: string;
    community: string;
    testimonials: string;
    contact: string;
  };
  buttons: {
    ai_digital_sat: string;
    book_demo: string;
  };
}

export type TranslationFunction = (key: string) => string;