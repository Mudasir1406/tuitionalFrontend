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

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Container
        sx={{
          maxWidth: { lg: "1650px" },
          paddingTop: {
            xs: "120px",
            sm: "150px",
            md: "200px",
            lg: 0,
            xl: 0,
          },
          height: { xs: "100%", lg: "100vh" },
          display: "flex",
          alignItems: "end",
        }}
      >
        <Grid container>
          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            xs={12}
            sx={{
              paddingRight: {
                lg: 10,
              },
            }}
          >
            <Filter />
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            xs={12}
            sx={{
              position: "relative",
              "::before": {
                content: "''",
                backgroundImage: `url(${homeImage.src})`,
                backgroundPosition: "bottom",
                backgroundSize: "contain",
                height: { xs: "400px", sm: "400px", md: "784px", lg: "784px" },
                width: "100%",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                bottom: 0,
              },
            }}
          >
            <Info />
          </Grid>
        </Grid>
      </Container>
      <Trusted />
      <Container sx={{ maxWidth: { lg: "1450px" } }}>
        <GetStarted />
      </Container>
      <OurClient />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",

          "::before": {
            content: "''",
            backgroundImage: {
              xs: `url(${lineSmall})`,
              lg: `url(${faqLine})`,
            },
            backgroundSize: "cover",
            backgroundPosition: "top",
            position: "absolute",
            bottom: {
              xs: 750,
              lg: -90,
            },
            display: {
              xs: "block",
              sm: "none",
              md: "none",
              lg: "block",
            },
            backgroundRepeat: "no-repeat",
            width: "100vw",
            height: {
              xs: "108px",
              lg: "281px",
            },
          },
        }}
      >
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
  contanier: {},
};
