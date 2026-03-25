"use client";

import { createTheme } from "@mui/material/styles";
import { leagueSpartan, inter } from "@/app/fonts";
import { TYPOGRAPHY_TOKENS } from "./typographyTokens";

/**
 * Tuitional Brand Theme Customization
 * Optimized for Typography & Font Standardisation Plan (March 2026)
 * Uses League Spartan for Headings and Inter for Body
 */

const theme = createTheme({
  typography: {
    // Global Default Font (Body)
    fontFamily: inter.style.fontFamily,

    // Headings (H1-H6)
    h1: {
      fontFamily: leagueSpartan.style.fontFamily,
      fontSize: TYPOGRAPHY_TOKENS.desktop.h1.rem,
      fontWeight: TYPOGRAPHY_TOKENS.desktop.h1.weight,
      lineHeight: TYPOGRAPHY_TOKENS.desktop.h1.lineHeight,
      letterSpacing: TYPOGRAPHY_TOKENS.desktop.h1.letterSpacing,
      "@media (max-width: 1199px)": {
        fontSize: TYPOGRAPHY_TOKENS.tablet.h1.rem,
      },
      "@media (max-width: 599px)": {
        fontSize: TYPOGRAPHY_TOKENS.mobile.h1.rem,
      },
    },
    h2: {
      fontFamily: leagueSpartan.style.fontFamily,
      fontSize: TYPOGRAPHY_TOKENS.desktop.h2.rem,
      fontWeight: TYPOGRAPHY_TOKENS.desktop.h2.weight,
      lineHeight: TYPOGRAPHY_TOKENS.desktop.h2.lineHeight,
      letterSpacing: TYPOGRAPHY_TOKENS.desktop.h2.letterSpacing,
      "@media (max-width: 1199px)": {
        fontSize: TYPOGRAPHY_TOKENS.tablet.h2.rem,
      },
      "@media (max-width: 599px)": {
        fontSize: TYPOGRAPHY_TOKENS.mobile.h2.rem,
      },
    },
    h3: {
      fontFamily: leagueSpartan.style.fontFamily,
      fontSize: TYPOGRAPHY_TOKENS.desktop.h3.rem,
      fontWeight: TYPOGRAPHY_TOKENS.desktop.h3.weight,
      lineHeight: TYPOGRAPHY_TOKENS.desktop.h3.lineHeight,
      letterSpacing: TYPOGRAPHY_TOKENS.desktop.h3.letterSpacing,
      "@media (max-width: 1199px)": {
        fontSize: TYPOGRAPHY_TOKENS.tablet.h3.rem,
      },
      "@media (max-width: 599px)": {
        fontSize: TYPOGRAPHY_TOKENS.mobile.h3.rem,
      },
    },
    h4: {
      fontFamily: leagueSpartan.style.fontFamily,
      fontSize: TYPOGRAPHY_TOKENS.desktop.h4.rem,
      fontWeight: TYPOGRAPHY_TOKENS.desktop.h4.weight,
      lineHeight: TYPOGRAPHY_TOKENS.desktop.h4.lineHeight,
      letterSpacing: TYPOGRAPHY_TOKENS.desktop.h4.letterSpacing,
      "@media (max-width: 1199px)": {
        fontSize: TYPOGRAPHY_TOKENS.tablet.h4.rem,
      },
      "@media (max-width: 599px)": {
        fontSize: TYPOGRAPHY_TOKENS.mobile.h4.rem,
      },
    },
    h5: {
      fontFamily: leagueSpartan.style.fontFamily,
      fontSize: TYPOGRAPHY_TOKENS.desktop.h5.rem,
      fontWeight: TYPOGRAPHY_TOKENS.desktop.h5.weight,
      lineHeight: TYPOGRAPHY_TOKENS.desktop.h5.lineHeight,
      "@media (max-width: 1199px)": {
        fontSize: TYPOGRAPHY_TOKENS.tablet.h5.rem,
      },
    },
    h6: {
      fontFamily: leagueSpartan.style.fontFamily,
      fontSize: TYPOGRAPHY_TOKENS.desktop.h6.rem,
      fontWeight: TYPOGRAPHY_TOKENS.desktop.h6.weight,
      lineHeight: TYPOGRAPHY_TOKENS.desktop.h6.lineHeight,
    },

    // Body & Captions
    body1: {
      fontSize: TYPOGRAPHY_TOKENS.desktop.body.rem,
      lineHeight: TYPOGRAPHY_TOKENS.desktop.body.lineHeight,
      "@media (max-width: 599px)": {
        fontSize: TYPOGRAPHY_TOKENS.mobile.body.rem,
      },
    },
    body2: {
      fontSize: TYPOGRAPHY_TOKENS.desktop.small.rem,
      lineHeight: TYPOGRAPHY_TOKENS.desktop.small.lineHeight,
    },

    // Special Variants
    subtitle1: {
      fontFamily: leagueSpartan.style.fontFamily,
      fontSize: TYPOGRAPHY_TOKENS.desktop.statNumber.rem,
      fontWeight: TYPOGRAPHY_TOKENS.desktop.statNumber.weight,
      lineHeight: TYPOGRAPHY_TOKENS.desktop.statNumber.lineHeight,
      "@media (max-width: 1199px)": {
        fontSize: TYPOGRAPHY_TOKENS.tablet.statNumber.rem,
      },
      "@media (max-width: 599px)": {
        fontSize: TYPOGRAPHY_TOKENS.mobile.statNumber.rem,
      },
    },
    subtitle2: {
      fontSize: TYPOGRAPHY_TOKENS.desktop.statLabel.rem,
      fontWeight: TYPOGRAPHY_TOKENS.desktop.statLabel.weight,
      lineHeight: TYPOGRAPHY_TOKENS.desktop.statLabel.lineHeight,
      letterSpacing: TYPOGRAPHY_TOKENS.desktop.statLabel.letterSpacing,
      textTransform: "uppercase",
    },
    caption: {
      fontSize: TYPOGRAPHY_TOKENS.desktop.small.rem,
      lineHeight: TYPOGRAPHY_TOKENS.desktop.small.lineHeight,
    },
    button: {
      fontSize: TYPOGRAPHY_TOKENS.desktop.button.rem,
      fontWeight: TYPOGRAPHY_TOKENS.desktop.button.weight,
      letterSpacing: TYPOGRAPHY_TOKENS.desktop.button.letterSpacing,
      textTransform: "none",
      "@media (max-width: 599px)": {
        fontSize: TYPOGRAPHY_TOKENS.mobile.button.rem,
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 24px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: TYPOGRAPHY_TOKENS.desktop.formInput.rem,
          "@media (max-width: 599px)": {
            fontSize: TYPOGRAPHY_TOKENS.mobile.formInput.rem, // Ensure 16px to prevent iOS zoom
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          body1: "p",
          body2: "p",
          subtitle1: "div",
          subtitle2: "span",
        },
      },
    },
  },
});

export default theme;
