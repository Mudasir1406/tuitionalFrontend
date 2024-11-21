import { Box, Button, colors, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import btnimg from '../../../public/assets/images/svg/buttonimg.svg'
import leftimg from '../../../public/assets/images/static/bloglefticons.png'
import rightimg from '../../../public/assets/images/static/blogrighticons.png'
import lefticon from '../../../public/assets/images/static/Ellipseblogleft.png'
import righticon from '../../../public/assets/images/static/Ellipseblogright.png'
import bloglogo from '../../../public/assets/images/svg/marioarrow.svg'

const Hero = () => {
  return (
    <>
      <Box
        sx={{
          background: "#D6F0FF",
          padding: { lg: "30vh 0 0 0", xs: "20vh 0 0 0" },
          position: "relative",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box sx={styles.PopularBlog}>
              <Button variant="contained" sx={styles.containedBtn}>
                Popular Blog
              </Button>
              <Typography sx={styles.august}>August 15, 2024</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography sx={styles.UnlockingText}>
                Unlocking The Secrets to Effective Online Learning
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={styles.Mario}>
                <Image src={btnimg} alt="" style={{ width: "5vh", height: "auto" }} />
                <Typography sx={styles.MarioText}>Mario Amadeo</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", padding: "" }}>
              <Box
                sx={{
                  backgroundImage: `url(${leftimg.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: { lg: '25vh', xs: "25vh" },
                  width: { lg: '36vh', xs: "100%", sm: "100%", md: "100%" },
                }}>

              </Box>
              <Box
                sx={{
                  backgroundImage: `url(${rightimg.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: { lg: '25vh', xs: "25vh" },
                  width: { lg: '36vh', xs: "100%", sm: "100%", md: "100%" },
                }}>
              </Box>
            </Box>

            <Box sx={{
              position: "absolute",
              top: { lg: 150, xs: 190, sm: 200, md: 190 },
              left: { lg: 150, xs: 30, sm: 100, md: 90 },
              backgroundImage: `url(${lefticon.src})`,
              backgroundSize: 'cover',
              height: { lg: '10vh', xs: "5vh" },
              width: { lg: '10vh', xs: "5vh", sm: "100%", md: "100%" },
            }}>
            </Box>
            <Box sx={{
              position: "absolute",
              top: { lg: 150, xs: 370, sm: 210, md: 190, },
              right: { lg: 100, xs: 30, sm: 50 },
              backgroundImage: `url(${righticon.src})`,
              backgroundSize: 'cover',
              height: { lg: '10vh', xs: "5vh" },
              width: { lg: '10vh', xs: "5vh", sm: "100%", md: "100%" },
            }}>
            </Box>
            <Box sx={{
              position: "absolute",
              top: { lg: 390, xs: 390, md: 560, sm: 540, },
              left: { lg: 440, xs: 67, sm: 180, md: 400 },
              backgroundImage: `url(${bloglogo.src})`,
              backgroundSize: 'cover',
              height: { lg: '9vh', xs: "6.5vh" },
              width: { lg: '9vh', xs: "5.6vh", sm: "100%", md: "100%" },
            }}>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Hero

const styles = {
  UnlockingText: {
    padding: { lg: "auto", xs: "4vh 0" },
    textAlign: {
      lg: "center",
      xs: "center"
    },
    width: {
      lg: "150vh",
      xs: "45vh",
    },
    fontSize: {
      lg: "7.5vh",
      xs: "4vh"
    },
    fontWeight: 800,
  },
  PopularBlog: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem"
  },
  august: {
    fontSize: {
      lg: "2.4vh",
      xs: "1.6vh",
    },
    color: "#2D2D2D",
    fontWeight: 500,
  },
  Mario: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    border: "1px solid #38B6FF",
    borderRadius: "5vh",
    width: {
      xs: "22vh",
      lg: "33vh",
    },
    height: {
      xs: "7vh",
      lg: "8vh",
    },
    margin: {
      lg: "6vh 0 0 0"
    }
  },
  MarioText: {
    fontSize: {
      xs: "1.6vh",
      lg: "2.4vh",
    },
    color: "#2D2D2D",
    fontWeight: 500,
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontSize: { lg: "2vh", xs: "1.6vh" },
    fontWeight: 700,
    paddingX: "4vh",
    paddingY: "2vh",
    marginY: "2vh",
    textTransform: "none",
    borderRadius: "5vh",
    width: {
      xs: "37%",
      sm: "25%",
      md: "20%",
      lg: "11%",
    },
    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
    },
  },
}
