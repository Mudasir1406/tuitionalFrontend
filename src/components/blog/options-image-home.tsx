import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
const OptionsImageHome = () => {
  return (
    <>
      <Box sx={{
        margin: {
          lg: "0 7vh",
          xs: "0 2vh"
        }
      }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box sx={styles.homeblogbox}>
              <Typography sx={styles.homeblog}>  Home &gt; <span style={{ color: "#38B6FF" }}>Blog</span> </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={2.5} sm={2} md={2} lg={1.2}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>All</Typography>
            </Box>
          </Grid>
          <Grid item xs={6.5} sm={4} md={4} lg={1.8}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>Applying for University</Typography>
            </Box>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={1.5}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>Efficiency</Typography>
            </Box>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={1.5}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>Exam Tips</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={4} lg={1.8}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>IB - Understanding IT</Typography>
            </Box>
          </Grid>
          <Grid item xs={3} sm={2} md={2} lg={1.2}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>IB CASl</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={1.5}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>IB Extended Essay</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={1.5}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>IB Lanterna Courses</Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container sx={{ margin: { lg: "2vh 0" } }}>
          <Grid item xs={7} sm={5} md={5} lg={2}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>IB Theory of Knowledge</Typography>
            </Box>
          </Grid>
          <Grid item xs={3} sm={2} md={2} lg={1.5}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>IGCSE</Typography>
            </Box>
          </Grid>
          <Grid item xs={4} sm={2} md={2} lg={1.5}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>Most Popular</Typography>
            </Box>
          </Grid>
          <Grid item xs={5} sm={3} md={3} lg={1.5}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>Plan for Success</Typography>
            </Box>
          </Grid>
          <Grid item xs={3} sm={2} md={2} lg={1.5}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>Quick Fix</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={1.5}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>Retaking IB Exams</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={1.5}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>Revision Skills</Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={6} sm={4} md={4} lg={1.5}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>Student Self Care</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={4} lg={1.5}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>Study Skills</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={4} lg={1.5}>
            <Box sx={styles.optionBox}>
              <Typography sx={styles.options}>Uncategorized</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default OptionsImageHome

const styles = {
  homeblogbox: {
    background: "#E7F6FF",
    boxShadow: "0px 2px 1px 0px rgba(0, 0, 0, 0.05), 0px -3px 8px 0px rgba(56, 182, 255, 0.20) inset",
    backdropFilter: "blur(5px)",
    borderRadius: "1vh",
    height: { lg: "8vh", xs: "auto", sm: "5vh" },
    margin: { lg: "5vh 0", xs: "6vh 0" }
  },
  homeblog: {
    textAlign: "center",
    padding: { lg: "1.8vh 0 0 0", sm: "1vh 0 0 0" },
    fontSize: {
      lg: "3vh",
      xs: "1.6vh",
    },
    fontWeight: 500,
    color: "#2D2D2D"
  },
  optionBox: {
    background: "#FFF",
    boxShadow: "0px -1px 4px 0px rgba(0, 0, 0, 0.15) inset",
    borderRadius: "5vh",
    padding: "2vh 0",
  },
  options: {
    textAlign: "center",
    fontSize: {
      lg: "2vh",
      xs: "1.6",
    },
    fontWeight: 600,
    color: "#2D2D2D"
  }
}