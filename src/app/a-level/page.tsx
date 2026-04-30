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

const ALevelPage = () => {
  const heroData = {
    header:
      "<span style='color: #38B6FF; font-size: inherit; font-weight: inherit; line-height: inherit;'>Elite 1-1 A-Level Tutors!</span><br/>Achieve the A-Level Grades You Need for Your Dream University",
    headerTag: "h1",
    paragraph: " ",
    image: "/assets/images/hero/igcse-hero.jpg",
    imageAltText: " ",
  };

  const tutorSectionData = {
    isShow: true,
    header: "Meet Our Elite A-Level Tutors",
    headerTag: "h2",
    paragraph:
      "Learn from qualified teachers with years of A-Level teaching experience",
    curriculum: "A-Level",
    subject: "",
    view: "Horizontal Carousel",
    sequenceNumber: 1,
  };

  const benefitsSectionData = {
    isShow: true,
    section: "Why Choose Our A-Level Program",
    sectionTag: "h2",
    paragraph:
      "Discover the advantages of our comprehensive GCSE tutoring program",
    buttonText: "Get Started",
    link: "/contact",
  };

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
        question: "Who are your tutors?",
        answer:
          "Our tutors are highly qualified subject specialists, many of whom are experienced examiners and graduates from top universities. They are trained to teach exam techniques specific to boards like Cambridge, Pearson Edexcel, AQA, OCR, and IB.",
      },
      {
        question: "Do you provide study materials and resources?",
        answer:
          "Yes! Students get access to curated study notes, practice worksheets, past papers, and exam-focused resources.",
      },
      {
        question: "How will I track my child's progress?",
        answer:
          "Parents receive regular progress reports, and our tutors stay in touch to keep you updated. We also conduct mock exams and assessments to ensure your child is exam-ready.",
      },
      {
        question: "Is there a trial class available?",
        answer:
          "Yes! We offer a free trial session so you can experience our teaching style and see if it’s the right fit for your child.",
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
          title={"What Our A-Level Students Say"}
          text="Real reviews from real A-Level students and parents"
        />
      </div>

      <div className="my-6">
        <BenifitsSectionV2 data={benefitsSectionData} />
      </div>

      <div className="my-6">
        <PopularIgcseSubjectsV2
          title="Popular A-Level Subjects We Cover"
          headerTag="h2"
        />
      </div>

      <div className="my-6">
        <StudentSaysV2
          data={studentSaysData}
          title="Video Testimonials from Our A-Level Students"
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

export default ALevelPage;
