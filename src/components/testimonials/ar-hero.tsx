"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import lines from "../../../public/assets/images/static/lines.png";
import { leagueSpartan } from "@/app/fonts";

import { redirectToTrustpilot, scrollToTestimonials } from "@/utils/helper";

const ArHero: React.FC = () => {
  return (
    <div style={{ width: "100%" }} dir="rtl">
      <Typography
        sx={styles.heading}
        component={"h1"}
        variant="h1"
        className={leagueSpartan.className}
      >
        آراء معتمدة من <br /> طلابنا و{" "}
        <Typography
          sx={styles.expertText}
          variant="h1"
          className={leagueSpartan.className}
        >
          أولياء الأمور{" "}
        </Typography>
      </Typography>
      <Typography
        sx={styles.desc}
        className={leagueSpartan.className}
        component={"p"}
        variant="body2"
      >
        موثوقون من قبل أولياء الأمور والطلاب والمدارس
      </Typography>
      <Box
        sx={{
          width: { xs: "100%", sm: "100%", md: "100%", lg: "70%" },
          marginTop: { xs: "3vh", lg: "9vh" },
          marginBottom: { lg: "19vh" },
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
          onClick={scrollToTestimonials}
        >
          عرض المزيد
        </Button>
        <Button
          variant="text"
          sx={styles.textBtn}
          className={leagueSpartan.className}
          onClick={redirectToTrustpilot}
        >
          اكتب تقييماً
        </Button>
      </Box>
    </div>
  );
};

export default ArHero;

const styles = {
  heading: {
    width: {
      lg: "90%",
    },
    textAlign: {
      xs: "center",
      lg: "start",
    } as any,
    marginTop: {
      xs: "3vh",
    },
    color: "#000000",
  },
  expertText: {
    color: "#51B893",
    display: "inline",
    position: "relative",
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      left: { // Changed from right for RTL
        xs: 0,
        lg: 0,
      },
      top: {
        xs: "-2.5vh",
        lg: "-3vh",
      },
      backgroundImage: {
        xs: `url(${linesMobile.src})`,
        sm: `url(${linesMobile.src})`,
        md: `url(${lines.src})`,
        lg: `url(${lines.src})`,
      },
      height: {
        xs: "1.9vh",
        sm: "1.9vh",
        md: "4.3vh",
        lg: "4.3vh",
      },
      width: {
        xs: "2vh",
        sm: "2vh",
        md: "4.3vh",
        lg: "4.3vh",
      },
      backgroundPosition: "start", // Changed from end for RTL
      backgroundRepeat: "no-repeat",
    },
  },
  desc: {
    textAlign: {
      xs: "center",
      lg: "start",
    } as any,
    paddingX: {
      xs: "2vh",
      lg: 0,
    },
    marginTop: {
      xs: "3vh",
      lg: "1vh",
    },
    color: "#000000",
  },
  containedBtn: {
    boxShadow: "0.5vh 0.5vh 2.5vh 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    textAlign: "center",
    width: "50%",
    padding: "2vh",
    textTransform: "none",
    borderRadius: "1vh",
    letterSpacing: "-2%",
    ":hover": {
      boxShadow: "0.5vh 0.5vh 2.5vh 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
      padding: "2vh",
      letterSpacing: "-2%",
      textAlign: "center",
      borderRadius: "1vh",
    },
  },
  textBtn: {
    textAlign: "center",
    width: "50%",
    padding: "2vh",
    textTransform: "none",
    color: "rgba(56, 182, 255, 1)",
    ":hover": {
      padding: "2vh",
      fontWeight: 700,
      textAlign: "center",
    },
  },
};