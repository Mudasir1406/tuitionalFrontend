"use client";
import { Box, Grid, Typography, Collapse } from "@mui/material";
import React, { useState } from "react";
import upicon from "../../../public/assets/images/svg/Upicon.svg";
import downicon from "../../../public/assets/images/static/Downicon.png";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { PageData } from "@/types/grade-subject-level.types";

interface Question {
  question: string;
  answer: string;
  icon: StaticImageData;
}

type IProps = {
  data: PageData["Faqs"];
};
const FrequentlyQuestions: React.FC<IProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<number>(0);
  const handleToggle = (index: number) => {
    setExpanded(expanded === index ? 0 : index);
  };
  return (
    <Box sx={{ marginY: { lg: "13vh" }, marginX: { lg: "4vh", xs: "3vh" } }}>
      <Box>
        <Typography
          sx={style.frequently}
          component={data.headerTag as keyof JSX.IntrinsicElements}
        >
          {data.header}
        </Typography>
        <Typography sx={style.frequentlyDesc}>{data?.paragraph}</Typography>
      </Box>

      <Box sx={{ marginX: "auto", maxWidth: "80vw", paddingX: { lg: "2vh" } }}>
        <Grid container spacing={1}>
          {data?.faqs.map((item, index) => (
            <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
              <Box
                sx={{
                  borderRadius: "2vh",
                  border: "0.784px #EBEBEB",
                  background: expanded === index ? "#9EDCFF" : "#F3FBFF", // Change background for active item
                  backdropFilter: "blur(5px)",
                  padding: "3vh",
                  marginTop: "3vh",
                  width: "100%", // Ensure consistent width
                  boxSizing: "border-box", // Include padding and border in width
                  minWidth: "300px", // Set a minimum width for consistency
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={style.boxhed}>{item.question}</Typography>
                  <Box
                    onClick={() => handleToggle(Number(index))}
                    sx={{ cursor: "pointer" }}
                  >
                    <Image
                      src={expanded === index ? upicon : downicon}
                      alt="toggle icon"
                      style={{ height: "4vh", width: "4vh" }}
                    />
                  </Box>
                </Box>
                <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                  <Typography sx={style.boxdesc}>{item.answer}</Typography>
                </Collapse>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default FrequentlyQuestions;
const style = {
  frequently: {
    fontWeight: "600",
    fontSize: { lg: "6vh", sm: "4vh", md: "4vh", xs: "3vh" },
    textAlign: "center",
  },
  frequentlyDesc: {
    color: "#2D2D2D",
    textAlign: "center",
    fontWeight: 400,
    fontSize: { lg: "2vh", sm: "2.5vh", md: "2.5vh" },
    width: { lg: "55%" },
    margin: "0 auto",
    lineHeight: "5vh",
    padding: { xs: "2vh 0", sm: "2vh" },
  },
  boxhed: {
    fontSize: { lg: "2.5vh", sm: "2.5vh", md: "2.5vh" },
  },
  boxdesc: {
    fontSize: { lg: "1.9vh", sm: "2vh" },
    width: { lg: "70vw" },
    marginTop: "2vh",
  },
  TextBox: {
    fontSize: "2.2vh",
  },
};
