import { leagueSpartan } from "@/app/fonts";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import PopUpButton from "../pop-up-button";

const SectionsBox = () => {
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
        <PopUpButton sx={style.containedBtn} text="Book a Demo" href="popup" />
      </Box>
    </>
  );
};

export default SectionsBox;

const style = {
  contanier: {},
  inner: {
    fontSize: {
      xs: "2.5vh",
      sm: "2.8vh",
      md: "3vh",
      lg: "3vh",
    },
    fontWeight: {
      xs: 600,
      lg: 700,
    },
    textAlign: {
      xs: "center",
      sm: "center",
      md: "center",
      lg: "left",
    },
    lineHeight: {
      xs: 1.4,
      lg: 1.3,
    },
    flex: 1,
    paddingX: {
      xs: 0,
      lg: "0",
    },
  },
  boxsection: {
    borderRadius: {
      xs: "12px",
      lg: "1.5vh",
    },
    background: "#E7F6FF",
    boxShadow:
      "0px 2px 1px 0px rgba(0, 0, 0, 0.05), 0px -3px 8px 0px rgba(56, 182, 255, 0.20)",
    backdropFilter: "blur(5px)",
    minHeight: {
      xs: "auto",
      sm: "10vh",
      lg: "12vh",
    },
    padding: {
      xs: "16px",
      sm: "20px 24px",
      lg: "0 24px",
    },
    display: "flex",
    alignItems: "center",
    flexDirection: {
      xs: "column",
      sm: "column",
      md: "column",
      lg: "row",
    },
    justifyContent: "space-between",
    gap: {
      xs: "12px",
      sm: "16px",
      lg: "2vh",
    },
    marginY: {
      xs: "16px",
      lg: 0,
    },
    marginX: {
      xs: "16px",
      sm: "0",
    },
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    color: "white",
    fontSize: {
      xs: "2vh",
      sm: "2vh",
      md: "2vh",
      lg: "2vh",
    },
    fontWeight: {
      xs: 600,
      lg: 700,
    },
    padding: {
      xs: "10px 20px",
      sm: "12px 24px",
      lg: "14px 28px",
    },
    textTransform: "none",
    borderRadius: {
      xs: "8px",
      lg: "10px",
    },
    width: {
      xs: "100%",
      sm: "auto",
      md: "auto",
      lg: "auto",
    },
    minWidth: {
      sm: "140px",
      lg: "160px",
    },
    whiteSpace: "nowrap",
    transition: "all .3s ease-in-out",
    ":hover": {
      backgroundColor: "#2563eb",
      transform: "scale(1.02)",
      boxShadow: "1px 6px 28px 0px #38B6FFB2",
    },
  },
};
