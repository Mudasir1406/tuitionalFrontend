import { League_Spartan, Noto_Sans_Arabic } from "next/font/google";

export const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  display: "swap", // Better for performance and consistency
  variable: "--font-league-spartan",
  adjustFontFallback: true, // Enable fallback optimization
  preload: true, // Preload font for better performance
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap", // Better for performance and consistency
  variable: "--font-noto-arabic",
  adjustFontFallback: true, // Enable fallback optimization
  preload: false, // Disable preload to avoid network issues
  fallback: ["Tahoma", "Arial Unicode MS", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});