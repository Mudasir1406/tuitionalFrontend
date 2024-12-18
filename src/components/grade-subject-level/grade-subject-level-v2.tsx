import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Header } from "@/components";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/grade-subject-level/hero"), {
  ssr: true,
});
const SectionsBox = dynamic(
  () => import("@/components/grade-subject-level/sectionsbox"),
  { ssr: true }
);
const Offer = dynamic(() => import("@/components/curiculume/offer"), {
  ssr: true,
});
const GetStarted = dynamic(
  () => import("@/components/grade-subject-level/get-started"),
  { ssr: true }
);
const EducationalCounseling = dynamic(
  () => import("@/components/curiculume/educational-counseling"),
  { ssr: true }
);

const HeroInfo = dynamic(
  () => import("@/components/grade-subject-level/hero-info"),
  { ssr: true }
);
const Footer = dynamic(() => import("@/components/footer"), { ssr: true });

const PhoneCta = dynamic(() => import("./phone-cta"), { ssr: true });
const DemoPointers = dynamic(() => import("./demo-pointers"), { ssr: true });
const MainContent = dynamic(() => import("./main-content"), { ssr: true });
const PopularSubjects = dynamic(
  () => import("@/components/curiculume/popular-igcse-subjects"),
  { ssr: true }
);
const FrequentlyQuestions = dynamic(() => import("./faqs"), { ssr: true });
const BlogCta = dynamic(() => import("./blog-cta"), { ssr: true });
const StudentSays = dynamic(() => import("./students-says"), { ssr: true });
const TutorSection = dynamic(() => import("./tutor-section/TutorSection"), {
  ssr: true,
});
const SchoolLogosSection = dynamic(
  () => import("./school-logos-section/SchoolLogosSection"),
  {
    ssr: true,
  }
);
const BenifitsOfStudyingSection = dynamic(
  () => import("./benifts-of-studying-section/BenifitsOfStudyingSection"),
  {
    ssr: true,
  }
);
const LinkListViewSection = dynamic(
  () => import("./link-list-view/LinkListViewSection"),
  {
    ssr: true,
  }
);
const Form = dynamic(() => import("./form/form"), {
  ssr: true,
});
const TutoringProgramSection = dynamic(
  () => import("./tutoring-program-section/TutoringProgramSection"),
  {
    ssr: true,
  }
);
const BenifitsSection = dynamic(
  () => import("./benifts-section/BenifitsSection"),
  {
    ssr: true,
  }
);

import {
  Component_Sequence_Type,
  PageData,
} from "@/types/grade-subject-level.types";
type IProps = {
  data: PageData;
};

