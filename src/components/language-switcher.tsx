"use client";
import React from "react";
import { Button, Box } from "@mui/material";
import { useI18n } from "@/context/language-context";
import { leagueSpartan } from "@/app/fonts";

const LanguageSwitcher: React.FC = () => {
  const { locale, toggleLanguage, isRTL } = useI18n();

  return (
    <Box sx={styles.container}>
      <Button
        onClick={toggleLanguage}
        variant="outlined"
        sx={[styles.button, isRTL && styles.buttonRTL]}
        className={leagueSpartan.className}
      >
        {locale === 'en' ? 'عربي' : 'English'}
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    marginLeft: { xs: "8px", lg: "12px" },
    marginRight: { xs: "8px", lg: "12px" },
  },
  button: {
    minWidth: "70px",
    height: "35px",
    fontSize: "14px",
    fontWeight: 600,
    borderRadius: "8px",
    borderColor: "#38B6FF",
    color: "#38B6FF",
    textTransform: "none",
    ":hover": {
      borderColor: "#38B6FF",
      backgroundColor: "rgba(56, 182, 255, 0.1)",
    },
  },
  buttonRTL: {
    fontFamily: "'Noto Sans Arabic', sans-serif",
  },
};