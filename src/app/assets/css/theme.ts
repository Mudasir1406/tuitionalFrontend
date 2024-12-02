"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "League Spartan, sans-serif",
    h1: {
      fontSize: "65px",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "50px",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "40px",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  components: {
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       fontSize: "20px",
    //       fontWeight: 600,
    //       padding: "12px 24px",
    //       backgroundColor: "#38B6FF",
    //       color: "#fff",
    //       borderRadius: "4px",
    //       "&:hover": {
    //         backgroundColor: "#2a9cdf",
    //       },
    //     },
    //   },
    // },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          fontWeight: 400,
          lineHeight: 1.5,
          fontFamily: "League Spartan, sans-serif",
          // padding: "10px 15px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          fontWeight: 400,
          fontFamily: "League Spartan, sans-serif",
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
        },
      },
    },
  },
});

export default theme;
