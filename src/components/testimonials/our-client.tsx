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
import linesInvertPrimary from "../../../public/assets/images/static/lines-invert-primary.png";
import { SwiperSlide, Swiper, SwiperRef } from "swiper/react";
import { Autoplay, Pagination, EffectCards } from "swiper/modules";
import WestIcon from "@mui/icons-material/West";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import EastIcon from "@mui/icons-material/East";
import user from "../../../public/assets/images/static/clientReview.png";
import linesInvertPrimarySmall from "../../../public/assets/images/static/lines-invert-primary-small.png";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
import { Testimonials_Type } from "@/services/testimonials/testimonials";
import { redirectToTrustpilot } from "@/utils/helper";
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
type IProps = {
  data: Testimonials_Type[];
};

const OurClient: React.FC<IProps> = ({ data }) => {
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
  const duplicatedData = data?.length < 3 ? [...data, ...data, ...data] : data;

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
          <Typography
            sx={styles.heading}
            className={leagueSpartan.className}
            component={"h2"}
            variant="h2"
          >
            What are Students Says!{" "}
          </Typography>
          <Typography
            sx={styles.desc}
            className={leagueSpartan.className}
            component={"p"}
            variant="body1"
          >
            Listen to the incredible and valuable experience shared by our
            students. Register now to unlock an enriching world of enjoyable and
            quality learning and education.
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
            loop={duplicatedData?.length >= 3} // Check the length of the potentially duplicated data
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
            {duplicatedData?.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{
                  display: "flex",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReviewMobile item={item} />
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
        <Box sx={{ width: "35%", marginLeft: 20 }}>
          <Typography
            sx={styles.heading}
            className={leagueSpartan.className}
            variant="h2"
          >
            What are
            <br /> Students Says!{" "}
          </Typography>
          <Typography
            sx={[styles.desc, { width: "53%" }]}
            className={leagueSpartan.className}
            variant="h5"
          >
            Listen to the incredible experiences shared by our students!
            Register now to unlock an enriching world of enjoyable learning
          </Typography>
          <Button
            variant="contained"
            sx={styles.button}
            className={leagueSpartan.className}
            onClick={redirectToTrustpilot}
          >
            Write A Review
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "45%",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box
              sx={styles.nextButton}
              onClick={() => swiper.current?.swiper.slidePrev()}
            >
              <WestIcon />
            </Box>
          </Box>
          <Swiper
            ref={swiper}
            centeredSlides={true}
            grabCursor
            onSlideChange={() => handleProgress()}
            style={{
              height: "100%",
              marginTop: 10,
              display: "flex",
              width: "100%",
              marginLeft: "2%",
            }}
            loop={data?.length >= 3}
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
            {data.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{
                  display: "flex",
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <Review item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={styles.nextButton}
              onClick={() => swiper.current?.swiper.slideNext()}
            >
              <EastIcon />
            </Box>
          </Box>
        </Box>
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
      lg: "60px",
    },
    paddingY: "70px",
    width: {
      xs: "70%",
      sm: "100%",
      md: "100%",
      lg: "100%",
    },
    backgroundColor: "white",
    borderRadius: 10,
    maxWidth: "400px",
  },
  heading: {
    // fontSize: {
    //   xs: "35px",
    //   sm: "40px",
    //   md: "55px",
    //   lg: "55px",
    // },
    // fontWeight: 600,
    // lineHeight: {
    //   xs: "45px",
    //   sm: "50px",
    //   md: "65px",
    //   lg: "65px",
    // },
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
        xs: `url(${linesInvertPrimarySmall.src})`,
        sm: `url(${linesInvertPrimary.src})`,
        md: `url(${linesInvertPrimary.src})`,
        lg: `url(${linesInvertPrimary.src})`,
      },
      height: "35px",
      width: "43px",
      backgroundRepeat: "no-repeat",
    },
  },
  userContanier: {
    display: "flex",
    alignItems: "center",
  },
  reviewText: {
    // fontSize: {
    //   xs: "20px",
    //   sm: "22px",
    //   md: "24px",
    //   lg: "30px",
    // },
    // fontWeight: 400,
    // lineHeight: {
    //   xs: "40px",
    //   sm: "38px",
    //   md: "36px",
    //   lg: "50px",
    // },
    // height: "300px",
    marginBottom: "16px",
    color: "rgba(0,0,0,0.77)",
  },
  coma: {
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
    // fontSize: { xs: "26px", sm: "26px" },
    // fontWeight: 500,
    // lineHeight: "35px",
  },
  userLocation: {
    // fontSize: { xs: "18px", sm: "19px" },
    // fontWeight: 400,
    // lineHeight: "35px",
    color: "rgba(0,0,0,0.77)",
  },
  desc: {
    // fontSize: {
    //   xs: "20px",
    //   sm: "22px",
    //   md: "22px",
    //   lg: "22px",
    // },
    // fontWeight: 400,
    // lineHeight: "35px",
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

      fontSize: "25px",
      fontWeight: 700,
      lineHeight: "18.4px",
      textAlign: "center",
    },
  },
};

const Review: React.FC<RProps> = ({ item }) => {
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
            {item.rating.toFixed(1)}
          </Typography>
        </Box>
        <Typography
          sx={styles.reviewText}
          className={leagueSpartan.className}
          variant="h6"
        >
          {item.message}
        </Typography>
        <Divider sx={{ marginBottom: "36px" }} />
        <Box sx={styles.userContanier}>
          <Image
            src={item.imageUrl}
            width={50}
            height={50}
            alt="user"
            style={{ borderRadius: 25, marginRight: 10, objectFit: "contain" }}
          ></Image>
          <Box>
            <Typography
              sx={styles.username}
              className={leagueSpartan.className}
              variant="h5"
            >
              {item.userName}
            </Typography>
            <Typography
              sx={styles.userLocation}
              className={leagueSpartan.className}
              variant="body2"
            >
              {item.country}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

type RProps = {
  item: Testimonials_Type;
};

const ReviewMobile: React.FC<RProps> = ({ item }) => {
  return (
    <Box sx={styles.reviewContanier}>
      <Box sx={styles.ratingContanier}>
        <StarPurple500OutlinedIcon
          sx={{ height: 25, width: 25, color: "white" }}
        />
        <Typography sx={styles.coma} className={leagueSpartan.className}>
          {item.rating.toFixed(1)}
        </Typography>
      </Box>
      <Typography
        sx={styles.reviewText}
        className={leagueSpartan.className}
        variant="h6"
      >
        {item.message}
      </Typography>
      <Box sx={styles.userContanier}>
        <Image
          src={item.imageUrl}
          width={50}
          height={50}
          alt="user"
          style={{ borderRadius: 25, marginRight: 10 }}
        ></Image>
        <Box>
          <Typography
            sx={styles.username}
            className={leagueSpartan.className}
            variant="h5"
          >
            {item.userName}
          </Typography>
          <Typography
            sx={styles.userLocation}
            className={leagueSpartan.className}
            variant="body2"
          >
            {item.country}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
