import React from "react";
import ArHeader from "../../../components/ar-header";
import { Grid } from "@mui/material";
import ArServerFooter from "../../../components/ar-server-footer";
import { SITE_URL } from "@/utils/env";
import ArGetStarted from "@/components/home/ar-get-started";
import ArHeroInfo from "@/components/about/ar-hero-info";
import ArWhyChooseTuitional from "@/components/about/ar-why-choose-tuitional";
import StudentSays from "@/components/grade-subject-level/students-says";
import ArAboutUs from "@/components/about/ar-about-us";
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
  const getStarted = await getStartedData('ar');
  
  return (
    <div dir="rtl">
      <ArHeader />
      <div className={`${styles.container} ${styles.containerRTL}`}>
        <div className={styles["grid-container"]}>
          <div className={styles["hero"]}>
            <ArAboutHero />
          </div>
          <div className={styles["hero-picture"]}>
            <ArHeroInfo />
          </div>
        </div>
      </div>
      <Grid sx={style.aboutUsContainer}>
        <ArAboutUs />
      </Grid>
      <Grid sx={style.whyChooseContainer}>
        <ArWhyChooseTuitional />
      </Grid>
      <Grid sx={style.getStartedContainer}>
        <ArGetStarted data={getStarted} />
      </Grid>
      <Grid sx={style.studentSaysContainer}>
        <StudentSays data={studentSaysAr} />
      </Grid>
      <ArServerFooter />
    </div>
  );
};

export default ArAbout;

const style = {
  aboutUsContainer: {
    background: "linear-gradient(to bottom, #D7F0FF, rgba(255, 255, 255, 0.7))",
    paddingX: { xs: "24px", sm: "24px", md: "3vw", lg: "6vw" },
  },
  whyChooseContainer: {
    paddingX: { xs: "24px", sm: "24px", md: "3vw", lg: "6vw" },
    marginY: { xs: "5vh", md: "10vh" },
  },
  getStartedContainer: {
    paddingX: { xs: "24px", sm: "24px", md: "3vw", lg: "6vw" },
    marginY: { xs: "5vh", md: "10vh" },
  },
  studentSaysContainer: {
    background: "#9EDCFF",
    paddingY: {
      xs: "5vh",
      md: "10vh",
    },
  },
};