import React from "react";
import { Box, Grid } from "@mui/material";
import subjectLevelImage from "../../../public/assets/images/static/subject-level.png";
import { Header } from "@/components";
import Hero from "@/components/grade-subject-level/hero";
import HeroInfo from "@/components/grade-subject-level/hero-info";
import SectionsBox from "@/components/grade-subject-level/sectionsbox";
import subjectIGC from "../../../public/assets/images/static/subjects-bg-img.png";
import circleIGC from "../../../public/assets/images/svg/circle-subjects.svg";
import Offer from "@/components/curiculume/offer";
import GetStarted from "@/components/grade-subject-level/get-started";
import EducationalCounseling from "@/components/curiculume/educational-counseling";
import Footer from "@/components/footer";
import {
  Component_Sequence_Type,
  PageData,
} from "@/types/grade-subject-level.types";
import PhoneCta from "./phone-cta";
import DemoPointers from "./demo-pointers";
import MainContent from "./main-content";
import PopularSubjects from "@/components/curiculume/popular-igcse-subjects";
import FrequentlyQuestions from "./faqs";
import BlogCta from "./blog-cta";
import StudentSays from "./students-says";

type IProps = {
  data: PageData;
  sequence: Component_Sequence_Type;
};

const GradeSubjectLevel: React.FC<IProps> = ({ data, sequence }) => {
  console.log(sequence);
  const renderSection = (name: string) => {
    switch (name) {
      case "Hero Section":
        return (
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
                <Hero data={data?.hero_section} />
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
                    backgroundImage: `url(${
                      data.hero_section.image || subjectLevelImage.src
                    })`,
                    backgroundPosition: "bottom",
                    backgroundSize: "contain",
                    height: {
                      xs: "100vh",
                      sm: "100vh",
                      md: "80vh",
                      lg: "70vh",
                    },
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                    position: "absolute",
                    bottom: 0,
                    zIndex: "0",
                  },
                }}
              >
                <img
                  className="sr-only"
                  alt={data.hero_section.imageAltText}
                  src={data.hero_section.image}
                ></img>
                <HeroInfo />
              </Grid>
            </Grid>
          </Box>
        );
      case "Main Content":
        return <MainContent data={data?.main_content} />;
      case "Phone CTA ":
        return (
          <>
            <Box
              sx={{
                backgroundImage: `url(${subjectIGC.src})`,
                backgroundPosition: "center",
                height: { xs: "50vh", sm: "50vh", md: "100vh", lg: "45vh" },
                width: "100%",
                backgroundRepeat: "no-repeat",
                position: "relative",
              }}
            >
              <Box
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
                <PhoneCta data={data?.phone_cta} />
              </Box>
            </Box>
            <SectionsBox />
          </>
        );
      case "Demo Pointers":
        return <DemoPointers data={data?.demo_pointers} />;
      case "Popular Subjects":
        return <PopularSubjects data={data?.popular_subjects} />;
      case "Education Counseling":
        return <EducationalCounseling data={data?.education_counseling} />;
      case "What our Student Says":
        return <StudentSays />;
      case "Blog CTA":
        return <BlogCta data={data?.blog_CTA} />;
      case "FAQs":
        return <FrequentlyQuestions data={data?.Faqs} />;
      case "what we offer":
        return <Offer />;
      case "get started":
        return (
          <Grid
            container
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <GetStarted />
          </Grid>
        );
      // case "video section":
      //   return <div>Video Section</div>; // Assuming there’s a video component to add here
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      {sequence.sections
        .sort((a, b) => a.placment - b.placment)
        .map((section) => (
          <React.Fragment key={section.placment}>
            {renderSection(section.name)}
          </React.Fragment>
        ))}
      <Footer />
    </>
  );
};

export default GradeSubjectLevel;
