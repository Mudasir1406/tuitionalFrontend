import React from "react";
import dynamic from "next/dynamic";

import { PageData } from "@/types/grade-subject-level.types";
import { getStartedData } from "@/services/get-started/get-started";
import ArForm from "./form/ar-form";

const ArHeader = dynamic(() => import("@/components/header"), { ssr: true });
const Hero = dynamic(() => import("@/components/grade-subject-level/hero"), { ssr: true });
const ArSectionsBox = dynamic(() => import("@/components/grade-subject-level/ar-sectionsbox"), { ssr: true });
const Offer = dynamic(() => import("@/components/curiculume/offer"), { ssr: true });
const GetStarted = dynamic(() => import("@/components/grade-subject-level/get-started"), { ssr: true });
const WhyChoose = dynamic(() => import("@/components/curiculume/why-choose"), { ssr: true });
const EducationalCounseling = dynamic(() => import("@/components/curiculume/educational-counseling"), { ssr: true });
const HeroInfo = dynamic(() => import("@/components/grade-subject-level/hero-info"), { ssr: true });
const ArServerFooter = dynamic(() => import("@/components/ar-server-footer"), { ssr: true });
const PhoneCta = dynamic(() => import("./phone-cta"), { ssr: true });
const DemoPointers = dynamic(() => import("./demo-pointers"), { ssr: true });
const MainContent = dynamic(() => import("./main-content"), { ssr: true });
const PopularSubjects = dynamic(() => import("@/components/curiculume/popular-igcse-subjects"), { ssr: true });
const FrequentlyQuestions = dynamic(() => import("./faqs"), { ssr: true });
const BlogCta = dynamic(() => import("./blog-cta"), { ssr: true });
const StudentSays = dynamic(() => import("./students-says"), { ssr: true });
const ArTutorSection = dynamic(() => import("./tutor-section/ArTutorSection"), { ssr: true });
const SchoolLogosSection = dynamic(() => import("./school-logos-section/SchoolLogosSection"), { ssr: true });
const TutorSectionV2 = dynamic(() => import("./tutor-section/TutorSectionV2"), { ssr: true });
const ArBenifitsSection = dynamic(() => import("./benifts-section/ArBenifitsSection"), { ssr: true });
const BenifitsOfStudyingSection = dynamic(() => import("./benifts-of-studying-section/BenifitsOfStudyingSection"), { ssr: true });
const TutoringProgramSection = dynamic(() => import("./tutoring-program-section/TutoringProgramSection"), { ssr: true });
const LinkListViewSection = dynamic(() => import("./link-list-view/LinkListViewSection"), { ssr: true });

type IProps = { data: PageData };

const HERO_CONTAINER_CLS =
  "relative mx-[3vw] flex h-full items-center pt-[120px] sm:mx-[3vw] sm:pt-[120px] md:pt-[120px] lg:mx-0 lg:h-screen lg:pt-0 xl:pt-0";
const VERTICAL_MARGIN = "my-[5vh] md:my-[10vh]";

