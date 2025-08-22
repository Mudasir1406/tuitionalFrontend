'use client';
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
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

// Hardcoded IGCSE subjects data 
const hardcodedSubjects: Subject[] = [
  { name: "Mathematics", color: "" },
  { name: "English Language", color: "" },
  { name: "Physics", color: "" },
  { name: "Chemistry", color: "" },
  { name: "Biology", color: "" },
  { name: "Economics", color: "" },
  { name: "Business Studies", color: "" },
  { name: "Computer Science", color: "" },
  { name: "Geography", color: "" },
  { name: "History", color: "" },
  { name: "Art & Design", color: "" },
  { name: "French", color: "" }
];

// Color logic for mobile: left cards (#e7f1f7), right cards (#c9ebff)
const getCardColor = (index: number, isMobile: boolean) => {
  if (!isMobile) {
    // Desktop: alternating colors
    return index % 2 === 0 ? "#e7f1f7" : "#c9ebff";
  }
  // Mobile: left column (#e7f1f7), right column (#c9ebff)
  return index % 2 === 0 ? "#e7f1f7" : "#c9ebff";
};

const PopularIgcseSubjectsV2: React.FunctionComponent<IProps> = ({ 
  title = "Popular IGCSE Subjects",
  headerTag = "h2"
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
          {hardcodedSubjects.map((item, index) => {
            const cardColor = getCardColor(index, isMobile);
            return (
              <Grid item xs={6} sm={6} md={3} lg={3} xl={2} key={index}>
                <Box sx={{
                  ...style.cardsBoxes,
                  background: cardColor,
                  ":hover": {
                    ...style.cardsBoxes[":hover"],
                    background: cardColor,
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
            );
          })}
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