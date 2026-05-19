import React from "react";
import { Header } from "../../components";
import Footer from "../../components/footer-wrapper";

import Hero from "../../components/careers/hero";
import TeamValues from "../../components/careers/team-values";
import TopTalent from "../../components/careers/top-talent";
import ApplyNow from "../../components/careers/apply-now";
import HeroInfo from "../../components/careers/hero-info";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";

export const metadata: Metadata = {
  title: "We Are Always on the Lookout for Talented People",
  description: ` Want to be part of our dynamic team? We are always on the lookout for passionate individuals who are always eager to make an impact.`,
  alternates: {
    canonical: `${SITE_URL}/careers`,
  },
};
import styles from "./careers.module.css";

const Careers: React.FC = () => {
  return (
    <>
      <Header heroClassName="h-[10vh] sm:h-[10vh] md:h-[20vh] lg:h-[30vh] bg-gradient-to-b from-[#D7F0FF] to-white/70" />
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
      <div className="bg-gradient-to-b from-[#D7F0FF] to-white/70">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:max-w-[1650px] lg:px-8">
          <TeamValues />
        </div>
      </div>
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:max-w-[1650px] lg:px-8">
        <TopTalent />
      </div>
      <div id="careersForm" className="mt-[5vh] pb-[5vh] md:mt-[10vh] md:pb-[10vh]">
        <ApplyNow />
      </div>
      <Footer />
    </>
  );
};

export default Careers;
