import { Box, Button, Grid, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import lines from "../../../public/assets/images/static/lines.png";
import arrow from "../../../public/assets/images/static/arrow.png";
import { leagueSpartan } from "@/app/fonts";

const Hero: React.FC = () => {
  return (
    <div style={{ width: "100%" }}>
      <Typography
        sx={styles.heading}
        component={"h2"}
        className={leagueSpartan.className}
      >
        Our Verified <br /> Reviews from{" "}
        <Typography
          sx={styles.expertText}
          component="span"
          className={leagueSpartan.className}
        >
          Students{" "}
        </Typography>
        and Parents
      </Typography>
      <Typography sx={styles.desc} className={leagueSpartan.className}>
        Trusted by parents, students, and schools
      </Typography>
      <Box
        sx={{
          width: { xs: "100%", sm: "100%", md: "100%", lg: "70%" },
          marginTop: "90px",
          marginBottom: "190px",
          display: {
            xs: "flex",
            sm: "flex",
            md: "flex",
            lg: "block",
          },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={styles.containedBtn}
          className={leagueSpartan.className}
        >
          View More
        </Button>
        <Button
          variant="text"
          sx={styles.textBtn}
          className={leagueSpartan.className}
        >
          Write A Review
        </Button>
      </Box>
    </div>
  );
};

export default Hero;

const styles = {
  heading: {
    fontFamily: "League Spartan",
    fontSize: {
      xs: "40px",
      sm: "42px",
      md: "45px",
      lg: "55px",
    },
    fontWeight: 500,
    lineHeight: {
      xs: "40px",
      sm: "35px",
      md: "45px",
      lg: "65px",
    },
    width: {
      lg: "90%",
    },
    textAlign: {
      xs: "center",
      lg: "start",
    },
    marginTop: {
      xs: "30px",
    },
    color: "#000000",
  },
  expertText: {
    color: "#51B893",
    display: "inline",
    fontSize: {
      xs: "30px",
      sm: "30px",
      md: "40px",
      lg: "55px",
    },
    fontWeight: 600,
    lineHeight: {
      xs: "25px",
      sm: "35px",
      md: "45px",
      lg: "65px",
    },
    position: "relative",
    "::before": {
      //   display: "flex",
      content: "''",
      position: "absolute",
      zIndex: 10,
      right: {
        xs: 0,
        lg: 0,
      },
      top: {
        xs: -25,
        lg: -30,
      },
      backgroundImage: {
        xs: `url(${linesMobile.src})`,
        sm: `url(${linesMobile.src})`,
        md: `url(${lines.src})`,
        lg: `url(${lines.src})`,
      },
      height: {
        xs: "19px",
        sm: "19px",
        md: "43px",
        lg: "43px",
      },
      width: {
        xs: "20px",
        sm: "20px",
        md: "43px",
        lg: "43px",
      },
      backgroundPosition: "end",
      backgroundRepeat: "no-repeat",
      // animation: "swing 1s linear infinite alternate",
    },
  },
  desc: {
    fontFamily: "League Spartan",
    fontSize: {
      xs: "18px",
      sm: "14px",
      md: "18px",
      lg: "24px",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "25px",
      sm: "24px",
      md: "28px",
      lg: "34px",
    },
    textAlign: {
      xs: "center",
      lg: "start",
    },
    paddingX: {
      xs: "20px",
      lg: 0,
    },
    marginTop: {
      xs: "30px",
      lg: "10px",
    },
    color: "#000000",
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontFamily: "League Spartan",
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "18.4px",
    textAlign: "center",
    width: "50%",
    padding: "18px",
    textTransform: "none",
    borderRadius: "10px",
    letterSpacing: "-2%",

    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
      fontFamily: "League Spartan",
      fontSize: "20px",
      padding: "18px",
      letterSpacing: "-2%",

      fontWeight: 700,
      lineHeight: "18.4px",
      textAlign: "center",
      borderRadius: "10px",
    },
  },
  textBtn: {
    // boxShadow: "1px 4px 24px 0px #38B6FFB2",
    // backgroundColor: "#38B6FF",
    fontFamily: "League Spartan",
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "18.4px",
    textAlign: "center",
    width: "50%",
    padding: "18px",
    textTransform: "none",
    color: "rgba(56, 182, 255, 1)",
    ":hover": {
      //   boxShadow: "1px 4px 24px 0px #38B6FFB2",
      //   backgroundColor: "#38B6FF",
      fontFamily: "League Spartan",
      fontSize: "20px",
      padding: "18px",

      fontWeight: 700,
      lineHeight: "18.4px",
      textAlign: "center",
    },
    // "::before": {
    //   //   display: "flex",
    //   content: "''",
    //   position: "absolute",
    //   zIndex: 10,
    //   right: {
    //     xs: -100,
    //     lg: -100,
    //   },
    //   top: {
    //     xs: -25,
    //     lg: -30,
    //   },
    //   backgroundImage: {
    //     xs: `url(${arrow})`,
    //     sm: `url(${arrow})`,
    //     md: `url(${arrow})`,
    //     lg: `url(${arrow})`,
    //   },
    //   height: {
    //     xs: "132px",
    //     sm: "132px",
    //     md: "132px",
    //     lg: "132px",
    //   },
    //   width: {
    //     xs: "139px",
    //     sm: "139px",
    //     md: "139px",
    //     lg: "139px",
    //   },
    //   backgroundPosition: "end",
    //   backgroundRepeat: "no-repeat",

    //   // animation: "swing 1s linear infinite alternate",
    // },
  },
};