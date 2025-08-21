import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/images/static/logo.png";
import { leagueSpartan } from "@/app/fonts";
// import HeaderV3 from "@/components/header-v3";

const ThankYouPage = () => {
  return (
    <Box sx={styles.pageContainer}>
      {/* <HeaderV3 /> */}
      
      <Box sx={styles.contentContainer}>
        {/* Logo */}
        <Box sx={styles.logoContainer}>
          <Image
            src={logo.src}
            alt="Tuitional Logo"
            width={300}
            height={73}
            style={styles.logoImage}
            priority
          />
        </Box>

        {/* Main Headline */}
        <Typography
          variant="h1"
          sx={styles.headline}
          className={leagueSpartan.className}
        >
          ✅ You&apos;re All Set! Thanks for Registering.
        </Typography>

        {/* Sub-Headline */}
        <Typography
          variant="h2"
          sx={styles.subHeadline}
          className={leagueSpartan.className}
        >
          Our team will contact you shortly to confirm your free trial session. 🎉
        </Typography>

        {/* Optional Add-On */}
        <Typography
          variant="body1"
          sx={styles.addOnText}
          className={leagueSpartan.className}
        >
          While you wait, check our Testimonials page for past experiences. ☺️
        </Typography>

        {/* Call-to-Action Buttons */}
        <Box sx={styles.buttonContainer}>
          <Link href="/testimonials" style={styles.linkStyle}>
            <Button
              variant="contained"
              sx={styles.primaryButton}
              className={leagueSpartan.className}
            >
              View Testimonials
            </Button>
          </Link>
          
          <Link href="/" style={styles.linkStyle}>
            <Button
              variant="outlined"
              sx={styles.secondaryButton}
              className={leagueSpartan.className}
            >
              Back to Home
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ThankYouPage;

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    display: "flex",
    flexDirection: "column",
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    paddingTop: "120px", // Account for fixed header
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },
  logoContainer: {
    marginBottom: "3rem",
  },
  logoImage: {
    width: "auto",
    height: "60px",
    objectFit: "contain" as const,
  },
  headline: {
    fontSize: {
      xs: "2rem",
      sm: "2.5rem",
      md: "3rem",
    },
    fontWeight: 700,
    color: "#2c3e50",
    marginBottom: "1.5rem",
    lineHeight: 1.2,
  },
  subHeadline: {
    fontSize: {
      xs: "1.2rem",
      sm: "1.4rem",
      md: "1.6rem",
    },
    fontWeight: 500,
    color: "#34495e",
    marginBottom: "2rem",
    lineHeight: 1.4,
  },
  addOnText: {
    fontSize: {
      xs: "1rem",
      sm: "1.1rem",
      md: "1.2rem",
    },
    fontWeight: 400,
    color: "#7f8c8d",
    marginBottom: "3rem",
    lineHeight: 1.5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: {
      xs: "column",
      sm: "row",
    },
    gap: "1rem",
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#38B6FF",
    color: "white",
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    borderRadius: "8px",
    padding: "12px 32px",
    minWidth: "200px",
    boxShadow: "0 4px 15px rgba(56, 182, 255, 0.3)",
    "&:hover": {
      backgroundColor: "#2196F3",
      boxShadow: "0 6px 20px rgba(56, 182, 255, 0.4)",
    },
  },
  secondaryButton: {
    color: "#38B6FF",
    borderColor: "#38B6FF",
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    borderRadius: "8px",
    padding: "12px 32px",
    minWidth: "200px",
    "&:hover": {
      backgroundColor: "rgba(56, 182, 255, 0.1)",
      borderColor: "#38B6FF",
    },
  },
  linkStyle: {
    textDecoration: "none",
  },
};