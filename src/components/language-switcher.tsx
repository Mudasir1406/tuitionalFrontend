"use client";
import React from "react";
import { useI18n } from "@/context/language-context";
import { leagueSpartan } from "@/app/fonts";

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale, isRTL } = useI18n();

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  return (
    <div className="mx-2 flex items-center lg:mx-3">
      <button
        type="button"
        onClick={toggleLanguage}
        className={`${leagueSpartan.className} ${isRTL ? "font-arabic" : ""} h-[35px] min-w-[70px] rounded-lg border border-brand-500 px-3 text-sm font-semibold normal-case text-brand-500 transition hover:bg-brand-500/10`}
      >
        {locale === "en" ? "عربي" : "English"}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
