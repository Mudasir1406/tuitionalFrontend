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

const FooterV2 = dynamic(() => import("@/components/footerV2"), {
  ssr: true,
  loading: () => <Box sx={{ height: "500px" }} />,
});

const ALevelPage = () => {
  // Remove blocking data fetches - components will fetch their own data

  // Hardcoded hero section data
  const heroData = {
    header:
      "<span style='color: #38B6FF; font-size: inherit; font-weight: inherit; line-height: inherit;'>Elite 1-1 A-Level Tutors!</span><br/>Achieve the A-Level Grades You Need for Your Dream University",
    headerTag: "h1",
    paragraph: " ",
    image: "/assets/images/hero/igcse-hero.jpg",
    imageAltText: " ",
  };

  // Data for tutor section - will fetch from tutors_data collection
  const tutorSectionData = {
    isShow: true,
    header: "Meet Our Elite A-Level Tutors",
    headerTag: "h2",
    paragraph:
      "Learn from qualified teachers with years of A-Level teaching experience",
    curriculum: "A-Level", // This will be used to filter tutors from tutors_data collection
    subject: "", // Empty string will fetch all A-Level tutors
    view: "Horizontal Carousel", // Set display format to use new horizontal carousel
    sequenceNumber: 1,
  };

  // Data for benefits section - matches the expected igcse_tutoring_program structure
  const benefitsSectionData = {
    isShow: true,
    section: "Why Choose Our A-Level Program",
    sectionTag: "h2",
    paragraph:
      "Discover the advantages of our comprehensive GCSE tutoring program",
    buttonText: "Get Started",
    link: "/contact",
  };

  // Data for student testimonials
  const studentSaysData = {
    isShow: true,
    header: "Video Testimonials from Our A-Level Students",
    headerTag: "h2",
    paragraph: "Hear from students who achieved their goals with our help",
  };
  const heroBulletPoints = [
    "Guaranteed A-Level Grade Improvements",
    "Subject Specialists",
    "University Application Support Included",
    "97% University Acceptance Rate",
    "Flexible Online & Face-to-Face Sessions",
    "Parent & Student Progress Portal",
  ];
  const faqsData = {
    header: "Frequently Asked Questions",
    headerTag: "h2",
    paragraph: "Everything you need to know about our A-Level tutoring",
    faqs: [
      {
        question: "How do the A-Level tutoring classes work?",
        answer:
          "Our A-Level classes are conducted live online, using interactive tools that make learning engaging and effective. Each session is tailored to your child's curriculum and learning style, ensuring they understand concepts deeply and are well-prepared for exams.",
      },
      {
        question: "Are the classes one-to-one or group sessions?",
        answer:
          "We primarily offer 1-to-1 personalized tutoring, where each student gets the teacher's complete attention.",
      },
      {
        question:
          "Who are your tutors?",
        answer:
          "Our tutors are highly qualified subject specialists, many of whom are experienced examiners and graduates from top universities. They are trained to teach exam techniques specific to boards like Cambridge, Pearson Edexcel, AQA, OCR, and IB.",
      },
      {
        question: "Do you provide study materials and resources?",
        answer:
          "Yes! Students get access to curated study notes, practice worksheets, past papers, and exam-focused resources.",
      },
      {
        question:
          "How will I track my child's progress?",
        answer:
          "Parents receive regular progress reports, and our tutors stay in touch to keep you updated. We also conduct mock exams and assessments to ensure your child is exam-ready.",
      },
      {
        question:
          "Is there a trial class available?",
        answer:
          "Yes! We offer a free trial session so you can experience our teaching style and see if it’s the right fit for your child.",
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
          title={"What Our A-Level Students Say"}
          text="Real reviews from real A-Level students and parents"
        />
      </Box>
      {/* Benefits Section */}
      <Box sx={styles.verticalMargin}>
        <BenifitsSectionV2 data={benefitsSectionData} />
      </Box>

      {/* Popular A-level Subjects */}
      <Box sx={styles.verticalMargin}>
        <PopularIgcseSubjectsV2
          title="Popular A-Level Subjects We Cover"
          headerTag="h2"
        />
      </Box>

      {/* Student Says Section */}
      <Box sx={styles.verticalMargin}>
        <StudentSaysV2
          data={studentSaysData}
          title="Video Testimonials from Our A-Level Students"
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

export default ALevelPage;

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
