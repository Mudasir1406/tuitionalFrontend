import React from "react";
import ArHeader from "../../../components/header";
import ArServerFooter from "../../../components/ar-server-footer";
import { SITE_URL } from "@/utils/env";
import Hero from "../../../components/careers/hero";
import TeamValues from "../../../components/careers/team-values";
import TopTalent from "../../../components/careers/top-talent";
import ApplyNow from "../../../components/careers/apply-now";
import HeroInfo from "../../../components/careers/hero-info";
import { Metadata } from "next";
import styles from "../../careers/careers.module.css";

export const metadata: Metadata = {
  title: "نحن نبحث دائماً عن الأشخاص الموهوبين - تيوشنال",
  description: "هل تريد أن تكون جزءاً من فريقنا الديناميكي؟ نحن نبحث دائماً عن الأفراد المتحمسين الذين يسعون دائماً لإحداث تأثير.",
  alternates: {
    canonical: `${SITE_URL}/ar/careers`,
  },
};

const ArCareers: React.FC = () => {
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
      <div className="bg-gradient-to-b from-[#D7F0FF] to-white/70">
        <div className="mx-auto lg:max-w-[1650px]">
          <TeamValues />
        </div>
      </div>
      <div className="mx-auto lg:max-w-[1650px]">
        <TopTalent />
      </div>
      <div id="careersForm">
        <ApplyNow />
      </div>
      <ArServerFooter />
    </div>
  );
};

export default ArCareers;
