import React from "react";
import { Header } from "../../components";
import { Grid } from "@mui/material";
import Footer from "../../components/footer";
import aboutHero from "../../../public/assets/images/static/hero-about.webp";
import GetStarted from "@/components/home/get-started";
import HeroInfo from "@/components/about/hero-info";
import WhyChooseTuitional from "@/components/about/why-choose-tuitional";
import StudentSays from "@/components/grade-subject-level/students-says";
import AboutUs from "@/components/about/about-us";
import Hero from "@/components/about/hero/hero";
import styles from "./about.module.css";
import { getStartedData } from "@/services/get-started/get-started";

const studentSays = {
  header: "What Our Students Say",
  headerTag: "h4",
  paragraph:
    "Students affiliated with Tuitional have always shared their exceptional academic journey in a positive way. Students at Tuitional have not only excelled in their required examination but have also improved their academic horizon and educational capabilities. Here is what our valued students have to share about their experience at Tuition.",
};
const About: React.FC = async () => {
  const getStarted = await getStartedData();
  return (
    <>
      <Header />
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
        <GetStarted data={getStarted} />
      </Grid>
      <Grid sx={style.studentSaysContainer}>
        <StudentSays data={studentSays} />
      </Grid>
      <Footer />
    </>
  );
};

export default About;

const style = {
  contanier: {},
  verticalMargin: { marginY: { xs: "5vh", md: "10vh" } },

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
    marginY: { xs: "5vh", md: "10vh" },
  },
  getStartedContainer: {
    paddingX: { xs: "24px", sm: "24px", md: "3vw", lg: "6vw" },
    marginY: { xs: "5vh", md: "10vh" },
    // marginY: {
    //   xs: "70px",
    //   sm: "80px",
    //   md: "95px",
    //   lg: "105px",
    // },
  },
  studentSaysContainer: {
    background: "#9EDCFF",
    // xs: "5vh", md: "10vh"
    paddingY: {
      xs: "5vh",
      md: "10vh",
      // lg: "7vh",
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
