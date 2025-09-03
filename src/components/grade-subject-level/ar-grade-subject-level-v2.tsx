import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";

// Arabic dynamic imports for optimization
const ArHeader = dynamic(() => import("@/components/ar-header"), { ssr: true });
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

import { PageData } from "@/types/grade-subject-level.types";
import ArForm from "./form/ar-form";
import { getStartedData } from "@/services/get-started/get-started";

type IProps = {
  data: PageData;
};

const ArGradeSubjectLevelV2: React.FC<IProps> = async ({ data }) => {
  const getStarted = await getStartedData('ar');

  const renderSection = (name: string) => {
    if (name.includes("hero_section")) {
      return (
        <>
          {data?.[name as keyof PageData] && (
            <Box sx={styles.heroContanier}>
              <Grid container sx={{ marginTop: { md: "2vh", lg: "18vh" } }}>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Hero data={data?.[name as keyof PageData]} />
                </Grid>
                <HeroInfo
                  image={data?.[name as keyof PageData]?.image}
                  imageAltText={data?.[name as keyof PageData]?.imageAltText}
                />
              </Grid>
            </Box>
          )}
        </>
      );
    }
    else if (name.includes("book_demo_cta")) {
      return (
        <>
          {data?.[name as keyof PageData]?.isShow && (
            <Box sx={styles.verticalMargin}>
              <ArSectionsBox />
            </Box>
          )}
        </>
      );
    } else if (name.includes("with_form")) {
      return (
        <>
          {data?.[name as keyof PageData] && (
            <Box sx={styles.heroContanier}>
              <Box sx={{ marginTop: { md: "2vh", lg: "18vh" }, width: "100%" }}>
                <Grid container gap={4} sx={styles.heroDiv}>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Hero data={data?.[name as keyof PageData]} withForm />
                  </Grid>
                  <Grid
                    item
                    lg={5}
                    md={12}
                    sm={12}
                    xs={12}
                    sx={{ margin: "24px 0" }}
                  >
                    <ArForm />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </>
      );
    } else if (name.includes("igcse_in_dubai")) {
      return (
        <>
          <Box sx={styles.verticalMargin}>
            <BenifitsOfStudyingSection data={data?.[name as keyof PageData]} />
          </Box>
        </>
      );
    }
    else if (name.includes("link_list")) {
      return (
        <>
          <Box sx={styles.verticalMargin}>
            <LinkListViewSection data={data?.[name as keyof PageData]} />
          </Box>
        </>
      );
    }
    else if (name.includes("igcse_tutoring_program")) {
      return (
        <>
          {data?.[name as keyof PageData]?.isShow && (
            <ArBenifitsSection data={data?.[name as keyof PageData]} />
          )}
        </>
      );
    }
    else if (name.includes("school_logos")) {
      return (
        <Box sx={styles.verticalMargin}>
          <SchoolLogosSection />
        </Box>
      );
    }
    else if (name.includes("tutor_section")) {
      return (
        <>
          <Box sx={styles.verticalMargin}>
            <ArTutorSection data={data?.[name as keyof PageData]} />
          </Box>
        </>
      );
    }
    else if (name.includes("tutor_program")) {
      return (
        <Box sx={styles.verticalMargin}>
          <TutoringProgramSection data={data?.[name as keyof PageData]} />
        </Box>
      );
    }
    else if (name.includes("main_content")) {
      return (
        data?.[name as keyof PageData] && (
          <Box sx={styles.verticalMargin}>
            <MainContent data={data?.[name as keyof PageData]} />
          </Box>
        )
      );
    }
    else if (name.includes("phone_cta")) {
      return (
        data?.[name as keyof PageData] && (
          <>
            <Box sx={styles.phoneContanier}>
              <Box sx={styles.phoneBackground} />
              <PhoneCta data={data?.[name as keyof PageData]} />
            </Box>
          </>
        )
      );
    }
    else if (name.includes("demo_pointers")) {
      return (
        data?.[name as keyof PageData]?.demoPointersData.length > 0 && (
          <Box sx={styles.verticalMargin}>
            <DemoPointers data={data?.[name as keyof PageData]} />
          </Box>
        )
      );
    }
    else if (name.includes("popular_subjects")) {
      return (
        data?.[name as keyof PageData]?.subjects.length > 0 && (
          <Box sx={styles.verticalMargin}>
            <PopularSubjects data={data?.[name as keyof PageData]} />
          </Box>
        )
      );
    } else if (name.includes("education_counseling")) {
      return (
        data?.[name as keyof PageData] && (
          <Box sx={styles.verticalMargin}>
            <EducationalCounseling data={data?.[name as keyof PageData]} />
          </Box>
        )
      );
    } else if (name.includes("why_igsce")) {
      return (
        data?.[name as keyof PageData] && (
          <Box sx={styles.verticalMargin}>
            <WhyChoose data={data?.[name as keyof PageData]} />
          </Box>
        )
      );
    }
    else if (name.includes("what_our_student_says")) {
      return (
        data?.[name as keyof PageData] && (
          <Box sx={styles.verticalMargin}>
            <StudentSays data={data?.[name as keyof PageData]} />
          </Box>
        )
      );
    }
    else if (name.includes("blog_CTA")) {
      return (
        data?.[name as keyof PageData] && (
          <Box sx={styles.verticalMargin}>
            <BlogCta data={data?.[name as keyof PageData]} />
          </Box>
        )
      );
    }
    else if (name.includes("Faqs")) {
      return (
        data?.[name as keyof PageData] && (
          <Box sx={styles.verticalMargin}>
            <FrequentlyQuestions data={data?.[name as keyof PageData]} />
          </Box>
        )
      );
    }
    else if (name.includes("what_we_offer")) {
      return (
        data?.[name as keyof PageData].isShow && (
          <Box sx={styles.verticalMargin}>
            <Offer />
          </Box>
        )
      );
    }
    else if (name.includes("get_started")) {
      return (
        data?.[name as keyof PageData].isShow && (
          <Box sx={styles.verticalMargin}>
            <GetStarted data={getStarted} />
          </Box>
        )
      );
    }
  };

  return (
    <Box sx={styles.rtlContainer}>
      <ArHeader />

      {Object.entries(data).map(([key, value]) => (
        <div key={key}>{renderSection(key.trim())}</div>
      ))}

      <ArServerFooter />
    </Box>
  );
};

export default ArGradeSubjectLevelV2;

const styles = {
  rtlContainer: {
    direction: "rtl",
  },
  verticalMargin: { marginY: { xs: "5vh", md: "10vh" } },
  heroContanier: {
    paddingTop: {
      xs: "120px",
      sm: "120px",
      md: "120px",
      lg: 0,
      xl: 0,
    },
    height: { xs: "100%", lg: "100vh" },

    display: "flex",
    alignItems: "center",
    position: "relative",
    marginX: { xs: "3vw", sm: "3vw", lg: "0" },
  },

  heroDiv: {
    alignItems: "center",
    padding: "100 0",
  },
  phoneContanier: { position: "relative", paddingBottom: "5vh" },
  phoneBackground: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: -1,
    background:
      "linear-gradient(0deg, #9EDCFF 29.51%, rgba(158, 220, 255, 0.959175) 34.02%, rgba(158, 220, 255, 0.91125) 39.76%, rgba(158, 220, 255, 0.826183) 44.67%, rgba(158, 220, 255, 0.688485) 50%, rgba(158, 220, 255, 0) 70.49%)",
  },
};