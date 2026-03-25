"use client";
import React, { useState } from "react";
import { Drawer, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../public/assets/images/static/logo.png";
import { useDrawer } from "../context/drawer-context";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
import { useI18n } from "@/context/language-context";
import dynamic from "next/dynamic";
import { Button } from "@mui/material";
import RouteLanguageSwitcher from "./route-language-switcher";

const FormDialog = dynamic(() => import("./home/form-dialouge"), {
  ssr: false,
});

const ResponsiveDrawer = () => {
  const { open, toggleDrawer } = useDrawer();
  const { t } = useI18n();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleClick = () => {
    setOpenDialog(true);
  };

  return (
    <div>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingX: "7.1%",
            paddingY: "50px",
            background:
              "linear-gradient(to bottom, #D3EFFE, rgba(255, 255, 255,1))",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
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
            <IconButton onClick={toggleDrawer}>
              <CloseIcon
                sx={{ width: "25px", height: "25px", color: "#545454" }}
              />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingX: "7.1%",
          }}
        >
          <a href="/" style={styles.link} onClick={toggleDrawer}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              {t("nav.home")}
            </Typography>
          </a>
          <a href="/about" style={styles.link} onClick={toggleDrawer}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              {t("nav.about")}
            </Typography>
          </a>
          <a
            href="/communityandevents"
            style={styles.link}
            onClick={toggleDrawer}
          >
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              {t("nav.community")}
            </Typography>
          </a>
          <a onClick={toggleDrawer} href="/testimonials" style={styles.link}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              {t("nav.testimonials")}
            </Typography>
          </a>
          <a href="/contact" style={styles.link} onClick={toggleDrawer}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              {t("nav.contact")}
            </Typography>
          </a>

          <Box sx={styles.buttonContainer}>
            <Button
              variant="outlined"
              sx={styles.outlinedBtn}
              className={leagueSpartan.className}
            >
              {t("buttons.ai_digital_sat")}
            </Button>
            <Button
              variant="contained"
              sx={styles.containedBtn}
              className={leagueSpartan.className}
              onClick={() => {
                toggleDrawer();
                handleClick();
              }}
            >
              {t("buttons.book_demo")}
            </Button>
            <Box sx={{ marginTop: "10px", width: "100%" }}>
              <RouteLanguageSwitcher fullWidth />
            </Box>
          </Box>
        </Box>
      </Drawer>
      {openDialog && (
        <FormDialog open={openDialog} handleClose={handleClose} />
      )}
    </div>
  );
};

export default ResponsiveDrawer;

const styles = {
  logo: {
    display: "flex",
    alignItems: "flex-start",
  },
  image: {
    width: 144,
    height: 34,
    cursor: "pointer",
  },
  typography: {
    fontSize: "1.5rem",
    fontWeight: 500,
    lineHeight: "2",
    textAlign: "start",
    color: "black",
    cursor: "pointer",
    marginY: "10px",
    display: {
      xs: "flex",
      lg: "flex",
    },
  },
  link: { textDecoration: "none", width: "100%" },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "30px",
    width: "100%",
  },
  containedBtn: {
    boxShadow: "0.1vh 1.5vh 3.4vh 0px #38B6FF66",
    backgroundColor: "#38B6FF",
    paddingY: "1.5vh",
    fontSize: "1.1rem",
    fontWeight: 700,
    textAlign: "center",
    letterSpacing: "-2%",
    borderRadius: "1vh",
    color: "white",
    ":hover": {
      backgroundColor: "#38B6FF",
    },
  },
  outlinedBtn: {
    color: "#51B893",
    borderColor: "#51B893",
    paddingY: "1.2vh",
    fontSize: "1.1rem",
    fontWeight: 700,
    textAlign: "center",
    whiteSpace: "nowrap",
    ":hover": {
      borderColor: "#51B893",
    },
  },
};
