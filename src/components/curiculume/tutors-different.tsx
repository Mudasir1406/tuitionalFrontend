import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react'
import img1 from '../../../public/assets/images/svg/Provideicon1.svg'
import img2 from '../../../public/assets/images/svg/Provideicon2.svg'
import img3 from '../../../public/assets/images/svg/Granticon.svg'
import img4 from '../../../public/assets/images/svg/conducticon.svg'
import Image from 'next/image';

const TutorsDifferent = () => {
  let tutorsCard = [
    {
      icon: img1,
      desc: "Our tutors offer in-depth instruction across all CAIE subjects, ensuring students gain a thorough understanding and mastery of the curriculum.",
      heading: "We Provide Comprehensive Coverage",
    },
    {
      icon: img2,
      desc: "Our tutors offer in-depth instruction across all CAIE subjects, ensuring students gain a thorough understanding and mastery of the curriculum.",
      heading: "We Provide Comprehensive Coverage",
    },
    {
      icon: img3,
      desc: "Students benefit from a wide range of study aids and practice materials that support effective learning and thorough exam preparation.",
      heading: "We Grant Access to Extensive Resources and Practice Materials",
    },
    {
      icon: img4,
      desc: "Our realistic practice exams and detailed progress reports offer valuable insights into student performance and readiness for actual exams.",
      heading: "We Conduct Mock Exams and Provide Detailed Progress Reports",
    },
  ]
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: { lg: "15vh" },
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ width: { lg: "50%" }, margin: "0 auto" }}>
              <Typography sx={style.tutorsheading}>
                What Makes Our Cambridge IGCSE Tutors Different?
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{
        margin: {
          sm: "2vh",
          lg: "5vh",
        },
      }}>
        <Grid container spacing={2}>
          {
            tutorsCard.map((item, index) => {
              return (
                <Grid item xs={12} sm={12} md={12} lg={6} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: {
                        sm: "5vh",
                        lg: "10vh 5vh",
                      },
                      boxShadow: "0px -5px 15px 0px rgba(0, 0, 0, 0.20)",
                      backgroundColor: index === 0 ? "#9EDCFF" : "transparent", // Apply background to the first card
                      borderRadius: "2vh", // Optional: Add border radius for styling
                    }}
                  >
                    <Box>
                      <Image src={item.icon} alt='images' style={{ height: "12vh" }} />
                    </Box>
                    <Box>
                      <Typography sx={style.heading}>{item.heading}</Typography>
                      <Typography sx={style.desc}>{item.desc}</Typography>
                    </Box>
                  </Box>
                </Grid>
              )
            })
          }
        </Grid>
      </Box>

      <Box sx={{ marginTop: "auto", marginBottom: "10vh", display: "flex", justifyContent: "center" }}>
        <Button variant="contained" sx={style.containedBtn}>
          Get Team Plan
        </Button>
      </Box>
    </>
  )
}

export default TutorsDifferent;

const style = {
  tutorsheading: {
    fontWeight: "600",
    fontSize: { xs: "3vh", lg: "6vh" },
    textAlign: "center",
    lineHeight: "7vh"
  },
  heading: {
    fontWeight: "600",
    fontSize: {
      xs: "1.8vh",
      sm: "2.3vh",
      lg: "3vh",
    },
    paddingX: {
      sm: "3vh",
      lg: "0",
    }
  },
  desc: {
    fontWeight: "400",
    fontSize: {
      xs: "2vh",
      sm: "2vh",
      lg: "1.8vh",
    },

  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontSize: "2vh",
    fontWeight: 700,
    paddingY: "2vh",
    marginY: "2vh",
    marginX: "7vh",
    paddingX: "4vh",
    textTransform: "none",
    borderRadius: "10px",
    width: {
      xs: "30%", // Full width on mobile
      sm: "30%",
      md: "30%",
      lg: "15%", // Auto width on larger screens
    },
    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",

    },
  },
}
