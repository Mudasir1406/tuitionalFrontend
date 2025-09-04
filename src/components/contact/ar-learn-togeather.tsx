import { leagueSpartan } from "@/app/fonts";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import globe from "../../../public/assets/images/svg/globe.svg";
import hat from "../../../public/assets/images/svg/hat.svg";

const ArLearnTogeather: React.FC = () => {
  return (
    <Box sx={styles.contanier} dir="rtl">
      <Box sx={styles.contanierText}>
        <Box sx={styles.hat}>
          <Image src={hat} alt="hat" priority width={70} />
        </Box>

        <Typography
          sx={styles.learn}
          className={leagueSpartan.className}
          component={"h1"}
          variant="h1"
        >
          لنتعلم معاً
        </Typography>
        <Typography
          sx={[styles.learn, { color: "rgba(56, 182, 255, 1)" }]}
          className={leagueSpartan.className}
          component={"h1"}
          variant="h1"
        >
          في أي مكان وكل مكان
        </Typography>
      </Box>

      <Image
        src={globe}
        alt="globe"
        priority
        height={100}
      />
    </Box>
  );
};

export default ArLearnTogeather;

const styles = {
  learn: {
    position: "relative",
    textAlign: {
      xs: "center",
      sm: "center",
      md: "center",
      lg: "right", // Changed from start to right for RTL
    },
  },
  contanier: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center",
    justifyContent: { xs: "center", lg: "right" }, // Changed from left to right for RTL
    background: "#D7F0FF",
    width: {
      xs: "100%",
      lg: "60vw",
    },
  },
  contanierText: {},
  hat: {
    zIndex: 22,
    position: "absolute",
    right: { xs: "30%", md: "33%", lg: "9%" }, // Changed from left to right for RTL
    top: { xs: "11%", md: "22%", lg: "26%" },
  },
};