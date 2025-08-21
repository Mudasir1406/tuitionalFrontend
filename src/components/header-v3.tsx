"use client";
import React from "react";
import { Box } from "@mui/material";
import logo from "../../public/assets/images/static/logo.png";
import logoMobile from "../../public/assets/images/static/logoMobile.png";
import Link from "next/link";
import Image from "next/image";

const HeaderV3: React.FC = () => {
  return (
    <Box sx={styles.headerContainer}>
      <Box sx={styles.logoContainer}>
        <Link href="/" style={styles.logoLink}>
          {/* Desktop Logo */}
          <Box sx={styles.logo}>
            <Image
              src={logo.src}
              alt="Tuitional Logo"
              width={200}
              height={49}
              style={styles.logoImage}
              priority
            />
          </Box>
          {/* Mobile Logo */}
          <Box sx={styles.logoMobile}>
            <Image
              src={logoMobile.src}
              alt="Tuitional Logo"
              width={160}
              height={49}
              style={styles.logoMobileImage}
              priority
            />
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default HeaderV3;

const styles = {
  headerContainer: {
    // position: "fixed",
    // top: 0,
    // left: 0,
    // right: 0,
    backgroundColor: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    zIndex: 1100,
    width: "100%",
    height: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoLink: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    display: {
      xs: "none",
      md: "flex",
    },
    alignItems: "center",
  },
  logoMobile: {
    display: {
      xs: "flex",
      md: "none",
    },
    alignItems: "center",
  },
  logoImage: {
    width: "auto",
    height: "45px",
    objectFit: "contain",
  },
  logoMobileImage: {
    width: "auto", 
    height: "40px",
    objectFit: "contain",
  },
};