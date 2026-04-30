import React from "react";
import { Header } from "../../components";
import Footer from "../../components/footer-wrapper";
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

      <div className="bg-gradient-to-b from-[#D7F0FF] to-white/70 px-6 sm:px-6 md:px-[3vw] lg:px-[6vw]">
        <AboutUs />
      </div>
      <div className="my-[5vh] px-6 sm:px-6 md:my-[10vh] md:px-[3vw] lg:px-[6vw]">
        <WhyChooseTuitional />
      </div>
      <div className="my-[5vh] px-6 sm:px-6 md:my-[10vh] md:px-[3vw] lg:px-[6vw]">
        <GetStarted data={getStarted} />
      </div>
      <div className="bg-[#9EDCFF] py-[5vh] md:py-[10vh]">
        <StudentSays data={studentSays} />
      </div>
      <Footer />
    </>
  );
};

export default About;
