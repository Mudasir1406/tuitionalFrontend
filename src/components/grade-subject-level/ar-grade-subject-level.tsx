import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";

// Arabic dynamic imports for optimization
const ArHeader = dynamic(() => import("@/components/ar-header"), { ssr: true });
const ArHero = dynamic(() => import("@/components/grade-subject-level/ar-hero"), { ssr: true });
const ArSectionsBox = dynamic(() => import("@/components/grade-subject-level/ar-sectionsbox"), { ssr: true });
const ArOffer = dynamic(() => import("@/components/curiculume/ar-offer"), { ssr: true });
const ArGetStarted = dynamic(() => import("@/components/grade-subject-level/ar-get-started"), { ssr: true });
const ArEducationalCounseling = dynamic(() => import("@/components/curiculume/ar-educational-counseling"), { ssr: true });
const ArHeroInfo = dynamic(() => import("@/components/grade-subject-level/ar-hero-info"), { ssr: true });
const ArServerFooter = dynamic(() => import("@/components/ar-server-footer"), { ssr: true });
const ArPhoneCta = dynamic(() => import("./ar-phone-cta"), { ssr: true });
const DemoPointers = dynamic(() => import("./demo-pointers"), { ssr: true });
const MainContent = dynamic(() => import("./main-content"), { ssr: true });
const PopularSubjects = dynamic(() => import("@/components/curiculume/popular-igcse-subjects"), { ssr: true });
const FrequentlyQuestions = dynamic(() => import("./faqs"), { ssr: true });
const BlogCta = dynamic(() => import("./blog-cta"), { ssr: true });
const StudentSays = dynamic(() => import("./students-says"), { ssr: true });
const ArTutorSection = dynamic(() => import("./tutor-section/ArTutorSection"), { ssr: true });

import {
  Component_Sequence_Type,
  PageData,
} from "@/types/grade-subject-level.types";
import { getStartedData } from "@/services/get-started/get-started";

type IProps = {
  data: PageData;
  sequence: Component_Sequence_Type;
};

const ArGradeSubjectLevel: React.FC<IProps> = async ({ data, sequence }) => {
  const getStarted = await getStartedData('ar');
  
  const renderSection = (name: string) => {
    switch (name) {
      case "Hero Section":
        return (
          <>
            {data?.hero_section && (
              <Box sx={styles.heroContanier}>
                <Grid container>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <ArHero data={data?.hero_section} />
                  </Grid>
                  <ArHeroInfo
                    image={data?.hero_section?.image}
                    imageAltText={data?.hero_section?.imageAltText}
                  />
                </Grid>
              </Box>
            )}
            <ArSectionsBox />
          </>
        );
      case "Main Content":
        return (
          data.main_content && (
            <Box sx={styles.verticalMargin}>
              <MainContent data={data?.main_content} />
            </Box>
          )
        );
      case "Phone CTA ":
        return (
          data.phone_cta && (
            <Box sx={styles.phoneContanier}>
              <Box sx={styles.phoneBackground} />
              <ArPhoneCta data={data?.phone_cta} />
            </Box>
          )
        );
      case "Demo Pointers":
        return (
          data?.demo_pointers?.demoPointersData.length > 0 && (
            <Box sx={styles.verticalMargin}>
              <DemoPointers data={data?.demo_pointers} />
            </Box>
          )
        );
      case "Popular Subjects":
        return (
          data?.popular_subjects?.subjects.length > 0 && (
            <Box sx={styles.verticalMargin}>
              <PopularSubjects data={data?.popular_subjects} />
            </Box>
          )
        );
      case "Education Counseling":
        return (
          data.education_counseling && (
            <Box sx={styles.verticalMargin}>
              <ArEducationalCounseling data={data?.education_counseling} />
            </Box>
          )
        );
      case "What our Student Says":
        return (
          data.what_our_student_says && (
            <Box sx={styles.verticalMargin}>
              <StudentSays data={data.what_our_student_says} />
            </Box>
          )
        );
      case "Blog CTA":
        return (
          data.blog_CTA && (
            <Box sx={styles.verticalMargin}>
              <BlogCta data={data?.blog_CTA} />
            </Box>
          )
        );
      case "FAQs":
        return (
          data.Faqs && (
            <Box sx={styles.verticalMargin}>
              <FrequentlyQuestions data={data?.Faqs} />
            </Box>
          )
        );
      case "get started":
        return (
          <Box sx={styles.verticalMargin}>
            <ArGetStarted data={getStarted} />
          </Box>
        );
      case "what we offer":
        return (
          <Box sx={styles.verticalMargin}>
            <ArOffer />
          </Box>
        );
      case "tutor section":
        return (
          data.tutor_section && (
            <Box sx={styles.verticalMargin}>
              <ArTutorSection data={data?.tutor_section} />
            </Box>
          )
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={styles.rtlContainer}>
      <ArHeader />
      {sequence?.sections?.sort((a, b) => a.placment - b.placment).map((section, index) => (
        <div key={index}>
          {renderSection(section.name)}
        </div>
      ))}
      <ArServerFooter />
    </Box>
  );
};

export default ArGradeSubjectLevel;

const styles = {
  rtlContainer: {
    direction: "rtl" as const,
  },
  verticalMargin: { marginY: { xs: "5vh", md: "10vh" } },
  heroContanier: {
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
    marginX: { xs: "3vw", sm: "3vw", lg: "0" },
  },
  phoneContanier: { position: "relative", paddingBottom: "5vh" },
  phoneBackground: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: -1,
    background:
      "linear-gradient(0deg, #9EDCFF 29.51%, rgba(158, 220, 255, 0.959175) 34.02%, rgba(158, 220, 255, 0.91125) 39.76%, rgba(158, 220, 255, 0.826183) 44.67%, rgba(158, 220, 255, 0.688485) 50%, rgba(158, 220, 255, 0) 70.49%)",
  },
};