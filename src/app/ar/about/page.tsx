import React from "react";
import ArHeader from "../../../components/header";
import ArServerFooter from "../../../components/ar-server-footer";
import { SITE_URL } from "@/utils/env";
import GetStarted from "@/components/home/get-started";
import HeroInfo from "@/components/about/hero-info";
import WhyChooseTuitional from "@/components/about/why-choose-tuitional";
import StudentSays from "@/components/grade-subject-level/students-says";
import AboutUs from "@/components/about/about-us";
import Hero from "@/components/about/hero/hero";
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
  const getStarted = await getStartedData("ar");

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
      <div className="bg-gradient-to-b from-[#D7F0FF] to-white/70 px-6 sm:px-6 md:px-[3vw] lg:px-[6vw]">
        <AboutUs />
      </div>
      <div className="my-[5vh] px-6 sm:px-6 md:my-[10vh] md:px-[3vw] lg:px-[6vw]">
        <WhyChooseTuitional />
      </div>
      <div className="my-[5vh] px-6 sm:px-6 md:my-[10vh] md:px-[3vw] lg:px-[6vw]">
        <GetStarted data={getStarted} />
      </div>
      <div className="bg-[#9EDCFF] py-[5vh] md:py-[10vh]">
        <StudentSays data={studentSaysAr} />
      </div>
      <ArServerFooter />
    </div>
  );
};

export default ArAbout;
