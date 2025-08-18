import { useI18n as useI18nFromContext } from "@/context/language-context";
import type { Locale } from "@/types/i18n.types";

export const useI18n = () => {
  const context = useI18nFromContext();
  
  return {
    ...context,
    // Helper methods
    isArabic: context.locale === 'ar',
    isEnglish: context.locale === 'en',
    switchToArabic: () => context.setLocale('ar' as Locale),
    switchToEnglish: () => context.setLocale('en' as Locale),
    toggleLanguage: () => context.setLocale(context.locale === 'en' ? 'ar' : 'en'),
  };
};

export default useI18n;