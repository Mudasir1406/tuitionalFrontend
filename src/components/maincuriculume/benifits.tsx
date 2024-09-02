import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import img1 from '../../../public/assets/images/static/benifit1.png'
import img2 from '../../../public/assets/images/static/benifit2.png'
import img3 from '../../../public/assets/images/static/benifit3.png'

const Benifit = () => {
  let Benifit = [
    {
      benifit: img1,
      title: "Access to study material",
      description: "Lorem ipsum dolor sit amet consectetur. Tellus purus dictum integer ut semper porta at nunc cursus. Diam tellus volutpat risus egestas. Erat dui enim penatibus eu eu eu. At porttitor facilisis mi facilisis urna ut. At lacinia nulla dictum orci. Orci auctor ut nunc ultrices.",
    },
    {
      benifit: img2,
      title: "workshops",
      description: "Lorem ipsum dolor sit amet consectetur. Tellus purus dictum integer ut semper porta at nunc cursus. Diam tellus volutpat risus egestas. Erat dui enim penatibus eu eu eu. At porttitor facilisis mi facilisis urna ut. At lacinia nulla dictum orci. Orci auctor ut nunc ultrices.",
    },
    {
      benifit: img3,
      title: "mock exams",
      description: "Lorem ipsum dolor sit amet consectetur. Tellus purus dictum integer ut semper porta at nunc cursus. Diam tellus volutpat risus egestas. Erat dui enim penatibus eu eu eu. At porttitor facilisis mi facilisis urna ut. At lacinia nulla dictum orci. Orci auctor ut nunc ultrices.",
    },
  ]
  return (
    <>
      <Box sx={{
        margin: {
          lg: "5vh 7vh",
        }
      }}>
        <Box sx={{
          margin: {
            lg: "3vh",
          }
        }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography sx={style.benifit}>
                Benefits
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography sx={style.beniftdesc}>
                By joining our community, you gain access to a wealth of resources designed to support your learning journey. Enjoy unlimited access to high-quality study materials that cover a wide range of subjects and topics.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container>
          {
            Benifit.map((benifit, index) => (
              <Grid item xs={12} sm={4} md={4} lg={4} key={index}>
                <Box sx={style.card}>
                  <Image src={benifit.benifit} alt='' style={{ height: "40vh", width: "97%" }} />
                  <Typography sx={style.titletxt}>{benifit.title}</Typography>
                  <Typography sx={style.desc}>{benifit.description}</Typography>
                </Box>
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </>
  )
}

export default Benifit
const style = {
  benifit: {
    fontSize: {
      lg: "6vh",
    },
    fontWeight: "600",
  },
  beniftdesc: {
    fontSize: {
      lg: "2vh",
    },
    fontWeight: "400",
    width: {
      lg: "100vh",
    },
  },
  card: {
    borderRadius: "2vh",
    background: "#FFF",
    boxShadow: "0px 2px 1px 0px rgba(0, 0, 0, 0.05), 0px -3px 8px 0px rgba(0, 0, 0, 0.20);",
    backdropFilter: "blur(5px)",
  },
  titletxt: {
    textAlign: "center",
    fontSize: {
      lg: "4vh",
    },
    fontWeight: 600,
    padding: {
      lg: "2vh 0"
    },
  },
  desc: {
    fontSize: "2vh",
    width: {
      lg: "55vh",
    },
    padding: "0 3vh 3vh",
    textAlign: {
      lg: "center",
    },
  },
}