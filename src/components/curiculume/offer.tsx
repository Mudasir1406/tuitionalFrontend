"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import offer1 from "../../../public/assets/images/static/offer-img-1.png";
import offer2 from "../../../public/assets/images/static/offer-img-2.png";
import offer3 from "../../../public/assets/images/static/offer-img-3.png";
import { leagueSpartan } from "@/app/fonts";
const Offer = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensures that the component is only rendered on the client
    setIsMounted(true);
  }, []);

  // Prevent server-client mismatches by only rendering after mounting
  if (!isMounted) {
    return null;
  }

  return (
    <Box
      sx={{
        // paddingX: "5vw",
        paddingX: {
          xs: 0,
          sm: 0,
          md: "2vw",
          lg: "5vw",
        },
      }}
    >
      <Typography
        className={leagueSpartan.className}
        variant="h1"
        sx={{
          // fontSize: {
          //   xs: "4vh",
          //   sm: "5vh",
          //   md: "7vh",
          //   lg: "6vh",
          // },

          textAlign: "center",
          fontWeight: "600",
          lineHeight: "6vh",
        }}
        component={"h1"}
      >
        What We Offer
      </Typography>

      <Box
        sx={{
          marginX: {
            xs: "1.5vh",
            sm: "1.5vh",
            md: "2.5vh",
            lg: "0",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box
              sx={{
                background: "#9EDCFF",
                borderRadius: "2vh",
                marginY: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box>
                  <Typography
                    sx={style.coveragetext}
                    variant="subtitle2"
                    className={leagueSpartan.className}
                  >
                    Comprehensive coverage of IGCSE Maths syllabus
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "left" }}>
                    <Button variant="contained" sx={style.containedBtn}>
                      Learn More
                    </Button>
                  </Box>
                </Box>
                <Typography
                  sx={style.coverageImg}
                  className={leagueSpartan.className}
                >
                  <Box sx={style.responsiveImageContainer}>
                    <Image
                      src={offer1}
                      alt="pic"
                      style={{
                        width: "auto",
                        height: "100%",
                      }}
                      // layout="responsive"
                      // objectFit="cover"
                    />
                  </Box>
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2}>
              {/* Column 1 */}
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Box
                  sx={{
                    background: "#9EDCFF",
                    borderRadius: "2vh",
                  }}
                >
                  <Typography
                    sx={style.regulartxt}
                    variant="subtitle2"
                    className={leagueSpartan.className}
                  >
                    Regular assessments and feedback
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "left" }}>
                    <Button
                      variant="contained"
                      sx={style.containedBtn}
                      className={leagueSpartan.className}
                    >
                      Learn More
                    </Button>
                  </Box>
                  {/* <Box sx={{ textAlign: "right" }}>
                    <Image
                      src={offer2}
                      alt="pic"
                      style={{
                        width: "auto",
                        height: "auto",
                        objectFit: "cover",
                        // height: "25vh",
                      }}
                    />
                  </Box> */}
                  <Box
                    sx={{
                      textAlign: "right",
                      width: "100%",
                      height: { xs: "15vh", sm: "20vh", md: "25vh" },
                      overflow: "hidden",
                      marginTop: "-40px",
                    }}
                  >
                    <Image
                      src={offer2}
                      alt="pic"
                      style={{
                        width: "auto",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Box
                  sx={{
                    background: "#9EDCFF",
                    borderRadius: "2vh",
                  }}
                >
                  <Typography
                    sx={style.regulartxt}
                    variant="subtitle2"
                    className={leagueSpartan.className}
                  >
                    Access to Resources And Practice Materials
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "left" }}>
                    <Button
                      variant="contained"
                      sx={style.containedBtn}
                      className={leagueSpartan.className}
                    >
                      Learn More
                    </Button>
                  </Box>
                  {/* <Box sx={{ textAlign: "right" }}>
                    <Image
                      src={offer3}
                      alt="pic"
                      style={{
                        width: "auto",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </Box> */}
                  <Box
                    sx={{
                      textAlign: "right",
                      width: "100%",
                      height: { xs: "15vh", sm: "20vh", md: "25vh" },
                      overflow: "hidden",
                      marginTop: "-40px",
                    }}
                  >
                    <Image
                      src={offer3}
                      alt="pic"
                      style={{
                        width: "auto",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "column" }, // reverse column on smaller screens
            }}
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Box
                  sx={{
                    background: "#9EDCFF",
                    borderRadius: "2vh",
                    marginY: "16px",
                  }}
                >
                  <Typography
                    sx={style.regulartxt}
                    variant="subtitle2"
                    className={leagueSpartan.className}
                  >
                    Regular assessments and feedback
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "left" }}>
                    <Button
                      variant="contained"
                      sx={style.containedBtn}
                      className={leagueSpartan.className}
                    >
                      Learn More
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      textAlign: "right",
                      width: "100%",
                      height: { xs: "15vh", sm: "20vh", md: "25vh" },
                      overflow: "hidden",
                      marginTop: "-40px",
                    }}
                  >
                    <Image
                      src={offer2}
                      alt="pic"
                      style={{
                        width: "auto",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Box
                  sx={{
                    background: "#9EDCFF",
                    borderRadius: "2vh",
                    marginY: "16px",
                  }}
                >
                  <Typography
                    sx={style.regulartxt}
                    variant="subtitle2"
                    className={leagueSpartan.className}
                  >
                    Access to Resources And Practice Materials
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "left" }}>
                    <Button
                      variant="contained"
                      sx={style.containedBtn}
                      className={leagueSpartan.className}
                    >
                      Learn More
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      textAlign: "right",
                      width: "100%",
                      height: { xs: "15vh", sm: "20vh", md: "25vh" },
                      overflow: "hidden",
                      marginTop: "-40px",
                    }}
                  >
                    <Image
                      src={offer3}
                      alt="pic"
                      style={{
                        width: "auto",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                background: "#9EDCFF",
                borderRadius: "2vh",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box>
                  <Typography
                    sx={style.coveragetext}
                    variant="subtitle2"
                    className={leagueSpartan.className}
                  >
                    Comprehensive coverage of IGCSE Maths syllabus
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "left" }}>
                    <Button
                      variant="contained"
                      sx={style.containedBtn}
                      className={leagueSpartan.className}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Box>
                <Typography
                  sx={style.coverageImg}
                  className={leagueSpartan.className}
                >
                  <Box sx={style.responsiveImageContainer}>
                    <Image
                      src={offer1}
                      alt="pic"
                      style={{
                        width: "auto",
                        height: "100%",
                      }}
                      // layout="responsive"
                      // objectFit="cover"
                    />
                  </Box>
                  {/* <Image
                    src={offer1}
                    alt="pic"
                    style={{
                      width: "auto",
                      height: "30vh",
                    }}
                  /> */}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Offer;

