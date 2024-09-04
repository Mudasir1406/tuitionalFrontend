"use client"; // Add this line at the top of your file

import { Box, Grid, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import React, { useState } from "react";

const CurriculumOverview = () => {
  const [curriculums, setCurriculums] = useState([
    {
      title: "British Curriculum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Et nulla sodales scelerisque aliquet semper massa gravida ullamcorper.",
      color: "#F1FAFF",
      boards: [
        { title: "CIE", isSelected: false },
        { title: "Pearson Edexcel", isSelected: true },
        { title: "AQA", isSelected: false },
        { title: "OCR", isSelected: false },
      ],
    },
    {
      title: "American Curriculum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Et nulla sodales scelerisque aliquet semper massa gravida ullamcorper.",
      color: "#DBF2FF",
      boards: [
        { title: "AP", isSelected: false },
        { title: "GED", isSelected: false },
      ],
    },
    {
      title: "Australian Curriculum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Et nulla sodales scelerisque aliquet semper massa gravida ullamcorper.",
      color: "#ADE2FF",
      boards: [
        { title: "IB", isSelected: false },
        { title: "Sobis", isSelected: false },
      ],
    },
  ]);

  // Function to toggle the selection of a board
  const toggleBoardSelection = (
    curriculumIndex: number,
    boardIndex: number
  ) => {
    setCurriculums((prevCurriculums) =>
      prevCurriculums.map((curriculum, ci) => {
        if (ci === curriculumIndex) {
          return {
            ...curriculum,
            boards: curriculum.boards.map((board, bi) => {
              if (bi === boardIndex) {
                return { ...board, isSelected: !board.isSelected };
              }
              return board;
            }),
          };
        }
        return curriculum;
      })
    );
  };

  return (
    <>
      <Box>
        <Typography sx={style.overview}>Curriculum Overview</Typography>
      </Box>

      <Box sx={{ margin: "0 6vh 12vh 6vh" }}>
        <Grid container spacing={2}>
          {curriculums.map((curriculum, curriculumIndex) => (
            <Grid item xs={12} sm={4} md={4} lg={4} key={curriculumIndex}>
              <Box
                sx={{
                  backgroundColor: curriculum.color,
                  padding: "16px",
                  borderRadius: "2vh",
                  boxShadow:
                    "0px 2px 1px 0px rgba(0, 0, 0, 0.05), 0px - 3px 8px 0px rgba(56, 182, 255, 0.20)",
                  height: "40vh", // Set a fixed height for the boxes
                }}
              >
                <Box>
                  <Typography sx={style.title}>{curriculum.title}</Typography>
                  <Typography sx={style.desc}>
                    {curriculum.description}
                  </Typography>
                </Box>
                <Grid container spacing={1}>
                  {curriculum.boards.map((board, boardIndex) => (
                    <Grid item xs={6} key={boardIndex}>
                      <Box
                        onClick={() =>
                          toggleBoardSelection(curriculumIndex, boardIndex)
                        } // Pass indices here
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #CDCDCD",
                          padding: "2vh",
                          borderRadius: "6vh",
                          backgroundColor: board.isSelected
                            ? "#38B6FF"
                            : "transparent",
                          color: board.isSelected ? "#fff" : "#2D2D2D",
                          textAlign: "center",
                          margin: "3vh 0 0 0",
                          cursor: "pointer",
                        }}
                      >
                        <CircleIcon
                          sx={{
                            color: board.isSelected ? "#fff" : "#38B6FF",
                            fontSize: "1rem",
                            marginRight: "8px",
                          }}
                        />
                        <Typography sx={style.boardTitle}>
                          {board.title}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default CurriculumOverview;

const style = {
  overview: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: {
      lg: "6vh",
    },
    lineHeight: {
      lg: "6vh",
    },
    marginBottom: "2rem", // Add some spacing below the overview heading
  },
  title: {
    fontWeight: "600",
    color: "#2D2D2D",
    fontSize: {
      lg: "4vh",
    },
    marginBottom: "1vh", // Add spacing between title and description
  },
  desc: {
    color: "#2D2D2D",
    fontWeight: "400",
    fontSize: {
      lg: "2vh",
    },
  },
  boardTitle: {
    fontWeight: "500",
    fontSize: {
      lg: "2vh",
    },
  },
};
