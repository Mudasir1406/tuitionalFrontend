import { Box, Typography } from "@mui/material";
import React from "react";
import { leagueSpartan } from "@/app/fonts";

const ArAboutHero = () => {
  return (
    <Box sx={styles.hero}>
      <Typography sx={styles.heading} component={"h1"} variant="h1" className={leagueSpartan.className}>
        من نحن
      </Typography>
      <Typography sx={styles.desc} component={"p"} variant="body2" className={leagueSpartan.className}>
        تيوشنال هي منصة تعليمية رائدة عبر الإنترنت تقدم تدريساً شخصياً عالي الجودة
        للطلاب في منطقة الخليج. نحن ملتزمون بتوفير تجربة تعليمية متميزة تساعد الطلاب
        على تحقيق أهدافهم الأكاديمية والوصول إلى إمكاناتهم الكاملة.
      </Typography>
    </Box>
  );
};

export default ArAboutHero;

const styles = {
  hero: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    maxHeight: "700px",
    direction: "rtl",
  },
  heading: {
    width: {
      lg: "90%",
    },
    textAlign: {
      xs: "center",
      lg: "start",
    },
    marginTop: {
      xs: "2vh",
      sm: "3vh",
      md: "4vh",
    },
    color: "#000000",
    fontSize: {
      xs: "32px",
      sm: "36px",
      md: "40px",
      lg: "3.5rem",
    },
    fontWeight: 700,
  },
  desc: {
    textAlign: {
      xs: "center",
      lg: "start",
    },
    paddingX: {
      xs: "2vh",
      lg: "0vh",
    },
    marginTop: {
      xs: "3vh",
      sm: "4vh",
      md: "5vh",
    },
    color: "#000000",
    fontSize: {
      xs: "16px",
      sm: "18px",
      md: "20px",
      lg: "1.8rem",
    },
    lineHeight: {
      xs: "24px",
      sm: "26px",
      md: "28px",
      lg: "2.2rem",
    },
  },
};