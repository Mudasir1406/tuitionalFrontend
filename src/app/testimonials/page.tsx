import React from "react";
import { Header } from "../../components";
import { Box, Container, Grid } from "@mui/material";
import Footer from "../../components/footer-wrapper";
import ContactUs from "../../components/home/contact-us";
import Hero from "../../components/testimonials/hero";
import HeroInfo from "../../components/testimonials/hero-info";
import ReviewsOnWp from "../../components/testimonials/reviews-on-wp";
import ReviewsOnSp from "../../components/testimonials/reviews-on-sp";
// import OurClient from "../../components/testimonials/our-client";
import VideoBasedReview from "../../components/testimonials/video-based-reviews";
import testimonialsImage from "../../../public/assets/images/static/hero-testimonial.png";
import testimonialHeroMobile from "../../../public/assets/images/static/testimonialHeroMobile.png";
import { getTestimonials } from "@/services/testimonials/testimonials";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";
import { getWPReviews } from "@/services/reviews-on-wp/reviews-on-wp";
import OurClient from "@/components/home/our-client";
import styles from "./testimonials.module.css";
import { getFilterData } from "@/services/filter-data/filter-data";
export const metadata: Metadata = {
  title: "Testimonials - Hear What Our Students Have to Say",
  description: `Students at Tuitional have always spoken highly of their experience. Here is what they have to share about their experience.`,
  alternates: {
    canonical: `${SITE_URL}/testimonials`,
  },
};

const Testimonials: React.FC = async () => {
  const data = await getTestimonials();
  const wpReviews = await getWPReviews();
  const filterData = await getFilterData();
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles["grid-container"]}>
          <div className={styles["hero"]}>
            <Hero />
          </div>
          <div className={styles["hero-picture"]}>
            <HeroInfo />
          </div>
        </div>
      </div>
      <div id="testimonials">
        <ReviewsOnWp reviews={wpReviews} />
      </div>
      <ReviewsOnSp />
      <Box
        sx={{
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0.7),#DAF2FF)",
        }}
      >
        {/* <OurClient data={data} /> */}
        <OurClient data={data} />

        <Container sx={style.contanier}>
          <VideoBasedReview />
        </Container>
      </Box>
      <Box>
        <ContactUs
          background={{ background: "#DAF2FF" }}
          filterData={filterData}
        />
      </Box>
      <Footer />
    </>
  );
};

export default Testimonials;

const style = {
  contanier: {
    maxWidth: { lg: "1650px" },
    paddingY: { xs: "5vh", md: "10vh" },
  },
  verticalMargin: { marginY: { xs: "5vh", md: "10vh" } },
  verticalPadding: { paddingY: { xs: "5vh", md: "10vh" } },

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
