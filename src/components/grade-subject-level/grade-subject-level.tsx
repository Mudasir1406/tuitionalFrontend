import React from "react";
import { Box, Grid } from "@mui/material";
import subjectLevelImage from "../../../public/assets/images/static/subject-level.png";
import { Header } from "@/components";
import Hero from "@/components/grade-subject-level/hero";
import HeroInfo from "@/components/grade-subject-level/hero-info";
import SectionsBox from "@/components/grade-subject-level/sectionsbox";
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
import Image from "next/image";

type IProps = {
  data: PageData;
  sequence: Component_Sequence_Type;
};

const GradeSubjectLevel: React.FC<IProps> = ({ data, sequence }) => {
  const renderSection = (name: string) => {
    switch (name) {
      case "Hero Section":
        return (
          <>
            <Box sx={styles.heroContanier}>
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
                        md: "90vh",
                        lg: "90vh",
                      },
                      width: "100%",
                      backgroundRepeat: "no-repeat",
                      position: "absolute",
                      bottom: 0,
                      zIndex: "0",
                    },
                  }}
                >
                  <Image
                    className="sr-only"
                    alt={data.hero_section.imageAltText}
                    src={data.hero_section.image}
                    width={752}
                    height={783}
                  ></Image>
                  <HeroInfo />
                </Grid>
              </Grid>
            </Box>
            <SectionsBox />
          </>
        );
      case "Main Content":
        return (
          data.main_content.header && <MainContent data={data?.main_content} />
        );
      case "Phone CTA ":
        return (
          data.phone_cta.paragraph && (
            <>
              <Box sx={styles.phoneContanier}>
                <Box sx={styles.phoneBackground} />
                <PhoneCta data={data?.phone_cta} />
              </Box>
            </>
          )
        );
      case "Demo Pointers":
        return (
          data.demo_pointers.demoPointersData.length > 0 && (
            <DemoPointers data={data?.demo_pointers} />
          )
        );
      case "Popular Subjects":
        return (
          data.popular_subjects.subjects.length > 0 && (
            <PopularSubjects data={data?.popular_subjects} />
          )
        );
      case "Education Counseling":
        return (
          data.education_counseling.paragraph && (
            <EducationalCounseling data={data?.education_counseling} />
          )
        );
      case "What our Student Says":
        return (
          data.what_our_student_says.paragraph && (
            <StudentSays data={data.what_our_student_says} />
          )
        );
      case "Blog CTA":
        return data.blog_CTA.paragraph && <BlogCta data={data?.blog_CTA} />;
      case "FAQs":
        return (
          data.Faqs.faqs.length > 0 && <FrequentlyQuestions data={data?.Faqs} />
        );
      case "what we offer":
        return <Offer />;
      case "get started":
        return <GetStarted />;
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
          <section key={section.placment} style={{ all: "unset" }}>
            {renderSection(section.name)}
          </section>
        ))}
      <Footer />
    </>
  );
};

export default GradeSubjectLevel;

const styles = {
  heroContanier: {
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
  },
  phoneContanier: { position: "relative", paddingBottom: "4vh" },
  phoneBackground: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: -1,
    background:
      "linear-gradient(0deg, #9EDCFF 29.51%, rgba(158, 220, 255, 0.959175) 34.02%, rgba(158, 220, 255, 0.91125) 39.76%, rgba(158, 220, 255, 0.826183) 44.67%, rgba(158, 220, 255, 0.688485) 50%, rgba(158, 220, 255, 0) 70.49%)",
  },
};
