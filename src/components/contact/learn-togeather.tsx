import { leagueSpartan } from "@/app/fonts";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import globe from "../../../public/assets/images/svg/globe.svg";
import hat from "../../../public/assets/images/svg/hat.svg";
import zIndex from "@mui/material/styles/zIndex";
const LearnTogeather: React.FC = () => {
  return (
    <Box sx={styles.contanier}>
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
          Let’s Learn Together
        </Typography>
        <Typography
          sx={[styles.learn, { color: "rgba(56, 182, 255, 1)" }]}
          className={leagueSpartan.className}
          component={"h1"}
          variant="h1"
        >
          Anywhere & Everywhere
        </Typography>
      </Box>

      <Image
        src={globe}
        alt="globe"
        priority
        height={100}
        // style={{ position: "absolute", right: "0%", top: "0%" }}
      />
    </Box>
  );
};

export default LearnTogeather;

const styles = {
  learn: {
    position: "relative",

    // fontSize: {
    //   xs: "40px",
    //   sm: "50px",
    //   md: "85px",
    //   lg: "85px",
    // },
    // fontWeight: 700,
    // lineHeight: {
    //   xs: "50px",
    //   sm: "55px",
    //   md: "100px",
    //   lg: "100px",
    // },
    textAlign: {
      xs: "center",
      sm: "center",
      md: "center",
      lg: "start",
    },
  },
  contanier: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center",
    justifyContent: { xs: "center", lg: "left" },
    background: "#D7F0FF",
    width: {
      xs: "100%",
      lg: "60vw",
    },
  },
  contanierText: {},
  hat: {
    zIndex:22,
    position: "absolute",
    left: { xs: "30%", md: "33%" ,lg:'9%'},
    top: { xs: "11%", md: "22%" ,lg: "26%" },

    // style={{ position: "absolute", left: "6%", top: "-17%" }}
  },
};
