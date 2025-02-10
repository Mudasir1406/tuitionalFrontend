import React from "react";
import { Header } from "../../components";
import { Box, Container, Grid } from "@mui/material";
import Footer from "../../components/footer";
import carrerHero from "../../../public/assets/images/static/carrerHero.png";

import Hero from "../../components/careers/hero";
import TeamValues from "../../components/careers/team-values";
import TopTalent from "../../components/careers/top-talent";
import ApplyNow from "../../components/careers/apply-now";
import HeroInfo from "../../components/careers/hero-info";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";

export const metadata: Metadata = {
  title: "We Are Always on the Lookout for Talented People",
  description: ` Want to be part of our dynamic team? We are always on the lookout for passionate individuals who are always eager to make an impact.`,
  alternates: {
    canonical: `${SITE_URL}/careers`,
  },
};
import styles from "./careers.module.css";

const Careers: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles["grid-container"]}>
          <div className={styles["hero"]}>
            <Hero />
          </div>
          <div className={styles["hero-picture"]}>
            {" "}
            <HeroInfo />
          </div>
        </div>
      </div>

      {/* <Container
        sx={{
          maxWidth: { lg: "1650px" },
          p: 0,
          paddingTop: {
            xs: "120px",
            sm: "150px",
            md: "200px",
            lg: 0,
            xl: 0,
          },
          height: { xs: "100%", lg: "100vh" },
          display: "flex",
          alignItems: "end",
        }}
      >
        <Grid container>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Hero />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            sm={12}
            xs={12}
            sx={style.hero}
            aria-label="Tuitional's Talented individuals"
          >
            <HeroInfo />
          </Grid>
        </Grid>
      </Container> */}
      <Box sx={style.contanier}>
        <Container sx={{ maxWidth: { lg: "1650px" } }}>
          <TeamValues />
        </Container>
      </Box>
      <Container sx={{ maxWidth: { lg: "1650px" } }}>
        <TopTalent />
      </Container>
      <div id="careersForm">
        <ApplyNow />
      </div>
      <Footer />
    </>
  );
};

export default Careers;

const style = {
  contanier: {
    background: "linear-gradient(to bottom, #D7F0FF, rgba(255, 255, 255, 0.7))",
  },
  hero: {
    position: "relative",
    background: {
      xs: "linear-gradient(178.64deg, #FDFDFD 18.41%, #38B6FF 69.11%)",
      lg: "none",
    },
    "::before": {
      content: "''",
      backgroundImage: `url(${carrerHero.src})`,
      backgroundPosition: "bottom",
      backgroundSize: "contain",
      height: { xs: "400px", sm: "400px", md: "80vh", lg: "80vh" },
      width: "100%",
      backgroundRepeat: "no-repeat",
      position: "absolute",
      bottom: 0,
    },
  },
};
