"use client";
import React from "react";
import { Button, Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { leagueSpartan } from "@/app/fonts";

const RouteLanguageSwitcher: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const isArabic = pathname.startsWith('/ar');
  
  const handleLanguageSwitch = () => {
    if (isArabic) {
      // Switch to English - remove /ar prefix
      const englishPath = pathname.replace('/ar', '') || '/';
      router.push(englishPath);
    } else {
      // Switch to Arabic - add /ar prefix
      const arabicPath = `/ar${pathname}`;
      router.push(arabicPath);
    }
  };

  return (
    <Box sx={styles.container}>
      <Button
        onClick={handleLanguageSwitch}
        variant="outlined"
        sx={[styles.button, isArabic && styles.buttonRTL]}
        className={leagueSpartan.className}
      >
        {isArabic ? 'English' : 'عربي'}
      </Button>
    </Box>
  );
};

export default RouteLanguageSwitcher;

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