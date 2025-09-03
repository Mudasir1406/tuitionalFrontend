"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import offer1 from "../../../public/assets/images/static/offer-img-1.png";
import offer2 from "../../../public/assets/images/static/offer-img-2.png";
import offer3 from "../../../public/assets/images/static/offer-img-3.png";
import { leagueSpartan } from "@/app/fonts";

const ArOffer = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Box
      sx={{
        paddingX: {
          xs: 0,
          sm: 0,
          md: "2vw",
          lg: "5vw",
        },
        direction: "rtl",
      }}
    >
      <Typography
        className={leagueSpartan.className}
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: "600",
          lineHeight: "6vh",
        }}
        component={"h3"}
      >
        ما نقدمه
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
                    تغطية شاملة لمنهج الرياضيات IGCSE
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <Button variant="contained" sx={style.containedBtn}>
                      اعرف المزيد
                    </Button>
                  </Box>
                </Box>
                <Box sx={style.responsiveImageContainer}>
                  <Image
                    src={offer1}
                    alt="pic"
                    style={{
                      width: "auto",
                      height: "100%",
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Grid container spacing={2}>
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
                    تقييمات منتظمة وملاحظات
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <Button
                      variant="contained"
                      sx={style.containedBtn}
                      className={leagueSpartan.className}
                    >
                      اعرف المزيد
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      textAlign: "left",
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
                    الوصول إلى الموارد والمواد التدريبية
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <Button
                      variant="contained"
                      sx={style.containedBtn}
                      className={leagueSpartan.className}
                    >
                      اعرف المزيد
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      textAlign: "left",
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
              flexDirection: { xs: "column-reverse", md: "column" },
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
                    تقييمات منتظمة وملاحظات
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <Button
                      variant="contained"
                      sx={style.containedBtn}
                      className={leagueSpartan.className}
                    >
                      اعرف المزيد
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      textAlign: "left",
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
                    الوصول إلى الموارد والمواد التدريبية
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <Button
                      variant="contained"
                      sx={style.containedBtn}
                      className={leagueSpartan.className}
                    >
                      اعرف المزيد
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      textAlign: "left",
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
                    تغطية شاملة لمنهج الرياضيات IGCSE
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <Button
                      variant="contained"
                      sx={style.containedBtn}
                      className={leagueSpartan.className}
                    >
                      اعرف المزيد
                    </Button>
                  </Box>
                </Box>
                <Box sx={style.responsiveImageContainer}>
                  <Image
                    src={offer1}
                    alt="pic"
                    style={{
                      width: "auto",
                      height: "100%",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ArOffer;

const style = {
  coveragetext: {
    color: "#2D2D2D",
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
    textAlign: "right" as const,
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
    textAlign: "right" as const,
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
      xs: "50%",
      sm: "30%",
      md: "30%",
      lg: "14vh",
    },
    transition: "all .5s ease-in-out",

    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
      transform: "scale(1.05)",
    },
  },

  responsiveImageContainer: {
    height: "25vh",
    "@media (max-width: 960px)": {
      height: "20vh",
    },
    "@media (max-width: 600px)": {
      height: "15vh",
    },
    "@media (max-width: 400px)": {
      height: "auto",
    },
  },
};