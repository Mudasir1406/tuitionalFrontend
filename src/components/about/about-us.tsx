"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import studentsImg from "../../../public/assets/images/static/about-students.webp";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
import CircleIcon from "@mui/icons-material/Circle";
import { Height } from "@mui/icons-material";

const renderValue = (type: string) => {
  const missionContent = {
    title: "Inspiring Learning Journeys",
    paragraph: `Tuitional aims to provide students across the Gulf with high quality education empowering their futures through innovative teaching techniques, quality and easily accessible customized online education that elevates a student's confidence and academic growth. Our mission is to provide an inclusive and interactive academic environment that enables students to explore, thrive and excel in their studies.`,
    points: [
      {
        title: "Academic Guidance",
        description:
          "Creating a solid platform for students to avail expert academic guidance.",
      },
      {
        title: "Academic Excellence",
        description: "Ensuring high standards and success for every student.",
      },
      {
        title: "Accessible Quality Education",
        description:
          "Providing easy accessible quality education for students in the Gulf.",
      },
      {
        title: "Engaging Learning",
        description:
          "Making challenging subjects enjoyable and interesting to learn.",
      },
      {
        title: "Professional Growth",
        description:
          "Enhancing professional growth and learning capabilities of students",
      },
      {
        title: "Flexible and Customized Tutoring",
        description:
          "Setting new standards in flexible and customized online tutoring.",
      },
    ],
  };

  const valueContent = {
    title: "Empowering Personalized Learning",
    paragraph: `Tuitional deeply understands the importance of personalized, one-on-one learning in fostering academic excellence, confidence, and a lifelong passion for knowledge. Our highly skilled team of expert online tutors, representing diverse backgrounds from around the world, is dedicated to inspiring each student's love for learning through collaborative, inclusive, engaging, and individualized tutoring sessions. While academic empowerment remains Tuitional's top priority, we are equally committed to helping students grow into confident, compassionate, and well-rounded individuals.`,
    points: [
      {
        title: "Data-Privacy",
        description:
          "Maintaining strict data privacy of each student and staff member.",
      },
      {
        title: "Tutor Matching",
        description:
          "Connecting the ideal online tutors with students based on their academic requirements.",
      },
      {
        title: "Comprehensive Curriculum Support",
        description:
          "Ensuring complete syllabus coverage in addition to easier subject comprehension.",
      },
      {
        title: "Academic Growth",
        description:
          "Supporting students in achieving their desired examination results and academic growth.",
      },
      {
        title: "Expanding Educational Horizons",
        description:
          "Improving and increasing a student's educational horizon for future successes.",
      },
      {
        title: "Unwavering Academic Support",
        description:
          "Providing unwavering academic support through customized individual online tutoring sessions.",
      },
    ],
  };

  const content = type === "mission" ? missionContent : valueContent;

  return (
    <Grid item lg={8} md={12} sm={12} xs={12} sx={styles.valueDiv}>
      <div>
        <Typography
          sx={styles.heading}
          component={"h2"}
          className={leagueSpartan.className}
        >
          {content.title}
        </Typography>
        <Typography sx={styles.paragraph} className={leagueSpartan.className}>
          {content.paragraph}
        </Typography>
      </div>

      <Box sx={styles.box}>
        {content.points.map((point, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "flexStart",
              justifyContent: {
                xs: "center",
                lg: "start",
              },

              cursor: "pointer",
            }}
          >
            <CircleIcon
              sx={{
                color: "#38B6FF",
                fontSize: "1rem",
                marginRight: "8px",
              }}
            />

            <Typography
              sx={styles.textBold}
              component={"p"}
              className={leagueSpartan.className}
            >
              {point.title}:{" "}
              <Typography
                sx={styles.text}
                component="span"
                className={leagueSpartan.className}
              >
                {point.description}
              </Typography>
            </Typography>
          </Box>
        ))}
      </Box>
    </Grid>
  );
};

