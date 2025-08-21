"use client";
import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import girl1 from "../../../public/assets/images/static/girl1.png";
import girl2 from "../../../public/assets/images/static/girl2.png";
import girl3 from "../../../public/assets/images/static/girl3.png";
import { leagueSpartan } from "@/app/fonts";
import Image from "next/image";
import { StaticImageData } from "next/dist/shared/lib/get-img-props";
const PopUpButton = dynamic(() => import("../pop-up-button"));

import dynamic from "next/dynamic";

const GetStartedV2: React.FunctionComponent = () => {
  // Hardcoded data
  const data = [
    {
      heading: "Get Started",
      description: "Share your academic details and requirements.",
      image: girl1,
      ButtonText: "Start Now"
    },
    {
      heading: "Meet Your Mentor",
      description: "Our consultant connects you with the right tutor within an hour.",
      image: girl2,
      ButtonText: "Find Tutor"
    },
    {
      heading: "Take The Leap",
      description: "Once satisfied, enroll and start your journey.",
      image: girl3,
      ButtonText: "Enroll Now"
    }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [data.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Box>
      <Typography
        sx={styles.heading}
        variant="h1"
        className={leagueSpartan.className}
        component={"p"}
      >
        Get Started in{" "}
        <span
          style={{
            color: "#38B6FF",
            fontSize: "inherit",
            fontWeight: "inherit",
          }}
        >
          3
        </span>{" "}
        Easy Steps!
      </Typography>
      
      {/* Desktop Grid */}
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "none", lg: "flex" },
          flexDirection: "row",
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {data?.map((item, index) => (
            <Grid item xs={12} lg={4} md={6} sm={12} key={index}>
              <GetStartedBox {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Mobile Custom Carousel */}
      <Box
        sx={{
          display: { xs: "flex", sm: "flex", md: "flex", lg: "none" },
          flexDirection: "column",
          position: "relative",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box sx={styles.carouselContainer}>
          {data?.map((item, index) => (
            <Box
              key={index}
              sx={{
                ...styles.slideItem,
                display: index === currentIndex ? "flex" : "none",
              }}
            >
              <Box sx={styles.cardContainer}>
                <Box sx={styles.imageBox}>
                  <Image
                    src={item.image}
                    alt=""
                    width={300}
                    height={300}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Typography
                  sx={styles.boxHeading}
                  className={leagueSpartan.className}
                  component={"strong"}
                  variant="h4"
                >
                  {item.heading}
                </Typography>
                <Typography
                  sx={styles.boxDesc}
                  className={leagueSpartan.className}
                  component={"p"}
                  variant="body2"
                >
                  {item.description}
                </Typography>
                <PopUpButton sx={styles.containedBtn} href="popup" text={item.ButtonText} />
              </Box>
            </Box>
          ))}
        </Box>
        
        {/* Dot indicators */}
        <Box sx={styles.dotsContainer}>
          {data?.map((_, index) => (
            <Box
              key={index}
              sx={{
                ...styles.dot,
                backgroundColor: index === currentIndex ? "#38B6FF" : "#ddd",
              }}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GetStartedV2;

const styles = {
  // Custom carousel styles
  carouselContainer: {
    width: "100%",
    maxWidth: "320px",
    position: "relative",
    padding: "1rem",
    minHeight: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  },
  slideItem: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardContainer: {
    minWidth: "280px",
    maxWidth: "280px",
    backgroundColor: "#E3F2FD", // Light blue background
    alignItems: "center",
    padding: "1.5rem",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
    border: "1px solid #f0f0f0",
    transition: "all 0.3s ease",
  },
  dotsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    marginTop: "1.5rem",
    paddingBottom: "1rem",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  heading: {
    textAlign: "center",

    marginTop: {
      xs: "70px",
      sm: "80px",
      md: "95px",
      lg: "75px",
    },
    marginBottom: "20px",
    position: "relative",
    paddingLeft: {
      xs: 1,
      sm: 5,
      md: 5,
      lg: 0,
    },
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      left: {
        xs: "10%",
        sm: "10%",
        md: "23%",
        lg: "29%",
      },
      top: {
        xs: -20,
        sm: -40,
        md: -40,
        lg: -40,
      },
      backgroundImage: {
        xs: `url(${linesMobile.src})`,
        sm: `url(${linesInvert.src})`,
        md: `url(${linesInvert.src})`,
        lg: `url(${linesInvert.src})`,
      },
      height: {
        xs: "50px",
        sm: "35px",
        md: "35px",
        lg: "35px",
      },
      width: {
        xs: "50px",
        sm: "43px",
        md: "43px",
        lg: "43px",
      },
      backgroundRepeat: "no-repeat",
    },
  },
  containedBtn: {
    boxShadow: "1px 15px 34px 0px #38B6FF66",
    margin: "2vh 0",
    backgroundColor: "#38B6FF",

    lineHeight: "18.4px",
    textAlign: "center",
    width: "249px",
    color: "white",
    padding: "18px",
    textTransform: "none",
    letterSpacing: "-2%",
    borderRadius: "10px",
    ":hover": {
      boxShadow: "1px 15px 34px 0px #38B6FF66",
      backgroundColor: "#38B6FF",
      padding: "18px",

      letterSpacing: "-2%",

      borderRadius: "10px",

      lineHeight: "18.4px",
      textAlign: "center",
    },
  },
  contanier: {
    height: "auto",
    minWidth: {
      xs: "280px",
      sm: "300px",
      lg: "80%",
    },
    maxWidth: {
      xs: "280px", 
      sm: "300px",
      lg: "400px",
    },
    backgroundColor: "#D7F0FF",
    alignItems: "center",
    padding: "10px 30px",
    margin: "10px auto",
    borderRadius: {
      xs: "12px",
      sm: "12px", 
      lg: "10px",
    },
    display: "flex",
    flexDirection: "column",
  },
  boxHeading: {
    textAlign: "center",
    margin: "2vh 0",
  },
  boxDesc: {
    textAlign: "center",
    margin: "2vh 0",
  },
  imageBox: {
    width: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: {
      xs: 150,
      sm: 250,
      md: 250,
    },
  },
};

type Props = {
  heading: string;
  description: string;
  image: StaticImageData;
  ButtonText: string;
};

const GetStartedBox: React.FC<Props> = ({
  heading,
  description,
  image,
  ButtonText,
}) => {
  return (
    <Box sx={styles.contanier}>
      <Box sx={styles.imageBox}>
        <Image
          src={image}
          alt=""
          width={300}
          height={300}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
      <Typography
        sx={styles.boxHeading}
        className={leagueSpartan.className}
        component={"strong"}
        variant="h4"
      >
        {heading}
      </Typography>
      <Typography
        sx={styles.boxDesc}
        className={leagueSpartan.className}
        component={"p"}
        variant="body2"
      >
        {description}
      </Typography>
      <PopUpButton sx={styles.containedBtn} href="popup" text={ButtonText} />
    </Box>
  );
};