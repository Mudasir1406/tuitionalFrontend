import * as React from "react";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import { Box, Typography } from "@mui/material";
import { Faqs_Type, getFaqs } from "../../services/faqs/faqs";
import { leagueSpartan } from "@/app/fonts";
import ArQuestions from "./ar-questions";

const ArFaqs: React.FC = async () => {
  const faqs: Faqs_Type[] = await getFaqs("ar");
  return (
    <Box sx={styles.contanier} dir="rtl">
      <Box sx={styles.headingContanier}>
        <Typography
          sx={styles.heading}
          className={leagueSpartan.className}
          component={"h2"}
          variant="h2"
        >
          الأسئلة الشائعة
        </Typography>
      </Box>
      {faqs?.map((item, index) => (
        <ArQuestions
          key={index}
          question={item?.question}
          answer={item?.answer}
        />
      ))}
    </Box>
  );
};

export default ArFaqs;

const styles = {
  contanier: {
    marginBottom: "20px",
    position: "relative",
    dispaly: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headingContanier: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    background: "transparent",
  },
  heading: {
    display: "flex",
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
        xs: -20,
        sm: -35,
        md: -35,
        lg: -35,
      },
      right: {
        xs: "-6%",
        sm: "-6%",
        md: "-6%",
        lg: "-6%",
      },
    },
  },
  questionText: {
    display: "flex",
    fontSize: {
      xs: "1.7vh",
      sm: "1.8vh",
      md: "2vh",
      lg: "2.5vh",
    },
    fontWeight: 500,
    lineHeight: {
      xs: "2.7vh",
      sm: "2.8vh",
      md: "3.2vh",
      lg: "3.4vh",
    },
    marginX: "10px",
    color: "#000000",
  },
  answerText: {
    display: "flex",
    fontSize: {
      xs: "1.2vh",
      sm: "1.3vh",
      md: "1.4vh",
      lg: "1.7vh",
    },
    fontWeight: 400,
    lineHeight: {
      xs: "2.6vh",
      sm: "2.8vh",
      md: "3.2vh",
      lg: "3.2vh",
    },
  },
  marginBottom: {
    marginBottom: {
      xs: "25px",
      sm: "30px",
      md: "40px",
      lg: "50px",
    },
  },
  containedButton: {
    display: "flex",
    alignSelf: "center",
    boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
    backgroundColor: "#38B6FF",
    letterSpacing: "-2%",
    textAlign: "center",
    borderRadius: "10px",
    marginBottom: {
      xs: "25px",
      sm: "30px",
      md: "40px",
      lg: "50px",
    },
    marginTop: "50px",
    padding: "18px",
    paddingX: "50px",
    textTransform: "none",
    ":hover": {
      boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
      backgroundColor: "#38B6FF",
      fontSize: {
        xs: "25px",
        sm: "25px",
        md: "25px",
        lg: "25px",
      },
      padding: "18px",
      letterSpacing: "-2%",
      borderRadius: "10px",
      fontWeight: 700,
      lineHeight: "18.4px",
      textAlign: "center",
      paddingX: "50px",
    },
  },
};
