import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import img1 from '../../../public/assets/images/svg/Live-icon.svg'
import img2 from '../../../public/assets/images/svg/Record-icon.svg'
import img3 from '../../../public/assets/images/svg/Discussion-icon.svg'
import img4 from '../../../public/assets/images/svg/customize-icon.svg'
import img5 from '../../../public/assets/images/svg/progress-icon.svg'
import img6 from '../../../public/assets/images/svg/flexible-icon.svg'
import img7 from '../../../public/assets/images/svg/post-icon.svg'
import img8 from '../../../public/assets/images/svg/parental-icon.svg'
import Image from 'next/image'
const FeaturesOfTuitionals = () => {
  let Cards = [
    {
      icon: img1,
      heading: "Live interactive sessions",
      background: "#9EDCFF" // Background color for this card
    },
    {
      icon: img2,
      heading: "Recorded Classes for Review",
    },
    {
      icon: img3,
      heading: "Discussion forums and Q&A sessions",
    },
    {
      icon: img4,
      heading: "Customized Study Plans",
    },
    {
      icon: img5,
      heading: "Progress Tracking",
    },
    {
      icon: img6,
      heading: "Flexible Scheduling",
    },
    {
      icon: img7,
      heading: "Post-Test Analysis",
    },
    {
      icon: img8,
      heading: "Parental Updates",
    },
  ];

  return (
    <>
      <Box
        sx={{
          marginX: {
            xs: "2.5vh",
            sm: "2.5vh",
            lg: "7vh",
          },
        }}
      >
        <Grid container spacing={2}>
          {/* Left Box */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box>
              <Typography sx={style.featureText}>
                Features of Tuitional’s Online Classes (Vectors)
              </Typography>
            </Box>
          </Grid>

          {/* Right Box */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography sx={style.featureDesc}>
                Lorem ipsum dolor sit amet consectetur. Vivamus at sed imperdiet convallis integer. Ipsum amet ultrices praesent tellus. Pellentesque in in sollicitudin rhoncus lectus eget lectus nunc rhoncus.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{marginY:{ lg: "6vh", sm: "5vh", xs: "4vh"}}}>
          <Grid container spacing={2}>
            {
              Cards.map((item, index) => {
                return (
                  <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                    <Box
                      sx={[
                        style.cardsBoxes,
                        (item.heading === "Live interactive sessions" || item.heading === "Customized Study Plans") && {
                          paddingBottom: "9vh", // Added paddingBottom for specific cards
                          background: item.background, // Set background color
                        }
                      ]}
                    >
                      <Image src={item.icon} alt='icons' style={{height: "10vh"}}/>
                      <Typography sx={style.heading}>{item.heading}</Typography>
                    </Box>
                  </Grid>
                );
              })
            }
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default FeaturesOfTuitionals;

const style = {
  featureText: {
    fontWeight: "600",
    fontSize: {
      xs: "2.5vh",
      sm: "2vh",
      lg: "6vh",
    },
    width: {
      xs: "35vh",
      sm: "25vh",
      lg: "72vh",
    },
  },
  featureDesc: {
    fontWeight: "400",
    fontSize: {
      lg: "2.1vh",
    },
    width: {
      xs: "100vh",
      sm: "70vh",
      lg: "65vh"
    },
    lineHeight: "3vh"
  },
  heading: {
    color: "#2D2D2D",
    fontWeight: "600",
    fontSize: {
      lg: "3vh",
    }
  },
  cardsBoxes: {
    backdropFilter: "blur(5px)",
    borderRadius: "2vh",
    boxShadow: "0px -5px 15px 0px rgba(0, 0, 0, 0.20)",
    textAlign: "center",
    padding: "4vh",
  }
};
