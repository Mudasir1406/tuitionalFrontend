"use client";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import {
  GetStartedData,
  getStartedData,
} from "../../services/get-started/get-started";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import { leagueSpartan } from "@/app/fonts";
import Image from "next/image";
import { StaticImageData } from "next/dist/shared/lib/get-img-props";
import PopUpButton from "../pop-up-button";
import { ForkLeft } from "@mui/icons-material";

const GetStarted = () => {
  const [data, setData] = useState<GetStartedData[]>([]);

  useEffect(() => {
    getStartedData().then((d) => {
      setData(d);
    });
  }, []);
  return (
    <Box>
      <Typography
        sx={styles.heading}
        className={leagueSpartan.className}
        component={"h2"}
        variant="h2"
      >
        How to Get Started
      </Typography>
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "none", lg: "flex" },
          flexDirection: "row",
        }}
      >
        <Grid container>
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
        }}
      >
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={true}
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
          breakpointsBase="window"
          loop
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
          }}
          pagination={{
            dynamicBullets: true,
          }}
          style={{ width: "100%" }}
        >
          {data?.map((item, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
  heading: {
    textAlign: "center",
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
      // left: {
      //   xs: -5,
      //   sm: 10,
      //   md: 10,
      //   lg: '40%',
      // },
      left: { xs: "14%", sm: "18%", md: "36%" }, // Start positioning from the horizontal center of the parent
      // transform: "translateX(-68%)", // Move it left by 50% of its own width to align center

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
    color: "white",
    backgroundColor: "#38B6FF",

    textAlign: "center",
    width: "249px",
    padding: "18px",
    textTransform: "none",
    letterSpacing: "-2%",
    borderRadius: "10px",
    marginBottom: "36px",
    ":hover": {
      boxShadow: "1px 15px 34px 0px #38B6FF66",
      backgroundColor: "#38B6FF",
      // padding: "18px",

      // letterSpacing: "-2%",

      // borderRadius: "10px",
      // fontSize: {
      //   xs: "25px",
      //   sm: "25px",
      //   md: "25px",
      //   lg: "25px",
      // },
      // fontWeight: 700,
      // lineHeight: "18.4px",
      textAlign: "center",
    },
  },
  contanier: {
    height: { xs: "565px", lg: "600px", xl: "auto" },
    // height: "auto",
    width: {
      lg: "auto",
      // lg: "360px",
      xl: "auto",
      // xl: "400px",
    },
    backgroundColor: "#D7F0FF",
    alignItems: "center",
    padding: "10px",
    margin: { lg: "10px" },
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
  },
  boxHeading: {
    // fontSize: "28px",
    // fontWeight: 600,
    // lineHeight: "34px",
    textAlign: "center",
    // height: "100px",
    marginTop: "16px",
    marginBottom: "16px",
  },
  boxDesc: {
    // fontSize: { xs: "18px", lg: "22px" },
    // fontWeight: 400,
    // lineHeight: { xs: "28px", lg: "32px" },
    textAlign: "center",
    // height: "150px",
    marginBottom: "24px",
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
  const theme = useTheme();

  const isLargeOrAbove = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box sx={styles.contanier}>
      <Box
        sx={{
          height: isLargeOrAbove ? 300 : 280,
          width: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={image}
          alt=""
          width={300}
          height={isLargeOrAbove ? 300 : 280}
          // height={360}
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        ></Image>
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
        variant="body2"
      >
        {description}
      </Typography>
      <PopUpButton text={ButtonText} href="popup" sx={styles.containedBtn} />
    </Box>
  );
};
