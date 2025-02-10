"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import lines from "../../../public/assets/images/static/lines.png";
import arrow from "../../../public/assets/images/static/arrow.png";
import { leagueSpartan } from "@/app/fonts";
import { scrollToApplyForm } from "@/utils/helper";

const Hero: React.FC = () => {
  return (
    <Box sx={{ width: "100%", paddingBottom: { lg: "15vh" } }}>
      <Typography
        sx={styles.heading}
        variant="h1"
        component={"h1"}
        className={leagueSpartan.className}
      >
        Let’s build something
        <br />
        awesome{" "}
        <Typography
          sx={styles.expertText}
          component={"span"}
          variant={"h1"}
          className={leagueSpartan.className}
        >
          {" "}
          together{" "}
        </Typography>
      </Typography>
      <Typography
        sx={styles.desc}
        className={leagueSpartan.className}
        component={"p"}
        variant="body2"
      >
        Passionate Educators And Change Lives
      </Typography>
      <Box
        sx={{
          width: { lg: "70%", xs: "100%" },
          marginTop: "5vh",
          marginBottom: { lg: "10vh" },
          display: { xs: "flex", lg: "block" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={styles.containedBtn}
          className={leagueSpartan.className}
          onClick={scrollToApplyForm}
        >
          Get in touch
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;

const styles = {
  heading: {
    // fontSize: {
    //   xs: "4vh",
    //   sm: "5.2vh",
    //   md: "5.3vh",
    //   lg: "5.4vh",
    // },
    // fontWeight: 500,
    // lineHeight: {
    //   xs: "5vh",
    //   sm: "4.5vh",
    //   md: "5.5vh",
    //   lg: "6vh",
    // },
    width: { xs: "100%", lg: "80%" },
    textAlign: {
      xs: "center",
      lg: "start",
    },
    marginTop: {
      // xs: "9vh",
      sm: "5vh",
    },

    position: "relative",
    color: "#000000",
    "::before": {
      //   display: "flex",
      content: "''",
      position: "absolute",
      zIndex: 10,
      right: {
        xs: 0,
        sm: "20vw",
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
  expertText: {
    color: "#51B893",
    display: "inline",

    position: "relative",
  },
  desc: {
    textAlign: {
      xs: "center",
      lg: "start",
    },
    paddingX: {
      xs: "20px",
      lg: 0,
    },
    marginTop: {
      xs: "22px",
      lg: "10px",
    },
    color: "#000000",
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",

    // fontSize: "2vh",
    // fontWeight: 700,
    // lineHeight: "2vh",
    textAlign: "center",
    width: "50%",
    padding: "2vh",
    textTransform: "none",
    borderRadius: "10px",
    letterSpacing: "-2%",

    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
    },
  },
  textBtn: {
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "18.4px",
    textAlign: "center",
    width: "50%",
    padding: "18px",
    textTransform: "none",
    color: "rgba(56, 182, 255, 1)",
    ":hover": {
      fontSize: "20px",
      padding: "18px",

      fontWeight: 700,
      lineHeight: "18.4px",
      textAlign: "center",
    },
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      right: {
        xs: -100,
        lg: -100,
      },
      top: {
        xs: -25,
        lg: -30,
      },
      backgroundImage: {
        xs: `url(${arrow})`,
        sm: `url(${arrow})`,
        md: `url(${arrow})`,
        lg: `url(${arrow})`,
      },
      height: {
        xs: "132px",
        sm: "132px",
        md: "132px",
        lg: "132px",
      },
      width: {
        xs: "139px",
        sm: "139px",
        md: "139px",
        lg: "139px",
      },
      backgroundPosition: "end",
      backgroundRepeat: "no-repeat",
    },
  },
};
