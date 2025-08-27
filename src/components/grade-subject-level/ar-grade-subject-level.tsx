import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";

// Arabic dynamic imports for optimization
const ArHeader = dynamic(() => import("@/components/ar-header"), { ssr: true });
const Hero = dynamic(() => import("@/components/grade-subject-level/hero"), { ssr: true });
const ArSectionsBox = dynamic(() => import("@/components/grade-subject-level/ar-sectionsbox"), { ssr: true });
const Offer = dynamic(() => import("@/components/curiculume/offer"), { ssr: true });
const GetStarted = dynamic(() => import("@/components/grade-subject-level/get-started"), { ssr: true });
const EducationalCounseling = dynamic(() => import("@/components/curiculume/educational-counseling"), { ssr: true });
const HeroInfo = dynamic(() => import("@/components/grade-subject-level/hero-info"), { ssr: true });
const ArServerFooter = dynamic(() => import("@/components/ar-server-footer"), { ssr: true });
const PhoneCta = dynamic(() => import("./phone-cta"), { ssr: true });
const DemoPointers = dynamic(() => import("./demo-pointers"), { ssr: true });
const MainContent = dynamic(() => import("./main-content"), { ssr: true });
const PopularSubjects = dynamic(() => import("@/components/curiculume/popular-igcse-subjects"), { ssr: true });
const FrequentlyQuestions = dynamic(() => import("./faqs"), { ssr: true });
const BlogCta = dynamic(() => import("./blog-cta"), { ssr: true });
const StudentSays = dynamic(() => import("./students-says"), { ssr: true });
const TutorSection = dynamic(() => import("./tutor-section/TutorSection"), { ssr: true });

import {
  Component_Sequence_Type,
  PageData,
} from "@/types/grade-subject-level.types";
import Form from "./form/form";
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
                    <Hero data={data?.hero_section} />
                  </Grid>
                  <HeroInfo
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
              <PhoneCta data={data?.phone_cta} />
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
              <EducationalCounseling data={data?.education_counseling} />
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
      case "Get Started":
        return (
          <Box sx={styles.verticalMargin}>
            <GetStarted data={getStarted} />
          </Box>
        );
      case "Offer":
        return (
          data.offer && (
            <Box sx={styles.verticalMargin}>
              <Offer data={data?.offer} />
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
    direction: "rtl",
  },
  verticalMargin: { 
    marginY: { xs: "5vh", md: "7vh" } 
  },
  heroContanier: {
    paddingTop: {
      xs: "120px",
      sm: "120px", 
      md: "120px",
      lg: 0,
      xl: 0,
    },
    height: { xs: "100%", lg: "100vh" },
    display: "flex",
    alignItems: "center",
    position: "relative",
    marginX: { xs: "3vw", sm: "3vw", lg: "0" },
  },
  phoneContanier: {
    position: "relative",
    height: { xs: "100%", lg: "100vh" },
    display: "flex",
    alignItems: "center",
    marginX: { xs: "3vw", sm: "3vw", lg: "0" },
  },
  phoneBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, #E7F6FF 0%, #F0F9FF 100%)",
    borderRadius: "20px",
    zIndex: -1,
  },
};