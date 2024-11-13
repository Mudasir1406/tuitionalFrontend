import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import success from "../../../public/assets/images/svg/success.svg";
import certificate from "../../../public/assets/images/svg/certificate.svg";
import equality from "../../../public/assets/images/svg/equality.svg";
import ethics from "../../../public/assets/images/svg/ethics.svg";
import growth from "../../../public/assets/images/svg/growth.svg";
import handshake from "../../../public/assets/images/svg/handshake.svg";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";

type IProps = {
  heading: string;
  dec: string;
  icon: string;
};

const WhyChooseTuitional: React.FunctionComponent = () => {
  return (
    <Box sx={{ marginBottom: 20 }}>
      <Box sx={styles.headingContanier}>
        <Typography
          sx={styles.mainHeading}
          component={"h3"}
          className={leagueSpartan.className}
        >
          Why Choose Tuitional?
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item>
          <InfoBox
            heading="Experienced Tutors"
            dec="We have an experienced, qualified and expert team of online tutors that excel in a wide range of subjects. Tutors from all around the world help students in learning their required subjects in their preferred languages while excelling in their required subject learnings."
            icon="succeed"
          />
        </Grid>
        <Grid item>
          <InfoBox
            heading="One-on-One Learning"
            dec={`Personalized one-on-one online tutoring sessions assist students in coping with their subject difficulties according to their individual learning needs, requirements and preferences. Our tutors aim to provide customized learning sessions to cater to each student's academic requirements.`}
            icon="helpful"
          />
        </Grid>
        <Grid item>
          <InfoBox
            heading="Flexible Schedules"
            dec="From a wide range of flexible schedules students can select their preferred timings and days to suit their busy schedules. Flexible schedules are a great way to help students learn and educate themselves in the best possible ways."
            icon="ethics"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhyChooseTuitional;

const InfoBox: React.FunctionComponent<IProps> = ({ heading, dec, icon }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.7)",
        width: { xs: "186px", sm: "322px", md: "360px", lg: "460px" },
        height: { xs: "167px", sm: "275px", md: "313px", lg: "460px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "10px",
        boxShadow:
          "0px -3px 8px 0px #00000026 inset, 0px 2px 1px 0px #0000000D",
        position: "relative",
      }}
    >
      <Box sx={styles.icon}>
        <Box
          sx={{
            height: {
              xs: "20px",
              sm: "30px",
              md: "45px",
              lg: "45px",
            },
            width: {
              xs: "20px",
              sm: "30px",
              md: "45px",
              lg: "45px",
            },
          }}
        >
          {icon === "succeed" && (
            <Image
              src={success.src}
              width={success.width}
              height={success.height}
              alt="sucess"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {icon === "helpful" && (
            <Image
              src={handshake.src}
              width={handshake.width}
              height={handshake.height}
              alt="handshake"
              style={{ width: "100%", height: "100%" }}
            />
          )}

          {icon === "ethics" && (
            <Image
              src={ethics.src}
              width={ethics.width}
              height={ethics.height}
              alt="ethics"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {icon === "equality" && (
            <Image
              src={equality.src}
              width={equality.width}
              height={equality.height}
              alt="equality"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {icon === "debate" && (
            <Image
              src={certificate.src}
              width={certificate.width}
              height={certificate.height}
              alt="sucess"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {icon === "grow" && (
            <Image
              src={growth.src}
              width={growth.width}
              height={growth.height}
              alt="growth"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </Box>
      </Box>
      <Box sx={{ height: "35%" }}>
        <Typography sx={styles.heading} className={leagueSpartan.className}>
          {heading}
        </Typography>
        <Typography sx={styles.dec} className={leagueSpartan.className}>
          {dec}
        </Typography>
      </Box>
    </Box>
  );
};

const styles = {
  infoBoxContanier: {},
  heading: {
    fontSize: {
      xs: "18px",
      sm: "23px",
      md: "28px",
      lg: "35px",
    },
    fontWeight: 500,
    lineHeight: {
      xs: "16px",
      sm: "20px",
      md: "25px",
      lg: "35px",
    },
    marginBottom: { xs: "10px", sm: "15px", md: "18px", lg: "22px" },
    textAlign: "center",
  },
  dec: {
    fontSize: {
      xs: "12px",
      sm: "16px",
      md: "18px",
      lg: "20px",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "15px",
      sm: "20px",
      md: "25px",
      lg: "30px",
    },
    textAlign: "center",
    maxWidth: { xs: "160px", sm: "200px", md: "250px", lg: "300px" },
    color: "rgba(0,0,0,0.77)",
  },
  icon: {
    width: { xs: "45px", sm: "55px", md: "75px", lg: "115px" },
    height: { xs: "45px", sm: "55px", md: "75px", lg: "115px" },
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "60px",

    boxShadow:
      " 0px -2px 4px 0px #0000005C inset, 0px 4px 12.6px 0px #009BF526",
    marginBottom: { xs: "10px", sm: "20px", md: "30px", lg: "40px" },
  },
  mainHeading: {
    display: "flex",
    fontSize: {
      xs: "35px",
      sm: "40px",
      md: "45px",
      lg: "55px",
    },
    lineHeight: {
      xs: "50px",
      sm: "55px",
      md: "60px",
      lg: "65px",
    },
    fontWeight: 600,
    marginTop: {
      xs: "40px",
      sm: "50px",
      md: "70px",
      lg: "105px",
    },
    marginBottom: "20px",
    position: "relative",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
    "::before": {
      content: "''",
      position: "absolute",
      // zIndex: 10,
      backgroundImage: {
        xs: `url(${linesMobile.src})`,
        sm: `url(${linesInvert.src})`,
        md: `url(${linesInvert.src})`,
        lg: `url(${linesInvert.src})`,
      },
      height: {
        xs: "19px",
        sm: "35px",
        md: "35px",
        lg: "35px",
      },
      width: {
        xs: "20px",
        sm: "43px",
        md: "43px",
        lg: "43px",
      },

      backgroundRepeat: "no-repeat",
      top: {
        xs: -12,
        sm: -35,
        md: -35,
        lg: -35,
      },
      left: {
        xs: "11%",
        sm: "-6%",
        md: "-6%",
        lg: "-6%",
      },
    },
  },
  headingContanier: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    background: "transparent",
  },
};