"use client";
import React from "react";
import { Button, Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { leagueSpartan } from "@/app/fonts";

interface RouteLanguageSwitcherProps {
  fullWidth?: boolean;
}

const RouteLanguageSwitcher: React.FC<RouteLanguageSwitcherProps> = ({
  fullWidth,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isArabic = pathname.startsWith("/ar");

  const handleLanguageSwitch = () => {
    if (isArabic) {
      // Switch to English - remove /ar prefix
      const englishPath = pathname.replace("/ar", "") || "/";
      router.push(englishPath);
    } else {
      // Switch to Arabic - add /ar prefix
      const arabicPath = `/ar${pathname}`;
      router.push(arabicPath);
    }
  };

  return (
    <Box
      sx={[styles.container, fullWidth ? { width: "100%", marginX: 0 } : {}]}
    >
      <Button
        onClick={handleLanguageSwitch}
        variant="outlined"
        sx={[
          styles.button,
          isArabic ? styles.buttonRTL : {},
          fullWidth
            ? {
                width: "100%",
                height: "auto",
                paddingY: "1.2vh",
                fontSize: "1.1rem",
                display: "flex",
              }
            : {},
        ]}
        className={leagueSpartan.className}
      >
        {isArabic ? "English" : "عربي"}
      </Button>
    </Box>
  );
};

export default RouteLanguageSwitcher;

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    marginLeft: { xs: "0px", lg: "12px" },
    marginRight: { xs: "0px", lg: "12px" },
  },
  button: {
    borderRadius: "8px",
    borderColor: "#38B6FF",
    color: "#38B6FF",
    textTransform: "none",
    paddingY: "1.2vh",
    paddingX: "1.5vw",
    fontSize: "1.5vh",
    fontWeight: 700,
    lineHeight: "1.84vh",
    textAlign: "center",
    minWidth: "fit-content",
    whiteSpace: "nowrap",
    transition: "none",
    ":hover": {
      borderColor: "#38B6FF",
      backgroundColor: "rgba(56, 182, 255, 0.1)",
    },
    // display: {
    //   xs: "none",
    //   sm: "none",
    //   md: "none",
    //   lg: "flex",
    // },
  },

  buttonRTL: {
    fontFamily: "'Noto Sans Arabic', sans-serif",
  },
};
