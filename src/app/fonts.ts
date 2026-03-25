import { League_Spartan, Noto_Sans_Arabic, Inter } from "next/font/google";

export const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-league-spartan",
  adjustFontFallback: true,
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
  preload: true,
  fallback: ["Segoe UI", "Roboto", "sans-serif"],
});

export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-noto-arabic",
  adjustFontFallback: true,
  preload: false,
  fallback: ["Tahoma", "Arial Unicode MS", "sans-serif"],
});