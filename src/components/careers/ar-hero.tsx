"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import lines from "../../../public/assets/images/static/lines.png";
import arrow from "../../../public/assets/images/static/arrow.png";
import { leagueSpartan } from "@/app/fonts";
import { scrollToApplyForm } from "@/utils/helper";

const ArHero: React.FC = () => {
  return (
    <Box sx={{ width: "100%", paddingBottom: { lg: "15vh" } }} dir="rtl">
      <Typography
        sx={styles.heading}
        variant="h1"
        component={"h1"}
        className={leagueSpartan.className}
      >
        دعونا نبني شيئاً
        <br />
        رائعاً{" "}
        <Typography
          sx={styles.expertText}
          component={"span"}
          variant={"h1"}
          className={leagueSpartan.className}
        >
          {" "}
          معاً{" "}
        </Typography>
      </Typography>
      <Typography
        sx={styles.desc}
        className={leagueSpartan.className}
        component={"p"}
        variant="body2"
      >
        معلمون شغوفون وتغيير الحياة
      </Typography>
      <Box
        sx={{
          width: { lg: "70%", xs: "100%" },
          marginTop: "5vh",
          marginBottom: { lg: "10vh" },
          display: { xs: "flex", lg: "block" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={styles.containedBtn}
          className={leagueSpartan.className}
          onClick={scrollToApplyForm}
        >
          تواصل معنا
        </Button>
      </Box>
    </Box>
  );
};

export default ArHero;

const styles = {
  heading: {
    width: { xs: "100%", lg: "80%" },
    textAlign: {
      xs: "center",
      lg: "start",
    } as any,
    marginTop: {
      sm: "5vh",
    },
    position: "relative",
    color: "#000000",
  },
  expertText: {
    color: "#51B893",
    display: "inline",
    position: "relative",
  },
  desc: {
    textAlign: {
      xs: "center",
      lg: "start",
    } as any,
    paddingX: {
      xs: "20px",
      lg: 0,
    },
    marginTop: {
      xs: "22px",
      lg: "10px",
    },
    color: "#000000",
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    textAlign: "center",
    width: "50%",
    padding: "2vh",
    textTransform: "none",
    borderRadius: "10px",
    letterSpacing: "-2%",
    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
    },
  },
};