import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const SectionsBox = () => {
  return (
    <>
      <Box sx={style.boxsection}>
        <Typography sx={{
          fontSize: {
            lg: "3vh",
          },
          fontWeight: "700",
        }}>
          Join Live Interactive Online Classes with Our Certified Tutors!
        </Typography>
        <Box>
          <Button variant="contained" sx={style.containedBtn}>
            Read More
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default SectionsBox

const style = {
  boxsection: {
    height: "12vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: "1.5vh",
    background: "#E7F6FF",
    boxShadow: "0px 2px 1px 0px rgba(0, 0, 0, 0.05), 0px -3px 8px 0px rgba(56, 182, 255, 0.20)",
    backdropFilter: "blur(5px)",
  },
  containedBtn: {
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
    fontSize: "2vh",
    fontWeight: 700,
    paddingY: "2vh",
    margin: "0 4vh",
    textTransform: "none",
    borderRadius: "10px",
    width: {
      xs: "100%",
      sm: "100%",
      md: "100%",
      lg: "auto",
    },
  },
}
