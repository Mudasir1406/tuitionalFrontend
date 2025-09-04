import React from "react";
import ArHeader from "../../../components/ar-header";
import { Box, Container, Grid } from "@mui/material";
import ArServerFooter from "../../../components/ar-server-footer";
import { SITE_URL } from "@/utils/env";
import ArContactUs from "../../../components/home/ar-contact-us";
import ArHero from "../../../components/testimonials/ar-hero";
import ArHeroInfo from "../../../components/testimonials/ar-hero-info";
import ArReviewsOnWp from "../../../components/testimonials/ar-reviews-on-wp";
import ArReviewsOnSp from "../../../components/testimonials/ar-reviews-on-sp";
import ArVideoBasedReview from "../../../components/testimonials/ar-video-based-reviews";
import { getTestimonials } from "@/services/testimonials/testimonials";
import { Metadata } from "next";
import { getWPReviews } from "@/services/reviews-on-wp/reviews-on-wp";
import ArOurClient from "../../../components/home/ar-our-client";
import styles from "../../testimonials/testimonials.module.css";
import { getFilterData } from "@/services/filter-data/filter-data";

export const metadata: Metadata = {
  title: "الشهادات - استمع إلى ما يقوله طلابنا - تيوشنال",
  description: "طلاب تيوشنال تحدثوا دائماً بإيجابية عن تجربتهم. إليكم ما يشاركونه حول تجربتهم.",
  alternates: {
    canonical: `${SITE_URL}/ar/testimonials`,
  },
};

const ArTestimonials: React.FC = async () => {
  const data = await getTestimonials("ar");
  const wpReviews = await getWPReviews();
  const filterData = await getFilterData();
  
  return (
    <div dir="rtl">
      <ArHeader />
      <div className={`${styles.container} ${styles.containerRTL}`}>
        <div className={styles["grid-container"]}>
          <div className={styles["hero"]}>
            <ArHero />
          </div>
          <div className={styles["hero-picture"]}>
            <ArHeroInfo />
          </div>
        </div>
      </div>
      <div id="testimonials">
        <ArReviewsOnWp reviews={wpReviews} />
      </div>
      <ArReviewsOnSp />
      <Box
        sx={{
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0.7),#DAF2FF)",
        }}
      >
        <ArOurClient data={data} />
        <Container sx={style.contanier}>
          <ArVideoBasedReview />
        </Container>
      </Box>
      <Box>
        <ArContactUs
          background={{ background: "#DAF2FF" }}
          filterData={filterData}
        />
      </Box>
      <ArServerFooter />
    </div>
  );
};

export default ArTestimonials;

const style = {
  contanier: {
    maxWidth: { lg: "1650px" },
    paddingY: { xs: "5vh", md: "10vh" },
  },
};