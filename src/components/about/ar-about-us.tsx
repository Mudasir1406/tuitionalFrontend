"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useI18n } from "@/context/language-context";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import studentsImg from "../../../public/assets/images/static/about-students.webp";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";
import CircleIcon from "@mui/icons-material/Circle";

const renderValue = (type: string, t: (key: string) => string) => {
  const missionContent = {
    title: "رحلات التعلم الملهمة",
    paragraph: `تهدف تيوشنال إلى توفير تعليم عالي الجودة للطلاب في جميع أنحاء الخليج، مما يمكّن مستقبلهم من خلال تقنيات التدريس المبتكرة والتعليم المخصص عبر الإنترنت عالي الجودة وسهل الوصول الذي يرفع ثقة الطالب ونموه الأكاديمي. مهمتنا هي توفير بيئة أكاديمية شاملة وتفاعلية تمكن الطلاب من الاستكشاف والازدهار والتفوق في دراستهم.`,
    points: [
      {
        title: "التوجيه الأكاديمي",
        description: "إنشاء منصة قوية للطلاب للاستفادة من التوجيه الأكاديمي المتخصص."
      },
      {
        title: "التميز الأكاديمي", 
        description: "ضمان المعايير العالية والنجاح لكل طالب."
      },
      {
        title: "التعليم الجيد الميسر",
        description: "توفير تعليم جيد سهل المنال للطلاب في الخليج."
      },
      {
        title: "التعلم الممتع",
        description: "جعل المواد الصعبة ممتعة وشيقة للتعلم."
      },
      {
        title: "النمو المهني",
        description: "تعزيز النمو المهني وقدرات التعلم للطلاب"
      },
      {
        title: "التدريس المرن والمخصص",
        description: "وضع معايير جديدة في التدريس المرن والمخصص عبر الإنترنت."
      }
    ]
  };

  const valueContent = {
    title: "تمكين التعلم الشخصي",
    paragraph: `تدرك تيوشنال بعمق أهمية التعلم الشخصي الفردي في تعزيز التميز الأكاديمي والثقة والشغف مدى الحياة بالمعرفة. فريقنا عالي المهارة من المدرسين الخبراء عبر الإنترنت، الذين يمثلون خلفيات متنوعة من جميع أنحاء العالم، مكرس لإلهام حب كل طالب للتعلم من خلال جلسات تدريس تعاونية وشاملة وممتعة ومفردة. بينما يظل التمكين الأكاديمي الأولوية القصوى لتيوشنال، نحن ملتزمون بنفس القدر بمساعدة الطلاب على النمو ليصبحوا أفرادًا واثقين ورحماء ومتكاملين.`,
    points: [
      {
        title: "خصوصية البيانات",
        description: "الحفاظ على خصوصية البيانات الصارمة لكل طالب وعضو في الطاقم."
      },
      {
        title: "مطابقة المدرسين",
        description: "ربط المدرسين المثاليين عبر الإنترنت مع الطلاب بناءً على متطلباتهم الأكاديمية."
      },
      {
        title: "دعم المنهج الشامل",
        description: "ضمان التغطية الكاملة للمنهج بالإضافة إلى فهم أسهل للمادة."
      },
      {
        title: "النمو الأكاديمي",
        description: "دعم الطلاب في تحقيق نتائج الامتحانات المرغوبة والنمو الأكاديمي."
      },
      {
        title: "توسيع الآفاق التعليمية",
        description: "تحسين وزيادة الآفاق التعليمية للطالب للنجاحات المستقبلية."
      },
      {
        title: "الدعم الأكاديمي الثابت",
        description: "توفير دعم أكاديمي ثابت من خلال جلسات تدريس فردية مخصصة عبر الإنترنت."
      }
    ]
  };

  const content = type === "mission" ? missionContent : valueContent;

  return (
    <Grid item lg={8} md={12} sm={12} xs={12} sx={styles.valueDiv}>
      <div>
        <Typography
          sx={styles.heading}
          component={"h2"}
          variant="h2"
          className={leagueSpartan.className}
        >
          {content.title}
        </Typography>
        <Typography
          sx={styles.paragraph}
          className={leagueSpartan.className}
          variant="body2"
          component={"p"}
        >
          {content.paragraph}
        </Typography>
      </div>

      <Box sx={styles.box}>
        {content.points.map((point, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "flexStart",
              justifyContent: {
                xs: "center",
                lg: "start",
              },
              cursor: "pointer",
              direction: "rtl",
            }}
          >
            <CircleIcon
              sx={{
                color: "#38B6FF",
                fontSize: "1rem",
                marginLeft: "8px", // Changed from marginRight for RTL
              }}
            />

            <Typography
              sx={styles.textBold}
              component={"p"}
              variant="body2"
              className={leagueSpartan.className}
            >
              {point.title}:{" "}
              <Typography
                sx={styles.text}
                component="span"
                variant="caption"
                className={leagueSpartan.className}
              >
                {point.description}
              </Typography>
            </Typography>
          </Box>
        ))}
      </Box>
    </Grid>
  );
};

