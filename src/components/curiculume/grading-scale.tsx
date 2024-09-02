import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const GradingScale = () => {
  const subjectsNames = [
    "Physics 0625 - (Core)",
    "Mathematics (9-1) - 0980 (Core)",
    "Mathematics (US) - 0444 (Core)",
    "Mathematics - International - 0607 (Core)"
  ];

  const assessments = [
    { name: "Change to Assessment", papers: ["Paper 1", "Paper 2", "Paper 3", "Paper 4"] },
    { name: "Total Marks", papers: ["80 Marks", "100 Marks", "80 Marks", "100 Marks"] },
    { name: "Duration", papers: ["1 hour 30 mins", "2 hour", "1 hour 30 mins", "2 hour"] },
    {
      name: "Item Type",
      papers: [
        "Structural with nonstructural questions",
        "Structural with nonstructural questions",
        "Structural with nonstructural questions",
        "Structural with nonstructural questions"
      ]
    }
  ];

  const otherInfo = [
    "Calculator",
    "Not Allowed",
    "Candidates Answer",
    "All Questions",
    "50% Total",
    "For Set"
  ];

  return (
    <Box sx={{ marginX: { lg: "7vh" }, marginY: { lg: "5vh", sm: "5vh" } }}>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          {subjectsNames.map((name, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <Box>
                <Typography sx={styles.text}>{name}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {assessments.map((assessment, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: "2vh",
            background: index === 0 ? "#9EDCFF" : "#FFF",
            boxShadow: "0px -5px 15px 0px rgba(0, 0, 0, 0.20)",
            backdropFilter: "blur(5px)",
            height: "12vh",
            paddingX: { lg: "5vh" },
            marginTop: { lg: "9vh" }
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Typography sx={styles.assesment}>{assessment.name}</Typography>
            </Grid>
            {assessment.papers.map((paper, index) => (
              <Grid item xs={6} sm={2} md={2} lg={2} key={index}>
                <Typography sx={styles.papers}>{paper}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      <Box
        sx={{
          borderRadius: "2vh",
          background: "#FFF",
          boxShadow: "0px -5px 15px 0px rgba(0, 0, 0, 0.20)",
          backdropFilter: "blur(5px)",
          height: "auto",
          paddingX: { lg: "5vh" },
          marginTop: { lg: "9vh" }
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Box sx={{ paddingTop: "15vh" }}>
              <Typography sx={styles.assesment}>Other Information</Typography>
            </Box>
          </Grid>
          {[...Array(4)].map((_, colIndex) => (
            <Grid item xs={6} sm={2} md={2} lg={2} key={colIndex}>
              {otherInfo.map((info, index) => (
                <Typography sx={styles.papers} key={index}>
                  {info}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default GradingScale;

const styles = {
  text: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: { lg: "2.3vh" },
    borderRadius: "5vh",
    background: "#FFF",
    boxShadow: "0px -1px 10px 0px rgba(0, 0, 0, 0.15) inset",
    paddingY: { sm: "1.5vh", lg: "2vh" }
  },
  assesment: {
    fontWeight: 600,
    fontSize: { lg: "3vh" },
    paddingY: { lg: "1.5vh" }
  },
  papers: {
    textAlign: "center",
    fontSize: { lg: "2.4vh" },
    paddingY: { lg: "1.5vh" }
  }
};
