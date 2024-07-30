import { leagueSpartan } from "@/app/fonts";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import globe from "../../../public/assets/images/svg/globe.svg";
import hat from "../../../public/assets/images/svg/hat.svg";
const LearnTogeather: React.FC = () => {
  return (
    <Box sx={styles.contanier}>
      <Image
        src={hat}
        alt="hat"
        priority
        style={{ position: "absolute", left: "11%", top: "-10%" }}
      />

      <Typography sx={styles.learn} className={leagueSpartan.className}>
        Let’s Learn Together
      </Typography>
      <Typography
        sx={[styles.learn, { color: "rgba(56, 182, 255, 1)" }]}
        className={leagueSpartan.className}
      >
        Anywhere & Everywhere
      </Typography>
      <Image
        src={globe}
        alt="globe"
        priority
        style={{ position: "absolute", right: "27%", top: "25%" }}
      />
    </Box>
  );
};

export default LearnTogeather;

const styles = {
  learn: {
    fontSize: {
      xs: "40px",
      sm: "50px",
      md: "85px",
      lg: "85px",
    },
    fontWeight: 700,
    lineHeight: {
      xs: "50px",
      sm: "55px",
      md: "100px",
      lg: "100px",
    },
    textAlign: {
      xs: "center",
      sm: "center",
      md: "center",
      lg: "start",
    },
  },
  contanier: {
    background: "#D7F0FF",
    position: "relative",
  },
  hat: {
    position: "absolute",
  },
};
