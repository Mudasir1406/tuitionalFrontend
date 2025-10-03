import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { useI18n } from '@/context/language-context';
import { ArrowForward } from '@mui/icons-material';

const EsInfo: React.FC = () => {
  const { t } = useI18n();

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        {t('hero.main_title')}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {t('hero.subtitle')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {t('hero.description')}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        endIcon={<ArrowForward />}
        size="large"
        href="/es/book-demo"
      >
        {t('buttons.book_demo')}
      </Button>
    </Box>
  );
};

export default EsInfo;