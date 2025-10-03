import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Rating } from '@mui/material';
import { useI18n } from '@/context/language-context';
import Image from 'next/image';

const EsOurClient: React.FC = () => {
  const { t } = useI18n();

  // Sample testimonials - would typically come from props or data fetching
  const testimonials = [
    { 
      id: 1, 
      name: 'María García', 
      role: 'Estudiante de GCSE', 
      content: t('testimonials.sample_content'), 
      rating: 5,
      avatar: '/assets/images/avatars/avatar1.png'
    },
    { 
      id: 2, 
      name: 'José Martínez', 
      role: 'Padre de Estudiante', 
      content: t('testimonials.sample_content2'), 
      rating: 5,
      avatar: '/assets/images/avatars/avatar2.png'
    },
    { 
      id: 3, 
      name: 'Ana López', 
      role: 'Estudiante de A-Level', 
      content: t('testimonials.sample_content3'), 
      rating: 5,
      avatar: '/assets/images/avatars/avatar3.png'
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {t('testimonials.title')}
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" sx={{ mb: 4 }}>
        {t('testimonials.subtitle')}
      </Typography>
      
      <Grid container spacing={4}>
        {testimonials.map((testimonial) => (
          <Grid item xs={12} md={4} key={testimonial.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    style={{ borderRadius: '50%', marginRight: 16 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" component="div">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {testimonial.role}
                    </Typography>
                    <Rating value={testimonial.rating} readOnly size="small" />
                  </Box>
                </Box>
                <Typography variant="body1" color="textSecondary">
                  {`"${testimonial.content}"`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EsOurClient;