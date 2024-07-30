"use client";

import { Drawer, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../public/assets/images/static/logo.png";
import { useDrawer } from "../context/drawer-context";
import Link from "next/link";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
const ResponsiveDrawer = () => {
  const { open, toggleDrawer } = useDrawer();
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
          <Link href="/" style={styles.link} onClick={toggleDrawer}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              Home
            </Typography>
          </Link>
          <Link href="/about" style={styles.link} onClick={toggleDrawer}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              About
            </Typography>
          </Link>
          <Link
            href="/communityandevents"
            style={styles.link}
            onClick={toggleDrawer}
          >
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              Community & Events
            </Typography>
          </Link>
          <Link onClick={toggleDrawer} href="/testimonials" style={styles.link}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              Testimonials
            </Typography>
          </Link>
          <Link href="/contact" style={styles.link} onClick={toggleDrawer}>
            <Typography
              sx={styles.typography}
              className={leagueSpartan.className}
            >
              Contact
            </Typography>
          </Link>
        </Box>
      </Drawer>
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
    fontSize: "30px",
    fontWeight: 500,
    lineHeight: "60px",
    textAlign: "center",
    color: "black",
    cursor: "pointer",
    display: {
      xs: "flex",
      sm: "flex",
      md: "flex",
      lg: "flex",
    },
  },
  link: { textDecoration: "none" },
};
