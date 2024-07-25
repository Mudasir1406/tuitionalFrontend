"use client";

import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Typography,
  linearProgressClasses,
  styled,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import linesInvertWhite from "../../../public/assets/images/static/lines-invert-white.png";
import { SwiperSlide, Swiper, SwiperRef } from "swiper/react";
import { Autoplay, Pagination, EffectCards } from "swiper/modules";
import WestIcon from "@mui/icons-material/West";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import EastIcon from "@mui/icons-material/East";
import user from "../../../public/assets/images/static/clientReview.png";
import linesMobileWhite from "../../../public/assets/images/static/linesMobileWhite.png";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 7,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "rgba(255,255,255,0.22)",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "white" : "black",
  },
}));

const OurClient = () => {
  const [progress, setProgress] = React.useState(0);
  const swiper = useRef<SwiperRef | null>(null);

  const handleProgress = () => {
    if (swiper && swiper.current?.swiper.activeIndex) {
      const newProgress =
        (100 / swiper.current?.swiper.slides.length) *
        swiper.current?.swiper.realIndex;
      setProgress(newProgress);
    }
  };

  return (
    <Box sx={styles.constanier}>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          display: {
            xs: "flex",
            sm: "flex",
            md: "flex",
            lg: "none",
          },
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            marginLeft: { xs: 0, lg: 10 },
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={styles.heading} className={leagueSpartan.className}>
            What are Students Says!{" "}
          </Typography>
          <Typography sx={[styles.desc]} className={leagueSpartan.className}>
            Listen to the incredible experiences shared by our students!
            Register now to unlock an enriching world of enjoyable learning
          </Typography>
          <Button
            variant="contained"
            sx={styles.buttonMobile}
            className={leagueSpartan.className}
          >
            Read More
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: {
              xs: 8,
              sm: 15,
              md: 15,
              lg: 15,
            },
          }}
        >
          <Swiper
            ref={swiper}
            centeredSlides={true}
            grabCursor
            // onSlideChange={() => handleProgress()}
            style={{
              height: "100%",
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, EffectCards]}
            effect="cards"
            cardsEffect={{
              perSlideOffset: 5,
              slideShadows: false,
              perSlideRotate: 1,
            }}
          >
            {[0, 0, 0, 0, 0].map((item, index) => (
              <SwiperSlide
                key={index}
                style={{
                  display: "flex",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReviewMobile />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box sx={{ display: "flex", marginTop: 5 }}>
          <Box
            sx={styles.nextButton}
            onClick={() => swiper.current?.swiper.slidePrev()}
          >
            <WestIcon />
          </Box>
          <Box
            sx={styles.nextButton}
            onClick={() => swiper.current?.swiper.slideNext()}
          >
            <EastIcon />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            lg: "flex",
          },
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "50%", marginLeft: 20 }}>
          <Typography sx={styles.heading} className={leagueSpartan.className}>
            What are
            <br /> Students Says!{" "}
          </Typography>
          <Typography
            sx={[styles.desc, { width: "53%" }]}
            className={leagueSpartan.className}
          >
            Listen to the incredible experiences shared by our students!
            Register now to unlock an enriching world of enjoyable learning
          </Typography>
          <Button variant="contained" sx={styles.button}>
            Write A Review
          </Button>
        </Box>

        <Swiper
          ref={swiper}
          centeredSlides={true}
          grabCursor
          onSlideChange={() => handleProgress()}
          //   onSwiper={(swiper: any) => console.log(swiper)}
          style={{
            height: "100%",
            marginTop: 10,
            display: "flex",
            width: "70%",
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, EffectCards]}
          effect="cards"
          cardsEffect={{
            perSlideOffset: 4,
            slideShadows: false,
            perSlideRotate: 1,
          }}
        >
          {[0, 0, 0, 0, 0].map((item, index) => (
            <SwiperSlide
              key={index}
              style={{ display: "flex", borderRadius: 10, paddingLeft: 110 }}
            >
              <Review />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default OurClient;

const styles = {
  constanier: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // background: "linear-gradient(180deg, #00A1FE 0%, #0D84C9 100%)",
    paddingY: {
      xs: "90px",
      sm: "100px",
      md: "110px",
      lg: "140px",
    },
    marginY: {
      xs: "60px",
      sm: "70px",
      md: "80px",
      lg: 10,
    },
    position: "relative",
    flexDirection: {
      xs: "row",
      sm: "row",
      md: "row",
      lg: "column",
    },
  },
  reviewContanier: {
    boxShadow: " 0px -3px 8px 0px #00000047 inset",

    paddingX: {
      xs: "38px",
      sm: "38px",
      md: "50px",
      lg: "50px",
    },
    paddingY: "60px",
    width: {
      xs: "70%",
      sm: "400px",
      md: "400px",
      lg: "400px",
    },
    backgroundColor: "white",
    borderRadius: 10,
  },
  heading: {
    fontFamily: "League Spartan",
    fontSize: {
      xs: "35px",
      sm: "40px",
      md: "55px",
      lg: "55px",
    },
    fontWeight: 600,
    lineHeight: {
      xs: "45px",
      sm: "50px",
      md: "65px",
      lg: "65px",
    },
    position: "relative",
    color: "black",
    textAlign: {
      xs: "center",
      sm: "center",
      md: "center",
      lg: "start",
    },
    marginBottom: {
      xs: "17px",
      sm: "17px",
      md: "10px",
      lg: "10px",
    },
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      left: {
        xs: 10,
        sm: -30,
        md: -30,
        lg: -30,
      },
      top: {
        xs: -15,
        sm: -50,
        md: -50,
        lg: -50,
      },
      backgroundImage: {
        xs: `url(${linesMobileWhite.src})`,
        sm: `url(${linesInvertWhite.src})`,
        md: `url(${linesInvertWhite.src})`,
        lg: `url(${linesInvertWhite.src})`,
      },
      height: "12px",
      width: "14px",
      backgroundRepeat: "no-repeat",
    },
  },
  userContanier: {
    display: "flex",
    alignItems: "center",
  },
  reviewText: {
    fontFamily: "League Spartan",
    fontSize: {
      xs: "20px",
      sm: "22px",
      md: "24px",
      lg: "25px",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "40px",
      sm: "38px",
      md: "36px",
      lg: "35px",
    },
    height: "350px",
    color: "rgba(0,0,0,0.77)",
  },
  coma: {
    fontFamily: "League Spartan",
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: "35px",
    color: "white",
    marginTop: "3px",
    marginLeft: "10px",
  },
  ratingContanier: {
    backgroundColor: "#E9B93D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "80px",
    borderRadius: 10,
    paddingX: "10px",
    marginBottom: "10px",
  },
  nextButton: {
    width: "80px",
    height: "80px",
    borderRadius: "40px",
    backgroundColor: "rgba(255,255,255,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px -3px 8px 0px #00000026 inset",
    cursor: "pointer",
    marginX: "10px",
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.9)",
    },
  },

  username: {
    fontFamily: "League Spartan",
    fontSize: { xs: "26px", sm: "26px" },
    fontWeight: 500,
    lineHeight: "35px",
  },
  userLocation: {
    fontFamily: "League Spartan",
    fontSize: { xs: "18px", sm: "19px" },
    fontWeight: 400,
    lineHeight: "35px",
    color: "rgba(0,0,0,0.77)",
  },
  desc: {
    fontFamily: "League Spartan",
    fontSize: {
      xs: "20px",
      sm: "22px",
      md: "22px",
      lg: "22px",
    },
    fontWeight: 400,
    lineHeight: "35px",
    color: "black",
    textAlign: {
      xs: "center",
      sm: "center",
      md: "center",
      lg: "start",
    },
    paddingX: {
      xs: "20px",
      sm: "22px",
      md: "0px",
      lg: "0px",
    },
  },
  button: {
    boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
    color: "white",
    backgroundColor: "rgba(56, 182, 255, 1)",
    fontFamily: "League Spartan",
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "18.4px",
    textAlign: "center",
    width: "249px",
    padding: "15px",
    marginTop: "80px",
    textTransform: "none",
    borderRadius: "10px",
    ":hover": {
      boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
      color: "white",
      backgroundColor: "rgba(56, 182, 255, 1)",
      padding: "15px",
      fontFamily: "League Spartan",
      fontSize: "20px",
      fontWeight: 700,
      lineHeight: "18.4px",
      textAlign: "center",
    },
  },
  buttonMobile: {
    boxShadow: "1px 15px 34px 0px #38B6FF66",
    color: "#009BF5",
    backgroundColor: "white",
    fontFamily: "League Spartan",
    fontSize: "25px",
    fontWeight: 700,
    lineHeight: "18.4px",
    textAlign: "center",
    width: "249px",
    padding: "18px",
    marginTop: "20px",
    textTransform: "none",
    ":hover": {
      boxShadow: "1px 15px 34px 0px #38B6FF66",
      backgroundColor: "white",
      padding: "18px",
      fontFamily: "League Spartan",
      fontSize: "25px",
      fontWeight: 700,
      lineHeight: "18.4px",
      textAlign: "center",
    },
  },
};

const Review = () => {
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: 10,
        boxShadow:
          "0px -3px 8px 0px rgba(0, 0, 0, 0.28) inset, 0px 4px 44px 0px rgba(0, 0, 0, 0.08)",
        backgroundColor: "rgba(255,255,255,1)",
      }}
    >
      <Box sx={styles.reviewContanier}>
        <Box sx={styles.ratingContanier}>
          <StarPurple500OutlinedIcon
            sx={{ height: 25, width: 25, color: "white" }}
          />
          <Typography sx={styles.coma} className={leagueSpartan.className}>
            5.0
          </Typography>
        </Box>
        <Typography sx={styles.reviewText} className={leagueSpartan.className}>
          The teacher is really good at explaining, they repeat as many times as
          i want. The teacher is really patient and really kind. I don't have
          any complains. You guys are doing a really good job.
        </Typography>
        <Box sx={styles.userContanier}>
          <Box>
            <Typography
              sx={styles.username}
              className={leagueSpartan.className}
            >
              Fransis Van
            </Typography>
            <Typography
              sx={styles.userLocation}
              className={leagueSpartan.className}
            >
              United Arab Emirates
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const ReviewMobile = () => {
  return (
    <Box sx={styles.reviewContanier}>
      <Box sx={styles.ratingContanier}>
        <StarPurple500OutlinedIcon
          sx={{ height: 25, width: 25, color: "white" }}
        />
        <Typography sx={styles.coma} className={leagueSpartan.className}>
          5.0
        </Typography>
      </Box>
      <Typography sx={styles.reviewText} className={leagueSpartan.className}>
        The teacher is really good at explaining, they repeat as many times as i
        want. The teacher is really patient and really kind. I don't have any
        complains. You guys are doing a really good job.
      </Typography>
      <Box sx={styles.userContanier}>
        <Image
          src={user.src}
          width={50}
          height={50}
          alt="user"
          style={{ borderRadius: 25, marginRight: 10 }}
        ></Image>
        <Box>
          <Typography sx={styles.username} className={leagueSpartan.className}>
            Fransis Van
          </Typography>
          <Typography
            sx={styles.userLocation}
            className={leagueSpartan.className}
          >
            United Arab Emirates
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
