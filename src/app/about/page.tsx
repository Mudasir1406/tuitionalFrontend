import React from "react";
import { Header } from "../../components";
import { Box, Container, Grid } from "@mui/material";
import Footer from "../../components/footer";

import aboutHero from "../../../public/assets/images/static/about-hero.png";
import testimonialHeroMobile from "../../../public/assets/images/static/testimonialHeroMobile.png";
import { getTestimonials } from "@/services/testimonials/testimonials";
import GetStarted from "@/components/home/get-started";
import StudentSays from "@/components/curiculume/students-says";
import Hero from "@/components/about/hero";
import HeroInfo from "@/components/about/hero-info";
import WhyChooseTuitional from "@/components/about/why-choose-tuitional";

const About: React.FC = async () => {
  return (
    <>
      <Header />
      <Container
        sx={{
          maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "1650px" },
          p: 0,
          padding: 0,
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
        <Grid container sx={{ p: 0, padding: 0 }}>
          <Grid item lg={5} md={12} sm={12} xs={12}>
            <Hero />
          </Grid>
          <Grid item lg={7} md={12} sm={12} xs={12} sx={styles.heroPicture}>
            <HeroInfo />
          </Grid>
        </Grid>
      </Container>

      <Grid>
        <WhyChooseTuitional />
      </Grid>
      <Grid sx={{ marginX: "3vh" }}>
        <GetStarted />
      </Grid>
      <Grid>
        <StudentSays />
      </Grid>
      <Footer />
    </>
  );
};

export default About;

const styles = {
  contanier: {},
  heroPicture: {
    background: {
      xs: "linear-gradient(178.64deg, #FDFDFD 18.41%, #38B6FF 69.11%)",
      lg: "none",
    },
    padding: 0,
    position: "relative",
    "::before": {
      content: "''",
      backgroundImage: {
        xs: `url(${testimonialHeroMobile.src})`,
        sm: `url(${testimonialHeroMobile.src})`,
        md: `url(${testimonialHeroMobile.src})`,
        lg: `url(${aboutHero.src})`,
      },
      backgroundPosition: "bottom",
      backgroundSize: "contain",
      height: { xs: "400px", sm: "500px", md: "80vh", lg: "80vh" },
      width: "100%",
      backgroundRepeat: "no-repeat",
      position: "absolute",
      bottom: 0,
    },
  },
};
