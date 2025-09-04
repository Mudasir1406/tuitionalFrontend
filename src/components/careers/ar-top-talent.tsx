import { Grade } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesmobile from "../../../public/assets/images/static/linesMobile.png";
import careerTalent from "../../../public/assets/images/static/careerTalent.png";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";

const ArTopTalent: React.FC = () => {
  return (
    <Grid container rowSpacing={4} dir="rtl">
      <Grid item xs={12} md={7}>
        <Box
          sx={{
            height: { xs: '80%', md: "75%" },
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            marginTop: {
              xs: "70px",
              sm: "60px",
              md: "60px",
              lg: "60px",
            },
          }}
        >
          <Image
            src={careerTalent.src}
            width={careerTalent.width}
            height={careerTalent.height}
            alt="مواهب مهنية"
            style={{ height: "auto", width: "90%" }}
          ></Image>
        </Box>
      </Grid>
      <Grid item xs={12} md={5}>
        <Box>
          <Typography
            sx={styles.heading}
            component={"h3"}
            variant="h2"
            className={leagueSpartan.className}
          >
            لماذا تختار أفضل المواهب <br />
            <Typography
              sx={styles.expertText}
              component={"span"}
              variant="h2"
              className={leagueSpartan.className}
            >
              تيوشنال
            </Typography>
          </Typography>
          <Typography
            sx={styles.desc}
            className={leagueSpartan.className}
            component={"p"}
            variant="body2"
          >
            تيوشنال تساعد الأفراد على تحويل تجاربهم ومعرفتهم إلى منتجات رائعة تمكنهم من الازدهار في الأعمال. نحن نؤمن بأن المعرفة المشتركة لديها القوة لتغيير الحياة، ومن خلال تمكين الناس من مشاركة ما يعرفونه يمكننا بالتأكيد خلق عالم أفضل معاً أكثر إبداعاً ومعرفة.
            <br />
            نحن في مهمة لتمكين المبدعين من تحويل معرفتهم وتعلمهم إلى دخل. نحن نبحث عن أفراد موهوبين لديهم اهتمامات متنوعة لمساعدتنا في تعزيز ما نقوم به بالفعل.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: { xs: "center", md: "right" }, // Changed from left for RTL
              marginTop: "40px",
            }}
          >
            <Button
              variant="contained"
              sx={styles.containedBtn}
              className={leagueSpartan.className}
              component="a"
              href="#careersForm"
            >
              تواصل معنا
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ArTopTalent;

const styles = {
  expertText: {
    color: "#009FFC",
    display: "inline",
    position: "relative",
  },
  heading: {
    color: "#000000",
    textAlign: { xs: "center", sm: "center", md: "right" }, // Changed from left for RTL
    marginTop: {
      xs: "0px",
      sm: "0px",
      md: "95px",
      lg: "105px",
    },
    position: "relative",
    paddingX: {
      xs: "20px",
      sm: "20px",
      md: "20px",
      lg: "20px",
    },
    "::before": {
      content: "''",
      position: "absolute",
      zIndex: 10,
      right: { // Changed from left for RTL
        md: -30,
        lg: -30,
      },
      top: {
        xs: -20,
        sm: -40,
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
      marginBottom: "20px",
    },
  },
  desc: {
    paddingX: {
      xs: "20px",
      sm: "20px",
      md: "20px",
      lg: "20px",
    },
    width: { xs: "auto", lg: "68%" },
    color: "rgba(0,0,0,0.77)",
    marginTop: "20px",
    textAlign: {
      xs: "center",
      md: "right", // Changed from left for RTL
    },
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    textAlign: "center",
    width: { xs: "180px", sm: "200px", md: "200px", lg: "200px" },
    padding: "18px",
    textTransform: "none",
    borderRadius: "10px",
    letterSpacing: "-2%",
    textDecoration: "none",
    color: "white",
    scrollBehavior: "smooth",
    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
      padding: "18px",
      letterSpacing: "-2%",
      textAlign: "center",
      borderRadius: "10px",
      textDecoration: "none",
    },
  },
};