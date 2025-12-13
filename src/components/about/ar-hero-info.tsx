import { Box, Typography, colors } from "@mui/material";
import tutors from "../../../public/assets/images/static/about-hero-2.png";
import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

const ArHeroInfo: React.FC = () => {
  return (
    <>
      <Box sx={style.contanier}>
        <Box sx={style.liveSessions}>
          <Image
            src={tutors.src}
            alt="معلم"
            width={tutors.width}
            height={tutors.height}
            className={styles.animatedImg}
          />
        </Box>
      </Box>
    </>
  );
};

export default ArHeroInfo;

const style = {
  contanier: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start", // Changed for RTL
    width: "100%",
    height: {
      xs: "100%",
      sm: "100%",
      md: "100%",
      lg: "100%",
    },
    marginTop: {
      sm: 15,
      md: 15,
      lg: 0,
    },
    position: "relative",
    direction: "rtl",
  },
  liveSessions: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    gap: "2vh",
    marginTop: "-100px",
    marginLeft: "80px", // Changed from marginRight for RTL
    animation: "bounce 6s ease-in-out infinite",
  },
  image: {
    objectFit: "contain",
  },
};