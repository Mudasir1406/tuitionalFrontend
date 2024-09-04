`'use client'`;
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

// Define an interface for the subject item
interface Subject {
  icon: string;
  subject: string;
}

// Define an interface for the props
interface PopularIgcseSubjectsProps {
  header: any;
  subjects: any
}
const PopularIgcseSubjects: React.FC<PopularIgcseSubjectsProps> = ({ subjects = [], header }) => {
  return (
    <Box sx={{
      marginX: { xs: "2.5vh", sm: "2.5vh", lg: "4vh" },
      marginY: { xs: "2.5vh", sm: "2.5vh", lg: "12vh" }
    }}>
      <Box>
        <Typography sx={style.popularText}>
          {header}
        </Typography>
      </Box>

      <Box sx={{ marginY: { lg: "6vh", sm: "5vh", xs: "4vh", } }}>
        <Grid container spacing={2} justifyContent="center">
          {subjects.map((item: { icon: string | StaticImport; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
            <Grid item xs={6} sm={3} md={3} lg={1.5} key={index}>
              <Box sx={style.cardsBoxes}>
                <Image
                  src={item.icon}
                  alt="icon"
                  width={50} // Set appropriate width for your icons
                  height={50} // Set appropriate height for your icons
                />
                <Typography sx={style.subjects}>{item.name}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default PopularIgcseSubjects;

const style = {
  popularText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: { lg: "5vh", sm: "2.5vh" },
    width: { lg: "35%", sm: "52%" },
    margin: "0 auto"
  },
  subjects: {
    color: "#2D2D2D",
    fontWeight: "600",
    fontSize: { lg: "2vh" },
  },
  cardsBoxes: {
    background: "#FFF",
    backdropFilter: "blur(5px)",
    borderRadius: "2vh",
    boxShadow: "0px -5px 15px 0px rgba(0, 0, 0, 0.20)",
    textAlign: "center",
    padding: "4vh",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '12vh',
  }
};

