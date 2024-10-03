import { leagueSpartan } from "@/app/fonts";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const SectionsBox = () => {
  return (
    <>
      <Box
        sx={{
          margin: {
            xs: "6vh 0 0 0",
            lg: "0",
          },
        }}
      >
        <Box sx={style.boxsection}>
          <Typography
            className={leagueSpartan.className}
            sx={{
              fontSize: {
                xs: "2vh",
                lg: "3vh",
              },
              fontWeight: {
                xs: "auto",
                lg: "700",
              },
              textAlign: "start",
              paddingX: {
                xs: "2vh",
                lg: "0",
              },
              // width: {
              //   sm: "60%",
              //   lg: "45%",
              //   xs: "63%",
              // },
            }}
            component={"h1"}
          >
            Join Live Interactive Online Classes with Our Certified Tutors!
          </Typography>
          <Box>
            <Button
              variant="contained"
              sx={style.containedBtn}
              className={leagueSpartan.className}
            >
              Book a Demo
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SectionsBox;

const style = {
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
      xs: "1vh",
      lg: "0",
    },
    gap: "2vh",
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontSize: {
      xs: "1.5vh",
      lg: "2vh",
    },
    fontWeight: 700,
    paddingY: {
      xs: "1vh",
      lg: "10px",
    },
    textTransform: "none",
    borderRadius: "10px",
    width: {
      xs: "100%",
      sm: "100%",
      md: "100%",
      lg: "auto",
    },
    transition: "all .5s ease-in-out",
    ":hover": {
      backgroundColor: "#38B6FF",
      transform: "scale(1.05)",

      boxShadow: "1px 4px 24px 0px #38B6FFB2",
    },
  },
};
