import React from "react";
import { Header } from "../../components";
import { Box, Container, Grid } from "@mui/material";
import Footer from "../../components/footer";
import ContactUs from "../../components/home/contact-us";
import Hero from "../../components/testimonials/hero";
import HeroInfo from "../../components/testimonials/hero-info";
import ReviewsOnWp from "../../components/testimonials/reviews-on-wp";
import ReviewsOnSp from "../../components/testimonials/reviews-on-sp";
import OurClient from "../../components/testimonials/our-client";
import VideoBasedReview from "../../components/testimonials/video-based-reviews";
import testimonialsImage from "../../../public/assets/images/static/hero-testimonial.png";
import testimonialHeroMobile from "../../../public/assets/images/static/testimonialHeroMobile.png";
import { getTestimonials } from "@/services/testimonials/testimonials";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";

export const metadata: Metadata = {
  title: "Testimonials - Hear What Our Students Have to Say",
  description: `Students at Tuitional have always spoken highly of their experience. Here is what they have to share about their experience.`,
  alternates: {
    canonical: `${SITE_URL}/testimonials`,
  },
};

const Testimonials: React.FC = async () => {
  const data = await getTestimonials();
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
          <Grid
            item
            lg={7}
            md={12}
            sm={12}
            xs={12}
            sx={styles.heroPicture}
            aria-label="Tuitional Testimonials"
          >
            <HeroInfo />
          </Grid>
        </Grid>
      </Container>
      <div id="testimonials">
        <ReviewsOnWp />
      </div>
      <ReviewsOnSp />
      <Box
        sx={{
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0.7),#DAF2FF)",
        }}
      >
        <OurClient data={data} />

        <Container sx={{ maxWidth: { lg: "1650px" } }}>
          <VideoBasedReview />
        </Container>
      </Box>
      <ContactUs background={{ background: "#DAF2FF" }} />
      <Footer />
    </>
  );
};

export default Testimonials;

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
        lg: `url(${testimonialsImage.src})`,
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
