"use client";
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
import { useI18n } from "@/context/language-context";
import FooterLinks from "./footerLinks/FooterLinks";
import { findAboutUsURL } from "@/utils/helper";

interface FooterProps {
  footerData: FooterData | null;
}

const Footer: React.FC<FooterProps> = ({ footerData }) => {
  const { t, locale } = useI18n();
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
              <Grid
                item
                lg={1}
                sm={12}
                display={"flex"}
                justifyContent={"center"}
              >
                <Box sx={styles.imageContanier}>
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
              <Grid item lg={5.5}>
                <Typography variant="h2" sx={styles.admissionText}>
                  {t("footer.admission_text")}
                </Typography>
              </Grid>
              <Grid item lg={3.5}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={phone.src}
                    width={phone.width}
                    height={phone.height}
                    alt="phone"
                  ></Image>
                  <Typography variant="h2" sx={styles.phoneText}>
                    +971 56 490 0376
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={2}>
                <PopUpButton
                  text={t("footer.enroll_now")}
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
              marginTop: {
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
                    justifyContent: { xs: "center", lg: "flex-start" },
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
                <Typography sx={styles.desc} variant="body2">
                  {t("footer.description")}
                </Typography>
                <Box sx={styles.socialBox}>
                  <Box sx={styles.iconsOnly}>
                    {footerData?.link?.facebook && (
                      <Link
                        target="_blank"
                        href={footerData.link.facebook}
                        rel="noreferrer"
                      >
                        <Image
                          src={
                            "https://img.icons8.com/?size=40&id=uLWV5A9vXIPu&format=png&color=000000"
                          }
                          style={styles.social}
                          alt="facebook"
                          width={40}
                          height={40}
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
                          src={
                            "https://img.icons8.com/?size=40&id=BrU2BBoRXiWq&format=png&color=000000"
                          }
                          style={styles.social}
                          alt="insta"
                          width={40}
                          height={40}
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
                          src={
                            "https://img.icons8.com/?size=40&id=MR3dZdlA53te&format=png&color=000000"
                          }
                          style={styles.social}
                          alt="linkdin"
                          width={40}
                          height={40}
                        ></Image>
                      </Link>
                    )}
                  </Box>
                  <Box sx={styles.contactInfo}>
                    <Link
                      href="mailto:hello@tuitionaledu.com"
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src="https://img.icons8.com/?size=100&id=GoQbcSSHazaK&format=png&color=000000"
                        alt="email"
                        width={20}
                        height={20}
                        style={{ marginRight: "10px" }}
                      />
                      <Typography sx={styles.contactText} variant="body2">
                        hello@tuitionaledu.com
                      </Typography>
                    </Link>
                    <Link
                      href="tel:+971564900376"
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src="https://img.icons8.com/?size=100&id=3kO3tw1rKmYw&format=png&color=000000"
                        alt="phone"
                        width={20}
                        height={20}
                        style={{ marginRight: "10px" }}
                      />
                      <Typography sx={styles.contactText} variant="body2">
                        +971 56 490 0376
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={6}>
              <Box sx={styles.gridContent}>
                <Typography sx={styles.heading} variant="subtitle2">
                  {t("footer.sections.curriculums")}
                </Typography>

                {Array.isArray(footerData?.curriculums) &&
                  footerData.curriculums.length > 0 && (
                    <FooterLinks footerData={footerData.curriculums} exact />
                  )}
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={6}>
              <Box sx={[styles.gridContent]}>
                <Typography sx={styles.heading} variant="subtitle2">
                  {t("footer.sections.subjects")}
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
                  <Typography sx={styles.heading} variant="subtitle2">
                    {t("footer.sections.get_help")}
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
                    sx={[
                      styles.heading,
                      {
                        textAlign: "start",
                        marginTop: "20px",
                      },
                    ]}
                  >
                    {t("footer.sections.about_us")}
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
                      let url = findAboutUsURL(item);
                      // Add /ar prefix for Arabic locale if not already present
                      if (
                        locale === "ar" &&
                        url !== "/" &&
                        !url.startsWith("/ar")
                      ) {
                        url = `/ar${url}`;
                      }
                      return (
                        <Link href={url} key={index}>
                          <Typography sx={styles.text} variant="body2">
                            {item}
                          </Typography>
                        </Link>
                      );
                    })}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={6}>
              <Box sx={styles.gridContent}>
                <Box sx={{ display: { xs: "block", lg: "none" } }}>
                  <Typography
                    sx={[
                      styles.heading,
                      {
                        textAlign: "start",
                        marginTop: "20px",
                      },
                    ]}
                  >
                    {t("footer.sections.about_us")}
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
                      let url = findAboutUsURL(item);
                      // Add /ar prefix for Arabic locale if not already present
                      if (
                        locale === "ar" &&
                        url !== "/" &&
                        !url.startsWith("/ar")
                      ) {
                        url = `/ar${url}`;
                      }
                      return (
                        <Link href={url} key={index}>
                          <Typography sx={styles.text} variant="body2">
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
          <Typography sx={styles.rights} variant="subtitle2">
            {t("footer.copyright")}
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
    paddingY: { xs: "40px", md: "100px" },
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
    width: "100%",
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
    textTransform: "capitalize",
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
    width: "40px",
    height: "40px",
    marginRight: "20px",
    cursor: "pointer",
    zIndex: 100,
  },
  socialBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: {
      xs: "40px",
      lg: "20px",
    },
    alignItems: { xs: "center", lg: "flex-start" },
    justifyContent: "center",
    marginBottom: "80px",
  },
  iconsOnly: {
    display: "flex",
    alignItems: "center",
    justifyContent: { xs: "center", lg: "flex-start" },
    marginBottom: "15px",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: { xs: "center", lg: "flex-start" },
    gap: "5px",
  },
  contactText: {
    color: "black",
    fontWeight: 500,
    fontSize: "14px",
    ":hover": {
      color: "#37B6FF",
    },
  },
};
