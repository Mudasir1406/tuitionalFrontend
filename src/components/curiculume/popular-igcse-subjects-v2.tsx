'use client';
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { leagueSpartan } from "@/app/fonts";

interface Subject {
  name: string;
  color: string;
}

interface IProps {
  title?: string;
  headerTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

// Hardcoded IGCSE subjects data with chalky/very light colors
const hardcodedSubjects: Subject[] = [
  { name: "Mathematics", color: "#FFF5F5" },
  { name: "English Language", color: "#F0FFFF" },
  { name: "Physics", color: "#F0F8FF" },
  { name: "Chemistry", color: "#F5FFFA" },
  { name: "Biology", color: "#FFFFFE" },
  { name: "Economics", color: "#FAF0E6" },
  { name: "Business Studies", color: "#F0FFF0" },
  { name: "Computer Science", color: "#FFFFF0" },
  { name: "Geography", color: "#F8F8FF" },
  { name: "History", color: "#FFF8DC" },
  { name: "Art & Design", color: "#F0FFFF" },
  { name: "French", color: "#FFF0F5" }
];

const PopularIgcseSubjectsV2: React.FunctionComponent<IProps> = ({ 
  title = "Popular IGCSE Subjects",
  headerTag = "h2"
}) => {

  return (
    <Box sx={{ paddingX: "5vw" }}>
      <Box>
        <Typography
          sx={style.popularText}
          className={leagueSpartan.className}
          variant={headerTag}
          component={headerTag}
        >
          {title}
        </Typography>
      </Box>

      <Box>
        <Grid container spacing={2} justifyContent="center">
          {hardcodedSubjects.map((item, index) => (
            <Grid item xs={6} sm={6} md={3} lg={3} xl={2} key={index}>
              <Box sx={{
                ...style.cardsBoxes,
                background: item.color,
                ":hover": {
                  ...style.cardsBoxes[":hover"],
                  background: item.color,
                  opacity: 0.8,
                }
              }}>
                <Typography
                  sx={style.subjects}
                  className={leagueSpartan.className}
                  variant="caption"
                  component={"p"}
                >
                  {item.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PopularIgcseSubjectsV2;

const style = {
  popularText: {
    textAlign: "center",
    margin: "0 auto 2.5vh auto",
  },
  subjects: {
    color: "#2D2D2D",
    fontWeight: "600",
    fontSize: {
      xs: "0.9rem",
      lg: "1rem",
    },
  },
  cardsBoxes: {
    background: "#FFF",
    backdropFilter: "blur(5px)",
    borderRadius: "2vh",
    boxShadow: "0px -2.171px 6.514px 0px rgba(0, 0, 0, 0.20) inset",
    textAlign: "center",
    padding: {
      xs: "2vh",
      lg: "3vh",
    },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: {
      xs: "5vh",
      lg: "5vh",
    },
    transition: "all .5s ease-in-out",

    ":hover": {
      transform: "scale(1.05)",
    },
  },
};