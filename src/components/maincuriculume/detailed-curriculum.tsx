"use client";

import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

const buttonData = [
  { label: 'British Curriculum', backgroundColor: '#38B6FF', textColor: '#FFF' },
  { label: 'American Curriculum', backgroundColor: '#FFF', textColor: '#000' },
  { label: 'International Curriculum', backgroundColor: '#FFF', textColor: '#000' },
];

const curriculumContent: Record<string, { firstColumn: { title: string }[], secondColumn: { title: string; description: string }[] }> = {
  British: {
    firstColumn: [
      { title: 'CAIE' },
      { title: 'Pearson Edexcel' },
      { title: 'AQA' },
      { title: 'OCR' },
    ],
    secondColumn: [
      { title: 'Cambridge Early Years', description: 'Key Stage 1 (KS1): Ages 5-7 (Years 1-2)' },
      { title: 'Cambridge Primary', description: 'Key Stage 2 (KS2): Ages 7-11 (Years 3-6)' },
      { title: 'Cambridge Lower Secondary', description: 'CAIE: List subjects (IGCSE, O Levels, AS/A Levels Pearson Edexcel: Detail subjects (Pearson IGCSE, Pearson)' },
      { title: 'Cambridge Upper Secondary', description: 'Key Stage 2 (KS2): Ages 7-11 (Years 3-6)' },
      { title: 'Cambridge Advanced', description: 'Key Stage 2 (KS2): Ages 7-11 (Years 3-6)' },
    ],
  },
  American: {
    firstColumn: [
      { title: 'American Section 1' },
      { title: 'American Section 2' },
    ],
    secondColumn: [
      { title: 'Detailed American Section 1', description: 'Detailed text for American Curriculum Section 1' },
      { title: 'Detailed American Section 2', description: 'Detailed text for American Curriculum Section 2' },
    ],
  },
  International: {
    firstColumn: [
      { title: 'International Section 1' },
      { title: 'International Section 2' },
    ],
    secondColumn: [
      { title: 'Detailed International Section 1', description: 'Detailed text for International Curriculum Section 1' },
      { title: 'Detailed International Section 2', description: 'Detailed text for International Curriculum Section 2' },
    ],
  },
};

const DetailedCurriculum: React.FC = () => {
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('British');

  const handleButtonClick = (curriculum: string) => {
    setSelectedCurriculum(curriculum);
  };

  return (
    <Box sx={{ margin: { lg: '7vh' } }}>
      <Box>
        <Typography sx={style.detail}>Detailed Curriculum Information</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2vh',
          marginTop: '4vh',
        }}
      >
        {buttonData.map((button, index) => (
          <Button
            key={index}
            onClick={() => handleButtonClick(button.label.split(' ')[0])}
            sx={{
              backgroundColor: button.label.split(' ')[0] === selectedCurriculum ? '#38B6FF' : button.backgroundColor,
              color: button.label.split(' ')[0] === selectedCurriculum ? '#FFF' : button.textColor,
              borderRadius: '5vh',
              border: '1px solid #B1B1B1',
              padding: '1.5vh 3vh',
              textTransform: 'none',
              width: {
                xs: '100%',
                sm: 'auto',
              },
              ':hover': {
                backgroundColor: button.backgroundColor,
              },
            }}
          >
            {button.label}
          </Button>
        ))}
      </Box>

      <Box sx={{ margin: '5vh 0' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Box sx={style.boxstyle}>
              {curriculumContent[selectedCurriculum].firstColumn.map((item, index) => (
                <Typography
                  key={index}
                  sx={{
                    ...style.typographyWithBorder,
                    color: item.title === 'CAIE' ? '#38B6FF' : '#000', // Change color of CAIE to red
                  }}
                >
                  {item.title}
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={8} md={8} lg={9}>
            <Box sx={style.rightBoxStyle}>
              {curriculumContent[selectedCurriculum].secondColumn.map((section, index) => (
                <Box key={index} sx={style.boxWithBorder}>
                  <Typography sx={style.cambridge}>{section.title}</Typography>
                  <Typography
                    sx={style.typographyWithPadding}
                    dangerouslySetInnerHTML={{ __html: section.description }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DetailedCurriculum;

const style = {
  detail: {
    fontSize: {
      lg: '6vh',
    },
    fontWeight: '600',
    textAlign: 'center',
  },
  boxstyle: {
    width: {
      lg: '45vh',
    },
    background: '#FFF',
    borderRadius: '2vh',
    boxShadow: '0px -3px 8px 0px rgba(0, 0, 0, 0.20)',
    filter: 'drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.05))',
    backdropFilter: 'blur(5px)',
  },
  typographyWithBorder: {
    fontWeight: 600,
    fontSize: {
      lg: '3vh',
    },
    borderBottom: '.5px solid #D7D7D7',
    padding: '3vh 4vh',
    marginBottom: '8px',
  },
  rightBoxStyle: {
    padding: {
      xs: '0vh',
      lg: '2vh 8vh 10vh 8vh',
    },
    background: '#FFF',
    borderRadius: '2vh',
    boxShadow: '0px 2px 1px 0px rgba(0, 0, 0, 0.05), 0px -3px 8px 0px rgba(0, 0, 0, 0.20)',
    filter: 'drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.05))',
    backdropFilter: 'blur(5px)',
  },
  boxWithBorder: {
    borderBottom: '.5px solid #D7D7D7',
    display: 'flex',
  },
  cambridge: {
    fontSize: {
      xs: '1vh',
      lg: '3vh',
    },
    fontWeight: 600,
    padding: {
      xs: '0',
      lg: '3vh 0 3vh 2vh',
    },
    width: {
      xs: '100%',
      lg: '60%',
    },
  },
  typographyWithPadding: {
    fontSize: {
      xs: '1.5vh',
      lg: '2vh',
    },
    fontWeight: 600,
    padding: {
      xs: '0',
      lg: '3.5vh 0 3vh 2vh',
    },
    borderLeft: '.5px solid #D7D7D7',
    width: {
      xs: '100%',
      lg: '100%',
    },
  },
};