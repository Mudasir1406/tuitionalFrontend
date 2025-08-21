import React from "react";
import { Box, Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { getStartedData } from "@/services/get-started/get-started";
import { getVideoReviews } from "@/services/video-reviews/video-reviews";
import SectionsBox from "@/components/grade-subject-level/sectionsbox";
import Faqs from "@/components/home/faqs";

// Dynamic imports for all components
const HeaderV2 = dynamic(() => import("@/components/header-v2"), { ssr: true });
const Hero = dynamic(() => import("@/components/grade-subject-level/hero"), { ssr: true });
const Form = dynamic(() => import("@/components/grade-subject-level/form/form"), { ssr: true });
const CountdownTimer = dynamic(() => import("@/components/countdown/CountdownTimer"), { ssr: false });
const SchoolLogosSection = dynamic(
  () => import("@/components/grade-subject-level/school-logos-section/SchoolLogosSection"),
  { ssr: true }
);
const TutorSectionV2 = dynamic(
  () => import("@/components/grade-subject-level/tutor-section/TutorSectionV2"),
  { ssr: true }
);
const BenifitsSection = dynamic(
  () => import("@/components/grade-subject-level/benifts-section/BenifitsSection"),
  { ssr: true }
);
const StudentSays = dynamic(
  () => import("@/components/grade-subject-level/students-says"),
  { ssr: true }
);
const BlogCta = dynamic(
  () => import("@/components/grade-subject-level/blog-cta"),
  { ssr: true }
);
const GetStarted = dynamic(
  () => import("@/components/grade-subject-level/get-started"),
  { ssr: true }
);
const FrequentlyQuestions = dynamic(
  () => import("@/components/grade-subject-level/faqs"),
  { ssr: true }
);
const ServerFooter = dynamic(() => import("@/components/server-footer"), { ssr: true });
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
    paragraph: "Get personalized 1-on-1 IGCSE tutoring from qualified teachers. Boost your grades with our proven teaching methods and comprehensive exam preparation.",
    image: "/assets/images/hero/igcse-hero.jpg",
    imageAltText: "IGCSE Online Tutoring"
  };

  // Data for tutor section - will fetch from tutors_data collection
  const tutorSectionData = {
    isShow: true,
    header: "Meet Our Expert IGCSE Tutors",
    headerTag: "h2",
    paragraph: "Learn from qualified teachers with years of IGCSE teaching experience",
    curriculum: "IGCSE", // This will be used to filter tutors from tutors_data collection
    subject: "", // Empty string will fetch all IGCSE tutors
    view: "Grid View", // Set display format
    sequenceNumber: 1
  };

  // Data for benefits section - matches the expected igcse_tutoring_program structure
  const benefitsSectionData = {
    isShow: true,
    section: "Why Choose Our IGCSE Program",
    sectionTag: "h2",
    paragraph: "Discover the advantages of our comprehensive IGCSE tutoring program",
    buttonText: "Get Started",
    link: "/contact"
  };

  // Data for student testimonials
  const studentSaysData = {
    isShow: true,
    header: "What Our IGCSE Students Say",
    headerTag: "h2",
    paragraph: "Hear from students who achieved their goals with our help"
  };

  // Data for FAQs
  const faqsData = {
    isShow: true,
    header: "Frequently Asked Questions",
    headerTag: "h2",
    paragraph: "Find answers to common questions about our IGCSE tutoring program",
    faq: [
      {
        question: "What IGCSE subjects do you offer tutoring for?",
        answer: "We offer tutoring for all major IGCSE subjects including Mathematics, English, Sciences, and more."
      },
      {
        question: "How are the tutoring sessions conducted?",
        answer: "All sessions are conducted online through our interactive platform with experienced IGCSE teachers."
      },
      {
        question: "What is the duration of each tutoring session?",
        answer: "Standard sessions are 60 minutes long, but we can adjust based on your needs and preferences."
      }
    ]
  };

  return (
    <>
      <CountdownTimer />
      <HeaderV2 />
      
      {/* Hero Section with Form */}
      <Box sx={styles.heroContanier}>
        <Box sx={{ marginTop: { md: "2vh", lg: "18vh" }, width: "100%" }}>
          <Grid container gap={4} sx={styles.heroDiv}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Hero data={heroData} withForm />
            </Grid>
            <Grid
              item
              lg={5}
              md={12}
              sm={12}
              xs={12}
              sx={{ margin: "24px 0" }}
            >
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

      {/* Trustpilot Reviews Carousel */}
      <Box sx={styles.verticalMargin}>
        <TrustpilotCarousel />
      </Box>

      {/* Student Says Section */}
      <Box sx={styles.verticalMargin}>
        <StudentSays data={studentSaysData} />
      </Box>

      {/* Blog CTA Section */}
      <Box sx={styles.verticalMargin}>
        <SectionsBox />
        
      </Box>

      {/* Get Started Section */}
      <Box sx={styles.verticalMargin}>
        <GetStarted data={getStarted} />
      </Box>

      {/* FAQs Section */}
      <Box sx={styles.verticalMargin}>
        {/* <FrequentlyQuestions data={faqsData} /> */}
                  <Faqs />

      </Box>

      {/* <ServerFooter /> */}
    </>
  );
};

export default IgcsePage;

const styles = {
  verticalMargin: { marginY: { xs: "5vh", md: "10vh" } },
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
  heroDiv: {
    alignItems: "center",
    padding: "100 0",
  },
};