const GradeSubjectLevelV2: React.FC<IProps> = ({ data }) => {
  console.log("GradeSubjectLevel", data.hero_section_from);

  const renderSection = (name: string) => {
    // switch (name) {
    //   case "hero_section":
    // if (name.includes("hero_section")) {
    //   return (
    //     <>
    //       {data?.hero_section && (
    //         <Box sx={styles.heroContanier}>
    //           <Grid container>
    //             <Grid item lg={6} md={12} sm={12} xs={12}>
    //               <Hero data={data?.hero_section} />
    //             </Grid>
    //             <HeroInfo
    //               image={data?.hero_section?.image}
    //               imageAltText={data?.hero_section?.imageAltText}
    //             />
    //             {/* <Form /> */}
    //           </Grid>
    //         </Box>
    //       )}
    //       <SectionsBox />
    //     </>
    //   );
    // }
    // case "hero_section_from":
     if (name.includes("hero_section_from")) {
      return (
        <>
          <Box sx={styles.heroContanier}>
            <Box sx={{ marginTop: { md: "2vh", lg: "18vh" } }}>
              <Grid container gap={4} sx={styles.heroDiv}>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Hero data={data?.hero_section_from} />
                </Grid>

                <Grid
                  item
                  lg={5}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{ margin: "24px 0" }}
                >
                  <Form />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <SectionsBox />
        </>
      );
    } else if (name.includes("igcse_in_dubai")) {
      // case "igcse_in_dubai":
      return (
        <>
          <BenifitsOfStudyingSection data={data.igcse_in_dubai} />
        </>
      );
    }
    // case "link_list":
    else if (name.includes("link_list")) {
      return (
        <>
          <LinkListViewSection data={data.link_list} />
        </>
      );
    } // case "igcse_tutoring_program":
    else if (name.includes("igcse_tutoring_program")) {
      return (
        <>
          {data?.igcse_tutoring_program?.isShow && (
            <BenifitsSection data={data.igcse_tutoring_program} />
          )}
        </>
      );
    }

    // case "school_logos":
    else if (name.includes("school_logos")) {
      return (
        <Box sx={{ marginTop: "10vh" }}>
          <SchoolLogosSection />
        </Box>
      );
    }
    // case "tutor_section":
    else if (name.includes("tutor_section")) {
      return (
        <>
          <TutorSection data={data?.tutor_section} />
        </>
      );
    }
    // case "tutoring_program":
    else if (name.includes("tutoring_program")) {
      return <TutoringProgramSection data={data?.tutoring_program} />;
    }
    // case "main_content":
    else if (name.includes("main_content")) {
      return (
        data.main_content && (
          <Box sx={{ marginTop: "10vh" }}>
            <MainContent data={data?.main_content} />
          </Box>
        )
      );
    }
    // case "phone_cta":
    else if (name.includes("phone_cta")) {
      return (
        data.phone_cta && (
          <>
            <Box sx={styles.phoneContanier}>
              <Box sx={styles.phoneBackground} />
              <PhoneCta data={data?.phone_cta} />
            </Box>
            {/* <TutorSection /> */}
          </>
        )
      );
    }

    // case "demo_pointers":
    else if (name.includes("demo_pointers")) {
      return (
        data?.demo_pointers?.demoPointersData.length > 0 && (
          <DemoPointers data={data?.demo_pointers} />
        )
      );
    }
    // case "popular_subjects":
    else if (name.includes("popular_subjects")) {
      return (
        data?.popular_subjects?.subjects.length > 0 && (
          <PopularSubjects data={data?.popular_subjects} />
        )
      );
    } else if (name.includes("education_counseling")) {
      // case "education_counseling":
      return (
        data.education_counseling && (
          <EducationalCounseling data={data?.education_counseling} />
        )
      );
    } else if (name.includes("why_igsce")) {
      // case "why_igsce":
      return data.why_igsce && <EducationalCounseling data={data?.why_igsce} />;
    }
    // case "what_our_student_says":
    else if (name.includes("what_our_student_says")) {
      return (
        data.what_our_student_says && (
          <StudentSays data={data.what_our_student_says} />
        )
      );
    }
    // case "blog_CTA":
    else if (name.includes("blog_CTA")) {
      return data.blog_CTA && <BlogCta data={data?.blog_CTA} />;
    }
    // case "Faqs":
    else if (name.includes("Faqs")) {
      return data.Faqs && <FrequentlyQuestions data={data?.Faqs} />;
    }
    // case "what_we_offer":
    else if (name.includes("what_we_offer")) {
      return (
        data.what_we_offer.isShow && (
          <Box sx={{ marginTop: "10vh" }}>
            <Offer />
          </Box>
        )
      );
    }
    // case "get_started":
    else if (name.includes("get_started")) {
      return data.get_started.isShow && <GetStarted />;
    }
    // case "video section":
    //   return <div>Video Section</div>; // Assuming there’s a video component to add here
  };

  return (
    <>
      <Header />

      {/* {sequence.sections
        .sort((a, b) => a.placment - b.placment)
        .map((section) => (
          <section key={section.placment} style={{ all: "unset" }}>
            {renderSection(section.name)}
          </section>
        ))} */}

      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          {renderSection(key)}

          {/* <p>{key}</p> */}
        </div>
      ))}

      <Footer />
    </>
  );
};

export default GradeSubjectLevelV2;

const styles = {
  heroContanier: {
    // width: { lg: "100%", sm: "100%" },
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
  phoneContanier: { position: "relative", paddingBottom: "4vh" },
  phoneBackground: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: -1,
    background:
      "linear-gradient(0deg, #9EDCFF 29.51%, rgba(158, 220, 255, 0.959175) 34.02%, rgba(158, 220, 255, 0.91125) 39.76%, rgba(158, 220, 255, 0.826183) 44.67%, rgba(158, 220, 255, 0.688485) 50%, rgba(158, 220, 255, 0) 70.49%)",
  },
};