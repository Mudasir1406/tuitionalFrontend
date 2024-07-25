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
const Careers: React.FC = () => {
  return (
    <>
      <Header />
      <Container
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
            sx={{
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
                height: { xs: "400px", sm: "400px", md: "784px", lg: "784px" },
                width: "100%",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                bottom: 0,
              },
            }}
          >
            <HeroInfo />
          </Grid>
        </Grid>
      </Container>
      <Box sx={styles.contanier}>
        <Container sx={{ maxWidth: { lg: "1650px" } }}>
          <TeamValues />
        </Container>
      </Box>
      <Container sx={{ maxWidth: { lg: "1650px" } }}>
        <TopTalent />
      </Container>
      <ApplyNow />
      <Footer />
    </>
  );
};

export default Careers;

const styles = {
  contanier: {
    background: "linear-gradient(to bottom, #D7F0FF, rgba(255, 255, 255, 0.7))",
  },
};
