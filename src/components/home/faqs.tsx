"use client";
import * as React from "react";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import faqLine from "../../../public/assets/images/static/faq-line.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { Faqs_Type, getFaqs } from "../../services/faqs/faqs";
import Image from "next/image";
import { leagueSpartan } from "@/app/fonts";

const Faqs: React.FC = () => {
  const [faqs, setFaqs] = React.useState<Faqs_Type[]>();
  React.useEffect(() => {
    getFaqs().then((data) => setFaqs(data));
  }, []);
  return (
    <Box sx={styles.contanier}>
      <Box sx={styles.headingContanier}>
        <Typography sx={styles.heading} className={leagueSpartan.className}>
          Frequently Asked Questions
        </Typography>
      </Box>
      {faqs?.map((item, index) => (
        <Questions key={index} question={item.question} answer={item.answer} />
      ))}
      <Box sx={styles.headingContanier}>
        <Button
          variant="contained"
          sx={styles.containedButton}
          className={leagueSpartan.className}
        >
          View More
        </Button>
      </Box>
      <Image
        src={faqLine.src}
        width={faqLine.width}
        height={faqLine.height}
        alt="faqline"
        style={{
          position: "absolute",
          left: "-14%",
          bottom: 0,
          zIndex: -1,
          width: "100vw",
        }}
      ></Image>
    </Box>
  );
};

export default Faqs;

const styles = {
  contanier: {
    marginBottom: "20px",
    position: "relative",
    dispaly: "flex",
    alignItems: "center",
    justifyContent: "center",

    // "::before": {
    //   content: "''",
    //   backgroundImage: `url(${faqLine})`,
    //   position: "absolute",
    //   bottom: -90,
    //   backgroundRepeat: "no-repeat",
    //   width: "1920px",
    //   height: "281px",
    //   left: -200,
    //   backgroundSize: "cover",
    // },
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
    fontSize: {
      xs: "3.5vh",
      sm: "4vh",
      md: "4.5vh",
      lg: "5.5vh",
    },
    lineHeight: {
      xs: "5vh",
      sm: "5.5vh",
      md: "6vh",
      lg: "6.5vh",
    },
    fontWeight: 600,
    marginTop: {
      xs: "4vh",
      sm: "5vh",
      md: "9vh",
      lg: "10vh",
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
      // zIndex: 10,
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
      left: {
        xs: "11%",
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
  containedButton: {
    display: "flex",
    alignSelf: "center",
    boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
    backgroundColor: "#38B6FF",

    letterSpacing: "-2%",

    fontSize: {
      xs: "1.5vh",
      sm: "1.7vh",
      md: "1.9vh",
      lg: "2.2vh",
    },
    fontWeight: 700,
    lineHeight: "18.4px",
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

type IProps = {
  question: string;
  answer: string;
};

const Questions: React.FunctionComponent<IProps> = ({ question, answer }) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <Box>
      <Accordion
        onChange={(e, expanded) => setExpanded(expanded)}
        sx={{
          backgroundColor: "white",
          boxShadow: "1px 5px 20px 0px rgba(56, 182, 255, 0.2)",
          borderRadius: "15px",
          marginTop: "2vh",
          paddingY: "2vh",
        }}
        defaultExpanded={false}
      >
        <AccordionSummary
          expandIcon={
            expanded ? (
              <RemoveOutlinedIcon sx={{ color: "black" }} />
            ) : (
              <AddOutlinedIcon sx={{ color: "black" }} />
            )
          }
          aria-controls="panel1-content"
          id="panel1-header"
          sx={styles.questionText}
          className={leagueSpartan.className}
        >
          {question}
        </AccordionSummary>
        <Divider
          sx={{
            width: "95%",
            alignSelf: "center",
            display: "flex",
            marginLeft: "2.5%",
          }}
        />
        <AccordionDetails sx={{ marginLeft: "1.5%", marginY: "20px" }}>
          <Typography
            sx={styles.answerText}
            className={leagueSpartan.className}
          >
            {answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
