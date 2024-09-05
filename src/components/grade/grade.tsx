import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import subjectLevelImage from "../../../public/assets/images/static/subject-level.png";
import { Header } from "@/components";
import Hero from "@/components/grade-subject-level/hero";
import HeroInfo from "@/components/grade-subject-level/hero-info";
import SectionsBox from "@/components/grade-subject-level/sectionsbox";
import StudentSays from "@/components/grade-subject-level/students-says";
import subjectIGC from "../../../public/assets/images/static/subjects-bg-img.png";
import circleIGC from "../../../public/assets/images/svg/circle-subjects.svg";
import ChemistryTutoring from "@/components/grade-subject-level/chemistry-tutoring";
import TutoringOptions from "@/components/grade-subject-level/Tutoring-options";
import PopularIgcseSubjects from "@/components/curiculume/popular-igcse-subjects";
import Offer from "@/components/curiculume/offer";
import GetStarted from "@/components/grade-subject-level/get-started";
import EducationalCounseling from "@/components/curiculume/educational-counseling";
import ReviewBlog from "@/components/grade-subject-level/review-blog";
import Footer from "@/components/footer";
import Questions from "@/components/grade-subject-level/Questions";
import FindingCambridge from "@/components/grade-subject-level/finding-cambridge ";
type IProps = {
  data: any;
};

const Grade: React.FC<IProps> = ({ data }: any) => {
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
            <Hero data={data?.HeroSection} />
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
                height: { xs: "100vh", sm: "100vh", md: "80vh", lg: "70vh" },
                width: "100%",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                bottom: 0,
                zIndex: "0",

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
        <StudentSays data={data?.WhatOurStudentsSays} />
      </Grid>
      <Grid
        container
        sx={{
          backgroundImage: `url(${subjectIGC.src})`,
          backgroundPosition: "center",
          height: { xs: "50vh", sm: "50vh", md: "100vh", lg: "45vh" },
          width: "100%",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <Grid
          container
          sx={{
            backgroundImage: `url(${circleIGC.src})`,
            backgroundPosition: "right",
            backgroundSize: "contain",
            height: { xs: "50vh", sm: "50vh", md: "100vh", lg: "50vh" },
            width: "100%",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <FindingCambridge
            header={data?.Section1CTA?.header}
            data={data?.Section1CTA}
          />
        </Grid>
      </Grid>
      <Grid>
        <ChemistryTutoring
          data={data?.Section2}
        />
      </Grid>
      <Grid>
        <TutoringOptions
          Paragraph={data.Section3.Paragraph}
          Header={data.Section3.Header}
          SubjectsArray={data?.Section3.SubjectsArray}
        />
      </Grid>
      <Grid>
        <PopularIgcseSubjects
          header={data?.Section4.header}
          subjects={data.Section4.subjects}
        />
      </Grid>
      <Grid>
        <Offer />
      </Grid>
      <Grid>
        <GetStarted />
      </Grid>
      <Grid>
        <EducationalCounseling data={data?.Section5} />
      </Grid>
      <Grid>
        <ReviewBlog data={data?.Section6} />
      </Grid>
      <Grid>
        <Questions data={data?.faq} />
      </Grid>
      <Footer />
    </>
  );
};
export default Grade;
