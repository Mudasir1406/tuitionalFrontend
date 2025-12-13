import React from "react";
import { Box, Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { leagueSpartan } from "@/app/fonts";

// Critical above-the-fold components - load immediately
import HeaderV3 from "@/components/header-v3";
import HeroV2 from "@/components/grade-subject-level/heroV2";
import FormV2 from "@/components/grade-subject-level/form/formV2";
import SchoolLogosSection from "@/components/grade-subject-level/school-logos-section/SchoolLogosSection";
import FrequentlyQuestions from "@/components/grade-subject-level/faqs";

// Progressive loading - only load when needed
const CountdownTimer = dynamic(
  () => import("@/components/countdown/CountdownTimer"),
  {
    ssr: false,
    loading: () => null, // No loading state to prevent layout shifts
  }
);

// Individual components for lazy loading - Enable SSR for better performance

const TutorSectionV2 = dynamic(
  () => import("@/components/grade-subject-level/tutor-section/TutorSectionV2"),
  { ssr: true, loading: () => <Box sx={{ height: "400px" }} /> }
);

const FormV2Dialog = dynamic(
  () => import("@/components/grade-subject-level/form/formV2Dialog"),
  { ssr: false, loading: () => null }
);

const BenifitsSectionV2 = dynamic(
  () =>
    import(
      "@/components/grade-subject-level/benifts-section/BenifitsSectionV2"
    ),
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

const SectionsBoxV2 = dynamic(
  () => import("@/components/grade-subject-level/sectionsboxV2"),
  { ssr: false, loading: () => <Box sx={{ height: "200px" }} /> }
);

const GetStartedV2 = dynamic(
  () => import("@/components/grade-subject-level/get-started-v2"),
  { ssr: false, loading: () => <Box sx={{ height: "400px" }} /> }
);

// const Faqs = dynamic(() => import("@/components/home/faqs"), {
//   ssr: false,
//   loading: () => <Box sx={{ height: "300px" }} />,
// });

const FooterV2 = dynamic(() => import("@/components/footerV2"), {
  ssr: true,
  loading: () => <Box sx={{ height: "500px" }} />,
});

const GcsePage = () => {
  // Remove blocking data fetches - components will fetch their own data

  // Hardcoded hero section data
  const heroData = {
    header:
      "<span style='color: #38B6FF; font-size: inherit; font-weight: inherit; line-height: inherit;'>Achieve Outstanding GCSE Results!</span><br/>Top-Rated GCSE Tutors Are Here to Help.",
    headerTag: "h1",
    paragraph: " ",
    image: "/assets/images/hero/igcse-hero.jpg",
    imageAltText: " ",
  };

  // Data for tutor section - will fetch from tutors_data collection
  const tutorSectionData = {
    isShow: true,
    header: "Meet Our Expert GCSE Tutors",
    headerTag: "h2",
    paragraph:
      "Learn from qualified teachers with years of GCSE teaching experience",
    curriculum: "GCSE", // This will be used to filter tutors from tutors_data collection
    subject: "", // Empty string will fetch all IGCSE tutors
    view: "Horizontal Carousel", // Set display format to use new horizontal carousel
    sequenceNumber: 1,
  };

  // Data for benefits section - matches the expected igcse_tutoring_program structure
  const benefitsSectionData = {
    isShow: true,
    section: "Why Choose Our GCSE Program",
    sectionTag: "h2",
    paragraph:
      "Discover the advantages of our comprehensive GCSE tutoring program",
    buttonText: "Get Started",
    link: "/contact",
  };

  // Data for student testimonials
  const studentSaysData = {
    isShow: true,
    header: "Video Testimonials from Our GCSE Students",
    headerTag: "h2",
    paragraph: "Hear from students who achieved their goals with our help",
  };
  const heroBulletPoints = [
    "Guaranteed Grade Improvements",
    "Qualified, Vetted GCSE Specialists",
    "Flexible Online Options",
    "Proven Track Record - 98% Success Rate",
    "Flexible Scheduling",
    "Parent & Student Portal",
  ];
  const faqsData = {
    header: "Frequently Asked Questions",
    headerTag: "h2",
    paragraph: "Everything you need to know about our GCSE tutoring",
    faqs: [
      {
        question: "How can I get started with GCSE online tutoring sessions?",
        answer:
          "Getting started is simple! Book a free consultation call where we assess your current GCSE performance, identify areas for improvement, and match you with the perfect specialist tutor for your subjects.",
      },
      {
        question: "What is GCSE tutoring, and what services do you offer?",
        answer:
          "Our GCSE tutoring provides personalized 1-on-1 support across all major GCSE subjects. We offer online sessions, in-person tutoring, group classes, revision bootcamps, and comprehensive exam preparation with mock tests and detailed feedback.",
      },
      {
        question:
          "What is the success rate of students enrolled with GCSE online tutoring sessions?",
        answer:
          "94% of our GCSE students improve by at least 2 grades, with 87% achieving their target grades or higher. Last year, over 200 students achieved Grades 8-9 across various subjects with our support.",
      },
      {
        question: "How does online learning with GCSE work?",
        answer:
          "Our online GCSE sessions use interactive virtual classrooms with digital whiteboards, screen sharing, and real-time collaboration tools. Students can access recorded sessions, practice materials, and track progress through our dedicated student portal.",
      },
      {
        question:
          "Are your online sessions affordable for students and parents?",
        answer:
          "We offer competitive pricing with flexible payment plans. Packages start from £25 per hour, with discounts available for multiple subjects and longer commitments. We believe quality GCSE support should be accessible to all families.",
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
        <SectionsBoxV2 />
      </Box>

      {/* Trustpilot Reviews Carousel */}
      <Box sx={styles.verticalMargin}>
        <TrustpilotCarousel
          title={"What Our GCSE Students Say"}
          text="Real reviews from real GCSE students and parents"
        />
      </Box>
      {/* Benefits Section */}
      <Box sx={styles.verticalMargin}>
        <BenifitsSectionV2 data={benefitsSectionData} />
      </Box>

      {/* Popular IGCSE Subjects */}
      <Box sx={styles.verticalMargin}>
        <PopularIgcseSubjectsV2
          title="Popular GCSE Subjects We Cover"
          headerTag="h2"
        />
      </Box>

      {/* Student Says Section */}
      <Box sx={styles.verticalMargin}>
        <StudentSaysV2
          data={studentSaysData}
          title="Video Testimonials from Our GCSE Students"
        />
      </Box>

      {/* Blog CTA Section */}
      <Box sx={styles.verticalMargin}>
        <SectionsBoxV2 />
      </Box>

      {/* Get Started Section */}
      <Box sx={styles.verticalMargin}>
        <GetStartedV2 />
      </Box>

      {/* FAQs Section */}
      <Box sx={styles.verticalMargin}>
        <FrequentlyQuestions data={faqsData} />
      </Box>

      {/* Footer */}
      <FooterV2 />
    </Box>
  );
};

export default GcsePage;

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
