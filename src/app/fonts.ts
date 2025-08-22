import { League_Spartan } from "next/font/google";

export const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  display: "swap", // Better for performance and consistency
  variable: "--font-league-spartan",
  adjustFontFallback: true, // Enable fallback optimization
  preload: true, // Preload font for better performance
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});