import { Box, Typography } from "@mui/material";
import React from "react";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesmobile from "../../../public/assets/images/static/linesMobile.png";
import "swiper/css";
import {
  Trusted_Schools_Type,
  getTrustedSchools,
} from "../../services/trusted-schools/trusted-schools";
import { leagueSpartan } from "@/app/fonts";
import Image, { StaticImageData } from "next/image";

const ArTrusted: React.FC = async () => {
  const trustedSchools: Trusted_Schools_Type = await getTrustedSchools();

  return (
    <Box sx={styles.background}>
      <Typography
        sx={styles.heading}
        className={leagueSpartan.className}
        component={"h2"}
        variant="h2"
      >
        موثوق من قبل طلاب أفضل المدارس
      </Typography>
      <Box sx={styles.slideContainer}>
        <Box sx={styles.slideContent}>
          {trustedSchools?.images.map((item, index) => (
            <Box
              sx={{ background: "transparent", marginLeft: "10px" }}
              key={index}
            >
              <Box key={index} sx={styles.imageBox}>
                <ImageBox imageSource={item} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const ImageBox = ({ imageSource }: { imageSource: any }) => {
  // Handle both string URLs from Firebase and StaticImageData
  // const src = typeof imageSource === 'string' ? imageSource : imageSource?.src;

  // // Add error handling for invalid sources
  // if (!src) {
  //   console.warn('Invalid image source:', imageSource);
  //   return null;
  // }

  return (
    <Box sx={styles.imageBox} className="schoolsBox">
      <Image
        src={imageSource}
        width={80}
        height={80}
        alt=""
        // style={{ objectFit: "cover", width: "6vw", height: "auto" }}
      />
    </Box>
  );
};

export default ArTrusted;

const styles = {
  background: {
    background: "linear-gradient(to bottom, #D3EFFE, rgba(255, 255, 255, 0.7))",
    height: "100%",
    zIndex: -2,
    marginTop: {
      xs: "0vh",
      sm: "0vh", 
      md: "0vh",
      lg: "0vh",
    },
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100vw",
    justifyContent: "center",
    position: "relative",
  },
  slideContainer: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    paddingBottom: {
      xs: "3vh",
      sm: "3vh",
      md: "4vh",
      lg: "7vh",
    },
  },
  heading: {
    color: "#000000",
    marginTop: {
      xs: "7vh",
      sm: "8vh",
      md: "9.5vh",
      lg: "10.5vh",
    },
    position: "relative",
    textAlign: "center",
    paddingX: {
      xs: "2vw",
      sm: "0vw",
      md: "0vw",
      lg: "0vw",
    },
    direction: "rtl",
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      right: {
        xs: "2vw",
        sm: "-3.5vw",
        md: "-3vw",
        lg: "-35px",
      },
      top: {
        xs: "-2vh",
        sm: "-3vh",
        md: "-3vh",
        lg: "-40px",
      },
      backgroundImage: {
        xs: `url(${linesmobile.src})`,
        sm: `url(${linesInvert.src})`,
        md: `url(${linesInvert.src})`,
        lg: `url(${linesInvert.src})`,
      },
      height: 100,
      width: 100,
      backgroundRepeat: "no-repeat",
    },
  },
  slideContent: {
    flexDirection: "row",
    display: "flex",
    whiteSpace: "nowrap",
    animation: "slide 20s linear infinite",
    marginTop: "5vh",
  },
  imageBox: {
    height: {
      xs: 107,
      lg: "40vh",
    },
    width: {
      xs: 177,
      lg: 349,
    },
    maxHeight: "190px",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: "10px",
  },
};
