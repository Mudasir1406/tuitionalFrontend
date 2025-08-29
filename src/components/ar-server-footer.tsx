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

import dynamic from "next/dynamic";

// Dynamic import for client-side components
const PopUpButton = dynamic(() => import("./pop-up-button"), {
  ssr: false,
});

const ArServerFooter: React.FC = async () => {
  const footerData: FooterData = await getFooterData();
  
  return (
    <footer dir="rtl">
      <Box sx={styles.background}>
        <Box sx={styles.rightCircle} />
        <Box sx={styles.leftCircle} />
        <Box sx={styles.container}>
          <Box sx={styles.contactContainer}>
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
                <Box sx={styles.imageContainer}>
                  <Image
                    src={plan}
                    width={50}
                    height={60}
                    alt="خطة"
                    style={{
                      width: "50px",
                      height: "60px",
                      marginTop: "10px",
                      objectFit: "contain",
                    }}
                    quality={100}
                    loading="lazy"
                  />
                </Box>
              </Grid>
              <Grid item lg={6} sm={12}>
                <Typography
                  sx={styles.mainHeading}
                  className={leagueSpartan.className}
                >
                  احصل على استشارة مجانية من خبرائنا التعليميين
                </Typography>
              </Grid>
              <Grid item lg={1} sm={12}>
                <Box sx={styles.imageContainer}>
                  <Image
                    src={phone}
                    width={50}
                    height={50}
                    alt="هاتف"
                    style={{
                      width: "50px",
                      height: "50px",
                      marginTop: "10px",
                      objectFit: "contain",
                    }}
                    quality={100}
                    loading="lazy"
                  />
                </Box>
              </Grid>
              <Grid item lg={3} sm={12}>
                <Box sx={styles.phoneContainer}>
                  <Link href="tel:+97144396296" style={styles.phoneLink}>
                    <Typography
                      sx={styles.phoneNumber}
                      className={leagueSpartan.className}
                    >
                      +971 4 439 6296
                    </Typography>
                  </Link>
                </Box>
              </Grid>
              <Grid item lg={1} sm={12}>
                <Box sx={styles.buttonContainer}>
                  <PopUpButton href="#" text="احجز الآن" />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={styles.divider} />

          <Box sx={styles.mainFooter}>
            <Grid container spacing={4}>
              <Grid item lg={4} md={6} sm={12}>
                <Box sx={styles.logoSection}>
                  <Image
                    src={logo}
                    alt="تيوشنال"
                    width={200}
                    height={40}
                    style={{
                      width: "200px",
                      height: "40px",
                      objectFit: "contain",
                    }}
                    quality={100}
                    loading="lazy"
                  />
                  <Typography
                    sx={styles.description}
                    className={leagueSpartan.className}
                  >
                    منصة تعليمية رائدة تقدم دروساً خصوصية عالية الجودة للطلاب في جميع أنحاء منطقة الخليج
                  </Typography>
                  <Box sx={styles.socialMedia}>
                    <Link href="https://www.instagram.com/tuitionaledu/" target="_blank" rel="noopener noreferrer">
                      <Image
                        src={insta}
                        alt="إنستغرام"
                        width={30}
                        height={30}
                        loading="lazy"
                      />
                    </Link>
                    <Link href="https://www.facebook.com/tuitionaledu" target="_blank" rel="noopener noreferrer">
                      <Image
                        src={facebook}
                        alt="فيسبوك"
                        width={30}
                        height={30}
                        loading="lazy"
                      />
                    </Link>
                    <Link href="https://www.linkedin.com/company/tuitional/" target="_blank" rel="noopener noreferrer">
                      <Image
                        src={linkdin}
                        alt="لينكدإن"
                        width={30}
                        height={30}
                        loading="lazy"
                      />
                    </Link>
                  </Box>
                </Box>
              </Grid>

              <Grid item lg={2} md={3} sm={6}>
                <Typography
                  sx={styles.footerHeading}
                  className={leagueSpartan.className}
                >
                  روابط سريعة
                </Typography>
                <Box sx={styles.linksList}>
                  <Link href="/ar" style={styles.footerLink}>
                    <Typography sx={styles.linkText}>الرئيسية</Typography>
                  </Link>
                  <Link href="/ar/about" style={styles.footerLink}>
                    <Typography sx={styles.linkText}>من نحن</Typography>
                  </Link>
                  <Link href="/ar/testimonials" style={styles.footerLink}>
                    <Typography sx={styles.linkText}>آراء الطلاب</Typography>
                  </Link>
                  <Link href="/ar/contact" style={styles.footerLink}>
                    <Typography sx={styles.linkText}>اتصل بنا</Typography>
                  </Link>
                </Box>
              </Grid>

              <Grid item lg={3} md={3} sm={6}>
                <Typography
                  sx={styles.footerHeading}
                  className={leagueSpartan.className}
                >
                  المناهج
                </Typography>
                <Box sx={styles.linksList}>
                  {footerData?.curriculums?.map((item: any, index: number) => (
                    <Link href={`/ar/online/${item.slug}`} key={index} style={styles.footerLink}>
                      <Typography sx={styles.linkText}>
                        {item.name}
                      </Typography>
                    </Link>
                  ))}
                </Box>
              </Grid>

              <Grid item lg={3} md={12} sm={12}>
                <Typography
                  sx={styles.footerHeading}
                  className={leagueSpartan.className}
                >
                  معلومات الاتصال
                </Typography>
                <Box sx={styles.contactInfo}>
                  <Typography sx={styles.contactText}>
                    📧 info@tuitionaledu.com
                  </Typography>
                  <Typography sx={styles.contactText}>
                    📞 +971 4 439 6296
                  </Typography>
                  <Typography sx={styles.contactText}>
                    📍 دبي، الإمارات العربية المتحدة
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={styles.divider} />

          <Box sx={styles.copyright}>
            <Typography
              sx={styles.copyrightText}
              className={leagueSpartan.className}
            >
              © 2024 تيوشنال. جميع الحقوق محفوظة.
            </Typography>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default ArServerFooter;

const styles = {
  background: {
    backgroundColor: "#f8f9fa",
    position: "relative" as const,
    overflow: "hidden",
    marginTop: "50px",
  },
  rightCircle: {
    position: "absolute" as const,
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    top: "-150px",
    left: "-150px",
    opacity: 0.05,
    zIndex: 0,
  },
  leftCircle: {
    position: "absolute" as const,
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    bottom: "-100px",
    right: "-100px",
    opacity: 0.05,
    zIndex: 0,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    position: "relative" as const,
    zIndex: 1,
  },
  contactContainer: {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "30px 20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    marginBottom: "40px",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainHeading: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#333",
    textAlign: "center" as const,
    "@media (max-width: 768px)": {
      fontSize: "20px",
      marginBottom: "20px",
    },
  },
  phoneContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  phoneLink: {
    textDecoration: "none",
  } as React.CSSProperties,
  phoneNumber: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#1976d2",
    "&:hover": {
      color: "#1565c0",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    margin: "30px 0",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  mainFooter: {
    marginBottom: "30px",
  },
  logoSection: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    gap: "15px",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    lineHeight: 1.6,
    maxWidth: "300px",
  },
  socialMedia: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  footerHeading: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#333",
    marginBottom: "15px",
  },
  linksList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  footerLink: {
    textDecoration: "none",
  } as React.CSSProperties,
  linkText: {
    fontSize: "14px",
    color: "#666",
    "&:hover": {
      color: "#1976d2",
    },
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  contactText: {
    fontSize: "14px",
    color: "#666",
  },
  copyright: {
    textAlign: "center" as const,
    paddingTop: "20px",
  },
  copyrightText: {
    fontSize: "14px",
    color: "#888",
  },
};