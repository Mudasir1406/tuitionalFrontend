"use client";
import { Box, Grid, Typography } from "@mui/material";
import React, { useRef } from "react";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import { GetStartedData } from "../../services/get-started/get-started";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { leagueSpartan } from "@/app/fonts";
import Image from "next/image";
import { StaticImageData } from "next/dist/shared/lib/get-img-props";
const PopUpButton = dynamic(() => import("../pop-up-button"));

import { ArrowLeftRounded, ArrowRightRounded } from "@mui/icons-material";
import dynamic from "next/dynamic";

type IProps = {
  data: GetStartedData[];
};

const GetStarted: React.FunctionComponent<IProps> = ({ data }) => {
  const swiperRef = useRef<SwiperClass | null>(null);

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
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "none", lg: "flex" },
          flexDirection: "row",
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          // columnGap: "24px",
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
      <Box
        sx={{
          display: { xs: "flex", sm: "flex", md: "flex", lg: "none" },
          flexDirection: "row",
          position: "relative",
        }}
      >
        <Swiper
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={true}
          loop={data?.length >= 3}
          autoplay={{
            delay: 5000,
          }}
          modules={[Pagination, Autoplay]}
          // onSwiper={(swiper) => (swiperRef = swiper)} // Assign Swiper instance
          onSwiper={(swiperInstance) => {
            swiperRef.current = swiperInstance;
          }}
          style={{ width: "100%", position: "relative" }} // Ensure relative positioning for arrows
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            520: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            700: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1040: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >
          {/* Left Arrow */}
          <Box
            sx={{ ...styles.arrowDiv, ...styles.leftDiv }}
            // onClick={() => swiperRef?.slidePrev()}
            // onClick={() => swiperMovement("prev")}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowLeftRounded fontSize="large" />
          </Box>

          {/* Right Arrow */}
          <Box
            sx={{ ...styles.arrowDiv, ...styles.rightDiv }}
            // onClick={() => swiperRef?.slideNext()}
            // onClick={() => swiperMovement("next")}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowRightRounded fontSize="large" />
          </Box>

          {/* Slides */}
          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <GetStartedBox {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default GetStarted;

const styles = {
  arrowDiv: {
    backgroundColor: "lightGray",
    borderRadius: "50px",
    width: "40px",
    height: "40px",
    display: { xs: "flex", sm: "none" },
    alignItems: "center",
    cursor: "pointer",

    justifyContent: "center",
    zIndex: 10, // Ensure buttons are above Swiper
  },
  leftDiv: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
  },
  rightDiv: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
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
  scroller: {
    flexDirection: "row",
    display: "flex",
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
    // height: "700px",

    width: {
      lg: "80%",
      xl: "400px",
    },
    backgroundColor: "#D7F0FF",
    alignItems: "center",
    padding: "10px 30px",
    margin: "10px auto",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
  },
  boxHeading: {
    textAlign: "center",
    margin: "2vh 0",
  },
  boxDesc: {
    textAlign: "center",
    // height: "150px",
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
        {/* <Image
          src={image}
          alt=""
          width={300}
          height={300}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        /> */}
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
