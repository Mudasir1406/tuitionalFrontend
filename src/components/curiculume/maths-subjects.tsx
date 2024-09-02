import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import "./../../app/style.css";
const MathsSubjects = () => {
  let Subjects = [
    {
      number: "01",
      heading: "Comprehensive Curriculum",
      desc: "Lorem ipsum dolor sit amet consectetur. Proin varius nulla porttitor egestas at aliquet tellus. Tortor sodales ipsum morbi auctor.",
    },
    {
      number: "02",
      heading: "Problem-Solving Focus",
      desc: "Lorem ipsum dolor sit amet consectetur. Proin varius nulla porttitor egestas at aliquet tellus. Tortor sodales ipsum morbi auctor.",
    },
    {
      number: "03",
      heading: "Assessment Methods",
      desc: "Lorem ipsum dolor sit amet consectetur. Proin varius nulla porttitor egestas at aliquet tellus. Tortor sodales ipsum morbi auctor.",
    },
    {
      number: "04",
      heading: "Preparation for Adv Studies",
      desc: "Lorem ipsum dolor sit amet consectetur. Proin varius nulla porttitor egestas at aliquet tellus. Tortor sodales ipsum morbi auctor.",
    },
  ];
  return (
    <>
      <Box sx={{ height: { xs: "100vh", lg: "100vh", } }}>
        <Box sx={styles.IGCText}>
          <Typography sx={styles.TextH}>IGCSE Maths Subject</Typography>
          <Typography sx={styles.IGCdesc}>
            IGCSE Maths is a globally recognized qualification that equips
            students with a strong foundation in mathematical principles and
            problem-solving skills. This subject is essential for a wide range
            of academic and career paths, as it develops critical thinking,
            logical reasoning, and quantitative analysis abilities.
          </Typography>
        </Box>

        <Box sx={{ height: "auto", margin: "0 5vh", }}>
          <Grid container spacing={3}>
            {Subjects.map((item, index) => {
              return (
                <>
                  <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
                    <Box
                      sx={{
                        paddingX: {
                          sm: "3.2vh",
                          lg: "3vh",
                        },
                        textAlign: {
                          xs: "center",
                          sm: "justify",
                          md: "justify",
                          lg: "justify",
                        },
                      }}
                    >
                      <Typography sx={styles.numbers}>{item.number}</Typography>
                      <Typography sx={styles.subjects}>
                        {item.heading}
                      </Typography>
                      <Typography sx={styles.des}>{item.desc}</Typography>
                    </Box>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default MathsSubjects;

const styles = {
  IGCText: {
    paddingX: {
      xs: "0vh",
      sm: "5vh",
      md: "5vh",
      lg: "23vh",
    },
  },
  TextH: {
    fontWeight: "600",
    fontSize: {
      xs: "4vh",
      sm: "4vh",
      md: "5vh",
      lg: "6vh",
    },
  },
  IGCdesc: {
    width: "148vh",
    fontWeight: "400",
    paddingY: {
      lg: "2vh",
    },
    fontSize: {
      lg: "2vh"
    },
    lineHeight: {
      lg: "3.5vh"
    }
  },
  numbers: {
    color: "white",
    fontWeight: "600",
    fontSize: {
      xs: "3vh",
      sm: "3vh",
      md: "3vh",
      lg: "4vh",
    },
    lineHeight: {
      lg: "7vh"
    }
  },

  subjects: {
    fontWeight: "600",
    lineHeight: {
      lg: "7vh"
    },
    fontSize: {
      xs: "2vh",
      sm: "2vh",
      md: "1vh",
      lg: "3vh",
    },
    paddingY: {
      xs: "2vh",
      sm: "1vh",
      md: "2vh",
      lg: "1.5vh",
    },
  },
  des: {
    fontWeight: "400",
    fontSize: {
      xs: "2vh",
      sm: "1.5vh",
      md: "1vh",
      lg: "2vh",
    },
  },
};
