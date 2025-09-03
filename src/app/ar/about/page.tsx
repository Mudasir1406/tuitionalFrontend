import React from "react";
import ArHeader from "../../../components/ar-header";
import { Grid } from "@mui/material";
import ArServerFooter from "../../../components/ar-server-footer";
import { SITE_URL } from "@/utils/env";
import GetStarted from "@/components/home/get-started";
import HeroInfo from "@/components/about/hero-info";
import WhyChooseTuitional from "@/components/about/why-choose-tuitional";
import StudentSays from "@/components/grade-subject-level/students-says";
import AboutUs from "@/components/about/about-us";
import ArAboutHero from "@/components/about/ar-about-hero";
import styles from "../../about/about.module.css";
import { getStartedData } from "@/services/get-started/get-started";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن - تيوشنال التعليمية",
  description: "تعرف على تيوشنال، منصة التدريس الرائدة عبر الإنترنت في منطقة الخليج. نقدم تدريساً شخصياً عالي الجودة للطلاب في جميع المراحل التعليمية.",
  alternates: {
    canonical: `${SITE_URL}/ar/about`,
  },
};

const studentSaysAr = {
  header: "ماذا يقول طلابنا",
  headerTag: "h4",
  paragraph:
    "الطلاب المنتسبون إلى تيوشنال شاركوا دائماً رحلتهم الأكاديمية الاستثنائية بطريقة إيجابية. طلاب تيوشنال لم يتفوقوا فقط في امتحاناتهم المطلوبة بل حسّنوا أيضاً آفاقهم الأكاديمية وقدراتهم التعليمية. إليكم ما يشاركه طلابنا المميزون حول تجربتهم في تيوشنال.",
};

const ArAbout: React.FC = async () => {
  const getStarted = await getStartedData();
  
  return (
    <div dir="rtl">
      <ArHeader />
      <div className={`${styles.container} ${styles.containerRTL}`}>
        <div className={styles["grid-container"]}>
          <div className={styles["hero"]}>
            <ArAboutHero />
          </div>
          <div className={styles["hero-picture"]}>
            <HeroInfo />
          </div>
        </div>
      </div>
      <AboutUs />
      <WhyChooseTuitional />
      <StudentSays data={studentSaysAr} />
      <GetStarted data={getStarted} />
      <ArServerFooter />
    </div>
  );
};

export default ArAbout;