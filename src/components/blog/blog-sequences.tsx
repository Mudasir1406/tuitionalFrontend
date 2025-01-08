import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Header } from "@/components";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/grade-subject-level/hero"), {
  ssr: true,
});
const Offer = dynamic(() => import("@/components/curiculume/offer"), {
  ssr: true,
});
const GetStarted = dynamic(
  () => import("@/components/grade-subject-level/get-started"),
  { ssr: true }
);
const EducationalCounseling = dynamic(
  () => import("@/components/curiculume/why-choose"),
  { ssr: true }
);

const HeroInfo = dynamic(
  () => import("@/components/grade-subject-level/hero-info"),
  { ssr: true }
);
const Footer = dynamic(() => import("@/components/footer"), { ssr: true });

import {
  Component_Sequence_Type,
  PageData,
  tutor_section,
} from "@/types/grade-subject-level.types";
type IProps = {
  data: PageData;
};

const BlogSequences: React.FC<IProps> = ({ data }) => {
  console.log("GradeSubjectLevel", data);

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
                {/* <Form /> */}
              </Grid>
            </Box>
          )}
          {/* <SectionsBox /> */}
        </>
      );
    } else if (name.includes("why_igsce")) {
      // case "why_igsce":
      return (
        data?.[name as keyof PageData] && (
          <Box sx={styles.verticalMargin}>
            <EducationalCounseling data={data?.[name as keyof PageData]} />
          </Box>
        )
      );
    }
    // case "what_we_offer":
    else if (name.includes("what_we_offer")) {
      return (
        data?.[name as keyof PageData].isShow && (
          <Box sx={styles.verticalMargin}>
            <Offer />
          </Box>
        )
      );
    }
    // case "get_started":
    else if (name.includes("get_started")) {
      return (
        data?.[name as keyof PageData].isShow && (
          <Box sx={styles.verticalMargin}>
            <GetStarted />
          </Box>
        )
      );
    }
    // case "video section":
    //   return <div>Video Section</div>; // Assuming there’s a video component to add here
  };

  return (
    <>
      <Header />

      {Object.entries(data).map(([key, value]) => (
        <div key={key}>{renderSection(key.trim())}</div>
      ))}

      <Footer />
    </>
  );
};

export default BlogSequences;

const styles = {
  verticalMargin: { marginY: { xs: "5vh", md: "10vh" } },
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
    // marginTop: { lg: "60px" },
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
