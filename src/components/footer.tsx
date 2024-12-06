import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import plan from "../../public/assets/images/static/plan.png";
import phone from "../../public/assets/images/static/phone-call.png";
import logo from "../../public/assets/images/static/logo.png";
import { FooterData, getFooterData } from "../services/footer/footer";
import insta from "../../public/assets/images/svg/Instagram_black.svg";
import facebook from "../../public/assets/images/svg/Facebook_black.svg";
import linkdin from "../../public/assets/images/svg/LinkedIN_black.svg";
import Link from "next/link";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
import PopUpButton from "./pop-up-button";
const Footer: React.FC = async () => {
  const footerData: FooterData = await getFooterData();
  return (
    <footer>
      <Box sx={styles.background}>
        <Box sx={styles.rightCircle} />
        <Box sx={styles.leftCircle} />
        <Box sx={styles.contanier}>
          <Box sx={styles.contactContanier}>
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              spacing={2}
            >
              <Grid item lg={1} sm={12}>
                <Box sx={styles.imageContanier}>
                  <Image
                    src={plan.src}
                    width={plan.width}
                    height={plan.height}
                    alt="plan"
                    style={{
                      width: "60px",
                      height: "60px",
                      marginTop: "10px",
                      objectFit: "contain",
                    }}
                    quality={100}
                  ></Image>
                </Box>
              </Grid>
              <Grid item lg={5.5}>
                <Typography
                  variant="subtitle1"
                  sx={styles.admissionText}
                  className={leagueSpartan.className}
                >
                  Admissions are Open for the Next Year Batch
                </Typography>
              </Grid>
              <Grid item lg={3}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={phone.src}
                    width={phone.width}
                    height={phone.height}
                    alt="phone"
                  ></Image>
                  <Typography
                    variant="subtitle1"
                    sx={styles.phoneText}
                    className={leagueSpartan.className}
                  >
                    +971 56 490 0376
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={2.5}>
                <PopUpButton
                  text="Enroll Now!"
                  href="popup"
                  sx={styles.contactButton}
                />
              </Grid>
            </Grid>
          </Box>
          <Grid
            container
            columnSpacing={5}
            sx={{
              marginY: {
                xs: "70px",
                sm: "80px",
                md: "90px",
                lg: "100px",
              },
              display: "flex",
              width: { xs: "100%", sm: "100%" },
              paddingLeft: { xs: 0, md: "5vw" },
              paddingRight: "2vw",
            }}
          >
            <Grid item lg={3} sm={12}>
              <Box sx={styles.gridContent}>
                <Box
                  sx={{
                    width: "100%",
                    display: { xs: "flex", sm: "flex" },

                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={logo.src}
                    width={logo.width}
                    height={logo.height}
                    style={{ alignSelf: "start" }}
                    alt="logo"
                  ></Image>
                </Box>
                <Typography
                  sx={styles.desc}
                  className={leagueSpartan.className}
                  variant="body1"
                >
                  Tuitional is an Online Ed-Tech Platform. We do live tutoring
                  classes for Grades 4-8, IGCSE, GCSE, & A-Levels etc for all
                  boards like Cambridge, Pearson Edexcel
                </Typography>
                <Box sx={styles.socialBox}>
                  <Link
                    target="_blank"
                    href={footerData?.link.facebook}
                    rel="noreferrer"
                  >
                    <Image
                      src={facebook.src}
                      style={styles.social}
                      alt="facebook"
                      width={facebook.width}
                      height={facebook.height}
                    ></Image>
                  </Link>
                  <Link
                    target="_blank"
                    href={footerData?.link.insta}
                    rel="noreferrer"
                  >
                    <Image
                      src={insta}
                      style={styles.social}
                      alt="insta"
                      width={insta.width}
                      height={insta.height}
                    ></Image>
                  </Link>
                  <Link
                    target="_blank"
                    href={footerData?.link.linkdin}
                    rel="noreferrer"
                  >
                    <Image
                      src={linkdin}
                      style={styles.social}
                      alt="linkdin"
                      width={linkdin.width}
                      height={linkdin.height}
                    ></Image>
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={6}>
              <Box sx={styles.gridContent}>
                <Typography
                  sx={styles.heading}
                  variant="subtitle2"
                  className={leagueSpartan.className}
                >
                  Curriculums
                </Typography>
                {footerData?.curriculums.map((item, index) => (
                  <Typography
                    sx={styles.text}
                    variant="body1"
                    key={index}
                    className={leagueSpartan.className}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={6}>
              <Box
                sx={[
                  styles.gridContent,
                  {
                    height: {
                      xs: "100%",
                      sm: "100%",
                      md: "100%",
                      lg: "650px",
                    },
                    flexWrap: "wrap",
                  },
                ]}
              >
                <Typography
                  sx={styles.heading}
                  variant="subtitle2"
                  className={leagueSpartan.className}
                >
                  Subjects
                </Typography>
                {footerData?.subjects.slice(0, 10).map((item, index) => (
                  <Typography
                    sx={styles.text}
                    variant="body1"
                    key={index}
                    className={leagueSpartan.className}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={6}>
              <Box sx={styles.gridContent}>
                <Box>
                  <Typography
                    sx={styles.heading}
                    variant="subtitle2"
                    className={leagueSpartan.className}
                  >
                    Get Help
                  </Typography>

                  {footerData?.getHelp.map((item, index) => (
                    <Typography
                      sx={styles.text}
                      variant="body1"
                      key={index}
                      className={leagueSpartan.className}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
                <Box sx={{ display: { xs: "none", lg: "block" } }}>
                  <Typography
                    variant="subtitle2"
                    className={leagueSpartan.className}
                    sx={[
                      styles.heading,
                      {
                        textAlign: "left",
                        marginTop: "20px",
                      },
                    ]}
                  >
                    About us
                  </Typography>
                  {footerData?.aboutUs.map((item, index) => (
                    <Link
                      href={`/${item.toLowerCase()}`}
                      style={{
                        textDecoration: "none",
                        textDecorationColor: "none",
                      }}
                      key={index}
                    >
                      <Typography
                        sx={styles.text}
                        variant="body1"
                        key={index}
                        className={leagueSpartan.className}
                      >
                        {item}
                      </Typography>
                    </Link>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={6}>
              <Box sx={styles.gridContent}>
                <Box sx={{ display: { xs: "block", lg: "none" } }}>
                  <Typography
                    className={leagueSpartan.className}
                    sx={[
                      styles.heading,
                      {
                        textAlign: "left",
                        marginTop: "20px",
                      },
                    ]}
                  >
                    About us
                  </Typography>
                  {footerData?.aboutUs.map((item, index) => {
                    const url = item.toLowerCase();
                    return (
                      <Link
                        href={`/${url}`}
                        style={{ textDecoration: "none" }}
                        key={index}
                      >
                        <Typography
                          sx={styles.text}
                          variant="body1"
                          className={leagueSpartan.className}
                        >
                          {item}
                        </Typography>
                      </Link>
                    );
                  })}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ color: "black", width: "78%" }}></Divider>
          <Typography
            sx={styles.rights}
            variant="subtitle2"
            className={leagueSpartan.className}
          >
            All Rights Reserved ©2024 Tuitional
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;

const styles = {
  background: {
    background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.7),#37B6FF)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingY: "100px",
    position: "relative",
    // zIndex: -3,
  },
  contanier: {
    display: "flex",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.7)",
    boxShadow:
      "5px -5px 8px 0px rgba(0, 0, 0, 0.15) inset, -6px 2px 8px 0px rgba(0, 0, 0, 0.15) inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    zIndex: 0,
  },
  admissionContanier: {
    display: "flex",
    alignItems: "center",
  },

  imageContanier: {
    maxWidth: "90px",
    maxHeight: "90px",
    minWidth: "75px",
    minHeight: "75px",
    width: "9vh",
    height: "9vh",
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  admissionText: {
    // fontSize: {
    //   xs: "4.5vw",
    //   sm: "4.5vw",
    //   md: "3.5vw",
    //   lg: "2vw",
    // },
    // fontWeight: 700,
    // lineHeight: "32px",
    marginLeft: "10px",
    color: "white",
    textAlign: {
      xs: "center",
      sm: "center",
      md: "start",
    },
  },
  contactContanier: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(56, 182, 255, 1)",
    padding: {
      xs: "10px",
      sm: "20px",
      md: "25px",
      lg: "30px",
    },
    borderRadius: "5px",
    marginTop: "-70px",
    width: { xs: "80%", sm: "80%", md: "85%" },
  },
  phoneText: {
    // fontSize: {
    //   xs: "5vw",
    //   sm: "3vw",
    //   md: "1.5vw",
    //   lg: "1.5vw",
    // },
    // fontWeight: 700,
    // lineHeight: "23px",
    color: "white",
    marginX: "10px",
  },
  contactButton: {
    boxShadow: "1px 15px 34px 0px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",

    fontSize: {
      xs: "4vw",
      sm: "2.1vw",
      md: "2vw",
      lg: "1.4vw",
    },
    borderRadius: "10px",
    letterSpacing: "-2%",
    fontWeight: 700,
    lineHeight: "23px",
    color: "#009BF5",
    textTransform: "none",
    paddingY: {
      xs: "15px",
      sm: "21px",
      md: "22px",
      lg: "22px",
    },
    paddingX: {
      xs: "25px",
      sm: "25px",
      md: "22px",
      lg: "25px",
    },
    ":hover": {
      backgroundColor: "white",
      borderRadius: "10px",
      letterSpacing: "-2%",
      boxShadow: "1px 15px 34px 0px rgba(0, 0, 0, 0.2)",
    },
  },
  desc: {
    // fontSize: {
    //   xs: "17px",
    //   sm: "21px",
    //   md: "22px",
    //   lg: "22px",
    // },
    // fontWeight: 400,
    // lineHeight: "32px",
    marginTop: "40px",
    textAlign: {
      xs: "center",
      sm: "center",
      md: "start",
      lg: "start",
    },
    color: "#000000",
  },
  gridContent: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    // fontSize: {
    //   xs: "22px",
    //   sm: "26px",
    //   md: "28px",
    //   lg: "30px",
    // },
    fontWeight: 700,
    // lineHeight: {
    //   xs: "26px",
    //   sm: "28px",
    //   md: "30px",
    //   lg: "32px",
    // },
    marginBottom: "15px",
    marginTop: "12px",
  },
  text: {
    // fontSize: {
    //   xs: "19px",
    //   sm: "20px",
    //   md: "21px",
    //   lg: "21px",
    // },
    // fontWeight: 400,
    lineHeight: {
      xs: "35px",
      sm: "40px",
      md: "40px",
      lg: "40px",
    },
    color: "black",
  },
  rights: {
    // fontSize: {
    //   xs: "12px",
    //   sm: "20px",
    //   md: "22px",
    //   lg: "25px",
    // },
    // fontWeight: 500,
    // lineHeight: {
    //   xs: "26px",
    //   sm: "28px",
    //   md: "30px",
    //   lg: "32px",
    // },
    marginY: {
      xs: "20px",
      sm: "30px",
      md: "50px",
      lg: "70px",
    },
    textAlign: "center",
  },
  rightCircle: {
    display: "flex",
    width: 135,
    height: 135,
    borderRadius: 70,
    position: "absolute",
    top: 70,
    right: 60,
    backgroundColor: "#37B6FF",
    zIndex: -1,
  },
  leftCircle: {
    display: "flex",
    borderRadius: "50%",
    position: "absolute",
    bottom: 0,
    left: -230,
    border: "100px solid #37B6FF",
    zIndex: -1,
    width: {
      xs: "330px",
      sm: "430px",
      md: "430px",
      lg: "430px",
    },
    height: {
      xs: "330px",
      sm: "430px",
      md: "430px",
      lg: "430px",
    },
    backgroundColor: "transparent",
  },
  social: {
    width: "48px",
    height: "48px",
    marginRight: "20px",
    cursor: "pointer",
    zIndex: 100,
  },
  socialBox: {
    display: { xs: "flex", sm: "flex", md: "flex", lg: "block" },
    marginTop: {
      xs: "40px",
      lg: "70px",
    },
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "80px",
  },
};
