import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const IGCSMath = () => {
  return (
    <Box
      sx={{
        margin: {
          lg: "5vh 7.5vh 5vh",
        },
      }}
    >
      <Grid container spacing={2}>
        {/* Left Box */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Box sx={styles.leftBox}>
            <Typography sx={styles.IGC}>
              The IGCSE Maths Cambridge Grading Scale
            </Typography>
          </Box>
        </Grid>

        {/* Right Box */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Box sx={styles.RightBox}>
            <Typography sx={styles.desc}>
              Once you have entered into the respective Grading Scale, it is prohibited
              to switch to between 9-1 grading scale, If you have acquired the A* -G in
              the scale once the deadline has passed. If you’ve mistakenly entered into
              the grading system, then have to leave and re-enter the grading system
              before any deadline.
            </Typography>
          </Box>

        </Grid>
      </Grid>
    </Box>
  );
};

export default IGCSMath;

const styles = {
  RightBox: {
    margin: {
      lg: "0 0 0 9vh",
      sm: "0 0 0 9vh",
    },
    width: {
      lg: "90%",
    },
  },
  leftBox: {
    width: {
      sm: "100%",
      lg: "85%",
    },
  },

  IGC: {
    fontWeight: "600",
    fontSize: {
      xs: "2h",
      sm: "2.5vh",
      md: "5vh",
      lg: "6vh",
    },
    lineHeight: {
      lg: "7vh",
    },
  },
  desc: {
    fontSize: {
      xs: "2vh",
      sm: "1.5vh",
      md: "3vh",
      lg: "2vh",
    },
    lineHeight: {
      lg: "3.5vh",
    },
    textAlign: 'justify',
  },
};
