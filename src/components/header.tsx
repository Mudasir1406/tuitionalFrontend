"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import logo from "../../public/assets/images/static/logo.png";
import logoMobile from "../../public/assets/images/static/logoMobile.png";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useDrawer } from "../context/drawer-context";
import Link from "next/link";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
type IProps = {
  background?: any;
};
const Header: React.FC<IProps> = ({ background }) => {
  const { toggleDrawer } = useDrawer();
  return (
    <Box sx={[styles.background, background]}>
      <Box
        sx={{
          background:
            "linear-gradient(to bottom, #D7F0FF, rgba(255, 255, 255, 0.7))",
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
        }}
      />
      <Box sx={styles.leftCircle} />
      <Box sx={styles.rightCircle} />
      <AppBar position="sticky" sx={styles.container}>
        <div style={styles.shadow} />
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: {
              xs: "space-between",
              sm: "space-between",
              md: "space-between",
              lg: "space-evenly",
            },
            width: "100%",
            alignItems: "center",
          }}
        >
          <Link href={"https://tuitionaledu.com/"}>
            <Box sx={styles.logo}>
              <Image
                src={logo.src}
                alt="Logo"
                style={{
                  width: 250,
                  height: 49,
                  objectFit: "contain",
                }}
                width={logo.width}
                height={logo.height}
                quality={100}
              />
            </Box>
          </Link>
          <Box sx={styles.logoMobile}>
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

          <Link href={"/"} style={styles.link}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              Home
            </Typography>
          </Link>
          {/* <Link href={"/about"} style={styles.link}> */}
          <Typography
            sx={styles.typography}
            className={leagueSpartan.className}
          >
            About
          </Typography>
          {/* </Link> */}
          {/* <Link href={"/Community & Events"} style={styles.link}> */}
          <Typography
            sx={styles.typography}
            className={leagueSpartan.className}
          >
            Community & Events
          </Typography>
          {/* </Link> */}
          <Link href={"/testimonials"} style={styles.link}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              Testimonials
            </Typography>
          </Link>
          <Link href={"/contact"} style={styles.link}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              Contact
            </Typography>
          </Link>
          <Button
            variant="outlined"
            sx={styles.outlinedBtn}
            className={leagueSpartan.className}
          >
            AI Digital SAT
          </Button>
          <Button
            variant="contained"
            sx={styles.containedBtn}
            className={leagueSpartan.className}
          >
            Book Demo Classes
          </Button>
          <MenuRoundedIcon
            onClick={toggleDrawer}
            sx={{
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
            }}
          />
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          position: "fixed", // Use fixed positioning to keep it in view
          bottom: 0,
          right: 0, // Change left to right for bottom-right positioning
          padding: 5, // Optional: Add some padding for spacing from edges
          zIndex: 1000, // Ensures it stays on top of other elements
          animation: "rotateAnimation 2s ease-in-out infinite",
        }}
      >
        <Link href={"https://wa.me/97144396296"}>
          <Image
            src={
              "https://img.icons8.com/?size=100&id=DUEq8l5qTqBE&format=png&color=000000"
            }
            width={100}
            height={100}
            alt="WhatsApp"
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Header;

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
  logo: {
    display: {
      xs: "none",
      sm: "none",
      md: "none",
      lg: "flex",
    },
    alignItems: "flex-start",
    width: "30%",
    marginLeft: "-50px",
  },
  logoMobile: {
    display: {
      md: "flex",
      lg: "none",
    },
    alignItems: "flex-start",
    marginLeft: "-30px",
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
    marginLeft: "6vw",
    fontSize: "1.5vh",
    fontWeight: 700,
    lineHeight: "1.84vh",
    textAlign: "center",
    ":hover": {
      color: "#51B893",
      borderColor: "#51B893",
      paddingY: "1.2vh",
      marginLeft: "6vw",
      fontSize: "1.5vh",
      fontWeight: 700,
      lineHeight: "1.84vh",
      textAlign: "center",
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
};
