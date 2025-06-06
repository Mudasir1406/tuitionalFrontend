import { Box, Typography, colors } from "@mui/material";
import tutors from "../../../public/assets/images/static/about-hero-2.png";
import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

const HeroInfo: React.FC = () => {
  return (
    <>
      <Box sx={style.contanier}>
        <Box sx={style.liveSessions}>
          <Image
            src={tutors.src}
            // style={{ width: "150px" }}
            alt="teacher"
            width={tutors.width}
            height={tutors.height}
            className={styles.animatedImg}
          ></Image>
        </Box>
      </Box>
    </>
  );
};

export default HeroInfo;

const style = {
  contanier: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    width: "100%",
    height: {
      // xs: "250px",
      xs: "100%",
      sm: "100%",
      // sm: "300px",
      md: "100%",
      lg: "100%",
    },
    marginTop: {
      // xs: 15,
      sm: 15,
      md: 15,
      lg: 0,
    },
    position: "relative",
  },

  liveSessions: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    gap: "2vh",
    marginTop: "-100px",
    marginRight: "80px",
    animation: "bounce 6s ease-in-out infinite",
  },
  image: {
    objectFit: "contain",
  },
};
