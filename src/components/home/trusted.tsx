"use client";

import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesmobile from "../../../public/assets/images/static/linesMobile.png";
import "swiper/css";
import {
  Trusted_Schools_Type,
  getTrustedSchools,
} from "../../services/trusted-schools/trusted-schools";
import { leagueSpartan } from "@/app/fonts";
import Image, { StaticImageData } from "next/image";

const Trusted: React.FC = () => {
  const [trustedSchools, setTrustedSchools] = useState<Trusted_Schools_Type>();
  useEffect(() => {
    getTrustedSchools().then((data) => setTrustedSchools(data));
  }, []);
  return (
    <Box sx={styles.background}>
      <Typography sx={styles.heading} className={leagueSpartan.className}>
        Trusted By Students At Top Schools
      </Typography>
      <Box sx={styles.slideContainer}>
        <Box sx={styles.slideContent}>
          {trustedSchools?.images.map((item, index) => (
            <Box
              sx={{ background: "transparent", marginLeft: "11px" }}
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

export default Trusted;

type Props = {
  imageSource: StaticImageData;
};

const ImageBox: React.FC<Props> = ({ imageSource }) => {
  return (
    <Box sx={styles.imageBox} className="schoolsBox">
      <Image
        src={imageSource.src}
        width={imageSource.width}
        height={imageSource.height}
        alt=""
        style={{ objectFit: "cover", width: 100, height: "auto" }}
      />
    </Box>
  );
};

const styles = {
  slideContainer: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
  },
  slideContent: {
    display: "flex",
    whiteSpace: "nowrap",
    animation: "slide 20s linear infinite",
    marginTop: "50px",
  },
  background: {
    background: "linear-gradient(to bottom, #D3EFFE, rgba(255, 255, 255, 0.7))",
    // position: "relative",
    height: "100%",
    zIndex: -2,
    marginTop: {
      xs: "0px",
      sm: "0px",
      md: "0px",
      lg: "0px",
    },
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100vw",
    justifyContent: "center",
  },
  heading: {
    color: "#000000",
    fontFamily: "League Spartan",
    fontSize: {
      xs: "35px",
      sm: "40px",
      md: "55px",
      lg: "55px",
    },
    fontWeight: 700,
    lineHeight: {
      xs: "45px",
      sm: "50px",
      md: "65px",
      lg: "65px",
    },
    marginTop: {
      xs: "70px",
      sm: "80px",
      md: "95px",
      lg: "105px",
    },
    position: "relative",
    textAlign: "center",
    paddingX: {
      xs: "20px",
      sm: 0,
      md: 0,
      lg: 0,
    },
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      left: {
        xs: 20,
        sm: -35,
        md: -30,
        lg: -30,
      },
      top: {
        xs: -20,
        sm: -30,
        md: -30,
        lg: -30,
      },
      backgroundImage: {
        xs: `url(${linesmobile.src})`,
        sm: `url(${linesInvert.src})`,
        md: `url(${linesInvert.src})`,
        lg: `url(${linesInvert.src})`,
      },
      height: "35px",
      width: "43px",
      backgroundRepeat: "no-repeat",
    },
  },
  scroller: {
    flexDirection: "row",
    display: "flex",
  },
  imageBox: {
    height: 151,
    width: 329,
    // margin: 1,
    // padding: 1,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 3,
    // boxShadow: "0px -3px 8px 0px #00000026 inset 0px 2px 1px 0px #0000000D",
  },
};
