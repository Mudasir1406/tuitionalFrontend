// "use client";

// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   typography: {
//     fontFamily: "League Spartan, sans-serif",
//     h1: {
//       fontSize: "65px",
//       fontWeight: 700,
//       lineHeight: 1.2,
//     },
//     h2: {
//       fontSize: "50px",
//       fontWeight: 600,
//       lineHeight: 1.3,
//     },
//     h3: {
//       fontSize: "40px",
//       fontWeight: 600,
//       lineHeight: 1.4,
//     },
//     body1: {
//       fontSize: "20px",
//       fontWeight: 400,
//       lineHeight: 1.5,
//     },
//   },
//   components: {
//     // MuiButton: {
//     //   styleOverrides: {
//     //     root: {
//     //       fontSize: "20px",
//     //       fontWeight: 600,
//     //       padding: "12px 24px",
//     //       backgroundColor: "#38B6FF",
//     //       color: "#fff",
//     //       borderRadius: "4px",
//     //       "&:hover": {
//     //         backgroundColor: "#2a9cdf",
//     //       },
//     //     },
//     //   },
//     // },
//     MuiInputBase: {
//       styleOverrides: {
//         root: {
//           fontSize: "20px",
//           fontWeight: 400,
//           lineHeight: 1.5,
//           fontFamily: "League Spartan, sans-serif",
//           // padding: "10px 15px",
//         },
//       },
//     },
//     MuiSelect: {
//       styleOverrides: {
//         root: {
//           fontSize: "20px",
//           fontWeight: 400,
//           fontFamily: "League Spartan, sans-serif",
//         },
//       },
//     },
//     MuiTypography: {
//       defaultProps: {
//         variantMapping: {
//           h1: "h1",
//           h2: "h2",
//           h3: "h3",
//           body1: "p",
//         },
//       },
//     },
//   },
// });

// export default theme;

"use client";

import { leagueSpartan } from "@/app/fonts";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    // fontFamily: `${leagueSpartan.style.fontFamily}, sans-serif`,
    h1: {
      fontSize: "65px",
      fontWeight: 700,
      lineHeight: 1.2,
      "@media (max-width:900px)": {
        fontSize: "50px",
      },
      "@media (max-width:600px)": {
        fontSize: "35px",
      },
    },
    h2: {
      fontSize: "50px",
      fontWeight: 600,
      lineHeight: 1.3,
      "@media (max-width:900px)": {
        fontSize: "40px",
      },
      "@media (max-width:600px)": {
        fontSize: "32px",
      },
    },
    h3: {
      fontSize: "40px",
      fontWeight: 600,
      lineHeight: 1.4,
      "@media (max-width:900px)": {
        fontSize: "32px",
      },
      "@media (max-width:600px)": {
        fontSize: "30px",
      },
    },
    h4: {
      fontSize: "30px",
      fontWeight: 500,
      lineHeight: 1.5,
      "@media (max-width:900px)": {
        fontSize: "25px",
      },
      "@media (max-width:600px)": {
        fontSize: "20px",
      },
    },
    h5: {
      fontSize: "25px",
      fontWeight: 500,
      lineHeight: 1.5,
      "@media (max-width:900px)": {
        fontSize: "20px",
      },
      "@media (max-width:600px)": {
        fontSize: "18px",
      },
    },
    h6: {
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: 1.6,
      "@media (max-width:900px)": {
        fontSize: "18px",
      },
      "@media (max-width:600px)": {
        fontSize: "16px",
      },
    },

    body1: {
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: 1.5,
      "@media (max-width:900px)": {
        fontSize: "16px",
      },
      "@media (max-width:600px)": {
        fontSize: "12px",
      },
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          fontWeight: 400,
          lineHeight: 1.5,
          fontFamily: `${leagueSpartan.style.fontFamily}, sans-serif`,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          fontWeight: 400,
          fontFamily: `${leagueSpartan.style.fontFamily}, sans-serif`,
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
