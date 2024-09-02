import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import mainImage from "../../../public/assets/images/static/maincuriculum.png";
import { Header } from "@/components";
import Hero from "@/components/maincuriculume/hero";
import HeroInfo from "@/components/maincuriculume/hero-info";

import personal from '../../../public/assets/images/svg/personal.svg'
import interactive from '../../../public/assets/images/svg/Interactive.svg'
import memo from '../../../public/assets/images/svg/Memo.svg'
import Image from "next/image";
import HomeCurriculume from "@/components/maincuriculume/homecurriculume";
import CurriculumOverview from "@/components/maincuriculume/curriculum-overview";
import NeedExpertGuidence from "@/components/maincuriculume/need-expert-guidence";
// import DetailedCurriculum from "@/components/maincuriculume/detailed-curriculum";
import Benifit from "@/components/maincuriculume/benifits";
import StudentsSay from "@/components/maincuriculume/students-say";
import JoinUs from "@/components/maincuriculume/joinus";
import Footer from "@/components/footer";
import DetailedCurriculum from "@/components/maincuriculume/detailed-curriculum";

const Grade: React.FC = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          width: { lg: "100%", sm: "100%" },
          paddingTop: {
            xs: "120px",
            sm: "150px",
            md: "200px",
            lg: 0,
            xl: 0,
          },
          height: { xs: "100%", lg: "100vh" },
          display: "flex",
          alignItems: "end",
          position: "relative",
        }}
      >
        <Grid container>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Hero />
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            xs={12}
            sx={{
              position: "relative",
              "::before": {
                content: "''",
                backgroundImage: `url(${mainImage.src})`,
                backgroundPosition: "bottom",
                backgroundSize: "contain",
                height: { xs: "50vh", sm: "100vh", md: "80vh", lg: "70vh" },
                width: "100%",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                bottom: 60,
                zIndex: "1",
              },
            }}
          >
            <HeroInfo />
          </Grid>
        </Grid>

      </Box>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.70)",
        boxShadow: "0px 2px 1px 0px rgba(0, 0, 0, 0.05), 0px -3px 8px 0px rgba(56, 182, 255, 0.20) inset",
        backdropFilter: "blur(5px)",
        width: "140vh",
        height: "10vh",
        padding: "0 0 0 14vh",
        position: "absolute",
        bottom: 120,
        gap: "2rem",
      }}>
        <Box sx={style.icontxt}>
          <Typography><Image src={personal} alt="" style={{ height: "3.3vh", padding: "0.8vh 0 0 0" }} /></Typography>
          <Typography sx={{ display: "flex", alignItems: "center", fontSize: "2.4vh", fontWeight: "600" }}>Personalized Learning</Typography>
        </Box>
        <Box sx={style.icontxt}>
          <Image src={interactive} alt="" style={{ height: "3.3vh" }} />
          <Typography sx={{ display: "flex", alignItems: "center", fontSize: "2.4vh", fontWeight: "600" }}>Interactive Classes</Typography>
        </Box>
        <Box sx={style.icontxt}>
          <Image src={memo} alt="" style={{ height: "3.3vh" }} />
          <Typography sx={{ display: "flex", alignItems: "center", fontSize: "2.4vh", fontWeight: "600" }}>Mentorship Programs</Typography>
        </Box>
      </Box>

      <Grid>
        <HomeCurriculume />
      </Grid>
      <Grid>
        <CurriculumOverview />
      </Grid>
      <Grid>
        <NeedExpertGuidence />
      </Grid>
      <Grid>
        <DetailedCurriculum />
      </Grid>
      <Grid>
        <Benifit />
      </Grid>
      <Grid>
        <StudentsSay />
      </Grid>
      <Grid>
        <JoinUs />
      </Grid>
      <Footer />
    </>
  );
};
export default Grade;

const style = {
  contanier: {},
  icontxt: {
    display: "flex",
  }
};
