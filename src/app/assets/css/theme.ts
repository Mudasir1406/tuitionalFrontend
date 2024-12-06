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
      fontSize: "6.88vh",
      fontWeight: 700,
      lineHeight: "7.5vh",
      "@media (max-width:900px)": {
        // fontSize: "50px",
      },
      "@media (max-width:600px)": {
        fontSize: "4.88vh",
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
        fontSize: "4vh",
        lineHeight: "5vh",
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
        fontSize: "3.5vh",
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
    // h5: {
    //   fontSize: "25px",
    //   fontWeight: 500,
    //   lineHeight: 1.5,
    //   "@media (max-width:900px)": {
    //     // fontSize: "20px",
    //   },
    //   "@media (max-width:600px)": {
    //     // fontSize: "18px",
    //   },
    // },
    // h6: {
    //   fontSize: "20px",
    //   fontWeight: 500,
    //   lineHeight: 1.6,
    //   "@media (max-width:900px)": {
    //     fontSize: "18px",
    //   },
    //   "@media (max-width:600px)": {
    //     fontSize: "16px",
    //   },
    // },

    body1: {
      fontSize: "2.667vh",
      fontWeight: 400,
      lineHeight: "3.5vh",
      "@media (max-width:900px)": {
        // fontSize: "16px",
      },
      "@media (max-width:600px)": {
        fontSize: "2.1vh",
        lineHeight: "2.7vh",
      },
    },

    subtitle1: {
      fontSize: "3vh",
      fontWeight: 600,
      lineHeight: "3.9vh",
      "@media (max-width:600px)": {
        fontSize: "2.2vh",
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
      },
    },
    caption: {
      fontSize: "1.9vh",
      fontWeight: 400,
      lineHeight: "2.5vh",
      color: "#797979",
      "@media (max-width:600px)": {
        fontSize: "2.1vh",
        lineHeight: "2.8vh",
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
