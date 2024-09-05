import { Box } from "@mui/material";
import React from "react";

const HeroInfo = () => {
  return (
    <>
      <Box sx={styles.container}></Box>
    </>
  );
};

export default HeroInfo;
const styles = {
  container: {
    width: "100%",
    height: {
      xs: "55vh",
      sm: "80vh",
      md: "60vh",
      lg: "80vh",
    },
    marginTop: {
      xs: "2.5vh",
      sm: "0vh",
      md: "1.5vh",
      lg: "1vh",
    },
    position: "relative",
  },
};
