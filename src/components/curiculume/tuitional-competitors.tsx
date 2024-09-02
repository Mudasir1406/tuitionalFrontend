import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import logo from '../../../public/assets/images/static/logo.png';
import Noicon from '../../../public/assets/images/svg/Noicon.svg';
import Yesicon from '../../../public/assets/images/svg/Yesicon.svg';

const TuitionalCompetitors = () => {
  return (
    <>
      <Box>
        <Typography sx={style.tutuional}>Tuitional vs Competitors</Typography>
        <Typography sx={style.tutuionalDesc}>
          Explore a detailed comparison between Tuitional and other education providers in this field. Our comparison chart highlights key differences and advantages across various aspects of educational services, helping you make an informed decision.
        </Typography>
      </Box>

      <Box
        sx={{
          background: "#FFF",
          backdropFilter: "blur(5px)",
          borderRadius: "2vh",
          boxShadow: "0px -5px 15px 0px rgba(0, 0, 0, 0.20)",
          marginX: {
            lg: "4vh",
          },
          marginY: {
            lg: "4vh",
          },
          padding: '16px', // Adjust padding as needed to avoid overflow
          overflow: 'hidden' // Ensures that the content doesn't overflow outside the Box
        }}
      >
        <Grid container spacing={2} sx={{ padding: 0, margin: 0, overflow: 'hidden' }}>
          {/* First Row */}
          <Grid item xs={12} sm={4} md={4} lg={4} sx={{ borderBottom: '1px solid #ccc' }}></Grid> {/* Empty column */}
          <Grid item xs={12} sm={4} md={4} lg={4} sx={{ textAlign: "center", borderBottom: '1px solid #ccc' }}>
            <Typography>
              <Image src={logo} alt="logo" style={{ width: "auto", height: "5vh" }} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} sx={{ textAlign: "center", borderBottom: '1px solid #ccc' }}>
            <Typography sx={style.other}>
              Other Education Providers
            </Typography>
          </Grid>

          {/* Remaining Rows */}
          {[...Array(8)].map((_, index) => (
            <React.Fragment key={index}>
              {/* First column with text */}
              <Grid item xs={12} sm={4} md={4} lg={4} sx={{ borderBottom: '1px solid #ccc', padding: 0 }}>
                <Typography sx={style.tutionalcol1}>
                  {[
                    '1-1 Tailored Personalized Learning',
                    'Live Simulation Based Interactive Classes',
                    'Global Mentorship Program',
                    'Free Career Counseling',
                    'Access to Extensive Study Material',
                    'Workshops & Webinars',
                    'Availability of Recorded Lessons',
                    'Mock Exams'
                  ][index]}
                </Typography>
              </Grid>

              {/* Middle column with Yes icon */}
              <Grid item xs={12} sm={4} md={4} lg={4} sx={{ textAlign: "center", borderBottom: '1px solid #ccc', padding: 0 }}>
                <Typography>
                  <Image src={Yesicon} alt="yes icon" style={{ width: "auto", height: "5vh" }} />
                </Typography>
              </Grid>

              {/* Last column with dynamic No/Yes icon based on the row index */}
              <Grid item xs={12} sm={4} md={4} lg={4} sx={{ textAlign: "center", borderBottom: '1px solid #ccc', padding: 0 }}>
                <Typography>
                  <Image
                    src={[0, 1, 3, 4].includes(index) ? Noicon : Yesicon}
                    alt={[0, 1, 3, 4].includes(index) ? "no icon" : "yes icon"}
                    style={{ width: "auto", height: "5vh" }}
                  />
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>

      </Box>

    </>
  )
}

export default TuitionalCompetitors;

const style = {
  tutuional: {
    fontWeight: "600",
    fontSize: { lg: "6vh" },
    textAlign: "center",
  },
  tutuionalDesc: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: { lg: "2.2vh" },
    width: { lg: "73%" },
    margin: "0 auto",
    paddingY: { lg: "3vh" }
  },
  tutionalcol1: {
    paddingX: { lg: "4vh" },
    fontWeight: "400",
    fontSize: { lg: "2.5vh" },
    lineHeight: { lg: "6vh" },
  },
  other: {
    fontWeight: "400",
    fontSize: { lg: "4vh" }
  },
};
