import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
const FindingCambridge = ({ data }: any) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
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
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '15vh',
            width: '100%',
            maxWidth: '100%',
            marginTop: '4vh',
          }}
        >
          <TextField
            placeholder="Mobile Number with Country Code"
            sx={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0px -5px 15px 0px rgba(0, 0, 0, 0.20), 0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
              width: '100%',
              borderRadius: "2vh",
              paddingRight: '7vw',
            }}
          />
          <Button
            sx={{
              position: 'absolute',
              right: '0',
              backgroundColor: "#38B6FF",
              color: "#FFFFFF",
              width: '40%',
              height: '8.9vh',
              borderRadius: "2vh",
              border: 'none',
              ':hover': {
                backgroundColor: '#2694D6',
              },
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
      lg: "4vh",
    },
    fontWeight: 600,
    textAlign: "center",

    padding: "2vh 0 0 0",
  },
  description: {
    fontSize: {
      lg: "2.2vh",
    },
    fontWeight: 400,
    textAlign: "center",
    padding: {
      lg: "2vh 0",
    },
    color: "#2D2D2D",

  },
};
