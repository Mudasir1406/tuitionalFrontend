import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import stars from "../../../public/assets/images/svg/stars.svg";
import star from "../../../public/assets/images/svg/Truststar.svg";
import Image from "next/image";
const Hero: React.FC = () => {
  return (
    <Box sx={{ height: "80vh" }}>
      <Box sx={styles.TextBox}>
        <Typography
          sx={styles.heading}
          component={"h2"}
          className={leagueSpartan.className}
        >
          Everything you need to know about IGCSE Maths
        </Typography>
        <Typography sx={styles.desc} className={leagueSpartan.className}>
          Lorem ipsum dolor sit amet consectetur. Nam amet vitae accumsan
          sodales tempus pellentesque tellus. Ac aliquam placerat arcu sed urna
          tortor purus. Est nibh leo.
        </Typography>
      </Box>

      <Box sx={styles.BtnBox}>
        <Box>
          <Button variant="contained" sx={styles.containedBtn}>
            Get in touch
          </Button>
        </Box>
        <Box>
          <Image src={stars} alt="stars" style={{ height: "6vh", }} />
        </Box>
        <Box>
          <Image src={star} alt="stars" style={{ height: "6vh", }} />
        </Box>
      </Box>
    </Box>
  );
};
export default Hero;
const styles = {
  TextBox: {
    width: {
      xs: "100%",
      sm: "100%",
      ms: "100%",
      lg: "74%",
    },
    textAlign: {
      xs: "center",
      sm: "center",
      lg: "start",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  BtnBox: {
    display: "flex",
    flexDirection: {
      xs: "column", // Column layout on mobile
      sm: "row", // Row layout on larger screens (sm, md, lg)
    },
    justifyContent: {
      xs: "center", // Center content horizontally on mobile
      sm: "flex-start", // Align to start on larger screens
    },
    alignItems: "center", // Center content vertically
    width: "100%",
    gap: "1rem", // Add space between the button and images
  },

  heading: {
    fontSize: {
      xs: "5.7vh",
      sm: "6.5vh",
      md: "5.3vh",
      lg: "7.1vh",
    },
    fontWeight: 800,
    lineHeight: {
      xs: "5.5vh",
      sm: "6.5vh",
      md: "5.5vh",
      lg: "9vh",
    },
    marginTop: {
      xs: "3vh",
      sm: "3vh",
      md: "3vh",
      lg: "10vh",
    },
    color: "#000000",
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
      lg: "4vh",
    },
    textAlign: {
      xs: "justify", // Center text on mobile
      lg: "justify", // Justify text on larger screens
    },
    marginTop: "2vh", // Add spacing between heading and description
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontSize: "2vh",
    fontWeight: 700,
    paddingY: "2vh",
    marginY: "2vh",
    paddingX: "4vh",
    textTransform: "none",
    borderRadius: "10px",
    width: {
      xs: "100%", // Full width on mobile
      sm: "100%",
      md: "100%",
      lg: "100%", // Auto width on larger screens
    },
    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
      width: {
        xs: "100%", // Full width on hover for mobile
        lg: "100%", // Full width on hover for laptop
      },
    },
  },
};
