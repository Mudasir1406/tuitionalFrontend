"use client";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useI18n } from "@/context/language-context";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import scholarHat from "../../../public/assets/images/svg/scholarHat.svg";
import book from "../../../public/assets/images/svg/book.svg";
import calendar from "../../../public/assets/images/svg/calendar.svg";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";

type IProps = {
  heading: string;
  dec: string;
  icon: string;
};

const ArWhyChooseTuitional: React.FunctionComponent = () => {
  const theme = useTheme();
  const { t } = useI18n();
  const [isGreaterThanLarge, setIsGreaterThanLarge] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia(theme.breakpoints.up("lg"));
      setIsGreaterThanLarge(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setIsGreaterThanLarge(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <Box dir="rtl">
      <Box sx={styles.headingContanier}>
        <Typography
          sx={styles.mainHeading}
          component={"h2"}
          variant="h2"
          className={leagueSpartan.className}
        >
          لماذا تختار تيوشنال؟
        </Typography>
      </Box>

      <Grid
        container={!isGreaterThanLarge}
        spacing={!isGreaterThanLarge ? 2 : 0}
        sx={styles.gridContainer}
      >
        <Grid item md={12} lg={3} sx={styles.gridItem}>
          <InfoBox
            heading="مدرسون ذوو خبرة"
            dec="لدينا فريق مؤهل وخبير من المدرسين عبر الإنترنت الذين يتفوقون في مجموعة واسعة من المواد. مدرسون من جميع أنحاء العالم يساعدون الطلاب في تعلم موادهم المطلوبة بلغاتهم المفضلة مع التفوق في تعلم موادهم المطلوبة."
            icon="scholarHat"
          />
        </Grid>
        <Grid item md={12} lg={3} sx={styles.gridItem}>
          <InfoBox
            heading="التعلم الفردي"
            dec="جلسات التدريس الفردي الشخصي عبر الإنترنت تساعد الطلاب في التعامل مع صعوبات موادهم وفقًا لاحتياجاتهم التعليمية الفردية ومتطلباتهم وتفضيلاتهم. يهدف مدرسونا إلى توفير جلسات تعليمية مخصصة لتلبية متطلبات كل طالب الأكاديمية."
            icon="book"
          />
        </Grid>
        <Grid item md={12} lg={3} sx={styles.gridItem}>
          <InfoBox
            heading="جداول زمنية مرنة"
            dec="من مجموعة واسعة من الجداول المرنة يمكن للطلاب اختيار أوقاتهم وأيامهم المفضلة لتناسب جداولهم المزدحمة. الجداول المرنة طريقة رائعة لمساعدة الطلاب على التعلم وتثقيف أنفسهم بأفضل الطرق الممكنة."
            icon="calendar"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArWhyChooseTuitional;

const InfoBox: React.FunctionComponent<IProps> = ({ heading, dec, icon }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.7)",
        width: { xs: "100%", sm: "320px", md: "360px", lg: "380px", xl: "420px" },
        height: { xs: "auto", sm: "280px", md: "320px", lg: "400px", xl: "460px" },
        minHeight: { xs: "250px", sm: "280px", md: "320px", lg: "400px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "10px",
        padding: "24px",
        boxShadow: "0px -3px 8px 0px #00000026 inset, 0px 2px 1px 0px #0000000D",
        position: "relative",
        marginX: { sm: "24px" },
        direction: "rtl",
      }}
    >
      <Box sx={styles.icon}>
        <Box
          sx={{
            height: {
              xs: "20px",
              sm: "30px",
              md: "45px",
              lg: "45px",
            },
            width: {
              xs: "20px",
              sm: "30px",
              md: "45px",
              lg: "45px",
            },
          }}
        >
          {icon === "scholarHat" && (
            <Image
              src={scholarHat.src}
              width={scholarHat.width}
              height={scholarHat.height}
              alt="نجاح"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {icon === "book" && (
            <Image
              src={book.src}
              width={book.width}
              height={book.height}
              alt="كتاب"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {icon === "calendar" && (
            <Image
              src={calendar.src}
              width={calendar.width}
              height={calendar.height}
              alt="تقويم"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </Box>
      </Box>
      <Box sx={{ height: "35%" }}>
        <Typography
          sx={styles.heading}
          className={leagueSpartan.className}
          variant="h3"
        >
          {heading}
        </Typography>
        <Typography
          sx={styles.dec}
          className={leagueSpartan.className}
          variant="body2"
        >
          {dec}
        </Typography>
      </Box>
    </Box>
  );
};

const styles = {
  infoBoxContanier: {},
  heading: {
    marginBottom: { xs: "10px", sm: "15px", md: "18px", lg: "22px" },
    textAlign: "center",
    fontSize: { xs: "16px", sm: "18px", md: "20px", lg: "24px", xl: "28px" },
    fontWeight: 600,
    lineHeight: { xs: "20px", sm: "22px", md: "24px", lg: "28px", xl: "32px" },
  },
  dec: {
    textAlign: "center",
    maxWidth: { xs: "100%", sm: "280px", md: "320px", lg: "340px", xl: "380px" },
    color: "rgba(0,0,0,0.77)",
    fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "15px", xl: "16px" },
    lineHeight: { xs: "16px", sm: "17px", md: "18px", lg: "20px", xl: "22px" },
    margin: "auto",
  },
  icon: {
    width: { xs: "45px", sm: "55px", md: "75px", lg: "115px" },
    height: { xs: "45px", sm: "55px", md: "75px", lg: "115px" },
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "60px",
    boxShadow: " 0px -2px 4px 0px #0000005C inset, 0px 4px 12.6px 0px #009BF526",
    marginBottom: { xs: "10px", sm: "20px", md: "30px", lg: "40px" },
    marginTop: { lg: "-80px" },
  },
  mainHeading: {
    display: "flex",
    marginTop: {
      xs: "40px",
      sm: "50px",
      md: "70px",
      lg: "105px",
    },
    marginBottom: "20px",
    position: "relative",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
    "::before": {
      content: "''",
      position: "absolute",
      backgroundImage: {
        xs: `url(${linesMobile.src})`,
        sm: `url(${linesInvert.src})`,
        md: `url(${linesInvert.src})`,
        lg: `url(${linesInvert.src})`,
      },
      height: {
        xs: "19px",
        sm: "35px",
        md: "35px",
        lg: "35px",
      },
      width: {
        xs: "20px",
        sm: "43px",
        md: "43px",
        lg: "43px",
      },
      backgroundRepeat: "no-repeat",
      top: {
        xs: -12,
        sm: -35,
        md: -35,
        lg: -35,
      },
      right: { // Changed from left for RTL
        xs: "11%",
        sm: "-6%",
        md: "-6%",
        lg: "-6%",
      },
    },
  },
  headingContanier: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    background: "transparent",
    marginBottom: { xs: "auto", lg: "24px" },
  },
  gridContainer: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
    columnGap: { lg: "24px", xs: 0 },
    rowGap: { xs: "16px", lg: 0 },
    flexDirection: { lg: "row", md: "column", sm: "column", xs: "column" },
    flexWrap: "wrap",
  },
  gridItem: {
    marginBottom: { xs: "16px", lg: "0" },
    width: { xs: "100%", sm: "100%", md: "90%", lg: "auto" },
    display: "flex",
    justifyContent: "center",
  },
};