import React from "react";
import Footer from "../footer-wrapper";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "../../../public/assets/images/static/logo.png";
import { leagueSpartan } from "@/app/fonts";
const FoundPage = () => {
  return (
    <>
      <Box>
        <Box
          sx={{
            padding: "3vh 9vh",
          }}
        >
          <Image src={Logo} alt="" />
        </Box>
        <Typography
          className={leagueSpartan.className}
          sx={{
            fontSize: "9vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#38B6FF",
            height: "85vh",
            fontWeight: "600",
          }}
        >
          Page Not Found
        </Typography>
      </Box>
      <Footer />
    </>
  );
};
export default FoundPage;
