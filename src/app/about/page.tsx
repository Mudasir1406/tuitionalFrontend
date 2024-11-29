import React from "react";
import { Header } from "../../components";
import { Box, Container, Grid } from "@mui/material";
import Footer from "../../components/footer";

import aboutHero from "../../../public/assets/images/static/hero-about.webp";
import testimonialHeroMobile from "../../../public/assets/images/static/testimonialHeroMobile.png";
import { getTestimonials } from "@/services/testimonials/testimonials";
import GetStarted from "@/components/home/get-started";
// import StudentSays from "@/components/curiculume/students-says";
import HeroInfo from "@/components/about/hero-info";
import WhyChooseTuitional from "@/components/about/why-choose-tuitional";
import StudentSays from "@/components/grade-subject-level/students-says";
import AboutUs from "@/components/about/about-us";
import Hero from "@/components/about/hero/hero";
import styles from "./about.module.css";
import AboutLayout from "./layout";

const About: React.FC = async () => {
  const studentSays = {
    header: "What Our Students Say",
    headerTag: "h4",
    paragraph:
      "Students affiliated with Tuitional have always shared their exceptional academic journey in a positive way. Students at Tuitional have not only excelled in their required examination but have also improved their academic horizon and educational capabilities. Here is what our valued students have to share about their experience at Tuition.",
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://tuitionaledu.com/about/#webpage",
    url: "https://tuitionaledu.com/about",
    name: "About Tuitional",
    description:
      "Learn more about Tuitional, our mission, vision, and how we help students in the Gulf region achieve academic success through personalized online tutoring.",
    isPartOf: {
      "@id": "https://tuitionaledu.com/#website",
    },
    about: {
      "@id": "https://tuitionaledu.com/#organization",
    },
  };
  return (
    <AboutLayout schema={schema}>
      <Header />

      {/* <Container
        sx={{
          maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "90vw" },
          p: 0,
          padding: 0,
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
        <Grid container sx={{ p: 0, padding: 0 }}>
          <Grid item lg={5} md={12} sm={12} xs={12}>
            <Hero />
          </Grid>
          <Grid item lg={7} md={12} sm={12} xs={12} sx={styles.heroPicture}>
            <HeroInfo />
          </Grid>
        </Grid>
      </Container> */}

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

      <Grid sx={style.aboutUsContainer}>
        <AboutUs />
      </Grid>
      <Grid sx={style.whyChooseContainer}>
        <WhyChooseTuitional />
      </Grid>
      <Grid sx={style.getStartedContainer}>
        <GetStarted />
      </Grid>
      <Grid sx={style.studentSaysContainer}>
        <StudentSays data={studentSays} />
      </Grid>
      <Footer />
    </AboutLayout>
  );
};

export default About;

const style = {
  contanier: {},
  aboutUsContainer: {
    background: "linear-gradient(to bottom, #D7F0FF, rgba(255, 255, 255, 0.7))",
    paddingX: { xs: "24px", sm: "24px", md: "3vw", lg: "6vw" },
    // marginY: {
    //   xs: "70px",
    //   sm: "80px",
    //   md: "95px",
    //   lg: "105px",
    // },
  },

  whyChooseContainer: {
    paddingX: { xs: "24px", sm: "24px", md: "3vw", lg: "6vw" },
  },
  getStartedContainer: {
    paddingX: { xs: "24px", sm: "24px", md: "3vw", lg: "6vw" },
    marginY: {
      xs: "70px",
      sm: "80px",
      md: "95px",
      lg: "105px",
    },
  },
  studentSaysContainer: {
    background: "#9EDCFF",
    paddingY: {
      xs: "1vh",
      lg: "7vh",
    },
  },
  heroPicture: {
    background: {
      xs: "linear-gradient(178.64deg, #FDFDFD 18.41%, #38B6FF 69.11%)",
      lg: "none",
    },
    padding: 0,
    position: "relative",
    "::before": {
      content: "''",
      backgroundImage: {
        xs: `url(${aboutHero.src})`,
        sm: `url(${aboutHero.src})`,
        md: `url(${aboutHero.src})`,
        lg: `url(${aboutHero.src})`,
      },
      backgroundPosition: "bottom",
      backgroundSize: "contain",
      height: { xs: "400px", sm: "500px", md: "80vh", lg: "80vh" },
      width: "100%",
      backgroundRepeat: "no-repeat",
      position: "absolute",
      bottom: 0,
    },
  },
};
