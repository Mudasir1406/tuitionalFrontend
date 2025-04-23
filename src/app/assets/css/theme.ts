"use client";

// import { leagueSpartan } from "@/app/fonts";
import { createTheme } from "@mui/material/styles";
import { League_Spartan } from "next/font/google";
export const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    // fontFamily: `${leagueSpartan.style.fontFamily}`, // Add font family globally
    fontFamily: "var(--font-league-spartan), Arial, sans-serif",

    // fontFamily: `${leagueSpartan.style.fontFamily}, sans-serif`,
    h1: {
      fontSize: "6.88vh",
      fontWeight: 700,
      lineHeight: "7.5vh",
      "@media (max-width:900px)": {
        // fontSize: "50px",
      },
      "@media (max-width:600px)": {
        fontSize: "4vh",
        lineHeight: "5.5vh",
      },
    },
    h2: {
      fontSize: "5.29vh",
      fontWeight: 600,
      lineHeight: "6.6vh",
      "@media (max-width:900px)": {
        // fontSize: "40px",
      },
      "@media (max-width:600px)": {
        fontSize: "3.8vh",
        lineHeight: "4.6vh",
      },
    },
    h3: {
      fontSize: "4.23vh",
      fontWeight: 600,
      lineHeight: "5.56vh",
      "@media (max-width:900px)": {
        // fontSize: "32px",
      },
      "@media (max-width:600px)": {
        // fontSize: "30px",
        fontSize: "3.6vh",
        lineHeight: "4.4vh",
      },
    },
    h4: {
      fontSize: "3.7vh",
      fontWeight: 500,
      lineHeight: 1.5,
      "@media (max-width:900px)": {
        // fontSize: "25px",
      },
      "@media (max-width:600px)": {
        // fontSize: "20px",
      },
    },

    body1: {
      fontSize: "2vh",
      fontWeight: 400,
      lineHeight: "2.8vh",
      "@media (max-width:600px)": {
        fontSize: "1.8vh",
        lineHeight: "2.1vh",
      },
    },
    body2: {
      fontSize: "2.667vh",
      fontWeight: 400,
      lineHeight: "3.5vh",
      // textAlign: "left",

      "@media (max-width:900px)": {
        // fontSize: "16px",
      },
      "@media (max-width:600px)": {
        fontSize: "2.1vh",
        lineHeight: "2.5vh",
        // textAlign: "left",
      },
    },

    subtitle1: {
      fontSize: "3vh",
      fontWeight: 600,
      lineHeight: "3.9vh",
      "@media (max-width:600px)": {
        fontSize: "2.3vh",
        lineHeight: "2.9vh",
      },
    },
    subtitle2: {
      fontSize: "2.9vh",
      fontWeight: 600,
      lineHeight: "3.333vh",
      "@media (max-width:600px)": {
        fontSize: "2vh",
        lineHeight: "2.8vh",
        textAlign: "left",
      },
    },
    caption: {
      fontSize: "2.3vh",
      fontWeight: 400,
      lineHeight: "2.5vh",
      "@media (max-width:900px)": {
        // fontSize: "16px",
      },
      "@media (max-width:600px)": {
        fontSize: "1.8vh",
        lineHeight: "2.3vh",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "2.667vh", // Set the font size for all buttons
          fontWeight: 500,
          textTransform: "none", // Optional: Disable uppercase transformation
          "@media (max-width:900px)": {
            fontSize: "2vh", // Adjust font size for medium screens
          },
          "@media (max-width:600px)": {
            fontSize: "1.9vh",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "2.3vh",
          fontWeight: 400,
          // lineHeight: "3.5vh",
          fontFamily: `${leagueSpartan.style.fontFamily}`, // Use custom font here

          "@media (max-width:900px)": {
            // fontSize: "16px",
          },
          "@media (max-width:600px)": {
            fontSize: "1.9vh",
            // lineHeight: "2.4vh",
            // height: "42px",
            // padding: "0",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          // fontSize: "20px",
          // fontWeight: 400,
          // fontFamily: `${leagueSpartan.style.fontFamily}, sans-serif`,
          fontSize: "2vh",
          fontWeight: 400,
          lineHeight: "3.5vh",
          fontFamily: `${leagueSpartan.style.fontFamily}`, // Use custom font here

          "@media (max-width:900px)": {
            // fontSize: "16px",
          },
          "@media (max-width:600px)": {
            fontSize: "1.9vh",
            lineHeight: "2.4vh",
            // height: "42px",
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
          body1: "p",
          body2: "p",
        },
      },
    },
  },
});

export default theme;
