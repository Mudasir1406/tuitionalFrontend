"use client";
import { Box, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
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
import { ArrowLeftRounded, ArrowRightRounded } from "@mui/icons-material";
import dynamic from "next/dynamic";

const PopUpButton = dynamic(() => import("../pop-up-button"), {
  ssr: false,
});

type IProps = {
  data: GetStartedData[];
};

const ArGetStarted: React.FunctionComponent<IProps> = ({ data }) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <Box dir="rtl">
      <Typography
        sx={styles.heading}
        variant="h1"
        className={leagueSpartan.className}
        component={"p"}
      >
        ابدأ في{" "}
        <span
          style={{
            color: "#38B6FF",
            fontSize: "inherit",
            fontWeight: "inherit",
          }}
        >
          3
        </span>{" "}
        خطوات سهلة!
      </Typography>
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
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={index}>
              <ArGetStartedBox {...item as any} />
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
          onSwiper={(swiperInstance) => {
            swiperRef.current = swiperInstance;
          }}
          style={{ width: "100%", position: "relative" }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            520: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
          }}
        >
          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <ArGetStartedBox {...item as any} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Box sx={styles.leftDiv}>
          <ArrowLeftRounded
            sx={styles.arrowIcon}
            onClick={() => swiperRef.current?.slidePrev()}
          />
        </Box>
        <Box sx={styles.rightDiv}>
          <ArrowRightRounded
            sx={styles.arrowIcon}
            onClick={() => swiperRef.current?.slideNext()}
          />
        </Box>
      </Box>
    </Box>
  );
};

interface Props {
  heading: string;
  description: string;
  image: string;
  ButtonText: string;
}

const ArGetStartedBox: React.FC<Props> = ({
  heading,
  description,
  image,
  ButtonText,
}) => {
  const theme = useTheme();
  const [isLargeOrAbove, setIsLargeOrAbove] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia(theme.breakpoints.up("lg"));
      setIsLargeOrAbove(mediaQuery.matches);
      
      const handler = (e: MediaQueryListEvent) => setIsLargeOrAbove(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  return (
    <Box sx={styles.contanier}>
      <Box
        sx={{
          height: { xs: 200, sm: 250, md: 280, lg: 300 },
          width: "100%",
          maxWidth: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={image}
          alt={heading}
          width={300}
          height={300}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
      <Typography sx={styles.stepHeading} className={leagueSpartan.className}>
        {heading}
      </Typography>
      <Typography sx={styles.stepDescription} className={leagueSpartan.className}>
        {description}
      </Typography>
      <PopUpButton text={ButtonText} href="popup" sx={styles.containedBtn} />
    </Box>
  );
};

export default ArGetStarted;

const styles = {
  arrowIcon: {
    fontSize: "30px",
    color: "#38B6FF",
    cursor: "pointer",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "50%",
    padding: "5px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  },
  arrowContainer: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  leftDiv: {
    position: "absolute",
    top: "50%",
    right: "10px", // Switch to right for RTL
    transform: "translateY(-50%)",
  },
  rightDiv: {
    position: "absolute",
    top: "50%",
    left: "10px", // Switch to left for RTL
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
    paddingRight: { // Use paddingRight for RTL
      xs: 1,
      sm: 5,
      md: 5,
      lg: 0,
    },
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      right: { // Use right for RTL
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
        sm: "43px",
        md: "43px",
        lg: "43px",
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
    width: {
      xs: "95%",
      sm: "90%",
      md: "85%",
      lg: "100%",
      xl: "380px",
    },
    maxWidth: "380px",
    backgroundColor: "#D7F0FF",
    alignItems: "center",
    padding: "10px 30px",
    borderRadius: "10px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    marginBottom: "30px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  },
  stepHeading: {
    fontSize: {
      xs: "18px",
      sm: "20px",
      md: "22px",
      lg: "24px",
    },
    fontWeight: 700,
    color: "#000000",
    marginTop: "20px",
    marginBottom: "15px",
  },
  stepDescription: {
    fontSize: {
      xs: "14px",
      sm: "15px",
      md: "16px",
      lg: "16px",
    },
    color: "#666666",
    lineHeight: "1.6",
    marginBottom: "20px",
    textAlign: "center",
  },
};