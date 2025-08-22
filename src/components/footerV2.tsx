import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
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
// import { findExactSubjectURL, generateSlug } from "@/utils/helper";
import FooterLinks from "./footerLinks/FooterLinks";
const FooterV2: React.FC = async () => {
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
              <Grid item lg={1} md={1} sm={12} xs={12}>
                <Box
                  sx={{
                    ...styles.imageContanier,
                    margin: { xs: "0 auto", md: "0" },
                  }}
                >
                  <Image
                    src={plan.src}
                    width={plan.width}
                    height={plan.height}
                    alt="plan"
                    style={{
                      width: "50px",
                      height: "60px",
                      marginTop: "10px",
                      objectFit: "contain",
                    }}
                    quality={100}
                  ></Image>
                </Box>
              </Grid>
              <Grid item lg={5.5} md={5.5} sm={12} xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={styles.admissionText}
                  className={leagueSpartan.className}
                >
                  Registered in UAE • Established Since 2020 • Headquarters:
                  Sharjah
                </Typography>
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                    marginTop: { xs: "10px", md: "0" },
                  }}
                >
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
              <Grid item lg={2.5} md={2.5} sm={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-start" },
                    marginTop: { xs: "15px", md: "0" },
                  }}
                >
                  <PopUpButton
                    text="Book a Free Trial"
                    href="popup"
                    sx={styles.contactButton}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Grid
            container
            columnSpacing={5}
            sx={{
              marginY: {
                xs: "30px",
                sm: "40px",
                md: "50px",
                lg: "60px",
              },
              display: "flex",
              width: { xs: "100%", sm: "100%" },
              paddingLeft: { xs: "1rem", md: "5vw" },
              paddingRight: { xs: "1rem", md: "2vw" },
            }}
          >
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box sx={styles.gridContent}>
                <Box
                  sx={{
                    width: "100%",
                    display: { xs: "flex", sm: "flex" },
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Image
                    src={logo.src}
                    width={logo.width / 1.5}
                    height={logo.height / 1.5}
                    style={{ alignSelf: "start" }}
                    alt="logo"
                  ></Image>
                </Box>
                <Typography
                  sx={styles.desc}
                  className={leagueSpartan.className}
                  variant="body2"
                >
                  Tuitional is a UAE-based Online Ed-Tech Platform established
                  in 2020. We provide live tutoring classes for Grades 4-8,
                  IGCSE, GCSE, & A-Levels for Cambridge, Pearson Edexcel boards.
                </Typography>
                <Box sx={styles.credibilityBox}>
                  <Typography
                    variant="body2"
                    className={leagueSpartan.className}
                    sx={styles.credibilityText}
                  >
                    ✓ Trusted by 1000+ Students
                  </Typography>
                  <Typography
                    variant="body2"
                    className={leagueSpartan.className}
                    sx={styles.credibilityText}
                  >
                    ✓ Licensed Educational Provider
                  </Typography>
                  <Typography
                    variant="body2"
                    className={leagueSpartan.className}
                    sx={styles.credibilityText}
                  >
                    ✓ 4.6/5 TrustPilot Rating
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box
                sx={{
                  ...styles.gridContent,
                  alignItems: { xs: "center", md: "flex-start" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Typography
                  sx={{
                    ...styles.heading,
                    textAlign: { xs: "center", md: "left" },
                  }}
                  variant="subtitle2"
                  className={leagueSpartan.className}
                >
                  Contact Info
                </Typography>
                <Typography
                  sx={{
                    ...styles.text,
                    textAlign: { xs: "center", md: "left" },
                  }}
                  variant="body2"
                  className={leagueSpartan.className}
                >
                  📍 Sharjah, UAE
                </Typography>
                <Typography
                  sx={{
                    ...styles.text,
                    textAlign: { xs: "center", md: "left" },
                  }}
                  variant="body2"
                  className={leagueSpartan.className}
                >
                  📞 +971 56 490 0376
                </Typography>
                <Typography
                  sx={{
                    ...styles.text,
                    textAlign: { xs: "center", md: "left" },
                  }}
                  variant="body2"
                  className={leagueSpartan.className}
                >
                  ✉️ info@tuitional.com
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ color: "black", width: "78%" }}></Divider>
          <Typography
            sx={styles.rights}
            variant="subtitle2"
            className={leagueSpartan.className}
          >
            © 2024 Tuitional
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default FooterV2;

const styles = {
  background: {
    background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.7),#37B6FF)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingY: { xs: "30px", md: "60px" },
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

    // fontSize: {
    //   xs: "4vw",
    //   sm: "2.1vw",
    //   md: "2vw",
    //   lg: "1.4vw",
    // },
    borderRadius: "10px",
    letterSpacing: "-2%",
    // fontWeight: 700,
    lineHeight: "23px",
    color: "#009BF5",
    textTransform: "none",
    paddingY: {
      xs: "1.5vh",
      sm: "1.5vh",
      md: "2vh",
      lg: "2vh",
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
      lg: "45px",
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
      xs: "15px",
      sm: "20px",
      md: "30px",
      lg: "40px",
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
  credibilityBox: {
    textAlign: { xs: "center", md: "left" },
    marginTop: {
      xs: "20px",
      lg: "30px",
    },
    marginBottom: "20px",
  },
  credibilityText: {
    color: "#22C55E",
    fontWeight: 600,
    marginBottom: "8px",
    fontSize: "0.95rem",
  },
  secondaryButton: {
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    backgroundColor: "#22C55E",
    color: "white",
    borderRadius: "8px",
    paddingY: "12px",
    paddingX: "20px",
    fontSize: "0.9rem",
    fontWeight: 600,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#16A34A",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    },
  },
};
