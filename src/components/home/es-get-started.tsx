import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { useI18n } from '@/context/language-context';
import { ArrowForward } from '@mui/icons-material';

const EsGetStarted: React.FC = () => {
  const { t } = useI18n();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h2" gutterBottom>
            {t('get_started.title')}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {t('get_started.subtitle')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} display="flex" justifyContent={{ md: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForward />}
            href="/es/book-demo"
          >
            {t('buttons.book_demo')}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EsGetStarted;