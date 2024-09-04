import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import elpse1 from '../../../public/assets/images/svg/elpse-white1.svg'
import elpse2 from '../../../public/assets/images/svg/elpse-white2.svg'
const ReviewBlog = ({data}: any) => {
  return (
    <>
      <Box sx={{
        margin: "0 7vh",
        height: "45vh",
        position: "relative"
      }}>
        <Typography sx={style.reviewheading}>
          {data.header}
        </Typography>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Typography sx={style.reviewdeesc}>
           {data.paragraph}
          </Typography>
          <Box>
            <Button variant="contained" sx={style.containedBtn}>
              Read More
            </Button>
          </Box>
        </Box>

        <Box sx={{
          position: "absolute",
          right: 20,
          top: 20,
        }}>
          <Image src={elpse1} alt='elpse' />
        </Box>
        <Box sx={{
          position: "absolute",
          right: 0,

        }}>
          <Image src={elpse2} alt='elpse' style={{ height: "14vh" }} />
        </Box>
      </Box>
    </>
  )
}

export default ReviewBlog

const style = {
  reviewheading: {
    fontSize: {
      lg: "6vh",
    },
    lineHeight: {
      lg: "7vh",
    },
    width: {
      lg: "145vh",
    },
    height: {
      lg: "10vh",
    },
    fontWeight: 700,
  },

  reviewdeesc: {
    padding: "8vh 0 5vh 0",
    fontSize: {
      lg: "2.5vh",
    },
    lineHeight: {
      lg: "5vh",
    },
    width: {
      lg: "130vh",
    },
    height: {
      lg: "7vh",
    },
    fontWeight: 400,
  },

  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontSize: "2vh",
    fontWeight: 700,
    paddingY: "2vh",
    margin: "5vh 20vh 0 0",
    paddingX: "4vh",
    textTransform: "none",
    borderRadius: "10px",
    width: {
      xs: "100%", // Full width on mobile
      sm: "100%",
      md: "100%",
      lg: "auto", // Auto width on larger screens
    },
  },
}