const ArGradeSubjectLevelV2: React.FC<IProps> = async ({ data }) => {
  const getStarted = await getStartedData("ar");

  const renderSection = (name: string) => {
    if (name.includes("hero_section")) {
      return (
        data?.[name as keyof PageData] && (
          <div className={HERO_CONTAINER_CLS}>
            <div className="grid w-full grid-cols-1 md:mt-[2vh] lg:mt-[18vh] lg:grid-cols-2">
              <Hero data={data?.[name as keyof PageData]} />
              <HeroInfo
                image={data?.[name as keyof PageData]?.image}
                imageAltText={data?.[name as keyof PageData]?.imageAltText}
              />
            </div>
          </div>
        )
      );
    } else if (name.includes("book_demo_cta")) {
      return (
        data?.[name as keyof PageData]?.isShow && (
          <div className={VERTICAL_MARGIN}>
            <ArSectionsBox />
          </div>
        )
      );
    } else if (name.includes("with_form")) {
      return (
        data?.[name as keyof PageData] && (
          <div className={HERO_CONTAINER_CLS}>
            <div className="grid w-full grid-cols-1 items-center gap-4 py-24 md:mt-[2vh] lg:mt-[18vh] lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Hero data={data?.[name as keyof PageData]} withForm />
              </div>
              <div className="my-6 lg:col-span-5">
                <ArForm />
              </div>
            </div>
          </div>
        )
      );
    } else if (name.includes("igcse_in_dubai")) {
      return (
        <div className={VERTICAL_MARGIN}>
          <BenifitsOfStudyingSection data={data?.[name as keyof PageData]} />
        </div>
      );
    } else if (name.includes("link_list")) {
      return (
        <div className={VERTICAL_MARGIN}>
          <LinkListViewSection data={data?.[name as keyof PageData]} />
        </div>
      );
    } else if (name.includes("igcse_tutoring_program")) {
      return (
        data?.[name as keyof PageData]?.isShow && (
          <ArBenifitsSection data={data?.[name as keyof PageData]} />
        )
      );
    } else if (name.includes("school_logos")) {
      return (
        <div className={VERTICAL_MARGIN}>
          <SchoolLogosSection />
        </div>
      );
    } else if (name.includes("tutor_section")) {
      return (
        <div className={VERTICAL_MARGIN}>
          <ArTutorSection data={data?.[name as keyof PageData]} />
        </div>
      );
    } else if (name.includes("tutor_program")) {
      return (
        <div className={VERTICAL_MARGIN}>
          <TutoringProgramSection data={data?.[name as keyof PageData]} />
        </div>
      );
    } else if (name.includes("main_content")) {
      return (
        data?.[name as keyof PageData] && (
          <div className={VERTICAL_MARGIN}>
            <MainContent data={data?.[name as keyof PageData]} />
          </div>
        )
      );
    } else if (name.includes("phone_cta")) {
      return (
        data?.[name as keyof PageData] && (
          <div className="relative pb-[5vh]">
            <div
              className="absolute inset-0 -z-[1] h-full w-full"
              style={{
                background:
                  "linear-gradient(0deg, #9EDCFF 29.51%, rgba(158, 220, 255, 0.959175) 34.02%, rgba(158, 220, 255, 0.91125) 39.76%, rgba(158, 220, 255, 0.826183) 44.67%, rgba(158, 220, 255, 0.688485) 50%, rgba(158, 220, 255, 0) 70.49%)",
              }}
            />
            <PhoneCta data={data?.[name as keyof PageData]} />
          </div>
        )
      );
    } else if (name.includes("demo_pointers")) {
      return (
        data?.[name as keyof PageData]?.demoPointersData.length > 0 && (
          <div className={VERTICAL_MARGIN}>
            <DemoPointers data={data?.[name as keyof PageData]} />
          </div>
        )
      );
    } else if (name.includes("popular_subjects")) {
      return (
        data?.[name as keyof PageData]?.subjects.length > 0 && (
          <div className={VERTICAL_MARGIN}>
            <PopularSubjects data={data?.[name as keyof PageData]} />
          </div>
        )
      );
    } else if (name.includes("education_counseling")) {
      return (
        data?.[name as keyof PageData] && (
          <div className={VERTICAL_MARGIN}>
            <EducationalCounseling data={data?.[name as keyof PageData]} />
          </div>
        )
      );
    } else if (name.includes("why_igsce")) {
      return (
        data?.[name as keyof PageData] && (
          <div className={VERTICAL_MARGIN}>
            <WhyChoose data={data?.[name as keyof PageData]} />
          </div>
        )
      );
    } else if (name.includes("what_our_student_says")) {
      return (
        data?.[name as keyof PageData] && (
          <div className={VERTICAL_MARGIN}>
            <StudentSays data={data?.[name as keyof PageData]} />
          </div>
        )
      );
    } else if (name.includes("blog_CTA")) {
      return (
        data?.[name as keyof PageData] && (
          <div className={VERTICAL_MARGIN}>
            <BlogCta data={data?.[name as keyof PageData]} />
          </div>
        )
      );
    } else if (name.includes("Faqs")) {
      return (
        data?.[name as keyof PageData] && (
          <div className={VERTICAL_MARGIN}>
            <FrequentlyQuestions data={data?.[name as keyof PageData]} />
          </div>
        )
      );
    } else if (name.includes("what_we_offer")) {
      return (
        data?.[name as keyof PageData].isShow && (
          <div className={VERTICAL_MARGIN}>
            <Offer />
          </div>
        )
      );
    } else if (name.includes("get_started")) {
      return (
        data?.[name as keyof PageData].isShow && (
          <div className={VERTICAL_MARGIN}>
            <GetStarted data={getStarted} />
          </div>
        )
      );
    }
    return null;
  };

  return (
    <div dir="rtl">
      <ArHeader />
      {Object.entries(data).map(([key]) => (
        <div key={key}>{renderSection(key.trim())}</div>
      ))}
      <ArServerFooter />
    </div>
  );
};

export default ArGradeSubjectLevelV2;