const style = {
  coveragetext: {
    color: "#2D2D2D",
    // fontWeight: 600,
    // fontSize: {
    //   xs: "1.9vh",
    //   sm: "2.5vh",
    //   lg: "2.5vh",
    // },
    width: {
      xs: "100%",
      sm: "70%",
      lg: "70%",
    },
    paddingX: {
      xs: "3vh",
      sm: "4vh",
      lg: "4vh",
    },
    paddingTop: {
      xs: "3vh",
      sm: "4vh",
      lg: "4vh",
    },
  },
  coverageImg: {
    width: {
      xs: "50%",
      sm: "50%",
      lg: "40%",
    },
  },
  regulartxt: {
    color: "#2D2D2D",
    width: {
      xs: "80%",
      sm: "65%",
      lg: "70%",
    },
    // lineHeight: {
    //   xs: 1.1,
    //   sm: 1.1,
    //   lg: 1.5,
    // },
    paddingX: {
      xs: "1.5vh",
      sm: "1.5vh",
      lg: "3vh",
    },
    paddingTop: {
      xs: "1.5vh",
      sm: "1.5vh",
      lg: "4vh",
    },
    // fontWeight: 600,
    // fontSize: {
    //   xs: "2vh",
    //   lg: "2.5vh",
    // },
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontSize: "1.5vh",
    fontWeight: 700,
    padding: "1vh 0",
    margin: { xs: "16px", sm: "16px", md: "2vh 3vh", lg: "2vh 3vh" },
    textTransform: "none",
    borderRadius: "10px",
    width: {
      xs: "50%", // Full width on mobile
      sm: "30%",
      md: "30%",
      lg: "14vh", // Auto width on larger screens
    },
    transition: "all .5s ease-in-out",

    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
      transform: "scale(1.05)",
    },
  },

  responsiveImageContainer: {
    height: "25vh", // Default for large screens
    "@media (max-width: 960px)": {
      height: "20vh", // For medium screens
    },
    "@media (max-width: 600px)": {
      height: "15vh", // For small screens
    },
    "@media (max-width: 400px)": {
      height: "10vh", // For extra-small screens
    },
  },
};
