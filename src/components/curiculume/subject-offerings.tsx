import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import Minus from '../../../public/assets/images/svg/Minus-Icon.svg'
import send from '../../../public/assets/images/svg/Send.svg'

const SubjectOfferings = () => {
  // Define the courses and modules data
  const courses = [
    "Mathematics - 0580 (Core)",
    "Mathematics (9-1) - 0980 (Core)",
    "Mathematics (US) - 0444 (Core)",
    "Mathematics - International - 0607 (Core)"
  ];

  const foundationModules = [
    "Module 1: Numbers",
    "Module 2: Money",
    "Module 3: Measurements",
    "Module 4: Basic Algebra",
    "Module 5: Basic Geometry",
    "Module 6: Further Geometry",
    "Module 7: Graphwork and Statistics"
  ];

  const higherModules = [
    "Module 8: Probability and Experimental Work",
    "Module 2: Money",
    "Module 3: Measurements",
    "Module 4: Basic Algebra",
    "Module 5: Basic Geometry",
    "Module 6: Further Geometry",
    "Module 7: Graphwork and Statistics"
  ];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          marginY: { lg: "4vh" },
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ width: { lg: "50%" }, margin: "0 auto" }}>
              <Typography sx={style.Offerings}>
                IGCSE Maths Subject Offerings
              </Typography>
            </Box>
            <Box sx={{ width: { lg: "65%" }, margin: "0 auto" }}>
              <Typography sx={style.offeringDesc}>
                Lorem ipsum dolor sit amet consectetur. Sit tempus egestas sed mi diam. Odio at leo tortor tristique nam sit. Tellus porta cursus mattis lacus sit turpis nulla. Gravida quis elementum nisl enim ac nam nibh.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ border: "2px solid #D3EFFF", borderRadius: "2vh", margin: "2vh 7vh" }}>
        <Grid item xs={12}>
          <Box sx={style.IconStyle}>
            <Typography>
              <Image src={Minus} alt="Icon" style={{ width: "8vh", height: "8vh" }} />
            </Typography>
            <Typography sx={style.maths}>Mathematics Courses</Typography>
          </Box>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Box sx={{
              display: "flex",
              flexDirection: "column", // Stack the Typography elements
              alignItems: "center", // Centers the content horizontally
            }}>
              {courses.map((course, index) => (
                <Typography
                  key={index}
                  sx={course === "Mathematics - International - 0607 (Core)" ? style.reducedPaddingCourse : course === "Mathematics - 0580 (Core)" ? style.highlightedCourse : style.courses} // Apply styles conditionally
                >
                  {course}
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Box sx={{
              borderRadius: "2vh",
              background: "#FFF",
              boxShadow: "0px -5px 15px 0px rgba(0, 0, 0, 0.20)",
              height: "auto",
              marginY: {
                sm: "3.5vh",
                lg: "8vh",
              },
            }}>
              <Box>
                <Typography sx={style.Tierheading}>Maths IGCSE Course: Foundation Tier Subjects</Typography>
              </Box>
              {foundationModules.map((module, index) => (
                <Box sx={style.TiericonText} key={index}>
                  <Typography sx={style.Module}>{module}</Typography>
                  <Typography>
                    <Image src={send} alt='Icon' style={{ height: "2vh" }} />
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Box sx={{
              borderRadius: "2vh",
              background: "#FFF",
              boxShadow: "0px -5px 15px 0px rgba(0, 0, 0, 0.20)",
              height: "auto",
              marginY: {
                sm: "3.5vh",
                lg: "8vh",
              },
            }}>
              <Box>
                <Typography sx={style.Tierheading}>Maths IGCSE Course: Higher Tier Subjects</Typography>
              </Box>
              {higherModules.map((module, index) => (
                <Box sx={style.TiericonText} key={index}>
                  <Typography sx={style.Module}>{module}</Typography>
                  <Typography>
                    <Image src={send} alt='Icon' style={{ height: "2vh" }} />
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default SubjectOfferings

const style = {
  Offerings: {
    fontWeight: "600",
    fontSize: {
      lg: "6vh",
    },
  },
  offeringDesc: {
    fontSize: {
      lg: "2.2vh",
    },
  },
  IconStyle: {
    display: "flex",
    background: "#9EDCFF",
    borderRadius: "2vh",
    padding: {
      xs: "2vh",
      lg: "1.5vh",
    },
  },
  maths: {
    lineHeight: {
      xs: "8vh",
      lg: "8vh",
    },
    fontWeight: "600",
    fontSize: {
      xs: "2.5vh",
      lg: "3vh",
    },
    padding: {
      xs: "2vh",
      lg: "0vh 3vh"
    }
  },
  highlightedCourse: {
    margin: {
      xs: "3vh",
      sm: "6vh",
      lg: "8vh 0 3.5vh 0",
    },
    background: "#D3EFFF", // Background color for the highlighted course
    boxShadow: "0px -1px 10px 0px rgba(0, 0, 0, 0.15)",
    fontWeight: "500",
    fontSize: {
      xs: "2.5vh",
      sm: "1.5vh",
      lg: "2.5vh",
    },
    paddingX: {
      xs: "7vh",
      sm: "1.5vh",
      lg: "10vh",
    },
    lineHeight: {
      xs: "6vh",
      lg: "10vh",
    },
    borderRadius: "5vh",
  },
  courses: {
    marginY: {
      xs: "3vh",
      sm: "6vh",
      lg: "3.5vh",
    },
    background: "#FFF",
    boxShadow: "0px -1px 10px 0px rgba(0, 0, 0, 0.15)",
    fontWeight: "500",
    fontSize: {
      xs: "2.5vh",
      sm: "1.5vh",
      lg: "2.5vh",
    },
    paddingX: {
      xs: "7vh",
      sm: "1.5vh",
      lg: "8vh",
    },
    lineHeight: {
      xs: "6vh",
      lg: "10vh",
    },
    borderRadius: "5vh",
  },
  reducedPaddingCourse: { // New style with reduced padding
    marginY: {
      xs: "3vh",
      sm: "6vh",
      lg: "3vh",
    },
    background: "#FFF",
    boxShadow: "0px -1px 10px 0px rgba(0, 0, 0, 0.15)",
    fontWeight: "500",
    fontSize: {
      xs: "2.5vh",
      sm: "1.5vh",
      lg: "2.5vh",
    },
    paddingX: {
      xs: "7vh",
      sm: "1.5vh",
      lg: "3vh", // Reduced horizontal padding
    },
    lineHeight: {
      xs: "6vh",
      lg: "10vh",
    },
    borderRadius: "5vh",
  },
  Tierheading: {
    fontWeight: "600",
    display: "block", // Ensure it's treated as a block element
    margin: "0 auto", // Centers the box horizontally
    textAlign: "center", // Centers the text inside the box
    width: {
      sm: "98%",
      lg: "38.5vh",
    },
    fontSize: {
      xs: "3.5vh",
      sm: "1.8vh",
      lg: "3vh",
    },
    padding: {
      sm: "1.5vh 0",
      lg: "2vh 0vh",
    }
  },

  TiericonText: {
    display: "flex",
    justifyContent: "space-between",
    padding: {
      xs: "2.3vh",
      sm: "2vh",
      lg: "1.5vh 2.5vh",
    },
  },
  Module: {
    fontSize: {
      xs: "2vh",
      sm: "2vh",
      lg: "2.4vh",
    },
    fontWeight: "500",
    color: "#4A4A4A"
  }
}
