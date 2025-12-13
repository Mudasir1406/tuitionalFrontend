import { leagueSpartan } from "@/app/fonts";
import { Box, Typography } from "@mui/material";
import React from "react";
import PopUpButton from "../pop-up-button";

const ArSectionsBox = () => {
  return (
    <>
      <Box sx={style.boxsection}>
        <Typography
          className={leagueSpartan.className}
          sx={style.inner}
          variant="subtitle2"
          component={"p"}
        >
          انضم إلى فصول تفاعلية مباشرة عبر الإنترنت مع مدرسينا المعتمدين!
        </Typography>
        <PopUpButton sx={style.containedBtn} text="احجز تجربة مجانية" href="popup" />
      </Box>
    </>
  );
};

export default ArSectionsBox;

const style = {
  inner: {
    textAlign: "start" as const,
    paddingX: {
      lg: "0",
    },
    direction: "rtl" as const,
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
      xs: "3vw",
      sm: "3vw",
      lg: "0",
    },
    gap: "2vh",
    marginY: {
      xs: "16px",
      lg: 0,
    },
    direction: "rtl" as const,
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    color: "white",
    paddingY: {
      xs: "1vh",
      lg: "10px",
    },
    textTransform: "none" as const,
    borderRadius: "10px",
    width: {
      xs: "50%",
      sm: "20%",
      md: "20%",
      lg: "20%",
    },
    transition: "all .5s ease-in-out",
    ":hover": {
      backgroundColor: "#38B6FF",
      transform: "scale(1.05)",
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
    },
  },
};