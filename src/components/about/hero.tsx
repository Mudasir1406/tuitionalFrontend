import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import lines from "../../../public/assets/images/static/lines.png";
import arrow from "../../../public/assets/images/static/arrow.png";
import { leagueSpartan } from "@/app/fonts";

const Hero: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          height: { lg: "65vh" },
          // paddingLeft: "5vw",
        }}
      >
        <Typography
          sx={styles.heading}
          component={"h1"}
          className={leagueSpartan.className}
        >
          Elevating{" "}
          <Typography
            sx={styles.expertText}
            component="span"
            className={leagueSpartan.className}
          >
            Personalized Online Tutoring{" "}
          </Typography>{" "}
          Accross the Gulf
        </Typography>

        <Typography
          sx={styles.desc}
          component="p"
          className={leagueSpartan.className}
        >
          Providing high-quality innovative and improved teaching solutions to
          help students attain academic growth and excellence through individual
          online tutoring.
        </Typography>

        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "100%", lg: "70%" },
            marginTop: "9vh",
            marginBottom: "19vh",
            display: {
              xs: "flex",
              sm: "flex",
              md: "flex",
              lg: "block",
            },
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Box>
      </Box>
    </>
  );
};

export default Hero;

const styles = {
  heading: {
    fontSize: {
      xs: "5vh",
      sm: "4.2vh",
      md: "4.3vh",
      lg: "5.5vh",
    },
    fontWeight: "bold",
    lineHeight: {
      xs: "5vh",
      sm: "4.5vh",
      md: "5.5vh",
      lg: "6vh",
    },
    width: {
      lg: "90%",
    },
    textAlign: {
      xs: "center",
      lg: "start",
    },
    marginTop: {
      xs: "3vh",
    },
    color: "#000000",
  },
  expertText: {
    color: "#38B6FF",
    display: "inline",
    fontSize: {
      xs: "3.5vh",
      sm: "4vh",
      md: "4.5vh",
      lg: "6vh",
    },
    fontWeight: "bold",
    lineHeight: {
      xs: "3vh",
      sm: "3.5vh",
      md: "5vh",
      lg: "8vh",
    },
    position: "relative",
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      right: {
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
      backgroundPosition: "end",
      backgroundRepeat: "no-repeat",
    },
  },
  desc: {
    fontSize: {
      xs: "2.5vh",
      sm: "2vh",
      md: "2.5vh",
      lg: "2.6vh",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "2.5vh",
      sm: "2.4vh",
      md: "2.8vh",
      lg: "3.4vh",
    },
    textAlign: {
      xs: "center",
      lg: "start",
    },
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
    fontSize: "2.5vh",
    fontWeight: 700,
    lineHeight: "2vh",
    textAlign: "center",
    width: "50%",
    padding: "2vh",
    textTransform: "none",
    borderRadius: "1vh",
    letterSpacing: "-2%",
    ":hover": {
      boxShadow: "0.5vh 0.5vh 2.5vh 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
      fontSize: "2.5vh",
      padding: "2vh",
      letterSpacing: "-2%",
      fontWeight: 700,
      lineHeight: "2vh",
      textAlign: "center",
      borderRadius: "1vh",
    },
  },
  textBtn: {
    fontSize: "2.5vh",
    fontWeight: 700,
    lineHeight: "2vh",
    textAlign: "center",
    width: "50%",
    padding: "2vh",
    textTransform: "none",
    color: "rgba(56, 182, 255, 1)",
    ":hover": {
      fontSize: "2.5vh",
      padding: "2vh",
      fontWeight: 700,
      lineHeight: "2vh",
      textAlign: "center",
    },
  },
};
