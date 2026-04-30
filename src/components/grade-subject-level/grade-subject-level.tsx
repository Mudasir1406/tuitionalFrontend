import React from "react";
import dynamic from "next/dynamic";

import { Header } from "@/components";
import {
  Component_Sequence_Type,
  PageData,
} from "@/types/grade-subject-level.types";
import { getStartedData } from "@/services/get-started/get-started";
import Form from "./form/form";

const Hero = dynamic(() => import("@/components/grade-subject-level/hero"), { ssr: true });
const SectionsBox = dynamic(() => import("@/components/grade-subject-level/sectionsbox"), { ssr: true });
const Offer = dynamic(() => import("@/components/curiculume/offer"), { ssr: true });
const GetStarted = dynamic(() => import("@/components/grade-subject-level/get-started"), { ssr: true });
const EducationalCounseling = dynamic(() => import("@/components/curiculume/educational-counseling"), { ssr: true });
const HeroInfo = dynamic(() => import("@/components/grade-subject-level/hero-info"), { ssr: true });
const ServerFooter = dynamic(() => import("@/components/server-footer"), { ssr: true });
const PhoneCta = dynamic(() => import("./phone-cta"), { ssr: true });
const DemoPointers = dynamic(() => import("./demo-pointers"), { ssr: true });
const MainContent = dynamic(() => import("./main-content"), { ssr: true });
const PopularSubjects = dynamic(() => import("@/components/curiculume/popular-igcse-subjects"), { ssr: true });
const FrequentlyQuestions = dynamic(() => import("./faqs"), { ssr: true });
const BlogCta = dynamic(() => import("./blog-cta"), { ssr: true });
const StudentSays = dynamic(() => import("./students-says"), { ssr: true });
const TutorSection = dynamic(() => import("./tutor-section/TutorSection"), { ssr: true });

type IProps = {
  data: PageData;
  sequence: Component_Sequence_Type;
};

const GradeSubjectLevel: React.FC<IProps> = async ({ data, sequence }) => {
  const getStarted = await getStartedData();

  const renderSection = (name: string) => {
    switch (name) {
      case "Hero Section":
        return (
          <>
            {data?.hero_section && (
              <div className="relative mx-[3vw] flex items-end pt-[120px] sm:mx-[3vw] sm:pt-[150px] md:pt-[200px] lg:mx-0 lg:h-screen lg:pt-0 xl:pt-0">
                <div className="grid w-full grid-cols-1 lg:grid-cols-2">
                  <Hero data={data?.hero_section} />
                  <HeroInfo
                    image={data?.hero_section?.image}
                    imageAltText={data?.hero_section?.imageAltText}
                  />
                </div>
              </div>
            )}
            <SectionsBox />
          </>
        );
      case "Main Content":
        return (
          data.main_content && (
            <div className="my-[5vh] md:my-[10vh]">
              <MainContent data={data?.main_content} />
            </div>
          )
        );
      case "Phone CTA ":
        return (
          data.phone_cta && (
            <div className="relative pb-[5vh]">
              <div
                className="absolute inset-0 -z-[1] h-full w-full"
                style={{
                  background:
                    "linear-gradient(0deg, #9EDCFF 29.51%, rgba(158, 220, 255, 0.959175) 34.02%, rgba(158, 220, 255, 0.91125) 39.76%, rgba(158, 220, 255, 0.826183) 44.67%, rgba(158, 220, 255, 0.688485) 50%, rgba(158, 220, 255, 0) 70.49%)",
                }}
              />
              <PhoneCta data={data?.phone_cta} />
            </div>
          )
        );
      case "Tutor Section":
        return (
          data.tutor_section && (
            <div className="my-[5vh] md:my-[10vh]">
              <TutorSection data={data.tutor_section} />
            </div>
          )
        );
      case "Demo Pointers":
        return (
          data?.demo_pointers?.demoPointersData.length > 0 && (
            <div className="my-[5vh] md:my-[10vh]">
              <DemoPointers data={data?.demo_pointers} />
            </div>
          )
        );
      case "Popular Subjects":
        return (
          data?.popular_subjects?.subjects.length > 0 && (
            <div className="my-[5vh] md:my-[10vh]">
              <PopularSubjects data={data?.popular_subjects} />
            </div>
          )
        );
      case "Education Counseling":
        return (
          data.education_counseling && (
            <div className="my-[5vh] md:my-[10vh]">
              <EducationalCounseling data={data?.education_counseling} />
            </div>
          )
        );
      case "What our Student Says":
        return (
          data.what_our_student_says && (
            <div className="my-[5vh] md:my-[10vh]">
              <StudentSays data={data.what_our_student_says} />
            </div>
          )
        );
      case "Blog CTA":
        return (
          data.blog_CTA && (
            <div className="my-[5vh] md:my-[10vh]">
              <BlogCta data={data?.blog_CTA} />
            </div>
          )
        );
      case "FAQs":
        return (
          data.Faqs && (
            <div className="my-[5vh] md:my-[10vh]">
              <FrequentlyQuestions data={data?.Faqs} />
            </div>
          )
        );
      case "what we offer":
        return (
          <div className="my-[5vh] md:my-[10vh]">
            <Offer />
          </div>
        );
      case "get started":
        return (
          <div className="my-[5vh] md:my-[10vh]">
            <GetStarted data={getStarted} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      {sequence.sections
        .sort((a, b) => a.placment - b.placment)
        .map((section) => (
          <section key={section.placment} style={{ all: "unset" }}>
            {renderSection(section.name)}
          </section>
        ))}
      <ServerFooter />
    </>
  );
};

export default GradeSubjectLevel;
