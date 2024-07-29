import { Box, Button, Grid, Typography } from "@mui/material";
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
      xs: "5vh",
      sm: "4.2vh",
      md: "4.3vh",
      lg: "5.5vh",
    },
    fontWeight: 500,
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
    color: "#51B893",
    display: "inline",
    fontSize: {
      xs: "3.5vh",
      sm: "4vh",
      md: "4.5vh",
      lg: "6vh",
    },
    fontWeight: 600,
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
    fontFamily: "League Spartan",
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
    fontFamily: "League Spartan",
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "24px",
    textAlign: "center",
    width: "50%",
    padding: "2vh",
    textTransform: "none",
    borderRadius: "1vh",
    letterSpacing: "-2%",
    ":hover": {
      boxShadow: "0.5vh 0.5vh 2.5vh 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
      fontFamily: "League Spartan",
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
    fontFamily: "League Spartan",
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "24px",
    textAlign: "center",
    width: "50%",
    padding: "2vh",
    textTransform: "none",
    color: "rgba(56, 182, 255, 1)",
    ":hover": {
      fontFamily: "League Spartan",
      fontSize: "2.5vh",
      padding: "2vh",
      fontWeight: 700,
      lineHeight: "2vh",
      textAlign: "center",
    },
  },
};
