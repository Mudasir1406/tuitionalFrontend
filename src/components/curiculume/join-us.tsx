import { Box, Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import girl1 from '../../../public/assets/images/static/joinimg1.png'
import girl2 from '../../../public/assets/images/static/joinimg2.png'
import boy1 from '../../../public/assets/images/static/joinimg3.png'
import boy2 from '../../../public/assets/images/static/joinimg4.png'
const JoinUs = () => {
  return (
    <>
      <Box sx={{
        background: "#9EDCFF",
        position: "relative",
      }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh", // Ensures full height usage for centering
            }}>
              <Typography sx={style.joinhed}> Join Us Today and Be Part of the Growth!</Typography>
              <Typography sx={style.joindesc}>Our community events offer unparalleled opportunities to expand your horizons, connect with fellow learners, and engage with experts from various fields.</Typography>
              <Box>
                <Button variant="contained" sx={style.containedBtn}>
                  Enroll Now
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid >

        <Box sx={{
          position: "absolute",
          top: 30,
          left: 50,
        }}>
          <Image src={girl1} alt='' style={{ height: "30vh", width: "auto" }} />
        </Box>
        <Box sx={{
          position: "absolute",
          top: 30,
          right: 50,
        }}>
          <Image src={girl2} alt='' style={{ height: "30vh", width: "auto" }} />
        </Box>
        <Box sx={{
          position: "absolute",
          bottom: 30,
          left: 100,
        }}>
          <Image src={boy1} alt='' style={{ height: "30vh", width: "auto" }} />
        </Box>
        <Box sx={{
          position: "absolute",
          bottom: 30,
          right: 100,
        }}>
          <Image src={boy2} alt='' style={{ height: "30vh", width: "auto" }} />
        </Box>
      </Box >
    </ >
  )
}

export default JoinUs

const style = {
  joinhed: {
    fontWeight: "600",
    fontSize: {
      lg: "6vh"
    },
    width: {
      lg: "80vh"
    },
  },
  joindesc: {
    fontWeight: "600",
    fontSize: {
      lg: "2.4vh"
    },
    width: {
      lg: "125vh"
    },
    paddingY: {
      lg: "2vh"
    }
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontSize: "2vh",
    fontWeight: 700,
    paddingY: "2vh",
    marginY: "2vh",
    paddingX: "4vh",
    textTransform: "none",
    borderRadius: "10px",
    width: {
      xs: "30%", // Full width on mobile
      sm: "30%",
      md: "30%",
      lg: "100%", // Auto width on larger screens
    },
    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
    },
  },
}