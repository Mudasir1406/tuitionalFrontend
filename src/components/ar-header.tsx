import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import logo from "../../public/assets/images/static/logo.png";
import logoMobile from "../../public/assets/images/static/logoMobile.png";
import Link from "next/link";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";

import dynamic from "next/dynamic";

// Dynamic import for client-side components only
const ArHeaderClient = dynamic(() => import("./ar-header-client"), {
  ssr: false,
});

type IProps = {
  background?: any;
};

const ArHeader: React.FC<IProps> = ({ background }) => {
  return (
    <Box sx={[styles.background, background]} dir="rtl">
      <Box sx={styles.circleBox} />
      <Box sx={styles.leftCircle} />
      <Box sx={styles.rightCircle} />
      <AppBar position="sticky" sx={styles.container}>
        <div style={styles.shadow} />
        <Toolbar sx={styles.toolBar}>
          <Link href="https://tuitionaledu.com/" rel="noopener noreferrer">
            <Box sx={styles.logo}>
              <Image
                src={logo}
                alt="تيوشنال"
                style={{
                  width: 250,
                  height: 49,
                  objectFit: "contain",
                }}
                width={250}
                height={49}
                quality={100}
                priority
              />
            </Box>
          </Link>
          <Box sx={styles.logoMobile}>
            <Image
              src={logoMobile}
              alt="تيوشنال"
              width={203}
              height={49}
              style={{
                width: 203,
                height: 49,
                objectFit: "none",
              }}
              priority
            />
          </Box>

          <Link href="/ar" style={styles.link}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              الرئيسية
            </Typography>
          </Link>
          <Link href="/ar/about" style={styles.link}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              من نحن
            </Typography>
          </Link>
          <Typography
            sx={styles.typography}
            className={leagueSpartan.className}
          >
            المجتمع والفعاليات
          </Typography>
          <Link href="/ar/testimonials" style={styles.link}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              آراء الطلاب
            </Typography>
          </Link>
          <Link href="/ar/contact" style={styles.link}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              اتصل بنا
            </Typography>
          </Link>
          <Button
            variant="outlined"
            sx={styles.outlinedBtn}
            className={leagueSpartan.className}
          >
            اختبار SAT الرقمي
          </Button>
          <ArHeaderClient />
        </Toolbar>
      </AppBar>

      <Box sx={styles.whatsapp}>
        <Link
          href="https://wa.me/97144396296"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://img.icons8.com/?size=100&id=DUEq8l5qTqBE&format=png&color=000000"
            width={60}
            height={60}
            alt="واتساب"
            loading="lazy"
          />
        </Link>
      </Box>
    </Box>
  );
};

export default ArHeader;

const styles = {
  background: {
    position: "relative",
    overflow: "hidden",
  },
  circleBox: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    top: "-200px",
    right: "50%",
    transform: "translateX(50%)",
    opacity: 0.1,
    zIndex: -1,
  },
  leftCircle: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    top: "-100px",
    right: "-100px",
    opacity: 0.1,
    zIndex: -1,
  },
  rightCircle: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    top: "-150px",
    left: "-150px",
    opacity: 0.1,
    zIndex: -1,
  },
  container: {
    backgroundColor: "white",
    boxShadow: "none",
    position: "relative",
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: "rgba(0, 0, 0, 0.1)",
  } as React.CSSProperties,
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    flexDirection: "row-reverse" as const,
    "@media (max-width: 1200px)": {
      padding: "0 15px",
    },
    "@media (max-width: 900px)": {
      padding: "0 10px",
    },
  },
  logo: {
    "@media (max-width: 900px)": {
      display: "none",
    },
  },
  logoMobile: {
    display: "none",
    "@media (max-width: 900px)": {
      display: "block",
    },
  },
  link: {
    textDecoration: "none",
    "@media (max-width: 1200px)": {
      display: "none",
    },
  } as React.CSSProperties,
  typography: {
    color: "#333",
    fontWeight: 600,
    fontSize: "16px",
    textAlign: "right" as const,
    "&:hover": {
      color: "#1976d2",
    },
  },
  outlinedBtn: {
    borderColor: "#1976d2",
    color: "#1976d2",
    fontWeight: 600,
    textTransform: "none" as const,
    padding: "8px 16px",
    "@media (max-width: 1200px)": {
      display: "none",
    },
  },
  whatsapp: {
    position: "fixed" as const,
    bottom: "20px",
    left: "20px",
    zIndex: 1000,
    "@media (max-width: 768px)": {
      bottom: "15px",
      left: "15px",
    },
  },
};