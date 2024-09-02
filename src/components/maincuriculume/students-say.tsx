import { Box, Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import iconsay from '../../../public/assets/images/svg/sayicon.svg'
import saystar from '../../../public/assets/images/svg/sayStar.svg'
import line from '../../../public/assets/images/svg/Linesay.svg'
import image from '../../../public/assets/images/svg/sayimage.svg'
const StudentsSay = () => {
  return (
    <>
      <Box sx={{
        height: {
          lg: "100vh",
          margin: "10vh 0 0 7vh",
        }
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} md={5} lg={5}>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Centers vertically
              position: "relative",
              height: "80vh", // Ensure the box takes the full viewport height
            }}>
              <Box sx={{
                padding: "5vh 6.5vh 6.5vh",
              }}>
                <Typography sx={style.saytext}>
                  What are
                  Students Says!
                </Typography>
                <Typography sx={style.saydesc}>Listen to the incredible experiences
                  shared by our students! Register now
                  to unlock an enriching world of
                  enjoyable learning
                </Typography>
                <Box>
                  <Button variant="contained" sx={style.containedBtn}>
                    Write a review
                  </Button>
                </Box>
              </Box>

              <Box sx={{
                position: "absolute",
                top: 80,

              }}>
                <Image src={iconsay} alt='' />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={7} md={7} lg={7}>
            <Box sx={style.blueBox}>
              <Box sx={style.aquabox}>
                <Box sx={style.boxWhite}>
                  <Typography sx={{
                    background: "#E9B93D",
                    borderRadius: "10vh",
                    width: "7vh",
                    padding: "1vh",
                    color: "#FFF",
                    fontSize: "2vh",
                  }}>
                    <Image src={saystar} alt='' style={{ height: "2vh" }} />
                    <span>0.5</span>
                  </Typography>
                  <Typography sx={style.saystardesc}>
                    The teachers explain to my level, they are always asking me if I ma able to understand the concepts. My chemistry teacher is really good and they physics teacher gives really good real life exam ples. I am actually understanding and I feel like I am actually learning.
                  </Typography>
                  <Box sx={style.lineimge}>
                    <Image src={line} alt='line' style={{ width: "63vh" }} />
                  </Box>

                  <Box sx={style.imgtext}>
                    <Box>
                      <Image src={image} alt='circle' style={{ width: "9vh", height: "9vh" }} />
                    </Box>
                    <Box sx={{
                      padding: "0.5vh 0 0 0"
                    }}>
                      <Typography sx={style.ayadi}>Fatima Ayadi</Typography>
                      <Typography sx={style.uae}>Sharjah, UAE</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </>
  )
}

export default StudentsSay

const style = {
  saydesc: {
    fontSize: {
      lg: "2.2vh",
    },
    fontWeight: 400,
    width: {
      lg: "38vh",
    },
  },
  saytext: {
    width: {
      lg: "45vh",
    },
    fontSize: {
      lg: "5.5vh",
    },
    fontWeight: 600,
  },
  saystardesc: {
    width: {
      lg: "70vh",
    },
    fontSize: {
      lg: "3vh",
    },
    lineHeight: {
      lg: "5vh",
    },
    fontWeight: 400,
  },
  boxWhite: {
    padding: "7vh",
    background: "#FFF",
    boxShadow: "0px -3px 8px 0px rgba(56, 182, 255, 0.20)", // Shadow on the left side
    filter: "drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.05))",
    backdropFilter: "blur(5px)",
    margin: "0 0 0 6vh",
    width: {
      lg: "70vh",
    },
    height: {
      lg: "70vh",
    },
  },
  aquabox: {
    margin: "0 0 0 4vh",
    width: {
      lg: "88vh",
    },
    height: {
      lg: "80vh",
    },
    background: "#E8F6FF",
    boxShadow: "-8px 0px 8px rgba(0, 0, 0, 0.08)", // Shadow on the left side
  },
  blueBox: {
    background: "#BEE7FF",
    width: {
      lg: "92vh",
    },
    height: {
      lg: "77vh",
    },
    boxShadow: "-8px 0px 8px rgba(0, 0, 0, 0.08)", // Shadow on the left side
  },
  imgtext: {
    display: "flex",
    margin: "5vh 0 0 0",
  },
  lineimge: {
    margin: {
      lg: "15vh 0 0 0",
    }
  },
  ayadi: {
    fontSize: "3vh",
    fontWeight: 500,
  },
  uae: {
    fontSize: "2.2vh",
    fontWeight: 400,
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontSize: "2vh",
    fontWeight: 700,
    padding: "2vh 4vh",
    marginY: "2vh",
    textTransform: "none",
    borderRadius: "10px",
    width: {
      xs: "100%", // Full width on mobile
      sm: "100%",
      md: "100%",
      lg: "40%", // Auto width on larger screens
    },
    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",
      width: {
        xs: "100%", // Full width on hover for mobile
        lg: "100%", // Full width on hover for laptop
      },
    },
  },
};
