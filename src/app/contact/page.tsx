import React from "react";
import { Header } from "../../components";

import Footer from "../../components/footer-wrapper";
import LearnTogeather from "../../components/contact/learn-togeather";
import { Box, Container, Grid } from "@mui/material";
import GetInTouch from "../../components/contact/get-in-touch/GetInTouch";
import Info from "../../components/contact/info";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Contact Tuitional Support for your enquiries",
  description: `Contact Tuitional to gain academic support and get answers to all your queries. Don't hesitate, we're just a click away.`,
  alternates: {
    canonical: `${SITE_URL}/contact`,
    languages: {
      en: `${SITE_URL}/contact`,
      ar: `${SITE_URL}/ar/contact`,
      "x-default": `${SITE_URL}/contact`,
    },
  },
};

const Contact: React.FC = () => {
  return (
    <>
      <BreadcrumbSchema
        id="contact-breadcrumb"
        items={[{ name: "Contact", url: "https://tuitionaledu.com/contact" }]}
      />
      <Header
        background={{
          height: {
            xs: "100px",
            sm: "100px",
            md: "200px",
            lg: "200px",
          },
          background: "#D7F0FF",
        }}
      />
      <Box sx={styles.background}>
        <Container sx={styles.contanier}>
          <LearnTogeather />
        </Container>
      </Box>
      <GetInTouch />

      <Container
        sx={{ maxWidth: { lg: "1450px", margin: "auto" }, marginTop: "5vh",marginBottom:'3vh' }}
      >
        <Info />
      </Container>
      <Footer />
    </>
  );
};

export default Contact;

const styles = {
  contanier: {
    maxWidth: { lg: "1450px" },
    paddingTop: {
      xs: "120px",
      sm: "150px",
      md: "200px",
      lg: "210px",
    },
    // height: "47vh",
  },
  background: {
    background: "#D7F0FF",
  },
};
