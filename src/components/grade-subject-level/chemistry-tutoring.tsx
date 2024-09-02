import { Box, Button, Grid, Icon, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import tutors from '../../../public/assets/images/static/tutoring.png'
import icon from '../../../public/assets/images/svg/blueminusicon.svg'
const ChemistryTutoring = () => {

  let Boxes = [
    {
      title: "Highly Qualified Chemistry Tutors",
      description: "Our tutors are experts in Cambridge IGCSE Chemistry 0971, providing specialized and focused support",
      minus: icon,
    },
    {
      title: "Strong Foundation in Chemistry Fundamentals",
      description: " Our tutors Focus on core concepts to build a solid understanding and strong foundation in Chemistry.",
      minus: icon,
    },
    {
      title: "IGCSE Personalized Classes",
      description: "Tailored to meet individual Student Needs and Learning Styles",
      minus: icon,
    },
    {
      title: "Use of 3D simulations",
      description: "Our tutors are experts in Cambridge IGCSE Chemistry 0971, providing specialized and focused support",
      minus: icon,
    },
    {
      title: "Average 11,500+ Tutoring Hours Provided",
      description: " Our tutors are experts in Cambridge IGCSE Chemistry 0971, providing specialized and focused support",
      minus: icon,
    },
    {
      title: "Highly Qualified Chemistry Tutors",
      description: " Our tutors are experts in Cambridge IGCSE Chemistry 0971, providing specialized and focused support",
      minus: icon,
    },
  ]
  return (
    <>
      <Box sx={{ margin: "7vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box>
              <Typography sx={style.tutorheading}>
                Why Our Cambridge <span style={{ color: '#38B6FF' }}>IGCSE Chemistry Tutoring</span> is Different?
              </Typography>
              <Box sx={{ my: 2 }}>
                <Image src={tutors} alt='image' style={{ height: "70vh", width: "72vh" }} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',  // Center the button horizontally
                  width: '100%',  // Ensure the Box takes full width of Grid item
                  mt: 2  // Margin top to separate button from other content
                }}
              >
                <Button
                  sx={{
                    backgroundColor: "#38B6FF",
                    color: "#FFFFFF",
                    width: '50%',  // Button width
                    height: '8.5vh', // Button height
                    borderRadius: "2vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Schedule Your Chemistry Demo!
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Grid container spacing={2}>
              {Boxes.map((box, index) => (
                <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                  <Box sx={style.boxes}>
                    <Box>
                      <Typography sx={style.titlebox}>{box.title}</Typography>
                      <Typography sx={style.desc}>{box.description}</Typography>
                    </Box>
                    <Box>
                      <Image src={box.minus} alt={box.title} style={{ height: "12vh", width: "6vh" }} />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ChemistryTutoring

const style = {
  tutorheading: {
    fontSize: {
      lg: "5.5vh"
    },
    width: {
      lg: "72vh"
    },
    fontWeight: 600,
  },
  boxes: {
    height: "10vh",
    padding: 3,
    display: "flex",
    justifyContent: "space-between",
    background: "#D3EFFF",
    boxShadow: "0px -5px 15px 0px rgba(56, 182, 255, 0.20)",
    backdropFilter: "blur(5px)",
    borderRadius: "2vh",
  },
  titlebox: {
    marginBottom: 1,
    fontSize: {
      lg: "2.4vh",
    },
    fontWeight: 600,
  },
  desc: {
    fontSize: {
      lg: "2vh",
    },
    fontWeight: 400,
    width: {
      lg: "72.5vh"
    }
  }
}