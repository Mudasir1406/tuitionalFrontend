import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import tic from '../../../public/assets/images/svg/Tickicon.svg'; // Example icon image

const Pricing = () => {
  const plans = [
    {
      title: 'Free',
      description: 'Free plan for all users.',
      features: [
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
      ],
      buttonText: 'Learn More',
    },
    {
      title: '$15',
      duration: '/month',
      description: 'Affordable plan with additional benefits.',
      features: [
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
      ],
      buttonText: 'Learn More',
    },
    {
      title: '$25',
      duration: '/month',
      description: 'All-inclusive plan for advanced users.',
      features: [
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
        'Lorem ipsum dolor sit amet consectetur',
      ],
      buttonText: 'Learn More',
    },
  ];

  return (
    <Box sx={style.container}>
      <Typography sx={style.heading}>Pricing</Typography>
      <Grid container spacing={3}>
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={style.card}>
              <Box sx={{ display: "flex" }}>
                <Typography sx={style.cardTitle}>{plan.title}</Typography>
                <Typography sx={style.cardduration}>${plan.duration}</Typography>
              </Box>
              <Typography sx={style.cardDescription}>{plan.description}</Typography>
              <Box sx={style.features}>
                {plan.features.map((feature, featureIndex) => (
                  <Box sx={style.featureItem} key={featureIndex}>
                    <Image src={tic} alt='Check icon' style={style.icon} />
                    <Typography sx={style.featureText}>{feature}</Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ marginTop: 'auto', width: '100%' }}>
                <Button variant="contained" sx={style.containedBtn}>
                  {plan.buttonText}
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Pricing;

const style = {
  container: {
    padding: { xs: '4vh', sm: '6vh', lg: '8vh' },
    backgroundColor: '#9EDCFF',
  },
  heading: {
    fontWeight: '600',
    fontSize: { xs: '4vh', lg: '6vh' },
    textAlign: 'center',
    marginBottom: '4vh',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    padding: { xs: '2vh', sm: '3vh', lg: '4vh' },
    textAlign: 'left', // Align text to the left
    display: 'flex',
    flexDirection: 'column',
    minHeight: '70vh', // Set minimum height for consistent box size
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: { xs: '2.5vh', sm: '3vh', lg: '7vh' },
    lineHeight: { xs: '2.5vh', sm: '3vh', lg: '7vh' },
    marginBottom: '1vh',
  },
  cardduration: {
    fontWeight: '500',
    fontSize: { xs: '2vh', sm: '2.5vh', lg: '3vh' },
    color: '#A2A2A2',
  },
  cardDescription: {
    fontWeight: '500',
    fontSize: { xs: '1.8vh', sm: '2vh', lg: '2vh' },
    margin: '2vh 0',
  },
  features: {
    marginBottom: '2vh',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    paddingY: '1vh',
  },
  icon: {
    marginRight: '1vh',
    height: '1.5vh',
  },
  featureText: {
    fontWeight: '400',
    fontSize: { xs: '1.6vh', sm: '1.8vh', lg: '2vh' },
  },
  containedBtn: {
    boxShadow: '1px 4px 24px 0px #38B6FFB2',
    backgroundColor: '#38B6FF',
    fontSize: '2vh',
    fontWeight: 700,
    paddingY: '1.5vh',
    paddingX: '3vh',
    margin: "0 0 6vh 0",
    textTransform: 'none',
    borderRadius: '10px',
    width: '40%', // Adjust width as needed
    textAlign: 'left', // Align button to the left
    ":hover": {
      boxShadow: '1px 4px 24px 0px #38B6FFB2',
      backgroundColor: '#38B6FF',
    },
  },
};
