import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import img1 from '../../../public/assets/images/svg/Physicsicon.svg';
import img2 from '../../../public/assets/images/svg/mathsicon.svg';
import img3 from '../../../public/assets/images/svg/chemistryicon.svg';
import img4 from '../../../public/assets/images/svg/Biology icon.svg';
import img5 from '../../../public/assets/images/svg/accountingicon.svg';
import img6 from '../../../public/assets/images/svg/businessicon.svg';
import img7 from '../../../public/assets/images/svg/Languageicon.svg';
import img8 from '../../../public/assets/images/svg/Litrateicon.svg';
import img9 from '../../../public/assets/images/svg/computericon.svg';
import img10 from '../../../public/assets/images/svg/additionalmathicon.svg';
import img11 from '../../../public/assets/images/svg/combinedicon.svg';
import img12 from '../../../public/assets/images/svg/Enviromentalicon.svg';
import img13 from '../../../public/assets/images/svg/Arabicicon.svg';
import img14 from '../../../public/assets/images/svg/socialogyicon.svg';
import img15 from '../../../public/assets/images/svg/Global.svg';
import img16 from '../../../public/assets/images/svg/Frenchicon.svg';

const PopularIgcseSubjects = () => {
  const PopularSubjects = [
    { icon: img1, subject: "Physics" },
    { icon: img2, subject: "Mathematics" },
    { icon: img3, subject: "Chemistry" },
    { icon: img4, subject: "Biology" },
    { icon: img5, subject: "Accounting" },
    { icon: img6, subject: "Business Studies" },
    { icon: img7, subject: "English Language" },
    { icon: img8, subject: "English Literature" },
    { icon: img9, subject: "Computer Science" },
    { icon: img10, subject: "Additional Maths" },
    { icon: img11, subject: "Combined Science" },
    { icon: img12, subject: "Environmental Management" },
    { icon: img13, subject: "Arabic " },
    { icon: img14, subject: "Sociology" },
    { icon: img15, subject: "Global Perspective" },
    { icon: img16, subject: "French" },
  ];

  return (
    <Box sx={{
      marginX: { xs: "2.5vh", sm: "2.5vh", lg: "4vh" },
      marginY: { xs: "2.5vh", sm: "2.5vh", lg: "12vh" }
    }}>
      <Box>
        <Typography sx={style.popularText}>
          Check Out Some of Our Most Popular IGCSE Subjects
        </Typography>
      </Box>

      <Box sx={{ marginY: { lg: "6vh", sm: "5vh", xs: "4vh" } }}>
        <Grid container spacing={2} justifyContent="center">
          {PopularSubjects.map((item, index) => {
            return (
              <Grid item xs={6} sm={3} md={3} lg={1.5} key={index}>
                <Box sx={style.cardsBoxes}>
                  <Image src={item.icon} alt='icons' style={{ height: 'auto', maxWidth: '80%' }} />
                  <Typography sx={style.subjects}>{item.subject}</Typography>
                </Box>
              </Grid>
            );
          })}
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
    height: '20vh',
  }
};
