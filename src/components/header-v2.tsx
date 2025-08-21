"use client";
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import logo from "../../public/assets/images/static/logo.png";
import logoMobile from "../../public/assets/images/static/logoMobile.png";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useDrawer } from "../context/drawer-context";
import { useI18n } from "@/context/language-context";
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
const HeaderV2: React.FC<IProps> = ({ background }) => {
  const { toggleDrawer } = useDrawer();
  const { t, isRTL } = useI18n();
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
      <Box sx={[styles.leftCircle, isRTL && styles.leftCircleRTL]} />
      <Box sx={[styles.rightCircle, isRTL && styles.rightCircleRTL]} />
      <AppBar
        position="sticky"
        sx={[styles.container, isRTL && styles.containerRTL]}
      >
        <div style={styles.shadow} />
        <Toolbar sx={[styles.toolBar, isRTL && styles.toolBarRTL]}>
          {/* Logo Section */}
          <Box sx={[styles.logoSection, isRTL && styles.logoSectionRTL]}>
            <a href={"https://tuitionaledu.com/"} rel="noopener noreferrer">
              <Box sx={[styles.logo, isRTL && styles.logoRTL]}>
                <Image
                  src={logo.src}
                  alt="Logo"
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
            <Box sx={[styles.logoMobile, isRTL && styles.logoMobileRTL]}>
              <Image
                src={logoMobile.src}
                alt="Logo"
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
          {/* <Box sx={[styles.navSection, isRTL && styles.navSectionRTL]}>
            <a href={"/"} style={styles.link}>
              <Typography
                sx={styles.typography}
                className={leagueSpartan.className}
              >
                {t("nav.home")}
              </Typography>
            </a>
            <a href={"/about"} style={styles.link}>
              <Typography
                sx={styles.typography}
                className={leagueSpartan.className}
              >
                {t("nav.about")}
              </Typography>
            </a>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              {t("nav.community")}
            </Typography>
            <a href={"/testimonials"} style={styles.link}>
              <Typography
                sx={styles.typography}
                className={leagueSpartan.className}
              >
                {t("nav.testimonials")}
              </Typography>
            </a>
            <a href={"/contact"} style={styles.link}>
              <Typography
                sx={styles.typography}
                className={leagueSpartan.className}
              >
                {t("nav.contact")}
              </Typography>
            </a>
          </Box> */}

          {/* Buttons Section */}
          <Box sx={[styles.buttonsSection, isRTL && styles.buttonsSectionRTL]}>
            {/* <Button
              variant="outlined"
              sx={styles.outlinedBtn}
              className={leagueSpartan.className}
            >
              {t("buttons.ai_digital_sat")}
            </Button> */}
            <Button
              variant="contained"
              sx={styles.containedBtn}
              className={leagueSpartan.className}
              onClick={handleClick}
            >
              {t("buttons.book_demo")}
            </Button>
            {/* <RouteLanguageSwitcher /> */}
          </Box>

          <MenuRoundedIcon
            onClick={toggleDrawer}
            sx={[styles.menu, isRTL && styles.menuRTL]}
          />
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
            alt="WhatsApp"
          />
        </Link>
      </Box>
    </Box>
  );
};

export default HeaderV2;

const styles = {
  container: {
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
  },
  whatsapp: {
    position: "fixed", // Use fixed positioning to keep it in view
    bottom: 0,
    right: 0, // Change left to right for bottom-right positioning
    padding: 5, // Optional: Add some padding for spacing from edges
    zIndex: 1000, // Ensures it stays on top of other elements
    animation: "rotateAnimation 2s ease-in-out infinite",
  },
  logo: {
    display: {
      xs: "none",
      sm: "none",
      md: "none",
      lg: "flex",
    },
    alignItems: "flex-start",
    // width: "25%",
    marginLeft: "-10px", // Minimal negative margin to prevent stepping out
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
    marginRight: "1vw",
  },
  logoMobile: {
    display: {
      md: "flex",
      lg: "none",
    },
    alignItems: "flex-start",
    marginLeft: "-15px", // Reduced negative margin to match RTL
    cursor: "pointer",
  },
  image: {
    width: 203,
    height: 49,
    cursor: "pointer",
    objectfit: "none",
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
  leftCircle: {
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
    left: {
      xs: "1.2vw",
      sm: "2.5vw",
      md: "5vw",
      lg: "4.5vw",
    },
    borderRadius: "50%",
    backgroundColor: "#38B6FF",
    position: "absolute",
    animation: {
      lg: `bounceAndForward 4s linear infinite alternate `,
    },
  },
  rightCircle: {
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
    right: "3.5vw",
    backgroundColor: "#38B6FF",
    borderRadius: "50%",
    position: "absolute",
    animation: `rightCircleAnimation 6s ease-in-out infinite alternate`,
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
  toolBar: {
    display: "flex",
    justifyContent: {
      xs: "space-between",
      sm: "space-between",
      md: "space-between",
      lg: "space-between",
    },
    width: { xs: "100%", lg: "95%" },
    // marginX: "8vw",
    alignItems: "center",
  },
  // RTL-specific styles
  containerRTL: {
    marginLeft: "5vw",
    marginRight: "5vw",
  },
  toolBarRTL: {
    flexDirection: "row",
    justifyContent: "space-between",
    direction: "ltr", // Keep toolbar in LTR to maintain proper order
  },
  logoRTL: {
    marginLeft: "-10px", // Match the English logo margin
    marginRight: "0px",
  },
  logoMobileRTL: {
    marginLeft: "-15px", // Reduced negative margin for mobile
    marginRight: "0px",
  },
  menuRTL: {
    marginRight: "0vw",
    marginLeft: "1vw",
  },
  leftCircleRTL: {
    left: "auto",
    right: {
      xs: "1.2vw",
      sm: "2.5vw",
      md: "5vw",
      lg: "4.5vw",
    },
    animation: "none", // Disable animation in RTL to prevent overflow
  },
  rightCircleRTL: {
    right: "auto",
    left: "3.5vw",
    animation: "none", // Disable animation in RTL to prevent overflow
  },
  // New section-based styles
  logoSection: {
    display: "flex",
    alignItems: "center",
    marginRight: "1.5vw", // Space between logo and navigation (English)
  },
  logoSectionRTL: {
    marginRight: "2vw", // More space for Arabic
  },
  navSection: {
    display: {
      xs: "none",
      lg: "flex",
    },
    alignItems: "center",
    gap: "2vw", // Space between nav items
  },
  navSectionRTL: {
    justifyContent: "flex-start", // Align nav items to start in RTL
  },
  buttonsSection: {
    display: {
      xs: "none",
      lg: "flex",
    },
    alignItems: "center",
    gap: "0.8vw", // Tight spacing between buttons
    marginLeft: "1.5vw", // Space between nav and buttons
  },
  buttonsSectionRTL: {
    marginLeft: "1.5vw", // Keep same spacing for Arabic
  },
};
