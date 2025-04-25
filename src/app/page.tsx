import React from "react";
import { Header } from "../components";
import { Box, Container, Grid } from "@mui/material";
import lineSmall from "../../public/assets/images/static/linesmall.png";
import faqLine from "../../public/assets/images/static/faq-line.png";

import homeImage from "../../public/assets/images/static/girl-with-book.webp";
import { getTestimonials } from "@/services/testimonials/testimonials";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";
import Script from "next/script";
import { generateFaqSchema } from "@/utils/helper";
import { getFaqs } from "@/services/faqs/faqs";
import { Faqs_Type } from "@/types/grade-subject-level.types";
import "./globals.css";
import style from "./page.module.css";
import dynamic from "next/dynamic";
const Info = dynamic(() => import("../components/home/info"));
const Filter = dynamic(() => import("../components/home/filter"));
const Footer = dynamic(() => import("../components/footer"));
const ContactUs = dynamic(() => import("../components/home/contact-us"));
const GetStarted = dynamic(
  () => import("@/components/grade-subject-level/get-started")
);
const Trusted = dynamic(() => import("../components/home/trusted"));
const OurClient = dynamic(() => import("../components/home/our-client"));
const Faqs = dynamic(() => import("../components/home/faqs"));

export const metadata: Metadata = {
  title: "The Best 1-on-1 Online Tutoring Platform in the Gulf Region",
  description:
    " Looking for personalized online tutoring and don’t know where to go? Contact Tuitional to ace your examination results through individual online tutoring sessions.",
  alternates: {
    canonical: `${SITE_URL}`,
  },
};

const Home: React.FC = async () => {
  const data = await getTestimonials();
  const faqs: Faqs_Type[] = await getFaqs();

  const faqSchema = generateFaqSchema({
    header: "",
    headerTag: "",
    faqs: faqs,
    paragraph: "",
  });

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://tuitionaledu.com/#organization",
        name: "Tuitional",
        url: "https://tuitionaledu.com/",
        logo: "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.e75c8b12.png&w=640&q=75",
        description:
          "Tuitional is a leading online tutoring platform in the Gulf region, providing personalized tutoring services across various curricula including CAIE, Pearson Edexcel, AQA, and more.",
        sameAs: [
          "https://www.facebook.com/tuitionaledu",
          "https://www.instagram.com/tuitionaledu/",
          "https://www.linkedin.com/company/tuitionaledu/",
          "https://www.trustpilot.com/review/tuitionaledu.com",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          telephone: "+971 56 490 0376",
          email: "hello@tuitionaledu.com",
          availableLanguage: ["English"],
          areaServed: [
            "United Arab Emirates",
            "Saudi Arabia",
            "Qatar",
            "Kuwait",
            "Bahrain",
            "Oman",
          ],
        },
        foundingDate: "2022",
        foundingLocation: "Sharjah, UAE",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.4",
          reviewCount: "100",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://tuitionaledu.com/#website",
        url: "https://tuitionaledu.com/",
        name: "Tuitional - Expert Online Tutoring",
        description:
          "Tuitional provides high-quality online tutoring services for students following the British curriculum in the Gulf region.",
        inLanguage: "en",
        publisher: {
          "@id": "https://tuitionaledu.com/#organization",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://tuitionaledu.com/#home",
        url: "https://tuitionaledu.com/",
        name: "Tuitional - Expert Online Tutoring",
        description:
          "Tuitional offers personalised online tutoring for all international curriculums to students in the Gulf regions. Book your free demo class today!",
        isPartOf: {
          "@id": "https://tuitionaledu.com/#website",
        },
        inLanguage: "en",
        about: {
          "@id": "https://tuitionaledu.com/#organization",
        },
      },
    ],
  };
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
        // dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      <Header />
      <Container sx={styles.contanier}>
        {/* <Grid container>
          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            xs={12}
            paddingRight={{
              lg: 10,
            }}
          >
            <Filter />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12} sx={styles.infoGrid}>
            <Info />
          </Grid>
        </Grid> */}
        <div className={style.container}>
          <div className={style["grid-container"]}>
            <div className={style["hero"]}>
              {/* <Hero /> */}
              <Filter />
            </div>
            <div className={style["hero-picture"]}>
              {" "}
              <Info />
            </div>
          </div>
        </div>
      </Container>
      <Trusted />
      {/* <Container sx={{ maxWidth: { lg: "1450px" } }}> */}{" "}
      <Box sx={styles.verticalMargin}>
        <GetStarted />
      </Box>
      {/* </Container> */}
      <OurClient data={data} />
      <Box sx={styles.backgroundImage}>
        <Container
          sx={{
            maxWidth: { lg: "1450px" },
          }}
        >
          <Faqs />
        </Container>
      </Box>
      <Box sx={styles.verticalMargin}>
        <ContactUs />
      </Box>
      <Footer />
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
      // md: "200px",
      md: "120px",
      lg: 0,
      xl: 0,
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
