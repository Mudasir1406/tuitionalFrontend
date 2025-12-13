import React from "react";
import ArHeader from "../../../components/ar-header";
import { Box, Container, Grid } from "@mui/material";
import ArServerFooter from "../../../components/ar-server-footer";
import { SITE_URL } from "@/utils/env";
import ArHero from "../../../components/careers/ar-hero";
import ArTeamValues from "../../../components/careers/ar-team-values";
import ArTopTalent from "../../../components/careers/ar-top-talent";
import ArApplyNow from "../../../components/careers/ar-apply-now";
import ArHeroInfo from "../../../components/careers/ar-hero-info";
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
            <ArHero />
          </div>
          <div className={styles["hero-picture"]}>
            <ArHeroInfo />
          </div>
        </div>
      </div>
      <Box sx={style.contanier}>
        <Container sx={{ maxWidth: { lg: "1650px" } }}>
          <ArTeamValues />
        </Container>
      </Box>
      <Container sx={{ maxWidth: { lg: "1650px" } }}>
        <ArTopTalent />
      </Container>
      <div id="careersForm">
        <ArApplyNow />
      </div>
      <ArServerFooter />
    </div>
  );
};

export default ArCareers;

const style = {
  contanier: {
    background: "linear-gradient(to bottom, #D7F0FF, rgba(255, 255, 255, 0.7))",
  },
};