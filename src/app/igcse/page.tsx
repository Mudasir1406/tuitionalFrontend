import React from "react";
import { Box, Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { leagueSpartan } from "@/app/fonts";

// Critical above-the-fold components - load immediately  
import HeaderV3 from "@/components/header-v3";
import HeroV2 from "@/components/grade-subject-level/heroV2";
import Form from "@/components/grade-subject-level/form/form";
import SchoolLogosSection from "@/components/grade-subject-level/school-logos-section/SchoolLogosSection";

// Progressive loading - only load when needed
const CountdownTimer = dynamic(
  () => import("@/components/countdown/CountdownTimer"),
  { 
    ssr: false,
    loading: () => null // No loading state to prevent layout shifts
  }
);

// Individual components for lazy loading - Enable SSR for better performance

const TutorSectionV2 = dynamic(
  () => import("@/components/grade-subject-level/tutor-section/TutorSectionV2"),
  { ssr: true, loading: () => <Box sx={{ height: "400px" }} /> }
);

const BenifitsSection = dynamic(
  () => import("@/components/grade-subject-level/benifts-section/BenifitsSection"),
  { ssr: true, loading: () => <Box sx={{ height: "300px" }} /> }
);

const PopularIgcseSubjectsV2 = dynamic(
  () => import("@/components/curiculume/popular-igcse-subjects-v2"),
  { ssr: true, loading: () => <Box sx={{ height: "350px" }} /> }
);

const TrustpilotCarousel = dynamic(
  () => import("@/components/trustpilot-carousel/TrustpilotCarousel"),
  { ssr: false, loading: () => <Box sx={{ height: "400px" }} /> }
);

const StudentSaysV2 = dynamic(
  () => import("@/components/grade-subject-level/students-says-v2"),
  { ssr: false, loading: () => <Box sx={{ height: "300px" }} /> }
);

const SectionsBox = dynamic(
  () => import("@/components/grade-subject-level/sectionsbox"),
  { ssr: false, loading: () => <Box sx={{ height: "200px" }} /> }
);

const GetStartedV2 = dynamic(
  () => import("@/components/grade-subject-level/get-started-v2"),
  { ssr: false, loading: () => <Box sx={{ height: "400px" }} /> }
);

const Faqs = dynamic(
  () => import("@/components/home/faqs"),
  { ssr: false, loading: () => <Box sx={{ height: "300px" }} /> }
);

const IgcsePage = () => {
  // Remove blocking data fetches - components will fetch their own data

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
    <Box 
      className={leagueSpartan.className}
      sx={{ 
        overflowX: "hidden", 
        width: "100%", 
        minHeight: "100vh",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale"
      }}
    >
      <HeaderV3 />
      <CountdownTimer />

      {/* Hero Section with Form */}
      <Box sx={styles.heroContainer}>
        <Box sx={styles.heroWrapper}>
          <Grid container spacing={3} sx={styles.heroGrid}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Box sx={styles.heroContent}>
                <HeroV2 data={heroData} withForm />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Box sx={styles.formWrapper}>
                <Form />
              </Box>
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
        <Faqs />
      </Box>

      {/* <ServerFooter /> */}
    </Box>
  );
};

export default IgcsePage;

const styles = {
  verticalMargin: { 
    my: 3 // Simplified margin
  },
  heroContainer: {
    pt: { xs: 3, lg: 4 }, // Reduced padding - header/countdown now in normal flow
    minHeight: { xs: "auto", lg: "90vh" },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    px: { xs: 2, lg: 6 }, // Simplified padding
  },
  heroWrapper: {
    width: "100%",
    maxWidth: 1400,
  },
  heroGrid: {
    alignItems: "center",
  },
  heroContent: {
    display: "flex",
    flexDirection: "column",
  },
  formWrapper: {
    pt: { xs: 0, lg: 0 },
  },
};
