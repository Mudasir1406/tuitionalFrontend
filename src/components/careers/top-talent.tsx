import { Grade } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesmobile from "../../../public/assets/images/static/linesMobile.png";
import careerTalent from "../../../public/assets/images/static/careerTalent.png";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
const TopTalent: React.FC = () => {
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12} md={7}>
        <Box
          sx={{
            height: {xs:'80%',md:"75%"},
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            marginTop: {
              xs: "70px",
              sm: "60px",
              md: "60px",
              lg: "0px",
            },
          }}
        >
          <Image
            src={careerTalent.src}
            width={careerTalent.width}
            height={careerTalent.height}
            alt="careerTalent"
            style={{ height: "auto", width: "90%" }}
          ></Image>
        </Box>
      </Grid>
      <Grid item xs={12} md={5}>
        <Box>
          <Typography
            sx={styles.heading}
            component={"h3"}
            variant="h2"
            className={leagueSpartan.className}
          >
            Why Top Talent <br />
            chooses{" "}
            <Typography
              sx={styles.expertText}
              component={"span"}
              variant="h2"
              className={leagueSpartan.className}
            >
              Tuitional
            </Typography>
          </Typography>
          <Typography
            sx={styles.desc}
            className={leagueSpartan.className}
            component={"p"}
            variant="body2"
          >
            {/* Tuitional builds products that transform experience and know-how
            into thriving businesses. We believe shared knowledge has the power
            to change lives, and by enabling people to share what they know we
            create a better world together. */}
            Tuitional helps individuals transform their experiences and
            knowledge into incredible products enabling them to thrive
            businesses. We believe shared knowledge has the power to change
            lives, and by enabling people to share what they know we can
            definitely create a better world together that is more creative and
            knowledgeable.
            <br />
            We’re on a mission to empower creators to transform their
            <br />
            knowledge and learning into income. We’re looking for talented
            individuals having diverse interests to help strengthen what we
            already do.
            {/* <br /> We’re on a mission to empower creators to transform their
            <br />
            knowledge into income. We’re looking for talented individuals with
            diverse interests to help power what we do. */}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: { xs: "center", md: "left" },
              marginTop: "40px",
            }}
          >
            <Button
              variant="contained"
              sx={styles.containedBtn}
              className={leagueSpartan.className}
            >
              Get in touch
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TopTalent;

const styles = {
  expertText: {
    color: "#009FFC",
    display: "inline",
    // fontSize: {
    //   xs: "30px",
    //   sm: "30px",
    //   md: "40px",
    //   lg: "55px",
    // },
    // fontWeight: 600,
    // lineHeight: {
    //   xs: "25px",
    //   sm: "35px",
    //   md: "45px",
    //   lg: "65px",
    // },
    position: "relative",
  },
  heading: {
    color: "#000000",
    textAlign: { xs: "center", sm: "center", md: "left" },
    // fontSize: {
    //   xs: "35px",
    //   sm: "40px",
    //   md: "55px",
    //   lg: "55px",
    // },
    // fontWeight: 700,
    // lineHeight: {
    //   xs: "45px",
    //   sm: "50px",
    //   md: "65px",
    //   lg: "65px",
    // },
    marginTop: {
      xs: "0px",
      sm: "0px",
      md: "95px",
      lg: "105px",
    },
    position: "relative",
    paddingX: {
      xs: "20px",
      sm: "20px",
      md: "20px",
      lg: "20px",
    },

    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      left: {
        // xs: 40,
        // sm: 10,
        md: -30,
        lg: -30,
      },
      top: {
        xs: -20,
        sm: -40,
        md: -30,
        lg: -50,
      },
      backgroundImage: {
        xs: `url(${linesmobile.src})`,
        sm: `url(${linesInvert.src})`,
        md: `url(${linesInvert.src})`,
        lg: `url(${linesInvert.src})`,
      },
      height: "35px",
      width: "43px",
      backgroundRepeat: "no-repeat",
      marginBottom: "20px",
    },
  },
  desc: {
    paddingX: {
      xs: "20px",
      sm: "20px",
      md: "20px",
      lg: "20px",
    },

    // fontSize: {
    //   xs: "15px",
    //   sm: "20px",
    //   md: "25px",
    //   lg: "25px",
    // },
    // fontWeight: 400,
    // lineHeight: {
    //   xs: "25px",
    //   sm: "30px",
    //   md: "40px",
    //   lg: "40px",
    // },
    width: { xs: "auto", lg: "68%" },
    color: "rgba(0,0,0,0.77)",
    marginTop: "20px",
    textAlign: {
      xs: "center",
      md: "left",
    },
  },
  percent: {
    // fontSize: {
    //   xs: "15px",
    //   sm: "20px",
    //   md: "25px",
    //   lg: "85px",
    // },
    // fontWeight: 700,
    // lineHeight: {
    //   xs: "25px",
    //   sm: "30px",
    //   md: "40px",
    //   lg: "65px",
    // },
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",

    // fontSize: "20px",
    // fontWeight: 700,
    // lineHeight: "18.4px",
    textAlign: "center",
    width: { xs: "180px", sm: "200px", md: "200px", lg: "200px" },
    padding: "18px",
    textTransform: "none",
    borderRadius: "10px",
    letterSpacing: "-2%",

    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",

      // fontSize: "20px",
      padding: "18px",
      letterSpacing: "-2%",
      // fontWeight: 700,
      // lineHeight: "18.4px",
      textAlign: "center",
      borderRadius: "10px",
    },
  },
};
