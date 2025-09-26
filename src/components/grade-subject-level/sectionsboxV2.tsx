import { leagueSpartan } from "@/app/fonts";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import PopUpButtonV2 from "../pop-up-buttonV2";

const SectionsBoxV2 = () => {
  return (
    <>
      <Box sx={style.boxsection}>
        <Typography
          className={leagueSpartan.className}
          sx={style.inner}
          variant="subtitle2"
          component={"p"}
        >
          Join Live Interactive Online Classes with Our Certified Tutors!
        </Typography>
        <PopUpButtonV2 sx={style.containedBtn} text="Book a Demo" href="popup" />
      </Box>
    </>
  );
};

export default SectionsBoxV2;

const style = {
  contanier: {},
  inner: {
    fontSize: {
      xs: "14px",
      sm: "15px",
      md: "16px",
      lg: "18px",
    },
    fontWeight: {
      xs: 600,
      lg: 700,
    },
    textAlign: "center",
    lineHeight: 1.4,
  },
  boxsection: {
    borderRadius: "1.5vh",
    background: "#E7F6FF",
    boxShadow:
      "0px 2px 1px 0px rgba(0, 0, 0, 0.05), 0px -3px 8px 0px rgba(56, 182, 255, 0.20)",
    backdropFilter: "blur(5px)",
    height: {
      xs: "8vh",
      lg: "12vh",
    },
    display: "flex",
    alignItems: "center",
    flexDirection: {
      xs: "row",
      lg: "row",
    },
    justifyContent: "center",
    paddingX: {
      xs: "16px",
      sm: "20px",
      md: "24px",
      lg: "24px",
    },
    gap: {
      xs: "16px",
      sm: "20px",
      md: "24px",
      lg: "32px",
    },
    marginY: {
      xs: "16px",
      lg: 0,
    },
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    color: "white",
    // fontSize: {
    //   xs: "1.5vh",
    //   lg: "2vh",
    // },
    // fontWeight: 700,
    paddingY: {
      xs: "1vh",
      lg: "10px",
    },
    textTransform: "none",
    borderRadius: "10px",
    width: "auto",
    minWidth: {
      xs: "120px",
      sm: "140px",
      md: "160px",
    },
    transition: "all .5s ease-in-out",
    ":hover": {
      backgroundColor: "#38B6FF",
      transform: "scale(1.05)",

      boxShadow: "1px 4px 24px 0px #38B6FFB2",
    },
  },
};