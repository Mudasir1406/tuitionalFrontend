import { Box, Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import offer1 from '../../../public/assets/images/static/offer-img-1.png'
import offer2 from '../../../public/assets/images/static/offer-img-2.png'
import offer3 from '../../../public/assets/images/static/offer-img-3.png'
const Offer = () => {
  return (
    <Box sx={{
      margin: {
        xs: "5vh 0",
        sm: "7vh 0",
        lg: "10vh 5vh",
      },
    }}>
      <Box>
        <Typography sx={{
          fontSize: {
            xs: "4vh",
            sm: "5vh",
            md: "7vh",
            lg: "6vh",
          },
          textAlign: "center",
          fontWeight: "600",
          lineHeight: "6vh"
        }}>
          What We Offer
        </Typography>
      </Box>

      <Box sx={{
        marginX: {
          xs: "2.5vh",
          sm: "2.5vh",
          md: "2.5vh",
          lg: "2.5vh",
        }
      }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box sx={{
              background: "#9EDCFF",
              borderRadius: "2vh",
              marginY: "2vh"
            }}>
              <Box sx={{
                display: "flex",

              }}>
                <Box>
                  <Typography sx={style.coveragetext}>Comprehensive coverage of IGCSE Maths syllabus</Typography>
                  <Box sx={{ display: "flex", justifyContent: "left" }}>
                    <Button variant="contained" sx={style.containedBtn}>
                      Learn More
                    </Button>
                  </Box>
                </Box>
                <Typography sx={style.coverageImg}>
                  <Image src={offer1} alt='pic' style={{ width: "auto", height: "30vh" }} />
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2}>
              {/* Column 1 */}
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box sx={{
                  background: "#9EDCFF",
                  borderRadius: "2vh",
                  paddingBottom: {
                    sm: "3.5vh",
                    lg: "3vh",
                  },
                }}>
                  <Typography sx={style.regulartxt}>Regular assessments and feedback</Typography>
                  <Box sx={{ display: "flex", justifyContent: "left" }}>
                    <Button variant="contained" sx={style.containedBtn}>
                      Learn More
                    </Button>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Image src={offer2} alt='pic' style={{ width: "auto", height: "47vh" }} />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box sx={{
                  background: "#9EDCFF",
                  borderRadius: "2vh",
                }}>
                  <Typography sx={style.regulartxt}>Access to Resources And Practice Materials</Typography>
                  <Box sx={{ display: "flex", justifyContent: "left" }}>
                    <Button variant="contained" sx={style.containedBtn}>
                      Learn More
                    </Button>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Image src={offer3} alt='pic' style={{ width: "auto", height: "50vh" }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Grid container spacing={2}>
              {/* Column 1 */}
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box sx={{
                  background: "#9EDCFF",
                  borderRadius: "2vh",
                  paddingBottom: {
                    sm: "3.5vh",
                    lg: "2.7vh"
                  },
                  marginY: "2vh",
                }}>
                  <Typography sx={style.regulartxt}>Regular assessments and feedback</Typography>
                  <Box sx={{ display: "flex", justifyContent: "left" }}>
                    <Button variant="contained" sx={style.containedBtn}>
                      Learn More
                    </Button>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Image src={offer2} alt='pic' style={{ width: "auto", height: "47vh" }} />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box sx={{
                  background: "#9EDCFF",
                  borderRadius: "2vh",
                  marginY: "2vh",
                }}>
                  <Typography sx={style.regulartxt}>Access to Resources And Practice Materials</Typography>
                  <Box sx={{ display: "flex", justifyContent: "left" }}>
                    <Button variant="contained" sx={style.containedBtn}>
                      Learn More
                    </Button>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Image src={offer3} alt='pic' style={{ width: "auto", height: "49.5vh" }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{
              background: "#9EDCFF",
              borderRadius: "2vh",
              marginX: {
                sm: "1vh",
                lg: "0vh"
              }
            }}>
              <Box sx={{
                display: "flex",

              }}>
                <Box>
                  <Typography sx={style.coveragetext}>Comprehensive coverage of IGCSE Maths syllabus</Typography>
                  <Box sx={{ display: "flex", justifyContent: "left" }}>
                    <Button variant="contained" sx={style.containedBtn}>
                      Learn More
                    </Button>
                  </Box>
                </Box>
                <Typography sx={style.coverageImg}>
                  <Image src={offer1} alt='pic' style={{ width: "auto", height: "30vh" }} />
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Offer

const style = {
  coveragetext: {
    fontWeight: "600",
    fontSize: {
      xs: "1.9vh",
      sm: "2.5vh",
      lg: "3vh",
    },
    width: {
      xs: "100%",
      sm: "70%",
      lg: "70%",
    },
    paddingX: {
      xs: "3vh",
      sm: "4vh",
      lg: "4vh",
    },
    paddingTop: {
      xs: "3vh",
      sm: "4vh",
      lg: "4vh",
    },
  },
  coverageImg: {
    width: {
      xs: "50%",
      sm: "50%",
      lg: "40%",
    }
  },
  regulartxt: {
    width: {
      xs: "50%",
      sm: "45%",
      lg: "70%",
    },
    paddingX: {
      xs: "3vh",
      sm: "3vh",
      lg: "3vh",
    },
    paddingTop: {
      xs: "4vh",
      sm: "4vh",
      lg: "4vh",
    },
    fontWeight: "600",
    fontSize: {
      lg: "3vh"
    }
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontSize: "2vh",
    fontWeight: 700,
    padding: "2vh 4vh",
    margin: "2vh 4vh",
    textTransform: "none",
    borderRadius: "10px",
    width: {
      xs: "30%", // Full width on mobile
      sm: "30%",
      md: "30%",
      lg: "20vh", // Auto width on larger screens
    },
    ":hover": {
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
      backgroundColor: "#38B6FF",

    },
  },
}