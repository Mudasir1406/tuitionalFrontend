"use client";
import React, { useEffect, ReactNode, useState } from "react";
import { useI18n } from "@/context/language-context";

interface HtmlWrapperProps {
  children: ReactNode;
  className: string;
}

const HtmlWrapper: React.FC<HtmlWrapperProps> = ({ children, className }) => {
  const { locale, isRTL } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only manipulate DOM after component is mounted on client
    if (mounted && typeof window !== "undefined") {
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', locale);
    }
  }, [locale, isRTL, mounted]);

  return <>{children}</>;
};

export default HtmlWrapper;