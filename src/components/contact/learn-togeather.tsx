import { leagueSpartan } from "@/app/fonts";
import { Box, Typography } from "@mui/material";
import React from "react";

const LearnTogeather: React.FC = () => {
  return (
    <Box sx={styles.contanier}>
      <Typography sx={styles.learn} className={leagueSpartan.className}>
        Let’s Learn Together
      </Typography>
      <Typography
        sx={[styles.learn, { color: "rgba(56, 182, 255, 1)" }]}
        className={leagueSpartan.className}
      >
        Anywhere & Everywhere
      </Typography>
    </Box>
  );
};

export default LearnTogeather;

const styles = {
  learn: {
    fontFamily: "League Spartan",
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
  },
};
