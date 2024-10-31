import React from "react";
import { Header } from "../components";
import Filter from "../components/home/filter";
import { Box, Container, Grid } from "@mui/material";
import Info from "../components/home/info";
import lineSmall from "../../public/assets/images/static/linesmall.png";
import faqLine from "../../public/assets/images/static/faq-line.png";
import Trusted from "../components/home/trusted";
import GetStarted from "../components/home/get-started";
import OurClient from "../components/home/our-client";
import Faqs from "../components/home/faqs";
import Footer from "../components/footer";
import ContactUs from "../components/home/contact-us";
import homeImage from "../../public/assets/images/static/girl-with-book.png";
import { getTestimonials } from "@/services/testimonials/testimonials";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";
import Script from "next/script";
import { generateFaqSchema } from "@/utils/helper";
import { getFaqs } from "@/services/faqs/faqs";
import { Faqs_Type } from "@/types/grade-subject-level.types";

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
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      <Header />
      <Container sx={styles.contanier}>
        <Grid container>
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
        </Grid>
      </Container>
      <Trusted />
      <Container sx={{ maxWidth: { lg: "1450px" } }}>
        <GetStarted />
      </Container>
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
      <ContactUs />
      <Footer />
    </>
  );
};

export default Home;

const styles = {
  contanier: {
    maxWidth: { lg: "1650px" },
    paddingTop: {
      xs: "120px",
      sm: "150px",
      md: "200px",
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
