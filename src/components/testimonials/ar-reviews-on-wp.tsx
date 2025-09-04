"use client";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesmobile from "../../../public/assets/images/static/linesMobile.png";
import "swiper/css";
import Waveform from "./wave-form";
import { leagueSpartan } from "@/app/fonts";
import { WP_Reviews_Type } from "@/services/reviews-on-wp/reviews-on-wp";

interface Props {
  reviews: WP_Reviews_Type[];
}

const ArReviewsOnWp = ({ reviews }: Props) => {
  const [showAll, setShowAll] = useState(false);

  const handleLoadMore = () => {
    setShowAll((prev) => !prev);
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 4);

  return (
    <Box sx={styles.background} dir="rtl">
      <Typography
        sx={styles.heading}
        className={leagueSpartan.className}
        component={"h2"}
        variant="h2"
      >
        آراء على واتساب
      </Typography>
      <Grid container sx={styles.gridContanier} rowSpacing={2}>
        {displayedReviews.map((item, index) => (
          <Grid item lg={6} key={index}>
            <Waveform audio={item.audio} image={item.imageUrl} />
          </Grid>
        ))}
      </Grid>
      <Typography className={leagueSpartan.className} variant="body2">
        أكثر من ١٠٠٠٠+ طالب يثقون في صفوف تيوشنال.
      </Typography>
      {!showAll && (
        <Button
          variant="contained"
          sx={styles.containedBtn}
          className={leagueSpartan.className}
          onClick={handleLoadMore}
        >
          تحميل المزيد
        </Button>
      )}
    </Box>
  );
};

export default ArReviewsOnWp;

const styles = {
  containedBtn: {
    letterSpacing: "-2%",
    boxShadow: "1px 15px 34px 0px rgba(0, 0, 0, 0.15)",
    backgroundColor: "white",
    textAlign: "center",
    width: "220px",
    padding: "18px",
    textTransform: "none",
    marginTop: "20px",
    transform: "scale(1)",
    transition: "all ease-out 0.2s",
    borderRadius: "10px",
    ":hover": {
      boxShadow: "1px 15px 34px 0px rgba(0, 0, 0, 0.15)",
      transform: "scale(1.06)",
      letterSpacing: "-2%",
      backgroundColor: "white",
      padding: "18px",
      textAlign: "center",
    },
    color: "rgba(0, 155, 245, 1)",
  },
  background: {
    background: "linear-gradient(to bottom, #D3EFFE, rgba(255, 255, 255, 0.7))",
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
    marginTop: {
      xs: "70px",
      sm: "80px",
      md: "95px",
      lg: "105px",
    },
    position: "relative",
    textAlign: "center",
    paddingX: {
      xs: "0px",
      sm: 0,
      md: 0,
      lg: 0,
    },
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      right: { // Changed from left for RTL
        xs: -10,
        sm: -35,
        md: -35,
        lg: -35,
      },
      top: {
        xs: -20,
        sm: -35,
        md: -35,
        lg: -35,
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
  gridContanier: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: {
      lg: "1260px",
    },
    marginY: "50px",
  },
};