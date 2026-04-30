import React from "react";
import dynamic from "next/dynamic";

import {
  Component_Sequence_Type,
  PageData,
} from "@/types/grade-subject-level.types";
import { getStartedData } from "@/services/get-started/get-started";

const ArHeader = dynamic(() => import("@/components/header"), { ssr: true });
const ArHero = dynamic(() => import("@/components/grade-subject-level/ar-hero"), { ssr: true });
const ArSectionsBox = dynamic(() => import("@/components/grade-subject-level/ar-sectionsbox"), { ssr: true });
const ArOffer = dynamic(() => import("@/components/curiculume/ar-offer"), { ssr: true });
const ArGetStarted = dynamic(() => import("@/components/grade-subject-level/ar-get-started"), { ssr: true });
const ArEducationalCounseling = dynamic(() => import("@/components/curiculume/ar-educational-counseling"), { ssr: true });
const ArHeroInfo = dynamic(() => import("@/components/grade-subject-level/ar-hero-info"), { ssr: true });
const ArServerFooter = dynamic(() => import("@/components/ar-server-footer"), { ssr: true });
const ArPhoneCta = dynamic(() => import("./ar-phone-cta"), { ssr: true });
const DemoPointers = dynamic(() => import("./demo-pointers"), { ssr: true });
const MainContent = dynamic(() => import("./main-content"), { ssr: true });
const PopularSubjects = dynamic(() => import("@/components/curiculume/popular-igcse-subjects"), { ssr: true });
const FrequentlyQuestions = dynamic(() => import("./faqs"), { ssr: true });
const BlogCta = dynamic(() => import("./blog-cta"), { ssr: true });
const StudentSays = dynamic(() => import("./students-says"), { ssr: true });
const ArTutorSection = dynamic(() => import("./tutor-section/ArTutorSection"), { ssr: true });

type IProps = {
  data: PageData;
  sequence: Component_Sequence_Type;
};

const ArGradeSubjectLevel: React.FC<IProps> = async ({ data, sequence }) => {
  const getStarted = await getStartedData("ar");

  const renderSection = (name: string) => {
    switch (name) {
      case "Hero Section":
        return (
          <>
            {data?.hero_section && (
              <div className="relative mx-[3vw] flex items-end pt-[120px] sm:mx-[3vw] sm:pt-[150px] md:pt-[200px] lg:mx-0 lg:h-screen lg:pt-0 xl:pt-0">
                <div className="grid w-full grid-cols-1 lg:grid-cols-2">
                  <ArHero data={data?.hero_section} />
                  <ArHeroInfo
                    image={data?.hero_section?.image}
                    imageAltText={data?.hero_section?.imageAltText}
                  />
                </div>
              </div>
            )}
            <ArSectionsBox />
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
              <ArPhoneCta data={data?.phone_cta} />
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
              <ArEducationalCounseling data={data?.education_counseling} />
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
      case "get started":
        return (
          <div className="my-[5vh] md:my-[10vh]">
            <ArGetStarted data={getStarted} />
          </div>
        );
      case "what we offer":
        return (
          <div className="my-[5vh] md:my-[10vh]">
            <ArOffer />
          </div>
        );
      case "tutor section":
        return (
          data.tutor_section && (
            <div className="my-[5vh] md:my-[10vh]">
              <ArTutorSection data={data?.tutor_section} />
            </div>
          )
        );
      default:
        return null;
    }
  };

  return (
    <div dir="rtl">
      <ArHeader />
      {sequence?.sections
        ?.sort((a, b) => a.placment - b.placment)
        .map((section, index) => (
          <div key={index}>{renderSection(section.name)}</div>
        ))}
      <ArServerFooter />
    </div>
  );
};

export default ArGradeSubjectLevel;
