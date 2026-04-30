import React from "react";
import { Metadata } from "next";

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

import HeaderV3 from "@/components/header-v3";
import HeroV2 from "@/components/grade-subject-level/heroV2";
import FormV2 from "@/components/grade-subject-level/form/formV2";
import SchoolLogosSection from "@/components/grade-subject-level/school-logos-section/SchoolLogosSection";

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
    import("@/components/grade-subject-level/benifts-section/BenifitsSection"),
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

const SectionsBox = dynamic(
  () => import("@/components/grade-subject-level/sectionsbox"),
  { ssr: false, loading: () => <div className="h-[200px]" /> },
);

const GetStartedV2 = dynamic(
  () => import("@/components/grade-subject-level/get-started-v2"),
  { ssr: false, loading: () => <div className="h-[400px]" /> },
);

const Faqs = dynamic(() => import("@/components/home/faqs"), {
  ssr: false,
  loading: () => <div className="h-[300px]" />,
});

const FooterV2 = dynamic(() => import("@/components/footerV2"), {
  ssr: true,
  loading: () => <div className="h-[500px]" />,
});

const IgcsePage = () => {
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

  const tutorSectionData = {
    isShow: true,
    header: "Meet Some Of Our Expert IGCSE Tutors",
    headerTag: "h2",
    paragraph:
      "Learn from qualified teachers with years of IGCSE teaching experience",
    curriculum: "IGCSE",
    subject: "",
    view: "Horizontal Carousel",
    sequenceNumber: 1,
  };

  const benefitsSectionData = {
    isShow: true,
    section: "Why Choose Our IGCSE Program",
    sectionTag: "h2",
    paragraph:
      "Discover the advantages of our comprehensive IGCSE tutoring program",
    buttonText: "Get Started",
    link: "/contact",
  };

  const studentSaysData = {
    isShow: true,
    header: "Video Testimonials from Our IGCSE Students",
    headerTag: "h2",
    paragraph: "Hear from students who achieved their goals with our help",
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
        <SectionsBox />
      </div>

      <div className="my-6">
        <TrustpilotCarousel text="Real reviews from real IGCSE students and parents" />
      </div>

      <div className="my-6">
        <BenifitsSectionV2 data={benefitsSectionData} />
      </div>

      <div className="my-6">
        <PopularIgcseSubjectsV2
          title="Popular IGCSE Subjects We Cover"
          headerTag="h2"
        />
      </div>

      <div className="my-6">
        <StudentSaysV2 data={studentSaysData} />
      </div>

      <div className="my-6">
        <SectionsBox />
      </div>

      <div className="my-6">
        <GetStartedV2 />
      </div>

      <div className="mx-10 my-6">
        <Faqs />
      </div>

      <FooterV2 />
    </div>
  );
};

export default IgcsePage;
