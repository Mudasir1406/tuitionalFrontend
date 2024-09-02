"use client"
import { Box, Grid, Typography, Collapse } from '@mui/material';
import React, { useState } from 'react';
import upicon from '../../../public/assets/images/svg/Upicon.svg';
import downicon from '../../../public/assets/images/static/Downicon.png';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

interface Question {
  question: string;
  answer: string;
  icon: StaticImageData;
}

const FrequentlyQuestions: React.FC = () => {
  const [expanded, setExpanded] = useState<number>(0);

  const Questions: Question[] = [
    {
      question: "Lorem ipsum dolor sit amet consectetur. Lorem leo felis.",
      answer: "Lorem ipsum dolor sit amet consectetur. Nunc malesuada massa enim nec sapien vel sagittis dignissim libero. Felis phasellus cursus dolor suspendisse. Quam enim urna dictumst aenean morbi nisi. Molestie tincidunt id neque mauris. Egestas nisi tellus eget id aenean dignissim turpis risus. Nisi felis.",
      icon: downicon,
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur. Faucibus.",
      answer: "Excellent Answer",
      icon: downicon,
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur. Ultricies nibh.",
      answer: "Excellent Answer",
      icon: downicon,
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur. Quis in rhoncus id libero molestie sed.",
      answer: "Excellent Answer",
      icon: downicon,
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur. Pulvinar accumsan dui malesuada commodo euismod.",
      answer: "Excellent Answer",
      icon: downicon,
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur. Purus quis venenatis eget.",
      answer: "Excellent Answer",
      icon: downicon,
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur. A tincidunt at morbi.",
      answer: "Excellent Answer",
      icon: downicon,
    },
  ];

  const handleToggle = (index: number) => {
    setExpanded(expanded === index ? 0 : index);
  };

  return (
    <Box sx={{ marginY: { lg: "13vh" }, marginX: { lg: "4vh" } }}>
      <Box>
        <Typography sx={style.frequently}>Frequently Asked Questions</Typography>
        <Typography sx={style.frequentlyDesc}>
          Lorem ipsum dolor sit amet consectetur. Amet morbi sit suspendisse dui ut donec vel id. Viverra urna cras nulla elementum. Risus orci dolor euismod in fringilla adipiscing eu condimentum.
        </Typography>
      </Box>

      <Box sx={{ marginX: "auto", maxWidth: "140vh", paddingX: { lg: "2vh" } }}>
        <Grid container spacing={1}>
          {Questions.map((item, index) => (
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
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography sx={style.boxhed}>{item.question}</Typography>
                  <Box onClick={() => handleToggle(index)} sx={{ cursor: "pointer" }}>
                    <Image src={expanded === index ? upicon : downicon} alt="toggle icon" style={{ height: "4vh", width: "4vh" }} />
                  </Box>
                </Box>
                <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                  <Typography sx={style.boxdesc}>
                    {item.answer}
                  </Typography>
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
    fontSize: { lg: "6vh" },
    textAlign: "center",
  },
  frequentlyDesc: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: { lg: "2.2vh" },
    width: { lg: "55%" },
    margin: "0 auto",
    lineHeight: "5vh",
  },
  boxhed: {
    fontSize: { lg: "2.5vh" },
  },
  boxdesc: {
    fontSize: { lg: "1.9vh" },
    width: { lg: "135vh" },
    marginTop: "2vh",
  },
  TextBox: {
    fontSize: "2.2vh",
  },
};