const ArAboutUs: React.FunctionComponent = () => {
  const [activeType, setActiveType] = useState("mission");
  const { t } = useI18n();

  const onChangeType = (type: string) => {
    setActiveType(type);
  };
  
  return (
    <Box sx={styles.infoBoxContanier} dir="rtl">
      <Box sx={styles.headingContanier}>
        <Typography
          sx={styles.mainHeading}
          component={"h2"}
          className={leagueSpartan.className}
          variant="h2"
        >
          من نحن
        </Typography>

        <Typography
          sx={styles.dec}
          component={"p"}
          variant="body2"
          className={leagueSpartan.className}
        >
          {`تيوشنال هي منصة تدريس رائدة عبر الإنترنت ترتقي بتعلم الطلاب وتوفر تجربة تعليمية استثنائية في جميع أنحاء منطقة الخليج. مرخصة ومسجلة من قبل مدينة الشارقة للأبحاث والتكنولوجيا في عام 2022، تأسست تيوشنال بهدف رؤيوي قاده أحمد شاهير، ومرزا سنان بيغ، وعبد الواحد شيخ، والشيخ ذيشان أحمد، وجوليانا نوغيريا. معًا، سعوا إلى إنشاء خدمة تدريس عبر الإنترنت متطورة تركز على تقديم تعليم شخصي عالي الجودة مصمم حسب احتياجات الطلاب الفردية.`}
          <br /> <br />
          {`مع فريق مؤهل من المدرسين الخبراء المتفوقين في مجموعة واسعة من المواد، تقدم تيوشنال تجارب تعليمية مخصصة من خلال جلسات تدريس عبر الإنترنت عالية الجودة وشخصية تلبي احتياجات التعلم الفريدة والأهداف الأكاديمية لكل طالب. تشتهر تيوشنال بالتزامها بالابتكار والتميز والتعليم الجيد، مما يمكن الطلاب من الوصول إلى أعلى إمكاناتهم. من خلال الدعم الأكاديمي الثابت والدروس التفاعلية والممتعة والأساس التعليمي القوي، نساعد الطلاب على تحقيق النجاح الأكاديمي والمهني المستقبلي.`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "16px",
        }}
      >
        <Grid container sx={styles.aboutContent}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={styles.btnDiv}>
            <Button
              variant="contained"
              sx={
                activeType === "mission"
                  ? styles.roundedActiveButton
                  : styles.roundedButton
              }
              onClick={() => onChangeType("mission")}
            >
              مهمتنا
            </Button>
            <Button
              variant="contained"
              sx={
                activeType === "value"
                  ? styles.roundedActiveButton
                  : styles.roundedButton
              }
              onClick={() => onChangeType("value")}
            >
              قيمنا
            </Button>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={styles.contentDiv}>
            {renderValue(activeType, t)}
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Box sx={styles.imageDiv}>
                <Image
                  src={studentsImg.src}
                  width={studentsImg.width}
                  height={studentsImg.height}
                  alt="طلاب"
                  style={styles.image}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ArAboutUs;

const styles = {
  infoBoxContanier: {},
  image: {
    width: "100%",
    height: "100%",
    maxHeight: "553px",
    marginTop: { sm: "24px" } as any,
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
  heading: {
    marginBottom: { xs: "10px", sm: "15px", md: "18px", lg: "22px" },
    textAlign: "right", // Changed from left for RTL
  },
  paragraph: {
    color: "#2D2D2D",
    wordBreak: "break-word",
    maxWidth: "1000px",
    textAlign: "right", // Added for RTL
  },
  text: {
    color: "#2D2D2D",
  },
  textBold: {
    fontWeight: 600,
    color: "#2D2D2D",
  },
  dec: {
    textAlign: "justify",
    color: "rgba(0,0,0,0.77)",
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
    justifyContent: "right", // Changed from left for RTL
    color: "#000000",
  },
  headingContanier: {
    display: "flex",
    alignItems: "flexStart",
    flexDirection: "column",
    width: "100%",
    background: "transparent",
  },
  roundedActiveButton: {
    boxShadow: "0.1vh 1.5vh 3.4vh 0px #38B6FF66",
    backgroundColor: "#38B6FF",
    paddingY: "1.5vh",
    paddingX: { xs: "30px", md: "80px" },
    textAlign: "center",
    borderRadius: "1vh",
    ":hover": {
      boxShadow: "0.1vh 1.5vh 3.4vh 0px #38B6FF66",
      backgroundColor: "#38B6FF",
      paddingY: "1.5vh",
      textAlign: "center",
      borderRadius: "1vh",
    },
    display: {
      lg: "flex",
    },
  },
  roundedButton: {
    backgroundColor: "white",
    color: "black",
    paddingY: "2vh",
    paddingX: { xs: "30px", md: "80px" },
    textAlign: "center",
    ":hover": {
      color: "white",
      borderColor: "white",
      backgroundColor: "#38B6FF",
      textAlign: "center",
    },
    display: {
      lg: "flex",
    },
  },
  aboutContent: {
    marginTop: "36px",
    p: 0,
    padding: 0,
  },
  btnDiv: {
    display: "flex",
    flexDirection: "row",
    rowGap: "16px",
    columnGap: "16px",
    marginY: "24px",
    justifyContent: "flex-end", // Added for RTL
  },
  imageDiv: {
    display: "flex",
    flexDirection: "row",
    textAlign: "flexStart",
    justifyContent: "right", // Changed from left for RTL
    columnGap: "24px",
    marginTop: { xs: "24px", lg: 0 },
    height: "100%",
    maxHeight: { xs: "auto", lg: "535px" },
  },
  contentDiv: {
    display: "flex",
    flexDirection: { xs: "column", sm: "column", lg: "row" },
    textAlign: "flexStart",
    justifyContent: "right", // Changed from left for RTL
    columnGap: "24px",
  },
  valueDiv: {
    display: "flex",
    flexDirection: "column",
    textAlign: "flexStart",
    justifyContent: "spaceEvenly",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    rowGap: "12px",
    border: "1px solid #B9E5FF",
    borderRadius: "16px",
    padding: "24px",
    marginTop: "32px",
  },
};