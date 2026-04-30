import React from "react";
import ArHeader from "../../../components/header";
import ArServerFooter from "../../../components/ar-server-footer";
import { SITE_URL } from "@/utils/env";
import ArContactUs from "../../../components/home/contact-us";
import Hero from "../../../components/testimonials/hero";
import HeroInfo from "../../../components/testimonials/hero-info";
import ReviewsOnWp from "../../../components/testimonials/reviews-on-wp";
import ReviewsOnSp from "../../../components/testimonials/reviews-on-sp";
import VideoBasedReview from "../../../components/testimonials/video-based-reviews";
import { getTestimonials } from "@/services/testimonials/testimonials";
import { Metadata } from "next";
import { getWPReviews } from "@/services/reviews-on-wp/reviews-on-wp";
import OurClient from "../../../components/home/our-client";
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
          <VideoBasedReview locale="ar" />
        </div>
      </div>
      <div>
        <ArContactUs
          background={{ background: "#DAF2FF" }}
          filterData={filterData}
        />
      </div>
      <ArServerFooter />
    </div>
  );
};

export default ArTestimonials;
