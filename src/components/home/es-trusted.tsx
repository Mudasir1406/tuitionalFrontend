import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useI18n } from '@/context/language-context';
import Image from 'next/image';

const EsTrusted: React.FC = () => {
  const { t } = useI18n();

  // Sample logos - replace with actual logos
  const logos = [
    { id: 1, name: 'Cambridge', image: '/assets/images/logos/cambridge.png' },
    { id: 2, name: 'Pearson', image: '/assets/images/logos/pearson.png' },
    { id: 3, name: 'AQA', image: '/assets/images/logos/aqa.png' },
    { id: 4, name: 'Edexcel', image: '/assets/images/logos/edexcel.png' },
  ];

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {t('trusted.title')}
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" sx={{ mb: 4 }}>
        {t('trusted.subtitle')}
      </Typography>
      
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        {logos.map((logo) => (
          <Grid item key={logo.id} xs="auto">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 80,
                px: 3,
              }}
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={120}
                height={60}
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EsTrusted;