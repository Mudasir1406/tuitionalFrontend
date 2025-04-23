// import { League_Spartan } from "next/font/google";

import { League_Spartan } from "next/font/google";

// export const leagueSpartan = League_Spartan({
//   subsets: ["latin"],
//   display: "swap",
// });

export const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  display: "optional", // More performant than swap
  variable: "--font-league-spartan",
  adjustFontFallback: true, // Keep true for better CLS
  weight: ["400"], // Only load required weight
});
