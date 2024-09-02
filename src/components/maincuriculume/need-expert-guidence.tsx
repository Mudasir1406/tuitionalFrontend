import { Box, Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import need from '../../../public/assets/images/svg/Need.svg'
const NeedExpertGuidence = () => {
  return (
    <>
      <Box style={{
        borderRadius: "1vh",
        background: "#E7F6FF",
        boxShadow: "0px 2px 1px 0px rgba(0, 0, 0, 0.05), 0px -3px 8px 0px rgba(56, 182, 255, 0.20)",
        backdropFilter: "blur(5px)",
        height: "18vh",
        margin: "0 0 5vh 0"
      }}>
        <Grid container>
          <Grid item xs={12} md={12} sm={12} lg={12}>
            <Box sx={style.needBox}>
              <Typography><Image src={need} alt='icon' style={{ width: "13vh", height: "13vh", }} /></Typography>
              <Box sx={{ padding: "2vh 0 0 0" }}>
                <Typography sx={style.needheding}>Need Expert Guidance? Book Your Free Academic Consultation!</Typography>
                <Typography sx={style.desc}>Connect with our education specialists today and discover how we can help you achieve your academic goals. Spaces are filling up fast!</Typography>
              </Box>
              <Box>
                <Button variant="contained" sx={style.containedBtn}>
                  Get in touch
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box >
    </>
  )
}

export default NeedExpertGuidence

const style = {
  needBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
  },
  needheding: {
    fontWeight: 500,
    fontSize: "3.6vh",
  },
  desc: {
    width: {
      lg: "105vh",
    },
    fontSize: "2.4vh",
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
      xs: "100%", // Full width on mobile
      sm: "100%",
      md: "100%",
      lg: "100%", // Auto width on larger screens
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
}