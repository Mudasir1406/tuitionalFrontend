import React from "react";
import { Box, Grid, } from "@mui/material";
import subjectLevelImage from "../../../public/assets/images/static/subject-level.png";
import { Header } from "@/components";
import Hero from "@/components/grade-subject-level/hero";
import HeroInfo from "@/components/grade-subject-level/hero-info";
import SectionsBox from "@/components/grade-subject-level/sectionsbox";
import StudentSays from "@/components/grade-subject-level/students-says";
import FindingCambridge from "@/components/grade-subject-level/finding-cambridge ";
import subjectIGC from "../../../public/assets/images/static/subjects-bg-img.png";
import circleIGC from '../../../public/assets/images/svg/circle-subjects.svg'
import ChemistryTutoring from "@/components/grade-subject-level/chemistry-tutoring";
import TutoringOptions from "@/components/grade-subject-level/Tutoring-options";
import PopularIgcseSubjects from "@/components/curiculume/popular-igcse-subjects";
import Offer from "@/components/curiculume/offer";
import GetStarted from "@/components/grade-subject-level/get-started";
import EducationalCounseling from "@/components/curiculume/educational-counseling";
// import FrequentlyQuestions from "@/components/curiculume/frequently-questions";
import ReviewBlog from "@/components/grade-subject-level/review-blog";
import Footer from "@/components/footer";
import Questions from "@/components/grade-subject-level/Questions";

const Grade: React.FC = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          width: { lg: "100%", sm: "100%" },
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
          position: "relative",
        }}
      >
        <Grid container>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Hero />
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
                backgroundImage: `url(${subjectLevelImage.src})`,
                backgroundPosition: "bottom",
                backgroundSize: "contain",
                height: { xs: "50vh", sm: "100vh", md: "80vh", lg: "70vh" },
                width: "100%",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                bottom: 60,
                zIndex: "1",
              },
            }}
          >
            <HeroInfo />
          </Grid>
        </Grid>
      </Box>
      <Grid>
        <SectionsBox />
      </Grid>
      <Grid>
        <StudentSays />
      </Grid>
      <Grid container
        sx={{
          backgroundImage: `url(${subjectIGC.src})`,
          backgroundPosition: "center",
          height: { xs: "120vh", sm: "50vh", md: "100vh", lg: "45vh" },
          width: "100%",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <Grid
          container
          sx={{
            backgroundImage: `url(${circleIGC.src})`,
            backgroundPosition: "right", // This will align the circle image to the right
            backgroundSize: "contain",   // Ensure the image scales properly
            height: { xs: "120vh", sm: "50vh", md: "100vh", lg: "50vh" },
            width: "100%",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            right: 0,
          }}
        >
          <FindingCambridge />
        </Grid>
      </Grid>
      <Grid>
        <ChemistryTutoring />
      </Grid>
      <Grid>
        <TutoringOptions />
      </Grid>
      <PopularIgcseSubjects />
      <Offer />
      <GetStarted />
      <EducationalCounseling />
      <Questions />
      <ReviewBlog />
      <Footer />
    </>
  );
};
export default Grade;

const style = {
  contanier: {},
  icontxt: {
    display: "flex",
  }
};
