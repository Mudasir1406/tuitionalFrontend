import React from "react";
import { Header } from "../../components";
import Footer from "../../components/footer-wrapper";
import ContactUs from "../../components/home/contact-us";
import Hero from "../../components/testimonials/hero";
import HeroInfo from "../../components/testimonials/hero-info";
import ReviewsOnWp from "../../components/testimonials/reviews-on-wp";
import ReviewsOnSp from "../../components/testimonials/reviews-on-sp";
import VideoBasedReview from "../../components/testimonials/video-based-reviews";
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
      <div className="bg-gradient-to-b from-white/70 to-[#DAF2FF]">
        <OurClient data={data} />
        <div className="mx-auto py-[5vh] md:py-[10vh] lg:max-w-[1650px]">
          <VideoBasedReview />
        </div>
      </div>
      <div>
        <ContactUs
          background={{ background: "#DAF2FF" }}
          filterData={filterData}
        />
      </div>
      <Footer />
    </>
  );
};

export default Testimonials;
