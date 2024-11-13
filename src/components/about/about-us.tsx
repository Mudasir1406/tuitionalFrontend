import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import success from "../../../public/assets/images/svg/success.svg";
import certificate from "../../../public/assets/images/svg/certificate.svg";
import equality from "../../../public/assets/images/svg/equality.svg";
import ethics from "../../../public/assets/images/svg/ethics.svg";
import growth from "../../../public/assets/images/svg/growth.svg";
import handshake from "../../../public/assets/images/svg/handshake.svg";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";

const AboutUs: React.FunctionComponent = () => {
  return (
    <Box sx={{ marginBottom: 20 }}>
      <Box sx={styles.headingContanier}>
        <Typography
          sx={styles.mainHeading}
          component={"h1"}
          className={leagueSpartan.className}
        >
          About Us
        </Typography>
        <Typography
          sx={styles.dec}
          component={"p"}
          className={leagueSpartan.className}
        >
          Tuitional is a premier online tutoring platform that elevates
          students' learning and provides an exceptional educational experience
          across the Gulf region. Licensed and registered by the Sharjah
          Research and Technology Park in 2022, Tuitional was founded with a
          visionary goal led by Ahmed Shaheer, Mirza Sinan Baig, Abdul Wahid
          Sheikh, Sheikh Zeeshan Ahmed, and Juliana Nogueria. Together, they
          aspired to create a state-of-the-art online tutoring service focused
          on delivering personalized, high-quality education tailored to
          individual students' needs. With a qualified team of expert tutors
          excelling in a wide range of subjects, Tuitional provides customized
          learning experiences through high-quality, personalized online
          tutoring sessions that cater to each student's unique learning needs
          and academic goals. Tuitional is known for its commitment to
          innovation, excellence, and quality education, empowering students to
          reach their highest potential. Through unwavering academic support,
          interactive and engaging lessons, and a solid educational foundation,
          we help students achieve both academic and future professional
          success.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "left",
          rowGap: "16px",

        }}
      >
        <Button variant="contained" sx={styles.roundedActiveButton}>
          Our Mission
        </Button>
        <Button variant="contained" sx={styles.roundedButton}>
          Our Value
        </Button>
      </Box>
    </Box>
  );
};

export default AboutUs;

const styles = {
  infoBoxContanier: {},

  heading: {
    fontSize: {
      xs: "18px",
      sm: "23px",
      md: "28px",
      lg: "35px",
    },
    fontWeight: 500,
    lineHeight: {
      xs: "16px",
      sm: "20px",
      md: "25px",
      lg: "35px",
    },
    marginBottom: { xs: "10px", sm: "15px", md: "18px", lg: "22px" },
    textAlign: "center",
  },
  dec: {
    fontSize: {
      xs: "12px",
      sm: "16px",
      md: "18px",
      lg: "20px",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "15px",
      sm: "20px",
      md: "25px",
      lg: "30px",
    },
    textAlign: "center",
    // maxWidth: { xs: "160px", sm: "200px", md: "250px", lg: "300px" },
    color: "rgba(0,0,0,0.77)",
  },
  icon: {
    width: { xs: "45px", sm: "55px", md: "75px", lg: "115px" },
    height: { xs: "45px", sm: "55px", md: "75px", lg: "115px" },
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "60px",

    boxShadow:
      " 0px -2px 4px 0px #0000005C inset, 0px 4px 12.6px 0px #009BF526",
    marginBottom: { xs: "10px", sm: "20px", md: "30px", lg: "40px" },
  },
  mainHeading: {
    display: "flex",
    fontSize: {
      xs: "35px",
      sm: "40px",
      md: "45px",
      lg: "55px",
    },
    lineHeight: {
      xs: "50px",
      sm: "55px",
      md: "60px",
      lg: "65px",
    },
    fontWeight: 600,
    marginTop: {
      xs: "40px",
      sm: "50px",
      md: "70px",
      lg: "105px",
    },
    marginBottom: "20px",
    position: "relative",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
    "::before": {
      content: "''",
      position: "absolute",
      // zIndex: 10,
      backgroundImage: {
        xs: `url(${linesMobile.src})`,
        sm: `url(${linesInvert.src})`,
        md: `url(${linesInvert.src})`,
        lg: `url(${linesInvert.src})`,
      },
      height: {
        xs: "19px",
        sm: "35px",
        md: "35px",
        lg: "35px",
      },
      width: {
        xs: "20px",
        sm: "43px",
        md: "43px",
        lg: "43px",
      },

      backgroundRepeat: "no-repeat",
      top: {
        xs: -12,
        sm: -35,
        md: -35,
        lg: -35,
      },
      left: {
        xs: "11%",
        sm: "-6%",
        md: "-6%",
        lg: "-6%",
      },
    },
  },
  headingContanier: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    background: "transparent",
  },
  roundedActiveButton: {
    backgroundColor: "#38B6FF",
    borderRadius: "50px",
    color: "white",
    fontWeight: {
      xs: "medium",
      sm: "medium",
      md: "semiBold",
      lg: "semiBold",
    },
    textTransform: "none",

    // fontSize: {
    //   xs: "14px",
    //   sm: "16px",
    //   md: "18px",
    //   lg: "14px",
    // },
  },
  roundedButton: {
    backgroundColor: "white",
    borderRadius: "50px",
    color: "black",
    fontWeight: {
      xs: "medium",
      sm: "medium",
      md: "semiBold",
      lg: "semiBold",
    },
    border: "1px solid #38B6FF",
    textTransform: "none",
  },
};
