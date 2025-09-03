"use client";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import plan from "../../public/assets/images/static/plan.png";
import phone from "../../public/assets/images/static/phone-call.png";
import logo from "../../public/assets/images/static/logo.png";
import { FooterData } from "../services/footer/footer";
import insta from "../../public/assets/images/svg/Instagram_black.svg";
import facebook from "../../public/assets/images/svg/Facebook_black.svg";
import linkdin from "../../public/assets/images/svg/LinkedIN_black.svg";
import Link from "next/link";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
import PopUpButton from "./pop-up-button";
import FooterLinks from "./footerLinks/FooterLinks";
import { findAboutUsURL } from "@/utils/helper";

interface FooterProps {
  footerData: FooterData | null;
}

const ArFooter: React.FC<FooterProps> = ({ footerData }) => {
  return (
    <footer dir="rtl">
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
                    alt="خطة"
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
              <Grid item lg={5.5}>
                <Typography
                  variant="subtitle1"
                  sx={styles.admissionText}
                  className={leagueSpartan.className}
                >
                  التسجيل مفتوح لدفعة العام القادم
                </Typography>
              </Grid>
              <Grid item lg={3}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={phone.src}
                    width={phone.width}
                    height={phone.height}
                    alt="هاتف"
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
                  text="سجل الآن!"
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
                    justifyContent: "flex-start",
                  }}
                >
                  <Image
                    src={logo.src}
                    width={logo.width / 1.5}
                    height={logo.height / 1.5}
                    style={{ alignSelf: "start" }}
                    alt="شعار تيوشنال"
                  ></Image>
                </Box>
                <Typography
                  sx={styles.desc}
                  className={leagueSpartan.className}
                  variant="body2"
                >
                  تيوشنال هي منصة تعليمية إلكترونية. نقدم دروس تدريس مباشرة
                  للصفوف 4-8، وشهادات IGCSE و GCSE و A-Levels وغيرها لجميع
                  المناهج مثل كامبريدج وبيرسون إدكسل
                </Typography>
                <Box sx={styles.socialBox}>
                  {footerData?.link?.facebook && (
                    <Link
                      target="_blank"
                      href={footerData.link.facebook}
                      rel="noreferrer"
                    >
                      <Image
                        src={facebook.src}
                        style={styles.social}
                        alt="فيسبوك"
                        width={facebook.width}
                        height={facebook.height}
                      ></Image>
                    </Link>
                  )}
                  {footerData?.link?.insta && (
                    <Link
                      target="_blank"
                      href={footerData.link.insta}
                      rel="noreferrer"
                    >
                      <Image
                        src={insta}
                        style={styles.social}
                        alt="انستغرام"
                        width={insta.width}
                        height={insta.height}
                      ></Image>
                    </Link>
                  )}
                  {footerData?.link?.linkdin && (
                    <Link
                      target="_blank"
                      href={footerData.link.linkdin}
                      rel="noreferrer"
                    >
                      <Image
                        src={linkdin}
                        style={styles.social}
                        alt="لينكد إن"
                        width={linkdin.width}
                        height={linkdin.height}
                      ></Image>
                    </Link>
                  )}
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
                  المناهج الدراسية
                </Typography>
                {Array.isArray(footerData?.curriculums) &&
                  footerData.curriculums.length > 0 && (
                    <FooterLinks footerData={footerData.curriculums} exact />
                  )}
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
                  المواد الدراسية
                </Typography>
                {Array.isArray(footerData?.subjects) &&
                  footerData.subjects.length > 0 && (
                    <FooterLinks footerData={footerData.subjects} exact />
                  )}
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
                    احصل على المساعدة
                  </Typography>
                  {Array.isArray(footerData?.getHelp) &&
                    footerData.getHelp.length > 0 && (
                      <FooterLinks
                        footerData={footerData.getHelp}
                        exact={false}
                      />
                    )}
                </Box>
                <Box sx={{ display: { xs: "none", lg: "block" } }}>
                  <Typography
                    variant="subtitle2"
                    className={leagueSpartan.className}
                    sx={[
                      styles.heading,
                      {
                        textAlign: "end",
                        marginTop: "20px",
                      },
                    ]}
                  >
                    من نحن
                  </Typography>
                  {Array.isArray(footerData?.aboutUs) &&
                    footerData.aboutUs.map((item, index) => {
                      if (
                        !item ||
                        typeof item !== "string" ||
                        item.trim() === ""
                      ) {
                        return null;
                      }
                      const url = findAboutUsURL(item);
                      return (
                        <a
                          href={url}
                          style={{
                            textDecoration: "none",
                            textDecorationColor: "none",
                          }}
                          key={index}
                        >
                          <Typography
                            sx={styles.text}
                            variant="body2"
                            className={leagueSpartan.className}
                          >
                            {item}
                          </Typography>
                        </a>
                      );
                    })}
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
                        textAlign: "end",
                        marginTop: "20px",
                      },
                    ]}
                  >
                    من نحن
                  </Typography>
                  {Array.isArray(footerData?.aboutUs) &&
                    footerData.aboutUs.map((item, index) => {
                      if (
                        !item ||
                        typeof item !== "string" ||
                        item.trim() === ""
                      ) {
                        return null;
                      }
                      const url = findAboutUsURL(item);
                      return (
                        <a
                          href={url}
                          style={{ textDecoration: "none" }}
                          key={index}
                        >
                          <Typography
                            sx={styles.text}
                            variant="body2"
                            className={leagueSpartan.className}
                          >
                            {item}
                          </Typography>
                        </a>
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
            جميع الحقوق محفوظة ©2025 تيوشنال
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default ArFooter;

const styles = {
  background: {
    background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.7),#37B6FF)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingY: { xs: "40px", md: "100px" },
    position: "relative",
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
    marginRight: "10px", // Use marginRight for RTL
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
    color: "white",
    marginX: "10px",
  },
  contactButton: {
    boxShadow: "1px 15px 34px 0px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",
    borderRadius: "10px",
    letterSpacing: "-2%",
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
    fontWeight: 700,
    marginBottom: "15px",
    marginTop: "12px",
  },
  text: {
    lineHeight: {
      xs: "35px",
      sm: "40px",
      md: "40px",
      lg: "45px",
    },
    color: "black",
  },
  rights: {
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
    left: 60, // Switch to left for RTL
    backgroundColor: "#37B6FF",
    zIndex: -1,
  },
  leftCircle: {
    display: "flex",
    borderRadius: "50%",
    position: "absolute",
    bottom: 0,
    right: -230, // Switch to right for RTL
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
    marginLeft: "20px", // Use marginLeft for RTL
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
