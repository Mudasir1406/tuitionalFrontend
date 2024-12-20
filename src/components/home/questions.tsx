"use client";
import { leagueSpartan } from "@/app/fonts";
import * as React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import {
  Box,
  Accordion,
  AccordionSummary,
  Divider,
  AccordionDetails,
  Typography,
} from "@mui/material";
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

export default Questions;

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

  questionText: {
    display: "flex",
    fontSize: {
      xs: "3.7vh",
      sm: "1.8vh",
      md: "2vh",
      lg: "2.5vh",
    },
    // fontWeight: 500,
    // lineHeight: {
    //   xs: "2.7vh",
    //   sm: "2.8vh",
    //   md: "3.2vh",
    //   lg: "3.4vh",
    // },
    marginX: "10px",
    color: "#000000",
  },
  answerText: {
    display: "flex",
    // fontSize: {
    //   xs: "1.2vh",
    //   sm: "1.3vh",
    //   md: "1.4vh",
    //   lg: "1.7vh",
    // },
    // fontWeight: 400,
    // lineHeight: {
    //   xs: "2.6vh",
    //   sm: "2.8vh",
    //   md: "3.2vh",
    //   lg: "3.2vh",
    // },
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
