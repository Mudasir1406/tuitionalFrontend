"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  SxProps,
  Theme,
} from "@mui/material";
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
            xs: "100px",
            sm: "100px",
            md: "200px",
            lg: "300px",
          },
        }}
      />
      <Box sx={styles.leftCircle} />
      <Box sx={styles.rightCircle} />
      <AppBar position="sticky" sx={styles.contanier}>
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
          <Box sx={styles.logo}>
            <Image
              src={logo.src}
              alt="Logo"
              style={styles.image}
              width={logo.width}
              height={logo.height}
            />
          </Box>
          <Box sx={styles.logoMobile}>
            <Image
              src={logoMobile.src}
              alt="Logo"
              width={logoMobile.width}
              height={logoMobile.height}
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
          <Link href={"/about"} style={styles.link}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              About
            </Typography>
          </Link>
          <Link href={"/communityandevents"} style={styles.link}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              Community & Events
            </Typography>
          </Link>
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
              height: 40,
              width: 40,
              display: {
                xs: "flex",
                sm: "flex",
                md: "flex",
                lg: "none",
              },
              marginRight: "10px",
            }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

const styles = {
  contanier: {
    width: "90%",
    borderRadius: 3,
    boxShadow: "0px -3px 8px 0px #00000026 inset, 0px 2px 1px 0px #0000000D",
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: {
      md: "space-between",
      lg: "space-evenly",
    },

    marginTop: "20px",
    height: {
      // lg: "85px",
    },
    paddingY: 1,
    zIndex: 1000,
    alignItems: "center",
    marginLeft: "5%",
    // display: {
    //   xs: "none",
    //   sm: "none",
    //   md: "none",
    //   lg: "flex",
    // },
  },
  logo: {
    display: {
      xs: "none",
      sm: "none",
      md: "none",
      lg: "flex",
    },
    alignItems: "flex-start",
    width: "27%",
  },
  logoMobile: {
    display: {
      md: "flex",
      lg: "none",
    },
    alignItems: "flex-start",
    marginLeft: "10px",
    cursor: "pointer",
  },
  image: {
    width: 203,
    height: 49,
    cursor: "pointer",
  },

  typography: {
    fontFamily: "League Spartan",
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: "18.4px",
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
    boxShadow: "1px 15px 34px 0px #38B6FF66",
    backgroundColor: "#38B6FF",
    paddingY: "15px",
    fontFamily: "League Spartan",
    fontSize: "15px",
    fontWeight: 700,
    lineHeight: "18.4px",
    textAlign: "center",
    letterSpacing: "-2%",
    borderRadius: "10px",
    ":hover": {
      boxShadow: "1px 15px 34px 0px #38B6FF66",
      backgroundColor: "#38B6FF",
      paddingY: "15px",
      fontFamily: "League Spartan",
      fontSize: "15px",
      fontWeight: 700,
      lineHeight: "18.4px",
      textAlign: "center",
      letterSpacing: "-2%",
      borderRadius: "10px",
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
    paddingY: "12px",
    marginLeft: "60px",
    fontFamily: "League Spartan",
    fontSize: "15px",
    fontWeight: 700,
    lineHeight: "18.4px",
    textAlign: "center",
    ":hover": {
      color: "#51B893",
      borderColor: "#51B893",
      paddingY: "12px",
      marginLeft: "60px",
      fontFamily: "League Spartan",
      fontSize: "15px",
      fontWeight: 700,
      lineHeight: "18.4px",
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
      xs: "30px",
      sm: "45px",
      md: "50px",
      lg: "75px",
    },
    height: {
      xs: "30px",
      sm: "45px",
      md: "50px",
      lg: "75px",
    },
    top: "17px",
    left: {
      xs: "12px",
      sm: "25px",
      md: "50px",
      lg: "45px",
    },
    borderRadius: 50,
    backgroundColor: "#38B6FF",
    position: "absolute",
    animation: {
      lg: `bounceAndForword 4s linear infinite alternate `,
    },
  },
  rightCircle: {
    width: {
      xs: "60px",
      sm: "70px",
      md: "80px",
      lg: "109px",
    },
    height: {
      xs: "60px",
      sm: "70px",
      md: "80px",
      lg: "109px",
    },
    top: "32px",
    right: "3.5%",
    backgroundColor: "#38B6FF",
    borderRadius: 50,
    position: "absolute",
    animation: `rightCircleAnimation 6s ease-in-out infinite alternate`,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: {
      xs: "100px",
      sm: "100px",
      md: "200px",
      lg: "300px",
    },
  },
  shadow: {
    content: '""',
    // position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boxShadow: "0px -3px 8px 0px #00000026 inset, 0px 2px 1px 0px #0000000D",
    filter: "blur(8px)", // Apply blur effect to the box shadow
    zIndex: -1, // Ensure the shadow is behind other content
    borderRadius: "inherit", // Inherit the container's border radius
  },
  link: { textDecoration: "none" },
};
