import { Box, Typography } from '@mui/material';
import React from 'react';

const HomeCurriculume = () => {
  return (
    <>
      <Box sx={{
        textAlign: 'center',
        padding: '8px 16px',
        margin: "0 7vh 7vh",
        width: "auto",
        height: "6vh",
        borderRadius: "1.5vh",
        background: "#E7F6FF",
        boxShadow: "0px 2px 1px 0px rgba(0, 0, 0, 0.05), 0px -3px 8px 0px rgba(56, 182, 255, 0.20)",
        backdropFilter: "blur(5px)",
      }}>
        <Typography sx={{
          fontSize: {
            lg: "3vh",
          },
          fontWeight: "700",
        }}>
          Home &gt; <span style={{
            color: "#38B6FF"
          }}>Curriculum</span>
        </Typography>
      </Box>
    </>
  )
}

export default HomeCurriculume;
