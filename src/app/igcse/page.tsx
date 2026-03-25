import React from "react";
import { Metadata } from "next";
import { Box, Grid } from "@mui/material";

export const metadata: Metadata = {
  title: "IGCSE Tutoring | Tuitional",
  description: "Get the best IGCSE tutoring at Tuitional.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
import dynamic from "next/dynamic";
import { leagueSpartan } from "@/app/fonts";

// Critical above-the-fold components - load immediately
import HeaderV3 from "@/components/header-v3";
import HeroV2 from "@/components/grade-subject-level/heroV2";
import FormV2 from "@/components/grade-subject-level/form/formV2";
import SchoolLogosSection from "@/components/grade-subject-level/school-logos-section/SchoolLogosSection";

// Progressive loading - only load when needed
const CountdownTimer = dynamic(
  () => import("@/components/countdown/CountdownTimer"),
  {
    ssr: false,
    loading: () => null, // No loading state to prevent layout shifts
  },
);

// Individual components for lazy loading - Enable SSR for better performance

const TutorSectionV2 = dynamic(
  () => import("@/components/grade-subject-level/tutor-section/TutorSectionV2"),
  { ssr: true, loading: () => <Box sx={{ height: "400px" }} /> },
);

const FormV2Dialog = dynamic(
  () => import("@/components/grade-subject-level/form/formV2Dialog"),
  { ssr: false, loading: () => null },
);

const BenifitsSectionV2 = dynamic(
  () =>
    import("@/components/grade-subject-level/benifts-section/BenifitsSection"),
  { ssr: true, loading: () => <Box sx={{ height: "300px" }} /> },
);

const PopularIgcseSubjectsV2 = dynamic(
  () => import("@/components/curiculume/popular-igcse-subjects-v2"),
  { ssr: true, loading: () => <Box sx={{ height: "350px" }} /> },
);

const TrustpilotCarousel = dynamic(
  () => import("@/components/trustpilot-carousel/TrustpilotCarousel"),
  { ssr: false, loading: () => <Box sx={{ height: "400px" }} /> },
);

const StudentSaysV2 = dynamic(
  () => import("@/components/grade-subject-level/students-says-v2"),
  { ssr: false, loading: () => <Box sx={{ height: "300px" }} /> },
);

const SectionsBox = dynamic(
  () => import("@/components/grade-subject-level/sectionsbox"),
  { ssr: false, loading: () => <Box sx={{ height: "200px" }} /> },
);

const GetStartedV2 = dynamic(
  () => import("@/components/grade-subject-level/get-started-v2"),
  { ssr: false, loading: () => <Box sx={{ height: "400px" }} /> },
);

const Faqs = dynamic(() => import("@/components/home/faqs"), {
  ssr: false,
  loading: () => <Box sx={{ height: "300px" }} />,
});

const FooterV2 = dynamic(() => import("@/components/footerV2"), {
  ssr: true,
  loading: () => <Box sx={{ height: "500px" }} />,
});

const IgcsePage = () => {
  // Remove blocking data fetches - components will fetch their own data

  // Hardcoded hero section data
  const heroData = {
    header:
      "<span style='color: #38B6FF; font-size: inherit; font-weight: inherit; line-height: inherit;'>Guaranteed A* Grades!</span><br/>The #1 IGCSE Tutors Are Here to Help.",
    headerTag: "h1",
    paragraph: " ",
    image: "/assets/images/hero/igcse-hero.jpg",
    imageAltText: " ",
  };

  const heroBulletPoints = [
    "1:1 Live Tutors",
    "Qualified, Vetted Tutors",
    "Interactive Learning",
    "Flexible Scheduling",
    "Parent & Student Portal",
  ];

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
    header: "Video Testimonials from Our IGCSE Students",
    headerTag: "h2",
    paragraph: "Hear from students who achieved their goals with our help",
  };

  return (
    <Box
      className={leagueSpartan.className}
      sx={{
        overflowX: "hidden",
        width: "100%",
        minHeight: "100vh",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
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
                <HeroV2
                  data={heroData}
                  withForm
                  bulletPoints={heroBulletPoints}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Box sx={styles.formWrapper}>
                <FormV2 />
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
      <Box sx={styles.verticalMargin}>
        <SectionsBox />
      </Box>

      {/* Trustpilot Reviews Carousel */}
      <Box sx={styles.verticalMargin}>
        <TrustpilotCarousel text="Real reviews from real IGCSE students and parents" />
      </Box>
      {/* Benefits Section */}
      <Box sx={styles.verticalMargin}>
        <BenifitsSectionV2 data={benefitsSectionData} />
      </Box>

      {/* Popular IGCSE Subjects */}
      <Box sx={styles.verticalMargin}>
        <PopularIgcseSubjectsV2
          title="Popular IGCSE Subjects We Cover"
          headerTag="h2"
        />
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

      <Box sx={{ ...styles.verticalMargin, mx: 10 }}>
        <Faqs />
      </Box>

      {/* Footer */}
      <FooterV2 />
    </Box>
  );
};

export default IgcsePage;

const styles = {
  verticalMargin: {
    my: 3, // Simplified margin
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
