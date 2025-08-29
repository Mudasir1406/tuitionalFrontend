import React from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";
import styles from "./rtl-online.module.css";

// Dynamic imports for optimization
const ArHeader = dynamic(() => import("@/components/ar-header"), { ssr: true });
const ArServerFooter = dynamic(() => import("@/components/ar-server-footer"), { ssr: true });

export const metadata: Metadata = {
  title: "دروس خصوصية عبر الإنترنت - تيوشنال",
  description: "احصل على دروس خصوصية عبر الإنترنت من أفضل المعلمين المؤهلين للمناهج البريطانية في منطقة الخليج",
  alternates: {
    canonical: `${SITE_URL}/ar/online`,
  },
  openGraph: {
    title: "دروس خصوصية عبر الإنترنت - تيوشنال",
    description: "احصل على دروس خصوصية عبر الإنترنت من أفضل المعلمين المؤهلين للمناهج البريطانية في منطقة الخليج",
    url: `${SITE_URL}/ar/online`,
    locale: "ar",
  },
};

const ArOnlinePage = async () => {
  return (
    <>
      <ArHeader />
      <Box className={styles.container}>
        <Box className={styles.heroSection}>
          <h1>التعلم الإلكتروني المخصص</h1>
          <p>احصل على دروس خصوصية عبر الإنترنت من أفضل المعلمين المؤهلين للمناهج البريطانية في منطقة الخليج</p>
        </Box>
      </Box>
      <ArServerFooter />
    </>
  );
};

export default ArOnlinePage;