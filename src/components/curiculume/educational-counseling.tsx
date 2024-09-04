import { Box, Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import counsling from '../../../public/assets/images/static/Guidence.png'

const EducationalCounseling = ({ data }: any) => {
  return (
    <div>
      <Box sx={{
        minHeight: "auto",
        marginX: {
          xs: "2vh",
          sm: "4vh",
          md: "8vh",
          lg: "13vh",
        },
        padding: {
          xs: "3vh",
          sm: "6vh",
          md: "10vh",
          // lg: "12vh 0 15vh 0",
        }
      }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box>
              <Typography sx={style.counseling}>
                Educational Counseling
              </Typography>
              <Typography sx={style.guidence}>{data?.header}</Typography>
              <Typography sx={style.desc}>{data?.paragraph}</Typography>
              <Box>
                <Button variant="contained" sx={style.containedBtn}>
                  Enroll Now
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} alignItems="end">
            <Box>
              <Image src={counsling} alt='Counseling Image' style={{
                width: "auto", height: "50vh"
              }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default EducationalCounseling

const style = {
  counseling: {
    background: "#B8E1F9",
    borderRadius: "5vh",
    width: {
      xs: "50%",
      sm: "40vh",
      md: "30vh",
      lg: "22vh"
    },
    fontSize: {
      xs: "3vh",
      sm: "2.5vh",
      md: "2.2vh",
      lg: "2vh"
    },
    paddingX: {
      xs: "3vh",
      sm: "4vh",
    },
    paddingY: {
      xs: "2vh",
      sm: "1.5vh",
    },
    color: "#1F90D1",
  },

  guidence: {
    width: {
      xs: "90%",
      sm: "80vh",
      md: "70vh",
      lg: "76vh",
    },
    fontWeight: "700",
    fontSize: {
      xs: "5vh",
      sm: "5.5vh",
      md: "6vh",
      lg: "6vh",
    },
    lineHeight: {
      xs: "6vh",
      sm: "6.5vh",
      md: "7vh",
      lg: "7vh",
    },
    paddingY: {
      xs: "2vh",
      sm: "2.5vh",
      md: "3vh",
      lg: "3vh",
    },
  },

  desc: {
    color: "#2D2D2D",
    width: {
      xs: "90%",
      sm: "75vh",
      md: "70vh",
      lg: "68vh"
    },
    fontWeight: 400,
    fontSize: {
      xs: "2vh",
      sm: "2.2vh",
      md: "2.4vh",
      lg: "2vh"
    }
  },

  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontSize: {
      xs: "1.8vh",
      sm: "2vh",
      md: "2vh",
      lg: "2vh",
    },
    fontWeight: 700,
    paddingY: {
      xs: "1.5vh",
      sm: "2vh",
    },
    marginY: "2vh",
    paddingX: {
      xs: "3vh",
      sm: "4vh",
    },
    textTransform: "none",
    borderRadius: "10px",
    width: {
      xs: "60%", // Wider on mobile
      sm: "40%",
      md: "30%",
      lg: "30%",
    },
    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
    },
  },
}