import React from "react";
import { Box, Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { getStartedData } from "@/services/get-started/get-started";
import { getVideoReviews } from "@/services/video-reviews/video-reviews";
import SectionsBox from "@/components/grade-subject-level/sectionsbox";
import Faqs from "@/components/home/faqs";

// Dynamic imports for all components
const HeaderV3 = dynamic(() => import("@/components/header-v3"), { ssr: true });
const HeroV2 = dynamic(
  () => import("@/components/grade-subject-level/heroV2"),
  {
    ssr: true,
  }
);
const Form = dynamic(
  () => import("@/components/grade-subject-level/form/form"),
  { ssr: true }
);
const CountdownTimer = dynamic(
  () => import("@/components/countdown/CountdownTimer"),
  { ssr: false }
);
const SchoolLogosSection = dynamic(
  () =>
    import(
      "@/components/grade-subject-level/school-logos-section/SchoolLogosSection"
    ),
  { ssr: true }
);
const TutorSectionV2 = dynamic(
  () => import("@/components/grade-subject-level/tutor-section/TutorSectionV2"),
  { ssr: true }
);
const BenifitsSection = dynamic(
  () =>
    import("@/components/grade-subject-level/benifts-section/BenifitsSection"),
  { ssr: true }
);
const StudentSaysV2 = dynamic(
  () => import("@/components/grade-subject-level/students-says-v2"),
  { ssr: true }
);
const BlogCta = dynamic(
  () => import("@/components/grade-subject-level/blog-cta"),
  { ssr: true }
);
const GetStartedV2 = dynamic(
  () => import("@/components/grade-subject-level/get-started-v2"),
  { ssr: true }
);
const FrequentlyQuestions = dynamic(
  () => import("@/components/grade-subject-level/faqs"),
  { ssr: true }
);
const PopularIgcseSubjectsV2 = dynamic(
  () => import("@/components/curiculume/popular-igcse-subjects-v2"),
  { ssr: true }
);
const TrustpilotCarousel = dynamic(
  () => import("@/components/trustpilot-carousel/TrustpilotCarousel"),
  { ssr: false }
);

const IgcsePage = async () => {
  const getStarted = await getStartedData();
  const videoReviews = await getVideoReviews();

  // Hardcoded hero section data
  const heroData = {
    header: "Expert IGCSE Tutoring - Achieve Your Best Grades",
    headerTag: "h1",
    paragraph:
      "1:1 Live Tutors, Past-Paper Strategy, Proven Results. Join 10,000+ Students Today.",
    image: "/assets/images/hero/igcse-hero.jpg",
    imageAltText: " ",
  };

  // Data for tutor section - will fetch from tutors_data collection
  const tutorSectionData = {
    isShow: true,
    header: "Meet Some Of Our Expert IGCSE Tutors",
    headerTag: "h2",
    paragraph:
      "Learn from qualified teachers with years of IGCSE teaching experience",
    curriculum: "IGCSE", // This will be used to filter tutors from tutors_data collection
    subject: "", // Empty string will fetch all IGCSE tutors
    view: "Horizontal Carousel", // Set display format to use new horizontal carousel
    sequenceNumber: 1,
  };

  // Data for benefits section - matches the expected igcse_tutoring_program structure
  const benefitsSectionData = {
    isShow: true,
    section: "Why Choose Our IGCSE Program",
    sectionTag: "h2",
    paragraph:
      "Discover the advantages of our comprehensive IGCSE tutoring program",
    buttonText: "Get Started",
    link: "/contact",
  };

  // Data for student testimonials
  const studentSaysData = {
    isShow: true,
    header: "What Our IGCSE Students Say",
    headerTag: "h2",
    paragraph: "Hear from students who achieved their goals with our help",
  };

  // Data for FAQs
  const faqsData = {
    isShow: true,
    header: "Frequently Asked Questions",
    headerTag: "h2",
    paragraph:
      "Find answers to common questions about our IGCSE tutoring program",
    faq: [
      {
        question: "What IGCSE subjects do you offer tutoring for?",
        answer:
          "We offer tutoring for all major IGCSE subjects including Mathematics, English, Sciences, and more.",
      },
      {
        question: "How are the tutoring sessions conducted?",
        answer:
          "All sessions are conducted online through our interactive platform with experienced IGCSE teachers.",
      },
      {
        question: "What is the duration of each tutoring session?",
        answer:
          "Standard sessions are 60 minutes long, but we can adjust based on your needs and preferences.",
      },
    ],
  };

  return (
    <Box sx={{ overflowX: "hidden", width: "100%", minHeight: "100vh" }}>
      <HeaderV3 />
      <CountdownTimer />

      {/* Hero Section with Form */}
      <Box sx={styles.heroContanier}>
        <Box sx={{ marginTop: { md: "2vh", lg: "18vh" }, width: "100%" }}>
          <Grid container spacing={2} sx={styles.heroDiv}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <HeroV2 data={heroData} withForm />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12} sx={{ margin: { xs: "24px 0", lg: "0" } }}>
              <Form />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* School Logos Section */}
      <Box sx={styles.verticalMargin}>
        <SchoolLogosSection />
      </Box>

      {/* Tutor Section */}
      <Box sx={styles.verticalMargin}>
        <TutorSectionV2 data={tutorSectionData} />
      </Box>

      {/* Benefits Section */}
      <Box sx={styles.verticalMargin}>
        <BenifitsSection data={benefitsSectionData} />
      </Box>

      {/* Popular IGCSE Subjects */}
      <Box sx={styles.verticalMargin}>
        <PopularIgcseSubjectsV2 
          title="Popular IGCSE Subjects We Cover"
          headerTag="h2"
        />
      </Box>

      {/* Trustpilot Reviews Carousel */}
      <Box sx={styles.verticalMargin}>
        <TrustpilotCarousel />
      </Box>

      {/* Student Says Section */}
      <Box sx={styles.verticalMargin}>
        <StudentSaysV2 data={studentSaysData} />
      </Box>

      {/* Blog CTA Section */}
      <Box sx={styles.verticalMargin}>
        <SectionsBox />
      </Box>

      {/* Get Started Section */}
      <Box sx={styles.verticalMargin}>
        <GetStartedV2 />
      </Box>

      {/* FAQs Section */}
      <Box sx={styles.verticalMargin}>
        {/* <FrequentlyQuestions data={faqsData} /> */}
        <Faqs />
      </Box>

      {/* <ServerFooter /> */}
    </Box>
  );
};

export default IgcsePage;

const styles = {
  verticalMargin: { marginY: { xs: "5vh", md: "6vh" } },
  heroContanier: {
    paddingTop: {
      xs: "120px",
      sm: "120px",
      md: "120px",
      lg: 0,
      xl: 0,
    },
    height: { xs: "auto", lg: "100vh" },
    display: "flex",
    alignItems: "center",
    position: "relative",
    paddingX: { xs: "3vw", sm: "3vw", lg: "0" },
    maxWidth: "100%",
    overflow: "hidden",
  },
  heroDiv: {
    alignItems: "center",
    padding: "100 0",
    maxWidth: "100%",
  },
};
