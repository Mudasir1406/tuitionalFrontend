// import { League_Spartan } from "next/font/google";

// export const leagueSpartan = League_Spartan({
//   subsets: ["latin"],
//   display: "swap",
// });


// src/app/fonts.ts
import { League_Spartan } from "next/font/google";

export const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-league-spartan", // Add this line
  adjustFontFallback: false, // Recommended for modern browsers
});