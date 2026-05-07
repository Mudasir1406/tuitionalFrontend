import React from "react";
import { Box, Container } from "@mui/material";
import lineSmall from "../../public/assets/images/static/linesmall.png";
import faqLine from "../../public/assets/images/static/faq-line.webp";
import dynamic from "next/dynamic";

import homeImage from "../../public/assets/images/static/girl-with-book.webp";
import { getTestimonials } from "@/services/testimonials/testimonials";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";
import "./globals.css";
import style from "./page.module.css";
import { Header } from "../components";
import Image from "next/image";
import { getFilterData } from "@/services/filter-data/filter-data";
import { getStartedData } from "@/services/get-started/get-started";
import LazyLoadWrapper from "@/components/lazy-load-wrapper";
// Critical above-the-fold - Load with SSR
const Info = dynamic(() => import("../components/home/info"), {
  ssr: true,
});
const Filter = dynamic(() => import("../components/home/filter"), {
  ssr: true,
});

// Below-the-fold - Lazy load with optimized placeholders and viewport detection
const Trusted = dynamic(() => import("../components/home/trusted"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "200px",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "#e2e8f0",
          opacity: 0.5,
        }}
      />
    </div>
  ),
});
const OurClient = dynamic(() => import("../components/home/our-client"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "400px", backgroundColor: "transparent" }} />
  ),
});
const Faqs = dynamic(() => import("../components/home/faqs"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "300px", backgroundColor: "transparent" }} />
  ),
});
const ContactUs = dynamic(() => import("../components/home/contact-us"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "400px", backgroundColor: "transparent" }} />
  ),
});

// Footer and non-critical
const GetStarted = dynamic(
  () => import("@/components/grade-subject-level/get-started"),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: "300px", backgroundColor: "#f5f5f5" }} />
    ),
  },
);
const ServerFooter = dynamic(() => import("../components/server-footer"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "500px", backgroundColor: "#f5f5f5" }} />
  ),
});

export const metadata: Metadata = {
  title: "Tuitional: Live 1-on-1 IGCSE & A-Level Tutoring in the Gulf",
  description:
    "Struggling to find quality tutors in the Gulf? Tuitional offers live 1-on-1 sessions with 500+ experts for IGCSE, A-Levels & IB. Start today!",
  alternates: {
    canonical: `${SITE_URL}`,
    languages: {
      en: `${SITE_URL}`,
      ar: `${SITE_URL}/ar`,
      "x-default": `${SITE_URL}`,
    },
  },
};
const Home: React.FC = async () => {
  const data = await getTestimonials();
  const filterData = await getFilterData();
  const getStarted = await getStartedData();
  return (
    <>
      <Header />
      <Container sx={styles.contanier}>
        <div className={style["grid-container"]}>
          <div className={style["hero"]}>
            <Filter data={filterData} />
          </div>
          <div className={style["hero-picture"]}>
            <div className={style["image-container"]}>
              <Image
                src={homeImage}
                alt="Student learning with Tuitional"
                fill
                priority
                quality={85}
                sizes="(max-width: 575px) 90vw, (max-width: 768px) 45vw, (max-width: 1200px) 35vw, 500px"
                className={style.image}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQ4MCIgdmlld0JveD0iMCAwIDY0MCA0ODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idHJhbnNwYXJlbnQiIC8+PC9zdmc+"
                loading="eager"
              />
            </div>
            <Info />
          </div>
        </div>
      </Container>
      <LazyLoadWrapper minHeight="200px">
        <Trusted />
      </LazyLoadWrapper>
      <Box sx={styles.verticalMargin}>
        <LazyLoadWrapper minHeight="300px">
          <GetStarted data={getStarted} />
        </LazyLoadWrapper>
      </Box>
      <LazyLoadWrapper minHeight="400px">
        <OurClient data={data} />
      </LazyLoadWrapper>
      <Box sx={styles.backgroundImage}>
        <Container
          sx={{
            maxWidth: { lg: "1450px" },
          }}
        >
          <LazyLoadWrapper minHeight="300px">
            <Faqs />
          </LazyLoadWrapper>
        </Container>
      </Box>
      <Box sx={styles.verticalMargin}>
        <LazyLoadWrapper minHeight="400px">
          <ContactUs filterData={filterData} />
        </LazyLoadWrapper>
      </Box>
      <LazyLoadWrapper minHeight="500px">
        <ServerFooter />
      </LazyLoadWrapper>
    </>
  );
};

export default Home;

const styles = {
  verticalMargin: { marginY: { xs: "5vh", md: "10vh" } },

  contanier: {
    maxWidth: { lg: "1650px" },
    paddingTop: {
      xs: "120px",
      sm: "120px",
      md: "120px",
      lg: "70px",
      xl: "70px",
    },
    minHeight: { xs: "100%", lg: "100vh" },
    display: "flex",
    alignItems: "end",
  },
  infoGrid: {
    position: "relative",
    "::before": {
      content: "''",
      backgroundImage: `url(${homeImage.src})`,
      backgroundPosition: "bottom",
      backgroundSize: "contain",
      height: { xs: "400px", sm: "400px", md: "80vh", lg: "80vh" },
      width: "100%",
      backgroundRepeat: "no-repeat",
      position: "absolute",
      bottom: 0,
    },
  },
  backgroundImage: {
    position: "relative",
    width: "100%",
    height: "100%",

    "::before": {
      content: "''",
      backgroundImage: {
        xs: `url(${lineSmall.src})`,
        lg: `url(${faqLine.src})`,
      },
      backgroundSize: "cover",
      backgroundPosition: "top",
      position: "absolute",
      bottom: {
        xs: "90%",
        sm: "83%",
        md: "80%",
        lg: -90,
      },
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: {
        xs: "25vw",
        lg: "281px",
      },
      objectFit: "contain",
    },
  },
};
