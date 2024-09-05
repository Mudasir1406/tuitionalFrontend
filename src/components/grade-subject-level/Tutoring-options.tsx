import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';

interface Options {
  Header: any;
  Paragraph: string;
  SubjectsArray: any;
}

const TutoringOptions = ({ data }: any) => {
  return (
    <>
      <Box sx={{ margin: { xs: "4vh", md: "7vh" } }}>
        <Typography sx={style.title}>
          {data?.Header}
        </Typography>
        <Typography sx={style.description}>
          {data?.Paragraph}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Grid container spacing={2} sx={{ maxWidth: { xs: '100%', sm: '100%', lg: '170vh' }, margin: { xs: "2vh auto", md: "4vh auto" } }}>
            {data?.SubjectsArray.map((button: { backgroundColor: string; name: string; }, index: React.Key | null | undefined) => (
              <Grid item xs={6} sm={6} key={index}>
                <Button
                  sx={{
                    backgroundColor: index === 0 ? button.backgroundColor : '#FFFFFF',
                    color: '#2D2D2D',
                    width: '100%',
                    borderRadius: { xs: '3vh', md: index === 0 ? '5vh' : '50px' },
                    padding: { xs: '10px', sm: '14px', lg: '16px' },
                    textAlign: 'center',
                    fontSize: { xs: "1.2vh", md: "2vh" },
                    fontWeight: 500,
                  }}
                >
                  {button.name}
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
      xs: "100%", // Mobile view
      sm: "100%", // Tablet view
      md: "100%", // Laptop view
      lg: "92vh", // Desktop view
    },
    fontSize: {
      xs: "3vh",
      sm: "5vh",
      md: "5.5vh",
      lg: "6vh",
    },
    fontWeight: 600,
    textAlign: { xs: "center", md: "left" },
    marginBottom: { xs: "2vh", md: "3vh" },
  },
  description: {
    color: "#2D2D2D",
    width: {
      xs: "100%",
      sm: "100%",
      md: "100%",
      lg: "190vh",
    },
    fontSize: {
      xs: "1.8vh",
      sm: "2vh",
      md: "2vh",
    },
    fontWeight: 400,
    textAlign: { xs: "justify", md: "left", lg: "left" },
    marginBottom: { xs: "2vh", md: "4vh" },
  }
};
