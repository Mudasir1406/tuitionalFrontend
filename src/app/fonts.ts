import { League_Spartan } from "next/font/google";

export const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-league-spartan",
  preload: true,
  adjustFontFallback: false,
});