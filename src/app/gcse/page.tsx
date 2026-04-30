import React from "react";
import dynamic from "next/dynamic";
import { leagueSpartan } from "@/app/fonts";

import HeaderV3 from "@/components/header-v3";
import HeroV2 from "@/components/grade-subject-level/heroV2";
import FormV2 from "@/components/grade-subject-level/form/formV2";
import SchoolLogosSection from "@/components/grade-subject-level/school-logos-section/SchoolLogosSection";
import FrequentlyQuestions from "@/components/grade-subject-level/faqs";

const CountdownTimer = dynamic(
  () => import("@/components/countdown/CountdownTimer"),
  { ssr: false, loading: () => null },
);

const TutorSectionV2 = dynamic(
  () => import("@/components/grade-subject-level/tutor-section/TutorSectionV2"),
  { ssr: true, loading: () => <div className="h-[400px]" /> },
);

const BenifitsSectionV2 = dynamic(
  () =>
    import(
      "@/components/grade-subject-level/benifts-section/BenifitsSectionV2"
    ),
  { ssr: true, loading: () => <div className="h-[300px]" /> },
);

const PopularIgcseSubjectsV2 = dynamic(
  () => import("@/components/curiculume/popular-igcse-subjects-v2"),
  { ssr: true, loading: () => <div className="h-[350px]" /> },
);

const TrustpilotCarousel = dynamic(
  () => import("@/components/trustpilot-carousel/TrustpilotCarousel"),
  { ssr: false, loading: () => <div className="h-[400px]" /> },
);

const StudentSaysV2 = dynamic(
  () => import("@/components/grade-subject-level/students-says-v2"),
  { ssr: false, loading: () => <div className="h-[300px]" /> },
);

const SectionsBoxV2 = dynamic(
  () => import("@/components/grade-subject-level/sectionsboxV2"),
  { ssr: false, loading: () => <div className="h-[200px]" /> },
);

const GetStartedV2 = dynamic(
  () => import("@/components/grade-subject-level/get-started-v2"),
  { ssr: false, loading: () => <div className="h-[400px]" /> },
);

const FooterV2 = dynamic(() => import("@/components/footerV2"), {
  ssr: true,
  loading: () => <div className="h-[500px]" />,
});

const GcsePage = () => {
  const heroData = {
    header:
      "<span style='color: #38B6FF; font-size: inherit; font-weight: inherit; line-height: inherit;'>Achieve Outstanding GCSE Results!</span><br/>Top-Rated GCSE Tutors Are Here to Help.",
    headerTag: "h1",
    paragraph: " ",
    image: "/assets/images/hero/igcse-hero.jpg",
    imageAltText: " ",
  };

  const tutorSectionData = {
    isShow: true,
    header: "Meet Our Expert GCSE Tutors",
    headerTag: "h2",
    paragraph:
      "Learn from qualified teachers with years of GCSE teaching experience",
    curriculum: "GCSE",
    subject: "",
    view: "Horizontal Carousel",
    sequenceNumber: 1,
  };

  const benefitsSectionData = {
    isShow: true,
    section: "Why Choose Our GCSE Program",
    sectionTag: "h2",
    paragraph:
      "Discover the advantages of our comprehensive GCSE tutoring program",
    buttonText: "Get Started",
    link: "/contact",
  };

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
    <div
      className={`${leagueSpartan.className} min-h-screen w-full overflow-x-hidden antialiased`}
    >
      <HeaderV3 />
      <CountdownTimer />

      <div className="flex items-center justify-center px-4 pt-6 lg:min-h-[90vh] lg:px-12 lg:pt-8">
        <div className="w-full max-w-[1400px]">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col">
              <HeroV2
                data={heroData}
                withForm
                bulletPoints={heroBulletPoints}
              />
            </div>
            <div>
              <FormV2 />
            </div>
          </div>
        </div>
      </div>

      <div className="my-6">
        <SchoolLogosSection />
      </div>

      <div className="my-6">
        <TutorSectionV2 data={tutorSectionData} />
      </div>
      <div className="my-6">
        <SectionsBoxV2 />
      </div>

      <div className="my-6">
        <TrustpilotCarousel
          title={"What Our GCSE Students Say"}
          text="Real reviews from real GCSE students and parents"
        />
      </div>

      <div className="my-6">
        <BenifitsSectionV2 data={benefitsSectionData} />
      </div>

      <div className="my-6">
        <PopularIgcseSubjectsV2
          title="Popular GCSE Subjects We Cover"
          headerTag="h2"
        />
      </div>

      <div className="my-6">
        <StudentSaysV2
          data={studentSaysData}
          title="Video Testimonials from Our GCSE Students"
        />
      </div>

      <div className="my-6">
        <SectionsBoxV2 />
      </div>

      <div className="my-6">
        <GetStartedV2 />
      </div>

      <div className="my-6">
        <FrequentlyQuestions data={faqsData} />
      </div>

      <FooterV2 />
    </div>
  );
};

export default GcsePage;
