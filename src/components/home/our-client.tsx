"use client";
import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useRef } from "react";
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
import { Testimonials_Type } from "@/services/testimonials/testimonials";
type IProps = {
  data: Testimonials_Type[];
};

const OurClient: React.FC<IProps> = ({ data }) => {
  const swiper = useRef<SwiperRef | null>(null);
  const swiperPrev = () => {
    swiper.current?.swiper.slidePrev();
  };
  const swiperNext = () => {
    swiper.current?.swiper.slideNext();
  };
  const duplicatedData = data?.length < 3 ? [...data, ...data, ...data] : data;

  return (
    <Box sx={styles.constanier}>
      <Box sx={styles.inner}>
        <Box sx={styles.headingContanier}>
          <Typography
            sx={styles.heading}
            className={leagueSpartan.className}
            component={"h3"}
            variant="h2"
          >
            What are Students Says!
          </Typography>
          <Typography
            sx={styles.desc}
            variant="body2"
            className={leagueSpartan.className}
          >
            Listen to the incredible experiences shared by our students!
            Register now to unlock an enriching world of enjoyable learning
          </Typography>
          <Button
            variant="contained"
            sx={styles.buttonMobile}
            className={leagueSpartan.className}
            href={"/testimonials"}
          >
            Read More
          </Button>
        </Box>
        <Box sx={styles.swiperContanier}>
          <Swiper
            ref={swiper}
            centeredSlides={true}
            grabCursor
            style={styles.swiper}
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
              <SwiperSlide key={index} style={styles.slide}>
                <ReviewMobile item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box sx={{ display: "flex", marginTop: 5 }}>
          <Box sx={styles.nextButton} onClick={swiperPrev}>
            <WestIcon />
          </Box>
          <Box sx={styles.nextButton} onClick={swiperNext}>
            <EastIcon />
          </Box>
        </Box>
      </Box>
      <Box sx={styles.ourStudent}>
        <Box sx={styles.ourStudentInner}>
          <Typography
            sx={styles.heading}
            variant="h2"
            className={leagueSpartan.className}
          >
            What our Students Says!
          </Typography>
          <Typography
            sx={styles.desc}
            variant="body2"
            className={leagueSpartan.className}
          >
            Listen to the incredible experiences shared by our students!
            Register now to unlock an enriching world of enjoyable learning
          </Typography>
          <Button
            variant="contained"
            sx={styles.button}
            className={leagueSpartan.className}
            href={"/testimonials"}
          >
            Read More
          </Button>
        </Box>

        <Swiper
          ref={swiper}
          centeredSlides={true}
          grabCursor
          style={styles.swiperMobile}
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
              style={{ display: "flex", borderRadius: 10, paddingLeft: "12vw" }}
            >
              <Review item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box sx={styles.info}>
        <Box>
          <Typography sx={styles.numbers} className={leagueSpartan.className}>
            25K+
          </Typography>
          <Typography
            sx={styles.numbersDec}
            className={leagueSpartan.className}
          >
            Classes
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={styles.dvider}
        />
        <Box>
          <Typography sx={styles.numbers} className={leagueSpartan.className}>
            600K+
          </Typography>
          <Typography
            sx={styles.numbersDec}
            className={leagueSpartan.className}
          >
            Members
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={styles.dvider}
        />
        <Box>
          <Typography sx={styles.numbers} className={leagueSpartan.className}>
            8K+
          </Typography>
          <Typography
            sx={styles.numbersDec}
            className={leagueSpartan.className}
          >
            TEACHERS
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={styles.dvider}
        />
        <Box>
          <Box sx={styles.ratingContanierMobile}>
            <Typography sx={styles.numbers} className={leagueSpartan.className}>
              4.8
            </Typography>
            <Box sx={{ marginLeft: 4 }}>
              {[0, 0, 0, 0, 0].map((i, index) => (
                <StarPurple500OutlinedIcon sx={styles.star} key={index} />
              ))}
            </Box>
          </Box>
          <Typography
            sx={styles.numbersDec}
            className={leagueSpartan.className}
          >
            Rating
          </Typography>
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
    background: "linear-gradient(180deg, #00A1FE 0%, #0D84C9 100%)",
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
  dvider: { backgroundColor: "white" },
  slide: {
    display: "flex",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  swiperContanier: {
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
  },
  ratingContanierMobile: { display: "flex", alignItems: "center" },
  ourStudentInner: { width: "20%", marginLeft: 20 },
  ourStudent: {
    width: "100%",
    position: "relative",
    display: {
      xs: "none",
      sm: "none",
      md: "none",
      lg: "flex",
    },
    alignItems: "center",
  },
  swiper: {
    height: "100%",
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headingContanier: {
    marginLeft: { xs: 0, lg: 10 },
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  inner: {
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
  },
  star: {
    color: "white",
  },
  reviewContanier: {
    paddingX: {
      xs: "28px",
      sm: "38px",
      md: "50px",
      lg: "50px",
    },
    paddingY: "60px",
    width: {
      xs: "75%",
      sm: "400px",
      md: "400px",
      lg: "400px",
    },
    my: "auto",
    backgroundColor: "white",
    borderRadius: 10,
  },
  swiperMobile: {
    height: "100%",
    marginTop: 10,
    display: "flex",
    width: "70%",
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
    color: "white",
    textAlign: {
      xs: "center",
      sm: "center",
      md: "start",
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
        xs: -15,
        sm: -40,
        md: -40,
        lg: -40,
      },
      top: {
        xs: -15,
        sm: -35,
        md: -35,
        lg: -35,
      },
      backgroundImage: {
        xs: `url(${linesMobileWhite.src})`,
        sm: `url(${linesInvertWhite.src})`,
        md: `url(${linesInvertWhite.src})`,
        lg: `url(${linesInvertWhite.src})`,
      },
      height: "35px",
      width: "43px",
      backgroundRepeat: "no-repeat",
    },
  },
  userContanier: {
    display: "flex",
    alignItems: "center",
    marginTop: { xs: "4vh", sm: "4vh", md: "4vh", lg: "4vh", xl: "4vh" },
  },
  reviewText: {
    fontSize: {
      xs: "2vh",
      sm: "2.2vh",
      md: "2.4vh",
      lg: "2.8vh",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "4vh",
      sm: "3.6vh",
      md: "3.2vh",
      lg: "4vh",
    },
    // height: { xs: "100%", sm: "100%", md: "100%", lg: "350px", xl: "350px" },
    // height: "350px",
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
    color: "white",
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
    boxShadow: "1px 15px 34px 0px #38B6FF66",
    color: "#009BF5",
    backgroundColor: "white",

    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "18.4px",
    textAlign: "center",
    width: "249px",
    padding: "18px",
    marginTop: "100px",
    textTransform: "none",
    borderRadius: "10px",
    letterSpacing: "-2%",

    ":hover": {
      boxShadow: "1px 15px 34px 0px #38B6FF66",
      backgroundColor: "white",
      padding: "18px",

      fontSize: "20px",
      fontWeight: 700,
      lineHeight: "18.4px",
      textAlign: "center",
      borderRadius: "10px",
      letterSpacing: "-2%",
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
    borderRadius: "10px",
    letterSpacing: "-2%",

    ":hover": {
      boxShadow: "1px 15px 34px 0px #38B6FF66",
      backgroundColor: "white",
      padding: "18px",

      fontSize: "25px",
      letterSpacing: "-2%",

      fontWeight: 700,
      lineHeight: "18.4px",
      textAlign: "center",
      borderRadius: "10px",
    },
  },
  info: {
    display: {
      xs: "none",
      sm: "none",
      md: "none",
      lg: "flex",
      xl: "flex",
    },
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: "100px",
  },
  numbers: {
    fontSize: "70px",
    fontWeight: 600,
    lineHeight: "65px",
    color: "white",
  },
  numbersDec: {
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: "30px",
    color: "white",
  },
};

const Review: React.FC<RProps> = ({ item }) => {
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: 10,
        boxShadow: "0px -3px 8px 0px #00000026 inset",
        backgroundColor: "rgba(255,255,255,1)",
        width: "70%",
      }}
    >
      <Image
        src={item.imageUrl}
        style={{ width: "40%", maxHeight: "450px", objectFit: "contain" }}
        // style={{ width: "40%", maxHeight: "650px", objectFit: "contain" }}
        width={user.width}
        height={user.height}
        alt="user"
      ></Image>
      <Box sx={styles.reviewContanier}>
        <Box sx={styles.ratingContanier}>
          <StarPurple500OutlinedIcon
            sx={{ height: 25, width: 25, color: "white" }}
          />
          <Typography sx={styles.coma}> {item.rating.toFixed(1)}</Typography>
        </Box>
        <Typography sx={styles.reviewText}>{item.message}</Typography>
        <Box sx={styles.userContanier}>
          <Box>
            <Typography sx={styles.username} variant="h5">
              {" "}
              {item.userName}
            </Typography>
            <Typography sx={styles.userLocation} variant="caption">
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
        <Typography sx={styles.coma}>{item.rating.toFixed(1)}</Typography>
      </Box>
      <Typography sx={styles.reviewText}>{item.message}</Typography>
      <Box sx={styles.userContanier}>
        <Image
          src={item.imageUrl}
          width={50}
          height={50}
          loading="lazy"
          alt="user"
          style={{ borderRadius: 25, marginRight: 10 }}
        ></Image>
        <Box>
          <Typography sx={styles.username} variant="h5">
            {item.userName}
          </Typography>
          <Typography sx={styles.userLocation} variant="caption">
            {" "}
            {item.country}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
