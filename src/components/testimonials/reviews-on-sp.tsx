import { Grade } from "@mui/icons-material";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesmobile from "../../../public/assets/images/static/linesMobile.png";
import girlInCircle from "../../../public/assets/images/static/Girl_in_circle.png";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
const ReviewsOnSp: React.FC = () => {
  return (
    <Grid
      container
      spacing={4}
      sx={{
        background: {
          xs: "linear-gradient(360deg, rgba(211, 239, 255, 0) 0%, #D3EFFF 6.36%, #D3EFFF 44.4%, rgba(211, 239, 255, 0) 100%)",
          lg: "none",
        },
      }}
    >
      <Grid item lg={7}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            marginTop: {
              xs: "70px",
              sm: "60px",
              md: "60px",
              lg: "0px",
            },
          }}
        >
          <Image
            src={girlInCircle.src}
            width={girlInCircle.width}
            height={girlInCircle.height}
            alt="girlInCircle"
            style={{ height: "auto", width: "90%" }}
          ></Image>
        </Box>
      </Grid>
      <Grid item lg={5}>
        <Box
          sx={{
            paddingBottom: "52px",
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
          }}
        >
          <Typography sx={styles.heading} className={leagueSpartan.className}>
            Reviews on Social <br /> Platforms
          </Typography>
          <Typography sx={styles.desc} className={leagueSpartan.className}>
            The teachers at Tuitional are really great. they help a lot of
            students and they have been helping me since past 3 years now. The
            teachers are nice and understanding. My grades are improving.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              //   justifyContent: "center",
              alignItems: "center",
              marginTop: "80px",
              paddingLeft: {
                xs: "50px",
                sm: "50px",
                md: "50px",
                lg: 0,
              },
            }}
          >
            <Typography sx={styles.percent} className={leagueSpartan.className}>
              99%
            </Typography>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ color: "black", marginX: 2 }}
            ></Divider>
            <Typography
              sx={[styles.complete]}
              className={leagueSpartan.className}
            >
              Student&apos;s complete
              <br /> classes successfully.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ReviewsOnSp;

const styles = {
  heading: {
    color: "#000000",

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
    paddingX: {
      xs: "50px",
      sm: "50px",
      md: "50px",
      lg: 0,
    },
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      left: {
        xs: 40,
        sm: 10,
        md: -30,
        lg: -30,
      },
      top: {
        xs: -20,
        sm: 10,
        md: -30,
        lg: -50,
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
  desc: {
    fontSize: {
      xs: "18px",
      sm: "20px",
      md: "25px",
      lg: "25px",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "25px",
      sm: "30px",
      md: "40px",
      lg: "40px",
    },
    width: "60%",
    color: "black",
    paddingLeft: {
      xs: "50px",
      sm: "50px",
      md: "50px",
      lg: 0,
    },
  },
  complete: {
    fontSize: {
      xs: "18px",
      sm: "20px",
      md: "25px",
      lg: "25px",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "25px",
      sm: "30px",
      md: "40px",
      lg: "40px",
    },
    width: "60%",
    color: "black",
  },
  percent: {
    fontSize: {
      xs: "60px",
      sm: "60px",
      md: "60px",
      lg: "85px",
    },
    color: {
      xs: " #38B6FF",
      sm: " #38B6FF",
      md: " #38B6FF",
      lg: "black",
    },
    fontWeight: 700,
    lineHeight: {
      xs: "55px",
      sm: "55px",
      md: "55px",
      lg: "65px",
    },
  },
};
