import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';

const TutoringOptions = () => {
  const buttons = [
    {
      text: 'IGCSE Mathematics - 0580	(Core) Tutoring',
      backgroundColor: 'rgba(56, 182, 255, 0.35)',
    },
    {
      text: 'IGCSE Mathematics - International - 0607	(Core) Tutoring',
    },
    {
      text: 'IGCSE Mathematics (9-1) - 0980	(Core) Tutoring',
    },
    {
      text: 'IGCSE Mathematics (US) - 0444	(Core) Tutoring',
    },
  ];

  return (
    <>
      <Box sx={{ margin: "7vh" }}>
        <Typography sx={style.title}>
          The IGCSE Maths Cambridge Subject Tutoring Options
        </Typography>
        <Typography sx={style.description}>
          Once you have entered into the respective Grading Scale, it is prohibited to switch to between 9-1 grading scale, If you have acquired the A* - Once you have entered into the respective Grading Scale, it is prohibited to switch to between 9-1 grading scale, If you have acquired the A* -G in the scale once the deadline has passed. If you’ve mistakenly entered into the grading system, then have to leave and re-entered the grading system before any deadline.G in the scale once the deadline has passed. If you’ve mistakenly entered into the grading system, then have to leave and re-entered the grading system before any deadline.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column', // Stack the rows vertically
          }}
        >
          <Grid container spacing={2} sx={{ maxWidth: '170vh', margin: "4vh auto" }}>
            {buttons.map((button, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Button
                  sx={{
                    backgroundColor: index === 0 ? button.backgroundColor : '#FFFFFF',
                    color: '#000000', // Text color
                    width: '100%',
                    borderRadius: index === 0 ? '5vh' : '50px', // Apply border-radius conditionally
                    padding: '16px',
                    textAlign: 'center',
                    boxShadow: index > 0 ? '0px -1px 10px 0px rgba(0, 0, 0, 0.15)' : 'none', // 
                    fontSize: "2.2vh",
                    fontWeight: 600,
                  }}
                >
                  {button.text}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default TutoringOptions;

const style = {
  title: {
    width: {
      lg: "92vh",
    },
    fontSize: {
      lg: "6vh",
    },
    fontWeight: 600,
  },
  description: {
    width: {
      lg: "190vh"
    },
    fontSize: {
      lg: "2vh",
    },
    fontWeight: 400,
  }
}
