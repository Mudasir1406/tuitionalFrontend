"use client";
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import logo from "../../public/assets/images/static/logo.png";
import logoMobile from "../../public/assets/images/static/logoMobile.png";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useDrawer } from "../context/drawer-context";
import Link from "next/link";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";

import dynamic from "next/dynamic";
import RouteLanguageSwitcher from "./route-language-switcher";

const FormDialog = dynamic(() => import("./home/form-dialouge"), {
  ssr: false,
});

type IProps = {
  background?: any;
};

const ArHeader: React.FC<IProps> = ({ background }) => {
  const { toggleDrawer } = useDrawer();
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };
  
  return (
    <Box sx={[styles.background, background]}>
      <Box sx={styles.circleBox} />
      <Box sx={styles.leftCircleRTL} />
      <Box sx={styles.rightCircleRTL} />
      <AppBar position="sticky" sx={styles.containerRTL}>
        <div style={styles.shadow} />
        <Toolbar sx={styles.toolBarRTL}>
          {/* Logo Section */}
          <Box sx={styles.logoSectionRTL}>
            <a href={"https://tuitionaledu.com/"} rel="noopener noreferrer">
              <Box sx={styles.logoRTL}>
                <Image
                  src={logo.src}
                  alt="شعار تيوشنال"
                  style={{
                    width: 200,
                    height: 49,
                    objectFit: "contain",
                  }}
                  width={logo.width}
                  height={logo.height}
                  quality={100}
                />
              </Box>
            </a>
            <Box sx={styles.logoMobileRTL}>
              <Image
                src={logoMobile.src}
                alt="شعار تيوشنال"
                width={logoMobile.width}
                height={logoMobile.height}
                style={{
                  width: 203,
                  height: 49,
                  objectFit: "none",
                }}
              />
            </Box>
          </Box>

          {/* Navigation Section */}
          <Box sx={styles.navSectionRTL}>
            <a href={"/ar"} style={styles.link}>
              <Typography
                sx={styles.typography}
                className={leagueSpartan.className}
              >
                الرئيسية
              </Typography>
            </a>
            <a href={"/ar/about"} style={styles.link}>
              <Typography
                sx={styles.typography}
                className={leagueSpartan.className}
              >
                من نحن
              </Typography>
            </a>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              المجتمع والفعاليات
            </Typography>
            <a href={"/ar/testimonials"} style={styles.link}>
              <Typography
                sx={styles.typography}
                className={leagueSpartan.className}
              >
                الشهادات
              </Typography>
            </a>
            <a href={"/ar/contact"} style={styles.link}>
              <Typography
                sx={styles.typography}
                className={leagueSpartan.className}
              >
                اتصل بنا
              </Typography>
            </a>
          </Box>

          {/* Buttons Section */}
          <Box sx={styles.buttonsSectionRTL}>
            <Button
              variant="outlined"
              sx={styles.outlinedBtn}
              className={leagueSpartan.className}
            >
              اختبار SAT بالذكاء الاصطناعي
            </Button>
            <Button
              variant="contained"
              sx={styles.containedBtn}
              className={leagueSpartan.className}
              onClick={handleClick}
            >
              احجز دروس تجريبية
            </Button>
            <RouteLanguageSwitcher />
          </Box>

          <MenuRoundedIcon onClick={toggleDrawer} sx={styles.menuRTL} />
        </Toolbar>
      </AppBar>
      {open && <FormDialog open={open} handleClose={handleClose} />}

      <Box sx={styles.whatsapp}>
        <Link
          href={"https://wa.me/97144396296"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={
              "https://img.icons8.com/?size=100&id=DUEq8l5qTqBE&format=png&color=000000"
            }
            width={60}
            height={60}
            alt="واتساب"
          />
        </Link>
      </Box>
    </Box>
  );
};

export default ArHeader;

