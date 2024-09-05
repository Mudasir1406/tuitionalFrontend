import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const FindingCambridge = ({ data }: any) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: {
          sm: "100%",
          xs: "100%",
          lg: "100%",
        },
        margin: {
          sm: "2vh 4vh",
          xs: "2vh 2vh",
          lg: "0",
        },
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '145vh', textAlign: 'center' }}>
        <Typography sx={style.finding}>
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
            height: 'auto',
            width: '95%',
            maxWidth: '100%',
            margin: '4vh 1.5vh 0 1.5vh',
            flexDirection: 'row',
          }}
        >
          <TextField
            placeholder="Mobile Number with Country Code"
            sx={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0px -5px 15px 0px rgba(0, 0, 0, 0.20), 0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
              width: {
                xs: '60%',
                lg: '60%',
              },
              borderRadius: "2vh 0 0 2vh",
              paddingRight: '1vh',
            }}
          />
          <Button
            sx={{
              backgroundColor: "#38B6FF",
              color: "#FFFFFF",
              width: {
                xs: '40%',
                lg: '40%',
              },
              height: {
                xs: "auto",
                sm: "6vh",
                lg: "8vh",
              },
              borderRadius: "0 2vh 2vh 0",
              border: 'none',
              ':hover': {
                backgroundColor: '#2694D6',
              },
              fontSize: {
                xs: "1.5vh",
                lg: "auto",
              }
            }}
          >
            {data?.ButtonText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FindingCambridge;

const style = {
  finding: {
    fontSize: {
      xs: "3.5vh",
      lg: "4vh",
    },
    fontWeight: 600,
    textAlign: "center",
    padding: {
      xs: "1vh 0",
      lg: "2vh 0 0 0",
    },
  },
  description: {
    fontSize: {
      xs: "2vh",
      lg: "2.2vh",
    },
    fontWeight: 400,
    textAlign: {
      xs: "justify",
      lg: "center",
    },
    padding: {
      xs: "1.5vh 0",
      lg: "2vh 0",
    },
    color: "#2D2D2D",
  },
};
