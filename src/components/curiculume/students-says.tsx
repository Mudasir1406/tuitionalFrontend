import React from "react";
import { Box, Card, CardMedia, Typography, Grid } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";

import poster1 from "../../../public/assets/images/static/thumbile.webp";
import poster2 from "../../../public/assets/images/static/thumbile2.webp";
import poster3 from "../../../public/assets/images/static/thumbile3.webp";
import poster4 from "../../../public/assets/images/static/thumbile4.webp";

const StudentSays = () => {
  const posters = [poster1, poster2, poster3, poster4]; // Array of poster images

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.heading} className={leagueSpartan.className}>
        What Our Students Says
      </Typography>
      <Typography sx={styles.desc}>
        Lorem ipsum dolor sit amet consectetur. Amet morbi sit suspendisse dui
        ut donec vel id. Viverra urna cras nulla elementum. Risus orci dolor
        euismod in fringilla adipiscing eu condimentum.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Grid container spacing={2}>
            {posters.map((poster, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card>
                  <CardMedia
                    component="video"
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    controls
                    poster={poster.src} // Use each poster image
                    sx={{
                      width: { xs: "100px", lg: "100%" },
                      height: { xs: "75px", lg: "50vh" },
                      borderRadius: "10px",
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentSays;

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    background: "#9EDCFF",
    padding: "7vh 0",
  },
  desc: {
    width: "139vh",
    fontSize: {
      xs: "35px",
      sm: "40px",
      md: "55px",
      lg: "2vh",
    },
    fontWeight: 600,
    lineHeight: {
      xs: "45px",
      sm: "50px",
      md: "65px",
      lg: "150%",
    },
    textAlign: {
      xs: "center",
      sm: "center",
      md: "start",
      lg: "center",
    },
    padding: "3vh 0",
  },
  heading: {
    fontSize: {
      xs: "35px",
      sm: "40px",
      md: "55px",
      lg: "5.5vh",
    },
    fontWeight: 600,
    lineHeight: {
      xs: "45px",
      sm: "50px",
      md: "65px",
      lg: "6.5vh",
    },
    textAlign: {
      xs: "center",
      sm: "center",
      md: "start",
      lg: "start",
    },
  },
};