const styles = {
  containerRTL: {
    width: "90%",
    borderRadius: "10px",
    boxShadow:
      "0px -0.3vh 0.8vh 0px #00000026 inset, 0px 0.2vh 0.1vh 0px #0000000D",
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: {
      md: "space-between",
      lg: "space-evenly",
    },
    marginTop: "2vh",
    paddingY: "1vh",
    zIndex: 1000,
    alignItems: "center",
    marginLeft: "5vw",
    marginRight: "5vw",
  },
  whatsapp: {
    position: "fixed",
    bottom: 0,
    left: 0, // Change to left for RTL
    padding: 5,
    zIndex: 1000,
    animation: "rotateAnimation 2s ease-in-out infinite",
  },
  logoRTL: {
    display: {
      xs: "none",
      sm: "none",
      md: "none",
      lg: "flex",
    },
    alignItems: "flex-start",
    marginRight: "-10px", // Use marginRight for RTL
  },
  menu: {
    color: "#38B6FF",
    height: "4vh",
    width: "4vh",
    display: {
      xs: "flex",
      sm: "flex",
      md: "flex",
      lg: "none",
    },
    marginLeft: "1vw", // Use marginLeft for RTL
  },
  logoMobileRTL: {
    display: {
      md: "flex",
      lg: "none",
    },
    alignItems: "flex-start",
    marginRight: "-15px", // Use marginRight for RTL
    cursor: "pointer",
  },
  typography: {
    fontSize: "2.1vh",
    fontWeight: 400,
    lineHeight: "1.84vh",
    textAlign: "center",
    color: "black",
    cursor: "pointer",
    display: {
      xs: "none",
      sm: "none",
      md: "none",
      lg: "flex",
    },
  },
  containedBtn: {
    boxShadow: "0.1vh 1.5vh 3.4vh 0px #38B6FF66",
    backgroundColor: "#38B6FF",
    paddingY: "1.5vh",
    fontSize: "1.5vh",
    fontWeight: 700,
    lineHeight: "1.84vh",
    textAlign: "center",
    letterSpacing: "-2%",
    borderRadius: "1vh",
    ":hover": {
      boxShadow: "0.1vh 1.5vh 3.4vh 0px #38B6FF66",
      backgroundColor: "#38B6FF",
      paddingY: "1.5vh",
      fontSize: "1.5vh",
      fontWeight: 700,
      lineHeight: "1.84vh",
      textAlign: "center",
      letterSpacing: "-2%",
      borderRadius: "1vh",
    },
    display: {
      xs: "none",
      sm: "none",
      md: "none",
      lg: "flex",
    },
  },
  outlinedBtn: {
    color: "#51B893",
    borderColor: "#51B893",
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
      color: "#51B893",
      borderColor: "#51B893",
      paddingY: "1.2vh",
      paddingX: "1.5vw",
      fontSize: "1.5vh",
      fontWeight: 700,
      lineHeight: "1.84vh",
      textAlign: "center",
      minWidth: "fit-content",
      whiteSpace: "nowrap",
      transition: "none",
    },
    display: {
      xs: "none",
      sm: "none",
      md: "none",
      lg: "flex",
    },
  },
  leftCircleRTL: {
    width: {
      xs: "3vh",
      sm: "4.5vh",
      md: "5vh",
      lg: "7.5vh",
    },
    height: {
      xs: "3vh",
      sm: "4.5vh",
      md: "5vh",
      lg: "7.5vh",
    },
    top: "1.7vh",
    right: {
      xs: "1.2vw",
      sm: "2.5vw",
      md: "5vw",
      lg: "4.5vw",
    },
    borderRadius: "50%",
    backgroundColor: "#38B6FF",
    position: "absolute",
    animation: "none", // Disable animation in RTL to prevent overflow
  },
  rightCircleRTL: {
    width: {
      xs: "6vh",
      sm: "7vh",
      md: "8vh",
      lg: "10.9vh",
    },
    height: {
      xs: "6vh",
      sm: "7vh",
      md: "8vh",
      lg: "10.9vh",
    },
    top: "3.2vh",
    left: "3.5vw",
    backgroundColor: "#38B6FF",
    borderRadius: "50%",
    position: "absolute",
    animation: "none", // Disable animation in RTL to prevent overflow
  },
  background: {
    position: "absolute",
    width: "100%",
    height: {
      xs: "10vh",
      sm: "10vh",
      md: "20vh",
      lg: "30vh",
    },
  },
  shadow: {
    content: '""',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boxShadow:
      "0px -0.3vh 0.8vh 0px #00000026 inset, 0px 0.2vh 0.1vh 0px #0000000D",
    filter: "blur(0.8vh)",
    zIndex: -1,
    borderRadius: "inherit",
  },
  link: { textDecoration: "none" },
  circleBox: {
    background: "linear-gradient(to bottom, #D7F0FF, rgba(255, 255, 255, 0.7))",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -2,
    width: "100%",
    height: {
      xs: "10vh",
      sm: "10vh",
      md: "20vh",
      lg: "30vh",
    },
  },
  toolBarRTL: {
    display: "flex",
    justifyContent: {
      xs: "space-between",
      sm: "space-between",
      md: "space-between",
      lg: "space-between",
    },
    width: { xs: "100%", lg: "95%" },
    alignItems: "center",
    direction: "rtl",
  },
  menuRTL: {
    color: "#38B6FF",
    height: "4vh",
    width: "4vh",
    display: {
      xs: "flex",
      sm: "flex",
      md: "flex",
      lg: "none",
    },
    marginLeft: "1vw",
  },
  // New section-based styles for RTL
  logoSectionRTL: {
    display: "flex",
    alignItems: "center",
    marginLeft: "2vw", // Space between logo and navigation (Arabic)
  },
  navSectionRTL: {
    display: {
      xs: "none",
      lg: "flex",
    },
    alignItems: "center",
    gap: "2vw", // Space between nav items
    justifyContent: "flex-start", // Align nav items to start in RTL
  },
  buttonsSectionRTL: {
    display: {
      xs: "none",
      lg: "flex",
    },
    alignItems: "center",
    gap: "0.8vw", // Tight spacing between buttons
    marginRight: "1.5vw", // Space between nav and buttons
  },
};