const AboutUs: React.FunctionComponent = () => {
  const [activeType, setActiveType] = useState("mission");

  const onChangeType = (type: string) => {
    setActiveType(type);
  };
  return (
    <Box sx={styles.infoBoxContanier}>
      {/* <Box sx={{ marginBottom: 20 }}> */}
      <Box sx={styles.headingContanier}>
        <Typography
          sx={styles.mainHeading}
          component={"h1"}
          className={leagueSpartan.className}
        >
          About Us
        </Typography>

        <Typography
          sx={styles.dec}
          component={"p"}
          className={leagueSpartan.className}
        >
          {`Tuitional is a premier online tutoring platform that elevates
          students' learning and provides an exceptional educational experience
          across the Gulf region. Licensed and registered by the Sharjah
          Research and Technology Park in 2022, Tuitional was founded with a
          visionary goal led by Ahmed Shaheer, Mirza Sinan Baig, Abdul Wahid
          Sheikh, Sheikh Zeeshan Ahmed, and Juliana Nogueria. Together, they
          aspired to create a state-of-the-art online tutoring service focused
          on delivering personalized, high-quality education tailored to
          individual students' needs.`}
          <br /> <br />
          {`  With a qualified team of expert tutors excelling in a wide range of
          subjects, Tuitional provides customized learning experiences through
          high-quality, personalized online tutoring sessions that cater to each
          student's unique learning needs and academic goals. Tuitional is known
          for its commitment to innovation, excellence, and quality education,
          empowering students to reach their highest potential. Through
          unwavering academic support, interactive and engaging lessons, and a
          solid educational foundation, we help students achieve both academic
          and future professional success.`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "left",
          rowGap: "16px",
        }}
      >
        <Grid container sx={styles.aboutContent}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={styles.btnDiv}>
            <Button
              variant="contained"
              sx={
                activeType === "mission"
                  ? styles.roundedActiveButton
                  : styles.roundedButton
              }
              onClick={() => onChangeType("mission")}
            >
              Our Mission
            </Button>
            <Button
              variant="contained"
              // sx={styles.roundedButton}
              sx={
                activeType === "value"
                  ? styles.roundedActiveButton
                  : styles.roundedButton
              }
              onClick={() => onChangeType("value")}
            >
              Our Value
            </Button>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={styles.contentDiv}>
            {renderValue(activeType)}
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Box sx={styles.imageDiv}>
                <Image
                  src={studentsImg.src}
                  width={studentsImg.width}
                  height={studentsImg.height}
                  alt="students"
                  style={styles.image}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutUs;

const styles = {
  infoBoxContanier: {
    marginY: { lg: "13vh" },
    // marginX: { lg: "4vw", xs: "4vw" },
    width: { xl: "80%" },
    marginX: { lg: "auto", xs: "auto" },
    paddingX: { lg: "auto", xs: "24px" },
  },
  image: {
    width: "100%",
    height: "100%",
    maxHeight: "553px",
    marginTop: { sm: "24px" } as any,
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
  // contanier: { marginY: { lg: "13vh" }, marginX: { lg: "4vh", xs: "3vh" } },
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
    textAlign: "left",
  },
  paragraph: {
    fontSize: {
      xs: "16px",
      sm: "16px",
      md: "20px",
      lg: "20px",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "16px",
      sm: "16px",
      md: "22px",
      lg: "24px",
    },
    color: "#2D2D2D",
    wordBreak: "break-word",
    maxWidth: "1000px",
  },
  text: {
    fontSize: {
      xs: "16px",
      sm: "16px",
      md: "20px",
      lg: "20px",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "16px",
      sm: "16px",
      md: "22px",
      lg: "24px",
    },
    color: "#2D2D2D",
  },
  textBold: {
    fontSize: {
      xs: "16px",
      sm: "16px",
      md: "20px",
      lg: "20px",
    },
    fontWeight: 600,
    lineHeight: {
      xs: "16px",
      sm: "16px",
      md: "22px",
      lg: "24px",
    },
    color: "#2D2D2D",
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
    textAlign: "justify",
    // maxWidth: { xs: "160px", sm: "200px", md: "250px", lg: "300px" },
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
    justifyContent: "left",
    color: "#000000",
  },
  headingContanier: {
    display: "flex",
    alignItems: "flexStart",
    flexDirection: "column",
    width: "100%",
    background: "transparent",
  },
  roundedActiveButton: {
    backgroundColor: "#38B6FF",
    borderRadius: "50px",
    color: "white",
    maxWidth: "213px",
    fontWeight: {
      xs: "medium",
      sm: "medium",
      md: "semiBold",
      lg: "semiBold",
    },
    textTransform: "none",

    // fontSize: {
    //   xs: "14px",
    //   sm: "16px",
    //   md: "18px",
    //   lg: "14px",
    // },
  },
  roundedButton: {
    backgroundColor: "white",
    borderRadius: "50px",
    color: "black",
    maxWidth: "213px",
    fontWeight: {
      xs: "medium",
      sm: "medium",
      md: "semiBold",
      lg: "semiBold",
    },
    border: "1px solid #38B6FF",
    textTransform: "none",
  },
  aboutContent: {
    marginTop: "36px",
    p: 0,
    padding: 0,
  },
  btnDiv: {
    display: "flex",
    flexDirection: "row",
    rowGap: "16px",
    columnGap: "16px",
    marginY: "24px",
  },
  imageDiv: {
    display: "flex",
    flexDirection: "row",
    textAlign: "flexStart",
    justifyContent: "left",
    columnGap: "24px",
    marginTop: "24px",
    // maxHeight: "400px",
    // marginX: "auto",
  },
  contentDiv: {
    display: "flex",
    // flexDirection: "row",
    flexDirection: { xs: "column", sm: "column", lg: "row" },

    textAlign: "flexStart",
    justifyContent: "left",
    columnGap: "24px",
  },
  valueDiv: {
    display: "flex",
    flexDirection: "column",
    textAlign: "flexStart",
    justifyContent: "left",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    rowGap: "12px",
    border: "1px solid #B9E5FF",
    borderRadius: "16px",
    padding: "24px",
    marginTop: "32px",
    // alignItems: "flexStart",
  },
};
