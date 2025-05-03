import React from "react";
import { Container, Grid } from "@mui/material";
import curiculumeImage from "../../../public/assets/images/static/curiclume.png";
import subjectIGC from "../../../public/assets/images/static/subjects-bg-img.png";
import circleIGC from "../../../public/assets/images/svg/circle-subjects.svg";
import { Header } from "@/components";
import Hero from "@/components/curiculume/hero";
import HeroInfo from "@/components/curiculume/hero-info";
import SectionsBox from "@/components/curiculume/sectionsbox";
import MathsSubjects from "@/components/curiculume/maths-subjects";
import CAIE from "@/components/curiculume/caie";
import IGCSMath from "@/components/curiculume/IGCS-math";
import GradingScale from "@/components/curiculume/grading-scale";
import AssessmentObjective from "@/components/curiculume/assessment-objective";
import SubjectOfferings from "@/components/curiculume/subject-offerings";
import Offer from "@/components/curiculume/offer";
import FeaturesOfTuitionals from "@/components/curiculume/features-of-tuitionals";
import TutorsDifferent from "@/components/curiculume/tutors-different";
import Pricing from "@/components/curiculume/pricing";
import StudentSays from "@/components/curiculume/students-says";
import TuitionalCompetitors from "@/components/curiculume/tuitional-competitors";
import GetStarted from "@/components/home/get-started";
import FrequentlyQuestions from "@/components/curiculume/frequently-questions";
import JoinUs from "@/components/curiculume/join-us";
import Footer from "@/components/footer";
import { getStartedData } from "@/services/get-started/get-started";
const Home: React.FC = async () => {
  const getStarted = await getStartedData();
  return (
    <>
      <Header />
      <Container
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
                backgroundImage: `url(${curiculumeImage.src})`,
                backgroundPosition: "bottom",
                backgroundSize: "contain",
                height: { xs: "100vh", sm: "100vh", md: "80vh", lg: "100vh" },
                width: "100%",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                bottom: 0,
              },
            }}
          >
            <HeroInfo />
          </Grid>
        </Grid>
      </Container>
      <Grid>
        <SectionsBox />
      </Grid>
      <Grid
        container
        sx={{
          backgroundImage: `url(${subjectIGC.src})`,
          backgroundPosition: "center",
          height: { xs: "120vh", sm: "50vh", md: "100vh", lg: "60vh" },
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
            backgroundSize: "contain", // Ensure the image scales properly
            height: { xs: "120vh", sm: "50vh", md: "100vh", lg: "70vh" },
            width: "100%",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            right: 0,
          }}
        >
          <MathsSubjects />
        </Grid>
      </Grid>

      <Grid>
        <CAIE />
      </Grid>
      <Grid>
        <IGCSMath />
      </Grid>
      <Grid>
        <GradingScale />
      </Grid>
      <Grid>
        <AssessmentObjective />
      </Grid>
      <Grid>
        <SubjectOfferings />
      </Grid>
      <Grid>
        <Offer />
      </Grid>
      <Grid>
        <FeaturesOfTuitionals />
      </Grid>
      <Grid>
        <TutorsDifferent />
      </Grid>
      <Grid>
        <Pricing />
      </Grid>
      <Grid>{/* <EducationalCounseling /> */}</Grid>
      <Grid>
        <StudentSays />
      </Grid>
      <Grid>
        {/* <PopularIgcseSubjects header={undefined} subjects={undefined} /> */}
      </Grid>
      <Grid>
        <TuitionalCompetitors />
      </Grid>
      <Grid sx={{ marginX: "3vh" }}>
        <GetStarted data={getStarted} />
      </Grid>
      <Grid>
        <FrequentlyQuestions />
      </Grid>
      <Grid>
        <JoinUs />
      </Grid>
      <Grid>
        <Footer />
      </Grid>
    </>
  );
};
export default Home;

const styles = {
  contanier: {},
};
