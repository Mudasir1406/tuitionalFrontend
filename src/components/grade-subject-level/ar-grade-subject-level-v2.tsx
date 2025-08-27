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
const WhyChoose = dynamic(() => import("@/components/curiculume/why-choose"), { ssr: true });
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
const SchoolLogosSection = dynamic(() => import("./school-logos-section/SchoolLogosSection"), { ssr: true });
const TutorSectionV2 = dynamic(() => import("./tutor-section/TutorSectionV2"), { ssr: true });
const BenifitsSection = dynamic(() => import("./benifts-section/BenifitsSection"), { ssr: true });
const BenifitsOfStudyingSection = dynamic(() => import("./benifts-of-studying-section/BenifitsOfStudyingSection"), { ssr: true });
const TutoringProgramSection = dynamic(() => import("./tutoring-program-section/TutoringProgramSection"), { ssr: true });
const LinkListViewSection = dynamic(() => import("./link-list-view/LinkListViewSection"), { ssr: true });

import { PageData } from "@/types/grade-subject-level.types";
import Form from "./form/form";
import { getStartedData } from "@/services/get-started/get-started";

type IProps = {
  data: PageData;
};

const ArGradeSubjectLevelV2: React.FC<IProps> = async ({ data }) => {
  const getStarted = await getStartedData('ar');

  const renderComponent = (key: string, value: any) => {
    switch (key) {
      case "hero_section":
        return (
          value && (
            <>
              <Box sx={styles.heroContanier}>
                <Grid container>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Hero data={value} />
                  </Grid>
                  <HeroInfo image={value?.image} imageAltText={value?.imageAltText} />
                </Grid>
              </Box>
              <ArSectionsBox />
            </>
          )
        );
      case "main_content":
        return (
          value && (
            <Box sx={styles.verticalMargin}>
              <MainContent data={value} />
            </Box>
          )
        );
      case "phone_cta":
        return (
          value && (
            <Box sx={styles.phoneContanier}>
              <Box sx={styles.phoneBackground} />
              <PhoneCta data={value} />
            </Box>
          )
        );
      case "demo_pointers":
        return (
          value?.demoPointersData?.length > 0 && (
            <Box sx={styles.verticalMargin}>
              <DemoPointers data={value} />
            </Box>
          )
        );
      case "popular_subjects":
        return (
          value?.subjects?.length > 0 && (
            <Box sx={styles.verticalMargin}>
              <PopularSubjects data={value} />
            </Box>
          )
        );
      case "education_counseling":
        return (
          value && (
            <Box sx={styles.verticalMargin}>
              <EducationalCounseling data={value} />
            </Box>
          )
        );
      case "what_our_student_says":
        return (
          value && (
            <Box sx={styles.verticalMargin}>
              <StudentSays data={value} />
            </Box>
          )
        );
      case "blog_CTA":
        return (
          value && (
            <Box sx={styles.verticalMargin}>
              <BlogCta data={value} />
            </Box>
          )
        );
      case "Faqs":
        return (
          value && (
            <Box sx={styles.verticalMargin}>
              <FrequentlyQuestions data={value} />
            </Box>
          )
        );
      case "offer":
        return (
          value && (
            <Box sx={styles.verticalMargin}>
              <Offer data={value} />
            </Box>
          )
        );
      case "why_choose":
        return (
          value && (
            <Box sx={styles.verticalMargin}>
              <WhyChoose data={value} />
            </Box>
          )
        );
      case "tutor_section":
        return (
          value && (
            <Box sx={styles.verticalMargin}>
              <TutorSection data={value} />
            </Box>
          )
        );
      case "school_logos_section":
        return (
          value && (
            <Box sx={styles.verticalMargin}>
              <SchoolLogosSection data={value} />
            </Box>
          )
        );
      case "tutor_section_v2":
        return (
          value && (
            <Box sx={styles.verticalMargin}>
              <TutorSectionV2 data={value} />
            </Box>
          )
        );
      case "benifits_section":
        return (
          value && (
            <Box sx={styles.verticalMargin}>
              <BenifitsSection data={value} />
            </Box>
          )
        );
      case "benifits_of_studying_section":
        return (
          value && (
            <Box sx={styles.verticalMargin}>
              <BenifitsOfStudyingSection data={value} />
            </Box>
          )
        );
      case "tutoring_program_section":
        return (
          value && (
            <Box sx={styles.verticalMargin}>
              <TutoringProgramSection data={value} />
            </Box>
          )
        );
      case "link_list_view_section":
        return (
          value && (
            <Box sx={styles.verticalMargin}>
              <LinkListViewSection data={value} />
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
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          {renderComponent(key, value)}
        </div>
      ))}
      <Box sx={styles.verticalMargin}>
        <GetStarted data={getStarted} />
      </Box>
      <ArServerFooter />
    </Box>
  );
};

export default ArGradeSubjectLevelV2;

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